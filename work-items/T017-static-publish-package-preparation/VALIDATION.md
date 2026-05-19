# T017 — Validation Checklist

**Date:** 20 May 2026

## QA Script

| Check | Result |
|---|---|
| `python3 tools/validate_dataset.py` exits 0 | ✅ PASS |
| `site/data/incident-index.json` exists | ✅ |
| `site/data/incidents/` in sync with `data/incidents/` (sha256) | ✅ |
| `site/data/taxonomy/` in sync with `data/taxonomy/` (sha256) | ✅ |
| `app.js` has no `../data/` references | ✅ |
| `app.js` uses `data/incident-index.json` | ✅ |

## Server Tests

| Check | Result |
|---|---|
| Repo root server: `curl -I http://localhost:8085/site/` | ✅ HTTP 200 |
| Site root server: `curl -I http://localhost:8086/` | ✅ HTTP 200 |
| Both servers stopped after test | ✅ |

## Exposure Check

| Check | Result |
|---|---|
| `site/` contains only public static files | ✅ |
| No `work-items/`, `docs/`, planning docs in `site/` | ✅ |
| No internal docs copied into `site/` | ✅ |

## Constraint Checklist

| Check | Result |
|---|---|
| No new incident records | ✅ |
| No deployment config / CNAME / GitHub Actions | ✅ |
| No secrets | ✅ |
| No external dependencies | ✅ |
| Documentation stayed compact | ✅ |
