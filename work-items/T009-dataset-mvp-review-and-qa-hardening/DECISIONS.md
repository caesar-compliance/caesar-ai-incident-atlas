# T009 Decisions Log

**Task:** T009 — Dataset MVP Review and QA Hardening  
**Branch:** `qa/T009-dataset-mvp-review-and-qa-hardening`  
**Date:** 19 May 2026

---

## DEC-T009-001 — Formal Schema Validator: jsonschema 4.23.0 Used

**Decision:** Formal schema validation performed using `jsonschema` 4.23.0 (already installed) with `Draft202012Validator`. All 4 records pass with zero errors.

**Rationale:** T008 identified this as an unresolved risk. `jsonschema` was available locally without new installation. Validation confirmed.

---

## DEC-T009-002 — No Record Corrections Required

**Decision:** All 4 incident records pass formal schema validation and full taxonomy cross-check with no issues. No corrections made to JSON files.

**Rationale:** Records were well-formed in T008. T009 validation confirms no defects. Only documentation fix required (see DEC-T009-003).

---

## DEC-T009-003 — Fix Stale `database` Reference in DATASET_MVP_VALIDATION_PLAN.md

**Decision:** `docs/validation/DATASET_MVP_VALIDATION_PLAN.md` contained a stale reference to `source.database` (the field renamed to `source_type` in T008 DEC-038). Updated to `source_type`.

**Rationale:** The validation plan is a normative document referenced before record creation. A stale field name would cause confusion for future curators.

---

## DEC-T009-004 — INC-0001 CourtListener URL: Accept as-is; Canonical Reference Already in Title

**Decision:** INC-0001 source URL (CourtListener PDF) accepted as-is. The source `title` field already includes the canonical court reference: `Mata v. Avianca, Inc., No. 22-cv-1461 (S.D.N.Y.)`. No URL change made.

**Rationale:** The canonical PACER case reference is embedded in `title` and `date_note`. If the CourtListener URL changes, the record can be updated to the PACER or court website URL using the canonical reference. This is sufficient for v0.2 governance purposes.

---

## DEC-T009-005 — INC-0003 CRT URL: Accept as-is; Canonical Citation Already in Title

**Decision:** INC-0003 source URL accepted as-is. The canonical citation `Moffatt v. Air Canada, 2024 BCCRT 149` is already in the `title` field.

**Rationale:** Canonical citation is sufficient for permanent identification. CRT decision search at `decisions.civilresolutionbc.ca` is the stable access path. No change needed.

---

## DEC-T009-006 — INC-0004 Dutch Language: Flagging Already Adequate; No Change

**Decision:** INC-0004 source title already states "(Dutch; key findings widely reported in English)". The `summary` clearly attributes findings to "the ruling of the Hague District Court." No further flagging needed.

**Rationale:** The existing wording meets the source risk standard for T009. The risk is documented in `FIRST_BATCH_SOURCE_RISK_REVIEW.md` as a residual unresolved risk for future review if discrepancies emerge.

---

## DEC-T009-007 — INC-0004 SyRI Discontinuation: Mark as Unresolved; No Speculation Added

**Decision:** The SyRI discontinuation claim in `impact` remains as cautiously worded ("was discontinued following the ruling"). No primary Dutch government announcement URL identified. Marked as unresolved risk in T009 documents.

**Rationale:** Cannot independently confirm a specific primary URL. The cautious wording in the `impact` field is appropriate. No speculation or unsupported URL added.

---

## DEC-T009-008 — Draft Sectors: Keep; Add Governance Note

**Decision:** `transportation-autonomous` (INC-0002) and `retail-ecommerce` (INC-0003) remain as `draft` sector IDs. No rename to `general`. Decision documented in T009 with a note for taxonomy review in T010+.

**Rationale:** These sectors accurately represent the incidents. Using `general` would lose meaningful categorisation. The sectors exist in `data/taxonomy/sectors.json` with explicit `draft` status. Future taxonomy stabilisation is the correct path.

---

## DEC-T009-009 — FM-REL Draft Status: Accept for v0.2

**Decision:** `FM-REL` (Reliability) is `draft` status in the taxonomy but used in INC-0001 and INC-0002. Accepted for v0.2 per the taxonomy file's `usage_note`: "Use top-level FM-REL only in v0.2 records." No change.

**Rationale:** The taxonomy explicitly permits FM-REL at top-level in v0.2. Usage is correct.

---

## DEC-T009-010 — T010 Requires Control Tower Approval; Scope to Be Defined

**Decision:** T010 — Second-Wave Candidate-to-Record Plan or Second-Wave Record Batch — requires explicit Control Tower approval after T009 review. T010 must not automatically create all 6 remaining records.

**Rationale:** Each batch is a governance gate. Control Tower defines T010 scope based on T009 findings.
