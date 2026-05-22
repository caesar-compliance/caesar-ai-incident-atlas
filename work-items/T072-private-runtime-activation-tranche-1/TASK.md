# T072 Private Runtime Activation Tranche 1 Checklist

- [x] Verify parent T071 sync readiness workflow.
- [x] Design and implement SQL migration preflight check script (`scripts/preflight-supabase-private-review-state-apply.mjs`).
- [x] Implement guarded database migration applier (`scripts/apply-supabase-private-review-state.mjs`).
- [x] Implement read-only remote database prober (`scripts/probe-supabase-private-review-state-live.mjs`).
- [x] Implement sanitized metadata snapshot writer (`scripts/write-private-review-state-snapshot.mjs`).
- [x] Implement comprehensive workflow validator (`scripts/validate-private-runtime-activation.mjs`).
- [x] Implement orchestrated runner script (`scripts/run-private-runtime-activation-workflow.mjs`).
- [x] Update local review console bundle selector and detail renderer (`tools/review-console/index.html` & `tools/review-console/assets/review-console.js`).
- [x] Write consolidated status to `tools/review-console/data/private-runtime-activation.json` as part of the run.
- [x] Validate all pipeline boundaries, safety guards, and dry-run defaults successfully.
