# Next Actions — caesar-ai-incident-atlas

**Last updated:** 20 May 2026 (T032)

---

## Execution Boundaries

This repository is in the **T032 Public MVP Baseline Frozen** phase. Technical Public MVP is **LIVE + VERIFIED** at `https://atlas.caesar.no/`. **G-10 PASS** (20 May 2026). **G-01 APPROVED with caution** (20 May 2026). **G-02 APPROVED with caution** (20 May 2026). All 12 governance gates closed. Public MVP baseline frozen at `64c7267`. Gate closeout: `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md`. Baseline freeze: `PUBLIC_MVP_BASELINE_FREEZE.md`. Roadmap split: `ROADMAP_NEXT_PHASES.md`. No governance blockers remain for current public MVP. Next action: T033 Dataset Expansion Planning (planning only).

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
| T016 — Public Deployment Plan | Complete — planning only, no deployment |
| T017 — Static Publish Package Preparation | Complete — site/ self-contained |
| T018A — Public Release Gate Review Pack | Complete — review materials prepared |
| T019 — Public Release Gate Closure | Complete — gate evidence consolidated, deployment readiness documented |
| T021 — GitHub Pages Deployment Activation | Complete — workflow deployed, default URL live |
| T022 — Post-Deploy Verification + Custom Domain Closeout | **Complete** — custom domain, HTTPS enforced, closeout docs |
| T023 — Browser Smoke + HTTP→HTTPS Redirect Verification | **Complete (partial)** — redirect 301 confirmed, JSON 200, 10 records live; interactive G-10 test pending CT |
| T024 — Public MVP Status Lock + Product Polish Backlog | **Complete** — Technical Public MVP LIVE + VERIFIED; G-10 PASS; G-01/G-02 pending |
| T025 — Source/License + Wording Review Sign-Off Pack | **Complete** — Governance sign-off pack prepared; G-01/G-02 ready for CT/counsel sign-off |
| T026 — Source Risk Hardening Pass for Public MVP | **Complete** — Sources hardened for INC-0005, INC-0008, INC-0009; INC-0006 counsel review unchanged |
| T027 — Targeted INC-0006 Counsel/Source-Risk Resolution Pack | **Complete** — Targeted source search; no safer source found; decision packet created; no data/wording changes |
| T028 — Public MVP Polish Pass | **Complete** — About section, OG meta, footer, robots.txt, sitemap.xml, mobile density, focus states; no records/sources/legal content changed |
| T029 — Governance Gate Decision Pack | **Complete** — Governance decision record prepared; no explicit CT approval received; G-01/G-02 remain pending; decision packet ready for review |
| T030 — INC-0006 Counsel Review Follow-Up Packet | **Complete** — Counsel follow-up packet prepared; no approval received; G-01/G-02 remain pending; no data/source/legal changes |
| T031 — Record G-01/G-02 Sign-Off with INC-0006 Accepted with Caution | **Complete** — Explicit CT approval recorded; G-01 and G-02 approved with caution; all 12 gates closed |
| T032 — Public MVP v0.7 Status Freeze + Roadmap Split | **Complete** — Baseline frozen at `64c7267`; `PUBLIC_MVP_BASELINE_FREEZE.md` + `ROADMAP_NEXT_PHASES.md` created |
| v0.4 Dataset MVP — full 10-record batch | Complete — INC-0001 through INC-0010 validated |

---

## Status: T032 Complete — Public MVP Baseline Frozen

**Public deployment is LIVE and VERIFIED at `https://atlas.caesar.no/`.**

**Deployment facts (locked):**
- GitHub Pages source: GitHub Actions workflow (`.github/workflows/pages.yml`)
- Public root: `site/`
- Custom domain: `atlas.caesar.no`
- HTTPS certificate: approved (expires 2026-08-18)
- Enforce HTTPS: enabled
- Repo root: not exposed
- No Cloudflare/Netlify/Coolify/VPS
- No secrets

**Gate status (all closed):**
- **G-10**: ✅ **PASS** — Control Tower manual browser confirmation on 20 May 2026
- **G-01**: ✅ **APPROVED with caution** — INC-0006 Reuters citation accepted with caution (20 May 2026)
- **G-02**: ✅ **APPROVED with caution** — current public MVP wording cleared (20 May 2026)
- All other gates (G-03 through G-12): ✅ closed

**T032 complete.** Public MVP baseline frozen at `64c7267`. `PUBLIC_MVP_BASELINE_FREEZE.md` and `ROADMAP_NEXT_PHASES.md` created. No records, data, source, or legal content changed. No DNS/CNAME/hosting changes. Approval scope remains current 10-record public MVP only.

See `PUBLICATION_RISK_GATE.md` for gate status. See `PRODUCT_POLISH_BACKLOG.md` for future work. See `ROADMAP_NEXT_PHASES.md` for v0.7–v1.0 roadmap split.

## Next Recommended Step: T033

**T033 — Dataset Expansion Planning for INC-0011+ Candidates (planning only, no record creation).** Define candidate selection criteria, required source categories, minimum source-quality gates, and CT approval gates. No records may be created without explicit CT approval.

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

- Starting T018 (requires CT review of `PUBLICATION_RISK_GATE.md`; legal review completion; hosting decision; explicit CT approval before any deployment activation).
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
