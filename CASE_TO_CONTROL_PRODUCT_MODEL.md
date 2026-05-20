# Case-to-Control Product Model

## 1. Introduction

The **Case-to-Control Product Model** defines the core schemas, data structures, and semantic mappings used in the Caesar AI Legal & Governance Case Atlas. This model acts as the data interface connecting unstructured legal proceedings and real-world failure events to highly structured organizational controls, vendor risk assessments, training lessons, and evidence packages.

---

## 2. Conceptual Case Schema (21 Fields)

Every case record in the Atlas must conform to a standardized schema containing 21 conceptual fields to capture both the editorial narrative and the compliance-oriented mappings.

| Field Name | Type | Description |
|---|---|---|
| `case_id` | String | Unique identifier using sequential padding (e.g., `CASE-0013`). |
| `case_title` | String | A short, factual, and neutral title describing the case. |
| `case_type` | Enum | The formal legal or governance classification of the event. |
| `jurisdiction` | String | The legal or geographical territory (e.g., `US-Federal`, `EU-Multilateral`, `CA-BC`). |
| `source_authority` | String | The official body issuing the decision or finding (e.g., `EEOC`, `FTC`, `BC CRT`). |
| `source_tier` | Enum | Classification of source credibility (`Green`, `Yellow`, `Red`). |
| `legal_domain` | Enum | The primary area of law implicated (e.g., `privacy_biometrics`, `employment_hiring`). |
| `commercial_domain` | Enum | The affected business function or sector (e.g., `financial_services`, `healthcare`). |
| `ai_system_type` | String | The type of artificial intelligence involved (e.g., `LLM_chatbot`, `automated_triage`). |
| `affected_party` | String | Role-based description of who was harmed (e.g., `job_applicants`, `retail_customers`). |
| `legal_commercial_relevance` | String | Precise analysis of why this case matters to corporate risk teams. |
| `failure_mode` | Array (Enum) | Failure mode codes mapped to the Caesar Failure Mode Taxonomy. |
| `business_risk` | String | Specific business impact realized (e.g., `regulatory_fines`, `brand_damage`). |
| `missing_controls` | Array (String) | Mapped Control IDs that failed or were absent (e.g., `CTL-OVER-001`). |
| `required_evidence` | Array (String) | Audit-ready evidence items that demonstrate active control state. |
| `vendor_questions` | Array (String) | Target questions compliance teams must ask third-party AI vendors. |
| `training_lesson` | String | Actionable corporate learning summary extracted from the case. |
| `public_summary` | String | Factual, clean-room summary of the events using hedged prose. |
| `source_urls` | Array (String) | Verified canonical links to the primary official documents. |
| `publish_status` | Enum | Lifecycle status of the record (`candidate`, `draft`, `reviewed`, `published`). |
| `digest_tags` | Array (String) | Metadata tags used for categorization in weekly/monthly digests. |

---

## 3. Structural Mapping Relationships

```
                  ┌──────────────────────┐
                  │      Case Record     │
                  └──────────┬───────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│     Failure Modes     │         │ Legal/Commercial Risk │
└───────────┬───────────┘         └───────────┬───────────┘
            │                                 │
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│  Missing Controls     │         │   Business Risks      │
└───────────┬───────────┘         └───────────────────────┘
            │
            ▼
┌───────────────────────┐
│ Required Evidence     │
└───────────┬───────────┘
            │
            ├─────────────────────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│   Vendor Questions    │         │    Client Checklist   │
└───────────────────────┘         └───────────────────────┘
```

### 3.1 Case-to-Control Model
This model establishes which systemic organizational controls (drawn from the Caesar Governance Control Taxonomy) would have prevented or detected the failure. Instead of simple associations, the model requires mapping:
- **Preventative Controls:** Pre-deployment testing, bias validation, model guardrails, access policies.
- **Detective Controls:** Drift monitoring, continuous logging, output screening.
- **Corrective Controls:** Kill-switch protocols, automated incident response.

### 3.2 Case-to-Evidence Model
For every missing control identified, the Case-to-Evidence Model defines the exact verification artifact required to satisfy an auditor or internal risk review.
*Example:* If the missing control is **CTL-OVER-001 (Human Oversight)**, the required evidence is an **EV-003 (Signed Human Sign-off Log)** confirming that a human reviewed and approved the system's high-risk decisions.

---

## 4. Key Output Structures

### 4.1 Vendor Questions Output
For third-party or commercial off-the-shelf AI systems, the Case Atlas compiles a set of specific questions that a client's procurement or risk team must ask the vendor during onboarding.
*Example (based on hiring bias cases):*
1. *"What demographic parity metrics does the system monitor, and does the vendor provide pre-deployment bias test reports?"*
2. *"How does the system ensure compliance with disability accommodations under Annex III / ADA guidelines?"*

### 4.2 Client Checklist Output
An actionable, step-by-step checklist generated for Caesar clients to remediate the identified risk profiles within their active AI workflows.
*Example Checklist:*
- [ ] M-01: Update the AI system register to log the model's exact commercial domain.
- [ ] M-02: Implement automated threshold testing for demographic groups.
- [ ] M-03: Create a signed human oversight approval record before model activation.
- [ ] M-04: Conduct vendor terms review to verify indemnity clauses for automated failures.

### 4.3 Training Lesson Output
A condensed, non-technical educational resource derived from the case, designed for business leaders and developers.
*Example (based on legal hallucination cases):*
> **Lesson:** Large Language Models (LLMs) are statistical text predictors, not databases of facts. When utilized to draft legally binding or professional documents, output verification controls (such as independent manual fact-checking) are mandatory. Never submit or publish LLM-generated output without a qualified human-in-the-loop validation step.

---

## 5. Ecosystem & Integration Roadmap

1. **AI Evidence Schema Integration:** Atlas case records compile mappings directly into standard `caesar-ai-evidence` JSON payloads. This enables clients to run the Caesar CLI to audit their local workspaces and flag missing compliance items automatically.
2. **Governance OS Risk Engine:** In later stages, the Case Atlas acts as the centralized risk and hazard library for Caesar AI Governance OS. When a new case is published in the Atlas, the Governance OS risk engine cross-references active client deployments, alerts compliance managers of exposure, and auto-generates the relevant vendor questionnaires and training modules.
