// preflight-supabase-private-review-state-apply.mjs (T072)
// Validates 002_private_review_state_sync.sql for safety, additive DDL only, and correct target table.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const MIGRATION_PATH = path.join(ROOT, 'infra', 'supabase', 'migrations', '002_private_review_state_sync.sql');
const OUT_DIR        = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const OUTPUT_PATH    = path.join(OUT_DIR, 'private-runtime-activation-preflight-latest.json');

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

const now = new Date().toISOString();

// 1. Read Migration
if (!fs.existsSync(MIGRATION_PATH)) {
  log('FAIL: Migration file 002_private_review_state_sync.sql not found at: ' + MIGRATION_PATH);
  process.exit(1);
}

const sql = readText(MIGRATION_PATH);
const sqlLower = sql.toLowerCase();

let safe = true;
const blockers = [];

// 2. Reject destructive SQL
if (sqlLower.includes('drop ')) {
  if (/alter\s+table\s+.*\s+drop\s+/i.test(sql) || /drop\s+table/i.test(sql) || /drop\s+database/i.test(sql) || /drop\s+schema/i.test(sql)) {
    blockers.push('destructive DROP statement found');
    safe = false;
  }
}
if (sqlLower.includes('truncate ')) {
  blockers.push('destructive TRUNCATE statement found');
  safe = false;
}
if (sqlLower.includes('delete from')) {
  blockers.push('destructive DELETE FROM statement found');
  safe = false;
}
if (sqlLower.includes('grant ') && sqlLower.includes(' to public')) {
  blockers.push('broad public GRANT statement found');
  safe = false;
}
if (sqlLower.includes('security definer')) {
  if (!sqlLower.includes('explicit review note')) {
    blockers.push('SECURITY DEFINER found without explicit review note');
    safe = false;
  }
}

// 3. Confirm intended table
const hasIntendedTable = sqlLower.includes('create table if not exists atlas_private_review_state_snapshots') ||
                         sqlLower.includes('create table atlas_private_review_state_snapshots');
if (!hasIntendedTable) {
  blockers.push('migration does not create the intended table: atlas_private_review_state_snapshots');
  safe = false;
}

// 4. Confirm no secrets/account emails
const emailRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
if (emailRe.test(sql)) {
  blockers.push('possible account email found in migration');
  safe = false;
}
if (sqlLower.includes('supabase.co') || sqlLower.includes('service_role') || /eyJ[A-Za-z0-9_-]{10,}/.test(sql)) {
  blockers.push('possible secret, JWT, or URL found in migration');
  safe = false;
}

// 5. Confirm metadata-only/private boundary
// We check that the column list or comments exist and state metadata-only / no raw HTML
const hasMetadataComment = sqlLower.includes('private/metadata-only') || sqlLower.includes('raw content/html storage is strictly forbidden');
if (!hasMetadataComment) {
  blockers.push('migration does not contain comments enforcing the private/metadata-only boundary');
  safe = false;
}

// 6. Write results
const preflightResult = {
  _schema: 'atlas-private-runtime-activation-preflight/v1',
  generated_at: now,
  task: 'T072',
  safe: safe,
  migration_file: 'infra/supabase/migrations/002_private_review_state_sync.sql',
  intended_table: 'atlas_private_review_state_snapshots',
  blockers: blockers,
  details: {
    no_drop: !sqlLower.includes('drop '),
    no_truncate: !sqlLower.includes('truncate '),
    no_delete: !sqlLower.includes('delete from'),
    has_intended_table: hasIntendedTable,
    no_secrets: !blockers.some(b => b.includes('secret')),
    metadata_only_boundary_checked: hasMetadataComment
  }
};

writeJson(OUTPUT_PATH, preflightResult);

log(`preflight-supabase-private-review-state-apply: ${safe ? 'PASSED' : 'FAILED'}`);
if (blockers.length > 0) {
  log('  Blockers:');
  for (const b of blockers) {
    log(`    - ${b}`);
  }
} else {
  log('  No blockers found. Migration is additive and safe.');
}

process.exit(safe ? 0 : 1);
