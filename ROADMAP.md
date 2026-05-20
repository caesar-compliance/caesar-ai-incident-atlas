# Development Roadmap — caesar-ai-incident-atlas

**Last updated:** 20 May 2026 (T040)
**Status:** v0.7 Dataset Expansion in progress. T040 complete — INC-0012 drafted from CAND-008. Dataset: 12 records. Next: T041 INC-0012 Source/Wording Gate Sign-Off.

---

## T032 — Public MVP Baseline Freeze and Roadmap Split

**Status:** Complete (20 May 2026) — Version 0.7.0

**Public MVP baseline frozen at commit `64c7267` (T031).** 10 records (INC-0001–INC-0010). Live at `https://atlas.caesar.no/`. All 12 governance gates closed. G-01/G-02 approved with caution. G-10 PASS.

**No new records approved.** No dataset expansion, scraping, or import is approved. Approval scope is the current 10-record public MVP only. See `PUBLIC_MVP_BASELINE_FREEZE.md` for frozen rules.

**Next phases:** See `ROADMAP_NEXT_PHASES.md` for the compact v0.7–v1.0 roadmap split.

**Recommended next step:** T033 — v0.7 Dataset Expansion Planning (planning only, no record creation).

---

## T033 — Dataset Expansion Planning for INC-0011+ Candidates

**Status:** Complete (20 May 2026) — Version 0.7.1

**Deliverables created:** `DATASET_EXPANSION_CANDIDATE_CRITERIA.md`, `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md`, `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md`, `INCIDENT_CANDIDATE_SHORTLIST_TEMPLATE.md`, `work-items/T033-dataset-expansion-planning/`.

**No new records created.** No data, source, site, deployment, or governance gate changed. No G-01/G-02 scope expansion. Approval scope remains the current 10-record public MVP only. Not legal advice.

**Recommended next step:** T034 — Candidate Shortlist Draft (planning only, no record creation).

---

## T034 — Candidate Shortlist Draft for INC-0011+ Planning

**Status:** Complete (20 May 2026) — Version 0.7.2

**Deliverables created:** `INCIDENT_CANDIDATE_SHORTLIST_DRAFT.md` (15 candidates CAND-001–CAND-015), `INCIDENT_CANDIDATE_TRIAGE_MATRIX.md` (priority/source readiness/governance value matrices), `INCIDENT_RECORD_CREATION_GATE_CHECKLIST.md` (12-gate checklist), `work-items/T034-candidate-shortlist-draft/`.

**All 15 candidates status `not_approved_candidate`.** No new records created. No data, source, site, deployment, or governance gate changed. No G-01/G-02 scope expansion. Approval scope remains the current 10-record public MVP only. Not legal advice.

**Recommended next step:** T035 — Candidate Source Pack Planning for P1 candidates (planning only, no record creation).

---

## T035 — P1 Candidate Source Pack Planning

**Status:** Complete (20 May 2026) — Version 0.7.3

**Deliverables created:** `P1_CANDIDATE_SOURCE_PACKS.md` (source packs for all 8 P1 candidates), `P1_CANDIDATE_SOURCE_RISK_MATRIX.md` (overview + readiness ranking + defer list), `P1_CANDIDATE_PRIORITIZATION_RECOMMENDATION.md` (4-candidate first batch recommendation), `work-items/T035-p1-candidate-source-packs/`.

**6 candidates `source_pack_ready_for_CT_review`.** CAND-002 downgraded to P2 (needs Tier 1 source). CAND-004 `needs_counsel_gate`. First batch recommendation: CAND-013, CAND-008, CAND-011, CAND-010. No new records. No data, source, site, deployment, or governance gate changed. Not legal advice.

**T036 complete** — First drafting batch selected: CAND-013, CAND-008, CAND-011, CAND-010. All remain `not_approved_candidate`. See `FIRST_DRAFTING_BATCH_SELECTION.md`.

**T037 complete** — Batch-1 source packs finalized. Source URLs verified for all 4 candidates. See `BATCH1_FINAL_SOURCE_PACKS.md`.

**T038 complete** — First new incident record drafted from CAND-013: INC-0011 (Spirometry race bias). Dataset now 11 records. See `INC0011_GOVERNANCE_REVIEW_NOTE.md` for review status.

**T039 complete** — INC-0011 G-01/G-02 signed off with caution. INC-0011 live at https://atlas.caesar.no/. Dataset: 11 records governance-approved. See `INC0011_GATE_SIGNOFF_RECORD.md`.

**T040 complete** — Second new incident record drafted from CAND-008: INC-0012 (AI hiring disability bias — EEOC + DOJ ADA guidance). Dataset now 12 records. INC-0012 prepared for CT review. See `INC0012_GOVERNANCE_REVIEW_NOTE.md`.

**Recommended next step:** T041 — INC-0012 Source/Wording Gate Sign-Off + Live Smoke Test.

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

**Status:** Complete (19 May 2026)
**Version bump:** 0.3.0

**Goal:** Create the first 4 real incident records for the Tier 1 candidates.

**Records created:**
- `INC-0001` — Mata v. Avianca fabricated court citations (CAND-003) — `legal-compliance` — FM-HALL + FM-REL — medium
- `INC-0002` — Autonomous vehicle pedestrian fatality NTSB (CAND-006) — `transportation-autonomous` — FM-SAFE + FM-REL — critical
- `INC-0003` — Air Canada chatbot contract BC CRT (CAND-011) — `retail-ecommerce` — FM-HALL + FM-UNAUTH — medium
- `INC-0004` — Dutch SyRI welfare system Hague Court (CAND-012) — `public-sector` — FM-BIAS + FM-TRANS + FM-UNAUTH — high

**Schema change:** `source.database` renamed to `source_type` with expanded enum.

**Prerequisite for:** T009 second-wave records and full v0.3 Dataset MVP

---

## T009 — Dataset MVP Review and QA Hardening

**Status:** Complete (19 May 2026)
**Version bump:** 0.3.1

**Goal:** Formal review and hardening of the first Dataset MVP batch before second-wave expansion.

**Validation results:**
- Formal schema validation (jsonschema 4.23.0, Draft 2020-12): all 4 records PASS
- Taxonomy cross-validation (FM, CTL, sector, EV, severity, confidence): zero issues
- Source risk review: 5 T008 risks reviewed; 2 accepted, 2 residual, 1 unresolved
- Record corrections: none required
- Documentation fix: `DATASET_MVP_VALIDATION_PLAN.md` stale `database` ref → `source_type`

**Prerequisite for:** T010 second-wave planning/records

---

## T010 — Second-Wave Incident Record Batch

**Status:** Complete (19 May 2026)
**Version bump:** 0.4.0

**Goal:** Create 6 second-wave records for approved candidates. All 6 passed the source gate. All created.

**Records created:**
- `INC-0005` — Facial recognition wrongful arrest (CAND-002) — `law-enforcement` — FM-BIAS + FM-TRANS — high
- `INC-0006` — AI recruitment gender bias (CAND-004) — `hiring-employment` — FM-BIAS — medium
- `INC-0007` — Content moderation COVID-19 over-removal (CAND-005) — `media-content` — FM-REL + FM-TRANS — medium
- `INC-0008` — AI-generated NCII platform restrictions (CAND-009) — `media-content` — FM-PRIV + FM-SAFE + FM-UNAUTH — high
- `INC-0009` — Healthcare algorithm racial bias (CAND-010) — `healthcare-medical` — FM-BIAS + FM-REL — high
- `INC-0010` — EEOC guidance on AI hiring discrimination (CAND-015) — `hiring-employment` — FM-BIAS + FM-TRANS — medium

**Validation:** All 6 records pass formal schema and taxonomy validation. Zero issues.

**Prerequisite for:** T011 Dataset MVP Public Readiness Review or Minimal Static Site Planning

---

## T011 — Dataset MVP Public Readiness Review or Minimal Static Site Planning

**Status:** Planned (next step — requires Control Tower approval of T010 findings)

**Options (for Control Tower):**
- Option A: Dataset MVP Public Readiness Review (review all 10 records before public visibility)
- Option B: Minimal Static Site Planning (technology selection and planning document; no code)
- Option C: Combined readiness review + site planning

**Pre-conditions:**
- Control Tower reviews T010 findings
- Control Tower confirms T011 scope
- T011 must not automatically build a public site

**Prerequisite for:** v0.4 Static Site

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
