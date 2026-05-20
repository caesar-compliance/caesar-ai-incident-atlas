# Changelog

All notable changes to Caesar AI Incident Atlas are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
