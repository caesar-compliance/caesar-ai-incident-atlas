// scripts/validate-private-runtime-operational-status.mjs (T073)
// Validates structural correctness, content integrity, and safety attributes of the operational status outputs.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

let errors = 0;

function pass(msg)  { process.stdout.write('PASS: ' + msg + '\n'); }
function fail(msg)  { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }
function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

const targetPath1 = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 'private-runtime-operational-status.latest.json');
const targetPath2 = path.join(ROOT, 'tools', 'review-console', 'data', 'private-runtime-operational-status.json');

// ── Check file existence ────────────────────────────────────────────────────
if (!fs.existsSync(targetPath1)) {
  fail(`Operational status (latest) missing at: ${path.relative(ROOT, targetPath1)}`);
} else {
  pass('Operational status target 1 exists');
}

if (!fs.existsSync(targetPath2)) {
  fail(`Operational status (console) missing at: ${path.relative(ROOT, targetPath2)}`);
} else {
  pass('Operational status target 2 exists');
}

if (errors > 0) {
  process.exit(1);
}

const status1 = readJson(targetPath1);
const status2 = readJson(targetPath2);

// ── Validate content and structure ──────────────────────────────────────────
function validateStatusPayload(payload, label) {
  if (!payload) {
    fail(`${label}: failed to parse JSON or empty`);
    return;
  }

  // Schema check
  if (payload._schema !== 'caesar-atlas/runtime/private-runtime-operational-status/v1') {
    fail(`${label}: invalid or missing schema field`);
  }

  // Component check
  const comps = payload.operational_components;
  if (!comps) {
    fail(`${label}: missing operational_components`);
    return;
  }

  const expectedComps = [
    'supabase_table_apply',
    'supabase_live_probe',
    'private_snapshot_write',
    'worker_deploy',
    'worker_probe'
  ];

  for (const c of expectedComps) {
    if (!comps[c]) {
      fail(`${label}: missing component '${c}'`);
    } else {
      const statusVal = comps[c].status;
      if (!['live', 'dry-run', 'blocked'].includes(statusVal)) {
        fail(`${label}: component '${c}' has invalid status '${statusVal}'`);
      } else {
        pass(`${label}: component '${c}' status is '${statusVal}'`);
      }
    }
  }

  // Safety constraints check
  const safety = payload.safety_constraints;
  if (!safety) {
    fail(`${label}: missing safety_constraints`);
    return;
  }

  const constraints = {
    publication_still_blocked: true,
    public_publish_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    no_inc_0014: true,
    no_public_raw_text: true,
    no_public_raw_diff: true
  };

  for (const [key, expectedVal] of Object.entries(constraints)) {
    if (safety[key] !== expectedVal) {
      fail(`${label}: safety_constraint '${key}' is ${safety[key]}, expected ${expectedVal}`);
    } else {
      pass(`${label}: safety_constraint '${key}' conforms to rule`);
    }
  }

  // Check no secrets exist in the JSON output
  const str = JSON.stringify(payload);
  if (/eyJ[A-Za-z0-9_-]{20,}/.test(str) || str.includes('private-key') || str.includes('api-key')) {
    fail(`${label}: potential credential/secret pattern leaked in status JSON`);
  } else {
    pass(`${label}: no credential/secret patterns detected`);
  }
}

validateStatusPayload(status1, 'Target 1 (Latest)');
validateStatusPayload(status2, 'Target 2 (Console)');

// ── Exit report ─────────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write(`validate-private-runtime-operational-status: FAILED — ${errors} error(s)\n`);
  process.exit(1);
} else {
  process.stdout.write('validate-private-runtime-operational-status: PASSED\n');
  process.exit(0);
}
