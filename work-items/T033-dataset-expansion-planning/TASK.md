# T033 — Dataset Expansion Planning for INC-0011+ Candidates

**Task:** T033  
**Branch:** `planning/T033-dataset-expansion-candidates`  
**Date:** 20 May 2026  
**Version:** 0.7.1  
**Status:** Planning only — NOT legal advice. No new records. No public data changes.

---

## Scope

This task is planning only.

**Explicitly out of scope for T033:**

- No new incident records created (no INC-0011 or any new JSON incident file).
- No changes to the public dataset (`data/incidents/`, `site/data/`).
- No source claims or source commitments for future records.
- No expansion of G-01/G-02 approval scope.
- No legal advice and no counsel sign-off implied.
- No scraping, crawling, automation, or external source fetching.
- No changes to DNS, CNAME, GitHub Pages, hosting, workflows, secrets, or analytics.
- No deployment settings changed.
- No new gate approvals requested or claimed.

**In scope for T033:**

- Define candidate selection criteria for future INC-0011+ records.
- Define minimum source quality requirements for new records.
- Document future incident candidate review workflow.
- Provide a reusable candidate shortlist template (placeholder/example only).
- Update roadmap and state documents to reflect T033 planning complete.

---

## Current Baseline (Confirmed at T033 Start)

| Field | Value |
|---|---|
| Baseline commit | `ca88fdc` (T032 merge commit) |
| Public MVP URL | `https://atlas.caesar.no/` |
| Dataset | 10 records — INC-0001 through INC-0010 |
| Public root | `site/` |
| G-01 | ✅ APPROVED with caution (current 10-record MVP only) |
| G-02 | ✅ APPROVED with caution (current 10-record MVP only) |
| G-10 | ✅ PASS |
| All 12 gates | Closed/approved — current 10-record MVP only |
| Approval scope | Current 10-record public MVP only. Not extended by T033. |

---

## Deliverables

| File | Description |
|---|---|
| `work-items/T033-dataset-expansion-planning/TASK.md` | This file — task scope and constraints |
| `work-items/T033-dataset-expansion-planning/VALIDATION.md` | Validation checklist |
| `work-items/T033-dataset-expansion-planning/IMPLEMENTATION_REPORT.md` | Final implementation report |
| `work-items/T033-dataset-expansion-planning/DECISIONS.md` | Decisions made during T033 |
| `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` | Candidate selection criteria for INC-0011+ |
| `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` | Minimum source requirements for new records |
| `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md` | Future candidate review and approval workflow |
| `INCIDENT_CANDIDATE_SHORTLIST_TEMPLATE.md` | Reusable template for future candidate shortlists |

---

## Constraints

- All deliverables are documentation only.
- No record creation. No data change. No site change.
- No G-01/G-02 expansion.
- No legal advice implied.
- No scraping or external source fetching.
- Planning documents describe future processes only — they do not approve future records.
- Each future record requires its own source/legal review and CT gate.

---

**Disclaimer:** This task creates planning documentation only. It does not constitute legal advice, legal clearance, or approval to create any new incident records. All new records require explicit Control Tower approval and separate source and legal review.
