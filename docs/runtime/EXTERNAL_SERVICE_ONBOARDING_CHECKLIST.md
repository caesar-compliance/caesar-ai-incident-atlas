# External service onboarding checklist — Incident Atlas

**Account:** Account B  
**Supabase project:** `caesar-incident-atlas-dev`  
**Cloudflare worker:** `incident-atlas-monitor-dev`  

---

## 1. Supabase Free

1. **Account B** login (hub local map).
2. Project **`caesar-incident-atlas-dev`**.
3. Fill `.env.runtime.local` from `.env.runtime.example`.
4. Set **new Supabase API keys** in `.env.runtime.local`:
   - `SUPABASE_API_KEY_MODE=new`
   - `SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_...`)
   - `SUPABASE_SECRET_KEY` (`sb_secret_...`) — never commit
5. Legacy `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` in `.env` are **optional fallback** for `preflight-hosted-activation.mjs`.
6. For legacy hosted scripts, also maintain `.env` from `.env.example` (same values locally when activating).
7. Keep `APPLY_SUPABASE_SCHEMA=false`, `ATLAS_HOSTED_SYNC_MODE=dry_run`, `ATLAS_CONFIRM_HOSTED_SYNC` unset.

```bash
node scripts/runtime/check-service-credentials.mjs
node scripts/preflight-hosted-activation.mjs
node scripts/validate-supabase-schema.mjs
```

---

## 2. Cloudflare Free

1. Account B — API token + account ID in `.env.cloudflare.local`.
2. Worker name: `incident-atlas-monitor-dev`.
3. `wrangler.toml` stays gitignored; copy from `infra/cloudflare-worker/wrangler.example.toml` locally.
4. `node scripts/test-cloudflare-worker-local.mjs` — local scaffold only.

---

## Out of scope

- Hosted sync push, migration apply on remote, Worker deploy, watch runs enable
