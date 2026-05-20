# Validation Checklist: T045 — Offline Mock Auto-Discovery Prototype

- [x] Run git branch and check status
- [x] Run `python3 tools/validate_dataset.py` (Confirm exactly 12 public incidents exist, none added)
- [x] Run `python3 tools/validate_pipeline_schemas.py` (Confirm source registry unchanged)
- [x] Run `node scripts/validate-digests.mjs` (Verify sitemap and static digests unchanged)
- [x] Run `node scripts/build-rss-feeds.mjs` (Verify RSS unmodified)
- [x] Run mock pipeline end-to-end:
  - [x] `node scripts/mock-watch-sources.mjs`
  - [x] `node scripts/mock-build-candidates.mjs`
  - [x] `node scripts/mock-dedupe-candidates.mjs`
  - [x] `node scripts/mock-build-case-drafts.mjs`
  - [x] `node scripts/mock-build-digest-preview.mjs`
- [x] Run sandboxing audit and schema validation checks:
  - [x] `node scripts/validate-mock-pipeline.mjs`
- [x] Confirm no network access or external scraping occurred
- [x] Confirm all source registry entries remain `inactive_draft`
- [x] Confirm all `auto_publish_allowed` entries remain `false`
- [x] Confirm no `INC-0013` or other public incident files were created
- [x] Confirm all mock drafts/candidates reside exclusively under sandboxed `mock/` directories
