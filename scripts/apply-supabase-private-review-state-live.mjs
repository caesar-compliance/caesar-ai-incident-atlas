// scripts/apply-supabase-private-review-state-live.mjs (T073)
// Default mode: dry-run only. Real apply requires --live-apply + ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED=YES + DB credentials.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const MIGRATION_PATH = path.join(ROOT, 'infra', 'supabase', 'migrations', '002_private_review_state_sync.sql');
const OUT_DIR        = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const OUTPUT_PATH    = path.join(OUT_DIR, 't073-live-apply-result.latest.json');

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
const hasDbCreds = dbUrl.length > 0;

const args = process.argv.slice(2);
const hasLiveApplyFlag = args.includes('--live-apply');

const liveApproved = process.env.ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED === 'YES';
const shouldApplyLive = hasLiveApplyFlag && liveApproved && hasDbCreds;

const now = new Date().toISOString();
let executed = false;
let errorMsg = null;

if (shouldApplyLive) {
  process.stdout.write('apply-supabase-private-review-state-live: LIVE mode requested and approved. Applying migration SQL...\n');
  const sql = fs.existsSync(MIGRATION_PATH) ? fs.readFileSync(MIGRATION_PATH, 'utf8') : null;
  if (!sql) {
    errorMsg = 'Could not read migration SQL file';
    process.stdout.write('FAIL: ' + errorMsg + '\n');
  } else {
    try {
      const usePsql = spawnSync('which', ['psql'], { encoding: 'utf8' }).status === 0;
      if (usePsql) {
        process.stdout.write('  Applying via psql...\n');
        const r = spawnSync('psql', [dbUrl, '-v', 'ON_ERROR_STOP=1', '-f', MIGRATION_PATH], { encoding: 'utf8' });
        if (r.status !== 0) {
          throw new Error(`psql failed: ${r.stderr || r.stdout}`);
        }
        executed = true;
      } else {
        process.stdout.write('  Applying via pg-client...\n');
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
      process.stdout.write('PASS: Migration applied successfully.\n');
    } catch (err) {
      errorMsg = err.message;
      process.stdout.write('FAIL: Error applying migration: ' + errorMsg + '\n');
    }
  }
} else {
  const missing = [];
  if (!hasLiveApplyFlag) missing.push('--live-apply flag');
  if (!liveApproved) missing.push('ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED=YES');
  if (!hasDbCreds) missing.push('SUPABASE_DB_URL/DATABASE_URL credential');

  process.stdout.write('apply-supabase-private-review-state-live: DRY-RUN ONLY.\n');
  process.stdout.write('  Reason: ' + (missing.length > 0 ? 'Missing ' + missing.join(', ') : 'unknown') + '\n');
}

const applyResult = {
  _schema: 'atlas-private-runtime-activation-live-apply-result/v1',
  generated_at: now,
  task: 'T073',
  live_apply_requested: hasLiveApplyFlag,
  live_apply_approved: liveApproved,
  remote_apply_executed: executed,
  applied_migration: 'infra/supabase/migrations/002_private_review_state_sync.sql',
  intended_table: 'atlas_private_review_state_snapshots',
  errors: errorMsg,
  note: executed ? 'Migration SQL was successfully applied to remote database.' : 'Dry-run only. No remote mutation was performed.'
};

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(applyResult, null, 2) + '\n');

process.exit(executed || !shouldApplyLive ? 0 : 1);
