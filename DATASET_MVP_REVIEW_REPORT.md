# Dataset MVP Review Report

> **Task:** T009 — Dataset MVP Review and QA Hardening  
> **Branch:** `qa/T009-dataset-mvp-review-and-qa-hardening`  
> **Prepared:** 19 May 2026  
> **Scope:** INC-0001 through INC-0004 (first 4 Tier 1 records)

---

## Executive Summary

The first Dataset MVP batch of 4 incident records has been reviewed and hardened. All 4 records passed formal JSON Schema validation (jsonschema 4.23.0, Draft 2020-12) and full taxonomy cross-validation with zero issues. No corrections were required to the JSON files. One documentation fix was applied to `docs/validation/DATASET_MVP_VALIDATION_PLAN.md` (stale `database` field reference updated to `source_type`). All 5 source risk items from T008 were reviewed; none required record changes. The dataset is in good shape for T010 second-wave planning.

---

## 1 — Records in Scope

| ID | Filename | Sector | Severity |
|---|---|---|---|
| INC-0001 | `INC-0001-mata-v-avianca-court-citations.json` | `legal-compliance` | medium |
| INC-0002 | `INC-0002-autonomous-vehicle-pedestrian-fatality-ntsb.json` | `transportation-autonomous` | critical |
| INC-0003 | `INC-0003-air-canada-chatbot-contract-bc-crt.json` | `retail-ecommerce` | medium |
| INC-0004 | `INC-0004-dutch-syri-benefits-system-hague-court.json` | `public-sector` | high |

---

## 2 — Formal Schema Validation

**Validator:** Python `jsonschema` 4.23.0, `Draft202012Validator`  
**Schema:** `schemas/incident.schema.json`

| Record | Result |
|---|---|
| INC-0001 | ✅ PASS |
| INC-0002 | ✅ PASS |
| INC-0003 | ✅ PASS |
| INC-0004 | ✅ PASS |

Zero schema violations across all 4 records.

**Note on T008 unresolved risk:** T008 identified "no formal JSON Schema validator run" as an unresolved risk. That risk is now resolved. Formal validation confirms all records are schema-compliant.

---

## 3 — Taxonomy Validation

All taxonomy references checked against:
- `data/taxonomy/failure_modes.json`
- `data/taxonomy/controls.json`
- `data/taxonomy/sectors.json`
- `data/taxonomy/evidence_types.json`
- `data/taxonomy/severity_levels.json`
- `data/taxonomy/confidence_levels.json`

**Result: zero taxonomy issues.**

### Failure Mode Coverage

| ID | Status | Used in |
|---|---|---|
| FM-HALL | stable | INC-0001, INC-0003 |
| FM-REL | **draft** | INC-0001, INC-0002 |
| FM-SAFE | stable | INC-0002 |
| FM-UNAUTH | stable | INC-0003, INC-0004 |
| FM-BIAS | stable | INC-0004 |
| FM-TRANS | stable | INC-0004 |

Note: FM-REL is draft; taxonomy `usage_note` explicitly permits top-level FM-REL in v0.2 records.

### Control Coverage

| ID | Status | Used in |
|---|---|---|
| CTL-OVER-001 | stable | All 4 records |
| CTL-TEST-001 | stable | INC-0001, INC-0002, INC-0003 |
| CTL-DOC-001 | stable | INC-0001 |
| CTL-MON-001 | stable | INC-0002 |
| CTL-RISK-001 | stable | INC-0002, INC-0004 |
| CTL-AGENT-001 | stable | INC-0003 |
| CTL-AGENT-002 | stable | INC-0003 |
| CTL-DOC-002 | stable | INC-0004 |
| CTL-TEST-002 | stable | INC-0004 |

### Sector Coverage

| ID | Status | Used in |
|---|---|---|
| `legal-compliance` | stable | INC-0001 |
| `transportation-autonomous` | **draft** | INC-0002 |
| `retail-ecommerce` | **draft** | INC-0003 |
| `public-sector` | stable | INC-0004 |

Both draft sectors are accurately assigned. Taxonomy stabilisation deferred to T010+.

### Severity and Confidence

All 4 records use valid severity values (`medium`, `critical`, `high`) and `confidence: high`. All from taxonomy.

### Evidence References

All EV-XXX references (EV-001 through EV-014 range) verified in `evidence_types.json`. Zero unknown references.

---

## 4 — Source Risk Review Summary

See `FIRST_BATCH_SOURCE_RISK_REVIEW.md` for full detail.

| Risk | Resolution |
|---|---|
| INC-0001 CourtListener URL | Accepted as-is; canonical reference in title and date_note |
| INC-0003 CRT portal URL | Accepted as-is; canonical citation `2024 BCCRT 149` in title |
| INC-0004 Dutch language | Flagging already adequate in source title; no change |
| INC-0004 SyRI discontinuation source | Marked unresolved; cautious wording retained |
| Draft sectors (INC-0002, INC-0003) | Decision to keep; defer stabilisation to T010+ |

---

## 5 — Record Corrections Made

**None.** All 4 records passed formal validation without requiring corrections.

---

## 6 — Documentation Fix Made

- `docs/validation/DATASET_MVP_VALIDATION_PLAN.md`: removed stale reference to `source.database` field (renamed to `source_type` in T008). Updated section 1 to use current field name.

---

## 7 — Residual Unresolved Risks (Carried Forward)

1. **INC-0004 SyRI discontinuation** — No primary Dutch government URL confirmed. `impact` field uses cautious wording. Remains open.
2. **INC-0001 CourtListener URL** — Third-party archive. Canonical case reference embedded. Low risk.
3. **INC-0003 CRT URL** — Portal URL may change. Canonical citation `2024 BCCRT 149` embedded. Low risk.
4. **INC-0004 Dutch-language primary** — English-analysis-based summary. Risk only if a discrepancy with the Dutch text is identified.
5. **Draft sector stability** — `transportation-autonomous` and `retail-ecommerce` are draft. Requires taxonomy stabilisation in a future task.

---

## 8 — Overall Assessment

The first Dataset MVP batch is **validated and ready**. No blocking issues were found. The dataset is in good shape for T010 second-wave planning. Control Tower approval required before T010 begins.
