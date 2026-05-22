// build-hosted-private-review-state-sync.mjs (T071)
// Builds a hosted private review-state sync readiness dossier from T070.
// Local/private only. No network. No INC-0014. No real promotion packet. No public preview.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const T070_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'private-publication-blocker-resolution-latest.json');
const OUTPUT_DIR = path.join(ROOT, 'data', 'runtime', 'private-review-state-sync');
const OUTPUT_LATEST_PATH = path.join(OUTPUT_DIR, 'hosted-private-review-state-sync-latest.json');
const OUTPUT_MANIFEST_PATH = path.join(OUTPUT_DIR, 'hosted-private-review-state-sync-manifest.json');

function log(msg) {
  process.stdout.write(`[Hosted private review-state sync builder] ${msg}\n`);
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
  log('=== Building Hosted Private Review-State Sync Readiness ===');

  const t070 = readJson(T070_LATEST_PATH);
  if (!t070) {
    log('FAIL: Cannot read private-publication-blocker-resolution-latest.json');
    process.exit(1);
  }

  const runId = t070.source_run_id;
  const suffix = t070.resolution_id ? t070.resolution_id.split('-').slice(-1)[0] : '001';
  const syncId = `HOSTED-PRIVATE-REVIEW-STATE-SYNC-${runId}-${suffix}`;
  const now = new Date().toISOString();

  // Construct T071 record matching schemas/pipeline/hosted-private-review-state-sync.schema.json
  const syncRecord = {
    sync_id: syncId,
    created_at: now,
    source_run_id: runId,
    selected_intake_id: t070.selected_intake_id,
    selected_decision_id: t070.selected_decision_id,
    active_approval_id: t070.active_approval_id,
    package_id: t070.package_id,
    dry_run_id: t070.dry_run_id,
    signoff_id: t070.signoff_id,
    promotion_packet_candidate_id: t070.promotion_packet_candidate_id,
    blocker_resolution_id: t070.resolution_id,
    sync_status: 'hosted_private_sync_readiness_prepared',
    boundary: {
      private_runtime_sync_readiness_only: true,
      not_remote_write: true,
      not_publication_approval: true,
      not_real_promotion_packet: true,
      not_public_preview: true,
      not_public_record_creation: true
    },
    flags: {
      remote_write_allowed: false,
      public_publish_allowed: false,
      real_promotion_packet_allowed: false,
      public_preview_allowed: false,
      public_record_creation_allowed: false,
      cron_allowed: false,
      worker_deploy_allowed: false,
      raw_text_storage_allowed: false,
      html_storage_allowed: false
    },
    hosted_sync_contract: {
      intended_supabase_table: 'atlas_private_review_state_snapshots',
      intended_worker_routes: [
        'GET /private/review-state/latest',
        'POST /private/review-state/sync-dry-run'
      ],
      payload_kind: 'metadata-only_private_governance_snapshot',
      payload_version: '1.0.0',
      dry_run_mode: true,
      remote_write_attempted: false
    },
    safety_flags: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_public_preview: true,
      no_public_site_mutation: true,
      no_publication_approval_granted: true,
      no_remote_write_attempted: true
    }
  };

  const syncManifest = {
    _schema: 'caesar-atlas/runtime/hosted-private-review-state-sync-manifest/v1',
    generated_at: now,
    source_run_id: runId,
    sync_id: syncId,
    sync_status: syncRecord.sync_status,
    intended_supabase_table: syncRecord.hosted_sync_contract.intended_supabase_table,
    dry_run_mode: syncRecord.hosted_sync_contract.dry_run_mode,
    remote_write_attempted: syncRecord.hosted_sync_contract.remote_write_attempted,
    safety_status: {
      no_secrets: true,
      remote_write_allowed: false,
      public_publish_allowed: false,
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_publication_approval_granted: true
    }
  };

  ensureDir(OUTPUT_DIR);
  writeJson(OUTPUT_LATEST_PATH, syncRecord);
  writeJson(OUTPUT_MANIFEST_PATH, syncManifest);
  log(`Wrote sync dossier to: ${path.relative(ROOT, OUTPUT_LATEST_PATH)}`);
  log(`Wrote sync manifest to: ${path.relative(ROOT, OUTPUT_MANIFEST_PATH)}`);

  const runOutputDir = path.join(OUTPUT_DIR, 'runs', runId);
  ensureDir(runOutputDir);
  writeJson(path.join(runOutputDir, 'hosted-private-review-state-sync.json'), syncRecord);
  writeJson(path.join(runOutputDir, 'hosted-private-review-state-sync-manifest.json'), syncManifest);

  log('=== Hosted Private Review-State Sync Dossier Build COMPLETE ===');
  log(`  sync_id:                    ${syncId}`);
  log(`  sync_status:                ${syncRecord.sync_status}`);
  log(`  intended_supabase_table:    ${syncRecord.hosted_sync_contract.intended_supabase_table}`);
  log(`  dry_run_mode:               ${syncRecord.hosted_sync_contract.dry_run_mode}`);
  log(`  remote_write_attempted:     ${syncRecord.hosted_sync_contract.remote_write_attempted}`);
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
