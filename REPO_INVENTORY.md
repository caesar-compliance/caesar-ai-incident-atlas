# Repository Inventory — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

This is a living registry of all files tracked in the `caesar-ai-incident-atlas` repository. It provides developers and automated agents with a reference mapping each file to its exact role.

---

## Root Files

| File | Role | Description |
|---|---|---|
| `README.md` | Main introduction | Full product description, incident categories, benchmark references, ecosystem integration, and repository structure. |
| `SPEC.md` | Product specification | Complete product specification covering incident dataset, failure mode taxonomy, control mapping, evidence mapping, severity fields, sector filters, AI agent failures, static site concept, training use cases, export format, and Governance OS integration. |
| `ARCHITECTURE.md` | System architecture | Data model, file structure, taxonomy layer, mapping layer, static site architecture, and integration patterns. |
| `ROADMAP.md` | Development roadmap | Phase plan from v0.1 Foundation through v1.x Governance OS Integration with deliverables and quality gates. |
| `CHANGELOG.md` | Release history | Semver-compliant chronological history of all updates and releases. |
| `REPO_INVENTORY.md` | File registry | This file. Living index of all tracked files and their roles. |
| `PROJECT_STATE.md` | Project state | Current phase, version, status, completed tasks, and next recommended step. |
| `NEXT_ACTIONS.md` | Next actions | Prioritized next steps, safe autonomous tasks, tasks requiring approval, and cross-repository coordination notes. |

---

## docs/ Directory

| File | Role | Description |
|---|---|---|
| `docs/RESEARCH_CONTEXT.md` | Domain research | Strategic domain research, product type, main users, use cases, MVP scope, and future paid use cases. |
| `docs/DECISION_LOG.md` | Decision log | Chronological record of technical, strategic, and governance decisions. |
| `docs/COMPETITOR_BENCHMARKS.md` | Competitor analysis | Detailed analysis of AI Incident Database, OECD AI Incidents Monitor, AIAAIC Repository, MIT AI Incident Tracker, and IBM AI Risk Atlas, with licensing notes and Caesar differentiation. |
| `docs/FULL_SCALE_PRODUCT_BLUEPRINT.md` | Product blueprint | Comprehensive full-scale product blueprint covering all product dimensions, user journeys, and ecosystem integration. |
| `docs/DATA_MODEL_DRAFT.md` | Data model | Incident data model and JSON schema draft covering all record types. |
| `docs/TAXONOMY_DRAFT.md` | Taxonomy | Failure mode taxonomy, control taxonomy, evidence type registry, and sector taxonomy. |
| `docs/UI_UX_VISION.md` | UI/UX vision | Public site and search UI vision for `incidents.caesar.no`. |

---

## Planned Directories (Not Yet Created)

| Directory | Planned role |
|---|---|
| `data/incidents/` | Individual incident JSON records |
| `data/taxonomy/` | Taxonomy JSON files (failure modes, controls, evidence types, sectors) |
| `data/mappings/` | Incident-to-control and control-to-evidence mapping files |
| `schemas/` | JSON Schema definitions for all record types |
| `exports/` | Generated export files for caesar-ai-evidence |

---

## work-items/ Directory

| File | Role |
|---|---|
| `work-items/.gitkeep` | Directory placeholder for active task execution sandboxes |

---

## Update Guidelines

When modifying this repository:

1. Add any newly created files to this inventory with their role and description.
2. Update CHANGELOG.md with an accurate semver entry.
3. Update PROJECT_STATE.md if the phase or status changes.
4. Verify that no secrets, credentials, or temporary files are tracked.
5. Use date format: 19 May 2026.
