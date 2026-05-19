# Specification — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.2.0 (blueprint)
**Status:** Documentation and blueprint phase

---

## 1. Purpose

Caesar AI Incident Atlas is a curated public incident knowledge base that maps real-world AI failures to failure modes, governance controls, and evidence requirements.

Its primary value is not incident collection — public databases such as AIID, OECD AI Incidents Monitor, and AIAAIC already do that well. Its primary value is the governance mapping layer:

```
incident
→ failure mode
→ relevant controls
→ required evidence
→ lessons for governance
```

This mapping helps consultants, risk teams, and compliance teams explain why specific AI governance controls are needed, using real-world failures as practical examples.

---

## 2. Target Users

| User | Primary need |
|---|---|
| AI governance consultants | Explain why controls matter using real examples |
| Risk and compliance teams | Map failure modes to control frameworks |
| Trainers and workshop facilitators | Use incident cases to teach practical AI governance |
| Legal and policy teams | Understand practical AI risks across sectors |
| Caesar Compliance clients | Access a structured risk library connected to evidence packs |

---

## 3. Problem Solved

AI governance teams often struggle to explain why specific controls are needed. Abstract risk frameworks are hard to communicate to business stakeholders. Real-world AI failures make the case concretely.

Caesar AI Incident Atlas bridges this gap by:

- curating publicly reported AI incidents with structured metadata;
- mapping each incident to a failure mode taxonomy;
- mapping each failure mode to practical governance controls;
- mapping each control to the evidence that should exist to demonstrate it is active;
- providing sector filters so teams can find incidents relevant to their domain;
- exporting mappings to the `caesar-ai-evidence` format for use in governance evidence packs.

---

## 4. Incident Dataset Concept

The Atlas maintains a curated dataset of publicly reported AI incidents. Each incident is a structured record, not a raw news article.

### 4.1 Source and citation model

Every incident record must include:

- at least one public source URL;
- the source database or publication (AIID, OECD, AIAAIC, MIT tracker, news, official report);
- the date of the incident or first public report;
- a confidence level indicating how well-documented the incident is.

The Atlas does not copy data from external databases without verifying applicable data licenses. It cites sources carefully and adds governance mapping value on top of publicly available information.

### 4.2 Incident card fields

```
incident_id         unique identifier (e.g. INC-001)
title               short descriptive title
date                date of incident or first public report (19 May 2026 format)
sources             list of source URLs and database references
summary             factual summary of what happened (no legal claims)
sector              affected sector(s)
system_type         type of AI system involved
failure_modes       list of failure mode IDs from the taxonomy
harms               list of harm types
risk_categories     list of risk category IDs
affected_stakeholders  who was affected
severity            low / medium / high / critical
impact              description of actual or potential impact
confidence          low / medium / high (how well-documented the incident is)
controls            list of control IDs that could help prevent or detect this
evidence_required   list of evidence types that should exist
lessons             practical governance lessons
related_incidents   list of related incident IDs
```

### 4.3 Wording rules

Incident summaries must:

- be based on publicly available information;
- use careful wording such as "reportedly", "according to public reports", "publicly documented";
- not make legal claims about organizations or individuals;
- not claim the incident dataset is complete or exhaustive;
- not claim that implementing controls would have prevented the incident with certainty.

---

## 5. Failure Mode Taxonomy

The taxonomy classifies AI failures into structured categories. See [docs/TAXONOMY_DRAFT.md](TAXONOMY_DRAFT.md) for the full taxonomy.

### 5.1 Top-level failure mode categories

| Category ID | Category | Description |
|---|---|---|
| FM-PRIV | Privacy | Unauthorized data exposure, training data leakage, PII disclosure |
| FM-BIAS | Bias | Discriminatory outputs, unfair treatment across demographic groups |
| FM-HALL | Hallucination | Fabricated facts, false citations, confident incorrect outputs |
| FM-SAFE | Safety | Physical harm, dangerous instructions, unsafe recommendations |
| FM-SEC | Security | Prompt injection, jailbreaks, adversarial attacks, model manipulation |
| FM-UNAUTH | Unauthorized action | AI agents acting outside approved scope, bypassing human oversight |
| FM-TRANS | Transparency | Undisclosed AI use, misleading outputs, lack of explainability |
| FM-REL | Reliability | System failures, unexpected degradation, inconsistent outputs |

### 5.2 AI agent failure category

AI agent failures are a distinct sub-category within FM-UNAUTH and FM-SEC:

| Sub-category | Description |
|---|---|
| Agent scope violation | Agent acts outside its defined task scope |
| Unauthorized tool use | Agent calls tools or APIs it was not authorized to use |
| Approval bypass | Agent takes actions that should have required human approval |
| Cascading side effects | Agent triggers unintended downstream actions |
| Prompt injection via tool output | Agent is manipulated through tool responses |
| Persistent memory misuse | Agent uses stored context in unintended ways |

### 5.3 Sector filters

Incidents can be filtered by sector:

- Healthcare and medical
- Finance and banking
- Public sector and government
- Hiring and employment
- Law enforcement and criminal justice
- Education
- Media and content
- Retail and e-commerce
- Legal and compliance
- Transportation and autonomous systems
- General / cross-sector

---

## 6. Incident-to-Control Mapping

Each incident record maps to one or more governance controls. Controls are drawn from the Caesar AI Governance control taxonomy.

### 6.1 Control categories

| Control ID prefix | Category |
|---|---|
| CTL-DOC | Documentation and transparency controls |
| CTL-OVER | Human oversight and approval controls |
| CTL-TEST | Testing and evaluation controls |
| CTL-MON | Monitoring and logging controls |
| CTL-DATA | Data governance controls |
| CTL-VEN | Vendor and third-party controls |
| CTL-INC | Incident response controls |
| CTL-RISK | Risk assessment controls |
| CTL-ACCESS | Access and authorization controls |
| CTL-AGENT | AI agent governance controls |

### 6.2 Mapping logic

For each incident:

1. Identify the failure mode(s) from the taxonomy.
2. Identify which controls, if active, could have prevented, detected, or reduced the impact of the failure.
3. Identify what evidence should exist to demonstrate those controls are active.
4. Record the mapping in the incident card.

---

## 7. Control-to-Evidence Mapping

Each control maps to one or more evidence types in the `caesar-ai-evidence` format.

### 7.1 Evidence types

| Evidence type | Description |
|---|---|
| AI system register | Documented record of the AI system, its purpose, and its owner |
| Risk assessment | Documented risk assessment for the AI system |
| Vendor review | Documented review of AI vendor terms and data processing |
| Human oversight record | Evidence that human oversight is in place for high-risk decisions |
| Testing record | Evidence of pre-deployment and ongoing testing |
| Monitoring log | Evidence of ongoing monitoring and anomaly detection |
| Incident response plan | Documented plan for responding to AI failures |
| Agent activity log | Record of AI agent actions, approvals, and blocked actions |
| Data governance record | Evidence of data quality, provenance, and access controls |
| Training record | Evidence of staff training on AI governance |

### 7.2 Export to caesar-ai-evidence

The Atlas exports incident-to-control-to-evidence mappings in the `caesar-ai-evidence` format. This allows governance teams to:

- identify which evidence items are missing for a given risk profile;
- generate evidence gap reports based on incident patterns relevant to their sector;
- import Atlas mappings into Caesar AI Governance OS as a risk library.

---

## 8. Severity, Impact, and Confidence Fields

### 8.1 Severity

Severity reflects the potential or actual harm level of the incident type:

| Level | Description |
|---|---|
| Low | Minor inconvenience, limited scope, no lasting harm |
| Medium | Significant harm to individuals or groups, reputational damage |
| High | Serious harm, large-scale impact, regulatory action |
| Critical | Severe harm, physical danger, systemic failure |

### 8.2 Impact

Impact describes the actual or potential consequences:

- individual harm (financial, physical, psychological, reputational);
- group harm (discrimination, systemic bias);
- organizational harm (reputational, regulatory, financial);
- societal harm (public trust, democratic processes, safety).

### 8.3 Confidence

Confidence reflects how well-documented the incident is:

| Level | Description |
|---|---|
| Low | Limited public information, single source, unverified |
| Medium | Multiple sources, partial documentation |
| High | Well-documented, official reports, multiple independent sources |

---

## 9. Public Searchable Static Site Concept

The future public site at `incidents.caesar.no` will provide:

- searchable incident cards with full metadata;
- filters by failure mode, sector, control, evidence type, severity, and date;
- incident timeline view;
- control recommendation pages;
- training-ready case pages for workshop use;
- export options for governance teams.

The site will be a static site generated from the incident dataset. It will not require a backend or database at launch.

---

## 10. Future Training and Risk Intelligence Use Cases

### 10.1 Training and workshop material

The Atlas supports AI governance training by providing:

- real-world case studies organized by failure mode;
- workshop-ready incident cards with discussion questions;
- sector-specific risk examples for targeted training;
- control recommendation summaries for each failure category.

### 10.2 Risk intelligence

Future risk intelligence use cases include:

- sector-specific risk profiles based on incident patterns;
- control gap analysis based on incident history;
- trend analysis showing which failure modes are increasing;
- early warning signals for emerging AI risk categories.

### 10.3 Future training data use

The structured incident dataset may support future AI governance model training, subject to applicable data licenses and privacy requirements. This is a future consideration, not a current commitment.

---

## 11. Export to caesar-ai-evidence

The Atlas exports to the `caesar-ai-evidence` format using the following schema mappings:

| Atlas record | caesar-ai-evidence schema |
|---|---|
| Incident card | incident-mapping schema |
| Control mapping | control schema |
| Evidence requirement | evidence-item schema |
| Sector risk profile | risk schema |

Export formats:

- JSON (machine-readable, for tool integration);
- Markdown (human-readable, for governance review);
- future: HTML report for client delivery.

---

## 12. Future Caesar AI Governance OS Integration

The Atlas will integrate with Caesar AI Governance OS as a risk library module:

- incident cards will be searchable within client workspaces;
- control recommendations will link to the client's control library;
- evidence requirements will link to the client's evidence center;
- sector filters will allow clients to see incidents relevant to their domain;
- new incidents will appear in the client's risk intelligence inbox.

---

## 13. Non-Goals

- Caesar AI Incident Atlas is not a real-time threat intelligence feed.
- It is not a runtime firewall or security monitoring tool.
- It is not a replacement for AIID, OECD AI Incidents Monitor, or AIAAIC.
- It does not guarantee that implementing its recommended controls will prevent incidents.
- It does not make legal claims about organizations or individuals referenced in incident records.
- It does not claim that its incident dataset is complete or exhaustive.

---

## 14. MVP Scope

The minimum viable product includes:

- incident schema definition;
- failure mode taxonomy (documented);
- control taxonomy (documented);
- evidence mapping (documented);
- 10–20 sample incident records with full metadata;
- export format definition for `caesar-ai-evidence`;
- simple static site generator (future phase).

---

## 15. Relation to Caesar AI Governance Hub

Caesar AI Incident Atlas is one of seven repositories in the Caesar AI Governance Hub ecosystem. It provides the risk education and incident mapping layer that helps explain why other Caesar tools and controls are needed.

For the full ecosystem context, see [caesar-ai-governance-hub](https://github.com/caesar-compliance/caesar-ai-governance-hub).
