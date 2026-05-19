# T008 — First Record Batch Recommendation

> **Planning document — not incident records.**  
> This document recommends the exact scope for T008 — the first incident record creation task.  
>
> **Prepared:** 19 May 2026  
> **Task:** T007 — First Incident Record Creation Plan  
> **Branch:** `docs/T007-first-incident-record-creation-plan`

---

## Recommendation

**T008 should create exactly four incident records: the Tier 1 candidates only.**

| Future ID | Candidate | Title |
|---|---|---|
| INC-0001 | CAND-003 | LLM fabricated legal case citations (Mata v. Avianca) |
| INC-0002 | CAND-006 | Autonomous vehicle pedestrian fatality (NTSB HWY18MH010) |
| INC-0003 | CAND-011 | Air Canada chatbot unauthorised contract (BC CRT ruling) |
| INC-0004 | CAND-012 | Dutch SyRI automated benefits denial (Hague District Court) |

**T008 should not create all 10 approved records** unless Control Tower explicitly approves expanded scope.

---

## Rationale for Tier 1 First

### Why these four?

1. **All four have unambiguous primary official sources.** Court records and government investigation reports are the strongest possible source types. There is no ambiguity about what happened or who confirmed it.

2. **Very low acceptance risk.** Risk of factual error, unsupported legal conclusion, or source dispute is minimal for all four. The facts are court-confirmed or government-investigation-confirmed.

3. **Good failure mode diversity.** The four records together cover:
   - FM-HALL (CAND-003, CAND-011)
   - FM-SAFE (CAND-006)
   - FM-BIAS + FM-TRANS (CAND-012)
   - FM-UNAUTH (CAND-011)

4. **Good sector diversity.** Legal, Transportation, Consumer Services, Government — four distinct sectors.

5. **Establishes quality baseline.** Starting with the four strongest candidates establishes the quality bar for all subsequent records. If any issues arise (schema friction, wording problems, QA failures), they can be resolved before the more complex second-wave records are attempted.

### Why not all 10 at once?

- Second-wave candidates (Tier 2/3) require more careful source verification and hedging.
- CAND-004 requires hedging for no direct company confirmation.
- CAND-005 requires confirming the exact Meta blog post URL is stable.
- CAND-009 requires careful victim privacy framing.
- CAND-010 requires academic citation with careful vendor characterisation.
- CAND-015 benefits from a specific enforcement action citation not yet confirmed.
- Creating all 10 in one batch increases risk of inconsistent quality and makes review harder.

---

## Pre-Conditions for T008

All of the following must be met before T008 begins:

### P1 — Control Tower Approval
- Explicit Control Tower approval of T008 initiation.
- Control Tower confirms Tier 1 candidate set (CAND-003, CAND-006, CAND-011, CAND-012).
- Control Tower confirms proposed ID sequence (INC-0001 through INC-0004).

### P2 — Schema Update
- `schemas/incident.schema.json` updated: rename `source.database` → `source_type` with expanded enum.
- Schema update reviewed and approved by Control Tower before any record is written.
- See `FIRST_INCIDENT_RECORD_CREATION_PLAN.md` Section 10 for proposed schema change.

### P3 — Source Verification
For each of the four Tier 1 candidates:
- Primary source URL confirmed live and accessible.
- Access date recorded.
- Content confirms facts described in the candidate dossier.

| Candidate | Source to verify |
|---|---|
| CAND-003 | CourtListener — Mata v. Avianca, S.D.N.Y., 22-cv-1461 |
| CAND-006 | NTSB — HWY18MH010 investigation page |
| CAND-011 | BC Civil Resolution Tribunal — confirm case number and URL |
| CAND-012 | rechtspraak.nl — ECLI:NL:RBDHA:2020:1878 |

### P4 — Open Questions Resolved
- Confirm whether individual names (attorney in CAND-003, victim in CAND-006, claimant in CAND-011) are to be included or excluded.
- Confirm whether the SyRI discontinuation can be sourced from a primary document (CAND-012).
- Confirm exact date of the CAND-011 chatbot interaction from the CRT ruling.
- Confirm whether English translation of CAND-012 court key findings is available.

---

## T008 Proposed Deliverables

1. Schema update: `schemas/incident.schema.json` — rename `source.database` → `source_type`.
2. Four incident JSON files:
   - `data/incidents/INC-0001.json`
   - `data/incidents/INC-0002.json`
   - `data/incidents/INC-0003.json`
   - `data/incidents/INC-0004.json`
3. `RECORD_CREATION_QA_CHECKLIST.md` completed for each record.
4. Work item folder `work-items/T008.../` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md.
5. Updated lifecycle documents.

---

## T008 Constraints

- **One record per commit** (unless Control Tower approves batch commit).
- **No Postponed or Rejected candidates** in T008.
- **No second-wave candidates** in T008 unless explicitly approved.
- **No product code, scraper, CLI, or static site** in T008.
- **QA checklist passed** before each record is committed.
- **git diff reviewed** before each commit.

---

## T009 Scope Preview (Not T008)

After T008 is complete and reviewed, T009 should address the second-wave candidates:
- CAND-002 (INC-0005 planned)
- CAND-004 (INC-0006 planned)
- CAND-005 (INC-0007 planned)
- CAND-009 (INC-0008 planned)
- CAND-010 (INC-0009 planned)
- CAND-015 (INC-0010 planned)

T009 requires separate Control Tower approval. ID sequence above is provisional.

---

## Decision Point for Control Tower

Control Tower must decide:

1. **Approve T008 scope** as recommended (4 Tier 1 records only).
2. **Confirm ID sequence** (INC-0001 through INC-0004 for Tier 1).
3. **Approve the schema rename** (`source.database` → `source_type`) as T008 pre-work.
4. **Confirm individual naming policy** for records (victim, claimant, attorney).
5. **Initiate T008** formally.

Until Control Tower approves, `data/incidents/` must remain empty except `.gitkeep`.
