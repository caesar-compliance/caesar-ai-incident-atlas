// export-hosted-private-draft-candidate-payloads.mjs (T066)
// Exports sanitized Supabase-ready private draft candidate package payload.
// Maps to the future `atlas_private_draft_candidates` table.
// Output: data/ops/supabase/atlas-private-draft-candidate-package.private-latest.json
// No remote write. No raw HTML. No secrets. No public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SOURCE_PACKAGE_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');
const TARGET_PAYLOAD_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-draft-candidate-package.private-latest.json');

function log(msg) {
  process.stdout.write(`[Hosted Exporter] ${msg}\n`);
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
  log('=== Exporting Hosted Private Draft Candidate Payloads ===');

  const p = readJson(SOURCE_PACKAGE_PATH);
  if (!p) {
    log('FAIL: Private draft candidate package latest file is missing or invalid.');
    process.exit(1);
  }

  const runId = p.source_run_id;
  const now = new Date().toISOString();

  // Format database record mapping to future `atlas_private_draft_candidates` table
  const dbRecord = {
    package_id: p.package_id,
    created_at: p.created_at,
    source_run_id: p.source_run_id,
    intake_id: p.intake_id,
    decision_id: p.decision_id,
    approval_id: p.approval_id,
    candidate_hash: p.candidate_hash,
    source_id: p.source_id,
    source_name: p.source_name,
    source_url: p.source_url,
    draft_status: p.draft_status,
    suggested_title: p.suggested_title,
    suggested_record_type: p.suggested_record_type,
    legal_governance_relevance: p.legal_governance_relevance,
    suggested_failure_modes: p.suggested_failure_modes,
    suggested_control_themes: p.suggested_control_themes,
    suggested_evidence_questions: p.suggested_evidence_questions,
    suggested_vendor_questions: p.suggested_vendor_questions,
    governance_chain: p.governance_chain,
    public_readiness: p.public_readiness,
    missing_review_items: p.missing_review_items,
    human_review_required: p.human_review_required,
    public_publish_ready: p.public_publish_ready
  };

  const payload = {
    _schema: 'caesar-atlas/supabase-payload/atlas-private-draft-candidate-package/private-latest/v1',
    generated_at: now,
    mode: 'dry_run_export',
    run_id: runId,
    remote_write_attempted: false,
    note: 'Sanitized private draft candidate package payload for atlas_private_draft_candidates table. No remote write. No raw HTML. No secrets.',
    records: [dbRecord]
  };

  writeJson(TARGET_PAYLOAD_PATH, payload);
  log(`Successfully exported hosted private draft candidate payload to: ${path.relative(ROOT, TARGET_PAYLOAD_PATH)}`);
  log('=== Hosted Draft Package Exporter COMPLETE ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
