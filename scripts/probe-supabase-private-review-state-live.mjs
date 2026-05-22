// probe-supabase-private-review-state-live.mjs (T072)
// Default mode: dry-run only. Real probe requires --live-probe + ATLAS_T072_LIVE_PROBE_APPROVED=YES + DB credentials.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OUT_DIR     = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const OUTPUT_PATH = path.join(OUT_DIR, 'private-runtime-activation-probe-result-latest.json');

function log(msg) { process.stdout.write(msg + '\n'); }

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function writeJson(p, data) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

const args = process.argv.slice(2);
const hasLiveProbeFlag = args.includes('--live-probe');

const dbUrl = (process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || '').trim();
const hasDbCreds = dbUrl.length > 0;

const liveApproved = process.env.ATLAS_T072_LIVE_PROBE_APPROVED === 'YES';
const shouldProbeLive = hasLiveProbeFlag && liveApproved && hasDbCreds;

const now = new Date().toISOString();
let attempted = false;
let success = false;
let tableExists = false;
let shapeCompatible = false;
let rowCount = 0;
let errorMsg = null;

if (shouldProbeLive) {
  log('probe-supabase-private-review-state-live: LIVE mode requested and approved. Performing read-only probe...');
  attempted = true;
  try {
    const usePsql = spawnSync('which', ['psql'], { encoding: 'utf8' }).status === 0;
    if (usePsql) {
      log('  Probing via psql...');
      // Query to check table exists and column names
      const query = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'atlas_private_review_state_snapshots'
        );
      `;
      const r = spawnSync('psql', [dbUrl, '-t', '-A', '-c', query], { encoding: 'utf8' });
      if (r.status !== 0) {
        throw new Error(`psql query failed: ${r.stderr || r.stdout}`);
      }
      tableExists = r.stdout.trim() === 't';

      if (tableExists) {
        // Query to check shape compatibility (check key column exists)
        const checkCol = `
          SELECT count(*)::text FROM information_schema.columns 
          WHERE table_name = 'atlas_private_review_state_snapshots' 
          AND column_name IN ('source_run_id', 'sync_status', 'publication_blocked', 'review_state');
        `;
        const colRes = spawnSync('psql', [dbUrl, '-t', '-A', '-c', checkCol], { encoding: 'utf8' });
        const colsFound = parseInt(colRes.stdout.trim(), 10);
        shapeCompatible = colsFound === 4;

        // Query row count
        const countRes = spawnSync('psql', [dbUrl, '-t', '-A', '-c', "SELECT count(*)::text FROM atlas_private_review_state_snapshots;"], { encoding: 'utf8' });
        rowCount = parseInt(countRes.stdout.trim(), 10);
        success = true;
      }
    } else {
      log('  Probing via pg-client...');
      const pgMod = await import('pg');
      const pg = pgMod.default ?? pgMod;
      const client = new pg.Client({
        connectionString: dbUrl,
        ssl: dbUrl.includes('supabase.co') ? { rejectUnauthorized: false } : undefined,
      });
      await client.connect();

      // Check table exists
      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'atlas_private_review_state_snapshots'
        );
      `);
      tableExists = tableCheck.rows[0]?.exists === true;

      if (tableExists) {
        // Check shape compatibility
        const shapeCheck = await client.query(`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'atlas_private_review_state_snapshots';
        `);
        const cols = shapeCheck.rows.map(r => r.column_name);
        shapeCompatible = ['source_run_id', 'sync_status', 'publication_blocked', 'review_state'].every(c => cols.includes(c));

        // Get row count
        const countCheck = await client.query(`SELECT count(*)::int as cnt FROM atlas_private_review_state_snapshots;`);
        rowCount = countCheck.rows[0]?.cnt || 0;
        success = true;
      }
      await client.end();
    }

    log(`probe-supabase-private-review-state-live: success=${success}, tableExists=${tableExists}, shapeCompatible=${shapeCompatible}, rows=${rowCount}`);
  } catch (err) {
    errorMsg = err.message;
    log('FAIL: Error during live database probe: ' + errorMsg);
  }
} else {
  const missing = [];
  if (!hasLiveProbeFlag) missing.push('--live-probe flag');
  if (!liveApproved) missing.push('ATLAS_T072_LIVE_PROBE_APPROVED=YES');
  if (!hasDbCreds) missing.push('SUPABASE_DB_URL/DATABASE_URL credential');

  log('probe-supabase-private-review-state-live: DRY-RUN ONLY.');
  log('  Reason: ' + (missing.length > 0 ? 'Missing ' + missing.join(', ') : 'unknown'));
}

const probeResult = {
  _schema: 'atlas-private-runtime-activation-probe-result/v1',
  generated_at: now,
  task: 'T072',
  live_probe_requested: hasLiveProbeFlag,
  live_probe_approved: liveApproved,
  live_probe_attempted: attempted,
  success: success,
  table_exists: tableExists,
  shape_compatible: shapeCompatible,
  row_count: rowCount,
  errors: errorMsg,
  note: attempted ? 'Read-only database probe was executed on the live remote database.' : 'Dry-run probe only. No database connection attempted.'
};

writeJson(OUTPUT_PATH, probeResult);

// Save in data/ops/supabase/last-live-probe.json for ops compatibility as requested!
const OPS_PROBE_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'last-live-probe.json');
writeJson(OPS_PROBE_PATH, {
  generated_at: now,
  mode: attempted ? 'read_only_probe' : 'skipped_no_env',
  success: success,
  table_exists: tableExists,
  shape_compatible: shapeCompatible,
  row_count: rowCount,
  errors: errorMsg
});

process.exit(success || !shouldProbeLive ? 0 : 1);
