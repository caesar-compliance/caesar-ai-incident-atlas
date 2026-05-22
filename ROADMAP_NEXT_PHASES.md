# Roadmap — Next Phases — caesar-ai-incident-atlas

**Created:** 20 May 2026 (T032)
**Last updated:** 22 May 2026 (T072)
**Baseline:** Public MVP v0.13.0. 13 records. INC-0013 (EDPB guidance, first real adapter-detected case) published under CT approval.
**Status:** Active MVP. INC-0013 live. Promotion pipeline fully operational. T067 dry-run, T068 signoff, T069 candidate, T070 blocker-resolution, T071 hosted private sync readiness, and T072 private runtime activation tranche 1 complete. Next: T073.

See `PUBLIC_MVP_BASELINE_FREEZE.md` for frozen baseline rules.
See `ROADMAP.md` for the full historical phase plan.

---

## v0.7 — Dataset Expansion Planning

**T033 complete** — planning criteria, source gates, review workflow, candidate template created.
**T034 complete** — 15 planning-only candidates drafted; triage matrix and 12-gate checklist created.
**T035 complete** — Source packs for all 8 P1 candidates. 6 CT-ready; CAND-002 deferred (needs Tier 1); CAND-004 counsel-gated. First batch: CAND-013, CAND-008, CAND-011, CAND-010.
**T036 complete** — First drafting batch selected: CAND-013, CAND-008, CAND-011, CAND-010. All remain `not_approved_candidate`.
**T037 complete** — Batch-1 source packs finalized. Source URLs verified. See `BATCH1_FINAL_SOURCE_PACKS.md`, `BATCH1_DRAFTING_READINESS_MATRIX.md`, `BATCH1_SOURCE_URL_REGISTER.md`.
**T038 complete** — First new incident record drafted from CAND-013: INC-0011 (Spirometry race bias). Dataset now 11 records.
**T039 complete** — INC-0011 G-01/G-02 signed off with caution. INC-0011 live and governance-approved. See `INC0011_GATE_SIGNOFF_RECORD.md`.
**T040 complete** — INC-0012 drafted from CAND-008 (AI hiring disability bias). Dataset: 12 records. INC-0012 prepared for CT review. See `INC0012_GOVERNANCE_REVIEW_NOTE.md`.
**Next:** T041 — INC-0012 Source/Wording Gate Sign-Off + Live Smoke Test.
**Prerequisite:** CT approval required before INC-0012 is treated as governance-approved. G-01/G-02 approval for INC-0001–INC-0011 does not extend to INC-0012.

**Candidate selection criteria (planning gate):**
- Incident must be publicly reported with at least one verifiable primary source.
- Primary source must be a public-domain court record, official government document, peer-reviewed publication, or credible major news outlet.
- Source must be citeable by URL only — no reproduction of third-party article text.
- Incident must add failure mode, sector, or control diversity not already covered by INC-0001–INC-0010.
- Source risk must be assessed and accepted before record creation.
- No mass import, scraping, or automated dataset ingestion.

**Required source categories (minimum quality gates):**
- Court records / official regulatory decisions — preferred tier (public domain).
- Government/regulatory publications (NTSB, EEOC, NHS, etc.) — preferred tier.
- Peer-reviewed publications (NIH, Science, Nature, ACM, IEEE) — acceptable with care.
- Major credible news sources — acceptable with "reportedly" hedging and no text reproduction.
- AIID / AIAAIC / OECD — discovery pointer only; license review required before any data use.

**Suggested planning list (5–10 candidate incidents — planning only, no records):**
- AI-generated legal/professional content harms (expansion of FM-HALL).
- Automated public benefits denial systems (expansion of FM-BIAS/FM-UNAUTH in public sector).
- AI hiring/assessment tool discrimination cases with regulatory findings.
- Healthcare triage/resource allocation algorithm bias.
- Financial services AI credit/risk scoring discrimination.
- Autonomous drone/robotics safety incidents.
- AI-generated media deepfake harms (expansion of FM-PRIV/FM-SAFE).
- Education/proctoring AI bias or unreliability incidents.
- Generative AI prompt injection or tool misuse in enterprise settings.
- AI agent unauthorized action in regulated domain (FM-UNAUTH).

**Hard gates:**
- No record creation without CT explicit approval for each new record or batch.
- No source used without passing the source risk gate.
- No third-party text copied into any record or planning document.

---

## v0.8 — Strategic Pivot & Integration Mapping (v0.8.0)

**Status:** In Progress / Strategic Pivot Complete (21 May 2026)

**Goal:** Reorient the product from a public incident database to the Caesar AI Legal & Governance Case Atlas (Case-to-Control Intelligence Layer), define the conceptual watcher/ingestion pipeline, map future Governance OS integrations, and establish watcher validation script specifications.

**Completed strategic deliverables:**
- `PRODUCT_PIVOT_LEGAL_GOVERNANCE_CASE_ATLAS.md` — strategic positioning and core value chain.
- `CASE_TO_CONTROL_PRODUCT_MODEL.md` — 21-field case schema, vendor questions, and training lesson outputs.
- `AUTOMATION_AND_PUBLISHING_POLICY.md` — source-tiered discovery, gating, and clean-room policies.
- `DIGEST_PRODUCT_MODEL.md` — weekly/monthly digest schedules, RSS feed architectures.
- `SOURCE_REGISTRY_AND_WATCHER_ARCHITECTURE.md` — 10-stage automated watcher/ingestion conceptual architecture.
- `REFERENCE_LAB_USAGE_NOTE.md` — reference lab separation, CC ShareAlike & copyleft rules.

**T043 complete (21 May 2026):**
- Created pipeline schemas (`source.schema.json`, `candidate.schema.json`, `case-draft.schema.json`).
- Drafted source catalog (`sources.yml`) in inactive status.
- Implemented and verified the offline pipeline schema validator script `tools/validate_pipeline_schemas.py`.
- Formulated the automation policy suite under `docs/automation/`.

**T044 complete (21 May 2026):**
- Developed the first visible static digest layer, including weekly operational briefs, monthly strategic trend summaries, and a consolidated digests portal page.
- Created robust, standalone ES modules scripts for validation (`scripts/validate-digests.mjs`) and RSS feed compilation (`scripts/build-rss-feeds.mjs`).
- Generated valid, compliant RSS 2.0 XML feeds (`rss.xml`, `weekly.xml`, `monthly.xml`) pointing back to verified routes.
- Integrated the new digests portal elegantly into the primary homepage sidebar without altering the core index layout.

**T045 complete (21 May 2026):**
- Built an offline, sandboxed mock auto-discovery prototype pipeline (watch sources → candidates → dedupe → draft case packs → digest preview).
- Extended the candidate schema status enum to support pipeline tracking and wrote a python-based schema validator.
- Deployed a robust sandboxing auditor to guarantee zero data leakage of mock data into production site paths or client sitemaps/RSS feeds.
- Formulated the developer operations guide under `docs/automation/MOCK_PIPELINE_RUNBOOK.md`.

**T046 complete (21 May 2026):**
- Created high-fidelity, local-only Review Console UI (`tools/review-console/`) with responsive dark mode and glassmorphism.
- Implemented robust, dynamic bundle aggregator (`scripts/build-review-bundle.mjs`) to generate offline-only review metadata databases.
- Deployed comprehensive automated review validators (`scripts/validate-review-console.mjs`) ensuring zero leakages or synthetic data promotions under `site/`.
- Drafted curator workflow, checklists, and promotion gate policies under `docs/review/` and stored simulated decisions in `data/reviews/mock/mock-review-decisions.json`.

**T047 complete (21 May 2026):**
- Deployed real manual CLI Green-source watcher engine (`scripts/watch-green-sources.mjs`) to fetch index listings/feeds, parse them with custom regex tools, filter by AI keywords, and log real discovered incident candidates.
- Built a duplicate checker engine (`scripts/dedupe-real-candidates.mjs`) verifying candidates via URL and SHA-256 dedupe keys.
- Programmed a real review bundle compiler (`scripts/build-real-review-bundle.mjs`) aggregating discovered candidates into local review databases.
- Integrated interactive bundle swapping in local-only Review Console UI with stylized `PROMOTION BLOCKED` warning banners and metadata note panels.
- Hardcoded a multi-vector safety auditor (`scripts/validate-real-watcher.mjs`) ensuring 100% strict compliance boundaries, Green-only targets, and zero public leaks under `site/`.
- Authored the operator runbook under `docs/watch/REAL_GREEN_SOURCE_WATCHER_RUNBOOK.md`.

**Next implementation focus:**
- Refine clean-room automated translation capabilities and policy gates.
- Deepen commercial & failure-mode taxonomy mapping rules and programmatic heuristics.

**Mapping exercise (21-field schema):**

For each of the 12 (and future) case records, map to:

| Case Field | Integration Target |
|---|---|
| `failure_mode` | Failure mode — caesar-ai-evidence |
| `missing_controls` | Affected control — Governance OS control library |
| `required_evidence` | Required evidence object — caesar-ai-evidence schema |
| `training_lesson` | Governance training — Governance OS risk intelligence |
| `case_id` + metadata | Future evidence object ID anchor |
| `missing_controls` | Future Governance OS control object reference |

**Hard gates:**
- No automated collection or scraping scripts live until validation tools are signed off by the Control Tower.
- No integration code implemented until CT approves implementation scope.
- No changes to `caesar-ai-evidence` or sibling repositories from this repository.

---

## v0.9 — Public Quality Polish

**Status:** Planned — can begin after v0.7 or in parallel with planning.
**Prerequisite:** No new records required. Can proceed on current 10-record baseline.

**Items:**
- Accessibility pass — WCAG 2.1 AA compliance check; remediate identified gaps.
- Mobile polish — card density, detail panel layout, filter chip wrapping.
- Citation/source panel clarity — clearer source type labels and confidence explanations.
- Print/export view — clean print stylesheet for individual incident cards.
- Methodology/about page refinement — more explicit governance mapping explanation.
- Light SEO improvements — structured metadata, title tags, description tags. No marketing overclaims.
- Automated link checker for source URLs (tooling only, no scraping).
- Regression smoke checklist formalized for releases.

**Hard gates:**
- No new incident records in v0.9.
- No external frontend dependencies added.
- No analytics or tracking added.
- No DNS/domain changes without CT approval.

---

## v1.0 — Expanded Public Release Criteria

**Status:** Future — requires completing v0.7–v0.9 first.

**Minimum criteria for v1.0:**
- Larger dataset threshold — suggested minimum 25+ records across all major failure mode categories; exact threshold requires CT approval.
- Source/license gate passed for every record — no record published without passing source risk review.
- Wording/legal gate passed for every record — G-01/G-02 equivalent review for all records including INC-0011+.
- Regression smoke test passed before every release.
- Release notes published with each release.
- Rollback process documented and tested.
- Counsel/CT sign-off rules formalized for expansion beyond current non-commercial MVP.
- Export format stable and documented for `caesar-ai-evidence` integration.

**Prerequisite governance work:**
- New G-01/G-02 gate cycle for any new records added.
- New counsel review if broader commercial or licensed distribution is planned.
- AIID CC BY-SA 4.0 ShareAlike clause reviewed before any AIID data import.
- OECD/AIAAIC license verifications completed before any data from those sources is used.

---

## v1.5 — Private Review Console UI + Review Decision Packets (T063 — 21 May 2026)

**T063 complete** — implemented local-only review decisions and draft packets workflow, patch CLI tool, upgraded review console UI, and strict safety validation.
- Private review decision schema, decision builder, patch CLI, draft candidate packet builder, review console decision exports, and dry-run hosted payloads.
- Bounded runner script `scripts/run-private-review-workflow.mjs` and `--review-intake-only` local automation cycle integration.
- Upgraded Review Console UI to support private records visual cards and checklists.
- Safety: Enforces zero public leaks, public count remains 13, no INC-0014.

## v1.4 — Private Candidate Review Intake (T062 — 21 May 2026)

**T062 complete** — converted T061 real Green-source candidate signals into structured private review intake records.
- Schema, builder, console exporter, hosted payload dry-run exporter, and validation suite.
- Safety: Enforces zero public leaks, public count remains 13, no INC-0014.

## v1.3 — Bounded Real Green-Source Manual Run (T061 — 21 May 2026)

**T061 complete** — executed the first real Green-source monitoring run (`GREEN-RUN-20260521-202417`), successfully fetching from official sites, reporting failures cleanly, and generating 4 candidate signals.

## v1.2 — Manual Watch Run Queue (T060 — 21 May 2026)

**T060 complete** — Real automation layer without live connections.

- Manual watch-run queue: 7 green sources enumerated, no network fetch
- Private run envelope: `WATCH-RUN-YYYYMMDD-HHMMSS`, status `queued`, all counters 0
- Hosted payloads: `atlas-watch-run.manual-latest.json` + `atlas-watch-run-queue.manual-latest.json` (dry_run_export)
- `validate-manual-watch-run.mjs`: 16-check safety suite
- `run-local-automation-cycle.mjs`: optional `--with-watch-queue` flag
- `export-ops-status.mjs`: `manual_watch_run_status: queue_ready`
- `validate-hosted-sync-safety.mjs`: extended to 31 checks

**Next T061:** Execute real watch run (`node scripts/watch-green-sources.mjs`), promote top candidate, or activate hosted infrastructure.

---

## v1.11 — Private Publication Blocker Resolution Dossier + Runtime-Handoff Sync (T070 — 22 May 2026)

**T070 complete** — Private publication blocker-resolution schema, builder, console review exporter, hosted dry-run payloads, and offline validation runner.
- Enforced deterministic blocker resolution dossier ID and strict publication bounds: `public_publish_allowed`, `real_promotion_packet_allowed`, `public_preview_allowed`, and `public_record_creation_allowed` are strictly `false`.
- Created `build-private-publication-blocker-resolution.mjs` compiling signoffs, dry-runs, draft packages, and private promotion-packet candidates.
- Evaluated and classified T068 blockers; only purely technical private-package preparation blocker ("no promotion packet created") is marked resolved (supported by T069 candidate evidence), while remaining 5 human, legal, and Control Tower blockers stay blocked.
- Exported console data and sanitized hosted dry-run payloads for `atlas_private_publication_blocker_resolutions` table.
- Extended `validate-hosted-sync-safety.mjs`, `export-ops-status.mjs`, and Review Console UI to load, display, and validate the blocker resolution dossier.
- Safety: Enforces zero remote writes, public count remains 13, latest record INC-0013, zero leaks under `site/`.

**Next T071:** Complete.

---

## v1.12 — Hosted Private Review-State Sync Readiness (T071 — 22 May 2026)

**T071 complete** — Hosted private review-state sync boundary: schema, additive Supabase migration draft, Cloudflare Worker route contract, mock route contract local test, sanitized payload builder and exporters, workflow runner, and Review Console visual panel.
- Schema: Enforces strict boundary rules (dry-run mode, remote write and deployment strictly false, public publishing false).
- Supabase: Created `infra/supabase/migrations/002_private_review_state_sync.sql` defining an additive `atlas_private_review_state_snapshots` table draft.
- Worker: Added local mock route endpoints for GET and POST sync dry-run, and route contract document.
- Safety: Fully verified sanitization, zero remote writes, public count exactly 13, zero leaks under `site/`.

**Next T072:** Complete.

---

## v1.13 — Private Runtime Activation Tranche 1 (T072 — 22 May 2026)

**T072 complete** — Private runtime activation tranche 1: database migration preflight checks, guarded dry-run/live migration apply harness, read-only live database prober, metadata snapshot writer, workflow validation runner, and Review Console widgets implemented and verified in dry-run mode.
- Preflight: Designed preflight script `scripts/preflight-supabase-private-review-state-apply.mjs` verifying SQL safety.
- Apply: Created `scripts/apply-supabase-private-review-state.mjs` applying the sync table migration.
- Probe: Programmed read-only prober `scripts/probe-supabase-private-review-state-live.mjs` testing database shape compatibility.
- Write: Implemented `scripts/write-private-review-state-snapshot.mjs` writing metadata-only private review-state snapshots.
- Validator: Created workflow coordinator `scripts/run-private-runtime-activation-workflow.mjs` and validation script `scripts/validate-private-runtime-activation.mjs`.
- Console UI: Upgraded Review Console UI with a dedicated "Private runtime activation" dashboard displaying active migration target, statuses, and boundaries.
- Safety: Enforced zero remote writes/actions as no live approved env markers were provided. Public count remains strictly 13, latest remains INC-0013.

**Next T073:** Cloudflare Worker private runtime deploy/probe if Supabase is live, otherwise T073 approved live Supabase activation.

---

## v1.10 — Private Promotion-Packet Candidate Package + Controlled Signoff Checklist Update (T069 — 22 May 2026)

**T069 complete** — Private candidate packet schema, compiler builder, console metadata widgets, Supabase dry-runs, and workflow validation runner.
- Enforced deterministic candidate package ID and checklist separation: `private_package_preparation_checklist` is verified while publication remains strictly blocked.
- Created `build-private-promotion-packet-candidate.mjs` compiling signoffs, dry-runs, and shaped candidate packages.
- Exported console widgets and sanitized hosted dry-run payloads for `atlas_private_promotion_packet_candidates` table.
- Updated `validate-hosted-sync-safety.mjs`, `export-ops-status.mjs`, and Review Console UI to load and render candidates.
- Safety: Enforces zero remote writes, public count remains 13, latest record INC-0013, zero leaks under `site/`.

**Next T070:** Controlled Private Review and Publication Blocker Resolution.

---

## v1.9 — Controlled Private Promotion Review/Signoff (T068 — 21 May 2026)

**T068 complete** — Signoff schema, builder, apply decisions, review console update, hosted payloads export, safety validations.
- Developed `private-promotion-signoff.schema.json` with strict blockers validation.
- Created `build-private-promotion-signoff.mjs` compiling signoffs from T067 dry-runs.
- Provided local decision patcher `apply-private-promotion-signoff-decision.mjs` for human curator review dimensions.
- Updated local Review Console UI and exported dry-run signoff payload for `atlas_private_promotion_signoffs`.
- Built validator `validate-private-promotion-signoff.mjs` to enforce strict blocked state (6 blockers unresolved).

**Next T069:** Controlled promotion-packet candidate package (private dry-run only).

---

## v1.8 — Private Promotion-Packet Dry-Run Preparation (T067 — 21 May 2026)

**T067 complete** — Caesar-native dry-run preparation schema, builder, console export, hosted dry-run payloads, and safety validator.
- Built dry-run bundle from T066 package including governance chain, proposed summary, legal review checklist, and publication blockers.
- Exported metadata console summary to `tools/review-console/data/private-promotion-dry-run.json`.
- Formatted sanitized Supabase dry-run payload for `atlas_private_promotion_dry_runs` table.
- Created `validate-private-promotion-dry-run.mjs` validator with 24 checks covering schema, referential integrity, and safety booleans.
- Workflow runner script `scripts/run-private-promotion-dry-run-workflow.mjs` orchestrating stages.

**Next T068:** Controlled Private Promotion Review/Signoff.

---

## v1.7 — Private Draft Candidate Packet Shaping (T066 — 21 May 2026)

**T066 complete** — Shaped approved private draft candidate packet into a richer Caesar-native private draft candidate package with strict metadata schemas and console UI widgets.

- Designed strict schema `private-draft-candidate-package.schema.json` with draft status, readiness blocks, and safety flags.
- Built compiler `build-private-draft-candidate-package.mjs` synthesizing the metadata governance chain.
- Exported console data `export-review-console-private-draft-candidate-data.mjs` and Supabase dry-run payloads `export-hosted-private-draft-candidate-payloads.mjs`.
- Implemented workflow runner `run-private-draft-candidate-workflow.mjs` and custom offline validator `validate-private-draft-candidate-package.mjs`.
- Upgraded Review Console UI widgets and panels to render shaped packages safely.
- Safety: Zero public leaks, public count remains 13, no INC-0014, all safety flags evaluated.

**Next T067:** Private Promotion-Packet Dry-Run Preparation.

---

## v1.6 — Controlled Private Intake Approval (T065 — 21 May 2026)

**T065 complete** — Controlled approval of exactly one private candidate intake record and draft-candidate ready packet.

- Selected high-relevance ICO AI and Algorithms record as the test-bed candidate.
- Local-only active approved marker builder (`create-active-private-draft-approval.mjs`) to verify signature.
- Generated exactly 1 active approval marker under `data/reviews/approvals/active-markers/`.
- Promoted 1 review decision to `approve_for_private_draft` and built exactly 1 draft-candidate packet.
- Upgraded review console data exporter to dynamically overlay active approvals on templates.
- Configured dynamic validators and safety checks to support the controlled state.
- Integrated dynamic active approvals count into ops status outputs.
- Regression tests suite (`test-controlled-private-draft-approval.mjs`) verifying containment, duplicate rejection, and schema safety.

**Next:** T066 private draft candidate packet shaping.

---

## v1.5 — Explicit Private Draft Approval Gate (T064 — 21 May 2026)

**T064 complete** — Local-only explicit approval gate and dry-run promotion.

- Local-only explicit approval marker schema (`private-draft-approval-marker.schema.json`).
- Template generator (`create-private-draft-approval-template.mjs`) generating disabled templates.
- Approvals validator (`validate-private-draft-approval-markers.mjs`) ensuring zero active approvals.
- CLI approval applier (`apply-explicit-private-draft-approval.mjs`) requiring matching parameters and verifying signature.
- Programmatic end-to-end gate integration test suite (`test-private-draft-approval-gate.mjs`).
- Upgraded controlled draft packet builder and decisions validator to strictly enforce dynamic active approval markers.
- Upgraded review console UI exports and widgets to show explicit approval requirements.
- Updated hosted payload exporter, safety validator, and ops status status checks.

**Next T065:** Actual controlled approval of one selected intake.

---

## v1.4 — Reset Private Draft Approval and Restore Baseline (T063-FIX — 21 May 2026)

**T063-FIX complete** — Reset all decisions to `needs_more_review` default status.

- Restored baseline of 0 approved decisions and 0 packets.
- Tightened decisions validator to block unauthorized baseline approvals.

---

## v1.3 — Private Review Console UI and Review Decision Packets (T063 — 21 May 2026)

**T063 complete** — Private review decisions and draft packets workflow.

- Private review decision schema (`private-review-decision.schema.json`).
- Decision builder (`build-private-review-decisions.mjs`) and CLI patch applier (`apply-private-review-decision.mjs`).
- Local draft candidate packet builder (`build-private-draft-candidate-packets.mjs`).
- Integrated review console UI showing private review decisions and packets.
- Decision validator and dry-run hosted exporters.

**Next T064:** Explicit Private Draft Approval Gate.

---

## v1.2 — Private Candidate Review Intake (T062 — 21 May 2026)

**T062 complete** — Converted real Green-source candidate signals into private review intake records.

- Private candidate review intake schema and intake builder.
- Sanitized review console exporter and Supabase-ready hosted exporter.
- Dedicated safety validators and ops status integrations.

**Next T063:** Private review decisions and draft packet promotion.

---

## v1.1 — Hosted Sync Dry-Run Bootstrap (T057 — 21 May 2026)

**T057 complete** — Backend readiness without live connections.

- `.gitignore` hardened (env, Finder dupes, wrangler.toml); `.env.example` added
- Supabase schema validated (14 checks PASS): `scripts/validate-supabase-schema.mjs`
- Bootstrap payloads exported (sanitized): `data/ops/supabase/` — 7 sources, 13 records
- Dry-run sync script: `scripts/sync-supabase-hosted.mjs` — 5-guard push path, dry-run default
- 21-check hosted safety validator: `scripts/validate-hosted-sync-safety.mjs`
- 10-route local Worker test: `scripts/test-cloudflare-worker-local.mjs`
- `export-ops-status.mjs`: `hosted_sync_status: dry_run_ready`, `backend_mode: local_bootstrap_ready`
- `PROJECT_STATE.md` + `README.md` stale drift resolved

**Next T058:** Create Supabase project → apply `schema.sql` → configure secrets → first real hosted sync.

---

## v1.0 — Hosted Automation Architecture (T056 — 21 May 2026)

**T056 complete** — First real automation-ready architecture layer built.

- Architecture decision locked: `docs/automation/REAL_AUTOMATED_MONITORING_ARCHITECTURE.md`
- Supabase operational DB schema: `infra/supabase/schema.sql` (7 tables, not yet connected)
- Cloudflare Worker API/cron edge skeleton: `infra/cloudflare-worker/` (not yet deployed)
- Ops export pipeline: `scripts/export-ops-status.mjs` → `site/data/ops/latest-status.json`
- Public Monitoring Status panel live on `atlas.caesar.no`
- One-command automation runner: `scripts/run-local-automation-cycle.mjs`

**Next T057:** Connect Supabase + Cloudflare Worker → `hosted_ready` automation mode.

---

*See `ROADMAP.md` for the historical phase plan (v0.1–v1.x). See `PUBLIC_MVP_BASELINE_FREEZE.md` for frozen baseline rules.*
