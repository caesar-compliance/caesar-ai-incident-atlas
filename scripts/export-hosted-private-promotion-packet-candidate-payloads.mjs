// export-hosted-private-promotion-packet-candidate-payloads.mjs (T069)
// Exports sanitized private promotion packet candidate Supabase-ready payload. No remote write.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const CANDIDATE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-latest.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-promotion-packet-candidate.private-latest.json');

function log(msg) {
  process.stdout.write(`[Hosted Candidate Packet Exporter] ${msg}\n`);
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
  log('Exporting sanitized hosted private promotion-packet candidate Supabase payload...');

  const candidate = readJson(CANDIDATE_LATEST_PATH);
  if (!candidate) {
    log('FAIL: Cannot read private-promotion-packet-candidate-latest.json');
    process.exit(1);
  }

  const prep = candidate.private_package_preparation_checklist || {};
  const state = candidate.publication_approval_state || {};

  const sanitizedRecord = {
    candidate_packet_id: candidate.candidate_packet_id,
    created_at: candidate.created_at,
    source_run_id: candidate.source_run_id,
    dry_run_id: candidate.dry_run_id,
    package_id: candidate.package_id,
    signoff_id: candidate.signoff_id,
    status: candidate.status,
    public_publish_allowed: false,
    real_promotion_packet_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    remote_write_allowed: false,
    raw_text_storage_allowed: false,
    html_storage_allowed: false,
    source_chain_referenced: !!prep.source_chain_referenced,
    parent_package_referenced: !!prep.parent_package_referenced,
    dry_run_referenced: !!prep.dry_run_referenced,
    signoff_referenced: !!prep.signoff_referenced,
    blockers_preserved: !!prep.blockers_preserved,
    safety_flags_locked: !!prep.safety_flags_locked,
    console_export_ready: !!prep.console_export_ready,
    hosted_payload_sanitized: !!prep.hosted_payload_sanitized,
    publication_approval_status: state.status || 'blocked',
    unresolved_blocker_count: state.unresolved_blocker_count || 0
  };

  const payload = {
    _schema: 'caesar-atlas/ops/supabase/private-promotion-packet-candidate-payload/v1',
    generated_at: new Date().toISOString(),
    dry_run: 'export_only',
    remote_write_attempted: false,
    table: 'atlas_private_promotion_packet_candidates',
    note: 'Private promotion-packet candidate export only. Not publication approval. No INC-0014. No public publish. No remote write.',
    records: [sanitizedRecord]
  };

  writeJson(OUTPUT_PATH, payload);
  log(`Wrote hosted payload to: ${path.relative(ROOT, OUTPUT_PATH)}`);
  log(`  candidate_packet_id: ${sanitizedRecord.candidate_packet_id}`);
  log(`  status: ${sanitizedRecord.status}`);
  log(`  remote_write_attempted: false`);
  log('export-hosted-private-promotion-packet-candidate-payloads: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
