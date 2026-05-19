# T014 — Task Scope

**Branch:** `qa/T014-local-qa-tooling-release-candidate-gate`  
**Starting commit:** `a43bb88` (T013)  
**Date:** 19 May 2026

## Scope Checklist

- [x] Create branch `qa/T014-local-qa-tooling-release-candidate-gate`
- [x] Create `tools/validate_dataset.py` — full dataset + site QA script
- [x] Create `tools/README.md` — usage docs
- [x] Create `RELEASE_CANDIDATE_GATE.md` — pre-deployment checklist
- [x] Fix INC-0011+ regex (integer comparison, not regex — same class of bug fixed in T011)
- [x] Run `python3 tools/validate_dataset.py` — PASS
- [x] Local server smoke-test — HTTP 200
- [x] Update `site/README.md` — add QA command
- [x] Minimal lifecycle updates
- [x] No new incident records
- [x] No deployment config
- [x] No external dependencies
- [x] Compact work-item docs
- [x] Commit: `qa: add local dataset validation tooling (T014)`
