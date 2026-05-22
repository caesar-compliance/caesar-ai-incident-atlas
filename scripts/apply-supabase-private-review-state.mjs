// apply-supabase-private-review-state.mjs (T072)
// Default mode: dry-run only. Real apply requires --live-apply + ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED=YES + DB credentials.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const MIGRATION_PATH = path.join(ROOT, 'infra', 'supabase', 'migrations', '002_private_review_state_sync.sql');
const OUT_DIR        = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const OUTPUT_PATH    = path.join(OUT_DIR, 'private-runtime-activation-apply-result-latest.json');

function log(msg) { process.stdout.write(msg + '\n'); }

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function readText(p) {
  try { return fs.readFileSync(p, 'utf8'); }
  catch { return null; }
}

function writeJson(p, data) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

const args = process.argv.slice(2);
const hasLiveApplyFlag = args.includes('--live-apply');

// Standard credentials loaded securely
const dbUrl = (process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || '').trim();
const hasDbCreds = dbUrl.length > 0;

const liveApproved = process.env.ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED === 'YES';
const shouldApplyLive = hasLiveApplyFlag && liveApproved && hasDbCreds;

const now = new Date().toISOString();
let executed = false;
let errorMsg = null;

if (shouldApplyLive) {
  log('apply-supabase-private-review-state: LIVE mode requested and approved. Applying migration SQL...');
  const sql = readText(MIGRATION_PATH);
  if (!sql) {
    errorMsg = 'Could not read migration SQL file';
    log('FAIL: ' + errorMsg);
  } else {
    try {
      const usePsql = spawnSync('which', ['psql'], { encoding: 'utf8' }).status === 0;
      if (usePsql) {
        log('  Applying via psql...');
        const r = spawnSync('psql', [dbUrl, '-v', 'ON_ERROR_STOP=1', '-f', MIGRATION_PATH], { encoding: 'utf8' });
        if (r.status !== 0) {
          throw new Error(`psql failed: ${r.stderr || r.stdout}`);
        }
        executed = true;
      } else {
        log('  Applying via pg-client...');
        const pgMod = await import('pg');
        const pg = pgMod.default ?? pgMod;
        const client = new pg.Client({
          connectionString: dbUrl,
          ssl: dbUrl.includes('supabase.co') ? { rejectUnauthorized: false } : undefined,
        });
        await client.connect();
        await client.query(sql);
        await client.end();
        executed = true;
      }
      log('PASS: Migration applied successfully.');
    } catch (err) {
      errorMsg = err.message;
      log('FAIL: Error applying migration: ' + errorMsg);
    }
  }
} else {
  const missing = [];
  if (!hasLiveApplyFlag) missing.push('--live-apply flag');
  if (!liveApproved) missing.push('ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED=YES');
  if (!hasDbCreds) missing.push('SUPABASE_DB_URL/DATABASE_URL credential');

  log('apply-supabase-private-review-state: DRY-RUN ONLY.');
  log('  Reason: ' + (missing.length > 0 ? 'Missing ' + missing.join(', ') : 'unknown'));
}

const applyResult = {
  _schema: 'atlas-private-runtime-activation-apply-result/v1',
  generated_at: now,
  task: 'T072',
  live_apply_requested: hasLiveApplyFlag,
  live_apply_approved: liveApproved,
  remote_apply_executed: executed,
  remote_write_attempted: false, // will remain false
  applied_migration: 'infra/supabase/migrations/002_private_review_state_sync.sql',
  intended_table: 'atlas_private_review_state_snapshots',
  errors: errorMsg,
  note: executed ? 'Migration SQL was successfully applied to remote database.' : 'Dry-run only. No remote mutation was performed.'
};

writeJson(OUTPUT_PATH, applyResult);

process.exit(executed || !shouldApplyLive ? 0 : 1);
