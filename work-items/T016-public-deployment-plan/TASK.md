# T016 — Task Scope

**Branch:** `docs/T016-public-deployment-plan`  
**Starting commit:** `31eeb84` (T015)  
**Date:** 19 May 2026

## Scope Checklist

- [x] Create branch `docs/T016-public-deployment-plan`
- [x] Read: STATIC_SITE_RC_REVIEW, RELEASE_CANDIDATE_GATE, DATASET_MVP_OPEN_RISKS, site/assets/app.js
- [x] `python3 tools/validate_dataset.py` — PASS
- [x] Local server smoke test — HTTP 200
- [x] Identify path dependency issue: `../data/` relative paths require path fix before deploy
- [x] Create `PUBLIC_DEPLOYMENT_PLAN.md` — URL options, what to publish, path fix, rollback, update process, approval steps
- [x] Create `HOSTING_OPTION_MATRIX.md` — 5-option comparison table
- [x] Create `PUBLICATION_RISK_GATE.md` — 12 gate criteria, go/no-go
- [x] Create `T017_DEPLOYMENT_IMPLEMENTATION_RECOMMENDATION.md` — step-by-step T017 plan
- [x] Compact work-item docs
- [x] Minimal lifecycle updates
- [x] No deployment config added
- [x] No secrets added
- [x] No new incident records
- [x] Commit: `docs: plan public deployment path (T016)`
