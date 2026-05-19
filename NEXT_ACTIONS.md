# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **local release candidate hardened** phase. T015 completed the local RC gate: all dataset, site, and dependency checks pass. Public deployment requires explicit Control Tower approval (T016).

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
| T011 — Dataset MVP Public Readiness Review | Complete |
| T012 — Minimal Static Site Prototype | Complete — local only |
| T013 — Static Site Functional Completion | Complete — local functional MVP |
| T014 — Local QA Tooling and Release Candidate Gate | Complete |
| T015 — Static Site Release Candidate Hardening | Complete — local RC PASS |
| T016 — Public Deployment Plan | **Next** (requires explicit Control Tower approval) |
| v0.4 Dataset MVP — full 10-record batch | Complete — INC-0001 through INC-0010 validated |

---

## Next Recommended Step: T016

**T016 — Public Deployment Plan.**

Only after explicit Control Tower review of T015 RC outputs. T016 should plan deployment but must not deploy publicly unless explicitly approved within T016 scope.

Suggested T016 scope:

- **Option A — Deployment Plan only:** Define hosting provider (Netlify / GitHub Pages / other), domain, DNS, CI/CD pipeline, and public URL. No actual deploy.
- **Option B — Deployment Plan + Deploy:** Plan and execute public deployment if CT explicitly approves within T016 scope.

### T016 pre-conditions

1. CT reviews `STATIC_SITE_RC_REVIEW.md` and `RELEASE_CANDIDATE_GATE.md`.
2. CT confirms `python3 tools/validate_dataset.py` passes.
3. Legal and license review formally completed for all 10 incident sources.
4. Domain and hosting decision made.
5. T016 formally initiated by Control Tower.

### T016 constraints

- No public deployment without explicit CT approval in T016 scope.
- No new incident records beyond INC-0010 without further CT approval.
- No database, backend, or server-side runtime without CT approval.
- No external data import.

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

- Starting T016 (requires Control Tower approval; review `STATIC_SITE_RC_REVIEW.md` and `RELEASE_CANDIDATE_GATE.md` first).
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
