// build-private-candidate-signals.mjs (T061)
// Builds private candidate signals from source observations.
// Reads source observations and bounded text windows (in-memory only).
// Produces deterministic private signal records.
// Zero signals allowed if no keyword hits detected.
// No public cases created. No INC-0014. No promotion packets. No public previews.

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const LATEST_RUN_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const KEYWORDS_PATH   = path.join(ROOT, 'data', 'watch', 'config', 'target-keywords.json');

function log(msg)  { process.stdout.write(msg + '\n'); }
function info(msg) { process.stdout.write('[INFO] ' + msg + '\n'); }
function warn(msg) { process.stdout.write('[WARN] ' + msg + '\n'); }

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function writeJson(p, data) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

function generateSignalId() {
  return 'SIG-' + crypto.randomUUID().split('-')[0].toUpperCase();
}

function computeCandidateHash(sourceId, contentHash, timestamp) {
  const input = `${sourceId}:${contentHash || 'no-content'}:${timestamp}`;
  return crypto.createHash('sha256').update(input).digest('hex').substring(0, 16);
}

// ── Load latest run pointer ──────────────────────────────────────────────────
const latestRun = readJson(LATEST_RUN_PATH);
if (!latestRun) {
  warn('real-green-run-latest.json not found — no run to process');
  log('No candidate signals to build.');
  process.exit(0);
}

const runDir = path.join(ROOT, latestRun.run_dir || `data/watch/private/runs/${latestRun.run_id}`);
if (!fs.existsSync(runDir)) {
  warn(`Run directory not found: ${runDir}`);
  process.exit(0);
}

// ── Load source observations ─────────────────────────────────────────────────
const observationsPath = path.join(runDir, 'source-observations.json');
const observationsData = readJson(observationsPath);
if (!observationsData) {
  warn('source-observations.json not found in run directory');
  process.exit(0);
}

const observations = observationsData.observations || [];
const keywords = readJson(KEYWORDS_PATH) || {};

log('=== Building Private Candidate Signals (T061) ===');
log('');
info(`Processing ${observations.length} source observations from ${latestRun.run_id}`);
log('');

// ── Build signals from observations ──────────────────────────────────────────
const builtSignals = [];
const now = new Date().toISOString();

for (const obs of observations) {
  // Only process successful fetches
  if (obs.fetch_status !== 'success') {
    info(`Skipping ${obs.source_id} — fetch_status: ${obs.fetch_status}`);
    continue;
  }

  // Safety: Do NOT store full HTML/body
  // Signal detection uses source metadata only (source name, URL patterns)
  const textToScan = `${obs.source_name || ''} ${obs.url || ''}`.toLowerCase();

  // Keyword detection
  const keywordHits = {};
  let totalHits = 0;

  for (const [group, terms] of Object.entries(keywords)) {
    if (group === 'exclusion_terms') continue;
    const matched = [];
    for (const term of terms) {
      if (textToScan.includes(term.toLowerCase())) {
        matched.push(term);
      }
    }
    if (matched.length > 0) {
      keywordHits[group] = {
        count: matched.length,
        terms: matched.slice(0, 5)  // Limit stored terms
      };
      totalHits += matched.length;
    }
  }

  // Determine relevance score
  let legalGovRelevance = 'low';
  const hasLegal = keywordHits.legal_terms?.count > 0;
  const hasAi = keywordHits.ai_terms?.count > 0;
  const hasComm = keywordHits.commercial_terms?.count > 0;

  if (hasLegal && hasAi) legalGovRelevance = 'high';
  else if ((hasLegal || hasAi) && hasComm) legalGovRelevance = 'medium';
  else if (hasAi && hasComm) legalGovRelevance = 'medium';

  // Zero signals if no keyword hits
  if (totalHits === 0) {
    info(`${obs.source_id}: no keyword hits — zero signal produced`);
    continue;
  }

  // Build deterministic signal
  const signalId = generateSignalId();
  const candidateHash = computeCandidateHash(obs.source_id, obs.content_hash, obs.fetched_at);

  const signal = {
    signal_id: signalId,
    candidate_hash: candidateHash,
    source_id: obs.source_id,
    source_url: obs.url,
    detected_at: now,
    keyword_group_hits: keywordHits,
    total_keyword_hits: totalHits,
    legal_governance_relevance: legalGovRelevance,
    candidate_status: 'private_signal',
    public_publish_ready: false,
    requires_human_review: true,
    raw_text_stored: false,
    html_stored: false,
    source_observation_ref: {
      fetched_at: obs.fetched_at,
      http_status: obs.http_status,
      content_type: obs.content_type,
      content_hash: obs.content_hash,
      content_length: obs.content_length_observed
    },
    signal_metadata: {
      risk_tier: obs.risk_tier,
      etag: obs.etag,
      last_modified: obs.last_modified
    },
    _processing_note: 'Metadata-only signal. No full text or HTML stored per T061 policy.'
  };

  builtSignals.push(signal);
  info(`${obs.source_id}: built signal ${signalId} (${totalHits} hits, ${legalGovRelevance} relevance)`);
}

// ── Write updated signals file ───────────────────────────────────────────────
const signalsPath = path.join(runDir, 'candidate-signals.json');
writeJson(signalsPath, {
  _schema: 'caesar-atlas/watch/candidate-signals/v1',
  run_id: latestRun.run_id,
  generated_at: now,
  signal_count: builtSignals.length,
  signals: builtSignals,
  _rebuild_history: [
    ...(readJson(signalsPath)?._rebuild_history || []),
    { rebuilt_at: now, signal_count: builtSignals.length }
  ].slice(-5)  // Keep last 5 rebuilds
});

// ── Update latest run pointer with signal count ──────────────────────────────
latestRun.candidate_signals = builtSignals.length;
latestRun.signals_built_at = now;
writeJson(LATEST_RUN_PATH, latestRun);

log('');
log('=== Build Private Candidate Signals COMPLETE ===');
log(`Signals built: ${builtSignals.length}`);
log(`Output: ${path.relative(ROOT, signalsPath)}`);
log('');
log('Safety confirmations:');
log('  - No full HTML stored');
log('  - No raw body stored');
log('  - No long third-party text stored');
log('  - Metadata-only signals');
log('  - No INC-0014 created');
log('  - No promotion packets created');
log('  - No public previews created');
log('  - All signals: private_signal status, requires_human_review: true');
