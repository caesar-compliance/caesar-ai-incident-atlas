# T007 — First Incident Record Creation Plan

**Status:** In Progress  
**Branch:** `docs/T007-first-incident-record-creation-plan`  
**Starting commit:** `7d1c6dd`  
**Date started:** 19 May 2026  
**Assigned to:** Cascade (execution agent)  
**Approved by:** Control Tower (T006 dossier shortlist approved; T007 planning initiated)

---

## Objective

Prepare a safe, reviewable plan for converting the 10 approved T006 candidates into the first real incident records in a later task (T008). T007 is a planning task only — no incident records are created. No JSON incident files are created. No `INC-XXXX` IDs are assigned.

---

## Scope

### In Scope
- Create `work-items/T007-first-incident-record-creation-plan/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md
- Create `FIRST_INCIDENT_RECORD_CREATION_PLAN.md`
- Create `APPROVED_CANDIDATE_SET_FOR_RECORD_CREATION.md`
- Create `INCIDENT_FIELD_MAPPING_DRAFTS.md`
- Create `SOURCE_TO_FIELD_TRACEABILITY_MATRIX.md`
- Create `RECORD_CREATION_QA_CHECKLIST.md`
- Create `T008_FIRST_RECORD_BATCH_RECOMMENDATION.md`
- Schema usability review (observations only — no schema modification)
- Update lifecycle documents

### Out of Scope
- Creating real incident records (`INC-XXXX.json`)
- Populating `data/incidents/`
- Assigning final `INC-XXXX` IDs
- Importing external datasets or scraping
- Creating product code, CLI, static site, database, or scraper
- Cloning external repositories
- Copying third-party files, data, or code

---

## Approved Candidate Set (from T006 Control Tower review)

| Wave | Candidates |
|---|---|
| Tier 1 — First wave | CAND-003, CAND-006, CAND-011, CAND-012 |
| Tier 2/3 — Second wave | CAND-002, CAND-004, CAND-005, CAND-009, CAND-010, CAND-015 |
| Postponed | CAND-001, CAND-007, CAND-008, CAND-013 |
| Rejected | CAND-014 |

---

## Deliverables

| File | Status |
|---|---|
| `FIRST_INCIDENT_RECORD_CREATION_PLAN.md` | Pending |
| `APPROVED_CANDIDATE_SET_FOR_RECORD_CREATION.md` | Pending |
| `INCIDENT_FIELD_MAPPING_DRAFTS.md` | Pending |
| `SOURCE_TO_FIELD_TRACEABILITY_MATRIX.md` | Pending |
| `RECORD_CREATION_QA_CHECKLIST.md` | Pending |
| `T008_FIRST_RECORD_BATCH_RECOMMENDATION.md` | Pending |
| `work-items/T007.../TASK.md` | This file |
| `work-items/T007.../VALIDATION.md` | Pending |
| `work-items/T007.../IMPLEMENTATION_REPORT.md` | Pending |
| `work-items/T007.../DECISIONS.md` | Pending |

---

## Constraints

- **No real incident records.** No `INC-XXXX.json` files.
- **No `data/incidents/` population.** Must contain only `.gitkeep` after this task.
- **No `INC-XXXX` IDs assigned.** Use `CAND-NNN` references throughout.
- **No external dataset import.** No AIID/OECD/AIAAIC/MIT/IBM data copied.
- **No product code.** No scraper, CLI, static site, or database logic.
- **Planning documents only.** Every new document clearly marked as planning/draft.
- **Schema not modified** unless an obvious typo is found.

---

## Commit Message

```
docs: plan first incident record creation (T007)
```
