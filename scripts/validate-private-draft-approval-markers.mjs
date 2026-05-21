// validate-private-draft-approval-markers.mjs (T064)
// Validates approval marker schemas, templates, active markers, and containment safety.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

let errors = 0;
let warnings = 0;

function pass(msg) { process.stdout.write('OK:   ' + msg + '\n'); }
function fail(msg) { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }
function warn(msg) { process.stdout.write('WARN: ' + msg + '\n'); warnings++; }

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function existsFile(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isFile(); }
  catch { return false; }
}

function existsDir(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isDirectory(); }
  catch { return false; }
}

// Parse args
const args = process.argv.slice(2);
const allowActive = args.includes('--allow-active');

process.stdout.write('=== Validating Private Draft Approval Markers ===\n\n');

// 1. Schema existence
const schemaPath = path.join(ROOT, 'schemas', 'pipeline', 'private-draft-approval-marker.schema.json');
if (existsFile(schemaPath)) {
  const schema = readJson(schemaPath);
  if (!schema || schema.$id !== 'https://caesar.no/schemas/pipeline/private-draft-approval-marker.schema.json') {
    fail('private-draft-approval-marker.schema.json has incorrect or missing $id');
  } else {
    pass('Schema private-draft-approval-marker.schema.json exists and is valid');
  }
} else {
  fail('Schema private-draft-approval-marker.schema.json not found');
}

// 2. Templates existence
const latestTemplatesPath = path.join(ROOT, 'data', 'reviews', 'approvals', 'private-draft-approval-template-latest.json');
const latestManifestPath = path.join(ROOT, 'data', 'reviews', 'approvals', 'private-draft-approval-template-manifest.json');

if (existsFile(latestTemplatesPath)) pass('Latest approval templates file exists');
else fail('Latest approval templates file is missing');

if (existsFile(latestManifestPath)) pass('Latest approval templates manifest exists');
else fail('Latest approval templates manifest is missing');

// 3. Validation of templates
if (errors === 0) {
  const templatesData = readJson(latestTemplatesPath);
  const templates = templatesData ? templatesData.templates || [] : [];
  
  if (templates.length === 0) {
    fail('No approval templates found in latest templates file');
  } else {
    pass(`Loaded ${templates.length} templates for validation`);
  }

  templates.forEach((t, idx) => {
    const pre = `[Template #${idx+1} (${t.approval_id})]`;
    
    // Check required schema consts and types
    if (t.approval_scope !== 'private_draft_candidate_only') {
      fail(`${pre} approval_scope must be "private_draft_candidate_only"`);
    }
    if (t.approved_decision_status !== 'approve_for_private_draft') {
      fail(`${pre} approved_decision_status must be "approve_for_private_draft"`);
    }
    if (t.control_tower_approval_required !== true) {
      fail(`${pre} control_tower_approval_required must be true`);
    }

    // Default template constraints
    if (t.approval_status !== 'draft') {
      fail(`${pre} approval_status in template must be "draft"`);
    }
    if (t.control_tower_approval_present !== false) {
      fail(`${pre} control_tower_approval_present in template must be false`);
    }

    // Safety constraint hard checks
    if (t.public_publish_allowed !== false) fail(`${pre} public_publish_allowed must be false`);
    if (t.promotion_packet_allowed !== false) fail(`${pre} promotion_packet_allowed must be false`);
    if (t.public_preview_allowed !== false) fail(`${pre} public_preview_allowed must be false`);
    if (t.remote_write_allowed !== false) fail(`${pre} remote_write_allowed must be false`);
    if (t.raw_text_storage_allowed !== false) fail(`${pre} raw_text_storage_allowed must be false`);
    if (t.html_storage_allowed !== false) fail(`${pre} html_storage_allowed must be false`);

    const sf = t.safety_flags || {};
    if (sf.no_raw_html !== true) fail(`${pre} safety_flags.no_raw_html must be true`);
    if (sf.no_long_third_party_text !== true) fail(`${pre} safety_flags.no_long_third_party_text must be true`);
    if (sf.no_secrets_exposed !== true) fail(`${pre} safety_flags.no_secrets_exposed must be true`);
    if (sf.no_unauthorized_remote_writes !== true) fail(`${pre} safety_flags.no_unauthorized_remote_writes must be true`);
    if (sf.no_public_site_leak !== true) fail(`${pre} safety_flags.no_public_site_leak must be true`);
  });
}

// 4. Verify no active approvals in baseline
const activeDir = path.join(ROOT, 'data', 'reviews', 'approvals', 'active-markers');
let activeCount = 0;
if (existsDir(activeDir)) {
  const files = fs.readdirSync(activeDir).filter(f => f.endsWith('.json'));
  activeCount = files.length;
}

if (!allowActive && activeCount > 0) {
  fail(`Found ${activeCount} active approval markers in baseline state under data/reviews/approvals/active-markers/, which is prohibited`);
} else {
  pass(`Baseline check: ${activeCount} active approval markers detected`);
}

// 5. Containment safety checks
// No approval markers inside site/
const walkDir = (dir) => {
  if (!existsDir(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkDir(full);
    } else {
      if (e.name.includes('approval') || e.name.includes('marker')) {
        const text = fs.readFileSync(full, 'utf8');
        if (text.includes('private_draft_candidate_only')) {
          fail(`Private approval marker leaked into public folder: ${path.relative(ROOT, full)}`);
        }
      }
    }
  }
};
walkDir(path.join(ROOT, 'site'));

// Public count remains 13
const incIndexPath = path.join(ROOT, 'data', 'incident-index.json');
const incIndex = readJson(incIndexPath);
if (incIndex) {
  const count = (incIndex.incidents || []).length;
  if (count === 13) {
    pass('Public incident record count remains 13');
  } else {
    fail(`Public incident record count is ${count}, expected 13`);
  }
}

// No secrets or .env
const envPath = path.join(ROOT, '.env');
if (existsFile(envPath)) {
  fail('.env file exists at repo root — must not be committed');
} else {
  pass('No .env file found at repo root');
}

process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write(`validate-private-draft-approval-markers: FAILED — ${errors} error(s), ${warnings} warning(s)\n`);
  process.exit(1);
} else {
  process.stdout.write('validate-private-draft-approval-markers: PASSED\n');
  process.exit(0);
}
