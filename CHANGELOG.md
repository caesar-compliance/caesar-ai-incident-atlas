# Changelog

All notable changes to Caesar AI Incident Atlas are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.16.0] - 21 May 2026

### Added
- **T057 — Supabase Local/Cloud Bootstrap + Hosted Sync Dry Run.**
  - `.gitignore` — added env file rules (`.env`, `.env.*`, `!.env.example`), Finder duplicate pattern (`* 2.*`), `infra/cloudflare-worker/wrangler.toml`.
  - `.env.example` — canonical env var reference with placeholders only (no secrets).
  - `scripts/validate-supabase-schema.mjs` — 14-check SQL schema validator (required tables, risk tier guard, uniqueness, no secrets, no destructive statements, no scheduled jobs).
  - `scripts/export-supabase-bootstrap-payloads.mjs` — exports sanitized bootstrap payloads to `data/ops/supabase/` (sources, public records, watch run, manifest).
  - `scripts/sync-supabase-hosted.mjs` — dry-run by default; guarded real push requires 5 explicit conditions; writes `data/ops/supabase/last-hosted-sync-dry-run.json`.
  - `scripts/validate-hosted-sync-safety.mjs` — 21-check safety validator (env, gitignore, tokens, site/ leakage, INC-0014, pages.yml, CF config, automation mode, public count).
  - `scripts/test-cloudflare-worker-local.mjs` — 10-route local Worker test without Wrangler/miniflare; tests all routes including CORS preflight, disabled watch run, and 404.
  - `data/ops/supabase/` — bootstrap payloads: `atlas-sources.bootstrap.json`, `atlas-public-records.bootstrap.json`, `atlas-latest-watch-run.bootstrap.json`, `bootstrap-manifest.json`, `last-hosted-sync-dry-run.json`.
  - `scripts/export-ops-status.mjs` — added `hosted_sync_status: dry_run_ready` and `backend_mode: local_bootstrap_ready` fields.
  - `PROJECT_STATE.md` — updated to T057 / v0.15.0 / 13 records (was stale at T042).
  - `README.md` — updated dataset count to 13, version to v0.15.0.

## [0.15.0] - 21 May 2026

### Added
- **T056 — Real Automated Monitoring Architecture + Hosted Data Starter.**
  - `docs/automation/REAL_AUTOMATED_MONITORING_ARCHITECTURE.md` — architecture decision: static site + repo as source of truth + Supabase (future DB) + Cloudflare Worker (future edge) + GitHub Actions (deploy/build).
  - `infra/supabase/schema.sql` — 7-table Postgres schema (atlas_sources, atlas_watch_runs, atlas_candidates, atlas_drafts, atlas_promotion_packets, atlas_public_records, atlas_digest_runs). Not applied.
  - `infra/supabase/README.md` — integration instructions and gate conditions.
  - `infra/cloudflare-worker/src/index.js` — Worker skeleton (GET /health, /status, /public-records, /latest-run; POST /watch/run disabled by default).
  - `infra/cloudflare-worker/wrangler.example.toml` — deployment config template (no credentials).
  - `infra/cloudflare-worker/README.md` — deployment instructions and safety notes.
  - `scripts/export-ops-status.mjs` — reads incident index + watch runs → writes sanitised ops status to `data/ops/` and `site/data/ops/`.
  - `scripts/validate-ops-status.mjs` — validates ops JSON: record count = 13, latest = INC-0013, no secrets/drafts/candidates leaked, automation_mode not live_scheduled_enabled.
  - `scripts/run-local-automation-cycle.mjs` — one-command local cycle: pipeline → export → validate → build-pages (optional) → rss → validate-site. Logs to `data/ops/latest-local-automation-cycle.log`.
  - `data/ops/latest-status.json` — ops status (internal copy).
  - `data/ops/latest-watch-run-public.json` — sanitised watch run summary (internal copy).
  - `site/data/ops/latest-status.json` — ops status (public, served by GitHub Pages).
  - `site/data/ops/latest-watch-run-public.json` — sanitised watch run summary (public).
  - `site/index.html` — Monitoring Status panel added to sidebar.
  - `site/assets/app.js` — `loadMonitoringStatus()` / `renderMonitoringStatus()` + `formatRelativeTime()`.
  - `site/assets/styles.css` — monitoring panel styles (`.monitoring-list`, `.mon-label`, `.mon-val`, `.mon-json-link`).
  - Work item: `work-items/T056-real-automated-monitoring-architecture/`

## [0.14.0] - 21 May 2026

### Added
- **T055 — Public Case UX + Validator Fix + Live Atlas Polish.**
  - `scripts/validate-real-drafts.mjs` — fixed stale INC-0013 checks; now verifies published filename; blocks INC-0014.
  - `scripts/validate-digests.mjs` — removed now-stale INC-0013 safety block (INC-0013 is published).
  - `scripts/build-public-case-pages.mjs` — generates static `site/cases/index.html` + 13 individual case pages.
  - `scripts/validate-public-site.mjs` — 22-check public site smoke validator.
  - `site/assets/app.js` — Record Type filter, Jurisdiction filter, guidance disclaimer in detail view, improved search coverage.
  - `site/index.html` — Record Type and Jurisdiction sidebar filter groups.
  - `site/assets/styles.css` — `.guidance-notice` banner, case page layout styles.
  - `site/cases/` — 13 static case detail pages + directory index.
  - `data/incident-index.json` + site copy — updated note field to reflect 13 records.
  - RSS feeds rebuilt.

## [0.13.0] - 21 May 2026

### Added
- **T054 — Publish Approved PKT-0006 as INC-0013.** First real adapter-detected case published under Control Tower approval.
  - `data/incidents/INC-0013-edpb-automated-decision-making-profiling-guidance.json` — public record: EDPB automated decision-making and profiling guidance (EU, Green-tier, `record_type: guidance`).
  - `site/data/incidents/INC-0013-edpb-automated-decision-making-profiling-guidance.json` — site copy.
  - `data/reviews/real/approved-promotions.json` — approval entry added (PKT-0006 → INC-0013).
  - New taxonomy entries: `FM-GOVERNANCE-GAP`, `FM-COMPLIANCE-DEFICIT`, `CTL-GUIDANCE-TRACKING`, `CTL-COMPLIANCE-UPDATE-PROCESS`, `cross-sector AI governance` sector.
  - `schemas/incident.schema.json` — optional `record_type` field added (`incident` | `guidance` | `governance_case`).
  - Site display: `badge-guidance` badge for guidance/governance cases, dynamic record count, updated status panel and footer.
  - All validators updated to derive expected record count from `approved-promotions.json` (dynamic baseline).
  - Public dataset: **13 records**.

## [0.12.0] - Unreleased

### Added
- **T052 — Live Adapter Collection + Candidate Shortlist.** Ran real adapter pipeline, improved adapters based on results, built Control Tower review shortlist.
  - `data/watch/runs/latest-live-adapter-audit.json` — audit of live adapter run (6 sources OK, 1 failed, 35 candidates, 9 eligible, 1 case-quality ready).
  - Adapter improvements: FTC URL fix, CNIL pagination filters, EDPB language variant filters, EU Commission query filters, shared module pagination filters.
  - `scripts/build-case-shortlist.mjs` — builds top 5 shortlist with governance analysis.
  - `scripts/validate-case-shortlist.mjs` — validates shortlist structure and safety.
  - `data/reviews/real/case-shortlist.json` — generated shortlist with why_it_matters, governance_value, publication_risks, missing_information.
  - Review console: Shortlist tab, source health summary, adapter success/failure summary, "Ready for Control Tower review" badge.
  - `docs/watch/LIVE_ADAPTER_COLLECTION_RUNBOOK.md` — one-command runbook.
- **T051 — High-Signal Official Source Adapters.** Built adapter framework for all Green sources so Atlas finds real AI enforcement/guidance pages instead of generic contact/about pages.
  - `scripts/source-adapters/shared.mjs` — shared fetch, link extraction, negative/positive filter, keyword matching utilities.
  - `scripts/source-adapters/ico-adapter.mjs`, `ftc-adapter.mjs`, `cnil-adapter.mjs`, `edpb-adapter.mjs`, `eu-commission-adapter.mjs`, `generic-official-adapter.mjs`.
  - Watcher dispatches to named adapter per `source_id`; falls back to generic if unavailable.
  - New T051 quality classes: `likely_enforcement_case`, `likely_regulatory_guidance`, `likely_official_decision`, `likely_policy_update`, `blocked_generic_page`, `blocked_low_relevance`.
  - Per-class promotion thresholds; enforcement/decision ranked +40 above guidance +15.
  - `no_case_quality_candidate_ready` flag propagated through pipeline and review console.
  - `scripts/run-real-pipeline.mjs` — one-command runner for all 14 pipeline stages.
  - `docs/watch/REAL_PIPELINE_ONE_COMMAND_RUNBOOK.md`.
  - Review console: quality class filter, adapter metadata fields, CASE/GUIDANCE/BLOCKED badges, Adapter column in ranked table.
  - Adapter run report: `data/watch/runs/latest-adapter-summary.json`.

## [0.11.0] - 21 May 2026

### Added
- **T049 — Promotion CLI + Public Case Dry-Run + Candidate Ranking.** Built the real promotion machinery for Atlas with hard safety gates.
- `scripts/rank-promotion-candidates.mjs` — scores all promotion packets by safety criteria (Green source +50, no copied text +15, legal/commercial domains +10 each, etc.), generates `data/reviews/real/ranked-promotion-candidates.json` with top 5 and recommendation. Top: PKT-0001 (DRAFT-0001) score 130.
- `data/reviews/real/approved-promotions.json` — Control Tower approval registry. Empty `approvals: []` array = dry-run only mode. Single approval per run enforced.
- `data/reviews/real/approved-promotions.example.json` — documented approval format with all required fields and override flags.
- `scripts/promote-approved-case.mjs` — dual-mode CLI. No approval: generates 5 dry-run previews in `data/promotion-previews/real/` (marked `_dry_run_preview: true`, `_not_approved: true`, `_public: false`). With approval: promotes exactly ONE case with full audit trail.
- `scripts/validate-promotion-dry-run.mjs` — comprehensive safety validation: public count = 12, no INC-0013 without approval, all dry-run flags present, no site/ leakage, no mock data promoted, no Yellow/Red sources.
- Hard gates: empty approvals = dry-run only; multiple approvals rejected; Yellow/Red sources blocked without override; `source_text_copied: true` = hard block; existing public records blocked.
- Review console upgraded: added ranked candidates panel (T049) showing top recommendation, score breakdown, and status: NOT APPROVED / NOT PUBLIC / Control Tower approval required.
- `docs/review/PROMOTION_CLI_RUNBOOK.md` — quick reference for the promotion workflow.
- Work items under `work-items/T049-promotion-cli-public-case-dry-run/`.

### Changed
- `NEXT_ACTIONS.md` updated to T049 complete.

### Status (T049)
- **Dataset**: Frozen at exactly 12 validated public incident records. Zero public leakages.
- **Dry-Run Previews**: 5 preview files in `data/promotion-previews/real/` (preview-pkt-0001-inc-0013.json through preview-pkt-0005-inc-0013.json).
- **Top Recommendation**: PKT-0001 / DRAFT-0001 (ICO Make a complaint) score 130. Not promoted — no approval exists.

## [0.10.0] - 21 May 2026

### Added
- **T048 — Real Candidate-to-Draft Pipeline.** Built end-to-end local pipeline converting real Green-source candidates into local-only draft case packs and promotion packets.
- Watcher hardening: added `fallback_urls` and `timeout_ms` to all 7 targets in `green-source-watch-targets.json`; `fetchWithFallback()` in `watch-green-sources.mjs` with per-source health reporting (`ok/failed/skipped/http_status/error_message/used_fallback`) and `latest-watch-summary.json` output.
- `scripts/build-real-case-drafts.mjs` — reads unique candidates (via dedupe report), generates `DRAFT-NNNN.json` in `data/drafts/real/` with `local_only: true`, `public: false`, `not_legal_advice: true`, `source_text_copied: false`, `publish_recommendation: needs_legal_review`.
- `scripts/validate-real-drafts.mjs` — validates all required fields, safety flags, no forbidden full-text fields, no leakage to `site/`.
- `scripts/build-promotion-packets.mjs` — generates `PKT-NNNN.json` in `data/promotion-packets/real/` with `promotion_allowed: false`, full safety_declarations, required_reviews checklist (all false), and suggested-only public INC ID.
- `scripts/validate-promotion-packets.mjs` — validates all safety declarations, checklist state, no actual incidents created, no leakage to `site/`.
- Review console upgraded with pipeline stage tabs (Candidates / Drafts / Packets / Health), pipeline summary bar, promotion packet detail panel, source health table, and `LOCAL ONLY / NOT PUBLIC / NOT APPROVED / PROMOTION BLOCKED` labels on all real records.
- Added `data/drafts/real/` and `data/promotion-packets/real/` directories.
- 6 real drafts (DRAFT-0001 to DRAFT-0006) and 6 promotion packets (PKT-0001 to PKT-0006) generated and validated.
- Work items under `work-items/T048-real-candidate-draft-pipeline/`.

### Changed
- `scripts/build-real-review-bundle.mjs` — extended to include `drafts`, `promotion_packets`, `source_health_summary` fields.
- `scripts/validate-real-watcher.mjs` — added checks for `latest-watch-summary.json`, `fallback_urls` presence, no drafts/packets under `site/`.
- `tools/review-console/assets/review-console.css` — added pipeline label, stage tab, and pipeline bar styles.
- `NEXT_ACTIONS.md` updated to T048 complete, T049 recommended.

### Status (T048)
- **Dataset**: Frozen at exactly 12 validated public incident records. Zero public leakages.
- **Pipeline**: 6 real drafts + 6 promotion packets generated locally. `promotion_allowed: false` on all. No public exposure.

## [0.9.0] - 21 May 2026

### Added
- **T047 — Real Green-Source Watcher MVP.** Built the first real, manual CLI-triggered Green-source watcher pipeline and de-duplicator.
- Deployed a vanilla Node ESM watch script (`scripts/watch-green-sources.mjs`) executing manual operator fetches to 7 official Green-tier targets, parsing links/feeds via regex tools, filtering against curation keywords (`data/watch/config/target-keywords.json`), and saving local candidate files.
- Built a duplicate checker engine (`scripts/dedupe-real-candidates.mjs`) identifying duplicate candidate URLs or SHA-256 dedupe keys.
- Programmed a real review bundle compiler (`scripts/build-real-review-bundle.mjs`) compiling raw candidates into `tools/review-console/real-review-bundle.json`.
- Integrated a secure toggle dropdown in `tools/review-console/index.html` allowing curators to swap review bundles in the local console dashboard.
- Hardcoded a multi-vector safety auditor (`scripts/validate-real-watcher.mjs`) enforcing containment bounds, Green-only targets, and zero public leakage under `site/`.
- Authored the operator runbook under `docs/watch/REAL_GREEN_SOURCE_WATCHER_RUNBOOK.md`.
- Tracked task files under `work-items/T047-real-green-source-watcher-mvp/`.

### Changed
- Extended `schemas/pipeline/candidate.schema.json` to include the `real_detected` status enum value.
- Updated the local review console dashboard script (`tools/review-console/assets/review-console.js`) to parse the real review bundle, populate metadata, and render a prominent `PROMOTION BLOCKED` warning banner.
- Updated lifecycle files `ARCHITECTURE.md`, `ROADMAP_NEXT_PHASES.md`, `NEXT_ACTIONS.md`, `REPO_INVENTORY.md`, and `docs/DECISION_LOG.md` (`DEC-113`).

### Status (T047)
- **Dataset**: Core incident catalog frozen at exactly 12 validated incident records. Zero public leakages.
- **Ingestion**: Raw real candidates are successfully sandboxed locally outside `site/` with strict human-in-the-loop clean-room curation gates.

## [0.8.4] - 21 May 2026

### Added
- **T046 — Local Draft Review Console & Promotion Gate.** Created an offline, local-only case drafting audit dashboard and visual promotion gate simulator.
- Developed the high-fidelity local-only Review Console UI (`tools/review-console/index.html`) using premium dark-theme and glassmorphism styling (`assets/review-console.css`), local-first responsive layouts, dynamic bundle fetching, and multi-stage Promotion Gate visualizers (`assets/review-console.js`).
- Created a robust JSON database bundle compiler (`scripts/build-review-bundle.mjs`) to aggregate all mock candidates, drafts, and weekly preview digests into `tools/review-console/review-bundle.json`.
- Deployed a comprehensive review validator script (`scripts/validate-review-console.mjs`) verifying all strict sandboxing boundaries, confirming zero leakage of synthetic mock records or review assets into `site/` or live indices.
- Drafted curator procedures, checklists, and gating policies under `docs/review/`:
  - `PROMOTION_GATE_POLICY.md` (Formal publication safeguards and branch rules)
  - `DRAFT_REVIEW_WORKFLOW.md` (Curator operational audit guide)
  - `PUBLICATION_PROMOTION_CHECKLIST.md` (Pre-publication compliance criteria)
- Saved a mock review decision simulation catalog at `data/reviews/mock/mock-review-decisions.json`.
- Logged task deliverables under `work-items/T046-local-draft-review-console/`.

### Changed
- Integrated T046 architectural summaries into `ARCHITECTURE.md`.
- Updated lifecycle files `ROADMAP_NEXT_PHASES.md` and `NEXT_ACTIONS.md` to register task completion and subsequent milestones.
- Appended decision log entry `[DEC-112]` in `docs/DECISION_LOG.md`.

### Status (T046)
- **Dataset**: Frozen at exactly 12 validated public incident records. Zero synthetic leaks.
- **Review Gating**: Promotion gate interceptor successfully blocks self-promotion and mock leakages.

## [0.8.3] - 21 May 2026

### Added
- **T045 — Offline Mock Auto-Discovery Prototype.** Built a sandboxed, offline mock prototype of the Case Atlas auto-discovery and drafting pipeline.
- Created 5 local synthetic mock source update JSON files (resume screening bias, biometric consent retail profiling, healthcare patient demographic drift calibration, explainable automated underwriting denials, third-party conversational API secret leak) in `mock-sources/official/` and `mock-sources/yellow/`.
- Deployed modular, offline ES module pipeline scripts in `scripts/`:
  - `mock-watch-sources.mjs` (scans and normalizes mock source files)
  - `mock-build-candidates.mjs` (compiles and saves candidate records CAND-0013 to CAND-0017)
  - `mock-dedupe-candidates.mjs` (groups duplicates and writes mock-dedupe-report.json)
  - `mock-build-case-drafts.mjs` (compiles draft packs DRAFT-0013 to DRAFT-0017 with compliance tags)
  - `mock-build-digest-preview.mjs` (compiles weekly preview JSON)
  - `validate-mock-pipeline.mjs` (comprehensive safety containment auditor)
- Integrated a custom schema validation helper `tools/validate_mock_schemas.py` executing JSON schema checks.
- Documented developer operational steps in `docs/automation/MOCK_PIPELINE_RUNBOOK.md`.
- Tracked T045 deliverables under `work-items/T045-offline-mock-auto-discovery-prototype/`.

### Changed
- Extended `schemas/pipeline/candidate.schema.json` to allow `mock_detected` and `mock_candidate` in the `status` enum.
- Updated lifecycle files `ARCHITECTURE.md`, `ROADMAP_NEXT_PHASES.md`, `NEXT_ACTIONS.md`, `REPO_INVENTORY.md`, and `docs/DECISION_LOG.md` to register mock pipeline components.
- Documented pipeline validation boundaries in `docs/automation/CANDIDATE_PIPELINE_MODEL.md` and `docs/automation/VALIDATOR_EXTENSION_PLAN.md`.

### Status (T045)
- **Dataset**: Frozen at exactly 12 validated public incident records. Zero leakage of mock data into public site directories or RSS.
- **Pipeline & Safety**: All monitored source registries remain strictly `inactive_draft` and blocked from auto-publishing. Pipeline runs 100% offline with zero network scraping.
- **Verification**: Fully verified locally. All Python schema validation and Node sandboxing containment checks pass perfectly.

## [0.8.2] - 21 May 2026

### Added

- **T044 — Static Weekly and Monthly Digest MVP.** Established the first visible static digest product layer, rendering static operational and strategic digests, compiling RSS feeds, and adding homepage portal links.
- Created static digest briefing JSON files containing mandatory metadata and Caesar-written summaries based on existing public incidents:
  - `data/digests/weekly/weekly-2026-W21.json` (Operational week 21, 2026 digest sourcing INC-0011 and INC-0012)
  - `data/digests/monthly/monthly-2026-05.json` (Strategic May 2026 digest aggregating trends across INC-0001, INC-0010, INC-0011, INC-0012)
- Added synchronized static digest copies inside `site/data/digests/` for static site publishing.
- Programmed standalone ES module digest management scripts:
  - `scripts/validate-digests.mjs`: Standalone offline digest JSON structure, cross-reference, and safety policy validator.
  - `scripts/build-rss-feeds.mjs`: Standalone offline RSS compiler that compiles all valid digests into three compliant RSS 2.0 XML feeds.
- Deployed unified, responsive, dark-mode static rendering subpages under `site/digests/` requiring zero client-side JavaScript:
  - `site/digests/index.html` (Briefing Digests main portal landing dashboard)
  - `site/digests/weekly/index.html` (Weekly operational briefs display page)
  - `site/digests/monthly/index.html` (Monthly strategic trend briefing display page)
- Compiled three distinct XML feeds pointing to verified static routes:
  - `site/rss.xml` (Unified digest feed)
  - `site/digests/weekly.xml` (Weekly digests only)
  - `site/digests/monthly.xml` (Monthly digests only)
- Drafted work-item tracking files under `work-items/T044-static-weekly-monthly-digest-mvp/`: `TASK.md`, `VALIDATION.md`, `DECISIONS.md`, and `IMPLEMENTATION_REPORT.md`.

### Changed

- Updated `site/index.html` sidebar to seamlessly integrate the "Weekly and Monthly AI Legal Case Digests" access links and RSS subscription pills.
- Updated `DIGEST_PRODUCT_MODEL.md` to specify active JSON schema parameters, offline utility scripts, XML feed structures, and static page hierarchies.
- Updated `ARCHITECTURE.md` to bump structural design versions to `0.8.2` and index all newly created digest files and compilation pipelines.
- Aligned lifecycle control files `ROADMAP_NEXT_PHASES.md` and `NEXT_ACTIONS.md` to record completion of T044 and map next goals.
- Documented digest validation and RSS compiling procedures in `site/README.md`.
- Registered all 12 newly created digest data, script, rendering, and tracking files in `REPO_INVENTORY.md`.

### Status (T044)

- **Dataset**: Preserved intact at exactly 12 validated public incident records. Zero new incidents or candidates created.
- **Pipeline & Safety**: All monitored source registries remain strictly `inactive_draft` and blocked from auto-publishing. No dynamic databases, subscriber logs, secrets, external dynamic integrations, scrapers, or network APIs were added.
- **Verification**: Fully verified locally. All python tests and node digest validators pass perfectly.

---

## [0.8.1] - 21 May 2026

### Added

- **T043 — Ingestion Pipeline Schemas & Source Registry Integration.** Implemented the first Caesar-native architecture layer for automatic legal/commercial AI case discovery without live watcher or scraper elements.
- Created three JSON pipeline schemas under `schemas/pipeline/`:
  - `source.schema.json`: Validates source registry entry shapes.
  - `candidate.schema.json`: Validates raw case candidate ingestion logs.
  - `case-draft.schema.json`: Validates intermediate draft records awaiting governance sign-off.
- Created the master monitored sources registry `data/source-registry/sources.yml` containing 10 initial regulatory and discovery references in a safe, inactive state.
- Formulated the automation policy suite under `docs/automation/`:
  - `SOURCE_REGISTRY_POLICY.md`: Curated monitoring standards.
  - `CANDIDATE_PIPELINE_MODEL.md`: Ingestion pipeline stage specifications.
  - `SOURCE_RISK_GATE.md`: Green/Yellow/Red risk tier definitions and original clean-room writing rules.
  - `AUTO_PUBLISH_RULES.md`: Policy restrictions and human review gates blocking automatic publication.
  - `VALIDATOR_EXTENSION_PLAN.md`: Future automated checking scope.
- Created offline local validation script `tools/validate_pipeline_schemas.py` that utilizes `jsonschema` and `pyyaml` to enforce strict safety policies (all registry records must be `inactive_draft`, `auto_publish_allowed` must be explicitly `false`, non-Green sources cannot auto-detect or auto-draft).
- Wrote two synthetic mock candidates (`sample-candidate-1.json`, `sample-candidate-2.json`) under `data/candidates/mock/` for schema compliance testing.
- Created task checklists and execution logs under `work-items/T043-source-registry-case-pipeline-schema/`: `TASK.md`, `VALIDATION.md`, `DECISIONS.md`, `IMPLEMENTATION_REPORT.md`.
- Appended decision log entry `[DEC-109]` recording decisions **D11 through D16** in `docs/DECISION_LOG.md`.

### Changed

- Updated `ARCHITECTURE.md` to register new directories, pipeline schemas, policies, and validator scripts.
- Updated `ROADMAP_NEXT_PHASES.md` and `NEXT_ACTIONS.md` to mark T043 as complete and outline subsequent T044 targets.
- Registered all 15 newly created files in `REPO_INVENTORY.md`.

### Status (T043)

- **Dataset**: Exactly 12 validated case records (INC-0001 through INC-0012). Zero new public incidents created.
- **Pipeline Registry**: 10 source records integrated, all marked strictly as `inactive_draft` and blocked from auto-publishing.
- **Safety**: Fully offline execution. No scraping, live fetching, DNS, domain, secrets, or hosting changes.

---

## [0.8.0] - 21 May 2026

### Added

- **T042 — Strategic Product Pivot to AI Legal & Governance Case Atlas.** Formally documented the new strategic direction pivoting from a public AI incident database to the Caesar AI Legal & Governance Case Atlas (a case-to-control intelligence layer).
- Created six strategic architecture and policy documents:
  - `PRODUCT_PIVOT_LEGAL_GOVERNANCE_CASE_ATLAS.md`: Details the strategic positioning and the core value chain: case → risk → missing control → evidence → client checklist → training lesson → digest.
  - `CASE_TO_CONTROL_PRODUCT_MODEL.md`: Establishes the 21-field case schema, structural mapping relationships, vendor audit questionnaires, client remediation checklists, and developer/executive training lessons.
  - `AUTOMATION_AND_PUBLISHING_POLICY.md`: Lays down clear source-risk gates and rules for source-tiered auto-discovery, auto-drafting, clean-room original summaries, and human-in-the-loop validation policies.
  - `DIGEST_PRODUCT_MODEL.md`: Details weekly and monthly static briefings, RSS XML syndication feeds, and future listmonk/SES distribution strategies without external integrations or subscriber databases.
  - `SOURCE_REGISTRY_AND_WATCHER_ARCHITECTURE.md`: Presents the conceptual architecture for the 10-stage watcher and automated ingestion pipeline.
  - `REFERENCE_LAB_USAGE_NOTE.md`: Clarifies the clean-room research boundaries and policies governing the reference lab, protecting Caesar codebases from AGPL-3.0 and other copyleft licenses.
- Created four work-item documents tracking this pivot under `work-items/T042-product-pivot-legal-governance-case-atlas/`:
  - `TASK.md`: Detailed work checklist.
  - `VALIDATION.md`: Automated QA and compliance checklist.
  - `DECISIONS.md`: Records decisions D1 through D10.
  - `IMPLEMENTATION_REPORT.md`: Comprehensive final execution report.
- Appended decision log entry `[DEC-108] — 21 May 2026 — Strategic Product Pivot to AI Legal & Governance Case Atlas` documenting decisions D1–D10 in `docs/DECISION_LOG.md`.

### Changed

- Updated `SPEC.md` to align the Purpose and Problem sections with the Case-to-Control intelligence layer and the case-to-evidence pipeline.
- Updated `ARCHITECTURE.md` to incorporate the 10-stage ingestion pipeline and the 21-field case schema JSON structures.
- Updated `ROADMAP.md` & `ROADMAP_NEXT_PHASES.md` to rebrand Phase v0.8 to focus on the v0.8.0 Strategic Pivot and integration mapping.
- Updated `README.md` to introduce the Case Atlas positioning, specify the new repository structure, and display the core value chain.
- Updated lifecycle files `PROJECT_STATE.md` and `NEXT_ACTIONS.md` to establish the new v0.8.0 milestone baseline.
- Registered all 10 new strategic policy and work-item documents in `REPO_INVENTORY.md`.

### Status (T042)

- **Dataset**: Exactly 12 case records (INC-0001 through INC-0012) verified and validated. No new case records created.
- **Safety**: No DNS, CNAME, hosting, secrets, or dependency changes. Public root remains `site/`. GitHub Pages workflow continues to upload only `site/`. Sibling repositories remain entirely untouched.

---

## [Unreleased] - Repository presentation polish (20 May 2026)

### Changed

- README header: live site link, status table, what-it-does / what-it-is-not (presentation only).
- GitHub repository About: description, homepage `https://atlas.caesar.no`, topics.
- Safe cleanup of merged remote branches (origin: `main` only).

### Added

- `work-items/repository-presentation-polish/` task pack.

---

## [0.7.8] - 20 May 2026

### Added

- **T040 — Draft Second New Incident Record from CAND-008.** Created INC-0012: "Federal regulators issue joint guidance warning that AI-based hiring tools may violate disability discrimination protections". Sources: 3× Tier 1 US government public domain (EEOC ADA guidance, DOJ ADA.gov guidance, EEOC-DOJ joint press release). Updated `data/incident-index.json` and `site/data/incident-index.json`. Created `INC0012_GOVERNANCE_REVIEW_NOTE.md` with source/license and wording/legal-risk review. Updated governance docs: `PUBLICATION_RISK_GATE.md`, `GOVERNANCE_GATE_DECISION_RECORD.md`, `GOVERNANCE_SIGNOFF_PACK.md`. Updated lifecycle docs. Created `work-items/T040-create-inc0012-cand008/`.

### Status (T040)

- **Dataset**: 12 records, INC-0001–INC-0012
- **INC-0012 status**: `prepared_for_CT_review` — not yet governance-approved
- **Source**: EEOC + DOJ + joint press release (3× Tier 1, all US government public domain)
- **Wording**: Regulatory guidance framing, no named employer, hedged language — low risk
- **Approval scope**: INC-0012 requires separate CT sign-off; G-01/G-02 for INC-0001–INC-0011 does not extend
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no copied source text, no analytics, repo root not exposed. Not legal advice.

### Validation (T040)

- `python3 tools/validate_dataset.py` — 12 records expected
- `site/data/` synchronized with root `data/`
- No INC-0013+ files
- No internal docs in `site/`
- Workflow uploads only `site/`
- `git diff --check` — clean

---

## [0.7.7] - 20 May 2026

### Added

- **T039 — INC-0011 Source/Wording Gate Sign-Off + Live Smoke Test.** Reviewed and signed off INC-0011 G-01 (source/license) and G-02 (wording/legal-risk) gates with caution. Created `INC0011_GATE_SIGNOFF_RECORD.md` documenting approval scope, source verification, wording review, and sign-off status. Verified INC-0011 live at https://atlas.caesar.no/ — 11 records visible in public JSON. Updated `INC0011_GOVERNANCE_REVIEW_NOTE.md` with approved status. Updated lifecycle docs: `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `CHANGELOG.md`. Created `work-items/T039-inc0011-gate-smoke/`. INC-0011 now governance-approved; future records still require separate sign-off. Not legal advice.

### Status (T039)

- **Dataset**: 11 records, INC-0001–INC-0011
- **INC-0011 status**: G-01/G-02 approved with caution; live and governance-approved
- **Source**: ATS + PubMed (Tier 1 + Tier 2) — verified
- **Wording**: Factual, hedged, no legal conclusions — verified
- **Live verification**: INC-0011 visible at https://atlas.caesar.no/data/incident-index.json
- **Approval scope**: INC-0011 only; does not extend to future records
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no new records, no analytics, repo root not exposed. Not legal advice.

### Validation (T039)

- `python3 tools/validate_dataset.py` — 11 records (expected after T038)
- Live JSON check — PASS; 11 records including INC-0011
- `git diff --check` — clean
- No new records created; no data changes beyond T038

---

## [0.7.6] - 20 May 2026

### Added

- **T038 — Draft First New Incident Record (CAND-013 → INC-0011).** Created first new incident record from approved candidate CAND-013: `INC-0011-spirometry-race-correction-medical-guideline.json`. Record documents ATS official statement on race-based correction factors in pulmonary function testing algorithms. Updated `data/incident-index.json` and `site/data/incident-index.json` to include INC-0011. Created `INC0011_GOVERNANCE_REVIEW_NOTE.md` with source/license review and wording/legal-risk review for CT sign-off. Dataset now 11 records (INC-0001 through INC-0011). INC-0011 prepared for CT review; not automatically covered by G-01/G-02 approval for INC-0001–INC-0010. Updated lifecycle docs: `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `CHANGELOG.md`. Created `work-items/T038-create-inc0011-cand013/`. No scraping or bulk downloads. Not legal advice. Branch: `records/T038-create-inc0011-cand013`.

### Status (T038)

- **Dataset**: 11 records, INC-0001–INC-0011
- **New records**: 1 (INC-0011 from CAND-013)
- **Source**: ATS official statement + PubMed (Tier 1 + Tier 2)
- **Failure mode**: FM-BIAS
- **Severity**: high; **Confidence**: high
- **G-01/G-02 approval**: INC-0001–INC-0010 approved with caution; INC-0011 requires separate CT sign-off
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no imports, no analytics, repo root not exposed. Not legal advice.

### Validation (T038)

- `python3 tools/validate_dataset.py` — PASS; 11 records; data and site sync confirmed
- INC-0011 files created in data/incidents/ and site/data/incidents/
- No CNAME; no internal docs in site/
- `git diff --check` — clean

---

## [0.7.5] - 20 May 2026

### Added

- **T037 — Batch-1 Source Pack Finalization.** Manual source lookup performed for 4 selected batch-1 candidates: CAND-013 (Spirometry race bias — ATS statement + PubMed), CAND-008 (AI hiring disability bias — EEOC + DOJ guidance), CAND-011 (Retail facial recognition ICO — ICO statement + Southern Co-op), CAND-010 (LLM legal sanctions — Johnson v. Dunn CourtListener). Created `BATCH1_FINAL_SOURCE_PACKS.md` with verified source URLs, source-risk assessments, and drafting readiness per candidate. Created `BATCH1_DRAFTING_READINESS_MATRIX.md` with readiness tables, safest-to-riskiest drafting order, and T038 options. Created `BATCH1_SOURCE_URL_REGISTER.md` with source reproduction rules and license summary. Updated planning docs: `FIRST_DRAFTING_BATCH_SELECTION.md`, `FIRST_DRAFTING_BATCH_GATE_MATRIX.md`, `FUTURE_RECORD_DRAFTING_TASK_OUTLINE.md`. Updated lifecycle docs: `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `ROADMAP.md`, `ROADMAP_NEXT_PHASES.md`. Created `work-items/T037-batch1-source-pack-finalization/`. No incident records created. No data, source, site, or governance gate changes. No scraping or bulk downloads. Not legal advice. Branch: `planning/T037-batch1-source-pack-finalization`.

### Status (T037)

- **Dataset**: 10 records, INC-0001–INC-0010, unchanged
- **New records**: 0
- **Candidates**: 4 batch-1 candidates source-verified; all remain `not_approved_candidate`
- **Source packs ready**: CAND-013 (ATS+PubMed), CAND-008 (EEOC+DOJ), CAND-011 (ICO+company), CAND-010 (CourtListener)
- **Drafting order**: CAND-013 (safest) → CAND-008 → CAND-010 → CAND-011 (riskiest)
- **G-01/G-02 approval**: Remains limited to current 10-record MVP — no expansion
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no imports, no analytics, repo root not exposed. Not legal advice.

### Validation (T037)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- No INC-0011+ files created; no site/ changes; no CNAME
- `git diff --check` — clean

---

## [0.7.3] - 20 May 2026

### Added

- **T035 — P1 Candidate Source Pack Planning.** Manual source lookup performed for all 8 P1 candidates (CAND-001, CAND-002, CAND-003, CAND-004, CAND-008, CAND-010, CAND-011, CAND-013). Created `P1_CANDIDATE_SOURCE_PACKS.md` with source URLs, tiers, risk assessments, and drafting readiness per candidate. Created `P1_CANDIDATE_SOURCE_RISK_MATRIX.md` with overview table, readiness ranking, and exclusion/defer list. Created `P1_CANDIDATE_PRIORITIZATION_RECOMMENDATION.md` recommending first drafting batch of 4 candidates (CAND-013, CAND-008, CAND-011, CAND-010). Created `work-items/T035-p1-candidate-source-packs/`. Updated lifecycle docs. No incident data, source URLs, site, or governance gate changed. No scraping or bulk downloads. Branch: `planning/T035-p1-candidate-source-packs`.

### Status (T035)

- **Dataset**: 10 records, INC-0001–INC-0010, unchanged
- **New records**: 0
- **Candidates**: All 8 P1 candidates reviewed; all remain `not_approved_candidate`
- **Source packs ready for CT**: 6 (CAND-001, CAND-003, CAND-008, CAND-010, CAND-011, CAND-013)
- **Needs primary source**: 1 (CAND-002 — downgraded to P2)
- **Needs counsel gate**: 1 (CAND-004)
- **First batch recommendation**: CAND-013, CAND-008, CAND-011, CAND-010
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no imports, no analytics, repo root not exposed. Not legal advice.

---

## [0.7.4] - 20 May 2026

### Added

- **T036 — CT First Drafting Batch Selection.** Selected first drafting batch of 4 candidates for future INC-0011+ work: CAND-013 (Spirometry race bias), CAND-008 (AI hiring disability bias), CAND-011 (Retail facial recognition ICO), CAND-010 (LLM legal sanctions). Created `FIRST_DRAFTING_BATCH_SELECTION.md` with status summary, selected batch details, deferred candidates rationale, batch-1 drafting gates, and explicit non-approval statement. Created `FIRST_DRAFTING_BATCH_GATE_MATRIX.md` with compact tables for selected and deferred candidates. Created `FUTURE_RECORD_DRAFTING_TASK_OUTLINE.md` as template for future T037+ drafting tasks. Updated planning docs and lifecycle docs with T036 status. No incident records created. No data, source, site, or governance gate changes. No scraping or bulk downloads. Branch: `planning/T036-first-drafting-batch-selection`.

### Status (T036)

- **Dataset**: 10 records, INC-0001–INC-0010, unchanged
- **New records**: 0
- **Candidates**: 4 selected for first drafting batch; all remain `not_approved_candidate`
- **Deferred P1 candidates**: CAND-001, CAND-002, CAND-003, CAND-004 (see `FIRST_DRAFTING_BATCH_SELECTION.md` for rationale)
- **First batch**: CAND-013, CAND-008, CAND-011, CAND-010
- **G-01/G-02 approval**: Remains limited to current 10-record MVP — no expansion
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no imports, no analytics, repo root not exposed. Not legal advice.

### Validation (T036)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- No INC-0011+ files created; no site/ changes; no CNAME
- `git diff --check` — clean

---

## [0.7.2] - 20 May 2026

### Added

- **T034 — Candidate Shortlist Draft for INC-0011+ Planning.** Created `INCIDENT_CANDIDATE_SHORTLIST_DRAFT.md` with 15 planning-only candidates (CAND-001 through CAND-015), all status `not_approved_candidate`: sectors covered include `finance-credit`, `finance-banking`, `finance-fraud`, `education`, `criminal-justice`, `insurance`, `enterprise-ai-agents`, `public-sector` (UK), `healthcare-medical`, `legal-compliance`, `retail-ecommerce`, `media-content`, `hiring-employment`. Jurisdictions: US, UK, EU, AU, Global. Priority assignments: 8×P1, 5×P2, 2×P3. Created `INCIDENT_CANDIDATE_TRIAGE_MATRIX.md` with priority matrix, source readiness matrix, and governance value matrix. Created `INCIDENT_RECORD_CREATION_GATE_CHECKLIST.md` with 12 gates required before any candidate becomes a real record. Created `work-items/T034-candidate-shortlist-draft/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Updated lifecycle docs. No incident data, source URLs, or legal content changed. No site changes. No DNS/CNAME/hosting/secrets changes. Branch: `planning/T034-candidate-shortlist-draft`.

### Status (T034)

- **Dataset**: 10 records, INC-0001–INC-0010, unchanged
- **New records**: 0
- **Candidates**: 15 drafted, all `not_approved_candidate`
- **G-01/G-02**: ✅ APPROVED with caution — frozen for current 10-record MVP (unchanged)
- **Data/source/legal/site changes**: None
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no imports, no analytics, repo root not exposed. Not legal advice.

### Validation (T034)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- `git diff --check` — clean
- No INC-0011+ files created; no site/ changes; no CNAME

---

## [0.7.1] - 20 May 2026

### Added

- **T033 — Dataset Expansion Planning for INC-0011+ Candidates.** Created four dataset expansion planning documents: (1) `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` — defines candidate selection criteria for INC-0011+ records including AI incident relevance, public interest value, source availability, source quality preference order, neutral wording requirement, privacy/reputational risk screen, jurisdiction diversity, category diversity, no sensationalism, no unsupported allegations, no paywalled-only sole-source reliance, no single-source weak entries without CT/counsel approval, and automatic exclusion rules; (2) `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` — defines preferred source categories (court/regulatory/government Tier 1, peer-reviewed/official statements Tier 2, reputable journalism Tier 3), minimum source count guidance (two preferred; one requires CT approval + caution wording), when counsel review is required, when caution wording is mandatory, source/license notes (no text reproduction, no AIID/AIAAIC/OECD data without license review, no scraping); (3) `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md` — describes full 9-stage future workflow: candidate idea → source collection → source risk review → wording/legal risk review → draft record → technical validation → CT gate → counsel gate if required → public release batch; explicitly states candidate planning does not approve records, each record requires its own review, G-01/G-02 does not automatically extend to new records; (4) `INCIDENT_CANDIDATE_SHORTLIST_TEMPLATE.md` — reusable candidate shortlist template with all required fields; placeholder/illustrative example only (fictional), no real candidates listed. Updated lifecycle docs: `ROADMAP.md` (T033 block added), `ROADMAP_NEXT_PHASES.md` (T033 complete; T034 as next step), `PROJECT_STATE.md` (v0.7.1, T033 complete), `NEXT_ACTIONS.md` (T033 complete, T034 recommended), `CHANGELOG.md` (this entry), `REPO_INVENTORY.md` (T033 files), `README.md` (T033 status). Created `work-items/T033-dataset-expansion-planning/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. No incident data, source URLs, or legal content changed. No site changes. No DNS/CNAME/hosting/secrets changes. Branch: `planning/T033-dataset-expansion-candidates`.

### Status (T033)

- **Technical Public MVP**: LIVE + VERIFIED at `https://atlas.caesar.no/`
- **Baseline commit**: `64c7267` (unchanged)
- **Dataset**: 10 records, INC-0001–INC-0010, unchanged
- **G-10**: ✅ PASS (unchanged)
- **G-01**: ✅ APPROVED with caution — frozen for current 10-record MVP (unchanged)
- **G-02**: ✅ APPROVED with caution — frozen for current 10-record MVP (unchanged)
- **All 12 governance gates**: closed/approved — current 10-record MVP only (unchanged)
- **New records**: 0
- **Data changes**: None
- **Source/legal changes**: None
- **Site changes**: None
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no external scripts, no analytics, repo root not exposed, no incident data changes. Approval scope remains current 10-record public MVP only. Not legal advice.

### Validation (T033)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- `grep -R "../data/" site/assets/app.js site/index.html` — clean
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty
- `git diff --check` — clean
- No external scripts added; no analytics/tracking added; no incident JSON files added

---

## [0.7.0] - 20 May 2026

### Added

- **T032 — Public MVP v0.7 Status Freeze + Roadmap Split.** Created `PUBLIC_MVP_BASELINE_FREEZE.md` with: (1) baseline status table (URL, commit, dataset size, public root, gate status, approval scope), (2) frozen baseline rules (no record changes, no new records, no scraping/import, no source/legal wording changes, no DNS changes, no third-party text), (3) INC-0006 caution summary, (4) next review triggers. Created `ROADMAP_NEXT_PHASES.md` with compact v0.7–v1.0 roadmap split: v0.7 Dataset Expansion Planning (planning only), v0.8 Caesar AI Evidence / Governance OS Integration Planning, v0.9 Public Quality Polish, v1.0 Expanded Public Release Criteria. Updated `ROADMAP.md` with T032 reference block (current baseline, next phases pointer, recommended next step). Updated lifecycle docs: `PROJECT_STATE.md` (v0.7.0, T032 complete), `NEXT_ACTIONS.md` (T032 status, T033 recommended), `CHANGELOG.md`, `REPO_INVENTORY.md`, `README.md`, `site/README.md`, `PRODUCT_POLISH_BACKLOG.md`, `PUBLICATION_RISK_GATE.md`, `RELEASE_CANDIDATE_GATE.md`, `DEPLOYMENT_READINESS_CHECKLIST.md`. Created `work-items/T032-public-mvp-freeze-roadmap/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. No incident data, source URLs, or legal content changed. No DNS/CNAME/hosting/secrets changes. Branch: `status/T032-public-mvp-freeze-roadmap`.

### Status (T032)

- **Technical Public MVP**: LIVE + VERIFIED at `https://atlas.caesar.no/`
- **Baseline commit**: `64c7267`
- **Dataset**: 10 records, INC-0001–INC-0010, unchanged
- **G-10**: ✅ PASS
- **G-01**: ✅ APPROVED with caution — frozen for current 10-record MVP
- **G-02**: ✅ APPROVED with caution — frozen for current 10-record MVP
- **All 12 governance gates**: closed/approved
- **New records**: 0
- **Data changes**: None
- **Source/legal changes**: None
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no external scripts, no analytics, repo root not exposed, no incident data changes. Approval scope is narrow — current 10-record public MVP only. Not legal advice.

### Validation (T032)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- `grep -R "../data/" site/assets/app.js site/index.html` — clean
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty
- No external scripts added; no analytics/tracking added
- `grep -R "upload-pages-artifact" .github/workflows/pages.yml` — confirmed
- `grep -R "path: site" .github/workflows/pages.yml` — confirmed

---

## [0.6.4] - 20 May 2026

### Added

- **T028 — Public MVP Polish Pass.** Applied focused public-facing UI/UX improvements to the static site. Changes: (1) `site/index.html` — added OG meta tags (`og:type`, `og:title`, `og:description`, `og:url`, `og:site_name`), canonical URL `https://atlas.caesar.no/`, updated header version badge to `v0.6.4 · 10 incidents · Live MVP`, updated notice banner (removed "Local MVP" / "Not publicly deployed" text, added "Public MVP live" and "not legal advice"), added About/Methodology panel in sidebar explaining the dataset, governance mapping chain, dataset metadata (10 records, v0.6.4, MVP verified 20 May 2026, GitHub Pages / static, source review in progress), and not-legal-advice disclaimer, added public footer with Live MVP, 10 curated records, v0.6.4, GitHub Pages / static, Not legal advice, caesar.no link. (2) `site/assets/styles.css` — added `.about-panel`, `.about-heading`, `.about-text`, `.about-mapping`, `.about-meta-list`, `.about-disclaimer`, `.app-footer`, `.footer-*` styles; added `focus-visible` outline rules for `.search-input`, `.sort-select`, `.filter-reset`, `.copy-link-btn`, `.footer-link`; improved mobile density (reduced padding on `.incident-card`, `.main`, `.app-header`, `.footer-inner`). (3) `site/assets/app.js` — updated `updateStatusPanel()` to show `v0.6.4` version, `Records` count, and `MVP verified 20 May 2026` instead of reading first-record source access date. (4) `site/robots.txt` — added (conservative: `Allow: /`, sitemap reference). (5) `site/sitemap.xml` — added (single URL: `https://atlas.caesar.no/`). No new incident records. No data, source, or legal content changes. No DNS/CNAME/hosting changes. No external dependencies.

### Status (T028)

- **Technical Public MVP**: LIVE + VERIFIED at `https://atlas.caesar.no/`
- **G-10**: PASS
- **G-01**: Pending — INC-0006 counsel confirmation unchanged
- **G-02**: Pending CT/counsel sign-off
- **New records**: 0
- **Data changes**: None
- **Source/legal changes**: None
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no external scripts, no analytics, repo root not exposed

### Validation (T028)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- `grep -R "../data/" site/assets/app.js site/index.html` — clean
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty
- No external scripts added; no analytics/tracking added
- `grep -R "upload-pages-artifact" .github/workflows/pages.yml` — confirmed
- `grep -R "path: site" .github/workflows/pages.yml` — confirmed

---

## [0.6.7] - 20 May 2026

### Added

- **T031 — Record G-01/G-02 Sign-Off with INC-0006 Accepted with Caution.** Explicit CT approval received and recorded. Created `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md` with: (1) full 12-gate status table (all gates closed/approved), (2) exact CT approval language, (3) G-01 final status (approved with caution; INC-0006 Reuters URL accepted), (4) G-02 final status (approved with caution; current MVP wording cleared), (5) INC-0006 caution note, (6) scope of approval, (7) exclusions, (8) next review triggers. Updated governance docs: `GOVERNANCE_SIGNOFF_PACK.md` (§5 completed with signed-off G-01/G-02 checkboxes; version 0.6.7), `GOVERNANCE_GATE_DECISION_RECORD.md` (§5 final decision recorded; version 0.6.7), `PUBLICATION_RISK_GATE.md` (G-01/G-02 marked approved with caution; summary updated), `RELEASE_CANDIDATE_GATE.md` (T031 status note). Updated lifecycle docs: `PROJECT_STATE.md` (v0.6.7, T031 complete), `NEXT_ACTIONS.md` (all gates closed, T032 options), `CHANGELOG.md`, `REPO_INVENTORY.md`, `README.md`, `site/README.md`. Created `work-items/T031-record-gates-signoff/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. No incident data, source URLs, or legal content changed. Branch: `governance/T031-record-gates-signoff`.

### Status (T031)

- **Technical Public MVP**: LIVE + VERIFIED at `https://atlas.caesar.no/`
- **G-10**: ✅ PASS
- **G-01**: ✅ APPROVED with caution — INC-0006 Reuters citation accepted with caution (20 May 2026)
- **G-02**: ✅ APPROVED with caution — current public MVP wording cleared (20 May 2026)
- **All 12 governance gates**: closed/approved
- **New records**: 0
- **Data changes**: None
- **Source/legal changes**: None
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no external scripts, no analytics, repo root not exposed, no incident data changes. Approval is narrow — current 10-record public MVP only. Not legal advice.

### Validation (T031)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- `grep -R "../data/" site/assets/app.js site/index.html` — clean
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty
- No external scripts added; no analytics/tracking added
- `grep -R "upload-pages-artifact" .github/workflows/pages.yml` — confirmed
- `grep -R "path: site" .github/workflows/pages.yml` — confirmed

---

## [0.6.6] - 20 May 2026

### Added

- **T030 — INC-0006 Counsel Review Follow-Up Packet.** Prepared narrow counsel/CT review packet for the last unresolved governance-risk item: INC-0006 Reuters citation. Created `COUNSEL_REVIEW_PACKET_INC0006.md` with: (1) narrow review question for CT/counsel, (2) current record status (no data change), (3) four decision options (A: accept with caution, B: seek external counsel, C: de-emphasize — future CT only, D: remove/replace — not recommended), (4) exact optional CT sign-off language for G-01 and G-02, (5) explicit scope boundary (not legal advice, not approval). Updated governance docs: `GOVERNANCE_GATE_DECISION_RECORD.md`, `GOVERNANCE_SIGNOFF_PACK.md`, `INC0006_SOURCE_RISK_DECISION_PACKET.md`, `PUBLICATION_RISK_GATE.md`, `RELEASE_CANDIDATE_GATE.md` (T030 status note added; G-01/G-02 remain pending). Updated lifecycle docs: `PROJECT_STATE.md` (v0.6.6, T030 complete), `NEXT_ACTIONS.md` (T030 status, T031 options), `CHANGELOG.md`, `REPO_INVENTORY.md`, `README.md`, `site/README.md`. Created `work-items/T030-inc0006-counsel-followup/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Branch: `governance/T030-inc0006-counsel-followup`.

### Status (T030)

- **Technical Public MVP**: LIVE + VERIFIED at `https://atlas.caesar.no/`
- **G-10**: PASS
- **G-01**: Pending — INC-0006 Reuters citation requires CT/counsel decision
- **G-02**: Pending CT/counsel sign-off (wording is sound)
- **New records**: 0
- **Data changes**: None
- **Source/legal changes**: None
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no external scripts, no analytics, repo root not exposed, no incident data changes, no G-01/G-02 approval claimed

### Validation (T030)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- `grep -R "../data/" site/assets/app.js site/index.html` — clean
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty
- No external scripts added; no analytics/tracking added
- `grep -R "upload-pages-artifact" .github/workflows/pages.yml` — confirmed
- `grep -R "path: site" .github/workflows/pages.yml` — confirmed

---

## [0.6.5] - 20 May 2026

### Added

- **T029 — Governance Gate Decision Pack.** Prepared final governance gate decision package for G-01 and G-02 after T025–T027 source/wording review work. Created `GOVERNANCE_GATE_DECISION_RECORD.md` with compact sections: (1) Current public MVP status (Technical Public MVP: LIVE + VERIFIED, 10 records, G-10 PASS), (2) G-01 source/license status table for INC-0001–INC-0010 (6 ready for sign-off, 3 sign-off with caution, 1 needs counsel review — INC-0006 Reuters citation), (3) G-02 wording/legal-risk status table (9 ready for sign-off, 1 sign-off with caution — INC-0006), (4) INC-0006 decision section with Options A/B/C assessment, (5) Final decision section. No explicit CT approval statements received in task prompt, so G-01/G-02 remain pending. Updated `GOVERNANCE_SIGNOFF_PACK.md` (T029 header note), `PUBLICATION_RISK_GATE.md` (T029 status), `RELEASE_CANDIDATE_GATE.md` (T029 status), `PROJECT_STATE.md` (v0.6.4, T029 complete), `NEXT_ACTIONS.md` (T029 status, T030 options), `REPO_INVENTORY.md` (T029 files). No records, sources, or legal content changed. No DNS/CNAME/hosting/secrets changes.

### Status (T029)

- **Technical Public MVP**: LIVE + VERIFIED at `https://atlas.caesar.no/`
- **G-10**: PASS
- **G-01**: Pending — INC-0006 Reuters citation needs counsel confirmation
- **G-02**: Pending CT/counsel sign-off (wording is sound)
- **New records**: 0
- **Data changes**: None
- **Source/legal changes**: None
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no external scripts, no analytics, repo root not exposed

### Validation (T029)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes
- `grep -R "../data/" site/assets/app.js site/index.html` — clean
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty
- No external scripts added; no analytics/tracking added
- `grep -R "upload-pages-artifact" .github/workflows/pages.yml` — confirmed
- `grep -R "path: site" .github/workflows/pages.yml` — confirmed

---

## [0.6.3] - 20 May 2026

### Added

- **T027 — Targeted INC-0006 Counsel/Source-Risk Resolution Pack.** Performed targeted manual source search for safer public-domain or official-record sources for INC-0006 (Amazon AI recruiting tool, Reuters-sourced). Search covered: official Amazon company pages, court/regulator/government records, EEOC guidance, US Congress hearing records, and independent academic/institutional records. Result: no qualifying safer source found. Reuters investigative report remains sole primary source. Wording confirmed adequately hedged — no data or wording changes made. Created `INC0006_SOURCE_RISK_DECISION_PACKET.md` with problem statement, search results, Options A/B/C assessment, wording risk assessment, recommended CT decision, proposed sign-off language, and disclaimer. Updated `SOURCE_RISK_HARDENING_REPORT.md` (T027 addendum), `GOVERNANCE_SIGNOFF_PACK.md` (INC-0006 G-01 and G-02 rows, T027 header note), `PROJECT_STATE.md` (v0.6.3), `NEXT_ACTIONS.md` (T027 status, T028 options), `CHANGELOG.md`, `REPO_INVENTORY.md`, `PUBLICATION_RISK_GATE.md`, `RELEASE_CANDIDATE_GATE.md`, `README.md`. Created `work-items/T027-inc0006-source-resolution/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Branch: `review/T027-inc0006-source-resolution`.

### Status (T027)

- **Technical Public MVP**: LIVE + VERIFIED at `https://atlas.caesar.no/`
- **G-10**: PASS
- **G-01**: Pending — INC-0006 Needs counsel review (unchanged)
- **G-02**: Pending CT/counsel sign-off
- **INC-0006 data**: No change
- **INC-0006 wording**: No change — already adequately hedged
- **Safer source found**: No
- **New incident records**: 0
- **Safety**: No DNS/CNAME/hosting changes, no secrets, no scraping, no new records, repo root not exposed

### Validation (T027)

- `python3 tools/validate_dataset.py` — PASS; 10 records; no data changes

---

## [0.6.2] - 20 May 2026

### Added

- **T026 — Source Risk Hardening Pass for Public MVP.** Reviewed INC-0005, INC-0006, INC-0008, INC-0009 for source/license exposure. Made minimal safe data changes: (1) INC-0005 — added CourtListener/RECAP court docket for Williams v. City of Detroit E.D. Mich. (`court_record`), making NIST FRVT + court record the primary source pair; ACLU demoted to supporting NGO documentation. (2) INC-0008 — added US Congress DEFIANCE Act S.3696 (118th Congress) public bill record (`regulator_report`); now grounded in company statement + UK OSA + US Congress public sources. (3) INC-0009 — added PubMed / NIH NLM PMID 31649194 public institutional index entry (`agency_report`); AAAS sole-reliance concern materially reduced. (4) INC-0006 — no change; Reuters remains sole primary source; no safe replacement found; counsel review still recommended. Updated `GOVERNANCE_SIGNOFF_PACK.md`: INC-0009 upgraded from Needs counsel review → Sign-off with caution; G-01 risk summary now 6 ready / 3 sign-off with caution / 1 needs counsel review. Created `SOURCE_RISK_HARDENING_REPORT.md`. Synced root `data/incidents/` → `site/data/incidents/` for INC-0005, INC-0008, INC-0009. No new records created. No scraping. No DNS/CNAME/hosting changes. No secrets. Updated PROJECT_STATE.md (v0.6.2, T026 complete), NEXT_ACTIONS.md (T026 status, T027 options), CHANGELOG.md (this entry), REPO_INVENTORY.md (T026 files), PUBLICATION_RISK_GATE.md, RELEASE_CANDIDATE_GATE.md, README.md. Created `work-items/T026-source-risk-hardening/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Branch: `review/T026-source-risk-hardening`.

### Validation (T026)

- `python3 tools/validate_dataset.py` — exits 0; all checks passed; 10 records.
- `grep -R "../data/" site/` — clean.
- `find site -maxdepth 4 (CNAME/work-items/docs)` — empty.
- Root data ↔ site/data sync confirmed for all 3 changed records.
- Schema validation: INC-0005, INC-0008, INC-0009 with additional sources — PASS.

---

## [0.6.1] - 20 May 2026

### Added

- **T025 — Source/License + Wording Review Sign-Off Pack.** Prepared compact governance sign-off pack for G-01 and G-02 gates. Created `GOVERNANCE_SIGNOFF_PACK.md` with: (1) status summary, (2) G-01 source/license review table for INC-0001–INC-0010 with risk levels and recommended CT decisions, (3) G-02 wording/legal-risk table with defamation/liability assessment, (4) high-risk wording checklist with scan results (no red flags), (5) CT sign-off placeholder section. G-01: 6 records ready for sign-off, 2 sign-off with caution, 2 need counsel review (INC-0006 Reuters T&Cs, INC-0009 AAAS academic fair use). G-02: 9 records ready for sign-off, 1 sign-off with caution (INC-0006 company characterization). No new records created. No wording revisions required. Updated PROJECT_STATE.md (v0.6.1, T025 complete), NEXT_ACTIONS.md (T025 status, T026 options), CHANGELOG.md (this entry), REPO_INVENTORY.md (T025 files), README.md (Project Status). Created `work-items/T025-source-wording-signoff-pack/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Branch: `review/T025-source-wording-signoff-pack`.

### Validation (T025)

- `python3 tools/validate_dataset.py` — exits 0; all checks passed; 10 records.
- `grep -R "../data/" site/` — clean.
- `find site -maxdepth 4 (CNAME/work-items/docs)` — empty.
- Wording risk scan — no prohibited terms found; "fraud" in INC-0004 used appropriately to describe system purpose per court case.

---

## [0.6.0] - 20 May 2026

### Added

- **T024 — Public MVP Status Lock + Product Polish Backlog.** Locked technical Public MVP status as **LIVE + VERIFIED** following Control Tower manual browser confirmation (G-10 PASS, 20 May 2026). Created `PRODUCT_POLISH_BACKLOG.md` with five sections: Public MVP polish items, Dataset expansion candidates, Governance OS integration backlog, Technical backlog, and Hard gates for future work. Created `work-items/T024-public-mvp-lock/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Updated PROJECT_STATE.md (v0.6.0, T024 complete), NEXT_ACTIONS.md (T024 status, T025 options), CHANGELOG.md (this entry), REPO_INVENTORY.md (T024 files), PUBLICATION_RISK_GATE.md (G-10 PASS), RELEASE_CANDIDATE_GATE.md (T024 status), DEPLOYMENT_READINESS_CHECKLIST.md (v0.6.0), README.md (Project Status), site/README.md (status). Branch: `status/T024-public-mvp-lock`.

### Status (T024)

- **Technical Public MVP**: LIVE + VERIFIED at `https://atlas.caesar.no/`
- **Deployment**: GitHub Pages via GitHub Actions
- **Public root**: `site/`
- **G-10**: ✅ **PASS** — Control Tower manual browser confirmation on 20 May 2026
- **G-01**: ⚠ **Pending** — CT source/license sign-off required
- **G-02**: ⚠ **Pending** — CT/counsel wording/legal-risk review required
- **Dataset**: 10 records (INC-0001 through INC-0010), no new records added
- **Safety**: No DNS changes, no CNAME added, no custom domain changes, no secrets, no scraping, no external hosting config

### Validation (T024)

- `python3 tools/validate_dataset.py` — exits 0; all checks passed; 10 records
- `curl -sI https://atlas.caesar.no/` — HTTP 200
- `curl -sI http://atlas.caesar.no/` — HTTP 301 → `https://atlas.caesar.no/`
- `curl -sI https://atlas.caesar.no/data/incident-index.json` — HTTP 200
- `gh api repos/caesar-compliance/caesar-ai-incident-atlas/pages` — status: built; cname: atlas.caesar.no; https_enforced: true
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty (clean)
- Workflow `path: site` — confirmed, uploads only `site/`

---

## [0.5.9] - 20 May 2026

### Added

- **T023 — Manual Browser Smoke Test + HTTP-to-HTTPS Redirect Verification.** Confirmed HTTP→HTTPS redirect propagation: `http://atlas.caesar.no/` returns 301 → `https://atlas.caesar.no/`. `https://atlas.caesar.no/` returns HTTP 200. `https://atlas.caesar.no/data/incident-index.json` returns HTTP 200 with all 10 records (INC-0001 through INC-0010) confirmed in JSON. Default GitHub Pages URL `https://caesar-compliance.github.io/caesar-ai-incident-atlas/` redirects 301 to `https://atlas.caesar.no/`. `gh api` confirms: status=built, cname=atlas.caesar.no, https_enforced=true, certificate=approved. `python3 tools/validate_dataset.py` — PASS (10 records). Site files: 21 files confirmed, no CNAME, no internal docs in `site/`, workflow uploads only `site/`. G-10 HTTP/redirect/data checks: PASS. Interactive 14-step browser UI test (search/filter/sort/DevTools) requires manual CT verification — not claimed as PASS. G-01/G-02 remain pending. Created `work-items/T023-browser-smoke-redirect/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Updated PROJECT_STATE.md, NEXT_ACTIONS.md, PUBLICATION_RISK_GATE.md, RELEASE_CANDIDATE_GATE.md, DEPLOYMENT_READINESS_CHECKLIST.md, REPO_INVENTORY.md, README.md, site/README.md. Branch: `verify/T023-browser-smoke-redirect`.

### Validation (T023)

- `python3 tools/validate_dataset.py` — exits 0; all checks passed; 10 records.
- `curl -sI http://atlas.caesar.no/` — HTTP 301 → `https://atlas.caesar.no/` ✅ redirect confirmed.
- `curl -sI https://atlas.caesar.no/` — HTTP 200 ✅.
- `curl -sI https://atlas.caesar.no/data/incident-index.json` — HTTP 200 ✅.
- `curl -sI https://caesar-compliance.github.io/caesar-ai-incident-atlas/` — HTTP 301 → `https://atlas.caesar.no/` ✅.
- `gh api repos/caesar-compliance/caesar-ai-incident-atlas/pages` — status: built; https_enforced: true; cname: atlas.caesar.no.
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty (clean).
- Workflow `path: site` — confirmed, uploads only `site/`.

---

## [0.5.8] - 20 May 2026

### Added

- **T022 — Post-Deploy Verification + GitHub Pages / Custom Domain Closeout.** Verified live GitHub Pages deployment. Custom domain `atlas.caesar.no` confirmed active via `gh api` (cname: `atlas.caesar.no`, status: `built`, build_type: `workflow`). HTTPS certificate state: `approved` (expires 2026-08-18). Enforce HTTPS enabled via GitHub API (T022). Default GitHub Pages URL `https://caesar-compliance.github.io/caesar-ai-incident-atlas/` redirects (301) to `https://atlas.caesar.no/`. `https://atlas.caesar.no/` returns HTTP 200. `http://atlas.caesar.no/` returns HTTP 200 (enforcement propagation pending CDN). `python3 tools/validate_dataset.py` — exits 0; 10 records; all checks passed. No CNAME file in repo. No secrets. Repo root not exposed. Workflow uploads only `site/`. Created `work-items/T022-post-deploy-closeout/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Updated `PROJECT_STATE.md` (v0.5.8, T022 complete), `NEXT_ACTIONS.md` (deployment facts, T022 status), `PUBLICATION_RISK_GATE.md` (G-03 pass, G-10 partial), `RELEASE_CANDIDATE_GATE.md` (T022 status), `DEPLOYMENT_READINESS_CHECKLIST.md` (live state), `REPO_INVENTORY.md` (T022 files), `README.md` (live URL), `site/README.md` (live status). Branch: `deploy/T022-post-deploy-closeout`.

### Validation (T022)

- `python3 tools/validate_dataset.py` — exits 0; all checks passed; 10 records.
- `curl -sI https://atlas.caesar.no/` — HTTP 200.
- `gh api repos/caesar-compliance/caesar-ai-incident-atlas/pages` — status: built; cname: atlas.caesar.no; https_certificate: approved; https_enforced: true.
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty (clean).
- Workflow `path: site` — confirmed, uploads only `site/`.

---

## [0.5.7] - 20 May 2026

### Added

- **T021 — GitHub Pages Deployment Activation (Default URL).** G-12 cleared by explicit Control Tower instruction: `"Approve public deployment"`. Created `.github/workflows/pages.yml`: GitHub Actions workflow deploying `site/` directory to GitHub Pages on push to main. Created `site/.nojekyll`: empty file to disable Jekyll processing. Updated `PROJECT_STATE.md` (T021 active, G-12 cleared). Updated `NEXT_ACTIONS.md` (T021 active). Updated `PUBLICATION_RISK_GATE.md` (G-12 cleared, GO for default URL deployment). Updated `RELEASE_CANDIDATE_GATE.md` (T021 status). Updated `DEPLOYMENT_READINESS_CHECKLIST.md` (G-12 cleared, Option A active). Updated `REPO_INVENTORY.md` (T021 files). Created `work-items/T021-github-pages-default-url/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Custom domain (`atlas.caesar.no`) deferred to T022. No CNAME. No DNS. Repo root not exposed.

### Validation (T021)

- `python3 tools/validate_dataset.py` — exits 0; all checks passed; 10 records; 4 site files.
- `test ! -f site/CNAME` — confirmed no CNAME file.
- Workflow uploads only `site/` path.

---

## [0.5.6] - 20 May 2026

### Added

- **T019 — Public Release Gate Closure + Deployment Readiness Branch.** `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md`: consolidated gate evidence — current release state table, G-01/G-02 source and wording evidence assessments (evidence reviewed, CT sign-off required), G-03 hosting recommendation table, G-10 static file-level checks + 14-step manual browser checklist, remaining blocker table, explicit NO-GO statement, no-legal-advice disclaimer. `DEPLOYMENT_READINESS_CHECKLIST.md`: pre-deploy technical and governance checks, deploy steps for GitHub Pages/Cloudflare Pages/Netlify, what must not be exposed, rollback steps, and exact approval phrase required (`"Approve public deployment"`). Created `work-items/T019-public-release-gate-readiness/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md (DEC-101 through DEC-107). Updated `PROJECT_STATE.md` (v0.5.6), `NEXT_ACTIONS.md`, `PUBLICATION_RISK_GATE.md` (references added, NO-GO preserved), `RELEASE_CANDIDATE_GATE.md` (T019 status note), `REPO_INVENTORY.md`. Branch: `release/T019-public-release-gate-readiness`. No deployment. No approval. NO-GO status preserved.

### Validation (T019)

- `python3 tools/validate_dataset.py` — exits 0; all checks passed; 10 records; 18 site files.
- `grep -R "../data/" site/assets/app.js site/index.html site/README.md` — empty (clean).
- `find site -maxdepth 3 -type f | sort` — 18 files confirmed.
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/.github/*" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty (clean).

---

## [0.5.5] - 20 May 2026

### Added

- **T018A — Public Release Gate Review Pack.** `PUBLIC_RELEASE_REVIEW_PACK.md`: comprehensive review materials for Control Tower including repository status table, source/license review table (INC-0001–INC-0010), wording/legal-risk review table, manual browser smoke-test checklist (G-10), and Control Tower sign-off checklist. Created `work-items/T018A-public-release-gate-review-pack/` with TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md. Updated `README.md` Project Status to reflect post-T017 state. Updated `PUBLIC_DEPLOYMENT_PLAN.md` §4 to reflect T017 path fix completion. Updated `T017_DEPLOYMENT_IMPLEMENTATION_RECOMMENDATION.md` with superseded/completed note. Updated `PUBLICATION_RISK_GATE.md` with reference to review pack. No deployment. No approval. NO-GO status preserved.

- **T017 — Static Publish Package Preparation.** `site/data/` created with 10 incident JSON files, 6 taxonomy JSON files, and a publish-copy `incident-index.json` with site-root-relative paths. `site/assets/app.js` updated: `../data/incident-index.json` → `data/incident-index.json`. `site/` is now fully self-contained and can be served as the static root. `tools/validate_dataset.py` extended with checks 7–10: `site/data/` existence, incident sync (SHA-256), taxonomy sync (SHA-256), `app.js` path check. No deployment config added.

---

## [0.5.4] - 19 May 2026

### Added

- **T016 — Public Deployment Plan.** `PUBLIC_DEPLOYMENT_PLAN.md`: URL options, publish boundary, path fix requirement, rollback, update process, approval steps. `HOSTING_OPTION_MATRIX.md`: 5-option comparison (GitHub Pages, Cloudflare Pages, Netlify, VPS, Coolify). `PUBLICATION_RISK_GATE.md`: 12-criterion go/no-go table (5 pass, 6 pending, 1 hard blocker: CT approval). `T017_DEPLOYMENT_IMPLEMENTATION_RECOMMENDATION.md`: step-by-step T017 plan. Key finding: `../data/` path fix required in T017 before deployment.

---

## [0.5.3] - 19 May 2026

### Added

- **T015 — Static Site Release Candidate Hardening.** `tools/requirements.txt` (`jsonschema>=4.0.0`). `STATIC_SITE_RC_REVIEW.md`: full 22-area RC review table — local RC verdict PASS. Updated `RELEASE_CANDIDATE_GATE.md` with T015 check completions (18 of 22 items satisfied locally; 3 governance items block public deployment). No functional site changes required.

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
