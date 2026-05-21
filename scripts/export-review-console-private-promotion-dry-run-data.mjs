// export-review-console-private-promotion-dry-run-data.mjs (T067)
// Exports private promotion dry-run summary to tools/review-console/data/.
// Metadata/synthesis only. No raw text. No HTML. No secrets. Outside site/.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const DRY_RUN_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-manifest.json');
const OUTPUT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-promotion-dry-run.json');

function log(msg) {
  process.stdout.write(`[Console Promo Dry-Run Exporter] ${msg}\n`);
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
  log('Exporting private promotion dry-run summary for Review Console...');

  const dryRun = readJson(DRY_RUN_LATEST_PATH);
  const manifest = readJson(DRY_RUN_MANIFEST_PATH);

  if (!dryRun) {
    log('FAIL: Cannot read private-promotion-dry-run-latest.json');
    process.exit(1);
  }

  // Build console-safe summary — no raw text, no intake IDs, no approval keys, no source URLs
  const legalChecklist = dryRun.legal_review_checklist || {};
  const legalChecklistSummary = {
    source_classification_checked: legalChecklist.source_classification_checked || false,
    no_third_party_text_copied: legalChecklist.no_third_party_text_copied || false,
    public_narrative_lawyer_approved: false,
    guidance_vs_enforcement_checked: legalChecklist.guidance_vs_enforcement_checked || false,
    evidence_requirements_identified: legalChecklist.evidence_requirements_identified || false,
    vendor_questions_identified: legalChecklist.vendor_questions_identified || false,
    publication_risk_approved: false
  };

  const consoleSummary = {
    _schema: 'caesar-atlas/review-console/private-promotion-dry-run/v1',
    generated_at: new Date().toISOString(),
    label: 'Private Promotion Dry-Run',
    label_warnings: [
      'Private promotion dry-run only',
      'Not a real promotion packet',
      'No INC-0014 created',
      'No public preview',
      'Human legal/governance review required'
    ],
    dry_run_count: manifest ? (manifest.dry_run_count || 1) : 1,
    source_run_id: dryRun.source_run_id,
    package_id: dryRun.package_id,
    dry_run_status: dryRun.dry_run_status,
    suggested_public_record_id: {
      suggested_id: (dryRun.suggested_public_record_id || {}).suggested_id || 'INC-0014-SUGGESTED',
      id_status: 'suggestion_only',
      creates_public_record: false
    },
    suggested_title: dryRun.suggested_title,
    suggested_record_type: dryRun.suggested_record_type,
    legal_governance_relevance: dryRun.legal_governance_relevance,
    proposed_failure_modes: dryRun.proposed_failure_modes || [],
    proposed_control_themes: dryRun.proposed_control_themes || [],
    public_publish_ready_count: 0,
    blocker_count: manifest ? (manifest.blocker_count || (dryRun.publication_blockers || []).length) : (dryRun.publication_blockers || []).length,
    publication_blockers: dryRun.publication_blockers || [],
    missing_items: dryRun.missing_items || [],
    legal_checklist_summary: legalChecklistSummary,
    safety_flags: dryRun.safety_flags || {},
    // Omitted: dry_run_id, intake_id, decision_id, approval_id, candidate_hash,
    //          governance_chain (contains source-identifying text), proposed_public_summary,
    //          proposed_evidence_questions, proposed_vendor_questions (in full detail)
  };

  writeJson(OUTPUT_PATH, consoleSummary);
  log(`Wrote console summary to: ${path.relative(ROOT, OUTPUT_PATH)}`);
  log(`  dry_run_count: ${consoleSummary.dry_run_count}`);
  log(`  source_run_id: ${consoleSummary.source_run_id}`);
  log(`  dry_run_status: ${consoleSummary.dry_run_status}`);
  log(`  public_publish_ready_count: 0`);
  log(`  blocker_count: ${consoleSummary.blocker_count}`);
  log('export-review-console-private-promotion-dry-run-data: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
