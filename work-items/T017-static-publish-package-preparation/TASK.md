# T017 — Task Scope

**Branch:** `site/T017-static-publish-package-preparation`  
**Starting commit:** `fb06560` (T016)  
**Date:** 20 May 2026

## Scope Checklist

- [x] Create branch `site/T017-static-publish-package-preparation`
- [x] Copy `data/incidents/` → `site/data/incidents/` (10 files)
- [x] Copy `data/taxonomy/` → `site/data/taxonomy/` (6 files)
- [x] Generate `site/data/incident-index.json` with `data/incidents/...` paths (not `../data/...`)
- [x] Update `site/assets/app.js`: `../data/incident-index.json` → `data/incident-index.json`
- [x] Confirm no `../data/` references remain in `app.js`
- [x] Update `tools/validate_dataset.py`: add checks 7–10 (site/data sync, path check)
- [x] Move `import hashlib` to top of validator
- [x] `python3 tools/validate_dataset.py` — PASS
- [x] Server test (repo root): HTTP 200 at `/site/`
- [x] Server test (site/ root): HTTP 200 at `/`
- [x] Confirm `site/` contains only public static files (no internal docs)
- [x] Update `site/README.md` — self-contained note
- [x] Update `tools/README.md` — sync checks
- [x] Update `RELEASE_CANDIDATE_GATE.md` — mark G-06 and G-08 satisfied
- [x] Update `PUBLICATION_RISK_GATE.md` — update G-06 and G-08
- [x] Compact work-item docs
- [x] Minimal lifecycle updates
- [x] No new incident records
- [x] No deployment config / no CNAME / no GitHub Actions
- [x] Commit: `site: prepare self-contained static publish package (T017)`
