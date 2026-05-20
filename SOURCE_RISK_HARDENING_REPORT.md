# Source Risk Hardening Report — T026

**Task:** T026 — Source Risk Hardening Pass for Public MVP  
**Date:** 20 May 2026  
**Version:** 0.6.2  
**Branch:** `review/T026-source-risk-hardening`  
**Status:** Hardening complete — NOT LEGAL ADVICE

---

## 1. Status Summary

| Item | Status |
|---|---|
| Technical Public MVP | ✅ LIVE + VERIFIED at `https://atlas.caesar.no/` |
| G-10 | ✅ PASS |
| G-01 | ⚠ Pending CT/counsel sign-off (source risk materially reduced for INC-0005, INC-0008, INC-0009) |
| G-02 | ⚠ Pending CT/counsel sign-off |
| T026 source hardening | ✅ Complete |
| Records changed | INC-0005, INC-0008, INC-0009 (sources added) |
| Records unchanged | INC-0006 (no safe replacement found — counsel review still recommended) |
| New incident records created | 0 |
| Scraping / import / DNS / CNAME / hosting changes | None |

---

## 2. Hardening Table

| ID | Old Source Risk (T025) | Action Taken | Sources Added / Emphasized | Wording Changed | New Risk Assessment |
|---|---|---|---|---|---|
| INC-0005 | Sign-off with caution (ACLU fair use + NIST) | Court record added | CourtListener/RECAP — Williams v. City of Detroit E.D. Mich. public docket (court_record) | No | Improved: NIST (public domain) + court record (public domain) now primary anchors; ACLU demoted to supporting NGO documentation |
| INC-0006 | Needs counsel review (Reuters only) | No change — no safe replacement identified | None | No | Unchanged: Reuters investigative report remains sole primary source; no official/court/regulator source publicly available; counsel review still recommended |
| INC-0008 | Sign-off with caution (medium confidence / platform source) | US legislative source added | US Congress — DEFIANCE Act S.3696 (118th Congress) public bill record (regulator_report) | No | Improved: now grounded in company statement + UK public legislation + US public legislation; confidence remains medium per data |
| INC-0009 | Needs counsel review (AAAS/Science academic fair use) | NIH/PubMed institutional record added | PubMed PMID 31649194 — NIH NLM public domain index entry (agency_report) | No | Improved: public-domain NIH index now supplements Science.org; AAAS reliance reduced; sign-off with caution now appropriate |

---

## 3. Source URLs Added

| ID | URL | Source Type | Rationale |
|---|---|---|---|
| INC-0005 | `https://www.courtlistener.com/docket/59580048/williams-v-city-of-detroit/` | `court_record` | Public court docket — RECAP/CourtListener is a non-profit public-access archive of US federal court records. Replaces reliance on ACLU NGO narrative with a primary court-record anchor. |
| INC-0008 | `https://www.congress.gov/bill/118th-congress/senate-bill/3696` | `regulator_report` | US Congress official bill record — public domain US government work. Grounds the DEFIANCE Act reference already present in the summary. |
| INC-0009 | `https://pubmed.ncbi.nlm.nih.gov/31649194/` | `agency_report` | NIH National Library of Medicine — PubMed index entry. Public domain government institutional metadata. Supplements Science.org citation; NIH/NLM index is not subject to AAAS copyright. |

---

## 4. Records Requiring Counsel Review

| ID | Reason | Recommendation |
|---|---|---|
| INC-0006 | Reuters investigative report remains sole primary source. Company never publicly confirmed the full details. No court, regulator, or official record exists that would independently corroborate all reported facts. | Counsel review remains recommended before G-01 final approval. |

---

## 5. Records Ready for CT Sign-Off with Caution (Post-Hardening)

| ID | Basis |
|---|---|
| INC-0005 | NIST FRVT (public domain agency report) + Williams v. City of Detroit court record (public domain) now form the primary source pair. ACLU NGO documentation is supporting only. Wording already well-hedged. |
| INC-0008 | Microsoft company statement + UK OSA 2023 Section 188 (public legislation) + US DEFIANCE Act S.3696 (public legislation). Confidence remains medium — appropriately flagged in record. |
| INC-0009 | Obermeyer et al. Science 2019 + PubMed/NIH PMID 31649194 (public domain institutional index). AAAS reliance reduced. No article text copied. |

---

## 6. Wording Changes

No wording changes were made to any incident record in T026. All four records already use appropriate hedging ("according to", "reportedly", "per the study") and avoid legal conclusions.

---

## 7. Validation Results

| Check | Result |
|---|---|
| `python3 tools/validate_dataset.py` | ✅ PASS — 10 records, all checks passed |
| `grep -R "../data/" site/` | ✅ Clean |
| `find site -maxdepth 4 (CNAME/work-items/docs)` | ✅ Empty |
| Workflow `path: site` | ✅ Confirmed |
| Root data ↔ site/data sync | ✅ INC-0005, INC-0008, INC-0009 synced |
| Record count | ✅ 10 (no new records) |

---

## T027 Addendum — INC-0006 Targeted Source Search (20 May 2026)

**Task:** T027 — Targeted INC-0006 Counsel/Source-Risk Resolution Pack
**Branch:** `review/T027-inc0006-source-resolution`

### Search Scope

Targeted manual search for safer public-domain or official-record sources supporting the key INC-0006 factual points:
- Amazon developed/used an internal AI-based recruiting/resume screening tool
- Tool reportedly showed gender bias (penalised female-associated terms)
- Tool was discontinued/not used as intended by recruiters

### Search Result

| Source Type Sought | Found? | Detail |
|---|---|---|
| Official Amazon company statement / page | No | Amazon spokesperson quoted in media (Reuters, Verge, Mashable) — not published as standalone official page on `aboutamazon.com` or `amazon.com` |
| Court / regulator / government record | No | No EEOC enforcement action, no court case, no OFCCP finding on this specific tool publicly available |
| EEOC May 2023 AI guidance (`eeoc.gov`) | Partial — not usable | Document confirmed to exist via `eeoc.gov/eeoc-publications`; direct URL returns 404; cannot add without stable accessible URL |
| US Congress hearing record | Not verified | Target page returned 403 Forbidden; cannot confirm content |
| Academic/institutional record independent of Reuters | No | Case widely cited in secondary literature only; no primary institutional record independent of the Reuters report found |

### T027 Risk Change Assessment

| Item | Status |
|---|---|
| Safer source found | No |
| INC-0006 data changed | No |
| Wording changed | No — already adequately hedged |
| Source risk level | **Unchanged** — Reuters investigative report remains sole primary source |
| Counsel review | **Still recommended** — narrow question: URL citation acceptability in this publication context |
| Decision packet | Created: `INC0006_SOURCE_RISK_DECISION_PACKET.md` |

### T027 Conclusion

Source risk for INC-0006 remains unchanged from T026. No safe replacement or supplement found. Record is publishable with caution in the current Technical Public MVP context. CT should seek narrow counsel confirmation on Reuters URL citation before G-01 final sign-off or broader distribution. See `INC0006_SOURCE_RISK_DECISION_PACKET.md` for full options assessment and recommended sign-off language.

---

## Disclaimer

This document does not constitute legal advice. Source risk assessments are operational summaries only. Final legal clearance and source approval must be provided by qualified legal counsel or Control Tower.
