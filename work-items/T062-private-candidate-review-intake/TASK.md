# Task T062: Private Candidate Review Intake from Real Green-source Signals

## Goals
- Convert T061 real Green-source private candidate signals into private review-intake records.
- Fuel the future draft/review workflow without creating public cases, promotion packets, public previews, or Supabase writes.
- Maintain absolute safety boundaries with zero mutations of `site/`.

## Tasks
- [x] Preflight checks and ancestry validation
- [x] Create private candidate review intake schema: `schemas/pipeline/private-candidate-review-intake.schema.json`
- [x] Create private candidate review intake builder: `scripts/build-private-candidate-review-intake.mjs`
- [x] Create review console exporter: `scripts/export-review-console-private-intake.mjs`
- [x] Create hosted review intake payload exporter: `scripts/export-hosted-review-intake-payloads.mjs`
- [x] Create private review intake validator: `scripts/validate-private-candidate-review-intake.mjs`
- [x] Update local automation cycle script to integrate optional review intake stage: `scripts/run-local-automation-cycle.mjs`
- [x] Update ops status script to export safe public counts/statuses: `scripts/export-ops-status.mjs`
- [x] Update safety validator: `scripts/validate-hosted-sync-safety.mjs`
- [x] Create minimal lifecycle documentation and audit trail
- [x] Run full validation suite
- [x] Commit, merge, and push
