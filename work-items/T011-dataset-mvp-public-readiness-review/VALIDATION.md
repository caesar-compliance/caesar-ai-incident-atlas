# T011 — Validation Checklist

**Date:** 19 May 2026

## Record Validation

| Check | Result |
|---|---|
| Total INC files: 10 (INC-0001–INC-0010) | ✅ |
| No INC-0011+ | ✅ |
| All 10 records: JSON syntax valid | ✅ |
| All 10 records: pass `jsonschema` Draft 2020-12 | ✅ |
| All FM IDs valid in taxonomy | ✅ |
| All CTL IDs valid in taxonomy | ✅ |
| All sector IDs valid in taxonomy | ✅ |
| All EV refs valid in taxonomy | ✅ |
| All severity values valid | ✅ |
| All confidence values valid | ✅ |
| No deprecated `database` field | ✅ |

## Constraint Checklist

| Constraint | Result |
|---|---|
| No new incident records created | ✅ |
| No product code / static site code | ✅ |
| No scraper / CLI / database | ✅ |
| No external dataset import | ✅ |
| No external repo cloned | ✅ |
| Documentation compact | ✅ |
| All new files in REPO_INVENTORY.md | ✅ |
| Working tree clean after commit | ✅ |
