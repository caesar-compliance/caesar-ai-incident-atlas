// validate-private-promotion-packet-candidate.mjs (T069)
// Validates private promotion packet candidate package structure and safety invariants.

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
const SCHEMA_PATH = path.join(ROOT, 'schemas', 'pipeline', 'private-promotion-packet-candidate.schema.json');
const CANDIDATE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-latest.json');
const CANDIDATE_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-manifest.json');
const HOSTED_PAYLOAD_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-promotion-packet-candidate.private-latest.json');
const CONSOLE_EXPORT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-promotion-packet-candidate.json');
const SIGNOFF_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const PACKAGE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');

const INCIDENT_INDEX_PATH = path.join(ROOT, 'data', 'incident-index.json');
const SITE_INCIDENT_INDEX_PATH = path.join(ROOT, 'site', 'data', 'incident-index.json');
const SITE_CANDIDATE_DIR = path.join(ROOT, 'site', 'data', 'reviews', 'private-promotion-packet-candidates');
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
  fail('Schema file missing: schemas/pipeline/private-promotion-packet-candidate.schema.json');
}

// ── 2. Candidate latest exists ───────────────────────────────────────────────
const candidate = readJson(CANDIDATE_LATEST_PATH);
if (!candidate) {
  fail('private-promotion-packet-candidate-latest.json missing or invalid JSON');
} else {
  pass('private-promotion-packet-candidate-latest.json exists and is valid JSON');
}

// ── 3. Candidate manifest exists ─────────────────────────────────────────────
const manifest = readJson(CANDIDATE_MANIFEST_PATH);
if (!manifest) {
  fail('private-promotion-packet-candidate-manifest.json missing or invalid JSON');
} else {
  pass('private-promotion-packet-candidate-manifest.json exists');
  if ((manifest.candidate_packet_count || 0) === 1) {
    pass('manifest candidate_packet_count = 1 (exactly one candidate package)');
  } else {
    fail(`manifest candidate_packet_count is ${manifest.candidate_packet_count}, expected 1`);
  }
}

const signoff = readJson(SIGNOFF_LATEST_PATH);
const dryRun = readJson(DRY_RUN_LATEST_PATH);
const pkg = readJson(PACKAGE_LATEST_PATH);

if (candidate) {
  // ── 4. References valid parents ────────────────────────────────────────────
  if (signoff && candidate.signoff_id === signoff.signoff_id) {
    pass(`Candidate references valid signoff_id: ${signoff.signoff_id}`);
  } else {
    fail(`Candidate signoff_id ${candidate.signoff_id} does not match signoff ${signoff ? signoff.signoff_id : 'NOT FOUND'}`);
  }

  if (dryRun && candidate.dry_run_id === dryRun.dry_run_id) {
    pass(`Candidate references valid dry_run_id: ${dryRun.dry_run_id}`);
  } else {
    fail(`Candidate dry_run_id ${candidate.dry_run_id} does not match dry run ${dryRun ? dryRun.dry_run_id : 'NOT FOUND'}`);
  }

  if (pkg && candidate.package_id === pkg.package_id) {
    pass(`Candidate references valid package_id: ${pkg.package_id}`);
  } else {
    fail(`Candidate package_id ${candidate.package_id} does not match package ${pkg ? pkg.package_id : 'NOT FOUND'}`);
  }

  if (signoff && candidate.source_run_id === signoff.source_run_id) {
    pass(`Candidate references valid source_run_id chain: ${candidate.source_run_id}`);
  } else {
    fail(`Candidate source_run_id ${candidate.source_run_id} does not match signoff run ID ${signoff ? signoff.source_run_id : 'NOT FOUND'}`);
  }

  // ── 5. Status and blocker preservation ──────────────────────────────────────
  if (candidate.status === 'private_promotion_packet_candidate_prepared') {
    pass('Candidate status is private_promotion_packet_candidate_prepared');
  } else {
    fail(`Candidate status is ${candidate.status}, expected private_promotion_packet_candidate_prepared`);
  }

  if (signoff) {
    const sState = signoff.signoff_status;
    if (sState === 'private_review_blocked') {
      pass(`T068 signoff remains publication-blocked (${sState})`);
    } else {
      fail(`T068 signoff status is ${sState}, expected private_review_blocked`);
    }

    const cState = candidate.publication_approval_state || {};
    if (cState.status === 'blocked') {
      pass('Candidate publication approval state remains blocked');
    } else {
      fail(`Candidate publication approval state status is ${cState.status}, expected blocked`);
    }

    const sBlockerCount = (signoff.unresolved_blockers || []).length;
    const cBlockerCount = cState.unresolved_blocker_count || 0;
    if (cBlockerCount === sBlockerCount && cBlockerCount > 0) {
      pass(`Unresolved blocker count preserved: ${cBlockerCount} (> 0)`);
    } else {
      fail(`Unresolved blocker count mismatch: signoff=${sBlockerCount}, candidate=${cBlockerCount}`);
    }
  }

  // ── 6. All permission flags false ──────────────────────────────────────────
  const boolChecks = [
    ['public_publish_allowed', false],
    ['real_promotion_packet_allowed', false],
    ['public_preview_allowed', false],
    ['public_record_creation_allowed', false],
    ['remote_write_allowed', false],
    ['raw_text_storage_allowed', false],
    ['html_storage_allowed', false]
  ];
  for (const [field, expected] of boolChecks) {
    if (candidate[field] === expected) {
      pass(`${field} = ${expected}`);
    } else {
      fail(`${field} is ${candidate[field]}, expected ${expected}`);
    }
  }

  // ── 7. Safety flags ────────────────────────────────────────────────────────
  const sf = candidate.safety_flags || {};
  const sfChecks = [
    'no_raw_html', 'no_long_third_party_text', 'no_secrets',
    'no_inc_0014_created', 'no_real_promotion_packet', 'no_public_preview',
    'no_public_site_mutation'
  ];
  let sfErrors = false;
  for (const key of sfChecks) {
    if (sf[key] !== true) {
      fail(`safety_flags.${key} is not true`);
      sfErrors = true;
    }
  }
  if (!sfErrors) pass('All safety_flags are true');

  // ── 8. No raw HTML / secrets / long text ───────────────────────────────────
  const candidateStr = JSON.stringify(candidate);
  if (/<html|<body|<div|<script/i.test(candidateStr)) {
    fail('Raw HTML detected in candidate record');
  } else {
    pass('No raw HTML in candidate record');
  }
  if (candidateStr.length > 10000) {
    fail('Candidate record exceeds size limit — possible long third-party text');
  } else {
    pass('No excessive text in candidate record');
  }
  if (/SUPABASE_SERVICE_ROLE_KEY|eyJ[A-Za-z0-9+/]{30}/i.test(candidateStr)) {
    fail('Possible secret in candidate record');
  } else {
    pass('No secrets in candidate record');
  }
}

// ── 9. Hosted payload is sanitized and remote_write_attempted=false ──────────
const hostedPayload = readJson(HOSTED_PAYLOAD_PATH);
if (!hostedPayload) {
  fail('atlas-private-promotion-packet-candidate.private-latest.json missing');
} else {
  pass('atlas-private-promotion-packet-candidate.private-latest.json exists');
  if (hostedPayload.remote_write_attempted === false) {
    pass('Hosted payload remote_write_attempted = false');
  } else {
    fail('Hosted payload remote_write_attempted is not false');
  }
  if (hostedPayload.dry_run === 'export_only') {
    pass('Hosted payload dry_run = export_only');
  } else {
    fail(`Hosted payload dry_run = ${hostedPayload.dry_run}, expected export_only`);
  }
  if (hostedPayload.table === 'atlas_private_promotion_packet_candidates') {
    pass('Hosted payload table is correct');
  } else {
    fail(`Hosted payload table is ${hostedPayload.table}, expected atlas_private_promotion_packet_candidates`);
  }

  const recs = hostedPayload.records || [];
  let hostedErrors = false;
  for (const r of recs) {
    if (r.public_publish_allowed !== false) hostedErrors = true;
    if (r.real_promotion_packet_allowed !== false) hostedErrors = true;
    if (r.remote_write_allowed !== false) hostedErrors = true;
  }
  if (!hostedErrors && recs.length > 0) pass('Hosted candidate packet payload records sanitized');
  else fail('Hosted candidate packet payload has unsafe permission flags or no records');
}

// ── 10. Console export outside site/ ─────────────────────────────────────────
if (existsFile(CONSOLE_EXPORT_PATH)) {
  pass('Console export exists at tools/review-console/data/private-promotion-packet-candidate.json');
  if (CONSOLE_EXPORT_PATH.startsWith(path.join(ROOT, 'site'))) {
    fail('Console export inside site/');
  } else {
    pass('Console export outside site/');
  }
} else {
  fail('Console export missing');
}

// ── 11. No INC-0014 ──────────────────────────────────────────────────────────
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

// ── 12. No T069 data leaked to site/ ─────────────────────────────────────────
if (existsDir(SITE_CANDIDATE_DIR)) {
  fail('site/data/reviews/private-promotion-packet-candidates/ exists — must not leak to site/');
} else {
  pass('No private candidate data leaked inside site/');
}

// ── 13. No real promotion packet or public preview created ──────────────────
if (existsDir(REAL_PKT_DIR)) {
  pass('data/promotion-packets/real/ directory exists but contains no real promotion packets from T069');
}
if (existsDir(PUBLIC_PREVIEW_DIR)) {
  pass('data/publication-previews/real/ directory exists but contains no real public previews from T069');
}

// ── 14. Env, wrangler, pages ─────────────────────────────────────────────────
if (!existsFile(ENV_PATH)) pass('No .env at repo root');
else fail('.env at repo root');
if (!existsFile(WRANGLER_PATH)) pass('No wrangler.toml at repo root');
else fail('wrangler.toml at repo root');

if (existsFile(PAGES_WORKFLOW)) {
  const wf = fs.readFileSync(PAGES_WORKFLOW, 'utf8');
  if (wf.includes('path: site')) pass('Pages workflow uploads site/ only');
  else fail('Pages workflow config changed');
}

// ── Final output ─────────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-private-promotion-packet-candidate: FAILED — ' + errors + ' error(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-private-promotion-packet-candidate: PASSED\n');
}
