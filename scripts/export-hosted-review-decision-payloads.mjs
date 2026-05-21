// export-hosted-review-decision-payloads.mjs (T063)
// Exports sanitized Supabase-ready private review decision and draft packet payloads.
// Maps to the future `atlas_review_decisions` and `atlas_draft_candidate_packets` tables.
// Outputs:
// - data/ops/supabase/atlas-review-decisions.private-latest.json
// - data/ops/supabase/atlas-draft-candidate-packets.private-latest.json
// No remote write. No raw HTML. No secrets. No public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SOURCE_DECIS_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const SOURCE_PACKETS_PATH = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-latest.json');
const SOURCE_TEMPLATES_PATH = path.join(ROOT, 'data', 'reviews', 'approvals', 'private-draft-approval-template-latest.json');

const TARGET_DECIS_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-review-decisions.private-latest.json');
const TARGET_PACKETS_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-draft-candidate-packets.private-latest.json');
const TARGET_TEMPLATES_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-draft-approval-markers.private-latest.json');

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
  log('=== Exporting Hosted Review Decision Payloads ===');

  const decisionsData = readJson(SOURCE_DECIS_PATH);
  if (!decisionsData || !Array.isArray(decisionsData.decisions)) {
    log('FAIL: Private review decisions latest file is missing.');
    process.exit(1);
  }

  const packetsData = readJson(SOURCE_PACKETS_PATH);
  if (!packetsData || !Array.isArray(packetsData.packets)) {
    log('FAIL: Private draft candidate packets latest file is missing.');
    process.exit(1);
  }

  const templatesData = readJson(SOURCE_TEMPLATES_PATH);
  if (!templatesData || !Array.isArray(templatesData.templates)) {
    log('FAIL: Private draft approval template latest file is missing.');
    process.exit(1);
  }

  const runId = decisionsData.run_id;
  const now = new Date().toISOString();

  // Format database fields for atlas_review_decisions table
  const dbDecisions = decisionsData.decisions.map(d => {
    return {
      decision_id: d.decision_id,
      intake_id: d.intake_id,
      source_run_id: d.source_run_id,
      source_signal_id: d.source_signal_id,
      decided_at: d.decided_at,
      reviewer_mode: d.reviewer_mode,
      decision_status: d.decision_status,
      decision_reason: d.decision_reason,
      review_notes: d.review_notes,
      recommended_next_step: d.recommended_next_step,
      draft_candidate_ready: d.draft_candidate_ready,
      public_publish_ready: d.public_publish_ready,
      safety_flags: d.safety_flags
    };
  });

  // Format database fields for atlas_draft_candidate_packets table
  const dbPackets = packetsData.packets.map(p => {
    return {
      packet_id: p.packet_id,
      intake_id: p.intake_id,
      decision_id: p.decision_id,
      source_run_id: p.source_run_id,
      candidate_hash: p.candidate_hash,
      suggested_record_type: p.suggested_record_type,
      suggested_failure_modes: p.suggested_failure_modes,
      suggested_control_themes: p.suggested_control_themes,
      suggested_evidence_questions: p.suggested_evidence_questions,
      suggested_vendor_questions: p.suggested_vendor_questions,
      draft_candidate_ready: p.draft_candidate_ready,
      public_publish_ready: p.public_publish_ready
    };
  });

  // Format database fields for atlas_draft_approval_markers table (Templates only)
  const dbTemplates = templatesData.templates.map(t => {
    // Assert approval_status is draft for all templates
    if (t.approval_status !== 'draft') {
      log(`WARNING: Template ${t.approval_id} has status ${t.approval_status}. Forcing to "draft".`);
      t.approval_status = 'draft';
    }
    if (t.control_tower_approval_present !== false) {
      log(`WARNING: Template ${t.approval_id} has control_tower_approval_present true. Forcing to false.`);
      t.control_tower_approval_present = false;
    }
    return {
      approval_id: t.approval_id,
      created_at: t.created_at,
      approval_scope: t.approval_scope,
      source_run_id: t.source_run_id,
      intake_id: t.intake_id,
      decision_id: t.decision_id,
      approved_decision_status: t.approved_decision_status,
      approval_status: t.approval_status,
      control_tower_approval_required: t.control_tower_approval_required,
      control_tower_approval_present: t.control_tower_approval_present,
      approval_reason: t.approval_reason,
      approval_notes: t.approval_notes,
      requested_by: t.requested_by,
      approved_by: t.approved_by,
      expires_at: t.expires_at,
      public_publish_allowed: t.public_publish_allowed,
      promotion_packet_allowed: t.promotion_packet_allowed,
      public_preview_allowed: t.public_preview_allowed,
      remote_write_allowed: t.remote_write_allowed,
      raw_text_storage_allowed: t.raw_text_storage_allowed,
      html_storage_allowed: t.html_storage_allowed,
      safety_flags: t.safety_flags
    };
  });

  // Create wrappers
  const decisionsPayload = {
    _schema: 'caesar-atlas/supabase-payload/atlas-review-decisions/private-latest/v1',
    generated_at: now,
    mode: 'dry_run_export',
    run_id: runId,
    remote_write_attempted: false,
    note: 'Sanitized private review decisions payload for atlas_review_decisions table. No remote write. No raw HTML. No secrets.',
    records: dbDecisions
  };

  const packetsPayload = {
    _schema: 'caesar-atlas/supabase-payload/atlas-draft-candidate-packets/private-latest/v1',
    generated_at: now,
    mode: 'dry_run_export',
    run_id: runId,
    remote_write_attempted: false,
    note: 'Sanitized private draft candidate packets payload for atlas_draft_candidate_packets table. No remote write. No raw HTML. No secrets.',
    records: dbPackets
  };

  const templatesPayload = {
    _schema: 'caesar-atlas/supabase-payload/atlas-draft-approval-markers/private-latest/v1',
    generated_at: now,
    mode: 'dry_run_export',
    run_id: runId,
    active_approval_count: 0,
    remote_write_attempted: false,
    note: 'Sanitized private draft approval markers payload. Templates only. No remote write. No secrets.',
    records: dbTemplates
  };

  // Write outputs
  writeJson(TARGET_DECIS_PATH, decisionsPayload);
  writeJson(TARGET_PACKETS_PATH, packetsPayload);
  writeJson(TARGET_TEMPLATES_PATH, templatesPayload);

  log(`Successfully exported hosted decisions payload to: ${path.relative(ROOT, TARGET_DECIS_PATH)}`);
  log(`Successfully exported hosted draft packets payload to: ${path.relative(ROOT, TARGET_PACKETS_PATH)}`);
  log(`Successfully exported hosted approval markers payload to: ${path.relative(ROOT, TARGET_TEMPLATES_PATH)}`);
  log('=== Hosted Exporter COMPLETE ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
