// export-ops-status.mjs (T056)
// Reads public incident index + latest watcher run artifacts.
// Writes sanitised ops status JSON to data/ops/ and site/data/ops/.
// Safety: no candidates/drafts/packets/previews/secrets leaked into output.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const INCIDENT_INDEX_PATH  = path.join(ROOT, 'data', 'incident-index.json');
const WATCH_RUNS_DIR        = path.join(ROOT, 'data', 'watch', 'runs');
const SHORTLIST_PATH        = path.join(ROOT, 'data', 'candidates', 'case-shortlist.json');
const QUALITY_REPORT_PATH   = path.join(ROOT, 'data', 'watch', 'runs', 'latest-candidate-quality-report.json');

const OUT_DIRS = [
  path.join(ROOT, 'data', 'ops'),
  path.join(ROOT, 'site', 'data', 'ops'),
];

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

function safeLog(msg) { process.stdout.write(msg + '\n'); }

// ── Read incident index ───────────────────────────────────────────────────
const index = readJson(INCIDENT_INDEX_PATH);
if (!index) {
  safeLog('ERROR: Could not read incident-index.json');
  process.exit(1);
}
const publicRecordCount = (index.incidents || []).length;
const sortedIds = (index.incidents || []).map(i => i.incident_id).sort();
const latestPublicRecordId = sortedIds[sortedIds.length - 1] || null;

// ── Read latest watch summary ─────────────────────────────────────────────
const watchSummaryPath = path.join(WATCH_RUNS_DIR, 'latest-watch-summary.json');
const watchSummary = readJson(watchSummaryPath);

// ── Read quality report for candidate count summary ───────────────────────
const qualityReport = readJson(QUALITY_REPORT_PATH);
let candidateCountSummary = null;
let caseQualityReadyCount = 0;
if (qualityReport) {
  const summary = qualityReport.summary || {};
  candidateCountSummary = {
    total:         summary.total_evaluated  || qualityReport.total_evaluated || 0,
    case_quality:  summary.case_quality     || qualityReport.case_quality_count || 0,
    monitor:       summary.monitor          || qualityReport.monitor_count || 0,
    noise:         summary.noise            || qualityReport.noise_count || 0,
  };
  caseQualityReadyCount = candidateCountSummary.case_quality;
}

// ── Read shortlist for source count ──────────────────────────────────────
const shortlist = readJson(SHORTLIST_PATH);
const shortlistCount = shortlist ? (shortlist.shortlist || []).length : 0;

// ── Determine source count from watch summary ────────────────────────────
const sourceCount = watchSummary
  ? (watchSummary.sources_ok || 0) + (watchSummary.sources_failed || 0) + (watchSummary.sources_skipped || 0)
  : 0;

// ── Determine last pipeline run timestamp ────────────────────────────────
let lastPipelineRunAt = null;
if (watchSummary && watchSummary.run_timestamp) {
  lastPipelineRunAt = watchSummary.run_timestamp;
} else {
  // Try to find newest run file
  try {
    const runFiles = fs.readdirSync(WATCH_RUNS_DIR)
      .filter(f => f.startsWith('watch-run-') && f.endsWith('.json'))
      .sort()
      .reverse();
    if (runFiles.length) {
      const r = readJson(path.join(WATCH_RUNS_DIR, runFiles[0]));
      if (r && r.run_timestamp) lastPipelineRunAt = r.run_timestamp;
    }
  } catch { /* ignore */ }
}

// ── Build status JSON ──────────────────────────────────────────────────────
const now = new Date().toISOString();

const opsStatus = {
  _schema:                   'caesar-atlas-ops-status/v1',
  generated_at:              now,
  public_record_count:       publicRecordCount,
  latest_public_record_id:   latestPublicRecordId,
  last_pipeline_run_at:      lastPipelineRunAt,
  source_count:              sourceCount,
  candidate_count_summary:   candidateCountSummary,
  case_quality_ready_count:  caseQualityReadyCount,
  automation_mode:           'manual_local',
  hosted_sync_status:        'dry_run_ready',
  backend_mode:              'local_bootstrap_ready',
  next_step:                 'Configure Supabase + Cloudflare Worker secrets to enable hosted_ready mode',
  public_site_url:           'https://atlas.caesar.no',
  data_endpoint:             'https://atlas.caesar.no/data/incident-index.json',
  ops_status_endpoint:       'https://atlas.caesar.no/data/ops/latest-status.json',
};

// ── Build latest-watch-run-public.json (sanitised) ───────────────────────
const watchRunPublic = watchSummary
  ? {
      _schema:             'caesar-atlas-watch-run-public/v1',
      generated_at:        now,
      run_timestamp:       watchSummary.run_timestamp,
      sources_ok:          watchSummary.sources_ok,
      sources_failed:      watchSummary.sources_failed,
      sources_skipped:     watchSummary.sources_skipped || 0,
      detected_candidates: watchSummary.detected_candidates_count || 0,
      promotion_eligible:  watchSummary.promotion_eligible_count || 0,
      errors_count:        watchSummary.errors_count || 0,
      automation_mode:     'manual_local',
      note:                'Sanitised public summary. No candidate details, drafts, packets, or source internals.',
    }
  : {
      _schema:         'caesar-atlas-watch-run-public/v1',
      generated_at:    now,
      note:            'No watch run data available yet.',
      automation_mode: 'manual_local',
    };

// ── Write outputs ────────────────────────────────────────────────────────
OUT_DIRS.forEach(dir => ensureDir(dir));

const STATUS_FILENAME  = 'latest-status.json';
const RUN_FILENAME     = 'latest-watch-run-public.json';

OUT_DIRS.forEach(dir => {
  writeJson(path.join(dir, STATUS_FILENAME), opsStatus);
  writeJson(path.join(dir, RUN_FILENAME), watchRunPublic);
});

safeLog('export-ops-status: OK');
safeLog('  data/ops/' + STATUS_FILENAME);
safeLog('  site/data/ops/' + STATUS_FILENAME);
safeLog('  data/ops/' + RUN_FILENAME);
safeLog('  site/data/ops/' + RUN_FILENAME);
safeLog('  public_record_count: ' + publicRecordCount);
safeLog('  latest_public_record_id: ' + latestPublicRecordId);
safeLog('  last_pipeline_run_at: ' + lastPipelineRunAt);
safeLog('  automation_mode: manual_local');
