# Repository Inventory — caesar-ai-incident-atlas

**Last updated:** 20 May 2026

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
| `data/incidents/.gitkeep` | Directory placeholder | Preserves `data/incidents/` directory in git. |
| `data/incidents/INC-0001-mata-v-avianca-court-citations.json` | Incident record | INC-0001: AI-generated fabricated court citations. Source: Mata v. Avianca, S.D.N.Y. FM-HALL+FM-REL. Severity: medium. (T008) |
| `data/incidents/INC-0002-autonomous-vehicle-pedestrian-fatality-ntsb.json` | Incident record | INC-0002: Autonomous vehicle pedestrian fatality. Source: NTSB HWY18MH010. FM-SAFE+FM-REL. Severity: critical. (T008) |
| `data/incidents/INC-0003-air-canada-chatbot-contract-bc-crt.json` | Incident record | INC-0003: Air Canada chatbot contract. Source: Moffatt v. Air Canada, 2024 BCCRT 149. FM-HALL+FM-UNAUTH. Severity: medium. (T008) |
| `data/incidents/INC-0004-dutch-syri-benefits-system-hague-court.json` | Incident record | Dutch SyRI automated welfare system: public sector, FM-BIAS + FM-TRANS + FM-UNAUTH, severity high, confidence high. Primary source: Hague District Court ECLI:NL:RBDHA:2020:1878. (T008) |
| `data/incidents/INC-0005-facial-recognition-wrongful-arrest-law-enforcement.json` | Incident record | Facial recognition wrongful arrest: law-enforcement sector, FM-BIAS + FM-TRANS, severity high, confidence high. Sources: ACLU case documentation + NIST FRVT Part 3. (T010) |
| `data/incidents/INC-0006-ai-recruitment-tool-gender-bias-discontinued.json` | Incident record | AI recruitment gender bias: hiring-employment sector, FM-BIAS, severity medium, confidence high. Source: Reuters investigative report, Oct 2018. (T010) |
| `data/incidents/INC-0007-content-moderation-over-removal-covid19-pandemic.json` | Incident record | COVID-19 content moderation over-removal: media-content sector, FM-REL + FM-TRANS, severity medium, confidence high. Sources: Meta company statements, March 2020. (T010) |
| `data/incidents/INC-0008-ai-image-generation-ncii-platform-restrictions.json` | Incident record | AI-generated NCII platform restrictions: media-content sector, FM-PRIV + FM-SAFE + FM-UNAUTH, severity high, confidence medium. Sources: Microsoft statement + UK OSA. (T010) |
| `data/incidents/INC-0009-healthcare-algorithm-racial-bias-resource-allocation.json` | Incident record | Healthcare algorithm racial bias: healthcare-medical sector, FM-BIAS + FM-REL, severity high, confidence high. Source: Obermeyer et al., Science 2019. (T010) |
| `data/incidents/INC-0010-eeoc-guidance-ai-hiring-tools-discrimination-risk.json` | Incident record | EEOC guidance on AI hiring discrimination: hiring-employment sector, FM-BIAS + FM-TRANS, severity medium, confidence medium. Sources: EEOC guidance + NYC LL144. (T010) |
| `data/taxonomy/.gitkeep` | Taxonomy directory placeholder | Preserves `data/taxonomy/` directory in git. |
| `data/taxonomy/failure_modes.json` | Failure mode taxonomy | Machine-readable failure mode taxonomy with stable/draft status markers for v0.2. |
| `data/taxonomy/controls.json` | Control taxonomy | Machine-readable control taxonomy baseline for v0.2 mapping. |
| `data/taxonomy/evidence_types.json` | Evidence type taxonomy | Machine-readable evidence type registry baseline for v0.2. |
| `data/taxonomy/sectors.json` | Sector taxonomy | Machine-readable sector taxonomy with stable/draft markers. |
| `data/taxonomy/confidence_levels.json` | Confidence levels | Machine-readable confidence level reference (`low`, `medium`, `high`). |
| `data/taxonomy/severity_levels.json` | Severity levels | Machine-readable severity level reference (`low`, `medium`, `high`, `critical`). |
| `schemas/.gitkeep` | Schema directory placeholder | Preserves `schemas/` directory in git. |
| `schemas/incident.schema.json` | Incident schema | v0.2 JSON Schema with 11 required fields. `source.database` renamed to `source_type` in T008 (DEC-038). |
| `FIRST_INCIDENT_CANDIDATE_DOSSIERS.md` | Candidate dossiers | 15 candidate incident dossiers (CAND-001 through CAND-015) for Control Tower review. Candidate only — not incident records. (T006) |
| `FIRST_INCIDENT_CANDIDATE_REVIEW_TABLE.md` | Candidate review table | Summary review table: 10 Accept, 4 Postpone, 1 Reject. Control Tower review aid. (T006) |
| `FIRST_INCIDENT_SOURCE_REVIEW_NOTES.md` | Source review notes | Source type analysis, license status review, and quality assessment for T006 candidates. (T006) |
| `FIRST_INCIDENT_SELECTION_RECOMMENDATION.md` | Selection recommendation | Final selection recommendation with diversity assessment, Tier 1–3 rationale, and T007 conditions. (T006) |
| `FIRST_INCIDENT_RECORD_CREATION_PLAN.md` | Record creation plan | End-to-end plan for converting T006 candidates into incident records: order of ops, schema pre-work, field rules, ID assignment, wording conventions. (T007) |
| `FIRST_RECORD_BATCH_SOURCE_VERIFICATION_LOG.md` | Source verification log | Per-record source verification for INC-0001 through INC-0004: source type, fields supported, gaps, confidence rationale, QA. (T008) |
| `FIRST_RECORD_BATCH_QA_REPORT.md` | QA report | Full QA report for first 4 incident records across 10 dimensions. All passed. (T008) |
| `DATASET_MVP_REVIEW_REPORT.md` | Dataset MVP review | T009 full review: formal schema validation, taxonomy, source risk review, readiness assessment. |
| `FIRST_BATCH_SCHEMA_VALIDATION_REPORT.md` | Schema validation report | Formal schema validation report — jsonschema 4.23.0, Draft 2020-12. All 4 records: PASS. (T009) |
| `FIRST_BATCH_SOURCE_RISK_REVIEW.md` | Source risk review | Per-risk review of 5 T008 open source risks. 2 accepted, 2 residual, 1 unresolved. (T009) |
| `FIRST_BATCH_RECORD_FIX_LOG.md` | Record fix log | Fix log for first batch — no JSON corrections needed. One documentation fix noted. (T009) |
| `T010_SECOND_WAVE_READINESS_RECOMMENDATION.md` | T010 readiness | T010 scope options (A/B/C), pre-conditions, constraints, secondary recommendations. (T009) |
| `SECOND_WAVE_SOURCE_VERIFICATION_LOG.md` | Source verification log | Per-candidate source gate log for 6 second-wave candidates. All passed. (T010) |
| `SECOND_WAVE_QA_REPORT.md` | QA report | Full QA report for INC-0005 through INC-0010. (T010) |
| `APPROVED_CANDIDATE_SET_FOR_RECORD_CREATION.md` | Approved candidate set | Wave assignments: 4 Tier 1 (T008), 6 Tier 2/3 (T009), 4 postponed, 1 rejected. Open questions per candidate. (T007) |
| `INCIDENT_FIELD_MAPPING_DRAFTS.md` | Field mapping drafts | Draft field-level mappings for all 10 approved candidates. CAND-NNN references only. (T007) |
| `SOURCE_TO_FIELD_TRACEABILITY_MATRIX.md` | Source traceability matrix | Source-to-field traceability for Tier 1 candidates: P/S/I/U classification per field. (T007) |
| `RECORD_CREATION_QA_CHECKLIST.md` | QA checklist | 10-section, 50+ item checklist to complete before each incident record is committed. (T007) |
| `T008_FIRST_RECORD_BATCH_RECOMMENDATION.md` | T008 recommendation | Recommended T008 scope, pre-conditions, ID sequence, schema rename requirement. (T007) |
| `work-items/T017-static-publish-package-preparation/TASK.md` | T017 task | Task scope checklist. |
| `work-items/T017-static-publish-package-preparation/VALIDATION.md` | T017 validation | Validation and constraint checklist. |
| `work-items/T017-static-publish-package-preparation/IMPLEMENTATION_REPORT.md` | T017 report | Concise final report. |
| `work-items/T017-static-publish-package-preparation/DECISIONS.md` | T017 decisions | 3 decisions: index path rewrite, data copy strategy, no deploy config. |
| `PUBLIC_DEPLOYMENT_PLAN.md` | Deployment plan | URL options, publish boundary, path fix, rollback, update process, approval steps (T016). |
| `HOSTING_OPTION_MATRIX.md` | Hosting matrix | 5-option comparison: GitHub Pages, Cloudflare Pages, Netlify, VPS, Coolify (T016). |
| `PUBLICATION_RISK_GATE.md` | Risk gate | 12-criterion go/no-go table for public deployment (T016). |
| `T017_DEPLOYMENT_IMPLEMENTATION_RECOMMENDATION.md` | T017 plan | Step-by-step recommendation for T017 deployment config (T016). Superseded note added in T018A. |
| `PUBLIC_RELEASE_REVIEW_PACK.md` | Review pack | Public release gate review materials: source/license review, wording/legal-risk review, G-10 checklist, CT sign-off checklist (T018A). |
| `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md` | Gate closure report | Consolidated gate evidence: release state table, G-01/G-02 source and wording evidence assessments, G-03 hosting recommendation, G-10 static checks + manual checklist, remaining blocker table, NO-GO statement (T019). |
| `DEPLOYMENT_READINESS_CHECKLIST.md` | Deployment readiness checklist | Pre-deploy technical and governance checks, deploy options A/B/C (GitHub Pages/Cloudflare Pages/Netlify), what must not be exposed, rollback steps, exact approval phrase required (T019). |
| `work-items/T018A-public-release-gate-review-pack/TASK.md` | T018A task | Task scope checklist. |
| `work-items/T018A-public-release-gate-review-pack/VALIDATION.md` | T018A validation | Validation and constraint checklist. |
| `work-items/T018A-public-release-gate-review-pack/IMPLEMENTATION_REPORT.md` | T018A report | Concise final report. |
| `work-items/T018A-public-release-gate-review-pack/DECISIONS.md` | T018A decisions | 3 decisions: version bump deferred, review pack scope, deployment config deferred. |
| `work-items/T019-public-release-gate-readiness/TASK.md` | T019 task | Task scope checklist. |
| `work-items/T019-public-release-gate-readiness/VALIDATION.md` | T019 validation | Automated and constraint validation checklist. |
| `work-items/T019-public-release-gate-readiness/IMPLEMENTATION_REPORT.md` | T019 report | Concise final report. |
| `work-items/T019-public-release-gate-readiness/DECISIONS.md` | T019 decisions | 7 decisions (DEC-101 through DEC-107): G-01/G-02 assessment status, G-10 static-only approach, version bump, hosting recommendation, PUBLICATION_RISK_GATE NO-GO preserved, no deployment config, branch name. |
| `work-items/T016-public-deployment-plan/TASK.md` | T016 task | Task scope checklist. |
| `work-items/T016-public-deployment-plan/VALIDATION.md` | T016 validation | Validation and constraint checklist. |
| `work-items/T016-public-deployment-plan/IMPLEMENTATION_REPORT.md` | T016 report | Concise final report. |
| `work-items/T016-public-deployment-plan/DECISIONS.md` | T016 decisions | 3 decisions: publish root, recommended hosting, no config in T016. |
| `tools/validate_dataset.py` | QA script | Local dataset + site validator. Run: `python3 tools/validate_dataset.py` (T014). |
| `tools/requirements.txt` | Python deps | `jsonschema>=4.0.0` for schema validation (T015). |
| `STATIC_SITE_RC_REVIEW.md` | RC review | T015 RC review table (22 areas). Local RC verdict: PASS. |
| `work-items/T015-static-site-release-candidate-hardening/TASK.md` | T015 task | Task scope checklist. |
| `work-items/T015-static-site-release-candidate-hardening/VALIDATION.md` | T015 validation | Validation and constraint checklist. |
| `work-items/T015-static-site-release-candidate-hardening/IMPLEMENTATION_REPORT.md` | T015 report | Concise final report. |
| `work-items/T015-static-site-release-candidate-hardening/DECISIONS.md` | T015 decisions | 2 decisions: no fixes needed; requirements.txt floor version. |
| `tools/README.md` | QA docs | Usage, check list, and requirements for the validator. |
| `RELEASE_CANDIDATE_GATE.md` | RC gate | Pre-deployment checklist for CT review before any public deployment. |
| `work-items/T014-local-qa-tooling-release-candidate-gate/TASK.md` | T014 task | Task scope checklist. |
| `work-items/T014-local-qa-tooling-release-candidate-gate/VALIDATION.md` | T014 validation | Validation and constraint checklist. |
| `work-items/T014-local-qa-tooling-release-candidate-gate/IMPLEMENTATION_REPORT.md` | T014 report | Concise final report. |
| `work-items/T014-local-qa-tooling-release-candidate-gate/DECISIONS.md` | T014 decisions | 3 decisions: integer INC check, path derivation, manual-only RC gate. |
| `site/index.html` | Static functional MVP | Single-page incident atlas with search, sort, deep link (T013). |
| `site/data/incident-index.json` | Publish copy | Index with site-root-relative paths for static publishing (T017). |
| `site/data/incidents/` | Publish copy | 10 incident JSON files copied from root `data/incidents/` (T017). |
| `site/data/taxonomy/` | Publish copy | 6 taxonomy JSON files copied from root `data/taxonomy/` (T017). |
| `site/assets/styles.css` | MVP styles | Dark-mode governance dashboard styles including T013 additions. |
| `site/assets/app.js` | MVP logic | Vanilla JS: fetch, search, sort, filter, deep link, detail sections (T013). |
| `site/README.md` | Preview guide | Local preview instructions and feature summary. |
| `work-items/T013-static-site-functional-completion/TASK.md` | T013 task | Task scope checklist. |
| `work-items/T013-static-site-functional-completion/VALIDATION.md` | T013 validation | Validation and constraint checklist. |
| `work-items/T013-static-site-functional-completion/IMPLEMENTATION_REPORT.md` | T013 report | Concise final report. |
| `work-items/T013-static-site-functional-completion/DECISIONS.md` | T013 decisions | 4 decisions: search approach, date parsing, deep link, detail layout. |
| `data/incident-index.json` | Incident index | Thin index of INC-0001–INC-0010 display metadata. |
| `work-items/T012-minimal-static-site-prototype/TASK.md` | T012 task | Task scope checklist. |
| `work-items/T012-minimal-static-site-prototype/VALIDATION.md` | T012 validation | Validation and constraint checklist. |
| `work-items/T012-minimal-static-site-prototype/IMPLEMENTATION_REPORT.md` | T012 report | Concise final report. |
| `work-items/T012-minimal-static-site-prototype/DECISIONS.md` | T012 decisions | 4 decisions: vanilla JS, relative paths, thin index, no deployment. |
| `DATASET_MVP_PUBLIC_READINESS_REVIEW.md` | Readiness review | T011 verdict: ready with caveats. Record strength tiers, display requirements. |
| `DATASET_MVP_OPEN_RISKS.md` | Open risk register | 15 risks, 0 blocking public MVP. |
| `MINIMAL_STATIC_SITE_SCOPE_DRAFT.md` | Static site scope | T012 scope options A/B/C; feature inclusions/exclusions; hard constraints. |
| `work-items/T011-dataset-mvp-public-readiness-review/TASK.md` | T011 task | Task scope checklist. |
| `work-items/T011-dataset-mvp-public-readiness-review/VALIDATION.md` | T011 validation | Validation and constraint checklist. |
| `work-items/T011-dataset-mvp-public-readiness-review/IMPLEMENTATION_REPORT.md` | T011 report | Concise final report. |
| `work-items/T011-dataset-mvp-public-readiness-review/DECISIONS.md` | T011 decisions | 3 decisions: readiness verdict, draft sector labelling, T012 gate. |
| `work-items/T010-second-wave-incident-record-batch/TASK.md` | T010 task | Task scope, approved ID mapping, source gate results, validation summary. |
| `work-items/T010-second-wave-incident-record-batch/VALIDATION.md` | T010 validation | Constraint and deliverable validation checklist for T010. |
| `work-items/T010-second-wave-incident-record-batch/IMPLEMENTATION_REPORT.md` | T010 report | Implementation report with records created, source gate summary, validation results. |
| `work-items/T010-second-wave-incident-record-batch/DECISIONS.md` | T010 decisions | 10 decisions including gate outcomes, anchor choices, confidence ratings, T011 gate. |

## docs/ Directory

| File | Role | Description |
|---|---|---|
| `docs/RESEARCH_CONTEXT.md` | Domain research | Strategic domain research, product type, main users, use cases, MVP scope, and future paid use cases. |
| `docs/DECISION_LOG.md` | Decision log | Chronological record of technical, strategic, and governance decisions (DEC-001 through DEC-097). |
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
| `work-items/T008-first-tier-1-incident-record-batch/TASK.md` | T008 task | Task scope, record index, constraints, and commit message. |
| `work-items/T008-first-tier-1-incident-record-batch/VALIDATION.md` | T008 validation | Constraint and deliverable validation checklist for T008. |
| `work-items/T008-first-tier-1-incident-record-batch/IMPLEMENTATION_REPORT.md` | T008 report | Implementation report with records created, schema change, source verification summary, and final status. |
| `work-items/T008-first-tier-1-incident-record-batch/DECISIONS.md` | T008 decisions | 10 decisions including schema rename applied, date anchors, naming policy, draft sectors. |
| `work-items/T009-dataset-mvp-review-and-qa-hardening/TASK.md` | T009 task | Task scope, validation results summary, record fixes, commit message. |
| `work-items/T009-dataset-mvp-review-and-qa-hardening/VALIDATION.md` | T009 validation | Constraint and deliverable validation checklist for T009. |
| `work-items/T009-dataset-mvp-review-and-qa-hardening/IMPLEMENTATION_REPORT.md` | T009 report | Implementation report with validation results, source risk dispositions, and final status. |
| `work-items/T009-dataset-mvp-review-and-qa-hardening/DECISIONS.md` | T009 decisions | 10 decisions including validator choice, source risk dispositions, draft sector policy, T010 gate. |

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
