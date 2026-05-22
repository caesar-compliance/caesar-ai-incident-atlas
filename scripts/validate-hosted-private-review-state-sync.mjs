// validate-hosted-private-review-state-sync.mjs (T071)
// Validates hosted private review-state sync readiness schemas, parent references, sanitization, and safety constraints.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

let errors = 0;
let warnings = 0;

function pass(msg) { process.stdout.write('OK:   ' + msg + '\n'); }
function fail(msg) { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }

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

// Paths
const SCHEMA_PATH = path.join(ROOT, 'schemas', 'pipeline', 'hosted-private-review-state-sync.schema.json');
const LATEST_PATH = path.join(ROOT, 'data', 'runtime', 'private-review-state-sync', 'hosted-private-review-state-sync-latest.json');
const MANIFEST_PATH = path.join(ROOT, 'data', 'runtime', 'private-review-state-sync', 'hosted-private-review-state-sync-manifest.json');
const SUPABASE_PAYLOAD_PATH = path.join(ROOT, 'data', 'ops', 'supabase', 'atlas-private-review-state-sync.private-latest.json');
const MIGRATION_PATH = path.join(ROOT, 'infra', 'supabase', 'migrations', '002_private_review_state_sync.sql');
const PAGES_WORKFLOW = path.join(ROOT, '.github', 'workflows', 'pages.yml');

const T070_LATEST = path.join(ROOT, 'data', 'reviews', 'private-publication-blocker-resolutions', 'private-publication-blocker-resolution-latest.json');
const T069_CANDIDATE = path.join(ROOT, 'data', 'reviews', 'private-promotion-packet-candidates', 'private-promotion-packet-candidate-latest.json');
const T068_SIGNOFF = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const T067_DRY_RUN = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-latest.json');
const T066_PACKAGE = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');

const INC_INDEX_PATH = path.join(ROOT, 'data', 'incident-index.json');
const SITE_INC_INDEX_PATH = path.join(ROOT, 'site', 'data', 'incident-index.json');

// ── 1. Schema Validation ─────────────────────────────────────────────────────
if (existsFile(SCHEMA_PATH)) {
  const schema = readJson(SCHEMA_PATH);
  if (schema && schema.$id === 'https://caesar.no/schemas/pipeline/hosted-private-review-state-sync.schema.json') {
    pass('Schema exists and has valid $id');
  } else {
    fail('Schema file invalid or has mismatching $id');
  }
} else {
  fail('Schema file missing');
}

// ── 2. Dossier Latest Validation ─────────────────────────────────────────────
const dossier = readJson(LATEST_PATH);
if (!dossier) {
  fail('hosted-private-review-state-sync-latest.json missing or invalid JSON');
} else {
  pass('hosted-private-review-state-sync-latest.json exists and is valid JSON');

  // Verify ID format
  if (/^HOSTED-PRIVATE-REVIEW-STATE-SYNC-[A-Z0-9-]+-[0-9]{3}$/.test(dossier.sync_id)) {
    pass(`Sync ID format compliant: ${dossier.sync_id}`);
  } else {
    fail(`Invalid Sync ID format: ${dossier.sync_id}`);
  }

  // Parent Reference Checks
  const t070 = readJson(T070_LATEST);
  const t069 = readJson(T069_CANDIDATE);
  const t068 = readJson(T068_SIGNOFF);
  const t067 = readJson(T067_DRY_RUN);
  const t066 = readJson(T066_PACKAGE);

  if (t070 && dossier.blocker_resolution_id === t070.resolution_id) {
    pass(`Linked valid T070 blocker resolution ID: ${t070.resolution_id}`);
  } else {
    fail('T070 blocker resolution reference mismatch or missing');
  }

  if (t069 && dossier.promotion_packet_candidate_id === t069.candidate_packet_id) {
    pass(`Linked valid T069 candidate packet ID: ${t069.candidate_packet_id}`);
  } else {
    fail('T069 candidate packet reference mismatch or missing');
  }

  if (t068 && dossier.signoff_id === t068.signoff_id) {
    pass(`Linked valid T068 signoff ID: ${t068.signoff_id}`);
  } else {
    fail('T068 signoff reference mismatch or missing');
  }

  if (t067 && dossier.dry_run_id === t067.dry_run_id) {
    pass(`Linked valid T067 dry run ID: ${t067.dry_run_id}`);
  } else {
    fail('T067 dry run reference mismatch or missing');
  }

  if (t066 && dossier.package_id === t066.package_id) {
    pass(`Linked valid T066 package ID: ${t066.package_id}`);
  } else {
    fail('T066 package reference mismatch or missing');
  }

  // Safety/Contract Boundary Check
  const boundary = dossier.boundary || {};
  if (boundary.private_runtime_sync_readiness_only === true &&
      boundary.not_remote_write === true &&
      boundary.not_publication_approval === true &&
      boundary.not_real_promotion_packet === true &&
      boundary.not_public_preview === true &&
      boundary.not_public_record_creation === true) {
    pass('Boundary constraints satisfied: dry-run/readiness and private-only');
  } else {
    fail('Boundary constraints violated');
  }

  // Flag Check
  const flags = dossier.flags || {};
  if (flags.remote_write_allowed === false &&
      flags.public_publish_allowed === false &&
      flags.real_promotion_packet_allowed === false &&
      flags.public_preview_allowed === false &&
      flags.public_record_creation_allowed === false &&
      flags.cron_allowed === false &&
      flags.worker_deploy_allowed === false &&
      flags.raw_text_storage_allowed === false &&
      flags.html_storage_allowed === false) {
    pass('All remote/publish/write/deploy/storage flags strictly false');
  } else {
    fail('One or more flags incorrectly allowed true');
  }

  // Safety Flags Check
  const sf = dossier.safety_flags || {};
  if (sf.no_raw_html === true &&
      sf.no_long_third_party_text === true &&
      sf.no_secrets === true &&
      sf.no_inc_0014_created === true &&
      sf.no_real_promotion_packet === true &&
      sf.no_public_preview === true &&
      sf.no_public_site_mutation === true &&
      sf.no_publication_approval_granted === true &&
      sf.no_remote_write_attempted === true) {
    pass('All safety confirmations are true');
  } else {
    fail('One or more safety flags are false or missing');
  }
}

// ── 3. Dossier Manifest Validation ───────────────────────────────────────────
const manifest = readJson(MANIFEST_PATH);
if (!manifest) {
  fail('hosted-private-review-state-sync-manifest.json missing or invalid JSON');
} else {
  pass('hosted-private-review-state-sync-manifest.json exists');
  if (manifest.sync_status === 'hosted_private_sync_readiness_prepared' &&
      manifest.dry_run_mode === true &&
      manifest.remote_write_attempted === false) {
    pass('Manifest correctly shows readiness status and dry_run mode');
  } else {
    fail('Manifest details incorrect');
  }
}

// ── 4. Supabase Sanitized Payload Validation ─────────────────────────────────
const payload = readJson(SUPABASE_PAYLOAD_PATH);
if (!payload) {
  fail('atlas-private-review-state-sync.private-latest.json missing');
} else {
  pass('atlas-private-review-state-sync.private-latest.json exists');
  if (payload.dry_run === 'export_only' &&
      payload.remote_write_attempted === false &&
      payload.intended_table === 'atlas_private_review_state_snapshots') {
    pass('Supabase payload is safely marked dry-run/export_only and references correct table');
  } else {
    fail('Supabase payload safety metadata invalid');
  }

  const records = payload.records || [];
  if (records.length === 1) {
    const rec = records[0];
    if (rec.public_flags.public_publish_allowed === false &&
        rec.public_flags.real_promotion_packet_allowed === false &&
        rec.sync_status === 'hosted_private_sync_readiness_prepared' &&
        rec.publication_blocked === true) {
      pass('Supabase record is correctly sanitized: publication blocked and public flags false');
    } else {
      fail('Supabase record sanitization checks failed');
    }
  } else {
    fail(`Expected exactly 1 Supabase record, found ${records.length}`);
  }
}

// ── 5. Migration DDL Safety Checks ───────────────────────────────────────────
if (existsFile(MIGRATION_PATH)) {
  const sql = fs.readFileSync(MIGRATION_PATH, 'utf8').toLowerCase();
  if (sql.includes('drop table') || sql.includes('drop index') || sql.includes('truncate ')) {
    fail('Migration contains destructive DDL');
  } else {
    pass('Migration contains no destructive DDL');
  }
  if (sql.includes('postgres://') || sql.includes('service_role') || sql.includes('apikey')) {
    fail('Migration contains secrets or server credentials');
  } else {
    pass('Migration contains no secrets or connection details');
  }
} else {
  fail('Migration file not found');
}

// ── 6. Public Dataset Count Safety (exactly 13, latest INC-0013) ──────────────
const incIndex = readJson(INC_INDEX_PATH);
if (incIndex) {
  const incidents = incIndex.incidents || [];
  if (incidents.length === 13) {
    pass('Public incident record count remains exactly 13');
  } else {
    fail(`Public count is ${incidents.length}, expected 13`);
  }
  const latest = incidents[incidents.length - 1];
  if (latest && latest.incident_id === 'INC-0013') {
    pass('Latest public incident remains INC-0013');
  } else {
    fail(`Latest public incident is ${latest ? latest.incident_id : 'none'}, expected INC-0013`);
  }
} else {
  fail('data/incident-index.json missing');
}

const siteIncIndex = readJson(SITE_INC_INDEX_PATH);
if (siteIncIndex) {
  const siteIncidents = siteIncIndex.incidents || [];
  if (siteIncidents.length === 13) {
    pass('Site public incident index count remains exactly 13');
  } else {
    fail(`Site public count is ${siteIncidents.length}, expected 13`);
  }
} else {
  fail('site/data/incident-index.json missing');
}

// ── 7. No Leak under site/ ───────────────────────────────────────────────────
const siteT071Dir = path.join(ROOT, 'site', 'data', 'runtime');
if (existsDir(siteT071Dir)) {
  fail('T071 private sync payload directory leaked under site/');
} else {
  pass('No private runtime payload directory leaked under site/');
}

// ── 7b. Review Console Export Validation ──────────────────────────────────────
const CONSOLE_EXPORT_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-review-state-sync.json');
if (existsFile(CONSOLE_EXPORT_PATH)) {
  const consoleExp = readJson(CONSOLE_EXPORT_PATH);
  if (consoleExp && consoleExp.sync_id && consoleExp.sync_status === 'hosted_private_sync_readiness_prepared') {
    pass('Console export exists and has valid sync status');
  } else {
    fail('Console export exists but is invalid or lacks valid sync status');
  }
  if (CONSOLE_EXPORT_PATH.includes('/site/')) {
    fail('Console export is incorrectly placed inside site/');
  } else {
    pass('Console export outside site/ (correct)');
  }
} else {
  fail('Console export tools/review-console/data/private-review-state-sync.json missing');
}

// ── 8. Pages workflow check ──────────────────────────────────────────────────
if (existsFile(PAGES_WORKFLOW)) {
  const wf = fs.readFileSync(PAGES_WORKFLOW, 'utf8');
  if (wf.includes('path: site') || wf.includes("path: 'site'") || wf.includes('path: "site"')) {
    pass('Pages workflow uploads site/ folder only');
  } else {
    fail('Pages workflow uploads unexpected folder');
  }
}

// ── Final output ─────────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write(`validate-hosted-private-review-state-sync: FAILED — ${errors} error(s)\n`);
  process.exit(1);
} else {
  process.stdout.write('validate-hosted-private-review-state-sync: PASSED\n');
  process.exit(0);
}
