// build-private-draft-candidate-packets.mjs (T063/T064)
// Generates private draft-candidate-ready packets for approved review decisions.
// Requires valid and active explicit approval markers.
// Bounded local-only execution. No remote writes, no site mutation, no public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_INTAKE_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const LATEST_DECIS_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const LATEST_PACKETS_PATH = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-latest.json');
const LATEST_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-manifest.json');
const ACTIVE_MARKERS_DIR = path.join(ROOT, 'data', 'reviews', 'approvals', 'active-markers');

function log(msg) {
  process.stdout.write(`[Packet Builder] ${msg}\n`);
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
  log('=== Building Private Draft-Candidate Ready Packets ===');

  const decisionsData = readJson(LATEST_DECIS_PATH);
  if (!decisionsData || !Array.isArray(decisionsData.decisions)) {
    log('FAIL: No private review decisions found.');
    process.exit(1);
  }

  const runId = decisionsData.run_id;
  const approvedDecisions = decisionsData.decisions.filter(d => d.decision_status === 'approve_for_private_draft');

  if (approvedDecisions.length === 0) {
    log('No approved decisions found. Writing empty packets file and manifest.');

    const manifest = {
      _schema: 'caesar-atlas/reviews/private-draft-candidate-packets-manifest/v1',
      generated_at: new Date().toISOString(),
      run_id: runId,
      packet_count: 0,
      safety_status: {
        no_raw_html: true,
        no_long_third_party_text: true,
        no_secrets: true,
        remote_write_attempted: false,
        public_site_mutated: false
      }
    };

    writeJson(LATEST_PACKETS_PATH, {
      _schema: 'caesar-atlas/reviews/private-draft-candidate-packets/v1',
      run_id: runId,
      generated_at: new Date().toISOString(),
      packets: []
    });
    writeJson(LATEST_MANIFEST_PATH, manifest);

    // Run-specific outputs
    const runPacketsDir = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'runs', runId);
    writeJson(path.join(runPacketsDir, 'draft-packets.json'), {
      _schema: 'caesar-atlas/reviews/private-draft-candidate-packets/v1',
      run_id: runId,
      generated_at: new Date().toISOString(),
      packets: []
    });
    writeJson(path.join(runPacketsDir, 'draft-packets-manifest.json'), manifest);

    log('PASS: Empty draft packets generated successfully.');
    process.exit(0);
  }

  log(`Found ${approvedDecisions.length} approved decision(s). Loading intake records...`);
  const intakeData = readJson(LATEST_INTAKE_PATH);
  if (!intakeData || !Array.isArray(intakeData.records)) {
    log('FAIL: No private candidate review intake records found.');
    process.exit(1);
  }

  const intakeMap = new Map();
  intakeData.records.forEach(r => {
    intakeMap.set(r.intake_id, r);
  });

  const packets = [];
  const now = new Date().toISOString();

  for (const decision of approvedDecisions) {
    const intakeId = decision.intake_id;
    const record = intakeMap.get(intakeId);

    if (!record) {
      log(`FAIL: Missing matching intake record for approved decision intake ID: ${intakeId}`);
      process.exit(1);
    }

    const indexSuffix = intakeId.split('-').slice(-1)[0];
    const expectedApprovalId = decision.approval_id || `APPROVAL-${runId}-${indexSuffix}`;
    const packetId = `DRAFT-CAND-PKT-${runId}-${indexSuffix}`;

    // Verify explicit active approval marker
    const markerPath = path.join(ACTIVE_MARKERS_DIR, `${expectedApprovalId}.json`);
    if (!fs.existsSync(markerPath)) {
      log(`FAIL: Approved decision ${decision.decision_id} lacks corresponding active approval marker file: ${markerPath}`);
      process.exit(1);
    }

    const marker = readJson(markerPath);
    if (!marker) {
      log(`FAIL: Approval marker at ${markerPath} is invalid or empty`);
      process.exit(1);
    }

    if (marker.approval_status !== 'approved_for_private_draft') {
      log(`FAIL: Approval marker ${expectedApprovalId} has non-active status: ${marker.approval_status}`);
      process.exit(1);
    }
    if (marker.control_tower_approval_present !== true) {
      log(`FAIL: Approval marker ${expectedApprovalId} is missing Control Tower signature`);
      process.exit(1);
    }
    if (marker.intake_id !== intakeId || marker.decision_id !== decision.decision_id) {
      log(`FAIL: Approval marker ${expectedApprovalId} data mismatch with decision/intake`);
      process.exit(1);
    }
    if (new Date(marker.expires_at) <= new Date()) {
      log(`FAIL: Approval marker ${expectedApprovalId} is expired`);
      process.exit(1);
    }

    log(`Approval marker ${expectedApprovalId} is valid and active.`);

    const packet = {
      packet_id: packetId,
      intake_id: intakeId,
      decision_id: decision.decision_id,
      approval_id: expectedApprovalId, // Embed approval reference!
      source_run_id: runId,
      candidate_hash: record.candidate_hash,
      suggested_record_type: record.suggested_record_type,
      suggested_failure_modes: record.suggested_failure_modes,
      suggested_control_themes: record.suggested_control_themes,
      suggested_evidence_questions: record.suggested_evidence_questions,
      suggested_vendor_questions: record.suggested_vendor_questions,
      draft_candidate_ready: true,
      public_publish_ready: false,
      promotion_packet_created: false,
      public_preview_created: false,
      public_site_mutated: false,
      remote_write_attempted: false,
      raw_text_stored: false,
      html_stored: false
    };

    packets.push(packet);
    log(`Built packet: ${packetId} for intake ID: ${intakeId}`);
  }

  const manifest = {
    _schema: 'caesar-atlas/reviews/private-draft-candidate-packets-manifest/v1',
    generated_at: now,
    run_id: runId,
    packet_count: packets.length,
    safety_status: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      remote_write_attempted: false,
      public_site_mutated: false
    }
  };

  const payload = {
    _schema: 'caesar-atlas/reviews/private-draft-candidate-packets/v1',
    run_id: runId,
    generated_at: now,
    packets: packets
  };

  // Write outputs
  writeJson(LATEST_PACKETS_PATH, payload);
  writeJson(LATEST_MANIFEST_PATH, manifest);
  log(`Wrote packets to: ${path.relative(ROOT, LATEST_PACKETS_PATH)}`);
  log(`Wrote packets manifest to: ${path.relative(ROOT, LATEST_MANIFEST_PATH)}`);

  // Run-specific outputs
  const runPacketsDir = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'runs', runId);
  const runPacketsPath = path.join(runPacketsDir, 'draft-packets.json');
  const runManifestPath = path.join(runPacketsDir, 'draft-packets-manifest.json');

  writeJson(runPacketsPath, payload);
  writeJson(runManifestPath, manifest);
  log(`Wrote stable run-specific packets to: ${path.relative(ROOT, runPacketsPath)}`);
  log(`Wrote stable run-specific manifest to: ${path.relative(ROOT, runManifestPath)}`);

  log('=== Private Draft-Candidate Ready Packets Build COMPLETE ===');
  log(`Total packets built: ${packets.length}`);
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
