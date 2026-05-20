# P1 Candidate Source Risk Matrix — INC-0011+ Planning

**Task:** T035 — P1 Candidate Source Pack Planning
**Date:** 20 May 2026
**Version:** 0.7.3
**Status:** Planning only — NOT legal advice. No candidates approved. All status: `not_approved_candidate`.

---

## Governance Notice

All entries are planning assessments only. No candidate is approved for record creation. Not legal advice.

---

## Matrix 1 — P1 Overview Table

| Candidate ID | Working Title (short) | Sector | Jurisdiction | Strongest Source Found | Source-Risk | Wording-Risk | Counsel Likely | Recommended Next Action |
|---|---|---|---|---|---|---|---|---|
| CAND-001 | AI credit scoring bias | `finance-credit` | US | CFPB Circular 2023-03 (Tier 1) | **Low** | Medium | No | CT candidate approval → draft (policy frame) |
| CAND-002 | UK welfare benefit AI bias | `public-sector` | UK | Guardian Dec 2024 (Tier 3 only) | **Medium** | Medium | No (if official found) | Source verification first — needs DWP/ICO/parliament Tier 1 |
| CAND-003 | AI proctoring bias | `education` | US/Global | PMC peer-reviewed (Tier 2) | **Medium** | Medium | No | CT candidate approval → confirm PMID + Senate letter |
| CAND-004 | Sentencing risk-score bias | `criminal-justice` | US | Wis. Sup. Ct. 2016 WI 68 (Tier 1) | **Low** | Medium–High | **Yes** | CT approval + counsel gate before drafting |
| CAND-008 | AI hiring disability bias | `hiring-employment` | US | EEOC 2022 guidance (Tier 1) | **Low** | Medium | No | CT candidate approval → draft (regulatory guidance frame) |
| CAND-010 | LLM legal sanctions | `legal-compliance` | US | Federal court sanction orders (Tier 1) | **Low** | Low–Medium | No | CT candidate approval → select specific CourtListener URL |
| CAND-011 | Retail facial recognition ICO | `retail-ecommerce` | UK | ICO March 2023 statement (Tier 1) | **Low** | Medium | No | CT candidate approval → confirm ICO URL stability |
| CAND-013 | Spirometry race bias | `healthcare-medical` | US/Global | ATS official statement (Tier 1) + 3×Tier 2 | **Low** | Low–Medium | No | CT candidate approval → ready to draft |

---

## Matrix 2 — Candidate Readiness Ranking

Ranked from safest to draft first, to most complex:

| Rank | Candidate ID | Readiness | Rationale |
|---|---|---|---|
| 1 | **CAND-013** | `source_pack_ready_for_CT_review` | ATS Tier 1 + 3×Tier 2 open-access; no named individual; low wording risk; clinical framing well-established |
| 2 | **CAND-008** | `source_pack_ready_for_CT_review` | EEOC + DOJ Tier 1 official guidance; public domain; policy-frame record with no named employer needed; low source risk |
| 3 | **CAND-001** | `source_pack_ready_for_CT_review` | CFPB Tier 1 circulars confirmed; policy-frame record viable; medium wording risk (financial/racial) but well-hedged with regulatory language |
| 4 | **CAND-011** | `source_pack_ready_for_CT_review` | ICO Tier 1 confirmed; named entities are companies (not individuals); note ICO outcome was review not enforcement — must frame accurately |
| 5 | **CAND-010** | `source_pack_ready_for_CT_review` | Court sanction records confirmed to exist; requires selecting one specific case and confirming CourtListener URL; low wording risk |
| 6 | **CAND-003** | `source_pack_ready_for_CT_review` | PMC Tier 2 confirmed; Senate letter provides Tier 1 corroboration; medium source risk due to vendor sensitivity — verify PMID and open access |
| 7 | **CAND-004** | `needs_counsel_gate` | Tier 1 court record confirmed (Wis. Sup. Ct.); counsel review required due to criminal justice + racial bias intersection; strong but gated |
| 8 | **CAND-002** | `needs_primary_source` | Guardian Tier 3 only; DWP/ICO/parliament Tier 1 must be identified before drafting; lowest readiness of P1 set |

---

## Matrix 3 — Candidate Exclusion / Defer Recommendations

| Candidate ID | T034 Priority | T035 Recommendation | Rationale |
|---|---|---|---|
| CAND-002 | P1 | **Downgrade to P2 pending source verification** | Guardian Tier 3 is the only confirmed source at this time. A DWP DPIA, ICO investigation record, or parliamentary committee report is needed as Tier 1 anchor. Recommend deferring from first drafting batch until source is found. |
| CAND-004 | P1 | **Retain P1 — but counsel gate required** | Court record is strong (Tier 1). However mandatory counsel review before drafting means this cannot be in batch 1 unless CT also activates counsel gate in the same step. Recommend parallel-track: CT approval + counsel gate activation simultaneously. |

**No other P1 candidates are recommended for demotion.** All remaining 6 are confirmed `source_pack_ready_for_CT_review`.

---

## Matrix 4 — Source Tier Summary

| Candidate ID | Tier 1 Found | Tier 2 Found | Tier 3 Found | Sole-Source Risk | Notes |
|---|---|---|---|---|---|
| CAND-001 | ✅ CFPB | — | — | No | Three independent Tier 1 CFPB/FTC/DOJ documents |
| CAND-002 | ⚠️ Partial | — | ✅ Guardian | **Yes — T3 sole source** | Parliamentary context only; no specific Tier 1 incident anchor |
| CAND-003 | — | ✅ PMC (PMID 8407138) | ✅ MIT Tech Review | No | PMC Tier 2 + US Senate letter (Tier 1 if confirmed) |
| CAND-004 | ✅ Wis. Sup. Ct. | ✅ Harvard Law Review | ✅ ProPublica | No | Multi-tier; ProPublica findings contested — frame as secondary |
| CAND-008 | ✅ EEOC + DOJ | — | — | No | Two independent Tier 1 government sources |
| CAND-010 | ✅ Court orders | ✅ ABA survey | ✅ ABA Journal | No | Multiple post-Mata court orders; select one for primary anchor |
| CAND-011 | ✅ ICO | ✅ Southern Co-op statement | — | No | ICO Tier 1 confirmed; not enforcement notice — review outcome |
| CAND-013 | ✅ ATS | ✅ PMC, AAFP, Mayo Clinic | — | No | Strongest source base of all P1 candidates |

---

*See `P1_CANDIDATE_SOURCE_PACKS.md` for full source pack detail. See `P1_CANDIDATE_PRIORITIZATION_RECOMMENDATION.md` for first-batch recommendation.*

**Disclaimer:** Planning material only. Not legal advice.
