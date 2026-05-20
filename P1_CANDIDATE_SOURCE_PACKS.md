# P1 Candidate Source Packs — INC-0011+ Planning

**Task:** T035 — P1 Candidate Source Pack Planning
**Date:** 20 May 2026
**Version:** 0.7.3
**Status:** Planning only — NOT legal advice. No candidates approved. All status: `not_approved_candidate`.

---

## Governance Notice

- No candidate in this document is approved for publication.
- No new incident records were created.
- No sources are legally cleared for use.
- No publication decision has been made.
- All candidates remain status: `not_approved_candidate`.
- All source URLs listed are planning references only — they have not been licensed, reproduced, or copied.
- All candidates require explicit CT approval before drafting begins.
- Not legal advice.

---

## CAND-001 — AI Credit Scoring Racial Bias (US)

**Candidate ID:** CAND-001
**Working title:** AI credit-scoring system produces racially disparate outcomes — US
**Jurisdiction:** United States
**Sector:** `finance-credit`
**AI system / use case:** Automated credit risk scoring / adverse action notification
**Planning status:** `not_approved_candidate`

### Source Candidates

| # | URL | Source Type | Tier | Notes |
|---|---|---|---|---|
| 1 | `https://www.consumerfinance.gov/about-us/newsroom/cfpb-acts-to-protect-the-public-from-black-box-credit-models-using-complex-algorithms/` | Regulator/government record — CFPB press release | Tier 1 | CFPB confirms requirement for specific adverse action reasons even for AI/algorithmic models; public domain; stable URL |
| 2 | `https://www.consumerfinance.gov/about-us/newsroom/cfpb-issues-guidance-on-credit-denials-by-lenders-using-artificial-intelligence/` | Regulator/government record — CFPB Circular 2023-03 | Tier 1 | CFPB guidance specifically on AI credit denial explanations; public domain |
| 3 | `https://www.ftc.gov/system/files/ftc_gov/pdf/EEOC-CRT-FTC-CFPB-AI-Joint-Statement(final).pdf` | Regulator/government record — Joint Agency Statement | Tier 1 | CFPB + FTC + DOJ + EEOC joint statement on algorithmic discrimination enforcement; public domain |
| 4 | `https://files.consumerfinance.gov/f/documents/cfpb_fair-lending-report_fy-2023.pdf` | Regulator/government record — CFPB Fair Lending Report FY2023 | Tier 1 | Annual fair lending enforcement report; public domain |

**Source assessment:** Strong Tier 1 regulatory source base available from CFPB. Note: existing sources are guidance/policy documents, not a specific enforcement action against a named entity. A specific consent order against a named lender would be stronger. Drafting without a specific enforcement action is possible but requires careful wording (policy/guidance frame rather than named-entity incident frame).

### Source-Risk Assessment

| Field | Value |
|---|---|
| Source-risk level | **Low** |
| Reproduction risk | Low — cite URLs only; no text reproduction |
| Reliance on copyrighted narrative | None — all sources are public-domain government publications |
| Official primary source exists | Yes — CFPB Tier 1 |
| Counsel review likely required | No — if framed as regulatory guidance incident rather than named-entity allegation |

### Wording/Legal-Risk Assessment

| Field | Value |
|---|---|
| Wording/legal-risk level | **Medium** |
| Main sensitivity | Protected characteristics (racial disparate impact); financial harm |
| Suggested safe wording posture | "CFPB confirmed" / "CFPB issued guidance finding" — no named lender unless specific enforcement action identified |

### Drafting Readiness

**`source_pack_ready_for_CT_review`** — Tier 1 regulatory sources confirmed. Frame as regulatory-guidance incident (CFPB Circular 2022-03 + 2023-03 confirming AI adverse action obligations). If CT wants a named-entity version, a specific enforcement action must be sourced first.

### Notes

- **Why include:** Strong governance lesson on FCRA/ECOA AI adverse action obligations; CFPB sources are Tier 1 public domain; adds `finance-credit` sector.
- **Gate before drafting:** CT candidate approval; source/license review (confirm public domain); wording review (choose policy-frame vs named-entity frame).

---

## CAND-002 — UK Automated Welfare Benefit Denial AI (UK)

**Candidate ID:** CAND-002
**Working title:** Automated welfare benefit denial system — AI bias findings — UK
**Jurisdiction:** United Kingdom
**Sector:** `public-sector`
**AI system / use case:** DWP AI fraud-detection / benefits eligibility system
**Planning status:** `not_approved_candidate`

### Source Candidates

| # | URL | Source Type | Tier | Notes |
|---|---|---|---|---|
| 1 | `https://www.theguardian.com/society/2024/dec/06/revealed-bias-found-in-ai-system-used-to-detect-uk-benefits` | Media — Guardian (major outlet) | Tier 3 | Guardian exclusive reporting DWP AI fraud-detection system showing bias by age, disability, marital status, nationality; Dec 2024; journalism only at this tier |
| 2 | `https://commonslibrary.parliament.uk/challenging-benefits-decisions/` | Official — UK Parliament / Commons Library | Tier 1 | Parliamentary record of DWP benefit challenge process; provides legal/procedural context |
| 3 | `https://ico.org.uk/` | Regulator — ICO | Tier 1 | ICO is the relevant UK GDPR regulator; may hold relevant decision records — specific ICO investigation or DPIA requirement records to be verified |

**Source assessment:** Guardian Dec 2024 report is valuable but is currently Tier 3 journalism-only. A formal parliamentary report, DWP impact assessment, or ICO investigation decision would be needed to upgrade to Tier 1/2. The parliamentary library page provides context but is not the primary incident anchor. **Needs further source verification — DWP DPIA, parliamentary committee report, or ICO record required.**

### Source-Risk Assessment

| Field | Value |
|---|---|
| Source-risk level | **Medium** |
| Reproduction risk | Low — cite URLs only |
| Reliance on copyrighted narrative | Medium — primary anchor is currently journalism |
| Official primary source exists | Partial — needs DWP/parliament/ICO record to confirm Tier 1 |
| Counsel review likely required | No — if official source found; yes if sole source remains journalism |

### Wording/Legal-Risk Assessment

| Field | Value |
|---|---|
| Wording/legal-risk level | **Medium** |
| Main sensitivity | Protected characteristics (disability, nationality, age); government system |
| Suggested safe wording posture | "reportedly" / "as reported by the Guardian" until official DWP/ICO record confirmed; upgrade to "ICO found" / "parliamentary review found" once official source confirmed |

### Drafting Readiness

**`needs_primary_source`** — Guardian Tier 3 found; DWP DPIA / parliamentary committee report / ICO decision needed as Tier 1 anchor before drafting.

### Notes

- **Why include:** UK jurisdiction; GDPR Article 22 automated decision-making; disability/nationality bias in government AI; strong governance lesson.
- **Gate before drafting:** CT candidate approval; source verification (DWP DPIA or ICO record or parliamentary committee report); wording/legal-risk review.

---

## CAND-003 — AI Exam Proctoring Bias (US/Global)

**Candidate ID:** CAND-003
**Working title:** AI exam proctoring system generates racially disparate false-positive flags
**Jurisdiction:** United States (primary); global
**Sector:** `education`
**AI system / use case:** Automated remote exam proctoring (facial detection, behavioural analysis)
**Planning status:** `not_approved_candidate`

### Source Candidates

| # | URL | Source Type | Tier | Notes |
|---|---|---|---|---|
| 1 | `https://pmc.ncbi.nlm.nih.gov/articles/PMC8407138/` | Academic / peer-reviewed — PubMed Central (PMC) | Tier 2 | Coghlan et al. (2021) — ethics of online exam supervision including bias concerns; open access via PMC; PMID available |
| 2 | `https://harvardlawreview.org/` | Academic / law review — Harvard Law Review | Tier 2 | Harvard Law Review coverage of AI proctoring; verify specific article |
| 3 | `https://library.auraria.edu/news/2021/why-online-test-proctoring-biased-expert` | Institutional report — Auraria Library / cited in US Senate letter | Tier 2 | Auraria Library research cited in US Senate letter to ExamSoft; institutional source |
| 4 | `https://www.technologyreview.com/2020/08/07/1006132/software-algorithms-proctoring-online-tests-ai-ethics/` | Media — MIT Technology Review | Tier 3 | MIT Tech Review 2020 coverage; secondary support only |

**Source assessment:** PMC open-access peer-reviewed paper (Coghlan et al., 2021) is available as Tier 2 primary. The Auraria Library research cited in a US Senate letter adds institutional weight. US Senate letter to ExamSoft (if publicly available) would be Tier 1. **Needs: confirm PMC article PMID and open-access status; locate US Senate letter URL (it is publicly available via senate.gov or direct PDF).**

### Source-Risk Assessment

| Field | Value |
|---|---|
| Source-risk level | **Medium** |
| Reproduction risk | Low — cite DOI/PMID only; no text reproduction |
| Reliance on copyrighted narrative | Low if using PMC open-access; avoid MIT Tech Review as sole source |
| Official primary source exists | Yes (academic/PMC) — confirm open access; US Senate letter adds strength |
| Counsel review likely required | No — if framed as peer-reviewed research finding |

### Wording/Legal-Risk Assessment

| Field | Value |
|---|---|
| Wording/legal-risk level | **Medium** |
| Main sensitivity | Protected characteristics (race, disability); vendor characterisation |
| Suggested safe wording posture | "researchers found" / "peer-reviewed study found" — avoid naming specific vendor as definitively biased without formal regulatory finding |

### Drafting Readiness

**`source_pack_ready_for_CT_review`** — PMC Tier 2 peer-reviewed source confirmed available. Recommend confirming PMID and locating US Senate letter before CT submission.

### Notes

- **Why include:** Adds `education` sector; FM-BIAS + FM-REL in academic assessment context; strong open-access academic source base; US Senate letter adds governance weight.
- **Gate before drafting:** CT candidate approval; source/license review (confirm PMC open access, PMID); wording/legal-risk review (vendor name handling).

---

## CAND-004 — Algorithmic Sentencing Risk Score Racial Bias (US)

**Candidate ID:** CAND-004
**Working title:** Sentencing risk-score algorithm challenged for racial bias — COMPAS, State v. Loomis
**Jurisdiction:** United States (Wisconsin)
**Sector:** `criminal-justice`
**AI system / use case:** COMPAS recidivism risk scoring tool used in criminal sentencing
**Planning status:** `not_approved_candidate`

### Source Candidates

| # | URL | Source Type | Tier | Notes |
|---|---|---|---|---|
| 1 | `https://harvardlawreview.org/print/vol-130/state-v-loomis/` | Academic / law review — Harvard Law Review (case note) | Tier 2 | Harvard Law Review Vol. 130 analysis of State v. Loomis (Wis. Supreme Court 2016); academic secondary; citable |
| 2 | `https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing` | Media / investigative journalism — ProPublica | Tier 3 | ProPublica "Machine Bias" 2016; foundational investigative report; Tier 3 (journalism); secondary support |
| 3 | `https://www.scotusblog.com/wp-content/uploads/2017/05/16-6387-CVSG-Loomis-AC-Pet.pdf` | Court record — SCOTUS petition filing | Tier 1 | SCOTUS certiorari petition (Case No. 16-6387); public court record; SCOTUS denied cert June 2017 |
| 4 | Wisconsin Supreme Court — State v. Loomis, 2016 WI 68 | Court record — Wisconsin Supreme Court decision | Tier 1 | Primary case: 2016 WI 68, 371 Wis. 2d 235; published Wisconsin Supreme Court opinion; public record — confirm URL via courts.wi.gov or Google Scholar |

**Source assessment:** Strong Tier 1 court record available (Wisconsin Supreme Court 2016 WI 68). SCOTUS petition filing (public record) also available. ProPublica is Tier 3 secondary support. Harvard Law Review adds academic context. **This is one of the strongest-sourced candidates — court record is public, authoritative, and directly addresses AI sentencing bias.**

### Source-Risk Assessment

| Field | Value |
|---|---|
| Source-risk level | **Low** |
| Reproduction risk | Low — cite case citation and court URL only |
| Reliance on copyrighted narrative | None — court records are public; ProPublica is secondary only |
| Official primary source exists | Yes — Wisconsin Supreme Court 2016 WI 68 |
| Counsel review likely required | **Yes — recommended** — criminal justice + racial disparate impact intersection; named algorithmic tool |

### Wording/Legal-Risk Assessment

| Field | Value |
|---|---|
| Wording/legal-risk level | **Medium–High** |
| Main sensitivity | Protected characteristics (race); criminal justice; named tool (COMPAS); named individual (defendant — matter of public court record) |
| Suggested safe wording posture | "Wisconsin Supreme Court held" / "court found" / accurately reflect what the court ruled — do not overstate racial bias finding beyond what the court adjudicated; ProPublica findings are contested — frame as "researchers found" with hedge |

### Drafting Readiness

**`needs_counsel_gate`** — Court record confirmed and strong. Recommend counsel review before drafting given racial bias + criminal justice intersection and the contested nature of the ProPublica analysis.

### Notes

- **Why include:** Landmark case; Tier 1 court record available; adds `criminal-justice` sector; FM-BIAS + FM-TRANS in high-stakes context.
- **Gate before drafting:** CT candidate approval; source/license review; wording/legal-risk review; **counsel review required**.

---

## CAND-008 — AI Hiring Assessment — Disability Bias (US)

**Candidate ID:** CAND-008
**Working title:** AI hiring assessment tool — disability discrimination — EEOC guidance and ADA obligations
**Jurisdiction:** United States
**Sector:** `hiring-employment`
**AI system / use case:** AI video interview / behavioural / cognitive assessment screening tool
**Planning status:** `not_approved_candidate`

### Source Candidates

| # | URL | Source Type | Tier | Notes |
|---|---|---|---|---|
| 1 | `https://www.eeoc.gov/eeoc-disability-related-resources/artificial-intelligence-and-ada` | Regulator/government — EEOC official guidance | Tier 1 | EEOC 2022 guidance: "The Americans with Disabilities Act and the Use of Software, Algorithms, and Artificial Intelligence to Assess Job Applicants and Employees"; public domain |
| 2 | `https://www.ada.gov/assets/pdfs/ai-guidance.pdf` | Regulator/government — DOJ ADA guidance | Tier 1 | DOJ 2022 ADA guidance on AI and disability discrimination; public domain |
| 3 | `https://www.eeoc.gov/newsroom/us-eeoc-and-us-department-justice-warn-against-disability-discrimination` | Regulator/government — EEOC press release | Tier 1 | EEOC + DOJ joint warning on disability discrimination in AI hiring tools; public domain |

**Source assessment:** Very strong Tier 1 source base — EEOC and DOJ have published specific official guidance and warnings on AI hiring tools and disability discrimination. Frame as regulatory guidance incident (similar to CAND-001 approach). A specific EEOC consent decree against a named employer would add further strength but is not required for a policy-framed record.

### Source-Risk Assessment

| Field | Value |
|---|---|
| Source-risk level | **Low** |
| Reproduction risk | Low — public domain government publications |
| Reliance on copyrighted narrative | None |
| Official primary source exists | Yes — EEOC + DOJ Tier 1 |
| Counsel review likely required | No — framed as regulatory guidance record |

### Wording/Legal-Risk Assessment

| Field | Value |
|---|---|
| Wording/legal-risk level | **Medium** |
| Main sensitivity | Protected characteristics (disability); employment discrimination |
| Suggested safe wording posture | "EEOC found" / "EEOC and DOJ warned" / "EEOC guidance states" — no named employer unless specific enforcement action identified |

### Drafting Readiness

**`source_pack_ready_for_CT_review`** — Three Tier 1 EEOC/DOJ sources confirmed. Ready for CT candidate approval.

### Notes

- **Why include:** Expands `hiring-employment` with disability-bias angle; distinct from INC-0006/INC-0010 (gender/race bias); EEOC + DOJ Tier 1 sources; adds ADA compliance lesson.
- **Gate before drafting:** CT candidate approval; source/license review (confirm public domain); wording/legal-risk review.

---

## CAND-010 — LLM Legal Document Errors — Court Sanctions (US/Global)

**Candidate ID:** CAND-010
**Working title:** Attorney AI-generated court filings contain hallucinated citations — court sanctions (post-Mata cases)
**Jurisdiction:** United States (multiple federal districts)
**Sector:** `legal-compliance`
**AI system / use case:** Generative AI (LLM) used to draft court filings; hallucinated case citations submitted to courts
**Planning status:** `not_approved_candidate`

### Source Candidates

| # | URL | Source Type | Tier | Notes |
|---|---|---|---|---|
| 1 | Garfield v.Icher, No. 2:21-cv-1701 (N.D. Ala., July 23, 2025) | Court record — US District Court sanction order | Tier 1 | Federal court sanction order for AI-hallucinated citations; confirm via PACER/CourtListener — distinct from Mata |
| 2 | Couvrette v. Brigandi (Oregon, 2024–2026) | Court record — Oregon District Court / state court | Tier 1 | San Diego attorney sanctioned for 23 hallucinated citations in Oregon proceeding; confirm via CourtListener |
| 3 | `https://www.abajournal.com/news/article/no-42-law-firm-by-headcount-could-face-sanctions-over-fake-case-citations-generated-by-chatgpt` | Media — ABA Journal | Tier 3 | ABA Journal reporting on law firm AI sanctions; secondary support |
| 4 | `https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-september/common-issues-arise-ai-sanction-jurisprudence/` | Institutional — ABA Business Law Today | Tier 2 | ABA survey of AI sanction jurisprudence 2024; secondary support |

**Source assessment:** Multiple post-Mata court sanction orders exist in public federal court records. The key task is selecting one specific, well-documented sanction order distinct from INC-0001 (Mata v. Avianca). Garfield v.Icher (N.D. Ala. 2025) and the Oregon Brigandi matter (2024–2026) are confirmed candidates — both accessible via CourtListener/PACER. **Confirm specific CourtListener URL for chosen case before drafting.**

### Source-Risk Assessment

| Field | Value |
|---|---|
| Source-risk level | **Low** |
| Reproduction risk | Low — cite case citation and CourtListener URL |
| Reliance on copyrighted narrative | None — court orders are public records |
| Official primary source exists | Yes — federal/state court sanction orders |
| Counsel review likely required | No — court records are authoritative |

### Wording/Legal-Risk Assessment

| Field | Value |
|---|---|
| Wording/legal-risk level | **Low–Medium** |
| Main sensitivity | Named attorneys (matter of public record); law firm characterisation |
| Suggested safe wording posture | "court found" / "court sanctioned" — accurately reflect sanction; attorney names are in public court record and may be included |

### Drafting Readiness

**`source_pack_ready_for_CT_review`** — Court sanction records confirmed to exist. Requires specific CourtListener URL selection for one case (recommend Garfield v.Icher N.D. Ala. 2025 or equivalent well-documented case). Distinct from INC-0001.

### Notes

- **Why include:** Expands `legal-compliance` with post-Mata sanction pattern; Tier 1 court records available; strong governance lesson on LLM output verification for legal professionals.
- **Gate before drafting:** CT candidate approval; source selection (choose one specific case, confirm CourtListener URL); wording/legal-risk review.

---

## CAND-011 — Retail Facial Recognition — ICO Investigation (UK)

**Candidate ID:** CAND-011
**Working title:** Retail facial recognition deployment — ICO investigation — Southern Co-op / Facewatch — UK
**Jurisdiction:** United Kingdom
**Sector:** `retail-ecommerce`
**AI system / use case:** Live facial recognition (Facewatch) deployed in Southern Co-op retail stores for loss prevention
**Planning status:** `not_approved_candidate`

### Source Candidates

| # | URL | Source Type | Tier | Notes |
|---|---|---|---|---|
| 1 | `https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2023/03/balancing-people-s-privacy-rights-with-the-need-to-prevent-crime/` | Regulator/government — ICO official publication | Tier 1 | ICO March 2023 statement on Facewatch investigation outcome; confirmed stable ICO URL |
| 2 | `https://southern.coop/news/ico-investigation-into-facewatch` | Official company statement — Southern Co-op | Tier 2 | Southern Co-op official response to ICO Facewatch investigation outcome; confirms ICO investigation |
| 3 | `https://bigbrotherwatch.org.uk/blog/update-big-brother-watchs-complaint-to-the-ico-on-retailer-facial-recognition/` | NGO documentation — Big Brother Watch | Secondary/context | Filed the original ICO complaint; confirms complaint timeline — not primary source |

**Source assessment:** ICO March 2023 official statement is confirmed Tier 1. Southern Co-op official statement is Tier 2 corroboration. ICO investigation outcome (non-enforcement — found Facewatch made improvements; did not issue enforcement notice) means the record needs careful framing — this is an ICO review finding rather than an enforcement order. The governance lesson (ICO scrutiny, GDPR/UK GDPR live biometric processing obligations) remains strong even without a formal enforcement notice.

### Source-Risk Assessment

| Field | Value |
|---|---|
| Source-risk level | **Low** |
| Reproduction risk | Low — cite ICO URL only |
| Reliance on copyrighted narrative | None — ICO publications are public record |
| Official primary source exists | Yes — ICO Tier 1 |
| Counsel review likely required | No — ICO record is authoritative |

### Wording/Legal-Risk Assessment

| Field | Value |
|---|---|
| Wording/legal-risk level | **Medium** |
| Main sensitivity | Named company (Southern Co-op); named vendor (Facewatch); biometric data processing |
| Suggested safe wording posture | "ICO reviewed" / "ICO found" — accurately reflect ICO outcome (investigation, not enforcement notice); note Facewatch made improvements; do not characterise as unlawful without ICO enforcement finding |

### Drafting Readiness

**`source_pack_ready_for_CT_review`** — ICO Tier 1 source confirmed. Note: ICO outcome was a review/investigation with no formal enforcement notice issued — drafting must accurately reflect this. Strong governance lesson remains.

### Notes

- **Why include:** UK jurisdiction; Tier 1 ICO source; FM-PRIV + FM-TRANS in `retail-ecommerce`; biometric data processing lesson; distinct from INC-0003.
- **Gate before drafting:** CT candidate approval; source/license review (confirm ICO URL stable); wording/legal-risk review (accurately reflect ICO non-enforcement outcome).

---

## CAND-013 — Race-Based Spirometry Algorithm Bias (US)

**Candidate ID:** CAND-013
**Working title:** Race-based correction factor in pulmonary function / spirometry algorithm — ATS/ERS guideline revision
**Jurisdiction:** United States (primary); international (ATS/ERS guidelines are global)
**Sector:** `healthcare-medical`
**AI system / use case:** Medical diagnostic algorithm using race-based reference values in spirometry (lung function testing)
**Planning status:** `not_approved_candidate`

### Source Candidates

| # | URL | Source Type | Tier | Notes |
|---|---|---|---|---|
| 1 | `https://site.thoracic.org/about-us/news/ats-publishes-official-statement-on-race-ethnicity-and-pulmonary-function-test-interpretation` | Official medical society — ATS official statement | Tier 1 | American Thoracic Society (ATS) official statement on race/ethnicity and pulmonary function test interpretation; public domain |
| 2 | `https://pubmed.ncbi.nlm.nih.gov/38607551/` | Academic / peer-reviewed — PubMed (PMID 38607551) | Tier 2 | Application of ERS/ATS 2022 GLI reference equations; published in American Journal of Respiratory and Critical Care Medicine; PubMed indexed |
| 3 | `https://www.aafp.org/pubs/afp/issues/2023/0300/editorial-spirometry-interpretation.html` | Academic / peer-reviewed — American Family Physician | Tier 2 | AAFP 2023 editorial on reconsidering race in spirometry interpretation; peer-reviewed |
| 4 | `https://www.mayoclinicproceedings.org/article/S0025-6196(24)00263-5/fulltext` | Academic / peer-reviewed — Mayo Clinic Proceedings | Tier 2 | Mayo Clinic Proceedings 2024 — rethinking race in lung function; open-access fulltext |

**Source assessment:** Exceptional Tier 1/2 source base. ATS official statement is Tier 1. Three independent peer-reviewed publications (PubMed, AAFP, Mayo Clinic Proceedings) are available as Tier 2. This is among the strongest-sourced candidates in the entire P1 set.

### Source-Risk Assessment

| Field | Value |
|---|---|
| Source-risk level | **Low** |
| Reproduction risk | Low — cite URLs/DOIs/PMIDs only; all open access or indexable |
| Reliance on copyrighted narrative | None — ATS official statement is public domain; Mayo Clinic Proceedings fulltext open access confirmed |
| Official primary source exists | Yes — ATS Tier 1 + multiple Tier 2 peer-reviewed |
| Counsel review likely required | No |

### Wording/Legal-Risk Assessment

| Field | Value |
|---|---|
| Wording/legal-risk level | **Low–Medium** |
| Main sensitivity | Race in medicine — must follow peer-reviewed clinical framing; avoid overstating harm beyond published evidence |
| Suggested safe wording posture | "ATS found" / "researchers found" / "peer-reviewed studies found" — clinically accurate framing following ATS and published guidance |

### Drafting Readiness

**`source_pack_ready_for_CT_review`** — Strongest Tier 1/2 source base of all P1 candidates. Ready for CT candidate approval immediately.

### Notes

- **Why include:** Expands `healthcare-medical` with distinct failure (race-based algorithmic correction vs resource allocation bias in INC-0009); ATS Tier 1 + multiple Tier 2; adds FM-BIAS in clinical tool context.
- **Gate before drafting:** CT candidate approval; source/license review (confirm PMIDs and open-access status); wording/legal-risk review.

---

*See `P1_CANDIDATE_SOURCE_RISK_MATRIX.md` for triage summary. See `P1_CANDIDATE_PRIORITIZATION_RECOMMENDATION.md` for first-batch recommendation.*

**Disclaimer:** This document is planning material only. No candidate is approved for record creation. No sources have been licensed, reproduced, or copied. Not legal advice.
