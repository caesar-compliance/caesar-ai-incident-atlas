# Project State — caesar-ai-incident-atlas

**Last updated:** 20 May 2026

---

## Operational Metadata

| Field | Value |
|---|---|
| Repository name | `caesar-ai-incident-atlas` |
| Current version | `0.5.6` |
| Current phase | `T021 — GitHub Pages deployment activated (default URL); custom domain deferred` |
| Status | `active` |
| Latest completed task | `T021 — GitHub Pages Deployment Activation` |
| Active work item | `T021 — awaiting GitHub Actions workflow run and smoke test` |
| Next recommended step | `Monitor GitHub Pages deployment; complete G-10 browser smoke test; T022 custom domain setup` |

---

## Phase Progress

| Phase | Status | Completed |
|---|---|---|
| v0.1 Repository Foundation | Complete | 19 May 2026 |
| v0.2 Full-Scale Blueprint | Complete | 19 May 2026 |
| T002 Clean-Room Policy | Complete | 19 May 2026 |
| T003 v0.2 Draft Contract | Complete | 19 May 2026 |
| T004 Dataset MVP Preparation | Complete | 19 May 2026 |
| T005 Dataset MVP Schema and Taxonomy Files | Complete | 19 May 2026 |
| T006 First Incident Candidate Dossier Preparation | Complete | 19 May 2026 |
| T007 First Incident Record Creation Plan | Complete | 19 May 2026 |
| T008 First Tier 1 Incident Record Batch | Complete | 19 May 2026 |
| T009 Dataset MVP Review and QA Hardening | Complete | 19 May 2026 |
| T010 Second-Wave Incident Record Batch | Complete | 19 May 2026 |
| T011 Dataset MVP Public Readiness Review | Complete | 19 May 2026 |
| T012 Minimal Static Site Prototype | Complete — local only, no deployment | 19 May 2026 |
| T013 Static Site Functional Completion | Complete — local functional MVP, no deployment | 19 May 2026 |
| T014 Local QA Tooling and Release Candidate Gate | Complete — `tools/validate_dataset.py` + RC gate | 19 May 2026 |
| T015 Static Site Release Candidate Hardening | Complete — local RC PASS, public deploy pending CT approval | 19 May 2026 |
| T016 Public Deployment Plan | Complete — planning only, no config, no deploy | 19 May 2026 |
| T017 Static Publish Package Preparation | Complete — site/ self-contained, path fix applied | 20 May 2026 |
| T018A Public Release Gate Review Pack | Complete — review materials prepared, NO-GO preserved | 20 May 2026 |
| T019 Public Release Gate Closure | Complete — gate evidence consolidated, deployment readiness documented, NO-GO preserved | 20 May 2026 |
| v0.4 Dataset MVP — full 10-record batch | Complete — 10 records (INC-0001 through INC-0010) | 19 May 2026 |
| v0.5 Static Site — local prototype | Complete — T012 | 19 May 2026 |
| v0.5.1 Static Site — local functional MVP | Complete — T013 | 19 May 2026 |
| v0.5.2 Local QA tooling | Complete — T014 | 19 May 2026 |
| v0.5.3 Local release candidate | Complete — T015 | 19 May 2026 |
| v0.5.4 Public deployment plan | Complete — T016 | 19 May 2026 |
| v0.5.5 Static publish package | Complete — T017 | 20 May 2026 |
| v0.5.6 Deployment readiness gate closure | Complete — T019 | 20 May 2026 |
| v0.5 Static Site — public deployment | **Active — G-12 cleared** | GitHub Pages default URL |
| v0.5 Export Integration | Planned | — |
| v1.0 Stable Public Release | Planned | — |
| v1.x Governance OS Integration | Future | — |

---

## What This Repository Is

Caesar AI Incident Atlas is a curated public incident knowledge base that maps real-world AI failures to failure modes, governance controls, and evidence requirements.

Its primary value is the governance mapping layer:

```
incident → failure mode → relevant controls → required evidence → lessons
```

---

## v0.2 Contract Summary

The v0.2 draft contract is now stable. Key decisions locked:

| Decision | Resolution |
|---|---|
| Incident ID format | INC-0001 (sequential, four digits) |
| Evidence requirement format | Free-text strings for v0.2 |
| Export format | One file per incident |
| Schema strictness | Lenient — 11 required fields |
| Taxonomy versioning | Together with dataset |
| FM-REL sub-categories | Draft — use top-level FM-REL only in v0.2 |
| system_type field | Free-text for v0.2 |

See `V0_2_DRAFT_PRODUCT_CONTRACT.md` for the full contract.

---

## Active Policy and Contract Documents

| Document | Purpose |
|---|---|
| `V0_2_DRAFT_PRODUCT_CONTRACT.md` | Stable v0.2 product model contract |
| `SOURCE_AND_CITATION_POLICY_DRAFT.md` | Citation rules, confidence levels, wording rules |
| `V0_2_FIELD_PRIORITY_TABLE.md` | Field priority table (required / optional / later) |
| `V0_2_TAXONOMY_REVIEW.md` | Taxonomy category review (stable / draft / later) |
| `LOCAL_ARCHITECTURE_MINING_PLAN.md` | Local mining policy |
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | License classification table and clean-room process |
| `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md` | Review template |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Source register |
| `DATASET_MVP_IMPLEMENTATION_PLAN.md` | Dataset MVP implementation plan (T004) |
| `FIRST_INCIDENT_SELECTION_CRITERIA.md` | Incident selection criteria (T004) |
| `SOURCE_VERIFICATION_WORKFLOW.md` | Source verification workflow (T004) |
| `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` | License and source safety checklist (T004) |

---

## Critical Boundaries and No-Touch Areas

- `docs/RESEARCH_CONTEXT.md` — Active domain research must be preserved.
- Do not copy competitor incident data without verifying applicable data licenses.
- Do not make legal claims about organizations or individuals referenced in incident records.
- Do not claim the incident dataset is complete or exhaustive.
- Do not implement product code beyond approved schema/taxonomy documentation scope.
- Do not add package managers or dependencies until implementation phases.
- Do not clone external repositories inside this repository directory.
- Do not copy third-party code, schemas, or data into this repository without Control Tower approval.

---

## Ecosystem Links

| Resource | Link |
|---|---|
| Ecosystem hub | [caesar-ai-governance-hub](https://github.com/caesar-compliance/caesar-ai-governance-hub) |
| Ecosystem website | [caesar.no](https://caesar.no) |
| Evidence format | [caesar-ai-evidence](https://github.com/caesar-compliance/caesar-ai-evidence) |
| Future platform | [caesar-ai-governance-os](https://github.com/caesar-compliance/caesar-ai-governance-os) |
