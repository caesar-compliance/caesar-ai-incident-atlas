// write-private-review-state-snapshot.mjs (T072)
// Default mode: dry-run only. Real write requires --live-write + ATLAS_T072_PRIVATE_REVIEW_STATE_WRITE_APPROVED=YES + ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED=YES + DB credentials.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const SYNC_PAYLOAD_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-review-state-sync.private-latest.json');
const OUT_DIR           = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const OUTPUT_PATH       = path.join(OUT_DIR, 'private-runtime-activation-write-result-latest.json');

function log(msg) { process.stdout.write(msg + '\n'); }

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function writeJson(p, data) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

const args = process.argv.slice(2);
const hasLiveWriteFlag = args.includes('--live-write');

const dbUrl = (process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || '').trim();
const supabaseUrl = (process.env.SUPABASE_URL || '').trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const hasDbCreds = dbUrl.length > 0;
const hasRestCreds = supabaseUrl.length > 0 && serviceKey.length > 0;

const writeApproved = process.env.ATLAS_T072_PRIVATE_REVIEW_STATE_WRITE_APPROVED === 'YES';
const applyApproved = process.env.ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED === 'YES';
const shouldWriteLive = hasLiveWriteFlag && writeApproved && applyApproved && (hasDbCreds || hasRestCreds);

const now = new Date().toISOString();
let executed = false;
let recordWritten = null;
let errorMsg = null;

// Read parent T071 sync record
const syncPayload = readJson(SYNC_PAYLOAD_PATH);
if (!syncPayload || !syncPayload.records || syncPayload.records.length === 0) {
  log('ERROR: Safe sync payload not found or empty at: ' + SYNC_PAYLOAD_PATH);
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
  log('FAIL: Sanity check failed - found raw HTML in the metadata packet.');
  process.exit(1);
}

if (shouldWriteLive) {
  log('write-private-review-state-snapshot: LIVE write approved. Writing sanitized review-state snapshot to Supabase...');
  try {
    if (hasDbCreds) {
      log('  Writing via PostgreSQL client...');
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
      log('  Writing via REST PostgREST API...');
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
    log('PASS: Sanitized metadata snapshot written successfully.');
  } catch (err) {
    errorMsg = err.message;
    log('FAIL: Error during database snapshot write: ' + errorMsg);
  }
} else {
  const missing = [];
  if (!hasLiveWriteFlag) missing.push('--live-write flag');
  if (!writeApproved) missing.push('ATLAS_T072_PRIVATE_REVIEW_STATE_WRITE_APPROVED=YES');
  if (!applyApproved) missing.push('ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED=YES');
  if (!hasDbCreds && !hasRestCreds) missing.push('Supabase credentials');

  log('write-private-review-state-snapshot: DRY-RUN ONLY.');
  log('  Reason: ' + (missing.length > 0 ? 'Missing ' + missing.join(', ') : 'unknown'));
}

const writeResult = {
  _schema: 'atlas-private-runtime-activation-write-result/v1',
  generated_at: now,
  task: 'T072',
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

writeJson(OUTPUT_PATH, writeResult);

process.exit(executed || !shouldWriteLive ? 0 : 1);
