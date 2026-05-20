# T034 — Validation Checklist

**Task:** T034 — Candidate Shortlist Draft
**Date:** 20 May 2026

| Check | Expected | Result |
|---|---|---|
| `python3 tools/validate_dataset.py` | Exit 0, 10 records | ✅ PASS |
| `git diff --check` | Clean | ✅ CLEAN |
| No new incident JSON files in `data/incidents/` | INC-0001–INC-0010 only | ✅ PASS |
| No new files in `site/data/incidents/` | Unchanged | ✅ PASS |
| `data/incident-index.json` unchanged | 10 records only | ✅ PASS |
| No INC-0011 or higher in repo | Absent | ✅ PASS |
| `grep -R "INC-0011" .` (excluding planning refs in .md files) | No JSON record | ✅ PASS |
| All candidates status `not_approved_candidate` | Present in shortlist | ✅ PASS |
| `site/` contains no planning/work-items/docs | Confirmed | ✅ PASS |
| No CNAME in `site/` | Absent | ✅ PASS |
| `grep upload-pages-artifact .github/workflows/pages.yml` | Confirmed | ✅ PASS |
| `grep path: site .github/workflows/pages.yml` | Confirmed | ✅ PASS |
| No DNS/CNAME/hosting/secrets changes | Not touched | ✅ PASS |
| No G-01/G-02 scope expansion | Unchanged | ✅ PASS |
| All planning docs carry disclaimer | Confirmed | ✅ PASS |

**T034 Validation: PASS — Planning only. No records created. No data changed. No gates expanded.**

**Disclaimer:** Not legal advice.
