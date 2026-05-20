# Incident Candidate Triage Matrix — INC-0011+ Planning

**Task:** T034 — Candidate Shortlist Draft for INC-0011+ Planning
**Date:** 20 May 2026
**Version:** 0.7.2
**Status:** Planning only — NOT legal advice. No candidates approved. All status: `not_approved_candidate`.

---

## Governance Notice

All entries are planning estimates only. No candidate is approved for record creation. Each candidate requires CT approval, source/license review, and wording/legal-risk review before becoming a record.

---

## Matrix 1 — Candidate Priority Matrix

Priority definitions:
- **P1** — Strong governance value, likely Tier 1/2 source available, new sector or jurisdiction, lower source/wording risk. Recommend for T035 source pack planning.
- **P2** — Good governance value, source or wording risk requires verification first, or partially duplicates existing coverage.
- **P3** — Valuable but significant source, wording, or sensitivity challenge. Defer to later batch or require CT decision first.

| Candidate ID | Working Title (short) | Sector | Jurisdiction | Expected Value | Source-Risk | Wording-Risk | Priority | Recommended Next Action |
|---|---|---|---|---|---|---|---|---|
| CAND-001 | AI credit scoring bias | `finance-credit` | US | High | Low | Medium | **P1** | T035 source pack — confirm CFPB/OCC enforcement record |
| CAND-002 | UK welfare benefit denial AI | `public-sector` | UK | High | Low–Medium | Medium | **P1** | T035 source pack — verify BAILII/tribunal record |
| CAND-003 | AI exam proctoring bias | `education` | US/Global | High | Medium | Medium | **P1** | T035 source pack — identify open-access peer-reviewed primary |
| CAND-004 | Sentencing risk-score bias | `criminal-justice` | US | High | Low | Medium–High | **P1** | T035 source pack — identify specific court record + academic audit; counsel gate required |
| CAND-005 | Chatbot harmful medical advice | `healthcare-medical` | Global | Medium | Medium | High | **P2** | Source verification before T035; counsel gate likely required |
| CAND-006 | Deepfake CEO voice fraud | `finance-fraud` | UK/Global | High | Medium | Medium | **P2** | Source verification — confirm law enforcement/official record exists |
| CAND-007 | Insurance claim denial bias | `insurance` | EU | Medium | Medium–High | Medium | **P2** | Source verification required before T035; specific incident must be confirmed |
| CAND-008 | AI hiring — disability bias | `hiring-employment` | US | High | Low–Medium | Medium | **P1** | T035 source pack — confirm EEOC charge/consent decree |
| CAND-009 | Child welfare AI bias | `public-sector` | US | High | Medium | High | **P2** | Counsel review required before T035; sensitivity and privacy gate |
| CAND-010 | LLM legal document errors | `legal-compliance` | US/UK/AU | High | Low | Low–Medium | **P1** | T035 source pack — select specific court sanction record distinct from INC-0001 |
| CAND-011 | Retail facial recognition — ICO | `retail-ecommerce` | UK | High | Low | Medium | **P1** | T035 source pack — confirm ICO enforcement notice URL |
| CAND-012 | Political content moderation | `media-content` | Global | Medium | Medium | Medium–High | **P3** | Defer — specific incident with official record must be identified first |
| CAND-013 | Race-based spirometry algorithm | `healthcare-medical` | US | High | Low | Low–Medium | **P1** | T035 source pack — ATS/ERS guideline + PubMed primary |
| CAND-014 | Fraud detection — minority bias | `finance-banking` | US/EU | Medium | Medium | Medium | **P2** | Source verification — confirm specific enforcement action |
| CAND-015 | Agentic AI unauthorised action | `enterprise-ai-agents` | Global | High | Medium–High | Low–Medium | **P3** | Defer — official primary source scarce; monitor for documented incidents |

**P1 count:** 7 (CAND-001, CAND-002, CAND-003, CAND-004, CAND-008, CAND-010, CAND-011, CAND-013)
**P2 count:** 5 (CAND-005, CAND-006, CAND-007, CAND-009, CAND-014)
**P3 count:** 3 (CAND-012, CAND-015 — and CAND-004 counsel-gated if CT decides)

---

## Matrix 2 — Source Readiness Matrix

| Candidate ID | Likely Primary Source Category | Likely Secondary Source Category | Official Source Likely Exists | Media Reliance High | Review Status |
|---|---|---|---|---|---|
| CAND-001 | Regulatory enforcement (CFPB/OCC) | Court record | Yes | No | Needs source verification |
| CAND-002 | UK tribunal / court record (BAILII) | Parliamentary record | Yes | Low | Needs source verification |
| CAND-003 | Peer-reviewed study (open-access) | US state legislative record | Yes (academic) | Medium | Needs source verification |
| CAND-004 | State court record | Peer-reviewed audit (academic) | Yes | Low | Needs source verification |
| CAND-005 | Official company safety statement | Regulatory guidance (FDA/MHRA) | Partial | Medium–High | Needs source verification; counsel gate likely |
| CAND-006 | Law enforcement / official company disclosure | Major media (WSJ, FT) | Uncertain | High | Needs source verification — Tier 3 risk |
| CAND-007 | EU national regulator decision | EIOPA guidance | Uncertain | Medium | Needs source verification — specific incident unconfirmed |
| CAND-008 | EEOC charge or consent decree | DOJ guidance | Yes | Low | Needs source verification |
| CAND-009 | Court record or state audit report | Academic study | Yes (partially) | Medium | Needs source verification; counsel required |
| CAND-010 | Court sanction order | Bar association record | Yes | Low | Needs source verification (select distinct from INC-0001) |
| CAND-011 | ICO enforcement notice | UK Surveillance Camera Commissioner | Yes | Low | Needs source verification — confirm ICO notice URL |
| CAND-012 | Platform transparency report | Congressional hearing record | Yes (partial) | Medium | Specific incident unconfirmed |
| CAND-013 | ATS/ERS clinical guideline | PubMed / NEJM / JAMA | Yes | Low | Needs source verification — strong Tier 1/2 expectation |
| CAND-014 | CFPB / OCC / FCA enforcement | Court record | Yes (growing) | Medium | Needs source verification |
| CAND-015 | Official company security disclosure | Academic research (arXiv) | Uncertain | Medium | Scarce — monitor; P3 deferred |

---

## Matrix 3 — Governance Value Matrix

Maps each candidate to the product governance logic: **incident → failure mode → affected controls → required evidence → governance lesson**.

| Candidate ID | Core Failure Mode(s) | Key Affected Controls | Key Required Evidence | Core Governance Lesson |
|---|---|---|---|---|
| CAND-001 | FM-BIAS, FM-TRANS | Disparate impact testing; adverse action notice; model explainability | Disparate impact analysis; model validation report | Credit AI must pass disparate impact testing; adverse action notices must be explainable |
| CAND-002 | FM-BIAS, FM-TRANS, FM-UNAUTH | Human oversight; explainability; appeal/redress | Tribunal decision; DWP audit; GDPR Art.22 assessment | Automated welfare decisions require human review; GDPR Art.22 applies |
| CAND-003 | FM-BIAS, FM-REL, FM-TRANS | Bias testing; human review; disclosure | Peer-reviewed study; institutional review report | Proctoring AI must be bias-tested across demographics before deployment |
| CAND-004 | FM-BIAS, FM-TRANS | Bias audit; explainability; human oversight | Court record; academic audit; legislative record | Sentencing AI must be independently audited; defendants must be able to challenge scores |
| CAND-005 | FM-HALL, FM-SAFE, FM-REL | Output safety; use-case restriction; escalation; warning | Safety disclosure; regulatory guidance | General-purpose AI in healthcare contexts requires safety controls and escalation pathways |
| CAND-006 | FM-SEC, FM-PRIV, FM-UNAUTH | Authentication; wire-transfer approval; awareness | Law enforcement report; security research | Voice-synthesis AI enables fraud; MFA for financial transfers is mandatory |
| CAND-007 | FM-BIAS, FM-TRANS, FM-UNAUTH | Bias testing; explainability; appeal/redress | Regulatory decision; GDPR Art.22 assessment | Insurance AI must comply with GDPR Art.22; policyholders need human review access |
| CAND-008 | FM-BIAS, FM-TRANS | Disability accommodation; bias testing; ADA compliance | EEOC record; bias audit | Hiring AI must be tested for ADA compliance; applicants must be able to request accommodation |
| CAND-009 | FM-BIAS, FM-TRANS, FM-UNAUTH | Human oversight; bias testing; explainability | Court/audit record; academic study | Child welfare AI must be audited for socioeconomic/racial bias; human caseworkers retain final authority |
| CAND-010 | FM-HALL, FM-REL | Output verification; professional review; client disclosure | Court sanction order | LLM legal drafting must be reviewed by qualified professionals; AI use must be disclosed to clients |
| CAND-011 | FM-BIAS, FM-PRIV, FM-TRANS | Privacy impact assessment; consent/disclosure; bias testing | ICO enforcement notice; DPIA record | Live facial recognition requires GDPR lawful basis; biometric processing needs bias testing |
| CAND-012 | FM-REL, FM-TRANS, FM-BIAS | Human escalation; transparency; appeal/redress; political content policy | Transparency report; congressional record | Political content moderation requires elevated accuracy and transparent appeal processes |
| CAND-013 | FM-BIAS, FM-REL | Bias testing; clinical validation; model update | ATS/ERS guideline; peer-reviewed study | Race-based correction factors must be reviewed; medical AI must be validated across all populations |
| CAND-014 | FM-BIAS, FM-REL, FM-TRANS | Bias testing; false-positive monitoring; customer redress | Regulatory enforcement; bias audit | Fraud detection AI must monitor disparate false-positive rates; account actions require human review |
| CAND-015 | FM-UNAUTH, FM-REL, FM-SAFE | Agent scope/permission; human approval gate; audit log; rollback | Incident disclosure; academic research | Agentic AI must operate within bounded permissions; irreversible actions must be human-gated |

---

**T036 Status:** First drafting batch selected — CAND-013, CAND-008, CAND-011, CAND-010. All remain `not_approved_candidate`. See `FIRST_DRAFTING_BATCH_SELECTION.md`.

*See `INCIDENT_CANDIDATE_SHORTLIST_DRAFT.md` for full candidate entries. See `INCIDENT_RECORD_CREATION_GATE_CHECKLIST.md` for the gate checklist before any candidate becomes a real record.*

**Disclaimer:** This matrix is planning material only. No candidate is approved for record creation. Not legal advice.
