// apply-explicit-private-draft-approval.mjs (T064)
// Local-only script to apply an explicit, Control Tower active approval marker to review decisions.
// No remote writes, no site mutation, no public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const APPROVALS_DIR = path.join(ROOT, 'data', 'reviews', 'approvals');
const ACTIVE_MARKERS_DIR = path.join(APPROVALS_DIR, 'active-markers');
const LATEST_DECIS_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const LATEST_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-manifest.json');

function log(msg) {
  process.stdout.write(`[Approval Applier] ${msg}\n`);
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

// Parse args
const args = process.argv.slice(2);
let intakeId = null;
let decisionId = null;
let approvalId = null;
let ctApproval = null;
let reason = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--intake-id' && args[i+1]) {
    intakeId = args[i+1];
    i++;
  } else if (args[i] === '--decision-id' && args[i+1]) {
    decisionId = args[i+1];
    i++;
  } else if (args[i] === '--approval-id' && args[i+1]) {
    approvalId = args[i+1];
    i++;
  } else if (args[i] === '--control-tower-approval' && args[i+1]) {
    ctApproval = args[i+1];
    i++;
  } else if (args[i] === '--reason' && args[i+1]) {
    reason = args[i+1];
    i++;
  }
}

if (!intakeId || !decisionId || !approvalId || ctApproval !== 'YES' || !reason) {
  log('ERROR: Missing required parameters.');
  log('Usage: node scripts/apply-explicit-private-draft-approval.mjs --intake-id <id> --decision-id <id> --approval-id <id> --control-tower-approval YES --reason "<reason>"');
  process.exit(1);
}

// Validation of reason length and safety
if (reason.length > 250) {
  log('ERROR: Reason must be a short, Caesar-native description (max 250 characters).');
  process.exit(1);
}

const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;
if (HTML_PATTERN.test(reason)) {
  log('ERROR: Reason must not contain raw HTML/body structures or third-party markup.');
  process.exit(1);
}

async function run() {
  log('=== Applying Explicit Private Draft Approval ===');

  // Verify matching active marker exists
  const markerPath = path.join(ACTIVE_MARKERS_DIR, `${approvalId}.json`);
  if (!fs.existsSync(markerPath)) {
    log(`ERROR: Active approval marker file not found at: ${markerPath}`);
    process.exit(1);
  }

  const marker = readJson(markerPath);
  if (!marker) {
    log('ERROR: Approval marker file is empty or invalid.');
    process.exit(1);
  }

  // Enforce marker state constraints
  if (marker.approval_status !== 'approved_for_private_draft') {
    log(`ERROR: Marker status must be "approved_for_private_draft", found: "${marker.approval_status}"`);
    process.exit(1);
  }
  if (marker.control_tower_approval_present !== true) {
    log('ERROR: Marker control_tower_approval_present must be true.');
    process.exit(1);
  }
  if (marker.approval_scope !== 'private_draft_candidate_only') {
    log(`ERROR: Marker approval_scope must be "private_draft_candidate_only", found: "${marker.approval_scope}"`);
    process.exit(1);
  }
  if (marker.intake_id !== intakeId) {
    log(`ERROR: Intake ID mismatch. Marker: ${marker.intake_id}, Param: ${intakeId}`);
    process.exit(1);
  }
  if (marker.decision_id !== decisionId) {
    log(`ERROR: Decision ID mismatch. Marker: ${marker.decision_id}, Param: ${decisionId}`);
    process.exit(1);
  }
  if (new Date(marker.expires_at) <= new Date()) {
    log(`ERROR: Active approval marker has expired: ${marker.expires_at}`);
    process.exit(1);
  }

  log('Valid active approval marker confirmed.');

  // Load decision files
  const decisionsData = readJson(LATEST_DECIS_PATH);
  if (!decisionsData || !Array.isArray(decisionsData.decisions)) {
    log('ERROR: private-review-decisions-latest.json not found or invalid.');
    process.exit(1);
  }

  const runId = decisionsData.run_id;
  const decisions = decisionsData.decisions;

  const decision = decisions.find(d => d.decision_id === decisionId);
  if (!decision) {
    log(`ERROR: Target decision ${decisionId} not found in latest review decisions.`);
    process.exit(1);
  }

  // Update decision properties
  decision.decision_status = 'approve_for_private_draft';
  decision.recommended_next_step = 'build_private_draft_candidate_packet';
  decision.draft_candidate_ready = true;
  decision.decided_at = new Date().toISOString();
  decision.reviewer_mode = 'interactive_patch';
  decision.decision_reason = reason;
  decision.approval_id = approvalId; // reference the validated approval marker ID!

  // Re-calculate counts
  const needsMoreCount = decisions.filter(d => d.decision_status === 'needs_more_review').length;
  const approvedCount = decisions.filter(d => d.decision_status === 'approve_for_private_draft').length;
  const rejectedCount = decisions.filter(d => d.decision_status === 'reject_signal').length;
  const deferredCount = decisions.filter(d => d.decision_status === 'defer').length;

  const manifest = {
    _schema: 'caesar-atlas/reviews/private-review-decisions-manifest/v1',
    generated_at: new Date().toISOString(),
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

  decisionsData.generated_at = new Date().toISOString();

  // Save updated decisions
  writeJson(LATEST_DECIS_PATH, decisionsData);
  writeJson(LATEST_MANIFEST_PATH, manifest);

  // Run-specific outputs
  const runDecisDir = path.join(ROOT, 'data', 'reviews', 'decisions', 'runs', runId);
  const runDecisPath = path.join(runDecisDir, 'review-decisions.json');
  const runManifestPath = path.join(runDecisDir, 'decision-manifest.json');

  writeJson(runDecisPath, decisionsData);
  writeJson(runManifestPath, manifest);

  log(`Decision ${decisionId} successfully updated with status approve_for_private_draft.`);
  log('=== Explicit Private Draft Approval Applied Successfully ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
