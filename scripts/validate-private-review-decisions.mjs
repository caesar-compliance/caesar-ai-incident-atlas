// validate-private-review-decisions.mjs (T063)
// Validates private review decisions schema, records, manifests, exports, and safety.

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

log('=== Validating Private Review Decisions & Packets (T063) ===\n');

// ── 1. Schema File exists ──────────────────────────────────────────────────────
const schemaPath = path.join(ROOT, 'schemas', 'pipeline', 'private-review-decision.schema.json');
if (existsFile(schemaPath)) {
  const schema = readJson(schemaPath);
  if (!schema || schema.$id !== 'https://caesar.no/schemas/pipeline/private-review-decision.schema.json') {
    fail('private-review-decision.schema.json has unexpected $id');
  } else {
    pass('Schema private-review-decision.schema.json exists and is valid');
  }
} else {
  fail('Schema private-review-decision.schema.json not found');
}

// ── 2. Latest Decision & Packet Files exist ──────────────────────────────────────
const latestDecisionsPath = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const latestManifestPath = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-manifest.json');
const latestPacketsPath = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-latest.json');
const latestPacketsManifestPath = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-manifest.json');

if (existsFile(latestDecisionsPath)) pass('Latest decisions JSON exists: private-review-decisions-latest.json');
else fail('Latest decisions JSON not found');

if (existsFile(latestManifestPath)) pass('Latest decisions manifest JSON exists: private-review-decisions-manifest.json');
else fail('Latest decisions manifest JSON not found');

if (existsFile(latestPacketsPath)) pass('Latest packets JSON exists: private-draft-candidate-packets-latest.json');
else fail('Latest packets JSON not found');

if (existsFile(latestPacketsManifestPath)) pass('Latest packets manifest JSON exists: private-draft-candidate-packets-manifest.json');
else fail('Latest packets manifest JSON not found');

// ── 3. Run pointer and Run directories exist ─────────────────────────────────────
const latestRunPath = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const latestRun = readJson(latestRunPath);

if (!latestRun) {
  fail('real-green-run-latest.json not found');
} else {
  const runId = latestRun.run_id;
  const runDecisionsDir = path.join(ROOT, 'data', 'reviews', 'decisions', 'runs', runId);
  
  if (existsDir(runDecisionsDir)) {
    pass(`Run decisions directory exists: ${runDecisionsDir}`);
    if (existsFile(path.join(runDecisionsDir, 'review-decisions.json'))) pass('Stable run decisions file exists');
    else fail('Stable run decisions file is missing');
    if (existsFile(path.join(runDecisionsDir, 'decision-manifest.json'))) pass('Stable run decisions manifest exists');
    else fail('Stable run decisions manifest is missing');
  } else {
    fail(`Run decisions directory does not exist for run: ${runId}`);
  }
}

// ── 4. Review Console Exports exist ─────────────────────────────────────────────
const consoleDecisPath = path.join(ROOT, 'tools', 'review-console', 'data', 'private-review-decisions.json');
const consolePacketsPath = path.join(ROOT, 'tools', 'review-console', 'data', 'private-draft-candidate-packets.json');

if (existsFile(consoleDecisPath)) pass('Review console private decisions export exists');
else fail('Review console private decisions export is missing');

if (existsFile(consolePacketsPath)) pass('Review console private packets export exists');
else fail('Review console private packets export is missing');

// ── 5. Hosted Dry-run Payloads exist ───────────────────────────────────────────
const hostedDecisPath = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-review-decisions.private-latest.json');
const hostedPacketsPath = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-draft-candidate-packets.private-latest.json');

if (existsFile(hostedDecisPath)) pass('Hosted dry-run decisions payload exists');
else fail('Hosted dry-run decisions payload is missing');

if (existsFile(hostedPacketsPath)) pass('Hosted dry-run packets payload exists');
else fail('Hosted dry-run packets payload is missing');

// ── 6. Schema, Decision, and Packet Constraints ──────────────────────────────
if (errors === 0) {
  const decisionsData = readJson(latestDecisionsPath);
  const decisions = decisionsData ? decisionsData.decisions || [] : [];
  
  const packetsData = readJson(latestPacketsPath);
  const packets = packetsData ? packetsData.packets || [] : [];

  const intakeLatestPath = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-latest.json');
  const intakeData = readJson(intakeLatestPath);
  const intakeCount = intakeData ? (intakeData.records || []).length : 0;

  // A. Count matching
  if (decisions.length !== intakeCount) {
    fail(`Decision count (${decisions.length}) does not match intake count (${intakeCount})`);
  } else {
    pass(`Decision count matches intake count (${intakeCount})`);
  }

  // B. Default vs patched decisions
  let defaultCount = 0;
  let patchedCount = 0;
  
  const ALLOWED_STATUSES = ['needs_more_review', 'approve_for_private_draft', 'reject_signal', 'defer'];

  decisions.forEach((d, idx) => {
    const pre = `[Decision #${idx+1} (${d.decision_id})]`;
    
    if (!ALLOWED_STATUSES.includes(d.decision_status)) {
      fail(`${pre} has invalid status: ${d.decision_status}`);
    }

    if (d.decision_status === 'needs_more_review') {
      defaultCount++;
    } else {
      patchedCount++;
    }

    // Hard safety constraints
    if (d.public_publish_ready !== false) fail(`${pre} public_publish_ready must be false`);
    if (d.promotion_packet_created !== false) fail(`${pre} promotion_packet_created must be false`);
    if (d.public_preview_created !== false) fail(`${pre} public_preview_created must be false`);
    if (d.public_site_mutated !== false) fail(`${pre} public_site_mutated must be false`);
    if (d.remote_write_attempted !== false) fail(`${pre} remote_write_attempted must be false`);
    if (d.raw_text_stored !== false) fail(`${pre} raw_text_stored must be false`);
    if (d.html_stored !== false) fail(`${pre} html_stored must be false`);

    const sf = d.safety_flags || {};
    if (sf.no_raw_html !== true) fail(`${pre} safety_flags.no_raw_html must be true`);
    if (sf.no_long_third_party_text !== true) fail(`${pre} safety_flags.no_long_third_party_text must be true`);
    if (sf.no_secrets_exposed !== true) fail(`${pre} safety_flags.no_secrets_exposed must be true`);
    if (sf.no_unauthorized_remote_writes !== true) fail(`${pre} safety_flags.no_unauthorized_remote_writes must be true`);
    if (sf.no_public_site_leak !== true) fail(`${pre} safety_flags.no_public_site_leak must be true`);
  });

  pass(`Decisions status verification complete: ${defaultCount} default (needs_more_review), ${patchedCount} patched`);

  // C. Draft Packets Count Validation
  const approvedCount = decisions.filter(d => d.decision_status === 'approve_for_private_draft').length;
  if (packets.length !== approvedCount) {
    fail(`Packets count (${packets.length}) does not match approved decisions count (${approvedCount})`);
  } else {
    pass(`Packets count matches approved decisions count: ${approvedCount}`);
  }

  // T063 Baseline tightening: zero approvals and zero draft packets allowed
  if (approvedCount !== 0) {
    fail(`Baseline T063 requires 0 approved decisions, but found ${approvedCount}`);
  } else {
    pass('Baseline T063 has 0 approved decisions');
  }

  if (packets.length !== 0) {
    fail(`Baseline T063 requires 0 draft packets, but found ${packets.length}`);
  } else {
    pass('Baseline T063 has 0 draft packets');
  }

  // D. Draft Packet Constraints
  packets.forEach((p, idx) => {
    const pre = `[Packet #${idx+1} (${p.packet_id})]`;
    
    if (p.draft_candidate_ready !== true) fail(`${pre} draft_candidate_ready must be true`);
    if (p.public_publish_ready !== false) fail(`${pre} public_publish_ready must be false`);
    if (p.promotion_packet_created !== false) fail(`${pre} promotion_packet_created must be false`);
    if (p.public_preview_created !== false) fail(`${pre} public_preview_created must be false`);
    if (p.public_site_mutated !== false) fail(`${pre} public_site_mutated must be false`);
    if (p.remote_write_attempted !== false) fail(`${pre} remote_write_attempted must be false`);
    if (p.raw_text_stored !== false) fail(`${pre} raw_text_stored must be false`);
    if (p.html_stored !== false) fail(`${pre} html_stored must be false`);
  });
  if (packets.length > 0) {
    pass('All generated draft packets comply with field-level safety constraints');
  } else {
    pass('Safety check: No draft packets exist to validate in baseline review state');
  }
}

// ── 7. Global Leak & Safety Checks ─────────────────────────────────────────────
const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;

const filesToCheck = [
  latestDecisionsPath,
  latestManifestPath,
  latestPacketsPath,
  latestPacketsManifestPath,
  consoleDecisPath,
  consolePacketsPath,
  hostedDecisPath,
  hostedPacketsPath
];

let foundHtml = false;
filesToCheck.forEach(file => {
  if (existsFile(file)) {
    const text = readText(file);
    if (text && HTML_PATTERN.test(text)) {
      fail(`Found raw HTML block or markup in: ${path.relative(ROOT, file)}`);
      foundHtml = true;
    }
  }
});
if (!foundHtml) pass('No raw HTML or third-party body text leak detected in private review outputs');

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

// D. No leak of private review outputs into site/
const leakPaths = [
  path.join(ROOT, 'site', 'data', 'private-review-decisions.json'),
  path.join(ROOT, 'site', 'data', 'private-draft-candidate-packets.json'),
];
let foundLeak = false;
leakPaths.forEach(lp => {
  if (existsFile(lp)) {
    fail(`Private review output leaked inside public site/ folder: ${path.relative(ROOT, lp)}`);
    foundLeak = true;
  }
});
if (!foundLeak) pass('Safety check passed: No private review outputs leaked inside site/');

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

// G. No real promotion packets / public previews under data/ for T063 (no uncommitted/new files in those directories)
let gitStatusProm = '';
let gitStatusPrev = '';
try {
  gitStatusProm = execSync('git status --porcelain data/promotion-packets/real', { cwd: ROOT, encoding: 'utf8' }).trim();
  gitStatusPrev = execSync('git status --porcelain data/publication-previews/real', { cwd: ROOT, encoding: 'utf8' }).trim();
} catch (e) {
  // If git fails, fallback to simple file checks (excluding pre-existing committed ones)
}

if (gitStatusProm) {
  fail(`Real promotion packets found under data/promotion-packets/real/ - prohibited for T063: ${gitStatusProm}`);
} else {
  // Check if any new/unexpected files exist that are not known pre-existing ones
  const realPromPath = path.join(ROOT, 'data', 'promotion-packets', 'real');
  if (existsDir(realPromPath)) {
    const files = fs.readdirSync(realPromPath).filter(f => f !== '.gitkeep' && !/^PKT-000[1-9]\.json$/.test(f));
    if (files.length > 0) {
      fail(`New/unexpected real promotion packets found: ${files.join(', ')}`);
    } else {
      pass('Safety check passed: no real promotion packets created');
    }
  } else {
    pass('Safety check passed: no real promotion packets created');
  }
}

if (gitStatusPrev) {
  fail(`Real publication previews found under data/publication-previews/real/ - prohibited for T063: ${gitStatusPrev}`);
} else {
  const realPrevPath = path.join(ROOT, 'data', 'publication-previews', 'real');
  if (existsDir(realPrevPath)) {
    const files = fs.readdirSync(realPrevPath).filter(f => f !== '.gitkeep' && f !== 'inc-0013-preview.json');
    if (files.length > 0) {
      fail(`New/unexpected real publication previews found: ${files.join(', ')}`);
    } else {
      pass('Safety check passed: no real publication previews created');
    }
  } else {
    pass('Safety check passed: no real publication previews created');
  }
}


// ── 8. Final Report ───────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write(`validate-private-review-decisions: FAILED — ${errors} error(s), ${warnings} warning(s)\n`);
  process.exit(1);
} else {
  process.stdout.write('validate-private-review-decisions: PASSED\n');
  process.exit(0);
}
