# Source-to-Field Traceability Matrix

> **Planning document — not incident records.**  
> This matrix shows, for each Tier 1 candidate, which source supports which field, the source type, and wording conventions required.  
>
> **Prepared:** 19 May 2026  
> **Task:** T007 — First Incident Record Creation Plan  
> **Branch:** `docs/T007-first-incident-record-creation-plan`  
> **Scope:** Tier 1 candidates only (CAND-003, CAND-006, CAND-011, CAND-012)

---

## Legend

| Symbol | Meaning |
|---|---|
| **P** | Field value is supported by a primary official source |
| **S** | Field value is supported by secondary/corroborating source |
| **I** | Field value is interpretive — inferred from source facts |
| **U** | Field value is unsupported — must remain blank or marked unknown |
| `[CAREFUL]` | Wording must use hedging language in the final record |
| `[VERIFY]` | URL and content must be verified live before T008 |

---

---

## CAND-003 — LLM Fabricated Legal Case Citations

**Primary source:** Mata v. Avianca, S.D.N.Y., Case No. 22-cv-1461 (2023) — US federal court record

| Field | Supported By | Type | Wording Requirement |
|---|---|---|---|
| `title` | Court record — case title, nature of proceedings | P | Neutral, factual |
| `date` | Court filing or sanctions order date | P | Exact date from court record |
| `summary` — core facts | Court order describing the non-existent citations | P | `"The court found that..."` |
| `summary` — tool used | Court record and/or media reporting | P/S | `"ChatGPT or similar LLM tool, according to court filings"` — `[CAREFUL]` confirm exact tool named |
| `failure_modes` — FM-HALL | Court finding of fabricated citations | P | No hedging needed — court-confirmed fact |
| `failure_modes` — FM-REL | Inference from pattern of fabrication | I | `[CAREFUL]` — interpretive |
| `severity` — medium | Court imposed sanctions; no physical harm | P/I | Factual |
| `confidence` — high | Primary court document | P | Justified |
| `controls` — CTL-OVER-001 | Court discussion of lack of independent verification | P | `"The court noted the absence of..."` |
| `controls` — CTL-TEST-001 | Inference — no evidence tool was tested for legal accuracy | I | `[CAREFUL]` — interpretive |
| `controls` — CTL-DOC-001 | Inference — no documented AI use policy | I | `[CAREFUL]` — interpretive |
| `evidence_required` | Inference from control gaps | I | No hedging needed in evidence list |
| `lessons` | Inference from case facts | I | Governance-oriented, not incident re-description |
| `sources` — url | CourtListener SDNY docket | P | `[VERIFY]` live |
| `harms` — sanctions | Court record | P | `"Sanctions were imposed by the court"` |
| `harms` — institutional | Inference | I | `[CAREFUL]` |
| `affected_stakeholders` | General categories from case context | I | No individual names |
| `impact` | Court record + media reporting | P/S | `"The court found..."` for confirmed; `"according to reporting..."` for media |

**Fields that must remain blank or conservative:**
- Do not assert the attorney acted in bad faith unless the court record explicitly states this.
- Do not name private individuals beyond what the court record names in its public record.
- `related_incidents`: blank until other records exist.

---

## CAND-006 — Autonomous Vehicle Pedestrian Fatality

**Primary source:** NTSB Accident Report HWY18MH010 (November 2019)

| Field | Supported By | Type | Wording Requirement |
|---|---|---|---|
| `title` | NTSB report description of the accident | P | Neutral; follows NTSB characterisation |
| `date` | NTSB report — date of accident | P | Exact date; `[VERIFY]` from report |
| `summary` — accident facts | NTSB final report | P | `"The NTSB investigation found that..."` |
| `summary` — perception failure | NTSB findings on AI system | P | `"The NTSB identified the AI perception system as a contributing factor"` |
| `summary` — safety driver | NTSB findings on monitoring system | P | `"The NTSB found that the safety driver monitoring system was [disabled/not functioning as intended]"` — `[VERIFY]` exact NTSB wording |
| `failure_modes` — FM-SAFE | NTSB confirmed fatality + contributing factors | P | No hedging needed — NTSB confirmed |
| `failure_modes` — FM-REL | NTSB findings on perception system performance | P | `"The NTSB found that the system failed to correctly classify..."` |
| `severity` — critical | Fatality confirmed | P | No hedging needed |
| `confidence` — high | NTSB investigation | P | Justified |
| `controls` — CTL-OVER-001 | NTSB finding on safety monitoring | P | `"The NTSB found that..."` |
| `controls` — CTL-TEST-001 | NTSB discussion of testing adequacy | P/I | `[VERIFY]` exact NTSB characterisation |
| `controls` — CTL-MON-001 | NTSB findings | P | |
| `controls` — CTL-RISK-001 | NTSB discussion of safety case | P/I | `[CAREFUL]` |
| `evidence_required` | Inference from NTSB investigation scope | P/I | |
| `lessons` | NTSB safety recommendations | P | Reference NTSB recommendations where available |
| `sources` — url | NTSB website | P | `[VERIFY]` live |
| `harms` — fatality | NTSB confirmed | P | `"A pedestrian fatality resulted"` — do not name victim |
| `affected_stakeholders` | General — pedestrians, AV operators, regulators | I | No individual names |
| `impact` | NTSB report + media reporting + regulatory response | P/S | `"The NTSB investigation..."` for primary; `"according to reporting..."` for regulatory follow-up |

**Fields that must remain blank or conservative:**
- Do not name the victim (private individual; reference as "a pedestrian").
- Do not assert criminal liability or negligence beyond NTSB findings.
- Do not assert the company deliberately disabled the monitoring system — use exact NTSB characterisation.
- `related_incidents`: blank.

---

## CAND-011 — LLM Chatbot Unauthorised Contract Commitment (Air Canada)

**Primary source:** Air Canada v. Moffatt, BC Civil Resolution Tribunal, 2024

| Field | Supported By | Type | Wording Requirement |
|---|---|---|---|
| `title` | CRT ruling description | P | Neutral |
| `date` | Chatbot interaction date (if in ruling) | P | `[VERIFY]` — confirm from ruling |
| `summary` — chatbot gave incorrect info | CRT ruling finding | P | `"The tribunal found that the chatbot provided incorrect information about..."` |
| `summary` — company held liable | CRT ruling | P | `"The tribunal held that Air Canada was bound by the chatbot's representation"` |
| `failure_modes` — FM-HALL | CRT finding of incorrect policy information | P | No hedging needed — tribunal confirmed |
| `failure_modes` — FM-UNAUTH | CRT finding on scope of chatbot commitment | P | `"The tribunal found that the chatbot's representation constituted..."` — `[CAREFUL]` |
| `severity` — medium | Financial harm; no physical harm | P | |
| `confidence` — high | Tribunal ruling | P | Justified |
| `controls` — CTL-OVER-001 | Inference — no human review of chatbot output | I | `[CAREFUL]` |
| `controls` — CTL-AGENT-001 | Inference — insufficient agent scope definition | I | `[CAREFUL]` |
| `controls` — CTL-AGENT-002 | Inference — no approval workflow for commitments | I | `[CAREFUL]` |
| `controls` — CTL-TEST-001 | Inference — pre-deployment testing | I | `[CAREFUL]` |
| `evidence_required` | Inference | I | |
| `lessons` | Inference from tribunal findings | I | Governance-oriented |
| `sources` — url | CRT case portal | P | `[VERIFY]` exact URL and case number |
| `harms` — financial | CRT ruling | P | `"The tribunal found that the customer was entitled to..."` |
| `affected_stakeholders` | Customers; AI agent deployers | I | No individual names; describe claimant as "a customer" |
| `impact` | CRT ruling + media | P/S | |

**Fields that must remain blank or conservative:**
- Describe the claimant as "a customer" — do not use the claimant's name in the `affected_stakeholders` field (use in `sources.title` only as a case citation).
- Do not assert the company acted deceptively — use tribunal findings only.
- Do not characterise the chatbot's behaviour as intentional.
- `related_incidents`: blank.

---

## CAND-012 — Automated Benefits Denial (Dutch SyRI System)

**Primary source:** Hague District Court, ECLI:NL:RBDHA:2020:1878 (February 2020)

| Field | Supported By | Type | Wording Requirement |
|---|---|---|---|
| `title` | Court ruling subject | P | Neutral |
| `date` | Court ruling date | P | `"5 February 2020"` — `[VERIFY]` exact date from ruling |
| `summary` — system description | Court ruling + public reporting | P/S | `"A Dutch court found that..."` |
| `summary` — fundamental rights violation | Court ruling | P | `"The Hague District Court ruled that SyRI violated Article 8 ECHR"` |
| `summary` — deployment context | Court record + public reporting | P/S | `"The system was deployed in lower-income municipalities..."` — `[VERIFY]` from ruling |
| `failure_modes` — FM-BIAS | Court analysis of disproportionate deployment | P | `"The court found that..."` |
| `failure_modes` — FM-TRANS | Court finding on algorithmic opacity | P | `"The court found that the algorithm's operation was insufficiently transparent..."` |
| `failure_modes` — FM-UNAUTH | Inference from automated determination without oversight | I | `[CAREFUL]` |
| `severity` — high | Fundamental rights violation confirmed | P | Justified |
| `confidence` — high | Court ruling | P | Justified |
| `controls` — CTL-OVER-001 | Court analysis of oversight gaps | P/I | `[CAREFUL]` |
| `controls` — CTL-DOC-002 | Court finding on transparency | P | `"The court found that..."` |
| `controls` — CTL-RISK-001 | Inference | I | `[CAREFUL]` |
| `controls` — CTL-TEST-002 | Inference | I | `[CAREFUL]` |
| `evidence_required` | Inference | I | |
| `lessons` | Court reasoning + inference | P/I | Governance-oriented |
| `sources` — url | rechtspraak.nl ECLI reference | P | `[VERIFY]` live; Dutch language — paraphrase in English |
| `harms` | Court finding at systemic level | P | `"Individuals subject to the system were found by the court to have had their Article 8 rights engaged..."` — `[CAREFUL]` |
| `affected_stakeholders` | General — welfare recipients, government agencies | I | No individual names |
| `impact` | Court ruling + public reporting | P/S | `"The government discontinued SyRI..."` — `[VERIFY]` primary source for discontinuation |

**Fields that must remain blank or conservative:**
- Do not assert specific individual harm beyond what the court found at a systemic level.
- Do not assert the Dutch government violated human rights — use: `"the court found that the system's operation was incompatible with..."`.
- Confirm the discontinuation of SyRI from a primary source (government statement) before including in `impact`.
- `related_incidents`: blank.
