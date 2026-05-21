// sync-supabase-hosted.mjs (T057)
// Dry-run by default. Real push requires explicit guards:
//   --push + SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
//   + ATLAS_CONFIRM_HOSTED_SYNC=YES + ATLAS_HOSTED_SYNC_MODE=push
//
// This task: dry-run only. No remote sync performed.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OPS_SUPABASE_DIR = path.join(ROOT, 'data', 'ops', 'supabase');
const MANIFEST_PATH    = path.join(OPS_SUPABASE_DIR, 'bootstrap-manifest.json');
const DRY_RUN_OUT_PATH = path.join(OPS_SUPABASE_DIR, 'last-hosted-sync-dry-run.json');

const args = process.argv.slice(2);
const wantsPush = args.includes('--push');

const env = {
  SUPABASE_URL:             process.env.SUPABASE_URL             || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  ATLAS_CONFIRM_HOSTED_SYNC: process.env.ATLAS_CONFIRM_HOSTED_SYNC || '',
  ATLAS_HOSTED_SYNC_MODE:   process.env.ATLAS_HOSTED_SYNC_MODE   || 'dry_run',
};

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

// ── Guard evaluation ─────────────────────────────────────────────────────────
const guards = {
  hasPushFlag:   wantsPush,
  hasUrl:        env.SUPABASE_URL.length > 0,
  hasKey:        env.SUPABASE_SERVICE_ROLE_KEY.length > 0,
  hasConfirm:    env.ATLAS_CONFIRM_HOSTED_SYNC === 'YES',
  hasMode:       env.ATLAS_HOSTED_SYNC_MODE === 'push',
};

const allGuardsMet = Object.values(guards).every(Boolean);
const isDryRun = !allGuardsMet;

const now = new Date().toISOString();

// ── Ensure bootstrap payloads exist ──────────────────────────────────────────
if (!fs.existsSync(MANIFEST_PATH)) {
  log('Bootstrap payloads not found. Running export-supabase-bootstrap-payloads.mjs first...');
  // Import and run inline would require top-level await + dynamic import.
  // Instead: error with clear instruction.
  log('ERROR: Run `node scripts/export-supabase-bootstrap-payloads.mjs` first, then retry.');
  process.exit(1);
}

const manifest = readJson(MANIFEST_PATH);
if (!manifest || manifest.safe_for_hosted_sync !== true) {
  log('ERROR: bootstrap-manifest.json is missing or safe_for_hosted_sync is not true');
  process.exit(1);
}

// ── Dry-run path ──────────────────────────────────────────────────────────────
if (isDryRun) {
  const missingGuards = Object.entries(guards)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  const dryRunResult = {
    _schema:           'atlas-hosted-sync/dry-run/v1',
    executed_at:       now,
    mode:              'dry_run',
    remote_sync:       false,
    reason:            'dry_run: remote sync not attempted — missing guard(s): ' + missingGuards.join(', '),
    missing_guards:    missingGuards,
    manifest_status: {
      public_record_count:     manifest.public_record_count,
      latest_public_record_id: manifest.latest_public_record_id,
      source_count:            manifest.source_count,
      safe_for_hosted_sync:    manifest.safe_for_hosted_sync,
      contains_secrets:        manifest.contains_secrets,
      contains_drafts:         manifest.contains_drafts,
      contains_raw_html:       manifest.contains_raw_html,
    },
    next_steps: [
      'Set SUPABASE_URL in .env (never commit)',
      'Set SUPABASE_SERVICE_ROLE_KEY in .env (never commit)',
      'Set ATLAS_HOSTED_SYNC_MODE=push',
      'Set ATLAS_CONFIRM_HOSTED_SYNC=YES',
      'Run: node scripts/sync-supabase-hosted.mjs --push',
    ],
  };

  writeJson(DRY_RUN_OUT_PATH, dryRunResult);

  log('sync-supabase-hosted: DRY RUN');
  log('  No remote sync attempted.');
  log('  Missing guards: ' + missingGuards.join(', '));
  log('  Dry-run result written to: data/ops/supabase/last-hosted-sync-dry-run.json');
  log('  manifest safe_for_hosted_sync: true');
  log('  public_record_count: ' + manifest.public_record_count);
  log('  latest_public_record_id: ' + manifest.latest_public_record_id);
  process.exit(0);
}

// ── Real push path (all guards met) ──────────────────────────────────────────
// This block is reachable only when all 5 guards pass.
// Not executed in T057 — all guards are intentionally not set.
log('sync-supabase-hosted: PUSH MODE — all guards met');
log('  SUPABASE_URL: [set]');
log('  SERVICE_ROLE_KEY: [set]');
log('  ATLAS_CONFIRM_HOSTED_SYNC: YES');
log('  ATLAS_HOSTED_SYNC_MODE: push');
log('');
log('  Reading bootstrap payloads...');

const PAYLOADS = [
  'atlas-sources.bootstrap.json',
  'atlas-public-records.bootstrap.json',
  'atlas-latest-watch-run.bootstrap.json',
];

const tableMap = {
  'atlas-sources.bootstrap.json':           'atlas_sources',
  'atlas-public-records.bootstrap.json':    'atlas_public_records',
  'atlas-latest-watch-run.bootstrap.json':  'atlas_watch_runs',
};

const pushResults = [];

for (const payloadFile of PAYLOADS) {
  const payloadPath = path.join(OPS_SUPABASE_DIR, payloadFile);
  const payload = readJson(payloadPath);
  if (!payload) {
    log('ERROR: missing payload: ' + payloadFile);
    process.exit(1);
  }

  const table   = tableMap[payloadFile];
  const records = payload.records || (payload.run ? [payload.run] : []);

  log('  Upserting ' + records.length + ' row(s) into ' + table + '...');

  try {
    // Use Node built-in fetch (Node 18+)
    const res = await fetch(env.SUPABASE_URL + '/rest/v1/' + table, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY,
        'Prefer':        'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(records),
    });

    // Sanitize: do not log response body (may contain keys/tokens)
    pushResults.push({
      table,
      rows:   records.length,
      status: res.status,
      ok:     res.ok,
    });

    if (!res.ok) {
      log('  ERROR: upsert to ' + table + ' returned HTTP ' + res.status);
    } else {
      log('  OK: ' + table + ' — ' + records.length + ' row(s), HTTP ' + res.status);
    }
  } catch (err) {
    log('  ERROR: fetch failed for ' + table + ': ' + err.message);
    pushResults.push({ table, rows: records.length, status: 'error', ok: false, error: err.message });
  }
}

const allOk = pushResults.every(r => r.ok);
const syncResult = {
  _schema:          'atlas-hosted-sync/push/v1',
  executed_at:      now,
  mode:             'push',
  remote_sync:      true,
  all_ok:           allOk,
  results:          pushResults,
};

// Write result but never write the service key into output
writeJson(path.join(OPS_SUPABASE_DIR, 'last-hosted-sync-push.json'), syncResult);

log('');
log('sync-supabase-hosted: ' + (allOk ? 'PUSH COMPLETE' : 'PUSH PARTIAL/FAILED'));
log('  Result: data/ops/supabase/last-hosted-sync-push.json');
process.exit(allOk ? 0 : 1);
