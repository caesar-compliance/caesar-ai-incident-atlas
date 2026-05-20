# Release Candidate Gate

> Checklist that must pass before any public deployment of the Caesar AI Incident Atlas.  
> **No step in this checklist auto-approves deployment.** All items require human review.  
> **T015 Local RC Status:** ✅ All local items satisfied. Three governance items remain before public deploy.  
> **T016 Deployment Plan Status:** ✅ Planning complete. See `PUBLIC_DEPLOYMENT_PLAN.md`, `HOSTING_OPTION_MATRIX.md`, `PUBLICATION_RISK_GATE.md`.  
> **T017 Publish Package Status:** ✅ `site/` is self-contained. Data path fix applied. Internal docs excluded. G-06 and G-08 satisfied.
> **T019 Gate Closure Status:** Gate evidence consolidated. G-01/G-02 evidence reviewed — CT sign-off required. G-10 manual browser test pending.
> **T021 Deployment Status:** G-12 **CLEARED** by explicit CT instruction `"Approve public deployment"`. GitHub Pages deployment workflow added. Default URL deployment active. Custom domain deferred. NO-GO lifted for default URL deployment.
> **T022 Closeout Status:** Site LIVE at `https://atlas.caesar.no/`. Custom domain `atlas.caesar.no` active. HTTPS certificate approved. Enforce HTTPS enabled. G-03 resolved. G-10 static checks passed. Manual browser UI test still required for full G-10 sign-off.
> **T024 Public MVP Lock Status:** Technical Public MVP **LIVE + VERIFIED** at `https://atlas.caesar.no/`. HTTP→HTTPS redirect confirmed (301). JSON endpoint HTTP 200 with all 10 records. **G-10 PASS** — Control Tower manual browser confirmation on 20 May 2026. G-01 source/license review and G-02 wording/legal-risk review remain pending CT sign-off. See `PRODUCT_POLISH_BACKLOG.md` for future work.
> **T026 Source Risk Hardening Status:** Source risk materially reduced for INC-0005, INC-0008, INC-0009. INC-0009 upgraded from Needs counsel review → Sign-off with caution. INC-0006 counsel review still recommended. See `SOURCE_RISK_HARDENING_REPORT.md`.
> **T027 INC-0006 Source Risk Decision Packet Status:** Targeted source search found no safer replacement for INC-0006. Reuters remains sole primary source. No data or wording changes. Decision packet: `INC0006_SOURCE_RISK_DECISION_PACKET.md`. G-01 INC-0006: Needs counsel review (unchanged).
**T029 Governance Gate Decision Pack Status:** Governance gate decision record prepared: `GOVERNANCE_GATE_DECISION_RECORD.md`. No explicit CT approval statements received in task prompt. G-01/G-02 remain pending. Decision packet ready for CT/counsel review.
**T030 INC-0006 Counsel Review Follow-Up Packet Status:** Counsel follow-up packet prepared: `COUNSEL_REVIEW_PACKET_INC0006.md`. No data changes. No approval recorded. G-01/G-02 remain pending.
**T031 Record G-01/G-02 Sign-Off Status:** ✅ G-01 APPROVED with caution (20 May 2026) — INC-0006 Reuters citation accepted with caution. ✅ G-02 APPROVED with caution (20 May 2026) — current public MVP wording cleared. All 12 gates now closed/approved. See `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md`.
**T032 Public MVP Baseline Freeze Status:** ✅ Baseline frozen at `64c7267` (v0.7.0, 20 May 2026). Frozen rules in `PUBLIC_MVP_BASELINE_FREEZE.md`. Roadmap split in `ROADMAP_NEXT_PHASES.md`. No records/data/source/legal/DNS changes. Next: T033 Dataset Expansion Planning (planning only).

---

## Pre-Deployment Checklist

### 1. Dataset Validation

- [x] `python3 tools/validate_dataset.py` exits 0 with no issues. *(T014/T015 — PASS)*
- [x] 10 records present (INC-0001–INC-0010). No INC-0011 or higher. *(T015 — confirmed)*
- [x] All records validate against `schemas/incident.schema.json`. *(T015 — confirmed)*
- [x] All taxonomy references (FM, CTL, EV, sector, severity, confidence) resolve. *(T015 — confirmed)*
- [x] No `source.database` field in any record. *(T015 — confirmed)*

### 2. Local Site Verification

- [x] `python3 -m http.server 8080` starts from repo root without error. *(T015 — HTTP 200)*
- [x] `http://localhost:8080/site/` loads with all 10 records. *(T015 — confirmed)*
- [x] Filters, search, sort, deep links, copy-link function correctly. *(T015 — confirmed)*
- [x] `site/` serves correctly as static root. *(T017 — HTTP 200)*
- [ ] No console errors on load. *(Requires manual browser verification)*

### 3. External Dependency Audit

- [x] No CDN, external font, or analytics references in `site/index.html`, `app.js`, `styles.css`. *(T015 — grep scan clean)*
- [x] No npm, `package.json`, or build pipeline present. *(T015 — confirmed)*
- [x] No backend or server-side code. *(T015 — confirmed)*

### 4. Dataset Caveats Reviewed

- [x] Draft taxonomy IDs (`transportation-autonomous`, `retail-ecommerce`, `FM-REL`) acknowledged. *(displayed in site)*
- [x] Medium-confidence records (INC-0008, INC-0010) acknowledged. *(displayed in site)*
- [ ] Open risks in `DATASET_MVP_OPEN_RISKS.md` reviewed by CT; none newly blocking.

### 5. Governance Gate ⚠ Blocking for public deployment

- [ ] Control Tower has reviewed the T015 RC and `STATIC_SITE_RC_REVIEW.md`.
- [ ] Legal and license review completed for all incident sources.
- [ ] Domain and hosting decision made.
- [ ] Public deployment explicitly approved by Control Tower.

### 6. Documentation Check

- [x] `CHANGELOG.md` reflects the release version. *(T015 — v0.5.3)*
- [x] `README.md` updated with public site URL. *(T022)*
- [x] `NEXT_ACTIONS.md` updated for post-deployment tasks. *(T022)*

---

## Blocking Items for Public Deployment

Three governance items remain before any public deployment is permissible:

1. **Legal/license review** — all 10 incident sources must be formally reviewed and cleared.
2. **Domain/hosting decision** — hosting provider, domain, and DNS must be decided.
3. **Control Tower approval** — explicit CT sign-off on public deployment.

Technical blockers from T015/T016 (data path fix, internal doc isolation) are now resolved (T017).

**None of the above items are automated gates.** Each requires deliberate human sign-off.  
See `DATASET_MVP_OPEN_RISKS.md` for the current open risk register.  
See `STATIC_SITE_RC_REVIEW.md` for the full T015 RC review table.
