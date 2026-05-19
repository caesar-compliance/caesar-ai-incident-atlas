# T015 — Task Scope

**Branch:** `qa/T015-static-site-release-candidate-hardening`  
**Starting commit:** `b7e4c0a` (T014)  
**Date:** 19 May 2026

## Scope Checklist

- [x] Create branch `qa/T015-static-site-release-candidate-hardening`
- [x] Run `python3 tools/validate_dataset.py` — PASS (no fixes needed)
- [x] Local server smoke test — HTTP 200
- [x] Structural review of site files — all T013 features confirmed present
- [x] CDN/external dependency scan — NONE FOUND
- [x] Create `tools/requirements.txt` (jsonschema>=4.0.0)
- [x] Update `tools/README.md` — add requirements.txt install command
- [x] Update `site/README.md` — add requirements.txt reference
- [x] Create `STATIC_SITE_RC_REVIEW.md` — full RC review table
- [x] Update `RELEASE_CANDIDATE_GATE.md` — mark local items satisfied
- [x] Compact work-item docs
- [x] Minimal lifecycle updates
- [x] No new incident records
- [x] No deployment config
- [x] No external dependencies
- [x] Commit: `qa: harden static site release candidate (T015)`
