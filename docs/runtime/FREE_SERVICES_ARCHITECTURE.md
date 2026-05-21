# Free services architecture — Incident Atlas runtime

**Date:** 21 May 2026  
**Policy:** Caesar AI Governance Hub — `docs/operations/EXTERNAL_SERVICES_ACCOUNT_POLICY.md`

## Account allocation

Caesar AI Incident Atlas uses **Account B**:

- **Supabase project (dev):** `caesar-incident-atlas-dev`
- **Schema:** `public` (existing `infra/supabase/schema.sql`)
- **Cloudflare worker:** `incident-atlas-monitor-dev`
- **Legacy env:** `.env` for `scripts/preflight-hosted-activation.mjs` — preserved; T001 adds `.env.runtime.local` / `.env.cloudflare.local`

## Free-tier services map

| Service | Role | Incident Atlas usage |
| :--- | :--- | :--- |
| **Supabase Free** | Hosted Postgres sync | Private review pipeline bootstrap (existing scripts) |
| **Cloudflare Free** | Worker scaffold | Watch-run trigger scaffold — deploy disabled in T001 |
| **GitHub Pages** | Public ops surface | Public ops JSON exports |

## Secret handling

- **Supabase (preferred):** `SUPABASE_PUBLISHABLE_KEY` + `SUPABASE_SECRET_KEY` with `SUPABASE_API_KEY_MODE=new`.
- **Legacy fallback:** JWT anon/service_role in `.env` for hosted scripts — optional only.
- **Never** commit `SUPABASE_SECRET_KEY` or use it in client/browser code.
- Account B credentials in ignored env files only
- `data/ops/runtime-services-readiness.json` — metadata only

## Safety defaults

- T001 flags: `ENABLE_*`, `APPLY_SUPABASE_SCHEMA`, Cloudflare deploy/cron — all false
- Existing: `ATLAS_HOSTED_SYNC_MODE=dry_run`, `ENABLE_WATCH_RUNS=false`

## Commands

```bash
node scripts/runtime/check-service-credentials.mjs
node scripts/preflight-hosted-activation.mjs
```

Separate flows — do not merge hosted activation into runtime checker.
