# Project State — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Operational Metadata

| Field | Value |
|---|---|
| Repository name | `caesar-ai-incident-atlas` |
| Current version | `0.2.1` |
| Current phase | `documentation and blueprint` |
| Status | `active` |
| Latest known commit | `e6abc0e` (before T002 task) |
| Latest completed task | `T002 — Local Architecture Mining / Clean-Room Acceleration Plan` |
| Active work item | `none` |
| Next recommended step | `T003 — Review and reconcile DATA_MODEL_DRAFT.md, TAXONOMY_DRAFT.md, and source/citation policy into a stable v0.2 draft contract` |

---

## Phase Progress

| Phase | Status | Completed |
|---|---|---|
| v0.1 Repository Foundation | Complete | 19 May 2026 |
| v0.2 Full-Scale Blueprint | Complete | 19 May 2026 |
| T002 Clean-Room Policy | Complete | 19 May 2026 |
| T003 Data Model / Taxonomy / Citation Contract | Planned | — |
| v0.3 Dataset MVP | Blocked until T003 complete | — |
| v0.4 Static Site | Planned | — |
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

It supports consultants, risk teams, and compliance teams in explaining why specific AI governance controls are needed, using real-world failures as practical examples.

---

## Critical Boundaries and No-Touch Areas

- `docs/RESEARCH_CONTEXT.md` — Active domain research must be preserved.
- Do not copy competitor incident data without verifying applicable data licenses.
- Do not make legal claims about organizations or individuals referenced in incident records.
- Do not claim the incident dataset is complete or exhaustive.
- Do not implement product code until T003 is complete and v0.3 Dataset MVP is approved.
- Do not add package managers or dependencies until implementation phases.
- Do not clone external repositories inside this repository directory.
- Do not copy third-party code, schemas, or data into this repository without Control Tower approval.

---

## Active Policy Documents

| Document | Purpose |
|---|---|
| `LOCAL_ARCHITECTURE_MINING_PLAN.md` | Defines what may be studied locally and the clean-room boundary |
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | License classification table and clean-room process |
| `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md` | Template for documenting source reviews |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Running register of all sources reviewed |

---

## Ecosystem Links

| Resource | Link |
|---|---|
| Ecosystem hub | [caesar-ai-governance-hub](https://github.com/caesar-compliance/caesar-ai-governance-hub) |
| Ecosystem website | [caesar.no](https://caesar.no) |
| Evidence format | [caesar-ai-evidence](https://github.com/caesar-compliance/caesar-ai-evidence) |
| Future platform | [caesar-ai-governance-os](https://github.com/caesar-compliance/caesar-ai-governance-os) |

---

## Local File Map

| File | Role |
|---|---|
| `README.md` | Project introduction and overview |
| `SPEC.md` | Full product specification |
| `ARCHITECTURE.md` | Data model and system design |
| `ROADMAP.md` | Development phases and milestones |
| `CHANGELOG.md` | Release history |
| `REPO_INVENTORY.md` | File registry |
| `PROJECT_STATE.md` | This file |
| `NEXT_ACTIONS.md` | Prioritized next steps |
| `LOCAL_ARCHITECTURE_MINING_PLAN.md` | Local mining policy |
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | Clean-room policy and license table |
| `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md` | Review template |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Source register |
| `docs/RESEARCH_CONTEXT.md` | Domain research and strategic context |
| `docs/DECISION_LOG.md` | Architectural and strategic decisions |
| `docs/COMPETITOR_BENCHMARKS.md` | Competitor and benchmark analysis |
| `docs/FULL_SCALE_PRODUCT_BLUEPRINT.md` | Full-scale product blueprint |
| `docs/DATA_MODEL_DRAFT.md` | Incident data model and schema draft |
| `docs/TAXONOMY_DRAFT.md` | Failure mode and control taxonomy |
| `docs/UI_UX_VISION.md` | Public site and search UI vision |
