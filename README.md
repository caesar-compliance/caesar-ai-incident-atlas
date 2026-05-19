# Caesar AI Incident Atlas (`caesar-ai-incident-atlas`)

> A curated public incident knowledge base that maps real-world AI failures to failure modes, governance controls, and evidence requirements — part of the [Caesar AI Governance Hub](https://github.com/caesar-compliance/caesar-ai-governance-hub) ecosystem.

---

## Overview

**Caesar AI Incident Atlas** is a structured dataset and searchable knowledge base for AI incidents, failure modes, and governance controls.

It does not aim to replace the AI Incident Database, OECD AI Incidents Monitor, or AIAAIC Repository. Its purpose is to add a practical governance layer on top of publicly reported incidents:

```
incident
→ failure mode
→ relevant controls
→ required evidence
→ lessons for governance
```

This mapping helps consultants, risk teams, and compliance teams explain why specific AI governance controls are needed — using real-world failures as practical examples.

The repository is part of the Caesar AI Governance Hub ecosystem at [caesar.no](https://caesar.no).

---

## Project Status

> This repository is currently in the **documentation + dataset foundation** stage.
> T006 prepared 15 candidate incident dossiers for Control Tower review. No incident records exist yet — `data/incidents/` is empty.
> The next step is T007 — First Incident Record Creation Plan, pending explicit Control Tower approval of the T006 shortlist.
> See [ROADMAP.md](ROADMAP.md) for the full phase plan.

---

## What This Product Does

Caesar AI Incident Atlas provides:

- a curated dataset of publicly reported AI incidents with structured metadata;
- a failure mode taxonomy covering privacy, bias, hallucination, safety, security, and unauthorized action categories;
- incident-to-control mapping that connects each failure mode to practical governance controls;
- control-to-evidence mapping that identifies what evidence should exist to demonstrate a control is active;
- sector filters for healthcare, finance, public sector, hiring, law enforcement, and other domains;
- AI agent failure categories covering autonomous action, tool misuse, and approval bypass;
- severity, impact, and confidence fields for each incident record;
- source and citation model referencing public databases and official reports;
- a future public searchable static site at `incidents.caesar.no`;
- export to the `caesar-ai-evidence` format for use in governance evidence packs;
- future integration with Caesar AI Governance OS as a risk library module.

---

## Who It Is For

- **AI governance consultants** who need real-world examples to explain why controls matter to clients.
- **Risk and compliance teams** who need to map AI failure modes to their control frameworks.
- **Trainers and workshop facilitators** who use incident cases to teach practical AI governance.
- **Legal and policy teams** who need to understand practical AI risks across sectors.
- **Caesar Compliance clients** who want a structured risk library connected to their evidence packs.

---

## Incident Categories

The Atlas covers the following failure mode categories:

| Category | Description |
|---|---|
| Privacy | Unauthorized data exposure, training data leakage, PII disclosure |
| Bias | Discriminatory outputs, unfair treatment across demographic groups |
| Hallucination | Fabricated facts, false citations, confident incorrect outputs |
| Safety | Physical harm, dangerous instructions, unsafe recommendations |
| Security | Prompt injection, jailbreaks, adversarial attacks, model manipulation |
| Unauthorized action | AI agents acting outside approved scope, bypassing human oversight |
| Transparency | Undisclosed AI use, misleading outputs, lack of explainability |
| Reliability | System failures, unexpected degradation, inconsistent outputs |

---

## Incident Record Fields

Each incident card includes:

```
incident_id
title
date
source links
summary
sector
system type
failure modes
harms
risk categories
affected stakeholders
severity
impact
confidence
controls that could help
evidence that should exist
lessons
```

---

## Benchmark References

Caesar AI Incident Atlas is informed by and benchmarked against:

| Source | URL | Role |
|---|---|---|
| AI Incident Database (AIID) | https://incidentdatabase.ai/ | Primary incident reference and citation source |
| OECD AI Incidents and Hazards Monitor | https://oecd.ai/en/incidents | Policy-facing incident classification and hazards framing |
| AIAAIC Repository | https://www.aiaaic.org/aiaaic-repository | Public-interest incident coverage and accountability framing |
| MIT AI Incident Tracker | https://airisk.mit.edu/ai-incident-tracker | Risk, cause, harm, and severity classification dimensions |
| IBM AI Risk Atlas / AI Atlas Nexus | https://github.com/IBM/ai-atlas-nexus | Risk taxonomy and ontology mapping (Apache-2.0) |

Caesar AI Incident Atlas does not copy data from these sources without verifying applicable data licenses. It cites sources carefully and focuses its value on the governance mapping layer: incident → controls → evidence.

---

## Ecosystem Integration

```
caesar-ai-incident-atlas
    maps incidents to failure modes
    maps failure modes to controls
    maps controls to evidence requirements
    exports to caesar-ai-evidence
    future: feeds risk library in caesar-ai-governance-os
```

Related repositories:

- [caesar-ai-evidence](https://github.com/caesar-compliance/caesar-ai-evidence) — shared evidence format that receives incident-to-control mappings
- [caesar-ai-governance-hub](https://github.com/caesar-compliance/caesar-ai-governance-hub) — parent hub with ecosystem standards and product vision
- [caesar-ai-governance-os](https://github.com/caesar-compliance/caesar-ai-governance-os) — future paid platform that will include the Atlas as a risk library module

---

## Repository Structure

| File | Role |
|---|---|
| [README.md](README.md) | Project introduction and overview |
| [SPEC.md](SPEC.md) | Full product specification |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Data model and system design |
| [ROADMAP.md](ROADMAP.md) | Development phases and milestones |
| [CHANGELOG.md](CHANGELOG.md) | Release history |
| [REPO_INVENTORY.md](REPO_INVENTORY.md) | File registry |
| [PROJECT_STATE.md](PROJECT_STATE.md) | Current project phase and status |
| [NEXT_ACTIONS.md](NEXT_ACTIONS.md) | Prioritized next steps |
| [LOCAL_ARCHITECTURE_MINING_PLAN.md](LOCAL_ARCHITECTURE_MINING_PLAN.md) | Policy for studying external sources locally |
| [CLEAN_ROOM_IMPLEMENTATION_POLICY.md](CLEAN_ROOM_IMPLEMENTATION_POLICY.md) | License classification table and clean-room process |
| [THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md](THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md) | Template for documenting source reviews |
| [THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md](THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md) | Register of all sources reviewed |
| [V0_2_DRAFT_PRODUCT_CONTRACT.md](V0_2_DRAFT_PRODUCT_CONTRACT.md) | Stable v0.2 product model contract |
| [SOURCE_AND_CITATION_POLICY_DRAFT.md](SOURCE_AND_CITATION_POLICY_DRAFT.md) | Citation rules, confidence levels, wording rules |
| [V0_2_FIELD_PRIORITY_TABLE.md](V0_2_FIELD_PRIORITY_TABLE.md) | Field priority table (required / optional / later) |
| [V0_2_TAXONOMY_REVIEW.md](V0_2_TAXONOMY_REVIEW.md) | Taxonomy category review (stable / draft / later) |
| [DATASET_MVP_IMPLEMENTATION_PLAN.md](DATASET_MVP_IMPLEMENTATION_PLAN.md) | Dataset MVP implementation plan and approval gates (T004) |
| [FIRST_INCIDENT_SELECTION_CRITERIA.md](FIRST_INCIDENT_SELECTION_CRITERIA.md) | Selection criteria for the first 10–20 incidents (T004) |
| [SOURCE_VERIFICATION_WORKFLOW.md](SOURCE_VERIFICATION_WORKFLOW.md) | Step-by-step source verification workflow for incident curation (T004) |
| [LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md](LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md) | License and source safety checks; verified/pending source status (T004) |
| [schemas/incident.schema.json](schemas/incident.schema.json) | Incident record schema (lenient v0.2, created in T005) |
| [data/taxonomy/failure_modes.json](data/taxonomy/failure_modes.json) | Failure mode taxonomy JSON (T005) |
| [data/taxonomy/controls.json](data/taxonomy/controls.json) | Controls taxonomy JSON (T005) |
| [data/taxonomy/evidence_types.json](data/taxonomy/evidence_types.json) | Evidence types taxonomy JSON (T005) |
| [data/taxonomy/sectors.json](data/taxonomy/sectors.json) | Sector taxonomy JSON (T005) |
| [data/taxonomy/confidence_levels.json](data/taxonomy/confidence_levels.json) | Confidence level taxonomy JSON (T005) |
| [data/taxonomy/severity_levels.json](data/taxonomy/severity_levels.json) | Severity level taxonomy JSON (T005) |
| [docs/validation/DATASET_MVP_VALIDATION_PLAN.md](docs/validation/DATASET_MVP_VALIDATION_PLAN.md) | Dataset MVP validation plan (T005) |
| [FIRST_INCIDENT_CANDIDATE_DOSSIERS.md](FIRST_INCIDENT_CANDIDATE_DOSSIERS.md) | 15 candidate incident dossiers for Control Tower review (T006) — candidate only, not incident records |
| [FIRST_INCIDENT_CANDIDATE_REVIEW_TABLE.md](FIRST_INCIDENT_CANDIDATE_REVIEW_TABLE.md) | Summary review table: 10 Accept, 4 Postpone, 1 Reject (T006) |
| [FIRST_INCIDENT_SOURCE_REVIEW_NOTES.md](FIRST_INCIDENT_SOURCE_REVIEW_NOTES.md) | Source type analysis, license status, and quality assessment for T006 candidates |
| [FIRST_INCIDENT_SELECTION_RECOMMENDATION.md](FIRST_INCIDENT_SELECTION_RECOMMENDATION.md) | Final selection recommendation with diversity assessment and T007 conditions (T006) |
| [docs/RESEARCH_CONTEXT.md](docs/RESEARCH_CONTEXT.md) | Domain research and strategic context |
| [docs/DECISION_LOG.md](docs/DECISION_LOG.md) | Architectural and strategic decisions |
| [docs/COMPETITOR_BENCHMARKS.md](docs/COMPETITOR_BENCHMARKS.md) | Detailed competitor and benchmark analysis |
| [docs/FULL_SCALE_PRODUCT_BLUEPRINT.md](docs/FULL_SCALE_PRODUCT_BLUEPRINT.md) | Full-scale product blueprint |
| [docs/DATA_MODEL_DRAFT.md](docs/DATA_MODEL_DRAFT.md) | Incident data model and schema draft |
| [docs/TAXONOMY_DRAFT.md](docs/TAXONOMY_DRAFT.md) | Failure mode and control taxonomy |
| [docs/UI_UX_VISION.md](docs/UI_UX_VISION.md) | Public site and search UI vision |

---

## Important Disclaimer

> **Caesar AI Incident Atlas** is a curated public incident knowledge base that maps publicly reported AI failures to governance controls and evidence requirements. It **does not guarantee regulatory compliance**, legal clearance, or audit approval. Incident summaries are based on publicly available information and may be incomplete. Regulatory compliance is a holistic legal, operational, and organizational state determined by qualified experts and competent authorities.
>
> Caesar AI Incident Atlas does not claim that its incident dataset is complete or exhaustive. It does not make legal claims about the organizations or systems referenced in incident records.

---

## License

See [LICENSE](LICENSE) for details.
