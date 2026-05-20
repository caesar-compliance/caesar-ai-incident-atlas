# Task Checklist: T045 — Offline Mock Auto-Discovery Prototype

- [x] Update `schemas/pipeline/candidate.schema.json` to allow `mock_detected` and `mock_candidate` in the `status` enum
- [x] Create remaining 4 synthetic mock source update JSON files:
  - [x] `mock-sources/official/biometric-privacy-enforcement-note.json`
  - [x] `mock-sources/official/healthcare-ai-risk-notice.json`
  - [x] `mock-sources/official/financial-services-ai-consumer-risk-note.json`
  - [x] `mock-sources/yellow/vendor-governance-failure-note.json`
- [x] Implement ES module pipeline scripts in `scripts/`:
  - [x] `mock-watch-sources.mjs` (Read mock sources, normalize updates)
  - [x] `mock-build-candidates.mjs` (Convert updates to CAND-XXXX candidates, validate against candidate schema)
  - [x] `mock-dedupe-candidates.mjs` (Group duplicates by dedupe_key, output dedupe report)
  - [x] `mock-build-case-drafts.mjs` (Promote candidates to draft case packs, validate against case-draft schema)
  - [x] `mock-build-digest-preview.mjs` (Generate weekly preview JSON under data/digests/mock/)
  - [x] `validate-mock-pipeline.mjs` (Thorough safety, schema, and sandboxing auditor)
- [x] Implement Python validation helper:
  - [x] `tools/validate_mock_schemas.py` (Execute jsonschema checks on mock files)
- [x] Verify sandboxed mock pipeline end-to-end and execute validation checks
