// Caesar AI Incident Atlas — Cloudflare Worker skeleton (T056)
// Routes: GET /health, GET /status, GET /public-records, GET /latest-run
//         POST /watch/run (disabled unless ENABLE_WATCH_RUNS=true)
// No secrets. No deployment in this task.

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function notFound(path) {
  return jsonResponse({ error: 'not_found', path }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, method } = Object.assign(url, { method: request.method });

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // GET /health
    if (request.method === 'GET' && pathname === '/health') {
      return jsonResponse({
        status: 'ok',
        service: 'caesar-ai-incident-atlas-worker',
        version: '0.1.0',
        timestamp: new Date().toISOString(),
      });
    }

    // GET /status
    if (request.method === 'GET' && pathname === '/status') {
      const opsStatus = env.OPS_STATUS_JSON
        ? JSON.parse(env.OPS_STATUS_JSON)
        : {
            automation_mode: 'manual_local',
            public_record_count: 13,
            latest_public_record_id: 'INC-0013',
            note: 'Static fallback — live DB not connected',
          };
      return jsonResponse(opsStatus);
    }

    // GET /public-records
    if (request.method === 'GET' && pathname === '/public-records') {
      // In production: fetch from Supabase atlas_public_records
      // For now: return stub indicating integration is pending
      return jsonResponse({
        source: 'static_stub',
        note: 'Supabase integration pending. Fetch from https://atlas.caesar.no/data/incident-index.json for live data.',
        public_record_count: 13,
        integration_status: 'schema_ready_not_connected',
      });
    }

    // GET /latest-run
    if (request.method === 'GET' && pathname === '/latest-run') {
      const latestRun = env.LATEST_RUN_JSON
        ? JSON.parse(env.LATEST_RUN_JSON)
        : {
            note: 'No hosted run data yet. Supabase integration pending.',
            automation_mode: 'manual_local',
            integration_status: 'schema_ready_not_connected',
          };
      return jsonResponse(latestRun);
    }

    // POST /watch/run — disabled unless ENABLE_WATCH_RUNS=true
    if (request.method === 'POST' && pathname === '/watch/run') {
      const enabled = env.ENABLE_WATCH_RUNS === 'true';
      if (!enabled) {
        return jsonResponse({
          error: 'disabled',
          message: 'Scheduled watch runs are disabled. Set ENABLE_WATCH_RUNS=true to enable.',
        }, 403);
      }
      // Future: trigger watch pipeline via Supabase edge function or GitHub Action dispatch
      return jsonResponse({
        status: 'accepted',
        message: 'Watch run triggered (stub — implement pipeline call here).',
        timestamp: new Date().toISOString(),
      }, 202);
    }

    return notFound(pathname);
  },
};
