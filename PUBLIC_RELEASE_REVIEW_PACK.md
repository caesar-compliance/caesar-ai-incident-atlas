# Public Release Gate Review Pack — caesar-ai-incident-atlas

**Task:** T018A — Public Release Gate Review Pack + Post-T017 Documentation Consistency Cleanup  
**Date:** 20 May 2026  
**Version:** 0.5.5  
**Branch:** `docs/T018A-public-release-gate-review-pack`  

---

## Important Disclaimers

> **This document is review preparation only.** It does not constitute legal advice.  
> **Public deployment is NOT approved** by this document.  
> **G-01, G-02, G-03, G-10 remain pending** pending Control Tower sign-off.  
> **G-12 remains a hard blocker** until Artem / Control Tower explicitly states: `"Approve public deployment"`.  
> No hosting configuration, CNAME, GitHub Actions, or other deployment infrastructure has been added.  

---

## 1. Repository Status Table

| Item | Status | Notes |
|---|---|---|
| Repository version | 0.5.5 | T017 complete; static publish package ready |
| Latest commit | ea58aa9 | site/T017-static-publish-package-preparation |
| Dataset records | 10 (INC-0001–INC-0010) | No INC-0011+ without CT approval |
| Local QA | Pass | `python3 tools/validate_dataset.py` exits 0 |
| site/ self-contained | Pass | `site/data/` exists; `app.js` uses site-relative paths |
| Internal docs in site/ | None | `docs/`, `work-items/`, planning docs excluded |
| Deployment config | None | No CNAME, no GitHub Actions, no Cloudflare/Netlify config |
| Domain connected | No | `incidents.caesar.no` proposed but not activated |
| CT public deploy approval | **NO-GO** | G-12 blocker; explicit approval not issued |

---

## 2. Source and License Review Table — INC-0001 through INC-0010

| ID | Title | Primary Source(s) | Source Type | License Status | CT Clearance |
|---|---|---|---|---|---|
| INC-0001 | Attorney submits court filings containing AI-generated fabricated case citations | US District Court S.D.N.Y. — Mata v. Avianca, No. 22-cv-1461 | Court record (RECAP) | Public domain US federal court record | Pending |
| INC-0002 | Autonomous vehicle fatally strikes pedestrian during public road testing | NTSB — Accident Report HWY18MH010 | Federal agency report | Public domain US government work | Pending |
| INC-0003 | Airline chatbot provides incorrect fare policy information | BC Civil Resolution Tribunal — Moffatt v. Air Canada, 2024 BCCRT 149 | Tribunal decision | Public domain Canadian tribunal decision | Pending |
| INC-0004 | Dutch court finds automated welfare risk-scoring system incompatible with fundamental rights | Hague District Court — ECLI:NL:RBDHA:2020:1878 | Court decision | Public domain Dutch court decision | Pending |
| INC-0005 | Facial recognition misidentification contributes to wrongful arrest | ACLU case documentation + NIST FRVT Part 3 | NGO documentation + federal research | Public domain NIST; ACLU materials under fair use citation | Pending |
| INC-0006 | AI-based resume screening tool discontinued after reportedly penalising female candidates | Reuters investigative report, Oct 2018 | News media (Tier 3) | Fair use citation; Reuters T&Cs apply | Pending |
| INC-0007 | Automated content moderation system incorrectly removes legitimate health-related content | Meta company statements, March 2020 | Company statement | Fair use citation; Meta terms apply | Pending |
| INC-0008 | AI image generation tools used to produce non-consensual intimate imagery | Microsoft statement + UK Online Safety Act 2023 | Company statement + legislation | Fair use citation; Microsoft/UK Gov terms apply | Pending |
| INC-0009 | Healthcare resource allocation algorithm found to systematically underestimate illness severity in Black patients | Obermeyer et al., Science 2019 | Academic paper | Fair use citation; Science/AAAS terms apply | Pending |
| INC-0010 | Regulatory guidance issued on discriminatory risk of AI-based hiring assessment tools | EEOC Technical Assistance (May 2023) + NYC Local Law 144 | Regulatory guidance + local law | Public domain US government work (EEOC); NYC local law public | Pending |

**License/Source Risk Summary:**

- **Public domain sources (4 records):** INC-0001, INC-0002, INC-0003, INC-0004 — US/Canadian/Dutch official sources are public domain government works.
- **Tier 1 official + public domain (1 record):** INC-0010 — EEOC guidance is US government work (public domain); NYC law is public.
- **Mixed NGO + public domain research (1 record):** INC-0005 — ACLU documentation cited under fair use; NIST FRVT is public domain.
- **Tier 3 news media (1 record):** INC-0006 — Reuters citation requires compliance with Reuters Terms of Use; no copying beyond fair use excerpts.
- **Company statements (2 records):** INC-0007, INC-0008 — Meta/Microsoft statements cited under fair use; no substantial copying.
- **Academic paper (1 record):** INC-0009 — Science 2019 paper cited under academic fair use; no substantial copying.

**Action Required:** Control Tower must confirm each source URL is cleared for public citation, or obtain alternative source if any URL presents license risk.

---

## 3. Wording and Legal-Risk Review Table — INC-0001 through INC-0010

| ID | Risk Category | Wording Review | Status |
|---|---|---|---|
| INC-0001 | Defamation/legal claims | Summary uses "According to a publicly available court order..." and "The court found that..." — appropriate hedging; no legal conclusions about counsel's intent. | Pending CT review |
| INC-0002 | Victim naming, company characterization | Victim not named (compliant); operator described factually per NTSB findings; no editorial characterization. | Pending CT review |
| INC-0003 | Company liability claims | Summary uses tribunal decision wording; "tribunal found company bound by chatbot's representation" — direct quote of finding; no additional liability asserted. | Pending CT review |
| INC-0004 | Government system criticism | Summary describes court finding of incompatibility with fundamental rights — direct quote of judicial finding; no editorial addition. | Pending CT review |
| INC-0005 | Law enforcement + individual harm | Wrongful arrest described with hedging ("contributes to"); Porcha Woodridge not named in summary (only in source); appropriate caution. | Pending CT review |
| INC-0006 | Company characterization (Amazon) | "Reportedly penalising female candidates" — hedged language; no assertion of intentional discrimination; company discontinued tool per public statement. | Pending CT review |
| INC-0007 | Platform criticism | Meta's own statements used as source; "incorrectly removes" describes outcome, not intent; no defamatory characterization. | Pending CT review |
| INC-0008 | Platform operators + legislative context | Microsoft statement used as source; UK OSA cited as legislative context; no characterization of intent. | Pending CT review |
| INC-0009 | Healthcare system criticism | Obermeyer et al. findings cited; describes "systematically underestimate" as per paper; no naming of specific hospitals/individuals. | Pending CT review |
| INC-0010 | Regulatory guidance (no enforcement) | Clarifies guidance document, not enforcement action; confidence rated medium appropriately; no assertion of specific violations. | Pending CT review |

**Wording Risk Summary:**

- All records use required hedging language ("reportedly", "according to", "found that...").
- No record asserts legal conclusions ("negligent", "illegal", "violated").
- No private individuals named (except public figures in official capacity where required).
- INC-0008 (medium confidence) and INC-0010 (medium confidence) flagged per T011 caveats.

**Action Required:** Control Tower or legal counsel must review all 10 summaries for defamation, misrepresentation, or liability risk before public deployment.

---

## 4. Manual Browser Smoke-Test Checklist — G-10

**Prerequisites:**
- [ ] Python 3 installed
- [ ] Repository cloned at `docs/T018A-public-release-gate-review-pack` branch
- [ ] Browser with DevTools available (Chrome/Edge/Firefox/Safari)

**Test Steps:**

| Step | Action | Expected Result | Pass/Fail |
|---|---|---|---|
| 1 | `python3 -m http.server 8080` from repo root | Server starts on port 8080 | ☐ |
| 2 | Open `http://localhost:8080/site/` | Page loads with dark theme; no console errors | ☐ |
| 3 | Verify 10 incident cards display | INC-0001 through INC-0010 visible with badges | ☐ |
| 4 | Test global search — type "hallucination" | Filters to INC-0001, INC-0003 (cards with FM-HALL) | ☐ |
| 5 | Test sort — change to "Newest first" | Records reorder by date descending | ☐ |
| 6 | Test sector filter — click "legal-compliance" | Only INC-0001 displayed | ☐ |
| 7 | Test severity filter — click "critical" | Only INC-0002 displayed | ☐ |
| 8 | Clear filters — click filter chip X | All 10 records visible again | ☐ |
| 9 | Click INC-0001 card to expand | Detail sections visible: What Happened, AI System/Context, Harms, Impact, Failure Modes, Controls, Evidence Required, Governance Lessons, Sources, Caveats | ☐ |
| 10 | Test deep link — open `http://localhost:8080/site/#INC-0005` | Page loads with INC-0005 expanded and scrolled into view | ☐ |
| 11 | Test copy-link button on INC-0003 | Clipboard contains `http://localhost:8080/site/#INC-0003` | ☐ |
| 12 | Open DevTools → Console | No JavaScript errors, no 404 network errors for JSON files | ☐ |
| 13 | Open DevTools → Network | `data/incident-index.json` and `data/incidents/*.json` load with HTTP 200 | ☐ |
| 14 | Test keyboard navigation | Tab moves through filters; Enter/Space expands/collapses cards | ☐ |

**G-10 Sign-off:**

- [ ] All 14 steps passed
- [ ] No console errors observed
- [ ] No 404 errors observed
- [ ] Tester initials: _______
- [ ] Date: _______

---

## 5. Control Tower Sign-Off Checklist

**Final approval required before any public deployment:**

| Gate | Criterion | Status | Sign-off Required |
|---|---|---|---|
| G-01 | Source/license review — all 10 incident source URLs cleared | ⚠ **Pending** | CT or delegated reviewer |
| G-02 | Wording/legal risk review — record summaries reviewed | ⚠ **Pending** | CT or legal counsel |
| G-03 | Domain/hosting decision confirmed | ⚠ **Pending** | CT (Artem) |
| G-10 | Manual browser smoke test with DevTools | ⚠ **Pending** | CT or delegated tester |
| G-12 | **CT explicit approval** — `"Approve public deployment"` | 🔴 **Blocker** | **Artem / Control Tower** |

**Hard Blockers:**

1. **G-12** — No deployment may proceed until Control Tower explicitly states: `"Approve public deployment"`.
2. **G-01** — If any source URL is not cleared, the corresponding record must be withheld from public deployment.
3. **G-02** — If any record summary presents legal risk, the record must be revised or withheld.

---

## 6. No-Go Statement

**Public deployment of caesar-ai-incident-atlas remains NO-GO as of this document.**

This document prepares review materials only. It does not:
- Clear sources for public citation
- Approve record wording for legal risk
- Select hosting provider or domain
- Authorize deployment configuration
- Approve public deployment

**Next step:** Control Tower review of this pack, completion of G-01 through G-10, and explicit G-12 approval before any deployment activation.

---

## References

- `PUBLICATION_RISK_GATE.md` — Current gate status (7 pass, 4 pending, 1 blocker)
- `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` — Source license verification details
- `SOURCE_AND_CITATION_POLICY_DRAFT.md` — Wording rules and citation policy
- `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` — Full source register
- `T017_DEPLOYMENT_IMPLEMENTATION_RECOMMENDATION.md` — Deployment steps (deferred pending approval)
- `HOSTING_OPTION_MATRIX.md` — Hosting comparison (no selection made)
