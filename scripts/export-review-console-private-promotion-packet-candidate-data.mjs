// export-review-console-private-promotion-packet-candidate-data.mjs (T069)
// Exports private promotion-packet candidate summary to tools/review-console/data/.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const CANDIDATE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-latest.json');
const CANDIDATE_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-manifest.json');
const OUTPUT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-promotion-packet-candidate.json');

function log(msg) {
  process.stdout.write(`[Console Candidate Packet Exporter] ${msg}\n`);
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
  log('Exporting private promotion-packet candidate summary for Review Console...');

  const candidate = readJson(CANDIDATE_LATEST_PATH);
  const manifest = readJson(CANDIDATE_MANIFEST_PATH);

  if (!candidate) {
    log('FAIL: Cannot read private-promotion-packet-candidate-latest.json');
    process.exit(1);
  }

  const consoleSummary = {
    _schema: 'caesar-atlas/review-console/private-promotion-packet-candidate/v1',
    generated_at: new Date().toISOString(),
    label: 'Private promotion-packet candidate only — not public — no INC-0014 — not publication approval',
    label_warnings: [
      'Private promotion-packet candidate only',
      'Not public',
      'No INC-0014',
      'Not publication approval',
      'No remote writes'
    ],
    candidate_packet_count: manifest ? (manifest.candidate_packet_count || 1) : 1,
    candidate_packet_id: candidate.candidate_packet_id,
    source_run_id: candidate.source_run_id,
    dry_run_id: candidate.dry_run_id,
    package_id: candidate.package_id,
    signoff_id: candidate.signoff_id,
    status: candidate.status,
    note: candidate.note,
    public_publish_allowed: false,
    real_promotion_packet_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    remote_write_allowed: false,
    safety_flags: candidate.safety_flags || {},
    private_package_preparation_checklist: candidate.private_package_preparation_checklist || {},
    publication_approval_state: candidate.publication_approval_state || {}
  };

  writeJson(OUTPUT_PATH, consoleSummary);
  log(`Wrote console summary to: ${path.relative(ROOT, OUTPUT_PATH)}`);
  log(`  candidate_packet_id: ${consoleSummary.candidate_packet_id}`);
  log(`  status: ${consoleSummary.status}`);
  log(`  unresolved_blocker_count: ${consoleSummary.publication_approval_state.unresolved_blocker_count}`);
  log('export-review-console-private-promotion-packet-candidate-data: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
