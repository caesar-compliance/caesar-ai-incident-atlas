# T007 Validation

**Task:** T007 — First Incident Record Creation Plan  
**Branch:** `docs/T007-first-incident-record-creation-plan`  
**Date validated:** 19 May 2026

---

## Deliverables Checklist

| Item | Expected | Status |
|---|---|---|
| `FIRST_INCIDENT_RECORD_CREATION_PLAN.md` | Creation plan, order of ops, field rules | ✅ Created |
| `APPROVED_CANDIDATE_SET_FOR_RECORD_CREATION.md` | 10 approved + 4 postponed + 1 rejected, wave assignments, open questions | ✅ Created |
| `INCIDENT_FIELD_MAPPING_DRAFTS.md` | Draft field mappings for all 10 approved candidates | ✅ Created |
| `SOURCE_TO_FIELD_TRACEABILITY_MATRIX.md` | Source-to-field traceability for Tier 1 candidates | ✅ Created |
| `RECORD_CREATION_QA_CHECKLIST.md` | Full QA checklist for record creation | ✅ Created |
| `T008_FIRST_RECORD_BATCH_RECOMMENDATION.md` | Recommendation for T008 scope, pre-conditions, ID sequence | ✅ Created |
| `work-items/T007.../TASK.md` | Task scope | ✅ Created |
| `work-items/T007.../DECISIONS.md` | Decisions including schema observations | ✅ Created |
| `work-items/T007.../VALIDATION.md` | This file | ✅ Created |
| `work-items/T007.../IMPLEMENTATION_REPORT.md` | Implementation report | ✅ Created |

---

## Constraint Checklist

| Constraint | Expected | Status |
|---|---|---|
| No final incident records created | `data/incidents/` contains only `.gitkeep` | ✅ Confirmed |
| No `INC-XXXX` IDs assigned to files | No INC- IDs in filenames or JSON files | ✅ Confirmed |
| No incident JSON files | No `.json` files in `data/incidents/` | ✅ Confirmed |
| No external dataset import | No AIID/OECD/AIAAIC/MIT/IBM data copied | ✅ Confirmed |
| No third-party content copied | All text original | ✅ Confirmed |
| No product code | No scripts, CLI, scraper, static site, database | ✅ Confirmed |
| No external repo cloned | No external repos added | ✅ Confirmed |
| Schema not modified | `schemas/incident.schema.json` unchanged | ✅ Confirmed |
| All docs marked as planning | Every new file labelled "Planning document" | ✅ Confirmed |
| All candidates referenced by CAND-NNN only | No INC- IDs in planning docs | ✅ Confirmed |

---

## Schema Usability Observations Confirmed Recorded

| Observation | Recorded in | Status |
|---|---|---|
| `source.database` field too narrow — must rename before T008 | DECISIONS.md DEC-T007-001, FIRST_INCIDENT_RECORD_CREATION_PLAN.md Section 10 | ✅ |
| `incident_date` partial precision workaround defined | DECISIONS.md DEC-T007-003 | ✅ |
| `evidence_required` EV-XXX prefix convention defined | DECISIONS.md DEC-T007-004 | ✅ |
| `failure_modes`/`controls` canonical ID-only convention defined | DECISIONS.md DEC-T007-005 | ✅ |
| `lessons` governance-orientation rule defined | DECISIONS.md DEC-T007-006 | ✅ |
| `summary` original writing rule defined | DECISIONS.md DEC-T007-007 | ✅ |

---

## Lifecycle Documentation Update Checklist

| File | Updated | Notes |
|---|---|---|
| `README.md` | ✅ | Added T007 planning files to repo structure |
| `ROADMAP.md` | ✅ | T007 marked complete; T008 as next |
| `PROJECT_STATE.md` | ✅ | Phase table and version updated |
| `NEXT_ACTIONS.md` | ✅ | T008 pre-conditions and conditions clearly stated |
| `CHANGELOG.md` | ✅ | 0.2.6 entry added |
| `REPO_INVENTORY.md` | ✅ | All new T007 files listed |
| `docs/DECISION_LOG.md` | ✅ | DEC-038 through DEC-045 added |

---

## Data Integrity Confirmation

- `data/incidents/` — Contains `.gitkeep` only. No incident records. ✅
- `data/taxonomy/` — Unchanged from T005. ✅
- `schemas/incident.schema.json` — Unchanged from T005. ✅

---

## Unresolved Risks

1. **`source.database` schema rename** — required before T008; schema update is the first T008 action.
2. **Individual naming policy** — not yet confirmed by Control Tower (victim in CAND-006, claimant in CAND-011, attorney in CAND-003).
3. **CAND-012 Dutch language** — primary source in Dutch; English paraphrase required; official translation not confirmed.
4. **CAND-011 exact interaction date** — must be confirmed from CRT ruling.
5. **SyRI discontinuation primary source** — media reports confirm but primary government source not yet identified.
6. **FM-SEC coverage gap** — still no Tier 1 or Tier 2 security/prompt injection incident in the approved set.
