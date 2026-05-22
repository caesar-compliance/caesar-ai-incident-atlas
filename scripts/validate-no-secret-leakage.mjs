// scripts/validate-no-secret-leakage.mjs
// Scans runtime output files, JSON exports, and staged git diff for secret patterns.
// Never prints matched values — only flags file paths and pattern categories.
// Exit 0 = PASS, Exit 1 = secret pattern detected.
// NOTE: Pattern strings are split to prevent false self-match during scan.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

function log(msg) { process.stdout.write(`[validate-no-secret-leakage] ${msg}\n`); }
function fail(msg) { process.stderr.write(`FAIL: ${msg}\n`); }

// Known patterns that indicate an actual secret value leaking into output files or staged diffs.
// Patterns are written to detect value shapes, NOT to print or reconstruct values.
// NOTE: Patterns here are intentionally narrow — they match secret VALUES, not key names.
const SECRET_PATTERNS = [
  { label: 'supabase_secret_key',    re: /sb_secret_[A-Za-z0-9_-]{10,}/ },
  { label: 'supabase_publishable_key', re: /sb_publishable_[A-Za-z0-9_-]{10,}/ },
  { label: 'legacy_jwt_token',       re: /eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{20,}/ },
  { label: 'pg_connection_string',   re: /postgresql:\/\/[^@\s]{3,}:[^@\s]{8,}@/ },
  { label: 'db_password_in_url',     re: /postgres(?:ql)?:\/\/[^@\s]+:[^@\s]{6,}@/ },
];

// Directories to scan (runtime outputs only — not source code)
const SCAN_DIRS = [
  'data/runtime',
  'data/ops',
  'reports/runtime',
  'reports',
  'tools/review-console/data',
  'work-items',
];

// Extensions to scan
const SCAN_EXTS = new Set(['.json', '.md', '.txt', '.log', '.yaml', '.yml']);

function scanFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SCAN_EXTS.has(ext)) return [];
  let content;
  try { content = fs.readFileSync(filePath, 'utf8'); } catch { return []; }
  const hits = [];
  for (const { label, re } of SECRET_PATTERNS) {
    if (re.test(content)) hits.push(label);
  }
  return hits;
}

function scanDir(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const results = [];
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const fp = path.join(d, entry.name);
      if (entry.isDirectory()) { walk(fp); continue; }
      const hits = scanFile(fp);
      if (hits.length > 0) {
        results.push({ file: path.relative(ROOT, fp), patterns: hits });
      }
    }
  }
  walk(abs);
  return results;
}

// Also scan the staged git diff
function scanStagedDiff() {
  let diff = '';
  try { diff = execSync('git diff --cached', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' }); } catch { return []; }
  const hits = [];
  for (const { label, re } of SECRET_PATTERNS) {
    if (re.test(diff)) hits.push(label);
  }
  return hits.length > 0 ? [{ file: 'git-staged-diff', patterns: hits }] : [];
}

// Scan for inline secret commands in tracked script files (shell history artifacts)
function scanScriptFiles() {
  // Patterns split across strings to avoid self-match when validator is scanned
  const p1 = 'SUPABASE_SERVICE_ROLE_KEY=sb_secret_';
  const p2 = 'SUPABASE_DB_' + 'PASSWORD=';
  const p3 = 'postgresql://';
  const SCRIPT_SECRET_PATTERNS = [
    { label: 'inline_env_assignment_in_script', re: new RegExp(p1 + '[A-Za-z0-9_-]{6,}') },
    { label: 'inline_db_password_in_script',    re: new RegExp(p2 + '\\S{6,}') },
    { label: 'inline_pg_url_with_password',     re: new RegExp(p3 + '[^@\\s]{3,}:[^@\\s]{8,}@') },
  ];
  const scriptsDir = path.join(ROOT, 'scripts');
  const results = [];
  if (!fs.existsSync(scriptsDir)) return results;
  for (const f of fs.readdirSync(scriptsDir)) {
    if (!f.endsWith('.mjs') && !f.endsWith('.js') && !f.endsWith('.sh')) continue;
    // Do not scan this file itself (would match own pattern strings)
    if (f === 'validate-no-secret-leakage.mjs') continue;
    const fp = path.join(scriptsDir, f);
    let content;
    try { content = fs.readFileSync(fp, 'utf8'); } catch { continue; }
    const hits = [];
    for (const { label, re } of SCRIPT_SECRET_PATTERNS) {
      if (re.test(content)) hits.push(label);
    }
    if (hits.length > 0) results.push({ file: path.relative(ROOT, fp), patterns: hits });
  }
  return results;
}

let leaked = false;
const allLeaks = [];

for (const dir of SCAN_DIRS) {
  const leaks = scanDir(dir);
  allLeaks.push(...leaks);
}

const stagedLeaks = scanStagedDiff();
allLeaks.push(...stagedLeaks);

const scriptLeaks = scanScriptFiles();
allLeaks.push(...scriptLeaks);

if (allLeaks.length > 0) {
  for (const { file, patterns } of allLeaks) {
    fail(`Secret pattern(s) detected in: ${file} — categories: ${patterns.join(', ')}`);
  }
  leaked = true;
}

if (!leaked) {
  log('PASS: No secret patterns detected in output files, staged diff, or scripts.');
  process.exit(0);
} else {
  fail(`Secret leakage detected in ${allLeaks.length} location(s). Review files listed above. Do not commit until resolved.`);
  process.exit(1);
}
