# T037 — Batch-1 Source Pack Finalization — Task

**Task ID:** T037  
**Date:** 20 May 2026  
**Status:** Complete  
**Branch:** planning/T037-batch1-source-pack-finalization

---

## Objective

Finalize planning/review source packs for the 4 selected first-batch candidates from T036, without creating new incident records and without approving publication.

---

## Selected Batch-1 Candidates

- CAND-013 — Spirometry race bias
- CAND-008 — AI hiring disability bias
- CAND-011 — Retail facial recognition ICO
- CAND-010 — LLM legal sanctions

---

## Checklist

- [x] Confirm git and deployment state
- [x] Create branch: planning/T037-batch1-source-pack-finalization
- [x] Verify CAND-013 sources (ATS + PubMed)
- [x] Verify CAND-008 sources (EEOC + DOJ)
- [x] Verify CAND-011 sources (ICO + Southern Co-op)
- [x] Verify CAND-010 sources (CourtListener pattern)
- [x] Create BATCH1_FINAL_SOURCE_PACKS.md
- [x] Create BATCH1_DRAFTING_READINESS_MATRIX.md
- [x] Create BATCH1_SOURCE_URL_REGISTER.md
- [x] Update planning docs
- [x] Update lifecycle docs
- [x] Create work item docs
- [x] Validate no records created
- [x] Commit and push

---

## Hard Constraints Verified

- [x] No new incident JSON records created
- [x] No INC-0011 or higher incident IDs created
- [x] No data/incidents/ modifications
- [x] No site/data/incidents/ modifications
- [x] No data/incident-index.json modifications
- [x] No scraping or crawling performed
- [x] No bulk source document downloads
- [x] No legal conclusions made
- [x] No candidates marked as publication-ready
- [x] G-01/G-02 approval scope unchanged (10-record MVP only)
- [x] No DNS/CNAME/hosting changes
- [x] No site/ file changes

---

## Output Files

| File | Purpose |
|---|---|
| BATCH1_FINAL_SOURCE_PACKS.md | Source verification per candidate |
| BATCH1_DRAFTING_READINESS_MATRIX.md | Readiness tables and drafting order |
| BATCH1_SOURCE_URL_REGISTER.md | Source URLs and reproduction rules |

---

**Next:** T038 — CT Approval for First Record Drafting
