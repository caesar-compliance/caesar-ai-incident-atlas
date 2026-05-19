# First Batch — Formal Schema Validation Report

> **Task:** T009 — Dataset MVP Review and QA Hardening  
> **Branch:** `qa/T009-dataset-mvp-review-and-qa-hardening`  
> **Prepared:** 19 May 2026  
> **Validator:** Python `jsonschema` 4.23.0, `Draft202012Validator`  
> **Schema:** `schemas/incident.schema.json`

---

## Context

T008 identified "no formal JSON Schema validator run" as unresolved risk #6. T009 resolves this. Formal validation was performed using the `jsonschema` library (version 4.23.0), which was already installed in the local Python environment. No new dependencies were installed.

---

## Validator Used

| Field | Value |
|---|---|
| Library | `jsonschema` |
| Version | `4.23.0` |
| Validator class | `Draft202012Validator` |
| Schema draft | JSON Schema Draft 2020-12 (`$schema: https://json-schema.org/draft/2020-12/schema`) |
| Schema file | `schemas/incident.schema.json` |
| Method | `validator.iter_errors(record)` per record |

---

## Results

| Record | Schema Errors | Result |
|---|---|---|
| `INC-0001-mata-v-avianca-court-citations.json` | 0 | ✅ PASS |
| `INC-0002-autonomous-vehicle-pedestrian-fatality-ntsb.json` | 0 | ✅ PASS |
| `INC-0003-air-canada-chatbot-contract-bc-crt.json` | 0 | ✅ PASS |
| `INC-0004-dutch-syri-benefits-system-hague-court.json` | 0 | ✅ PASS |

**All 4 records: PASS. Zero schema violations.**

---

## What Was Validated

The schema enforces:

| Constraint | Schema rule | Validation result |
|---|---|---|
| `incident_id` present and matches `INC-XXXX` | `required` + `pattern: ^INC-[0-9]{4}$` | ✅ All 4 pass |
| `title` present, min 5 chars | `required` + `minLength: 5` | ✅ All 4 pass |
| `date` matches `DD Month YYYY` | `required` + `pattern` | ✅ All 4 pass |
| `sources` array with at least 1 item | `required` + `minItems: 1` | ✅ All 4 pass |
| Each source has `url`, `source_type`, `accessed` | `$defs/source required` | ✅ All 4 pass |
| `source_type` from enum | `enum` in `$defs/source` | ✅ All 4 pass |
| `source.accessed` matches date pattern | `pattern` in `$defs/source` | ✅ All 4 pass |
| No `database` field in source | `additionalProperties: false` on source | ✅ All 4 pass |
| `summary` present, min 20 chars | `required` + `minLength: 20` | ✅ All 4 pass |
| `failure_modes` array, min 1, each `FM-` prefixed | `required` + `minItems` + `pattern` | ✅ All 4 pass |
| `severity` from enum | `enum: [low, medium, high, critical]` | ✅ All 4 pass |
| `confidence` from enum | `enum: [low, medium, high]` | ✅ All 4 pass |
| `controls` array, min 1, each `CTL-` prefixed | `required` + `minItems` + `pattern` | ✅ All 4 pass |
| `evidence_required` array, min 1 | `required` + `minItems: 1` | ✅ All 4 pass |
| `lessons` array, min 1 | `required` + `minItems: 1` | ✅ All 4 pass |
| Optional fields (`sector`, `harms`, etc.) schema-compliant | `additionalProperties: true` | ✅ All 4 pass |

---

## Note on `additionalProperties: true`

The schema sets `additionalProperties: true` at the record level, which means fields not listed in `properties` (e.g., `date_note`, `ai_system_context`) are permitted. This is intentional per v0.2 lenient schema policy (DEC-018). Formal validation confirms all records comply with this lenient policy.

---

## Conclusion

T008 unresolved risk #6 ("No schema validator run") is **resolved**. Formal validation confirms all 4 records are schema-compliant with zero violations.
