// validate-manual-watch-run.mjs (T060)
// Validates the manual watch run queue, envelope, and hosted payloads.
// Checks all safety constraints: no secrets, no INC-0014, no remote write, etc.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

let errors   = 0;
let warnings = 0;

function pass(msg)  { process.stdout.write('OK:   ' + msg + '\n'); }
function fail(msg)  { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }
function warn(msg)  { process.stdout.write('WARN: ' + msg + '\n'); warnings++; }

function readText(p) {
  try { return fs.readFileSync(p, 'utf8'); }
  catch { return null; }
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function existsFile(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isFile(); }
  catch { return false; }
}

function existsDir(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isDirectory(); }
  catch { return false; }
}

function walkDir(dir, cb) {
  if (!existsDir(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, cb);
    else cb(full);
  }
}

// ── 1. Schema file exists ──────────────────────────────────────────────────────
const schemaPath = path.join(ROOT, 'schemas', 'pipeline', 'manual-watch-run.schema.json');
if (existsFile(schemaPath)) {
  const schema = readJson(schemaPath);
  if (!schema || schema.$id !== 'caesar-atlas/pipeline/manual-watch-run/v1') {
    fail('manual-watch-run.schema.json exists but has unexpected $id');
  } else {
    pass('schemas/pipeline/manual-watch-run.schema.json exists with correct $id');
  }
} else {
  fail('schemas/pipeline/manual-watch-run.schema.json not found');
}

// ── 2. Queue files exist ───────────────────────────────────────────────────────
const queuePath    = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-queue-latest.json');
const manifestPath = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-queue-manifest.json');

if (existsFile(queuePath)) {
  pass('data/ops/watch-runs/manual-queue-latest.json exists');
} else {
  fail('data/ops/watch-runs/manual-queue-latest.json not found — run build-manual-watch-run-queue.mjs');
}

if (existsFile(manifestPath)) {
  pass('data/ops/watch-runs/manual-queue-manifest.json exists');
} else {
  fail('data/ops/watch-runs/manual-queue-manifest.json not found');
}

// ── 3. Run envelope exists ─────────────────────────────────────────────────────
const envelopePath = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-run-latest.json');
if (existsFile(envelopePath)) {
  pass('data/ops/watch-runs/manual-run-latest.json exists');
} else {
  fail('data/ops/watch-runs/manual-run-latest.json not found — run build-manual-watch-run-envelope.mjs');
}

// ── 4. Hosted payload files exist ─────────────────────────────────────────────
const runPayloadPath   = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-watch-run.manual-latest.json');
const queuePayloadPath = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-watch-run-queue.manual-latest.json');

if (existsFile(runPayloadPath)) {
  pass('data/ops/supabase/atlas-watch-run.manual-latest.json exists');
} else {
  fail('data/ops/supabase/atlas-watch-run.manual-latest.json not found — run export-hosted-watch-run-payloads.mjs');
}

if (existsFile(queuePayloadPath)) {
  pass('data/ops/supabase/atlas-watch-run-queue.manual-latest.json exists');
} else {
  fail('data/ops/supabase/atlas-watch-run-queue.manual-latest.json not found');
}

// ── 5. Queue: only green sources enabled ──────────────────────────────────────
const queue = readJson(queuePath);
if (queue) {
  const enabledItems = (queue.items || []).filter(i => i.enabled_for_manual_run === true);
  const nonGreenEnabled = enabledItems.filter(i => i.risk_tier !== 'green');
  if (nonGreenEnabled.length > 0) {
    fail('Queue has non-green sources enabled: ' + nonGreenEnabled.map(i => i.source_id).join(', '));
  } else {
    pass('All enabled queue items are green-tier');
  }

  // ── 6. Yellow/red blocked ────────────────────────────────────────────────────
  const blockedTiers = queue.blocked_source_risk_tiers || [];
  if (blockedTiers.includes('yellow') && blockedTiers.includes('red')) {
    pass('blocked_source_risk_tiers includes yellow and red');
  } else {
    fail('blocked_source_risk_tiers must include yellow and red, got: ' + JSON.stringify(blockedTiers));
  }

  // ── 7. AIID/OECD/AIAAIC blocked ─────────────────────────────────────────────
  const blockedSrcIds = ['aiid', 'oecd', 'aiaaic'];
  const leakedBlocked = (queue.items || [])
    .filter(i => {
      const id = (i.source_id || '').toLowerCase();
      return blockedSrcIds.some(b => id.includes(b)) && i.enabled_for_manual_run === true;
    });
  if (leakedBlocked.length > 0) {
    fail('AIID/OECD/AIAAIC source(s) are enabled in queue: ' + leakedBlocked.map(i => i.source_id).join(', '));
  } else {
    pass('AIID/OECD/AIAAIC sources correctly blocked from queue');
  }

  // ── Manifest safety flags ────────────────────────────────────────────────────
  const mf = readJson(manifestPath);
  if (mf) {
    if (mf.remote_write_attempted === false) {
      pass('manifest: remote_write_attempted = false');
    } else {
      fail('manifest: remote_write_attempted is not false');
    }
    if (mf.cron_triggered === false) {
      pass('manifest: cron_triggered = false');
    } else {
      fail('manifest: cron_triggered is not false');
    }
    if (mf.safe_for_manual_run === true) {
      pass('manifest: safe_for_manual_run = true');
    } else {
      fail('manifest: safe_for_manual_run is not true');
    }
  }
}

// ── 8. Envelope safety flags ──────────────────────────────────────────────────
const envelope = readJson(envelopePath);
if (envelope) {
  if (envelope.remote_write_attempted === false) {
    pass('envelope: remote_write_attempted = false');
  } else {
    fail('envelope: remote_write_attempted is not false');
  }
  if (envelope.cron_triggered === false) {
    pass('envelope: cron_triggered = false');
  } else {
    fail('envelope: cron_triggered is not false');
  }
  if (envelope.public_site_mutated === false) {
    pass('envelope: public_site_mutated = false');
  } else {
    fail('envelope: public_site_mutated is not false');
  }
  if (envelope.public_publish_count === 0) {
    pass('envelope: public_publish_count = 0');
  } else {
    fail('envelope: public_publish_count is not 0, got: ' + envelope.public_publish_count);
  }
  if (envelope.mode === 'manual_local') {
    pass('envelope: mode = manual_local');
  } else {
    fail('envelope: mode is not manual_local, got: ' + envelope.mode);
  }
  if (envelope.status === 'queued') {
    pass('envelope: status = queued');
  } else {
    warn('envelope: status is not queued, got: ' + envelope.status);
  }
}

// ── 9. No raw HTML in watch-runs outputs ──────────────────────────────────────
const HTML_PATTERN = /<!DOCTYPE html/i;
const watchRunsDir = path.join(ROOT, 'data', 'ops', 'watch-runs');
let rawHtmlFound = false;
walkDir(watchRunsDir, (file) => {
  const content = readText(file);
  if (content && HTML_PATTERN.test(content)) {
    fail('Raw HTML found in watch-runs output: ' + path.relative(ROOT, file));
    rawHtmlFound = true;
  }
});
if (!rawHtmlFound) pass('No raw HTML in data/ops/watch-runs/');

// ── 10. No long third-party text bodies (>5000 chars in a single string field) ─
const LONG_TEXT_THRESHOLD = 5000;
if (envelope) {
  const envelopeStr = JSON.stringify(envelope);
  const matches = envelopeStr.match(/"[^"]{5001,}"/g);
  if (matches && matches.length > 0) {
    fail('Envelope contains long text strings (possibly third-party content). Fields: ' + matches.length);
  } else {
    pass('Envelope contains no unexpectedly long text strings');
  }
}

// ── 11. No secrets in ops/watch-runs outputs ─────────────────────────────────
const JWT_PATTERN = /eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{10,}/;
const KEY_PATTERN = /supabase[._-]?service[._-]?role[._-]?key\s*[=:]\s*ey[A-Za-z0-9_.-]{20,}/i;
let secretFound = false;
walkDir(watchRunsDir, (file) => {
  const content = readText(file);
  if (content && (JWT_PATTERN.test(content) || KEY_PATTERN.test(content))) {
    fail('Possible secret/JWT found in: ' + path.relative(ROOT, file));
    secretFound = true;
  }
});
if (!secretFound) pass('No secrets/JWTs in data/ops/watch-runs/');

// ── 12. No .env committed ─────────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env');
if (existsFile(envPath)) {
  fail('.env file exists at repo root — must not be committed');
} else {
  pass('No .env file at repo root');
}

// ── 13. No remote write marker in envelope/payloads ───────────────────────────
const runPayload = readJson(runPayloadPath);
if (runPayload) {
  if (runPayload.remote_write_attempted === false) {
    pass('run payload: remote_write_attempted = false');
  } else {
    fail('run payload: remote_write_attempted is not false');
  }
  if (runPayload.cron_triggered === false) {
    pass('run payload: cron_triggered = false');
  } else {
    fail('run payload: cron_triggered is not false');
  }
}

// ── 14. Public count remains 13 ───────────────────────────────────────────────
const incIndexPath = path.join(ROOT, 'data', 'incident-index.json');
const incIndex = readJson(incIndexPath);
if (incIndex) {
  const count = (incIndex.incidents || []).length;
  if (count === 13) {
    pass('public record count = 13 (unchanged)');
  } else {
    fail('public record count = ' + count + ', expected 13');
  }
  const ids = (incIndex.incidents || []).map(i => i.incident_id).sort();
  const latest = ids[ids.length - 1];
  if (latest === 'INC-0013') {
    pass('latest public record = INC-0013');
  } else {
    fail('latest public record = ' + latest + ', expected INC-0013');
  }
}

// ── 15. No INC-0014 ───────────────────────────────────────────────────────────
let inc0014Found = false;
[path.join(ROOT, 'data'), path.join(ROOT, 'site', 'data')].forEach(dir => {
  walkDir(dir, (file) => {
    const basename = path.basename(file);
    if (basename.includes('INC-0014') || basename.includes('inc-0014')) {
      fail('INC-0014 found: ' + path.relative(ROOT, file));
      inc0014Found = true;
    }
  });
});
if (!inc0014Found) pass('No INC-0014 in data/ or site/data/');

// ── 16. site/ does not include private watch-runs or supabase payloads ─────────
const siteWatchRunsDir  = path.join(ROOT, 'site', 'data', 'ops', 'watch-runs');
const siteSupabaseDir   = path.join(ROOT, 'site', 'data', 'ops', 'supabase');
const siteManualRunPath = path.join(ROOT, 'site', 'data', 'ops', 'supabase', 'atlas-watch-run.manual-latest.json');

if (existsDir(siteWatchRunsDir)) {
  fail('site/data/ops/watch-runs/ exists — private watch-run data must not be in public site');
} else {
  pass('site/data/ops/watch-runs/ not present in public site (correct)');
}

if (existsDir(siteSupabaseDir)) {
  fail('site/data/ops/supabase/ exists — Supabase payloads must not be in public site');
} else {
  pass('site/data/ops/supabase/ not present in public site (correct)');
}

if (existsFile(siteManualRunPath)) {
  fail('atlas-watch-run.manual-latest.json found in site/ — must stay private');
} else {
  pass('Manual watch-run payload not exposed in site/');
}

// ── Final ──────────────────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-manual-watch-run: FAILED — ' + errors + ' error(s), ' + warnings + ' warning(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-manual-watch-run: PASSED' + (warnings > 0 ? ' with ' + warnings + ' warning(s)' : '') + '\n');
}
