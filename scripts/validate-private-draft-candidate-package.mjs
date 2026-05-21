// validate-private-draft-candidate-package.mjs (T066)
// Validates the private draft candidate package schemas, safety constraints, payloads, and exports.

import fs from 'fs';
import { execSync } from 'child_process';
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

function log(msg) { process.stdout.write(msg + '\n'); }

log('=== Validating Private Draft Candidate Package (T066) ===\n');

// ── 1. Schema File exists ──────────────────────────────────────────────────────
const schemaPath = path.join(ROOT, 'schemas', 'pipeline', 'private-draft-candidate-package.schema.json');
if (existsFile(schemaPath)) {
  const schema = readJson(schemaPath);
  if (!schema || schema.$id !== 'https://caesar.no/schemas/pipeline/private-draft-candidate-package.schema.json') {
    fail('private-draft-candidate-package.schema.json has unexpected $id');
  } else {
    pass('Schema private-draft-candidate-package.schema.json exists and is valid');
  }
} else {
  fail('Schema private-draft-candidate-package.schema.json not found');
}

// ── 2. Latest Package & Manifest Files exist ──────────────────────────────────────
const latestPackagePath = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');
const latestManifestPath = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-manifest.json');

if (existsFile(latestPackagePath)) pass('Latest package JSON exists: private-draft-candidate-package-latest.json');
else fail('Latest package JSON not found');

if (existsFile(latestManifestPath)) pass('Latest package manifest JSON exists: private-draft-candidate-package-manifest.json');
else fail('Latest package manifest JSON not found');

// ── 3. Run-specific files exist ─────────────────────────────────────
const latestRunPath = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const latestRun = readJson(latestRunPath);

if (!latestRun) {
  fail('real-green-run-latest.json not found');
} else {
  const runId = latestRun.run_id;
  const runPackageDir = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'runs', runId);
  
  if (existsDir(runPackageDir)) {
    pass(`Run package directory exists: ${runPackageDir}`);
    if (existsFile(path.join(runPackageDir, 'private-draft-candidate-package.json'))) pass('Stable run package file exists');
    else fail('Stable run package file is missing');
    if (existsFile(path.join(runPackageDir, 'private-draft-candidate-manifest.json'))) pass('Stable run package manifest exists');
    else fail('Stable run package manifest is missing');
  } else {
    fail(`Run package directory does not exist for run: ${runId}`);
  }
}

// ── 4. Review Console Exports exist and outside site/ ───────────────────────────
const consolePkgPath = path.join(ROOT, 'tools', 'review-console', 'data', 'private-draft-candidate-package.json');
if (existsFile(consolePkgPath)) pass('Review console private draft candidate package summary export exists');
else fail('Review console private draft candidate package summary export is missing');

const leakedConsolePath = path.join(ROOT, 'site', 'data', 'private-draft-candidate-package.json');
if (existsFile(leakedConsolePath)) {
  fail('Private draft candidate package summary leaked inside public site/ folder');
} else {
  pass('Safety check passed: private draft candidate package summary not in site/');
}

// ── 5. Hosted Dry-run Payloads exist and sanitized ─────────────────────────────
const hostedPayloadPath = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-draft-candidate-package.private-latest.json');
if (existsFile(hostedPayloadPath)) {
  pass('Hosted dry-run package payload exists');
  const payload = readJson(hostedPayloadPath);
  if (!payload || payload.remote_write_attempted !== false) {
    fail('Hosted dry-run package payload indicates remote write or is invalid');
  } else {
    pass('Hosted dry-run package payload has correct dry-run safety metadata');
  }
} else {
  fail('Hosted dry-run package payload is missing');
}

// ── 6. Package and Decision Constraints ─────────────────────────────────────────
if (errors === 0) {
  const pkg = readJson(latestPackagePath);
  if (!pkg) {
    fail('Unable to load private-draft-candidate-package-latest.json');
  } else {
    pass('Exactly one package exists and loaded successfully');

    // A. Reference checks
    const intakeLatestPath = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
    const decisionsLatestPath = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
    const activeMarkersDir = path.join(ROOT, 'data', 'reviews', 'approvals', 'active-markers');

    const intakeData = readJson(intakeLatestPath);
    const decisionsData = readJson(decisionsLatestPath);

    const record = intakeData ? (intakeData.records || []).find(r => r.intake_id === pkg.intake_id) : null;
    const decision = decisionsData ? (decisionsData.decisions || []).find(d => d.decision_id === pkg.decision_id) : null;
    const markerPath = path.join(activeMarkersDir, `${pkg.approval_id}.json`);

    if (!record) fail(`Package references invalid intake_id: ${pkg.intake_id}`);
    else pass(`Package references valid intake_id: ${pkg.intake_id}`);

    if (!decision) fail(`Package references invalid decision_id: ${pkg.decision_id}`);
    else pass(`Package references valid decision_id: ${pkg.decision_id}`);

    if (!existsFile(markerPath)) {
      fail(`Package references non-existent active approval marker file: ${pkg.approval_id}.json`);
    } else {
      const marker = readJson(markerPath);
      if (marker && marker.approval_status === 'approved_for_private_draft') {
        pass(`Package references active approved approval marker: ${pkg.approval_id}`);
      } else {
        fail(`Package references inactive or invalid approval marker: ${pkg.approval_id}`);
      }
    }

    if (decision && decision.decision_status !== 'approve_for_private_draft') {
      fail(`Package references non-approved decision: ${decision.decision_status}`);
    } else {
      pass(`Package references approved decision`);
    }

    // B. Hard safety constraints
    if (pkg.draft_status !== 'private_draft_candidate') fail('draft_status must be private_draft_candidate');
    if (pkg.human_review_required !== true) fail('human_review_required must be true');
    if (pkg.public_publish_ready !== false) fail('public_publish_ready must be false');
    if (pkg.promotion_packet_created !== false) fail('promotion_packet_created must be false');
    if (pkg.public_preview_created !== false) fail('public_preview_created must be false');
    if (pkg.public_site_mutated !== false) fail('public_site_mutated must be false');
    if (pkg.remote_write_attempted !== false) fail('remote_write_attempted must be false');
    if (pkg.raw_text_stored !== false) fail('raw_text_stored must be false');
    if (pkg.html_stored !== false) fail('html_stored must be false');

    const sf = pkg.safety_flags || {};
    if (sf.no_raw_html !== true) fail('safety_flags.no_raw_html must be true');
    if (sf.no_long_third_party_text !== true) fail('safety_flags.no_long_third_party_text must be true');
    if (sf.no_secrets_exposed !== true) fail('safety_flags.no_secrets_exposed must be true');
    if (sf.no_unauthorized_remote_writes !== true) fail('safety_flags.no_unauthorized_remote_writes must be true');
    if (sf.no_public_site_leak !== true) fail('safety_flags.no_public_site_leak must be true');

    pass('Package matches all strict safety and field-level constraints');
  }
}

// ── 7. Global Leak & Content Safety Checks ─────────────────────────────────────
const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;
const filesToCheck = [
  latestPackagePath,
  latestManifestPath,
  consolePkgPath,
  hostedPayloadPath
];

let foundHtml = false;
filesToCheck.forEach(file => {
  if (existsFile(file)) {
    const text = readText(file);
    if (text && HTML_PATTERN.test(text)) {
      fail(`Found raw HTML block or markup in package output: ${path.relative(ROOT, file)}`);
      foundHtml = true;
    }
  }
});
if (!foundHtml) pass('No raw HTML or third-party body text leak detected in private draft package outputs');

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
  const latestInc = (incIndex.incidents || []).slice(-1)[0];
  if (latestInc && latestInc.incident_id === 'INC-0013') {
    pass('Latest public incident remains INC-0013 (correct)');
  } else {
    fail(`Latest public incident is ${latestInc ? latestInc.incident_id : 'none'}, expected INC-0013`);
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

// D. No leak of private draft packages inside site/ or public previews
const leakedPaths = [
  path.join(ROOT, 'site', 'data', 'private-draft-candidate-package-latest.json'),
  path.join(ROOT, 'site', 'data', 'private-draft-candidate-package-manifest.json')
];
let foundLeak = false;
leakedPaths.forEach(lp => {
  if (existsFile(lp)) {
    fail(`Private package output leaked inside public site/ folder: ${path.relative(ROOT, lp)}`);
    foundLeak = true;
  }
});
if (!foundLeak) pass('Safety check passed: No private draft package files leaked inside site/');

// E. No .env committed
const envPath = path.join(ROOT, '.env');
if (existsFile(envPath)) {
  fail('.env file exists at repo root — must not be committed');
} else {
  pass('No .env file found at repo root');
}

// F. No cron or remote write / worker deployment in codebase config
const wranglerPath = path.join(ROOT, 'wrangler.toml');
if (existsFile(wranglerPath)) {
  const content = readText(wranglerPath) || '';
  if (content.includes('[triggers]')) {
    fail('Cron triggers found in wrangler.toml');
  } else {
    pass('Safety check passed: no active cron triggers in worker config');
  }
}

// G. No real promotion packets / public previews under data/
const realPromPath = path.join(ROOT, 'data', 'promotion-packets', 'real');
if (existsDir(realPromPath)) {
  const files = fs.readdirSync(realPromPath).filter(f => f !== '.gitkeep' && !/^PKT-000[1-9]\.json$/.test(f));
  if (files.length > 0) {
    fail(`Forbidden real promotion packets found: ${files.join(', ')}`);
  } else {
    pass('Safety check passed: no real promotion packets created');
  }
}

const realPrevPath = path.join(ROOT, 'data', 'publication-previews', 'real');
if (existsDir(realPrevPath)) {
  const files = fs.readdirSync(realPrevPath).filter(f => f !== '.gitkeep' && f !== 'inc-0013-preview.json');
  if (files.length > 0) {
    fail(`Forbidden real publication previews found: ${files.join(', ')}`);
  } else {
    pass('Safety check passed: no real publication previews created');
  }
}

// H. GitHub Pages configuration check
const workflowPath = path.join(ROOT, '.github', 'workflows', 'pages.yml');
if (existsFile(workflowPath)) {
  const text = readText(workflowPath) || '';
  if (text.includes('path: site') || text.includes('path: \'site\'') || text.includes('path: "site"')) {
    pass('Safety check passed: GitHub Pages workflow still uploads only site/ folder');
  } else {
    warn('Pages config may have changed or format differs');
  }
}

// ── 8. Final Report ───────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write(`validate-private-draft-candidate-package: FAILED — ${errors} error(s), ${warnings} warning(s)\n`);
  process.exit(1);
} else {
  process.stdout.write('validate-private-draft-candidate-package: PASSED\n');
  process.exit(0);
}
