// validate-bounded-green-source-run.mjs (T061)
// Validates the bounded Green-source manual run for safety compliance.
// Checks all policy constraints: green-only, no yellow/red, no AIID/OECD/AIAAIC,
// no full HTML/body storage, no secrets, no remote write, no cron, no INC-0014.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const POLICY_PATH     = path.join(ROOT, 'data', 'watch', 'config', 'manual-green-run-policy.json');
const LATEST_RUN_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const OPS_SUPABASE_DIR = path.join(ROOT, 'data', 'ops', 'supabase');
const PRIVATE_RUNS_DIR = path.join(ROOT, 'data', 'watch', 'private', 'runs');
const INC_INDEX_PATH  = path.join(ROOT, 'data', 'incident-index.json');

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

logHeader('T061 Bounded Green-Source Run Validator');

// ── 1. Policy file exists and is valid ─────────────────────────────────────────
const policy = readJson(POLICY_PATH);
if (!policy) {
  fail('manual-green-run-policy.json not found');
} else {
  pass('manual-green-run-policy.json exists');
  if (policy.mode === 'manual_bounded_green_only') {
    pass('policy mode is manual_bounded_green_only');
  } else {
    fail('policy mode is ' + policy.mode);
  }
  if (policy.storage_policy?.store_full_html === false) {
    pass('policy: store_full_html = false');
  } else {
    fail('policy: store_full_html is not false');
  }
  if (policy.storage_policy?.store_raw_body === false) {
    pass('policy: store_raw_body = false');
  } else {
    fail('policy: store_raw_body is not false');
  }
}

// ── 2. Latest run file exists ────────────────────────────────────────────────
const latestRun = readJson(LATEST_RUN_PATH);
if (!latestRun) {
  fail('real-green-run-latest.json not found — run not performed');
} else {
  pass('real-green-run-latest.json exists');
  logDetail('run_id: ' + latestRun.run_id);
}

// ── 3. Private run directory exists ──────────────────────────────────────────
if (latestRun) {
  const runDir = path.join(ROOT, latestRun.run_dir || `data/watch/private/runs/${latestRun.run_id}`);
  if (existsDir(runDir)) {
    pass('private run directory exists: ' + path.relative(ROOT, runDir));
  } else {
    fail('private run directory not found: ' + path.relative(ROOT, runDir));
  }
}

// ── 4. Source observations exist ─────────────────────────────────────────────
if (latestRun) {
  const runDir = path.join(ROOT, latestRun.run_dir || `data/watch/private/runs/${latestRun.run_id}`);
  const obsPath = path.join(runDir, 'source-observations.json');
  if (existsFile(obsPath)) {
    pass('source-observations.json exists');
    const obs = readJson(obsPath);
    if (obs?.observations) {
      pass('observations array present: ' + obs.observations.length + ' items');
    }
  } else {
    fail('source-observations.json not found');
  }
}

// ── 5. Candidate signals exist ───────────────────────────────────────────────
if (latestRun) {
  const runDir = path.join(ROOT, latestRun.run_dir || `data/watch/private/runs/${latestRun.run_id}`);
  const sigPath = path.join(runDir, 'candidate-signals.json');
  if (existsFile(sigPath)) {
    pass('candidate-signals.json exists');
    const sigs = readJson(sigPath);
    if (sigs?.signals) {
      pass('signals array present: ' + sigs.signals.length + ' items');
    }
  } else {
    warn('candidate-signals.json not found (zero signals is allowed)');
  }
}

// ── 6. Safety manifest exists ──────────────────────────────────────────────
if (latestRun) {
  const runDir = path.join(ROOT, latestRun.run_dir || `data/watch/private/runs/${latestRun.run_id}`);
  const mfPath = path.join(runDir, 'safety-manifest.json');
  if (existsFile(mfPath)) {
    pass('safety-manifest.json exists');
    const mf = readJson(mfPath);
    if (mf?.policy_compliance?.no_full_html === true) {
      pass('safety-manifest: no_full_html = true');
    } else {
      fail('safety-manifest: no_full_html not confirmed');
    }
  } else {
    fail('safety-manifest.json not found');
  }
}

// ── 7. Only Green sources were fetched ───────────────────────────────────────
if (latestRun) {
  const runDir = path.join(ROOT, latestRun.run_dir || `data/watch/private/runs/${latestRun.run_id}`);
  const obs = readJson(path.join(runDir, 'source-observations.json'));
  if (obs?.observations) {
    const nonGreen = obs.observations.filter(o => o.risk_tier !== 'green');
    if (nonGreen.length === 0) {
      pass('All source observations are green-tier');
    } else {
      fail('Non-green source observations found: ' + nonGreen.map(o => o.source_id).join(', '));
    }
  }
}

// ── 8. Yellow/Red blocked ────────────────────────────────────────────────────
if (policy) {
  const blocked = policy.blocked_source_risk_tiers || [];
  if (blocked.includes('yellow') && blocked.includes('red')) {
    pass('policy blocks yellow and red tiers');
  } else {
    fail('policy blocked tiers missing yellow/red: ' + JSON.stringify(blocked));
  }
}

// ── 9. AIID/OECD/AIAAIC blocked ──────────────────────────────────────────────
if (policy) {
  const blocked = policy.blocked_source_patterns || [];
  const hasAll = ['aiid', 'oecd', 'aiaaic'].every(p => blocked.some(b => b.toLowerCase().includes(p)));
  if (hasAll) {
    pass('policy blocks AIID/OECD/AIAAIC patterns');
  } else {
    fail('policy missing AIID/OECD/AIAAIC block patterns');
  }
}

// ── 10. No full HTML stored in private runs ──────────────────────────────────
const HTML_PATTERN = /<!DOCTYPE html|<html[\s>]/i;
let htmlFound = false;
if (existsDir(PRIVATE_RUNS_DIR)) {
  walkDir(PRIVATE_RUNS_DIR, (file) => {
    if (!file.endsWith('.json')) return;
    const content = readText(file);
    if (content && HTML_PATTERN.test(content)) {
      fail('Raw HTML found in private run output: ' + path.relative(ROOT, file));
      htmlFound = true;
    }
  });
}
if (!htmlFound) pass('No raw HTML in private run outputs');

// ── 11. No raw bodies stored ─────────────────────────────────────────────────
// Check for _safe_text or similar raw content fields in observations
let rawBodyFound = false;
if (existsDir(PRIVATE_RUNS_DIR)) {
  walkDir(PRIVATE_RUNS_DIR, (file) => {
    if (!file.endsWith('.json')) return;
    const json = readJson(file);
    if (json?.observations) {
      for (const obs of json.observations) {
        if (obs._safe_text && obs._safe_text.length > 1000) {
          fail('Large _safe_text field found in observations (raw body storage)');
          rawBodyFound = true;
        }
      }
    }
  });
}
if (!rawBodyFound) pass('No raw body content in private outputs');

// ── 12. No long third-party text stored ──────────────────────────────────────
const LONG_THRESHOLD = 5000;
let longTextFound = false;
if (existsDir(PRIVATE_RUNS_DIR)) {
  walkDir(PRIVATE_RUNS_DIR, (file) => {
    if (!file.endsWith('.json')) return;
    const content = readText(file);
    if (content) {
      const matches = content.match(/"[^"]{5001,}"/g);
      if (matches && matches.length > 0) {
        fail('Long text strings in private run file: ' + path.relative(ROOT, file));
        longTextFound = true;
      }
    }
  });
}
if (!longTextFound) pass('No unexpectedly long text strings in private outputs');

// ── 13. No secrets committed ─────────────────────────────────────────────────
const JWT_PATTERN = /eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{10,}/;
const KEY_PATTERN = /supabase[._-]?service[._-]?role[._-]?key\s*[=:]\s*ey[A-Za-z0-9_.-]{20,}/i;
let secretFound = false;
walkDir(ROOT, (file) => {
  if (file.includes('/.git/') || file.includes('/node_modules/')) return;
  const rel = path.relative(ROOT, file);
  if (rel === '.env' || rel === '.env.example') return;
  const text = readText(file);
  if (text && (JWT_PATTERN.test(text) || KEY_PATTERN.test(text))) {
    fail('Possible secret/JWT found in: ' + rel);
    secretFound = true;
  }
});
if (!secretFound) pass('No secrets/JWTs in tracked files');

// ── 14. No .env committed ──────────────────────────────────────────────────────
if (existsFile(path.join(ROOT, '.env'))) {
  fail('.env file exists at repo root — must not be committed');
} else {
  pass('No .env file at repo root');
}

// ── 15. Remote write marker false ────────────────────────────────────────────
if (latestRun) {
  if (latestRun.remote_write_attempted !== true) {
    pass('run: remote_write_attempted is not true (correct)');
  } else {
    fail('run: remote_write_attempted is true');
  }
}

// ── 16. Cron triggered false ─────────────────────────────────────────────────
if (policy) {
  if (policy.safety_flags?.cron_triggered === false) {
    pass('policy: cron_triggered = false');
  } else {
    fail('policy: cron_triggered is not false');
  }
}

// ── 17. Public site mutated false ────────────────────────────────────────────
if (policy) {
  if (policy.safety_flags?.public_site_mutated === false) {
    pass('policy: public_site_mutated = false');
  } else {
    fail('policy: public_site_mutated is not false');
  }
}

// ── 18. Public publish count zero ────────────────────────────────────────────
if (policy) {
  if (policy.safety_flags?.public_publish_count === 0) {
    pass('policy: public_publish_count = 0');
  } else {
    fail('policy: public_publish_count is not 0');
  }
}

// ── 19. No promotion packet created by this task ─────────────────────────────
const PROMOTION_PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
let t061PromotionFound = false;
if (existsDir(PROMOTION_PACKETS_DIR) && latestRun) {
  const runTime = new Date(latestRun.created_at).getTime();
  walkDir(PROMOTION_PACKETS_DIR, (file) => {
    if (!file.endsWith('.json')) return;
    const stat = fs.statSync(file);
    if (stat.mtime.getTime() > runTime - 60000) {  // Created near run time
      const content = readJson(file);
      if (content?._t061_task === true || content?._source === 't061') {
        t061PromotionFound = true;
      }
    }
  });
}
if (!t061PromotionFound) {
  pass('No T061-created promotion packets');
} else {
  fail('T061-created promotion packet found (should not create)');
}

// ── 20. No public preview created by this task ───────────────────────────────
const PREVIEWS_DIR = path.join(ROOT, 'data', 'promotion-previews', 'real');
let t061PreviewFound = false;
if (existsDir(PREVIEWS_DIR) && latestRun) {
  const runTime = new Date(latestRun.created_at).getTime();
  walkDir(PREVIEWS_DIR, (file) => {
    if (!file.endsWith('.json')) return;
    const stat = fs.statSync(file);
    if (stat.mtime.getTime() > runTime - 60000) {
      const content = readJson(file);
      if (content?._t061_task === true) {
        t061PreviewFound = true;
      }
    }
  });
}
if (!t061PreviewFound) {
  pass('No T061-created public previews');
} else {
  fail('T061-created public preview found (should not create)');
}

// ── 21. Public count remains 13 ──────────────────────────────────────────────
const incIndex = readJson(INC_INDEX_PATH);
if (incIndex) {
  const count = (incIndex.incidents || []).length;
  if (count === 13) {
    pass('public record count = 13 (unchanged)');
  } else {
    fail('public record count = ' + count + ', expected 13');
  }
}

// ── 22. Latest remains INC-0013 ───────────────────────────────────────────────
if (incIndex) {
  const ids = (incIndex.incidents || []).map(i => i.incident_id).sort();
  const latest = ids[ids.length - 1];
  if (latest === 'INC-0013') {
    pass('latest public record = INC-0013');
  } else {
    fail('latest public record = ' + latest + ', expected INC-0013');
  }
}

// ── 23. No INC-0014 ───────────────────────────────────────────────────────────
let inc0014Found = false;
[path.join(ROOT, 'data'), path.join(ROOT, 'site', 'data')].forEach(dir => {
  walkDir(dir, (file) => {
    if (path.basename(file).includes('INC-0014') || path.basename(file).includes('inc-0014')) {
      fail('INC-0014 found: ' + path.relative(ROOT, file));
      inc0014Found = true;
    }
  });
});
if (!inc0014Found) pass('No INC-0014 in data/ or site/data/');

// ── 24. Hosted dry-run payloads exist ────────────────────────────────────────
const realGreenRunPayload = path.join(OPS_SUPABASE_DIR, 'atlas-watch-run.real-green-latest.json');
if (existsFile(realGreenRunPayload)) {
  pass('atlas-watch-run.real-green-latest.json exists');
} else {
  warn('atlas-watch-run.real-green-latest.json not found (run export-hosted-watch-run-payloads.mjs)');
}

// ── 25. Private data not in site/ ─────────────────────────────────────────────
const sitePrivateDir = path.join(ROOT, 'site', 'data', 'watch');
if (existsDir(sitePrivateDir)) {
  fail('site/data/watch/ exists — private watch data must not be in public site');
} else {
  pass('site/data/watch/ not present (correct)');
}

// ── Final result ─────────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write('validate-bounded-green-source-run: FAILED — ' + errors + ' error(s), ' + warnings + ' warning(s)\n');
  process.exit(1);
} else {
  process.stdout.write('validate-bounded-green-source-run: PASSED' + (warnings > 0 ? ' with ' + warnings + ' warning(s)' : '') + '\n');
}

// Helper functions
function logHeader(text) {
  process.stdout.write('\n========================================\n');
  process.stdout.write('  ' + text + '\n');
  process.stdout.write('========================================\n\n');
}

function logDetail(text) {
  process.stdout.write('      ' + text + '\n');
}
