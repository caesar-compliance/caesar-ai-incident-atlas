// test-cloudflare-worker-local.mjs (T057)
// Tests infra/cloudflare-worker/src/index.js route logic locally.
// No Wrangler / miniflare / real network calls / credentials required.

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

// ── Minimal Request/Response shim for Node (no DOM / no Wrangler) ────────────
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
  async json() {
    if (this._body === null || this._body === undefined) return null;
    return JSON.parse(this._body);
  }
  async text() { return this._body === null ? '' : String(this._body); }
}

// Inject shims into global so the worker module can use them
global.Request  = MockRequest;
global.Response = MockResponse;
global.URL      = URL;

// ── Load worker ────────────────────────────────────────────────────────────────
const workerPath = path.join(ROOT, 'infra', 'cloudflare-worker', 'src', 'index.js');
const { default: worker } = await import(workerPath);

// ── Test harness ───────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

async function runTest(label, fn) {
  try {
    await fn();
    process.stdout.write('PASS: ' + label + '\n');
    passed++;
  } catch (err) {
    process.stdout.write('FAIL: ' + label + ' — ' + err.message + '\n');
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

const BASE = 'https://worker.local';

// ── Tests ─────────────────────────────────────────────────────────────────────

await runTest('GET /health returns 200', async () => {
  const req = new MockRequest(BASE + '/health', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.status === 'ok', 'body.status=' + body.status);
  assert(body.service === 'caesar-ai-incident-atlas-worker', 'service mismatch');
});

await runTest('GET /status returns 200 with static fallback', async () => {
  const req = new MockRequest(BASE + '/status', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.automation_mode === 'manual_local', 'automation_mode=' + body.automation_mode);
  assert(body.public_record_count === 13, 'public_record_count=' + body.public_record_count);
});

await runTest('GET /status with OPS_STATUS_JSON env returns provided JSON', async () => {
  const opsJson = JSON.stringify({ automation_mode: 'hosted_ready', public_record_count: 13 });
  const req = new MockRequest(BASE + '/status', { method: 'GET' });
  const res = await worker.fetch(req, { OPS_STATUS_JSON: opsJson });
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.automation_mode === 'hosted_ready', 'automation_mode=' + body.automation_mode);
});

await runTest('GET /public-records returns 200 with stub', async () => {
  const req = new MockRequest(BASE + '/public-records', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.public_record_count === 13, 'public_record_count=' + body.public_record_count);
  assert(body.source === 'static_stub', 'source=' + body.source);
});

await runTest('GET /latest-run returns 200 safe response', async () => {
  const req = new MockRequest(BASE + '/latest-run', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.automation_mode === 'manual_local', 'automation_mode=' + body.automation_mode);
});

await runTest('POST /watch/run returns 403 when ENABLE_WATCH_RUNS not true', async () => {
  const req = new MockRequest(BASE + '/watch/run', { method: 'POST' });
  const res = await worker.fetch(req, {});
  assert(res.status === 403, 'status=' + res.status);
  const body = await res.json();
  assert(body.error === 'disabled', 'error=' + body.error);
});

await runTest('POST /watch/run returns 403 when ENABLE_WATCH_RUNS=false', async () => {
  const req = new MockRequest(BASE + '/watch/run', { method: 'POST' });
  const res = await worker.fetch(req, { ENABLE_WATCH_RUNS: 'false' });
  assert(res.status === 403, 'status=' + res.status);
});

await runTest('POST /watch/run returns 202 when ENABLE_WATCH_RUNS=true', async () => {
  const req = new MockRequest(BASE + '/watch/run', { method: 'POST' });
  const res = await worker.fetch(req, { ENABLE_WATCH_RUNS: 'true' });
  assert(res.status === 202, 'status=' + res.status);
  const body = await res.json();
  assert(body.status === 'accepted', 'status=' + body.status);
});

await runTest('OPTIONS preflight returns 204', async () => {
  const req = new MockRequest(BASE + '/health', { method: 'OPTIONS' });
  const res = await worker.fetch(req, {});
  assert(res.status === 204, 'status=' + res.status);
});

await runTest('Unknown route returns 404', async () => {
  const req = new MockRequest(BASE + '/unknown-route', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 404, 'status=' + res.status);
  const body = await res.json();
  assert(body.error === 'not_found', 'error=' + body.error);
});

// ── Summary ───────────────────────────────────────────────────────────────────
process.stdout.write('\n');
process.stdout.write('test-cloudflare-worker-local: ' + passed + ' passed, ' + failed + ' failed\n');
if (failed > 0) process.exit(1);
