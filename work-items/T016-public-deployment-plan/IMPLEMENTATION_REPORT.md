# T016 — Implementation Report

**Branch:** `docs/T016-public-deployment-plan`  
**Starting commit:** `31eeb84` (T015)  
**Date:** 19 May 2026

---

## Summary

T016 produced four planning documents for public deployment. No deployment config was added. No secrets. No new records. All planning only.

Key finding: the current `site/assets/app.js` uses `../data/` relative paths, requiring a data path fix in T017 before any deployment.

## QA

```
python3 tools/validate_dataset.py → PASS (exit 0)
curl -I http://localhost:8084/site/ → HTTP 200
```

## Files Created (8)

| File | Purpose |
|---|---|
| `PUBLIC_DEPLOYMENT_PLAN.md` | URL, publish boundary, path fix, rollback, update, approval |
| `HOSTING_OPTION_MATRIX.md` | 5-option comparison table |
| `PUBLICATION_RISK_GATE.md` | 12-criterion go/no-go table |
| `T017_DEPLOYMENT_IMPLEMENTATION_RECOMMENDATION.md` | Step-by-step T017 plan |
| `work-items/T016.../TASK.md` | Scope checklist |
| `work-items/T016.../VALIDATION.md` | Validation checklist |
| `work-items/T016.../DECISIONS.md` | 3 decisions |
| `work-items/T016.../IMPLEMENTATION_REPORT.md` | This file |

## Files Changed (6)

`PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `CHANGELOG.md`, `REPO_INVENTORY.md`, `docs/DECISION_LOG.md`, `RELEASE_CANDIDATE_GATE.md`

## Key Finding — Path Fix Required in T017

`site/assets/app.js` fetches `../data/incident-index.json` and `../data/incidents/...`. The publish root must either be the repo root (exposes internals) or `data/` must be copied into `site/data/` with paths updated. T017 should implement the copy + path update before deploy.

## No Deployment / No New Records

- No deployment config.
- No secrets.
- No new incident records.
- No external dependencies.

## Blockers for Public Deployment (from PUBLICATION_RISK_GATE.md)

| Blocker | Status |
|---|---|
| CT explicit approval | 🔴 Blocker |
| Legal/license review | ⚠ Pending |
| Domain/hosting decision | ⚠ Pending |
| Data path fix | ⚠ Pending (T017) |
| Internal doc exposure prevention | ⚠ Pending (T017) |
