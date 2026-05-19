# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **documentation and blueprint** phase. No product code, no executable schemas, no incident records, no package managers, no dependencies until T004 is complete and v0.3 Dataset MVP is approved by the Control Tower.

The v0.2 draft contract is now stable. See `V0_2_DRAFT_PRODUCT_CONTRACT.md` before starting any implementation work.

The clean-room policy is active. See `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` and `LOCAL_ARCHITECTURE_MINING_PLAN.md` before studying any external source.

---

## Current Status

| Task | Status |
|---|---|
| T001 / v0.2.0 — Full-scale blueprint | Complete |
| T002 — Clean-room acceleration policy | Complete |
| T003 — v0.2 draft contract review | Complete |
| T004 — Dataset MVP Preparation | **Next** |
| v0.3 Dataset MVP | Blocked until T004 complete |

---

## Next Recommended Step: T004

**T004 — Dataset MVP Preparation.**

T004 is not the Dataset MVP itself. It prepares the implementation plan and candidate selection before any incident records are created. The Dataset MVP (v0.3) does not begin until T004 is complete and approved by the Control Tower.

### T004 scope

1. **Final schema implementation plan** — produce a clear plan for implementing the JSON Schema files defined in `docs/DATA_MODEL_DRAFT.md` and resolved in `V0_2_DRAFT_PRODUCT_CONTRACT.md`. This is a plan document, not the schema files themselves. The schema files will be created in v0.3.

2. **First 10–20 incident candidate selection criteria** — define the criteria for selecting the first batch of incident records:
   - Which failure mode categories should be represented?
   - Which sectors should be represented?
   - What minimum source quality is required?
   - How should the first batch be balanced across categories?
   - What makes a good first incident record (well-documented, clear governance lesson, strong source)?

3. **Source verification workflow** — produce a step-by-step workflow document for verifying sources before creating an incident record. This should operationalize the `SOURCE_AND_CITATION_POLICY_DRAFT.md` into a practical checklist.

4. **Licensing/source safety checklist** — produce a checklist for verifying data licenses before citing AIID, OECD, AIAAIC, MIT tracker, or other database sources. This should resolve the pending license verifications listed in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`.

5. **No data ingestion in T004** — T004 produces planning documents only. No incident records are created in T004 unless separately approved by the Control Tower.

### T004 deliverables

- `docs/DATASET_MVP_IMPLEMENTATION_PLAN.md` — schema implementation plan and file structure plan
- `docs/INCIDENT_CANDIDATE_CRITERIA.md` — selection criteria for first 10–20 incidents
- `docs/SOURCE_VERIFICATION_WORKFLOW.md` — step-by-step source verification checklist
- `docs/LICENSE_VERIFICATION_CHECKLIST.md` — data license verification checklist for each source database
- Updated `NEXT_ACTIONS.md` with v0.3 Dataset MVP tasks
- Updated `CHANGELOG.md`, `PROJECT_STATE.md`, `REPO_INVENTORY.md`, `DECISION_LOG.md`
- `work-items/T004-dataset-mvp-preparation/` — work item folder

### T004 constraints

- Documentation only.
- No executable schema files.
- No incident records.
- No product code.
- No data ingestion.

---

## Safe Autonomous Tasks

The following tasks can be executed autonomously without Control Tower approval:

- Improving documentation formatting and clarity.
- Fixing typos or broken links in documentation.
- Updating REPO_INVENTORY.md when new files are added.
- Updating CHANGELOG.md with accurate entries.
- Completing a THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md for a source already listed in the register.

---

## Tasks Requiring Control Tower Approval

The following tasks require Artem / Control Tower review before execution:

- Starting T004.
- Starting v0.3 Dataset MVP.
- Implementing any product code (schemas, scripts, data files).
- Creating any incident records.
- Selecting incident sources and verifying data licenses.
- Choosing the static site generator technology.
- Any cross-repository changes or integrations.
- Any reuse of third-party code or data.

---

## Blocked Tasks

- v0.3 Dataset MVP — blocked until T004 is complete and approved.
- Incident record creation — blocked until T004 source verification workflow is approved.
- Executable schema implementation — blocked until T004 schema implementation plan is approved.

---

## Cross-Repository Coordination Notes

- Incident export format must be compatible with `caesar-ai-evidence` incident-mapping schema. Verify compatibility in T004.
- Future Governance OS integration requires stable incident IDs (INC-0001 format) and taxonomy IDs — locked in v0.2 contract.
- Do not edit `caesar-ai-evidence` or any sibling repository from this repository.
- License verifications for AIID, OECD, AIAAIC, and MIT tracker are pending — required before dataset MVP. Address in T004.
