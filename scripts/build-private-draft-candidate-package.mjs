// build-private-draft-candidate-package.mjs (T066)
// Converts the single approved private draft-candidate packet into a richer internal draft candidate package.
// Private/local only. Metadata/synthesis only. No remote write, no site case/page mutation, no public publish.

import fs from 'fs';
import path from 'url';
import nodeFs from 'fs';
import nodePath from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const ROOT = nodePath.dirname(__dirname);

const LATEST_PACKETS_PATH = nodePath.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-latest.json');
const LATEST_INTAKE_PATH = nodePath.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const LATEST_DECIS_PATH = nodePath.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const ACTIVE_MARKERS_DIR = nodePath.join(ROOT, 'data', 'reviews', 'approvals', 'active-markers');

const OUTPUT_LATEST_PACKAGE_PATH = nodePath.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');
const OUTPUT_LATEST_MANIFEST_PATH = nodePath.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-manifest.json');

function log(msg) {
  process.stdout.write(`[Package Builder] ${msg}\n`);
}

function readJson(p) {
  try { return JSON.parse(nodeFs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function writeJson(p, data) {
  const dir = nodePath.dirname(p);
  if (!nodeFs.existsSync(dir)) nodeFs.mkdirSync(dir, { recursive: true });
  nodeFs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

async function run() {
  log('=== Shaping Rich Private Draft Candidate Package ===');

  const packetsData = readJson(LATEST_PACKETS_PATH);
  if (!packetsData || !Array.isArray(packetsData.packets) || packetsData.packets.length === 0) {
    log('FAIL: No approved private draft-candidate packets found in latest JSON.');
    process.exit(1);
  }

  const runId = packetsData.run_id;
  const packet = packetsData.packets[0];
  log(`Loaded packet ID: ${packet.packet_id} for Intake ID: ${packet.intake_id}`);

  const intakeData = readJson(LATEST_INTAKE_PATH);
  if (!intakeData || !Array.isArray(intakeData.records)) {
    log('FAIL: No private candidate review intake records found.');
    process.exit(1);
  }

  const record = intakeData.records.find(r => r.intake_id === packet.intake_id);
  if (!record) {
    log(`FAIL: Missing matching intake record for packet intake ID: ${packet.intake_id}`);
    process.exit(1);
  }

  const decisionsData = readJson(LATEST_DECIS_PATH);
  if (!decisionsData || !Array.isArray(decisionsData.decisions)) {
    log('FAIL: No private review decisions found.');
    process.exit(1);
  }

  const decision = decisionsData.decisions.find(d => d.decision_id === packet.decision_id);
  if (!decision) {
    log(`FAIL: Missing matching decision record for packet decision ID: ${packet.decision_id}`);
    process.exit(1);
  }

  // Double check approval marker exists
  const markerPath = nodePath.join(ACTIVE_MARKERS_DIR, `${packet.approval_id}.json`);
  if (!nodeFs.existsSync(markerPath)) {
    log(`FAIL: Missing active approval marker file: ${markerPath}`);
    process.exit(1);
  }

  const marker = readJson(markerPath);
  if (!marker || marker.approval_status !== 'approved_for_private_draft') {
    log(`FAIL: Approval marker ${packet.approval_id} is inactive or invalid.`);
    process.exit(1);
  }

  const indexSuffix = packet.intake_id.split('-').slice(-1)[0];
  const packageId = `DRAFT-CAND-PKG-${runId}-${indexSuffix}`;
  const now = new Date().toISOString();

  // Governance Chain Shaping
  const governanceChain = {
    candidate_signal: `Ingested signal from ${record.source_name} (${record.source_id}) under run ${runId}.`,
    legal_or_governance_risk: `Risk level is ${record.legal_governance_relevance}. Potential AI and governance compliance misalignment.`,
    likely_failure_mode: `Identified failure mode(s): ${record.suggested_failure_modes.join(', ')}.`,
    missing_controls: `Identified missing control theme(s): ${record.suggested_control_themes.join(', ')}.`,
    required_evidence: `Required evidence question: ${record.suggested_evidence_questions[0] || 'None suggested.'}`,
    vendor_questions: `Required vendor question: ${record.suggested_vendor_questions[0] || 'None suggested.'}`,
    training_lesson: `Ensure regular ingestion and compliance tracking of ${record.source_name} guidelines.`,
    client_checklist_items: `Verify system alignment with ${record.source_name} requirements.`
  };

  // Public Readiness Block
  const publicReadiness = {
    status: 'not_ready',
    blockers: [
      'human legal/governance review required',
      'no source quotation review',
      'no public-safe narrative approved',
      'no promotion packet created',
      'no publication preview created'
    ],
    allowed_next_step: 'private_package_review_only'
  };

  const draftPackage = {
    package_id: packageId,
    created_at: now,
    source_run_id: runId,
    intake_id: packet.intake_id,
    decision_id: packet.decision_id,
    approval_id: packet.approval_id,
    candidate_hash: packet.candidate_hash,
    source_id: record.source_id,
    source_name: record.source_name,
    source_url: record.source_url,
    draft_status: 'private_draft_candidate',
    suggested_title: `AI Governance Review: ${record.source_name}`,
    suggested_record_type: record.suggested_record_type,
    legal_governance_relevance: record.legal_governance_relevance,
    suggested_failure_modes: record.suggested_failure_modes,
    suggested_control_themes: record.suggested_control_themes,
    suggested_evidence_questions: record.suggested_evidence_questions,
    suggested_vendor_questions: record.suggested_vendor_questions,
    governance_chain: governanceChain,
    public_readiness: publicReadiness,
    missing_review_items: [
      'human legal/governance review signature',
      'source text quotation verification',
      'public disclosure suitability check',
      'promotion packet generation',
      'publication preview validation'
    ],
    human_review_required: true,
    public_publish_ready: false,
    promotion_packet_created: false,
    public_preview_created: false,
    public_site_mutated: false,
    remote_write_attempted: false,
    raw_text_stored: false,
    html_stored: false,
    safety_flags: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets_exposed: true,
      no_unauthorized_remote_writes: true,
      no_public_site_leak: true
    }
  };

  const manifest = {
    _schema: 'caesar-atlas/reviews/private-draft-candidate-package-manifest/v1',
    generated_at: now,
    run_id: runId,
    package_count: 1,
    safety_status: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      remote_write_attempted: false,
      public_site_mutated: false
    }
  };

  // Write outputs to latest
  writeJson(OUTPUT_LATEST_PACKAGE_PATH, draftPackage);
  writeJson(OUTPUT_LATEST_MANIFEST_PATH, manifest);
  log(`Wrote rich package to: ${nodePath.relative(ROOT, OUTPUT_LATEST_PACKAGE_PATH)}`);
  log(`Wrote manifest to: ${nodePath.relative(ROOT, OUTPUT_LATEST_MANIFEST_PATH)}`);

  // Write outputs to run specific directories
  const runPackageDir = nodePath.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'runs', runId);
  const runPackagePath = nodePath.join(runPackageDir, 'private-draft-candidate-package.json');
  const runManifestPath = nodePath.join(runPackageDir, 'private-draft-candidate-manifest.json');

  writeJson(runPackagePath, draftPackage);
  writeJson(runManifestPath, manifest);
  log(`Wrote run-specific package to: ${nodePath.relative(ROOT, runPackagePath)}`);
  log(`Wrote run-specific manifest to: ${nodePath.relative(ROOT, runManifestPath)}`);

  log('=== Private Draft Candidate Package Build COMPLETE ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
