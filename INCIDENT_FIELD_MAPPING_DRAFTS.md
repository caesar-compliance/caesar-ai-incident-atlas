# Incident Field Mapping Drafts

> **Planning document — not incident records.**  
> This document contains draft field mappings for the 10 approved candidates. These are planning references only. No final `INC-XXXX` IDs are assigned. No JSON incident files are created.  
>
> **Prepared:** 19 May 2026  
> **Task:** T007 — First Incident Record Creation Plan  
> **Branch:** `docs/T007-first-incident-record-creation-plan`

---

## How to Read This Document

Each mapping block shows:
- The candidate's likely field values when the record is eventually created in T008/T009.
- Fields marked `[VERIFY]` require source confirmation before use.
- Fields marked `[BLANK]` should remain absent from the record unless verified.
- Fields marked `[CAREFUL]` require hedging language in the final record.

These are draft values. Control Tower may adjust any field before T008 proceeds.

---

---

## CAND-003 — LLM Fabricated Legal Case Citations

> Draft planning mapping only — not an incident record.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T008]` | INC-0001 planned; assign only after CT approval |
| `title` | `"Attorney submits AI-generated court filings containing fabricated case citations"` | Neutral, factual |
| `date` | `"22 May 2023"` | `[VERIFY]` — confirm exact date of filing from court record |
| `sector` | `["legal"]` | |
| `system_type` | `"LLM-based legal research tool (ChatGPT or similar)"` | `[CAREFUL]` — use "or similar"; exact tool to be confirmed from court record |
| `failure_modes` | `["FM-HALL", "FM-REL"]` | FM-HALL primary; FM-REL secondary |
| `severity` | `"medium"` | Professional sanctions, no physical harm |
| `confidence` | `"high"` | Court record is primary source |
| `controls` | `["CTL-OVER-001", "CTL-TEST-001", "CTL-DOC-001"]` | Review before output use; pre-deployment testing; AI register |
| `evidence_required` | `["EV-004 — Human oversight record", "EV-013 — Incident log (court record)", "EV-011 — Model documentation"]` | |
| `lessons` | Draft: `["Attorneys and professional service practitioners must independently verify all AI-generated research outputs, including citations, before relying on them in official proceedings.", "Organisations deploying AI tools in professional and legal contexts should maintain documented policies for AI output review."]` | `[CAREFUL]` — not defamatory |
| `sources` | `[{url: CourtListener SDNY, source_type: "court_record", accessed: "[T008 date]", title: "Mata v. Avianca, Inc., No. 22-cv-1461 (S.D.N.Y. 2023)"}]` | `[VERIFY]` URL live |
| `harms` | `["Professional sanctions against counsel", "Court time and resources expended on non-existent citations", "Institutional trust in AI legal tools affected"]` | `[CAREFUL]` |
| `affected_stakeholders` | `["Legal practitioners", "Court system", "Opposing counsel"]` | No private individual names |
| `impact` | `"The court imposed sanctions and the filing was challenged. The case received significant media coverage and prompted broader discussion about AI tool use in legal practice."` | `[CAREFUL]` — confirm sanctions details from court record |
| `related_incidents` | `[BLANK — no related records yet]` | |

**Missing facts to confirm in T008:**
- Exact filing date (for `date` field)
- Exact nature of sanctions (fine, reprimand, or other)
- Whether ChatGPT specifically was named in the court record or described generically
- Access date for CourtListener URL

---

## CAND-006 — Autonomous Vehicle Pedestrian Fatality

> Draft planning mapping only — not an incident record.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T008]` | INC-0002 planned |
| `title` | `"Autonomous vehicle fails to classify pedestrian, resulting in fatal collision"` | Neutral; follows NTSB characterisation |
| `date` | `"18 March 2018"` | `[VERIFY]` — confirm exact date from NTSB report |
| `sector` | `["transportation"]` | |
| `system_type` | `"Autonomous vehicle perception and control system (Level 3/4 test vehicle)"` | `[VERIFY]` exact autonomy level from NTSB |
| `failure_modes` | `["FM-SAFE", "FM-REL"]` | FM-SAFE primary; FM-REL secondary |
| `severity` | `"critical"` | Fatality confirmed |
| `confidence` | `"high"` | NTSB investigation report is primary source |
| `controls` | `["CTL-OVER-001", "CTL-TEST-001", "CTL-MON-001", "CTL-RISK-001"]` | Human oversight; testing; monitoring; risk assessment |
| `evidence_required` | `["EV-005 — Testing record", "EV-007 — Incident response plan", "EV-004 — Human oversight record (safety driver monitoring)", "EV-014 — Post-incident review (NTSB final report)"]` | |
| `lessons` | Draft: `["Autonomous vehicle testing programmes on public roads require robust safety driver monitoring and should not disable safety systems during active testing.", "Pre-deployment testing must include systematic evaluation of edge-case scenarios including low-light pedestrian detection.", "Risk assessments for autonomous vehicle public road testing programmes should account for the consequences of sensor or classification failures at operational speeds."]` | |
| `sources` | `[{url: "https://www.ntsb.gov/investigations/Pages/HWY18MH010.aspx", source_type: "government_report", accessed: "[T008 date]", title: "NTSB Accident Report HWY18MH010"}]` | `[VERIFY]` URL live |
| `harms` | `["Fatal injury to a pedestrian"]` | Do not name the victim |
| `affected_stakeholders` | `["Pedestrians in autonomous vehicle testing zones", "Autonomous vehicle testing programme operators", "Regulators overseeing AV testing"]` | No private individual names |
| `impact` | `"A pedestrian fatality resulted. The NTSB investigation led to broader scrutiny of autonomous vehicle testing safety practices and contributed to updates in testing guidelines."` | `[CAREFUL]` — confirm specific regulatory outcome from NTSB |
| `related_incidents` | `[BLANK — no related records yet]` | |

**Missing facts to confirm in T008:**
- Exact date of incident (from NTSB report)
- Exact SAE autonomy level of the vehicle at time of incident
- Whether safety driver monitoring system was disabled by policy or technical failure — exact NTSB characterisation
- Access date for NTSB URL

---

## CAND-011 — LLM Chatbot Unauthorised Contract Commitment (Air Canada)

> Draft planning mapping only — not an incident record.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T008]` | INC-0003 planned |
| `title` | `"Airline chatbot provides incorrect fare policy information; tribunal finds company bound by chatbot's representation"` | |
| `date` | `[VERIFY]` | The chatbot interaction date: confirm from tribunal ruling. The ruling date is February 2024. Use the interaction date if available; otherwise use a date note. |
| `sector` | `["consumer_services"]` | |
| `system_type` | `"LLM-based customer service chatbot (airline website)"` | |
| `failure_modes` | `["FM-HALL", "FM-UNAUTH"]` | FM-HALL (incorrect policy information); FM-UNAUTH (chatbot committed to terms outside its scope) |
| `severity` | `"medium"` | Financial harm to customer; institutional accountability implications |
| `confidence` | `"high"` | Tribunal ruling is primary source |
| `controls` | `["CTL-OVER-001", "CTL-AGENT-001", "CTL-AGENT-002", "CTL-TEST-001"]` | Human review; agent scope definition; agent approval workflow; pre-deployment testing |
| `evidence_required` | `["EV-008 — Agent activity log", "EV-013 — Incident log", "EV-004 — Human oversight record", "EV-001 — AI system register"]` | |
| `lessons` | Draft: `["Organisations deploying AI agents in customer-facing roles must define clear agent scope boundaries and ensure agents cannot make commitments that exceed their authorised scope.", "AI agent outputs that could constitute binding representations should be subject to human review or include clear escalation mechanisms.", "Companies should not disclaim responsibility for AI agent outputs when those agents are deployed as authoritative customer interfaces."]` | |
| `sources` | `[{url: "https://civilresolutionbc.ca/[confirm case number]", source_type: "civil_tribunal", accessed: "[T008 date]", title: "Moffatt v. Air Canada, BC Civil Resolution Tribunal, 2024"}]` | `[VERIFY]` exact URL and case number |
| `harms` | `["Customer denied fare discount to which a tribunal found entitlement based on chatbot's representation"]` | |
| `affected_stakeholders` | `["Customers using AI-powered airline customer service", "Consumer protection regulators", "Organisations deploying customer-facing AI agents"]` | No individual names |
| `impact` | `"The BC Civil Resolution Tribunal found Air Canada liable for the chatbot's incorrect representation. The ruling was widely reported and is cited as a precedent for AI agent accountability in consumer service contexts."` | `[CAREFUL]` — confirm exact tribunal findings |
| `related_incidents` | `[BLANK]` | |

**Missing facts to confirm in T008:**
- Exact CRT case URL and case number
- Exact date of the chatbot interaction (not the ruling date)
- Exact dollar amounts from the ruling
- Whether Air Canada has made any public statement about the ruling

---

## CAND-012 — Automated Benefits Denial (Dutch SyRI System)

> Draft planning mapping only — not an incident record.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T008]` | INC-0004 planned |
| `title` | `"Dutch court finds automated social welfare risk-scoring system violates fundamental rights"` | |
| `date` | `"5 February 2020"` | `[VERIFY]` — this is the court ruling date. The system was deployed earlier (2014–2019). Use ruling date + date_note explaining deployment period. |
| `sector` | `["government"]` | |
| `system_type` | `"Automated risk-scoring and fraud detection system (SyRI — System Risk Indication)"` | |
| `failure_modes` | `["FM-BIAS", "FM-TRANS", "FM-UNAUTH"]` | FM-TRANS primary (opaque algorithm); FM-BIAS (disproportionate deployment in lower-income areas); FM-UNAUTH (automated determination without adequate human oversight) |
| `severity` | `"high"` | Fundamental rights violation confirmed by court |
| `confidence` | `"high"` | Court ruling is primary source |
| `controls` | `["CTL-OVER-001", "CTL-DOC-002", "CTL-RISK-001", "CTL-TEST-002"]` | Human review; AI use disclosure; risk assessment; bias testing |
| `evidence_required` | `["EV-002 — Risk assessment", "EV-004 — Human oversight record", "EV-014 — Post-incident review", "EV-012 — Bias testing record"]` | |
| `lessons` | Draft: `["Automated government decision-support systems must provide sufficient transparency about their logic to allow affected individuals to understand and challenge outcomes.", "AI systems deployed in social welfare contexts require explicit bias and impact assessments, particularly regarding disproportionate effects on lower-income or marginalised communities.", "Government use of AI for automated fraud detection or risk scoring requires a clear legal basis and proportionality assessment under applicable fundamental rights law."]` | |
| `sources` | `[{url: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2020:1878", source_type: "court_record", accessed: "[T008 date]", title: "Hague District Court, ECLI:NL:RBDHA:2020:1878, 5 February 2020"}]` | `[VERIFY]` URL live; primary language Dutch |
| `harms` | `["Individuals subject to automated fraud risk scoring without adequate legal basis or transparency", "Potential misclassification of welfare recipients as fraud risks"]` | `[CAREFUL]` — the court addressed the system at systemic level, not specific individual harms |
| `affected_stakeholders` | `["Social welfare recipients in targeted municipalities", "Government agencies using automated risk tools", "Data protection authorities"]` | |
| `impact` | `"The Hague District Court ruled that SyRI violated Article 8 of the European Convention on Human Rights. The Dutch government discontinued the SyRI system following the ruling."` | `[VERIFY]` — confirm discontinuation from a primary source |
| `related_incidents` | `[BLANK]` | |

**Missing facts to confirm in T008:**
- Confirm the court ruling URL is stable and accessible
- Confirm whether an official English summary or translation of the ruling is available
- Confirm that SyRI was officially discontinued and find primary source for this
- The UN Special Rapporteur report (October 2019) cited as additional context: confirm URL and whether it is still accessible

---

## CAND-002 — Facial Recognition Wrongful Arrest

> Draft planning mapping only — Second wave (T009). Not in T008 scope.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T009]` | |
| `title` | `"Facial recognition misidentification contributes to wrongful arrest of innocent person"` | |
| `date` | `"January 2020"` | `[VERIFY]` exact date; use date_note if only month known |
| `sector` | `["law_enforcement"]` | |
| `system_type` | `"Automated facial recognition matching system used by law enforcement"` | |
| `failure_modes` | `["FM-BIAS"]` | |
| `severity` | `"high"` | Wrongful arrest |
| `confidence` | `"high"` | NIST FRVT + ACLU documentation |
| `controls` | `["CTL-TEST-002", "CTL-OVER-001", "CTL-DOC-002", "CTL-RISK-001"]` | |
| `evidence_required` | `["EV-012 — Bias testing record", "EV-004 — Human oversight record", "EV-002 — Risk assessment"]` | |
| `lessons` | Draft: `["Law enforcement use of facial recognition matching must include mandatory human corroboration before any arrest decision.", "Facial recognition systems used in law enforcement should undergo independent bias testing across demographic groups before deployment."]` | |
| `sources` | NIST FRVT reports + ACLU documentation | `[VERIFY]` |
| `missing_facts` | Exact interaction date; arrest record details; settlement details | |

---

## CAND-004 — AI Recruitment Gender Bias (Amazon)

> Draft planning mapping only — Second wave (T009). Not in T008 scope.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T009]` | |
| `title` | `"AI-based resume screening tool discontinued after reportedly penalising female candidates"` | |
| `date` | `"October 2018"` | Reuters report date; use date_note |
| `sector` | `["employment"]` | |
| `system_type` | `"ML-based resume screening and ranking tool"` | |
| `failure_modes` | `["FM-BIAS"]` | |
| `severity` | `"medium"` | Systemic discrimination risk |
| `confidence` | `"high"` | Reuters multi-source investigative report |
| `controls` | `["CTL-TEST-002", "CTL-OVER-001", "CTL-RISK-001"]` | |
| `evidence_required` | `["EV-012 — Bias testing record", "EV-002 — Risk assessment", "EV-005 — Testing record"]` | |
| `lessons` | Draft: `["AI systems trained on historical hiring data risk perpetuating existing demographic imbalances in the workforce.", "Pre-deployment bias testing for employment AI tools should evaluate scoring differentials across protected characteristics."]` | |
| `sources` | Reuters, October 2018 | `[CAREFUL]` — no direct company confirmation; use hedging |
| `missing_facts` | Company confirmation; internal audit details | |

---

## CAND-005 — Content Moderation Over-Removal (COVID-19)

> Draft planning mapping only — Second wave (T009). Not in T008 scope.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T009]` | |
| `title` | `"Automated content moderation system incorrectly removes legitimate health-related content at scale during COVID-19 pandemic"` | |
| `date` | `"March 2020"` | `[VERIFY]` exact date from Meta blog post; use date_note |
| `sector` | `["social_media"]` | |
| `system_type` | `"Automated content moderation system"` | |
| `failure_modes` | `["FM-REL", "FM-TRANS"]` | |
| `severity` | `"medium"` | Information access impact |
| `confidence` | `"high"` | Company public acknowledgement |
| `controls` | `["CTL-OVER-001", "CTL-MON-001", "CTL-INC-001"]` | |
| `evidence_required` | `["EV-004 — Human oversight record", "EV-006 — Monitoring log", "EV-014 — Post-incident review"]` | |
| `lessons` | Draft: `["Content moderation systems require human review escalation paths that are maintained during crisis periods, including when normal staffing is reduced.", "Automated moderation systems should implement conservative fallback behaviour (e.g., flagging rather than removal) when confidence is reduced by operating outside normal distribution."]` | |
| `sources` | Meta Transparency Centre blog, March 2020 | `[VERIFY]` URL |
| `missing_facts` | Exact blog post URL; exact volume of incorrectly removed content | |

---

## CAND-009 — AI-Generated Non-Consensual Intimate Images

> Draft planning mapping only — Second wave (T009). Not in T008 scope.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T009]` | |
| `title` | `"AI image generation tools used to create non-consensual intimate imagery; platform restricts certain capabilities following public concern"` | |
| `date` | `[VERIFY]` | Use platform statement or policy change date; date_note required |
| `sector` | `["consumer_technology"]` | |
| `system_type` | `"AI image generation model (diffusion-based)"` | |
| `failure_modes` | `["FM-PRIV", "FM-SAFE", "FM-UNAUTH"]` | |
| `severity` | `"high"` | Severe psychological harm; privacy violation |
| `confidence` | `"high"` | Multiple platform acknowledgements and legislative responses |
| `controls` | `["CTL-TEST-001", "CTL-OVER-001", "CTL-VEN-001"]` | |
| `evidence_required` | `["EV-005 — Testing record", "EV-007 — Incident response plan", "EV-011 — Model documentation"]` | |
| `lessons` | Draft: `["AI image generation systems should be evaluated for abuse vectors including non-consensual intimate imagery generation before deployment.", "Platform operators should implement safety testing for foreseeable harmful use cases as part of pre-deployment risk assessment."]` | |
| `sources` | Platform public statements; UK Online Safety Act / DEFIANCE Act | `[CAREFUL]` — anchor on specific platform statement |
| `missing_facts` | Specific platform anchor; exact statement URL; victim privacy constraints | |

---

## CAND-010 — AI Diagnostic Bias in Underrepresented Populations

> Draft planning mapping only — Second wave (T009). Not in T008 scope.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T009]` | |
| `title` | `"Healthcare AI algorithm found to systematically underestimate illness severity in Black patients"` | `[VERIFY]` — confirm exact characterisation from Obermeyer et al. |
| `date` | `"October 2019"` | Publication date of Obermeyer et al. in Science; date_note for deployment period |
| `sector` | `["healthcare"]` | |
| `system_type` | `"Healthcare resource allocation algorithm (commercial)"` | |
| `failure_modes` | `["FM-BIAS", "FM-REL"]` | |
| `severity` | `"high"` | Healthcare outcome disparity |
| `confidence` | `"high"` | Peer-reviewed academic publication in Science |
| `controls` | `["CTL-TEST-002", "CTL-TEST-001", "CTL-RISK-001", "CTL-DOC-001"]` | |
| `evidence_required` | `["EV-012 — Bias testing record", "EV-005 — Testing record", "EV-011 — Model documentation"]` | |
| `lessons` | Draft: `["Healthcare AI systems that affect resource allocation must be evaluated for differential performance across patient demographic groups before deployment.", "Proxy variables in healthcare algorithms (such as cost as a proxy for health need) should be assessed for demographic bias prior to use in clinical decision support."]` | |
| `sources` | Obermeyer et al. (2019), Science | `[VERIFY]` ArXiv or DOI URL |
| `missing_facts` | Vendor confirmation of findings; deployment context details | |

---

## CAND-015 — LLM Hiring Assessment Discrimination

> Draft planning mapping only — Second wave (T009). Not in T008 scope.

| Field | Draft Value | Notes |
|---|---|---|
| `incident_id` | `[NOT ASSIGNED — T009]` | |
| `title` | `"Regulatory guidance issued on discriminatory risk of AI-based hiring assessment tools"` | |
| `date` | `"18 May 2023"` | `[VERIFY]` — EEOC guidance publication date |
| `sector` | `["employment"]` | |
| `system_type` | `"AI-based hiring assessment and scoring tools"` | |
| `failure_modes` | `["FM-BIAS", "FM-TRANS"]` | |
| `severity` | `"medium"` | Discriminatory employment outcomes; regulatory enforcement risk |
| `confidence` | `"medium"` | EEOC guidance is strong; specific enforcement action not yet confirmed |
| `controls` | `["CTL-TEST-002", "CTL-DOC-002", "CTL-RISK-001", "CTL-OVER-001"]` | |
| `evidence_required` | `["EV-012 — Bias testing record", "EV-002 — Risk assessment", "EV-005 — Testing record"]` | |
| `lessons` | Draft: `["Employers using AI-based hiring assessment tools should obtain audit evidence demonstrating that the tools do not produce disparate impact on protected groups.", "Candidates subject to AI-based hiring decisions should be informed of the use of automated tools as required by applicable law."]` | |
| `sources` | EEOC Technical Assistance Guidance, May 2023 + NYC Local Law 144 | `[VERIFY]` EEOC URL |
| `missing_facts` | Specific enforcement action citation; NYC Local Law 144 compliance audit failures | |
| `confidence_note` | Upgrade to `high` if specific enforcement action found before T009 | |
