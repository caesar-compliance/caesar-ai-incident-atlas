# T060 — Manual Watch Run Queue + Hosted Run Payloads

**Status:** Complete  
**Date:** 21 May 2026

## Goal

Build a safe manual watch-run queue and hosted-run payload model that prepares real operational data for Supabase later, without remote writes, cron, Cloudflare deployment, or new public cases.

## Deliverables

- `schemas/pipeline/manual-watch-run.schema.json` — run envelope schema
- `scripts/build-manual-watch-run-queue.mjs` — deterministic queue builder
- `scripts/build-manual-watch-run-envelope.mjs` — private run envelope builder
- `scripts/export-hosted-watch-run-payloads.mjs` — sanitized Supabase-ready payload exporter
- `scripts/validate-manual-watch-run.mjs` — comprehensive validator
- `scripts/run-local-automation-cycle.mjs` — updated with optional `--with-watch-queue` flag
- `scripts/export-ops-status.mjs` — updated with `manual_watch_run_status` field
- `scripts/validate-hosted-sync-safety.mjs` — expanded with 7 T060 checks (25–31)
- `data/ops/watch-runs/manual-queue-latest.json`
- `data/ops/watch-runs/manual-queue-manifest.json`
- `data/ops/watch-runs/manual-run-latest.json`
- `data/ops/supabase/atlas-watch-run.manual-latest.json`
- `data/ops/supabase/atlas-watch-run-queue.manual-latest.json`

## Safety Boundaries

- No network fetch
- No remote Supabase writes
- No Cloudflare deploy
- No cron
- No public site mutation
- No INC-0014
- No secrets committed
- Public count remains 13, latest remains INC-0013
- Only green sources enabled; yellow/red/AIID/OECD/AIAAIC blocked
