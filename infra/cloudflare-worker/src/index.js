// Caesar AI Incident Atlas — Cloudflare Worker with Supabase integration (T058)
// Routes: GET /health, GET /status, GET /public-records, GET /public-records/:id
//         GET /latest-run, GET /sources, POST /watch/run (disabled by default)
// OPTIONS preflight, 404 for unknown routes
//
// Supabase integration: reads from atlas_public_records, atlas_watch_runs, atlas_sources
// Safe fallback when SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not provided
// No secrets in responses. Sanitized error handling.

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ── Helper: safe JSON response ─────────────────────────────────────────────
function safeJson(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

// ── Helper: sanitized error (no secrets, no upstream details) ─────────────────
function sanitizeError(error) {
  const message = error?.message || String(error);
  // Never expose JWTs, keys, or raw upstream bodies
  const sanitized = message
    // Full JWT pattern (header.payload.signature)
    .replace(/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/g, '[REDACTED_JWT]')
    // JWT header prefix only (eyJ...)
    .replace(/eyJ[A-Za-z0-9_-]{10,}/g, '[REDACTED_JWT]')
    // Long base64-like strings that could be keys
    .replace(/[A-Za-z0-9_-]{40,}/g, '[REDACTED]');
  return { error: 'upstream_error', message: sanitized };
}

// ── Helper: 404 response ───────────────────────────────────────────────────
function notFound(path) {
  return safeJson({ error: 'not_found', path }, 404);
}

// ── Helper: get Supabase config from env ─────────────────────────────────────
function getSupabaseConfig(env) {
  const url = env.SUPABASE_URL || '';
  const key = env.SUPABASE_SERVICE_ROLE_KEY || '';
  const hasConfig = url.length > 0 && key.length > 0;
  return { url, key, hasConfig };
}

// ── Helper: Supabase REST fetch ──────────────────────────────────────────────
async function supabaseFetch(env, table, { select = '*', limit = null, order = null, eq = null } = {}) {
  const { url, key, hasConfig } = getSupabaseConfig(env);
  if (!hasConfig) {
    throw new Error('Supabase not configured');
  }

  let query = `${url}/rest/v1/${table}?select=${encodeURIComponent(select)}`;
  if (eq) {
    const [col, val] = eq;
    query += `&${encodeURIComponent(col)}=eq.${encodeURIComponent(val)}`;
  }
  if (order) {
    query += `&order=${encodeURIComponent(order)}`;
  }
  if (limit) {
    query += `&limit=${limit}`;
  }

  const res = await fetch(query, {
    method: 'GET',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase HTTP ${res.status}: ${text.slice(0, 100)}`);
  }

  return res.json();
}

// ── Helper: list public records (with fallback) ──────────────────────────────
async function listPublicRecords(env) {
  const { hasConfig } = getSupabaseConfig(env);
  if (!hasConfig) {
    // Fallback: return safe stub data
    return {
      source: 'fallback_local',
      records: [
        { incident_id: 'INC-0001', title: 'Mata v. Avianca — fabricated court citations', date: '2023-05-01', record_type: 'incident', severity: 'medium' },
        { incident_id: 'INC-0002', title: 'Autonomous vehicle pedestrian fatality (NTSB)', date: '2018-03-18', record_type: 'incident', severity: 'critical' },
        { incident_id: 'INC-0003', title: 'Air Canada chatbot contract liability', date: '2024-02-14', record_type: 'incident', severity: 'medium' },
        { incident_id: 'INC-0004', title: 'Dutch SyRI welfare benefits system (Hague)', date: '2020-02-05', record_type: 'incident', severity: 'high' },
        { incident_id: 'INC-0005', title: 'Facial recognition wrongful arrest', date: '2020-01-01', record_type: 'incident', severity: 'high' },
        { incident_id: 'INC-0006', title: 'AI recruitment tool gender bias discontinued', date: '2018-10-01', record_type: 'incident', severity: 'medium' },
        { incident_id: 'INC-0007', title: 'Content moderation over-removal COVID-19', date: '2020-03-01', record_type: 'incident', severity: 'medium' },
        { incident_id: 'INC-0008', title: 'AI image generation NCII platform restrictions', date: '2024-01-01', record_type: 'incident', severity: 'high' },
        { incident_id: 'INC-0009', title: 'Healthcare algorithm racial bias resource allocation', date: '2019-01-01', record_type: 'incident', severity: 'high' },
        { incident_id: 'INC-0010', title: 'EEOC guidance AI hiring tools discrimination risk', date: '2023-05-18', record_type: 'guidance', severity: 'medium' },
        { incident_id: 'INC-0011', title: 'Spirometry race correction medical guideline', date: '2023-01-01', record_type: 'incident', severity: 'high' },
        { incident_id: 'INC-0012', title: 'AI hiring tools disability discrimination guidance', date: '2022-05-12', record_type: 'guidance', severity: 'medium' },
        { incident_id: 'INC-0013', title: 'EDPB automated decision-making and profiling guidance', date: '2025-05-13', record_type: 'guidance', severity: 'medium' },
      ],
      count: 13,
      latest: 'INC-0013',
      note: 'Fallback mode — Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable live data.',
    };
  }

  try {
    const rows = await supabaseFetch(env, 'atlas_public_records', {
      select: 'incident_id,title,date,sector,severity,confidence,failure_modes,record_type',
      order: 'incident_id',
    });
    return {
      source: 'supabase',
      records: rows,
      count: rows.length,
      latest: rows.length > 0 ? rows[rows.length - 1].incident_id : null,
    };
  } catch (err) {
    return {
      source: 'supabase_error',
      error: sanitizeError(err),
      count: 0,
      note: 'Supabase query failed. Check configuration and table existence.',
    };
  }
}

// ── Helper: get single public record ─────────────────────────────────────────
async function getPublicRecord(env, incidentId) {
  const { hasConfig } = getSupabaseConfig(env);
  if (!hasConfig) {
    // Fallback: find in stub data
    const fallback = await listPublicRecords(env);
    const record = fallback.records.find(r => r.incident_id === incidentId);
    if (!record) {
      return { found: false, incident_id: incidentId, note: 'Not found in fallback data' };
    }
    return { found: true, source: 'fallback_local', record };
  }

  try {
    const rows = await supabaseFetch(env, 'atlas_public_records', {
      select: 'incident_id,title,date,sector,severity,confidence,failure_modes,record_type',
      eq: ['incident_id', incidentId],
      limit: 1,
    });
    if (rows.length === 0) {
      return { found: false, incident_id: incidentId };
    }
    return { found: true, source: 'supabase', record: rows[0] };
  } catch (err) {
    return {
      found: false,
      incident_id: incidentId,
      error: sanitizeError(err),
      note: 'Supabase query failed',
    };
  }
}

// ── Helper: get latest run ────────────────────────────────────────────────────
async function getLatestRun(env) {
  const { hasConfig } = getSupabaseConfig(env);
  if (!hasConfig) {
    const fallback = env.LATEST_RUN_JSON
      ? JSON.parse(env.LATEST_RUN_JSON)
      : {
          note: 'No hosted run data yet. Supabase integration pending.',
          automation_mode: 'manual_local',
          integration_status: 'local_fallback',
        };
    return { source: 'fallback_local', ...fallback };
  }

  try {
    const rows = await supabaseFetch(env, 'atlas_watch_runs', {
      select: 'run_timestamp,mode,sources_ok,sources_failed,sources_skipped,detected_candidates,promotion_eligible,errors_count',
      order: 'run_timestamp.desc',
      limit: 1,
    });
    if (rows.length === 0) {
      return { found: false, note: 'No watch runs in Supabase yet' };
    }
    return { found: true, source: 'supabase', run: rows[0] };
  } catch (err) {
    return {
      found: false,
      error: sanitizeError(err),
      note: 'Supabase query failed',
    };
  }
}

// ── Helper: list sources ─────────────────────────────────────────────────────
async function listSources(env) {
  const { hasConfig } = getSupabaseConfig(env);
  if (!hasConfig) {
    return {
      source: 'fallback_local',
      sources: [
        { source_id: 'ico', label: 'ICO UK', adapter_name: 'ico-adapter', risk_tier: 'green', enabled: true },
        { source_id: 'ftc', label: 'FTC US', adapter_name: 'ftc-adapter', risk_tier: 'green', enabled: true },
        { source_id: 'cnil', label: 'CNIL France', adapter_name: 'cnil-adapter', risk_tier: 'green', enabled: true },
        { source_id: 'edpb', label: 'EDPB', adapter_name: 'edpb-adapter', risk_tier: 'green', enabled: true },
        { source_id: 'eu-commission', label: 'EU Commission', adapter_name: 'eu-commission-adapter', risk_tier: 'green', enabled: true },
        { source_id: 'cjeu', label: 'CJEU', adapter_name: 'generic-official-adapter', risk_tier: 'green', enabled: true },
        { source_id: 'iapp', label: 'IAPP', adapter_name: 'generic-official-adapter', risk_tier: 'green', enabled: true },
      ],
      count: 7,
      note: 'Fallback mode — Supabase not configured',
    };
  }

  try {
    const rows = await supabaseFetch(env, 'atlas_sources', {
      select: 'source_id,label,adapter_name,risk_tier,enabled',
      order: 'source_id',
    });
    return {
      source: 'supabase',
      sources: rows,
      count: rows.length,
    };
  } catch (err) {
    return {
      source: 'supabase_error',
      error: sanitizeError(err),
      count: 0,
      note: 'Supabase query failed',
    };
  }
}

// ── Main Worker export ───────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const buildHealthPayload = () => {
      const { hasConfig } = getSupabaseConfig(env);
      return {
        ok: true,
        status: 'ok',
        app: 'caesar-ai-incident-atlas',
        service: 'caesar-ai-incident-atlas-worker',
        version: '0.2.0',
        supabase_connected: hasConfig,
        live_ingestion_enabled: false,
        timestamp: new Date().toISOString(),
      };
    };

    const buildReadyPayload = () => {
      const { hasConfig } = getSupabaseConfig(env);
      return {
        ok: hasConfig,
        ready: hasConfig,
        checks: { supabase_configured: hasConfig },
        note: hasConfig ? 'Supabase configured' : 'Supabase not configured — fallback mode',
      };
    };

    const buildVersionPayload = () => ({
      app: 'caesar-ai-incident-atlas',
      worker: env.WORKER_NAME || 'incident-atlas-monitor-dev',
      runtime_env: env.RUNTIME_ENV || 'dev',
      version: '0.2.0',
      git_sha: env.GIT_SHA || null,
      build_time: env.BUILD_TIME || null,
    });

    // GET /health, /healthz
    if (request.method === 'GET' && (pathname === '/health' || pathname === '/healthz')) {
      return safeJson(buildHealthPayload());
    }

    if (request.method === 'GET' && pathname === '/readyz') {
      const payload = buildReadyPayload();
      return safeJson(payload, payload.ready ? 200 : 503);
    }

    if (request.method === 'GET' && pathname === '/version') {
      return safeJson(buildVersionPayload());
    }

    // GET /status
    if (request.method === 'GET' && pathname === '/status') {
      const { hasConfig } = getSupabaseConfig(env);
      const opsStatus = env.OPS_STATUS_JSON
        ? JSON.parse(env.OPS_STATUS_JSON)
        : {
            automation_mode: 'manual_local',
            public_record_count: 13,
            latest_public_record_id: 'INC-0013',
            worker_api_status: hasConfig ? 'supabase_connected' : 'local_fallback',
            note: hasConfig ? 'Supabase connected' : 'Static fallback — Supabase not configured',
          };
      return safeJson(opsStatus);
    }

    // GET /public-records
    if (request.method === 'GET' && pathname === '/public-records') {
      const result = await listPublicRecords(env);
      return safeJson(result);
    }

    // GET /public-records/:incident_id
    if (request.method === 'GET' && pathname.startsWith('/public-records/')) {
      const incidentId = pathname.replace('/public-records/', '');
      // Validate incident_id format (INC-NNNN)
      if (!/^INC-\d{4}$/.test(incidentId)) {
        return safeJson({ error: 'invalid_incident_id', incident_id: incidentId }, 400);
      }
      const result = await getPublicRecord(env, incidentId);
      if (!result.found) {
        return safeJson({ error: 'not_found', incident_id: incidentId }, 404);
      }
      return safeJson(result);
    }

    // GET /latest-run
    if (request.method === 'GET' && pathname === '/latest-run') {
      const result = await getLatestRun(env);
      return safeJson(result);
    }

    // GET /sources
    if (request.method === 'GET' && pathname === '/sources') {
      const result = await listSources(env);
      return safeJson(result);
    }

    // POST /watch/run — disabled unless ENABLE_WATCH_RUNS=true
    if (request.method === 'POST' && pathname === '/watch/run') {
      const enabled = env.ENABLE_WATCH_RUNS === 'true';
      if (!enabled) {
        return safeJson({
          error: 'disabled',
          message: 'Scheduled watch runs are disabled. Set ENABLE_WATCH_RUNS=true to enable.',
        }, 403);
      }
      // Future: trigger watch pipeline via Supabase edge function or GitHub Action dispatch
      return safeJson({
        status: 'accepted',
        message: 'Watch run triggered (stub — implement pipeline call here).',
        timestamp: new Date().toISOString(),
      }, 202);
    }

    // Unknown route
    return notFound(pathname);
  },
};
