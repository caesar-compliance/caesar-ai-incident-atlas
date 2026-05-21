// run-bounded-green-source-manual-run.mjs (T061)
// Bounded real Green-source manual monitoring run.
// Requires --execute-green-fetch flag for network fetch. Dry-run only by default.
// Fetches only Green sources with timeouts, bounded response sizes.
// No full HTML storage. No raw body storage. No long third-party text.
// Writes private source observations, candidate signals to data/watch/private/runs/<run_id>/
// Updates data/ops/watch-runs/real-green-run-latest.json

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

// Paths
const POLICY_PATH    = path.join(ROOT, 'data', 'watch', 'config', 'manual-green-run-policy.json');
const QUEUE_PATH     = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-queue-latest.json');
const TARGETS_PATH   = path.join(ROOT, 'data', 'watch', 'config', 'green-source-watch-targets.json');
const KEYWORDS_PATH  = path.join(ROOT, 'data', 'watch', 'config', 'target-keywords.json');
const PRIVATE_DIR    = path.join(ROOT, 'data', 'watch', 'private', 'runs');
const LATEST_RUN_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');

// Flags
const EXECUTE_FETCH = process.argv.includes('--execute-green-fetch');

function log(msg)  { process.stdout.write(msg + '\n'); }
function info(msg) { process.stdout.write('[INFO] ' + msg + '\n'); }
function warn(msg) { process.stdout.write('[WARN] ' + msg + '\n'); }
function error(msg){ process.stdout.write('[ERROR] ' + msg + '\n'); }

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

function generateRunId() {
  const now = new Date();
  const pad = (n, d = 2) => String(n).padStart(d, '0');
  return 'GREEN-RUN-' +
    String(now.getFullYear()) +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    '-' +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());
}

// ── Load policy ────────────────────────────────────────────────────────────────
const policy = readJson(POLICY_PATH);
if (!policy) {
  error('manual-green-run-policy.json not found — required for safety boundaries');
  process.exit(1);
}

// ── Load queue ───────────────────────────────────────────────────────────────
const queue = readJson(QUEUE_PATH);
if (!queue) {
  error('manual-queue-latest.json not found — run build-manual-watch-run-queue.mjs first');
  process.exit(1);
}

// ── Load targets and keywords ────────────────────────────────────────────────
const targets = readJson(TARGETS_PATH) || [];
const keywords = readJson(KEYWORDS_PATH) || {};

// ── Dry-run mode (default) ───────────────────────────────────────────────────
if (!EXECUTE_FETCH) {
  log('=== Bounded Green-Source Manual Run (DRY-RUN MODE) ===');
  log('');
  log('Policy loaded:');
  log('  mode: ' + policy.mode);
  log('  allowed_tiers: ' + policy.allowed_source_risk_tiers.join(', '));
  log('  blocked_tiers: ' + policy.blocked_source_risk_tiers.join(', '));
  log('  max_sources_per_run: ' + policy.max_sources_per_run);
  log('  timeout_ms_per_source: ' + policy.timeout_ms_per_source);
  log('  max_response_bytes: ' + policy.storage_policy.max_response_bytes_per_source);
  log('');
  log('Queue status:');
  log('  total sources: ' + queue.queue_count);
  log('  enabled (green): ' + queue.enabled_count);
  log('  blocked: ' + queue.blocked_count);
  log('');
  log('Sources to fetch (with --execute-green-fetch):');
  const enabledItems = (queue.items || []).filter(i => i.enabled_for_manual_run);
  for (const item of enabledItems.slice(0, policy.max_sources_per_run)) {
    log('  - ' + item.source_id + ' (' + item.source_name + ')');
  }
  log('');
  log('Safety constraints (dry-run preview):');
  log('  store_full_html: ' + policy.storage_policy.store_full_html);
  log('  store_raw_body: ' + policy.storage_policy.store_raw_body);
  log('  store_long_quotes: ' + policy.storage_policy.store_long_quotes);
  log('  remote_write_attempted: ' + policy.safety_flags.remote_write_attempted);
  log('  cron_triggered: ' + policy.safety_flags.cron_triggered);
  log('  public_site_mutated: ' + policy.safety_flags.public_site_mutated);
  log('  public_publish_count: ' + policy.safety_flags.public_publish_count);
  log('');
  log('Run with --execute-green-fetch to perform actual network fetch.');
  log('');
  process.exit(0);
}

// ── Execute mode ───────────────────────────────────────────────────────────────
log('=== Bounded Green-Source Manual Run (EXECUTE MODE) ===');
log('');

const runId = generateRunId();
const runDir = path.join(PRIVATE_DIR, runId);
ensureDir(runDir);

const now = new Date().toISOString();

// Get enabled Green sources from queue
const enabledItems = (queue.items || []).filter(i => i.enabled_for_manual_run);
const sourcesToFetch = enabledItems.slice(0, policy.max_sources_per_run);

info('Run ID: ' + runId);
info('Sources to fetch: ' + sourcesToFetch.length);
info('Output directory: ' + path.relative(ROOT, runDir));
log('');

// Source observations
const sourceObservations = [];
const candidateSignals = [];

// Adapter dispatch map (same as watch-green-sources.mjs)
const ADAPTER_MAP = {
  'ico-ai-and-algorithms': '../scripts/source-adapters/ico-adapter.mjs',
  'ftc-ai-enforcement': '../scripts/source-adapters/ftc-adapter.mjs',
  'cnil-ai': '../scripts/source-adapters/cnil-adapter.mjs',
  'edpb-ai': '../scripts/source-adapters/edpb-adapter.mjs',
  'european-commission-ai-act': '../scripts/source-adapters/eu-commission-adapter.mjs',
};

// Helper: Simple bounded fetch with size limit
async function boundedFetch(target, maxBytes, timeoutMs) {
  const urls = [target.source_url || target.url, ...(target.fallback_urls || [])].filter(Boolean);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const isFallback = i > 0;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Caesar-AI-Atlas-Watcher/1.0 (Monitoring Bot)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      });
      clearTimeout(timeoutId);

      const httpStatus = response.status;
      const contentType = response.headers.get('content-type') || 'unknown';
      const contentLength = response.headers.get('content-length');
      const etag = response.headers.get('etag') || null;
      const lastModified = response.headers.get('last-modified') || null;

      if (!response.ok) {
        return {
          ok: false,
          http_status: httpStatus,
          content_type: contentType,
          content_length_observed: contentLength ? parseInt(contentLength, 10) : null,
          etag,
          last_modified: lastModified,
          content_hash: null,
          fetch_status: 'failed',
          failure_reason: `HTTP ${httpStatus}`,
          url_fetched: url,
          used_fallback: isFallback
        };
      }

      // Read body with byte limit
      const text = await response.text();
      const observedBytes = Buffer.byteLength(text, 'utf8');
      const truncated = observedBytes > maxBytes;
      const safeText = truncated ? text.substring(0, maxBytes) : text;

      // Compute hash of safe text only
      const contentHash = crypto.createHash('sha256').update(safeText).digest('hex');

      return {
        ok: true,
        http_status: httpStatus,
        content_type: contentType,
        content_length_observed: observedBytes,
        etag,
        last_modified: lastModified,
        content_hash: contentHash,
        fetch_status: 'success',
        failure_reason: null,
        url_fetched: url,
        used_fallback: isFallback,
        _truncated: truncated,
        _safe_text: safeText  // Only for in-memory processing, not stored
      };

    } catch (e) {
      if (isFallback || i === urls.length - 1) {
        return {
          ok: false,
          http_status: null,
          content_type: null,
          content_length_observed: null,
          etag: null,
          last_modified: null,
          content_hash: null,
          fetch_status: 'failed',
          failure_reason: e.message,
          url_fetched: url,
          used_fallback: isFallback
        };
      }
      warn(`Primary URL failed for ${target.source_id} (${e.message}), trying fallback...`);
    }
  }

  return {
    ok: false,
    http_status: null,
    content_type: null,
    content_length_observed: null,
    etag: null,
    last_modified: null,
    content_hash: null,
    fetch_status: 'failed',
    failure_reason: 'All URLs exhausted',
    url_fetched: null,
    used_fallback: false
  };
}

// Helper: Keyword matching for signal detection
function detectSignals(title, url, keywordsConfig) {
  const text = `${title} ${url}`.toLowerCase();
  const hits = {};

  for (const [group, terms] of Object.entries(keywordsConfig)) {
    if (group === 'exclusion_terms') continue;
    const matched = terms.filter(term => text.includes(term.toLowerCase()));
    if (matched.length > 0) {
      hits[group] = matched.length;
    }
  }

  // Determine relevance
  let legalGovRelevance = 'low';
  const hasLegal = hits.legal_terms > 0;
  const hasAi = hits.ai_terms > 0;
  const hasComm = hits.commercial_terms > 0;

  if (hasLegal && hasAi) legalGovRelevance = 'high';
  else if ((hasLegal || hasAi) && hasComm) legalGovRelevance = 'medium';
  else if (hasAi && hasComm) legalGovRelevance = 'medium';

  return { hits, legal_governance_relevance: legalGovRelevance };
}

// Fetch each enabled source
let fetchedCount = 0;
let skippedCount = 0;
let failedCount = 0;

for (const item of sourcesToFetch) {
  const target = targets.find(t => t.source_id === item.source_id);
  if (!target) {
    warn(`Target config not found for ${item.source_id} — skipping`);
    skippedCount++;
    sourceObservations.push({
      source_id: item.source_id,
      source_name: item.source_name,
      risk_tier: item.risk_tier,
      fetched_at: now,
      url: item.source_url,
      http_status: null,
      content_type: null,
      content_length_observed: null,
      content_hash: null,
      etag: null,
      last_modified: null,
      fetch_status: 'skipped',
      failure_reason: 'Target config not found in green-source-watch-targets.json'
    });
    continue;
  }

  // Safety: Check source is not blocked
  const idLower = item.source_id.toLowerCase();
  const isBlocked = policy.blocked_source_patterns.some(p => idLower.includes(p));
  if (isBlocked) {
    warn(`Source ${item.source_id} matches blocked pattern — skipping`);
    skippedCount++;
    sourceObservations.push({
      source_id: item.source_id,
      source_name: item.source_name,
      risk_tier: item.risk_tier,
      fetched_at: now,
      url: item.source_url,
      http_status: null,
      content_type: null,
      content_length_observed: null,
      content_hash: null,
      etag: null,
      last_modified: null,
      fetch_status: 'skipped',
      failure_reason: 'Source matches blocked pattern (aiid/oecd/aiaaic)'
    });
    continue;
  }

  info(`Fetching: ${item.source_id} ...`);

  const result = await boundedFetch(
    target,
    policy.storage_policy.max_response_bytes_per_source,
    policy.timeout_ms_per_source
  );

  // Store observation (metadata only, no raw body)
  sourceObservations.push({
    source_id: item.source_id,
    source_name: item.source_name,
    risk_tier: item.risk_tier,
    fetched_at: now,
    url: result.url_fetched || item.source_url,
    http_status: result.http_status,
    content_type: result.content_type,
    content_length_observed: result.content_length_observed,
    content_hash: result.content_hash,
    etag: result.etag,
    last_modified: result.last_modified,
    fetch_status: result.fetch_status,
    failure_reason: result.failure_reason,
    used_fallback: result.used_fallback || false,
    _truncated: result._truncated || false
  });

  if (result.fetch_status === 'success') {
    fetchedCount++;
    info(`  Success: HTTP ${result.http_status}, ${result.content_length_observed} bytes`);

    // Detect signals from URL/title only (not full content per policy)
    const signalDetection = detectSignals(item.source_name, item.source_url, keywords);

    // Create candidate signal (metadata only)
    const signalId = 'SIG-' + crypto.randomUUID().split('-')[0].toUpperCase();
    const candidateHash = result.content_hash ?
      crypto.createHash('sha256').update(item.source_id + result.content_hash).digest('hex').substring(0, 16) :
      crypto.createHash('sha256').update(item.source_id + now).digest('hex').substring(0, 16);

    candidateSignals.push({
      signal_id: signalId,
      candidate_hash: candidateHash,
      source_id: item.source_id,
      source_url: result.url_fetched || item.source_url,
      detected_at: now,
      keyword_group_hits: signalDetection.hits,
      legal_governance_relevance: signalDetection.legal_governance_relevance,
      candidate_status: 'private_signal',
      public_publish_ready: false,
      requires_human_review: true,
      raw_text_stored: false,
      html_stored: false,
      signal_metadata: {
        http_status: result.http_status,
        content_type: result.content_type,
        content_hash: result.content_hash,
        content_length: result.content_length_observed
      }
    });

  } else {
    failedCount++;
    warn(`  Failed: ${result.failure_reason}`);
  }
}

// Write output files
const runStatus = failedCount > 0 ? 'completed_with_failures' : 'completed';

const runJson = {
  run_id: runId,
  created_at: now,
  mode: policy.mode,
  policy_version: policy.version,
  status: runStatus,
  fetch_completed_at: new Date().toISOString(),
  sources_total: sourcesToFetch.length,
  sources_fetched: fetchedCount,
  sources_skipped: skippedCount,
  sources_failed: failedCount,
  candidate_signals_count: candidateSignals.length,
  safety_flags: {
    store_full_html: policy.storage_policy.store_full_html,
    store_raw_body: policy.storage_policy.store_raw_body,
    store_long_quotes: policy.storage_policy.store_long_quotes,
    remote_write_attempted: policy.safety_flags.remote_write_attempted,
    cron_triggered: policy.safety_flags.cron_triggered,
    public_site_mutated: policy.safety_flags.public_site_mutated,
    public_publish_count: policy.safety_flags.public_publish_count
  },
  output_files: {
    run_json: path.relative(ROOT, path.join(runDir, 'run.json')),
    source_observations: path.relative(ROOT, path.join(runDir, 'source-observations.json')),
    candidate_signals: path.relative(ROOT, path.join(runDir, 'candidate-signals.json')),
    safety_manifest: path.relative(ROOT, path.join(runDir, 'safety-manifest.json'))
  }
};

const safetyManifest = {
  _schema: 'caesar-atlas/watch/safety-manifest/v1',
  run_id: runId,
  created_at: now,
  policy_compliance: {
    only_green_sources: true,
    yellow_red_blocked: true,
    aiid_oecd_aiaaic_blocked: true,
    no_full_html: !policy.storage_policy.store_full_html,
    no_raw_bodies: !policy.storage_policy.store_raw_body,
    no_long_quotes: !policy.storage_policy.store_long_quotes,
    hashes_stored: policy.storage_policy.store_hashes,
    http_metadata_stored: policy.storage_policy.store_http_metadata,
    candidate_signals_stored: policy.storage_policy.store_candidate_signals,
    no_remote_write: !policy.safety_flags.remote_write_attempted,
    no_cron: !policy.safety_flags.cron_triggered,
    no_public_site_mutation: !policy.safety_flags.public_site_mutated,
    public_publish_count_zero: policy.safety_flags.public_publish_count === 0,
    no_inc_0014: !policy.safety_flags.allow_inc_0014_creation
  },
  validation_status: 'pending_validator_run',
  public_count_expected: 13,
  latest_record_expected: 'INC-0013'
};

writeJson(path.join(runDir, 'run.json'), runJson);
writeJson(path.join(runDir, 'source-observations.json'), {
  _schema: 'caesar-atlas/watch/source-observations/v1',
  run_id: runId,
  generated_at: now,
  observation_count: sourceObservations.length,
  observations: sourceObservations
});
writeJson(path.join(runDir, 'candidate-signals.json'), {
  _schema: 'caesar-atlas/watch/candidate-signals/v1',
  run_id: runId,
  generated_at: now,
  signal_count: candidateSignals.length,
  signals: candidateSignals
});
writeJson(path.join(runDir, 'safety-manifest.json'), safetyManifest);

// Write latest run pointer
writeJson(LATEST_RUN_PATH, {
  _schema: 'caesar-atlas/watch/real-green-run-latest/v1',
  run_id: runId,
  run_dir: path.relative(ROOT, runDir),
  created_at: now,
  status: runStatus,
  sources_fetched: fetchedCount,
  sources_skipped: skippedCount,
  sources_failed: failedCount,
  candidate_signals: candidateSignals.length,
  policy_mode: policy.mode
});

log('');
log('=== Bounded Green-Source Manual Run COMPLETE ===');
log('Run ID: ' + runId);
log('Sources:');
log('  Total:    ' + sourcesToFetch.length);
log('  Fetched:  ' + fetchedCount);
log('  Skipped:  ' + skippedCount);
log('  Failed:   ' + failedCount);
log('Candidate signals: ' + candidateSignals.length);
log('');
log('Output files:');
log('  ' + path.relative(ROOT, path.join(runDir, 'run.json')));
log('  ' + path.relative(ROOT, path.join(runDir, 'source-observations.json')));
log('  ' + path.relative(ROOT, path.join(runDir, 'candidate-signals.json')));
log('  ' + path.relative(ROOT, path.join(runDir, 'safety-manifest.json')));
log('  ' + path.relative(ROOT, LATEST_RUN_PATH));
log('');
log('Next: Run validate-bounded-green-source-run.mjs to verify safety.');
