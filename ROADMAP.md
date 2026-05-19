# Development Roadmap — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Status:** Blueprint phase complete. Dataset and site phases planned.

---

## Phase Overview

```
v0.1 Foundation
  → v0.2 Blueprint
    → v0.3 Dataset MVP
      → v0.4 Static Site
        → v0.5 Export Integration
          → v1.0 Stable Public Release
            → v1.x Governance OS Integration
```

---

## Phase v0.1 — Repository Foundation

**Status:** Complete (19 May 2026)

**Goal:** Establish clean repository layout, standards documentation, and ecosystem alignment.

**Deliverables:**
- Repository scaffolding aligned with Caesar AI Governance Hub standards.
- Initial SPEC.md, ARCHITECTURE.md, ROADMAP.md, CHANGELOG.md, REPO_INVENTORY.md.
- PROJECT_STATE.md, NEXT_ACTIONS.md, docs/DECISION_LOG.md.
- docs/RESEARCH_CONTEXT.md with domain research.

---

## Phase v0.2 — Full-Scale Blueprint

**Status:** Complete (19 May 2026)

**Goal:** Define the full-scale product vision, data model, taxonomy, competitor benchmarks, and UI/UX vision. No implementation code.

**Deliverables:**
- Updated README.md with full product description.
- Updated SPEC.md with complete product specification.
- Updated ARCHITECTURE.md with data model and system design.
- Updated ROADMAP.md (this file).
- Updated PROJECT_STATE.md and NEXT_ACTIONS.md.
- Updated docs/DECISION_LOG.md.
- docs/COMPETITOR_BENCHMARKS.md — detailed competitor and benchmark analysis.
- docs/FULL_SCALE_PRODUCT_BLUEPRINT.md — full-scale product blueprint.
- docs/DATA_MODEL_DRAFT.md — incident data model and schema draft.
- docs/TAXONOMY_DRAFT.md — failure mode and control taxonomy.
- docs/UI_UX_VISION.md — public site and search UI vision.

---

## T002 — Local Architecture Mining / Clean-Room Acceleration Plan

**Status:** Complete (19 May 2026)
**Version bump:** 0.2.1

**Goal:** Establish the safe acceleration policy that allows the team to study external repositories, public incident databases, and benchmark websites without contaminating the Caesar repository with third-party code or restricted material.

**Deliverables:**
- LOCAL_ARCHITECTURE_MINING_PLAN.md — what may be studied locally, clean-room boundary, permitted study targets, AI agent rules.
- CLEAN_ROOM_IMPLEMENTATION_POLICY.md — license classification table, clean-room process, default implementation approach.
- THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md — reusable template for source reviews.
- THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md — running register of all sources reviewed.
- work-items/T002-local-architecture-mining-clean-room-plan/ — work item folder.
- Updated README.md, ARCHITECTURE.md, ROADMAP.md, PROJECT_STATE.md, NEXT_ACTIONS.md, CHANGELOG.md, REPO_INVENTORY.md, docs/DECISION_LOG.md.

---

## T003 — Data Model / Taxonomy / Citation Contract

**Status:** Complete (19 May 2026)
**Version bump:** 0.2.2

**Goal:** Review and reconcile DATA_MODEL_DRAFT.md, TAXONOMY_DRAFT.md, and source/citation policy into a stable v0.2 draft contract.

**Deliverables:**
- V0_2_DRAFT_PRODUCT_CONTRACT.md — stable v0.2 contract resolving all open questions.
- SOURCE_AND_CITATION_POLICY_DRAFT.md — citation rules, confidence levels, wording rules.
- V0_2_FIELD_PRIORITY_TABLE.md — field priority table (required / optional / later).
- V0_2_TAXONOMY_REVIEW.md — taxonomy category review (stable / draft / later).
- work-items/T003-v02-draft-contract-review/ — work item folder.
- Updated README.md, ARCHITECTURE.md, ROADMAP.md, PROJECT_STATE.md, NEXT_ACTIONS.md, CHANGELOG.md, REPO_INVENTORY.md, docs/DECISION_LOG.md.

**Key decisions locked:**
- Incident ID format: INC-0001 (sequential, four digits)
- Evidence requirements: free-text strings for v0.2
- Export format: one file per incident
- Schema strictness: lenient — 11 required fields
- Taxonomy versioning: together with dataset
- FM-REL sub-categories: draft — use top-level only in v0.2

---

## T004 — Dataset MVP Preparation

**Status:** Complete (19 May 2026)
**Version bump:** 0.2.3

**Goal:** Prepare the planning and safety documents required before creating the first 10–20 curated incident records. T004 is not the Dataset MVP itself.

**Deliverables:**
- DATASET_MVP_IMPLEMENTATION_PLAN.md — what Dataset MVP means, folder structure, schema steps, validation, export, integration, approval gates
- FIRST_INCIDENT_SELECTION_CRITERIA.md — selection criteria for first 10–20 incidents
- SOURCE_VERIFICATION_WORKFLOW.md — step-by-step source verification workflow
- LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md — license and source safety checklist; AIID (CC BY-SA 4.0) and IBM AI Atlas Nexus (Apache-2.0) verified; OECD, AIAAIC, MIT tracker pending manual verification
- work-items/T004-dataset-mvp-preparation/ — work item folder with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md
- Updated README.md, ARCHITECTURE.md, ROADMAP.md, PROJECT_STATE.md, NEXT_ACTIONS.md, CHANGELOG.md, REPO_INVENTORY.md, docs/DECISION_LOG.md, THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md

**Key decisions:**
- DEC-023: T004 preparation documents placed in repository root (not docs/)
- DEC-024: AIID data license verified as CC BY-SA 4.0 (excluding text field of reports)
- DEC-025: IBM AI Atlas Nexus license confirmed as Apache-2.0
- DEC-026: OECD, AIAAIC, MIT tracker license verifications remain pending
- DEC-027: T005 is the next step after T004

**Prerequisite for:** T005 — Dataset MVP Schema and Taxonomy Files

---

## T005 — Dataset MVP Schema and Taxonomy Files

**Status:** Complete (19 May 2026)
**Version bump:** 0.2.4

**Goal:** Create the JSON Schema files and taxonomy JSON files that are the prerequisite for incident record creation. T005 is not the Dataset MVP itself.

**Deliverables:**
- schemas/incident.schema.json
- data/taxonomy/failure_modes.json
- data/taxonomy/controls.json
- data/taxonomy/evidence_types.json
- data/taxonomy/sectors.json
- data/taxonomy/confidence_levels.json
- data/taxonomy/severity_levels.json
- docs/validation/DATASET_MVP_VALIDATION_PLAN.md
- data/incidents/.gitkeep (no records)
- work-items/T005-dataset-mvp-schema-taxonomy-files/ — work item folder

**Constraints:** No real incident records. No fake/sample incident records. No product code beyond schema and taxonomy JSON files.

**Key decisions:**
- DEC-028: Incident schema remains lenient with 11 required fields
- DEC-029: Taxonomy files include stable entries with explicit draft markers
- DEC-030: data/incidents remains empty in T005
- DEC-031: T006 is the next likely step after T005

**Prerequisite for:** T006 candidate dossier preparation and v0.3 incident curation

---

## T006 — First Incident Candidate Dossier Preparation

**Status:** Complete (19 May 2026)
**Version bump:** 0.2.5


**Goal:** Prepare candidate dossiers for 10–20 potential incidents with public source links and verification notes before creating final incident records.

**Deliverables:**
- `FIRST_INCIDENT_CANDIDATE_DOSSIERS.md` — 15 candidate dossiers (CAND-001 through CAND-015)
- `FIRST_INCIDENT_CANDIDATE_REVIEW_TABLE.md` — summary review table
- `FIRST_INCIDENT_SOURCE_REVIEW_NOTES.md` — source and license review notes
- `FIRST_INCIDENT_SELECTION_RECOMMENDATION.md` — 10 Accept, 4 Postpone, 1 Reject
- `work-items/T006-first-incident-candidate-dossier-preparation/` — work item folder

**Constraints:** No mass-imported data. No scraper. No final incident records. No external dataset import.

**Key decisions:**
- DEC-T006-001: Dossiers written as Markdown prose, not JSON
- DEC-T006-002: Candidate ID format CAND-NNN
- DEC-T006-003: Public primary sources only; discovery pointers only for AIID/AIAAIC
- DEC-T006-004: Schema usability observations recorded; schema not modified
- DEC-T006-005: 15 candidates prepared — 10 Accept, 4 Postpone, 1 Reject
- DEC-T006-006: data/incidents/ unchanged — only .gitkeep

**Prerequisite for:** T007 — First Incident Record Creation Plan

---

## T007 — First Incident Record Creation Plan

**Status:** Complete (19 May 2026)
**Version bump:** 0.2.6

**Goal:** Prepare a safe, reviewable plan for converting the 10 approved T006 candidates into the first real incident records in T008. Planning only — no incident records created.

**Deliverables:**
- `FIRST_INCIDENT_RECORD_CREATION_PLAN.md` — end-to-end process plan
- `APPROVED_CANDIDATE_SET_FOR_RECORD_CREATION.md` — wave assignments and open questions
- `INCIDENT_FIELD_MAPPING_DRAFTS.md` — draft field mappings for 10 candidates
- `SOURCE_TO_FIELD_TRACEABILITY_MATRIX.md` — Tier 1 source-to-field traceability
- `RECORD_CREATION_QA_CHECKLIST.md` — 50+ item QA checklist
- `T008_FIRST_RECORD_BATCH_RECOMMENDATION.md` — T008 scope recommendation
- `work-items/T007-first-incident-record-creation-plan/` — work item folder

**Key decisions:**
- DEC-T007-001: `source.database` must be renamed to `source_type` before T008
- DEC-T007-002: T008 limited to Tier 1 candidates only
- DEC-T007-003: `incident_date` partial-precision workaround defined
- DEC-T007-004: `evidence_required` EV-XXX prefix convention
- DEC-T007-005: `failure_modes`/`controls` canonical ID-only convention

**Prerequisite for:** T008 — First Tier 1 Incident Record Batch (requires explicit Control Tower approval)

---

## T008 — First Tier 1 Incident Record Batch

**Status:** Planned (next step — requires Control Tower approval)

**Goal:** Create the first 4 real incident records for the Tier 1 candidates.

**Scope:**
- Schema pre-work: rename `source.database` → `source_type`
- 4 incident JSON files: INC-0001 through INC-0004
- QA checklist completion per record

**Pre-conditions:**
- Control Tower approval of T007 plan
- Schema rename approved
- Individual naming policy confirmed
- Source verification completed for all 4 Tier 1 candidates

**Prerequisite for:** T009 second-wave records and v0.3 Dataset MVP

---

## Phase v0.3 — Dataset MVP

**Status:** Blocked until T006 candidate dossiers are approved

**Goal:** Build the first working incident dataset with 10–20 curated incident records, taxonomy definitions, and control mappings.

**Deliverables:**
- JSON Schema definitions for incident, taxonomy, control, and evidence records.
- Failure mode taxonomy (JSON).
- Control taxonomy (JSON).
- Evidence type registry (JSON).
- Sector taxonomy (JSON).
- 10–20 curated incident records with full metadata, source citations, and control mappings.
- Control-to-evidence mappings.
- Basic validation script to check incident records against schemas.
- Export script generating caesar-ai-evidence compatible JSON.

**Quality gates:**
- Every incident record has at least one verified public source.
- Every incident record has at least one failure mode, one control, and one evidence requirement.
- All records pass JSON Schema validation.
- No legal claims in incident summaries.
- No competitor data copied without license verification.

---

## Phase v0.4 — Static Site

**Status:** Planned

**Goal:** Build a public searchable static site at `incidents.caesar.no`.

**Deliverables:**
- Static site generator (technology to be decided in v0.3).
- Incident index page with search and filters.
- Individual incident card pages.
- Failure mode taxonomy pages.
- Control recommendation pages.
- Sector filter pages.
- Client-side search index.
- Deployment to `incidents.caesar.no`.

**Quality gates:**
- Site is accessible (WCAG 2.1 AA target).
- Site loads without a backend.
- Search works client-side.
- All incident cards display source citations.
- Disclaimer is visible on all pages.

---

## Phase v0.5 — Export Integration

**Status:** Planned

**Goal:** Formalize export to `caesar-ai-evidence` and prepare for Governance OS integration.

**Deliverables:**
- Stable export format for `caesar-ai-evidence` incident-mapping schema.
- Export CLI command or script.
- Integration documentation for `caesar-ai-evidence`.
- Sector-specific risk profile exports.
- Evidence gap report generation based on incident patterns.

---

## Phase v1.0 — Stable Public Release

**Status:** Planned

**Goal:** First stable public release with a curated dataset, public site, and evidence export.

**Deliverables:**
- 50+ curated incident records across all major failure mode categories.
- Full taxonomy coverage.
- Public site live at `incidents.caesar.no`.
- Stable export format.
- Documentation complete.
- CHANGELOG and versioning up to date.

---

## Phase v1.x — Governance OS Integration

**Status:** Future

**Goal:** Integrate the Atlas as a risk library module inside Caesar AI Governance OS.

**Deliverables:**
- Risk library API for Governance OS.
- Client workspace risk view.
- Control recommendations linked to client control library.
- Evidence gap alerts based on sector-specific incident patterns.
- New incident notifications in client risk intelligence inbox.

---

## Future Considerations

The following are longer-term possibilities, not committed roadmap items:

- Training and workshop material packs for sector-specific AI governance training.
- Automated monitoring of public incident databases for new entries (requires careful license review).
- Trend analysis and risk intelligence reports.
- Structured incident reporting template for organizations to submit new incidents.
- Integration with `caesar-ai-regulation-watch` to link incidents to regulatory obligations.
- Integration with `caesar-ai-scan` to flag codebases with patterns associated with known incident types.
