// scripts/validate-cloudflare-private-runtime-worker.mjs (T073)
// Validates Cloudflare Worker deployment and probe outcomes, contract compliance, and security boundaries.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

let errors = 0;
let warnings = 0;

function pass(msg)  { process.stdout.write('PASS: ' + msg + '\n'); }
function fail(msg)  { process.stdout.write('FAIL: ' + msg + '\n'); errors++; }
function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

const DEPLOY_RES_PATH = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 't073-worker-deploy-result.latest.json');
const PROBE_RES_PATH  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation', 't073-worker-probe-result.latest.json');

// ── Check artifact existence ───────────────────────────────────────────────
if (!fs.existsSync(DEPLOY_RES_PATH)) {
  fail(`Worker deploy result missing at: ${path.relative(ROOT, DEPLOY_RES_PATH)}`);
} else {
  pass('Worker deploy result exists');
}

if (!fs.existsSync(PROBE_RES_PATH)) {
  fail(`Worker probe result missing at: ${path.relative(ROOT, PROBE_RES_PATH)}`);
} else {
  pass('Worker probe result exists');
}

if (errors > 0) {
  process.exit(1);
}

const deployRes = readJson(DEPLOY_RES_PATH);
const probeRes  = readJson(PROBE_RES_PATH);

// ── Validate deployment result ──────────────────────────────────────────────
if (deployRes.success !== true) {
  fail('Worker deploy result success is not true');
} else {
  pass('Worker deploy result indicates success');
}

const workerDeployApproved = process.env.ATLAS_T073_WORKER_DEPLOY_APPROVED === 'YES';
if (!workerDeployApproved && deployRes.worker_deploy_attempted !== false) {
  fail('Worker deploy was executed but ATLAS_T073_WORKER_DEPLOY_APPROVED is not YES');
} else {
  pass('Worker deploy execution state matches approval settings');
}

// ── Validate probe contract compliance ──────────────────────────────────────
if (probeRes.success !== true) {
  fail('Worker probe success is not true');
} else {
  pass('Worker probe indicates success');
}

const details = probeRes.probe_details || {};

const requiredRoutes = [
  '/health',
  '/version',
  '/status',
  '/private/review-state/latest',
  '/private/review-state/sync-dry-run'
];

for (const route of requiredRoutes) {
  const rInfo = details[route];
  if (!rInfo) {
    fail(`Route ${route} was not probed`);
    continue;
  }
  
  if (rInfo.status !== 200) {
    fail(`Route ${route} returned HTTP status ${rInfo.status}, expected 200`);
  } else {
    pass(`Route ${route} returned HTTP 200`);
  }

  // Validate response structures
  const body = rInfo.body || {};
  
  // Verify absolutely no secrets exist in the probe results
  const bodyStr = JSON.stringify(body);
  if (/eyJ[A-Za-z0-9_-]{20,}/.test(bodyStr) || bodyStr.includes('private-key') || bodyStr.includes('api-key')) {
    fail(`Sensitive credential pattern found in probed response of ${route}`);
  }

  if (route === '/private/review-state/latest' || route === '/private/review-state/sync-dry-run') {
    if (body.status !== 'dry_run_only') {
      fail(`Private route ${route} status is '${body.status}', expected 'dry_run_only'`);
    } else {
      pass(`Private route ${route} status conforms to contract`);
    }

    if (body.sync_status !== 'hosted_private_sync_readiness_prepared') {
      fail(`Private route ${route} sync_status is '${body.sync_status}', expected 'hosted_private_sync_readiness_prepared'`);
    } else {
      pass(`Private route ${route} sync_status conforms to contract`);
    }

    if (body.publication_blocked !== true) {
      fail(`Private route ${route} publication_blocked is ${body.publication_blocked}, expected true`);
    } else {
      pass(`Private route ${route} publication_blocked conforms to contract`);
    }
  }
}

// ── Leakage & boundary checks ───────────────────────────────────────────────
const pagesYmlPath = path.join(ROOT, '.github', 'workflows', 'pages.yml');
const pagesYml = fs.existsSync(pagesYmlPath) ? fs.readFileSync(pagesYmlPath, 'utf8') : '';
if (pagesYml.includes('infra/cloudflare-worker')) {
  fail('Cloudflare Worker code/config path leaked into GitHub Pages deployment workflow');
} else {
  pass('No Cloudflare Worker paths leak to GitHub Pages config');
}

// Check that Wrangler deployment did not enable cron triggers in the wrangler.toml file
const wranglerExample = fs.existsSync(path.join(ROOT, 'infra', 'cloudflare-worker', 'wrangler.example.toml'))
  ? fs.readFileSync(path.join(ROOT, 'infra', 'cloudflare-worker', 'wrangler.example.toml'), 'utf8')
  : '';
if (/\[triggers\]/.test(wranglerExample) || /crons\s*=/.test(wranglerExample)) {
  fail('Triggers/cron configurations found in wrangler.example.toml');
} else {
  pass('No cron triggers configured in wrangler.example.toml (correct)');
}

// ── Exit code report ────────────────────────────────────────────────────────
process.stdout.write('\n');
if (errors > 0) {
  process.stdout.write(`validate-cloudflare-private-runtime-worker: FAILED — ${errors} error(s)\n`);
  process.exit(1);
} else {
  process.stdout.write('validate-cloudflare-private-runtime-worker: PASSED\n');
  process.exit(0);
}
