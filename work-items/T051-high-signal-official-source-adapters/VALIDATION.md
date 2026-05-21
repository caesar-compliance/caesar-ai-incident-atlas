# T051 Validation Checklist

## Commands
```
node scripts/run-real-pipeline.mjs
git diff --check
python3 tools/validate_dataset.py
python3 tools/validate_pipeline_schemas.py
node scripts/validate-digests.mjs
node scripts/build-rss-feeds.mjs
node scripts/validate-mock-pipeline.mjs
node scripts/validate-real-watcher.mjs
node scripts/validate-real-drafts.mjs
node scripts/validate-promotion-packets.mjs
node scripts/validate-promotion-dry-run.mjs
node scripts/validate-review-console.mjs
node scripts/validate-candidate-quality.mjs
```

## Safety Checks
- [ ] No public incident created
- [ ] Public count remains 12
- [ ] No INC-0013 exists
- [ ] No `site/admin` exists
- [ ] No candidates/drafts/packets/previews under `site/`
- [ ] No scheduled workflows enabled
- [ ] No Yellow sources fetched
- [ ] AIID/OECD/AIAAIC not fetched
- [ ] No copied third-party text
- [ ] No full HTML/body stored
- [ ] No secrets/email/subscriber DB
- [ ] Public root remains `site/`
- [ ] GitHub Pages workflow uploads only `site/`
