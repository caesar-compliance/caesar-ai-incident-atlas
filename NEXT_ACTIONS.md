# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **dataset MVP — first records created** phase. T008 created the first 4 Tier 1 incident records. The second-wave 6 records await T009 approval. No product code, no scraper, no CLI, no static site, no database, no package managers, and no dependencies until later approved phases.

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
| T009 — Tier 2/3 Incident Record Plan or Dataset MVP Review | **Next** (requires explicit Control Tower approval of T008 QA) |
| v0.3 Dataset MVP — first records | Partial — 4 Tier 1 records created; 6 second-wave records pending T009 |

---

## Next Recommended Step: T009

**T009 — Tier 2/3 Incident Record Plan or Dataset MVP Review.**

The next step after T008 is T009, but **only after explicit Control Tower review and approval of the T008 QA report.**

T009 should not automatically create the remaining 6 second-wave records. Control Tower must approve T009 scope after reviewing T008 output.

### T009 options for Control Tower consideration

**Option A — Second-wave record batch:** Create records for the 6 Tier 2/3 candidates (CAND-002, CAND-004, CAND-005, CAND-009, CAND-010, CAND-015) as INC-0005 through INC-0010.

**Option B — Dataset MVP review pass:** Before adding more records, conduct a structured review of the first 4 records and the schema for any issues. Resolve INC-0004 Dutch source note and URL stability risks from T008.

**Option C — Combined:** Start T009 with a brief review pass, then proceed to second-wave records if no blocking issues are found.

### T009 pre-conditions

1. **Control Tower reviews `FIRST_RECORD_BATCH_QA_REPORT.md`** and confirms all 4 T008 records are acceptable.
2. **Control Tower confirms T009 scope** (Option A, B, or C above).
3. If second-wave records: per-candidate source verification completed per `SOURCE_VERIFICATION_WORKFLOW.md`.
4. **T009 formally initiated** by Control Tower.

### T009 constraints (if second-wave records)

- No records beyond INC-0010 without further CT approval.
- QA checklist completed per record.
- No external dataset import.
- Careful hedging language (second-wave candidates have more secondary-source reliance).
- No unsupported legal conclusions.

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

- Starting T009 (requires Control Tower approval of T008 QA report).
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
