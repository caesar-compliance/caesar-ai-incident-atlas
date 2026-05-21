# Task T063: Private Review Console UI + Review Decision Packets

## Goals
- Add a private review-console view for T062 intake records and local review-decision packet generation.
- Make the private review workflow operational and local-only (no public cases, no promotion packets, no Supabase writes, no site/ mutation).
- Make the review workflow independently runnable via a bounded runner script and clean command-line integration.

## Tasks
- [x] Preflight checks and ancestry validation
- [x] Fix bounded review workflow runner path: create `scripts/run-private-review-workflow.mjs` and integrate `--review-intake-only` in `scripts/run-local-automation-cycle.mjs`
- [x] Create private review decision schema: `schemas/pipeline/private-review-decision.schema.json`
- [x] Create review decision builder: `scripts/build-private-review-decisions.mjs`
- [x] Create review decision patch/apply script: `scripts/apply-private-review-decision.mjs`
- [x] Create draft-candidate-ready packet builder: `scripts/build-private-draft-candidate-packets.mjs`
- [x] Enhance review console UI/private viewer: `tools/review-console/index.html` and `tools/review-console/assets/review-console.js`
- [x] Create review console data exporter: `scripts/export-review-console-decision-data.mjs`
- [x] Create hosted payload exporter: `scripts/export-hosted-review-decision-payloads.mjs`
- [x] Create validator: `scripts/validate-private-review-decisions.mjs`
- [x] Update safety validator: `scripts/validate-hosted-sync-safety.mjs`
- [x] Update ops status integration: `scripts/export-ops-status.mjs`
- [x] Create minimal lifecycle documentation and audit trail
- [x] Run full validation suite
- [x] Commit, merge, and push
