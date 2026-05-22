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

const INCIDENT_INDEX_PATH     = path.join(ROOT, 'data', 'incident-index.json');
const WATCH_RUNS_DIR          = path.join(ROOT, 'data', 'watch', 'runs');
const SHORTLIST_PATH          = path.join(ROOT, 'data', 'candidates', 'case-shortlist.json');
const QUALITY_REPORT_PATH     = path.join(ROOT, 'data', 'watch', 'runs', 'latest-candidate-quality-report.json');
const MANUAL_QUEUE_MANIFEST_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-queue-manifest.json');
const REAL_GREEN_RUN_LATEST_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const PRIVATE_INTAKE_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-manifest.json');
const PRIVATE_DECISIONS_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-manifest.json');
const PRIVATE_PACKETS_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-manifest.json');
const PRIVATE_APPROVALS_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'approvals', 'private-draft-approval-template-manifest.json');
const PRIVATE_CANDIDATE_PACKAGE_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-manifest.json');
const PRIVATE_PROMO_DRY_RUN_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-manifest.json');
const PRIVATE_PROMO_SIGNOFF_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-manifest.json');
const PRIVATE_CAND_PACKET_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-manifest.json');


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

// ── Read T060 manual queue manifest for safe public counts ────────────────
const manualQueueManifest = readJson(MANUAL_QUEUE_MANIFEST_PATH);
const manualWatchRunStatus = manualQueueManifest ? 'queue_ready' : 'not_built';
const manualQueueEnabledSources = manualQueueManifest ? (manualQueueManifest.enabled_count || 0) : null;
const manualQueueBlockedSources = manualQueueManifest ? (manualQueueManifest.blocked_count || 0) : null;

// ── Read T061 real green run for public status ────────────────────────────
const realGreenRun = readJson(REAL_GREEN_RUN_LATEST_PATH);
const boundedGreenRunStatus = realGreenRun ? 'last_run_available' : 'not_run_yet';
const lastGreenRunSourceCount = realGreenRun ? (realGreenRun.sources_fetched || 0) : null;
const lastGreenRunSignalCount = realGreenRun ? (realGreenRun.candidate_signals || 0) : null;

// ── Read T062 private candidate review intake manifest ────────────────────
const privateIntakeManifest = readJson(PRIVATE_INTAKE_MANIFEST_PATH);
const reviewIntakeStatus = privateIntakeManifest ? 'private_intake_ready' : 'not_built';
const privateIntakeCount = privateIntakeManifest ? (privateIntakeManifest.intake_count || 0) : null;
const privateIntakeNeedsReviewCount = privateIntakeManifest ? (privateIntakeManifest.needs_review_count || 0) : null;

// ── Read T063 private review decisions & draft packets manifests ──────────
const privateDecisionsManifest = readJson(PRIVATE_DECISIONS_MANIFEST_PATH);
const reviewDecisionStatus = privateDecisionsManifest ? 'private_decisions_ready' : 'not_built';
const privateReviewDecisionCount = privateDecisionsManifest ? (privateDecisionsManifest.decision_count || 0) : 0;

const privatePacketsManifest = readJson(PRIVATE_PACKETS_MANIFEST_PATH);
const privateDraftCandidatePacketCount = privatePacketsManifest ? (privatePacketsManifest.packet_count || 0) : 0;

// ── Read T064/T065 private draft approval manifest and active markers ─────
const privateApprovalsManifest = readJson(PRIVATE_APPROVALS_MANIFEST_PATH);
const activeMarkersDir = path.join(ROOT, 'data', 'reviews', 'approvals', 'active-markers');
let privateDraftActiveApprovalCount = 0;
if (fs.existsSync(activeMarkersDir)) {
  privateDraftActiveApprovalCount = fs.readdirSync(activeMarkersDir).filter(f => f.endsWith('.json')).length;
}

let privateDraftApprovalStatus = privateApprovalsManifest ? 'approval_gate_ready' : 'not_built';
if (privateDraftActiveApprovalCount === 1) {
  privateDraftApprovalStatus = 'one_private_draft_approved';
}
const privateDraftApprovalTemplateCount = privateApprovalsManifest ? (privateApprovalsManifest.approval_template_count || 0) : 0;

// ── Read T066 private draft candidate package manifest ────────────────────
const privateCandidatePackageManifest = readJson(PRIVATE_CANDIDATE_PACKAGE_MANIFEST_PATH);
const privateDraftCandidateStatus = privateCandidatePackageManifest ? 'private_package_ready' : 'not_built';
const privateDraftCandidatePackageCount = privateCandidatePackageManifest ? (privateCandidatePackageManifest.package_count || 0) : 0;
const privateDraftCandidatePublicReadyCount = 0;

// ── Read T067 private promotion dry-run manifest ──────────────────────────
const privatePromoDryRunManifest = readJson(PRIVATE_PROMO_DRY_RUN_MANIFEST_PATH);
const privatePromotionDryRunStatus = privatePromoDryRunManifest ? 'private_dry_run_ready' : 'not_built';
const privatePromotionDryRunCount = privatePromoDryRunManifest ? (privatePromoDryRunManifest.dry_run_count || 0) : 0;
const privatePromotionPublicReadyCount = 0;

// ── Read T068 private promotion signoff manifest ──────────────────────────
const privatePromoSignoffManifest = readJson(PRIVATE_PROMO_SIGNOFF_MANIFEST_PATH);
const privatePromotionSignoffStatus = privatePromoSignoffManifest
  ? (privatePromoSignoffManifest.signoff_status_summary || 'private_review_pending')
  : 'not_built';
const privatePromotionSignoffCount = privatePromoSignoffManifest ? (privatePromoSignoffManifest.signoff_count || 0) : 0;
const privatePromotionPublicAllowedCount = 0;

// ── Read T069 private promotion-packet candidate manifest ──────────────────
const privateCandPacketManifest = readJson(PRIVATE_CAND_PACKET_MANIFEST_PATH);
const privatePromotionPacketCandidateStatus = privateCandPacketManifest
  ? 'private_promotion_packet_candidate_prepared'
  : 'not_built';
const privatePromotionPacketCandidateCount = privateCandPacketManifest
  ? (privateCandPacketManifest.candidate_packet_count || 0)
  : 0;
const privatePromotionPacketCandidatePublicAllowedCount = 0;

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
  hosted_activation_status:  'preflight_ready',
  backend_mode:              'local_bootstrap_ready',
  worker_api_status:         'local_supabase_integration_ready',
  manual_watch_run_status:   manualWatchRunStatus,
  manual_queue_enabled_sources: manualQueueEnabledSources,
  manual_queue_blocked_sources: manualQueueBlockedSources,
  // T061: Bounded green run status
  bounded_green_run_status:  boundedGreenRunStatus,
  last_green_run_source_count: lastGreenRunSourceCount,
  last_green_run_signal_count: lastGreenRunSignalCount,
  // T062: Private review intake status
  review_intake_status:      reviewIntakeStatus,
  private_intake_count:      privateIntakeCount,
  private_intake_needs_review_count: privateIntakeNeedsReviewCount,
  // T063: Private review decision + draft candidate packet status
  review_decision_status:    reviewDecisionStatus,
  private_review_decision_count: privateReviewDecisionCount,
  private_draft_candidate_packet_count: privateDraftCandidatePacketCount,
  // T064: Private draft approval gate status
  private_draft_approval_status: privateDraftApprovalStatus,
  private_draft_approval_template_count: privateDraftApprovalTemplateCount,
  private_draft_active_approval_count: privateDraftActiveApprovalCount,
  // T066: Private draft candidate package status
  private_draft_candidate_status: privateDraftCandidateStatus,
  private_draft_candidate_package_count: privateDraftCandidatePackageCount,
  private_draft_candidate_public_ready_count: privateDraftCandidatePublicReadyCount,
  // T067: Private promotion dry-run status
  private_promotion_dry_run_status: privatePromotionDryRunStatus,
  private_promotion_dry_run_count: privatePromotionDryRunCount,
  private_promotion_public_ready_count: privatePromotionPublicReadyCount,
  // T068: Private promotion signoff status
  private_promotion_signoff_status: privatePromotionSignoffStatus,
  private_promotion_signoff_count: privatePromotionSignoffCount,
  private_promotion_public_allowed_count: privatePromotionPublicAllowedCount,
  // T069: Private promotion-packet candidate status
  private_promotion_packet_candidate_status: privatePromotionPacketCandidateStatus,
  private_promotion_packet_candidate_count: privatePromotionPacketCandidateCount,
  private_promotion_packet_candidate_public_allowed_count: privatePromotionPacketCandidatePublicAllowedCount,
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
