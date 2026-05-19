# First Incident Candidate Dossiers

> **Candidate only — not incident records.**  
> This document contains 15 provisional candidate dossiers for Control Tower review. None of these constitute final incident records. No `INC-XXXX` IDs have been assigned. No JSON incident files have been created. The candidates are research documents to assist Control Tower in deciding which incidents are suitable for the first Dataset MVP.
>
> **Prepared:** 19 May 2026  
> **Task:** T006 — First Incident Candidate Dossier Preparation  
> **Branch:** `research/T006-first-incident-candidate-dossier-preparation`  
> **Reviewed by:** Pending Control Tower review

---

## Candidate Template Reference

Each dossier contains:
- Provisional candidate ID (`CAND-NNN`)
- Short neutral title
- Year/date (if publicly available)
- Affected sector
- AI system/context
- Short factual summary (Caesar's own words — no copied text)
- Likely failure mode categories (from `data/taxonomy/failure_modes.json`)
- Likely affected controls (from `data/taxonomy/controls.json`)
- Likely evidence required (from `data/taxonomy/evidence_types.json`)
- Source links
- Source quality notes
- Confidence estimate
- Severity/impact estimate
- Why useful for first MVP
- Open questions
- Acceptance risk
- Recommendation: **Accept / Postpone / Reject**

---

---

## CAND-001 — Healthcare Chatbot Generates Inaccurate Treatment Guidance

> **Candidate only — not an incident record.**

**Sector:** Healthcare  
**Year/Date:** 2023  
**AI System/Context:** Large language model deployed as a patient-facing healthcare chatbot by a US healthcare provider.

**Summary:**  
A healthcare provider reportedly deployed an LLM-based chatbot to assist patients with medical queries. According to publicly available reporting, the chatbot was observed to generate responses that included inaccurate treatment dosage information and, in at least one documented case flagged by a clinician, recommended a course of action inconsistent with clinical guidelines. The organisation is reported to have suspended the chatbot pending review. The incident appears to illustrate the risk of deploying general-purpose LLMs in high-stakes clinical contexts without adequate output validation and human oversight of responses.

**Failure Modes:**  
- `FM-HALL` — Hallucination (fabricated treatment information)  
- `FM-SAFE` — Safety (potential for patient harm from inaccurate medical guidance)  
- `FM-REL` — Reliability (inconsistent output quality across similar clinical queries)

**Affected Controls:**  
- `CTL-OVER-001` — Human review of AI outputs (absent or insufficient before patient delivery)  
- `CTL-TEST-001` — Pre-deployment testing (clinical safety testing appears to have been inadequate)  
- `CTL-MON-001` — Output monitoring (post-deployment monitoring failed to detect early inaccuracies)  
- `CTL-RISK-001` — Risk assessment (insufficient pre-deployment risk classification for clinical use)

**Evidence Required:**  
- `EV-004` — Human oversight record (evidence of clinical review process)  
- `EV-005` — Testing record (pre-deployment clinical testing evidence)  
- `EV-007` — Incident response plan (response and suspension documentation)  
- `EV-011` — Model documentation (vendor documentation of known limits in clinical contexts)

**Sources:**  
- General reporting on healthcare LLM chatbot incidents, 2023. Multiple outlet corroboration. No single authoritative company statement publicly available at time of writing.  
- `https://www.statnews.com/` — STAT News covers AI in healthcare incidents including LLM errors.

**Source Quality:**  
- Multiple secondary media sources. No single primary company statement confirmed.  
- **Source quality: Medium.** Sufficient for candidate stage; would require a primary company statement or regulatory report before record creation.

**Confidence:** Medium  
**Severity:** High (potential for direct patient harm in clinical context)

**Why Useful for MVP:**  
Represents the Healthcare sector, `FM-HALL` + `FM-SAFE` combination, and a well-documented pattern of premature deployment of general-purpose LLMs in clinical settings. High public interest and regulatory relevance.

**Open Questions:**  
- Can a specific named provider and primary source be confirmed before T007?  
- Was a regulator (e.g., FDA, CQC) notified? Any regulatory report available?  
- What was the exact nature of the clinical harm — near-miss or actual patient impact?

**Acceptance Risk:**  
Medium. Incident is well-documented as a category but lacks a confirmed named primary source. Risk of inaccuracy if based on secondary media alone.

**Recommendation:** **Postpone** — Confirm a named primary source before record creation.

---

## CAND-002 — Facial Recognition Misidentification Leading to Wrongful Arrest

> **Candidate only — not an incident record.**

**Sector:** Law Enforcement / Criminal Justice  
**Year/Date:** 2020  
**AI System/Context:** Automated facial recognition system used by a US municipal police department to generate suspect matches.

**Summary:**  
Multiple documented cases in the United States, including cases where individuals were reportedly arrested based primarily or substantially on facial recognition matches, have been publicly reported and in some cases are subject to ongoing civil litigation. At least one case has been the subject of formal legislative and academic attention. The pattern described in public reporting is that facial recognition systems, when applied to lower-quality images, are reported to produce higher rates of false-positive matches for individuals with darker skin tones. In certain cases, this reportedly contributed to wrongful detentions.

**Failure Modes:**  
- `FM-BIAS` — Bias (disproportionate misidentification rates across demographic groups)  
- `FM-TRANS` — Transparency (limited disclosure of AI use in suspect identification process)

**Affected Controls:**  
- `CTL-TEST-002` — Bias testing (facial recognition systems should be evaluated for demographic parity)  
- `CTL-OVER-001` — Human review of AI outputs (over-reliance on automated match without sufficient human corroboration)  
- `CTL-DOC-002` — AI use disclosure (failure to disclose AI use in criminal proceedings)  
- `CTL-RISK-001` — Risk assessment (high-stakes deployment without adequate bias risk assessment)

**Evidence Required:**  
- `EV-012` — Bias testing record (evaluation of false positive rates by demographic)  
- `EV-004` — Human oversight record (documentation of review steps between AI match and arrest decision)  
- `EV-002` — Risk assessment (pre-deployment risk classification for law enforcement use)  
- `EV-013` — Incident log (police department incident documentation)

**Sources:**  
- Georgetown Law Center on Privacy and Technology public research on facial recognition in US law enforcement.  
- ACLU documentation of specific cases.  
- Academic publications on facial recognition error rates (Buolamwini & Gebru, 2018 — Gender Shades; subsequent MIT/NIST studies).  
- `https://www.nist.gov/programs-projects/face-recognition-vendor-test-frvt` — NIST FRVT reports (primary official source).

**Source Quality:**  
- **Strong.** NIST FRVT reports are primary official sources on accuracy differentials. Individual case reports are corroborated by multiple independent sources including academic research and civil litigation records.

**Confidence:** High  
**Severity:** High (wrongful arrest and detention; civil rights impact)

**Why Useful for MVP:**  
Canonical example of AI bias in high-stakes criminal justice context. Well-documented by official (NIST) and independent academic sources. Represents `FM-BIAS` + law enforcement sector. Important for diversity of failure modes.

**Open Questions:**  
- Which specific documented case should be the primary reference (Robert Williams case is frequently cited)? Confirm name of specific individual with care for privacy considerations.  
- Are primary court records or settlement documents publicly accessible for citation?

**Acceptance Risk:**  
Low-Medium. Risk of oversimplifying a complex multi-case pattern. Individual case selection requires care. NIST data is solid but applies at system level, not individual case level.

**Recommendation:** **Accept** — Use the Robert Williams / Detroit Police case (2020) as primary documented example, citing ACLU documentation and NIST FRVT data.

---

## CAND-003 — LLM Legal Research Tool Generates Fabricated Case Citations

> **Candidate only — not an incident record.**

**Sector:** Legal / Professional Services  
**Year/Date:** 2023  
**AI System/Context:** LLM-based legal research tool (reported use of ChatGPT or similar) used by a practising attorney to prepare court filings.

**Summary:**  
In a widely reported case in 2023, an attorney reportedly submitted court filings that cited legal cases which did not exist. The citations were reportedly generated by an LLM tool and were not independently verified before submission. The court identified the non-existent cases, and the attorney faced sanctions. The case received significant media coverage and was the subject of formal court proceedings. It is widely cited as an example of LLM hallucination with serious professional and legal consequences.

**Failure Modes:**  
- `FM-HALL` — Hallucination (fabricated court case citations)  
- `FM-REL` — Reliability (failure to produce accurate legal research output)

**Affected Controls:**  
- `CTL-OVER-001` — Human review of AI outputs (attorney failed to verify AI-generated citations independently)  
- `CTL-TEST-001` — Pre-deployment testing (tool not tested for legal research accuracy before professional use)  
- `CTL-DOC-001` — AI system register (firm had no documented AI use governance)

**Evidence Required:**  
- `EV-004` — Human oversight record (evidence of review process for AI-generated filings)  
- `EV-013` — Incident log (court record of sanctions)  
- `EV-011` — Model documentation (vendor documentation on limitations in legal research)

**Sources:**  
- Court order publicly available: Mata v. Avianca, Inc., S.D.N.Y., Case No. 22-cv-1461 (2023).  
- Multiple news sources: NYT, Reuters, The Verge, among others.  
- `https://www.courtlistener.com/` — CourtListener (public court records).

**Source Quality:**  
- **Very strong.** Court documents are primary official sources. Case is definitively documented in public record.

**Confidence:** High  
**Severity:** Medium (professional sanctions, no direct physical harm; significant institutional trust impact)

**Why Useful for MVP:**  
One of the clearest and best-documented examples of LLM hallucination with real-world professional consequences. Primary source is a public court order. Represents `FM-HALL` in the legal sector. Important for credibility of the Dataset MVP.

**Open Questions:**  
- Should the record reference the attorney, the firm, or the court case only? Privacy and naming conventions need to be established.  
- Was any regulatory body (bar association) also involved?

**Acceptance Risk:**  
Very low. Court record is unambiguous public document.

**Recommendation:** **Accept** — Highest priority candidate. Cite Mata v. Avianca court order directly.

---

## CAND-004 — AI Recruitment Tool Exhibits Gender Bias in Candidate Scoring

> **Candidate only — not an incident record.**

**Sector:** Employment / Human Resources  
**Year/Date:** 2018  
**AI System/Context:** Internal ML-based resume screening tool developed by a large technology company to assist with talent acquisition.

**Summary:**  
Reporting in 2018 indicated that a major technology company had developed and subsequently discontinued an internal AI-based resume screening system after reportedly discovering that the system penalised resumes that included the word "women's" (e.g., "women's chess club") and downgraded graduates of all-women colleges. The system had reportedly been trained on historical hiring data that was predominantly male. The company is reported to have ceased using the tool after internal review identified the problem.

**Failure Modes:**  
- `FM-BIAS` — Bias (gender-correlated discrimination in scoring)

**Affected Controls:**  
- `CTL-TEST-002` — Bias testing (tool deployed without adequate bias evaluation)  
- `CTL-OVER-001` — Human review of AI outputs (automated scoring used without sufficient human review of bias patterns)  
- `CTL-RISK-001` — Risk assessment (pre-deployment risk assessment did not identify discriminatory outcome risk)

**Evidence Required:**  
- `EV-012` — Bias testing record (evidence of post-discovery internal bias evaluation)  
- `EV-002` — Risk assessment  
- `EV-005` — Testing record (pre-deployment evaluation evidence)

**Sources:**  
- Reuters exclusive report, October 2018: "Amazon scraps secret AI recruiting tool that showed bias against women."  
- `https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G`  
- Company did not publicly confirm or deny all details; Reuters cited five sources with knowledge of the matter.

**Source Quality:**  
- **Strong (secondary).** Reuters investigative reporting with multiple cited sources. No direct company statement confirming all details. Company response was limited.

**Confidence:** High  
**Severity:** Medium (systemic employment discrimination risk; no confirmed individual harm documented)

**Why Useful for MVP:**  
Widely cited canonical example of training data bias propagation in a consequential employment context. Represents `FM-BIAS` in the employment/HR sector. Good diversity value.

**Open Questions:**  
- Was the tool ever formally audited? Are internal audit records publicly available?  
- Were any regulatory or employment discrimination complaints filed?

**Acceptance Risk:**  
Low-Medium. Incident is well-established in public record through credible investigative reporting but lacks a primary company statement.

**Recommendation:** **Accept** — Cite Reuters report with appropriate hedging (no direct company confirmation).

---

## CAND-005 — AI Content Moderation System Incorrectly Removes Legitimate Posts at Scale

> **Candidate only — not an incident record.**

**Sector:** Social Media / Content Platforms  
**Year/Date:** 2020  
**AI System/Context:** Automated content moderation systems used by major social media platforms during the early COVID-19 pandemic period.

**Summary:**  
During the early months of the COVID-19 pandemic in 2020, multiple major social media platforms reportedly experienced incidents where automated content moderation systems incorrectly flagged and removed large volumes of legitimate news and health-related content. Platforms publicly acknowledged errors; at least one attributed over-removal partly to reduced human review capacity during the pandemic period and increased reliance on automated moderation. The incidents raised questions about the reliability of automated moderation without adequate human review oversight.

**Failure Modes:**  
- `FM-REL` — Reliability (high false-positive rate in automated moderation decisions)  
- `FM-TRANS` — Transparency (limited explanation to users about why content was removed)

**Affected Controls:**  
- `CTL-OVER-001` — Human review of AI outputs (reduced human review during crisis period)  
- `CTL-MON-001` — Output monitoring (post-deployment monitoring insufficient to detect over-removal at scale)  
- `CTL-INC-001` — Incident response plan (incident response triggered but delayed)

**Evidence Required:**  
- `EV-004` — Human oversight record  
- `EV-006` — Monitoring log  
- `EV-013` — Incident log  
- `EV-014` — Post-incident review (platform post-mortems, some published)

**Sources:**  
- Facebook/Meta public blog post acknowledging content moderation errors, March 2020.  
- Twitter public statement on moderation errors, March 2020.  
- Multiple news sources including The Verge, Reuters, BBC.  
- `https://transparency.fb.com/` — Meta Transparency Centre (primary company source).

**Source Quality:**  
- **Strong.** Multiple company statements available. Public acknowledgement from platform operators. Well-corroborated.

**Confidence:** High  
**Severity:** Medium (significant free expression and information access impact; no direct physical harm documented)

**Why Useful for MVP:**  
Demonstrates `FM-REL` in a large-scale platform context. Company-acknowledged incident with public transparency reports. Good diversity — social media / content platform sector not otherwise represented in the strongest candidates.

**Open Questions:**  
- Which specific platform incident to anchor on? Meta/Facebook has the most documented primary source.  
- Exact date range of the over-removal event?

**Acceptance Risk:**  
Low. Company publicly acknowledged the issue.

**Recommendation:** **Accept** — Anchor on Meta/Facebook March 2020 content moderation incident. Cite Meta Transparency Centre and news corroboration.

---

## CAND-006 — Autonomous Vehicle AI Fails to Detect Pedestrian in Low-Light Conditions

> **Candidate only — not an incident record.**

**Sector:** Transportation / Autonomous Vehicles  
**Year/Date:** 2018  
**AI System/Context:** Autonomous vehicle perception system operated during a testing programme on public roads.

**Summary:**  
In 2018, a publicly reported and officially investigated incident involved an autonomous vehicle reportedly failing to correctly identify and respond to a pedestrian crossing outside a designated crosswalk in low-light conditions. The incident resulted in a fatality. Formal investigation was conducted by the US National Transportation Safety Board (NTSB) and findings were published. The NTSB report identified multiple contributing factors including the AI perception system's classification logic, the disabled safety driver monitoring system, and the absence of adequate emergency braking.

**Failure Modes:**  
- `FM-SAFE` — Safety (failure to prevent serious physical harm)  
- `FM-REL` — Reliability (perception system failure in edge-case environmental conditions)

**Affected Controls:**  
- `CTL-OVER-001` — Human review of AI outputs (safety driver monitoring system reportedly disabled)  
- `CTL-TEST-001` — Pre-deployment testing (edge case testing for low-light pedestrian detection)  
- `CTL-MON-001` — Output monitoring  
- `CTL-RISK-001` — Risk assessment (public road testing without adequate safety case)

**Evidence Required:**  
- `EV-005` — Testing record  
- `EV-007` — Incident response plan  
- `EV-004` — Human oversight record (safety driver monitoring records)  
- `EV-014` — Post-incident review (NTSB final report)

**Sources:**  
- NTSB Accident Report: HWY18MH010, published November 2019.  
- `https://www.ntsb.gov/investigations/Pages/HWY18MH010.aspx`  
- NTSB investigation is a primary official source.

**Source Quality:**  
- **Very strong.** NTSB report is a primary official government investigation report.

**Confidence:** High  
**Severity:** Critical (fatality resulted)

**Why Useful for MVP:**  
Unambiguous `FM-SAFE` case with an official primary source (NTSB). Transportation sector provides important diversity. One of the most widely cited cases in AI safety literature.

**Open Questions:**  
- Care required around naming of the individual involved — public record but privacy norms around victims apply.  
- Should the record name the company? The company is named in the NTSB report (public record).

**Acceptance Risk:**  
Low. Entire fact base rests on official NTSB investigation report.

**Recommendation:** **Accept** — Highest priority candidate. Cite NTSB report HWY18MH010 directly.

---

## CAND-007 — Predictive Policing Algorithm Deployed Without Adequate Bias Assessment

> **Candidate only — not an incident record.**

**Sector:** Law Enforcement / Criminal Justice  
**Year/Date:** 2016–2020 (ongoing concern; specific deployment period varies by jurisdiction)  
**AI System/Context:** Predictive policing tools used by municipal police departments to direct patrol resources or flag individuals for increased attention.

**Summary:**  
A pattern of concern documented by civil liberties organisations, academic researchers, and investigative journalists over multiple years relates to the deployment of predictive policing tools — systems that use historical crime data to predict where crimes are likely to occur or which individuals may be at elevated risk of offending. Critics and researchers have argued that such systems can perpetuate and amplify existing patrol bias because they are trained on arrest data, which reflects prior policing patterns rather than actual crime distribution. Several municipalities have reportedly discontinued such tools following public scrutiny.

**Failure Modes:**  
- `FM-BIAS` — Bias (feedback loop perpetuating existing policing disparities)  
- `FM-TRANS` — Transparency (limited public disclosure of system use and logic)

**Affected Controls:**  
- `CTL-TEST-002` — Bias testing  
- `CTL-DOC-002` — AI use disclosure  
- `CTL-RISK-001` — Risk assessment  
- `CTL-DOC-001` — AI system register

**Evidence Required:**  
- `EV-012` — Bias testing record  
- `EV-002` — Risk assessment  
- `EV-001` — AI system register

**Sources:**  
- Academic literature: Lum & Isaac (2016), "To predict and serve?" Significance.  
- ACLU and civil liberties organisations documentation.  
- City of Los Angeles LAPD public statements regarding PredPol discontinuation.  
- `https://www.latimes.com/` — LA Times investigative coverage.

**Source Quality:**  
- **Medium.** Academic sources are strong; individual city-level documentation varies. No single definitive primary incident record. This is more of a systemic pattern than a discrete incident.

**Confidence:** Medium  
**Severity:** High (systemic civil rights concern; no single discrete harm event)

**Why Useful for MVP:**  
Provides an important `FM-BIAS` example in law enforcement. However, the lack of a discrete incident event is a weakness.

**Open Questions:**  
- Is a specific, discrete, documented incident available (e.g., a specific individual harmed by a specific system decision) rather than a systemic pattern?  
- Could the LAPD/PredPol discontinuation be treated as the primary anchor event?

**Acceptance Risk:**  
Medium-High. Systemic pattern rather than discrete incident. Difficult to write a precise incident record without over-generalising.

**Recommendation:** **Postpone** — Identify a specific discrete documented case within this pattern before creating a record.

---

## CAND-008 — AI-Generated Financial Advice Contains Materially Inaccurate Information

> **Candidate only — not an incident record.**

**Sector:** Financial Services / Banking  
**Year/Date:** 2023  
**AI System/Context:** LLM-based financial advisory or customer service chatbot deployed by a financial institution.

**Summary:**  
Reports from 2023 describe cases where AI-powered chatbots deployed by financial services companies have generated responses to customer queries about financial products that contained materially inaccurate information — including incorrect interest rates, incorrect fee structures, and in some cases incorrect statements about regulatory protections. The incidents raise questions about the use of general-purpose LLMs in regulated financial advice contexts where accuracy is legally material and consumer protection obligations apply.

**Failure Modes:**  
- `FM-HALL` — Hallucination (inaccurate financial product information)  
- `FM-REL` — Reliability (inconsistent accuracy across similar customer queries)

**Affected Controls:**  
- `CTL-OVER-001` — Human review of AI outputs  
- `CTL-TEST-001` — Pre-deployment testing  
- `CTL-VEN-001` — Vendor review (vendor LLM deployed in regulated context without adequate review)  
- `CTL-RISK-001` — Risk assessment

**Evidence Required:**  
- `EV-003` — Vendor review  
- `EV-005` — Testing record  
- `EV-002` — Risk assessment  
- `EV-011` — Model documentation

**Sources:**  
- Consumer finance regulatory guidance and warnings (FCA, CFPB) on AI use in financial services.  
- General media reporting — no single canonical primary incident with a confirmed company statement publicly available at time of writing.  
- `https://www.fca.org.uk/` — FCA publications on AI risks in financial services.

**Source Quality:**  
- **Weak for a specific incident.** Regulatory guidance documents the concern but no single primary company-acknowledged incident available. Media reports exist but are not primary sources.

**Confidence:** Low-Medium  
**Severity:** Medium (financial consumer harm potential; regulatory liability)

**Why Useful for MVP:**  
Financial services sector is important for diversity. However, the current source quality is insufficient for a record.

**Open Questions:**  
- Is there a specific confirmed company-acknowledged incident or regulatory enforcement action available?  
- FCA or CFPB enforcement notices from 2023–2024 may provide a primary source.

**Acceptance Risk:**  
High without a primary source.

**Recommendation:** **Postpone** — Research whether a specific regulatory enforcement action or company-acknowledged incident exists before creating a record.

---

## CAND-009 — AI Image Generator Produces Non-Consensual Intimate Images

> **Candidate only — not an incident record.**

**Sector:** Consumer Technology / Social Media  
**Year/Date:** 2023–2024  
**AI System/Context:** AI image generation tools used by individuals to generate non-consensual intimate imagery (NCII) of real people.

**Summary:**  
Multiple widely reported incidents from 2023 and 2024 describe AI image generation tools being used to create non-consensual intimate images of real, identifiable individuals — including public figures and private individuals. These incidents have prompted legislative responses in multiple jurisdictions. At least one major platform was reported to have temporarily restricted certain image generation capabilities following significant public and media pressure. The incidents represent a `FM-PRIV` and `FM-SAFE` failure pattern at the model/product level.

**Failure Modes:**  
- `FM-PRIV` — Privacy (non-consensual use of likeness)  
- `FM-SAFE` — Safety (severe psychological and reputational harm to individuals depicted)  
- `FM-UNAUTH` — Unauthorized Action (use outside intended or disclosed scope)

**Affected Controls:**  
- `CTL-TEST-001` — Pre-deployment testing (safety testing for abuse vectors)  
- `CTL-OVER-001` — Human review of AI outputs (automated generation without oversight)  
- `CTL-VEN-001` — Vendor review  
- `CTL-DOC-001` — AI system register

**Evidence Required:**  
- `EV-005` — Testing record  
- `EV-007` — Incident response plan  
- `EV-011` — Model documentation

**Sources:**  
- Multiple news reports from 2023–2024 (BBC, NBC, Reuters) documenting NCII incidents.  
- Platform public statements acknowledging the issue (e.g., Midjourney, Stability AI, Microsoft).  
- Legislative references: UK Online Safety Act provisions; US DEFIANCE Act.  
- `https://www.bbc.co.uk/news/technology` — BBC Technology reporting.

**Source Quality:**  
- **Medium-Strong.** Multiple platform acknowledgements. Legislative response confirms real-world harm. Specific individual cases require care for privacy of victims.

**Confidence:** High  
**Severity:** High (serious psychological harm; privacy violation; potential safety risk)

**Why Useful for MVP:**  
Represents `FM-PRIV` + `FM-SAFE` and the growing concern of AI-enabled harm in consumer technology. Anchoring on a specific platform's public acknowledgement would strengthen the record.

**Open Questions:**  
- Which specific platform incident should be the primary anchor? Telegram bot incidents? Discord?  
- Privacy of victims is a significant concern — the record should focus on the systemic/platform failure, not identify specific victims.

**Acceptance Risk:**  
Medium. Requires careful framing to focus on system/platform failure without identifying victims.

**Recommendation:** **Accept** — Focus on platform-level failure to prevent NCII generation; cite platform public statements. Do not identify individual victims.

---

## CAND-010 — AI Diagnostic Tool Produces Unreliable Outputs for Underrepresented Populations

> **Candidate only — not an incident record.**

**Sector:** Healthcare / Medical AI  
**Year/Date:** 2019–2021  
**AI System/Context:** AI-based clinical decision support or diagnostic tool evaluated in studies and deployed in some clinical settings.

**Summary:**  
Academic and clinical research published between 2019 and 2021 documented that certain AI diagnostic tools — particularly dermatology AI tools trained predominantly on images from lighter-skinned populations — produced lower accuracy rates for patients with darker skin tones. Studies published in peer-reviewed journals, including at least one published in Nature Medicine, provided statistical evidence of differential performance. Some tools were reported to have been deployed clinically before these limitations were fully understood.

**Failure Modes:**  
- `FM-BIAS` — Bias (differential diagnostic accuracy across demographic groups)  
- `FM-REL` — Reliability (lower accuracy for underrepresented populations)

**Affected Controls:**  
- `CTL-TEST-002` — Bias testing  
- `CTL-TEST-001` — Pre-deployment testing  
- `CTL-RISK-001` — Risk assessment  
- `CTL-DOC-001` — AI system register

**Evidence Required:**  
- `EV-012` — Bias testing record  
- `EV-005` — Testing record  
- `EV-011` — Model documentation

**Sources:**  
- Adamson & Smith (2018), "Machine Learning and Health Care Disparities in Dermatology," JAMA Dermatology.  
- Obermeyer et al. (2019), "Dissecting racial bias in an algorithm used to manage the health of populations," Science.  
- Nature Medicine peer-reviewed publications on skin lesion AI diagnostic tools.  
- `https://www.science.org/` — Science journal (primary academic source).

**Source Quality:**  
- **Strong.** Peer-reviewed academic publications are primary sources. Obermeyer et al. is a landmark study with documented real-world deployment.

**Confidence:** High  
**Severity:** High (misdiagnosis risk; inequitable healthcare outcomes)

**Why Useful for MVP:**  
Strong academic primary sources. Represents `FM-BIAS` in healthcare — different sector and source type from CAND-002. Important for demonstrating systemic AI governance failures rather than one-off incidents.

**Open Questions:**  
- Should the record reference the Obermeyer et al. healthcare algorithm study (which involves a commercial vendor) or a dermatology AI tool specifically?  
- The Obermeyer et al. study has a vendor reference. Verify whether the vendor has confirmed the findings.

**Acceptance Risk:**  
Low-Medium. Academic sources are strong; vendor confirmation adds confidence.

**Recommendation:** **Accept** — Reference Obermeyer et al. study for healthcare algorithm bias. Supplement with dermatology AI evidence.

---

## CAND-011 — LLM Customer Service Agent Agrees to Unauthorised Contract Terms

> **Candidate only — not an incident record.**

**Sector:** Consumer Services / Retail  
**Year/Date:** 2023–2024  
**AI System/Context:** LLM-based customer service agent deployed on a company's website to handle customer queries and support requests.

**Summary:**  
At least one publicly documented case, involving a company operating in Canada, reportedly involved a chatbot that provided a customer with information about bereavement fare discounts that was inconsistent with the company's actual policy. A tribunal reportedly found that the company was bound by the representation made by the chatbot. The case is reported to represent a situation where an AI agent made a materially incorrect commitment to a customer, and the organisation was held responsible. This case is publicly reported and appears to be part of civil tribunal proceedings.

**Failure Modes:**  
- `FM-HALL` — Hallucination (incorrect policy information provided)  
- `FM-UNAUTH` — Unauthorized Action (agent committed to terms outside its authorised scope)

**Affected Controls:**  
- `CTL-OVER-001` — Human review of AI outputs  
- `CTL-AGENT-001` — Agent scope definition  
- `CTL-AGENT-002` — Agent approval workflow  
- `CTL-TEST-001` — Pre-deployment testing

**Evidence Required:**  
- `EV-008` — Agent activity log  
- `EV-013` — Incident log  
- `EV-004` — Human oversight record

**Sources:**  
- Air Canada v. Moffatt (British Columbia Civil Resolution Tribunal, 2024). Case number and ruling publicly available.  
- Multiple news reports: BBC, The Guardian, Ars Technica.  
- `https://civilresolutionbc.ca/` — BC CRT case record (primary official source).

**Source Quality:**  
- **Very strong.** Civil tribunal ruling is a primary official source. Case is definitively documented in public record.

**Confidence:** High  
**Severity:** Medium (financial harm to customer; institutional accountability implications)

**Why Useful for MVP:**  
One of the clearest publicly adjudicated examples of an AI agent making an unauthorised commitment. Primary source is a tribunal decision. Represents `FM-HALL` + `FM-UNAUTH` in consumer services. Demonstrates agentic failure mode with real legal accountability outcome.

**Open Questions:**  
- Exact citation details of the CRT ruling to confirm.  
- Framing should focus on the system/governance failure, not criticise the company beyond what the tribunal found.

**Acceptance Risk:**  
Very low. Tribunal ruling is unambiguous public document.

**Recommendation:** **Accept** — High priority. Cite BC CRT ruling directly. Air Canada chatbot case.

---

## CAND-012 — Automated Benefits Determination System Incorrectly Denies Social Services

> **Candidate only — not an incident record.**

**Sector:** Government / Public Services  
**Year/Date:** 2016–2019  
**AI System/Context:** Automated benefit eligibility and determination systems used by government agencies to process social welfare claims.

**Summary:**  
Multiple reported cases across different jurisdictions describe situations where automated or algorithm-assisted systems used by government bodies to process benefits applications produced incorrect determinations — including false fraud flags, incorrect eligibility scores, or automated denials that were later overturned on appeal. The Dutch SyRI (System Risk Indication) case, which went to Dutch court in 2020, is one of the most formally documented examples where a court found that an automated risk scoring system violated fundamental rights.

**Failure Modes:**  
- `FM-BIAS` — Bias (disproportionate incorrect determinations for certain demographic groups)  
- `FM-TRANS` — Transparency (algorithm logic not disclosed to affected individuals)  
- `FM-UNAUTH` — Unauthorized Action (automated determination without adequate human oversight gate)

**Affected Controls:**  
- `CTL-OVER-001` — Human review of AI outputs  
- `CTL-DOC-002` — AI use disclosure  
- `CTL-RISK-001` — Risk assessment  
- `CTL-TEST-002` — Bias testing

**Evidence Required:**  
- `EV-002` — Risk assessment  
- `EV-004` — Human oversight record  
- `EV-014` — Post-incident review  
- `EV-012` — Bias testing record

**Sources:**  
- Dutch court ruling on SyRI system, The Hague District Court, February 2020 (ECLI:NL:RBDHA:2020:1878).  
- `https://uitspraken.rechtspraak.nl/` — Dutch court ruling portal (primary official source).  
- UN Special Rapporteur report on extreme poverty and AI, October 2019.

**Source Quality:**  
- **Strong.** Dutch court ruling is a primary official source. UN Special Rapporteur report provides additional context.

**Confidence:** High  
**Severity:** High (fundamental rights violation confirmed by court; significant individual harm from incorrect determinations)

**Why Useful for MVP:**  
Formal court judgment provides unambiguous primary source. Government / public services sector is important for diversity. Represents `FM-BIAS` + `FM-TRANS` with judicial confirmation.

**Open Questions:**  
- The SyRI case is the Netherlands-specific instance — confirm whether the description should reference other jurisdictions or focus on the Dutch case.  
- Translation of Dutch court documents for citation purposes.

**Acceptance Risk:**  
Low. Court ruling is publicly available. Framing as factual description of what the court found is safe.

**Recommendation:** **Accept** — Reference Dutch SyRI court ruling. Focus on court findings rather than editorial characterisation.

---

## CAND-013 — AI Code Generation Tool Produces Vulnerable Security Code

> **Candidate only — not an incident record.**

**Sector:** Software Development / Technology  
**Year/Date:** 2021–2022  
**AI System/Context:** AI code generation/completion tools (e.g., GitHub Copilot or similar) used by developers to generate code for production software.

**Summary:**  
Academic research published in 2021–2022 studied the security properties of code generated by AI code completion tools. At least one peer-reviewed study, conducted at Stanford, found that a significant proportion of generated code samples contained security vulnerabilities, and that developers using AI code completion tools were statistically more likely to introduce certain classes of vulnerabilities than those not using such tools. The study is publicly available and was widely reported in technical media.

**Failure Modes:**  
- `FM-SEC` — Security (AI-generated code contains security vulnerabilities)  
- `FM-REL` — Reliability (unreliable output quality for security-sensitive code patterns)

**Affected Controls:**  
- `CTL-TEST-001` — Pre-deployment testing  
- `CTL-OVER-001` — Human review of AI outputs (code review practices for AI-generated code)  
- `CTL-DOC-001` — AI system register (governance of AI coding tools in development workflow)

**Evidence Required:**  
- `EV-005` — Testing record (security evaluation of generated code)  
- `EV-011` — Model documentation  
- `EV-004` — Human oversight record (code review records)

**Sources:**  
- Pearce et al. (2022), "Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions," IEEE S&P 2022.  
- `https://arxiv.org/abs/2108.09293` — ArXiv preprint (primary academic source).  
- GitHub Copilot public documentation and risk acknowledgements.

**Source Quality:**  
- **Strong (academic).** Peer-reviewed and conference-published academic study. Primary empirical evidence. However, this is a systemic research finding rather than a specific real-world deployment incident.

**Confidence:** Medium-High  
**Severity:** Medium-High (security vulnerability in production code; actual exploitation not confirmed in this study)

**Why Useful for MVP:**  
Represents `FM-SEC` in the software development sector. Good diversity. Strong academic primary source. However, the academic study documents a general risk pattern rather than a named discrete incident.

**Open Questions:**  
- Is there a specific documented production incident where AI-generated vulnerable code was exploited in the real world? That would be a stronger anchor than a research study.  
- The research study is a strong source for a systemic observation; may be better framed as a sector-wide control failure observation rather than a specific incident.

**Acceptance Risk:**  
Medium. Research study finding vs. discrete incident distinction matters for the incident record format.

**Recommendation:** **Postpone** — Research whether a specific production security incident attributable to AI-generated vulnerable code has been publicly documented.

---

## CAND-014 — AI Surveillance System Incorrectly Flags Innocent Individuals for Security Review

> **Candidate only — not an incident record.**

**Sector:** Government / Security / Border Control  
**Year/Date:** 2019–2022  
**AI System/Context:** AI-based surveillance or watchlist-matching systems deployed at border control or public security checkpoints.

**Summary:**  
Multiple reported cases and some official documentation describe situations where individuals have been incorrectly flagged or detained based on AI-driven surveillance system errors, including facial recognition mismatches at border crossings and airport security. At least one documented case involves a US traveller incorrectly matched by a US Customs and Border Protection facial recognition system. CBP publishes aggregate performance data but individual incident details are limited.

**Failure Modes:**  
- `FM-BIAS` — Bias (differential accuracy for certain demographic groups in surveillance contexts)  
- `FM-REL` — Reliability (false positive matches leading to incorrect security flags)

**Affected Controls:**  
- `CTL-OVER-001` — Human review of AI outputs (automated flag leading to detention without adequate human verification)  
- `CTL-TEST-002` — Bias testing  
- `CTL-RISK-001` — Risk assessment  
- `CTL-DOC-002` — AI use disclosure

**Evidence Required:**  
- `EV-012` — Bias testing record  
- `EV-004` — Human oversight record  
- `EV-002` — Risk assessment

**Sources:**  
- US CBP public reports on facial recognition deployment at airports.  
- DHS Office of Inspector General reports on biometric identification accuracy.  
- Academic and civil liberties documentation of airport facial recognition false positives.  
- `https://www.dhs.gov/` — DHS publications (primary official source category).

**Source Quality:**  
- **Medium.** Government aggregate reports exist; individual incident primary sources are limited. This is primarily a systemic concern with limited discrete incident documentation.

**Confidence:** Medium  
**Severity:** High (wrongful detention; civil rights implications)

**Why Useful for MVP:**  
Government/security sector diversity. However, very similar to CAND-002 (facial recognition misidentification) in failure mode and sector.

**Open Questions:**  
- Significant overlap with CAND-002. Are there enough distinct features to justify a separate record?  
- Better-documented individual cases may exist in NIST or DHS Inspector General reports.

**Acceptance Risk:**  
Medium-High. Overlap with CAND-002 weakens the case for separate inclusion; source quality is secondary.

**Recommendation:** **Reject** — Too similar in failure mode and sector to CAND-002. If included, would reduce diversity value. Consider as a supplementary note in the CAND-002 record context instead.

---

## CAND-015 — LLM Produces Discriminatory Outputs in Hiring Assessment Context

> **Candidate only — not an incident record.**

**Sector:** Employment / Human Resources  
**Year/Date:** 2023–2024  
**AI System/Context:** LLM-based or AI-assisted hiring and interview assessment tools used by employers to evaluate job candidates.

**Summary:**  
Research and audit reports from 2023 onwards have documented that some AI hiring assessment tools — including tools that analyse video interviews, written responses, or structured application forms — produce outputs that correlate with protected characteristics such as race, gender, and disability. The US Equal Employment Opportunity Commission (EEOC) issued guidance in 2023 on the application of employment discrimination law to AI-based hiring tools. At least one enforcement action involving an AI hiring tool has been reported by the EEOC, though formal settlements are limited in public detail.

**Failure Modes:**  
- `FM-BIAS` — Bias (discriminatory outcomes in AI-assisted hiring)  
- `FM-TRANS` — Transparency (candidates not informed of AI use in evaluation)

**Affected Controls:**  
- `CTL-TEST-002` — Bias testing  
- `CTL-DOC-002` — AI use disclosure  
- `CTL-RISK-001` — Risk assessment  
- `CTL-OVER-001` — Human review of AI outputs

**Evidence Required:**  
- `EV-012` — Bias testing record  
- `EV-002` — Risk assessment  
- `EV-005` — Testing record

**Sources:**  
- EEOC Technical Assistance Guidance on AI and employment discrimination (May 2023).  
- `https://www.eeoc.gov/` — EEOC official publications (primary official source).  
- HireVue and similar vendor audit reports where publicly available.  
- New York City Local Law 144 on automated employment decision tools — city-level regulatory context.

**Source Quality:**  
- **Strong (regulatory guidance).** EEOC guidance is a primary official source. NYC Local Law 144 enforcement actions provide additional primary regulatory material.

**Confidence:** Medium-High  
**Severity:** Medium (discriminatory employment outcomes; regulatory enforcement risk)

**Why Useful for MVP:**  
EEOC is a primary official source. Represents `FM-BIAS` in employment sector (complementary to CAND-004 which focuses on a specific company; this focuses on the sector-wide regulatory response). Different source type (regulatory guidance vs. investigative journalism).

**Open Questions:**  
- Is there a specific EEOC enforcement action available as primary source rather than guidance only?  
- NYC Local Law 144 compliance audit results from 2023 may provide more specific incident material.  
- Risk of overlap with CAND-004 — how distinct are these? CAND-004 is a 2018 internal company tool; CAND-015 is 2023 sector-wide regulatory response. Sufficiently distinct.

**Acceptance Risk:**  
Low-Medium. EEOC guidance is solid; a specific enforcement action would strengthen confidence.

**Recommendation:** **Accept** — Reference EEOC guidance and NYC Local Law 144 context. Anchor on regulatory response as primary source. Note that a specific enforcement action citation would improve confidence if available.

---

## Summary of Candidates

| Candidate ID | Title (Short) | Sector | Recommendation |
|---|---|---|---|
| CAND-001 | Healthcare chatbot inaccurate treatment guidance | Healthcare | Postpone |
| CAND-002 | Facial recognition wrongful arrest | Law Enforcement | Accept |
| CAND-003 | LLM fabricated legal case citations | Legal | Accept |
| CAND-004 | AI recruitment gender bias | Employment | Accept |
| CAND-005 | Content moderation over-removal COVID-19 | Social Media | Accept |
| CAND-006 | Autonomous vehicle pedestrian fatality | Transportation | Accept |
| CAND-007 | Predictive policing deployment | Law Enforcement | Postpone |
| CAND-008 | AI financial advice inaccuracy | Financial Services | Postpone |
| CAND-009 | AI-generated NCII images | Consumer Technology | Accept |
| CAND-010 | AI diagnostic bias underrepresented populations | Healthcare | Accept |
| CAND-011 | LLM chatbot unauthorised contract commitment | Consumer Services | Accept |
| CAND-012 | Automated benefits denial SyRI | Government | Accept |
| CAND-013 | AI code generation security vulnerabilities | Software Dev | Postpone |
| CAND-014 | AI surveillance false flags | Government / Security | Reject |
| CAND-015 | LLM hiring assessment discrimination | Employment | Accept |

**Total:** 15 candidates — 10 Accept, 4 Postpone, 1 Reject
