# Project State — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Operational Metadata

| Field | Value |
|---|---|
| Repository name | `caesar-ai-incident-atlas` |
| Current version | `0.2.0` |
| Current phase | `documentation and blueprint` |
| Status | `active` |
| Latest known commit | `bd8c17b` (before blueprint task) |
| Latest completed task | `Defined full-scale AI incident atlas product blueprint` |
| Active work item | `none` |
| Next recommended step | `Define JSON schemas and build first 10–20 incident records (v0.3 Dataset MVP)` |

---

## Phase Progress

| Phase | Status | Completed |
|---|---|---|
| v0.1 Repository Foundation | Complete | 19 May 2026 |
| v0.2 Full-Scale Blueprint | Complete | 19 May 2026 |
| v0.3 Dataset MVP | Planned | — |
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
- Do not implement product code until v0.3 Dataset MVP phase begins.
- Do not add package managers or dependencies until implementation phases.

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
| [README.md](README.md) | Project introduction and overview |
| [SPEC.md](SPEC.md) | Full product specification |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Data model and system design |
| [ROADMAP.md](ROADMAP.md) | Development phases and milestones |
| [CHANGELOG.md](CHANGELOG.md) | Release history |
| [REPO_INVENTORY.md](REPO_INVENTORY.md) | File registry |
| [PROJECT_STATE.md](PROJECT_STATE.md) | This file |
| [NEXT_ACTIONS.md](NEXT_ACTIONS.md) | Prioritized next steps |
| [docs/RESEARCH_CONTEXT.md](docs/RESEARCH_CONTEXT.md) | Domain research and strategic context |
| [docs/DECISION_LOG.md](docs/DECISION_LOG.md) | Architectural and strategic decisions |
| [docs/COMPETITOR_BENCHMARKS.md](docs/COMPETITOR_BENCHMARKS.md) | Competitor and benchmark analysis |
| [docs/FULL_SCALE_PRODUCT_BLUEPRINT.md](docs/FULL_SCALE_PRODUCT_BLUEPRINT.md) | Full-scale product blueprint |
| [docs/DATA_MODEL_DRAFT.md](docs/DATA_MODEL_DRAFT.md) | Incident data model and schema draft |
| [docs/TAXONOMY_DRAFT.md](docs/TAXONOMY_DRAFT.md) | Failure mode and control taxonomy |
| [docs/UI_UX_VISION.md](docs/UI_UX_VISION.md) | Public site and search UI vision |
