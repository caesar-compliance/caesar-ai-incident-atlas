# Task Checklist — T071 Hosted Private Review-State Sync Readiness

- [x] Create JSON schema for hosted private review-state sync readiness (`schemas/pipeline/hosted-private-review-state-sync.schema.json`)
- [x] Construct additive-only SQL migration draft (`infra/supabase/migrations/002_private_review_state_sync.sql`)
- [x] Document Worker sync endpoints route contract (`infra/cloudflare-worker/private-review-state-routes.contract.md`)
- [x] Add local mock route contract handler support in Worker source (`infra/cloudflare-worker/src/index.js`)
- [x] Implement local mock contract route test runner (`scripts/test-private-review-state-route-contract.mjs`)
- [x] Create hosted private review-state sync builder/exporter (`scripts/build-hosted-private-review-state-sync.mjs` and `scripts/export-hosted-private-review-state-sync-payloads.mjs`)
- [x] Build hosted sync safety and boundary validator (`scripts/validate-hosted-private-review-state-sync.mjs`)
- [x] Integrate safety check validation suite (`scripts/validate-hosted-sync-safety.mjs`)
- [x] Update ops status exporter to expose sync readiness metadata (`scripts/export-ops-status.mjs`)
- [x] Build T071 bounded workflow runner (`scripts/run-hosted-private-review-state-sync-workflow.mjs`)
- [x] Add "Hosted private review-state sync readiness" panel in Review Console (`tools/review-console/index.html` and `tools/review-console/assets/review-console.js`)
- [x] Perform full repository validation suite cleanly
