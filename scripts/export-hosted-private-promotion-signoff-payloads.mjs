// export-hosted-private-promotion-signoff-payloads.mjs (T068)
// Exports sanitized signoff Supabase-ready payload. No remote write.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SIGNOFF_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-promotion-signoff.private-latest.json');

function log(msg) {
  process.stdout.write(`[Hosted Promo Signoff Exporter] ${msg}\n`);
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
  log('Exporting sanitized hosted signoff Supabase payload...');

  const signoff = readJson(SIGNOFF_LATEST_PATH);
  if (!signoff) {
    log('FAIL: Cannot read private-promotion-signoff-latest.json');
    process.exit(1);
  }

  const sanitizedRecord = {
    signoff_id: signoff.signoff_id,
    created_at: signoff.created_at,
    source_run_id: signoff.source_run_id,
    dry_run_id: signoff.dry_run_id,
    package_id: signoff.package_id,
    signoff_status: signoff.signoff_status,
    legal_review_status: signoff.legal_review_status,
    source_quotation_review_status: signoff.source_quotation_review_status,
    public_narrative_review_status: signoff.public_narrative_review_status,
    publication_risk_review_status: signoff.publication_risk_review_status,
    control_tower_publication_approval_status: signoff.control_tower_publication_approval_status,
    unresolved_blocker_count: (signoff.unresolved_blockers || []).length,
    resolved_checklist_count: (signoff.resolved_checklist_items || []).length,
    next_allowed_step: signoff.next_allowed_step,
    public_publish_allowed: false,
    real_promotion_packet_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    remote_write_allowed: false,
    raw_text_storage_allowed: false,
    html_storage_allowed: false
  };

  const payload = {
    _schema: 'caesar-atlas/ops/supabase/private-promotion-signoff-payload/v1',
    generated_at: new Date().toISOString(),
    dry_run: 'export_only',
    remote_write_attempted: false,
    table: 'atlas_private_promotion_signoffs',
    note: 'Private signoff export only. Not publication approval. No INC-0014. No public publish. No remote write.',
    records: [sanitizedRecord]
  };

  writeJson(OUTPUT_PATH, payload);
  log(`Wrote hosted payload to: ${path.relative(ROOT, OUTPUT_PATH)}`);
  log(`  signoff_status: ${signoff.signoff_status}`);
  log(`  remote_write_attempted: false`);
  log('export-hosted-private-promotion-signoff-payloads: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
