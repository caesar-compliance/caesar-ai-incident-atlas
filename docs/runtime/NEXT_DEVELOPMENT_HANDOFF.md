# Incident Atlas — Next development handoff

**Frozen:** 22 May 2026 (T014 closeout)  
**Branch:** `main` @ `c9d2985`  
**Status:** Runtime scaffold ready — **not** activated (no CI schema apply, no Worker deploy).

## 1. Current state

| Item | Status |
|------|--------|
| GitHub `dev-runtime` environment | Prepared (per T012) |
| Supabase schema applied (dev via CI) | **No** |
| Cloudflare Worker deployed | **No** |
| UptimeRobot Worker monitor | **Disabled** |
| Hosted Supabase push | **Operator-only** (guarded scripts) |
| Local Worker / schema validation | **Pass** (T014) |

## 2. Runtime infrastructure

| Resource | Value |
|----------|--------|
| Supabase project | `caesar-incident-atlas-dev` |
| Schema | `public` (`infra/supabase/schema.sql`) |
| Cloudflare Worker | `incident-atlas-monitor-dev` |
| GitHub environment | `dev-runtime` |
| UptimeRobot (public) | Site + RSS monitors **live** |
| UptimeRobot (Worker) | `incident-atlas-worker-healthz` — **disabled** |

## 3. Exact next steps

Mirror Regulation Watch activation order.

### Step 1 — Local validation

```bash
node scripts/runtime/check-service-credentials.mjs
node scripts/validate-supabase-schema.mjs
node scripts/test-cloudflare-worker-local.mjs
node scripts/runtime/runtime-smoke.mjs
```

### Step 2 — CI validation-only

```bash
gh workflow run dev-runtime-activate.yml \
  --repo caesar-compliance/caesar-ai-incident-atlas \
  -f confirm=ACTIVATE_DEV_RUNTIME \
  -f apply_schema=NO \
  -f deploy_worker=NO \
  -f set_worker_secrets=NO \
  -f enable_cron=NO \
  -f run_dry_ingestion=YES \
  -f enable_network=NO \
  -f run_live_ingestion_once=NO \
  -f post_deploy_smoke=NO
```

### Step 3 — Schema apply (Session Pooler URL in GitHub)

```bash
gh workflow run dev-runtime-activate.yml ... -f apply_schema=YES -f deploy_worker=NO ...
```

### Step 4 — Worker deploy + smoke

```bash
gh workflow run dev-runtime-activate.yml ... -f deploy_worker=YES -f set_worker_secrets=YES -f post_deploy_smoke=YES ...
```

### Step 5 — UptimeRobot Worker monitor

Enable `incident-atlas-worker-healthz` in governance hub after Worker URL is known.

### First product tasks (after infrastructure)

1. **Candidate intake** — metadata-only candidate records.
2. **Review / promotion flow** — draft → reviewed → promoted (no default hosted push).
3. **Dry-run hosted sync** — `node scripts/sync-supabase-hosted.mjs` (no `--push` without operator).

## 4. What must remain gated

| Gate | Rule |
|------|------|
| Schema apply | CI gated |
| Hosted push | `sync-supabase-hosted.mjs --push` operator-only |
| Live ingestion | Workflow blocks `run_live_ingestion_once=YES` |
| Cron | No handler until `scheduled()` implemented |
| DNS / routes | No custom domains |

## 5. Product direction

Curated **AI incident / case database**: candidates, review, promotion to public atlas. Static site + optional hosted data; Worker supports monitoring metadata, not bulk legal ingestion.

## 6. AI agent instructions

1. Work from `main` @ `c9d2985` or later.
2. Read `docs/runtime/DEV_RUNTIME_ACTIVATION.md` and this file.
3. Never commit `.env.*.local` or push production data without approval.
4. Final report required.

## References

- `docs/runtime/DEV_RUNTIME_ACTIVATION.md`
- `infra/supabase/schema.sql`
