# Incident Candidate Shortlist Template — INC-0011+ Planning

**Task:** T033 — Dataset Expansion Planning for INC-0011+ Candidates  
**Date:** 20 May 2026  
**Version:** 0.7.1  
**Status:** Template only — NOT legal advice. No real candidates approved. No records created.

---

## Purpose

This is a reusable template for documenting future INC-0011+ incident candidates. It is a planning tool only.

**All entries in this template are placeholders or clearly marked examples. No real candidates are listed here. No candidate listed in any shortlist document constitutes an approved record.**

To use: copy the candidate entry template below for each new candidate. Assign a candidate ID using the format `CAND-T033-NNN` (or the next available candidate series established by CT). Complete all fields. Set status to `not_approved_candidate` until CT gate passes.

---

## Governance Reminder

- Candidate listing does not approve a record.
- Each candidate must pass the full workflow in `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md`.
- G-01/G-02 approval for the current 10-record MVP does not extend to any new candidate.
- Each candidate requires its own source review, wording/legal review, CT gate, and counsel gate where triggered.
- Not legal advice.

---

## Candidate Entry Template

Copy this block for each new candidate. Do not submit a real candidate without completing all fields.

---

### Candidate ID: `[CAND-T0NN-NNN]`

> **Status:** `not_approved_candidate`
> All fields below are planning estimates only. They do not constitute approval, source clearance, or legal review.

| Field | Value |
|---|---|
| **Candidate ID** | `[CAND-T0NN-NNN]` — replace with assigned ID |
| **Working title** | `[Short descriptive title — e.g., "AI parole risk scoring racial disparity — US"]` |
| **Status** | `not_approved_candidate` |
| **Jurisdiction** | `[Country / region — e.g., "United States (multiple states)", "EU — Germany", "Australia"]` |
| **Affected domain / sector** | `[Sector from taxonomy — e.g., "public-sector", "finance", "education", "healthcare-medical"]` |
| **Affected population (if known)** | `[General description only — no personal data — e.g., "criminal defendants", "job applicants", "welfare recipients"]` |
| **Approximate date range** | `[Year or year range — e.g., "2019–2022"]` |
| **Potential failure modes** | `[One or more from taxonomy — e.g., FM-BIAS, FM-TRANS, FM-UNAUTH]` |
| **Potential controls implicated** | `[One or more from control taxonomy — e.g., CTL-BIAS-01, CTL-TRANS-01]` |
| **Potential source categories** | `[List likely source types — e.g., "court record", "regulatory finding", "peer-reviewed publication", "journalism (major outlet)"]` |
| **Known potential sources (preliminary links)** | `[URL list — preliminary, not verified — mark as unverified]` |
| **Source tier estimate** | `[Tier 1 / Tier 2 / Tier 3 / Sole journalism — from SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md]` |
| **Minimum source count estimate** | `[Number of verifiable sources expected to be available]` |
| **Expected risk level** | `[low / medium / high / requires-counsel]` |
| **Required gate** | `[CT gate only / CT gate + counsel gate]` |
| **Why it may belong** | `[2–4 sentences: governance relevance, diversity value, source quality expectation, failure mode coverage]` |
| **Why it may be excluded** | `[2–4 sentences: source gaps, wording risks, privacy risks, sensationalism risks, duplication with existing records]` |
| **Jurisdiction diversity value** | `[Does this add a new jurisdiction not in INC-0001–INC-0010? Yes / No / Partial]` |
| **Category diversity value** | `[Does this add a new failure mode, sector, or control combination? Yes / No / Partial]` |
| **Preliminary wording risk note** | `[Brief note on any hedging requirements, living individuals, ongoing litigation, or other wording concerns]` |
| **Next step if progressed** | `[Stage 2: Source Collection — collect and verify source list]` |

---

## Example Placeholder Entry (Illustrative Only — Not a Real Candidate)

The following entry is a **fictional illustrative example** to demonstrate template usage. It does not represent a real incident, a real source, or an approved candidate.

---

### Candidate ID: `CAND-EXAMPLE-001`

> **Status:** `not_approved_candidate` — EXAMPLE PLACEHOLDER ONLY. Not a real candidate. Not approved.

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-EXAMPLE-001` |
| **Working title** | `[EXAMPLE] Automated public benefits denial — fictional jurisdiction` |
| **Status** | `not_approved_candidate` — EXAMPLE ONLY |
| **Jurisdiction** | `[Fictional — example only]` |
| **Affected domain / sector** | `public-sector` |
| **Affected population (if known)** | `[Fictional — welfare claimants — example only]` |
| **Approximate date range** | `[Fictional — 2020–2022 — example only]` |
| **Potential failure modes** | `FM-BIAS, FM-TRANS, FM-UNAUTH` |
| **Potential controls implicated** | `CTL-BIAS-01, CTL-TRANS-01` |
| **Potential source categories** | `court record, regulatory finding` |
| **Known potential sources (preliminary links)** | `[None — fictional example — no real URL]` |
| **Source tier estimate** | `Tier 1 (if court record available)` |
| **Minimum source count estimate** | `2` |
| **Expected risk level** | `medium` |
| **Required gate** | `CT gate only (no named living individual, no ongoing litigation assumed)` |
| **Why it may belong** | `Illustrates FM-BIAS and FM-TRANS in public-sector automated decision-making. Adds jurisdiction diversity if non-US. Court record source would be Tier 1. No duplication with existing records assumed.` |
| **Why it may be excluded** | `If no Tier 1 source available and sole source is journalism, counsel gate would be required. If jurisdiction already covered, diversity value reduced.` |
| **Jurisdiction diversity value** | `Yes (fictional non-US jurisdiction — example only)` |
| **Category diversity value** | `Partial — FM-BIAS already in dataset; combination with FM-UNAUTH in public sector adds diversity` |
| **Preliminary wording risk note** | `No named living individuals in this example. No ongoing litigation assumed. Standard hedging sufficient if journalism source used.` |
| **Next step if progressed** | `Stage 2: Source Collection — verify court record availability` |

---

**This example entry is fictional and illustrative only. It is not a real incident, not a real source, and not an approved candidate. Do not treat this entry as a basis for record creation.**

---

## Candidate Log

Use the table below to track all candidates added to the shortlist. Update status as candidates progress through the workflow.

| Candidate ID | Working Title | Status | Jurisdiction | Expected Risk | Last Updated |
|---|---|---|---|---|---|
| *(none — no real candidates listed in T033)* | — | — | — | — | — |

---

*See `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md` for the full review workflow. See `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` for selection criteria. See `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` for source requirements.*

**Disclaimer:** This template is a planning tool only. No candidates listed here constitute approved records or approved sources. Candidate listing does not constitute legal clearance or CT approval for record creation. Not legal advice.
