# T017 — Implementation Report

**Branch:** `site/T017-static-publish-package-preparation`  
**Starting commit:** `fb06560` (T016)  
**Date:** 20 May 2026

---

## Summary

T017 made `site/` fully self-contained for static publishing. The `../data/` path dependency is resolved. `site/` can now be served as the static root without exposing internal repository documents.

## What Changed

| Change | Detail |
|---|---|
| `site/data/incident-index.json` | Created — `file` paths rewritten to `data/incidents/...` |
| `site/data/incidents/` | 10 incident JSON files copied from root `data/incidents/` |
| `site/data/taxonomy/` | 6 taxonomy JSON files copied from root `data/taxonomy/` |
| `site/assets/app.js` | `../data/incident-index.json` → `data/incident-index.json` |
| `tools/validate_dataset.py` | Added checks 7–10: site/data sync, path check |

## QA

```
python3 tools/validate_dataset.py → PASS (exit 0)
curl -I http://localhost:8085/site/ → HTTP 200 (repo root server)
curl -I http://localhost:8086/ → HTTP 200 (site/ root server)
```

## site/ Contents (18 files — all public static)

```
site/index.html
site/assets/app.js
site/assets/styles.css
site/README.md
site/data/incident-index.json
site/data/incidents/  (10 files)
site/data/taxonomy/   (6 files)
```

No internal docs, work-items, planning files, or schemas in `site/`.

## Unresolved Public Deployment Blockers

| Blocker | Status |
|---|---|
| CT explicit approval | 🔴 Hard blocker |
| Legal/license review | ⚠ Pending |
| Wording/legal risk review | ⚠ Pending |
| Domain/hosting decision | ⚠ Pending |
| Manual browser smoke test (DevTools) | ⚠ Pending |
