// create-private-draft-approval-template.mjs (T064)
// Generates disabled/template approval markers for private candidates.
// Bounded local-only execution. No remote writes, no site mutation.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_INTAKE_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const APPROVALS_DIR = path.join(ROOT, 'data', 'reviews', 'approvals');
const LATEST_TEMPLATES_PATH = path.join(APPROVALS_DIR, 'private-draft-approval-template-latest.json');
const LATEST_MANIFEST_PATH = path.join(APPROVALS_DIR, 'private-draft-approval-template-manifest.json');

function log(msg) {
  process.stdout.write(`[Approval Template Builder] ${msg}\n`);
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

// Parse args
const args = process.argv.slice(2);
let intakeIdParam = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--intake-id' && args[i+1]) {
    intakeIdParam = args[i+1];
    i++;
  }
}

async function run() {
  log('=== Generating Private Draft Approval Templates ===');

  const intakeData = readJson(LATEST_INTAKE_PATH);
  if (!intakeData || !Array.isArray(intakeData.records)) {
    log('FAIL: No private candidate review intake records found.');
    process.exit(1);
  }

  const runId = intakeData.run_id;
  let records = intakeData.records;

  if (intakeIdParam) {
    records = records.filter(r => r.intake_id === intakeIdParam);
    if (records.length === 0) {
      log(`FAIL: Specified --intake-id "${intakeIdParam}" not found in latest intake.`);
      process.exit(1);
    }
    log(`Generating template specifically for: ${intakeIdParam}`);
  } else {
    log(`Generating templates for all ${records.length} records in run: ${runId}`);
  }

  const now = new Date().toISOString();
  // 30 days expiration
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // Load existing templates if we are updating a single template
  let existingTemplates = [];
  if (intakeIdParam) {
    const latestData = readJson(LATEST_TEMPLATES_PATH);
    if (latestData && Array.isArray(latestData.templates)) {
      existingTemplates = latestData.templates;
    }
  }

  const templatesMap = new Map(existingTemplates.map(t => [t.intake_id, t]));

  records.forEach(record => {
    const intakeId = record.intake_id;
    const indexSuffix = intakeId.split('-').slice(-1)[0];
    const approvalId = `APPROVAL-${runId}-${indexSuffix}`;
    const decisionId = `DECISION-${runId}-${indexSuffix}`;

    const template = {
      approval_id: approvalId,
      created_at: now,
      approval_scope: 'private_draft_candidate_only',
      source_run_id: runId,
      intake_id: intakeId,
      decision_id: decisionId,
      approved_decision_status: 'approve_for_private_draft',
      approval_status: 'draft',
      control_tower_approval_required: true,
      control_tower_approval_present: false,
      approval_reason: 'Pending Control Tower explicit approval.',
      approval_notes: 'Template generated for local-only triaging queue. Control Tower approval present must be marked true with an active approval status before proceeding.',
      requested_by: 'local_compliance_officer',
      approved_by: '',
      expires_at: expiresAt,
      public_publish_allowed: false,
      promotion_packet_allowed: false,
      public_preview_allowed: false,
      remote_write_allowed: false,
      raw_text_storage_allowed: false,
      html_storage_allowed: false,
      safety_flags: {
        no_raw_html: true,
        no_long_third_party_text: true,
        no_secrets_exposed: true,
        no_unauthorized_remote_writes: true,
        no_public_site_leak: true
      }
    };

    templatesMap.set(intakeId, template);
  });

  const finalTemplates = Array.from(templatesMap.values()).sort((a, b) => a.approval_id.localeCompare(b.approval_id));

  const manifest = {
    _schema: 'caesar-atlas/reviews/private-draft-approval-template-manifest/v1',
    generated_at: now,
    run_id: runId,
    approval_template_count: finalTemplates.length,
    active_approval_count: 0,
    safety_status: {
      no_raw_html: true,
      no_long_third_party_text: true,
      no_secrets: true,
      remote_write_attempted: false,
      public_site_mutated: false
    }
  };

  const payload = {
    _schema: 'caesar-atlas/reviews/private-draft-approval-template/v1',
    run_id: runId,
    generated_at: now,
    templates: finalTemplates
  };

  // Write outputs
  writeJson(LATEST_TEMPLATES_PATH, payload);
  writeJson(LATEST_MANIFEST_PATH, manifest);
  log(`Wrote templates to: ${path.relative(ROOT, LATEST_TEMPLATES_PATH)}`);
  log(`Wrote template manifest to: ${path.relative(ROOT, LATEST_MANIFEST_PATH)}`);

  // Run-specific outputs
  const runApprovalsDir = path.join(APPROVALS_DIR, 'runs', runId);
  const runTemplatesPath = path.join(runApprovalsDir, 'approval-templates.json');
  const runManifestPath = path.join(runApprovalsDir, 'approval-template-manifest.json');

  writeJson(runTemplatesPath, payload);
  writeJson(runManifestPath, manifest);
  log(`Wrote run-specific templates to: ${path.relative(ROOT, runTemplatesPath)}`);

  log('=== Private Draft Approval Templates Generated ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
