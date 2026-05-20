# First Drafting Batch Selection — T036 Control Tower Planning

**Task:** T036 — CT First Drafting Batch Selection  
**Date:** 20 May 2026  
**Version:** 0.7.4  
**Status:** Planning only — NOT legal advice. No records approved. No data changed.

---

## 1. Status Summary

| Item | Status |
|---|---|
| Technical Public MVP | **LIVE + VERIFIED** at `https://atlas.caesar.no/` |
| Current approved dataset | INC-0001 through INC-0010 only (10 records) |
| G-01/G-02 approval scope | Current 10-record MVP only — does not extend to new records |
| This document creates records | **No** — planning only |
| This document approves publication | **No** — explicit CT approval still required per candidate |
| This document expands G-01/G-02 | **No** — approval scope remains frozen at 10-record MVP |

All selected candidates remain `not_approved_candidate` until future drafting gates are completed. No candidate becomes INC-0011+ through this task.

---

## 2. Selected First Drafting Batch

The Control Tower first drafting batch includes 4 candidates from the T035 recommendation. These candidates are selected for future source-pack finalization and drafting review — not for immediate record creation.

---

### CAND-013 — Spirometry Race Bias

| Field | Value |
|---|---|
| **Candidate ID** | CAND-013 |
| **Working title** | Race-based correction factor in pulmonary function / spirometry algorithm — ATS/ERS guideline revision |
| **Why selected** | Strongest source base of all P1 candidates; expands `healthcare-medical` with distinct failure mode (race-based algorithmic correction vs resource allocation bias in INC-0009); adds FM-BIAS in clinical tool context |
| **Source-readiness summary** | ATS official statement (Tier 1) + 3×Tier 2 peer-reviewed (PubMed PMID 38607551, AAFP, Mayo Clinic Proceedings); all open-access or publicly indexable |
| **Wording-risk summary** | Low–Medium; race in medicine requires clinically accurate framing per ATS guidance; no named individual; no ongoing litigation |
| **Expected future record value** | Strong governance lesson on algorithmic fairness in medical diagnostics; professional society guidance as governance trigger |
| **Gates still required before drafting** | CT candidate approval; source/license review (confirm PMIDs); wording/legal-risk review |
| **Gates still required before publication** | Draft JSON validation; root/site data sync; governance sign-off; release notes |
| **Planning status** | `selected_for_future_drafting_review` |

---

### CAND-008 — AI Hiring Disability Bias

| Field | Value |
|---|---|
| **Candidate ID** | CAND-008 |
| **Working title** | AI hiring assessment tool — disability discrimination — EEOC guidance and ADA obligations |
| **Why selected** | Expands `hiring-employment` with disability-bias angle (distinct from gender/race bias in INC-0006/INC-0010); adds ADA compliance lesson; strong regulatory framework |
| **Source-readiness summary** | EEOC 2022 guidance + DOJ ADA guidance + EEOC/DOJ joint press release (all Tier 1, public domain) |
| **Wording-risk summary** | Medium; protected characteristics (disability); frame as "EEOC found" / "EEOC warned" — no named employer needed |
| **Expected future record value** | Practical governance lesson on AI hiring tools and ADA compliance; regulatory guidance frame eliminates named-entity defamation risk |
| **Gates still required before drafting** | CT candidate approval; source/license review (confirm .gov public domain); wording/legal-risk review |
| **Gates still required before publication** | Draft JSON validation; root/site data sync; governance sign-off; release notes |
| **Planning status** | `selected_for_future_drafting_review` |

---

### CAND-011 — Retail Facial Recognition ICO

| Field | Value |
|---|---|
| **Candidate ID** | CAND-011 |
| **Working title** | Retail facial recognition deployment — ICO investigation — Southern Co-op / Facewatch — UK |
| **Why selected** | Adds UK jurisdiction; FM-PRIV + FM-TRANS + FM-BIAS in `retail-ecommerce`; biometric data processing under UK GDPR adds new evidence type |
| **Source-readiness summary** | ICO March 2023 official statement (Tier 1, confirmed at `ico.org.uk`); Southern Co-op official statement (Tier 2) |
| **Wording-risk summary** | Medium; named company (Southern Co-op) and vendor (Facewatch); must accurately reflect ICO outcome as review/investigation (not enforcement notice) |
| **Expected future record value** | ICO scrutiny directly relevant to EU/UK clients; biometric processing governance lesson |
| **Gates still required before drafting** | CT candidate approval; source/license review (confirm ICO URL stability); wording/legal-risk review (accurate outcome framing) |
| **Gates still required before publication** | Draft JSON validation; root/site data sync; governance sign-off; release notes |
| **Planning status** | `selected_for_future_drafting_review` |

---

### CAND-010 — LLM Legal Sanctions

| Field | Value |
|---|---|
| **Candidate ID** | CAND-010 |
| **Working title** | Attorney AI-generated court filings contain hallucinated citations — court sanctions (post-Mata cases) |
| **Why selected** | Expands `legal-compliance` with post-Mata sanction pattern; FM-HALL + FM-REL in professional service context; distinct from INC-0001 |
| **Source-readiness summary** | Multiple federal court sanction orders confirmed (Garfield v. Icher N.D. Ala. 2025, Couvrette v. Brigandi Oregon); CourtListener/PACER accessible |
| **Wording-risk summary** | Low–Medium; attorney names are public record; must accurately characterise sanction |
| **Expected future record value** | Strong governance lesson on LLM output verification and professional duty of care |
| **Gates still required before drafting** | CT candidate approval; source selection (confirm one specific CourtListener URL distinct from INC-0001); wording/legal-risk review |
| **Gates still required before publication** | Draft JSON validation; root/site data sync; governance sign-off; release notes |
| **Planning status** | `selected_for_future_drafting_review` |

---

## 3. Deferred P1 Candidates

The following P1 candidates are deferred from the first drafting batch:

---

### CAND-001 — AI Credit Scoring Bias

| Field | Value |
|---|---|
| **Reason deferred** | Policy/guidance frame only (CFPB Tier 1 circulars confirmed); no specific named-entity enforcement action identified yet |
| **Required source refinement** | Optional: CFPB/OCC enforcement order against named lender would strengthen record — search CFPB enforcement database |
| **Counsel trigger** | No — if policy frame accepted |
| **Recommended future action** | CT decision: proceed with policy-frame record, or wait for specific enforcement action |

---

### CAND-002 — UK Welfare Benefit Denial AI

| Field | Value |
|---|---|
| **Reason deferred** | Tier 3 journalism (Guardian) only confirmed; needs Tier 1 anchor |
| **Required source refinement** | DWP DPIA, ICO investigation record, or UK parliamentary committee report as Tier 1 anchor |
| **Counsel trigger** | No — if official source found |
| **Recommended future action** | Source verification task; downgrade to P2 pending Tier 1 source |

---

### CAND-003 — AI Exam Proctoring Bias

| Field | Value |
|---|---|
| **Reason deferred** | PMC Tier 2 confirmed; US Senate letter URL needs verification to confirm Tier 1 support; vendor name sensitivity |
| **Required source refinement** | Verify US Senate letter URL from senate.gov; confirm PMID open access |
| **Counsel trigger** | No — if framed as peer-reviewed research |
| **Recommended future action** | Confirm Senate letter URL and PMID before CT submission |

---

### CAND-004 — Sentencing Risk-Score Bias

| Field | Value |
|---|---|
| **Reason deferred** | Counsel gate required; criminal justice + racial bias intersection |
| **Required source refinement** | Court record is strong (Wis. Sup. Ct. 2016 WI 68 Tier 1); no additional source needed |
| **Counsel trigger** | **Yes** — mandatory counsel review before drafting |
| **Recommended future action** | CT activate counsel gate in parallel with candidate approval if proceeding |

---

## 4. Batch-1 Drafting Gates (Required Before Any JSON Record Created)

Before any candidate becomes a real incident record (INC-0011+), the following gates must be completed per candidate:

1. **CT approves candidate for drafting** — Explicit written approval for each selected candidate
2. **Source pack finalized** — All URLs confirmed, access dates recorded, license notes documented
3. **Primary source URL confirmed** — At least one Tier 1 or Tier 2 source at stable public URL
4. **Source/license review** — Reviewed against `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`
5. **Wording/legal-risk review** — Neutral, cautious wording confirmed; hedging applied where required
6. **No copyrighted text copied** — Confirmed: citation by URL only
7. **Draft incident JSON prepared** — Created on feature branch (not main)
8. **Validator passes** — `python3 tools/validate_dataset.py` exits 0
9. **Root data and site/data sync** — SHA-256 hashes match
10. **Public site smoke test** — Local validation of site functionality
11. **Governance sign-off** — CT explicit approval for publication (equivalent to G-01/G-02)
12. **Release notes** — `CHANGELOG.md` and lifecycle docs updated

---

## 5. T037 Source Pack Finalization

**T037 complete (20 May 2026).** Source packs finalized for all 4 batch-1 candidates:
- `BATCH1_FINAL_SOURCE_PACKS.md` — verified primary/secondary source URLs per candidate
- `BATCH1_DRAFTING_READINESS_MATRIX.md` — readiness tables and drafting order recommendation
- `BATCH1_SOURCE_URL_REGISTER.md` — source URL register with reproduction rules

All 4 candidates remain `not_approved_candidate`. No records created. No data changed.

---

## 6. Explicit Non-Approval Statement

This document explicitly states:

- **No candidate is publication-ready.** All selected candidates require further gates.
- **No candidate is legally/source approved.** Source/license and wording/legal-risk reviews are still required.
- **No candidate becomes INC-0011+ through this task.** Record creation requires separate explicit CT approval.
- **Future record creation requires separate CT approval.** Each candidate must pass all 12 gates individually.

---

*See `FIRST_DRAFTING_BATCH_GATE_MATRIX.md` for compact gate matrix. See `FUTURE_RECORD_DRAFTING_TASK_OUTLINE.md` for future drafting workflow template. See `BATCH1_FINAL_SOURCE_PACKS.md` for T037 source verification.*

**Disclaimer:** This document is planning material only. It does not constitute legal advice, legal clearance, or approval for any new incident records. Not legal advice.
