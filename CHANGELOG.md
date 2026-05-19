# Changelog

All notable changes to Caesar AI Incident Atlas are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
