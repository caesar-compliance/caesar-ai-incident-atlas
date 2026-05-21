# T056 — Validation

## Validation commands

```bash
node scripts/export-ops-status.mjs
node scripts/validate-ops-status.mjs
node scripts/run-local-automation-cycle.mjs
git diff --check
python3 tools/validate_dataset.py
python3 tools/validate_pipeline_schemas.py
node scripts/validate-public-site.mjs
node scripts/validate-digests.mjs
node scripts/build-rss-feeds.mjs
node scripts/validate-real-watcher.mjs
node scripts/validate-candidate-quality.mjs
node scripts/validate-promotion-packets.mjs
node scripts/validate-promotion-dry-run.mjs
node scripts/validate-review-console.mjs
node scripts/validate-real-drafts.mjs
node scripts/validate-case-shortlist.mjs
```

## Safety checks

- [ ] public count = 13
- [ ] no INC-0014
- [ ] no secrets / env files
- [ ] no Supabase credentials
- [ ] no Cloudflare deployment
- [ ] no scheduled workflows enabled
- [ ] no provider calls requiring secrets
- [ ] no candidates/drafts/packets/previews leaked into site/
- [ ] no copied text
- [ ] no full HTML stored
- [ ] public root remains site/
- [ ] GitHub Pages workflow uploads only site/
