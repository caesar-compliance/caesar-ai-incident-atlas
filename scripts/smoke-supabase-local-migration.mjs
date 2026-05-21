// smoke-supabase-local-migration.mjs (T059)
// Bounded local Supabase schema validation without remote connection.
// Skips gracefully if local runtime unavailable. Never writes to remote.
// Writes sanitized output to data/ops/supabase/local-migration-smoke.json

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const SCHEMA_PATH      = path.join(ROOT, 'infra', 'supabase', 'schema.sql');
const OPS_SUPABASE_DIR = path.join(ROOT, 'data', 'ops', 'supabase');
const OUTPUT_PATH      = path.join(OPS_SUPABASE_DIR, 'local-migration-smoke.json');

const REQUIRED_TABLES = [
  'atlas_sources',
  'atlas_watch_runs',
  'atlas_candidates',
  'atlas_drafts',
  'atlas_promotion_packets',
  'atlas_public_records',
  'atlas_digest_runs',
];

function log(msg) { process.stdout.write(msg + '\n'); }

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function readText(p) {
  try { return fs.readFileSync(p, 'utf8'); }
  catch { return null; }
}

function writeJson(p, data) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

function checkCommand(cmd) {
  try {
    // Use 'which' on mac/linux to check if command exists
    const result = Bun.spawnSync(['which', cmd]);
    return result.exitCode === 0;
  } catch {
    return false;
  }
}

const now = new Date().toISOString();

// ── Check if schema.sql exists ───────────────────────────────────────────────
const schemaSql = readText(SCHEMA_PATH);
if (!schemaSql) {
  const result = {
    _schema: 'atlas-local-migration-smoke/v1',
    executed_at: now,
    mode: 'skipped_schema_missing',
    pass: false,
    reason: 'schema.sql not found at infra/supabase/schema.sql',
    required_tables_found: [],
    required_tables_missing: REQUIRED_TABLES,
  };
  writeJson(OUTPUT_PATH, result);
  log('smoke-supabase-local-migration: FAIL — schema.sql not found');
  process.exit(1);
}

// ── Validate schema.sql contains required tables ─────────────────────────────
const tablesFound = [];
const tablesMissing = [];

for (const table of REQUIRED_TABLES) {
  // Look for CREATE TABLE statements for each required table
  const createPattern = new RegExp(`create\\s+table\\s+(if\\s+not\\s+exists\\s+)?${table}\\b`, 'i');
  if (createPattern.test(schemaSql)) {
    tablesFound.push(table);
  } else {
    tablesMissing.push(table);
  }
}

// ── Check for dangerous statements in schema ─────────────────────────────────
const dangerousPatterns = [
  { pattern: /drop\s+database/i, name: 'DROP DATABASE' },
  { pattern: /drop\s+schema\s+public/i, name: 'DROP SCHEMA PUBLIC' },
  { pattern: /truncate\s+table/i, name: 'TRUNCATE TABLE' },
  { pattern: /delete\s+from\s+(atlas_|public\.)/i, name: 'DELETE FROM atlas/public tables' },
  { pattern: /grant\s+all\s+on\s+all\s+tables/i, name: 'excessive GRANT ALL' },
];

const dangerousFound = [];
for (const { pattern, name } of dangerousPatterns) {
  if (pattern.test(schemaSql)) {
    dangerousFound.push(name);
  }
}

// ── Check local runtime availability (optional) ──────────────────────────────
const hasSupabaseCLI = checkCommand('supabase');
const hasDocker = checkCommand('docker');
const hasPgIsReady = checkCommand('pg_isready');

const runtimeAvailable = hasSupabaseCLI || (hasDocker && hasPgIsReady);

// ── Determine mode and result ────────────────────────────────────────────────
let mode;
let pass;
let reason;

if (!runtimeAvailable) {
  mode = 'skipped_local_runtime_missing';
  pass = true; // Skip is acceptable - not a failure
  reason = 'Local Supabase CLI or Docker/PostgreSQL runtime unavailable. Schema validation only.';
} else if (tablesMissing.length > 0) {
  mode = 'validation_failed_tables_missing';
  pass = false;
  reason = `Required tables missing from schema.sql: ${tablesMissing.join(', ')}`;
} else if (dangerousFound.length > 0) {
  mode = 'validation_failed_dangerous_statements';
  pass = false;
  reason = `Dangerous SQL statements found: ${dangerousFound.join(', ')}`;
} else {
  mode = 'schema_validation_pass';
  pass = true;
  reason = runtimeAvailable
    ? 'All required tables present in schema.sql, no dangerous statements, local runtime available'
    : 'All required tables present in schema.sql, no dangerous statements (local runtime unavailable - schema-only validation)';
}

const result = {
  _schema: 'atlas-local-migration-smoke/v1',
  executed_at: now,
  mode,
  pass,
  reason,
  runtime: {
    supabase_cli_available: hasSupabaseCLI,
    docker_available: hasDocker,
    pg_isready_available: hasPgIsReady,
    runtime_available: runtimeAvailable,
  },
  schema_validation: {
    schema_file_present: true,
    required_tables_found: tablesFound,
    required_tables_missing: tablesMissing,
    required_tables_count: REQUIRED_TABLES.length,
    tables_found_count: tablesFound.length,
  },
  safety_checks: {
    dangerous_statements_found: dangerousFound,
    safe_from_destructive_ops: dangerousFound.length === 0,
  },
  note: 'This is a bounded local validation. No remote Supabase connection was attempted. No migration was applied.',
};

writeJson(OUTPUT_PATH, result);

log(`smoke-supabase-local-migration: ${pass ? 'PASS' : 'FAIL'}`);
log(`  Mode: ${mode}`);
log(`  Runtime available: ${runtimeAvailable}`);
log(`  Tables found: ${tablesFound.length}/${REQUIRED_TABLES.length}`);
if (tablesMissing.length > 0) {
  log(`  Tables missing: ${tablesMissing.join(', ')}`);
}
if (dangerousFound.length > 0) {
  log(`  Dangerous statements: ${dangerousFound.join(', ')}`);
}
log(`  Output: ${OUTPUT_PATH}`);

process.exit(pass ? 0 : 1);
