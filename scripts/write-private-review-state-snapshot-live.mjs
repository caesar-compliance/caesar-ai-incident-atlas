// scripts/write-private-review-state-snapshot-live.mjs (T073)
// Default mode: dry-run only. Real write requires --live-write + ATLAS_T073_PRIVATE_REVIEW_STATE_WRITE_APPROVED=YES + ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED=YES + DB credentials.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const SYNC_PAYLOAD_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-review-state-sync.private-latest.json');
const OUT_DIR           = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const OUTPUT_PATH       = path.join(OUT_DIR, 't073-private-snapshot-write-result.latest.json');

// Parse local env files securely if not present in process.env
const parseEnvFile = (p) => {
  if (!fs.existsSync(p)) return {};
  const out = {};
  const content = fs.readFileSync(p, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
};

const runtimeEnv = parseEnvFile(path.join(ROOT, '.env.runtime.local'));
const dbUrl = (process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || runtimeEnv.SUPABASE_DB_URL || '').trim();
const supabaseUrl = (process.env.SUPABASE_URL || runtimeEnv.SUPABASE_URL || '').trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || runtimeEnv.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const hasDbCreds = dbUrl.length > 0;
const hasRestCreds = supabaseUrl.length > 0 && serviceKey.length > 0;

const args = process.argv.slice(2);
const hasLiveWriteFlag = args.includes('--live-write');

const writeApproved = process.env.ATLAS_T073_PRIVATE_REVIEW_STATE_WRITE_APPROVED === 'YES';
const applyApproved = process.env.ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED === 'YES';
const shouldWriteLive = hasLiveWriteFlag && writeApproved && applyApproved && (hasDbCreds || hasRestCreds);

const now = new Date().toISOString();
let executed = false;
let recordWritten = null;
let errorMsg = null;

// Read parent T071 sync record
if (!fs.existsSync(SYNC_PAYLOAD_PATH)) {
  process.stdout.write(`ERROR: Safe sync payload not found at: ${SYNC_PAYLOAD_PATH}\n`);
  process.exit(1);
}
const syncPayload = JSON.parse(fs.readFileSync(SYNC_PAYLOAD_PATH, 'utf8'));
if (!syncPayload || !syncPayload.records || syncPayload.records.length === 0) {
  process.stdout.write(`ERROR: Safe sync payload is empty at: ${SYNC_PAYLOAD_PATH}\n`);
  process.exit(1);
}

// Extract exactly one metadata-only record and ensure no raw text/HTML is present
const baseRecord = syncPayload.records[0];
const sanitizedRecord = {
  source_run_id: baseRecord.source_run_id,
  chain_ids: baseRecord.chain_ids,
  sync_status: baseRecord.sync_status,
  blocker_status: baseRecord.blocker_status,
  publication_blocked: baseRecord.publication_blocked,
  public_flags: baseRecord.public_flags,
  review_state: {
    ...baseRecord.review_state,
    remote_write_attempted: shouldWriteLive // update to true if executing live
  },
  hosted_payload_hash: baseRecord.hosted_payload_hash
};

// Double-check strict boundaries
const hasRawText = JSON.stringify(sanitizedRecord).includes('<html') || JSON.stringify(sanitizedRecord).includes('<!DOCTYPE');
if (hasRawText) {
  process.stdout.write('FAIL: Sanity check failed - found raw HTML in the metadata packet.\n');
  process.exit(1);
}

if (shouldWriteLive) {
  process.stdout.write('write-private-review-state-snapshot-live: LIVE write approved. Writing sanitized review-state snapshot to Supabase...\n');
  try {
    if (hasDbCreds) {
      process.stdout.write('  Writing via PostgreSQL client...\n');
      const pgMod = await import('pg');
      const pg = pgMod.default ?? pgMod;
      const client = new pg.Client({
        connectionString: dbUrl,
        ssl: dbUrl.includes('supabase.co') ? { rejectUnauthorized: false } : undefined,
      });
      await client.connect();

      const query = `
        INSERT INTO atlas_private_review_state_snapshots 
        (source_run_id, chain_ids, sync_status, blocker_status, publication_blocked, public_flags, review_state, hosted_payload_hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;
      const values = [
        sanitizedRecord.source_run_id,
        JSON.stringify(sanitizedRecord.chain_ids),
        sanitizedRecord.sync_status,
        sanitizedRecord.blocker_status,
        sanitizedRecord.publication_blocked,
        JSON.stringify(sanitizedRecord.public_flags),
        JSON.stringify(sanitizedRecord.review_state),
        sanitizedRecord.hosted_payload_hash
      ];

      const res = await client.query(query, values);
      recordWritten = res.rows[0];
      await client.end();
      executed = true;
    } else if (hasRestCreds) {
      process.stdout.write('  Writing via REST API...\n');
      const res = await fetch(supabaseUrl + '/rest/v1/atlas_private_review_state_snapshots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceKey,
          'Authorization': 'Bearer ' + serviceKey,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(sanitizedRecord)
      });

      if (!res.ok) {
        const bodyText = await res.text();
        throw new Error(`Supabase REST HTTP ${res.status}: ${bodyText}`);
      }

      const rows = await res.json();
      recordWritten = rows[0];
      executed = true;
    }
    process.stdout.write('PASS: Sanitized metadata snapshot written successfully.\n');
  } catch (err) {
    errorMsg = err.message;
    process.stdout.write('FAIL: Error during database snapshot write: ' + errorMsg + '\n');
  }
} else {
  const missing = [];
  if (!hasLiveWriteFlag) missing.push('--live-write flag');
  if (!writeApproved) missing.push('ATLAS_T073_PRIVATE_REVIEW_STATE_WRITE_APPROVED=YES');
  if (!applyApproved) missing.push('ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED=YES');
  if (!hasDbCreds && !hasRestCreds) missing.push('Supabase credentials');

  process.stdout.write('write-private-review-state-snapshot-live: DRY-RUN ONLY.\n');
  process.stdout.write('  Reason: ' + (missing.length > 0 ? 'Missing ' + missing.join(', ') : 'unknown') + '\n');
}

const writeResult = {
  _schema: 'atlas-private-runtime-activation-live-write-result/v1',
  generated_at: now,
  task: 'T073',
  live_write_requested: hasLiveWriteFlag,
  live_write_approved: writeApproved,
  remote_write_attempted: executed,
  record_written: recordWritten ? {
    id: recordWritten.id || null,
    source_run_id: recordWritten.source_run_id,
    sync_status: recordWritten.sync_status
  } : null,
  errors: errorMsg,
  note: executed ? 'Sanitized metadata snapshot was written to the remote database.' : 'Dry-run snapshot write plan generated. No database mutation was performed.'
};

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(writeResult, null, 2) + '\n');

// Also write to legacy path so legacy scripts can validate
const LEGACY_WRITE_PATH = path.join(OUT_DIR, 'private-runtime-activation-write-result-latest.json');
fs.writeFileSync(LEGACY_WRITE_PATH, JSON.stringify(writeResult, null, 2) + '\n');

process.exit(executed || !shouldWriteLive ? 0 : 1);
