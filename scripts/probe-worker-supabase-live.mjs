// probe-worker-supabase-live.mjs (T058)
// Guarded read-only probe of live Supabase from Cloudflare Worker context simulation.
// Default: dry-run / skipped when env missing. Never writes to Supabase.
// Writes sanitized result to data/ops/supabase/last-live-probe.json

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OPS_SUPABASE_DIR = path.join(ROOT, 'data', 'ops', 'supabase');
const PROBE_OUT_PATH   = path.join(OPS_SUPABASE_DIR, 'last-live-probe.json');

const env = {
  SUPABASE_URL:              process.env.SUPABASE_URL              || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  ATLAS_CONFIRM_HOSTED_SYNC: process.env.ATLAS_CONFIRM_HOSTED_SYNC || '',
};

function log(msg) { process.stdout.write(msg + '\n'); }

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function writeJson(p, data) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

// ── Guard evaluation ─────────────────────────────────────────────────────────
const hasUrl     = env.SUPABASE_URL.length > 0;
const hasKey     = env.SUPABASE_SERVICE_ROLE_KEY.length > 0;
const hasConfirm = env.ATLAS_CONFIRM_HOSTED_SYNC === 'YES';
const allGuards  = hasUrl && hasKey && hasConfirm;

const now = new Date().toISOString();

// ── Skip path (env/confirm missing) ──────────────────────────────────────────
if (!allGuards) {
  const missing = [];
  if (!hasUrl) missing.push('SUPABASE_URL');
  if (!hasKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!hasConfirm) missing.push('ATLAS_CONFIRM_HOSTED_SYNC=YES');

  const skipResult = {
    _schema: 'atlas-live-probe/skip/v1',
    executed_at: now,
    mode: 'skipped_no_env',
    remote_read_attempted: false,
    missing_env: missing,
    next_steps: [
      'Set SUPABASE_URL in .env (never commit)',
      'Set SUPABASE_SERVICE_ROLE_KEY in .env (never commit)',
      'Set ATLAS_CONFIRM_HOSTED_SYNC=YES to enable live probe',
    ],
    note: 'This is a guarded live probe. It requires explicit confirmation and credentials to run.',
  };

  writeJson(PROBE_OUT_PATH, skipResult);

  log('probe-worker-supabase-live: SKIP');
  log('  Missing env: ' + missing.join(', '));
  log('  Result: ' + PROBE_OUT_PATH);
  process.exit(0);
}

// ── Live read-only probe path ────────────────────────────────────────────────
log('probe-worker-supabase-live: PROBE MODE');
log('  SUPABASE_URL: [set]');
log('  ATLAS_CONFIRM_HOSTED_SYNC: YES');
log('  Performing read-only probes...');

async function supabaseQuery(table, select, options = {}) {
  let url = `${env.SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(select)}`;
  if (options.order) {
    url += `&order=${encodeURIComponent(options.order)}`;
  }
  if (options.limit) {
    url += `&limit=${options.limit}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json();
}

const probeResults = {
  public_records_count: null,
  sources_count: null,
  latest_watch_run: null,
  errors: [],
};

try {
  // Probe 1: atlas_public_records count
  log('  Probing atlas_public_records...');
  const publicRecords = await supabaseQuery('atlas_public_records', 'incident_id', { limit: 1000 });
  probeResults.public_records_count = publicRecords.length;
  log('    OK: ' + publicRecords.length + ' records');
} catch (err) {
  log('    ERROR: ' + err.message);
  probeResults.errors.push({ table: 'atlas_public_records', message: err.message });
}

try {
  // Probe 2: atlas_sources count
  log('  Probing atlas_sources...');
  const sources = await supabaseQuery('atlas_sources', 'source_id', { limit: 100 });
  probeResults.sources_count = sources.length;
  log('    OK: ' + sources.length + ' sources');
} catch (err) {
  log('    ERROR: ' + err.message);
  probeResults.errors.push({ table: 'atlas_sources', message: err.message });
}

try {
  // Probe 3: latest atlas_watch_run
  log('  Probing atlas_watch_runs (latest)...');
  const runs = await supabaseQuery('atlas_watch_runs', 'run_timestamp,mode,sources_ok,sources_failed', { order: 'run_timestamp.desc', limit: 1 });
  if (runs.length > 0) {
    probeResults.latest_watch_run = {
      run_timestamp: runs[0].run_timestamp,
      mode: runs[0].mode,
      sources_ok: runs[0].sources_ok,
      sources_failed: runs[0].sources_failed,
    };
    log('    OK: latest run at ' + runs[0].run_timestamp);
  } else {
    probeResults.latest_watch_run = null;
    log('    OK: no runs yet');
  }
} catch (err) {
  log('    ERROR: ' + err.message);
  probeResults.errors.push({ table: 'atlas_watch_runs', message: err.message });
}

// ── Sanitize and write result ──────────────────────────────────────────────────
// Never include the service role key or full response bodies
const sanitizedResult = {
  _schema: 'atlas-live-probe/result/v1',
  executed_at: now,
  mode: 'read_only_probe',
  remote_read_attempted: true,
  supabase_url_host: env.SUPABASE_URL.replace(/^https:\/\//, '').replace(/\/.*$/, ''),
  results: {
    public_records_count: probeResults.public_records_count,
    sources_count: probeResults.sources_count,
    latest_watch_run: probeResults.latest_watch_run,
  },
  errors: probeResults.errors.length > 0 ? probeResults.errors.map(e => ({ table: e.table, message: e.message.slice(0, 100) })) : [],
  all_ok: probeResults.errors.length === 0 &&
          probeResults.public_records_count !== null &&
          probeResults.sources_count !== null,
};

writeJson(PROBE_OUT_PATH, sanitizedResult);

log('');
log('probe-worker-supabase-live: ' + (sanitizedResult.all_ok ? 'PROBE OK' : 'PROBE PARTIAL'));
log('  Public records: ' + sanitizedResult.results.public_records_count);
log('  Sources: ' + sanitizedResult.results.sources_count);
log('  Latest run: ' + (sanitizedResult.results.latest_watch_run ? sanitizedResult.results.latest_watch_run.run_timestamp : 'none'));
log('  Result: ' + PROBE_OUT_PATH);

process.exit(sanitizedResult.all_ok ? 0 : 1);
