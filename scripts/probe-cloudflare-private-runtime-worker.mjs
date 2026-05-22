// scripts/probe-cloudflare-private-runtime-worker.mjs (T073)
// Probes the Cloudflare Worker private runtime.
// Default mode: dry-run only (local in-memory worker test). 
// Real probe: requires --live-probe flag + ATLAS_T073_WORKER_DEPLOY_APPROVED=YES / ATLAS_T073_LIVE_PROBE_APPROVED=YES + worker URL.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OUT_DIR     = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const OUTPUT_PATH = path.join(OUT_DIR, 't073-worker-probe-result.latest.json');

// Parse local env files securely if not present in process.env
const parseEnvFile = (p) => {
  if (!fs.existsSync(p)) return {};
  const out = {};
  const content = fs.readFileSync(p, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
};

const cfEnv = parseEnvFile(path.join(ROOT, '.env.cloudflare.local'));
const workerUrl = (process.env.CLOUDFLARE_WORKER_URL || cfEnv.CLOUDFLARE_WORKER_URL || '').trim();

const args = process.argv.slice(2);
const hasLiveProbeFlag = args.includes('--live-probe');

const liveApproved = process.env.ATLAS_T073_LIVE_PROBE_APPROVED === 'YES' || process.env.ATLAS_T073_WORKER_DEPLOY_APPROVED === 'YES';
const shouldProbeLive = hasLiveProbeFlag && liveApproved && workerUrl.length > 0;

const now = new Date().toISOString();
let attemptedLive = false;
let success = false;
let errorMsg = null;
let probeDetails = {};

// Clean any JWT or sensitive fields from response bodies
function sanitizeProbeData(body) {
  const jsonStr = JSON.stringify(body);
  // Redact anything that looks like a JWT or large secret token
  return JSON.parse(
    jsonStr.replace(/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/g, '[REDACTED_JWT]')
           .replace(/[A-Za-z0-9_-]{40,}/g, '[REDACTED_TOKEN]')
  );
}

if (shouldProbeLive) {
  process.stdout.write(`probe-cloudflare-private-runtime-worker: LIVE probe approved. Probing URL: ${workerUrl}...\n`);
  attemptedLive = true;
  try {
    const endpoints = [
      { path: '/health', method: 'GET' },
      { path: '/version', method: 'GET' },
      { path: '/status', method: 'GET' },
      { path: '/private/review-state/latest', method: 'GET' },
      { path: '/private/review-state/sync-dry-run', method: 'POST', body: '{}' }
    ];

    const results = {};
    for (const ep of endpoints) {
      const url = workerUrl.endsWith('/') ? workerUrl.slice(0, -1) + ep.path : workerUrl + ep.path;
      const opts = { method: ep.method };
      if (ep.method === 'POST') {
        opts.headers = { 'Content-Type': 'application/json' };
        opts.body = ep.body;
      }
      
      const res = await fetch(url, opts);
      const isJson = (res.headers.get('content-type') || '').includes('json');
      const body = isJson ? await res.json() : await res.text();
      
      results[ep.path] = {
        status: res.status,
        ok: res.ok,
        body: sanitizeProbeData(body)
      };
    }
    
    success = true;
    probeDetails = results;
    process.stdout.write('PASS: Live Worker endpoints probed successfully.\n');
  } catch (err) {
    errorMsg = err.message;
    process.stdout.write('FAIL: Error during live Worker probe: ' + errorMsg + '\n');
  }
} else {
  process.stdout.write('probe-cloudflare-private-runtime-worker: DRY-RUN ONLY. Probing local in-memory worker...\n');
  
  // Shims for local in-memory execution
  class MockRequest {
    constructor(url, { method = 'GET', body = null } = {}) {
      this.url    = url;
      this.method = method;
      this._body  = body;
    }
    async json() { return JSON.parse(this._body); }
  }

  class MockResponse {
    constructor(body, { status = 200, headers = {} } = {}) {
      this._body   = body;
      this.status  = status;
      this.headers = new Map(Object.entries(headers));
      this.ok      = status >= 200 && status < 300;
    }
    async json() { return JSON.parse(this._body); }
    async text() { return String(this._body); }
  }

  global.Request  = MockRequest;
  global.Response = MockResponse;
  global.URL      = URL;

  try {
    const workerPath = path.join(ROOT, 'infra', 'cloudflare-worker', 'src', 'index.js');
    const { default: worker } = await import(workerPath);
    const BASE = 'https://worker.local';

    const endpoints = [
      { path: '/health', method: 'GET' },
      { path: '/version', method: 'GET' },
      { path: '/status', method: 'GET' },
      { path: '/private/review-state/latest', method: 'GET' },
      { path: '/private/review-state/sync-dry-run', method: 'POST', body: '{}' }
    ];

    const results = {};
    for (const ep of endpoints) {
      const req = new MockRequest(BASE + ep.path, { method: ep.method, body: ep.body });
      const res = await worker.fetch(req, {});
      const body = await res.json();
      results[ep.path] = {
        status: res.status,
        ok: res.ok,
        body: sanitizeProbeData(body)
      };
    }

    success = true;
    probeDetails = results;
    process.stdout.write('PASS: Local Worker dry-run probe succeeded.\n');
  } catch (err) {
    errorMsg = err.message;
    process.stdout.write('FAIL: Error during local Worker probe: ' + errorMsg + '\n');
  }
}

const probeResult = {
  _schema: 'atlas-private-runtime-activation-worker-probe-result/v1',
  generated_at: now,
  task: 'T073',
  live_probe_requested: hasLiveProbeFlag,
  live_probe_approved: liveApproved,
  live_probe_attempted: attemptedLive,
  success: success,
  probe_details: probeDetails,
  errors: errorMsg,
  note: attemptedLive ? 'Live Worker endpoints were validated over network.' : 'Dry-run in-memory validation of Cloudflare Worker logic executed.'
};

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(probeResult, null, 2) + '\n');

process.exit(success ? 0 : 1);
