# Roadmap — Next Phases — caesar-ai-incident-atlas

**Created:** 20 May 2026 (T032)
**Last updated:** 21 May 2026 (T046)
**Baseline:** Public MVP v0.8.4. 12 records. Local review console and promotion gate simulator active.
**Status:** Planning document only. No records created. No implementation. CT approval required before any record creation or integration work.

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

*See `ROADMAP.md` for the historical phase plan (v0.1–v1.x). See `PUBLIC_MVP_BASELINE_FREEZE.md` for frozen baseline rules.*
