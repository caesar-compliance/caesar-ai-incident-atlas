# Roadmap — Next Phases — caesar-ai-incident-atlas

**Created:** 20 May 2026 (T032)  
**Baseline:** Public MVP v0.6.7 frozen. 10 records. All governance gates closed.  
**Status:** Planning document only. No records created. No implementation. CT approval required before any record creation or integration work.

See `PUBLIC_MVP_BASELINE_FREEZE.md` for frozen baseline rules.  
See `ROADMAP.md` for the full historical phase plan.

---

## v0.7 — Dataset Expansion Planning

**Status:** Planning only — no record creation until CT approval.  
**Prerequisite:** CT approval required before any INC-0011+ record is created.

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

## v0.8 — Caesar AI Evidence / Governance OS Integration Planning

**Status:** Planning only — no integration implementation.  
**Prerequisite:** Stable v0.7 dataset; CT approval to begin integration planning.

**Mapping exercise (planning only):**

For each of the 10 (and future) incident records, map to:

| Incident field | Integration target |
|---|---|
| `failure_modes` | Failure mode — caesar-ai-evidence |
| `controls` | Affected control — Governance OS control library |
| `evidence_required` | Required evidence object — caesar-ai-evidence schema |
| `lessons` | Governance lesson — Governance OS risk intelligence |
| `incident_id` + metadata | Future evidence object ID anchor |
| `controls` | Future Governance OS control object reference |

**Planning deliverables (when approved):**
- Field mapping draft per incident (update `INCIDENT_FIELD_MAPPING_DRAFTS.md`).
- Export format proposal compatible with `caesar-ai-evidence` schema.
- Control coverage heatmap concept (which controls are most frequently implicated).
- Evidence gap report concept (which evidence types are most frequently missing).

**Hard gates:**
- No integration code implemented until CT approves implementation scope.
- No changes to `caesar-ai-evidence` or sibling repositories from this repository.
- Mapping drafts are documentation only — not live integration.

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
