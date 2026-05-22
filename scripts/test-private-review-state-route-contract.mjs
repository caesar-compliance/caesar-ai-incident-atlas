// test-private-review-state-route-contract.mjs (T071)
// Verifies that the new GET /private/review-state/latest and POST /private/review-state/sync-dry-run
// respond correctly according to the T071 route contract.

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

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
    return JSON.parse(this._body);
  }
}

global.Request  = MockRequest;
global.Response = MockResponse;
global.URL      = URL;

const workerPath = path.join(ROOT, 'infra', 'cloudflare-worker', 'src', 'index.js');
const { default: worker } = await import(workerPath);

let passed = 0;
let failed = 0;

async function runTest(label, fn) {
  try {
    await fn();
    console.log(`PASS: ${label}`);
    passed++;
  } catch (err) {
    console.log(`FAIL: ${label} — ${err.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

const BASE = 'https://worker.local';

// 1. GET /private/review-state/latest
await runTest('GET /private/review-state/latest contract response', async () => {
  const req = new MockRequest(BASE + '/private/review-state/latest', { method: 'GET' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, `Expected status 200, got ${res.status}`);
  const body = await res.json();
  assert(body.status === 'dry_run_only', `Expected dry_run_only, got ${body.status}`);
  assert(body.sync_status === 'hosted_private_sync_readiness_prepared', `Unexpected sync_status: ${body.sync_status}`);
  assert(body.publication_blocked === true, 'publication_blocked should be true');
  assert(body.remote_write_attempted === false, 'remote_write_attempted should be false');
});

// 2. POST /private/review-state/sync-dry-run
await runTest('POST /private/review-state/sync-dry-run contract response', async () => {
  const req = new MockRequest(BASE + '/private/review-state/sync-dry-run', { method: 'POST', body: '{}' });
  const res = await worker.fetch(req, {});
  assert(res.status === 200, `Expected status 200, got ${res.status}`);
  const body = await res.json();
  assert(body.status === 'dry_run_only', `Expected dry_run_only, got ${body.status}`);
  assert(body.sync_status === 'hosted_private_sync_readiness_prepared', `Unexpected sync_status: ${body.sync_status}`);
  assert(body.publication_blocked === true, 'publication_blocked should be true');
  assert(body.remote_write_attempted === false, 'remote_write_attempted should be false');
});

console.log(`\ntest-private-review-state-route-contract: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
