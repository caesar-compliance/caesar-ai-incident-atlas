# Repository Inventory — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

This is a living registry of all files tracked in the `caesar-ai-incident-atlas` repository. It provides developers and automated agents with a reference mapping each file to its exact role.

---

## Root Files

| File | Role | Description |
|---|---|---|
| `README.md` | Main introduction | Full product description, incident categories, benchmark references, ecosystem integration, and repository structure. |
| `SPEC.md` | Product specification | Complete product specification covering incident dataset, failure mode taxonomy, control mapping, evidence mapping, severity fields, sector filters, AI agent failures, static site concept, training use cases, export format, and Governance OS integration. |
| `ARCHITECTURE.md` | System architecture | Data model, file structure, taxonomy layer, mapping layer, static site architecture, integration patterns, and clean-room boundary. |
| `ROADMAP.md` | Development roadmap | Phase plan from v0.1 Foundation through v1.x Governance OS Integration with deliverables and quality gates. |
| `CHANGELOG.md` | Release history | Semver-compliant chronological history of all updates and releases. |
| `REPO_INVENTORY.md` | File registry | This file. Living index of all tracked files and their roles. |
| `PROJECT_STATE.md` | Project state | Current phase, version, status, completed tasks, and next recommended step. |
| `NEXT_ACTIONS.md` | Next actions | Prioritized next steps, safe autonomous tasks, tasks requiring approval, and cross-repository coordination notes. |
| `LOCAL_ARCHITECTURE_MINING_PLAN.md` | Mining policy | Defines what may be studied locally, the clean-room boundary, permitted study targets, local mining workflow, and AI agent rules. |
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | Clean-room policy | License classification table (MIT/Apache/BSD, GPL/LGPL, AGPL, CC, no license, public website, proprietary SaaS, BSL, EUPL, ODC-BY, unknown) and clean-room process for each implementation task. |
| `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md` | Review template | Reusable template for documenting individual third-party repository or source reviews. |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Source register | Running register of all third-party sources reviewed or considered, with license status, reuse decisions, and pending verifications. |
| `V0_2_DRAFT_PRODUCT_CONTRACT.md` | v0.2 product contract | Stable v0.2 documentation contract resolving all open questions from DATA_MODEL_DRAFT.md and TAXONOMY_DRAFT.md. Covers incident record concept, failure mode concept, control mapping, evidence mapping, source/citation model, confidence model, severity/impact model, sector filters, relationship to caesar-ai-evidence, and future Governance OS integration. |
| `SOURCE_AND_CITATION_POLICY_DRAFT.md` | Citation policy | Citation rules, preferred source tiers, confidence levels, careful wording rules, rules for disputed/uncertain incidents, no unsupported legal conclusions, no defamatory language, no scraping. |
| `V0_2_FIELD_PRIORITY_TABLE.md` | Field priority table | Field-by-field priority table for all incident record fields (required / optional / later) with purpose, reason, and risk notes. Identifies overfitting risks. |
| `V0_2_TAXONOMY_REVIEW.md` | Taxonomy review | Taxonomy category review (stable / draft / later) for all failure mode categories, sub-categories, control categories, evidence types, and sectors. |
| `DATASET_MVP_IMPLEMENTATION_PLAN.md` | Dataset MVP plan | Defines what Dataset MVP means and does not include; proposed folder structure; proposed schema and taxonomy implementation steps; proposed validation checks; export concept; connection to caesar-ai-evidence; approval gates before incident creation. |
| `FIRST_INCIDENT_SELECTION_CRITERIA.md` | Incident selection criteria | Defines how the first 10–20 incidents should be selected; suitability criteria; source quality requirements; preferred failure mode and sector diversity; exclusion rules; how to avoid sensationalism and unsupported legal conclusions. |
| `SOURCE_VERIFICATION_WORKFLOW.md` | Source verification workflow | Step-by-step workflow for verifying sources before creating an incident record; source intake process; minimum source requirements; primary vs secondary source treatment; citation fields; confidence levels; disputed incident handling; careful wording rules; source review checklist; rejection and postponement rules. |
| `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` | License and source safety checklist | How to check source and dataset license status before use; treatment of AIID (CC BY-SA 4.0 — verified), IBM AI Atlas Nexus (Apache-2.0 — verified), OECD (pending), AIAAIC (pending), MIT tracker (pending); default rule (no external dataset import without separate approval); pages requiring manual verification. |
| `data/.gitkeep` | Directory placeholder | Preserves the `data/` directory in git. |
| `data/incidents/.gitkeep` | Empty incidents placeholder | Preserves `data/incidents/` while ensuring no incident records are committed in T005. |
| `data/taxonomy/.gitkeep` | Taxonomy directory placeholder | Preserves `data/taxonomy/` directory in git. |
| `data/taxonomy/failure_modes.json` | Failure mode taxonomy | Machine-readable failure mode taxonomy with stable/draft status markers for v0.2. |
| `data/taxonomy/controls.json` | Control taxonomy | Machine-readable control taxonomy baseline for v0.2 mapping. |
| `data/taxonomy/evidence_types.json` | Evidence type taxonomy | Machine-readable evidence type registry baseline for v0.2. |
| `data/taxonomy/sectors.json` | Sector taxonomy | Machine-readable sector taxonomy with stable/draft markers. |
| `data/taxonomy/confidence_levels.json` | Confidence levels | Machine-readable confidence level reference (`low`, `medium`, `high`). |
| `data/taxonomy/severity_levels.json` | Severity levels | Machine-readable severity level reference (`low`, `medium`, `high`, `critical`). |
| `schemas/.gitkeep` | Schema directory placeholder | Preserves `schemas/` directory in git. |
| `schemas/incident.schema.json` | Incident schema | Lenient v0.2 JSON Schema with 11 required fields and source/citation constraints. |
| `FIRST_INCIDENT_CANDIDATE_DOSSIERS.md` | Candidate dossiers | 15 candidate incident dossiers (CAND-001 through CAND-015) for Control Tower review. Candidate only — not incident records. (T006) |
| `FIRST_INCIDENT_CANDIDATE_REVIEW_TABLE.md` | Candidate review table | Summary review table: 10 Accept, 4 Postpone, 1 Reject. Control Tower review aid. (T006) |
| `FIRST_INCIDENT_SOURCE_REVIEW_NOTES.md` | Source review notes | Source type analysis, license status review, and quality assessment for T006 candidates. (T006) |
| `FIRST_INCIDENT_SELECTION_RECOMMENDATION.md` | Selection recommendation | Final selection recommendation with diversity assessment, Tier 1–3 rationale, and T007 conditions. (T006) |
| `FIRST_INCIDENT_RECORD_CREATION_PLAN.md` | Record creation plan | End-to-end plan for converting T006 candidates into incident records: order of ops, schema pre-work, field rules, ID assignment, wording conventions. (T007) |
| `APPROVED_CANDIDATE_SET_FOR_RECORD_CREATION.md` | Approved candidate set | Wave assignments: 4 Tier 1 (T008), 6 Tier 2/3 (T009), 4 postponed, 1 rejected. Open questions per candidate. (T007) |
| `INCIDENT_FIELD_MAPPING_DRAFTS.md` | Field mapping drafts | Draft field-level mappings for all 10 approved candidates. CAND-NNN references only. (T007) |
| `SOURCE_TO_FIELD_TRACEABILITY_MATRIX.md` | Source traceability matrix | Source-to-field traceability for Tier 1 candidates: P/S/I/U classification per field. (T007) |
| `RECORD_CREATION_QA_CHECKLIST.md` | QA checklist | 10-section, 50+ item checklist to complete before each incident record is committed. (T007) |
| `T008_FIRST_RECORD_BATCH_RECOMMENDATION.md` | T008 recommendation | Recommended T008 scope, pre-conditions, ID sequence, schema rename requirement. (T007) |

---

## docs/ Directory

| File | Role | Description |
|---|---|---|
| `docs/RESEARCH_CONTEXT.md` | Domain research | Strategic domain research, product type, main users, use cases, MVP scope, and future paid use cases. |
| `docs/DECISION_LOG.md` | Decision log | Chronological record of technical, strategic, and governance decisions (DEC-001 through DEC-045). |
| `docs/COMPETITOR_BENCHMARKS.md` | Competitor analysis | Detailed analysis of AI Incident Database, OECD AI Incidents Monitor, AIAAIC Repository, MIT AI Incident Tracker, and IBM AI Risk Atlas, with licensing notes and Caesar differentiation. |
| `docs/FULL_SCALE_PRODUCT_BLUEPRINT.md` | Product blueprint | Comprehensive full-scale product blueprint covering all product dimensions, user journeys, and ecosystem integration. |
| `docs/DATA_MODEL_DRAFT.md` | Data model | Incident data model and JSON schema draft covering all record types. Open questions listed for T003 resolution. |
| `docs/TAXONOMY_DRAFT.md` | Taxonomy | Failure mode taxonomy (8 categories, 40+ sub-categories), control taxonomy (10 categories, 40+ controls), evidence type registry, sector taxonomy. |
| `docs/UI_UX_VISION.md` | UI/UX vision | Public site and search UI vision for `incidents.caesar.no`. |
| `docs/validation/.gitkeep` | Validation directory placeholder | Preserves `docs/validation/` directory in git. |
| `docs/validation/DATASET_MVP_VALIDATION_PLAN.md` | Dataset validation plan | Defines schema/manual/source-license validation gates and acceptance blockers for future incident records. |

---

## work-items/ Directory

| File | Role | Description |
|---|---|---|
| `work-items/.gitkeep` | Directory placeholder | Preserves the work-items directory in git. |
| `work-items/T002-local-architecture-mining-clean-room-plan/TASK.md` | T002 task | Task checklist, scope, constraints, and rationale for T002. |
| `work-items/T002-local-architecture-mining-clean-room-plan/VALIDATION.md` | T002 validation | Validation report confirming T002 quality gates were met. |
| `work-items/T002-local-architecture-mining-clean-room-plan/IMPLEMENTATION_REPORT.md` | T002 report | Implementation report with files created, files changed, and final status. |
| `work-items/T002-local-architecture-mining-clean-room-plan/DECISIONS.md` | T002 decisions | Architectural and policy decisions made during T002. |
| `work-items/T003-v02-draft-contract-review/TASK.md` | T003 task | Task checklist, scope, constraints, and rationale for T003. |
| `work-items/T003-v02-draft-contract-review/VALIDATION.md` | T003 validation | Validation report confirming T003 quality gates were met. |
| `work-items/T003-v02-draft-contract-review/IMPLEMENTATION_REPORT.md` | T003 report | Implementation report with files created, files changed, and final status. |
| `work-items/T003-v02-draft-contract-review/DECISIONS.md` | T003 decisions | Architectural and policy decisions made during T003 (DEC-015 through DEC-022). |
| `work-items/T004-dataset-mvp-preparation/TASK.md` | T004 task | Task checklist, scope, constraints, and rationale for T004. |
| `work-items/T004-dataset-mvp-preparation/VALIDATION.md` | T004 validation | Validation report confirming T004 quality gates were met. |
| `work-items/T004-dataset-mvp-preparation/IMPLEMENTATION_REPORT.md` | T004 report | Implementation report with files created, files changed, and final status. |
| `work-items/T004-dataset-mvp-preparation/DECISIONS.md` | T004 decisions | Decisions made during T004 (DEC-023 through DEC-027). |
| `work-items/T005-dataset-mvp-schema-taxonomy-files/TASK.md` | T005 task | Task checklist, scope, constraints, and rationale for T005. |
| `work-items/T005-dataset-mvp-schema-taxonomy-files/VALIDATION.md` | T005 validation | Validation report confirming T005 quality gates were met. |
| `work-items/T005-dataset-mvp-schema-taxonomy-files/IMPLEMENTATION_REPORT.md` | T005 report | Implementation report with files created, files changed, and final status. |
| `work-items/T005-dataset-mvp-schema-taxonomy-files/DECISIONS.md` | T005 decisions | Decisions made during T005 (DEC-028 through DEC-031). |
| `work-items/T006-first-incident-candidate-dossier-preparation/TASK.md` | T006 task | Task scope, constraints, deliverables, and prerequisites for T006. |
| `work-items/T006-first-incident-candidate-dossier-preparation/VALIDATION.md` | T006 validation | Validation checklist confirming T006 quality gates were met. |
| `work-items/T006-first-incident-candidate-dossier-preparation/IMPLEMENTATION_REPORT.md` | T006 report | Implementation report with files created, files changed, schema observations, and final status. |
| `work-items/T006-first-incident-candidate-dossier-preparation/DECISIONS.md` | T006 decisions | Decisions made during T006 (DEC-T006-001 through DEC-T006-006). |
| `work-items/T007-first-incident-record-creation-plan/TASK.md` | T007 task | Task scope, constraints, and approved candidate set for T007. |
| `work-items/T007-first-incident-record-creation-plan/VALIDATION.md` | T007 validation | Validation checklist confirming T007 quality gates were met. |
| `work-items/T007-first-incident-record-creation-plan/IMPLEMENTATION_REPORT.md` | T007 report | Implementation report with files created, schema observations, and final status. |
| `work-items/T007-first-incident-record-creation-plan/DECISIONS.md` | T007 decisions | 8 decisions including schema rename requirement, field conventions, and T008 scope limit. |

---

## Planned Directories (Not Yet Created)

| Directory | Planned role |
|---|---|
| `data/mappings/` | Incident-to-control and control-to-evidence mapping files (future phase) |
| `exports/` | Generated export files for caesar-ai-evidence (future phase) |
| `docs/reviews/` | Individual third-party source review files (using THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md) |

---

## Update Guidelines

When modifying this repository:

1. Add any newly created files to this inventory with their role and description.
2. Update CHANGELOG.md with an accurate semver entry.
3. Update PROJECT_STATE.md if the phase or status changes.
4. Verify that no secrets, credentials, or temporary files are tracked.
5. Use date format: 19 May 2026.
