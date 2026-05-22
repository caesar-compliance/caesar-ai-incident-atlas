// build-private-promotion-packet-candidate.mjs (T069)
// Creates a private promotion-packet candidate package from T068 signoff, T067 dry-run, and T066 private draft package.
// Local/private only. No network. No INC-0014. No real promotion packet. No public preview.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SIGNOFF_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const PACKAGE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');

const OUTPUT_DIR = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates');
const OUTPUT_LATEST_PATH = path.join(OUTPUT_DIR, 'private-promotion-packet-candidate-latest.json');
const OUTPUT_MANIFEST_PATH = path.join(OUTPUT_DIR, 'private-promotion-packet-candidate-manifest.json');

function log(msg) {
  process.stdout.write(`[Candidate Packet Builder] ${msg}\n`);
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
  log('=== Building Private Promotion Packet Candidate Package ===');

  const signoff = readJson(SIGNOFF_LATEST_PATH);
  const dryRun = readJson(DRY_RUN_LATEST_PATH);
  const pkg = readJson(PACKAGE_LATEST_PATH);

  if (!signoff) {
    log('FAIL: Cannot read private-promotion-signoff-latest.json');
    process.exit(1);
  }
  if (!dryRun) {
    log('FAIL: Cannot read private-promotion-dry-run-latest.json');
    process.exit(1);
  }
  if (!pkg) {
    log('FAIL: Cannot read private-draft-candidate-package-latest.json');
    process.exit(1);
  }

  // Confirm references match
  if (signoff.dry_run_id !== dryRun.dry_run_id) {
    log('FAIL: Signoff dry_run_id does not match T067 dry-run');
    process.exit(1);
  }
  if (signoff.package_id !== pkg.package_id) {
    log('FAIL: Signoff package_id does not match T066 package');
    process.exit(1);
  }

  const runId = signoff.source_run_id;
  const suffix = signoff.intake_id ? signoff.intake_id.split('-').slice(-1)[0] : '001';
  const candidatePacketId = `PROMO-PACKET-CAND-${runId}-${suffix}`;
  const now = new Date().toISOString();

  const unresolvedBlockers = signoff.unresolved_blockers || [];

  const candidateRecord = {
    candidate_packet_id: candidatePacketId,
    created_at: now,
    source_run_id: runId,
    dry_run_id: signoff.dry_run_id,
    package_id: signoff.package_id,
    signoff_id: signoff.signoff_id,
    status: 'private_promotion_packet_candidate_prepared',
    note: 'Private promotion-packet candidate only — not public — no INC-0014 — not publication approval',
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
      no_secrets: true,
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_public_preview: true,
      no_public_site_mutation: true
    },
    private_package_preparation_checklist: {
      source_chain_referenced: true,
      parent_package_referenced: true,
      dry_run_referenced: true,
      signoff_referenced: true,
      blockers_preserved: true,
      safety_flags_locked: true,
      console_export_ready: true,
      hosted_payload_sanitized: true
    },
    publication_approval_state: {
      status: 'blocked',
      unresolved_blocker_count: unresolvedBlockers.length,
      publication_blockers: unresolvedBlockers
    }
  };

  const candidateManifest = {
    _schema: 'caesar-atlas/reviews/private-promotion-packet-candidate-manifest/v1',
    generated_at: now,
    source_run_id: runId,
    candidate_packet_count: 1,
    unresolved_blocker_count: unresolvedBlockers.length,
    public_publish_allowed_count: 0,
    candidate_packet_id_summary: candidatePacketId,
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
  writeJson(OUTPUT_LATEST_PATH, candidateRecord);
  writeJson(OUTPUT_MANIFEST_PATH, candidateManifest);
  log(`Wrote candidate packet to: ${path.relative(ROOT, OUTPUT_LATEST_PATH)}`);

  const runOutputDir = path.join(OUTPUT_DIR, 'runs', runId);
  ensureDir(runOutputDir);
  writeJson(path.join(runOutputDir, 'private-promotion-packet-candidate.json'), candidateRecord);
  writeJson(path.join(runOutputDir, 'private-promotion-packet-candidate-manifest.json'), candidateManifest);

  log('=== Private Promotion Packet Candidate Package Build COMPLETE ===');
  log(`  candidate_packet_id:        ${candidatePacketId}`);
  log(`  unresolved_blocker_count:   ${unresolvedBlockers.length}`);
  log(`  public_publish_allowed:     false`);
  log('  Safety: no INC-0014, no real promotion packet, no public preview, no remote writes');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
