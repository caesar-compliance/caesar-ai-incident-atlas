# T015 — Validation Checklist

**Date:** 19 May 2026

## QA Script

| Check | Result |
|---|---|
| `python3 tools/validate_dataset.py` exits 0 | ✅ PASS |
| 10 records, valid JSON, schema, taxonomy | ✅ |
| No INC-0011+ | ✅ |
| No external CDN in site files | ✅ |

## Server Smoke Test

| Check | Result |
|---|---|
| `python3 -m http.server 8083` + `curl -I http://localhost:8083/site/` | ✅ HTTP 200 |
| Server stopped after test | ✅ |

## Structural Site Review

| Feature | Present |
|---|---|
| Search input (`#search-input`) | ✅ |
| Sort select (`#sort-select`, 5 options) | ✅ |
| Sidebar filters (sector, severity, confidence, FM) | ✅ |
| Active filter chips bar | ✅ |
| 10 incident cards | ✅ |
| Expand/collapse + keyboard (Enter/Space) | ✅ |
| Deep linking (`handleHashOnLoad`, `hashchange`) | ✅ |
| Copy link button | ✅ |
| Source display with type + last-verified | ✅ |
| Draft taxonomy caveat labels | ✅ |
| Dataset status panel | ✅ |
| Loading / explicit error state | ✅ |
| No external dependencies | ✅ |

## Constraint Checklist

| Check | Result |
|---|---|
| No new incident records | ✅ |
| No deployment config | ✅ |
| No external dependencies | ✅ |
| No npm / framework / build pipeline | ✅ |
| Documentation stayed compact | ✅ |
| No functional bugs found | ✅ |
