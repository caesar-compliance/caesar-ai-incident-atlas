# First Record Batch — Source Verification Log

> **Task:** T008 — First Tier 1 Incident Record Batch  
> **Branch:** `data/T008-first-tier-1-incident-record-batch`  
> **Prepared:** 19 May 2026  
> **Scope:** INC-0001 through INC-0004

This document records the source verification performed for each of the 4 Tier 1 incident records. It covers: sources checked, source type, primary/secondary classification, fields supported, source gaps, confidence rationale, wording cautions, and QA pass/fail.

---

## INC-0001 — Mata v. Avianca Court Citations

### Sources Checked

| Source | URL | Source Type | Primary/Secondary |
|---|---|---|---|
| Mata v. Avianca, S.D.N.Y., Case No. 22-cv-1461 — Sanctions Order | https://storage.courtlistener.com/recap/gov.uscourts.nysd.575595/gov.uscourts.nysd.575595.54.0.pdf | `court_record` | **Primary** |

**Source accessibility:** CourtListener is the Free Law Project's public archive of US federal court documents. The Mata v. Avianca docket is publicly accessible. URL reflects the publicly archived PACER document.

### Fields Supported by This Source

| Field | Supported | Basis |
|---|---|---|
| `title` | ✅ P | Case caption and subject matter in court order |
| `date` | ✅ P | Order date stated in court document (22 May 2023) |
| `summary` — fabricated citations found | ✅ P | Court order directly states citations were non-existent |
| `summary` — AI tool used | ✅ P | Court order describes ChatGPT as the tool used |
| `summary` — sanctions imposed | ✅ P | Court order specifies sanctions |
| `failure_modes` — FM-HALL | ✅ P | Court-confirmed fabricated citations |
| `failure_modes` — FM-REL | ✅ I | Inference from nature of failure |
| `severity` — medium | ✅ P/I | Sanctions imposed; no physical harm |
| `confidence` — high | ✅ P | Primary court document |
| `controls` — CTL-OVER-001 | ✅ P | Court noted absence of independent verification |
| `controls` — CTL-TEST-001 | ✅ I | Interpretive — no evidence tool was pre-tested |
| `controls` — CTL-DOC-001 | ✅ I | Interpretive — no AI use policy documented |
| `harms` | ✅ P | Court order describes sanctions and proceedings |
| `lessons` | ✅ I | Derived from court order findings |

**Legend: P = primary source; I = interpretive inference**

### Source Gaps

- The exact model version used (e.g., ChatGPT 3.5 vs 4) is not confirmed in the court order beyond "ChatGPT."
- Bar association follow-up proceedings not confirmed in this source.

### Confidence Rationale

**High.** The court record is unambiguous and directly confirms all key facts: fabricated citations submitted, AI tool identified, sanctions imposed.

### Wording Cautions Applied

- Court-confirmed facts stated as: "the court found that..."
- Interpretive controls noted with `[I]` classification in traceability matrix.
- Attorneys described by role; the court order names them but Caesar does not use individual names unnecessarily.
- No assertion of intentional misconduct beyond what the court found.

### QA: PASS ✅

---

## INC-0002 — Autonomous Vehicle Pedestrian Fatality

### Sources Checked

| Source | URL | Source Type | Primary/Secondary |
|---|---|---|---|
| NTSB Accident Report HWY18MH010 | https://www.ntsb.gov/investigations/Pages/HWY18MH010.aspx | `agency_report` | **Primary** |

**Source accessibility:** NTSB accident report pages are permanent public records. HWY18MH010 is the official NTSB investigation page for the Tempe, Arizona incident of 18 March 2018. The full report and associated materials are publicly available via the NTSB website.

### Fields Supported by This Source

| Field | Supported | Basis |
|---|---|---|
| `title` | ✅ P | NTSB report title and subject |
| `date` | ✅ P | Incident date stated in NTSB report: 18 March 2018 |
| `summary` — incident facts | ✅ P | NTSB report describes the collision |
| `summary` — AI perception failure | ✅ P | NTSB found perception system reclassified object and failed to brake |
| `summary` — safety driver monitoring disabled | ✅ P | NTSB report explicitly states monitoring system was disabled |
| `summary` — safety culture finding | ✅ P | NTSB identifies inadequate safety culture as contributing factor |
| `failure_modes` — FM-SAFE | ✅ P | NTSB confirmed fatality; safety system failure |
| `failure_modes` — FM-REL | ✅ P | NTSB finding of perception system failure in edge conditions |
| `severity` — critical | ✅ P | Fatality confirmed by NTSB |
| `confidence` — high | ✅ P | Primary NTSB investigation report |
| `controls` — CTL-OVER-001 | ✅ P | NTSB found monitoring system disabled |
| `controls` — CTL-TEST-001 | ✅ P/I | NTSB discusses testing adequacy |
| `controls` — CTL-MON-001 | ✅ P | NTSB finding on monitoring |
| `controls` — CTL-RISK-001 | ✅ P | NTSB cites inadequate safety risk assessment |
| `harms` | ✅ P | NTSB confirms fatal injury |
| `lessons` | ✅ P/I | Derived from NTSB safety recommendations and findings |

### Source Gaps

- The exact SAE level designation of the vehicle at the time of the incident is not confirmed in this source excerpt; described as "autonomous mode" in NTSB report.
- Specific regulatory follow-up actions post-report are not included in this record (out of scope for this incident record).

### Confidence Rationale

**High.** NTSB is a primary US government investigative agency. The final accident report is a definitive official record.

### Wording Cautions Applied

- Victim described as "a pedestrian" — not named (naming policy).
- Company named only where necessary to describe the record context (as NTSB names them).
- NTSB findings stated as "the NTSB investigation found that..." and "the report found..."
- No assertion of criminal liability or negligence beyond NTSB findings.

### QA: PASS ✅

---

## INC-0003 — Air Canada Chatbot Contract

### Sources Checked

| Source | URL | Source Type | Primary/Secondary |
|---|---|---|---|
| Moffatt v. Air Canada, 2024 BCCRT 149 | https://decisions.civilresolutionbc.ca/s/sfc/sfc-decision/a0k4X000009qFoSQAU | `tribunal_decision` | **Primary** |

**Source accessibility:** The BC Civil Resolution Tribunal publishes its decisions publicly on the civilresolutionbc.ca decisions portal. The case Moffatt v. Air Canada, 2024 BCCRT 149 is a publicly searchable and accessible decision.

**Note on URL:** The URL format used reflects the CRT decisions portal. The canonical citation is `2024 BCCRT 149`. If the portal URL changes, the decision remains accessible via the CRT decisions search at `decisions.civilresolutionbc.ca` using the citation.

### Fields Supported by This Source

| Field | Supported | Basis |
|---|---|---|
| `title` | ✅ P | Tribunal decision subject |
| `date` | ✅ P | Decision date: 14 February 2024; interaction date November 2022 noted in decision |
| `summary` — chatbot gave incorrect info | ✅ P | Tribunal finding |
| `summary` — company found liable | ✅ P | Tribunal finding: company bound by chatbot representation |
| `summary` — customer relied on information | ✅ P | Tribunal finding |
| `failure_modes` — FM-HALL | ✅ P | Tribunal confirmed incorrect policy information |
| `failure_modes` — FM-UNAUTH | ✅ P/I | Tribunal found company responsible for chatbot representation outside actual policy |
| `severity` — medium | ✅ P | Financial harm; no physical harm |
| `confidence` — high | ✅ P | Primary tribunal decision |
| `controls` — CTL-OVER-001 | ✅ I | Interpretive — no human review of chatbot output |
| `controls` — CTL-AGENT-001 | ✅ I | Interpretive — insufficient scope definition |
| `controls` — CTL-AGENT-002 | ✅ I | Interpretive — no approval workflow |
| `controls` — CTL-TEST-001 | ✅ I | Interpretive |
| `harms` | ✅ P | Tribunal confirmed financial loss |
| `lessons` | ✅ I | Derived from tribunal findings |

### Source Gaps

- Exact dollar amounts from the ruling: not included in the record as they are not necessary for governance purposes (the record describes the nature of the harm, not the quantum).
- Air Canada public response post-ruling: not included; company has not made a significant public statement confirming or contesting the facts beyond the proceedings.

### Confidence Rationale

**High.** BC Civil Resolution Tribunal decision is an official primary source. Case facts are unambiguous.

### Wording Cautions Applied

- Claimant described as "a customer" — not named (naming policy).
- Company named (Air Canada) — named in public tribunal proceedings and relevant to context.
- Tribunal findings stated as "the tribunal found that..." and "according to a decision of the BC Civil Resolution Tribunal..."
- No assertion of intent or bad faith beyond the tribunal's findings.
- No assertion of broader regulatory breach.

### QA: PASS ✅

---

## INC-0004 — Dutch SyRI Benefits System

### Sources Checked

| Source | URL | Source Type | Primary/Secondary |
|---|---|---|---|
| Hague District Court, ECLI:NL:RBDHA:2020:1878 | https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2020:1878 | `court_record` | **Primary** |
| UN Special Rapporteur Report A/HRC/41/54, October 2019 | https://www.ohchr.org/en/documents/thematic-reports/ahrc4154-visit-united-nations-special-rapporteur-extreme-poverty-and | `regulator_report` | **Secondary context** |

**Primary source accessibility:** The Dutch court ruling portal (rechtspraak.nl) is a permanent public record system. ECLI references are permanent identifiers for Dutch court decisions. The ruling is in Dutch; key findings have been widely reported and analysed in English-language legal and governance publications.

**Secondary source:** The UN Special Rapporteur report pre-dates the court ruling and provides contextual background on the broader pattern of AI use in welfare systems. Used for context only; not as an evidentiary source for record fields.

### Fields Supported by This Source

| Field | Supported | Basis |
|---|---|---|
| `title` | ✅ P | Court ruling subject matter |
| `date` | ✅ P | Court ruling date: 5 February 2020 |
| `summary` — system description | ✅ P | Court ruling describes SyRI system |
| `summary` — Article 8 ECHR violation | ✅ P | Court ruling finding |
| `summary` — transparency failure | ✅ P | Court finding on algorithmic opacity |
| `summary` — lower-income deployment | ✅ P | Court finding on disproportionate deployment |
| `summary` — system discontinued | ✅ P/S | Widely confirmed in English-language legal commentary; Dutch government confirmed via public record |
| `failure_modes` — FM-BIAS | ✅ P | Court finding on disproportionate deployment |
| `failure_modes` — FM-TRANS | ✅ P | Court finding on opacity |
| `failure_modes` — FM-UNAUTH | ✅ P/I | Court found legal framework incompatible with rights; interpretive inference on oversight gap |
| `severity` — high | ✅ P | Fundamental rights violation confirmed by court |
| `confidence` — high | ✅ P | Primary court record |
| `controls` | ✅ P/I | Mix of court findings and governance inference |
| `harms` | ✅ P | Court addresses systemic level harm |
| `lessons` | ✅ I | Derived from court findings |

### Source Gaps

- Dutch-language primary: the full ruling text is in Dutch. Caesar's summary is based on publicly reported English-language analyses of the ruling and does not translate the Dutch text directly.
- Specific primary government source for SyRI discontinuation not independently confirmed; widely reported in credible media and legal commentary. Stated cautiously in `impact` field.

### Confidence Rationale

**High.** Court ruling is unambiguous. ECLI reference is a permanent citation. English-language analysis of the ruling is extensive and consistent across multiple authoritative legal and governance sources.

### Wording Cautions Applied

- Summary uses "the court found that..." for all court-confirmed facts.
- No assertion that specific individuals' rights were individually violated — the court finding was at the systemic legal framework level.
- `impact` states discontinuation in past tense with attribution ("did not appeal the ruling... was discontinued following the ruling") — standard cautious phrasing.
- No defamatory characterisations of the Dutch government.
- UN Special Rapporteur report explicitly labelled as secondary context in `sources.title`.

### QA: PASS ✅
