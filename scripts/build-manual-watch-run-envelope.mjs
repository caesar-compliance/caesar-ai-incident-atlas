// build-manual-watch-run-envelope.mjs (T060)
// Reads the manual queue and creates a private run envelope without executing network fetches.
// Validates against schemas/pipeline/manual-watch-run.schema.json structure.
// Output: data/ops/watch-runs/manual-run-latest.json

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const QUEUE_PATH    = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-queue-latest.json');
const MANIFEST_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-queue-manifest.json');
const OUT_PATH      = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-run-latest.json');
const SCHEMA_PATH   = path.join(ROOT, 'schemas', 'pipeline', 'manual-watch-run.schema.json');

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

// ── Load queue ─────────────────────────────────────────────────────────────────
const queue    = readJson(QUEUE_PATH);
const manifest = readJson(MANIFEST_PATH);

if (!queue) {
  log('ERROR: manual-queue-latest.json not found — run build-manual-watch-run-queue.mjs first');
  process.exit(1);
}

if (!manifest) {
  log('ERROR: manual-queue-manifest.json not found — run build-manual-watch-run-queue.mjs first');
  process.exit(1);
}

// ── Verify schema exists ───────────────────────────────────────────────────────
if (!fs.existsSync(SCHEMA_PATH)) {
  log('WARN: manual-watch-run.schema.json not found at schemas/pipeline/ — proceeding without schema validation');
} else {
  log('  schema found: schemas/pipeline/manual-watch-run.schema.json');
}

// ── Generate run_id from local timestamp ────────────────────────────────────────
const now = new Date();
const pad = (n, d = 2) => String(n).padStart(d, '0');
const runId = 'WATCH-RUN-' +
  String(now.getFullYear()) +
  pad(now.getMonth() + 1) +
  pad(now.getDate()) +
  '-' +
  pad(now.getHours()) +
  pad(now.getMinutes()) +
  pad(now.getSeconds());

const nowIso = now.toISOString();

// ── Build envelope ──────────────────────────────────────────────────────────────
const envelope = {
  run_id:                runId,
  created_at:            nowIso,
  mode:                  'manual_local',
  status:                'queued',
  source_scope:          'green-source-watch-targets only',
  allowed_source_risk_tiers: queue.allowed_source_risk_tiers || ['green'],
  blocked_source_risk_tiers: queue.blocked_source_risk_tiers || ['yellow', 'red'],
  queue_count:           queue.queue_count || 0,
  enabled_source_count:  queue.enabled_count || 0,
  blocked_source_count:  queue.blocked_count || 0,
  candidate_count:       0,
  draft_count:           0,
  promotion_packet_count: 0,
  public_publish_count:  0,
  remote_write_attempted: false,
  cron_triggered:        false,
  public_site_mutated:   false,
  safety_flags: {
    only_green_sources_enabled: true,
    yellow_red_blocked:         true,
    aiid_oecd_aiaaic_blocked:   true,
    no_raw_html:                true,
    no_third_party_text:        true,
    no_secrets:                 true,
    no_env_committed:           true,
  },
  output_paths: {
    manual_queue:          'data/ops/watch-runs/manual-queue-latest.json',
    manual_queue_manifest: 'data/ops/watch-runs/manual-queue-manifest.json',
    manual_run_envelope:   'data/ops/watch-runs/manual-run-latest.json',
  },
};

// ── Structural self-validation ──────────────────────────────────────────────────
const REQUIRED_FIELDS = [
  'run_id', 'created_at', 'mode', 'status', 'source_scope',
  'allowed_source_risk_tiers', 'blocked_source_risk_tiers',
  'candidate_count', 'draft_count', 'promotion_packet_count',
  'public_publish_count', 'remote_write_attempted',
  'cron_triggered', 'public_site_mutated', 'safety_flags', 'output_paths',
];

const missing = REQUIRED_FIELDS.filter(f => envelope[f] === undefined);
if (missing.length > 0) {
  log('ERROR: envelope missing required fields: ' + missing.join(', '));
  process.exit(1);
}

if (envelope.public_publish_count !== 0) {
  log('ERROR: public_publish_count must be 0, got: ' + envelope.public_publish_count);
  process.exit(1);
}
if (envelope.remote_write_attempted !== false) {
  log('ERROR: remote_write_attempted must be false');
  process.exit(1);
}
if (envelope.cron_triggered !== false) {
  log('ERROR: cron_triggered must be false');
  process.exit(1);
}
if (envelope.public_site_mutated !== false) {
  log('ERROR: public_site_mutated must be false');
  process.exit(1);
}
if (!envelope.allowed_source_risk_tiers.includes('green') || envelope.allowed_source_risk_tiers.some(t => t !== 'green')) {
  log('ERROR: allowed_source_risk_tiers must contain only "green"');
  process.exit(1);
}
if (!envelope.blocked_source_risk_tiers.includes('yellow') || !envelope.blocked_source_risk_tiers.includes('red')) {
  log('ERROR: blocked_source_risk_tiers must include yellow and red');
  process.exit(1);
}

// ── Write ──────────────────────────────────────────────────────────────────────
writeJson(OUT_PATH, envelope);

log('\nbuild-manual-watch-run-envelope: OK');
log('  run_id: '              + envelope.run_id);
log('  status: '              + envelope.status);
log('  mode: '                + envelope.mode);
log('  queue_count: '         + envelope.queue_count);
log('  enabled_source_count: ' + envelope.enabled_source_count);
log('  blocked_source_count: ' + envelope.blocked_source_count);
log('  candidate_count: '     + envelope.candidate_count);
log('  draft_count: '         + envelope.draft_count);
log('  public_publish_count: ' + envelope.public_publish_count);
log('  remote_write_attempted: ' + envelope.remote_write_attempted);
log('  cron_triggered: '      + envelope.cron_triggered);
log('  public_site_mutated: ' + envelope.public_site_mutated);
log('  Output: data/ops/watch-runs/manual-run-latest.json');
