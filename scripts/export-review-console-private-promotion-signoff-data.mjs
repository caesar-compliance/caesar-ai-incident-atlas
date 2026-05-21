// export-review-console-private-promotion-signoff-data.mjs (T068)
// Exports private promotion signoff summary to tools/review-console/data/.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SIGNOFF_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const SIGNOFF_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-manifest.json');
const OUTPUT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-promotion-signoff.json');

function log(msg) {
  process.stdout.write(`[Console Promo Signoff Exporter] ${msg}\n`);
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
  log('Exporting private promotion signoff summary for Review Console...');

  const signoff = readJson(SIGNOFF_LATEST_PATH);
  const manifest = readJson(SIGNOFF_MANIFEST_PATH);

  if (!signoff) {
    log('FAIL: Cannot read private-promotion-signoff-latest.json');
    process.exit(1);
  }

  const consoleSummary = {
    _schema: 'caesar-atlas/review-console/private-promotion-signoff/v1',
    generated_at: new Date().toISOString(),
    label: 'Private Promotion Signoff',
    label_warnings: [
      'Private signoff only',
      'Not publication approval',
      'No real promotion packet',
      'No public preview',
      'No INC-0014'
    ],
    signoff_count: manifest ? (manifest.signoff_count || 1) : 1,
    source_run_id: signoff.source_run_id,
    dry_run_id: signoff.dry_run_id,
    signoff_status: signoff.signoff_status,
    suggested_public_record_id: {
      suggested_id: (signoff.suggested_public_record_id || {}).suggested_id || 'INC-0014-SUGGESTED',
      id_status: 'suggestion_only',
      creates_public_record: false
    },
    review_status_summary: {
      legal_review_status: signoff.legal_review_status,
      source_quotation_review_status: signoff.source_quotation_review_status,
      public_narrative_review_status: signoff.public_narrative_review_status,
      publication_risk_review_status: signoff.publication_risk_review_status,
      control_tower_publication_approval_status: signoff.control_tower_publication_approval_status
    },
    unresolved_blocker_count: (signoff.unresolved_blockers || []).length,
    unresolved_blockers: signoff.unresolved_blockers || [],
    public_publish_allowed: false,
    real_promotion_packet_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    next_allowed_step: signoff.next_allowed_step,
    safety_flags: signoff.safety_flags || {}
  };

  writeJson(OUTPUT_PATH, consoleSummary);
  log(`Wrote console summary to: ${path.relative(ROOT, OUTPUT_PATH)}`);
  log(`  signoff_count: ${consoleSummary.signoff_count}`);
  log(`  signoff_status: ${consoleSummary.signoff_status}`);
  log(`  unresolved_blocker_count: ${consoleSummary.unresolved_blocker_count}`);
  log('export-review-console-private-promotion-signoff-data: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
