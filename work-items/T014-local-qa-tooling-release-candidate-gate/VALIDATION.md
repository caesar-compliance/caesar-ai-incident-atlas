# T014 — Validation Checklist

**Date:** 19 May 2026

## Script Output

| Check | Result |
|---|---|
| `python3 tools/validate_dataset.py` exits 0 | ✅ PASS |
| `data/incident-index.json`: valid JSON, 10 entries | ✅ |
| All 10 INC-*.json files found | ✅ |
| No INC-0011+ | ✅ |
| All 10 records: pass jsonschema Draft 2020-12 | ✅ |
| No deprecated `source.database` field | ✅ |
| All FM/CTL/sector/EV references resolve in taxonomy | ✅ |
| Index ↔ file consistency | ✅ |
| Required site files exist | ✅ |
| No external CDN/font/analytics in site files | ✅ |

## Server Smoke Test

| Check | Result |
|---|---|
| `python3 -m http.server 8082` + `curl -I http://localhost:8082/site/` | ✅ HTTP 200 |
| Server stopped after test | ✅ |

## Constraint Checklist

| Check | Result |
|---|---|
| No new incident records | ✅ |
| No deployment config | ✅ |
| No external dependencies | ✅ |
| No npm / framework / build pipeline | ✅ |
| Documentation stayed compact | ✅ |
