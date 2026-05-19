# Task — T004: Dataset MVP Preparation

**Work item:** T004
**Branch:** docs/T004-dataset-mvp-preparation
**Starting commit:** cf56751
**Date started:** 19 May 2026
**Status:** Complete

---

## Objective

Prepare the planning and safety documents required before creating the first 10–20 curated incident records. T004 is not the Dataset MVP itself. It is the preparation phase that must be complete and approved before v0.3 (Dataset MVP) begins.

---

## Scope

T004 produces documentation only. No code, no executable schemas, no incident records, no scrapers, no static site, no CLI, no database, no external repository cloning.

---

## Deliverables Checklist

### Work item folder (this folder)

- [x] `work-items/T004-dataset-mvp-preparation/TASK.md` — this file
- [x] `work-items/T004-dataset-mvp-preparation/VALIDATION.md`
- [x] `work-items/T004-dataset-mvp-preparation/IMPLEMENTATION_REPORT.md`
- [x] `work-items/T004-dataset-mvp-preparation/DECISIONS.md`

### Preparation documents

- [x] `DATASET_MVP_IMPLEMENTATION_PLAN.md` — what Dataset MVP means, folder structure, schema steps, validation, export, integration, approval gates
- [x] `FIRST_INCIDENT_SELECTION_CRITERIA.md` — how to select the first 10–20 incidents
- [x] `SOURCE_VERIFICATION_WORKFLOW.md` — step-by-step source verification process
- [x] `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` — license and source safety checks before use

### Updated existing files

- [x] `README.md`
- [x] `ARCHITECTURE.md`
- [x] `ROADMAP.md`
- [x] `PROJECT_STATE.md`
- [x] `NEXT_ACTIONS.md`
- [x] `CHANGELOG.md`
- [x] `REPO_INVENTORY.md`
- [x] `docs/DECISION_LOG.md`
- [x] `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` (if appropriate)

---

## Constraints

- Documentation only.
- No code.
- No executable schemas.
- No incident records.
- No copied third-party datasets.
- No scraper, static site, CLI, or database.
- No external repository cloning inside this repository.
- Do not claim legal compliance.
- Do not claim license verification is complete unless actually verified from official sources.
- Do not claim Dataset MVP exists.

---

## Rationale

T003 defined the stable v0.2 product model contract. T004 translates that contract into a concrete implementation plan and safety framework before any incident records are created. This staged approach reduces the risk of creating records that need to be reworked due to unclear model, source policy, or license status.

---

## References

- `V0_2_DRAFT_PRODUCT_CONTRACT.md` — stable v0.2 contract
- `SOURCE_AND_CITATION_POLICY_DRAFT.md` — citation rules
- `V0_2_FIELD_PRIORITY_TABLE.md` — field priority table
- `V0_2_TAXONOMY_REVIEW.md` — taxonomy status
- `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` — license classification
- `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` — pending license verifications
- `docs/DECISION_LOG.md` — DEC-022 (T004 sequencing decision)
