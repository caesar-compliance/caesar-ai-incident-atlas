# TASK.md — T003: v0.2 Draft Contract Review and Reconciliation

**Work item:** T003
**Branch:** `docs/T003-v02-draft-contract-review`
**Date started:** 19 May 2026
**Assigned to:** AI execution agent (Kiro)
**Control Tower:** Artem / ChatGPT
**Starting commit:** `9a1c7f9`

---

## Objective

Review and reconcile the current draft product model into a stable v0.2 documentation contract for Caesar AI Incident Atlas. This task decides what the product model means before any implementation begins.

This task is documentation-only. No product code, no executable schemas, no incident records, no scraper, no static site, no Dataset MVP.

---

## Scope

### Files to create

- [x] `V0_2_DRAFT_PRODUCT_CONTRACT.md` — stable v0.2 contract covering all product model dimensions
- [x] `SOURCE_AND_CITATION_POLICY_DRAFT.md` — citation rules, confidence levels, wording rules
- [x] `V0_2_FIELD_PRIORITY_TABLE.md` — field-by-field priority table (required / optional / later)
- [x] `V0_2_TAXONOMY_REVIEW.md` — taxonomy category review (stable / draft / later)
- [x] `work-items/T003-v02-draft-contract-review/TASK.md` (this file)
- [x] `work-items/T003-v02-draft-contract-review/VALIDATION.md`
- [x] `work-items/T003-v02-draft-contract-review/IMPLEMENTATION_REPORT.md`
- [x] `work-items/T003-v02-draft-contract-review/DECISIONS.md`

### Files to update

- [x] `README.md`
- [x] `SPEC.md`
- [x] `ARCHITECTURE.md`
- [x] `ROADMAP.md`
- [x] `PROJECT_STATE.md`
- [x] `NEXT_ACTIONS.md` — must define T004 as next step
- [x] `CHANGELOG.md`
- [x] `REPO_INVENTORY.md`
- [x] `docs/DECISION_LOG.md`

---

## Constraints

- Documentation only.
- No product code.
- No executable schemas.
- No incident records.
- No external repo cloning.
- No third-party copied material.
- No scraper, static site, CLI, or database.
- No Dataset MVP.
- Do not claim the model is final.
- Do not claim legal compliance.
- Do not claim that integrations already exist.

---

## Why This Step Was Chosen

T002 established the clean-room policy. Before the Dataset MVP (v0.3) can begin, the team needs a stable, agreed-upon product model. Without this contract:

- different agents may implement different interpretations of the data model;
- the taxonomy may shift during dataset curation, requiring rework;
- the source/citation policy may be unclear, creating legal risk;
- the field priority may be wrong, leading to over-engineered or under-specified records.

T003 locks the model at the documentation level so that T004 (Dataset MVP Preparation) and v0.3 (Dataset MVP) can proceed with confidence.
