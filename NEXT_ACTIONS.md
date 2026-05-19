# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **documentation and blueprint** phase. No product code, no executable schemas, no incident records, no package managers, no dependencies until T005 is complete and v0.3 Dataset MVP is approved by the Control Tower.

The v0.2 draft contract is stable. See `V0_2_DRAFT_PRODUCT_CONTRACT.md` before starting any implementation work.

The clean-room policy is active. See `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` and `LOCAL_ARCHITECTURE_MINING_PLAN.md` before studying any external source.

The T004 preparation documents are now complete. See `DATASET_MVP_IMPLEMENTATION_PLAN.md`, `FIRST_INCIDENT_SELECTION_CRITERIA.md`, `SOURCE_VERIFICATION_WORKFLOW.md`, and `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` before starting any incident curation work.

---

## Current Status

| Task | Status |
|---|---|
| T001 / v0.2.0 — Full-scale blueprint | Complete |
| T002 — Clean-room acceleration policy | Complete |
| T003 — v0.2 draft contract review | Complete |
| T004 — Dataset MVP Preparation | Complete |
| T005 — Dataset MVP Schema and Taxonomy Files | **Next** (requires Control Tower approval) |
| v0.3 Dataset MVP | Blocked until T005 complete and approved |

---

## Next Recommended Step: T005

**T005 — Dataset MVP Schema and Taxonomy Files.**

The next step after T004 is likely T005 — Dataset MVP Schema and Taxonomy Files, but only after Control Tower approval of T004.

T005 is not the Dataset MVP itself. It creates the schema and taxonomy files that are the prerequisite for incident record creation. No real incident records are created in T005 unless separately approved.

### T005 scope (proposed)

1. **JSON Schema files** — create the three schema files defined in `DATASET_MVP_IMPLEMENTATION_PLAN.md` section 4, step 1:
   - `schemas/incident.schema.json` — validates incident records against the 11 required fields
   - `schemas/taxonomy.schema.json` — validates taxonomy records
   - `schemas/export.schema.json` — validates the caesar-ai-evidence export format

2. **Taxonomy JSON files** — create the four taxonomy files defined in `DATASET_MVP_IMPLEMENTATION_PLAN.md` section 4, step 2:
   - `data/taxonomy/failure-modes.json` — all FM- IDs from TAXONOMY_DRAFT.md
   - `data/taxonomy/controls.json` — all CTL- IDs from TAXONOMY_DRAFT.md
   - `data/taxonomy/evidence-types.json` — all EV- IDs from TAXONOMY_DRAFT.md
   - `data/taxonomy/sectors.json` — all sector IDs from TAXONOMY_DRAFT.md

3. **Mapping files** — create the two supplementary mapping files:
   - `data/mappings/control-evidence.json` — control → evidence mappings

4. **Validation documentation** — document how to validate incident records against the schemas.

5. **Folder structure** — create the `data/`, `schemas/`, and `exports/` directories with `.gitkeep` files.

### T005 constraints

- No real incident records.
- No product code beyond schema and taxonomy JSON files.
- No scraper, static site, CLI, or database.
- No external repository cloning.
- No third-party data copied.

### T005 prerequisites

Before T005 begins:
- T004 must be approved by Control Tower.
- License verifications for OECD, AIAAIC, and MIT tracker should be completed (see `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` section 6).

### T005 deliverables

- `schemas/incident.schema.json`
- `schemas/taxonomy.schema.json`
- `schemas/export.schema.json`
- `data/taxonomy/failure-modes.json`
- `data/taxonomy/controls.json`
- `data/taxonomy/evidence-types.json`
- `data/taxonomy/sectors.json`
- `data/mappings/control-evidence.json`
- `exports/.gitkeep`
- Validation documentation
- Updated README.md, ARCHITECTURE.md, ROADMAP.md, PROJECT_STATE.md, NEXT_ACTIONS.md, CHANGELOG.md, REPO_INVENTORY.md, DECISION_LOG.md
- `work-items/T005-dataset-mvp-schema-taxonomy/` — work item folder

---

## Pending License Verifications (Before v0.3)

The following license verifications must be completed before incident records citing these sources can be created:

| Source | Pages to verify | Priority |
|---|---|---|
| OECD AI Incidents Monitor | https://oecd.ai/terms and https://www.oecd.org/en/about/terms-conditions.html | High |
| AIAAIC Repository | https://www.aiaaic.org/aiaaic-repository/user-guide | High |
| MIT AI Incident Tracker | https://airisk.mit.edu/ | Medium |

AIID (CC BY-SA 4.0) and IBM AI Atlas Nexus (Apache-2.0) are verified. See `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` for details.

---

## Safe Autonomous Tasks

The following tasks can be executed autonomously without Control Tower approval:

- Improving documentation formatting and clarity.
- Fixing typos or broken links in documentation.
- Updating REPO_INVENTORY.md when new files are added.
- Updating CHANGELOG.md with accurate entries.
- Completing a THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md for a source already listed in the register.
- Completing pending license verifications and recording findings in LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md and THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md.

---

## Tasks Requiring Control Tower Approval

The following tasks require Artem / Control Tower review before execution:

- Starting T005.
- Starting v0.3 Dataset MVP.
- Implementing any product code (schemas, scripts, data files).
- Creating any incident records.
- Selecting incident sources and verifying data licenses.
- Choosing the static site generator technology.
- Any cross-repository changes or integrations.
- Any reuse of third-party code or data.

---

## Blocked Tasks

- v0.3 Dataset MVP — blocked until T005 is complete and approved.
- Incident record creation — blocked until T005 schema files are approved and source verification workflow is followed.
- Executable schema implementation — blocked until T005 is approved.

---

## Cross-Repository Coordination Notes

- Incident export format must be compatible with `caesar-ai-evidence` incident-mapping schema. Verify compatibility in T005.
- Future Governance OS integration requires stable incident IDs (INC-0001 format) and taxonomy IDs — locked in v0.2 contract.
- Do not edit `caesar-ai-evidence` or any sibling repository from this repository.
- AIID CC BY-SA 4.0 ShareAlike clause must be reviewed before any direct AIID data import. See `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` section 2.1.
