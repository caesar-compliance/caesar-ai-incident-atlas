# T076 — Execute Supabase Private Runtime Live Activation

## Implementation Report

**Task:** T076 + T076B — Execute Supabase private runtime live activation, then harden live env handling  
**Branch:** `task/T076B-safe-live-env-loading`  
**Starting SHA:** `9f5adbc`  
**Status:** Validation PASSED. Pending merge.

---

## What Was Done

### T076 — Live Activation (Prior Step)
The Supabase private runtime was activated using credentials from `.env.runtime.local`. The activation included:

- **Supabase schema apply:** `002_private_review_state_sync.sql` was applied to the live remote database, creating the `atlas_private_review_state_snapshots` table.
- **Live probe:** A read-only probe confirmed the table exists, is schema-compatible, and row count = 1.
- **Private snapshot write:** One sanitized metadata record was written to the remote database.
- **Worker deploy:** NOT executed (not approved for this task).
- **Cron:** NOT enabled.

### T076B — Safe Env Hardening (This Commit)

#### Problem
The prior activation required passing secrets inline in the shell command:
```
SUPABASE_SERVICE_ROLE_KEY=... SUPABASE_URL=... node scripts/...
```
This exposed credentials in shell history, process lists, and logs.

#### Fix
Scripts now load `.env.runtime.local` automatically and pass credentials to child processes via a safe `childEnv` object:

**Patched files:**
- [`scripts/run-private-runtime-live-activation-workflow.mjs`](../../scripts/run-private-runtime-live-activation-workflow.mjs) — reads ATLAS markers + credentials from runtimeEnv; passes `childEnv` to all `execSync` calls
- [`scripts/run-private-runtime-activation-workflow.mjs`](../../scripts/run-private-runtime-activation-workflow.mjs) — same pattern applied to T072 workflow
- [`scripts/validate-private-runtime-live-activation.mjs`](../../scripts/validate-private-runtime-live-activation.mjs) — reads ATLAS markers from runtimeEnv as fallback (prevents false FAIL when run standalone)

**New files:**
- [`scripts/validate-no-secret-leakage.mjs`](../../scripts/validate-no-secret-leakage.mjs) — scans all runtime output files, JSON exports, staged diff, and tracked scripts for secret patterns. Never prints matched values. Exits 1 if any leak is found.

**Updated files:**
- [`.gitignore`](../../.gitignore) — added `package.json` and `package-lock.json` to prevent accidental staging from ad-hoc `npm init`

#### Clean Command Form (after this patch)
```
node scripts/run-private-runtime-live-activation-workflow.mjs --live-approved
```
No inline secrets required. The script reads `.env.runtime.local` internally.

---

## Safety Confirmations

| Check | Status |
|---|---|
| No INC-0014 | ✅ |
| No public preview | ✅ |
| No real promotion packet | ✅ |
| Public count remains 13 | ✅ |
| Latest public record = INC-0013 | ✅ |
| Publication blocked | ✅ |
| Worker deploy executed | ❌ (not approved) |
| Cron enabled | ❌ (not enabled) |
| Secrets staged | ❌ (none) |
| Inline secret commands in clean path | ❌ (eliminated) |
| node_modules staged | ❌ (cleaned up) |
| package.json/package-lock.json staged | ❌ (gitignored) |

---

## Validation Results

All validators PASSED:
- `validate-private-runtime-live-activation` — PASSED
- `validate-private-runtime-operational-status` — PASSED
- `validate-hosted-sync-safety` — PASSED
- `validate-public-site` — PASSED (13 records, INC-0013 latest)
- `validate-supabase-schema` — PASSED
- `test-cloudflare-worker-local` — 23/23 PASSED
- `test-private-review-state-route-contract` — 2/2 PASSED
- `validate-cloudflare-private-runtime-worker` — PASSED
- `validate-no-secret-leakage` — PASSED
- `validate_dataset.py` — PASSED
- `validate_pipeline_schemas.py` — PASSED
- `git diff --check` — PASSED

---

## Next Task

**Rotate Supabase credentials** (service role key + DB password have been exposed in prior shell history). Update `.env.runtime.local` with rotated values, then re-run the clean activation:
```
node scripts/run-private-runtime-live-activation-workflow.mjs --live-approved
```
