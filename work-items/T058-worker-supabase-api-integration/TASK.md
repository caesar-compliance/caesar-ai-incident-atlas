# T058 — Cloudflare Worker ↔ Supabase API Integration

**Status:** In Progress  
**Branch:** `task/T058-worker-supabase-api-integration`  
**Scope:** Implement real API integration layer between Cloudflare Worker and Supabase

---

## Goal

Turn the T056/T057 Cloudflare Worker and Supabase bootstrap layer into a real API integration layer that is testable locally and ready for hosted deployment, without deploying Cloudflare, without applying remote migrations, without enabling cron, and without committing secrets.

---

## Deliverables

### A. Cloudflare Worker Supabase client layer
- [x] Update `infra/cloudflare-worker/src/index.js` with Supabase integration
- [x] Required routes: GET /health, GET /status, GET /public-records, GET /public-records/:id
- [x] Additional routes: GET /latest-run, GET /sources
- [x] POST /watch/run (disabled by default)
- [x] OPTIONS preflight support
- [x] 404 for unknown routes
- [x] Safe fallback when Supabase env is missing
- [x] Sanitized error handling (no secrets exposed)

### B. Worker Supabase query behavior
- [x] `getSupabaseConfig(env)` — extract config from env
- [x] `supabaseFetch(env, table, options)` — REST API helper
- [x] `listPublicRecords(env)` — query atlas_public_records
- [x] `getPublicRecord(env, incidentId)` — single record lookup
- [x] `getLatestRun(env)` — query atlas_watch_runs
- [x] `listSources(env)` — query atlas_sources
- [x] `safeJson(payload, status)` — safe response helper
- [x] `sanitizeError(error)` — redacts JWTs and secrets from errors

### C. Local mock tests
- [x] Expand `scripts/test-cloudflare-worker-local.mjs`
- [x] Test fallback mode with no Supabase env
- [x] Test mocked Supabase success mode
- [x] Test mocked Supabase failure mode
- [x] Test all routes: health, status, public-records, public-records/INC-0013, public-records/INC-9999, latest-run, sources, watch/run, OPTIONS, unknown route
- [x] Confirm no secrets appear in responses
- [x] Confirm 13 mock/bootstrap records in fallback
- [x] Verify INC-0013 is guidance (not described as enforcement)

### D. Guarded live probe script
- [x] Create `scripts/probe-worker-supabase-live.mjs`
- [x] Default dry-run when env missing
- [x] Read-only REST probes only if all env vars present
- [x] Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ATLAS_CONFIRM_HOSTED_SYNC=YES
- [x] Never print service role key
- [x] Sanitized result to `data/ops/supabase/last-live-probe.json`

### E. Safety validator update
- [x] Update `scripts/validate-hosted-sync-safety.mjs`
- [x] Check Worker does not expose secrets
- [x] Check Worker has sanitizeError function
- [x] Check last-live-probe.json is sanitized

### F. Ops status integration
- [x] Update `scripts/export-ops-status.mjs`
- [x] Add `worker_api_status: "local_supabase_integration_ready"`
- [x] Keep automation_mode non-live

### G. Wrangler example
- [x] Update `infra/cloudflare-worker/wrangler.example.toml`
- [x] Document required env/secrets
- [x] Keep cron disabled/commented

### H. Documentation
- [x] Create work-items/T058/ documentation

---

## Constraints

- No real network calls unless SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided
- No remote Supabase migration/push in this task
- No Cloudflare Worker deployment in this task
- No scheduled cron enablement
- No INC-0014 creation
- No .env committed
- No secrets in responses
- Public root remains site/
- Public count remains 13
- Latest remains INC-0013
