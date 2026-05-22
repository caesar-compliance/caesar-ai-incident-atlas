# Repository Inventory — caesar-ai-incident-atlas

**Last updated:** 22 May 2026 (T071 — Hosted Private Review-State Sync Readiness; dataset remains 13 records)

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
| `schemas/pipeline/source.schema.json` | Source Schema | JSON Schema validating source registry catalog database entries. (T043) |
| `schemas/pipeline/candidate.schema.json` | Ingestion Candidate Schema | JSON Schema validating raw discovery candidate ingestion logs. (T043) |
| `schemas/pipeline/case-draft.schema.json` | Case Draft Schema | JSON Schema validating intermediate case drafts in review state. (T043) |
| `data/source-registry/sources.yml` | Source Registry Catalog | Master catalog of monitored case authorities and endpoints. (T043) |
| `data/candidates/.gitkeep` | Directory placeholder | Preserves the `data/candidates/` directory in git. (T043) |
| `data/candidates/mock/sample-candidate-1.json` | Mock Ingestion Log | Synthetic Green Tier case candidate for testing candidate schema. (T043) |
| `data/candidates/mock/sample-candidate-2.json` | Mock Ingestion Log | Synthetic Yellow Tier case candidate for testing candidate schema. (T043) |
| `data/drafts/.gitkeep` | Directory placeholder | Preserves the `data/drafts/` directory in git. (T043) |
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
| `.github/workflows/pages.yml` | GitHub Pages workflow | T021 — deploys `site/` to GitHub Pages on push to main. |
| `site/.nojekyll` | Jekyll bypass | T021 — empty file to disable Jekyll processing. |
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
| `site/index.html` | Static functional MVP | Single-page incident atlas with search, sort, deep link (T013). OG meta, canonical, About panel, footer added (T028). |
| `site/robots.txt` | Robots directive | Conservative crawl policy: Allow /, sitemap reference. (T028) |
| `site/sitemap.xml` | Sitemap | Single-URL sitemap for `https://atlas.caesar.no/`. (T028) |
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
| `PRODUCT_PIVOT_LEGAL_GOVERNANCE_CASE_ATLAS.md` | Product Pivot | Strategic positioning of the AI Legal & Governance Case Atlas, core value chain, and transition from incident database to compliance intelligence layer. (T042) |
| `CASE_TO_CONTROL_PRODUCT_MODEL.md` | Case-to-Control Model | Specification of the 21-field case schema, control-evidence structural mapping, vendor audit questions, client checklists, and developer lessons. (T042) |
| `AUTOMATION_AND_PUBLISHING_POLICY.md` | Ingestion Policy | Definition of automated discovery rules, source-risk gating, clean-room original summarization, and human-in-the-loop validation gates. (T042) |
| `DIGEST_PRODUCT_MODEL.md` | Digest Model | Details on weekly and monthly static briefings, RSS XML feed structures, and future email syndication roadmap. (T042) |
| `SOURCE_REGISTRY_AND_WATCHER_ARCHITECTURE.md` | Watcher Architecture | Conceptual design of the 10-stage watcher, deduplication, risk gate, and ingestion transformation pipeline. (T042) |
| `REFERENCE_LAB_USAGE_NOTE.md` | Reference Lab Policy | Rules governing the separation and clean-room implementation of reference-lab learnings, safeguarding against copyleft contamination. (T042) |
| `docs/automation/SOURCE_REGISTRY_POLICY.md` | Operational Policy | Curated monitoring source standards and inactive default settings rules. (T043) |
| `docs/automation/CANDIDATE_PIPELINE_MODEL.md` | Architectural Pipeline | Deep operational stage definitions from discovery to digest push. (T043) |
| `docs/automation/SOURCE_RISK_GATE.md` | Ingestion Safety Rules | Source risk definitions and clean-room summary guardrails. (T043) |
| `docs/automation/AUTO_PUBLISH_RULES.md` | Auto-Publish Rules | Policy constraints and exclusion review triggers for automated publication. (T043) |
| `docs/automation/VALIDATOR_EXTENSION_PLAN.md` | Validator Extension | Scope specifications and plans for expanding automated checking. (T043) |
| `tools/validate_pipeline_schemas.py` | Local Pipeline Checker | Local, offline schema and policy validator for sources.yml. (T043) |
| `data/digests/weekly/weekly-2026-W21.json` | Digest Briefing | Static weekly operational briefing for week 21, 2026. (T044) |
| `data/digests/monthly/monthly-2026-05.json` | Digest Briefing | Static monthly strategic trend briefing for May 2026. (T044) |
| `site/data/digests/weekly/weekly-2026-W21.json` | Publish Copy | Duplicate copy of weekly digest W21 for static site serving. (T044) |
| `site/data/digests/monthly/monthly-2026-05.json` | Publish Copy | Duplicate copy of monthly digest May 2026 for static site serving. (T044) |
| `scripts/validate-digests.mjs` | Pipeline Utility | Standalone Node validation utility checking digest formats and rules. (T044) |
| `scripts/build-rss-feeds.mjs` | Pipeline Utility | Standalone Node compiler building three compliant RSS 2.0 XML feeds. (T044) |
| `scripts/mock-watch-sources.mjs` | Pipeline Utility | Prototype scan tool scanning and normalizing offline mock sources. (T045) |
| `scripts/mock-build-candidates.mjs` | Pipeline Utility | Ingestion prototype compiler building validated CAND-XXXX JSON records. (T045) |
| `scripts/mock-dedupe-candidates.mjs` | Pipeline Utility | Ingestion prototype deduplication reporter compiling unique cases. (T045) |
| `scripts/mock-build-case-drafts.mjs` | Pipeline Utility | Drafting prototype packaging compliant DRAFT-XXXX JSON records. (T045) |
| `scripts/mock-build-digest-preview.mjs` | Pipeline Utility | Digest prototype compiler building isolated weekly previews. (T045) |
| `scripts/validate-mock-pipeline.mjs` | Ingest Safety Checker | Programmatic sandboxing auditor verifying zero data leakage. (T045) |
| `tools/validate_mock_schemas.py` | Schema Validator | Specialized Python script checking mock files against JSON schemas. (T045) |
| `docs/automation/MOCK_PIPELINE_RUNBOOK.md` | Runbook | Operational instructions and run guide for offline prototype commands. (T045) |
| `mock-sources/official/biometric-privacy-enforcement-note.json` | Mock Source Input | Synthetic regulator enforcement warning concerning retail biometric consent. (T045) |
| `mock-sources/official/healthcare-ai-risk-notice.json` | Mock Source Input | Synthetic regulator advisory note warning on healthcare algorithm diagnostic drift. (T045) |
| `mock-sources/official/financial-services-ai-consumer-risk-note.json` | Mock Source Input | Synthetic consumer protection advisory regarding ML credit underwriting transparency. (T045) |
| `mock-sources/yellow/vendor-governance-failure-note.json` | Mock Source Input | Synthetic yellow tier third-party chatbot hallucination media report. (T045) |
| `scripts/build-review-bundle.mjs` | Review Compiler | Node script aggregating candidates, drafts, and digests into one single review bundle. (T046) |
| `scripts/validate-review-console.mjs` | Leakage Auditor | Containment auditor ensuring zero mock references or review assets leak into the public site. (T046) |
| `tools/review-console/index.html` | Review Dashboard | Local-only dark-mode dashboard for auditing case drafts and simulating promotion gates. (T046) |
| `tools/review-console/assets/review-console.js` | Review Logic | Front-end controller driving fuzzy searches and Promotion Gate interactive state. (T046) |
| `tools/review-console/assets/review-console.css` | Review Styles | Premium dark styles applying customized HSL-colors, glassmorphism, and responsive tables. (T046) |
| `tools/review-console/README.md` | Review Runbook | Quickstart instructions and run guide for locally launching the review dashboard. (T046) |
| `data/reviews/mock/mock-review-decisions.json` | Mock Decisions | Synthetic review decisions intercepting draft promotions with static gate parameters. (T046) |
| `docs/review/PROMOTION_GATE_POLICY.md` | Promotion Policy | Definitive policy specifying the 10-stage pathway, curation gates, and CT sign-off mandates. (T046) |
| `docs/review/DRAFT_REVIEW_WORKFLOW.md` | Review Workflow | Step-by-step curator instructions for vetting AI incident drafts in the console. (T046) |
| `docs/review/PUBLICATION_PROMOTION_CHECKLIST.md` | Pre-Pub Checklist | Pre-publication technical, legal, and control completeness sanity verification checklist. (T046) |
| `data/watch/config/green-source-watch-targets.json` | Watcher Config | Catalog of 7 official approved Green-tier watch target authorities. (T047) |
| `data/watch/config/target-keywords.json` | Watcher Keywords | Controlled curated keyword groups (AI, legal, commercial, exclusions). (T047) |
| `scripts/watch-green-sources.mjs` | Pipeline Watcher | Live Green-source fetches and keyword-matching index/feed engine. (T047) |
| `scripts/dedupe-real-candidates.mjs` | Pipeline Deduplicator | Local candidate duplicate evaluation and containment audit logger. (T047) |
| `scripts/build-real-review-bundle.mjs` | Review Compiler | Compiles raw discovered candidates into the local review console database. (T047) |
| `scripts/validate-real-watcher.mjs` | Ingestion Validator | Exquisite multi-vector containment and safety barrier compliance checker. (T047) |
| `docs/watch/REAL_GREEN_SOURCE_WATCHER_RUNBOOK.md` | Watcher Runbook | Manual watch pipeline commands and operator security containment runbook. (T047) |
| `tools/review-console/real-review-bundle.json` | Real Review Bundle | Local-only compiled review bundle of real discovered candidate records. (T047) |
| `scripts/build-real-case-drafts.mjs` | Draft Builder | Converts unique real candidates into DRAFT-NNNN.json files with safety flags. (T048) |
| `scripts/validate-real-drafts.mjs` | Draft Validator | Validates real drafts for required fields, safety flags, no leakage to site/. (T048) |
| `scripts/build-promotion-packets.mjs` | Packet Builder | Generates PKT-NNNN.json promotion packets with promotion_allowed: false. (T048) |
| `scripts/validate-promotion-packets.mjs` | Packet Validator | Validates safety declarations, checklist state, no incidents created. (T048) |
| `scripts/rank-promotion-candidates.mjs` | Promotion Ranker | Scores packets by safety criteria, generates ranked-candidates.json. (T049) |
| `scripts/promote-approved-case.mjs` | Promotion CLI | Dual-mode: dry-run previews OR promote single approved case. (T049) |
| `scripts/validate-promotion-dry-run.mjs` | Promotion Safety Validator | Validates no public records without approval, no site/ leakage. (T049) |
| `data/reviews/real/approved-promotions.json` | Approval Registry | Control Tower approval registry. Empty = dry-run only. (T049) |
| `data/reviews/real/approved-promotions.example.json` | Approval Example | Documented approval format with required fields and override flags. (T049) |
| `docs/review/PROMOTION_CLI_RUNBOOK.md` | Promotion Runbook | Quick reference for ranking, previewing, and promoting cases. (T049) |
| `site/rss.xml` | Consolidated Feed | Public unified RSS 2.0 XML feed for all briefings. (T044) |
| `site/digests/weekly.xml` | Weekly RSS Feed | Public RSS 2.0 XML feed for weekly operational briefs only. (T044) |
| `site/digests/monthly.xml` | Monthly RSS Feed | Public RSS 2.0 XML feed for monthly strategic trends only. (T044) |
| `site/digests/index.html` | Digests Portal | Main dashboard landing portal for browsing AI Legal Digests. (T044) |
| `site/digests/weekly/index.html` | Weekly Portal | Zero-JS rendering page displaying the weekly briefing. (T044) |
| `site/digests/monthly/index.html` | Monthly Portal | Zero-JS rendering page displaying the monthly briefing. (T044) |
| `scripts/smoke-supabase-local-migration.mjs` | Local Migration Smoke | Bounded schema validation; skips gracefully if runtime unavailable. (T059) |
| `scripts/preflight-hosted-activation.mjs` | Hosted Activation Preflight | Readiness checker (not deployer); inspects config without remote connection. (T059) |
| `scripts/print-hosted-activation-commands.mjs` | Operator Command Checklist | Deterministic 20-step checklist for human operator. (T059) |
| `data/ops/supabase/local-migration-smoke.json` | Smoke Output | Generated by smoke-supabase-local-migration.mjs. (T059) |
| `data/ops/supabase/hosted-activation-preflight.json` | Preflight Output | Generated by preflight-hosted-activation.mjs. (T059) |
| `data/ops/supabase/hosted-activation-manifest.json` | Activation Manifest | Generated by preflight-hosted-activation.mjs. (T059) |
| `work-items/T059-hosted-activation-preflight/TASK.md` | T059 task | Task scope, deliverables, and safety boundaries for T059. |
| `work-items/T059-hosted-activation-preflight/VALIDATION.md` | T059 validation | Validation checklist for T059 implementation. |
| `work-items/T059-hosted-activation-preflight/IMPLEMENTATION_REPORT.md` | T059 report | Implementation report with files created, validation results. |
| `work-items/T059-hosted-activation-preflight/DECISIONS.md` | T059 decisions | Decisions made during T059 (DEC-132 through DEC-136). |
| `schemas/pipeline/manual-watch-run.schema.json` | Run Envelope Schema | JSON Schema for manual watch-run envelope (v1). Enforces safety constraints: only green tiers, no remote write, no cron, public_publish_count max 0. (T060) |
| `scripts/build-manual-watch-run-queue.mjs` | Queue Builder | Deterministic manual run queue from green-source targets. No network fetch. (T060) |
| `scripts/build-manual-watch-run-envelope.mjs` | Envelope Builder | Private run envelope with self-validation. No network fetch. (T060) |
| `scripts/export-hosted-watch-run-payloads.mjs` | Payload Exporter | Sanitized Supabase-ready payloads (atlas_watch_runs, atlas_sources). No remote write. (T060) |
| `scripts/validate-manual-watch-run.mjs` | Run Validator | 16-check validator: schema, queue, envelope, payloads, safety flags, site isolation. (T060) |
| `data/ops/watch-runs/manual-queue-latest.json` | Queue Output | Generated by build-manual-watch-run-queue.mjs. 7 sources, 7 enabled. (T060) |
| `data/ops/watch-runs/manual-queue-manifest.json` | Queue Manifest | Safety manifest for the manual queue. (T060) |
| `data/ops/watch-runs/manual-run-latest.json` | Run Envelope Output | Generated by build-manual-watch-run-envelope.mjs. (T060) |
| `data/ops/supabase/atlas-watch-run.manual-latest.json` | Supabase Run Payload | Sanitized atlas_watch_runs payload. dry_run_export mode. (T060) |
| `data/ops/supabase/atlas-watch-run-queue.manual-latest.json` | Supabase Queue Payload | Sanitized atlas_sources queue payload. dry_run_export mode. (T060) |
| `work-items/T060-manual-watch-run-queue/TASK.md` | T060 task | Task scope and deliverables. |
| `work-items/T060-manual-watch-run-queue/DECISIONS.md` | T060 decisions | Decisions DEC-137 through DEC-142. |
| `work-items/T060-manual-watch-run-queue/VALIDATION.md` | T060 validation | Validation checklist and results. |
| `work-items/T060-manual-watch-run-queue/IMPLEMENTATION_REPORT.md` | T060 report | Implementation report with files created/modified. |
| `data/watch/config/manual-green-run-policy.json` | Safety Policy | safety policy encoding all T061 constraints: green-only, no yellow/red, no AIID/OECD/AIAAIC, bounded fetch limits, metadata-only storage. (T061) |
| `scripts/build-private-candidate-signals.mjs` | Signal Builder | metadata-only signal builder; zero signals allowed; no raw text/HTML stored; produces private candidate signal records. (T061) |
| `scripts/validate-bounded-green-source-run.mjs` | Run Validator | 25-check safety validator verifying policy compliance, timeouts, response sizes, no full HTML, and no secrets. (T061) |
| `data/ops/watch-runs/real-green-run-latest.json` | Run Output | Private run metadata output. (T061) |
| `data/ops/supabase/atlas-candidate-signals.real-green-latest.json` | Ingestion Payload | Discovered candidate signals metadata. (T061) |
| `data/ops/supabase/atlas-source-observations.real-green-latest.json` | Ingestion Payload | Discovered source observations metadata. (T061) |
| `data/ops/supabase/atlas-watch-run.real-green-latest.json` | Ingestion Payload | Discovered watch run metadata. (T061) |
| `work-items/T061-bounded-green-source-manual-run/TASK.md` | T061 task | Task checklist, scope, and status. |
| `work-items/T061-bounded-green-source-manual-run/VALIDATION.md` | T061 validation | Validation checklist and results. |
| `work-items/T061-bounded-green-source-manual-run/IMPLEMENTATION_REPORT.md` | T061 report | Implementation report of files created. |
| `work-items/T061-bounded-green-source-manual-run/DECISIONS.md` | T061 decisions | Decisions made during T061 task. |
| `schemas/pipeline/private-candidate-review-intake.schema.json` | Intake Schema | JSON Schema validating private review intake record shapes. (T062) |
| `scripts/build-private-candidate-review-intake.mjs` | Intake Builder | Node script converting T061 signals into structured private review intake records. (T062) |
| `scripts/export-review-console-private-intake.mjs` | Console Exporter | Exporter compiling console-safe metadata JSON for local review console dashboard. (T062) |
| `scripts/export-hosted-review-intake-payloads.mjs` | Payload Exporter | Exporter compiling dry-run Supabase payloads for atlas_review_intake. (T062) |
| `scripts/validate-private-candidate-review-intake.mjs` | Intake Validator | Private review intake validator verifying schema compliance and safety constants. (T062) |
| `tools/review-console/data/private-candidate-intake.json` | Console Input | Local console private candidate intake data. (T062) |
| `data/reviews/intake/private-candidate-intake-latest.json` | Intake Output | Structured latest private review intake records. (T062) |
| `data/reviews/intake/private-candidate-intake-manifest.json` | Intake Manifest | Latest review intake manifest. (T062) |
| `data/ops/supabase/atlas-review-intake.private-latest.json` | Supabase Payload | Sanitized atlas_review_intake dry-run payload. (T062) |
| `work-items/T062-private-candidate-review-intake/TASK.md` | T062 task | Task checklist, scope, and status. |
| `work-items/T062-private-candidate-review-intake/VALIDATION.md` | T062 validation | Validation checklist and results. |
| `work-items/T062-private-candidate-review-intake/IMPLEMENTATION_REPORT.md` | T062 report | Implementation report of files created. |
| `work-items/T062-private-candidate-review-intake/DECISIONS.md` | T062 decisions | Decisions made during T062 task. |
| `schemas/pipeline/private-review-decision.schema.json` | Decision Schema | JSON Schema validating private review decision record shapes. (T063) |
| `scripts/build-private-review-decisions.mjs` | Decision Builder | Node script creating deterministic review decision records from intake records. (T063) |
| `scripts/apply-private-review-decision.mjs` | Decision Patches | CLI tool to securely apply/patch a decision status for a given intake ID and generate draft-candidate ready packets. (T063) |
| `scripts/build-private-draft-candidate-packets.mjs` | Packet Builder | Node script creating local draft candidate packets for approved review decisions. (T063) |
| `scripts/export-review-console-decision-data.mjs` | Console Exporter | Exporter compiling console-safe decisions/packets metadata for local review console dashboard. (T063) |
| `scripts/export-hosted-review-decision-payloads.mjs` | Payload Exporter | Exporter compiling dry-run Supabase payloads for atlas_review_decisions and atlas_draft_candidate_packets. (T063) |
| `scripts/validate-private-review-decisions.mjs` | Decision Validator | Validator verifying schema compliance, packet alignments, and safety bounds. (T063) |
| `scripts/run-private-review-workflow.mjs` | Bounded Runner | Bounded runner script executing manual review intake stages. (T063) |
| `tools/review-console/data/private-review-decisions.json` | Console Input | Local console private review decisions data. (T063) |
| `tools/review-console/data/private-draft-candidate-packets.json` | Console Input | Local console private draft candidate packets data. (T063) |
| `data/reviews/decisions/private-review-decisions-latest.json` | Decision Output | Structured latest private review decisions. (T063) |
| `data/reviews/decisions/private-review-decisions-manifest.json` | Decision Manifest | Latest review decisions manifest. (T063) |
| `data/reviews/draft-candidate-packets/private-draft-candidate-packets-latest.json` | Packet Output | Structured latest private draft candidate packets. (T063) |
| `data/reviews/draft-candidate-packets/private-draft-candidate-packets-manifest.json` | Packet Manifest | Latest draft packets manifest. (T063) |
| `data/ops/supabase/atlas-review-decisions.private-latest.json` | Supabase Payload | Sanitized atlas_review_decisions dry-run payload. (T063) |
| `data/ops/supabase/atlas-draft-candidate-packets.private-latest.json` | Supabase Payload | Sanitized atlas_draft_candidate_packets dry-run payload. (T063) |
| `work-items/T063-private-review-console-decision-packets/TASK.md` | T063 task | Task checklist, scope, and status. |
| `work-items/T063-private-review-console-decision-packets/VALIDATION.md` | T063 validation | Validation checklist and results. |
| `work-items/T063-private-review-console-decision-packets/IMPLEMENTATION_REPORT.md` | T063 report | Implementation report of files created. |
| `work-items/T063-private-review-console-decision-packets/DECISIONS.md` | T063 decisions | Decisions made during T063 task. |
| `schemas/pipeline/private-draft-approval-marker.schema.json` | Approval Schema | JSON Schema validating private draft approval marker records. (T064) |
| `scripts/create-private-draft-approval-template.mjs` | Template Generator | Programmatic builder generating disabled templates in data/reviews/approvals/. (T064) |
| `scripts/validate-private-draft-approval-markers.mjs` | Approvals Validator | Node validator verifying templates against the approval schema. (T064) |
| `scripts/apply-explicit-private-draft-approval.mjs` | Approval Applier | CLI tool securely patching Control Tower signatures on markers. (T064) |
| `scripts/test-private-draft-approval-gate.mjs` | Gate Test Suite | Programmatic integration suite auditing the complete approval gate workflow. (T064) |
| `tools/review-console/data/private-draft-approvals.json` | Console Input | Exporter template summary JSON for local review console UI. (T064) |
| `data/reviews/approvals/private-draft-approval-template-latest.json` | Latest Template Output | Structured latest generated private draft approval templates. (T064) |
| `data/reviews/approvals/private-draft-approval-template-manifest.json` | Template Manifest | Latest generated approval templates manifest. (T064) |
| `data/ops/supabase/atlas-draft-approval-markers.private-latest.json` | Supabase Payload | Sanitized atlas_draft_approval_markers dry-run templates payload. (T064) |
| `work-items/T064-explicit-private-draft-approval-gate/TASK.md` | T064 task | Task checklist, scope, and status. |
| `work-items/T064-explicit-private-draft-approval-gate/VALIDATION.md` | T064 validation | Validation checklist and results. |
| `work-items/T064-explicit-private-draft-approval-gate/IMPLEMENTATION_REPORT.md` | T064 report | Implementation report of files created. |
| `work-items/T064-explicit-private-draft-approval-gate/DECISIONS.md` | T064 decisions | Decisions made during T064 task. |
| `scripts/create-active-private-draft-approval.mjs` | Active Approval Maker | CLI tool to generate active Control Tower approved markers. (T065) |
| `scripts/test-controlled-private-draft-approval.mjs` | T065 Gate Test | Regression test verifying single approved state, duplicate rejection, packet compiler compliance, and validator integrity. (T065) |
| `data/reviews/approvals/private-draft-selection-rationale-latest.json` | Selection Rationale | Deterministic scoring and rationale selecting the single candidate. (T065) |
| `data/reviews/approvals/private-draft-approval-active-latest.json` | Latest Active Approval | Structured wrapper representing the latest active approval marker. (T065) |
| `work-items/T065-controlled-private-intake-approval/TASK.md` | T065 task | Task checklist, scope, and status. |
| `work-items/T065-controlled-private-intake-approval/VALIDATION.md` | T065 validation | Validation checklist and results. |
| `work-items/T065-controlled-private-intake-approval/IMPLEMENTATION_REPORT.md` | T065 report | Implementation report of files created. |
| `work-items/T065-controlled-private-intake-approval/DECISIONS.md` | T065 decisions | Decisions made during T065 task. |
| `schemas/pipeline/private-draft-candidate-package.schema.json` | Package Schema | JSON Schema validating rich private draft candidate package records. (T066) |
| `scripts/build-private-draft-candidate-package.mjs` | Package Builder | CLI compiler forming structured private draft candidate packages from intake/rationales. (T066) |
| `scripts/export-hosted-private-draft-candidate-payloads.mjs` | Hosted Payload Exporter | Sanitizes and exports dry-run payload formats matching future database schema. (T066) |
| `scripts/export-review-console-private-draft-candidate-data.mjs` | Console Data Exporter | Prepares clean metadata-only summaries for local Review Console integration. (T066) |
| `scripts/validate-private-draft-candidate-package.mjs` | Package Validator | Programmatic checker enforcing package structure, hash integrity, and strict safety. (T066) |
| `scripts/run-private-draft-candidate-workflow.mjs` | Shaping Workflow Runner | Bounded local runner orchestration script managing packet promotion workflow steps. (T066) |
| `tools/review-console/data/private-draft-candidate-package.json` | Console Package Data | Exported summary JSON utilized by local Review Console interface. (T066) |
| `data/reviews/private-draft-candidates/private-draft-candidate-package-latest.json` | Latest Package Output | Structured latest generated private draft candidate package. (T066) |
| `data/reviews/private-draft-candidates/private-draft-candidate-package-manifest.json` | Package Manifest | Latest generated package manifest with details and counts. (T066) |
| `data/ops/supabase/atlas-private-draft-candidate-package.private-latest.json` | Hosted Dry-Run Payload | Dry-run atlas_private_draft_candidates payload sanitized of secrets and long text. (T066) |
| `work-items/T066-private-draft-candidate-shaping/TASK.md` | T066 task | Task checklist, scope, and status. |
| `work-items/T066-private-draft-candidate-shaping/VALIDATION.md` | T066 validation | Validation checklist and results. |
| `work-items/T066-private-draft-candidate-shaping/IMPLEMENTATION_REPORT.md` | T066 report | Implementation report of files created. |
| `work-items/T066-private-draft-candidate-shaping/DECISIONS.md` | T066 decisions | Decisions made during T066 task. |
| `schemas/pipeline/private-promotion-dry-run.schema.json` | Dry-Run Schema | JSON Schema enforcing strict constraints on private promotion dry-run bundles. (T067) |
| `scripts/build-private-promotion-dry-run.mjs` | Dry-Run Builder | Compiles Caesar-native private promotion dry-run bundle from T066 package. (T067) |
| `scripts/export-hosted-private-promotion-dry-run-payloads.mjs` | Dry-Run Hosted Exporter | Exports sanitized Supabase dry-run payload for atlas_private_promotion_dry_runs. (T067) |
| `scripts/export-review-console-private-promotion-dry-run-data.mjs` | Dry-Run Console Exporter | Exports metadata-only console summary to tools/review-console/data/. (T067) |
| `scripts/validate-private-promotion-dry-run.mjs` | Dry-Run Validator | 24-check validator covering schema, safety, INC-0014 absence, and site isolation. (T067) |
| `scripts/run-private-promotion-dry-run-workflow.mjs` | Dry-Run Workflow Runner | Bounded local runner orchestrating all T067 workflow steps. (T067) |
| `tools/review-console/data/private-promotion-dry-run.json` | Dry-Run Console Data | Metadata-only console summary for Review Console UI. (T067) |
| `data/reviews/private-promotion-dry-runs/private-promotion-dry-run-latest.json` | Latest Dry-Run Output | Structured latest private promotion dry-run bundle. (T067) |
| `data/reviews/private-promotion-dry-runs/private-promotion-dry-run-manifest.json` | Dry-Run Manifest | Latest dry-run manifest with counts and safety status. (T067) |
| `data/ops/supabase/atlas-private-promotion-dry-run.private-latest.json` | Hosted Dry-Run Payload | Sanitized atlas_private_promotion_dry_runs Supabase payload. (T067) |
| `schemas/pipeline/private-promotion-signoff.schema.json` | Signoff Schema | JSON Schema for private promotion review/signoff with hard publication blocks. (T068) |
| `scripts/build-private-promotion-signoff.mjs` | Signoff Builder | Creates signoff record from T067 dry-run. (T068) |
| `scripts/apply-private-promotion-signoff-decision.mjs` | Signoff Apply | Bounded local patch for review dimension statuses. (T068) |
| `scripts/export-hosted-private-promotion-signoff-payloads.mjs` | Signoff Hosted Exporter | Sanitized atlas_private_promotion_signoffs payload. (T068) |
| `scripts/export-review-console-private-promotion-signoff-data.mjs` | Signoff Console Exporter | Console metadata export. (T068) |
| `scripts/validate-private-promotion-signoff.mjs` | Signoff Validator | Signoff safety and referential validator. (T068) |
| `scripts/run-private-promotion-signoff-workflow.mjs` | Signoff Workflow | Bounded T068 workflow runner. (T068) |
| `tools/review-console/data/private-promotion-signoff.json` | Signoff Console Data | Review Console signoff summary. (T068) |
| `data/reviews/private-promotion-signoffs/private-promotion-signoff-latest.json` | Latest Signoff | Private promotion signoff record. (T068) |
| `schemas/pipeline/private-promotion-packet-candidate.schema.json` | Candidate Packet Schema | JSON Schema enforcing deterministic private promotion-packet candidate fields. (T069) |
| `scripts/build-private-promotion-packet-candidate.mjs` | Candidate Packet Builder | Compiles T068 signoff, T067 dry-run, and T066 package into deterministic candidate packages. (T069) |
| `scripts/export-hosted-private-promotion-packet-candidate-payloads.mjs` | Candidate Hosted Exporter | Sanitizes and formats dry-run payloads for atlas_private_promotion_packet_candidates. (T069) |
| `scripts/export-review-console-private-promotion-packet-candidate-data.mjs` | Candidate Console Exporter | Compiles metadata console summaries for human-in-the-loop dashboard. (T069) |
| `scripts/validate-private-promotion-packet-candidate.mjs` | Candidate Packet Validator | Bounded validator checking schemas, parent markers, safety constants, and dataset size. (T069) |
| `scripts/run-private-promotion-packet-candidate-workflow.mjs` | Candidate Workflow Runner | Programmatic local runner orchestrating T069 workflow. (T069) |
| `tools/review-console/data/private-promotion-packet-candidate.json` | Candidate Console Data | Exported metadata utilized by local Review Console interface. (T069) |
| `data/reviews/private-promotion-packet-candidates/private-promotion-packet-candidate-latest.json` | Latest Candidate Packet | Structured latest private promotion-packet candidate package. (T069) |
| `data/reviews/private-promotion-packet-candidates/private-promotion-packet-candidate-manifest.json` | Candidate Manifest | Manifest detailing package count and checklist evaluation. (T069) |
| `data/ops/supabase/atlas-private-promotion-packet-candidate.private-latest.json` | Sanitized Hosted Payload | Sanitized dry-run candidate payload without secrets or HTML. (T069) |
| `schemas/pipeline/private-publication-blocker-resolution.schema.json` | Blocker Resolution Schema | JSON Schema validating private publication blocker resolution dossiers. (T070) |
| `scripts/build-private-publication-blocker-resolution.mjs` | Blocker Resolution Builder | Evaluates blockers and compiles blocker resolution dossier. (T070) |
| `scripts/export-hosted-private-publication-blocker-resolution-payloads.mjs` | Blocker Resolution Hosted Exporter | Sanitizes and exports dry-run payloads for Supabase. (T070) |
| `scripts/export-review-console-private-publication-blocker-resolution-data.mjs` | Blocker Resolution Console Exporter | Compiles metadata console summaries for human-in-the-loop dashboard. (T070) |
| `scripts/validate-private-publication-blocker-resolution.mjs` | Blocker Resolution Validator | Programmatic validator checking blocker resolution dossier safety and count. (T070) |
| `scripts/run-private-publication-blocker-resolution-workflow.mjs` | Blocker Resolution Workflow | Programmatic local runner orchestrating T070 workflow. (T070) |
| `tools/review-console/data/private-publication-blocker-resolution.json` | Blocker Resolution Console Data | Exported metadata utilized by local Review Console interface. (T070) |
| `data/reviews/private-publication-blocker-resolutions/private-publication-blocker-resolution-latest.json` | Latest Blocker Resolution Dossier | Structured latest publication blocker resolution dossier. (T070) |
| `data/reviews/private-publication-blocker-resolutions/private-publication-blocker-resolution-manifest.json` | Blocker Resolution Manifest | Manifest detailing dossier count and resolution checklist. (T070) |
| `data/ops/supabase/atlas-private-publication-blocker-resolution.private-latest.json` | Sanitized Hosted Payload | Sanitized dry-run blocker resolution payload. (T070) |
| `schemas/pipeline/hosted-private-review-state-sync.schema.json` | Sync Schema | JSON Schema validating hosted private review-state sync envelopes. (T071) |
| `infra/supabase/migrations/002_private_review_state_sync.sql` | Migration Draft | Additive, non-destructive migration DDL for private review-state snapshots. (T071) |
| `infra/cloudflare-worker/private-review-state-routes.contract.md` | Route Contract | API contract documenting Worker endpoints for review state sync. (T071) |
| `scripts/build-hosted-private-review-state-sync.mjs` | Sync Builder | Compiles sanitized metadata-only review-state sync dossier. (T071) |
| `scripts/export-hosted-private-review-state-sync-payloads.mjs` | Sync Exporter | Formats and exports sanitized dry-run Supabase and console payloads. (T071) |
| `scripts/validate-hosted-private-review-state-sync.mjs` | Sync Validator | Check schemas, parent markers, sanitization, and safety constraints. (T071) |
| `scripts/run-hosted-private-review-state-sync-workflow.mjs` | Sync Workflow Runner | Bounded runner executing build, export, and safety validation stages. (T071) |
| `scripts/test-private-review-state-route-contract.mjs` | Worker Mock Route Test | Mock integration test verifying Worker endpoints against the route contract. (T071) |
| `tools/review-console/data/private-review-state-sync.json` | Sync Console Data | Exported sync metadata for local Review Console UI panel. (T071) |
| `data/runtime/private-review-state-sync/hosted-private-review-state-sync-latest.json` | Latest Sync Dossier | Structured latest private review-state sync envelope. (T071) |
| `data/runtime/private-review-state-sync/hosted-private-review-state-sync-manifest.json` | Sync Manifest | Manifest detailing sync status, dry-run mode, and safety confirmations. (T071) |
| `data/runtime/private-review-state-sync/hosted-private-review-state-sync-workflow-latest.json` | Workflow Log | Execution log from the run-hosted-private-review-state-sync-workflow execution. (T071) |
| `data/ops/supabase/atlas-private-review-state-sync.private-latest.json` | Sanitized Hosted Payload | Sanitized dry-run sync payload for Supabase database. (T071) |
| `work-items/T067-private-promotion-packet-dry-run/TASK.md` | T067 task | Task checklist, scope, and status. |
| `work-items/T067-private-promotion-packet-dry-run/VALIDATION.md` | T067 validation | Validation checklist and results. |
| `work-items/T067-private-promotion-packet-dry-run/IMPLEMENTATION_REPORT.md` | T067 report | Implementation report of files created. |
| `work-items/T067-private-promotion-packet-dry-run/DECISIONS.md` | T067 decisions | Decisions made during T067 task. |
| `work-items/T068-private-promotion-review-signoff/TASK.md` | T068 task | Task checklist for T068 private signoffs. |
| `work-items/T068-private-promotion-review-signoff/VALIDATION.md` | T068 validation | Validation checklist for T068 private signoffs. |
| `work-items/T068-private-promotion-review-signoff/IMPLEMENTATION_REPORT.md` | T068 report | Closeout report for T068. |
| `work-items/T068-private-promotion-review-signoff/DECISIONS.md` | T068 decisions | Key decisions log for T068 signoff. |
| `work-items/T069-private-promotion-packet-candidate-package/TASK.md` | T069 task | Task scope checklist for T069 candidate package. |
| `work-items/T069-private-promotion-packet-candidate-package/VALIDATION.md` | T069 validation | Validation checklist for T069 candidate package. |
| `work-items/T069-private-promotion-packet-candidate-package/IMPLEMENTATION_REPORT.md` | T069 report | Concise closeout report for T069. |
| `work-items/T069-private-promotion-packet-candidate-package/DECISIONS.md` | T069 decisions | Key decisions log for T069 candidate package. |
| `work-items/T070-private-publication-blocker-resolution/TASK.md` | T070 task | Task checklist, scope, and status. |
| `work-items/T070-private-publication-blocker-resolution/VALIDATION.md` | T070 validation | Validation checklist and results. |
| `work-items/T070-private-publication-blocker-resolution/IMPLEMENTATION_REPORT.md` | T070 report | Closeout report for T070. |
| `work-items/T070-private-publication-blocker-resolution/DECISIONS.md` | T070 decisions | Key decisions log for T070 blocker resolution. |
| `work-items/T071-hosted-private-review-state-sync/TASK.md` | T071 task | Task scope checklist for T071. |
| `work-items/T071-hosted-private-review-state-sync/VALIDATION.md` | T071 validation | Validation checklist for T071. |
| `work-items/T071-hosted-private-review-state-sync/IMPLEMENTATION_REPORT.md` | T071 report | Closeout report for T071. |
| `work-items/T071-hosted-private-review-state-sync/DECISIONS.md` | T071 decisions | Key decisions log for T071. |

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
| `work-items/T021-github-pages-default-url/TASK.md` | T021 task | Task scope checklist for GitHub Pages deployment. |
| `work-items/T021-github-pages-default-url/VALIDATION.md` | T021 validation | Validation checklist for deployment. |
| `work-items/T021-github-pages-default-url/IMPLEMENTATION_REPORT.md` | T021 report | Implementation report with deployment status. |
| `work-items/T021-github-pages-default-url/DECISIONS.md` | T021 decisions | Decisions made during T021 (max 10). |
| `work-items/T022-post-deploy-closeout/TASK.md` | T022 task | Task scope checklist for post-deploy verification and custom domain closeout. |
| `work-items/T022-post-deploy-closeout/VALIDATION.md` | T022 validation | Validation checklist: live URL checks, HTTPS, validator, smoke test status. |
| `work-items/T022-post-deploy-closeout/IMPLEMENTATION_REPORT.md` | T022 report | Final closeout report with deployment facts, HTTPS status, safety confirmations. |
| `work-items/T022-post-deploy-closeout/DECISIONS.md` | T022 decisions | Decisions made during T022 (DEC-T022-001 through DEC-T022-006). |
| `work-items/T023-browser-smoke-redirect/TASK.md` | T023 task | Task scope checklist for browser smoke test and HTTP→HTTPS redirect verification. |
| `work-items/T023-browser-smoke-redirect/VALIDATION.md` | T023 validation | Validation checklist: redirect check, live URL, JSON endpoint, local validator, file safety. |
| `work-items/T023-browser-smoke-redirect/IMPLEMENTATION_REPORT.md` | T023 report | Final report with URL check results, G-10 status, safety confirmations, remaining risks. |
| `work-items/T023-browser-smoke-redirect/DECISIONS.md` | T023 decisions | Decisions made during T023. |
| `PRODUCT_POLISH_BACKLOG.md` | Product backlog | Compact backlog for future work: MVP polish, dataset expansion themes, Governance OS integration, technical backlog, hard gates. (T024) |
| `GOVERNANCE_SIGNOFF_PACK.md` | Governance sign-off pack | G-01 source/license and G-02 wording/legal-risk review tables for CT/counsel sign-off. Updated T026 and T027. (T025, T026, T027) |
| `SOURCE_RISK_HARDENING_REPORT.md` | Source risk hardening report | T026 hardening detail plus T027 addendum: INC-0006 targeted source search result and risk assessment. (T026, T027) |
| `INC0006_SOURCE_RISK_DECISION_PACKET.md` | INC-0006 source risk decision packet | T027: problem statement, targeted source search result table, Options A/B/C assessment, wording risk, recommended CT decision, proposed sign-off language, disclaimer. (T027) |
| `GOVERNANCE_GATE_DECISION_RECORD.md` | Governance gate decision record | T029: Final governance gate decision package for G-01/G-02. Current MVP status, source/license table, wording/legal-risk table, INC-0006 decision section, final decision placeholders. No explicit CT approval received. (T029) |
| `COUNSEL_REVIEW_PACKET_INC0006.md` | INC-0006 counsel follow-up packet | T030: Narrow counsel/CT review packet for INC-0006 Reuters citation. Review question, current record status, four decision options (A–D), optional CT sign-off language, scope boundary. No data changes. Not legal advice. (T030) |
| `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md` | Governance gate closeout | T031: Final gate closeout record. 12-gate status table (all closed), exact CT approval language, G-01/G-02 final status, INC-0006 caution note, scope, exclusions, next review triggers. (T031) |
| `PUBLIC_MVP_BASELINE_FREEZE.md` | Baseline freeze record | T032: Public MVP baseline freeze. Baseline status table, frozen rules, INC-0006 caution, next review triggers. Approval scope: current 10-record MVP only. Not legal advice. (T032) |
| `ROADMAP_NEXT_PHASES.md` | Next phases roadmap | T032: Compact v0.7–v1.0 roadmap split. v0.7 Dataset Expansion Planning, v0.8 Governance OS Integration Planning, v0.9 Public Quality Polish, v1.0 Expanded Public Release Criteria. Updated T033. (T032, T033) |
| `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` | Candidate selection criteria | T033: Defines candidate selection criteria for INC-0011+ records. Covers AI relevance, public interest, source availability, source quality preference order, wording requirements, privacy/reputational screen, jurisdiction diversity, category diversity, exclusion rules. Planning only. Not legal advice. (T033) |
| `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` | Source quality gates | T033: Defines minimum source requirements for new records. Preferred source categories (Tier 1–3), minimum source count guidance, counsel review triggers, caution wording requirements, source/license notes, prohibited practices. Planning only. Not legal advice. (T033) |
| `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md` | Candidate review workflow | T033: Describes 9-stage future candidate review workflow: candidate idea → source collection → source risk review → wording/legal risk review → draft record → validation → CT gate → counsel gate → public release batch. Planning only. Not legal advice. (T033) |
| `INCIDENT_CANDIDATE_SHORTLIST_TEMPLATE.md` | Candidate shortlist template | T033: Reusable template for future INC-0011+ candidate shortlists. All fields defined. Placeholder/illustrative example only — no real candidates. Planning only. Not legal advice. (T033) |
| `INCIDENT_CANDIDATE_SHORTLIST_DRAFT.md` | Candidate shortlist draft | T034: 15 planning-only candidates (CAND-001–CAND-015). All status `not_approved_candidate`. No candidates approved. Covers 10 sectors, multiple jurisdictions. Planning only. Not legal advice. (T034) |
| `INCIDENT_CANDIDATE_TRIAGE_MATRIX.md` | Candidate triage matrix | T034: Three matrices — priority (P1/P2/P3), source readiness, governance value (incident→failure mode→controls→evidence→lesson). Planning only. Not legal advice. (T034) |
| `INCIDENT_RECORD_CREATION_GATE_CHECKLIST.md` | Record creation gate checklist | T034: 12-gate checklist required before any candidate becomes a real record. Supplements 9-stage workflow from T033. Planning only. Not legal advice. (T034) |
| `P1_CANDIDATE_SOURCE_PACKS.md` | P1 source packs | T035: Source packs for all 8 P1 candidates. Source URLs, tiers, risk assessments, wording-risk notes, drafting readiness per candidate. Planning only. Not legal advice. (T035) |
| `P1_CANDIDATE_SOURCE_RISK_MATRIX.md` | P1 source risk matrix | T035: Overview table (8 candidates), readiness ranking (safest to riskiest), exclusion/defer list, source tier summary. Planning only. Not legal advice. (T035) |
| `P1_CANDIDATE_PRIORITIZATION_RECOMMENDATION.md` | First batch recommendation | T035: Recommends 4-candidate first drafting batch (CAND-013, CAND-008, CAND-011, CAND-010). Lists deferred candidates, counsel-gate candidates, and source-gap candidates. Planning only. Not legal advice. (T035) |
| `FIRST_DRAFTING_BATCH_SELECTION.md` | Batch selection record | T036: CT first drafting batch selection decision record. Selected candidates: CAND-013, CAND-008, CAND-011, CAND-010. All remain `not_approved_candidate`. Planning only. Not legal advice. (T036) |
| `FIRST_DRAFTING_BATCH_GATE_MATRIX.md` | Batch gate matrix | T036: Compact tables for selected and deferred candidates. Source-readiness, risk levels, counsel needs, future suitability. Planning only. Not legal advice. (T036) |
| `FUTURE_RECORD_DRAFTING_TASK_OUTLINE.md` | Drafting task template | T036: Template/outline for future T037+ record drafting tasks. Preconditions, workflow, validation commands, approval rules. Not for execution until CT approves. (T036) |
| `work-items/T024-public-mvp-lock/TASK.md` | T024 task | Task scope checklist. |
| `work-items/T024-public-mvp-lock/VALIDATION.md` | T024 validation | Validation checklist. |
| `work-items/T024-public-mvp-lock/IMPLEMENTATION_REPORT.md` | T024 report | Concise final report. |
| `work-items/T024-public-mvp-lock/DECISIONS.md` | T024 decisions | Decisions made during T024. |
| `work-items/T025-source-wording-signoff-pack/TASK.md` | T025 task | Task scope checklist. |
| `work-items/T025-source-wording-signoff-pack/VALIDATION.md` | T025 validation | Validation checklist. |
| `work-items/T025-source-wording-signoff-pack/IMPLEMENTATION_REPORT.md` | T025 report | Concise final report. |
| `work-items/T025-source-wording-signoff-pack/DECISIONS.md` | T025 decisions | Decisions made during T025. |
| `work-items/T026-source-risk-hardening/TASK.md` | T026 task | Task scope checklist. |
| `work-items/T026-source-risk-hardening/VALIDATION.md` | T026 validation | Validation checklist. |
| `work-items/T026-source-risk-hardening/IMPLEMENTATION_REPORT.md` | T026 report | Concise final report. |
| `work-items/T026-source-risk-hardening/DECISIONS.md` | T026 decisions | Decisions made during T026. |
| `work-items/T027-inc0006-source-resolution/TASK.md` | T027 task | Task scope checklist for INC-0006 source risk resolution. |
| `work-items/T027-inc0006-source-resolution/VALIDATION.md` | T027 validation | Validation checklist for T027. |
| `work-items/T027-inc0006-source-resolution/IMPLEMENTATION_REPORT.md` | T027 report | Concise final report for T027. |
| `work-items/T027-inc0006-source-resolution/DECISIONS.md` | T027 decisions | 10 decisions including source search outcome, option selection, version bump, counsel confirmation path. |
| `work-items/T028-public-mvp-polish/TASK.md` | T028 task | Task scope checklist for public MVP polish pass. |
| `work-items/T028-public-mvp-polish/VALIDATION.md` | T028 validation | Validation checklist for T028. |
| `work-items/T028-public-mvp-polish/IMPLEMENTATION_REPORT.md` | T028 report | Concise final report for T028. |
| `work-items/T028-public-mvp-polish/DECISIONS.md` | T028 decisions | Decisions made during T028 public MVP polish pass. |
| `work-items/T029-governance-gate-decision-pack/FINAL_REPORT.md` | T029 final report | Final report for T029 (pre-existing untracked file). |
| `work-items/T030-inc0006-counsel-followup/TASK.md` | T030 task | Task scope checklist for INC-0006 counsel follow-up packet. |
| `work-items/T030-inc0006-counsel-followup/VALIDATION.md` | T030 validation | Validation checklist for T030. |
| `work-items/T030-inc0006-counsel-followup/IMPLEMENTATION_REPORT.md` | T030 report | Concise final report for T030. |
| `work-items/T030-inc0006-counsel-followup/DECISIONS.md` | T030 decisions | 8 decisions including packet structure, no-data-change policy, version bump, next-step paths. |
| `work-items/T031-record-gates-signoff/TASK.md` | T031 task | Task scope checklist for G-01/G-02 sign-off recording. |
| `work-items/T031-record-gates-signoff/VALIDATION.md` | T031 validation | Validation checklist for T031. |
| `work-items/T031-record-gates-signoff/IMPLEMENTATION_REPORT.md` | T031 report | Concise final report for T031. |
| `work-items/T031-record-gates-signoff/DECISIONS.md` | T031 decisions | Decisions made during T031 (max 10). |
| `work-items/T032-public-mvp-freeze-roadmap/TASK.md` | T032 task | Task scope checklist for public MVP baseline freeze and roadmap split. |
| `work-items/T032-public-mvp-freeze-roadmap/VALIDATION.md` | T032 validation | Validation checklist for T032. |
| `work-items/T032-public-mvp-freeze-roadmap/IMPLEMENTATION_REPORT.md` | T032 report | Concise final report for T032. |
| `work-items/T032-public-mvp-freeze-roadmap/DECISIONS.md` | T032 decisions | Decisions made during T032 (max 10). |
| `work-items/T033-dataset-expansion-planning/TASK.md` | T033 task | Task scope, constraints, deliverables, and baseline confirmation for T033 dataset expansion planning. |
| `work-items/T033-dataset-expansion-planning/VALIDATION.md` | T033 validation | Validation checklist for T033 — constraint, deliverable, and dataset checks. |
| `work-items/T033-dataset-expansion-planning/IMPLEMENTATION_REPORT.md` | T033 report | Final implementation report for T033 — files created, files updated, validation results, confirmation statements. |
| `work-items/T033-dataset-expansion-planning/DECISIONS.md` | T033 decisions | 10 decisions (DEC-T033-001 through DEC-T033-010) including scope, deliverables, no-approval policy, version bump, T034 next step. |
| `work-items/T034-candidate-shortlist-draft/TASK.md` | T034 task | Task scope checklist for candidate shortlist draft. |
| `work-items/T034-candidate-shortlist-draft/VALIDATION.md` | T034 validation | Validation checklist for T034. |
| `work-items/T034-candidate-shortlist-draft/IMPLEMENTATION_REPORT.md` | T034 report | Final implementation report for T034 — candidate summary, files created, validation results, confirmation statements. |
| `work-items/T034-candidate-shortlist-draft/DECISIONS.md` | T034 decisions | 10 decisions (DEC-T034-001–010) including candidate count, sector diversity, priority assignments, counsel-required candidates, T035 next step. |
| `work-items/T035-p1-candidate-source-packs/TASK.md` | T035 task | Task scope checklist for P1 candidate source pack planning. |
| `work-items/T035-p1-candidate-source-packs/VALIDATION.md` | T035 validation | Validation checklist for T035. |
| `work-items/T035-p1-candidate-source-packs/IMPLEMENTATION_REPORT.md` | T035 report | Final implementation report for T035 — source pack summary, files created, validation results, confirmation statements. |
| `work-items/T035-p1-candidate-source-packs/DECISIONS.md` | T035 decisions | 10 decisions (DEC-T035-001–010) including readiness ranking, CAND-002 demotion, CAND-004 counsel gate, first batch selection, T036 next step. |
| `data/incidents/INC-0012-ai-hiring-disability-bias-eeoc-doj-guidance.json` | Incident record | INC-0012: EEOC + DOJ joint guidance on AI hiring disability discrimination. (T040) |
| `INC0012_GOVERNANCE_REVIEW_NOTE.md` | INC-0012 governance review | T040: Source/license and wording/legal-risk review for INC-0012. Status: `prepared_for_CT_review`. Not legal advice. (T040) |
| `work-items/T040-create-inc0012-cand008/TASK.md` | T040 task | Task scope checklist for INC-0012 drafting. |
| `work-items/T040-create-inc0012-cand008/VALIDATION.md` | T040 validation | Validation checklist for T040. |
| `work-items/T040-create-inc0012-cand008/IMPLEMENTATION_REPORT.md` | T040 report | Concise final report for T040. |
| `work-items/T040-create-inc0012-cand008/DECISIONS.md` | T040 decisions | Decisions made during T040 (max 10). |
| `work-items/T042-product-pivot-legal-governance-case-atlas/TASK.md` | T042 task | Task scope checklist for T042 strategic product pivot. |
| `work-items/T042-product-pivot-legal-governance-case-atlas/VALIDATION.md` | T042 validation | Validation checklist for T042. |
| `work-items/T042-product-pivot-legal-governance-case-atlas/IMPLEMENTATION_REPORT.md` | T042 report | Comprehensive final report for T042. |
| `work-items/T042-product-pivot-legal-governance-case-atlas/DECISIONS.md` | T042 decisions | Strategic product pivot decisions (DEC-108 documenting D1 through D10). |
| `work-items/T043-source-registry-case-pipeline-schema/TASK.md` | T043 task | Task scope checklist for T043 source registry and pipeline schemas. (T043) |
| `work-items/T043-source-registry-case-pipeline-schema/VALIDATION.md` | T043 validation | Validation and invariant checklist for T043. (T043) |
| `work-items/T043-source-registry-case-pipeline-schema/IMPLEMENTATION_REPORT.md` | T043 report | Final report and commit summary for T043. (T043) |
| `work-items/T043-source-registry-case-pipeline-schema/DECISIONS.md` | T043 decisions | New pipeline architecture decisions log. (T043) |
| `work-items/T044-static-weekly-monthly-digest-mvp/TASK.md` | T044 task | Task scope checklist for T044 static digests MVP. (T044) |
| `work-items/T044-static-weekly-monthly-digest-mvp/VALIDATION.md` | T044 validation | Automated and policy validation checklist for T044. (T044) |
| `work-items/T044-static-weekly-monthly-digest-mvp/IMPLEMENTATION_REPORT.md` | T044 report | Concise final closeout report for T044. (T044) |
| `work-items/T044-static-weekly-monthly-digest-mvp/DECISIONS.md` | T044 decisions | New static digests and RSS architecture decisions log. (T044) |
| `work-items/T045-offline-mock-auto-discovery-prototype/TASK.md` | T045 task | Task scope checklist for T045 mock pipeline prototype. (T045) |
| `work-items/T045-offline-mock-auto-discovery-prototype/VALIDATION.md` | T045 validation | Automated and containment safety validation checklist for T045. (T045) |
| `work-items/T045-offline-mock-auto-discovery-prototype/IMPLEMENTATION_REPORT.md` | T045 report | Concise final closeout report for T045. (T045) |
| `work-items/T045-offline-mock-auto-discovery-prototype/DECISIONS.md` | T045 decisions | Sandboxed mock pipeline auto-discovery decisions log. (T045) |
| `work-items/T046-local-draft-review-console/TASK.md` | T046 task | Task scope checklist for T046 local review console. (T046) |
| `work-items/T046-local-draft-review-console/VALIDATION.md` | T046 validation | Automated, safety, and containment validation checklist for T046. (T046) |
| `work-items/T046-local-draft-review-console/IMPLEMENTATION_REPORT.md` | T046 report | Concise final closeout report for T046. (T046) |
| `work-items/T046-local-draft-review-console/DECISIONS.md` | T046 decisions | Local review console and promotion gate decisions log. (T046) |
| `work-items/T047-real-green-source-watcher-mvp/TASK.md` | T047 task | Task scope checklist for T047 real Green-source watcher MVP. (T047) |
| `work-items/T047-real-green-source-watcher-mvp/VALIDATION.md` | T047 validation | Automated, safety, and containment validation checklist for T047. (T047) |
| `work-items/T047-real-green-source-watcher-mvp/IMPLEMENTATION_REPORT.md` | T047 report | Concise final closeout report for T047. (T047) |
| `work-items/T047-real-green-source-watcher-mvp/DECISIONS.md` | T047 decisions | Real watcher MVP and local review integration decisions log. (T047) |
| `work-items/T048-real-candidate-draft-pipeline/TASK.md` | T048 task | Task scope checklist for T048 real candidate-to-draft pipeline. (T048) |
| `work-items/T048-real-candidate-draft-pipeline/VALIDATION.md` | T048 validation | Validation checklist for real drafts and promotion packets. (T048) |
| `work-items/T048-real-candidate-draft-pipeline/IMPLEMENTATION_REPORT.md` | T048 report | Final report for T048 candidate-to-draft pipeline. (T048) |
| `work-items/T048-real-candidate-draft-pipeline/DECISIONS.md` | T048 decisions | Real candidate pipeline decisions log. (T048) |
| `work-items/T049-promotion-cli-public-case-dry-run/TASK.md` | T049 task | Task scope checklist for T049 promotion CLI and dry-run. (T049) |
| `work-items/T049-promotion-cli-public-case-dry-run/VALIDATION.md` | T049 validation | Validation checklist for promotion safety. (T049) |
| `work-items/T049-promotion-cli-public-case-dry-run/IMPLEMENTATION_REPORT.md` | T049 report | Final report for T049 promotion machinery. (T049) |
| `work-items/T049-promotion-cli-public-case-dry-run/DECISIONS.md` | T049 decisions | Promotion CLI and approval system decisions log. (T049) |

| `work-items/T056-real-automated-monitoring-architecture/TASK.md` | T056 task | Task scope and deliverables for T056 automation architecture. (T056) |
| `work-items/T056-real-automated-monitoring-architecture/VALIDATION.md` | T056 validation | Validation checklist for automation architecture. (T056) |
| `work-items/T056-real-automated-monitoring-architecture/IMPLEMENTATION_REPORT.md` | T056 report | Final report for T056 automation-ready architecture layer. (T056) |
| `work-items/T056-real-automated-monitoring-architecture/DECISIONS.md` | T056 decisions | Architecture, infra, and ops export decisions (D-01–D-05). (T056) |
| `docs/automation/REAL_AUTOMATED_MONITORING_ARCHITECTURE.md` | Architecture Decision | Locked architecture: static site + Supabase (future) + Cloudflare Worker (future). (T056) |
| `infra/supabase/schema.sql` | DB Schema | 7-table Postgres schema for operational pipeline data. Not applied. (T056) |
| `infra/supabase/README.md` | Infra Doc | Supabase integration instructions and gate conditions. (T056) |
| `infra/cloudflare-worker/src/index.js` | Worker Skeleton | Cloudflare Worker route handlers (health/status/records/run). (T056) |
| `infra/cloudflare-worker/wrangler.example.toml` | Config Template | Wrangler deployment template — no credentials. (T056) |
| `infra/cloudflare-worker/README.md` | Infra Doc | Worker deployment guide and safety notes. (T056) |
| `scripts/export-ops-status.mjs` | Ops Exporter | Reads index + watch runs; writes sanitised ops status to data/ops/ and site/data/ops/. (T056) |
| `scripts/validate-ops-status.mjs` | Ops Validator | Validates ops JSON: count=13, INC-0013, no secrets/leaks, mode not live_scheduled_enabled. (T056) |
| `scripts/run-local-automation-cycle.mjs` | Cycle Runner | One-command local automation: pipeline → export → validate → build → rss → validate-site. (T056) |
| `data/ops/latest-status.json` | Ops Status | Internal sanitised pipeline ops status snapshot. (T056) |
| `data/ops/latest-watch-run-public.json` | Run Summary | Internal sanitised latest watch run summary. (T056) |
| `site/data/ops/latest-status.json` | Public Ops Status | Public ops status JSON served by GitHub Pages. (T056) |
| `site/data/ops/latest-watch-run-public.json` | Public Run Summary | Public sanitised watch run summary served by GitHub Pages. (T056) |
| `.env.example` | Env Reference | Env var placeholder reference — no secrets. Tracked. (T057) |
| `scripts/validate-supabase-schema.mjs` | Schema Validator | 14-check SQL schema validator for infra/supabase/schema.sql. (T057) |
| `scripts/export-supabase-bootstrap-payloads.mjs` | Bootstrap Exporter | Sanitized payload exporter → data/ops/supabase/ (sources, records, run, manifest). (T057) |
| `scripts/sync-supabase-hosted.mjs` | Hosted Sync | Dry-run by default; 5-guard real push path; no remote sync in T057. (T057) |
| `scripts/validate-hosted-sync-safety.mjs` | Safety Validator | 21-check hosted sync safety validator (env, tokens, site leakage, cron, CF, public count). (T057) |
| `scripts/test-cloudflare-worker-local.mjs` | Worker Test | 10-route local Cloudflare Worker test without Wrangler/miniflare. (T057) |
| `data/ops/supabase/atlas-sources.bootstrap.json` | Bootstrap Payload | 7-source sanitized bootstrap payload for Supabase atlas_sources. (T057) |
| `data/ops/supabase/atlas-public-records.bootstrap.json` | Bootstrap Payload | 13-record sanitized bootstrap payload for Supabase atlas_public_records. (T057) |
| `data/ops/supabase/atlas-latest-watch-run.bootstrap.json` | Bootstrap Payload | Latest watch run summary payload for Supabase atlas_watch_runs. (T057) |
| `data/ops/supabase/bootstrap-manifest.json` | Bootstrap Manifest | Manifest with safety declarations (no secrets/drafts/raw HTML). (T057) |
| `data/ops/supabase/last-hosted-sync-dry-run.json` | Dry-Run Result | Dry-run sync result (no remote sync performed). (T057) |
| `work-items/T057-supabase-hosted-sync-dry-run/TASK.md` | T057 task | Task scope and deliverables for T057 hosted sync dry run. (T057) |
| `work-items/T057-supabase-hosted-sync-dry-run/VALIDATION.md` | T057 validation | Validation checklist for hosted sync safety. (T057) |
| `work-items/T057-supabase-hosted-sync-dry-run/IMPLEMENTATION_REPORT.md` | T057 report | Final report for T057 hosted sync dry-run bootstrap. (T057) |
| `work-items/T057-supabase-hosted-sync-dry-run/DECISIONS.md` | T057 decisions | D-01–D-06 architecture decisions for T057. (T057) |

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
