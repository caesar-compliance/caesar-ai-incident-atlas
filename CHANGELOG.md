# Changelog

All notable changes to Caesar AI Incident Atlas are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.5.2] - 19 May 2026

### Added

- **T014 — Local QA Tooling and Release Candidate Gate.** `tools/validate_dataset.py`: permanent local QA script checking JSON validity, record count, INC-0011+ absence, schema validation, taxonomy references (FM/CTL/sector/EV), deprecated fields, index-file consistency, site file presence, and no external CDN. `tools/README.md`: usage docs. `RELEASE_CANDIDATE_GATE.md`: pre-deployment checklist for CT review. Exit 0 = PASS.

---

## [0.5.1] - 19 May 2026

### Changed

- **T013 — Static Site Functional Completion.** Upgraded local prototype to functional MVP. Added: global search, sorting (5 options), active filter chips with individual remove, structured detail sections (9 named sections), deep linking (`#INC-NNNN`), copy-link button, dataset status panel, explicit error state, keyboard accessibility (Enter/Space, aria-labels, focus styles). No deployment, no framework, no external dependencies.

---

## [0.5.0] - 19 May 2026

### Added

- **T012 — Minimal Static Site Prototype.** Local-only vanilla HTML/CSS/JS prototype for browsing INC-0001–INC-0010. No framework, no build pipeline, no external dependencies, no deployment.
- `data/incident-index.json` — thin index of 10 records with display metadata.
- `site/index.html` — single-page prototype with incident list and expandable detail cards.
- `site/assets/styles.css` — dark-mode governance dashboard styles.
- `site/assets/app.js` — fetch + render + client-side filter logic (vanilla JS).
- `site/README.md` — local preview instructions (`python3 -m http.server 8080`).
- `work-items/T012-minimal-static-site-prototype/` — compact task docs.

---

## [0.4.1] - 19 May 2026

### Added

- **T011 — Dataset MVP Public Readiness Review.** All 10 records pass formal validation. Verdict: ready with caveats (two draft sectors; FM-REL draft; INC-0008 and INC-0010 confidence medium).
- `DATASET_MVP_PUBLIC_READINESS_REVIEW.md` — readiness verdict, record strength tiers, display requirements.
- `DATASET_MVP_OPEN_RISKS.md` — 15 risks, 0 blocking.
- `MINIMAL_STATIC_SITE_SCOPE_DRAFT.md` — T012 scope options A/B/C; hard constraints.
- `work-items/T011-dataset-mvp-public-readiness-review/` — compact task docs.

---

## [0.4.0] - 19 May 2026

### Added

- **Second-Wave Incident Records (T010).** 6 new records created — INC-0005 through INC-0010. All based on public primary or strong secondary sources. All passed formal schema and taxonomy validation.
- **`data/incidents/INC-0005-facial-recognition-wrongful-arrest-law-enforcement.json`** — Facial recognition wrongful arrest (CAND-002). ACLU + NIST FRVT. Sector: `law-enforcement`. FM-BIAS + FM-TRANS. Severity: high. Confidence: high.
- **`data/incidents/INC-0006-ai-recruitment-tool-gender-bias-discontinued.json`** — AI recruitment gender bias (CAND-004). Reuters investigative. Sector: `hiring-employment`. FM-BIAS. Severity: medium. Confidence: high.
- **`data/incidents/INC-0007-content-moderation-over-removal-covid19-pandemic.json`** — COVID-19 content moderation over-removal (CAND-005). Meta company statement. Sector: `media-content`. FM-REL + FM-TRANS. Severity: medium. Confidence: high.
- **`data/incidents/INC-0008-ai-image-generation-ncii-platform-restrictions.json`** — AI-generated NCII platform restrictions (CAND-009). Microsoft statement + UK OSA. Sector: `media-content`. FM-PRIV + FM-SAFE + FM-UNAUTH. Severity: high. Confidence: medium.
- **`data/incidents/INC-0009-healthcare-algorithm-racial-bias-resource-allocation.json`** — Healthcare algorithm racial bias (CAND-010). Obermeyer et al. Science 2019. Sector: `healthcare-medical`. FM-BIAS + FM-REL. Severity: high. Confidence: high.
- **`data/incidents/INC-0010-eeoc-guidance-ai-hiring-tools-discrimination-risk.json`** — EEOC guidance on AI hiring discrimination (CAND-015). EEOC + NYC LL144. Sector: `hiring-employment`. FM-BIAS + FM-TRANS. Severity: medium. Confidence: medium.
- **`SECOND_WAVE_SOURCE_VERIFICATION_LOG.md`** — Per-candidate source gate log: sources, pass/skip, field support, confidence rationale, gaps.
- **`SECOND_WAVE_QA_REPORT.md`** — QA report: schema, taxonomy, citations, source quality, naming policy, legal conclusions, constraints confirmation.
- **`work-items/T010-second-wave-incident-record-batch/`** — Work item folder with TASK.md, DECISIONS.md, VALIDATION.md, IMPLEMENTATION_REPORT.md.

### Confirmed

- Zero JSON schema violations across all 6 new records (formal validation, jsonschema 4.23.0).
- Zero taxonomy reference issues.
- No INC-0011 or higher created.
- All 10 records (INC-0001 through INC-0010) now in `data/incidents/`.
- No candidates skipped — all 6 passed source gate.
- All 4 new sectors (`law-enforcement`, `hiring-employment`, `media-content`, `healthcare-medical`) confirmed stable in taxonomy.

---

## [0.3.1] - 19 May 2026

### Added

- **Dataset MVP Review (T009).** Formal validation pass on first 4 incident records. All passed.
- **`DATASET_MVP_REVIEW_REPORT.md`** — Full review report: schema validation, taxonomy validation, source risk review, readiness assessment.
- **`FIRST_BATCH_SCHEMA_VALIDATION_REPORT.md`** — Formal schema validation using `jsonschema` 4.23.0, Draft 2020-12. All 4 records: PASS. T008 unresolved risk #6 resolved.
- **`FIRST_BATCH_SOURCE_RISK_REVIEW.md`** — Per-risk review of 5 T008 open source risks. 2 accepted, 2 residual, 1 unresolved.
- **`FIRST_BATCH_RECORD_FIX_LOG.md`** — Fix log. No JSON record corrections needed.
- **`T010_SECOND_WAVE_READINESS_RECOMMENDATION.md`** — T010 scope options (A/B/C), pre-conditions, constraints, secondary recommendations.
- **`work-items/T009-dataset-mvp-review-and-qa-hardening/`** — Work item folder with TASK.md, DECISIONS.md, VALIDATION.md, IMPLEMENTATION_REPORT.md.

### Changed

- **`docs/validation/DATASET_MVP_VALIDATION_PLAN.md`** — Fixed stale `source.database` reference → `source_type` (DEC-038 consistency fix).
- **`SPEC.md`** — Updated version to 0.3.1; fixed stale `database` field references to `source_type`; updated status.
- **`ARCHITECTURE.md`** — Updated version to 0.3.1; updated status note.
- `README.md` — Updated status; added T009 files.
- `ROADMAP.md` — Marked T009 complete; added T010 as next step.
- `PROJECT_STATE.md` — Updated version to 0.3.1; updated latest task.
- `NEXT_ACTIONS.md` — Advanced to T010 with pre-conditions and options.
- `REPO_INVENTORY.md` — All T009 files listed.
- `docs/DECISION_LOG.md` — Added DEC-056 through DEC-065.

### Confirmed

- Zero JSON schema violations across all 4 records (formal validation).
- Zero taxonomy reference issues.
- No new incident records created.
- `data/incidents/` = `.gitkeep` + INC-0001 through INC-0004 only.

---

## [0.3.0] - 19 May 2026

### Added

- **First Tier 1 Incident Records (T008).** First 4 real incident records created in `data/incidents/`. All based on primary official sources (court records, NTSB report, tribunal decision).
- **`data/incidents/INC-0001-mata-v-avianca-court-citations.json`** — AI-generated fabricated court citations (CAND-003). Source: Mata v. Avianca, S.D.N.Y., No. 22-cv-1461. Sectors: legal-compliance. FM-HALL + FM-REL. Severity: medium. Confidence: high.
- **`data/incidents/INC-0002-autonomous-vehicle-pedestrian-fatality-ntsb.json`** — Autonomous vehicle pedestrian fatality (CAND-006). Source: NTSB HWY18MH010. Sector: transportation-autonomous. FM-SAFE + FM-REL. Severity: critical. Confidence: high.
- **`data/incidents/INC-0003-air-canada-chatbot-contract-bc-crt.json`** — Air Canada chatbot unauthorised contract (CAND-011). Source: Moffatt v. Air Canada, 2024 BCCRT 149. Sector: retail-ecommerce. FM-HALL + FM-UNAUTH. Severity: medium. Confidence: high.
- **`data/incidents/INC-0004-dutch-syri-benefits-system-hague-court.json`** — Dutch SyRI automated welfare system (CAND-012). Source: Hague District Court ECLI:NL:RBDHA:2020:1878. Sector: public-sector. FM-BIAS + FM-TRANS + FM-UNAUTH. Severity: high. Confidence: high.
- **`FIRST_RECORD_BATCH_SOURCE_VERIFICATION_LOG.md`** — Per-record source verification log for all 4 records.
- **`FIRST_RECORD_BATCH_QA_REPORT.md`** — Full QA report: all 4 records passed across 10 dimensions.
- **`work-items/T008-first-tier-1-incident-record-batch/`** — Work item folder with TASK.md, DECISIONS.md, VALIDATION.md, IMPLEMENTATION_REPORT.md.

### Changed

- **`schemas/incident.schema.json`** — Renamed `source.database` → `source_type`; replaced narrow enum with practical set: `court_record`, `tribunal_decision`, `regulator_report`, `agency_report`, `company_statement`, `academic_paper`, `credible_media`, `public_database_pointer`, `other`.
- `README.md` — Updated project status; added T008 records and files to repository structure.
- `ROADMAP.md` — Marked T008 complete; added T009 as next step.
- `PROJECT_STATE.md` — Updated version to 0.3.0; updated phase and latest task.
- `NEXT_ACTIONS.md` — Advanced to T009 with pre-conditions.
- `REPO_INVENTORY.md` — All T008 files listed.
- `docs/DECISION_LOG.md` — Added DEC-046 through DEC-055.
- `docs/validation/DATASET_MVP_VALIDATION_PLAN.md` — Updated to reflect first records created.

### Confirmed

- `data/incidents/` contains `.gitkeep` + exactly 4 incident records (INC-0001 through INC-0004).
- No product code, scraper, CLI, static site, or database created.
- All JSON files pass syntax validation. All taxonomy IDs verified.

---

## [0.2.6] - 19 May 2026

### Added

- **First Incident Record Creation Plan (T007).** Planning documentation for converting 10 approved T006 candidates into final incident records. Planning only — no incident records created.
- **`FIRST_INCIDENT_RECORD_CREATION_PLAN.md`** — End-to-end process plan: order of operations, schema pre-work, field mapping rules, ID assignment, wording conventions, pre-commit review checklist.
- **`APPROVED_CANDIDATE_SET_FOR_RECORD_CREATION.md`** — Confirmed candidate set: 4 Tier 1 (T008), 6 Tier 2/3 (T009), 4 postponed, 1 rejected, with wave assignments and open questions.
- **`INCIDENT_FIELD_MAPPING_DRAFTS.md`** — Draft field mappings for all 10 approved candidates (CAND-NNN references only).
- **`SOURCE_TO_FIELD_TRACEABILITY_MATRIX.md`** — Source-to-field traceability for Tier 1 candidates: primary/secondary/interpretive/unsupported classification per field.
- **`RECORD_CREATION_QA_CHECKLIST.md`** — 10-section, 50+ item QA checklist to be completed before each incident record is committed.
- **`T008_FIRST_RECORD_BATCH_RECOMMENDATION.md`** — T008 scope recommendation: 4 Tier 1 records only (INC-0001 through INC-0004), pre-conditions, schema rename requirement.
- **`work-items/T007-first-incident-record-creation-plan/`** — Work item folder with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md.

### Changed

- `README.md` — Added T007 planning files to repository structure table; updated project status.
- `ROADMAP.md` — Marked T007 complete; added T008 as next step with pre-conditions.
- `PROJECT_STATE.md` — Updated version to 0.2.6; updated phase table.
- `NEXT_ACTIONS.md` — Advanced to T008; stated pre-conditions and constraints.
- `REPO_INVENTORY.md` — All T007 files listed.
- `docs/DECISION_LOG.md` — Added DEC-038 through DEC-045.

### Schema Observations (no schema change in T007)

- `source.database` field must be renamed to `source_type` with expanded enum before T008.
- `incident_date` partial-precision workaround defined.
- `evidence_required` EV-XXX prefix convention defined.

### Confirmed

- `data/incidents/` contains only `.gitkeep`. No incident records created in T007.
- No product code, scraper, CLI, static site, or database created.

---

## [0.2.5] - 19 May 2026

### Added

- **First Incident Candidate Dossiers (T006).** Prepared 15 candidate dossiers for Control Tower review. Research documents only — no incident records created.
- **`FIRST_INCIDENT_CANDIDATE_DOSSIERS.md`** — 15 candidate dossiers (CAND-001 through CAND-015) covering 9 sectors and 7 failure mode categories. Each dossier includes provisional ID, summary, failure modes, controls, evidence required, sources, source quality, confidence, severity, open questions, and recommendation.
- **`FIRST_INCIDENT_CANDIDATE_REVIEW_TABLE.md`** — Summary review table for Control Tower: 10 Accept, 4 Postpone, 1 Reject.
- **`FIRST_INCIDENT_SOURCE_REVIEW_NOTES.md`** — Source type analysis, license status review, candidates requiring primary source confirmation, no-external-dataset-import confirmation.
- **`FIRST_INCIDENT_SELECTION_RECOMMENDATION.md`** — Final selection recommendation with diversity assessment, Tier 1–3 Accept rationale, Postpone/Reject reasoning, and T007 conditions.
- **`work-items/T006-first-incident-candidate-dossier-preparation/`** — Work item folder with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md.

### Changed

- `README.md` — Added T006 dossier files to repository structure table.
- `ROADMAP.md` — Marked T006 complete; updated T007 as next step with conditions.
- `PROJECT_STATE.md` — Updated phase table, version, and active task status.
- `NEXT_ACTIONS.md` — Advanced to T007; conditions for approval stated.
- `REPO_INVENTORY.md` — All T006 files listed.
- `docs/DECISION_LOG.md` — Added DEC-032 through DEC-037.

### Confirmed

- `data/incidents/` contains only `.gitkeep`. No incident records created in T006.
- No product code, scraper, CLI, static site, or database created.
- No external datasets imported or third-party content copied.

---

## [0.2.4] - 19 May 2026

### Added

- **Dataset MVP Schema and Taxonomy Files (T005).** Created machine-readable dataset foundation artifacts without creating incident records.
- **`schemas/incident.schema.json`** — v0.2 lenient incident schema with 11 required fields, `INC-0001` ID format, source field requirements (`url`, `database`, `accessed`), confidence/severity enums, and free-text `evidence_required` for v0.2.
- **Taxonomy JSON files in `data/taxonomy/`:**
  - `failure_modes.json`
  - `controls.json`
  - `evidence_types.json`
  - `sectors.json`
  - `confidence_levels.json`
  - `severity_levels.json`
- **Foundation directories and placeholders:** `data/`, `data/incidents/.gitkeep`, `data/taxonomy/.gitkeep`, `schemas/.gitkeep`, `docs/validation/.gitkeep`.
- **Validation documentation:** `docs/validation/DATASET_MVP_VALIDATION_PLAN.md`.
- **work-items/T005-dataset-mvp-schema-taxonomy-files/** — work item folder with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, and DECISIONS.md.
- **docs/DECISION_LOG.md** — added DEC-028 through DEC-031 for schema strictness alignment, taxonomy status handling, incidents-folder emptiness, and T006 sequencing.

### Changed

- **README.md** — updated project status and repository structure to include T005 schema/taxonomy/validation artifacts.
- **SPEC.md** — updated to 0.2.4 dataset foundation status and revised MVP scope to include T005 outputs.
- **ARCHITECTURE.md** — updated status and implementation-state section to reflect T005 artifacts and empty incidents directory.
- **ROADMAP.md** — T005 marked complete; T006 added as next likely approval-gated step.
- **PROJECT_STATE.md** — updated to version 0.2.4 and latest completed task T005.
- **NEXT_ACTIONS.md** — now points to T006 as likely next step after T005; includes dossier-first constraints and no mass import rule.
- **REPO_INVENTORY.md** — updated with all newly created T005 files and directories.

### Constraints confirmation

- No real incident records were created in T005.
- No fake/sample incident records were created.
- No scraper, CLI, static site, database, or product code artifacts were created.
- No external repositories were cloned.
- No third-party files/data/code were copied into the repository.

---

## [0.2.3] - 19 May 2026

### Added

- **Dataset MVP Preparation (T004).** Produced the four planning and safety documents required before any incident records are created. T004 is not the Dataset MVP itself — it is the preparation phase that must be complete and approved before v0.3 begins.
- **DATASET_MVP_IMPLEMENTATION_PLAN.md** — defines what Dataset MVP means and does not include; proposed folder structure for future incident records; proposed schema and taxonomy implementation steps; proposed validation checks; how one-file-per-incident export should work later; how Dataset MVP will connect to Caesar AI Evidence; what must be approved before actual incident creation.
- **FIRST_INCIDENT_SELECTION_CRITERIA.md** — defines how the first 10–20 incidents should be selected; what counts as a suitable incident; required public source quality; preferred failure mode and sector diversity; what incidents should be excluded; how to avoid sensationalism; how to avoid unsupported legal conclusions.
- **SOURCE_VERIFICATION_WORKFLOW.md** — defines the step-by-step source intake process; minimum source requirements; primary vs secondary source treatment; citation fields; confidence levels; disputed incident handling; careful wording rules; source review checklist; when an incident must be rejected or postponed; how to record uncertainty.
- **LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md** — defines how to check source and dataset license status before use; records license verification findings for AIID (CC BY-SA 4.0 — verified), IBM AI Atlas Nexus (Apache-2.0 — verified), OECD AI Incidents Monitor (pending), AIAAIC Repository (pending), MIT AI Incident Tracker (pending); defines default rule (no external dataset import without separate approval).
- **work-items/T004-dataset-mvp-preparation/** — work item folder with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, and DECISIONS.md.
- **docs/DECISION_LOG.md** — added DEC-023 through DEC-027 covering preparation document placement, AIID license verification (CC BY-SA 4.0), IBM AI Atlas Nexus license confirmation (Apache-2.0), pending verifications for OECD/AIAAIC/MIT tracker, and T005 sequencing decision.

### Changed

- **README.md** — repository structure table updated with T004 preparation documents.
- **ARCHITECTURE.md** — updated to reference T004 preparation documents and Dataset MVP implementation plan.
- **ROADMAP.md** — T004 marked complete; T005 added as next step.
- **PROJECT_STATE.md** — version updated to 0.2.3; latest completed task and next recommended step updated.
- **NEXT_ACTIONS.md** — T005 defined as next recommended step with scope and constraints; T004 marked complete; dataset MVP blocked until T005 complete and approved.
- **REPO_INVENTORY.md** — all new T004 files listed; planned directories updated.
- **THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md** — entries A-001 (AIID) and A-005 (IBM AI Atlas Nexus) updated with verified license status.

### License and source findings

- AIID data license verified as CC BY-SA 4.0 (excluding text field of reports). Citation permitted with attribution. Direct import requires Control Tower approval due to ShareAlike implications.
- IBM AI Atlas Nexus license confirmed as Apache-2.0. Citation and study permitted. Direct reuse requires Control Tower approval.
- OECD AI Incidents Monitor, AIAAIC Repository, and MIT AI Incident Tracker license verifications remain pending. Manual verification required before these sources can be cited in Caesar incident records.

---

## [0.2.2] - 19 May 2026

### Added

- **V0.2 Draft Product Contract (T003).** Stable v0.2 documentation contract resolving all open questions from DATA_MODEL_DRAFT.md and TAXONOMY_DRAFT.md. Covers incident record concept, failure mode concept, control mapping concept, evidence mapping concept, source/citation model, confidence model, severity/impact model, sector and AI system filters, relationship to caesar-ai-evidence, and future relationship to Caesar AI Governance OS.
- **V0_2_DRAFT_PRODUCT_CONTRACT.md** — stable v0.2 contract document; resolves incident ID format (INC-0001), evidence requirement format (free-text for v0.2), export format (one file per incident), schema strictness (11 required fields), and taxonomy versioning (together with dataset).
- **SOURCE_AND_CITATION_POLICY_DRAFT.md** — citation rules, preferred source tiers, confidence levels, careful wording rules, rules for disputed/uncertain incidents, no unsupported legal conclusions, no defamatory language, no copying source text, no scraping.
- **V0_2_FIELD_PRIORITY_TABLE.md** — field-by-field priority table for all incident record fields (required / optional / later) with purpose, reason, and risk notes. Identifies overfitting risks for risk_categories, ai_system_name, and organization fields.
- **V0_2_TAXONOMY_REVIEW.md** — taxonomy category review table (stable / draft / later) for all failure mode categories, sub-categories, control categories, evidence types, and sectors. Confirms 8 failure mode categories stable, FM-REL sub-categories draft, AI agent failure sub-categories stable.
- **work-items/T003-v02-draft-contract-review/** — work item folder with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, and DECISIONS.md.
- **docs/DECISION_LOG.md** — added DEC-015 through DEC-022 covering incident ID format, evidence requirement format, export format, schema strictness, taxonomy versioning, FM-REL sub-category status, system_type field, and T004 sequencing.

### Changed

- **README.md** — repository structure table updated with new contract documents.
- **SPEC.md** — updated to reference v0.2 contract decisions; marked open questions as resolved.
- **ARCHITECTURE.md** — updated data model section to reflect v0.2 contract decisions.
- **ROADMAP.md** — T003 marked complete; T004 added as next step.
- **PROJECT_STATE.md** — version updated to 0.2.2; latest completed task and next recommended step updated.
- **NEXT_ACTIONS.md** — T004 defined as next recommended step with scope and deliverables; dataset MVP blocked until T004 complete.
- **REPO_INVENTORY.md** — all new files listed.

---

## [0.2.1] - 19 May 2026

### Added

- **Local architecture mining and clean-room acceleration policy (T002).** Established the safe acceleration framework that allows the team to study external repositories, public incident databases, and benchmark websites without contaminating the Caesar repository with third-party code or restricted material.
- **LOCAL_ARCHITECTURE_MINING_PLAN.md** — defines what may be studied locally, the clean-room boundary, permitted study targets, the local mining workflow, and AI agent rules for architecture mining.
- **CLEAN_ROOM_IMPLEMENTATION_POLICY.md** — defines the clean-room implementation approach, the license classification table (MIT/Apache/BSD, GPL/LGPL, AGPL, Creative Commons, no license, public website, proprietary SaaS, BSL, EUPL, ODC-BY, unknown), and the clean-room process for each implementation task.
- **THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md** — reusable template for documenting individual third-party repository or source reviews.
- **THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md** — running register of all third-party sources reviewed or considered, with license status, reuse decisions, and pending verifications.
- **work-items/T002-local-architecture-mining-clean-room-plan/** — work item folder with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, and DECISIONS.md.
- **docs/DECISION_LOG.md** — added DEC-010 through DEC-014 covering local mining permissions, no-license policy, AGPL/GPL risk, permissive-license attribution requirements, and T003 sequencing decision.

### Changed

- **README.md** — added reference to clean-room policy documents.
- **ARCHITECTURE.md** — added section on local architecture mining approach and clean-room boundary.
- **ROADMAP.md** — updated T002 phase status to complete; added T003 as next step before dataset MVP.
- **PROJECT_STATE.md** — updated current task, version, and next recommended step.
- **NEXT_ACTIONS.md** — updated with T003 as next recommended step; clarified dataset MVP is blocked until T003 is complete.
- **REPO_INVENTORY.md** — added all new files from T002.

---

## [0.2.0] - 19 May 2026

### Added

- **Full-scale AI incident atlas product blueprint.** Defined the complete product vision covering incident dataset concept, incident cards, failure mode taxonomy, incident-to-control mapping, control-to-evidence mapping, source and citation model, severity/impact/confidence fields, sector filters, AI agent failure category, privacy/bias/hallucination/safety/security/unauthorized action categories, public searchable static site concept, future training and risk intelligence use cases, export to caesar-ai-evidence, and future Caesar AI Governance OS integration.
- **docs/COMPETITOR_BENCHMARKS.md** — Detailed analysis of AI Incident Database, OECD AI Incidents and Hazards Monitor, AIAAIC Repository, MIT AI Incident Tracker, and IBM AI Risk Atlas / AI Atlas Nexus, with licensing notes and Caesar differentiation strategy.
- **docs/FULL_SCALE_PRODUCT_BLUEPRINT.md** — Comprehensive product blueprint covering all product dimensions, user journeys, and ecosystem integration.
- **docs/DATA_MODEL_DRAFT.md** — Incident data model and JSON schema draft covering all record types.
- **docs/TAXONOMY_DRAFT.md** — Failure mode taxonomy, control taxonomy, evidence type registry, and sector taxonomy.
- **docs/UI_UX_VISION.md** — Public site and search UI vision for `incidents.caesar.no`.

### Changed

- **README.md** — Rewritten to describe the full-scale product vision, incident categories, benchmark references, ecosystem integration, and repository structure.
- **SPEC.md** — Expanded to full product specification covering all product dimensions including incident dataset concept, failure mode taxonomy, incident-to-control mapping, control-to-evidence mapping, severity/impact/confidence fields, sector filters, AI agent failure category, static site concept, training use cases, export format, and Governance OS integration.
- **ARCHITECTURE.md** — Expanded to cover full data model, file structure, taxonomy layer design, mapping layer design, static site architecture, and integration patterns.
- **ROADMAP.md** — Updated to reflect completed v0.1 and v0.2 phases, and planned v0.3–v1.x phases with clear deliverables and quality gates.
- **PROJECT_STATE.md** — Updated to reflect v0.2.0 blueprint completion, current phase, and next recommended step.
- **NEXT_ACTIONS.md** — Updated with prioritized next steps for v0.3 Dataset MVP phase.
- **docs/DECISION_LOG.md** — Updated with blueprint decisions.
- **REPO_INVENTORY.md** — Updated to include all new documentation files.

---

## [0.1.0] - 19 May 2026

### Added

- Initialized professional repository foundation with core directory layout, strategic specifications, and architecture maps aligned with Caesar AI Governance Hub standards.
- SPEC.md — initial exploit taxonomy specs, incident sources, and control mapping guidelines.
- ARCHITECTURE.md — initial scraper modules layout, indexing pipelines, and local static databases.
- ROADMAP.md — initial multi-phase project development roadmap.
- REPO_INVENTORY.md — structural file index.
- PROJECT_STATE.md — project phase, metadata tracker, and boundaries.
- NEXT_ACTIONS.md — task execution lists and autonomous boundaries.
- docs/RESEARCH_CONTEXT.md — functional domain research and strategic context.
- docs/DECISION_LOG.md — architectural decision log.
