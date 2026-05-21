# T056 — Decisions

## D-01: Static site consumes static ops JSON, not live API

Rationale: No backend available yet. Export script writes `site/data/ops/latest-status.json`
at pipeline run time. Public site fetches this file. Graceful fallback if missing.

## D-02: Supabase schema defined but not connected

Tables match the pipeline data model (sources, runs, candidates, drafts, packets, public_records, digest_runs).
Integration is gated on secrets being configured in a future task.

## D-03: Cloudflare Worker skeleton with explicit opt-in for watch runs

`POST /watch/run` returns 403 unless `ENABLE_WATCH_RUNS=true` is explicitly set in the Worker env.
Scheduled cron is commented out in `wrangler.example.toml`.

## D-04: Automation mode field in ops status

`automation_mode` in `latest-status.json` is set to `manual_local` until Supabase + Worker are connected.
The validate script rejects `live_scheduled_enabled` to prevent accidental live activation.

## D-05: run-local-automation-cycle.mjs replaces manual stage-by-stage runs

Wraps all pipeline + export + validation stages in a single command.
Stops on first failure. Logs to `data/ops/latest-local-automation-cycle.log`.
`build-public-case-pages.mjs` is optional (skipped if not found).
