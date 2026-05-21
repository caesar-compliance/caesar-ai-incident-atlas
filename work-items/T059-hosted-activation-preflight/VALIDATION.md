# T059 Validation Checklist

**Task:** Hosted Activation Preflight + Local Supabase Migration Smoke + Operator Go-Live Checklist  
**Status:** Validation Required

---

## Automated Validation

### Schema Validation
- [ ] `python3 tools/validate_dataset.py` — PASS
- [ ] `python3 tools/validate_pipeline_schemas.py` — PASS
- [ ] `node scripts/validate-supabase-schema.mjs` — PASS (14 checks)

### New T059 Scripts
- [ ] `node scripts/smoke-supabase-local-migration.mjs` — PASS or SKIP (graceful)
- [ ] `node scripts/preflight-hosted-activation.mjs` — Completes, writes preflight JSON
- [ ] `node scripts/print-hosted-activation-commands.mjs` — Outputs 20-step checklist

### Bootstrap & Sync
- [ ] `node scripts/export-supabase-bootstrap-payloads.mjs` — Writes sanitized payloads
- [ ] `node scripts/sync-supabase-hosted.mjs --dry-run` — DRY RUN mode
- [ ] `node scripts/probe-worker-supabase-live.mjs` — SKIP or PROBE (guarded)

### Safety & Status
- [ ] `node scripts/validate-hosted-sync-safety.mjs` — PASS (21+ checks)
- [ ] `node scripts/export-ops-status.mjs` — Writes status JSON
- [ ] `node scripts/validate-ops-status.mjs` — PASS

### Worker & Site
- [ ] `node scripts/test-cloudflare-worker-local.mjs` — 22/22 tests PASS
- [ ] `node scripts/validate-public-site.mjs` — PASS
- [ ] `node scripts/validate-digests.mjs` — PASS

### Pipeline Validators
- [ ] `node scripts/validate-real-watcher.mjs` — PASS
- [ ] `node scripts/validate-candidate-quality.mjs` — PASS
- [ ] `node scripts/validate-promotion-packets.mjs` — PASS
- [ ] `node scripts/validate-promotion-dry-run.mjs` — PASS
- [ ] `node scripts/validate-review-console.mjs` — PASS
- [ ] `node scripts/validate-real-drafts.mjs` — PASS (no INC-0014)
- [ ] `node scripts/validate-case-shortlist.mjs` — PASS

---

## Safety Confirmations

### Secrets & Environment
- [ ] No `.env` file committed
- [ ] `.env.example` exists with placeholders only
- [ ] `.gitignore` blocks `.env` and `.env.*`
- [ ] No `SUPABASE_SERVICE_ROLE_KEY` value in any tracked file
- [ ] No JWT-like tokens in tracked files

### Cloudflare Worker
- [ ] No `wrangler.toml` committed (may exist locally, must be gitignored)
- [ ] `wrangler.example.toml` has no real account_id
- [ ] `wrangler.example.toml` has no real secrets
- [ ] Cron remains commented/disabled in example
- [ ] Worker code has `sanitizeError` function
- [ ] Worker code redacts JWTs with `[REDACTED_JWT]`

### GitHub Actions
- [ ] `pages.yml` uploads only `site/` directory
- [ ] `pages.yml` has no schedule trigger

### Data Safety
- [ ] `data/ops/supabase/` exists and is sanitized
- [ ] `bootstrap-manifest.json` has `safe_for_hosted_sync: true`
- [ ] `bootstrap-manifest.json` has `contains_secrets: false`
- [ ] No `site/data/ops/supabase/` directory (internal only)

### Record Safety
- [ ] Public record count = 13
- [ ] Latest public record = INC-0013
- [ ] No INC-0014 in `data/` or `site/data/`

### Generated Files
- [ ] `local-migration-smoke.json` created (if runtime available) or skipped gracefully
- [ ] `hosted-activation-preflight.json` created with `hosted_activation_ready: false` (env not configured)
- [ ] `hosted-activation-manifest.json` created with safe defaults

---

## Git State

- [ ] `git status --short` — Clean (no uncommitted changes except T059)
- [ ] `git branch --show-current` — `task/T059-hosted-activation-preflight`
- [ ] `git diff --check` — No whitespace errors
- [ ] `git diff --stat` — Shows expected T059 files only

---

## Pre-Merge Verification

Before merge to main:
1. All validators pass
2. Safety confirmations verified
3. Git state clean
4. No remote mutations performed
5. No secrets committed
6. Public count = 13
7. Latest = INC-0013
8. No INC-0014

---

## Post-Merge State

After merge to main:
- Repository ready for manual hosted activation when CT approves
- All preflight tools in place
- All safety validators operational
- No live infrastructure touched
