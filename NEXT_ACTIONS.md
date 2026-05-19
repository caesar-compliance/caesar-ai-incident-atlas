# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **dataset foundation** phase. T005 delivered schema/taxonomy JSON files, but no incident records exist yet. No product code, no scraper, no CLI, no static site, no database, no package managers, and no dependencies until later approved phases.

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
| T006 — First Incident Candidate Dossier Preparation | **Next** (requires Control Tower approval) |
| v0.3 Dataset MVP | Blocked until T006 dossier review and approval |

---

## Next Recommended Step: T006

**T006 — First Incident Candidate Dossier Preparation.**

The next step after T005 is likely T006 — First Incident Candidate Dossier Preparation, but only after Control Tower approval.

T006 is not final incident curation. It prepares candidate dossiers for 10–20 possible incidents using public source links and verification notes before any final incident records are created.

### T006 scope (proposed)

1. **Candidate dossier preparation** for 10–20 possible incidents:
   - candidate title;
   - likely failure mode(s);
   - likely sector;
   - source link set;
   - provisional confidence rationale.

2. **Source verification notes** aligned with:
   - `SOURCE_VERIFICATION_WORKFLOW.md`;
   - `SOURCE_AND_CITATION_POLICY_DRAFT.md`;
   - `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`.

3. **Control Tower review package**:
   - shortlist and exclusions;
   - source quality notes;
   - unresolved risks per candidate.

4. **No final incident JSON creation** unless separately approved.

### T006 constraints

- No mass-imported data.
- No real incident records committed during dossier prep.
- No scraper, static site, CLI, or database.
- No external repository cloning.
- No third-party data copied.

### T006 prerequisites

Before T006 begins:
- T005 outputs should be reviewed by Control Tower.
- Pending license constraints for OECD, AIAAIC, and MIT tracker must still be respected.

### T006 deliverables

- Candidate dossier files (or a consolidated dossier document) for 10–20 potential incidents
- Source verification notes for each candidate
- Confidence/severity rationale notes
- Control Tower review summary
- Updated lifecycle docs as needed

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

- Starting T006.
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
