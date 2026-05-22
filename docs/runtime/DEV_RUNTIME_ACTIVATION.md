# Dev runtime activation — Incident Atlas

Workflow: `.github/workflows/dev-runtime-activate.yml`
Worker: `incident-atlas-monitor-dev`
Supabase: `caesar-incident-atlas-dev`

## Supported capabilities

| Capability | Status |
|------------|--------|
| Schema SQL | Yes — `infra/supabase/schema.sql` |
| Schema apply (gated) | Yes — `APPLY_SUPABASE_SCHEMA=true node scripts/runtime/apply-supabase-schema.mjs` |
| DB health | Yes — `node scripts/runtime/check-runtime-db-health.mjs` |
| Worker deploy | Yes — `infra/cloudflare-worker/` |
| `/healthz` `/readyz` `/version` | Yes (+ `/health` alias) |
| Dry-run hosted sync | Yes — `node scripts/sync-supabase-hosted.mjs` |
| Live push | Operator only — `sync-supabase-hosted.mjs --push` (5 guards); workflow blocks `run_live_ingestion_once=YES` |
| Dev seed | Documented no-op — use bootstrap export scripts |
| Cron | Partial — wrangler cron can be enabled; no `scheduled()` handler |

## First safe activation

1. `node scripts/test-cloudflare-worker-local.mjs`
2. `node scripts/runtime/check-service-credentials.mjs`
3. `node scripts/runtime/runtime-smoke.mjs`
4. CI validation → `apply_schema=YES` → `deploy_worker=YES` + smoke

## Unsupported

- DNS/custom routes
- Default hosted push
- UptimeRobot Worker monitor until URL known

## Rollback

Worker rollback in Cloudflare; schema manual in Supabase.
