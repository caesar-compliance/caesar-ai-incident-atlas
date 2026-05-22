// validate-private-runtime-live-activation.mjs (T073)
// Comprehensive validation script verifying all T073 private runtime activation artifacts, boundaries, and safety constraints.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

// Safe .env.runtime.local loader — values never printed
const parseEnvFile = (p) => {
  if (!fs.existsSync(p)) return {};
  const out = {};
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    out[key] = value;
  }
  return out;
};
const runtimeEnv = parseEnvFile(path.join(ROOT, '.env.runtime.local'));

let errors = 0;
let warnings = 0;

function pass(msg)  { process.stdout.write('PASS: ' + msg + '\n'); }
function fail(msg)  { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }
function warn(msg)  { process.stdout.write('WARN: ' + msg + '\n'); warnings++; }

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function readText(p) {
  try { return fs.readFileSync(p, 'utf8'); }
  catch { return null; }
}

function existsFile(p) { return fs.existsSync(p) && fs.statSync(p).isFile(); }
function existsDir(p)  { return fs.existsSync(p) && fs.statSync(p).isDirectory(); }

function walkDir(dir, cb) {
  if (!existsDir(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, cb);
    else cb(full);
  }
}

// ── Check artifact presence ───────────────────────────────────────────────
const MIGRATION_PATH  = path.join(ROOT, 'infra', 'supabase', 'migrations', '002_private_review_state_sync.sql');
const APPLY_RES_PATH  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 't073-live-apply-result.latest.json');
const PROBE_RES_PATH  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 't073-live-probe-result.latest.json');
const WRITE_RES_PATH  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 't073-private-snapshot-write-result.latest.json');
const SUMMARY_PATH    = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 't073-live-activation-summary.latest.json');
const PARENT_SYNC_PATH = path.join(ROOT, 'data', 'runtime', 'private-review-state-sync', 'hosted-private-review-state-sync-latest.json');

if (existsFile(PARENT_SYNC_PATH)) pass('parent T071 sync dossier exists');
else fail('parent T071 sync dossier missing');

if (existsFile(MIGRATION_PATH)) pass('migration 002_private_review_state_sync.sql exists');
else fail('migration 002_private_review_state_sync.sql missing');

if (existsFile(APPLY_RES_PATH)) pass('T073 live apply result exists');
else fail('T073 live apply result missing');

if (existsFile(PROBE_RES_PATH)) pass('T073 live probe result exists');
else fail('T073 live probe result missing');

if (existsFile(WRITE_RES_PATH)) pass('T073 private snapshot write result exists');
else fail('T073 private snapshot write result missing');

if (existsFile(SUMMARY_PATH)) pass('T073 live activation summary exists');
else fail('T073 live activation summary missing');

// ── Guard/attempt flags verification ──────────────────────────────────────
const applyRes = readJson(APPLY_RES_PATH);
const probeRes = readJson(PROBE_RES_PATH);
const writeRes = readJson(WRITE_RES_PATH);

// Read ATLAS markers from process.env first, then .env.runtime.local (no inline secrets required)
const liveApplyApproved  = (process.env.ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED  || runtimeEnv.ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED  || '') === 'YES';
const liveProbeApproved  = (process.env.ATLAS_T073_LIVE_PROBE_APPROVED            || runtimeEnv.ATLAS_T073_LIVE_PROBE_APPROVED            || '') === 'YES';
const liveWriteApproved  = (process.env.ATLAS_T073_PRIVATE_REVIEW_STATE_WRITE_APPROVED || runtimeEnv.ATLAS_T073_PRIVATE_REVIEW_STATE_WRITE_APPROVED || '') === 'YES';

if (!liveApplyApproved && !liveProbeApproved && !liveWriteApproved) {
  if (applyRes && applyRes.remote_apply_executed !== false) {
    fail('apply-result shows remote_apply_executed = true but live apply marker is absent');
  } else {
    pass('no live apply executed (correct)');
  }

  if (probeRes && probeRes.live_probe_attempted !== false) {
    fail('probe-result shows live_probe_attempted = true but live probe marker is absent');
  } else {
    pass('no live probe executed (correct)');
  }

  if (writeRes && writeRes.remote_write_attempted !== false) {
    fail('write-result shows remote_write_attempted = true but live write marker is absent');
  } else {
    pass('no live snapshot write executed (correct)');
  }
} else {
  pass('live markers are present, validating internal consistency...');
  if (applyRes && applyRes.live_apply_approved !== liveApplyApproved) {
    fail('apply result live_apply_approved does not match env');
  }
  if (probeRes && probeRes.live_probe_approved !== liveProbeApproved) {
    fail('probe result live_probe_approved does not match env');
  }
  if (writeRes && writeRes.live_write_approved !== liveWriteApproved) {
    fail('write result live_write_approved does not match env');
  }
}

// ── Leakage boundary checks ───────────────────────────────────────────────
const siteLeak = existsDir(path.join(ROOT, 'site', 'data', 'runtime', 'private-runtime-activation'));
if (siteLeak) fail('private-runtime-activation payload directory leaked under site/');
else pass('private-runtime-activation is outside site/ (correct)');

// Check for INC-0014
let inc0014Found = false;
walkDir(path.join(ROOT, 'data'), (file) => {
  if (file.toLowerCase().includes('inc-0014')) {
    inc0014Found = true;
  }
});
walkDir(path.join(ROOT, 'site'), (file) => {
  if (file.toLowerCase().includes('inc-0014')) {
    inc0014Found = true;
  }
});
if (inc0014Found) fail('INC-0014 found in data/ or site/ (violates strict safety constraints)');
else pass('no INC-0014 created');

// Check GitHub Pages workflow
const pagesYmlPath = path.join(ROOT, '.github', 'workflows', 'pages.yml');
const pagesYml = readText(pagesYmlPath) || '';
if (/path:\s*site/.test(pagesYml)) {
  pass('Pages workflow uploads path: site (correct)');
} else {
  fail('Pages workflow does not upload path: site');
}

// ── Final report ──────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-private-runtime-live-activation: FAILED — ' + errors + ' error(s), ' + warnings + ' warning(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-private-runtime-live-activation: PASSED\n');
  process.exit(0);
}
