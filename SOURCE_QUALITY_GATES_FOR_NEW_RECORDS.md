# Source Quality Gates for New Records — INC-0011+ Planning

**Task:** T033 — Dataset Expansion Planning for INC-0011+ Candidates  
**Date:** 20 May 2026  
**Version:** 0.7.1  
**Status:** Planning only — NOT legal advice. No records approved. No data changed.

---

## Purpose

This document defines the minimum source quality requirements that must be satisfied before a new incident record (INC-0011+) can proceed to draft stage. These gates apply in addition to the candidate selection criteria in `DATASET_EXPANSION_CANDIDATE_CRITERIA.md`.

**Passing these gates does not approve a record.** CT explicit approval is required for every new record or batch.

---

## 1. Preferred Source Categories

### Tier 1 — Strongly Preferred (Public Domain)

| Source Category | Examples | Notes |
|---|---|---|
| Court records / judicial decisions | US PACER, CourtListener, RECAP, ECLI (EU), CanLII, BAILII | Public domain. Cite docket/case number and URL. |
| Regulatory enforcement actions | FTC, EEOC, ICO, CNIL, DPC, ACCC findings | Public domain. Cite official publication URL. |
| Government agency reports | NTSB accident reports, NHS safety reports, GAO reports | Public domain. Cite report number and URL. |
| Parliamentary / legislative records | US Congress bills (Congress.gov), EU Parliament, UK Hansard | Public domain. Cite bill number and URL. |

### Tier 2 — Acceptable with Care

| Source Category | Examples | Notes |
|---|---|---|
| Peer-reviewed publications | Science, Nature, NIH NLM (PubMed), ACM DL, IEEE Xplore | Confirm open access or use institutional index URL (PMID, DOI). Do not reproduce article text. |
| Official company / public org statements | Press releases, blog posts, official policy pages | Acceptable; standard attribution hedging required. Note if statement is no longer publicly available. |
| Government-funded research | NIH, NSF, NIST publications | Public domain or open access — confirm before citing. |

### Tier 3 — Acceptable with Hedging and Multi-Source Preference

| Source Category | Examples | Notes |
|---|---|---|
| Major credible national/international journalism | Reuters, AP, BBC, NYT, Guardian, FT, WSJ, Der Spiegel | Cite URL only; no text reproduction. "Reportedly" hedging mandatory. Multi-source preferred. Sole journalism source requires CT and may require counsel. |
| Legislation / policy source | National AI acts, sector regulations | Acceptable as supporting context source. |

### Discovery Pointers — Not Primary Sources

| Source | Notes |
|---|---|
| AIID (AI Incident Database) | Discovery pointer only. CC BY-SA 4.0 ShareAlike clause — no direct data use without separate license review. |
| AIAAIC Repository | Discovery pointer only. License verification pending — do not use data. |
| OECD AI Incidents Monitor | Discovery pointer only. License verification pending — do not use data. |
| MIT AI Incident Tracker | Discovery pointer only. License verification pending — do not use data. |

---

## 2. Minimum Source Count Guidance

| Situation | Minimum requirement | Notes |
|---|---|---|
| Standard new record | Two verifiable sources (at least one Tier 1 or Tier 2) | Strongly preferred baseline. |
| One source only (sole-source) | Requires explicit CT approval + mandatory caution wording in record | INC-0006 is the precedent case (Reuters sole-source, accepted with caution). |
| Sole journalism source (major outlet) | Requires CT review; may require counsel gate | High risk; must use full hedging language. |
| Sole journalism source (non-major outlet) | Not acceptable without CT and counsel explicit approval | Hard gate — default reject. |
| Paywalled-only source | Not acceptable as primary source without CT exception | Must have public-domain alternative or CT exception. |

---

## 3. When Counsel Review Is Required

Counsel review (G-01/G-02 equivalent or new gate) is mandatory before record creation when any of the following apply:

- The primary source is sole journalism (any outlet) with no official/regulatory/court corroboration.
- The incident involves a named living individual in a potentially defamatory context.
- The incident involves ongoing active litigation or a live regulatory investigation.
- The record would characterise organisational conduct as illegal, fraudulent, or discriminatory without a formal court/regulatory finding to that effect.
- The record involves sensitive categories of personal data (health, biometrics, criminal records) beyond what is in the cited official record.
- Any source is unclear as to whether reproduction or citation is permitted under its terms.
- The incident is in a jurisdiction with stricter defamation or privacy laws than the US (e.g., UK, EU, Australia).

---

## 4. When Caution Wording Is Mandatory

All of the following scenarios require mandatory caution wording in the record summary and lessons fields:

- Primary source is journalism (any tier) — use "reportedly", "according to [outlet]", "as reported by [outlet]".
- Official findings exist but are limited — qualify with scope of the finding.
- Company statement is the primary source — use "according to [company]" and note statement may be self-serving.
- Incident outcome is disputed — state dispute explicitly.
- Formal investigation is ongoing at time of record creation — note explicitly.
- A court or regulator has not yet ruled on key facts — do not state as fact.

---

## 5. Source and License Notes

- **No third-party article text reproduced.** Citation by URL only. No excerpts, no paraphrasing close to the original.
- **No copyrighted article reproduction.** Fair use is not assumed — cite, do not copy.
- **AIID CC BY-SA 4.0 ShareAlike clause.** No AIID data directly imported without separate CT-approved license review.
- **AIAAIC, OECD, MIT tracker.** License verifications pending from T004. Do not use data from these sources until verification complete and CT approves.
- **Stable URLs preferred.** Use archived or institutional URLs (CourtListener, PubMed, Congress.gov) where possible. Note URL access date in record if relevant.
- **Paywalled sources.** May be listed as secondary/supporting if a public-domain primary exists. Must be clearly labelled as paywalled and not reproduced.

---

## 6. Prohibited Source Practices

- No scraping of any website, database, or publication.
- No automated fetching, crawling, or bulk download of external content.
- No reproduction of copyrighted article text.
- No use of sources behind authentication walls without public-domain confirmation of the underlying facts.
- No use of social media posts as primary or sole source.
- No use of anonymous or unverified tips as any level of source.
- No use of AI-generated content as a source.

---

*See `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` for candidate selection criteria. See `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md` for the review and approval workflow.*

**Disclaimer:** This document defines planning source quality gates only. It does not constitute legal advice, legal clearance, or approval for any new incident records. Counsel review requirements stated here are operational guidance only and do not substitute for actual legal advice. Not legal advice.
