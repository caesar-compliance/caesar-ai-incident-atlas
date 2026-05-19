# T008 — First Tier 1 Incident Record Batch

**Status:** Complete  
**Branch:** `data/T008-first-tier-1-incident-record-batch`  
**Starting commit:** `34dabe9` (T007 final)  
**Date completed:** 19 May 2026  
**Assigned to:** Cascade (execution agent)  
**Approved by:** Control Tower (T007 plan approved; T008 formally initiated)

---

## Objective

Create the first 4 real incident records for the Tier 1 candidates approved by Control Tower. Apply schema pre-work (rename `source.database` → `source_type`). Validate all records against taxonomy and schema. No additional records beyond the approved four.

---

## Scope

### In Scope
- Schema update: rename `source.database` → `source_type` with expanded enum
- 4 incident JSON files in `data/incidents/`
- `FIRST_RECORD_BATCH_SOURCE_VERIFICATION_LOG.md`
- `FIRST_RECORD_BATCH_QA_REPORT.md`
- Work item folder files
- Update lifecycle documents

### Out of Scope
- Records beyond INC-0001 through INC-0004
- Tier 2/3 candidates (T009)
- Product code, scraper, CLI, static site, database
- External dataset import
- Copying third-party files, data, or code

---

## Records Created

| ID | Filename | Candidate |
|---|---|---|
| INC-0001 | `INC-0001-mata-v-avianca-court-citations.json` | CAND-003 |
| INC-0002 | `INC-0002-autonomous-vehicle-pedestrian-fatality-ntsb.json` | CAND-006 |
| INC-0003 | `INC-0003-air-canada-chatbot-contract-bc-crt.json` | CAND-011 |
| INC-0004 | `INC-0004-dutch-syri-benefits-system-hague-court.json` | CAND-012 |

---

## Constraints

- Exactly 4 real incident records. No more.
- No `INC-0005` or higher in this task.
- No second-wave candidates.
- No external dataset import.
- No product code.
- Schema update (`source_type`) applied before records committed.
- All records validate against updated schema.
- All taxonomy IDs verified against taxonomy files.
- No copied source text.
- No unsupported legal conclusions.
- Naming policy: use official case names; avoid naming non-public individuals.

---

## Commit Message

```
data: add first tier 1 incident records (T008)
```
