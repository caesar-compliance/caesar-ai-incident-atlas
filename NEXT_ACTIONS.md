# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **dataset foundation** phase. T006 delivered candidate dossiers for Control Tower review, but no incident records exist yet. No product code, no scraper, no CLI, no static site, no database, no package managers, and no dependencies until later approved phases.

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
| T005 — Dataset MVP Schema and Taxonomy Files | Complete |
| T006 — First Incident Candidate Dossier Preparation | Complete |
| T007 — First Incident Record Creation Plan | **Next** (requires explicit Control Tower approval of T006 shortlist) |
| v0.3 Dataset MVP | Blocked until T007 incident records created and approved |

---

## Next Recommended Step: T007

**T007 — First Incident Record Creation Plan.**

The next step after T006 is T007 — First Incident Record Creation Plan, but **only after explicit Control Tower approval of the T006 candidate dossier shortlist.**

T007 may create the first real incident records only if explicitly approved by Control Tower. Until then, `data/incidents/` must remain empty except `.gitkeep`.

### T007 pre-conditions (all must be met before T007 begins)

1. **Control Tower reviews and approves the T006 recommendation** in `FIRST_INCIDENT_SELECTION_RECOMMENDATION.md`.
2. **Each of the 10 Accept candidates is individually confirmed** by Control Tower.
3. **Source verification steps** per `SOURCE_VERIFICATION_WORKFLOW.md` completed for each record.
4. **T007 formally initiated** by Control Tower.

### T007 proposed scope

1. Assign `INC-XXXX` IDs to approved candidates.
2. Create incident JSON files in `data/incidents/` using `schemas/incident.schema.json`.
3. Validate each record against the schema.
4. Update taxonomy and mapping files as needed.
5. Update all lifecycle documents.

### T007 constraints

- No records for Postponed or Rejected candidates.
- No mass-imported data.
- Source verification completed per `SOURCE_VERIFICATION_WORKFLOW.md` before each record is committed.
- Careful hedging language in all summaries.
- No unsupported legal conclusions.

### T007 open risks to resolve

- FM-SEC coverage gap — no strong discrete production security/prompt-injection incident in the Accept set.
- CAND-009 (NCII images) — victim privacy framing must be maintained.
- `incident_date` precision limitation in v0.2 schema — may need a workaround for incidents with year/month only.
- CAND-015 (EEOC hiring) — confirm whether a specific enforcement action citation is available.

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

- Starting T007 (requires Control Tower approval of T006 dossier shortlist).
- Starting v0.3 Dataset MVP.
- Implementing any product code (scripts, automated tooling, application features).
- Creating any incident records.
- Selecting incident sources and verifying data licenses.
- Choosing the static site generator technology.
- Any cross-repository changes or integrations.
- Any reuse of third-party code or data.

---

## Blocked Tasks

- v0.3 Dataset MVP — blocked until T006 dossier shortlist is approved.
- Incident record creation — blocked until T006 is approved and workflow gates are passed.
- Any mass import or scraping workflow — blocked unless separately approved.

---

## Cross-Repository Coordination Notes

- Incident export format must be compatible with `caesar-ai-evidence` incident-mapping schema. Maintain compatibility in future schema updates.
- T005 schema/taxonomy files exist; keep changes backward-compatible unless a new decision is approved.
- Future Governance OS integration requires stable incident IDs (INC-0001 format) and taxonomy IDs — locked in v0.2 contract.
- Do not edit `caesar-ai-evidence` or any sibling repository from this repository.
- AIID CC BY-SA 4.0 ShareAlike clause must be reviewed before any direct AIID data import. See `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` section 2.1.
