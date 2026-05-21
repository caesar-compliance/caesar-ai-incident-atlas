// build-private-review-decisions.mjs (T063)
// Generates deterministic private review decision placeholders.
// Preserves any existing decisions from previous runs of this script/patch.
// Bounded local-only execution. No remote writes, no site mutation, no public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_INTAKE_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const LATEST_DECIS_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const LATEST_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-manifest.json');

function log(msg) {
  process.stdout.write(`[Decision Builder] ${msg}\n`);
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function writeJson(p, data) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

async function run() {
  log('=== Building Private Review Decisions ===');

  const intakeData = readJson(LATEST_INTAKE_PATH);
  if (!intakeData || !Array.isArray(intakeData.records)) {
    log('FAIL: No private candidate review intake records found.');
    process.exit(1);
  }

  const runId = intakeData.run_id;
  const records = intakeData.records;
  log(`Found ${records.length} intake records from run: ${runId}`);

  // Load existing decisions to preserve them if found
  const existingDecisionsData = readJson(LATEST_DECIS_PATH);
  const existingMap = new Map();
  if (existingDecisionsData && Array.isArray(existingDecisionsData.decisions)) {
    existingDecisionsData.decisions.forEach(d => {
      existingMap.set(d.intake_id, d);
    });
  }

  const now = new Date().toISOString();
  const decisions = [];

  records.forEach(record => {
    const intakeId = record.intake_id;
    // Map intake index part to decision index
    const indexSuffix = intakeId.split('-').slice(-1)[0];
    const decisionId = `DECISION-${runId}-${indexSuffix}`;

    const existing = existingMap.get(intakeId);

    const safetyFlags = {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets_exposed: true,
      no_unauthorized_remote_writes: true,
      no_public_site_leak: true
    };

    const decision = {
      decision_id: decisionId,
      intake_id: intakeId,
      source_run_id: runId,
      source_signal_id: record.source_signal_id,
      decided_at: existing ? existing.decided_at : now,
      reviewer_mode: existing ? existing.reviewer_mode : 'local_compliance_officer',
      decision_status: existing ? existing.decision_status : 'needs_more_review',
      decision_reason: existing ? existing.decision_reason : 'Pending manual compliance triaging.',
      review_notes: existing ? existing.review_notes : '',
      recommended_next_step: existing ? existing.recommended_next_step : 'Perform initial policy-gap analysis.',
      draft_candidate_ready: existing ? existing.draft_candidate_ready : false,
      public_publish_ready: false,
      promotion_packet_created: false,
      public_preview_created: false,
      public_site_mutated: false,
      remote_write_attempted: false,
      raw_text_stored: false,
      html_stored: false,
      safety_flags: safetyFlags
    };

    decisions.push(decision);
    if (existing) {
      log(`Preserved existing patched decision ${decisionId} with status: ${decision.decision_status}`);
    } else {
      log(`Generated default decision ${decisionId} with status: needs_more_review`);
    }
  });

  // Calculate manifest counts
  const needsMoreCount = decisions.filter(d => d.decision_status === 'needs_more_review').length;
  const approvedCount = decisions.filter(d => d.decision_status === 'approve_for_private_draft').length;
  const rejectedCount = decisions.filter(d => d.decision_status === 'reject_signal').length;
  const deferredCount = decisions.filter(d => d.decision_status === 'defer').length;

  const manifest = {
    _schema: 'caesar-atlas/reviews/private-review-decisions-manifest/v1',
    generated_at: now,
    run_id: runId,
    decision_count: decisions.length,
    needs_more_review_count: needsMoreCount,
    approved_for_private_draft_count: approvedCount,
    rejected_count: rejectedCount,
    deferred_count: deferredCount,
    safety_status: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      remote_write_attempted: false,
      public_site_mutated: false
    }
  };

  const payload = {
    _schema: 'caesar-atlas/reviews/private-review-decisions/v1',
    run_id: runId,
    generated_at: now,
    decisions: decisions
  };

  // Write outputs
  writeJson(LATEST_DECIS_PATH, payload);
  writeJson(LATEST_MANIFEST_PATH, manifest);
  log(`Wrote decisions to: ${path.relative(ROOT, LATEST_DECIS_PATH)}`);
  log(`Wrote decisions manifest to: ${path.relative(ROOT, LATEST_MANIFEST_PATH)}`);

  // Run-specific outputs
  const runDecisDir = path.join(ROOT, 'data', 'reviews', 'decisions', 'runs', runId);
  const runDecisPath = path.join(runDecisDir, 'review-decisions.json');
  const runManifestPath = path.join(runDecisDir, 'decision-manifest.json');

  writeJson(runDecisPath, payload);
  writeJson(runManifestPath, manifest);
  log(`Wrote stable run-specific decisions to: ${path.relative(ROOT, runDecisPath)}`);
  log(`Wrote stable run-specific manifest to: ${path.relative(ROOT, runManifestPath)}`);

  log('=== Private Review Decisions Build COMPLETE ===');
  log(`Total decisions: ${decisions.length} (needs_more_review: ${needsMoreCount}, approved: ${approvedCount})`);
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
