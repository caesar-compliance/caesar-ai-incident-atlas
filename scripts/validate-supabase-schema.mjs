// validate-supabase-schema.mjs (T057)
// Validates infra/supabase/schema.sql for required tables, safety concepts,
// absence of secrets/URLs, and absence of destructive statements.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);
const SCHEMA_PATH = path.join(ROOT, 'infra', 'supabase', 'schema.sql');

let errors = 0;
let warnings = 0;

function pass(msg)  { process.stdout.write('PASS: ' + msg + '\n'); }
function fail(msg)  { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }
function warn(msg)  { process.stdout.write('WARN: ' + msg + '\n'); warnings++; }

// ── Read schema ──────────────────────────────────────────────────────────────
if (!fs.existsSync(SCHEMA_PATH)) {
  fail('infra/supabase/schema.sql not found');
  process.stdout.write('\nvalidate-supabase-schema: FAILED\n');
  process.exit(1);
}

const sql = fs.readFileSync(SCHEMA_PATH, 'utf8');
const sqlLower = sql.toLowerCase();

// ── Required tables ──────────────────────────────────────────────────────────
const REQUIRED_TABLES = [
  'atlas_sources',
  'atlas_watch_runs',
  'atlas_candidates',
  'atlas_drafts',
  'atlas_promotion_packets',
  'atlas_public_records',
  'atlas_digest_runs',
];

REQUIRED_TABLES.forEach(table => {
  if (sqlLower.includes('create table if not exists ' + table) ||
      sqlLower.includes('create table ' + table)) {
    pass('required table: ' + table);
  } else {
    fail('missing required table: ' + table);
  }
});

// ── Safety concepts ──────────────────────────────────────────────────────────

// 1. Risk tier guard (green/yellow/red)
if (sqlLower.includes("'green'") && sqlLower.includes("'yellow'") && sqlLower.includes("'red'")) {
  pass('risk tier guard (green/yellow/red) present');
} else {
  fail('risk tier guard (green/yellow/red) missing in atlas_sources');
}

// 2. incident_id unique in atlas_public_records
if (/atlas_public_records[\s\S]{0,600}incident_id[\s\S]{0,200}unique/i.test(sql)) {
  pass('incident_id has unique constraint in atlas_public_records');
} else {
  fail('incident_id unique constraint missing in atlas_public_records');
}

// 3. candidate_hash uniqueness in atlas_candidates
if (/atlas_candidates[\s\S]{0,800}candidate_hash/i.test(sql) &&
    (/unique\s*\(\s*source_id\s*,\s*candidate_hash\s*\)/i.test(sql) ||
     /candidate_hash[\s\S]{0,100}unique/i.test(sql))) {
  pass('candidate_hash uniqueness constraint present in atlas_candidates');
} else {
  fail('candidate_hash uniqueness constraint missing in atlas_candidates');
}

// 4. Promotion flow controlled through packets → public records (no direct insert shortcut)
if (sqlLower.includes('atlas_promotion_packets') && sqlLower.includes('atlas_public_records')) {
  pass('promotion flow tables exist (packets → public_records)');
} else {
  fail('promotion flow tables missing');
}

// ── No secrets / URLs / credentials ─────────────────────────────────────────
const SECRET_PATTERNS = [
  { re: /supabase\.co/i,           label: 'Supabase URL domain' },
  { re: /postgresql:\/\//i,        label: 'PostgreSQL connection string' },
  { re: /service_role/i,           label: 'service_role key reference' },
  { re: /eyJ[A-Za-z0-9_-]{10,}/,  label: 'JWT-like token' },
  { re: /password\s*=\s*['"][^'"]{4,}/i, label: 'password value' },
  { re: /secret\s*=\s*['"][^'"]{4,}/i,   label: 'secret value' },
];

SECRET_PATTERNS.forEach(({ re, label }) => {
  if (re.test(sql)) {
    fail('secret/credential found in schema.sql: ' + label);
  }
});

if (errors === 0) {
  pass('no secrets/credentials found in schema.sql');
}

// ── No destructive statements ────────────────────────────────────────────────
const DESTRUCTIVE = [
  { re: /^\s*drop\s+table/im,      label: 'DROP TABLE' },
  { re: /^\s*truncate\s/im,        label: 'TRUNCATE' },
  { re: /^\s*delete\s+from/im,     label: 'DELETE FROM (without migration approval)' },
];

DESTRUCTIVE.forEach(({ re, label }) => {
  if (re.test(sql)) {
    fail('destructive statement in schema.sql: ' + label);
  }
});

if (errors === 0) {
  pass('no destructive statements in schema.sql');
}

// ── No scheduled jobs / external network assumptions ─────────────────────────
if (/pg_cron|cron\.schedule|http_request|pg_net/i.test(sql)) {
  fail('schema.sql contains scheduled job or external network extension');
} else {
  pass('no scheduled jobs or external network calls in schema.sql');
}

// ── Final result ─────────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-supabase-schema: FAILED — ' + errors + ' error(s), ' + warnings + ' warning(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-supabase-schema: PASSED' + (warnings ? ' with ' + warnings + ' warning(s)' : '') + '\n');
}
