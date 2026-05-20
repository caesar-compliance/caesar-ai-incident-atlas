# Incident Candidate Shortlist Draft — INC-0011+ Planning

**Task:** T034 — Candidate Shortlist Draft for INC-0011+ Planning
**Date:** 20 May 2026
**Version:** 0.7.2
**Status:** Planning only — NOT legal advice. No candidates approved. No records created.

---

## Governance Notice

- **No candidate in this document is approved for publication.**
- **No new incident records were created.**
- **No sources are legally cleared.**
- **No publication decision has been made.**
- **All candidates have status: `not_approved_candidate`.**
- **All candidates require explicit CT review before becoming records.**
- **All candidates require separate source/license and wording/legal-risk review before publication.**
- **G-01/G-02 approval scope remains limited to INC-0001 through INC-0010 only.**
- This document is internal planning material only. Not legal advice.

---

## Existing Coverage Summary (INC-0001–INC-0010)

Before candidates are listed, the current dataset coverage is summarised to guide diversity selection:

| Covered sector | Covered failure modes | Jurisdiction |
|---|---|---|
| `legal-compliance` | FM-HALL, FM-REL | United States |
| `transportation-autonomous` | FM-SAFE, FM-REL | United States |
| `retail-ecommerce` | FM-HALL, FM-UNAUTH | Canada |
| `public-sector` | FM-BIAS, FM-TRANS, FM-UNAUTH | Netherlands |
| `law-enforcement` | FM-BIAS, FM-TRANS | United States |
| `hiring-employment` (×2) | FM-BIAS, FM-TRANS | United States |
| `media-content` (×2) | FM-REL, FM-TRANS, FM-PRIV, FM-SAFE, FM-UNAUTH | United States, UK |
| `healthcare-medical` | FM-BIAS, FM-REL | United States |

**Coverage gaps to fill:** `finance`, `education`, `insurance`, `criminal justice (non-FR)`, `consumer services`, `EU/Asia-Pacific jurisdiction`, `FM-SEC` (security/adversarial).

---

## Candidate Entries

---

### CAND-001

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-001` |
| **Working title** | AI credit-scoring system found to produce racially disparate outcomes — US |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United States |
| **Sector** | `finance-credit` |
| **AI system / use case** | Automated credit risk scoring / loan decision system |
| **Potential failure modes** | FM-BIAS, FM-TRANS |
| **Potential affected controls** | Bias testing control; model explainability control; adverse action notice control |
| **Potential required evidence** | Model validation reports; disparate impact analysis; adverse action notice logs |
| **Potential governance lesson** | Credit scoring AI must be tested for disparate impact across protected classes under applicable fair lending law; model explainability is required for adverse action notices |
| **Potential source categories** | Regulatory enforcement action (CFPB, OCC, or state regulator); court record; official company statement |
| **Expected source-risk level** | Low (if regulatory enforcement action exists as primary source) |
| **Expected wording/legal-risk level** | Medium (financial discrimination claims require careful hedging) |
| **Why include** | Adds new sector (`finance-credit`) and FM-BIAS in a regulated financial context; US fair lending law (ECOA, FHA) provides strong regulatory framework; likely Tier 1 sources available from CFPB or OCC enforcement actions |
| **Why exclude / caution** | Must confirm specific enforcement action with public record; do not conflate general algorithmic concern with a specific adjudicated case; wording must not allege illegal discrimination without formal finding |
| **Required gate before record creation** | CT candidate approval; source/license review; wording/legal-risk review |

---

### CAND-002

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-002` |
| **Working title** | Automated welfare benefit denial system challenged in UK courts — UK |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United Kingdom |
| **Sector** | `public-sector` |
| **AI system / use case** | Automated benefits eligibility / Universal Credit decision support |
| **Potential failure modes** | FM-BIAS, FM-TRANS, FM-UNAUTH |
| **Potential affected controls** | Human oversight control; explainability control; appeal/redress control |
| **Potential required evidence** | Tribunal or court decision records; government audit reports; DWP impact assessments |
| **Potential governance lesson** | Automated welfare decisions require human review pathways; GDPR Article 22 (automated decision-making) applies; lack of explainability undermines appeal rights |
| **Potential source categories** | UK tribunal / court record (BAILII); parliamentary question/Hansard; official DWP publication; reputable UK media as secondary |
| **Expected source-risk level** | Low–Medium (court/tribunal record preferred; confirm availability) |
| **Expected wording/legal-risk level** | Medium (ongoing policy controversy; avoid characterising policy as unlawful without court finding) |
| **Why include** | Adds UK jurisdiction; expands public-sector FM-BIAS and FM-UNAUTH in a distinct legal context (GDPR Article 22, UK Equality Act); strong governance lesson |
| **Why exclude / caution** | Needs source verification — confirm specific court/tribunal decision exists with public URL before inclusion; do not use parliamentary criticism alone as primary source |
| **Required gate before record creation** | CT candidate approval; source verification (BAILII / UK tribunal); wording/legal-risk review |

---

### CAND-003

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-003` |
| **Working title** | AI exam proctoring system generates discriminatory false-positive flags — US/Global |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United States (primary); potentially global |
| **Sector** | `education` |
| **AI system / use case** | Automated remote exam proctoring (eye-tracking, facial recognition, behavioural analysis) |
| **Potential failure modes** | FM-BIAS, FM-REL, FM-TRANS |
| **Potential affected controls** | Bias testing control; human review control; transparency/disclosure control |
| **Potential required evidence** | Institutional review reports; vendor audit results; student complaint records; academic studies |
| **Potential governance lesson** | Proctoring AI that uses facial recognition or behavioural analysis must be tested for demographic bias before deployment; students must be informed of AI decision criteria |
| **Potential source categories** | Academic/peer-reviewed study (peer-reviewed institutions); official university policy statements; regulatory or legislative record (US state bans); reputable media as secondary |
| **Expected source-risk level** | Medium (academic papers available; confirm peer-reviewed primary; some accounts are media-only) |
| **Expected wording/legal-risk level** | Medium (vendor identity sensitive; avoid naming specific vendors without adjudicated finding unless official record cites them) |
| **Why include** | Adds new sector (`education`); FM-BIAS in an educational context with demonstrated racial and disability bias concerns; multiple peer-reviewed studies available |
| **Why exclude / caution** | Many accounts rely on student testimonials or journalism — needs at least one peer-reviewed or official source as primary; vendor-specific claims require careful sourcing |
| **Required gate before record creation** | CT candidate approval; source/license review (confirm peer-reviewed open-access primary); wording/legal-risk review |

---

### CAND-004

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-004` |
| **Working title** | Algorithmic sentencing/parole risk tool challenged for racial bias — US |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United States |
| **Sector** | `criminal-justice` |
| **AI system / use case** | Recidivism risk scoring / pre-trial risk assessment tool (e.g., COMPAS-type tool) |
| **Potential failure modes** | FM-BIAS, FM-TRANS |
| **Potential affected controls** | Bias testing control; explainability control; human oversight control; appeal/redress control |
| **Potential required evidence** | Court decision records; published algorithmic audits; academic racial bias studies; legislative hearing records |
| **Potential governance lesson** | Risk scoring tools used in sentencing or parole must be independently audited for racial bias; defendants have a right to challenge scoring methodology; unexplained proprietary scoring undermines due process |
| **Potential source categories** | State supreme court decisions; peer-reviewed audit study (ProPublica / academic); legislative hearing records; ACLU documentation as secondary |
| **Expected source-risk level** | Low (court records + peer-reviewed academic audit available) |
| **Expected wording/legal-risk level** | Medium–High (racial bias in criminal justice is legally sensitive; avoid definitive legal conclusions; must accurately reflect court outcomes) |
| **Why include** | Adds new sector (`criminal-justice`); FM-BIAS + FM-TRANS in high-stakes context; strong peer-reviewed and court-record source base; landmark governance lesson on AI in criminal justice |
| **Why exclude / caution** | Multiple cases exist — must select a specific, well-documented instance with public court record rather than general commentary; wording must reflect what courts actually ruled, not advocacy claims |
| **Required gate before record creation** | CT candidate approval; source/license review; wording/legal-risk review; counsel review recommended (criminal justice + racial bias intersection) |

---

### CAND-005

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-005` |
| **Working title** | Generative AI chatbot produces harmful medical advice to vulnerable user — Global |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | Multiple (US / EU / Global) |
| **Sector** | `healthcare-medical` |
| **AI system / use case** | General-purpose consumer AI chatbot used for medical/mental health queries |
| **Potential failure modes** | FM-HALL, FM-SAFE, FM-REL |
| **Potential affected controls** | Output safety control; use-case restriction control; human escalation control; user warning/disclosure control |
| **Potential required evidence** | Official incident reports; company safety statements; regulatory guidance; academic safety studies |
| **Potential governance lesson** | General-purpose AI chatbots deployed in or adjacent to healthcare contexts must implement output safety controls; users must be clearly warned of limitations; escalation to human professionals must be available |
| **Potential source categories** | Official company safety statement; regulatory guidance (FDA, MHRA, EMA); peer-reviewed study; reputable media as secondary |
| **Expected source-risk level** | Medium (company statements available; academic studies growing; specific incident documentation varies) |
| **Expected wording/legal-risk level** | High (individual harm claims require care; must not attribute specific personal harm without official record; privacy of any individuals involved must be protected) |
| **Why include** | Expands `healthcare-medical` with distinct failure mode combination (FM-HALL + FM-SAFE vs existing FM-BIAS + FM-REL); consumer AI context adds breadth; strong governance lesson on safety controls |
| **Why exclude / caution** | Specific, well-documented instances with official primary source are harder to find than general commentary; must not rely solely on media accounts; individual privacy of any users involved must be protected |
| **Required gate before record creation** | CT candidate approval; source verification (official record or academic primary required); wording/legal-risk review; counsel review if individual harm claimed |

---

### CAND-006

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-006` |
| **Working title** | AI-generated deepfake audio used in financial fraud / CEO voice impersonation — UK/Global |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United Kingdom (primary reported instance); global pattern |
| **Sector** | `finance-fraud` |
| **AI system / use case** | AI voice synthesis / deepfake audio used to impersonate executives for wire-transfer fraud |
| **Potential failure modes** | FM-SEC, FM-PRIV, FM-UNAUTH |
| **Potential affected controls** | Authentication control; voice verification control; wire transfer approval control; staff awareness control |
| **Potential required evidence** | Law enforcement / regulatory reports; company security disclosures; academic fraud studies; reputable media as secondary |
| **Potential governance lesson** | Voice-synthesis AI enables new categories of business email compromise; organisations must implement multi-factor authentication for financial transfers; AI-generated voice cannot be used as sole authentication |
| **Potential source categories** | Law enforcement report or official company disclosure; reputable major media (WSJ, FT) as secondary; academic security research |
| **Expected source-risk level** | Medium (major media reported; official law enforcement record harder to confirm publicly) |
| **Expected wording/legal-risk level** | Medium (fraud context; avoid naming specific individuals as perpetrators without court record) |
| **Why include** | Introduces FM-SEC (security/adversarial) — not currently represented in INC-0001–INC-0010; adds `finance-fraud` sector; strong, emerging governance lesson on AI-enabled fraud |
| **Why exclude / caution** | Primary sources are largely journalism (WSJ, FT) — would be Tier 3 sole-source unless law enforcement record is found; needs source verification to confirm Tier 1/2 primary exists |
| **Required gate before record creation** | CT candidate approval; source verification (law enforcement or official record preferred); wording/legal-risk review |

---

### CAND-007

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-007` |
| **Working title** | Automated insurance claim denial algorithm challenged for systematic bias — EU |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | European Union (jurisdiction needs source verification) |
| **Sector** | `insurance` |
| **AI system / use case** | Automated insurance claim triage / denial system |
| **Potential failure modes** | FM-BIAS, FM-TRANS, FM-UNAUTH |
| **Potential affected controls** | Bias testing control; explainability control; appeal/redress control; human oversight control |
| **Potential required evidence** | Regulatory enforcement decision; court record; insurance authority report |
| **Potential governance lesson** | Automated insurance claim decisions must be explainable under GDPR Article 22; policyholders must have access to human review; bias testing must be applied before deployment |
| **Potential source categories** | EU national financial regulator decision; court record (ECLI or equivalent); European Insurance and Occupational Pensions Authority (EIOPA) guidance |
| **Expected source-risk level** | Medium–High (specific regulatory action needs source verification; general EIOPA guidance exists but specific incident documentation may be limited) |
| **Expected wording/legal-risk level** | Medium (regulatory context; avoid characterising as unlawful without formal finding) |
| **Why include** | Adds new sector (`insurance`); EU jurisdiction not yet in dataset (NL covered by INC-0004 but this is distinct sector); FM-BIAS + FM-TRANS in insurance context |
| **Why exclude / caution** | Specific documented incident with public regulatory record needs verification; do not construct a composite from general EIOPA warnings without a specific incident anchor |
| **Required gate before record creation** | CT candidate approval; source verification required before proceeding; wording/legal-risk review |

---

### CAND-008

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-008` |
| **Working title** | AI hiring assessment tool found to screen out disabled candidates — US |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United States |
| **Sector** | `hiring-employment` |
| **AI system / use case** | AI video interview / behavioural assessment tool screening job applicants |
| **Potential failure modes** | FM-BIAS, FM-TRANS |
| **Potential affected controls** | Disability accommodation control; bias testing control; transparency/disclosure control; ADA compliance control |
| **Potential required evidence** | EEOC charge or consent decree; court record; DOJ guidance; published audit |
| **Potential governance lesson** | AI assessment tools must be tested for adverse impact on disabled applicants under the ADA; applicants must be notified of AI use and be able to request accommodation; NYC LL144 and similar laws require bias audits |
| **Potential source categories** | EEOC charge/consent decree (public); DOJ guidance; court record; academic audit study |
| **Expected source-risk level** | Low–Medium (EEOC enforcement actions are public; confirm specific case exists) |
| **Expected wording/legal-risk level** | Medium (disability discrimination is legally sensitive; must accurately reflect EEOC/court findings) |
| **Why include** | Expands `hiring-employment` with disability-bias angle (existing INC-0006/INC-0010 cover gender/race bias); distinct failure mode application; strong regulatory source base via EEOC |
| **Why exclude / caution** | Must not create a composite of general EEOC guidance and journalism — needs a specific EEOC charge or court record as anchor; check INC-0010 overlap (EEOC guidance) and ensure this is a distinct, specific incident |
| **Required gate before record creation** | CT candidate approval; source verification (specific EEOC action required); wording/legal-risk review |

---

### CAND-009

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-009` |
| **Working title** | AI-assisted child welfare removal decision challenged for algorithmic bias — US |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United States |
| **Sector** | `public-sector` |
| **AI system / use case** | Predictive child welfare risk scoring / family separation decision support |
| **Potential failure modes** | FM-BIAS, FM-TRANS, FM-UNAUTH |
| **Potential affected controls** | Human oversight control; bias testing control; explainability control; appeal/redress control |
| **Potential required evidence** | Court records; government audit reports; ACLU documentation; academic study |
| **Potential governance lesson** | Predictive risk scoring in child welfare must be independently audited for racial and socioeconomic bias; human caseworkers must retain final decision authority; affected families must have a right to understand and challenge the score |
| **Potential source categories** | Court record or state audit report (preferred); academic study (peer-reviewed); ACLU documentation as secondary |
| **Expected source-risk level** | Medium (multiple public reports exist; confirm specific court or audit record as primary) |
| **Expected wording/legal-risk level** | High (child welfare + family separation is highly sensitive; privacy of children and families must be protected; must not name individuals) |
| **Why include** | Expands `public-sector` with distinct use case (child welfare vs INC-0004 welfare fraud scoring); adds FM-BIAS in a new high-stakes context; strong governance lesson on AI in family law |
| **Why exclude / caution** | High privacy and sensitivity risk — records involving children require extreme care; wording must be fully anonymised; must rely only on official/academic sources, not journalism about specific families |
| **Required gate before record creation** | CT candidate approval; source verification; wording/legal-risk review; **counsel review required** |

---

### CAND-010

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-010` |
| **Working title** | LLM-generated legal document contains material errors causing client harm — Global |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | Multiple (US / UK / Australia) |
| **Sector** | `legal-compliance` |
| **AI system / use case** | Generative AI used to draft legal documents (contracts, pleadings, advice letters) |
| **Potential failure modes** | FM-HALL, FM-REL |
| **Potential affected controls** | Output verification control; professional review control; client disclosure control; liability management control |
| **Potential required evidence** | Court sanctions/judgments; bar association disciplinary records; law firm public disclosures |
| **Potential governance lesson** | LLM-generated legal documents must be reviewed by qualified legal professionals before filing or delivery; law firms must disclose AI use to clients; failure to verify AI-generated content can constitute professional misconduct |
| **Potential source categories** | Court sanction order (public court record); bar association disciplinary record; court judgment |
| **Expected source-risk level** | Low (court sanction orders are public records; multiple US cases confirmed post-Mata) |
| **Expected wording/legal-risk level** | Low–Medium (court records are authoritative; wording must accurately reflect the specific sanction, not generalise) |
| **Why include** | Expands `legal-compliance` (existing INC-0001 covers fabricated citations; this adds a different failure pattern — document drafting errors leading to sanctions); strong Tier 1 source base |
| **Why exclude / caution** | Must be a distinct incident from INC-0001 (Mata v. Avianca) — must select a specific different case; several post-2023 court sanction orders exist |
| **Required gate before record creation** | CT candidate approval; source verification (select specific court sanction record distinct from INC-0001); wording/legal-risk review |

---

### CAND-011

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-011` |
| **Working title** | Facial recognition deployed in retail environment triggers discrimination concerns — UK/EU |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United Kingdom |
| **Sector** | `retail-ecommerce` |
| **AI system / use case** | Live facial recognition deployed in retail stores for loss prevention / person of interest identification |
| **Potential failure modes** | FM-BIAS, FM-PRIV, FM-TRANS |
| **Potential affected controls** | Privacy impact assessment control; consent/disclosure control; bias testing control; data minimisation control |
| **Potential required evidence** | ICO enforcement notice or audit; court record; official company statement; UK surveillance camera commissioner report |
| **Potential governance lesson** | Live facial recognition in retail raises GDPR/UK GDPR lawful basis, data minimisation, and fairness obligations; ICO enforcement provides authoritative source; biometric data processing in public spaces requires clear legal basis |
| **Potential source categories** | ICO enforcement notice (preferred, public); UK Surveillance Camera Commissioner report; court record (BAILII); reputable UK media as secondary |
| **Expected source-risk level** | Low (ICO enforcement notices are public records) |
| **Expected wording/legal-risk level** | Medium (named retailer; ICO finding provides authority; must accurately reflect enforcement outcome) |
| **Why include** | Adds FM-PRIV + FM-BIAS in `retail-ecommerce` (INC-0003 covers chatbot/FM-HALL in retail — distinct); UK jurisdiction with ICO enforcement as Tier 1 source; biometric processing adds new evidence type |
| **Why exclude / caution** | Must confirm specific ICO enforcement notice with public URL; do not rely solely on media reports of ICO investigation |
| **Required gate before record creation** | CT candidate approval; source verification (ICO enforcement notice URL); wording/legal-risk review |

---

### CAND-012

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-012` |
| **Working title** | Automated content moderation incorrectly removes political speech during election period — Global |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | Multiple (US / EU / Global) |
| **Sector** | `media-content` |
| **AI system / use case** | Automated content moderation system applied to political or election-related content |
| **Potential failure modes** | FM-REL, FM-TRANS, FM-BIAS |
| **Potential affected controls** | Human review escalation control; transparency/disclosure control; appeal/redress control; political content handling control |
| **Potential required evidence** | Official company transparency report; congressional hearing record; EU DSA regulatory record; academic content moderation study |
| **Potential governance lesson** | Automated moderation of political content requires elevated accuracy thresholds, human review escalation, and transparent appeal processes; election integrity requires platform transparency reports |
| **Potential source categories** | Official platform transparency report; US congressional hearing record; EU DSA enforcement decision; academic study |
| **Expected source-risk level** | Medium (platform transparency reports exist; specific incident documentation varies; congressional records are public) |
| **Expected wording/legal-risk level** | Medium–High (political speech is legally sensitive; must not characterise moderation as unlawful without official finding; First Amendment/EU charter context must be handled carefully) |
| **Why include** | Expands `media-content` with distinct failure mode (political content moderation vs COVID health content in INC-0007); adds election integrity governance angle; DSA provides EU regulatory framework |
| **Why exclude / caution** | Must select a specific documented incident, not a general concern; avoid politically charged wording; source must be official or academic, not solely partisan commentary |
| **Required gate before record creation** | CT candidate approval; source verification (specific incident with official record); wording/legal-risk review |

---

### CAND-013

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-013` |
| **Working title** | AI diagnostic tool produces racially biased spirometry reference ranges — US |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United States |
| **Sector** | `healthcare-medical` |
| **AI system / use case** | Medical diagnostic algorithm using race-based correction factors (pulmonary function / spirometry) |
| **Potential failure modes** | FM-BIAS, FM-REL |
| **Potential affected controls** | Bias testing control; clinical validation control; model update control; professional guidance control |
| **Potential required evidence** | Medical society guidance (ATS, ERS); peer-reviewed study (NEJM, Lancet, JAMA); FDA device communication; academic audit |
| **Potential governance lesson** | Race-based correction factors in medical algorithms can systematically underestimate disease severity in certain groups; medical AI must be validated across all patient populations; professional society guidance is a key governance trigger |
| **Potential source categories** | ATS/ERS official clinical guideline update; peer-reviewed publication (NEJM, JAMA, Lancet); FDA safety communication |
| **Expected source-risk level** | Low (ATS/ERS guidelines are public; peer-reviewed publications available via PubMed) |
| **Expected wording/legal-risk level** | Low–Medium (medical society guidance is authoritative; wording must follow peer-reviewed findings, not advocate) |
| **Why include** | Expands `healthcare-medical` with a distinct failure (race-based algorithmic correction vs resource allocation bias in INC-0009); strong Tier 1/2 source base from medical societies and peer-reviewed journals |
| **Why exclude / caution** | Topic involves race in medicine — wording must be clinically accurate and follow peer-reviewed guidance; must not overstate causal harm without clinical evidence |
| **Required gate before record creation** | CT candidate approval; source verification (ATS/ERS guideline + PubMed primary); wording/legal-risk review |

---

### CAND-014

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-014` |
| **Working title** | AI fraud detection system flags legitimate transactions, causing account freezes for minority customers — US/EU |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | United States or EU (needs source verification) |
| **Sector** | `finance-banking` |
| **AI system / use case** | AI-powered transaction fraud detection / account suspension system |
| **Potential failure modes** | FM-BIAS, FM-REL, FM-TRANS |
| **Potential affected controls** | Bias testing control; false positive rate monitoring control; customer redress control; human review escalation control |
| **Potential required evidence** | Regulatory enforcement action (CFPB, OCC, FCA, ECB); court record; official company disclosure |
| **Potential governance lesson** | AI fraud detection systems must be monitored for disparate false-positive rates across demographic groups; account freezes based on AI decisions must provide prompt human review pathways |
| **Potential source categories** | CFPB / OCC / FCA enforcement action (preferred); court record; academic bias audit |
| **Expected source-risk level** | Medium (regulatory actions in this space are growing; confirm specific public enforcement record) |
| **Expected wording/legal-risk level** | Medium (financial discrimination; must reflect regulatory finding not advocacy) |
| **Why include** | Adds `finance-banking` sector (distinct from `finance-credit` in CAND-001); FM-BIAS in transaction monitoring context; strong regulatory source potential |
| **Why exclude / caution** | Specific enforcement action must be confirmed; general concern about banking AI bias is not sufficient for a record |
| **Required gate before record creation** | CT candidate approval; source verification; wording/legal-risk review |

---

### CAND-015

| Field | Value |
|---|---|
| **Candidate ID** | `CAND-015` |
| **Working title** | Autonomous AI agent takes unauthorised financial action in enterprise deployment — Global |
| **Planning status** | `not_approved_candidate` |
| **Jurisdiction** | Multiple / Global |
| **Sector** | `enterprise-ai-agents` |
| **AI system / use case** | Autonomous AI agent (LLM-based) with tool access taking unsanctioned actions (purchases, data access, communications) |
| **Potential failure modes** | FM-UNAUTH, FM-REL, FM-SAFE |
| **Potential affected controls** | Agent scope/permission control; human approval gate control; action audit log control; agent rollback control |
| **Potential required evidence** | Official company incident disclosure; academic security research; regulatory guidance on agentic AI |
| **Potential governance lesson** | AI agents with tool access must operate within strictly bounded permission scopes; high-risk actions must require human approval; agent actions must be logged and auditable; irreversible actions must be gated |
| **Potential source categories** | Official company incident report or security disclosure; academic research (arXiv / peer-reviewed); regulatory guidance (NIST AI RMF, EU AI Act guidance) |
| **Expected source-risk level** | Medium–High (documented real-world incidents with official primary sources are still limited; academic research is growing) |
| **Expected wording/legal-risk level** | Low–Medium (emerging category; wording can be framed around publicly disclosed research/guidance) |
| **Why include** | Adds new sector (`enterprise-ai-agents`); FM-UNAUTH in agentic context is not yet in dataset; highly relevant to governance OS mission; growing regulatory focus |
| **Why exclude / caution** | Well-documented incidents with official primary sources are scarce; many accounts rely on researcher demonstrations rather than real-world harm; needs source verification before proceeding |
| **Required gate before record creation** | CT candidate approval; source verification (official disclosure or peer-reviewed primary required); wording/legal-risk review |

---

## Candidate Summary

| Candidate ID | Working Title (short) | Sector | Jurisdiction | Priority | Source-Risk | Wording-Risk | Status |
|---|---|---|---|---|---|---|---|
| CAND-001 | AI credit scoring — racial bias | `finance-credit` | US | P1 | Low | Medium | `not_approved_candidate` |
| CAND-002 | UK welfare benefit denial AI | `public-sector` | UK | P1 | Low–Medium | Medium | `not_approved_candidate` |
| CAND-003 | AI exam proctoring bias | `education` | US/Global | P1 | Medium | Medium | `not_approved_candidate` |
| CAND-004 | Sentencing risk-score racial bias | `criminal-justice` | US | P1 | Low | Medium–High | `not_approved_candidate` |
| CAND-005 | Chatbot harmful medical advice | `healthcare-medical` | Global | P2 | Medium | High | `not_approved_candidate` |
| CAND-006 | Deepfake CEO voice fraud | `finance-fraud` | UK/Global | P2 | Medium | Medium | `not_approved_candidate` |
| CAND-007 | Insurance claim denial bias — EU | `insurance` | EU | P2 | Medium–High | Medium | `not_approved_candidate` |
| CAND-008 | AI hiring — disability bias | `hiring-employment` | US | P1 | Low–Medium | Medium | `not_approved_candidate` |
| CAND-009 | Child welfare AI bias | `public-sector` | US | P2 | Medium | High | `not_approved_candidate` |
| CAND-010 | LLM legal document errors | `legal-compliance` | US/UK/AU | P1 | Low | Low–Medium | `not_approved_candidate` |
| CAND-011 | Retail facial recognition — ICO | `retail-ecommerce` | UK | P1 | Low | Medium | `not_approved_candidate` |
| CAND-012 | Political content moderation | `media-content` | Global | P3 | Medium | Medium–High | `not_approved_candidate` |
| CAND-013 | Race-based spirometry algorithm | `healthcare-medical` | US | P1 | Low | Low–Medium | `not_approved_candidate` |
| CAND-014 | Fraud detection — minority bias | `finance-banking` | US/EU | P2 | Medium | Medium | `not_approved_candidate` |
| CAND-015 | Agentic AI unauthorised action | `enterprise-ai-agents` | Global | P3 | Medium–High | Low–Medium | `not_approved_candidate` |

---

*See `INCIDENT_CANDIDATE_TRIAGE_MATRIX.md` for structured priority and source-readiness matrices. See `INCIDENT_RECORD_CREATION_GATE_CHECKLIST.md` for the gate checklist required before any candidate becomes a real record.*

**Disclaimer:** This document is planning material only. No candidate listed here is approved for publication. No new incident records were created. No sources are legally cleared. All candidates have status `not_approved_candidate`. Not legal advice.
