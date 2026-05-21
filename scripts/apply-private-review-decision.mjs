// apply-private-review-decision.mjs (T063)
// Interactively applies/patches a private review decision for a specific intake ID.
// Bounded local-only execution. No remote writes, no site mutation, no public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_DECIS_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const LATEST_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-manifest.json');

function log(msg) {
  process.stdout.write(`[Decision Patch] ${msg}\n`);
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

// Simple CLI arguments parsing
const args = process.argv.slice(2);
let intakeId = null;
let decisionStatus = null;
let reason = null;
let notes = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--intake-id' && args[i+1]) {
    intakeId = args[i+1];
    i++;
  } else if (args[i] === '--decision-status' && args[i+1]) {
    decisionStatus = args[i+1];
    i++;
  } else if (args[i] === '--reason' && args[i+1]) {
    reason = args[i+1];
    i++;
  } else if (args[i] === '--notes' && args[i+1]) {
    notes = args[i+1];
    i++;
  }
}

if (!intakeId || !decisionStatus || !reason) {
  log('Usage: node scripts/apply-private-review-decision.mjs --intake-id <id> --decision-status <status> --reason "<reason>" [--notes "<notes>"]');
  process.exit(1);
}

const ALLOWED_STATUSES = ['needs_more_review', 'approve_for_private_draft', 'reject_signal', 'defer'];
if (!ALLOWED_STATUSES.includes(decisionStatus)) {
  log(`ERROR: Unsupported decision status "${decisionStatus}". Allowed values: ${ALLOWED_STATUSES.join(', ')}`);
  process.exit(1);
}

// Restrict note/reason lengths and raw third-party content
if (reason.length > 250 || notes.length > 500) {
  log('ERROR: Reasons and notes must be short, Caesar-native text.');
  process.exit(1);
}

const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;
if (HTML_PATTERN.test(reason) || HTML_PATTERN.test(notes)) {
  log('ERROR: Reasons and notes must not contain raw HTML/body structures.');
  process.exit(1);
}

async function run() {
  const decisionsData = readJson(LATEST_DECIS_PATH);
  if (!decisionsData || !Array.isArray(decisionsData.decisions)) {
    log('ERROR: private-review-decisions-latest.json not found or invalid. Run build-private-review-decisions.mjs first.');
    process.exit(1);
  }

  const runId = decisionsData.run_id;
  const decisions = decisionsData.decisions;

  const decision = decisions.find(d => d.intake_id === intakeId);
  if (!decision) {
    log(`ERROR: Unknown intake ID "${intakeId}" (no matching decision placeholder found).`);
    process.exit(1);
  }

  // Update
  decision.decision_status = decisionStatus;
  decision.decision_reason = reason;
  decision.review_notes = notes;
  decision.decided_at = new Date().toISOString();
  decision.reviewer_mode = 'interactive_patch';
  decision.draft_candidate_ready = (decisionStatus === 'approve_for_private_draft');

  log(`Successfully updated decision for intake: ${intakeId}`);
  log(`New Status: ${decisionStatus}`);
  log(`Reason: ${reason}`);

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

  // Write outputs
  writeJson(LATEST_DECIS_PATH, decisionsData);
  writeJson(LATEST_MANIFEST_PATH, manifest);

  // Run-specific outputs
  const runDecisDir = path.join(ROOT, 'data', 'reviews', 'decisions', 'runs', runId);
  const runDecisPath = path.join(runDecisDir, 'review-decisions.json');
  const runManifestPath = path.join(runDecisDir, 'decision-manifest.json');

  writeJson(runDecisPath, decisionsData);
  writeJson(runManifestPath, manifest);

  log('Private review decisions files successfully updated.');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
