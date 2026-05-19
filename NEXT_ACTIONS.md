# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **dataset MVP — full 10-record batch complete** phase. T010 created 6 second-wave records (INC-0005 through INC-0010). All 10 records have been formally validated. No product code, no scraper, no CLI, no static site, no database, no package managers, and no dependencies until later approved phases.

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
| T007 — First Incident Record Creation Plan | Complete |
| T008 — First Tier 1 Incident Record Batch | Complete |
| T009 — Dataset MVP Review and QA Hardening | Complete |
| T010 — Second-Wave Incident Record Batch | Complete |
| T011 — Dataset MVP Public Readiness Review or Minimal Static Site Planning | **Next** (requires explicit Control Tower approval of T010 findings) |
| v0.4 Dataset MVP — full 10-record batch | Complete — INC-0001 through INC-0010 created and validated |

---

## Next Recommended Step: T011

**T011 — Dataset MVP Public Readiness Review or Minimal Static Site Planning.**

The next step after T010 is T011, but **only after explicit Control Tower review and approval of T010 findings.**

T011 must not automatically begin building a public static site. Control Tower must confirm T011 scope and whether a site build is approved.

### T011 options for Control Tower consideration

**Option A — Dataset MVP Public Readiness Review:** Conduct a structured review of the complete 10-record dataset before any public-facing work begins. Similar to T009 but covering all 10 records and assessing readiness for public visibility.

**Option B — Minimal Static Site Planning:** If Control Tower approves public visibility, T011 begins static site technology selection and planning (no code; planning document only, analogous to T007).

**Option C — Combined:** Readiness review + site planning in the same task.

### T011 pre-conditions

1. **Control Tower reviews T010 findings** (`SECOND_WAVE_QA_REPORT.md`) and confirms the full 10-record dataset is acceptable.
2. **Control Tower confirms T011 scope** (Option A, B, or C above).
3. **If static site is approved:** Technology selection and clean-room review required before any code is written.
4. **T011 formally initiated** by Control Tower.

### T011 constraints

- No public site code without explicit Control Tower approval.
- No new incident records beyond INC-0010 without further CT approval.
- No external dataset import.
- No product code without CT approval.
- Any static site work must comply with V0_2_DRAFT_PRODUCT_CONTRACT.md and CLEAN_ROOM_IMPLEMENTATION_POLICY.md.

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

- Starting T011 (requires Control Tower approval of T010 findings).
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
