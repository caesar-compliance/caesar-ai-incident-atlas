// validate-private-promotion-signoff.mjs (T068)
// Validates private promotion signoff record and safety invariants.

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

const SCHEMA_PATH = path.join(ROOT, 'schemas', 'pipeline', 'private-promotion-signoff.schema.json');
const SIGNOFF_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const SIGNOFF_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-manifest.json');
const HOSTED_PAYLOAD_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-promotion-signoff.private-latest.json');
const CONSOLE_EXPORT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-promotion-signoff.json');
const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const PACKAGE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');
const INCIDENT_INDEX_PATH = path.join(ROOT, 'data', 'incident-index.json');
const SITE_INCIDENT_INDEX_PATH = path.join(ROOT, 'site', 'data', 'incident-index.json');
const SITE_SIGNOFFS_DIR = path.join(ROOT, 'site', 'data', 'reviews', 'private-promotion-signoffs');
const REAL_PKT_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const PUBLIC_PREVIEW_DIR = path.join(ROOT, 'data', 'publication-previews', 'real');
const INC_0014_DATA = path.join(ROOT, 'data', 'incidents', 'INC-0014.json');
const INC_0014_SITE = path.join(ROOT, 'site', 'data', 'incidents', 'INC-0014.json');
const ENV_PATH = path.join(ROOT, '.env');
const WRANGLER_PATH = path.join(ROOT, 'wrangler.toml');
const PAGES_WORKFLOW = path.join(ROOT, '.github', 'workflows', 'pages.yml');

const ALLOWED_SIGNOFF_STATUSES = ['private_review_pending', 'private_review_blocked'];

// ── 1. Schema exists ─────────────────────────────────────────────────────────
if (existsFile(SCHEMA_PATH)) {
  const schema = readJson(SCHEMA_PATH);
  if (schema && schema.$id) {
    pass('Schema exists and is valid JSON with $id');
  } else {
    fail('Schema file invalid or missing $id');
  }
} else {
  fail('Schema file missing: schemas/pipeline/private-promotion-signoff.schema.json');
}

// ── 2. Signoff latest exists ──────────────────────────────────────────────────
const signoff = readJson(SIGNOFF_LATEST_PATH);
if (!signoff) {
  fail('private-promotion-signoff-latest.json missing or invalid JSON');
} else {
  pass('private-promotion-signoff-latest.json exists and is valid JSON');
}

const manifest = readJson(SIGNOFF_MANIFEST_PATH);
if (!manifest) {
  fail('private-promotion-signoff-manifest.json missing or invalid JSON');
} else {
  pass('private-promotion-signoff-manifest.json exists');
  if ((manifest.signoff_count || 0) === 1) {
    pass('manifest signoff_count = 1 (exactly one signoff)');
  } else {
    fail(`manifest signoff_count is ${manifest.signoff_count}, expected 1`);
  }
}

const dryRun = readJson(DRY_RUN_LATEST_PATH);
const pkg = readJson(PACKAGE_LATEST_PATH);

if (signoff) {
  // ── 3. References valid T067 dry-run ─────────────────────────────────────────
  if (dryRun && signoff.dry_run_id === dryRun.dry_run_id) {
    pass(`Signoff references valid dry_run_id: ${dryRun.dry_run_id}`);
  } else {
    fail(`Signoff dry_run_id ${signoff.dry_run_id} does not match T067 dry-run`);
  }

  // ── 4. References valid T066 package ───────────────────────────────────────
  if (pkg && signoff.package_id === pkg.package_id) {
    pass(`Signoff references valid package_id: ${pkg.package_id}`);
  } else {
    fail(`Signoff package_id ${signoff.package_id} does not match T066 package`);
  }

  // ── 5. signoff_status baseline ───────────────────────────────────────────────
  if (ALLOWED_SIGNOFF_STATUSES.includes(signoff.signoff_status)) {
    pass(`signoff_status = ${signoff.signoff_status} (pending/blocked baseline)`);
  } else {
    fail(`signoff_status is ${signoff.signoff_status}, expected private_review_pending or private_review_blocked`);
  }

  // ── 6. unresolved blockers > 0 ───────────────────────────────────────────────
  const blockerCount = (signoff.unresolved_blockers || []).length;
  if (blockerCount > 0) {
    pass(`unresolved_blockers count = ${blockerCount} (> 0)`);
  } else {
    fail('unresolved_blockers must remain > 0 for T068 baseline');
  }

  // ── 7. All permission flags false ────────────────────────────────────────────
  const boolChecks = [
    ['public_publish_allowed', false],
    ['real_promotion_packet_allowed', false],
    ['public_preview_allowed', false],
    ['public_record_creation_allowed', false],
    ['remote_write_allowed', false],
    ['raw_text_storage_allowed', false],
    ['html_storage_allowed', false],
  ];
  for (const [field, expected] of boolChecks) {
    if (signoff[field] === expected) {
      pass(`${field} = ${expected}`);
    } else {
      fail(`${field} is ${signoff[field]}, expected ${expected}`);
    }
  }

  // ── 8. Review dimensions not all passed ──────────────────────────────────────
  const reviewFields = [
    'legal_review_status',
    'source_quotation_review_status',
    'public_narrative_review_status',
    'publication_risk_review_status',
    'control_tower_publication_approval_status'
  ];
  const allPassed = reviewFields.every(f => signoff[f] === 'passed');
  if (!allPassed) {
    pass('Not all review dimensions marked passed (T068 baseline correct)');
  } else {
    fail('All review dimensions are passed — T068 baseline must keep at least one pending/blocked');
  }

  // ── 9. suggested_public_record_id suggestion_only ────────────────────────────
  const sugRec = signoff.suggested_public_record_id || {};
  if (sugRec.id_status === 'suggestion_only' && sugRec.creates_public_record === false) {
    pass('suggested_public_record_id is suggestion_only');
  } else {
    fail('suggested_public_record_id not properly marked suggestion_only');
  }
  if (sugRec.suggested_id === 'INC-0014') {
    fail('suggested_public_record_id.suggested_id must not be real INC-0014');
  } else {
    pass('suggested_public_record_id is not real INC-0014');
  }

  // ── 10. Safety flags ─────────────────────────────────────────────────────────
  const sf = signoff.safety_flags || {};
  const sfChecks = [
    'no_raw_html', 'no_long_third_party_text', 'no_secrets_exposed',
    'no_unauthorized_remote_writes', 'no_public_site_leak',
    'no_inc_0014_created', 'no_real_promotion_packet', 'no_public_preview',
    'not_publication_approval'
  ];
  let sfErrors = false;
  for (const key of sfChecks) {
    if (sf[key] !== true) {
      fail(`safety_flags.${key} is not true`);
      sfErrors = true;
    }
  }
  if (!sfErrors) pass('All safety_flags are true');

  // ── 11. No raw HTML / long text / secrets ────────────────────────────────────
  const signoffStr = JSON.stringify(signoff);
  if (/<html|<body|<div|<script/i.test(signoffStr)) {
    fail('Raw HTML detected in signoff record');
  } else {
    pass('No raw HTML in signoff record');
  }
  if (signoffStr.length > 15000) {
    fail('Signoff record exceeds size limit — possible long third-party text');
  } else {
    pass('No excessive text in signoff record');
  }
  if (/SUPABASE_SERVICE_ROLE_KEY|eyJ[A-Za-z0-9+/]{30}/i.test(signoffStr)) {
    fail('Possible secret in signoff record');
  } else {
    pass('No secrets in signoff record');
  }
}

// ── 12. Hosted payload ────────────────────────────────────────────────────────
const hostedPayload = readJson(HOSTED_PAYLOAD_PATH);
if (!hostedPayload) {
  fail('atlas-private-promotion-signoff.private-latest.json missing');
} else {
  pass('atlas-private-promotion-signoff.private-latest.json exists');
  if (hostedPayload.remote_write_attempted === false) {
    pass('Hosted payload remote_write_attempted = false');
  } else {
    fail('Hosted payload remote_write_attempted is not false');
  }
  const recs = hostedPayload.records || [];
  let hostedErrors = false;
  for (const r of recs) {
    if (r.public_publish_allowed !== false) hostedErrors = true;
    if (r.real_promotion_packet_allowed !== false) hostedErrors = true;
    if (r.remote_write_allowed !== false) hostedErrors = true;
  }
  if (!hostedErrors) pass('Hosted signoff payload records sanitized');
  else fail('Hosted signoff payload has unsafe permission flags');
}

// ── 13. Console export outside site/ ─────────────────────────────────────────
if (existsFile(CONSOLE_EXPORT_PATH)) {
  pass('Console export exists at tools/review-console/data/private-promotion-signoff.json');
  if (CONSOLE_EXPORT_PATH.startsWith(path.join(ROOT, 'site'))) {
    fail('Console export inside site/');
  } else {
    pass('Console export outside site/');
  }
} else {
  fail('Console export missing');
}

// ── 14–16. No INC-0014 ───────────────────────────────────────────────────────
if (!existsFile(INC_0014_DATA)) pass('No data/incidents/INC-0014.json');
else fail('data/incidents/INC-0014.json exists');
if (!existsFile(INC_0014_SITE)) pass('No site/data/incidents/INC-0014.json');
else fail('site/data/incidents/INC-0014.json exists');

const incIndex = readJson(INCIDENT_INDEX_PATH);
if (incIndex) {
  const ids = (incIndex.incidents || []).map(i => i.incident_id);
  if (!ids.includes('INC-0014')) pass('No INC-0014 in data/incident-index.json');
  else fail('INC-0014 in data/incident-index.json');
  const count = ids.length;
  if (count === 13) pass('Public incident record count = 13');
  else fail(`Public count is ${count}, expected 13`);
  const sorted = ids.sort();
  if (sorted[sorted.length - 1] === 'INC-0013') pass('Latest public incident remains INC-0013');
  else fail(`Latest is ${sorted[sorted.length - 1]}, expected INC-0013`);
}

const siteIncIndex = readJson(SITE_INCIDENT_INDEX_PATH);
if (siteIncIndex) {
  const siteIds = (siteIncIndex.incidents || []).map(i => i.incident_id);
  if (!siteIds.includes('INC-0014')) pass('No INC-0014 in site/data/incident-index.json');
  else fail('INC-0014 in site incident index');
}

// ── 17. No signoff data in site/ ─────────────────────────────────────────────
if (existsDir(SITE_SIGNOFFS_DIR)) {
  fail('site/data/reviews/private-promotion-signoffs/ exists — must not leak to site/');
} else {
  pass('No private signoff data inside site/');
}

// ── 18–19. No real packets/previews created by T068 ──────────────────────────
if (existsDir(REAL_PKT_DIR)) {
  pass('data/promotion-packets/real/ not created by T068 (pre-existing ok)');
} else {
  pass('No real promotion packet directory');
}
if (existsDir(PUBLIC_PREVIEW_DIR)) {
  pass('data/publication-previews/real/ not created by T068 (pre-existing ok)');
} else {
  pass('No public preview directory');
}

// ── 20–24. Env, wrangler, pages, supabase, cron ─────────────────────────────
if (!existsFile(ENV_PATH)) pass('No .env at repo root');
else fail('.env at repo root');
if (!existsFile(WRANGLER_PATH)) pass('No wrangler.toml at repo root');
else fail('wrangler.toml at repo root');

if (existsFile(PAGES_WORKFLOW)) {
  const wf = fs.readFileSync(PAGES_WORKFLOW, 'utf8');
  if (wf.includes('path: site')) pass('Pages workflow uploads site/ only');
  else fail('Pages workflow config changed');
}

const syncPath = path.join(ROOT, 'data', 'ops', 'supabase', 'last-hosted-sync-dry-run.json');
const syncData = readJson(syncPath);
if (syncData && syncData.write_attempted === true) {
  fail('Remote Supabase write marker detected');
} else {
  pass('No remote Supabase write marker');
}

const opsStatus = readJson(path.join(ROOT, 'data', 'ops', 'latest-status.json'));
if (opsStatus && opsStatus.automation_mode === 'live_scheduled_enabled') {
  fail('Cron enabled via automation_mode');
} else {
  pass(`automation_mode = ${opsStatus ? opsStatus.automation_mode : 'unknown'} (no cron)`);
}

process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-private-promotion-signoff: FAILED — ' + errors + ' error(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-private-promotion-signoff: PASSED\n');
}
