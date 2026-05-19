# T012 — Validation Checklist

**Date:** 19 May 2026

## Record & Index Validation

| Check | Result |
|---|---|
| `data/incident-index.json`: valid JSON, 10 entries | ✅ |
| All 10 incident records: JSON syntax valid | ✅ |
| All 10 records: pass `jsonschema` Draft 2020-12 | ✅ |
| No INC-0011+ | ✅ |
| Index contains INC-0001–INC-0010 only | ✅ |

## Site Constraint Checklist

| Check | Result |
|---|---|
| No external CDN (googleapis, unpkg, jsdelivr, cloudflare, etc.) | ✅ |
| No external fonts | ✅ |
| No external analytics | ✅ |
| No npm / package.json | ✅ |
| No build pipeline | ✅ |
| No backend / server-side code | ✅ |
| No database | ✅ |
| No deployment config | ✅ |
| No new incident records created | ✅ |
| `site/` serves correctly from repo root via `python3 -m http.server 8080` | ✅ |
