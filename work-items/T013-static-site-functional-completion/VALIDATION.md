# T013 — Validation Checklist

**Date:** 19 May 2026

## Automated Checks (via `.t013_validate.py`, removed post-run)

| Check | Result |
|---|---|
| `data/incident-index.json`: valid JSON, 10 entries | ✅ |
| All 10 `INC-*.json` files: valid JSON | ✅ |
| All 10 records: pass `jsonschema` Draft 2020-12 | ✅ |
| No INC-0011+ | ✅ |
| No external CDN in `site/index.html`, `app.js`, `styles.css` | ✅ |

## Server Smoke Test

| Check | Result |
|---|---|
| `python3 -m http.server 8081` + `curl -I http://localhost:8081/site/` | ✅ HTTP 200 |
| Server stopped after test | ✅ |

## Constraint Checklist

| Check | Result |
|---|---|
| No new incident records created | ✅ |
| No deployment config added | ✅ |
| No framework / npm / build pipeline | ✅ |
| No external fonts / analytics | ✅ |
| Temporary validation script removed before commit | ✅ |
| Documentation stayed compact | ✅ |
