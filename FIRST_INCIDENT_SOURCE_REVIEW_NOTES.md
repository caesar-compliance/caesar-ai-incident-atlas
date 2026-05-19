# First Incident Source Review Notes

> **Candidate only — not incident records.**  
> This document records source type analysis, license concerns, and source quality findings for the 15 T006 candidate dossiers. It is a research document to assist Control Tower review.  
>
> **Prepared:** 19 May 2026  
> **Task:** T006 — First Incident Candidate Dossier Preparation  
> **Branch:** `research/T006-first-incident-candidate-dossier-preparation`

---

## 1. Source Types Used

The following source types were used as references in candidate dossier preparation:

| Source Type | Definition | Candidates Using |
|---|---|---|
| **Primary official** | Government agency reports, regulatory decisions, court rulings, official investigation findings | CAND-002 (NIST FRVT), CAND-006 (NTSB), CAND-011 (BC CRT), CAND-012 (Dutch court), CAND-015 (EEOC) |
| **Academic / peer-reviewed** | Published in peer-reviewed academic journals or proceedings | CAND-010 (Science, Nature Medicine), CAND-013 (IEEE S&P) |
| **Company statement / acknowledgement** | Official blog post, public statement, or transparency report from the involved company | CAND-005 (Meta/Facebook), CAND-009 (multiple platforms) |
| **Investigative journalism** | Multi-source investigative reporting by credible news organisations | CAND-002 (ACLU), CAND-004 (Reuters), CAND-005 (multiple) |
| **Regulatory guidance document** | Regulatory agency guidance, not a formal enforcement action | CAND-015 (EEOC guidance 2023) |
| **Legislative / statutory reference** | Enacted law or regulation cited as context | CAND-009 (UK Online Safety Act, US DEFIANCE Act), CAND-015 (NYC Local Law 144) |
| **General media reporting** | News reporting without specific named sources or primary document | CAND-001 (general health AI reporting), CAND-007 (general predictive policing coverage) |
| **Civil liberties organisation documentation** | ACLU, Liberty, Privacy International, etc. | CAND-002 (ACLU), CAND-007 (ACLU) |

---

## 2. Primary vs Secondary Source Assessment

### Primary Source Available (strong candidates)

| Candidate ID | Primary Source | Source Type |
|---|---|---|
| CAND-003 | Mata v. Avianca, SDNY court record | Court ruling (public) |
| CAND-006 | NTSB Accident Report HWY18MH010 | Official government investigation |
| CAND-011 | BC Civil Resolution Tribunal ruling, 2024 | Court/tribunal ruling (public) |
| CAND-012 | Hague District Court ruling ECLI:NL:RBDHA:2020:1878 | Court ruling (public) |
| CAND-002 | NIST FRVT official performance reports | Official government evaluation |
| CAND-010 | Obermeyer et al. (2019), Science journal | Peer-reviewed academic study |
| CAND-015 | EEOC Technical Assistance Guidance, May 2023 | Regulatory guidance (official) |

### Secondary Source Only (lower confidence)

| Candidate ID | Source Situation | Risk |
|---|---|---|
| CAND-001 | General media reporting; no confirmed primary company statement | Medium risk — identity of specific provider uncertain |
| CAND-004 | Reuters investigative report (strong secondary); no direct company confirmation | Low-medium risk — Reuters methodology is credible but company disputed some details |
| CAND-005 | Meta public blog (company acknowledgement); multiple news sources | Low risk — company acknowledgement acts as a strong secondary source |
| CAND-007 | Academic literature + civil liberties documentation; no single primary incident | Medium-high risk — systemic pattern without discrete event |
| CAND-008 | Regulatory guidance only; no specific company-acknowledged incident | High risk — no confirmed discrete incident |
| CAND-009 | Platform acknowledgements and legislative references; individual cases involve privacy concerns | Medium risk — framing must focus on platform/system failure |
| CAND-013 | Academic study — strong for systemic finding; not a discrete production incident | Medium risk — incident record format requires a discrete event |
| CAND-014 | Aggregate government reports; limited individual case documentation | Medium-high risk — weak for discrete incident format |

---

## 3. License and Copyright Concerns

### No External Dataset Import Rule

**This task does not import, copy, or reproduce any data from external datasets.** The following databases were used only as discovery pointers — no data was copied:

- **AIID (AI Incident Database)** — Known to us via discovery only. No AIID records were imported or reproduced.  
- **AIAAIC (AI, Algorithmic, and Automation Incidents and Controversies)** — Known to us via discovery only. No AIAAIC records were imported or reproduced.  
- **OECD AI Incidents Monitor** — Not used.  
- **MIT AI Incident Tracker** — Not used.  
- **IBM AI Atlas Nexus** — Not used for incident data.

All dossier summaries are written in Caesar's own words. No text was copied from any external database.

### Source License Status

| Source | License Status | Safe to Cite? | Notes |
|---|---|---|---|
| NTSB government reports | US government works — public domain | Yes | No copyright restriction on US federal government publications |
| US court records (SDNY Mata v. Avianca) | US court records — public domain | Yes | US federal court records are public |
| BC Civil Resolution Tribunal ruling | Canadian public court record | Yes | CRT rulings are publicly available |
| Dutch court ruling (ECLI) | Dutch public court record | Yes | Published on rechtspraak.nl |
| NIST FRVT reports | US government works — public domain | Yes | NIST publications are US government works |
| EEOC guidance documents | US government works — public domain | Yes | Federal agency publications |
| Obermeyer et al. (Science journal) | Published article — cite only, do not copy | Cite only | Copyright held by Science/AAAS; summarise in own words |
| Reuters article (Amazon bias) | Copyright Reuters | Cite only | Do not reproduce text; summarise in own words |
| Meta Transparency Centre | Meta copyright; publicly accessible | Cite only | Summarise in own words |
| Academic papers (IEEE S&P) | IEEE copyright; open access preprint on ArXiv | Cite via ArXiv for open access version | Preprint on ArXiv available; check license |
| ACLU documentation | Creative Commons or open publication — verify per document | Verify before copying | Do not reproduce text |

---

## 4. Candidates That Rely on Pending-License Sources

The following candidates rely primarily on secondary or potentially restricted sources where license status has not been fully verified:

| Candidate ID | Pending Concern | Action Required Before T007 |
|---|---|---|
| CAND-001 | No primary company statement available; relies on secondary health tech media | Identify named provider with a primary source or official report |
| CAND-007 | Relies on civil liberties organisation documentation — verify license for any direct quotes | Identify a discrete documented incident anchor |
| CAND-008 | No confirmed discrete incident; relies on regulatory guidance only | Identify a specific regulatory enforcement action as primary source |
| CAND-009 | Individual victim privacy concern; platform acknowledgements vary | Focus exclusively on platform-level failure documentation; verify platform statement licenses |
| CAND-013 | Academic paper copyright (IEEE) — ArXiv preprint available; confirm license | Check ArXiv preprint license before citing extensively |

---

## 5. Candidates That Should Not Be Used Until Better Primary Sources Are Found

| Candidate ID | Reason | Recommendation |
|---|---|---|
| CAND-001 | No confirmed primary source naming the specific provider and incident | **Postpone** |
| CAND-007 | No discrete incident — systemic pattern only | **Postpone** |
| CAND-008 | No confirmed discrete company-acknowledged incident | **Postpone** |
| CAND-013 | Research study, not a discrete production deployment incident | **Postpone** |
| CAND-014 | Weak discrete incident evidence; overlaps significantly with CAND-002 | **Reject** |

---

## 6. Source Concerns by Failure Mode

| Failure Mode | Source Strength | Notes |
|---|---|---|
| FM-BIAS | Strong overall | NIST, academic, court rulings all available |
| FM-HALL | Strong for discrete incidents | Mata v. Avianca (legal), Air Canada CRT (agent), COVID moderation (company) |
| FM-SAFE | Very strong | NTSB report is gold-standard primary source |
| FM-PRIV | Medium | NCII cases require careful victim-privacy framing |
| FM-UNAUTH | Strong (court-confirmed) | Air Canada CRT ruling is unambiguous |
| FM-TRANS | Strong via court ruling | SyRI court ruling addresses transparency directly |
| FM-REL | Medium-Strong | COVID moderation has company acknowledgement; code gen is academic only |
| FM-SEC | Weak for discrete incident | CAND-013 is academic study; no discrete production incident available |

---

## 7. Careful Language and Hedging Applied

In accordance with `SOURCE_AND_CITATION_POLICY_DRAFT.md`, the following conventions were applied in all dossier summaries:

- "reportedly" used for facts sourced from secondary media without primary confirmation
- "according to publicly available reporting" used where media sources are cited
- "appears to" used for analytical inferences
- "at least one" used when exact count is uncertain
- "is reported to have" used for company actions sourced from secondary reporting
- No unsupported legal conclusions made (e.g., no claim of breach, violation, or liability beyond what authoritative sources confirm)
- No defamatory language used
- Company names referenced only where they are named in primary official sources or have made public statements

---

## 8. Summary Assessment

**Source quality is sufficient for 10 Accept candidates to proceed to T007 record creation planning**, subject to Control Tower review. The Accept candidates all have at least one strong primary or verified secondary source. The Postpone candidates need additional primary source confirmation before record creation. The one Reject candidate (CAND-014) lacks sufficient distinctive value and source quality to justify inclusion.
