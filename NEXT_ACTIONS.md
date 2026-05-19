# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **documentation and blueprint** phase. No product code, no package managers, no dependencies, no incident records until T003 is complete and v0.3 Dataset MVP is approved by the Control Tower.

The clean-room policy is now active. See `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` and `LOCAL_ARCHITECTURE_MINING_PLAN.md` before studying any external source.

---

## Current Status

| Task | Status |
|---|---|
| T001 / v0.2.0 — Full-scale blueprint | Complete |
| T002 — Clean-room acceleration policy | Complete |
| T003 — Data model / taxonomy / citation contract | Next |
| v0.3 Dataset MVP | Blocked until T003 complete |

---

## Next Recommended Step: T003

**T003 — Review and reconcile DATA_MODEL_DRAFT.md, TAXONOMY_DRAFT.md, and source/citation policy into a stable v0.2 draft contract.**

The dataset MVP (v0.3) does not begin until T003 is complete and approved by the Control Tower.

### T003 scope

1. **Review DATA_MODEL_DRAFT.md** — resolve the open questions listed at the end of the document:
   - Incident ID convention (sequential vs content-based).
   - Taxonomy versioning approach.
   - Evidence requirement format (free-text vs EV- IDs).
   - Export format (single file vs per-incident).
   - Schema strictness for MVP.

2. **Review TAXONOMY_DRAFT.md** — confirm:
   - Top-level failure mode categories are complete and stable.
   - Sub-categories are sufficient for the first 10–20 incident records.
   - Control taxonomy covers the most important control types.
   - Evidence type registry is aligned with `caesar-ai-evidence` schemas.
   - Sector taxonomy covers the most important sectors.

3. **Define source/citation policy** — produce a clear written policy covering:
   - Which external databases may be cited as sources (AIID, OECD, AIAAIC, MIT, official reports).
   - What license verification is required before citing a specific incident.
   - How to write original summaries based on publicly available information.
   - What confidence levels mean in practice.
   - How to handle incidents with limited public documentation.

4. **Produce a stable v0.2 draft contract** — a single document (or updated set of documents) that the dataset MVP team can use as a stable reference. No changes to the data model or taxonomy after this point without a versioned update.

### T003 deliverables

- Updated `docs/DATA_MODEL_DRAFT.md` with resolved open questions.
- Updated `docs/TAXONOMY_DRAFT.md` with confirmed stable taxonomy.
- New `docs/SOURCE_AND_CITATION_POLICY.md` defining citation rules.
- Updated `NEXT_ACTIONS.md` with v0.3 Dataset MVP tasks.
- Updated `CHANGELOG.md`, `PROJECT_STATE.md`, `REPO_INVENTORY.md`.

---

## Safe Autonomous Tasks

The following tasks can be executed autonomously without Control Tower approval:

- Improving documentation formatting and clarity.
- Adding examples to TAXONOMY_DRAFT.md or DATA_MODEL_DRAFT.md.
- Updating REPO_INVENTORY.md when new files are added.
- Updating CHANGELOG.md with accurate entries.
- Fixing typos or broken links in documentation.
- Completing a THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md for a source already listed in the register.

---

## Tasks Requiring Control Tower Approval

The following tasks require Artem / Control Tower review before execution:

- Starting T003 (data model / taxonomy / citation contract review).
- Starting v0.3 Dataset MVP.
- Implementing any product code (schemas, scripts, data files).
- Selecting incident sources and verifying data licenses.
- Choosing the static site generator technology.
- Defining the export format for `caesar-ai-evidence`.
- Any cross-repository changes or integrations.
- Modifying taxonomy structures after T003 stabilization.
- Any reuse of third-party code or data (requires clean-room policy approval process).

---

## Blocked Tasks

- v0.3 Dataset MVP — blocked until T003 is complete and approved.
- Incident record creation — blocked until T003 source/citation policy is approved.
- Schema implementation — blocked until T003 data model is stabilized.

---

## Cross-Repository Coordination Notes

- Incident export format must be compatible with `caesar-ai-evidence` incident-mapping schema.
- Verify schema compatibility with `caesar-ai-evidence` before finalizing incident schema (part of T003).
- Future Governance OS integration requires stable incident IDs and taxonomy IDs (must be locked in T003).
- Do not edit `caesar-ai-evidence` or any sibling repository from this repository.
- License verifications for AIID, OECD, AIAAIC, and MIT tracker are pending — required before dataset MVP.
