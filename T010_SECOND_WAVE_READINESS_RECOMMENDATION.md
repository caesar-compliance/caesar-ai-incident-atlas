# T010 — Second-Wave Readiness Recommendation

> **Task:** T009 — Dataset MVP Review and QA Hardening  
> **Prepared:** 19 May 2026  
> **Status:** Recommendation only — T010 requires explicit Control Tower approval

---

## T009 Finding

The first Dataset MVP batch (INC-0001 through INC-0004) has been formally validated. All records passed schema and taxonomy checks with zero issues. No blocking problems were found.

**The dataset is ready for second-wave expansion, subject to Control Tower approval.**

---

## Recommended T010 Scope Options

Control Tower should choose one of the following options for T010:

### Option A — Second-Wave Record Batch (Full)

Create all 6 remaining Tier 2/3 records in one batch:

| Candidate | Proposed ID | Notes |
|---|---|---|
| CAND-002 | INC-0005 | Tier 2 candidate |
| CAND-004 | INC-0006 | Tier 2 candidate |
| CAND-005 | INC-0007 | Tier 2 candidate |
| CAND-009 | INC-0008 | Tier 3 candidate |
| CAND-010 | INC-0009 | Tier 3 candidate |
| CAND-015 | INC-0010 | Tier 3 candidate |

**Risk:** Tier 2/3 candidates rely more heavily on secondary or credible media sources. Source verification must be completed per `SOURCE_VERIFICATION_WORKFLOW.md` before each record is created.

### Option B — Second-Wave Plan Only (No Records Yet)

Create a detailed second-wave record creation plan (analogous to T007) before any second-wave records are committed. This allows Control Tower to review planned source verification, field mappings, and open questions before execution.

### Option C — Partial Second-Wave Batch

Create only the Tier 2 candidates (CAND-002, CAND-004, CAND-005) in T010, deferring Tier 3 (CAND-009, CAND-010, CAND-015) to T011.

---

## Pre-Conditions for T010 (All Options)

1. **Control Tower approves T009 findings** (this document + `DATASET_MVP_REVIEW_REPORT.md`).
2. **Control Tower confirms T010 scope** (Option A, B, or C above).
3. **If records are created:** Per-candidate source verification completed per `SOURCE_VERIFICATION_WORKFLOW.md` and `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`.
4. **T010 formally initiated** by Control Tower.

---

## Constraints for T010 (If Records Created)

- No records beyond INC-0010 without further Control Tower approval.
- QA checklist (`RECORD_CREATION_QA_CHECKLIST.md`) completed per record before commit.
- No external dataset import.
- Careful hedging language throughout — Tier 2/3 candidates have more reliance on secondary sources.
- No unsupported legal conclusions.
- No new failure mode or control IDs used without taxonomy approval.
- Draft sector IDs may be used where no stable alternative exists.

---

## Secondary Recommendations for T010+

1. **Taxonomy stabilisation review** — `transportation-autonomous` and `retail-ecommerce` sectors should be evaluated for promotion to `stable` once 2+ records per sector exist.
2. **INC-0004 SyRI discontinuation** — If a primary Dutch government source URL is identified during T010 research, add it as a second source to INC-0004.
3. **`related_incidents` field** — Once INC-0005+ exist, review whether any cross-record relationships should be documented.
4. **Formal schema validator integration** — Consider adding `jsonschema` validation as a documented pre-commit check step in `RECORD_CREATION_QA_CHECKLIST.md`.

---

## Summary

| Area | Status |
|---|---|
| First batch records | Validated and hardened ✅ |
| Schema | No changes needed ✅ |
| Taxonomy | No issues ✅ |
| Source risks | 2 accepted, 2 residual, 1 unresolved ⚠️ |
| Ready for T010? | **Yes — pending Control Tower approval** |
