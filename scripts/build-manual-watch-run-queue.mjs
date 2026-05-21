// build-manual-watch-run-queue.mjs (T060)
// Builds a deterministic private queue for a manual monitoring run.
// Reads green-source watch targets and target keywords.
// Does NOT fetch network. Does NOT run the watcher directly.
// Does NOT include raw third-party text, full HTML, or credentials.
// Output: data/ops/watch-runs/manual-queue-latest.json
//         data/ops/watch-runs/manual-queue-manifest.json

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const TARGETS_PATH  = path.join(ROOT, 'data', 'watch', 'config', 'green-source-watch-targets.json');
const KEYWORDS_PATH = path.join(ROOT, 'data', 'watch', 'config', 'target-keywords.json');
const OUT_DIR       = path.join(ROOT, 'data', 'ops', 'watch-runs');

const QUEUE_PATH    = path.join(OUT_DIR, 'manual-queue-latest.json');
const MANIFEST_PATH = path.join(OUT_DIR, 'manual-queue-manifest.json');

const BLOCKED_SOURCE_IDS = ['aiid', 'oecd', 'aiaaic'];
const ALLOWED_TIERS      = ['green'];
const BLOCKED_TIERS      = ['yellow', 'red'];

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

// ── Load config ────────────────────────────────────────────────────────────────
const targets = readJson(TARGETS_PATH);
if (!targets || !Array.isArray(targets)) {
  log('ERROR: cannot read green-source-watch-targets.json');
  process.exit(1);
}

const keywords = readJson(KEYWORDS_PATH);
if (!keywords) {
  log('ERROR: cannot read target-keywords.json');
  process.exit(1);
}

const keywordGroupCount = Object.keys(keywords).length;

// ── Build queue items ──────────────────────────────────────────────────────────
const now = new Date().toISOString();
const queueItems = [];

for (const t of targets) {
  const sourceId  = t.source_id || '';
  const riskTier  = (t.source_tier || 'unknown').toLowerCase();

  let enabled      = false;
  let blockedReason = null;

  // Check AIID/OECD/AIAAIC block
  const idLower = sourceId.toLowerCase();
  if (BLOCKED_SOURCE_IDS.some(b => idLower.includes(b))) {
    blockedReason = 'source_id matches blocked list (aiid/oecd/aiaaic)';
  } else if (BLOCKED_TIERS.includes(riskTier)) {
    blockedReason = `source_tier is "${riskTier}" — only green sources are allowed`;
  } else if (!ALLOWED_TIERS.includes(riskTier)) {
    blockedReason = `source_tier "${riskTier}" is not in allowed tiers (green)`;
  } else {
    enabled = true;
  }

  queueItems.push({
    source_id:          sourceId,
    source_name:        t.display_name || sourceId,
    risk_tier:          riskTier,
    source_url:         t.url || null,
    adapter_hint:       t.adapter || null,
    keyword_group_count: keywordGroupCount,
    enabled_for_manual_run: enabled,
    blocked_reason:     blockedReason,
  });
}

// ── Write queue ────────────────────────────────────────────────────────────────
const enabledItems  = queueItems.filter(i => i.enabled_for_manual_run);
const blockedItems  = queueItems.filter(i => !i.enabled_for_manual_run);

const queue = {
  _schema:     'caesar-atlas/ops/manual-watch-run-queue/v1',
  generated_at: now,
  queue_count:  queueItems.length,
  enabled_count: enabledItems.length,
  blocked_count: blockedItems.length,
  allowed_source_risk_tiers: ALLOWED_TIERS,
  blocked_source_risk_tiers: BLOCKED_TIERS,
  keyword_group_count: keywordGroupCount,
  items: queueItems,
};

writeJson(QUEUE_PATH, queue);
log('  manual-queue-latest.json — ' + queueItems.length + ' sources, ' + enabledItems.length + ' enabled, ' + blockedItems.length + ' blocked');

// ── Write manifest ─────────────────────────────────────────────────────────────
const manifest = {
  _schema:                   'caesar-atlas/ops/manual-watch-run-queue-manifest/v1',
  generated_at:              now,
  queue_count:               queueItems.length,
  enabled_count:             enabledItems.length,
  blocked_count:             blockedItems.length,
  allowed_source_risk_tiers: ALLOWED_TIERS,
  blocked_source_risk_tiers: BLOCKED_TIERS,
  keyword_group_count:       keywordGroupCount,
  safe_for_manual_run:       true,
  remote_write_attempted:    false,
  cron_triggered:            false,
  note:                      'Deterministic queue built from green-source-watch-targets.json. No network fetch performed.',
};

writeJson(MANIFEST_PATH, manifest);
log('  manual-queue-manifest.json');

log('\nbuild-manual-watch-run-queue: OK');
log('  queue_count: '   + queueItems.length);
log('  enabled_count: ' + enabledItems.length);
log('  blocked_count: ' + blockedItems.length);
log('  allowed_tiers: ' + ALLOWED_TIERS.join(', '));
log('  blocked_tiers: ' + BLOCKED_TIERS.join(', '));
log('  remote_write_attempted: false');
log('  cron_triggered: false');
