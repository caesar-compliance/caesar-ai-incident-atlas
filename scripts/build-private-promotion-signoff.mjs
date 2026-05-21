// build-private-promotion-signoff.mjs (T068)
// Creates a private promotion review/signoff record from the T067 dry-run bundle.
// Local/private only. No network. No INC-0014. No real promotion packet. No public preview.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const DRY_RUN_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-manifest.json');

const OUTPUT_DIR = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs');
const OUTPUT_LATEST_PATH = path.join(OUTPUT_DIR, 'private-promotion-signoff-latest.json');
const OUTPUT_MANIFEST_PATH = path.join(OUTPUT_DIR, 'private-promotion-signoff-manifest.json');

function log(msg) {
  process.stdout.write(`[Promo Signoff Builder] ${msg}\n`);
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
  log('=== Building Private Promotion Signoff Record ===');

  const dryRun = readJson(DRY_RUN_LATEST_PATH);
  if (!dryRun) {
    log('FAIL: Cannot read private-promotion-dry-run-latest.json');
    process.exit(1);
  }
  if (dryRun.dry_run_status !== 'private_promotion_dry_run') {
    log(`FAIL: dry_run_status is ${dryRun.dry_run_status}, expected private_promotion_dry_run`);
    process.exit(1);
  }
  if (dryRun.public_publish_ready !== false) {
    log('FAIL: T067 dry-run public_publish_ready must be false');
    process.exit(1);
  }

  const dryManifest = readJson(DRY_RUN_MANIFEST_PATH);
  const runId = dryRun.source_run_id || (dryManifest ? dryManifest.source_run_id : 'UNKNOWN-RUN');
  const now = new Date().toISOString();
  const indexSuffix = dryRun.intake_id ? dryRun.intake_id.split('-').slice(-1)[0] : '001';
  const signoffId = `SIGNOFF-${runId}-${indexSuffix}`;

  const unresolvedBlockers = dryRun.publication_blockers || [
    'human legal/governance review required',
    'source quotation review required',
    'no public-safe narrative approved',
    'no promotion packet created',
    'no preview generated',
    'no Control Tower public publish approval'
  ];

  const signoffStatus = unresolvedBlockers.length > 0
    ? 'private_review_blocked'
    : 'private_review_pending';

  const signoffRecord = {
    signoff_id: signoffId,
    created_at: now,
    source_run_id: runId,
    dry_run_id: dryRun.dry_run_id,
    package_id: dryRun.package_id,
    intake_id: dryRun.intake_id,
    decision_id: dryRun.decision_id,
    approval_id: dryRun.approval_id,
    suggested_public_record_id: dryRun.suggested_public_record_id || {
      suggested_id: 'INC-0014-SUGGESTED',
      id_status: 'suggestion_only',
      creates_public_record: false
    },
    signoff_status: signoffStatus,
    reviewer_mode: 'local_human_review_gate',
    legal_review_status: 'pending',
    source_quotation_review_status: 'pending',
    public_narrative_review_status: 'pending',
    publication_risk_review_status: 'pending',
    control_tower_publication_approval_status: 'pending',
    unresolved_blockers: unresolvedBlockers,
    resolved_checklist_items: [],
    signoff_notes: 'T068 private promotion signoff initialized from T067 dry-run. All review dimensions pending. Not publication approval.',
    next_allowed_step: 'complete_private_review_checklist_before_T069',
    public_publish_allowed: false,
    real_promotion_packet_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    remote_write_allowed: false,
    raw_text_storage_allowed: false,
    html_storage_allowed: false,
    safety_flags: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets_exposed: true,
      no_unauthorized_remote_writes: true,
      no_public_site_leak: true,
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_public_preview: true,
      not_publication_approval: true
    }
  };

  const signoffManifest = {
    _schema: 'caesar-atlas/reviews/private-promotion-signoff-manifest/v1',
    generated_at: now,
    source_run_id: runId,
    signoff_count: 1,
    unresolved_blocker_count: unresolvedBlockers.length,
    public_publish_allowed_count: 0,
    signoff_status_summary: signoffStatus,
    safety_status: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      remote_write_allowed: false,
      public_publish_allowed: false,
      no_inc_0014_created: true,
      no_real_promotion_packet: true
    }
  };

  ensureDir(OUTPUT_DIR);
  writeJson(OUTPUT_LATEST_PATH, signoffRecord);
  writeJson(OUTPUT_MANIFEST_PATH, signoffManifest);
  log(`Wrote signoff record to: ${path.relative(ROOT, OUTPUT_LATEST_PATH)}`);

  const runOutputDir = path.join(OUTPUT_DIR, 'runs', runId);
  ensureDir(runOutputDir);
  writeJson(path.join(runOutputDir, 'private-promotion-signoff.json'), signoffRecord);
  writeJson(path.join(runOutputDir, 'private-promotion-signoff-manifest.json'), signoffManifest);

  log('=== Private Promotion Signoff Build COMPLETE ===');
  log(`  signoff_id:                 ${signoffId}`);
  log(`  dry_run_id:                 ${dryRun.dry_run_id}`);
  log(`  signoff_status:             ${signoffStatus}`);
  log(`  unresolved_blocker_count:   ${unresolvedBlockers.length}`);
  log(`  public_publish_allowed:     false`);
  log('  Safety: no INC-0014, no real promotion packet, no public preview, no remote writes');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
