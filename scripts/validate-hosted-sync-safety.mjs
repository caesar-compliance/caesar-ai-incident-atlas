// validate-hosted-sync-safety.mjs (T057)
// Comprehensive safety check: env, secrets, site/ leakage, cron, CF, automation mode.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

let errors = 0;
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

function existsFile(p) { return fs.existsSync(p) && fs.statSync(p).isFile(); }
function existsDir(p)  { return fs.existsSync(p) && fs.statSync(p).isDirectory(); }

function walkDir(dir, cb) {
  if (!existsDir(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, cb);
    else cb(full);
  }
}

// ── 1. .env not committed ─────────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env');
if (existsFile(envPath)) {
  fail('.env file exists at repo root — must not be committed');
} else {
  pass('no .env file at repo root');
}

// ── 2. .env.example exists with placeholders only ────────────────────────────
const envExamplePath = path.join(ROOT, '.env.example');
if (!existsFile(envExamplePath)) {
  fail('.env.example does not exist');
} else {
  const envEx = readText(envExamplePath);
  pass('.env.example exists');
  // Check no real values assigned (should be KEY= with no value, or KEY=false/dry_run)
  const realValueRe = /^[A-Z_]+=(?!(|false|dry_run|)$).+/m;
  if (realValueRe.test(envEx)) {
    // Allow known safe literals
    const lines = envEx.split('\n').filter(l => !l.startsWith('#') && l.includes('='));
    const dangerousLines = lines.filter(l => {
      const [, val = ''] = l.split('=');
      return val.trim().length > 0 && !['false', 'dry_run'].includes(val.trim());
    });
    if (dangerousLines.length > 0) {
      fail('.env.example contains non-placeholder values: ' + dangerousLines.join('; '));
    } else {
      pass('.env.example contains only safe placeholder/default values');
    }
  } else {
    pass('.env.example contains only placeholder values');
  }
}

// ── 3. .gitignore blocks .env / .env.* ───────────────────────────────────────
const gitignorePath = path.join(ROOT, '.gitignore');
const gitignoreText = readText(gitignorePath) || '';
if (gitignoreText.includes('.env\n') || gitignoreText.includes('.env\r') || /^\.env$/m.test(gitignoreText)) {
  pass('.gitignore blocks .env');
} else {
  fail('.gitignore does not block .env');
}
if (/^\.env\.\*/m.test(gitignoreText) || gitignoreText.includes('.env.*')) {
  pass('.gitignore blocks .env.*');
} else {
  fail('.gitignore does not block .env.*');
}

// ── 4. No SUPABASE_SERVICE_ROLE_KEY value in tracked files ───────────────────
// Check for JWT-like tokens (ey...) or long base64-like strings in key positions
const JWT_PATTERN = /supabase[._-]?service[._-]?role[._-]?key\s*[=:]\s*ey[A-Za-z0-9_.-]{20,}/i;
let keyLeaked = false;
walkDir(ROOT, (file) => {
  if (file.includes('/.git/') || file.includes('/node_modules/')) return;
  const rel = path.relative(ROOT, file);
  if (rel === '.env' || rel === '.env.example') return;
  const text = readText(file);
  if (text && JWT_PATTERN.test(text)) {
    fail('SUPABASE_SERVICE_ROLE_KEY value found in: ' + rel);
    keyLeaked = true;
  }
});
if (!keyLeaked) pass('no SUPABASE_SERVICE_ROLE_KEY value in tracked files');

// ── 5. No JWT-like tokens committed in non-git tracked files ─────────────────
const JWT_BROAD = /eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{10,}/;
let jwtFound = false;
walkDir(ROOT, (file) => {
  if (file.includes('/.git/') || file.includes('/node_modules/')) return;
  const rel = path.relative(ROOT, file);
  if (rel === '.env' || rel === '.env.example') return;
  const text = readText(file);
  if (text && JWT_BROAD.test(text)) {
    fail('JWT-like token found in: ' + rel);
    jwtFound = true;
  }
});
if (!jwtFound) pass('no JWT-like tokens in tracked files');

// ── 6. data/ops/supabase exists and is sanitized ─────────────────────────────
const opsSupabaseDir = path.join(ROOT, 'data', 'ops', 'supabase');
if (!existsDir(opsSupabaseDir)) {
  fail('data/ops/supabase/ does not exist — run export-supabase-bootstrap-payloads.mjs');
} else {
  pass('data/ops/supabase/ exists');
  const manifestPath = path.join(opsSupabaseDir, 'bootstrap-manifest.json');
  const manifest = readJson(manifestPath);
  if (!manifest) {
    fail('bootstrap-manifest.json missing or invalid');
  } else if (manifest.contains_secrets !== false) {
    fail('bootstrap-manifest.json: contains_secrets is not false');
  } else if (manifest.contains_drafts !== false) {
    fail('bootstrap-manifest.json: contains_drafts is not false');
  } else if (manifest.contains_raw_html !== false) {
    fail('bootstrap-manifest.json: contains_raw_html is not false');
  } else {
    pass('bootstrap-manifest.json: no secrets, drafts, or raw HTML declared');
  }
}

// ── 7. site/ does not contain data/ops/supabase ───────────────────────────────
const siteOpsSupabase = path.join(ROOT, 'site', 'data', 'ops', 'supabase');
if (existsDir(siteOpsSupabase)) {
  fail('site/data/ops/supabase/ exists — bootstrap payloads must not be in public site');
} else {
  pass('site/data/ops/supabase/ not present (correct)');
}

// ── 8. site/ does not contain forbidden internal dirs ────────────────────────
const SITE_FORBIDDEN = [
  'candidates', 'drafts', 'promotion-packets', 'promotion-previews',
  'source-verifications', 'review-console', 'admin', 'ops/supabase',
];
const siteDir = path.join(ROOT, 'site');
SITE_FORBIDDEN.forEach(name => {
  const p = path.join(siteDir, name);
  if (existsDir(p)) {
    fail('site/ contains forbidden directory: ' + name);
  }
});
pass('site/ contains no forbidden internal directories');

// ── 9. No INC-0014 in data/ or site/ ─────────────────────────────────────────
let inc0014Found = false;
[path.join(ROOT, 'data'), path.join(ROOT, 'site', 'data')].forEach(dir => {
  walkDir(dir, (file) => {
    if (path.basename(file).includes('INC-0014') ||
        path.basename(file).includes('inc-0014')) {
      fail('INC-0014 found: ' + path.relative(ROOT, file));
      inc0014Found = true;
    }
  });
});
if (!inc0014Found) pass('no INC-0014 in data/ or site/data/');

// ── 10. pages.yml still uploads only site/ ───────────────────────────────────
const pagesYmlPath = path.join(ROOT, '.github', 'workflows', 'pages.yml');
const pagesYml = readText(pagesYmlPath) || '';
if (/path:\s*site/.test(pagesYml)) {
  pass('pages.yml uploads path: site (correct)');
} else {
  fail('pages.yml does not specify path: site — check GitHub Pages config');
}

// ── 11. No GitHub Actions schedule trigger added ─────────────────────────────
if (/schedule\s*:/i.test(pagesYml)) {
  fail('pages.yml contains schedule trigger — not allowed');
} else {
  pass('pages.yml has no schedule trigger');
}

// ── 12. wrangler.toml absent or ignored ──────────────────────────────────────
const wranglerTomlPath = path.join(ROOT, 'infra', 'cloudflare-worker', 'wrangler.toml');
if (existsFile(wranglerTomlPath)) {
  // Check if it's gitignored
  if (gitignoreText.includes('infra/cloudflare-worker/wrangler.toml')) {
    warn('wrangler.toml exists but is gitignored — acceptable, but ensure it is not staged');
  } else {
    fail('infra/cloudflare-worker/wrangler.toml exists and is NOT gitignored — must be ignored or deleted');
  }
} else {
  pass('infra/cloudflare-worker/wrangler.toml absent (correct)');
}

// ── 13. wrangler.example.toml has no real account_id or secret ───────────────
const wranglerExamplePath = path.join(ROOT, 'infra', 'cloudflare-worker', 'wrangler.example.toml');
const wranglerExample = readText(wranglerExamplePath) || '';
if (/account_id\s*=\s*"[0-9a-f]{32}"/i.test(wranglerExample)) {
  fail('wrangler.example.toml contains a real account_id');
} else {
  pass('wrangler.example.toml: no real account_id');
}
if (/api_token\s*=|secret\s*=\s*"[^"]{10,}"/i.test(wranglerExample)) {
  fail('wrangler.example.toml contains a real secret/api_token');
} else {
  pass('wrangler.example.toml: no real secret/api_token');
}

// ── 14. Cloudflare scheduled cron remains commented/disabled ─────────────────
if (/^\s*crons\s*=/m.test(wranglerExample) && !/^#.*crons/m.test(wranglerExample)) {
  fail('wrangler.example.toml: scheduled cron is not commented out');
} else {
  pass('wrangler.example.toml: scheduled cron is commented/disabled');
}

// ── 15. automation_mode is not live_scheduled_enabled ────────────────────────
const opsStatusPath = path.join(ROOT, 'site', 'data', 'ops', 'latest-status.json');
const opsStatus = readJson(opsStatusPath);
if (!opsStatus) {
  warn('site/data/ops/latest-status.json missing — run export-ops-status.mjs');
} else if (opsStatus.automation_mode === 'live_scheduled_enabled') {
  fail('automation_mode is live_scheduled_enabled — not allowed');
} else {
  pass('automation_mode = ' + opsStatus.automation_mode + ' (safe)');
}

// ── 16. Public count = 13 and latest = INC-0013 ──────────────────────────────
if (opsStatus) {
  if (opsStatus.public_record_count !== 13) {
    fail('public_record_count = ' + opsStatus.public_record_count + ', expected 13');
  } else {
    pass('public_record_count = 13');
  }
  if (opsStatus.latest_public_record_id !== 'INC-0013') {
    fail('latest_public_record_id = ' + opsStatus.latest_public_record_id + ', expected INC-0013');
  } else {
    pass('latest_public_record_id = INC-0013');
  }
}

// ── Final result ─────────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-hosted-sync-safety: FAILED — ' + errors + ' error(s), ' + warnings + ' warning(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-hosted-sync-safety: PASSED' + (warnings ? ' with ' + warnings + ' warning(s)' : '') + '\n');
}
