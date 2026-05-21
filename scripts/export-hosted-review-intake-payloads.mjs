// export-hosted-review-intake-payloads.mjs (T062)
// Exports sanitized Supabase-ready private review intake payloads.
// Maps to the future `atlas_review_intake` table.
// Outputs: data/ops/supabase/atlas-review-intake.private-latest.json
// No remote write. No raw HTML/body. No secrets. No public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const LATEST_RECORDS_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const HOSTED_PAYLOAD_OUTPUT = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-review-intake.private-latest.json');

function log(msg)  { process.stdout.write(msg + '\n'); }
function info(msg) { process.stdout.write('[INFO] ' + msg + '\n'); }
function warn(msg) { process.stdout.write('[WARN] ' + msg + '\n'); }

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function writeJson(p, data) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

log('=== Exporting Hosted Review Intake Payloads (T062) ===\n');

const recordsData = readJson(LATEST_RECORDS_PATH);
if (!recordsData || !Array.isArray(recordsData.records)) {
  warn('Latest private candidate review intake records not found. Run scripts/build-private-candidate-review-intake.mjs first.');
  process.exit(1);
}

const runId = recordsData.run_id;
const now = new Date().toISOString();

// Format database fields for atlas_review_intake table
const dbRecords = recordsData.records.map(record => {
  return {
    intake_id: record.intake_id,
    source_run_id: record.source_run_id,
    source_signal_id: record.source_signal_id,
    source_id: record.source_id,
    candidate_hash: record.candidate_hash,
    review_status: record.review_status,
    legal_governance_relevance: record.legal_governance_relevance,
    suggested_record_type: record.suggested_record_type,
    suggested_control_themes: record.suggested_control_themes,
    human_review_required: record.human_review_required,
    public_publish_ready: record.public_publish_ready,
    safety_flags: record.safety_flags
  };
});

const payload = {
  _schema: 'caesar-atlas/supabase-payload/atlas-review-intake/private-latest/v1',
  generated_at: now,
  mode: 'dry_run_export',
  run_id: runId,
  remote_write_attempted: false,
  note: 'Sanitized private review intake payload for atlas_review_intake table. No remote write. No raw HTML. No secrets.',
  records: dbRecords
};

writeJson(HOSTED_PAYLOAD_OUTPUT, payload);
info(`Successfully exported hosted payload to: ${path.relative(ROOT, HOSTED_PAYLOAD_OUTPUT)}`);

log('\n=== Export Hosted Review Intake Payloads COMPLETE ===');
