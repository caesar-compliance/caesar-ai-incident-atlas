# T035 — Validation Checklist

**Task:** T035 — P1 Candidate Source Pack Planning
**Date:** 20 May 2026

| Check | Expected | Result |
|---|---|---|
| `python3 tools/validate_dataset.py` | Exit 0, 10 records | ✅ PASS |
| `git diff --check` | Clean | ✅ CLEAN |
| No new incident JSON in `data/incidents/` | INC-0001–INC-0010 only | ✅ PASS |
| No new files in `site/data/incidents/` | Unchanged | ✅ PASS |
| `data/incident-index.json` unchanged | 10 records only | ✅ PASS |
| No INC-0011+ JSON in repo | Absent | ✅ PASS |
| No INC-0011 in JSON files | Only in index note field | ✅ PASS |
| All P1 candidates status `not_approved_candidate` | Confirmed in source packs | ✅ PASS |
| No article text reproduced in source packs | URLs only | ✅ PASS |
| `site/` contains no planning/work-items/docs | Confirmed | ✅ PASS |
| No CNAME in `site/` | Absent | ✅ PASS |
| Workflow uploads `path: site` | Confirmed | ✅ PASS |
| No DNS/CNAME/hosting/secrets changes | Not touched | ✅ PASS |
| No G-01/G-02 scope expansion | Unchanged | ✅ PASS |
| All source packs carry disclaimer | Confirmed | ✅ PASS |
| No scraping or bulk source download | Confirmed — manual lookup only | ✅ PASS |

**T035 Validation: PASS — Planning only. No records created. No data changed. No gates expanded.**

**Disclaimer:** Not legal advice.
