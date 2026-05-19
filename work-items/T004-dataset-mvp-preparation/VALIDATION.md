# Validation — T004: Dataset MVP Preparation

**Work item:** T004
**Branch:** docs/T004-dataset-mvp-preparation
**Date:** 19 May 2026

---

## Validation Checklist

### No-code constraints

- [x] No code was created.
- [x] No executable schema files were created.
- [x] No incident records were created.
- [x] No scraper, static site, CLI, or database was created.
- [x] No external repositories were cloned into this repository.
- [x] No third-party files, data, or code were copied into this repository.

### Four T004 preparation documents created

- [x] `DATASET_MVP_IMPLEMENTATION_PLAN.md` — created in repository root.
- [x] `FIRST_INCIDENT_SELECTION_CRITERIA.md` — created in repository root.
- [x] `SOURCE_VERIFICATION_WORKFLOW.md` — created in repository root.
- [x] `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` — created in repository root.

### Work item folder documents created

- [x] `work-items/T004-dataset-mvp-preparation/TASK.md`
- [x] `work-items/T004-dataset-mvp-preparation/VALIDATION.md` (this file)
- [x] `work-items/T004-dataset-mvp-preparation/IMPLEMENTATION_REPORT.md`
- [x] `work-items/T004-dataset-mvp-preparation/DECISIONS.md`

### Existing files updated

- [x] `README.md` — updated with T004 documents in repository structure table.
- [x] `ARCHITECTURE.md` — updated to reference T004 preparation documents.
- [x] `ROADMAP.md` — T004 marked complete; T005 added as next step.
- [x] `PROJECT_STATE.md` — version updated to 0.2.3; latest completed task updated.
- [x] `NEXT_ACTIONS.md` — T005 defined as next recommended step; T004 marked complete.
- [x] `CHANGELOG.md` — T004 entry added.
- [x] `REPO_INVENTORY.md` — all new files listed.
- [x] `docs/DECISION_LOG.md` — DEC-023 through DEC-027 added.
- [x] `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` — AIID and IBM Atlas Nexus entries updated with verified license status.

### NEXT_ACTIONS.md content

- [x] NEXT_ACTIONS.md clearly states that the next step after T004 is T005 — Dataset MVP Schema and Taxonomy Files, but only after Control Tower approval.
- [x] T005 scope is defined (schema files, taxonomy files, validation documentation).
- [x] T005 constraint is stated: must not create real incident records unless separately approved.

---

## License and Source Findings

| Source | Status | Finding |
|---|---|---|
| AIID | Verified | CC BY-SA 4.0 for data collections (excluding text field of reports). Citation permitted with attribution. Direct import requires Control Tower approval (ShareAlike implications). |
| IBM AI Atlas Nexus | Verified | Apache-2.0. Citation and study permitted. Direct reuse requires Control Tower approval. |
| OECD AI Incidents Monitor | Pending | Manual verification required. Do not cite until verified. |
| AIAAIC Repository | Pending | Manual verification required. Do not cite until verified. |
| MIT AI Incident Tracker | Pending | Manual verification required. Do not cite until verified. |

---

## Unresolved Risks

1. **AIID CC BY-SA 4.0 ShareAlike clause.** If Caesar imports AIID data directly (not just cites it), the ShareAlike clause may require Caesar to distribute derivative works under CC BY-SA 4.0. This has implications for Caesar's commercial product direction. Requires Control Tower review and potentially legal review before any direct data import.

2. **OECD, AIAAIC, MIT tracker license verification pending.** These three sources cannot be cited in Caesar incident records until manual verification is complete. This limits the source pool for v0.3 incident curation. Incidents must be sourced from AIID (with attribution rules applied) and primary sources until these verifications are complete.

3. **First incident batch not yet selected.** The actual selection of the first 10–20 incidents is deferred to v0.3 after Control Tower approval. The criteria are defined but no candidates have been identified.

4. **Schema files not yet created.** The JSON Schema files and taxonomy JSON files are planned for T005. They do not exist yet. Incident records cannot be validated until T005 is complete.

---

## Working Tree Status

All files committed. Working tree is clean.

Branch: `docs/T004-dataset-mvp-preparation`
Starting commit: `cf56751`
