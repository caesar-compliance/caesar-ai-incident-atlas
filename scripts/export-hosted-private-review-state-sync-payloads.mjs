// export-hosted-private-review-state-sync-payloads.mjs (T071)
// Exports sanitized private review-state sync Supabase-ready payload. No remote write.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DOSSIER_LATEST_PATH = path.join(ROOT, 'data', 'runtime', 'private-review-state-sync', 'hosted-private-review-state-sync-latest.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-review-state-sync.private-latest.json');

function log(msg) {
  process.stdout.write(`[Hosted Sync Exporter] ${msg}\n`);
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
  log('Exporting sanitized hosted private review-state sync Supabase payload...');

  const dossier = readJson(DOSSIER_LATEST_PATH);
  if (!dossier) {
    log('FAIL: Cannot read hosted-private-review-state-sync-latest.json');
    process.exit(1);
  }

  // Build the metadata-only, highly sanitized review-state record for Supabase
  const sanitizedRecord = {
    sync_id: dossier.sync_id,
    created_at: dossier.created_at,
    source_run_id: dossier.source_run_id,
    chain_ids: {
      selected_intake_id: dossier.selected_intake_id,
      selected_decision_id: dossier.selected_decision_id,
      active_approval_id: dossier.active_approval_id,
      package_id: dossier.package_id,
      dry_run_id: dossier.dry_run_id,
      signoff_id: dossier.signoff_id,
      promotion_packet_candidate_id: dossier.promotion_packet_candidate_id,
      blocker_resolution_id: dossier.blocker_resolution_id
    },
    sync_status: dossier.sync_status,
    blocker_status: 'private_package_blockers_partially_resolved',
    publication_blocked: true,
    public_flags: {
      public_publish_allowed: false,
      real_promotion_packet_allowed: false,
      public_preview_allowed: false,
      public_record_creation_allowed: false
    },
    review_state: {
      dry_run_mode: true,
      remote_write_attempted: false
    },
    hosted_payload_hash: 'sha256-mock-hash-t071'
  };

  const payload = {
    _schema: 'caesar-atlas/ops/supabase/private-review-state-sync-payload/v1',
    generated_at: new Date().toISOString(),
    dry_run: 'export_only',
    remote_write_attempted: false,
    intended_table: 'atlas_private_review_state_snapshots',
    note: 'Private review-state snapshot export only. Not publication approval. No INC-0014. No public publish. No remote write.',
    records: [sanitizedRecord]
  };

  writeJson(OUTPUT_PATH, payload);
  log(`Wrote hosted payload to: ${path.relative(ROOT, OUTPUT_PATH)}`);

  // Build the review console-specific sync summary file
  const CONSOLE_OUTPUT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-review-state-sync.json');
  const consoleSummary = {
    _schema: 'caesar-atlas/review-console/hosted-private-review-state-sync/v1',
    generated_at: new Date().toISOString(),
    sync_id: dossier.sync_id,
    source_run_id: dossier.source_run_id,
    selected_intake_id: dossier.selected_intake_id,
    selected_decision_id: dossier.selected_decision_id,
    active_approval_id: dossier.active_approval_id,
    package_id: dossier.package_id,
    dry_run_id: dossier.dry_run_id,
    signoff_id: dossier.signoff_id,
    promotion_packet_candidate_id: dossier.promotion_packet_candidate_id,
    blocker_resolution_id: dossier.blocker_resolution_id,
    sync_status: dossier.sync_status,
    boundary: dossier.boundary,
    flags: dossier.flags,
    hosted_sync_contract: dossier.hosted_sync_contract,
    safety_flags: dossier.safety_flags
  };

  writeJson(CONSOLE_OUTPUT_PATH, consoleSummary);
  log(`Wrote review-console summary to: ${path.relative(ROOT, CONSOLE_OUTPUT_PATH)}`);

  log(`  sync_id: ${sanitizedRecord.sync_id}`);
  log(`  sync_status: ${sanitizedRecord.sync_status}`);
  log(`  remote_write_attempted: false`);
  log('export-hosted-private-review-state-sync-payloads: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
