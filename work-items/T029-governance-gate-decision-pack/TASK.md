# T029 — Governance Gate Decision Pack — Task Definition

**Scope:** Prepare final governance gate decision package for G-01 and G-02 after T025–T027 source/wording review work. Create compact decision record with current status tables and decision placeholders. Update related documentation. No changes to records, sources, or legal content.

**Task boundaries:**
- Documentation only — no data, source, or legal content changes
- No DNS/CNAME/hosting changes
- No secrets, no scraping, no external scripts, no analytics
- No repo root exposure
- No new records or dataset changes
- No changes to incident records or source URLs
- No changes to site functionality or deployment

**Success criteria:**
- [x] Create `GOVERNANCE_GATE_DECISION_RECORD.md` with compact sections:
  - [x] Current public MVP status (Technical Public MVP: LIVE + VERIFIED, 10 records, G-10 PASS)
  - [x] G-01 source/license status table for INC-0001–INC-0010 (6 ready for sign-off, 3 sign-off with caution, 1 needs counsel review — INC-0006 Reuters citation)
  - [x] G-02 wording/legal-risk status table (9 ready for sign-off, 1 sign-off with caution — INC-0006)
  - [x] INC-0006 decision section with Options A/B/C assessment
  - [x] Final decision section with placeholders for CT/counsel review
- [x] Check task prompt for explicit CT approval statements:
  - Missing: "CT approves G-01 source/license sign-off with INC-0006 Reuters citation accepted with caution."
  - Missing: "CT approves G-02 wording/legal-risk sign-off for current public MVP wording."
- [x] If explicit approvals present: update G-01/G-02 sign-off in `GOVERNANCE_SIGNOFF_PACK.md` §5
- [x] If explicit approvals present: update `PUBLICATION_RISK_GATE.md` and `RELEASE_CANDIDATE_GATE.md` gate status
- [x] If explicit approvals present: update `PROJECT_STATE.md` and `NEXT_ACTIONS.md` to reflect G-01/G-02 cleared
- [x] If explicit approvals present: bump version to v0.7.0, update `site/README.md` and `site/index.html`
- [x] If explicit approvals present: create `work-items/T029-governance-gate-decision-pack/DECISIONS.md` for sign-off language
- [x] If explicit approvals NOT present: prepare decision packet only, keep G-01/G-02 pending
- [x] Update lifecycle docs: `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `CHANGELOG.md`, `REPO_INVENTORY.md`
- [x] Run validation checks: dataset, file safety, workflow configuration
- [x] Confirm no changes to records, sources, or legal content
- [x] Confirm no DNS/CNAME/hosting/secrets changes
- [x] Commit and push branch `governance/T029-gate-decision-pack`
- [x] Create `IMPLEMENTATION_REPORT.md` with final status summary

**Safety constraints:**
- No changes to incident records or source URLs
- No changes to legal content or wording
- No DNS/CNAME/hosting configuration changes
- No secrets or sensitive data exposure
- No external scripts or analytics
- No scraping or external API calls
- Repo root must not be exposed in deployment

**Validation requirements:**
- `python3 tools/validate_dataset.py` must PASS (10 records, no data changes)
- `grep -R "../data/" site/assets/app.js site/index.html` must be clean
- `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` must be empty
- GitHub Pages workflow must target `site/` directory only
- No external scripts or analytics added

**Expected outcome:**
- Governance decision record prepared for CT/counsel review
- G-01/G-02 status accurately reflected (pending or cleared based on explicit approvals)
- All documentation updated consistently
- No changes to technical implementation or data
- Ready for CT/counsel review and next governance step
