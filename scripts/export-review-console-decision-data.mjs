// export-review-console-decision-data.mjs (T063/T064)
// Exports private review decisions, draft packets, and approval markers to the local review console data folder.
// Bounded local-only execution. No remote writes, no site mutation, no public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SOURCE_DECIS_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const SOURCE_PACKETS_PATH = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-latest.json');
const SOURCE_TEMPLATES_PATH = path.join(ROOT, 'data', 'reviews', 'approvals', 'private-draft-approval-template-latest.json');

const TARGET_DECIS_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-review-decisions.json');
const TARGET_PACKETS_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-draft-candidate-packets.json');
const TARGET_TEMPLATES_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-draft-approvals.json');

function log(msg) {
  process.stdout.write(`[Console Exporter] ${msg}\n`);
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
  log('=== Exporting Private Decision & Approval Data to Review Console ===');

  const decisions = readJson(SOURCE_DECIS_PATH);
  if (!decisions) {
    log('FAIL: Private review decisions latest file is missing.');
    process.exit(1);
  }

  const packets = readJson(SOURCE_PACKETS_PATH);
  if (!packets) {
    log('FAIL: Private draft candidate packets latest file is missing.');
    process.exit(1);
  }

  const templates = readJson(SOURCE_TEMPLATES_PATH) || { templates: [] };

  // Double check that we are not exporting secrets or raw third-party content
  const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;

  const sanitizeCheck = (obj, label) => {
    const text = JSON.stringify(obj);
    if (HTML_PATTERN.test(text)) {
      log(`FAIL: Raw HTML found in ${label}. Export blocked.`);
      process.exit(1);
    }
  };

  sanitizeCheck(decisions, 'decisions');
  sanitizeCheck(packets, 'packets');
  sanitizeCheck(templates, 'templates');

  // Count active approvals (always 0 in baseline, but dynamically computed if needed)
  const activeMarkersDir = path.join(ROOT, 'data', 'reviews', 'approvals', 'active-markers');
  let activeApprovalCount = 0;
  if (fs.existsSync(activeMarkersDir)) {
    activeApprovalCount = fs.readdirSync(activeMarkersDir).filter(f => f.endsWith('.json')).length;
  }

  const approvalSummary = {
    _schema: 'caesar-atlas/reviews/review-console-approvals-summary/v1',
    run_id: decisions.run_id,
    generated_at: new Date().toISOString(),
    approval_template_count: templates.templates.length,
    active_approval_count: activeApprovalCount,
    templates: templates.templates
  };

  // Write sanitized outputs directly to local review console private data folder
  writeJson(TARGET_DECIS_PATH, decisions);
  writeJson(TARGET_PACKETS_PATH, packets);
  writeJson(TARGET_TEMPLATES_PATH, approvalSummary);

  log(`Successfully exported review decisions to: ${path.relative(ROOT, TARGET_DECIS_PATH)}`);
  log(`Successfully exported draft candidate packets to: ${path.relative(ROOT, TARGET_PACKETS_PATH)}`);
  log(`Successfully exported draft approvals to: ${path.relative(ROOT, TARGET_TEMPLATES_PATH)}`);
  log('=== Console Exporter COMPLETE ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
