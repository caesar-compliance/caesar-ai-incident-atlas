# T058 Validation Checklist

## Pre-Implementation Checks
- [x] T057 is complete
- [x] HEAD at f29795e
- [x] Branch created: task/T058-worker-supabase-api-integration

## Implementation Validation

### Cloudflare Worker Tests
```bash
node scripts/test-cloudflare-worker-local.mjs
```
Expected: 22+ tests pass, 0 fail
- [x] Fallback mode tests pass
- [x] Mocked Supabase success tests pass
- [x] Mocked Supabase failure tests pass
- [x] POST /watch/run disabled test passes
- [x] OPTIONS preflight test passes
- [x] 404 unknown route test passes
- [x] No secrets in any response

### Live Probe (Dry Run)
```bash
node scripts/probe-worker-supabase-live.mjs
```
Expected: SKIP (env not configured)
- [x] Script exits 0
- [x] Writes mode: "skipped_no_env"
- [x] Does not attempt remote read
- [x] Never prints service role key

### Hosted Sync Dry Run
```bash
node scripts/sync-supabase-hosted.mjs --dry-run
```
Expected: DRY RUN
- [x] Mode: dry_run
- [x] remote_sync: false
- [x] Manifest status correct

### Safety Validator
```bash
node scripts/validate-hosted-sync-safety.mjs
```
Expected: PASSED
- [x] No .env file committed
- [x] .gitignore blocks .env and .env.*
- [x] .env.example exists with placeholders only
- [x] No SUPABASE_SERVICE_ROLE_KEY in tracked files
- [x] No JWT tokens in tracked files
- [x] bootstrap-manifest.json safe_for_hosted_sync: true
- [x] site/ does not contain data/ops/supabase
- [x] site/ no forbidden internal dirs
- [x] No INC-0014 in data/ or site/
- [x] pages.yml uploads only site/
- [x] pages.yml no schedule trigger
- [x] wrangler.toml absent or ignored
- [x] wrangler.example.toml no real account_id
- [x] wrangler.example.toml scheduled cron commented
- [x] automation_mode not live_scheduled_enabled
- [x] public_record_count = 13
- [x] latest_public_record_id = INC-0013
- [x] Worker has sanitizeError function
- [x] Worker code: no JWT-like tokens

### Core Validators
```bash
python3 tools/validate_dataset.py
python3 tools/validate_pipeline_schemas.py
node scripts/validate-supabase-schema.mjs
node scripts/export-ops-status.mjs
node scripts/validate-ops-status.mjs
node scripts/validate-public-site.mjs
node scripts/validate-digests.mjs
node scripts/validate-real-watcher.mjs
node scripts/validate-candidate-quality.mjs
node scripts/validate-promotion-packets.mjs
node scripts/validate-promotion-dry-run.mjs
node scripts/validate-review-console.mjs
node scripts/validate-real-drafts.mjs
node scripts/validate-case-shortlist.mjs
```
Expected: All pass

## Post-Validation
- [x] git diff --check — no trailing whitespace
- [x] git status --short — shows expected files
- [x] Files created: probe-worker-supabase-live.mjs, T058 docs
- [x] Files modified: index.js, test-cloudflare-worker-local.mjs, validate-hosted-sync-safety.mjs, export-ops-status.mjs, wrangler.example.toml
