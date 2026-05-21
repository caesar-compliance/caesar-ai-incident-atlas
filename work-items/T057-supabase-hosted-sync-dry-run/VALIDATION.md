# T057 — Validation

## Commands

```bash
git diff --check
python3 tools/validate_dataset.py
python3 tools/validate_pipeline_schemas.py
node scripts/validate-supabase-schema.mjs
node scripts/export-supabase-bootstrap-payloads.mjs
node scripts/sync-supabase-hosted.mjs --dry-run
node scripts/validate-hosted-sync-safety.mjs
node scripts/test-cloudflare-worker-local.mjs
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

## Safety checklist

- [ ] no .env committed
- [ ] .env.example tracked, placeholders only
- [ ] .gitignore blocks .env / .env.*
- [ ] no Supabase credentials in any tracked file
- [ ] no JWT-like tokens committed
- [ ] no remote Supabase migration applied
- [ ] no Cloudflare Worker deployed
- [ ] no scheduled cron enabled
- [ ] no GitHub Pages config changed
- [ ] public root remains site/
- [ ] public count = 13
- [ ] latest = INC-0013
- [ ] no INC-0014
- [ ] site/ contains no bootstrap payloads / candidates / drafts / packets
