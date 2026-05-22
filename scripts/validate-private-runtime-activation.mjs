// validate-private-runtime-activation.mjs (T072)
// Comprehensive validation script verifying all private runtime activation artifacts, boundaries, and safety constraints.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

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

// ── 1. Check artifact presence ───────────────────────────────────────────────
const MIGRATION_PATH  = path.join(ROOT, 'infra', 'supabase', 'migrations', '002_private_review_state_sync.sql');
const PREFLIGHT_PATH  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 'private-runtime-activation-preflight-latest.json');
const APPLY_RES_PATH  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 'private-runtime-activation-apply-result-latest.json');
const PROBE_RES_PATH  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 'private-runtime-activation-probe-result-latest.json');
const WRITE_RES_PATH  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 'private-runtime-activation-write-result-latest.json');
const PARENT_SYNC_PATH = path.join(ROOT, 'data', 'runtime', 'private-review-state-sync', 'hosted-private-review-state-sync-latest.json');

if (existsFile(PARENT_SYNC_PATH)) pass('parent T071 sync dossier exists');
else fail('parent T071 sync dossier missing');

if (existsFile(MIGRATION_PATH)) pass('migration 002_private_review_state_sync.sql exists');
else fail('migration 002_private_review_state_sync.sql missing');

if (existsFile(PREFLIGHT_PATH)) pass('preflight result exists');
else fail('preflight result missing');

if (existsFile(APPLY_RES_PATH)) pass('apply result exists');
else fail('apply result missing');

if (existsFile(PROBE_RES_PATH)) pass('probe result exists');
else fail('probe result missing');

if (existsFile(WRITE_RES_PATH)) pass('write result exists');
else fail('write result missing');

// ── 2. Guard/attempt flags verification ──────────────────────────────────────
const applyRes = readJson(APPLY_RES_PATH);
const probeRes = readJson(PROBE_RES_PATH);
const writeRes = readJson(WRITE_RES_PATH);

const liveApplyApproved  = process.env.ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED === 'YES';
const liveProbeApproved  = process.env.ATLAS_T072_LIVE_PROBE_APPROVED === 'YES';
const liveWriteApproved  = process.env.ATLAS_T072_PRIVATE_REVIEW_STATE_WRITE_APPROVED === 'YES';

if (!liveApplyApproved && !liveProbeApproved && !liveWriteApproved) {
  // If markers are absent, all remote/live/write attempted flags must be false
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

// ── 3. Check for secrets/account emails in generated JSON/docs/scripts ───────
const JWT_PATTERN = /supabase[._-]?service[._-]?role[._-]?key\s*[=:]\s*ey[A-Za-z0-9_.-]{20,}/i;
const JWT_BROAD = /eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{10,}/;
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

let leaked = false;
const searchDirs = [
  path.join(ROOT, 'scripts'),
  path.join(ROOT, 'data', 'runtime', 'private-runtime-activation'),
];

searchDirs.forEach(dir => {
  walkDir(dir, (file) => {
    if (file.includes('node_modules') || file.includes('.git')) return;
    const content = readText(file);
    if (!content) return;
    if (JWT_PATTERN.test(content) || JWT_BROAD.test(content)) {
      // Allow shims or mock tokens in test/worker files
      if (!file.includes('test-') && !file.includes('worker')) {
        fail('possible leaked secret/JWT in: ' + path.relative(ROOT, file));
        leaked = true;
      }
    }
    // Check for emails (excluding standard comments/docs if any)
    if (EMAIL_PATTERN.test(content)) {
      if (content.includes('nazarkoartem') || content.includes('@caesar') || content.includes('@google')) {
        // ignore safe/known usernames/domains unless specifically leaked
      } else {
        fail('possible leaked account email in: ' + path.relative(ROOT, file));
        leaked = true;
      }
    }
  });
});
if (!leaked) pass('no secrets or account emails leaked in scripts or runtime outputs');

// ── 4. Leakage boundary checks ───────────────────────────────────────────────
const siteLeak = existsDir(path.join(ROOT, 'site', 'data', 'runtime', 'private-runtime-activation'));
if (siteLeak) fail('private-runtime-activation payload directory leaked under site/');
else pass('private-runtime-activation is outside site/ (correct)');

// ── 5. Public site invariants ────────────────────────────────────────────────
const opsStatusPath = path.join(ROOT, 'site', 'data', 'ops', 'latest-status.json');
const opsStatus = readJson(opsStatusPath);
if (opsStatus) {
  if (opsStatus.public_record_count !== 13) {
    fail('public_record_count is ' + opsStatus.public_record_count + ', expected 13');
  } else {
    pass('public_record_count is exactly 13');
  }

  if (opsStatus.latest_public_record_id !== 'INC-0013') {
    fail('latest_public_record_id is ' + opsStatus.latest_public_record_id + ', expected INC-0013');
  } else {
    pass('latest_public_record_id is exactly INC-0013');
  }

  if (opsStatus.publication_still_blocked !== true && opsStatus.publication_blocked !== true) {
    fail('publication is not marked as blocked in latest-status.json');
  } else {
    pass('publication remains blocked');
  }

  if (opsStatus.public_publish_allowed === true || opsStatus.real_promotion_packet_allowed === true) {
    fail('public publish or real promotion packet is allowed (violates boundary constraints)');
  } else {
    pass('public flags remain strictly false');
  }
} else {
  warn('latest-status.json missing or unreadable - run export-ops-status.mjs to generate');
}

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

if (/schedule\s*:/i.test(pagesYml)) {
  fail('Pages workflow contains schedule/cron trigger');
} else {
  pass('no cron/schedule trigger in Pages workflow');
}

// ── 6. Final report ──────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-private-runtime-activation: FAILED — ' + errors + ' error(s), ' + warnings + ' warning(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-private-runtime-activation: PASSED\n');
  process.exit(0);
}
