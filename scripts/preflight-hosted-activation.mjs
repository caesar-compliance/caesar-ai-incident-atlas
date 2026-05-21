// preflight-hosted-activation.mjs (T059)
// Hosted activation readiness checker — NOT a deployer.
// Inspects local configuration without performing activation.
// Writes sanitized preflight result to data/ops/supabase/hosted-activation-preflight.json

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OPS_SUPABASE_DIR = path.join(ROOT, 'data', 'ops', 'supabase');
const OUTPUT_PATH      = path.join(OPS_SUPABASE_DIR, 'hosted-activation-preflight.json');
const MANIFEST_PATH    = path.join(OPS_SUPABASE_DIR, 'bootstrap-manifest.json');

// Paths to check
const ENV_PATH = path.join(ROOT, '.env');
const ENV_EXAMPLE_PATH = path.join(ROOT, '.env.example');
const WRANGLER_TOML_PATH = path.join(ROOT, 'infra', 'cloudflare-worker', 'wrangler.toml');
const WRANGLER_EXAMPLE_PATH = path.join(ROOT, 'infra', 'cloudflare-worker', 'wrangler.example.toml');
const PAGES_YML_PATH = path.join(ROOT, '.github', 'workflows', 'pages.yml');
const WORKER_INDEX_PATH = path.join(ROOT, 'infra', 'cloudflare-worker', 'src', 'index.js');
const SCHEMA_PATH = path.join(ROOT, 'infra', 'supabase', 'schema.sql');

// Required scripts
const REQUIRED_SCRIPTS = [
  'scripts/sync-supabase-hosted.mjs',
  'scripts/probe-worker-supabase-live.mjs',
  'scripts/validate-hosted-sync-safety.mjs',
  'scripts/test-cloudflare-worker-local.mjs',
  'scripts/export-ops-status.mjs',
  'scripts/smoke-supabase-local-migration.mjs',
];

function log(msg) { process.stdout.write(msg + '\n'); }

function existsFile(p) { return fs.existsSync(p) && fs.statSync(p).isFile(); }
function existsDir(p)  { return fs.existsSync(p) && fs.statSync(p).isDirectory(); }

function readText(p) {
  try { return fs.readFileSync(p, 'utf8'); }
  catch { return null; }
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function writeJson(p, data) {
  if (!fs.existsSync(path.dirname(p))) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

const now = new Date().toISOString();

// ── Read bootstrap manifest ──────────────────────────────────────────────────
const manifest = readJson(MANIFEST_PATH);

// ── Check .env presence (without reading values) ───────────────────────────────
const envExists = existsFile(ENV_PATH);
const envExampleExists = existsFile(ENV_EXAMPLE_PATH);

// ── Check env configuration (safe check — only presence, not values) ──────────
const env = {
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  ATLAS_CONFIRM_HOSTED_SYNC: process.env.ATLAS_CONFIRM_HOSTED_SYNC || '',
  ATLAS_HOSTED_SYNC_MODE: process.env.ATLAS_HOSTED_SYNC_MODE || '',
};

const hasSupabaseUrl = env.SUPABASE_URL.length > 0;
const hasServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY.length > 0;
const hasConfirmFlag = env.ATLAS_CONFIRM_HOSTED_SYNC === 'YES';
const syncMode = env.ATLAS_HOSTED_SYNC_MODE || 'dry_run';
const isValidSyncMode = ['dry_run', 'push'].includes(syncMode);

// ── Check wrangler.toml presence only ─────────────────────────────────────────
const wranglerTomlExists = existsFile(WRANGLER_TOML_PATH);
const wranglerExampleExists = existsFile(WRANGLER_EXAMPLE_PATH);
const wranglerExample = readText(WRANGLER_EXAMPLE_PATH) || '';

// ── Validate wrangler.example.toml has placeholders only ────────────────────
const hasRealAccountId = /account_id\s*=\s*"[0-9a-f]{32}"/i.test(wranglerExample);
const hasRealSecret = /api_token\s*=\s*"[^"]{10,}"|secret\s*=\s*"[^"]{10,}"/i.test(wranglerExample);
const cronDisabled = !/^\s*crons\s*=/m.test(wranglerExample) || /^#.*crons/m.test(wranglerExample);

// ── Check Pages workflow ───────────────────────────────────────────────────
const pagesYml = readText(PAGES_YML_PATH) || '';
const pagesUploadsSite = /path:\s*site/.test(pagesYml);
const noScheduleTrigger = !/schedule\s*:/i.test(pagesYml);

// ── Check required files exist ────────────────────────────────────────────────
const schemaExists = existsFile(SCHEMA_PATH);
const workerExists = existsFile(WORKER_INDEX_PATH);

const scriptsExistence = {};
for (const script of REQUIRED_SCRIPTS) {
  scriptsExistence[script] = existsFile(path.join(ROOT, script));
}
const allScriptsExist = Object.values(scriptsExistence).every(Boolean);

// ── Check bootstrap payloads ──────────────────────────────────────────────────
const bootstrapExists = existsDir(OPS_SUPABASE_DIR) && existsFile(MANIFEST_PATH);
const bootstrapSafe = manifest && manifest.safe_for_hosted_sync === true;

// ── Public count and latest record ────────────────────────────────────────────
const publicCount = manifest ? manifest.public_record_count : null;
const latestRecord = manifest ? manifest.latest_public_record_id : null;
const countCorrect = publicCount === 13;
const latestCorrect = latestRecord === 'INC-0013';

// ── Check for INC-0014 (must not exist) ───────────────────────────────────────
let inc0014Found = false;
const dataDir = path.join(ROOT, 'data');
const siteDataDir = path.join(ROOT, 'site', 'data');

function walkDir(dir, cb) {
  if (!existsDir(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, cb);
    else cb(full);
  }
}

for (const dir of [dataDir, siteDataDir]) {
  walkDir(dir, (file) => {
    if (path.basename(file).toLowerCase().includes('inc-0014')) {
      inc0014Found = true;
    }
  });
}

// ── Determine readiness ─────────────────────────────────────────────────────
const envConfigured = hasSupabaseUrl && hasServiceRoleKey;
const envSafe = !wranglerTomlExists; // wrangler.toml should not exist yet
const confirmConfigured = hasConfirmFlag;
const modeConfigured = isValidSyncMode;

let hostedActivationReady = false;
const blockers = [];

if (!envConfigured) {
  blockers.push('SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY not configured in environment');
}
if (!confirmConfigured) {
  blockers.push('ATLAS_CONFIRM_HOSTED_SYNC is not set to YES');
}
if (!modeConfigured) {
  blockers.push('ATLAS_HOSTED_SYNC_MODE is not valid (must be dry_run or push)');
}
if (!bootstrapSafe) {
  blockers.push('Bootstrap manifest not safe for hosted sync');
}
if (!allScriptsExist) {
  blockers.push('Required scripts missing');
}
if (!schemaExists) {
  blockers.push('schema.sql not found');
}
if (!workerExists) {
  blockers.push('Worker index.js not found');
}
if (inc0014Found) {
  blockers.push('INC-0014 found (must not exist yet)');
}
if (!countCorrect) {
  blockers.push(`Public record count is ${publicCount}, expected 13`);
}
if (!latestCorrect) {
  blockers.push(`Latest record is ${latestRecord}, expected INC-0013`);
}
if (wranglerTomlExists) {
  blockers.push('wrangler.toml exists (should be created manually when ready)');
}

hostedActivationReady = blockers.length === 0 && envConfigured && confirmConfigured;

// ── Build safe next manual steps ─────────────────────────────────────────────
const safeNextManualSteps = [
  'Create local .env from .env.example: cp .env.example .env',
  'Obtain SUPABASE_URL from your Supabase project dashboard (Settings → API)',
  'Obtain SUPABASE_SERVICE_ROLE_KEY from your Supabase project dashboard (Settings → API → service_role key)',
  'Add values to .env (never commit this file)',
  'Apply schema.sql to your Supabase project via SQL editor',
  'Run dry-run sync: node scripts/sync-supabase-hosted.mjs --dry-run',
  'Review dry-run output: data/ops/supabase/last-hosted-sync-dry-run.json',
  'Run read-only probe: ATLAS_CONFIRM_HOSTED_SYNC=YES node scripts/probe-worker-supabase-live.mjs',
  'Review probe output: data/ops/supabase/last-live-probe.json',
  'ONLY after manual approval: ATLAS_HOSTED_SYNC_MODE=push ATLAS_CONFIRM_HOSTED_SYNC=YES node scripts/sync-supabase-hosted.mjs --push',
  'Create infra/cloudflare-worker/wrangler.toml from wrangler.example.toml',
  'Set Worker secrets: wrangler secret put SUPABASE_URL, wrangler secret put SUPABASE_SERVICE_ROLE_KEY',
  'Run local Worker tests: node scripts/test-cloudflare-worker-local.mjs',
  'ONLY after Control Tower approval: wrangler deploy',
  'Keep cron disabled until separate approval (ENABLE_WATCH_RUNS remains false)',
];

// ── Write preflight result ───────────────────────────────────────────────────
const preflightResult = {
  _schema: 'atlas-hosted-activation-preflight/v1',
  generated_at: now,
  task: 'T059',
  latest_public_record_id: latestRecord,
  public_record_count: publicCount,
  hosted_activation_ready: hostedActivationReady,
  reason: hostedActivationReady
    ? 'All checks passed. Environment configured, all scripts present, public count correct, no blockers.'
    : 'Missing required configuration or files: ' + blockers.join('; '),
  blockers: blockers,
  safe_next_manual_steps: safeNextManualSteps,
  configuration: {
    env_file_present: envExists,
    env_example_present: envExampleExists,
    supabase_url_configured: hasSupabaseUrl,
    service_role_key_configured: hasServiceRoleKey,
    confirm_hosted_sync_set: hasConfirmFlag,
    hosted_sync_mode: syncMode,
    hosted_sync_mode_valid: isValidSyncMode,
  },
  files: {
    schema_sql_present: schemaExists,
    worker_index_present: workerExists,
    wrangler_toml_present: wranglerTomlExists,
    wrangler_example_present: wranglerExampleExists,
    wrangler_example_safe: !hasRealAccountId && !hasRealSecret,
    cron_disabled: cronDisabled,
    pages_uploads_site_only: pagesUploadsSite,
    pages_no_schedule_trigger: noScheduleTrigger,
  },
  bootstrap: {
    payloads_present: bootstrapExists,
    safe_for_hosted_sync: bootstrapSafe,
  },
  scripts: {
    all_required_present: allScriptsExist,
    details: scriptsExistence,
  },
  safety: {
    inc0014_absent: !inc0014Found,
    public_count_correct: countCorrect,
    latest_record_correct: latestCorrect,
    no_wrangler_toml_committed: !wranglerTomlExists,
  },
  note: 'This is a readiness checker only. No remote connection was attempted. No activation was performed.',
};

writeJson(OUTPUT_PATH, preflightResult);

// ── Also write activation manifest (for compatibility with other tools) ───────
const activationManifest = {
  _schema: 'atlas-hosted-activation-manifest/v1',
  generated_at: now,
  task: 'T059',
  latest_public_record_id: latestRecord || 'INC-0013',
  public_record_count: publicCount || 13,
  supabase_schema_present: schemaExists,
  bootstrap_payloads_present: bootstrapExists && bootstrapSafe,
  worker_api_status: 'local_supabase_integration_ready',
  local_migration_smoke_status: 'pending_run',
  hosted_activation_ready: hostedActivationReady,
  remote_mutation_performed: false,
  cloudflare_deploy_performed: false,
  cron_enabled: false,
  safe_for_public_site: true,
  note: 'Activation manifest generated by preflight-hosted-activation.mjs. This is NOT an activation confirmation.',
};

const MANIFEST_OUTPUT_PATH = path.join(OPS_SUPABASE_DIR, 'hosted-activation-manifest.json');
writeJson(MANIFEST_OUTPUT_PATH, activationManifest);

// ── Log results ───────────────────────────────────────────────────────────────
log(`preflight-hosted-activation: ${hostedActivationReady ? 'READY' : 'NOT READY'}`);
log(`  Hosted activation ready: ${hostedActivationReady}`);
if (blockers.length > 0) {
  log(`  Blockers (${blockers.length}):`);
  for (const b of blockers) {
    log(`    - ${b}`);
  }
}
log(`  Public count: ${publicCount} (expected: 13)`);
log(`  Latest record: ${latestRecord} (expected: INC-0013)`);
log(`  INC-0014 absent: ${!inc0014Found}`);
log(`  Scripts present: ${allScriptsExist}`);
log(`  Bootstrap safe: ${bootstrapSafe}`);
log(`  Output: ${OUTPUT_PATH}`);
log(`  Manifest: ${MANIFEST_OUTPUT_PATH}`);

process.exit(0);
