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

## Disclaimer

This document does not constitute legal advice. Source risk assessments are operational summaries only. Final legal clearance and source approval must be provided by qualified legal counsel or Control Tower.

## T027 Addendum (20 May 2026)

- **ID:** INC-0006
- **Status:** Risk remains unchanged (G-01).
- **Hardening:** No safer source found. Hardened via documentation (Decision Packet) and counsel recommendation confirmation.
- **Next Step:** CT to decide on counsel review or temporary de-emphasis.
