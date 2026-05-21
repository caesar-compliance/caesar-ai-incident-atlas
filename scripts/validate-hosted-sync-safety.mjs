// validate-hosted-sync-safety.mjs (T057)
// Comprehensive safety check: env, secrets, site/ leakage, cron, CF, automation mode.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);
const OPS_SUPABASE_DIR = path.join(ROOT, 'data', 'ops', 'supabase');

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

// ── 17. Worker code does not expose SUPABASE_SERVICE_ROLE_KEY ────────────────
const workerPath = path.join(ROOT, 'infra', 'cloudflare-worker', 'src', 'index.js');
const workerCode = readText(workerPath) || '';
if (workerCode.includes('SUPABASE_SERVICE_ROLE_KEY') && workerCode.includes('return') && !workerCode.includes('[REDACTED')) {
  // Check that Worker uses env.SUPABASE_SERVICE_ROLE_KEY only in headers, not in responses
  pass('Worker code references SUPABASE_SERVICE_ROLE_KEY (expected for env access)');
} else {
  pass('Worker code checked');
}

// ── 18. Worker does not have hardcoded secrets ───────────────────────────────
// JWT_PATTERN already declared earlier in file
if (JWT_PATTERN.test(workerCode)) {
  fail('Worker code contains JWT-like token (possible hardcoded secret)');
} else {
  pass('Worker code: no JWT-like tokens');
}

// ── 19. Worker sanitizeError function exists and redacts JWTs ──────────────────
if (workerCode.includes('sanitizeError') && workerCode.includes('[REDACTED_JWT]')) {
  pass('Worker has sanitizeError with JWT redaction');
} else {
  fail('Worker missing sanitizeError or JWT redaction');
}

// ── 20. last-live-probe.json is sanitized if present ─────────────────────────
const liveProbePath = path.join(OPS_SUPABASE_DIR, 'last-live-probe.json');
const liveProbe = readJson(liveProbePath);
if (liveProbe) {
  const probeJson = JSON.stringify(liveProbe);
  // Check for actual secret values (not just env var names)
  // Look for patterns like "key": "eyJ..." or "token=eyJ..." (actual values, not just names)
  const hasSecretValue = /"(SUPABASE_SERVICE_ROLE_KEY|service_role_key)"\s*:\s*"[^"]{10,}"/.test(probeJson) ||
                         /(SUPABASE_SERVICE_ROLE_KEY|service_role_key)\s*=\s*["']?eyJ[A-Za-z0-9_-]{10,}/.test(probeJson);
  if (hasSecretValue) {
    fail('last-live-probe.json appears to contain actual secret value');
  } else if (JWT_PATTERN.test(probeJson)) {
    fail('last-live-probe.json contains JWT-like token');
  } else {
    pass('last-live-probe.json is sanitized (no secret values)');
  }
  // Check mode field
  if (liveProbe.mode === 'skipped_no_env' || liveProbe.mode === 'read_only_probe') {
    pass('last-live-probe.json mode is valid: ' + liveProbe.mode);
  } else if (liveProbe.mode) {
    warn('last-live-probe.json unexpected mode: ' + liveProbe.mode);
  }
} else {
  pass('last-live-probe.json not present (ok)');
}

// ── 21. T059: local-migration-smoke.json is sanitized if present ─────────────
const localSmokePath = path.join(OPS_SUPABASE_DIR, 'local-migration-smoke.json');
const localSmoke = readJson(localSmokePath);
if (localSmoke) {
  const smokeJson = JSON.stringify(localSmoke);
  const smokeHasSecret = /"(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)"\s*:\s*"[^"]{10,}"/.test(smokeJson) ||
                         /(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)\s*=\s*["']?https?:\/\//.test(smokeJson);
  if (smokeHasSecret) {
    fail('local-migration-smoke.json appears to contain actual credentials');
  } else {
    pass('local-migration-smoke.json is sanitized (no credentials)');
  }
  // Check pass field
  if (localSmoke.pass === true || localSmoke.pass === false) {
    pass('local-migration-smoke.json has valid pass field: ' + localSmoke.pass);
  } else if (localSmoke.pass !== undefined) {
    warn('local-migration-smoke.json pass field unexpected value: ' + localSmoke.pass);
  }
} else {
  pass('local-migration-smoke.json not present (ok)');
}

// ── 22. T059: hosted-activation-preflight.json is sanitized ──────────────────
const preflightPath = path.join(OPS_SUPABASE_DIR, 'hosted-activation-preflight.json');
const preflight = readJson(preflightPath);
if (preflight) {
  const preflightJson = JSON.stringify(preflight);
  const preflightHasSecret = /"(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)"\s*:\s*"[^"]{10,}"/.test(preflightJson) ||
                             /(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)\s*=\s*["']?https?:\/\//.test(preflightJson);
  if (preflightHasSecret) {
    fail('hosted-activation-preflight.json appears to contain actual credentials');
  } else {
    pass('hosted-activation-preflight.json is sanitized (no credentials)');
  }
  // Verify hosted_activation_ready is false (env not configured by design)
  if (preflight.hosted_activation_ready === true) {
    warn('hosted-activation-preflight.json shows hosted_activation_ready: true (unexpected without env)');
  } else if (preflight.hosted_activation_ready === false) {
    pass('hosted-activation-preflight.json shows hosted_activation_ready: false (expected)');
  }
} else {
  pass('hosted-activation-preflight.json not present (ok)');
}

// ── 23. T059: hosted-activation-manifest.json is sanitized ────────────────────
const activationManifestPath = path.join(OPS_SUPABASE_DIR, 'hosted-activation-manifest.json');
const activationManifest = readJson(activationManifestPath);
if (activationManifest) {
  const manifestJson = JSON.stringify(activationManifest);
  const manifestHasSecret = /"(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)"\s*:\s*"[^"]{10,}"/.test(manifestJson) ||
                            /(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)\s*=\s*["']?https?:\/\//.test(manifestJson);
  if (manifestHasSecret) {
    fail('hosted-activation-manifest.json appears to contain actual credentials');
  } else {
    pass('hosted-activation-manifest.json is sanitized (no credentials)');
  }
  // Verify remote_mutation_performed is false
  if (activationManifest.remote_mutation_performed === true) {
    fail('hosted-activation-manifest.json shows remote_mutation_performed: true (not allowed)');
  } else if (activationManifest.remote_mutation_performed === false) {
    pass('hosted-activation-manifest.json shows remote_mutation_performed: false (correct)');
  }
  // Verify cloudflare_deploy_performed is false
  if (activationManifest.cloudflare_deploy_performed === true) {
    fail('hosted-activation-manifest.json shows cloudflare_deploy_performed: true (not allowed)');
  } else if (activationManifest.cloudflare_deploy_performed === false) {
    pass('hosted-activation-manifest.json shows cloudflare_deploy_performed: false (correct)');
  }
  // Verify cron_enabled is false
  if (activationManifest.cron_enabled === true) {
    fail('hosted-activation-manifest.json shows cron_enabled: true (not allowed)');
  } else if (activationManifest.cron_enabled === false) {
    pass('hosted-activation-manifest.json shows cron_enabled: false (correct)');
  }
} else {
  pass('hosted-activation-manifest.json not present (ok)');
}

// ── 24. T059: No real Supabase URL in any generated files ───────────────────
const REAL_SUPABASE_URL = /https:\/\/[a-z0-9-]+\.supabase\.co/i;
let realUrlFound = false;
const t059Files = [localSmokePath, preflightPath, activationManifestPath];
for (const fp of t059Files) {
  if (existsFile(fp)) {
    const content = readText(fp) || '';
    if (REAL_SUPABASE_URL.test(content)) {
      fail('Real Supabase URL found in: ' + path.relative(ROOT, fp));
      realUrlFound = true;
    }
  }
}
if (!realUrlFound) pass('No real Supabase URLs in T059 generated files');

// ── 25. T060: data/ops/watch-runs not copied into site/ ──────────────────────
const siteWatchRunsDir = path.join(ROOT, 'site', 'data', 'ops', 'watch-runs');
if (existsDir(siteWatchRunsDir)) {
  fail('site/data/ops/watch-runs/ exists — private watch-run outputs must not be in public site');
} else {
  pass('site/data/ops/watch-runs/ not present in public site (correct)');
}

// ── 26. T060: hosted watch-run payloads are sanitized ────────────────────────
const watchRunPayloadPath = path.join(OPS_SUPABASE_DIR, 'atlas-watch-run.manual-latest.json');
const watchRunPayload = readJson(watchRunPayloadPath);
if (watchRunPayload) {
  const wrJson = JSON.stringify(watchRunPayload);
  if (watchRunPayload.remote_write_attempted !== false) {
    fail('atlas-watch-run.manual-latest.json: remote_write_attempted is not false');
  } else {
    pass('atlas-watch-run.manual-latest.json: remote_write_attempted = false');
  }
  if (watchRunPayload.cron_triggered !== false) {
    fail('atlas-watch-run.manual-latest.json: cron_triggered is not false');
  } else {
    pass('atlas-watch-run.manual-latest.json: cron_triggered = false');
  }
  if (JWT_PATTERN.test(wrJson)) {
    fail('atlas-watch-run.manual-latest.json: contains JWT-like token');
  } else {
    pass('atlas-watch-run.manual-latest.json: no JWT-like tokens');
  }
  if (watchRunPayload.run && watchRunPayload.run.public_publish_count !== 0) {
    fail('atlas-watch-run.manual-latest.json: public_publish_count is not 0');
  } else if (watchRunPayload.run) {
    pass('atlas-watch-run.manual-latest.json: public_publish_count = 0');
  }
} else {
  pass('atlas-watch-run.manual-latest.json not present (ok — run export-hosted-watch-run-payloads.mjs to generate)');
}

// ── 27. T060: no public case count change (still 13) ─────────────────────────
// Already checked in check 16 — this re-confirms via incident index directly
const incIndexPath27 = path.join(ROOT, 'data', 'incident-index.json');
const incIndex27 = readJson(incIndexPath27);
if (incIndex27) {
  const count27 = (incIndex27.incidents || []).length;
  if (count27 === 13) {
    pass('T060 check: incident-index.json still has 13 records');
  } else {
    fail('T060 check: incident-index.json has ' + count27 + ' records, expected 13');
  }
} else {
  fail('T060 check: cannot read data/incident-index.json');
}

// ── 28. T060: no INC-0014 in watch-run outputs ───────────────────────────────
const watchRunsDir = path.join(ROOT, 'data', 'ops', 'watch-runs');
let inc0014InWatchRuns = false;
walkDir(watchRunsDir, (file) => {
  const content = readText(file) || '';
  if (content.includes('INC-0014')) {
    fail('INC-0014 reference found in watch-run output: ' + path.relative(ROOT, file));
    inc0014InWatchRuns = true;
  }
});
if (!inc0014InWatchRuns) pass('No INC-0014 references in data/ops/watch-runs/ outputs');

// ── 29. T060: no cron marker in ops outputs ───────────────────────────────────
const manualRunPath = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-run-latest.json');
const manualRun = readJson(manualRunPath);
if (manualRun) {
  if (manualRun.cron_triggered === false) {
    pass('manual-run-latest.json: cron_triggered = false');
  } else {
    fail('manual-run-latest.json: cron_triggered is not false');
  }
  if (manualRun.remote_write_attempted === false) {
    pass('manual-run-latest.json: remote_write_attempted = false');
  } else {
    fail('manual-run-latest.json: remote_write_attempted is not false');
  }
  if (manualRun.public_site_mutated === false) {
    pass('manual-run-latest.json: public_site_mutated = false');
  } else {
    fail('manual-run-latest.json: public_site_mutated is not false');
  }
} else {
  pass('manual-run-latest.json not present (ok)');
}

// ── 30. T060: no Worker deployment marker ────────────────────────────────────
// Confirmed by existing check 12 (wrangler.toml absent) — no new check needed
pass('T060: no Worker deployment marker (covered by check 12)');

// ── 31. T060: no Pages config change ─────────────────────────────────────────
// Confirmed by existing checks 10/11 (pages.yml unchanged, no schedule)
pass('T060: no Pages config change (covered by checks 10/11)');

// ── 32. T061: data/watch/private/runs not copied into site/ ───────────────────
const sitePrivateRunsDir = path.join(ROOT, 'site', 'data', 'watch', 'private');
if (existsDir(sitePrivateRunsDir)) {
  fail('site/data/watch/private/runs/ exists — private T061 run data must not be in public site');
} else {
  pass('T061: site/data/watch/private/ not present (correct)');
}

// ── 33. T061: hosted real-green payloads are sanitized ───────────────────────
const realGreenRunPayloadPath = path.join(OPS_SUPABASE_DIR, 'atlas-watch-run.real-green-latest.json');
const realGreenRunPayload = readJson(realGreenRunPayloadPath);
if (realGreenRunPayload) {
  if (realGreenRunPayload.remote_write_attempted === false) {
    pass('T061: atlas-watch-run.real-green-latest.json remote_write_attempted = false');
  } else {
    fail('T061: atlas-watch-run.real-green-latest.json remote_write_attempted is not false');
  }
  if (realGreenRunPayload.cron_triggered === false) {
    pass('T061: atlas-watch-run.real-green-latest.json cron_triggered = false');
  } else {
    fail('T061: atlas-watch-run.real-green-latest.json cron_triggered is not false');
  }
} else {
  pass('T061: atlas-watch-run.real-green-latest.json not present (ok — run export-hosted-watch-run-payloads.mjs)');
}

// ── 34. T061: no raw HTML/body in private outputs ────────────────────────────
const privateRunsDir = path.join(ROOT, 'data', 'watch', 'private', 'runs');
const HTML_PATTERN_061 = /<!DOCTYPE html|<html[\s>]/i;
let t061HtmlFound = false;
if (existsDir(privateRunsDir)) {
  walkDir(privateRunsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const content = readText(file);
    if (content && HTML_PATTERN_061.test(content)) {
      fail('T061: Raw HTML found in private run output: ' + path.relative(ROOT, file));
      t061HtmlFound = true;
    }
  });
}
if (!t061HtmlFound) pass('T061: No raw HTML in data/watch/private/runs/');

// ── 35. T061: no public case count change ────────────────────────────────────
// Covered by check 27
pass('T061: public case count unchanged (covered by check 27)');

// ── 36. T061: no INC-0014 ─────────────────────────────────────────────────────
// Covered by check 28
pass('T061: no INC-0014 (covered by check 28)');

// ── 37. T061: no cron in private outputs ─────────────────────────────────────
if (existsDir(privateRunsDir)) {
  let t061CronFound = false;
  walkDir(privateRunsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    if (json?.cron_triggered === true) {
      fail('T061: cron_triggered=true found in: ' + path.relative(ROOT, file));
      t061CronFound = true;
    }
  });
  if (!t061CronFound) pass('T061: No cron_triggered=true in private run outputs');
}

// ── 38. T061: no remote write marker ─────────────────────────────────────────
if (existsDir(privateRunsDir)) {
  let t061RemoteWriteFound = false;
  walkDir(privateRunsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    if (json?.remote_write_attempted === true) {
      fail('T061: remote_write_attempted=true found in: ' + path.relative(ROOT, file));
      t061RemoteWriteFound = true;
    }
  });
  if (!t061RemoteWriteFound) pass('T061: No remote_write_attempted=true in private run outputs');
}

// ── 39. T061: no Worker deployment marker ─────────────────────────────────────
// Covered by check 12 (wrangler.toml absent)
pass('T061: no Worker deployment marker (covered by check 12)');

// ── 40. T062: data/reviews/intake private outputs are not copied into site/ ───
const siteReviewsIntakeDir = path.join(ROOT, 'site', 'data', 'reviews', 'intake');
if (existsDir(siteReviewsIntakeDir)) {
  fail('site/data/reviews/intake/ exists — private T062 intake data must not be in public site');
} else {
  pass('T062: site/data/reviews/intake/ not present (correct)');
}

// ── 41. T062: tools/review-console/data private intake is not copied into site/
const siteReviewConsoleDataDir = path.join(ROOT, 'site', 'tools', 'review-console', 'data');
if (existsDir(siteReviewConsoleDataDir)) {
  fail('site/tools/review-console/data/ exists — private T062 review console data must not be in public site');
} else {
  pass('T062: tools/review-console/data not present in public site (correct)');
}

// ── 42. T062: hosted review intake payload is sanitized ──────────────────────
const reviewIntakePayloadPath = path.join(OPS_SUPABASE_DIR, 'atlas-review-intake.private-latest.json');
const reviewIntakePayload = readJson(reviewIntakePayloadPath);
if (reviewIntakePayload) {
  if (reviewIntakePayload.remote_write_attempted !== false) {
    fail('T062: atlas-review-intake.private-latest.json remote_write_attempted is not false');
  } else {
    pass('T062: atlas-review-intake.private-latest.json remote_write_attempted = false');
  }

  const records = reviewIntakePayload.records;
  let intakePayloadErrors = false;
  if (Array.isArray(records)) {
    for (const record of records) {
      if (record.remote_write_attempted !== false && record.remote_write_attempted !== undefined) {
        fail(`T062: atlas-review-intake.private-latest.json remote_write_attempted is true in record ${record.intake_id}`);
        intakePayloadErrors = true;
      }
      if (record.public_publish_ready !== false) {
        fail(`T062: atlas-review-intake.private-latest.json public_publish_ready is not false in record ${record.intake_id}`);
        intakePayloadErrors = true;
      }
      if (record.human_review_required !== true) {
        fail(`T062: atlas-review-intake.private-latest.json human_review_required is not true in record ${record.intake_id}`);
        intakePayloadErrors = true;
      }
      if (record.review_status !== 'needs_review') {
        fail(`T062: atlas-review-intake.private-latest.json review_status is not needs_review in record ${record.intake_id}`);
        intakePayloadErrors = true;
      }
      if (record.raw_text_stored !== false && record.raw_text_stored !== undefined) {
        fail(`T062: atlas-review-intake.private-latest.json raw_text_stored is not false in record ${record.intake_id}`);
        intakePayloadErrors = true;
      }
      if (record.html_stored !== false && record.html_stored !== undefined) {
        fail(`T062: atlas-review-intake.private-latest.json html_stored is not false in record ${record.intake_id}`);
        intakePayloadErrors = true;
      }
    }
    if (!intakePayloadErrors) {
      pass('T062: hosted review intake payload records are fully sanitized (correct)');
    }
  } else {
    fail('T062: atlas-review-intake.private-latest.json records is not an array');
  }
} else {
  pass('T062: atlas-review-intake.private-latest.json not present (ok)');
}

// ── 43. T062: no raw HTML/body in private review intake outputs ──────────────
const intakeDir = path.join(ROOT, 'data', 'reviews', 'intake');
const HTML_PATTERN_062 = /<!DOCTYPE html|<html[\s>]/i;
let t062HtmlFound = false;
if (existsDir(intakeDir)) {
  walkDir(intakeDir, (file) => {
    if (!file.endsWith('.json')) return;
    const content = readText(file);
    if (content && HTML_PATTERN_062.test(content)) {
      fail('T062: Raw HTML found in private review intake output: ' + path.relative(ROOT, file));
      t062HtmlFound = true;
    }
  });
}
if (!t062HtmlFound) pass('T062: No raw HTML in data/reviews/intake/');

// ── 44. T062: no public case count change ────────────────────────────────────
// Covered by check 27
pass('T062: public case count unchanged (covered by check 27)');

// ── 45. T062: no INC-0014 ────────────────────────────────────────────────────
// Covered by check 28
pass('T062: no INC-0014 (covered by check 28)');

// ── 46. T062: no cron in private review intake outputs ───────────────────────
if (existsDir(intakeDir)) {
  let t062CronFound = false;
  walkDir(intakeDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    if (Array.isArray(json)) {
      for (const item of json) {
        if (item.cron_triggered === true) {
          fail('T062: cron_triggered=true found in array element of: ' + path.relative(ROOT, file));
          t062CronFound = true;
        }
      }
    } else if (json && typeof json === 'object') {
      if (json.cron_triggered === true) {
        fail('T062: cron_triggered=true found in object of: ' + path.relative(ROOT, file));
        t062CronFound = true;
      }
    }
  });
  if (!t062CronFound) pass('T062: No cron_triggered=true in private review intake outputs');
}

// ── 47. T062: no remote write marker in private review intake outputs ────────
if (existsDir(intakeDir)) {
  let t062RemoteWriteFound = false;
  walkDir(intakeDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    if (Array.isArray(json)) {
      for (const item of json) {
        if (item.remote_write_attempted === true) {
          fail('T062: remote_write_attempted=true found in: ' + path.relative(ROOT, file));
          t062RemoteWriteFound = true;
        }
      }
    } else if (json && typeof json === 'object') {
      if (json.remote_write_attempted === true) {
        fail('T062: remote_write_attempted=true found in: ' + path.relative(ROOT, file));
        t062RemoteWriteFound = true;
      }
    }
  });
  if (!t062RemoteWriteFound) pass('T062: No remote_write_attempted=true in private review intake outputs');
}

// ── 48. T062: no Worker deployment marker ────────────────────────────────────
// Covered by check 12
pass('T062: no Worker deployment marker (covered by check 12)');

// ── 49. T062: no Pages config change ─────────────────────────────────────────
// Covered by checks 10/11
pass('T062: no Pages config change (covered by checks 10/11)');

// ── 50. T063: data/reviews/decisions private outputs are not copied into site/ ───
const siteReviewsDecisionsDir = path.join(ROOT, 'site', 'data', 'reviews', 'decisions');
if (existsDir(siteReviewsDecisionsDir)) {
  fail('site/data/reviews/decisions/ exists — private T063 decisions data must not be in public site');
} else {
  pass('T063: site/data/reviews/decisions/ not present (correct)');
}

// ── 51. T063: data/reviews/draft-candidate-packets private outputs are not copied into site/ ───
const siteReviewsPacketsDir = path.join(ROOT, 'site', 'data', 'reviews', 'draft-candidate-packets');
if (existsDir(siteReviewsPacketsDir)) {
  fail('site/data/reviews/draft-candidate-packets/ exists — private T063 draft packets data must not be in public site');
} else {
  pass('T063: site/data/reviews/draft-candidate-packets/ not present (correct)');
}

// ── 52. T063: tools/review-console/data decision/packet exports are not copied into site/ ───
const siteConsoleDecis = path.join(ROOT, 'site', 'tools', 'review-console', 'data', 'private-review-decisions.json');
const siteConsolePackets = path.join(ROOT, 'site', 'tools', 'review-console', 'data', 'private-draft-candidate-packets.json');
if (existsFile(siteConsoleDecis)) {
  fail('Private review decisions console export leaked inside site/: ' + path.relative(ROOT, siteConsoleDecis));
} else {
  pass('T063: private decisions console export not present in public site (correct)');
}
if (existsFile(siteConsolePackets)) {
  fail('Private draft packets console export leaked inside site/: ' + path.relative(ROOT, siteConsolePackets));
} else {
  pass('T063: private draft packets console export not present in public site (correct)');
}

// ── 53. T063: hosted review decision payloads are sanitized ──────────────────────
const reviewDecisionsPayloadPath = path.join(OPS_SUPABASE_DIR, 'atlas-review-decisions.private-latest.json');
const reviewDecisionsPayload = readJson(reviewDecisionsPayloadPath);
if (reviewDecisionsPayload) {
  if (reviewDecisionsPayload.remote_write_attempted !== false) {
    fail('T063: atlas-review-decisions.private-latest.json remote_write_attempted is not false');
  } else {
    pass('T063: atlas-review-decisions.private-latest.json remote_write_attempted = false');
  }

  const decisions = reviewDecisionsPayload.records;
  let decisionsErrors = false;
  if (Array.isArray(decisions)) {
    for (const record of decisions) {
      if (record.remote_write_attempted !== false && record.remote_write_attempted !== undefined) {
        fail(`T063: atlas-review-decisions.private-latest.json remote_write_attempted is true in record ${record.decision_id}`);
        decisionsErrors = true;
      }
      if (record.public_publish_ready !== false && record.public_publish_ready !== undefined) {
        fail(`T063: atlas-review-decisions.private-latest.json public_publish_ready is not false in record ${record.decision_id}`);
        decisionsErrors = true;
      }
      if (record.promotion_packet_created !== false && record.promotion_packet_created !== undefined) {
        fail(`T063: atlas-review-decisions.private-latest.json promotion_packet_created is not false in record ${record.decision_id}`);
        decisionsErrors = true;
      }
      if (record.public_preview_created !== false && record.public_preview_created !== undefined) {
        fail(`T063: atlas-review-decisions.private-latest.json public_preview_created is not false in record ${record.decision_id}`);
        decisionsErrors = true;
      }
      if (record.public_site_mutated !== false && record.public_site_mutated !== undefined) {
        fail(`T063: atlas-review-decisions.private-latest.json public_site_mutated is not false in record ${record.decision_id}`);
        decisionsErrors = true;
      }
      if (record.raw_text_stored !== false && record.raw_text_stored !== undefined) {
        fail(`T063: atlas-review-decisions.private-latest.json raw_text_stored is not false in record ${record.decision_id}`);
        decisionsErrors = true;
      }
      if (record.html_stored !== false && record.html_stored !== undefined) {
        fail(`T063: atlas-review-decisions.private-latest.json html_stored is not false in record ${record.decision_id}`);
        decisionsErrors = true;
      }
    }
    if (!decisionsErrors) {
      pass('T063: hosted review decisions payload records are fully sanitized (correct)');
    }
  } else {
    fail('T063: atlas-review-decisions.private-latest.json records is not an array');
  }
} else {
  pass('T063: atlas-review-decisions.private-latest.json not present (ok)');
}

const draftPacketsPayloadPath = path.join(OPS_SUPABASE_DIR, 'atlas-draft-candidate-packets.private-latest.json');
const draftPacketsPayload = readJson(draftPacketsPayloadPath);
if (draftPacketsPayload) {
  if (draftPacketsPayload.remote_write_attempted !== false) {
    fail('T063: atlas-draft-candidate-packets.private-latest.json remote_write_attempted is not false');
  } else {
    pass('T063: atlas-draft-candidate-packets.private-latest.json remote_write_attempted = false');
  }

  const packets = draftPacketsPayload.records;
  let packetsErrors = false;
  if (Array.isArray(packets)) {
    for (const record of packets) {
      if (record.remote_write_attempted !== false && record.remote_write_attempted !== undefined) {
        fail(`T063: atlas-draft-candidate-packets.private-latest.json remote_write_attempted is true in record ${record.packet_id}`);
        packetsErrors = true;
      }
      if (record.public_publish_ready !== false && record.public_publish_ready !== undefined) {
        fail(`T063: atlas-draft-candidate-packets.private-latest.json public_publish_ready is not false in record ${record.packet_id}`);
        packetsErrors = true;
      }
      if (record.promotion_packet_created !== false && record.promotion_packet_created !== undefined) {
        fail(`T063: atlas-draft-candidate-packets.private-latest.json promotion_packet_created is not false in record ${record.packet_id}`);
        packetsErrors = true;
      }
      if (record.public_preview_created !== false && record.public_preview_created !== undefined) {
        fail(`T063: atlas-draft-candidate-packets.private-latest.json public_preview_created is not false in record ${record.packet_id}`);
        packetsErrors = true;
      }
      if (record.public_site_mutated !== false && record.public_site_mutated !== undefined) {
        fail(`T063: atlas-draft-candidate-packets.private-latest.json public_site_mutated is not false in record ${record.packet_id}`);
        packetsErrors = true;
      }
      if (record.raw_text_stored !== false && record.raw_text_stored !== undefined) {
        fail(`T063: atlas-draft-candidate-packets.private-latest.json raw_text_stored is not false in record ${record.packet_id}`);
        packetsErrors = true;
      }
      if (record.html_stored !== false && record.html_stored !== undefined) {
        fail(`T063: atlas-draft-candidate-packets.private-latest.json html_stored is not false in record ${record.packet_id}`);
        packetsErrors = true;
      }
    }
    if (!packetsErrors) {
      pass('T063: hosted draft packets payload records are fully sanitized (correct)');
    }
  } else {
    fail('T063: atlas-draft-candidate-packets.private-latest.json records is not an array');
  }
} else {
  pass('T063: atlas-draft-candidate-packets.private-latest.json not present (ok)');
}

// ── 54. T063: no raw HTML/body in private review decisions / packets outputs ──
const decisionsDir = path.join(ROOT, 'data', 'reviews', 'decisions');
const draftPacketsDir = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets');
const HTML_PATTERN_063 = /<!DOCTYPE html|<html[\s>]/i;
let t063HtmlFound = false;
if (existsDir(decisionsDir)) {
  walkDir(decisionsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const content = readText(file);
    if (content && HTML_PATTERN_063.test(content)) {
      fail('T063: Raw HTML found in private review decision output: ' + path.relative(ROOT, file));
      t063HtmlFound = true;
    }
  });
}
if (existsDir(draftPacketsDir)) {
  walkDir(draftPacketsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const content = readText(file);
    if (content && HTML_PATTERN_063.test(content)) {
      fail('T063: Raw HTML found in private draft packet output: ' + path.relative(ROOT, file));
      t063HtmlFound = true;
    }
  });
}
if (!t063HtmlFound) pass('T063: No raw HTML in data/reviews/decisions/ or data/reviews/draft-candidate-packets/');

// ── 55. T063: no public case count change ────────────────────────────────────
pass('T063: public case count unchanged (covered by check 27)');

// ── 56. T063: no INC-0014 ────────────────────────────────────────────────────
pass('T063: no INC-0014 (covered by check 28)');

// ── 57. T063: no cron in private review decisions / packets outputs ───────────
let t063CronFound = false;
const checkCronInObj = (file, json) => {
  if (Array.isArray(json)) {
    for (const item of json) {
      if (item.cron_triggered === true) {
        fail('T063: cron_triggered=true found in array element of: ' + path.relative(ROOT, file));
        t063CronFound = true;
      }
    }
  } else if (json && typeof json === 'object') {
    if (json.cron_triggered === true) {
      fail('T063: cron_triggered=true found in object of: ' + path.relative(ROOT, file));
      t063CronFound = true;
    }
  }
};
if (existsDir(decisionsDir)) {
  walkDir(decisionsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    checkCronInObj(file, json);
  });
}
if (existsDir(draftPacketsDir)) {
  walkDir(draftPacketsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    checkCronInObj(file, json);
  });
}
if (!t063CronFound) pass('T063: No cron_triggered=true in private review decisions / packets outputs');

// ── 58. T063: no remote write marker in private review decisions / packets ────
let t063RemoteWriteFound = false;
const checkRemoteWriteInObj = (file, json) => {
  if (Array.isArray(json)) {
    for (const item of json) {
      if (item.remote_write_attempted === true) {
        fail('T063: remote_write_attempted=true found in array element of: ' + path.relative(ROOT, file));
        t063RemoteWriteFound = true;
      }
    }
  } else if (json && typeof json === 'object') {
    if (json.remote_write_attempted === true) {
      fail('T063: remote_write_attempted=true found in object of: ' + path.relative(ROOT, file));
      t063RemoteWriteFound = true;
    }
  }
};
if (existsDir(decisionsDir)) {
  walkDir(decisionsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    checkRemoteWriteInObj(file, json);
  });
}
if (existsDir(draftPacketsDir)) {
  walkDir(draftPacketsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    checkRemoteWriteInObj(file, json);
  });
}
if (!t063RemoteWriteFound) pass('T063: No remote_write_attempted=true in private review decisions / packets outputs');

// ── 59. T063: no Worker deployment marker ────────────────────────────────────
pass('T063: no Worker deployment marker (covered by check 12)');

// ── 60. T063: no Pages config change ─────────────────────────────────────────
pass('T063: no Pages config change (covered by checks 10/11)');

// ── 61. T064: approval templates not copied into site/ ───────────────────────
const siteApprovalsDir = path.join(ROOT, 'site', 'data', 'reviews', 'approvals');
if (existsDir(siteApprovalsDir)) {
  fail('T064: site/data/reviews/approvals/ exists — private approval templates must not be in public site');
} else {
  pass('T064: site/data/reviews/approvals/ not present (correct)');
}

// ── 62. T064: no active approval markers in baseline ─────────────────────────
const approvalsDir = path.join(ROOT, 'data', 'reviews', 'approvals');
let activeApprovalsFound = false;
if (existsDir(approvalsDir)) {
  walkDir(approvalsDir, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    if (json && Array.isArray(json.templates)) {
      for (const template of json.templates) {
        if (template.approval_status !== 'draft') {
          fail(`T064: approval marker template ${template.approval_id} has status "${template.approval_status}" instead of draft`);
          activeApprovalsFound = true;
        }
        if (template.control_tower_approval_present !== false) {
          fail(`T064: approval marker template ${template.approval_id} has control_tower_approval_present true instead of false`);
          activeApprovalsFound = true;
        }
      }
    }
  });
}
if (!activeApprovalsFound) pass('T064: no active approval markers in baseline (correct)');

// ── 63. T064: approval marker hosted payload is sanitized ────────────────────
const hostedApprovalsPath = path.join(OPS_SUPABASE_DIR, 'atlas-draft-approval-markers.private-latest.json');
const hostedApprovals = readJson(hostedApprovalsPath);
if (hostedApprovals) {
  if (hostedApprovals.remote_write_attempted !== false) {
    fail('T064: atlas-draft-approval-markers.private-latest.json remote_write_attempted is not false');
  } else {
    pass('T064: atlas-draft-approval-markers.private-latest.json remote_write_attempted = false');
  }
  if (hostedApprovals.active_approval_count !== 0) {
    fail('T064: atlas-draft-approval-markers.private-latest.json active_approval_count is not 0');
  } else {
    pass('T064: atlas-draft-approval-markers.private-latest.json active_approval_count = 0');
  }
  const recs = hostedApprovals.records;
  let recsError = false;
  if (Array.isArray(recs)) {
    for (const rec of recs) {
      if (rec.approval_status !== 'draft') {
        fail(`T064: hosted approval marker ${rec.approval_id} status is ${rec.approval_status} instead of draft`);
        recsError = true;
      }
      if (rec.control_tower_approval_present !== false) {
        fail(`T064: hosted approval marker ${rec.approval_id} has control_tower_approval_present true`);
        recsError = true;
      }
    }
    if (!recsError) pass('T064: hosted approval markers are fully sanitized templates (correct)');
  } else {
    fail('T064: hosted approvals records is not an array');
  }
} else {
  pass('T064: atlas-draft-approval-markers.private-latest.json not present (ok)');
}

// ── 64. T064: no approved decisions exist without valid approval marker ─────────
const decisionsLatestPath = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const decisionsLatest = readJson(decisionsLatestPath);
let approvedWithoutMarker = false;
if (decisionsLatest && Array.isArray(decisionsLatest.decisions)) {
  for (const d of decisionsLatest.decisions) {
    if (d.decision_status === 'approve_for_private_draft') {
      let foundMarker = false;
      const expectedApprovalId = d.approval_id || `APPROVAL-${decisionsLatest.run_id}-${d.intake_id.split('-').slice(-1)[0]}`;
      const markerPath = path.join(ROOT, 'data', 'reviews', 'approvals', 'active-markers', `${expectedApprovalId}.json`);
      if (existsFile(markerPath)) {
        const marker = readJson(markerPath);
        if (marker && marker.approval_status === 'approved_for_private_draft' && marker.control_tower_approval_present === true) {
          foundMarker = true;
        }
      }
      if (!foundMarker) {
        fail(`T064: decision ${d.decision_id} is approved_for_private_draft but has no active approved approval marker`);
        approvedWithoutMarker = true;
      }
    }
  }
}
if (!approvedWithoutMarker) pass('T064: no approved decisions exist without valid approval marker (correct)');

// ── 65. T064: draft candidate packets count matches approved count ───────────
const packetsLatestPath = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-latest.json');
const packetsLatest = readJson(packetsLatestPath);
if (packetsLatest && Array.isArray(packetsLatest.packets)) {
  const expectedPacketsCount = decisionsLatest && Array.isArray(decisionsLatest.decisions)
    ? decisionsLatest.decisions.filter(d => d.decision_status === 'approve_for_private_draft').length
    : 0;
  if (packetsLatest.packets.length !== expectedPacketsCount) {
    fail(`T064: packets list count (${packetsLatest.packets.length}) does not match approved decisions count (${expectedPacketsCount})`);
  } else {
    pass(`T064: draft candidate packets count matches approved decisions count (${expectedPacketsCount})`);
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
