// build-private-candidate-review-intake.mjs (T062)
// Converts T061 private candidate signals into private review intake records.
// No network fetch, no Supabase writes, no public cases, no site/ mutation.

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const LATEST_RUN_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const GREEN_TARGETS_PATH = path.join(ROOT, 'data', 'watch', 'config', 'green-source-watch-targets.json');
const HOSTED_SIGNALS_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-candidate-signals.real-green-latest.json');

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

log('=== Building Private Candidate Review Intake (T062) ===\n');

// ── 1. Load run metadata and targets ──────────────────────────────────────────
const latestRun = readJson(LATEST_RUN_PATH);
if (!latestRun) {
  warn('real-green-run-latest.json not found — no run to process');
  process.exit(1);
}

const runId = latestRun.run_id;
info(`Processing run: ${runId}`);

// Load watch targets to map source_id -> display_name
const watchTargets = readJson(GREEN_TARGETS_PATH) || [];
const sourceNameMap = new Map();
for (const target of watchTargets) {
  if (target.source_id && target.display_name) {
    sourceNameMap.set(target.source_id, target.display_name);
  }
}

// ── 2. Read candidate signals ────────────────────────────────────────────────
let signalsData = readJson(HOSTED_SIGNALS_PATH);
if (!signalsData) {
  // Fallback to run directory
  const runDir = path.join(ROOT, latestRun.run_dir || `data/watch/private/runs/${runId}`);
  const runSignalsPath = path.join(runDir, 'candidate-signals.json');
  info(`Hosted signals payload not found. Falling back to run directory: ${runSignalsPath}`);
  signalsData = readJson(runSignalsPath);
}

if (!signalsData || !Array.isArray(signalsData.signals)) {
  warn('No candidate signals available to process.');
  process.exit(1);
}

const signals = signalsData.signals;
info(`Found ${signals.length} candidate signals from run.`);

// ── 3. Build Private Review Intake Records ────────────────────────────────────
const now = new Date().toISOString();
const intakeRecords = [];

signals.forEach((signal, idx) => {
  const indexStr = String(idx + 1).padStart(3, '0');
  const intakeId = `INTAKE-${runId}-${indexStr}`;
  const sourceName = sourceNameMap.get(signal.source_id) || signal.source_id;

  // Caesar-native metadata-only summary
  const matchedGroups = Object.keys(signal.keyword_group_hits || {});
  const signalSummary = `Private candidate review intake registered from ${sourceName} (${signal.source_id}) on ${signal.detected_at}. The automated watch detected AI and governance relevance through matched keyword groups: ${matchedGroups.join(', ')}. Standard human triaging is required to assess compliance control impact.`;

  // Suggested taxonomy attributes
  const suggestedFailureModes = ['FM-COMPLIANCE-DEFICIT', 'FM-GOVERNANCE-GAP'];
  const suggestedControlThemes = ['CTL-GUIDANCE-TRACKING', 'CTL-COMPLIANCE-UPDATE-PROCESS'];

  // Suggested Caesar-native compliance questions
  const suggestedEvidenceQuestions = [
    `Have we mapped and reviewed the latest guidance from ${sourceName}?`,
    `Is there a documented compliance gap assessment against ${sourceName}'s guidelines?`
  ];
  const suggestedVendorQuestions = [
    `Does the vendor track and conform to AI governance guidance issued by ${sourceName}?`,
    `What evidence does the vendor provide to demonstrate compliance with the latest ${sourceName} standards?`
  ];

  // Safety flags structure matching the schema requirements
  const safetyFlags = {
    no_raw_html: true,
    no_long_third_party_text: true,
    no_secrets_exposed: true,
    no_unauthorized_remote_writes: true,
    no_public_site_leak: true
  };

  const record = {
    intake_id: intakeId,
    created_at: now,
    source_run_id: runId,
    source_signal_id: signal.signal_id,
    candidate_hash: signal.candidate_hash,
    source_id: signal.source_id,
    source_name: sourceName,
    source_url: signal.source_url,
    detected_at: signal.detected_at,
    signal_summary: signalSummary,
    keyword_group_hits: signal.keyword_group_hits || {},
    legal_governance_relevance: signal.legal_governance_relevance || 'low',
    suggested_record_type: 'candidate',
    suggested_failure_modes: suggestedFailureModes,
    suggested_control_themes: suggestedControlThemes,
    suggested_evidence_questions: suggestedEvidenceQuestions,
    suggested_vendor_questions: suggestedVendorQuestions,
    review_status: 'needs_review',
    human_review_required: true,
    public_publish_ready: false,
    raw_text_stored: false,
    html_stored: false,
    remote_write_attempted: false,
    public_site_mutated: false,
    promotion_packet_created: false,
    public_preview_created: false,
    safety_flags: safetyFlags
  };

  intakeRecords.push(record);
  info(`Built intake record ${intakeId} for signal ${signal.signal_id} (${signal.source_id})`);
});

// ── 4. Write Output Files ────────────────────────────────────────────────────

// A. Latest outputs
const latestRecordsPath = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const latestManifestPath = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-manifest.json');

const manifest = {
  _schema: 'caesar-atlas/reviews/private-candidate-intake-manifest/v1',
  generated_at: now,
  run_id: runId,
  intake_count: intakeRecords.length,
  needs_review_count: intakeRecords.length,
  blocked_count: 0,
  publish_ready_count: 0,
  safety_status: {
    no_raw_html: true,
    no_long_third_party_text: true,
    no_secrets: true,
    remote_write_attempted: false,
    public_site_mutated: false
  }
};

writeJson(latestRecordsPath, {
  _schema: 'caesar-atlas/reviews/private-candidate-intake/v1',
  run_id: runId,
  generated_at: now,
  records: intakeRecords
});
info(`Wrote latest intake records to: ${path.relative(ROOT, latestRecordsPath)}`);

writeJson(latestManifestPath, manifest);
info(`Wrote latest manifest to: ${path.relative(ROOT, latestManifestPath)}`);

// B. Run-specific outputs
const runIntakeDir = path.join(ROOT, 'data', 'reviews', 'intake', 'runs', runId);
const runRecordsPath = path.join(runIntakeDir, 'intake-records.json');
const runManifestPath = path.join(runIntakeDir, 'intake-manifest.json');
const runSafetyManifestPath = path.join(runIntakeDir, 'safety-manifest.json');

const safetyManifest = {
  _schema: 'caesar-atlas/reviews/safety-manifest/v1',
  generated_at: now,
  run_id: runId,
  safety_confirmations: {
    no_raw_html: true,
    no_long_third_party_text: true,
    no_secrets_exposed: true,
    no_unauthorized_remote_writes: true,
    no_public_site_leak: true
  }
};

writeJson(runRecordsPath, {
  _schema: 'caesar-atlas/reviews/private-candidate-intake/v1',
  run_id: runId,
  generated_at: now,
  records: intakeRecords
});
info(`Wrote stable run-specific records to: ${path.relative(ROOT, runRecordsPath)}`);

writeJson(runManifestPath, manifest);
info(`Wrote stable run-specific manifest to: ${path.relative(ROOT, runManifestPath)}`);

writeJson(runSafetyManifestPath, safetyManifest);
info(`Wrote stable run-specific safety-manifest to: ${path.relative(ROOT, runSafetyManifestPath)}`);

log('\n=== Build Private Candidate Review Intake COMPLETE ===');
log(`Records built: ${intakeRecords.length}`);
log('');
