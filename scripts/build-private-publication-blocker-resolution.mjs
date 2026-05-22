// build-private-publication-blocker-resolution.mjs (T070)
// Builds a private publication blocker resolution dossier from T068 signoff, T067 dry-run, T066 package, and T069 candidate package.
// Local/private only. No network. No INC-0014. No real promotion packet. No public preview.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SIGNOFF_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const PACKAGE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');
const CANDIDATE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-latest.json');

const OUTPUT_DIR = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions');
const OUTPUT_LATEST_PATH = path.join(OUTPUT_DIR, 'private-publication-blocker-resolution-latest.json');
const OUTPUT_MANIFEST_PATH = path.join(OUTPUT_DIR, 'private-publication-blocker-resolution-manifest.json');

function log(msg) {
  process.stdout.write(`[Blocker Resolution Builder] ${msg}\n`);
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

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

async function run() {
  log('=== Building Private Publication Blocker Resolution Dossier ===');

  const signoff = readJson(SIGNOFF_LATEST_PATH);
  const dryRun = readJson(DRY_RUN_LATEST_PATH);
  const pkg = readJson(PACKAGE_LATEST_PATH);
  const candidate = readJson(CANDIDATE_LATEST_PATH);

  if (!signoff) {
    log('FAIL: Cannot read private-promotion-signoff-latest.json');
    process.exit(1);
  }
  if (!dryRun) {
    log('FAIL: Cannot read private-promotion-dry-run-latest.json');
    process.exit(1);
  }
  if (!pkg) {
    log('FAIL: Cannot read private-draft-candidate-package-latest.json');
    process.exit(1);
  }
  if (!candidate) {
    log('FAIL: Cannot read private-promotion-packet-candidate-latest.json');
    process.exit(1);
  }

  // Validate references
  if (candidate.signoff_id !== signoff.signoff_id) {
    log('FAIL: Candidate signoff_id mismatch');
    process.exit(1);
  }
  if (candidate.dry_run_id !== dryRun.dry_run_id) {
    log('FAIL: Candidate dry_run_id mismatch');
    process.exit(1);
  }
  if (candidate.package_id !== pkg.package_id) {
    log('FAIL: Candidate package_id mismatch');
    process.exit(1);
  }

  const runId = signoff.source_run_id;
  const suffix = signoff.intake_id ? signoff.intake_id.split('-').slice(-1)[0] : '001';
  const resolutionId = `PUB-BLOCKER-RES-${runId}-${suffix}`;
  const now = new Date().toISOString();

  // Define blocker ledger
  const blockerLedger = [
    {
      blocker_id: 'BLOCKER-001',
      source_signoff_blocker_id: 'human legal/governance review required',
      source_dimension: 'legal_review',
      blocker_type: 'human_legal_publication',
      original_status: 'blocked',
      t070_status: 'requires_human_publication_review',
      resolution_basis: 'Requires active legal and governance signoff before publication.',
      evidence_references: [],
      remaining_action: 'Obtain human legal review clearance.',
      human_review_required: true
    },
    {
      blocker_id: 'BLOCKER-002',
      source_signoff_blocker_id: 'source quotation review required',
      source_dimension: 'source_quotation_review',
      blocker_type: 'human_legal_publication',
      original_status: 'blocked',
      t070_status: 'requires_human_publication_review',
      resolution_basis: 'Requires verification of all source quotations and citations.',
      evidence_references: [],
      remaining_action: 'Verify source quotation compliance.',
      human_review_required: true
    },
    {
      blocker_id: 'BLOCKER-003',
      source_signoff_blocker_id: 'no public-safe narrative approved',
      source_dimension: 'public_narrative_review',
      blocker_type: 'human_legal_publication',
      original_status: 'blocked',
      t070_status: 'requires_human_publication_review',
      resolution_basis: 'Public-safe narrative requires human narrative editor approval.',
      evidence_references: [],
      remaining_action: 'Approve public narrative content.',
      human_review_required: true
    },
    {
      blocker_id: 'BLOCKER-004',
      source_signoff_blocker_id: 'no promotion packet created',
      source_dimension: 'technical_private_package_preparation',
      blocker_type: 'technical_private_package',
      original_status: 'blocked',
      t070_status: 'resolved',
      resolution_basis: 'Private promotion-packet candidate package has been successfully compiled and verified locally in T069.',
      evidence_references: [
        `private-promotion-packet-candidate-latest.json:${candidate.candidate_packet_id}`
      ],
      remaining_action: 'None. Private package compilation is complete.',
      human_review_required: false
    },
    {
      blocker_id: 'BLOCKER-005',
      source_signoff_blocker_id: 'no preview generated',
      source_dimension: 'publication_preview',
      blocker_type: 'human_legal_publication',
      original_status: 'blocked',
      t070_status: 'publication_blocked',
      resolution_basis: 'Public publication preview is strictly disabled. T070 does not create a public preview.',
      evidence_references: [],
      remaining_action: 'Generate a publication preview when final human review is complete.',
      human_review_required: true
    },
    {
      blocker_id: 'BLOCKER-006',
      source_signoff_blocker_id: 'no Control Tower public publish approval',
      source_dimension: 'control_tower_approval',
      blocker_type: 'human_legal_publication',
      original_status: 'blocked',
      t070_status: 'publication_blocked',
      resolution_basis: 'Requires ultimate approval from the human Control Tower before remote publication.',
      evidence_references: [],
      remaining_action: 'Submit the candidate package to the Control Tower for publication approval.',
      human_review_required: true
    }
  ];

  // We resolved 1 blocker, 5 remain unresolved
  const unresolvedCount = blockerLedger.filter(b => b.t070_status !== 'resolved').length;

  const dossierRecord = {
    resolution_id: resolutionId,
    created_at: now,
    source_run_id: runId,
    selected_intake_id: signoff.intake_id,
    selected_decision_id: signoff.decision_id,
    active_approval_id: signoff.approval_id,
    package_id: signoff.package_id,
    dry_run_id: signoff.dry_run_id,
    signoff_id: signoff.signoff_id,
    promotion_packet_candidate_id: candidate.candidate_packet_id,
    status: 'private_package_blockers_partially_resolved',
    private_blocker_resolution_dossier_only: true,
    not_publication_approval: true,
    not_real_promotion_packet: true,
    not_public_preview: true,
    not_public_record_creation: true,
    public_publish_allowed: false,
    real_promotion_packet_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    remote_write_allowed: false,
    raw_text_storage_allowed: false,
    html_storage_allowed: false,
    blocker_ledger: blockerLedger,
    safety_flags: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_public_preview: true,
      no_public_site_mutation: true,
      no_publication_approval_granted: true
    }
  };

  const dossierManifest = {
    _schema: 'caesar-atlas/reviews/private-publication-blocker-resolution-manifest/v1',
    generated_at: now,
    source_run_id: runId,
    resolution_count: 1,
    total_blockers_evaluated: blockerLedger.length,
    blockers_resolved_count: blockerLedger.filter(b => b.t070_status === 'resolved').length,
    blockers_remaining_count: unresolvedCount,
    public_publish_allowed_count: 0,
    resolution_id_summary: resolutionId,
    safety_status: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      remote_write_allowed: false,
      public_publish_allowed: false,
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_publication_approval_granted: true
    }
  };

  ensureDir(OUTPUT_DIR);
  writeJson(OUTPUT_LATEST_PATH, dossierRecord);
  writeJson(OUTPUT_MANIFEST_PATH, dossierManifest);
  log(`Wrote blocker resolution dossier to: ${path.relative(ROOT, OUTPUT_LATEST_PATH)}`);

  const runOutputDir = path.join(OUTPUT_DIR, 'runs', runId);
  ensureDir(runOutputDir);
  writeJson(path.join(runOutputDir, 'private-publication-blocker-resolution.json'), dossierRecord);
  writeJson(path.join(runOutputDir, 'private-publication-blocker-resolution-manifest.json'), dossierManifest);

  log('=== Private Publication Blocker Resolution Dossier Build COMPLETE ===');
  log(`  resolution_id:              ${resolutionId}`);
  log(`  total_blockers:             ${blockerLedger.length}`);
  log(`  resolved:                   ${blockerLedger.filter(b => b.t070_status === 'resolved').length}`);
  log(`  remaining:                  ${unresolvedCount}`);
  log(`  public_publish_allowed:     false`);
  log('  Safety: no INC-0014, no real promotion packet, no public preview, no remote writes');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
