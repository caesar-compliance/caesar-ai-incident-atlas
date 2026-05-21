# T058 Decisions

## DEC-132 — Worker Supabase Integration Safety Model

**Status:** Approved

**Decision:**
The Cloudflare Worker implements a dual-mode architecture:
1. Fallback mode when SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing — returns safe local mock data
2. Live mode when both env vars are present — queries Supabase REST API

**Rationale:**
- Safe local testing without credentials
- No code changes required to switch between modes
- Prevents crashes when env is not configured
- Supports gradual migration from local to hosted

---

## DEC-133 — Error Sanitization in Worker

**Status:** Approved

**Decision:**
All errors from Supabase or upstream sources are sanitized through `sanitizeError()` before being returned in JSON responses. JWT-like tokens are redacted with `[REDACTED_JWT]` and long base64 strings with `[REDACTED]`.

**Rationale:**
- Prevents accidental exposure of service role keys in error messages
- Protects against information leakage through error responses
- Maintains security even when upstream errors occur

---

## DEC-134 — Read-Only Worker Routes

**Status:** Approved

**Decision:**
Worker routes are read-only (GET only) except for POST /watch/run, which is disabled by default (returns 403) unless ENABLE_WATCH_RUNS=true.

**Rationale:**
- No insert/update/delete from Worker in this task
- POST /watch/run is a trigger, not a data mutation endpoint
- Maintains safety boundary for public API

---

## DEC-135 — Guarded Live Probe

**Status:** Approved

**Decision:**
The live probe script requires 3 explicit conditions to run read-only probes:
1. SUPABASE_URL set
2. SUPABASE_SERVICE_ROLE_KEY set
3. ATLAS_CONFIRM_HOSTED_SYNC=YES

Without all 3, it skips and writes mode: "skipped_no_env".

**Rationale:**
- Prevents accidental live probes in CI or local dev
- Requires explicit confirmation before touching remote database
- Never writes to Supabase (read-only)

---

## DEC-136 — Fallback Data Safety

**Status:** Approved

**Decision:**
Fallback data includes only metadata fields that are already public in incident-index.json. No raw HTML, no candidate internals, no draft content, no packet details.

**Rationale:**
- Fallback mode should not expose more than production mode
- Consistent with "metadata-only retention by default" policy
- Matches public site data exposure level
