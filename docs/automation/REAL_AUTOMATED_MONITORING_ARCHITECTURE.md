# Real Automated Monitoring Architecture

**Status:** Decided — T056 (21 May 2026)

## Layer decisions

| Layer | Technology | Role | Status |
|---|---|---|---|
| Public frontend | Static site (`site/`) | Read-only public dataset browser | Live |
| Source of truth | Git repo JSON | Approved public records | Live |
| Operational DB | Supabase (Postgres) | Candidates / runs / drafts / reviews | Schemed, not connected |
| API / cron edge | Cloudflare Workers | REST export, scheduled trigger | Skeleton, not deployed |
| Build & deploy | GitHub Actions | Pages deploy, CI validation | Live |
| SaaS dashboard | — | Not in scope now | Deferred |

## Decision log

1. **Static site stays public frontend.** No JS framework, no SSR.
2. **Repo is source of truth** for all approved public records. `data/incidents/` + `data/incident-index.json` are canonical.
3. **Supabase** is the recommended operational DB for candidates, watch runs, drafts, and review state. Schema defined in `infra/supabase/schema.sql`. No connection configured yet.
4. **Cloudflare Worker** is the recommended API/cron edge layer. Skeleton in `infra/cloudflare-worker/`. Not deployed.
5. **GitHub Actions** continues as deploy/build layer only. No production cron enabled.
6. **Public site consumes static exported ops JSON first.** `site/data/ops/latest-status.json` is written by `scripts/export-ops-status.mjs` and served statically. No backend calls from the public site.
7. **Live DB/API integration is gated on secrets being configured** in a future task.
8. **No SaaS dashboard now.** Data is public JSON; dashboard layer deferred.

## Data flow (current)

```
watch-green-sources → data/watch/runs/
classify / dedupe / draft / packet / shortlist
  ↓
export-ops-status.mjs
  ↓
site/data/ops/latest-status.json  ← public site reads this
data/ops/latest-status.json       ← internal ops copy
```

## Data flow (future — hosted)

```
Cloudflare Worker cron → Supabase (atlas_watch_runs, atlas_candidates)
                        → GitHub Action trigger (optional)
                        → export ops JSON → Cloudflare R2 or repo
Public site → fetch /api/status (Worker) or static JSON fallback
```

## Hard invariants

- No credentials in repo.
- `site/` is the only directory published to GitHub Pages.
- `data/ops/` and `data/watch/` are internal — never published directly.
- `site/data/ops/` contains only sanitised, safe ops status JSON.
- Scheduled automation requires explicit `ENABLE_WATCH_RUNS=true` env flag.
