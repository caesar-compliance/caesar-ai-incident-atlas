// validate-private-candidate-review-intake.mjs (T062)
// Validates private review intake schema, records, manifests, exports, and safety.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

let errors   = 0;
let warnings = 0;

function pass(msg)  { process.stdout.write('OK:   ' + msg + '\n'); }
function fail(msg)  { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }
function warn(msg)  { process.stdout.write('WARN: ' + msg + '\n'); warnings++; }

function readText(p) {
  try { return fs.readFileSync(p, 'utf8'); }
  catch { return null; }
}

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

log('=== Validating Private Candidate Review Intake (T062) ===\n');

// ── 1. Schema File exists ──────────────────────────────────────────────────────
const schemaPath = path.join(ROOT, 'schemas', 'pipeline', 'private-candidate-review-intake.schema.json');
if (existsFile(schemaPath)) {
  const schema = readJson(schemaPath);
  if (!schema || schema.$id !== 'https://caesar.no/schemas/pipeline/private-candidate-review-intake.schema.json') {
    fail('private-candidate-review-intake.schema.json has unexpected $id');
  } else {
    pass('Schema private-candidate-review-intake.schema.json exists and is valid');
  }
} else {
  fail('Schema private-candidate-review-intake.schema.json not found');
}

// ── 2. Latest Intake Files exist ────────────────────────────────────────────────
const latestRecordsPath = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
const latestManifestPath = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-manifest.json');

if (existsFile(latestRecordsPath)) {
  pass('Latest records JSON exists: private-candidate-intake-latest.json');
} else {
  fail('Latest records JSON not found');
}

if (existsFile(latestManifestPath)) {
  pass('Latest manifest JSON exists: private-candidate-intake-manifest.json');
} else {
  fail('Latest manifest JSON not found');
}

// ── 3. Run pointer and Run directory exist ─────────────────────────────────────
const latestRunPath = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const latestRun = readJson(latestRunPath);

if (!latestRun) {
  fail('real-green-run-latest.json not found');
} else {
  const runId = latestRun.run_id;
  const runDir = path.join(ROOT, 'data', 'reviews', 'intake', 'runs', runId);
  if (existsDir(runDir)) {
    pass(`Run intake directory exists for run: ${runId}`);

    // Check stable run-specific files
    const runRecordsPath = path.join(runDir, 'intake-records.json');
    const runManifestPath = path.join(runDir, 'intake-manifest.json');
    const runSafetyManifestPath = path.join(runDir, 'safety-manifest.json');

    if (existsFile(runRecordsPath)) pass('Stable run-specific records file exists');
    else fail('Stable run-specific records file is missing');

    if (existsFile(runManifestPath)) pass('Stable run-specific manifest file exists');
    else fail('Stable run-specific manifest file is missing');

    if (existsFile(runSafetyManifestPath)) pass('Stable run-specific safety manifest file exists');
    else fail('Stable run-specific safety manifest file is missing');
  } else {
    fail(`Run intake directory does not exist for run: ${runId}`);
  }
}

// ── 4. Review Console Private Data exists ──────────────────────────────────────
const reviewConsolePath = path.join(ROOT, 'tools', 'review-console', 'data', 'private-candidate-intake.json');
if (existsFile(reviewConsolePath)) {
  pass('Review console private data exists: tools/review-console/data/private-candidate-intake.json');
} else {
  fail('Review console private data is missing');
}

// ── 5. Hosted Dry-run Payload exists ──────────────────────────────────────────
const hostedPayloadPath = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-review-intake.private-latest.json');
if (existsFile(hostedPayloadPath)) {
  pass('Hosted dry-run payload exists: data/ops/supabase/atlas-review-intake.private-latest.json');
} else {
  fail('Hosted dry-run payload is missing');
}

// ── 6. Invariant and Safety Invariant Checks ───────────────────────────────────
if (errors === 0) {
  const latestRecords = readJson(latestRecordsPath);
  const records = latestRecords ? latestRecords.records || [] : [];
  const manifest = readJson(latestManifestPath);

  // A. Record Count validation against T061 candidate signals
  const expectedSignalsCount = latestRun.candidate_signals || 0;
  if (records.length !== expectedSignalsCount) {
    fail(`Intake records count (${records.length}) does not match latest run signals count (${expectedSignalsCount})`);
  } else {
    pass(`Intake records count matches candidate signals count: ${expectedSignalsCount}`);
  }

  // B. Schema constraint validation for all records
  let recordCheckFailed = false;
  records.forEach((record, idx) => {
    const pre = `[Record #${idx+1} (${record.intake_id})]`;

    if (record.review_status !== 'needs_review') { fail(`${pre} review_status is not 'needs_review', got: ${record.review_status}`); recordCheckFailed = true; }
    if (record.human_review_required !== true) { fail(`${pre} human_review_required is not true`); recordCheckFailed = true; }
    if (record.public_publish_ready !== false) { fail(`${pre} public_publish_ready is not false`); recordCheckFailed = true; }
    if (record.raw_text_stored !== false) { fail(`${pre} raw_text_stored is not false`); recordCheckFailed = true; }
    if (record.html_stored !== false) { fail(`${pre} html_stored is not false`); recordCheckFailed = true; }
    if (record.remote_write_attempted !== false) { fail(`${pre} remote_write_attempted is not false`); recordCheckFailed = true; }
    if (record.public_site_mutated !== false) { fail(`${pre} public_site_mutated is not false`); recordCheckFailed = true; }
    if (record.promotion_packet_created !== false) { fail(`${pre} promotion_packet_created is not false`); recordCheckFailed = true; }
    if (record.public_preview_created !== false) { fail(`${pre} public_preview_created is not false`); recordCheckFailed = true; }

    const sf = record.safety_flags || {};
    if (sf.no_raw_html !== true) { fail(`${pre} safety_flags.no_raw_html is not true`); recordCheckFailed = true; }
    if (sf.no_long_third_party_text !== true) { fail(`${pre} safety_flags.no_long_third_party_text is not true`); recordCheckFailed = true; }
    if (sf.no_secrets_exposed !== true) { fail(`${pre} safety_flags.no_secrets_exposed is not true`); recordCheckFailed = true; }
    if (sf.no_unauthorized_remote_writes !== true) { fail(`${pre} safety_flags.no_unauthorized_remote_writes is not true`); recordCheckFailed = true; }
    if (sf.no_public_site_leak !== true) { fail(`${pre} safety_flags.no_public_site_leak is not true`); recordCheckFailed = true; }
  });

  if (!recordCheckFailed) {
    pass('All individual records fully comply with schema properties and hard constraints');
  }

  // C. Manifest counts and safety validation
  if (manifest) {
    if (manifest.intake_count !== records.length) fail('manifest.intake_count does not match actual records count');
    if (manifest.needs_review_count !== records.length) fail('manifest.needs_review_count does not match actual records count');
    if (manifest.blocked_count !== 0) fail('manifest.blocked_count is not 0');
    if (manifest.publish_ready_count !== 0) fail('manifest.publish_ready_count is not 0');

    const ss = manifest.safety_status || {};
    if (ss.no_raw_html !== true) fail('manifest.safety_status.no_raw_html is not true');
    if (ss.no_long_third_party_text !== true) fail('manifest.safety_status.no_long_third_party_text is not true');
    if (ss.no_secrets !== true) fail('manifest.safety_status.no_secrets is not true');
    if (ss.remote_write_attempted !== false) fail('manifest.safety_status.remote_write_attempted is not false');
    if (ss.public_site_mutated !== false) fail('manifest.safety_status.public_site_mutated is not false');
    pass('Manifest counts and safety status validated successfully');
  }

  // D. Review console friendly validation
  const rc = readJson(reviewConsolePath);
  if (rc) {
    if (rc.publish_ready_count !== 0) fail('Review console publish_ready_count must be 0');
    if (rc.intake_count !== records.length) fail('Review console intake_count is incorrect');
    pass('Review console export checks completed');
  }

  // E. Hosted payload validation
  const hp = readJson(hostedPayloadPath);
  if (hp) {
    if (hp.remote_write_attempted !== false) fail('hosted payload remote_write_attempted is not false');
    if (hp.records && hp.records.some(r => r.public_publish_ready !== false)) fail('hosted payload has publish-ready records');
    pass('Hosted payload dry-run checks completed');
  }
}

// ── 7. Global Leak & Safety Checks ─────────────────────────────────────────────

// A. No raw HTML/body in any generated files
const filesToCheck = [
  latestRecordsPath,
  latestManifestPath,
  reviewConsolePath,
  hostedPayloadPath
];

const HTML_PATTERN = /<(!DOCTYPE )?html/i;
let foundHtml = false;
filesToCheck.forEach(file => {
  if (existsFile(file)) {
    const text = readText(file);
    if (text && HTML_PATTERN.test(text)) {
      fail(`Found raw HTML block in: ${path.relative(ROOT, file)}`);
      foundHtml = true;
    }
  }
});
if (!foundHtml) pass('No raw HTML/body leak detected in any private review intake output');

// B. Public incident index check (remains 13)
const incIndexPath = path.join(ROOT, 'data', 'incident-index.json');
const incIndex = readJson(incIndexPath);
if (incIndex) {
  const count = (incIndex.incidents || []).length;
  if (count === 13) {
    pass('Public incident record count remains 13 (correct)');
  } else {
    fail(`Public incident record count is ${count}, expected 13`);
  }
  const ids = (incIndex.incidents || []).map(i => i.incident_id).sort();
  const latest = ids[ids.length - 1];
  if (latest === 'INC-0013') {
    pass('Latest public record remains INC-0013 (correct)');
  } else {
    fail(`Latest public record is ${latest}, expected INC-0013`);
  }
}

// C. No INC-0014
let foundInc0014 = false;
const walkDir = (dir) => {
  if (!existsDir(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkDir(full);
    } else {
      if (e.name.includes('INC-0014') || e.name.includes('inc-0014')) {
        fail(`Forbidden record INC-0014 found at: ${path.relative(ROOT, full)}`);
        foundInc0014 = true;
      }
    }
  }
};
walkDir(path.join(ROOT, 'data'));
walkDir(path.join(ROOT, 'site', 'data'));
if (!foundInc0014) pass('Safety check passed: No INC-0014 record created');

// D. No leak of private review intake into site/
const leakedPath = path.join(ROOT, 'site', 'data', 'private-candidate-intake.json');
const leakedPathReviews = path.join(ROOT, 'site', 'data', 'reviews');
if (existsFile(leakedPath) || existsDir(leakedPathReviews)) {
  fail('Private review intake data was leaked inside the public site/ folder');
} else {
  pass('Safety check passed: No private review data leaked inside site/');
}

// E. No .env committed
const envPath = path.join(ROOT, '.env');
if (existsFile(envPath)) {
  fail('.env file exists at repo root — must not be committed');
} else {
  pass('No .env file found at repo root');
}

// ── 8. Final Report ───────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write(`validate-private-candidate-review-intake: FAILED — ${errors} error(s), ${warnings} warning(s)\n`);
  process.exit(1);
} else {
  process.stdout.write('validate-private-candidate-review-intake: PASSED\n');
  process.exit(0);
}

function log(msg) { process.stdout.write(msg + '\n'); }
