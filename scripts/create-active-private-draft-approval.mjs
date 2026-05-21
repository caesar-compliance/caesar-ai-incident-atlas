// create-active-private-draft-approval.mjs (T065)
// Local-only bounded script to generate an active Control Tower approved marker.
// No remote writes, no site mutation, no public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_INTAKE_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const LATEST_DECIS_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const APPROVALS_DIR = path.join(ROOT, 'data', 'reviews', 'approvals');
const ACTIVE_MARKERS_DIR = path.join(APPROVALS_DIR, 'active-markers');

function log(msg) {
  process.stdout.write(`[Active Approval Builder] ${msg}\n`);
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
let intakeIdParam = null;
let reasonParam = null;
let ctApprovalParam = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--intake-id' && args[i+1]) {
    intakeIdParam = args[i+1];
    i++;
  } else if (args[i] === '--reason' && args[i+1]) {
    reasonParam = args[i+1];
    i++;
  } else if (args[i] === '--control-tower-approval' && args[i+1]) {
    ctApprovalParam = args[i+1];
    i++;
  }
}

if (!intakeIdParam || !reasonParam || ctApprovalParam !== 'YES') {
  log('ERROR: Missing required parameters.');
  log('Usage: node scripts/create-active-private-draft-approval.mjs --intake-id <id> --reason "<reason>" --control-tower-approval YES');
  process.exit(1);
}

// Reason validation
if (reasonParam.length > 250) {
  log('ERROR: Reason must be a short description (max 250 characters).');
  process.exit(1);
}

const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;
if (HTML_PATTERN.test(reasonParam)) {
  log('ERROR: Reason must not contain HTML/body markup.');
  process.exit(1);
}

async function run() {
  log('=== Generating Active Private Draft Approval Marker ===');

  // Check if another active approval marker already exists
  if (fs.existsSync(ACTIVE_MARKERS_DIR)) {
    const existing = fs.readdirSync(ACTIVE_MARKERS_DIR).filter(f => f.endsWith('.json'));
    if (existing.length > 0) {
      log(`ERROR: An active approval marker already exists: ${existing.join(', ')}`);
      process.exit(1);
    }
  }

  // Load intake
  const intakeData = readJson(LATEST_INTAKE_PATH);
  if (!intakeData || !Array.isArray(intakeData.records)) {
    log('ERROR: private-candidate-intake-latest.json is missing or invalid.');
    process.exit(1);
  }

  const record = intakeData.records.find(r => r.intake_id === intakeIdParam);
  if (!record) {
    log(`ERROR: Specified intake-id "${intakeIdParam}" not found.`);
    process.exit(1);
  }

  // Load decisions to resolve decision_id
  const decisionsData = readJson(LATEST_DECIS_PATH);
  if (!decisionsData || !Array.isArray(decisionsData.decisions)) {
    log('ERROR: private-review-decisions-latest.json is missing or invalid.');
    process.exit(1);
  }

  const decision = decisionsData.decisions.find(d => d.intake_id === intakeIdParam);
  if (!decision) {
    log(`ERROR: No matching decision found for intake-id: ${intakeIdParam}`);
    process.exit(1);
  }

  const runId = intakeData.run_id;
  const indexSuffix = intakeIdParam.split('-').slice(-1)[0];
  const approvalId = `APPROVAL-${runId}-${indexSuffix}`;
  const decisionId = decision.decision_id;

  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const marker = {
    approval_id: approvalId,
    created_at: now,
    approval_scope: 'private_draft_candidate_only',
    source_run_id: runId,
    intake_id: intakeIdParam,
    decision_id: decisionId,
    approved_decision_status: 'approve_for_private_draft',
    approval_status: 'approved_for_private_draft',
    control_tower_approval_required: true,
    control_tower_approval_present: true,
    approval_reason: reasonParam,
    approval_notes: 'Control Tower explicit approval granted. Safe to proceed with private draft candidate promotion.',
    requested_by: 'local_compliance_officer',
    approved_by: 'Control Tower Signature Generator',
    expires_at: expiresAt,
    public_publish_allowed: false,
    promotion_packet_allowed: false,
    public_preview_allowed: false,
    remote_write_allowed: false,
    raw_text_storage_allowed: false,
    html_storage_allowed: false,
    safety_flags: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets_exposed: true,
      no_unauthorized_remote_writes: true,
      no_public_site_leak: true
    }
  };

  // Outputs
  const activeMarkerPath = path.join(ACTIVE_MARKERS_DIR, `${approvalId}.json`);
  const activeLatestPath = path.join(APPROVALS_DIR, 'private-draft-approval-active-latest.json');
  const runActivePath = path.join(APPROVALS_DIR, 'runs', runId, 'active-approval-marker.json');

  writeJson(activeMarkerPath, marker);
  writeJson(activeLatestPath, marker);
  writeJson(runActivePath, marker);

  log(`Successfully created active approved marker: ${approvalId}`);
  log(`Wrote active marker to: ${path.relative(ROOT, activeMarkerPath)}`);
  log(`Wrote latest wrapper to: ${path.relative(ROOT, activeLatestPath)}`);
  log('=== Active Approval Marker Built Successfully ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
