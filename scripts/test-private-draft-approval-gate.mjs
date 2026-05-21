// test-private-draft-approval-gate.mjs (T064)
// Automated end-to-end integration and dry-run testing suite for the explicit draft approval gate.
// Cleans up all mutations to maintain zero baseline approvals/packets.

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const APPROVALS_DIR = path.join(ROOT, 'data', 'reviews', 'approvals');
const ACTIVE_MARKERS_DIR = path.join(APPROVALS_DIR, 'active-markers');
const DECISIONS_DIR = path.join(ROOT, 'data', 'reviews', 'decisions');
const PACKETS_DIR = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets');

function log(msg) {
  process.stdout.write(`[Gate Test Suite] ${msg}\n`);
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

function runCmd(cmd) {
  try {
    const output = execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
    return { status: 0, output };
  } catch (e) {
    return { status: e.status || 1, output: e.stderr || e.stdout || '' };
  }
}

async function run() {
  log('=== Starting T064 Approval Gate & Controlled Promotion Tests ===');

  // 1. Verify baseline has 0 approvals and 0 packets
  log('Step 1: Checking baseline approvals and packets counts...');
  const decisionsLatest = readJson(path.join(DECISIONS_DIR, 'private-review-decisions-latest.json'));
  const approvedCount = decisionsLatest ? decisionsLatest.decisions.filter(d => d.decision_status === 'approve_for_private_draft').length : 0;

  const packetsLatest = readJson(path.join(PACKETS_DIR, 'private-draft-candidate-packets-latest.json'));
  const packetCount = packetsLatest ? packetsLatest.packets.length : 0;

  if (approvedCount !== 0 || packetCount !== 0) {
    log(`FAIL: Baseline is dirty! Approved: ${approvedCount}, Packets: ${packetCount}`);
    process.exit(1);
  }
  log('OK: Baseline is clean (0 approvals, 0 packets).');

  // 2. Test apply-explicit-private-draft-approval fails without marker
  log('Step 2: Testing that approval applier fails when marker file is missing...');
  const missingResult = runCmd('node scripts/apply-explicit-private-draft-approval.mjs --intake-id INTAKE-GREEN-RUN-20260521-202417-001 --decision-id DECISION-GREEN-RUN-20260521-202417-001 --approval-id APPROVAL-GREEN-RUN-20260521-202417-001 --control-tower-approval YES --reason "Should fail"');
  if (missingResult.status === 0) {
    log('FAIL: apply-explicit-private-draft-approval succeeded when marker was missing!');
    process.exit(1);
  }
  log('OK: Applier rejected missing marker correctly.');

  // 3. Test apply-explicit-private-draft-approval fails with template/draft marker
  log('Step 3: Testing that approval applier fails with draft status marker...');
  const runId = 'GREEN-RUN-20260521-202417';
  const approvalId = `APPROVAL-${runId}-001`;
  const intakeId = `INTAKE-${runId}-001`;
  const decisionId = `DECISION-${runId}-001`;

  const draftMarker = {
    approval_id: approvalId,
    created_at: new Date().toISOString(),
    approval_scope: 'private_draft_candidate_only',
    source_run_id: runId,
    intake_id: intakeId,
    decision_id: decisionId,
    approved_decision_status: 'approve_for_private_draft',
    approval_status: 'draft',
    control_tower_approval_required: true,
    control_tower_approval_present: false,
    approval_reason: 'Pending Control Tower explicit approval.',
    approval_notes: 'Draft marker for test.',
    requested_by: 'local_compliance_officer',
    approved_by: '',
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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

  const tempMarkerPath = path.join(ACTIVE_MARKERS_DIR, `${approvalId}.json`);
  writeJson(tempMarkerPath, draftMarker);

  const draftResult = runCmd(`node scripts/apply-explicit-private-draft-approval.mjs --intake-id ${intakeId} --decision-id ${decisionId} --approval-id ${approvalId} --control-tower-approval YES --reason "Should fail status check"`);
  
  // Clean up right away
  if (fs.existsSync(tempMarkerPath)) fs.unlinkSync(tempMarkerPath);

  if (draftResult.status === 0) {
    log('FAIL: apply-explicit-private-draft-approval succeeded when marker was status draft!');
    process.exit(1);
  }
  log('OK: Applier rejected draft marker correctly.');

  // 4. End-to-end promotion flow validation (backup, promote, build, validate, restore)
  log('Step 4: Beginning end-to-end integration flow with backup...');
  
  // Back up current decisions
  const backupDecis = readJson(path.join(DECISIONS_DIR, 'private-review-decisions-latest.json'));
  const backupManifest = readJson(path.join(DECISIONS_DIR, 'private-review-decisions-manifest.json'));
  const runDecisPath = path.join(DECISIONS_DIR, 'runs', runId, 'review-decisions.json');
  const runManifestPath = path.join(DECISIONS_DIR, 'runs', runId, 'decision-manifest.json');
  const backupRunDecis = readJson(runDecisPath);
  const backupRunManifest = readJson(runManifestPath);

  // Write active marker
  const activeMarker = {
    ...draftMarker,
    approval_status: 'approved_for_private_draft',
    control_tower_approval_present: true,
    approved_by: 'Control Tower Administrator'
  };
  writeJson(tempMarkerPath, activeMarker);

  log('Applying valid explicit approval...');
  const applyResult = runCmd(`node scripts/apply-explicit-private-draft-approval.mjs --intake-id ${intakeId} --decision-id ${decisionId} --approval-id ${approvalId} --control-tower-approval YES --reason "Control Tower verified compliant private draft promotion"`);
  if (applyResult.status !== 0) {
    log(`FAIL: apply-explicit-private-draft-approval failed to apply active approval! ${applyResult.output}`);
    // Cleanup
    if (fs.existsSync(tempMarkerPath)) fs.unlinkSync(tempMarkerPath);
    process.exit(1);
  }
  log('OK: Active approval marker successfully applied.');

  log('Building draft candidate packets...');
  const buildResult = runCmd('node scripts/build-private-draft-candidate-packets.mjs');
  if (buildResult.status !== 0) {
    log(`FAIL: build-private-draft-candidate-packets failed! ${buildResult.output}`);
    // Cleanup
    if (fs.existsSync(tempMarkerPath)) fs.unlinkSync(tempMarkerPath);
    // Restore
    writeJson(path.join(DECISIONS_DIR, 'private-review-decisions-latest.json'), backupDecis);
    writeJson(path.join(DECISIONS_DIR, 'private-review-decisions-manifest.json'), backupManifest);
    writeJson(runDecisPath, backupRunDecis);
    writeJson(runManifestPath, backupRunManifest);
    process.exit(1);
  }
  log('OK: Draft candidate packets built successfully.');

  // Validate decisions & packets in approved mode
  log('Running private review decisions validator...');
  const valResult = runCmd('node scripts/validate-private-review-decisions.mjs');
  if (valResult.status !== 0) {
    log(`FAIL: validate-private-review-decisions failed under approved mode! ${valResult.output}`);
    // Cleanup & restore
    if (fs.existsSync(tempMarkerPath)) fs.unlinkSync(tempMarkerPath);
    writeJson(path.join(DECISIONS_DIR, 'private-review-decisions-latest.json'), backupDecis);
    writeJson(path.join(DECISIONS_DIR, 'private-review-decisions-manifest.json'), backupManifest);
    writeJson(runDecisPath, backupRunDecis);
    writeJson(runManifestPath, backupRunManifest);
    process.exit(1);
  }
  log('OK: Private review decisions validated under approved mode.');

  // Validate approval markers with active allowed
  log('Running approval marker validator with active allowed...');
  const markerValResult = runCmd('node scripts/validate-private-draft-approval-markers.mjs --allow-active');
  if (markerValResult.status !== 0) {
    log(`FAIL: validate-private-draft-approval-markers failed with active marker! ${markerValResult.output}`);
    // Cleanup & restore
    if (fs.existsSync(tempMarkerPath)) fs.unlinkSync(tempMarkerPath);
    writeJson(path.join(DECISIONS_DIR, 'private-review-decisions-latest.json'), backupDecis);
    writeJson(path.join(DECISIONS_DIR, 'private-review-decisions-manifest.json'), backupManifest);
    writeJson(runDecisPath, backupRunDecis);
    writeJson(runManifestPath, backupRunManifest);
    process.exit(1);
  }
  log('OK: Approval markers successfully validated.');

  // 5. Cleanup and restore
  log('Step 5: Restoring baseline state and executing final validation cleanup...');
  if (fs.existsSync(tempMarkerPath)) fs.unlinkSync(tempMarkerPath);
  
  // Restore decisions
  writeJson(path.join(DECISIONS_DIR, 'private-review-decisions-latest.json'), backupDecis);
  writeJson(path.join(DECISIONS_DIR, 'private-review-decisions-manifest.json'), backupManifest);
  writeJson(runDecisPath, backupRunDecis);
  writeJson(runManifestPath, backupRunManifest);

  // Build empty packets to restore 0-packets baseline
  const rebuildResult = runCmd('node scripts/build-private-draft-candidate-packets.mjs');
  if (rebuildResult.status !== 0) {
    log('FAIL: Restoring empty draft packets failed!');
    process.exit(1);
  }
  log('OK: Baseline decisions and empty packets successfully restored.');

  // Final confirmation validators pass
  const finalValDecis = runCmd('node scripts/validate-private-review-decisions.mjs');
  if (finalValDecis.status !== 0) {
    log('FAIL: Final validation check on decisions failed after restore!');
    process.exit(1);
  }
  
  const finalValMarkers = runCmd('node scripts/validate-private-draft-approval-markers.mjs');
  if (finalValMarkers.status !== 0) {
    log('FAIL: Final validation check on approval markers failed after restore!');
    process.exit(1);
  }

  log('=== T064 Approval Gate & Promotion Test Suite PASSED ===');
  process.exit(0);
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
