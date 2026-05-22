// test-cloudflare-worker-local.mjs (T058)
// Tests infra/cloudflare-worker/src/index.js route logic locally.
// No Wrangler / miniflare / real network calls / credentials required.
// Covers: fallback mode, mocked Supabase success/failure, all routes, safety checks.

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
global.fetch    = global.fetch || (() => Promise.reject(new Error('fetch not available')));

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

function assertNoSecrets(body, msg) {
  const json = JSON.stringify(body);
  // Check for JWT patterns
  if (/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/.test(json)) {
    throw new Error(msg + ' — JWT-like token found in response');
  }
  // Check for long base64-like strings (40+ chars)
  if (/[A-Za-z0-9_-]{40,}/.test(json)) {
    throw new Error(msg + ' — long token-like string found in response');
  }
}

const BASE = 'https://worker.local';

// ── Test Group 1: Fallback mode (no Supabase env) ────────────────────────────

for (const route of ['/healthz', '/readyz', '/version']) {
  await runTest(`GET ${route} returns JSON (fallback mode)`, async () => {
    const req = new MockRequest(BASE + route, { method: 'GET' });
    const res = await worker.fetch(req, {});
    assert(res.ok || route === '/readyz', `Expected 200 or 503 for ${route}, got ${res.status}`);
    const body = await res.json();
    assertNoSecrets(body, route);
    const valid =
      body.app === 'caesar-ai-incident-atlas' ||
      body.status === 'ok' ||
      body.worker ||
      typeof body.ready === 'boolean';
    assert(valid, `${route} missing expected fields`);
  });
}

await runTest('GET /health returns 200 (fallback mode)', async () => {
  const req = new MockRequest(BASE + '/health', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.status === 'ok', 'body.status=' + body.status);
  assert(body.service === 'caesar-ai-incident-atlas-worker', 'service mismatch');
  assert(body.supabase_connected === false, 'supabase_connected should be false');
  assertNoSecrets(body, 'health response');
});

await runTest('GET /status returns 200 with fallback', async () => {
  const req = new MockRequest(BASE + '/status', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.automation_mode === 'manual_local', 'automation_mode=' + body.automation_mode);
  assert(body.public_record_count === 13, 'public_record_count=' + body.public_record_count);
  assert(body.worker_api_status === 'local_fallback', 'worker_api_status=' + body.worker_api_status);
  assertNoSecrets(body, 'status response');
});

await runTest('GET /status with OPS_STATUS_JSON env returns provided JSON', async () => {
  const opsJson = JSON.stringify({ automation_mode: 'hosted_ready', public_record_count: 13 });
  const req = new MockRequest(BASE + '/status', { method: 'GET' });
  const res = await worker.fetch(req, { OPS_STATUS_JSON: opsJson });
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.automation_mode === 'hosted_ready', 'automation_mode=' + body.automation_mode);
  assertNoSecrets(body, 'status with env response');
});

await runTest('GET /public-records returns 13 fallback records', async () => {
  const req = new MockRequest(BASE + '/public-records', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.source === 'fallback_local', 'source=' + body.source);
  assert(body.count === 13, 'count=' + body.count);
  assert(body.latest === 'INC-0013', 'latest=' + body.latest);
  assert(Array.isArray(body.records), 'records should be array');
  assert(body.records.length === 13, 'records.length=' + body.records.length);
  // Verify INC-0013 is present and is guidance (not described as enforcement)
  const inc0013 = body.records.find(r => r.incident_id === 'INC-0013');
  assert(inc0013, 'INC-0013 not found in fallback records');
  assert(inc0013.record_type === 'guidance', 'INC-0013 should be guidance type');
  assertNoSecrets(body, 'public-records response');
});

await runTest('GET /public-records/INC-0013 returns single record (fallback)', async () => {
  const req = new MockRequest(BASE + '/public-records/INC-0013', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.found === true, 'found=' + body.found);
  assert(body.source === 'fallback_local', 'source=' + body.source);
  assert(body.record.incident_id === 'INC-0013', 'incident_id mismatch');
  assert(body.record.record_type === 'guidance', 'INC-0013 should be guidance type');
  assertNoSecrets(body, 'public-record single response');
});

await runTest('GET /public-records/INC-9999 returns 404 (fallback)', async () => {
  const req = new MockRequest(BASE + '/public-records/INC-9999', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 404, 'status=' + res.status);
  const body = await res.json();
  assert(body.error === 'not_found', 'error=' + body.error);
  assert(body.incident_id === 'INC-9999', 'incident_id mismatch');
  assertNoSecrets(body, '404 response');
});

await runTest('GET /public-records/invalid-id returns 400', async () => {
  const req = new MockRequest(BASE + '/public-records/INVALID', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 400, 'status=' + res.status);
  const body = await res.json();
  assert(body.error === 'invalid_incident_id', 'error=' + body.error);
  assertNoSecrets(body, '400 response');
});

await runTest('GET /latest-run returns fallback response', async () => {
  const req = new MockRequest(BASE + '/latest-run', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.source === 'fallback_local', 'source=' + body.source);
  assertNoSecrets(body, 'latest-run response');
});

await runTest('GET /sources returns 7 fallback sources', async () => {
  const req = new MockRequest(BASE + '/sources', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.source === 'fallback_local', 'source=' + body.source);
  assert(body.count === 7, 'count=' + body.count);
  assert(Array.isArray(body.sources), 'sources should be array');
  assert(body.sources.length === 7, 'sources.length=' + body.sources.length);
  // Verify all sources are green tier
  const allGreen = body.sources.every(s => s.risk_tier === 'green');
  assert(allGreen, 'all sources should be green tier');
  assertNoSecrets(body, 'sources response');
});

// ── Test Group 2: Mocked Supabase success mode ───────────────────────────────
// Mock fetch to simulate successful Supabase responses

let mockFetchCalls = [];
let mockFetchResponse = null;

function installMockFetch(response) {
  mockFetchCalls = [];
  mockFetchResponse = response;
  global.fetch = async (url, init) => {
    mockFetchCalls.push({ url, init });
    if (mockFetchResponse) {
      return mockFetchResponse;
    }
    throw new Error('mock fetch not configured');
  };
}

function uninstallMockFetch() {
  global.fetch = () => Promise.reject(new Error('fetch not available'));
  mockFetchCalls = [];
  mockFetchResponse = null;
}

function createMockResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

await runTest('Mocked Supabase: GET /public-records returns live data', async () => {
  const mockRecords = [
    { incident_id: 'INC-0001', title: 'Test Record 1', date: '2023-01-01', record_type: 'incident', severity: 'medium' },
    { incident_id: 'INC-0013', title: 'Test Record 13', date: '2025-05-13', record_type: 'guidance', severity: 'medium' },
  ];
  installMockFetch(createMockResponse(mockRecords));

  const req = new MockRequest(BASE + '/public-records', { method: 'GET' });
  const env = {
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'test-key',
  };
  const res = await worker.fetch(req, env);

  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.source === 'supabase', 'source=' + body.source);
  assert(body.count === 2, 'count=' + body.count);
  assertNoSecrets(body, 'mocked supabase response');

  uninstallMockFetch();
});

await runTest('Mocked Supabase: GET /public-records/INC-0001 returns record', async () => {
  const mockRecord = [
    { incident_id: 'INC-0001', title: 'Test Record', date: '2023-01-01', record_type: 'incident', severity: 'medium' },
  ];
  installMockFetch(createMockResponse(mockRecord));

  const req = new MockRequest(BASE + '/public-records/INC-0001', { method: 'GET' });
  const env = {
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'test-key',
  };
  const res = await worker.fetch(req, env);

  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.found === true, 'found=' + body.found);
  assert(body.source === 'supabase', 'source=' + body.source);
  assert(body.record.incident_id === 'INC-0001', 'incident_id mismatch');
  assertNoSecrets(body, 'mocked single record response');

  uninstallMockFetch();
});

await runTest('Mocked Supabase: GET /latest-run returns run data', async () => {
  const mockRun = [
    { run_timestamp: '2026-05-21T10:00:00Z', mode: 'scheduled', sources_ok: 5, sources_failed: 0 },
  ];
  installMockFetch(createMockResponse(mockRun));

  const req = new MockRequest(BASE + '/latest-run', { method: 'GET' });
  const env = {
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'test-key',
  };
  const res = await worker.fetch(req, env);

  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.found === true, 'found=' + body.found);
  assert(body.source === 'supabase', 'source=' + body.source);
  assert(body.run.mode === 'scheduled', 'mode=' + body.run.mode);
  assertNoSecrets(body, 'mocked latest-run response');

  uninstallMockFetch();
});

await runTest('Mocked Supabase: GET /sources returns source data', async () => {
  const mockSources = [
    { source_id: 'ico', label: 'ICO UK', adapter_name: 'ico-adapter', risk_tier: 'green', enabled: true },
    { source_id: 'ftc', label: 'FTC US', adapter_name: 'ftc-adapter', risk_tier: 'green', enabled: true },
  ];
  installMockFetch(createMockResponse(mockSources));

  const req = new MockRequest(BASE + '/sources', { method: 'GET' });
  const env = {
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'test-key',
  };
  const res = await worker.fetch(req, env);

  assert(res.status === 200, 'status=' + res.status);
  const body = await res.json();
  assert(body.source === 'supabase', 'source=' + body.source);
  assert(body.count === 2, 'count=' + body.count);
  assertNoSecrets(body, 'mocked sources response');

  uninstallMockFetch();
});

// ── Test Group 3: Mocked Supabase failure mode ───────────────────────────────

await runTest('Mocked Supabase failure: GET /public-records returns sanitized error', async () => {
  installMockFetch({ ok: false, status: 500, json: async () => { throw new Error('bad json'); }, text: async () => 'Internal Server Error with secret=eyJhbGciOiJIUzI1NiIs' });

  const req = new MockRequest(BASE + '/public-records', { method: 'GET' });
  const env = {
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'test-key',
  };
  const res = await worker.fetch(req, env);

  assert(res.status === 200, 'status=' + res.status); // Worker returns 200 with error payload
  const body = await res.json();
  assert(body.source === 'supabase_error', 'source=' + body.source);
  assert(body.error, 'error field should be present');
  // Verify JWT was redacted
  const errorJson = JSON.stringify(body.error);
  assert(!errorJson.includes('eyJhbGci'), 'JWT should be redacted in error');
  assertNoSecrets(body, 'error response');

  uninstallMockFetch();
});

// ── Test Group 4: POST /watch/run disabled ───────────────────────────────────

await runTest('POST /watch/run returns 403 when ENABLE_WATCH_RUNS not set', async () => {
  const req = new MockRequest(BASE + '/watch/run', { method: 'POST' });
  const res = await worker.fetch(req, {});
  assert(res.status === 403, 'status=' + res.status);
  const body = await res.json();
  assert(body.error === 'disabled', 'error=' + body.error);
  assertNoSecrets(body, 'watch run disabled response');
});

await runTest('POST /watch/run returns 403 when ENABLE_WATCH_RUNS=false', async () => {
  const req = new MockRequest(BASE + '/watch/run', { method: 'POST' });
  const res = await worker.fetch(req, { ENABLE_WATCH_RUNS: 'false' });
  assert(res.status === 403, 'status=' + res.status);
  assertNoSecrets(await res.json(), 'watch run false response');
});

await runTest('POST /watch/run returns 202 when ENABLE_WATCH_RUNS=true', async () => {
  const req = new MockRequest(BASE + '/watch/run', { method: 'POST' });
  const res = await worker.fetch(req, { ENABLE_WATCH_RUNS: 'true' });
  assert(res.status === 202, 'status=' + res.status);
  const body = await res.json();
  assert(body.status === 'accepted', 'status=' + body.status);
  assertNoSecrets(body, 'watch run accepted response');
});

// ── Test Group 5: OPTIONS and 404 ────────────────────────────────────────────

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
  assertNoSecrets(body, '404 response');
});

await runTest('Unknown route POST returns 404', async () => {
  const req = new MockRequest(BASE + '/unknown-route', { method: 'POST' });
  const res = await worker.fetch(req, {});
  assert(res.status === 404, 'status=' + res.status);
});

// ── Summary ───────────────────────────────────────────────────────────────────
process.stdout.write('\n');
process.stdout.write('test-cloudflare-worker-local: ' + passed + ' passed, ' + failed + ' failed\n');
if (failed > 0) process.exit(1);
