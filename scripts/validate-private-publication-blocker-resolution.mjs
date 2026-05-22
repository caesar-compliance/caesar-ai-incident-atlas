// validate-private-publication-blocker-resolution.mjs (T070)
// Validates private publication blocker resolution dossier and safety invariants.

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
const SCHEMA_PATH = path.join(ROOT, 'schemas', 'pipeline', 'private-publication-blocker-resolution.schema.json');
const DOSSIER_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'private-publication-blocker-resolution-latest.json');
const DOSSIER_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'private-publication-blocker-resolution-manifest.json');
const HOSTED_PAYLOAD_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-publication-blocker-resolution.private-latest.json');
const CONSOLE_EXPORT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-publication-blocker-resolution.json');

const CANDIDATE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-latest.json');
const SIGNOFF_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const DRY_RUN_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const PACKAGE_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');

const INCIDENT_INDEX_PATH = path.join(ROOT, 'data', 'incident-index.json');
const SITE_INCIDENT_INDEX_PATH = path.join(ROOT, 'site', 'data', 'incident-index.json');
const SITE_T070_DIR = path.join(ROOT, 'site', 'data', 'reviews', 'private-publication-blocker-resolutions');
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
  fail('Schema file missing: schemas/pipeline/private-publication-blocker-resolution.schema.json');
}

// ── 2. Dossier latest exists ─────────────────────────────────────────────────
const dossier = readJson(DOSSIER_LATEST_PATH);
if (!dossier) {
  fail('private-publication-blocker-resolution-latest.json missing or invalid JSON');
} else {
  pass('private-publication-blocker-resolution-latest.json exists and is valid JSON');
}

// ── 3. Dossier manifest exists ───────────────────────────────────────────────
const manifest = readJson(DOSSIER_MANIFEST_PATH);
if (!manifest) {
  fail('private-publication-blocker-resolution-manifest.json missing or invalid JSON');
} else {
  pass('private-publication-blocker-resolution-manifest.json exists');
  if ((manifest.resolution_count || 0) === 1) {
    pass('manifest resolution_count = 1 (exactly one resolution dossier)');
  } else {
    fail(`manifest resolution_count is ${manifest.resolution_count}, expected 1`);
  }
}

const candidate = readJson(CANDIDATE_LATEST_PATH);
const signoff = readJson(SIGNOFF_LATEST_PATH);
const dryRun = readJson(DRY_RUN_LATEST_PATH);
const pkg = readJson(PACKAGE_LATEST_PATH);

if (dossier) {
  // ── 4. References valid parents ────────────────────────────────────────────
  if (candidate && dossier.promotion_packet_candidate_id === candidate.candidate_packet_id) {
    pass(`Dossier references valid candidate ID: ${candidate.candidate_packet_id}`);
  } else {
    fail(`Dossier candidate ID mismatch`);
  }

  if (signoff && dossier.signoff_id === signoff.signoff_id) {
    pass(`Dossier references valid signoff_id: ${signoff.signoff_id}`);
  } else {
    fail(`Dossier signoff_id mismatch`);
  }

  if (dryRun && dossier.dry_run_id === dryRun.dry_run_id) {
    pass(`Dossier references valid dry_run_id: ${dryRun.dry_run_id}`);
  } else {
    fail(`Dossier dry_run_id mismatch`);
  }

  if (pkg && dossier.package_id === pkg.package_id) {
    pass(`Dossier references valid package_id: ${pkg.package_id}`);
  } else {
    fail(`Dossier package_id mismatch`);
  }

  if (signoff && dossier.source_run_id === signoff.source_run_id) {
    pass(`Dossier references valid source_run_id chain: ${dossier.source_run_id}`);
  } else {
    fail(`Dossier source_run_id mismatch`);
  }

  // Confirm run copy exists and matches key IDs
  const runOutputDir = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'runs', dossier.source_run_id);
  const runCopyPath = path.join(runOutputDir, 'private-publication-blocker-resolution.json');
  const runCopy = readJson(runCopyPath);
  if (runCopy) {
    if (runCopy.resolution_id === dossier.resolution_id && runCopy.source_run_id === dossier.source_run_id) {
      pass('Run copy exists and matches key IDs');
    } else {
      fail('Run copy has key ID mismatch');
    }
  } else {
    fail(`Run copy missing at: ${runCopyPath}`);
  }

  // ── 5. Status and blocker validations ──────────────────────────────────────
  if (dossier.status === 'private_package_blockers_partially_resolved') {
    pass('Dossier status is private_package_blockers_partially_resolved');
  } else {
    fail(`Dossier status is ${dossier.status}, expected private_package_blockers_partially_resolved`);
  }

  if (signoff) {
    if (signoff.signoff_status === 'private_review_blocked') {
      pass('T068 signoff remains historically publication-blocked');
    } else {
      fail(`T068 signoff status is ${signoff.signoff_status}, expected private_review_blocked`);
    }
  }

  // Blocker ledger evaluations
  const ledger = dossier.blocker_ledger || [];
  if (ledger.length === 6) {
    pass('Blocker ledger evaluates all 6 T068 blockers');
  } else {
    fail(`Blocker ledger has ${ledger.length} items, expected 6`);
  }

  let resolutionErrors = false;
  for (const b of ledger) {
    if (b.t070_status === 'resolved') {
      if (b.blocker_type !== 'technical_private_package') {
        fail(`Blocker ${b.blocker_id} of non-technical type ${b.blocker_type} is marked resolved!`);
        resolutionErrors = true;
      }
      if (!b.evidence_references || b.evidence_references.length === 0) {
        fail(`Blocker ${b.blocker_id} marked resolved has no evidence references!`);
        resolutionErrors = true;
      }
    } else {
      // Must remain blocked or require human review
      if (b.t070_status !== 'requires_human_publication_review' && b.t070_status !== 'publication_blocked') {
        fail(`Blocker ${b.blocker_id} has invalid non-resolved status ${b.t070_status}`);
        resolutionErrors = true;
      }
    }
  }
  if (!resolutionErrors) {
    pass('Blocker resolution status is compliant: only private technical blocker resolved with evidence, human/legal review remained blocked/pending.');
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
    if (dossier[field] === expected) {
      pass(`${field} = ${expected}`);
    } else {
      fail(`${field} is ${dossier[field]}, expected ${expected}`);
    }
  }

  // ── 7. Safety flags ────────────────────────────────────────────────────────
  const sf = dossier.safety_flags || {};
  const sfChecks = [
    'no_raw_html', 'no_long_third_party_text', 'no_secrets',
    'no_inc_0014_created', 'no_real_promotion_packet', 'no_public_preview',
    'no_public_site_mutation', 'no_publication_approval_granted'
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
  const dossierStr = JSON.stringify(dossier);
  if (/<html|<body|<div|<script/i.test(dossierStr)) {
    fail('Raw HTML detected in dossier record');
  } else {
    pass('No raw HTML in dossier record');
  }
  if (dossierStr.length > 15000) {
    fail('Dossier record exceeds size limit — possible long third-party text');
  } else {
    pass('No excessive text in dossier record');
  }
  if (/SUPABASE_SERVICE_ROLE_KEY|eyJ[A-Za-z0-9+/]{30}/i.test(dossierStr)) {
    fail('Possible secret in dossier record');
  } else {
    pass('No secrets in dossier record');
  }
}

// ── 9. Hosted payload is sanitized and remote_write_attempted=false ──────────
const hostedPayload = readJson(HOSTED_PAYLOAD_PATH);
if (!hostedPayload) {
  fail('atlas-private-publication-blocker-resolution.private-latest.json missing');
} else {
  pass('atlas-private-publication-blocker-resolution.private-latest.json exists');
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
  if (hostedPayload.intended_table === 'atlas_private_publication_blocker_resolutions') {
    pass('Hosted payload intended_table is correct');
  } else {
    fail(`Hosted payload table is ${hostedPayload.intended_table}, expected atlas_private_publication_blocker_resolutions`);
  }

  const recs = hostedPayload.records || [];
  let hostedErrors = false;
  for (const r of recs) {
    if (r.public_publish_allowed !== false) hostedErrors = true;
    if (r.real_promotion_packet_allowed !== false) hostedErrors = true;
    if (r.remote_write_allowed !== false) hostedErrors = true;
  }
  if (!hostedErrors && recs.length > 0) pass('Hosted blocker resolution payload records sanitized');
  else fail('Hosted blocker resolution payload has unsafe permission flags or no records');
}

// ── 10. Console export outside site/ ─────────────────────────────────────────
if (existsFile(CONSOLE_EXPORT_PATH)) {
  pass('Console export exists at tools/review-console/data/private-publication-blocker-resolution.json');
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

// ── 12. No T070 data leaked to site/ ─────────────────────────────────────────
if (existsDir(SITE_T070_DIR)) {
  fail('site/data/reviews/private-publication-blocker-resolutions/ exists — must not leak to site/');
} else {
  pass('No private T070 data leaked inside site/');
}

// ── 13. No real promotion packet or public preview created ──────────────────
if (existsDir(REAL_PKT_DIR)) {
  const realPkts = fs.readdirSync(REAL_PKT_DIR);
  if (realPkts.length === 0) pass('data/promotion-packets/real/ contains no real promotion packets');
}
if (existsDir(PUBLIC_PREVIEW_DIR)) {
  const realPrev = fs.readdirSync(PUBLIC_PREVIEW_DIR);
  if (realPrev.length === 0) pass('data/publication-previews/real/ contains no real public previews');
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
  process.stdout.write('validate-private-publication-blocker-resolution: FAILED — ' + errors + ' error(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-private-publication-blocker-resolution: PASSED\n');
}
