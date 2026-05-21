// validate-ops-status.mjs (T056)
// Validates that public ops JSON is present and safe before deployment.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SITE_OPS_DIR = path.join(ROOT, 'site', 'data', 'ops');
const STATUS_PATH  = path.join(SITE_OPS_DIR, 'latest-status.json');
const RUN_PATH     = path.join(SITE_OPS_DIR, 'latest-watch-run-public.json');

const EXPECTED_PUBLIC_COUNT = 13;
const EXPECTED_LATEST_ID    = 'INC-0013';
const FORBIDDEN_MODES       = ['live_scheduled_enabled'];

// Patterns that must never appear in ops JSON
const FORBIDDEN_PATTERNS = [
  /supabase_url/i,
  /supabase.*key/i,
  /cloudflare.*api.*secret/i,
  /"cloudflare_secret"/i,
  /api_key/i,
  /access_token/i,
  /password/i,
  /"drafts"/i,
  /"promotion.packets"/i,
  /"previews"/i,
  /"raw_text"/i,
  /"html_body"/i,
  /"full_source_text"/i,
  /"source_verification_internals"/i,
];

let errors = 0;
let warnings = 0;

function fail(msg) {
  process.stdout.write('FAIL: ' + msg + '\n');
  errors++;
}

function warn(msg) {
  process.stdout.write('WARN: ' + msg + '\n');
  warnings++;
}

function ok(msg) {
  process.stdout.write('OK:   ' + msg + '\n');
}

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}

// ── Check file existence ─────────────────────────────────────────────────
if (!fs.existsSync(STATUS_PATH)) {
  fail('site/data/ops/latest-status.json does not exist — run export-ops-status.mjs first');
} else {
  ok('site/data/ops/latest-status.json exists');
}

if (!fs.existsSync(RUN_PATH)) {
  fail('site/data/ops/latest-watch-run-public.json does not exist — run export-ops-status.mjs first');
} else {
  ok('site/data/ops/latest-watch-run-public.json exists');
}

if (errors > 0) {
  process.stdout.write('\nvalidate-ops-status: FAILED (missing files)\n');
  process.exit(1);
}

// ── Read and parse ────────────────────────────────────────────────────────
const status  = readJson(STATUS_PATH);
const runData = readJson(RUN_PATH);

if (!status) { fail('latest-status.json is not valid JSON'); }
if (!runData) { fail('latest-watch-run-public.json is not valid JSON'); }

if (errors > 0) {
  process.stdout.write('\nvalidate-ops-status: FAILED (invalid JSON)\n');
  process.exit(1);
}

// ── Content checks ────────────────────────────────────────────────────────

// Public record count
if (status.public_record_count !== EXPECTED_PUBLIC_COUNT) {
  fail('public_record_count is ' + status.public_record_count + ', expected ' + EXPECTED_PUBLIC_COUNT);
} else {
  ok('public_record_count = ' + EXPECTED_PUBLIC_COUNT);
}

// Latest public record
if (status.latest_public_record_id !== EXPECTED_LATEST_ID) {
  fail('latest_public_record_id is ' + status.latest_public_record_id + ', expected ' + EXPECTED_LATEST_ID);
} else {
  ok('latest_public_record_id = ' + EXPECTED_LATEST_ID);
}

// Automation mode
if (FORBIDDEN_MODES.includes(status.automation_mode)) {
  fail('automation_mode is forbidden: ' + status.automation_mode);
} else {
  ok('automation_mode = ' + status.automation_mode + ' (safe)');
}

// Schema field
if (!status._schema) {
  warn('latest-status.json missing _schema field');
} else {
  ok('_schema present: ' + status._schema);
}

// ── Secret/leak checks ────────────────────────────────────────────────────
const statusStr = JSON.stringify(status);
const runStr    = JSON.stringify(runData);

FORBIDDEN_PATTERNS.forEach(pattern => {
  if (pattern.test(statusStr)) {
    fail('latest-status.json contains forbidden pattern: ' + pattern.toString());
  }
  if (pattern.test(runStr)) {
    fail('latest-watch-run-public.json contains forbidden pattern: ' + pattern.toString());
  }
});

if (errors === 0) {
  ok('no forbidden patterns found in ops JSON');
}

// ── INC-0014 check ───────────────────────────────────────────────────────
if (statusStr.includes('INC-0014') || runStr.includes('INC-0014')) {
  fail('INC-0014 found in ops JSON — not allowed in this task');
} else {
  ok('no INC-0014 found');
}

// ── Final result ─────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-ops-status: FAILED — ' + errors + ' error(s), ' + warnings + ' warning(s)\n');
  process.exit(1);
} else {
  if (warnings > 0) {
    process.stdout.write('validate-ops-status: PASSED with ' + warnings + ' warning(s)\n');
  } else {
    process.stdout.write('validate-ops-status: PASSED\n');
  }
}
