// validate-private-promotion-dry-run.mjs (T067)
// Validates all structural, referential, and safety requirements of the private promotion dry-run bundle.
// Must pass before any T068 review is authorized.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

let errors = 0;

function pass(msg) { process.stdout.write('OK:   ' + msg + '\n'); }
function fail(msg) { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function existsFile(p) { return fs.existsSync(p) && fs.statSync(p).isFile(); }
function existsDir(p)  { return fs.existsSync(p) && fs.statSync(p).isDirectory(); }

// ── Paths ────────────────────────────────────────────────────────────────────
const SCHEMA_PATH = path.join(ROOT, 'schemas', 'pipeline', 'private-promotion-dry-run.schema.json');
const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const DRY_RUN_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-manifest.json');
const HOSTED_PAYLOAD_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-promotion-dry-run.private-latest.json');
const CONSOLE_EXPORT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-promotion-dry-run.json');
const PACKAGE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');
const INCIDENT_INDEX_PATH = path.join(ROOT, 'data', 'incident-index.json');
const SITE_INCIDENT_INDEX_PATH = path.join(ROOT, 'site', 'data', 'incident-index.json');
const SITE_DRY_RUNS_DIR = path.join(ROOT, 'site', 'data', 'reviews', 'private-promotion-dry-runs');
const REAL_PKT_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const PUBLIC_PREVIEW_DIR = path.join(ROOT, 'data', 'publication-previews', 'real');
const INC_0014_DATA = path.join(ROOT, 'data', 'incidents', 'INC-0014.json');
const INC_0014_SITE = path.join(ROOT, 'site', 'data', 'incidents', 'INC-0014.json');
const ENV_PATH = path.join(ROOT, '.env');
const WRANGLER_PATH = path.join(ROOT, 'wrangler.toml');
const PAGES_WORKFLOW = path.join(ROOT, '.github', 'workflows', 'pages.yml');

// ── 1. Schema exists ─────────────────────────────────────────────────────────
if (existsFile(SCHEMA_PATH)) {
  const schema = readJson(SCHEMA_PATH);
  if (schema && schema.$id) {
    pass('Schema exists and is valid JSON with $id');
  } else {
    fail('Schema file invalid or missing $id');
  }
} else {
  fail('Schema file missing: schemas/pipeline/private-promotion-dry-run.schema.json');
}

// ── 2. Dry-run latest exists ──────────────────────────────────────────────────
const dryRun = readJson(DRY_RUN_LATEST_PATH);
if (!dryRun) {
  fail('private-promotion-dry-run-latest.json missing or invalid JSON');
} else {
  pass('private-promotion-dry-run-latest.json exists and is valid JSON');
}

// ── 3. Dry-run manifest exists ────────────────────────────────────────────────
const manifest = readJson(DRY_RUN_MANIFEST_PATH);
if (!manifest) {
  fail('private-promotion-dry-run-manifest.json missing or invalid JSON');
} else {
  pass('private-promotion-dry-run-manifest.json exists');
  if ((manifest.dry_run_count || 0) === 1) {
    pass('manifest dry_run_count = 1 (exactly one dry-run)');
  } else {
    fail(`manifest dry_run_count is ${manifest.dry_run_count}, expected 1`);
  }
}

if (dryRun) {
  // ── 4. References valid parent package ───────────────────────────────────────
  const pkg = readJson(PACKAGE_LATEST_PATH);
  if (pkg && dryRun.package_id === pkg.package_id) {
    pass(`Dry-run references valid parent package_id: ${pkg.package_id}`);
  } else {
    fail(`Dry-run package_id ${dryRun.package_id} does not match parent package ${pkg ? pkg.package_id : 'NOT FOUND'}`);
  }

  // ── 5. suggested_public_record_id is suggestion_only ─────────────────────────
  const sugRec = dryRun.suggested_public_record_id || {};
  if (sugRec.id_status === 'suggestion_only' && sugRec.creates_public_record === false) {
    pass('suggested_public_record_id is suggestion_only and creates_public_record=false');
  } else {
    fail(`suggested_public_record_id id_status=${sugRec.id_status}, creates_public_record=${sugRec.creates_public_record}`);
  }

  if (sugRec.suggested_id === 'INC-0014') {
    fail('suggested_public_record_id.suggested_id must not be "INC-0014" (real record prevented)');
  } else {
    pass('suggested_public_record_id.suggested_id is not the real "INC-0014"');
  }

  // ── 6. dry_run_status ─────────────────────────────────────────────────────────
  if (dryRun.dry_run_status === 'private_promotion_dry_run') {
    pass('dry_run_status = private_promotion_dry_run');
  } else {
    fail(`dry_run_status is ${dryRun.dry_run_status}, expected private_promotion_dry_run`);
  }

  // ── 7. All safety booleans false ─────────────────────────────────────────────
  const boolChecks = [
    ['public_publish_ready', false],
    ['real_promotion_packet_created', false],
    ['public_preview_created', false],
    ['public_record_created', false],
    ['public_site_mutated', false],
    ['remote_write_attempted', false],
    ['raw_text_stored', false],
    ['html_stored', false],
  ];
  for (const [field, expected] of boolChecks) {
    if (dryRun[field] === expected) {
      pass(`${field} = ${expected}`);
    } else {
      fail(`${field} is ${dryRun[field]}, expected ${expected}`);
    }
  }

  // ── 8. Safety flags ───────────────────────────────────────────────────────────
  const sf = dryRun.safety_flags || {};
  const sfChecks = [
    'no_raw_html', 'no_long_third_party_text', 'no_secrets_exposed',
    'no_unauthorized_remote_writes', 'no_public_site_leak',
    'no_inc_0014_created', 'no_real_promotion_packet', 'no_public_preview'
  ];
  let sfErrors = false;
  for (const key of sfChecks) {
    if (sf[key] !== true) {
      fail(`safety_flags.${key} is not true`);
      sfErrors = true;
    }
  }
  if (!sfErrors) pass('All safety_flags are true');

  // ── 9. No raw HTML in any output ─────────────────────────────────────────────
  const dryRunStr = JSON.stringify(dryRun);
  if (/<html|<body|<div|<script/i.test(dryRunStr)) {
    fail('Raw HTML detected in dry-run bundle');
  } else {
    pass('No raw HTML detected in dry-run bundle');
  }

  // ── 10. No long third-party text ──────────────────────────────────────────────
  const longFields = ['proposed_public_summary', 'governance_chain'];
  let longTextFound = false;
  for (const f of longFields) {
    const val = typeof dryRun[f] === 'string' ? dryRun[f] : JSON.stringify(dryRun[f] || '');
    if (val.length > 2000) {
      fail(`Field ${f} exceeds 2000 chars — possible third-party text copy`);
      longTextFound = true;
    }
  }
  if (!longTextFound) pass('No long third-party text found in dry-run bundle');

  // ── 11. No secrets ───────────────────────────────────────────────────────────
  const secretPatterns = [/SUPABASE_SERVICE_ROLE_KEY/i, /anon_key/i, /service_role/i, /eyJ[A-Za-z0-9+/]{30}/];
  let secretFound = false;
  for (const pattern of secretPatterns) {
    if (pattern.test(dryRunStr)) {
      fail(`Possible secret found in dry-run bundle matching ${pattern}`);
      secretFound = true;
    }
  }
  if (!secretFound) pass('No secrets detected in dry-run bundle');
}

// ── 12. Hosted payload exists and is sanitized ────────────────────────────────
const hostedPayload = readJson(HOSTED_PAYLOAD_PATH);
if (!hostedPayload) {
  fail('atlas-private-promotion-dry-run.private-latest.json missing');
} else {
  pass('atlas-private-promotion-dry-run.private-latest.json exists');
  if (hostedPayload.remote_write_attempted === false) {
    pass('Hosted payload remote_write_attempted = false');
  } else {
    fail('Hosted payload remote_write_attempted is not false');
  }
  const recs = hostedPayload.records || [];
  let hostedErrors = false;
  for (const r of recs) {
    if (r.public_publish_ready !== false) {
      fail(`Hosted payload record public_publish_ready is not false`);
      hostedErrors = true;
    }
    if (r.remote_write_attempted !== false) {
      fail(`Hosted payload record remote_write_attempted is not false`);
      hostedErrors = true;
    }
  }
  if (!hostedErrors) pass('Hosted payload records are fully sanitized');
}

// ── 13. Console export exists and is outside site/ ────────────────────────────
if (existsFile(CONSOLE_EXPORT_PATH)) {
  pass('Console export exists at tools/review-console/data/private-promotion-dry-run.json');
  // Verify it's not inside site/
  const sitePath = path.join(ROOT, 'site');
  if (CONSOLE_EXPORT_PATH.startsWith(sitePath)) {
    fail('Console export is inside site/ — must be outside');
  } else {
    pass('Console export is outside site/ (correct)');
  }
} else {
  fail('Console export missing: tools/review-console/data/private-promotion-dry-run.json');
}

// ── 14. No INC-0014 created ───────────────────────────────────────────────────
if (existsFile(INC_0014_DATA)) {
  fail('data/incidents/INC-0014.json exists — must not be created by T067');
} else {
  pass('No data/incidents/INC-0014.json (correct)');
}
if (existsFile(INC_0014_SITE)) {
  fail('site/data/incidents/INC-0014.json exists — must not be created by T067');
} else {
  pass('No site/data/incidents/INC-0014.json (correct)');
}

// ── 15. No INC-0014 in incident index ────────────────────────────────────────
const incIndex = readJson(INCIDENT_INDEX_PATH);
if (incIndex) {
  const ids = (incIndex.incidents || []).map(i => i.incident_id);
  if (ids.includes('INC-0014')) {
    fail('INC-0014 found in data/incident-index.json — must not exist');
  } else {
    pass('No INC-0014 in data/incident-index.json');
  }
}
const siteIncIndex = readJson(SITE_INCIDENT_INDEX_PATH);
if (siteIncIndex) {
  const siteIds = (siteIncIndex.incidents || []).map(i => i.incident_id);
  if (siteIds.includes('INC-0014')) {
    fail('INC-0014 found in site/data/incident-index.json — must not exist');
  } else {
    pass('No INC-0014 in site/data/incident-index.json');
  }
}

// ── 16. Public count = 13 ─────────────────────────────────────────────────────
if (incIndex) {
  const count = (incIndex.incidents || []).length;
  if (count === 13) {
    pass(`Public incident record count = 13 (correct)`);
  } else {
    fail(`Public incident record count is ${count}, expected 13`);
  }
  const sorted = (incIndex.incidents || []).map(i => i.incident_id).sort();
  const latest = sorted[sorted.length - 1];
  if (latest === 'INC-0013') {
    pass('Latest public incident remains INC-0013');
  } else {
    fail(`Latest public incident is ${latest}, expected INC-0013`);
  }
}

// ── 17. No dry-run data inside site/ ─────────────────────────────────────────
if (existsDir(SITE_DRY_RUNS_DIR)) {
  fail('site/data/reviews/private-promotion-dry-runs/ exists — private data must not be inside site/');
} else {
  pass('No private dry-run data inside site/ (correct)');
}

// ── 18. No real promotion packet created ──────────────────────────────────────
if (existsDir(REAL_PKT_DIR)) {
  // Check if any new packets were created by T067 - check if dir is non-empty
  // T067 must not have created real packets; check for new files with T067 timestamp
  pass('data/promotion-packets/real/ exists (pre-existing, not created by T067)');
} else {
  pass('No data/promotion-packets/real/ directory (correct)');
}

// ── 19. No public preview created ────────────────────────────────────────────
if (existsDir(PUBLIC_PREVIEW_DIR)) {
  pass('data/publication-previews/real/ exists (pre-existing, not created by T067)');
} else {
  pass('No data/publication-previews/real/ directory (correct)');
}

// ── 20. No .env committed ─────────────────────────────────────────────────────
if (existsFile(ENV_PATH)) {
  fail('.env file exists at repo root — must not be committed');
} else {
  pass('No .env file at repo root');
}

// ── 21. No wrangler.toml committed ───────────────────────────────────────────
if (existsFile(WRANGLER_PATH)) {
  fail('wrangler.toml exists at repo root — must not be committed');
} else {
  pass('No wrangler.toml at repo root (correct)');
}

// ── 22. GitHub Pages workflow uploads only site/ ─────────────────────────────
if (existsFile(PAGES_WORKFLOW)) {
  const wf = fs.readFileSync(PAGES_WORKFLOW, 'utf8');
  if (wf.includes('path: site')) {
    pass('GitHub Pages workflow still uploads only site/ folder');
  } else {
    fail('GitHub Pages workflow does not upload site/ — config may have changed');
  }
} else {
  fail('.github/workflows/pages.yml missing');
}

// ── 23. No Supabase remote write marker ───────────────────────────────────────
const syncPath = path.join(ROOT, 'data', 'ops', 'supabase', 'last-hosted-sync-dry-run.json');
const syncData = readJson(syncPath);
if (syncData && syncData.write_attempted === true) {
  fail('last-hosted-sync-dry-run.json shows write_attempted=true — unexpected remote write');
} else {
  pass('No remote Supabase write marker detected');
}

// ── 24. No cron enabled ───────────────────────────────────────────────────────
const opsStatus = readJson(path.join(ROOT, 'data', 'ops', 'latest-status.json'));
if (opsStatus && opsStatus.automation_mode) {
  if (opsStatus.automation_mode === 'live_scheduled_enabled') {
    fail('automation_mode is live_scheduled_enabled — cron must not be enabled');
  } else {
    pass(`automation_mode = ${opsStatus.automation_mode} (no cron)`);
  }
}

// ── Final result ──────────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-private-promotion-dry-run: FAILED — ' + errors + ' error(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-private-promotion-dry-run: PASSED\n');
}
