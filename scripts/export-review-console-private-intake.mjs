// export-review-console-private-intake.mjs (T062)
// Exports private candidate intake data for review console.
// No raw text, no public exposure under site/.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const LATEST_RECORDS_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const LATEST_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-manifest.json');
const REVIEW_CONSOLE_OUTPUT = path.join(ROOT, 'tools', 'review-console', 'data', 'private-candidate-intake.json');

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

log('=== Exporting Review Console Private Intake (T062) ===\n');

const recordsData = readJson(LATEST_RECORDS_PATH);
const manifestData = readJson(LATEST_MANIFEST_PATH);

if (!recordsData || !manifestData) {
  warn('Latest private candidate review intake files not found. Run scripts/build-private-candidate-review-intake.mjs first.');
  process.exit(1);
}

const runId = recordsData.run_id;
const generatedAt = recordsData.generated_at || new Date().toISOString();

// Filter/clean records to guarantee absolutely no raw source text or html exists
const sanitizedRecords = (recordsData.records || []).map(record => {
  return {
    intake_id: record.intake_id,
    created_at: record.created_at,
    source_run_id: record.source_run_id,
    source_signal_id: record.source_signal_id,
    candidate_hash: record.candidate_hash,
    source_id: record.source_id,
    source_name: record.source_name,
    source_url: record.source_url,
    detected_at: record.detected_at,
    signal_summary: record.signal_summary,
    keyword_group_hits: record.keyword_group_hits,
    legal_governance_relevance: record.legal_governance_relevance,
    suggested_record_type: record.suggested_record_type,
    suggested_failure_modes: record.suggested_failure_modes,
    suggested_control_themes: record.suggested_control_themes,
    suggested_evidence_questions: record.suggested_evidence_questions,
    suggested_vendor_questions: record.suggested_vendor_questions,
    review_status: record.review_status,
    human_review_required: record.human_review_required,
    public_publish_ready: record.public_publish_ready,
    raw_text_stored: record.raw_text_stored,
    html_stored: record.html_stored,
    remote_write_attempted: record.remote_write_attempted,
    public_site_mutated: record.public_site_mutated,
    promotion_packet_created: record.promotion_packet_created,
    public_preview_created: record.public_preview_created,
    safety_flags: record.safety_flags
  };
});

const consolePayload = {
  _schema: 'caesar-atlas/review-console/private-candidate-intake/v1',
  run_id: runId,
  generated_at: generatedAt,
  intake_count: sanitizedRecords.length,
  needs_review_count: sanitizedRecords.filter(r => r.review_status === 'needs_review').length,
  blocked_count: sanitizedRecords.filter(r => r.review_status === 'blocked').length,
  publish_ready_count: 0, // Hard constraint
  records: sanitizedRecords
};

writeJson(REVIEW_CONSOLE_OUTPUT, consolePayload);
info(`Successfully exported review console data to: ${path.relative(ROOT, REVIEW_CONSOLE_OUTPUT)}`);

log('\n=== Export Review Console Private Intake COMPLETE ===');
