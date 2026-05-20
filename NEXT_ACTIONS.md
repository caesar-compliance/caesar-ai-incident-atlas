# Next Actions — caesar-ai-incident-atlas

**Last updated:** 21 May 2026 (T045)

---

## Execution Boundaries

This repository is in the **v0.8.2 Product Pivot / Digests MVP** phase. The product has pivoted from "public AI incident database" to "AI Legal & Governance Case Atlas — a case-to-control intelligence layer."

Technical Public MVP is **LIVE + VERIFIED** at `https://atlas.caesar.no/` with exactly 12 validated incident records, accompanied by a static digests portal and RSS feeds.

The new product pivot architecture and policies are now active. See `PRODUCT_PIVOT_LEGAL_GOVERNANCE_CASE_ATLAS.md` and related documents before performing any new task or record drafting.

The clean-room reference lab policy is active. See `REFERENCE_LAB_USAGE_NOTE.md` before studying any local reference directories.

---

## Current Status

| Task | Status | Date |
|---|---|---|
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
| T033 — Dataset Expansion Planning for INC-0011+ Candidates | **Complete** — Candidate criteria, source gates, review workflow, candidate template created. No records. No data changes. |
| T034 — Candidate Shortlist Draft for INC-0011+ Planning | **Complete** — 15 planning-only candidates; triage matrix; 12-gate record creation checklist. No records. No data changes. |
| T035 — P1 Candidate Source Pack Planning | **Complete** — Source packs for all 8 P1 candidates; 6 ready for CT review; 1 deferred (CAND-002 needs Tier 1); 1 counsel-gated (CAND-004). First batch: CAND-013, 008, 011, 010. | 20 May 2026 |
| T036 — CT First Drafting Batch Selection | **Complete** — First batch selected: CAND-013, CAND-008, CAND-011, CAND-010. | 20 May 2026 |
| T037 — Batch-1 Source Pack Finalization | **Complete** — Source URLs verified. No records created. | 20 May 2026 |
| T038 — Draft First New Incident Record | **Complete** — INC-0011 drafted from CAND-013. Dataset: 11 records. Governance review note prepared. | 20 May 2026 |
| T039 — INC-0011 Gate Sign-Off + Smoke Test | **Complete** — G-01/G-02 approved with caution; INC-0011 live; signoff record created. | 20 May 2026 |
| T040 — Draft Second New Incident Record (CAND-008) | **Complete** — INC-0012 drafted. Dataset: 12 records. Governance review note prepared. | 20 May 2026 |
| T042 — Product Pivot to AI Legal & Governance Case Atlas | **Complete** — Strategic pivot to Legal & Governance Case Atlas documented. Decoupled conceptual watcher pipeline and reference rules added. | 21 May 2026 |
| T043 — Source Registry and Case Pipeline Schema | **Complete** — Created pipeline schemas, sources.yml, offline validator, and automation policy docs | 21 May 2026 |
| T044 — Static Weekly and Monthly Digest MVP | **Complete** — Built static operational digests, monthly strategic digests, custom validator and RSS feed generator, and portal index links | 21 May 2026 |
| T045 — Offline Mock Auto-Discovery Prototype | **Complete** — Local sandbox mock pipeline, synthetic files, pipeline scripts, containment auditor, and operations runbook. | 21 May 2026 |
| v0.4 Dataset MVP — full 10-record batch | Complete | 19 May 2026 |

---

## Status: T045 Complete — Offline Mock Auto-Discovery Prototype Deployed

**Public deployment is LIVE and VERIFIED at `https://atlas.caesar.no/` with exactly 12 validated incident records, a complete static digest portal, and live RSS syndication feeds.**
**An offline, isolated mock auto-discovery pipeline is fully functional in the workspace, complete with synthetic inputs, watcher scan tools, candidate builders, deduplication checks, draft packaging, digest previewing, and a strict sandboxing containment auditor.**

**Active boundaries, policies, and schemas:**
- `PRODUCT_PIVOT_LEGAL_GOVERNANCE_CASE_ATLAS.md` (Repositioning & Value Chain)
- `CASE_TO_CONTROL_PRODUCT_MODEL.md` (Fields, Mappings, checklists)
- `AUTOMATION_AND_PUBLISHING_POLICY.md` (Ingestion gates & clean-room rules)
- `DIGEST_PRODUCT_MODEL.md` (Weekly/Monthly RSS static plans)
- `SOURCE_REGISTRY_AND_WATCHER_ARCHITECTURE.md` (Ingestion pipeline stages)
- `REFERENCE_LAB_USAGE_NOTE.md` (Local reference lab usage policy)
- `docs/automation/MOCK_PIPELINE_RUNBOOK.md` (Operational Runbook)
- `schemas/pipeline/` (Source, Candidate, and Case Draft JSON Schemas)
- `data/source-registry/sources.yml` (Source Registry DB catalog)
- `tools/validate_pipeline_schemas.py` (Local schema validator)
- `tools/validate_mock_schemas.py` (Mock candidate & draft validator)
- `scripts/validate-mock-pipeline.mjs` (Safety containment auditor)
- `scripts/validate-digests.mjs` (Local digest validator)
- `scripts/build-rss-feeds.mjs` (RSS feed compiler)

---

## Next Recommended Step: T046

**T046 — Regulatory Translation and Fine-Grained Compliance Taxonomies.** Refine translation gate rules for legal texts and deepen taxonomy heuristics.

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
