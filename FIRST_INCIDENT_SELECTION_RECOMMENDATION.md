# First Incident Selection Recommendation

> **Candidate only — not incident records.**  
> This document provides a selection recommendation for Control Tower review. No incident records have been created. All final decisions require explicit Control Tower approval before T007 is initiated.  
>
> **Prepared:** 19 May 2026  
> **Task:** T006 — First Incident Candidate Dossier Preparation  
> **Branch:** `research/T006-first-incident-candidate-dossier-preparation`

---

## Recommendation Summary

**Recommended for First MVP Batch (10 candidates): Accept**  
**Recommended for future batch (4 candidates): Postpone**  
**Recommended against inclusion (1 candidate): Reject**

---

## Recommended Accept: First MVP Batch of 10

The following 10 candidates are recommended for the first Dataset MVP batch, subject to Control Tower approval:

### Tier 1 — Highest Priority (strongest primary sources)

#### CAND-003 — LLM Fabricated Legal Case Citations
- **Why:** Public court record (Mata v. Avianca, SDNY 2023) is an unambiguous primary source. Clearest example of FM-HALL with documented real-world professional consequences. Legal sector is distinct. Very low acceptance risk.
- **Source anchor:** Mata v. Avianca, S.D.N.Y., Case No. 22-cv-1461 (2023).

#### CAND-006 — Autonomous Vehicle Pedestrian Fatality
- **Why:** NTSB Accident Report HWY18MH010 is a primary official government investigation. FM-SAFE at critical severity level. Transportation sector provides unique diversity. One of the most important AI safety incidents in public record.
- **Source anchor:** NTSB Report HWY18MH010 (November 2019).

#### CAND-011 — LLM Chatbot Unauthorised Contract Commitment (Air Canada)
- **Why:** BC Civil Resolution Tribunal ruling (2024) is a primary official source. Demonstrates FM-UNAUTH and FM-HALL in a consumer services context with real legal accountability. Agentic AI failure mode is critical for Caesar's governance focus.
- **Source anchor:** Air Canada v. Moffatt, BC Civil Resolution Tribunal, 2024.

#### CAND-012 — Automated Benefits Denial (Dutch SyRI System)
- **Why:** Hague District Court ruling (ECLI:NL:RBDHA:2020:1878, February 2020) confirmed fundamental rights violation. FM-BIAS + FM-TRANS in government/public services. Court-confirmed facts reduce acceptance risk to minimum.
- **Source anchor:** Hague District Court ruling, February 2020.

### Tier 2 — Strong (strong secondary sources, well-corroborated)

#### CAND-002 — Facial Recognition Wrongful Arrest
- **Why:** NIST FRVT official data provides primary source on accuracy differentials. Individual case (Robert Williams, Detroit Police, 2020) is documented by ACLU and multiple independent sources. FM-BIAS in law enforcement is canonical and important.
- **Source anchor:** NIST FRVT performance reports + ACLU Robert Williams case documentation.

#### CAND-004 — AI Recruitment Gender Bias (Amazon)
- **Why:** Reuters investigative report (2018) is credible multi-source investigative journalism. FM-BIAS in employment is well-established. Important historical example that set the precedent for bias awareness in hiring AI.
- **Source anchor:** Reuters, October 2018 — "Amazon scraps secret AI recruiting tool."  
- **Note:** Use hedging language as no direct company confirmation. Reuters methodology credible.

#### CAND-005 — Content Moderation Over-Removal (COVID-19)
- **Why:** Meta/Facebook public blog acknowledgement provides a company statement as primary confirmation. FM-REL in content platform context. High public interest. Represents reliability failure at scale.
- **Source anchor:** Meta Transparency Centre blog, March 2020.

#### CAND-010 — AI Diagnostic Bias in Underrepresented Populations
- **Why:** Obermeyer et al. (2019) in Science journal is a landmark peer-reviewed study with documented real-world deployment context. FM-BIAS in healthcare — distinct from employment sector. Strong academic primary source.
- **Source anchor:** Obermeyer et al. (2019), "Dissecting racial bias in an algorithm used to manage the health of populations," Science.

### Tier 3 — Good (acceptable for MVP with care)

#### CAND-009 — AI-Generated Non-Consensual Intimate Images
- **Why:** Multiple platform acknowledgements and legislative responses confirm real-world harm. FM-PRIV + FM-SAFE. Consumer technology sector is important for coverage. Framing must focus on platform/system failure, not identify individuals.
- **Source anchor:** Platform public statements; UK Online Safety Act and US DEFIANCE Act legislative context.  
- **Note:** Medium source risk — requires careful framing. Do not identify individual victims.

#### CAND-015 — LLM Hiring Assessment Discrimination
- **Why:** EEOC Technical Assistance Guidance (May 2023) is a primary official regulatory source. NYC Local Law 144 provides additional regulatory context. FM-BIAS in employment with a regulatory angle — distinct from CAND-004 (internal tool) by being sector-wide regulatory response.
- **Source anchor:** EEOC Technical Assistance Guidance, May 2023 + NYC Local Law 144 context.  
- **Note:** Ideally supplement with a specific enforcement action citation in T007 if available.

---

## Diversity Assessment of Recommended 10

The recommended 10 candidates together provide the following coverage:

### Failure Mode Coverage

| Failure Mode | Candidates | Coverage |
|---|---|---|
| Privacy / Data Leakage (FM-PRIV) | CAND-009 | ✓ |
| Bias / Discrimination (FM-BIAS) | CAND-002, CAND-004, CAND-010, CAND-012, CAND-015 | ✓ Strong |
| Hallucination / Misinformation (FM-HALL) | CAND-003, CAND-005, CAND-011 | ✓ |
| Unauthorised AI Agent Action (FM-UNAUTH) | CAND-011 | ✓ |
| Safety / Physical Harm (FM-SAFE) | CAND-006, CAND-009 | ✓ |
| Reliability / Model Failure (FM-REL) | CAND-005 | ✓ |
| Transparency / Explainability Failure (FM-TRANS) | CAND-012 | ✓ |
| Security / Prompt Injection (FM-SEC) | ❌ Not represented | Gap — note for T007 planning |

### Sector Coverage

| Sector | Candidates |
|---|---|
| Healthcare | CAND-010 |
| Law Enforcement / Criminal Justice | CAND-002 |
| Legal / Professional Services | CAND-003 |
| Employment / Human Resources | CAND-004, CAND-015 |
| Social Media / Content Platforms | CAND-005 |
| Transportation / Autonomous Vehicles | CAND-006 |
| Consumer Technology | CAND-009 |
| Consumer Services / Retail | CAND-011 |
| Government / Public Services | CAND-012 |

**9 distinct sectors** covered in 10 records. Employment is the only duplicated sector (CAND-004 + CAND-015 are sufficiently distinct: internal company tool vs. sector-wide regulatory response).

### Source Type Diversity

| Source Type | Candidates |
|---|---|
| Court / tribunal rulings | CAND-003, CAND-011, CAND-012 |
| Official government investigation | CAND-006 |
| Official regulatory guidance | CAND-015 |
| Academic peer-reviewed | CAND-010 |
| Investigative journalism (multi-source) | CAND-002, CAND-004 |
| Company statement / acknowledgement | CAND-005, CAND-009 |

No single source type dominates. Good epistemological diversity.

---

## Recommended Postpone: 4 Candidates

| Candidate ID | Title | Reason for Postponement | What Would Unlock |
|---|---|---|---|
| CAND-001 | Healthcare chatbot inaccurate treatment guidance | No confirmed named primary source for a specific provider/incident | Named provider + regulatory report or company statement |
| CAND-007 | Predictive policing deployment | Systemic pattern, not a discrete documentable incident | Identify specific named jurisdiction + specific documented harm event |
| CAND-008 | AI financial advice inaccuracy | No confirmed discrete company-acknowledged incident; weak source quality | Specific regulatory enforcement action or company-confirmed incident |
| CAND-013 | AI code generation security vulnerabilities | Academic study of risk pattern; no confirmed discrete production incident with exploitation | Documented real-world production incident where AI-generated vulnerable code was exploited |

**Postponed candidates should be revisited in later MVP batches** once better primary sources are available. They represent important coverage areas (Healthcare/HALL, Law Enforcement/BIAS systemic, Financial/HALL, Security/FM-SEC) that are worth pursuing.

---

## Recommended Reject: 1 Candidate

| Candidate ID | Title | Reason for Rejection |
|---|---|---|
| CAND-014 | AI surveillance false flags at border control | Significant overlap with CAND-002 (FM-BIAS, law enforcement/government context, facial recognition); weak discrete incident documentation; insufficient distinctive value to justify separate record |

**CAND-014 should not be included in the first or subsequent MVP batches** unless a substantially distinct documented incident (different failure mode, different sector, stronger primary source) is identified. Notes from CAND-014 research may be appended as a supplementary note in the CAND-002 record when created.

---

## Recommended Action for T007

Following Control Tower approval of this recommendation, T007 should:

1. **Create final incident records** for the 10 approved Accept candidates, subject to Control Tower sign-off on each candidate individually.
2. **Assign `INC-XXXX` IDs** sequentially (INC-0001 through INC-0010) only after formal approval.
3. **Create incident JSON files** in `data/incidents/` using `schemas/incident.schema.json`.
4. **Conduct source verification** per `SOURCE_VERIFICATION_WORKFLOW.md` for each record before finalising.
5. **Flag the FM-SEC coverage gap** to the Control Tower — consider identifying a discrete security/prompt-injection incident for a second batch.
6. **Revisit Postponed candidates** in T008 or a dedicated second batch task.

---

## Constraints Confirmed

- No incident records have been created in T006.
- `data/incidents/` contains only `.gitkeep`.
- No `INC-XXXX` IDs have been assigned.
- No incident JSON files exist.
- All candidate documents are clearly labelled "Candidate only — not an incident record."
- No external datasets were imported or copied.

---

## Next Step

The recommended next step is **T007 — First Incident Record Creation Plan**, but only with:

1. Explicit Control Tower review and approval of this T006 recommendation.
2. Identification of any additional source verification steps required per `SOURCE_VERIFICATION_WORKFLOW.md`.
3. Formal initiation of T007 by Control Tower.

Until Control Tower approval is received, `data/incidents/` must remain empty except `.gitkeep`.
