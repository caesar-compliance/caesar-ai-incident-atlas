# Publication Risk Gate

**Task:** T016 — Public Deployment Plan  
**Date:** 19 May 2026  
**Purpose:** Go/no-go criteria before public deployment. Each item must reach Pass before deployment.

---

## Gate Table

| # | Criterion | Status | Notes |
|---|---|---|---|
| G-01 | **Source/license review** — all 10 incident source URLs cleared for public citation | ✅ **APPROVED with caution** | CT sign-off 20 May 2026. INC-0006 Reuters citation accepted with caution. See `GOVERNANCE_SIGNOFF_PACK.md` §5. |
| G-02 | **Wording/legal risk review** — record summaries and lessons reviewed for defamation/liability | ✅ **APPROVED with caution** | CT sign-off 20 May 2026. Current public MVP wording cleared. See `GOVERNANCE_SIGNOFF_PACK.md` §5. |
| G-03 | **Domain/hosting decision** — CT selects URL and hosting option | ✅ **Pass** | GitHub Pages. Custom domain `atlas.caesar.no` active. DNS manually configured. HTTPS enforced. (T022) |
| G-04 | **Local QA pass** — `python3 tools/validate_dataset.py` exits 0 | ✅ **Pass** | Confirmed T015 + T016 |
| G-05 | **No external frontend dependencies** — no CDN, fonts, analytics in `site/` | ✅ **Pass** | grep scan clean (T015) |
| G-06 | **No internal docs exposed** — `work-items/`, `docs/`, planning docs excluded from publish dir | ✅ **Pass** | `site/` contains only public static files. Internal docs not copied in (T017). |
| G-07 | **No deployment secrets committed** — no API keys, tokens, env files in repo | ✅ **Pass** | Static site; no secrets architecture |
| G-08 | **Data path fix** — `data/` co-located at correct relative path for chosen deploy root | ✅ **Pass** | `site/data/` created; `app.js` updated to `data/incident-index.json` (T017). |
| G-09 | **No INC-0011+ or unapproved records** — only INC-0001–INC-0010 published | ✅ **Pass** | Confirmed T016 |
| G-10 | **Browser smoke test** — loads with 10 cards, no console errors | ✅ **PASS** | Control Tower manual browser confirmation on 20 May 2026 (T024). HTTP 200 at `https://atlas.caesar.no/`. HTTP→HTTPS redirect confirmed: `http://atlas.caesar.no/` returns 301 → `https://atlas.caesar.no/` (T023). `data/incident-index.json` returns HTTP 200 with all 10 records (T023). Default GitHub Pages URL redirects 301 to custom domain (T023). Interactive UI verified. |
| G-11 | **Rollback plan documented** | ✅ **Pass** | See `PUBLIC_DEPLOYMENT_PLAN.md §6` |
| G-12 | **Control Tower explicit approval** — CT issues: `"Approve public deployment"` | ✅ **Cleared** | **Cleared by T021 explicit CT instruction** |

---

## Summary

| Status | Count |
|---|---|
| ✅ Pass | 9 |
| ✅ Approved with caution | 2 |
| ✅ Cleared | 1 |

**Status: TECHNICAL PUBLIC MVP LIVE + VERIFIED · ALL GATES CLOSED.** `https://atlas.caesar.no/` — GitHub Pages, GitHub Actions, HTTPS enforced.

G-12 cleared (T021). G-03 resolved (T022): custom domain `atlas.caesar.no` active, HTTPS certificate approved and enforced. **G-10 PASS (T024):** Control Tower manual browser confirmation on 20 May 2026. **G-01 APPROVED with caution (T031):** CT sign-off 20 May 2026; INC-0006 Reuters citation accepted with caution. **G-02 APPROVED with caution (T031):** CT sign-off 20 May 2026; current public MVP wording cleared.

**T026 Source Risk Hardening (20 May 2026):** Public-domain court record, US DEFIANCE Act, and NIH/PubMed sources added to INC-0005, INC-0008, INC-0009. INC-0009 upgraded from Needs counsel review → Sign-off with caution. INC-0006 counsel review still recommended. See `SOURCE_RISK_HARDENING_REPORT.md` and updated `GOVERNANCE_SIGNOFF_PACK.md`.

**T027 INC-0006 Source Risk Decision Packet (20 May 2026):** Targeted source search for INC-0006 found no safer public-domain replacement. Reuters remains sole primary source. No data or wording changes. Decision packet created: `INC0006_SOURCE_RISK_DECISION_PACKET.md`. G-01 INC-0006 status: Needs counsel review (unchanged). Recommended CT action: seek narrow counsel confirmation on Reuters URL citation before G-01 final sign-off.

**T029 Governance Gate Decision Pack (20 May 2026):** Governance gate decision record prepared: `GOVERNANCE_GATE_DECISION_RECORD.md`. No explicit CT approval statements received in task prompt. G-01/G-02 remain pending. Decision packet ready for CT/counsel review. INC-0006 remains the sole material G-01 caution item.

**T030 INC-0006 Counsel Review Follow-Up Packet (20 May 2026):** Counsel follow-up packet prepared: `COUNSEL_REVIEW_PACKET_INC0006.md`. Narrow review question and four decision options (A–D) prepared for CT/counsel. Exact optional CT sign-off language included. No data changes. No approval recorded. G-01/G-02 remain pending.

**T031 Record G-01/G-02 Sign-Off (20 May 2026):** Explicit CT approval received. G-01 approved with caution (INC-0006 Reuters citation accepted with caution). G-02 approved with caution (current public MVP wording cleared). Approval is narrow — current 10-record public MVP only. Not legal advice. Gate closeout: `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md`.

**T032 Public MVP Baseline Freeze (20 May 2026):** Public MVP baseline frozen at `64c7267` (v0.7.0). Frozen rules, INC-0006 caution, and next review triggers recorded in `PUBLIC_MVP_BASELINE_FREEZE.md`. Roadmap split in `ROADMAP_NEXT_PHASES.md`. No incident data, source, or legal content changed. No DNS/CNAME/hosting changes. Approval scope unchanged — current 10-record public MVP only. Next: T033 Dataset Expansion Planning (planning only).

**T040 INC-0012 Record Addition (20 May 2026):** INC-0012 drafted from CAND-008 (AI hiring disability bias — EEOC + DOJ ADA guidance). Dataset now 12 records. Sources: 3× Tier 1 US government public domain. Wording risk: low (no named entity, regulatory framing). INC-0012 review status: `prepared_for_CT_review`. Not automatically covered by G-01/G-02 approval for INC-0001–INC-0011. See `INC0012_GOVERNANCE_REVIEW_NOTE.md`.

**Review Pack Available:** See `PUBLIC_RELEASE_REVIEW_PACK.md` for detailed source/license review table, wording/legal-risk review table, and manual browser smoke-test checklist for G-10 completion.

**Gate Closure Report (T019):** See `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md` for consolidated evidence assessment — G-01/G-02 reviewed and ready for CT sign-off, G-03 hosting recommendation table, G-10 static checks and manual checklist, remaining blocker table.

**Deployment Readiness Checklist (T019):** See `DEPLOYMENT_READINESS_CHECKLIST.md` for pre-deploy checks, deploy option steps (GitHub Pages / Cloudflare Pages / Netlify), what must not be exposed, rollback steps, and exact approval phrase required.

---

## Path to Go

1. CT reviews `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md` and `DEPLOYMENT_READINESS_CHECKLIST.md`.
2. CT completes or delegates source/licence review (G-01, G-02).
3. CT confirms domain and hosting (G-03).
4. Manual browser DevTools smoke test completed and signed off (G-10).
5. CT issues explicit approval (G-12): `"Approve public deployment"`.
