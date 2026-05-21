# Dev runtime activation (GitHub Actions)

Workflow: `.github/workflows/dev-runtime-activate.yml`  
Environment: `dev-runtime`

## What it does

1. Local Worker route tests (`scripts/test-cloudflare-worker-local.mjs`)  
2. Hosted activation preflight (`scripts/preflight-hosted-activation.mjs`) — no deploy  
3. Credential presence check  
4. Optional Worker deploy from `infra/cloudflare-worker/` (no custom routes/DNS)  
5. Worker secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (from `SUPABASE_SECRET_KEY` secret)  
6. Health smoke: `/health` (also tries `/healthz`, `/readyz`)  
7. Dry-run: `scripts/sync-supabase-hosted.mjs` (default dry-run, no remote push)  

**Not in this workflow:** hosted sync `--push` (legacy Control Tower gate), schema apply, production.

## Trigger commands

Default:

```bash
gh workflow run dev-runtime-activate.yml -f confirm=ACTIVATE_DEV_RUNTIME
```

Deploy Worker + smoke:

```bash
gh workflow run dev-runtime-activate.yml \
  -f confirm=ACTIVATE_DEV_RUNTIME \
  -f deploy_worker=YES \
  -f set_worker_secrets=YES \
  -f post_deploy_smoke=YES
```

Dry-run hosted sync only:

```bash
gh workflow run dev-runtime-activate.yml \
  -f confirm=ACTIVATE_DEV_RUNTIME \
  -f deploy_worker=NO \
  -f run_dry_ingestion=YES
```

Cron (dev schedule on deploy):

```bash
gh workflow run dev-runtime-activate.yml \
  -f confirm=ACTIVATE_DEV_RUNTIME \
  -f enable_cron=YES
```

Hosted push (`run_live_ingestion_once=YES`) **fails** — use operator process after CT approval.

## Warnings

- `ENABLE_WATCH_RUNS` stays false in CI materialized env  
- Do not enable hosted sync push without explicit approval and guards

## Rollback

- `wrangler rollback` for dev worker name  
- Hosted data: operator-managed in Supabase

## Gaps

- No automated schema apply script  
- Hosted sync push not wired to workflow inputs yet
