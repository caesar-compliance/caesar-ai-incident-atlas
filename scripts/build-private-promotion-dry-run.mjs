// build-private-promotion-dry-run.mjs (T067)
// Converts the T066 private draft candidate package into a private promotion dry-run bundle.
// Local/private only. No network. No raw HTML. No INC-0014. No real promotion packet.
// No public preview. No public record. No site mutation. No remote writes.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PACKAGE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');
const PACKAGE_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-manifest.json');

const OUTPUT_DIR = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs');
const OUTPUT_LATEST_PATH = path.join(OUTPUT_DIR, 'private-promotion-dry-run-latest.json');
const OUTPUT_MANIFEST_PATH = path.join(OUTPUT_DIR, 'private-promotion-dry-run-manifest.json');

function log(msg) {
  process.stdout.write(`[Promo Dry-Run Builder] ${msg}\n`);
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
  log('=== Building Private Promotion Dry-Run Bundle ===');

  // Load T066 private draft candidate package
  const pkg = readJson(PACKAGE_LATEST_PATH);
  if (!pkg) {
    log('FAIL: Cannot read private-draft-candidate-package-latest.json');
    process.exit(1);
  }
  if (pkg.draft_status !== 'private_draft_candidate') {
    log(`FAIL: Package draft_status is ${pkg.draft_status}, expected private_draft_candidate`);
    process.exit(1);
  }
  if (!pkg.public_publish_ready === undefined || pkg.public_publish_ready !== false) {
    log('FAIL: Package public_publish_ready must be false');
    process.exit(1);
  }

  log(`Loaded package: ${pkg.package_id} from run ${pkg.source_run_id}`);

  const manifest = readJson(PACKAGE_MANIFEST_PATH);
  const runId = pkg.source_run_id || (manifest ? manifest.run_id : 'UNKNOWN-RUN');
  const now = new Date().toISOString();

  // Build a stable dry-run ID from the source run ID
  const indexSuffix = pkg.intake_id ? pkg.intake_id.split('-').slice(-1)[0] : '001';
  const dryRunId = `PROMO-DRY-RUN-${runId}-${indexSuffix}`;

  // Governance chain is inherited from T066 package
  const governanceChain = pkg.governance_chain || {
    candidate_signal: `Signal from ${pkg.source_name || 'unknown'} under run ${runId}.`,
    legal_or_governance_risk: 'AI governance compliance risk — requires human legal assessment.',
    likely_failure_mode: (pkg.suggested_failure_modes || []).join(', ') || 'FM-GOVERNANCE-GAP',
    missing_controls: (pkg.suggested_control_themes || []).join(', ') || 'CTL-GUIDANCE-TRACKING',
    required_evidence: (pkg.suggested_evidence_questions || [])[0] || 'Evidence questions pending legal review.',
    vendor_questions: (pkg.suggested_vendor_questions || [])[0] || 'Vendor questions pending legal review.',
    training_lesson: `Ensure regular ingestion and compliance tracking of ${pkg.source_name || 'source'} guidelines.`,
    client_checklist_items: `Verify system alignment with ${pkg.source_name || 'source'} requirements.`
  };

  // Caesar-native proposed public summary (no third-party text, no raw HTML)
  const sourceName = pkg.source_name || 'AI Governance Source';
  const proposedPublicSummary =
    `AI Governance Case Candidate: ${sourceName}. ` +
    `This candidate was surfaced by the Caesar AI monitoring pipeline from a Green-tier regulatory/guidance source. ` +
    `The signal indicates potential compliance gaps in ${(pkg.suggested_control_themes || []).join(' and ')}. ` +
    `Human legal and governance review is required before any public promotion or publication. ` +
    `This summary is Caesar-native and metadata-only — no source text has been copied.`;

  // Publication blockers
  const publicationBlockers = [
    'human legal/governance review required',
    'source quotation review required',
    'no public-safe narrative approved',
    'no promotion packet created',
    'no preview generated',
    'no Control Tower public publish approval'
  ];

  // Missing items before T068
  const missingItems = [
    'human legal/governance review signature',
    'source text quotation verification',
    'public disclosure suitability check',
    'formal promotion packet generation (T068)',
    'publication preview validation',
    'Control Tower final publish approval'
  ];

  // Legal review checklist — pre-flight, mostly incomplete
  const legalReviewChecklist = {
    source_classification_checked: true,           // Already done in intake
    no_third_party_text_copied: true,              // Metadata-only pipeline enforced
    public_narrative_lawyer_approved: false,        // NOT YET — required before publish
    guidance_vs_enforcement_checked: true,          // Already assessed in T062/T066
    evidence_requirements_identified: true,         // Present in governance chain
    vendor_questions_identified: true,              // Present in governance chain
    publication_risk_approved: false                // NOT YET — required before publish
  };

  // Suggested public record ID — suggestion only, NOT a real INC creation
  const suggestedPublicRecordId = {
    suggested_id: 'INC-0014-SUGGESTED',
    id_status: 'suggestion_only',
    creates_public_record: false
  };

  const dryRunBundle = {
    dry_run_id: dryRunId,
    created_at: now,
    source_run_id: runId,
    package_id: pkg.package_id,
    intake_id: pkg.intake_id,
    decision_id: pkg.decision_id,
    approval_id: pkg.approval_id,
    candidate_hash: pkg.candidate_hash,
    dry_run_status: 'private_promotion_dry_run',
    suggested_public_record_id: suggestedPublicRecordId,
    suggested_title: pkg.suggested_title || `AI Governance Review: ${sourceName}`,
    suggested_record_type: pkg.suggested_record_type || 'candidate',
    legal_governance_relevance: pkg.legal_governance_relevance || 'high',
    governance_chain: governanceChain,
    proposed_public_summary: proposedPublicSummary,
    proposed_failure_modes: pkg.suggested_failure_modes || ['FM-GOVERNANCE-GAP'],
    proposed_control_themes: pkg.suggested_control_themes || ['CTL-GUIDANCE-TRACKING'],
    proposed_evidence_questions: pkg.suggested_evidence_questions || [],
    proposed_vendor_questions: pkg.suggested_vendor_questions || [],
    legal_review_checklist: legalReviewChecklist,
    publication_blockers: publicationBlockers,
    missing_items: missingItems,
    public_publish_ready: false,
    real_promotion_packet_created: false,
    public_preview_created: false,
    public_record_created: false,
    public_site_mutated: false,
    remote_write_attempted: false,
    raw_text_stored: false,
    html_stored: false,
    safety_flags: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets_exposed: true,
      no_unauthorized_remote_writes: true,
      no_public_site_leak: true,
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_public_preview: true
    }
  };

  const dryRunManifest = {
    _schema: 'caesar-atlas/reviews/private-promotion-dry-run-manifest/v1',
    generated_at: now,
    source_run_id: runId,
    dry_run_count: 1,
    blocker_count: publicationBlockers.length,
    missing_item_count: missingItems.length,
    public_publish_ready_count: 0,
    safety_status: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      remote_write_attempted: false,
      public_site_mutated: false,
      no_inc_0014_created: true,
      no_real_promotion_packet: true
    }
  };

  // Write latest output
  ensureDir(OUTPUT_DIR);
  writeJson(OUTPUT_LATEST_PATH, dryRunBundle);
  writeJson(OUTPUT_MANIFEST_PATH, dryRunManifest);
  log(`Wrote dry-run bundle to: ${path.relative(ROOT, OUTPUT_LATEST_PATH)}`);
  log(`Wrote manifest to: ${path.relative(ROOT, OUTPUT_MANIFEST_PATH)}`);

  // Write run-specific output
  const runOutputDir = path.join(OUTPUT_DIR, 'runs', runId);
  ensureDir(runOutputDir);
  writeJson(path.join(runOutputDir, 'private-promotion-dry-run.json'), dryRunBundle);
  writeJson(path.join(runOutputDir, 'private-promotion-dry-run-manifest.json'), dryRunManifest);
  log(`Wrote run-specific dry-run to: ${path.relative(ROOT, path.join(runOutputDir, 'private-promotion-dry-run.json'))}`);
  log(`Wrote run-specific manifest to: ${path.relative(ROOT, path.join(runOutputDir, 'private-promotion-dry-run-manifest.json'))}`);

  log('=== Private Promotion Dry-Run Bundle Build COMPLETE ===');
  log(`  dry_run_id:                  ${dryRunId}`);
  log(`  source_run_id:               ${runId}`);
  log(`  package_id:                  ${pkg.package_id}`);
  log(`  suggested_public_record_id:  INC-0014-SUGGESTED (suggestion_only, creates_public_record=false)`);
  log(`  dry_run_status:              private_promotion_dry_run`);
  log(`  public_publish_ready:        false`);
  log(`  blocker_count:               ${publicationBlockers.length}`);
  log('  Safety: no INC-0014 created, no real promotion packet, no public preview, no remote writes');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
