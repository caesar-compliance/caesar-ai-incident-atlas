# T006 — First Incident Candidate Dossier Preparation

**Status:** In Progress  
**Branch:** `research/T006-first-incident-candidate-dossier-preparation`  
**Starting commit:** `499205e`  
**Date started:** 19 May 2026  
**Assigned to:** Cascade (execution agent)  
**Approved by:** Control Tower (task initiation approved)

---

## Objective

Prepare 10–20 candidate incident dossiers for Control Tower review. These dossiers are research documents only — they are NOT final incident records. No incident JSON files will be created. No `data/incidents/` population will occur in this task.

The output of T006 is a set of candidate documents that Artem and the Control Tower can review before deciding which incidents to accept for the first Dataset MVP in T007.

---

## Scope

### In Scope
- Create `work-items/T006-first-incident-candidate-dossier-preparation/` with `TASK.md`, `VALIDATION.md`, `IMPLEMENTATION_REPORT.md`, `DECISIONS.md`
- Create `FIRST_INCIDENT_CANDIDATE_DOSSIERS.md` — 10–20 candidate dossiers
- Create `FIRST_INCIDENT_CANDIDATE_REVIEW_TABLE.md` — summary review table
- Create `FIRST_INCIDENT_SOURCE_REVIEW_NOTES.md` — source and license review notes
- Create `FIRST_INCIDENT_SELECTION_RECOMMENDATION.md` — final selection recommendation
- Check schema usability and record observations
- Update lifecycle documents: `README.md`, `ROADMAP.md`, `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `CHANGELOG.md`, `REPO_INVENTORY.md`, `docs/DECISION_LOG.md`

### Out of Scope
- Creating real incident records (`INC-XXXX.json`)
- Populating `data/incidents/`
- Importing external datasets or scraping
- Creating product code, CLI, static site, database, or scraper
- Cloning external repositories
- Copying third-party files, data, or code

---

## Deliverables

| File | Description | Status |
|------|-------------|--------|
| `FIRST_INCIDENT_CANDIDATE_DOSSIERS.md` | 10–20 candidate dossiers | Pending |
| `FIRST_INCIDENT_CANDIDATE_REVIEW_TABLE.md` | Summary review table | Pending |
| `FIRST_INCIDENT_SOURCE_REVIEW_NOTES.md` | Source/license review notes | Pending |
| `FIRST_INCIDENT_SELECTION_RECOMMENDATION.md` | Selection recommendation | Pending |
| `work-items/T006.../TASK.md` | This file | In Progress |
| `work-items/T006.../VALIDATION.md` | Validation checklist | Pending |
| `work-items/T006.../IMPLEMENTATION_REPORT.md` | Implementation report | Pending |
| `work-items/T006.../DECISIONS.md` | Decisions log | Pending |

---

## Constraints

- **No real incident records.** Do not create `INC-0001.json` or any incident JSON file.
- **No `data/incidents/` population.** The folder must contain only `.gitkeep` after this task.
- **No external dataset import.** Do not import or copy AIID, OECD, AIAAIC, MIT Tracker, or IBM data.
- **No product code.** No scraper, CLI, static site, or database logic.
- **No third-party content copying.** All summaries must be written in Caesar's own words.
- **Candidate documents only.** Every dossier must be clearly labelled: `Candidate only — not an incident record`.
- **No `INC-XXXX` IDs.** Use `CAND-001` format only.
- **Careful hedging language.** Use "appears to", "reportedly", "according to", "may have" where facts are uncertain.
- **No unsupported legal conclusions.** Do not assert legal liability, breach, or violation without authoritative public source.

---

## Prerequisites

- [x] T005 complete — schema and taxonomy files created
- [x] T006 branch created from commit `499205e`
- [x] Reference files read: schema, taxonomy JSONs, policies, contracts

---

## Validation Checklist

See `VALIDATION.md` in this folder.

---

## Commit message

```
research: prepare first incident candidate dossiers (T006)
```
