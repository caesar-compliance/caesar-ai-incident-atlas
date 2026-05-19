# T010 — Second-Wave Incident Record Batch

**Status:** Complete  
**Branch:** `data/T010-second-wave-incident-record-batch`  
**Starting commit:** `a0be13f` (T009 final)  
**Date completed:** 19 May 2026  
**Assigned to:** Cascade (execution agent)  
**Approved by:** Control Tower (Option A — all 6 second-wave records)

---

## Objective

Create incident JSON records for the 6 approved second-wave candidates (CAND-002, CAND-004, CAND-005, CAND-009, CAND-010, CAND-015), subject to passing the source gate. No new candidates, no INC-0011+.

---

## Scope

### In Scope
- Source gate review for 6 approved candidates
- Incident JSON records for candidates passing the source gate
- `SECOND_WAVE_SOURCE_VERIFICATION_LOG.md`
- `SECOND_WAVE_QA_REPORT.md`
- Work item folder
- Formal schema and taxonomy validation
- Lifecycle document updates

### Out of Scope
- INC-0011 or higher
- Records for postponed/rejected candidates (CAND-001, 007, 008, 013, 014)
- Product code, scraper, CLI, static site, database
- External dataset import
- External repo cloning
- New taxonomy IDs (none required)

---

## Approved ID Mapping

| Candidate | Assigned ID | Sector |
|---|---|---|
| CAND-002 | INC-0005 | `law-enforcement` |
| CAND-004 | INC-0006 | `hiring-employment` |
| CAND-005 | INC-0007 | `media-content` |
| CAND-009 | INC-0008 | `media-content` |
| CAND-010 | INC-0009 | `healthcare-medical` |
| CAND-015 | INC-0010 | `hiring-employment` |

---

## Source Gate Results

| Candidate | Gate | Source Quality | Confidence |
|---|---|---|---|
| CAND-002 | ✅ PASS | Strong (ACLU + NIST FRVT) | high |
| CAND-004 | ✅ PASS | Strong secondary (Reuters) | high |
| CAND-005 | ✅ PASS | Strong (Meta company statement) | high |
| CAND-009 | ✅ PASS | Medium-Strong (Microsoft statement + OSA) | medium |
| CAND-010 | ✅ PASS | Strong (peer-reviewed Science journal) | high |
| CAND-015 | ✅ PASS | Strong regulatory (EEOC + NYC LL144) | medium |

**All 6 passed. All 6 records created. No candidates skipped.**

---

## Validation Results

| Check | Result |
|---|---|
| Formal schema validation (jsonschema 4.23.0, Draft 2020-12) | ✅ All 6 PASS |
| JSON syntax | ✅ All 6 PASS |
| Taxonomy: failure_modes | ✅ All IDs valid |
| Taxonomy: controls | ✅ All IDs valid |
| Taxonomy: sectors | ✅ All IDs valid (all stable — no draft sectors) |
| Taxonomy: severity | ✅ All valid |
| Taxonomy: confidence | ✅ All valid |
| Taxonomy: EV refs | ✅ All valid |
| No `database` field | ✅ All 6 PASS |
| No INC-0011+ | ✅ Confirmed |
| Naming policy | ✅ All 6 PASS |
| No unsupported legal conclusions | ✅ All 6 PASS |
| No copied source text | ✅ PASS |

---

## Commit Message

```
data: add second-wave incident records (T010)
```
