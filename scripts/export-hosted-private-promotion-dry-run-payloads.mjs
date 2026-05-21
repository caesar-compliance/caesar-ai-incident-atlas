// export-hosted-private-promotion-dry-run-payloads.mjs (T067)
// Exports sanitized dry-run Supabase-ready payload for atlas_private_promotion_dry_runs table.
// No remote write. No raw HTML. No long text. No secrets. No public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-promotion-dry-run.private-latest.json');

function log(msg) {
  process.stdout.write(`[Hosted Promo Dry-Run Exporter] ${msg}\n`);
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
  log('Exporting sanitized hosted dry-run Supabase payload...');

  const dryRun = readJson(DRY_RUN_LATEST_PATH);
  if (!dryRun) {
    log('FAIL: Cannot read private-promotion-dry-run-latest.json');
    process.exit(1);
  }

  // Build a strictly sanitized payload — no raw text, no secrets, no IDs that expose private data
  const sanitizedRecord = {
    dry_run_id: dryRun.dry_run_id,
    created_at: dryRun.created_at,
    source_run_id: dryRun.source_run_id,
    package_id: dryRun.package_id,
    dry_run_status: dryRun.dry_run_status,
    suggested_record_type: dryRun.suggested_record_type,
    legal_governance_relevance: dryRun.legal_governance_relevance,
    blocker_count: (dryRun.publication_blockers || []).length,
    missing_item_count: (dryRun.missing_items || []).length,
    proposed_failure_modes: dryRun.proposed_failure_modes,
    proposed_control_themes: dryRun.proposed_control_themes,
    // Safety flags — all must be correct
    public_publish_ready: false,
    real_promotion_packet_created: false,
    public_preview_created: false,
    public_record_created: false,
    public_site_mutated: false,
    remote_write_attempted: false,
    raw_text_stored: false,
    html_stored: false,
    // Omitted: intake_id, decision_id, approval_id, candidate_hash, source_url,
    //          proposed_public_summary (may contain source name), proposed_evidence_questions,
    //          proposed_vendor_questions, suggested_public_record_id details,
    //          governance_chain (contains source-identifying text),
    //          legal_review_checklist (internal state),
    //          publication_blockers/missing_items lists (internal state)
  };

  const payload = {
    _schema: 'caesar-atlas/ops/supabase/private-promotion-dry-run-payload/v1',
    generated_at: new Date().toISOString(),
    dry_run: 'export_only',
    remote_write_attempted: false,
    table: 'atlas_private_promotion_dry_runs',
    note: 'Private dry-run export only. No real promotion. No INC-0014. No public publish. No remote write. For future human review gating.',
    records: [sanitizedRecord]
  };

  writeJson(OUTPUT_PATH, payload);
  log(`Wrote hosted payload to: ${path.relative(ROOT, OUTPUT_PATH)}`);
  log(`  dry_run_id: ${dryRun.dry_run_id}`);
  log(`  dry_run_status: ${dryRun.dry_run_status}`);
  log(`  remote_write_attempted: false`);
  log(`  public_publish_ready: false`);
  log('export-hosted-private-promotion-dry-run-payloads: OK');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
