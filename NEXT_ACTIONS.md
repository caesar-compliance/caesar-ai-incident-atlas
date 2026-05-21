# Next Actions — caesar-ai-incident-atlas

**Last updated:** 21 May 2026 (T061)

---

## Execution Boundaries

This repository is in the **v0.8.2 Product Pivot / Digests MVP** phase. The product has pivoted from "public AI incident database" to "AI Legal & Governance Case Atlas — a case-to-control intelligence layer."

Technical Public MVP is **LIVE + VERIFIED** at `https://atlas.caesar.no/` with exactly 12 validated incident records, accompanied by a static digests portal and RSS feeds.

The new product pivot architecture and policies are now active. See `PRODUCT_PIVOT_LEGAL_GOVERNANCE_CASE_ATLAS.md` and related documents before performing any new task or record drafting.

The clean-room reference lab policy is active. See `REFERENCE_LAB_USAGE_NOTE.md` before studying any local reference directories.

---

## Current Status

| Task | Status | Date |
|---|---|---|
| T001 / v0.2.0 — Full-scale blueprint | Complete |
| T002 — Clean-room acceleration policy | Complete |
| T003 — v0.2 draft contract review | Complete |
| T004 — Dataset MVP Preparation | Complete |
| T005 — Dataset MVP Schema and Taxonomy Files | Complete |
| T006 — First Incident Candidate Dossier Preparation | Complete |
| T007 — First Incident Record Creation Plan | Complete |
| T008 — First Tier 1 Incident Record Batch | Complete |
| T009 — Dataset MVP Review and QA Hardening | Complete |
| T010 — Second-Wave Incident Record Batch | Complete |
| T011 — Dataset MVP Public Readiness Review | Complete |
| T012 — Minimal Static Site Prototype | Complete — local only |
| T013 — Static Site Functional Completion | Complete — local functional MVP |
| T014 — Local QA Tooling and Release Candidate Gate | Complete |
| T015 — Static Site Release Candidate Hardening | Complete — local RC PASS |
| T016 — Public Deployment Plan | Complete — planning only, no deployment |
| T017 — Static Publish Package Preparation | Complete — site/ self-contained |
| T018A — Public Release Gate Review Pack | Complete — review materials prepared |
| T019 — Public Release Gate Closure | Complete — gate evidence consolidated, deployment readiness documented |
| T021 — GitHub Pages Deployment Activation | Complete — workflow deployed, default URL live |
| T022 — Post-Deploy Verification + Custom Domain Closeout | **Complete** — custom domain, HTTPS enforced, closeout docs |
| T023 — Browser Smoke + HTTP→HTTPS Redirect Verification | **Complete (partial)** — redirect 301 confirmed, JSON 200, 10 records live; interactive G-10 test pending CT |
| T024 — Public MVP Status Lock + Product Polish Backlog | **Complete** — Technical Public MVP LIVE + VERIFIED; G-10 PASS; G-01/G-02 pending |
| T025 — Source/License + Wording Review Sign-Off Pack | **Complete** — Governance sign-off pack prepared; G-01/G-02 ready for CT/counsel sign-off |
| T026 — Source Risk Hardening Pass for Public MVP | **Complete** — Sources hardened for INC-0005, INC-0008, INC-0009; INC-0006 counsel review unchanged |
| T027 — Targeted INC-0006 Counsel/Source-Risk Resolution Pack | **Complete** — Targeted source search; no safer source found; decision packet created; no data/wording changes |
| T028 — Public MVP Polish Pass | **Complete** — About section, OG meta, footer, robots.txt, sitemap.xml, mobile density, focus states; no records/sources/legal content changed |
| T029 — Governance Gate Decision Pack | **Complete** — Governance decision record prepared; no explicit CT approval received; G-01/G-02 remain pending; decision packet ready for review |
| T030 — INC-0006 Counsel Review Follow-Up Packet | **Complete** — Counsel follow-up packet prepared; no approval received; G-01/G-02 remain pending; no data/source/legal changes |
| T031 — Record G-01/G-02 Sign-Off with INC-0006 Accepted with Caution | **Complete** — Explicit CT approval recorded; G-01 and G-02 approved with caution; all 12 gates closed |
| T032 — Public MVP v0.7 Status Freeze + Roadmap Split | **Complete** — Baseline frozen at `64c7267`; `PUBLIC_MVP_BASELINE_FREEZE.md` + `ROADMAP_NEXT_PHASES.md` created |
| T033 — Dataset Expansion Planning for INC-0011+ Candidates | **Complete** — Candidate criteria, source gates, review workflow, candidate template created. No records. No data changes. |
| T034 — Candidate Shortlist Draft for INC-0011+ Planning | **Complete** — 15 planning-only candidates; triage matrix; 12-gate record creation checklist. No records. No data changes. |
| T035 — P1 Candidate Source Pack Planning | **Complete** — Source packs for all 8 P1 candidates; 6 ready for CT review; 1 deferred (CAND-002 needs Tier 1); 1 counsel-gated (CAND-004). First batch: CAND-013, 008, 011, 010. | 20 May 2026 |
| T036 — CT First Drafting Batch Selection | **Complete** — First batch selected: CAND-013, CAND-008, CAND-011, CAND-010. | 20 May 2026 |
| T037 — Batch-1 Source Pack Finalization | **Complete** — Source URLs verified. No records created. | 20 May 2026 |
| T038 — Draft First New Incident Record | **Complete** — INC-0011 drafted from CAND-013. Dataset: 11 records. Governance review note prepared. | 20 May 2026 |
| T039 — INC-0011 Gate Sign-Off + Smoke Test | **Complete** — G-01/G-02 approved with caution; INC-0011 live; signoff record created. | 20 May 2026 |
| T040 — Draft Second New Incident Record (CAND-008) | **Complete** — INC-0012 drafted. Dataset: 12 records. Governance review note prepared. | 20 May 2026 |
| T042 — Product Pivot to AI Legal & Governance Case Atlas | **Complete** — Strategic pivot to Legal & Governance Case Atlas documented. Decoupled conceptual watcher pipeline and reference rules added. | 21 May 2026 |
| T043 — Source Registry and Case Pipeline Schema | **Complete** — Created pipeline schemas, sources.yml, offline validator, and automation policy docs | 21 May 2026 |
| T044 — Static Weekly and Monthly Digest MVP | **Complete** — Built static operational digests, monthly strategic digests, custom validator and RSS feed generator, and portal index links | 21 May 2026 |
| T045 — Offline Mock Auto-Discovery Prototype | **Complete** | 21 May 2026 |
| T046 — Local Draft Review Console & Promotion Gate | **Complete** | 21 May 2026 |
| T047 — Real Green-Source Watcher MVP | **Complete** — Created manual CLI watcher, de-duplication, review bundle compiler, and safety containment auditor, with local review console interactive dropdown | 21 May 2026 |
| T048 — Real Candidate-to-Draft Pipeline | **Complete** — Watcher hardening (fallback_urls, health reporting, timeout), build-real-case-drafts, build-promotion-packets, upgraded review console (stage tabs, pipeline bar, packet/health panels), full validation suite | 21 May 2026 |
| T049 — Promotion CLI + Public Case Dry-Run | **Complete** — Rank candidates by safety score, dry-run previews, approval file format, promotion CLI with hard gates, validate-promotion-dry-run.mjs, review console ranked display | 21 May 2026 |
| T051 — High-Signal Official Source Adapters | **Complete** — Adapter framework for Green sources, named adapters, quality classes, one-command runner, review console updates | 21 May 2026 |
| T052 — Live Adapter Collection + Candidate Shortlist | **Complete** — Live pipeline run, adapter improvements (FTC/CNIL/EDPB/EU), case shortlist builder, review console shortlist tab, runbook | 21 May 2026 |
| T053 — PKT-0006 Source Verification + Readiness + Preview | **Complete** — Source verification, control map, readiness report, publication preview | 21 May 2026 |
| T054 — Publish Approved PKT-0006 as INC-0013 | **Complete** — INC-0013 published (EDPB guidance, Green-tier, CT approved). Dataset: 13 records. | 21 May 2026 |
| T055 — Public Case UX + Validator Fix + Live Atlas Polish | **Complete** — Stale validators fixed, Record Type/Jurisdiction filters, guidance disclaimer, 13 static case pages, public site validator, RSS rebuilt. | 21 May 2026 |
| v0.4 Dataset MVP — full 10-record batch | Complete | 19 May 2026 |

---

## Status: T049 Complete — Promotion CLI and Public Case Dry-Run System Deployed

**Public deployment is LIVE and VERIFIED at `https://atlas.caesar.no/` with exactly 13 validated incident records (INC-0001–INC-0013, including INC-0013 as first real adapter-detected guidance/governance case), a complete static digest portal, and live RSS syndication feeds.**

**The full local pipeline now runs end-to-end with promotion machinery: Green-source watcher → dedupe → real case drafts (`data/drafts/real/`) → promotion packets (`data/promotion-packets/real/`) → **ranking & promotion CLI** → review bundle → review console. T049 adds: (1) `rank-promotion-candidates.mjs` - scores packets by safety criteria, (2) `approved-promotions.json` - Control Tower approval registry with hard gates, (3) `promote-approved-case.mjs` - dry-run preview generator or single-case promoter, (4) `validate-promotion-dry-run.mjs` - safety validation suite, (5) Review console ranked candidates display. All 6 real drafts ranked; PKT-0001 (DRAFT-0001) is top recommendation with score 130. No public records created without approval. Public dataset remains at exactly 12 records.**

**Active boundaries, policies, and schemas:**
- `PRODUCT_PIVOT_LEGAL_GOVERNANCE_CASE_ATLAS.md` (Repositioning & Value Chain)
- `CASE_TO_CONTROL_PRODUCT_MODEL.md` (Fields, Mappings, checklists)
- `AUTOMATION_AND_PUBLISHING_POLICY.md` (Ingestion gates & clean-room rules)
- `DIGEST_PRODUCT_MODEL.md` (Weekly/Monthly RSS static plans)
- `SOURCE_REGISTRY_AND_WATCHER_ARCHITECTURE.md` (Ingestion pipeline stages)
- `REFERENCE_LAB_USAGE_NOTE.md` (Local reference lab usage policy)
- `docs/review/PROMOTION_GATE_POLICY.md` (Promotion Gating rules)
- `docs/review/DRAFT_REVIEW_WORKFLOW.md` (Curator Runbook)
- `docs/review/PUBLICATION_PROMOTION_CHECKLIST.md` (Pre-publication checklist)
- `tools/review-console/index.html` (Local Review Console UI page)
- `scripts/build-review-bundle.mjs` (Mock Bundle Aggregator)
- `scripts/build-real-review-bundle.mjs` (Real Bundle Aggregator)
- `scripts/validate-real-watcher.mjs` (Real Watcher Containment Auditor)
- `docs/watch/REAL_GREEN_SOURCE_WATCHER_RUNBOOK.md` (Manual Ingestion Runbook)

---

## Next Recommended Step: T056

**T056 — Next Real Case Publication Cycle.** Run live adapter pipeline to collect fresh candidates, rank, select best PKT for Control Tower review, draft, verify, and publish INC-0014 (requires CT approval). Alternatively: digest refresh, jurisdiction enrichment on existing records, or taxonomy v0.3 finalisation.

---

## Pending License Verifications (Before v0.3)

The following license verifications must be completed before incident records citing these sources can be created:

| Source | Pages to verify | Priority |
|---|---|---|
| OECD AI Incidents Monitor | https://oecd.ai/terms and https://www.oecd.org/en/about/terms-conditions.html | High |
| AIAAIC Repository | https://www.aiaaic.org/aiaaic-repository/user-guide | High |
| MIT AI Incident Tracker | https://airisk.mit.edu/ | Medium |

AIID (CC BY-SA 4.0) and IBM AI Atlas Nexus (Apache-2.0) are verified. See `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` for details.

---

## Safe Autonomous Tasks

The following tasks can be executed autonomously without Control Tower approval:

- Improving documentation formatting and clarity.
- Fixing typos or broken links in documentation.
- Updating REPO_INVENTORY.md when new files are added.
- Updating CHANGELOG.md with accurate entries.
- Completing a THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md for a source already listed in the register.
- Completing pending license verifications and recording findings in LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md and THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md.

---

## Tasks Requiring Control Tower Approval

The following tasks require Artem / Control Tower review before execution:

- Starting T018 (requires CT review of `PUBLICATION_RISK_GATE.md`; legal review completion; hosting decision; explicit CT approval before any deployment activation).
- Starting v0.3 Dataset MVP.
- Implementing any product code (scripts, automated tooling, application features).
- Creating any incident records.
- Selecting incident sources and verifying data licenses.
- Choosing the static site generator technology.
- Any cross-repository changes or integrations.
- Any reuse of third-party code or data.

---

## Blocked Tasks

- v0.3 Dataset MVP — blocked until T006 dossier shortlist is approved.
- Incident record creation — blocked until T006 is approved and workflow gates are passed.
- Any mass import or scraping workflow — blocked unless separately approved.

---

## T060 — Manual Watch Run Queue + Hosted Run Payloads (Complete — 21 May 2026)

- `schemas/pipeline/manual-watch-run.schema.json` — private run envelope schema (v1)
- `scripts/build-manual-watch-run-queue.mjs` — deterministic queue (7 green sources, no network)
- `scripts/build-manual-watch-run-envelope.mjs` — run envelope with self-validation; run_id: WATCH-RUN-YYYYMMDD-HHMMSS
- `scripts/export-hosted-watch-run-payloads.mjs` — sanitized Supabase payloads (dry_run_export)
- `scripts/validate-manual-watch-run.mjs` — 16-check safety validator
- `scripts/run-local-automation-cycle.mjs` — optional `--with-watch-queue` flag added
- `scripts/export-ops-status.mjs` — added `manual_watch_run_status: "queue_ready"`
- `scripts/validate-hosted-sync-safety.mjs` — 7 T060 checks added (25–31)
- Generated artifacts: `manual-queue-latest.json`, `manual-queue-manifest.json`, `manual-run-latest.json`, `atlas-watch-run.manual-latest.json`, `atlas-watch-run-queue.manual-latest.json`
- **Safety:** No network fetch, no remote write, no cron, no deploy, no INC-0014, public count remains 13, latest remains INC-0013
- **Next:** Run `node scripts/watch-green-sources.mjs` for real fetch cycle, or proceed with hosted activation

## T061 — Bounded Real Green-Source Manual Run (Complete — 21 May 2026)

- `data/watch/config/manual-green-run-policy.json` — safety policy with bounded fetch limits
- `scripts/run-bounded-green-source-manual-run.mjs` — bounded runner with `--execute-green-fetch` flag
- `scripts/build-private-candidate-signals.mjs` — metadata-only signal builder
- `scripts/validate-bounded-green-source-run.mjs` — 25-check safety validator
- `scripts/export-hosted-watch-run-payloads.mjs` — exports T061 real-green payloads
- `scripts/run-local-automation-cycle.mjs` — added `--with-bounded-green-run` flag
- `scripts/export-ops-status.mjs` — added `bounded_green_run_status` field
- `scripts/validate-hosted-sync-safety.mjs` — expanded with 8 T061 checks (32–39)
- Generated artifacts: `real-green-run-latest.json`, `data/watch/private/runs/<run_id>/` (run.json, source-observations.json, candidate-signals.json, safety-manifest.json)
- **Safety:** No secrets, no remote write, no deploy, no cron, no INC-0014, public count 13, latest INC-0013
- **Next:** Review candidate signals, promote through review console, or proceed with hosted activation

## T059 — Hosted Activation Preflight (Complete — 21 May 2026)

- `scripts/smoke-supabase-local-migration.mjs` — bounded local schema validation; skips gracefully if runtime unavailable
- `scripts/preflight-hosted-activation.mjs` — readiness checker (not deployer); inspects env/config without remote connection
- `scripts/print-hosted-activation-commands.mjs` — deterministic 20-step command checklist for human operator
- `scripts/validate-hosted-sync-safety.mjs` — expanded to validate T059-generated files sanitized
- `scripts/export-ops-status.mjs` — added `hosted_activation_status: "preflight_ready"`
- Generated artifacts: `local-migration-smoke.json`, `hosted-activation-preflight.json`, `hosted-activation-manifest.json`
- Work item docs: TASK.md, VALIDATION.md, DECISIONS.md, IMPLEMENTATION_REPORT.md
- **Safety:** No remote Supabase touched, no Worker deployed, no cron enabled, public count remains 13, latest remains INC-0013, no INC-0014
- **Next:** Manual hosted activation when CT approves (follow printed checklist)

## T058 — Cloudflare Worker ↔ Supabase API Integration (Complete — 21 May 2026)

- `infra/cloudflare-worker/src/index.js` — Supabase client layer with dual-mode (fallback/live)
- Helper functions: getSupabaseConfig, supabaseFetch, listPublicRecords, getPublicRecord, getLatestRun, listSources, safeJson, sanitizeError
- Routes: GET /health, /status, /public-records, /public-records/:id, /latest-run, /sources, POST /watch/run (disabled), OPTIONS, 404
- `scripts/test-cloudflare-worker-local.mjs` — 22 tests for fallback, mocked success, mocked failure, secret safety
- `scripts/probe-worker-supabase-live.mjs` — guarded read-only probe, skips when env missing
- `scripts/validate-hosted-sync-safety.mjs` — added Worker checks (no JWT, sanitizeError present)
- `scripts/export-ops-status.mjs` — added `worker_api_status: "local_supabase_integration_ready"`
- `infra/cloudflare-worker/wrangler.example.toml` — documented required env/secrets
- Work item docs: TASK.md, VALIDATION.md, DECISIONS.md, IMPLEMENTATION_REPORT.md
- **Safety:** No secrets in responses, no .env committed, no remote migration, no deploy, no cron, public count remains 13
- **Next T059:** Create Supabase project → apply schema → set secrets → deploy Worker → run live probe

## T057 — Supabase Hosted Sync Dry Run (Complete — 21 May 2026)

- `.gitignore` updated (env files, Finder dupes, wrangler.toml) + `.env.example` added
- `scripts/validate-supabase-schema.mjs` — 14-check SQL validator: PASS
- `scripts/export-supabase-bootstrap-payloads.mjs` → `data/ops/supabase/` (7 sources, 13 records)
- `scripts/sync-supabase-hosted.mjs` — dry-run PASS (all 5 guards missing by design)
- `scripts/validate-hosted-sync-safety.mjs` — 21 checks PASS
- `scripts/test-cloudflare-worker-local.mjs` — 10/10 routes PASS
- `PROJECT_STATE.md` / `README.md` stale drift fixed
- **Next T058:** Worker Supabase integration → local testing → guarded live probe

---

## T056 — Real Automated Monitoring Architecture (Complete — 21 May 2026)

- Architecture decision: `docs/automation/REAL_AUTOMATED_MONITORING_ARCHITECTURE.md`
- Supabase schema starter: `infra/supabase/schema.sql`
- Cloudflare Worker skeleton: `infra/cloudflare-worker/src/index.js`
- Ops export/validate scripts: `scripts/export-ops-status.mjs`, `scripts/validate-ops-status.mjs`
- Monitoring status panel live on public site (fetches `data/ops/latest-status.json`)
- One-command cycle runner: `scripts/run-local-automation-cycle.mjs`
- **Next T057:** Configure Supabase + Cloudflare Worker secrets → `hosted_ready` mode

---

## Cross-Repository Coordination Notes

- Incident export format must be compatible with `caesar-ai-evidence` incident-mapping schema. Maintain compatibility in future schema updates.
- T005 schema/taxonomy files exist; keep changes backward-compatible unless a new decision is approved.
- Future Governance OS integration requires stable incident IDs (INC-0001 format) and taxonomy IDs — locked in v0.2 contract.
- Do not edit `caesar-ai-evidence` or any sibling repository from this repository.
- AIID CC BY-SA 4.0 ShareAlike clause must be reviewed before any direct AIID data import. See `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` section 2.1.
