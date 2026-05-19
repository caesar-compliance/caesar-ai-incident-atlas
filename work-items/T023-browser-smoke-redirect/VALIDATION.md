# T023 Validation Checklist

**Date:** 20 May 2026

---

## HTTP / Redirect Checks

| Check | Result |
|---|---|
| `curl -sI https://atlas.caesar.no/` | HTTP 200 ✅ |
| `curl -sI http://atlas.caesar.no/` | HTTP 301 → `https://atlas.caesar.no/` ✅ |
| `curl -sI https://atlas.caesar.no/data/incident-index.json` | HTTP 200 ✅ |
| `curl -sI https://caesar-compliance.github.io/caesar-ai-incident-atlas/` | HTTP 301 → `https://atlas.caesar.no/` ✅ |

## GitHub Pages API

| Field | Value |
|---|---|
| status | built |
| cname | atlas.caesar.no |
| https_enforced | true |
| https_certificate.state | approved |
| https_certificate.expires_at | 2026-08-18 |
| latest workflow run | 26131240793 — success |

## Data Endpoint

| Check | Result |
|---|---|
| `incident-index.json` accessible | ✅ HTTP 200 |
| Record count in JSON | 10 (INC-0001 through INC-0010) ✅ |
| Data integrity | All 10 entries confirmed in JSON body ✅ |

## Local Validator

| Check | Result |
|---|---|
| `python3 tools/validate_dataset.py` | PASS, exits 0, 10 records ✅ |
| No `../data/` in `site/assets/app.js` | Clean ✅ |
| No CNAME in `site/` | Clean ✅ |
| No `work-items/` or `docs/` in `site/` | Clean ✅ |
| `site/` file count | 21 files ✅ |
| Workflow `path: site` | Confirmed ✅ |
| `git diff --check` | Clean ✅ |

## G-10 Status

| Sub-check | Status |
|---|---|
| HTTP 200 at custom domain | ✅ PASS |
| HTTP→HTTPS redirect (301) | ✅ PASS |
| JSON data endpoint HTTP 200 | ✅ PASS |
| All 10 records in JSON | ✅ PASS |
| Default GitHub Pages URL redirect | ✅ PASS |
| Interactive UI: page load, dark theme | ⚠ Pending CT manual verification |
| Interactive UI: 10 cards visible | ⚠ Pending CT manual verification |
| Interactive UI: search, filter, sort | ⚠ Pending CT manual verification |
| Interactive UI: deep link `#INC-0005` | ⚠ Pending CT manual verification |
| Interactive UI: copy-link button | ⚠ Pending CT manual verification |
| DevTools: no JS errors | ⚠ Pending CT manual verification |
| DevTools: no 404s for site data | ⚠ Pending CT manual verification |

**G-10 overall: PARTIAL** — HTTP/redirect/data PASS. Interactive steps require CT manual browser test.
