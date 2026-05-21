// test-controlled-private-draft-approval.mjs (T065)
// Regression test verifying the T065 controlled approval state:
// - Exactly one active approval marker exists.
// - A second active approval attempt fails.
// - Packet builder produces exactly one packet referencing the active marker.
// - Public publish flags, site mutations, remote writes are blocked.
// - All validators pass.

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
  process.stdout.write(`[Controlled Gate Test] ${msg}\n`);
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function existsFile(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isFile(); }
  catch { return false; }
}

function existsDir(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isDirectory(); }
  catch { return false; }
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
  log('=== Starting T065 Controlled Approval Regression Tests ===');

  // 1. Verify exactly one active approval marker exists
  log('Checking active approval markers...');
  if (!existsDir(ACTIVE_MARKERS_DIR)) {
    log('FAIL: active-markers directory does not exist.');
    process.exit(1);
  }
  const activeFiles = fs.readdirSync(ACTIVE_MARKERS_DIR).filter(f => f.endsWith('.json'));
  if (activeFiles.length !== 1) {
    log(`FAIL: Expected exactly 1 active approval marker file, found: ${activeFiles.length}`);
    process.exit(1);
  }
  const activeMarker = readJson(path.join(ACTIVE_MARKERS_DIR, activeFiles[0]));
  if (!activeMarker || activeMarker.approval_status !== 'approved_for_private_draft') {
    log('FAIL: Active approval marker is invalid or not in approved_for_private_draft status.');
    process.exit(1);
  }
  log(`OK: Found exactly one active approval marker: ${activeMarker.approval_id}`);

  // 2. Verify second active approval attempt fails
  log('Verifying second active approval attempt is rejected...');
  const duplicateResult = runCmd('node scripts/create-active-private-draft-approval.mjs --intake-id INTAKE-GREEN-RUN-20260521-202417-002 --reason "Attempting a duplicate active marker" --control-tower-approval YES');
  if (duplicateResult.status === 0) {
    log('FAIL: Second active approval marker creation succeeded when it should have failed!');
    process.exit(1);
  }
  log('OK: Second active approval attempt correctly rejected.');

  // 3. Verify exactly one draft candidate packet is compiled and references active marker
  log('Verifying draft candidate packets...');
  const packetsLatestPath = path.join(PACKETS_DIR, 'private-draft-candidate-packets-latest.json');
  if (!existsFile(packetsLatestPath)) {
    log('FAIL: private-draft-candidate-packets-latest.json is missing.');
    process.exit(1);
  }
  const packetsLatest = readJson(packetsLatestPath);
  if (!packetsLatest || !Array.isArray(packetsLatest.packets) || packetsLatest.packets.length !== 1) {
    log(`FAIL: Expected exactly 1 draft candidate packet, found: ${packetsLatest ? packetsLatest.packets.length : 0}`);
    process.exit(1);
  }
  const packet = packetsLatest.packets[0];
  if (packet.approval_id !== activeMarker.approval_id) {
    log(`FAIL: Packet approval_id "${packet.approval_id}" does not match active marker approval_id "${activeMarker.approval_id}"`);
    process.exit(1);
  }
  log(`OK: Draft packet successfully compiled and references correct active marker.`);

  // 4. Verify safety constraints on approved decision and packet
  log('Verifying safety and containment flags...');
  const decisionsLatest = readJson(path.join(DECISIONS_DIR, 'private-review-decisions-latest.json'));
  const approvedDecision = decisionsLatest.decisions.find(d => d.decision_status === 'approve_for_private_draft');
  if (!approvedDecision) {
    log('FAIL: Approved decision not found in decisions list.');
    process.exit(1);
  }

  const safetyChecks = [
    { label: 'Decision public_publish_ready', val: approvedDecision.public_publish_ready, expected: false },
    { label: 'Decision promotion_packet_created', val: approvedDecision.promotion_packet_created, expected: false },
    { label: 'Decision public_preview_created', val: approvedDecision.public_preview_created, expected: false },
    { label: 'Decision public_site_mutated', val: approvedDecision.public_site_mutated, expected: false },
    { label: 'Decision remote_write_attempted', val: approvedDecision.remote_write_attempted, expected: false },
    { label: 'Decision raw_text_stored', val: approvedDecision.raw_text_stored, expected: false },
    { label: 'Decision html_stored', val: approvedDecision.html_stored, expected: false },
    { label: 'Packet draft_candidate_ready', val: packet.draft_candidate_ready, expected: true },
    { label: 'Packet public_publish_ready', val: packet.public_publish_ready, expected: false },
    { label: 'Packet promotion_packet_created', val: packet.promotion_packet_created, expected: false },
    { label: 'Packet public_preview_created', val: packet.public_preview_created, expected: false },
    { label: 'Packet public_site_mutated', val: packet.public_site_mutated, expected: false },
    { label: 'Packet remote_write_attempted', val: packet.remote_write_attempted, expected: false },
    { label: 'Packet raw_text_stored', val: packet.raw_text_stored, expected: false },
    { label: 'Packet html_stored', val: packet.html_stored, expected: false },
  ];

  for (const check of safetyChecks) {
    if (check.val !== check.expected) {
      log(`FAIL: ${check.label} is ${check.val}, expected ${check.expected}`);
      process.exit(1);
    }
  }
  log('OK: All safety flags conform to private draft containment limits.');

  // 5. Verify no real promotion packets or public previews created
  log('Checking real promotion packets and public previews directories...');
  const promPath = path.join(ROOT, 'data', 'promotion-packets', 'real');
  if (existsDir(promPath)) {
    const files = fs.readdirSync(promPath).filter(f => f !== '.gitkeep' && !/^PKT-000[1-9]\.json$/.test(f));
    if (files.length > 0) {
      log(`FAIL: Prohibited real promotion packets found: ${files.join(', ')}`);
      process.exit(1);
    }
  }
  const prevPath = path.join(ROOT, 'data', 'publication-previews', 'real');
  if (existsDir(prevPath)) {
    const files = fs.readdirSync(prevPath).filter(f => f !== '.gitkeep' && f !== 'inc-0013-preview.json');
    if (files.length > 0) {
      log(`FAIL: Prohibited real publication previews found: ${files.join(', ')}`);
      process.exit(1);
    }
  }
  log('OK: No unauthorized promotion packets or public previews.');

  // 6. Verify no site mutation (git status public root site/)
  log('Checking for site/ mutations...');
  const gitStatusSiteLines = runCmd('git status --porcelain site/').output.trim().split('\n').filter(Boolean);
  const unexpectedMutations = gitStatusSiteLines.filter(line => {
    const filePath = line.trim().split(/\s+/)[1];
    return filePath !== 'site/data/ops/latest-status.json' && filePath !== 'site/data/ops/latest-watch-run-public.json';
  });
  if (unexpectedMutations.length > 0) {
    log(`FAIL: Public site folder has uncommitted unexpected changes:\n${unexpectedMutations.join('\n')}`);
    process.exit(1);
  }
  log('OK: Public site/ remains clean.');

  // 7. Verify all validation scripts pass
  log('Running all core validation scripts...');
  const v1 = runCmd('node scripts/validate-private-draft-approval-markers.mjs');
  if (v1.status !== 0) {
    log(`FAIL: validate-private-draft-approval-markers failed:\n${v1.output}`);
    process.exit(1);
  }
  log('OK: validate-private-draft-approval-markers passes.');

  const v2 = runCmd('node scripts/validate-private-review-decisions.mjs');
  if (v2.status !== 0) {
    log(`FAIL: validate-private-review-decisions failed:\n${v2.output}`);
    process.exit(1);
  }
  log('OK: validate-private-review-decisions passes.');

  const v3 = runCmd('node scripts/validate-hosted-sync-safety.mjs');
  if (v3.status !== 0) {
    log(`FAIL: validate-hosted-sync-safety failed:\n${v3.output}`);
    process.exit(1);
  }
  log('OK: validate-hosted-sync-safety passes.');

  log('=== All T065 Controlled Approval Regression Tests PASSED ===');
  process.exit(0);
}

run().catch(err => {
  log(`Fatal error in test runner: ${err.message}`);
  process.exit(1);
});
