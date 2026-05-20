# Batch-1 Drafting Readiness Matrix — T037

**Task:** T037 — Batch-1 Source Pack Finalization  
**Date:** 20 May 2026  
**Version:** 0.7.5  
**Status:** Planning only — NOT legal advice

---

## Table 1 — Readiness Summary

| Candidate ID | Working Title (short) | Primary Source Confirmed | Source Pack Complete | Source-Risk | Wording-Risk | Counsel Needed | Recommended Future Action | Status |
|---|---|---|---|---|---|---|---|---|
| CAND-013 | Spirometry race bias | **Yes** — ATS + PubMed | Yes | Low | Low–Medium | No | CT approval → draft | `not_approved_candidate` |
| CAND-008 | AI hiring disability bias | **Yes** — EEOC + DOJ | Yes | Low | Medium | No | CT approval → draft (policy frame) | `not_approved_candidate` |
| CAND-011 | Retail facial recognition ICO | **Yes** — ICO + company | Yes | Low | Medium | No | CT approval → draft (accurate framing) | `not_approved_candidate` |
| CAND-010 | LLM legal sanctions | **Yes** — CourtListener pattern | Yes | Low | Low–Medium | No | CT approval → draft (Johnson v. Dunn) | `not_approved_candidate` |

---

## Table 2 — Drafting Order Recommendation (Safest to Riskiest)

| Rank | Candidate ID | Rationale |
|---|---|---|
| 1 | **CAND-013** | Strongest source base (ATS Tier 1 + 3×Tier 2); clinical/academic framing well-established; no named individual; no litigation; lowest overall risk |
| 2 | **CAND-008** | Policy/guidance frame eliminates named-entity risk; EEOC + DOJ Tier 1 public domain; disability bias framing is regulatory, not accusatory |
| 3 | **CAND-010** | Court records are authoritative; attorney names public record; Johnson v. Dunn distinct from INC-0001; must accurately characterize sanction |
| 4 | **CAND-011** | ICO Tier 1 confirmed; named company + vendor present; biometric data sensitivity; requires accurate non-enforcement framing; highest wording risk in batch |

---

## Table 3 — Recommended T038 Options

| Option | Description | Recommended If |
|---|---|---|
| **A** | CT approves one candidate for first record drafting (INC-0011) | CT wants cautious single-record approach; recommend CAND-013 as safest |
| **B** | CT approves 2–4 candidates for drafting batch | CT accepts batch-1 readiness; allows parallel drafting with separate validation per candidate |
| **C** | Refine weak source packs further | Not recommended — all batch-1 source packs are sufficiently strong |
| **D** | Keep planning only; defer drafting | CT wants to pause dataset expansion; no record creation until future decision |

**Recommended approach:** Option A (single record, CAND-013) for maximum caution, or Option B (batch of 2–4) if CT accepts current source pack strength.

---

## Remaining Gates Before Drafting (All Candidates)

| Gate | All 4 Candidates |
|---|---|
| CT approves candidate for drafting | Required per candidate |
| Source pack finalized and reviewed | **Complete (T037)** |
| Primary source URL confirmed | **Complete (T037)** |
| Source/license review | **Complete — all Tier 1 public domain** |
| Wording/legal-risk review | Required before drafting |
| Counsel gate | Not required for any batch-1 candidate |
| G-01/G-02 equivalent scope definition | Required before publication |

---

## Remaining Gates Before Publication (Per Candidate)

| Gate | Required For |
|---|---|
| Draft incident JSON prepared | Each candidate → INC-0011+ |
| Validator passes | `python3 tools/validate_dataset.py` exits 0 |
| Root data and site/data sync | SHA-256 hashes match |
| Public site smoke test | Local validation passes |
| Governance sign-off | CT explicit publication approval |
| Release notes | CHANGELOG.md updated |

---

**Disclaimer:** Planning material only. No candidate approved for record creation. Not legal advice.
