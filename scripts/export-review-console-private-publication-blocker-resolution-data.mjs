// export-review-console-private-publication-blocker-resolution-data.mjs (T070)
// Exports private publication blocker resolution summary to tools/review-console/data/.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DOSSIER_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'private-publication-blocker-resolution-latest.json');
const DOSSIER_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'private-publication-blocker-resolution-manifest.json');
const OUTPUT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-publication-blocker-resolution.json');

function log(msg) {
  process.stdout.write(`[Console Blocker Resolution Exporter] ${msg}\n`);
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
  log('Exporting private blocker-resolution dossier summary for Review Console...');

  const dossier = readJson(DOSSIER_LATEST_PATH);
  const manifest = readJson(DOSSIER_MANIFEST_PATH);

  if (!dossier) {
    log('FAIL: Cannot read private-publication-blocker-resolution-latest.json');
    process.exit(1);
  }

  const consoleSummary = {
    _schema: 'caesar-atlas/review-console/private-publication-blocker-resolution/v1',
    generated_at: new Date().toISOString(),
    label: 'Private blocker-resolution dossier only — Publication remains blocked — No INC-0014 — No public preview — No real promotion packet — Human/legal/publication review still required',
    label_warnings: [
      'Private blocker-resolution dossier only',
      'Publication remains blocked',
      'No INC-0014',
      'No public preview',
      'No real promotion packet',
      'Human/legal/publication review still required',
      'No remote writes'
    ],
    resolution_count: manifest ? (manifest.resolution_count || 1) : 1,
    resolution_id: dossier.resolution_id,
    source_run_id: dossier.source_run_id,
    selected_intake_id: dossier.selected_intake_id,
    selected_decision_id: dossier.selected_decision_id,
    active_approval_id: dossier.active_approval_id,
    package_id: dossier.package_id,
    dry_run_id: dossier.dry_run_id,
    signoff_id: dossier.signoff_id,
    promotion_packet_candidate_id: dossier.promotion_packet_candidate_id,
    status: dossier.status,
    public_publish_allowed: false,
    real_promotion_packet_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    remote_write_allowed: false,
    blocker_ledger: dossier.blocker_ledger || [],
    safety_flags: dossier.safety_flags || {}
  };

  writeJson(OUTPUT_PATH, consoleSummary);
  log(`Wrote console summary to: ${path.relative(ROOT, OUTPUT_PATH)}`);
  log(`  resolution_id: ${consoleSummary.resolution_id}`);
  log(`  status: ${consoleSummary.status}`);
  log(`  total_blockers: ${consoleSummary.blocker_ledger.length}`);
  log(`  resolved: ${consoleSummary.blocker_ledger.filter(b => b.t070_status === 'resolved').length}`);
  log(`  remaining: ${consoleSummary.blocker_ledger.filter(b => b.t070_status !== 'resolved').length}`);
  log('export-review-console-private-publication-blocker-resolution-data: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
