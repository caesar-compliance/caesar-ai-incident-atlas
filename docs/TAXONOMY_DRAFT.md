# Taxonomy Draft — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Status:** Draft — requires Control Tower review before implementation

---

## Overview

This document defines the taxonomy structures for Caesar AI Incident Atlas:

1. Failure mode taxonomy
2. Control taxonomy
3. Evidence type registry
4. Sector taxonomy

These taxonomies are the backbone of the governance mapping layer. They connect incidents to controls and controls to evidence requirements.

---

## 1. Failure Mode Taxonomy

### 1.1 Top-level categories

| ID | Category | Description |
|---|---|---|
| FM-PRIV | Privacy | Unauthorized data exposure, training data leakage, PII disclosure, re-identification |
| FM-BIAS | Bias | Discriminatory outputs, unfair treatment across demographic groups, proxy discrimination |
| FM-HALL | Hallucination | Fabricated facts, false citations, confident incorrect outputs, confabulation |
| FM-SAFE | Safety | Physical harm, dangerous instructions, unsafe recommendations, self-harm facilitation |
| FM-SEC | Security | Prompt injection, jailbreaks, adversarial attacks, model manipulation, data poisoning |
| FM-UNAUTH | Unauthorized action | AI agents acting outside approved scope, bypassing human oversight, unauthorized decisions |
| FM-TRANS | Transparency | Undisclosed AI use, misleading outputs, lack of explainability, deceptive framing |
| FM-REL | Reliability | System failures, unexpected degradation, inconsistent outputs, availability failures |

### 1.2 Privacy sub-categories

| ID | Name | Description |
|---|---|---|
| FM-PRIV-001 | Training data leakage | AI system reveals information from its training data, including PII or confidential content |
| FM-PRIV-002 | PII disclosure | AI system discloses personally identifiable information about individuals |
| FM-PRIV-003 | Re-identification | AI system enables re-identification of anonymized individuals |
| FM-PRIV-004 | Unauthorized data use | AI system uses personal data beyond its stated purpose |
| FM-PRIV-005 | Data retention violation | AI system retains or processes data beyond permitted retention periods |

### 1.3 Bias sub-categories

| ID | Name | Description |
|---|---|---|
| FM-BIAS-001 | Demographic discrimination | AI system produces outputs that discriminate based on protected characteristics |
| FM-BIAS-002 | Proxy discrimination | AI system uses proxy variables that correlate with protected characteristics |
| FM-BIAS-003 | Representation bias | AI system underrepresents or misrepresents certain groups |
| FM-BIAS-004 | Feedback loop bias | AI system amplifies existing biases through feedback loops |
| FM-BIAS-005 | Evaluation bias | AI system performs differently across demographic groups |

### 1.4 Hallucination sub-categories

| ID | Name | Description |
|---|---|---|
| FM-HALL-001 | Fabricated facts | AI generates factual claims that are false or unverifiable |
| FM-HALL-002 | False citations | AI generates references to sources, cases, or documents that do not exist |
| FM-HALL-003 | Confident incorrect outputs | AI presents incorrect information with high apparent confidence |
| FM-HALL-004 | Temporal confusion | AI presents outdated information as current |
| FM-HALL-005 | Identity confusion | AI confuses or conflates real individuals, organizations, or entities |

### 1.5 Safety sub-categories

| ID | Name | Description |
|---|---|---|
| FM-SAFE-001 | Dangerous instructions | AI provides instructions for harmful activities |
| FM-SAFE-002 | Medical safety failure | AI provides unsafe medical advice or recommendations |
| FM-SAFE-003 | Physical harm facilitation | AI outputs contribute to physical harm |
| FM-SAFE-004 | Self-harm facilitation | AI outputs facilitate or encourage self-harm |
| FM-SAFE-005 | Autonomous system safety | AI-controlled physical system causes harm |

### 1.6 Security sub-categories

| ID | Name | Description |
|---|---|---|
| FM-SEC-001 | Prompt injection | Malicious input manipulates AI system behavior |
| FM-SEC-002 | Jailbreak | User bypasses AI system safety constraints |
| FM-SEC-003 | Adversarial attack | Crafted inputs cause AI system to produce incorrect outputs |
| FM-SEC-004 | Data poisoning | Training data is manipulated to influence AI system behavior |
| FM-SEC-005 | Model extraction | AI system is queried to reconstruct its model or training data |
| FM-SEC-AGENT-001 | Prompt injection via tool output | AI agent is manipulated through tool responses or external data |
| FM-SEC-AGENT-002 | Persistent memory misuse | AI agent uses stored context in unintended or harmful ways |

### 1.7 Unauthorized action sub-categories

| ID | Name | Description |
|---|---|---|
| FM-UNAUTH-001 | Unauthorized decision | AI system makes decisions it was not authorized to make |
| FM-UNAUTH-002 | Oversight bypass | AI system takes actions that should have required human approval |
| FM-UNAUTH-003 | Scope violation | AI system acts outside its defined task scope |
| FM-UNAUTH-AGENT-001 | Agent scope violation | AI agent acts outside its defined task scope |
| FM-UNAUTH-AGENT-002 | Unauthorized tool use | AI agent calls tools or APIs it was not authorized to use |
| FM-UNAUTH-AGENT-003 | Approval bypass | AI agent takes actions that should have required human approval |
| FM-UNAUTH-AGENT-004 | Cascading side effects | AI agent triggers unintended downstream actions |

### 1.8 Transparency sub-categories

| ID | Name | Description |
|---|---|---|
| FM-TRANS-001 | Undisclosed AI use | AI system is used without disclosure to affected individuals |
| FM-TRANS-002 | Misleading outputs | AI system produces outputs designed to mislead |
| FM-TRANS-003 | Lack of explainability | AI system cannot explain its outputs or decisions |
| FM-TRANS-004 | Deceptive framing | AI system presents outputs in a misleading context |

### 1.9 Reliability sub-categories

| ID | Name | Description |
|---|---|---|
| FM-REL-001 | System failure | AI system fails to operate as expected |
| FM-REL-002 | Performance degradation | AI system performance degrades unexpectedly |
| FM-REL-003 | Inconsistent outputs | AI system produces inconsistent outputs for similar inputs |
| FM-REL-004 | Availability failure | AI system is unavailable when needed |

---

## 2. Control Taxonomy

### 2.1 Documentation and transparency controls

| ID | Name | Description |
|---|---|---|
| CTL-DOC-001 | AI system register | Maintain a documented record of each AI system, its purpose, owner, and governance status |
| CTL-DOC-002 | AI use disclosure | Disclose AI use to affected individuals where required |
| CTL-DOC-003 | Model documentation | Document model capabilities, limitations, and known failure modes |
| CTL-DOC-004 | Data documentation | Document training data sources, quality, and known biases |

### 2.2 Human oversight and approval controls

| ID | Name | Description |
|---|---|---|
| CTL-OVER-001 | Human review of AI outputs | Qualified human reviews AI outputs before use in decisions |
| CTL-OVER-002 | Human approval for high-risk actions | High-risk AI actions require explicit human approval |
| CTL-OVER-003 | Override capability | Humans can override or stop AI system decisions |
| CTL-OVER-004 | Escalation process | Clear process for escalating AI system concerns |

### 2.3 Testing and evaluation controls

| ID | Name | Description |
|---|---|---|
| CTL-TEST-001 | Pre-deployment testing | AI system is tested before deployment |
| CTL-TEST-002 | Bias testing | AI system is tested for discriminatory outputs |
| CTL-TEST-003 | Adversarial testing | AI system is tested against adversarial inputs |
| CTL-TEST-004 | Ongoing evaluation | AI system performance is evaluated on an ongoing basis |

### 2.4 Monitoring and logging controls

| ID | Name | Description |
|---|---|---|
| CTL-MON-001 | Output monitoring | AI system outputs are monitored for anomalies |
| CTL-MON-002 | Performance monitoring | AI system performance metrics are tracked |
| CTL-MON-003 | Incident logging | AI system incidents and near-misses are logged |
| CTL-MON-004 | Audit trail | AI system actions are logged for audit purposes |

### 2.5 Data governance controls

| ID | Name | Description |
|---|---|---|
| CTL-DATA-001 | Data minimization | Only necessary data is used for AI system training and operation |
| CTL-DATA-002 | Data quality | Training and operational data quality is assessed and documented |
| CTL-DATA-003 | Data access controls | Access to AI system data is controlled and logged |
| CTL-DATA-004 | Data retention | Data retention policies are defined and enforced |

### 2.6 Vendor and third-party controls

| ID | Name | Description |
|---|---|---|
| CTL-VEN-001 | Vendor review | AI vendor terms, data processing, and model training policies are reviewed |
| CTL-VEN-002 | Vendor monitoring | AI vendor policy changes are monitored |
| CTL-VEN-003 | Vendor contract | AI vendor contracts include appropriate data protection and governance terms |

### 2.7 Incident response controls

| ID | Name | Description |
|---|---|---|
| CTL-INC-001 | Incident response plan | A documented plan exists for responding to AI system failures |
| CTL-INC-002 | Incident reporting | AI system incidents are reported to appropriate stakeholders |
| CTL-INC-003 | Post-incident review | AI system incidents are reviewed and lessons are documented |

### 2.8 Risk assessment controls

| ID | Name | Description |
|---|---|---|
| CTL-RISK-001 | Risk assessment | A documented risk assessment exists for each AI system |
| CTL-RISK-002 | Risk classification | AI systems are classified by risk level |
| CTL-RISK-003 | Risk review | Risk assessments are reviewed on a regular basis |

### 2.9 Access and authorization controls

| ID | Name | Description |
|---|---|---|
| CTL-ACCESS-001 | Access controls | Access to AI systems is controlled and logged |
| CTL-ACCESS-002 | Role-based access | AI system access is based on defined roles and responsibilities |
| CTL-ACCESS-003 | Authentication | AI system access requires appropriate authentication |

### 2.10 AI agent governance controls

| ID | Name | Description |
|---|---|---|
| CTL-AGENT-001 | Agent scope definition | AI agent task scope is explicitly defined and enforced |
| CTL-AGENT-002 | Agent approval workflow | High-risk agent actions require human approval |
| CTL-AGENT-003 | Agent activity logging | AI agent actions, tool calls, and decisions are logged |
| CTL-AGENT-004 | Agent kill switch | AI agent can be stopped immediately if needed |
| CTL-AGENT-005 | Agent tool authorization | AI agent tool access is explicitly authorized and limited |

---

## 3. Evidence Type Registry

| ID | Type | Description | Related controls |
|---|---|---|---|
| EV-001 | AI system register | Documented record of AI system, purpose, owner, and governance status | CTL-DOC-001, CTL-RISK-001 |
| EV-002 | Risk assessment | Documented risk assessment for the AI system | CTL-RISK-001, CTL-RISK-002 |
| EV-003 | Vendor review | Documented review of AI vendor terms and data processing | CTL-VEN-001, CTL-VEN-002 |
| EV-004 | Human oversight record | Evidence that human oversight is in place for high-risk decisions | CTL-OVER-001, CTL-OVER-002 |
| EV-005 | Testing record | Evidence of pre-deployment and ongoing testing | CTL-TEST-001, CTL-TEST-002 |
| EV-006 | Monitoring log | Evidence of ongoing monitoring and anomaly detection | CTL-MON-001, CTL-MON-002 |
| EV-007 | Incident response plan | Documented plan for responding to AI failures | CTL-INC-001 |
| EV-008 | Agent activity log | Record of AI agent actions, approvals, and blocked actions | CTL-AGENT-003, CTL-MON-004 |
| EV-009 | Data governance record | Evidence of data quality, provenance, and access controls | CTL-DATA-001, CTL-DATA-002 |
| EV-010 | Training record | Evidence of staff training on AI governance | CTL-DOC-001 |
| EV-011 | Model documentation | Documentation of model capabilities, limitations, and known failure modes | CTL-DOC-003 |
| EV-012 | Bias testing record | Evidence of testing for discriminatory outputs | CTL-TEST-002 |
| EV-013 | Incident log | Record of AI system incidents and near-misses | CTL-INC-001, CTL-MON-003 |
| EV-014 | Post-incident review | Documented review of AI system incidents and lessons learned | CTL-INC-003 |

---

## 4. Sector Taxonomy

| ID | Name | Description | Common failure modes |
|---|---|---|---|
| healthcare-medical | Healthcare and medical | AI in diagnosis, treatment, clinical workflows | FM-HALL, FM-SAFE, FM-BIAS, FM-PRIV |
| finance-banking | Finance and banking | AI in credit, fraud detection, trading, advice | FM-BIAS, FM-HALL, FM-TRANS, FM-REL |
| public-sector | Public sector and government | AI in benefits, services, enforcement, policy | FM-BIAS, FM-TRANS, FM-UNAUTH |
| hiring-employment | Hiring and employment | AI in recruitment, screening, performance | FM-BIAS, FM-TRANS, FM-PRIV |
| law-enforcement | Law enforcement and criminal justice | AI in policing, sentencing, surveillance | FM-BIAS, FM-TRANS, FM-PRIV, FM-UNAUTH |
| education | Education | AI in assessment, tutoring, admissions | FM-BIAS, FM-HALL, FM-PRIV |
| media-content | Media and content | AI in content generation, moderation, recommendation | FM-HALL, FM-BIAS, FM-TRANS, FM-SAFE |
| retail-ecommerce | Retail and e-commerce | AI in pricing, recommendations, customer service | FM-BIAS, FM-PRIV, FM-TRANS |
| legal-compliance | Legal and compliance | AI in legal research, contract review, compliance | FM-HALL, FM-TRANS, FM-PRIV |
| transportation-autonomous | Transportation and autonomous systems | AI in autonomous vehicles, logistics, navigation | FM-SAFE, FM-REL, FM-UNAUTH |
| general | General / cross-sector | Incidents not specific to one sector | All |

---

## 5. Taxonomy Versioning

The taxonomy will be versioned alongside the incident dataset. Breaking changes to taxonomy IDs require a major version bump and migration of all incident records that reference the changed IDs.

Stable IDs are important for:
- long-term incident record integrity;
- Governance OS integration;
- external references and citations.

Once taxonomy IDs are published in v1.0, they should not be changed without a migration plan.
