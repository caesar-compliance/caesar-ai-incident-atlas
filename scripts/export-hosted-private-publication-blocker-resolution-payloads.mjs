// export-hosted-private-publication-blocker-resolution-payloads.mjs (T070)
// Exports sanitized private publication blocker resolution Supabase-ready payload. No remote write.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DOSSIER_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'private-publication-blocker-resolution-latest.json');
const DOSSIER_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'private-publication-blocker-resolution-manifest.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-publication-blocker-resolution.private-latest.json');

function log(msg) {
  process.stdout.write(`[Hosted Blocker Resolution Exporter] ${msg}\n`);
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
  log('Exporting sanitized hosted private blocker-resolution Supabase payload...');

  const dossier = readJson(DOSSIER_LATEST_PATH);
  const manifest = readJson(DOSSIER_MANIFEST_PATH);

  if (!dossier) {
    log('FAIL: Cannot read private-publication-blocker-resolution-latest.json');
    process.exit(1);
  }

  const ledger = dossier.blocker_ledger || [];
  const resolvedCount = ledger.filter(b => b.t070_status === 'resolved').length;
  const unresolvedCount = ledger.filter(b => b.t070_status !== 'resolved').length;

  const sanitizedRecord = {
    resolution_id: dossier.resolution_id,
    created_at: dossier.created_at,
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
    raw_text_storage_allowed: false,
    html_storage_allowed: false,
    total_blockers_evaluated: ledger.length,
    blockers_resolved_count: resolvedCount,
    blockers_remaining_count: unresolvedCount
  };

  const payload = {
    _schema: 'caesar-atlas/ops/supabase/private-publication-blocker-resolution-payload/v1',
    generated_at: new Date().toISOString(),
    dry_run: 'export_only',
    remote_write_attempted: false,
    intended_table: 'atlas_private_publication_blocker_resolutions',
    note: 'Private blocker-resolution dossier export only. Not publication approval. No INC-0014. No public publish. No remote write.',
    records: [sanitizedRecord]
  };

  writeJson(OUTPUT_PATH, payload);
  log(`Wrote hosted payload to: ${path.relative(ROOT, OUTPUT_PATH)}`);
  log(`  resolution_id: ${sanitizedRecord.resolution_id}`);
  log(`  status: ${sanitizedRecord.status}`);
  log(`  remote_write_attempted: false`);
  log('export-hosted-private-publication-blocker-resolution-payloads: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
