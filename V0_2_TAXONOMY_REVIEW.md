# V0.2 Taxonomy Review — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.2 (draft contract)
**Status:** Approved for use as implementation reference.
**Work item:** T003

---

## Purpose

This document reviews every taxonomy category defined in `docs/TAXONOMY_DRAFT.md` and assigns a status for v0.2: stable, draft, or later. It also verifies that the taxonomy supports the core product logic:

```
incident
→ failure mode
→ affected controls
→ required evidence
→ governance lesson
```

---

## How to Read This Table

| Status | Meaning |
|---|---|
| **Stable** | Category is confirmed for v0.2. IDs are locked. Can be used in incident records immediately. |
| **Draft** | Category exists but sub-categories or mappings may change. Use with caution in v0.2 records. |
| **Later** | Category is deferred. Do not use in v0.2 records. |

---

## 1. Failure Mode Taxonomy — Top-Level Categories

| Category | ID | Status | Why it matters | Example use | Implementation notes |
|---|---|---|---|---|---|
| Privacy | FM-PRIV | **Stable** | One of the most common and well-documented AI failure types. Strong regulatory relevance (GDPR, AI Act). | Training data leakage, PII disclosure in chatbot outputs | 5 sub-categories confirmed. All stable for v0.2. |
| Bias | FM-BIAS | **Stable** | Extensively documented in public incident databases. High governance relevance for hiring, lending, law enforcement. | Discriminatory hiring tool, biased credit scoring | 5 sub-categories confirmed. All stable for v0.2. |
| Hallucination | FM-HALL | **Stable** | Highly relevant for language model governance. Well-documented incidents available. | Fabricated legal citations, false medical information | 5 sub-categories confirmed. All stable for v0.2. |
| Safety | FM-SAFE | **Stable** | Critical for high-stakes sectors. Directly relevant to EU AI Act prohibited practices and high-risk categories. | Dangerous medical advice, self-harm facilitation | 5 sub-categories confirmed. All stable for v0.2. |
| Security | FM-SEC | **Stable** | Growing category with well-documented prompt injection and jailbreak incidents. Relevant to AI agent governance. | Prompt injection attack, jailbreak bypassing safety filters | 5 general sub-categories + 2 agent-specific sub-categories confirmed. All stable for v0.2. |
| Unauthorized action | FM-UNAUTH | **Stable** | Directly relevant to AI agent governance and human oversight requirements. Differentiates Caesar from generic databases. | AI agent sends emails without approval, autonomous decision without oversight | 3 general sub-categories + 4 agent-specific sub-categories confirmed. All stable for v0.2. |
| Transparency | FM-TRANS | **Stable** | Relevant to EU AI Act transparency obligations and general governance requirements. | Undisclosed AI use in customer service, unexplainable credit decision | 4 sub-categories confirmed. All stable for v0.2. |
| Reliability | FM-REL | **Draft** | Important category but fewer well-documented public incidents compared to others. Sub-categories may need refinement. | AI system outage affecting critical service, inconsistent outputs in production | 4 sub-categories exist but may be revised. Use FM-REL top-level in v0.2 records; avoid sub-categories until stable. |

### Taxonomy logic check — failure modes

The failure mode taxonomy supports the product logic:

```
incident → failure mode ✓
```

Every incident can be classified into at least one of the 8 top-level categories. The categories are mutually non-exclusive — an incident can have multiple failure modes.

---

## 2. Failure Mode Sub-Categories — Status by Category

### FM-PRIV sub-categories

| ID | Name | Status | Notes |
|---|---|---|---|
| FM-PRIV-001 | Training data leakage | **Stable** | Well-documented incident type |
| FM-PRIV-002 | PII disclosure | **Stable** | Well-documented incident type |
| FM-PRIV-003 | Re-identification | **Stable** | Well-documented incident type |
| FM-PRIV-004 | Unauthorized data use | **Stable** | Relevant to GDPR purpose limitation |
| FM-PRIV-005 | Data retention violation | **Draft** | Fewer public incidents; may be merged with FM-PRIV-004 in v0.3 |

### FM-BIAS sub-categories

| ID | Name | Status | Notes |
|---|---|---|---|
| FM-BIAS-001 | Demographic discrimination | **Stable** | Most common bias incident type |
| FM-BIAS-002 | Proxy discrimination | **Stable** | Well-documented in hiring and lending |
| FM-BIAS-003 | Representation bias | **Stable** | Common in image and language models |
| FM-BIAS-004 | Feedback loop bias | **Draft** | Harder to document from public sources; keep as draft |
| FM-BIAS-005 | Evaluation bias | **Draft** | Overlaps with FM-BIAS-001; may be merged in v0.3 |

### FM-HALL sub-categories

| ID | Name | Status | Notes |
|---|---|---|---|
| FM-HALL-001 | Fabricated facts | **Stable** | Most common hallucination type |
| FM-HALL-002 | False citations | **Stable** | Well-documented (legal, academic contexts) |
| FM-HALL-003 | Confident incorrect outputs | **Stable** | Core hallucination pattern |
| FM-HALL-004 | Temporal confusion | **Draft** | Fewer distinct public incidents; often co-occurs with FM-HALL-001 |
| FM-HALL-005 | Identity confusion | **Draft** | Fewer distinct public incidents; may be merged with FM-HALL-001 |

### FM-SAFE sub-categories

| ID | Name | Status | Notes |
|---|---|---|---|
| FM-SAFE-001 | Dangerous instructions | **Stable** | Well-documented |
| FM-SAFE-002 | Medical safety failure | **Stable** | High-priority for healthcare sector |
| FM-SAFE-003 | Physical harm facilitation | **Stable** | Relevant to autonomous systems |
| FM-SAFE-004 | Self-harm facilitation | **Stable** | Well-documented; sensitive — apply careful wording |
| FM-SAFE-005 | Autonomous system safety | **Draft** | Fewer well-documented public incidents for v0.2 |

### FM-SEC sub-categories

| ID | Name | Status | Notes |
|---|---|---|---|
| FM-SEC-001 | Prompt injection | **Stable** | Well-documented and growing |
| FM-SEC-002 | Jailbreak | **Stable** | Well-documented |
| FM-SEC-003 | Adversarial attack | **Stable** | Well-documented in academic and public sources |
| FM-SEC-004 | Data poisoning | **Draft** | Fewer well-documented public incidents |
| FM-SEC-005 | Model extraction | **Draft** | Fewer well-documented public incidents |
| FM-SEC-AGENT-001 | Prompt injection via tool output | **Stable** | Growing category; relevant to agent governance |
| FM-SEC-AGENT-002 | Persistent memory misuse | **Draft** | Emerging category; fewer documented incidents |

### FM-UNAUTH sub-categories

| ID | Name | Status | Notes |
|---|---|---|---|
| FM-UNAUTH-001 | Unauthorized decision | **Stable** | Well-documented |
| FM-UNAUTH-002 | Oversight bypass | **Stable** | Core human oversight failure |
| FM-UNAUTH-003 | Scope violation | **Stable** | Relevant to both general AI and agent systems |
| FM-UNAUTH-AGENT-001 | Agent scope violation | **Stable** | Growing category; Caesar differentiator |
| FM-UNAUTH-AGENT-002 | Unauthorized tool use | **Stable** | Growing category; Caesar differentiator |
| FM-UNAUTH-AGENT-003 | Approval bypass | **Stable** | Core agent governance failure |
| FM-UNAUTH-AGENT-004 | Cascading side effects | **Draft** | Harder to document from public sources |

### FM-TRANS sub-categories

| ID | Name | Status | Notes |
|---|---|---|---|
| FM-TRANS-001 | Undisclosed AI use | **Stable** | Well-documented; regulatory relevance |
| FM-TRANS-002 | Misleading outputs | **Stable** | Well-documented |
| FM-TRANS-003 | Lack of explainability | **Draft** | Harder to document as a distinct incident type |
| FM-TRANS-004 | Deceptive framing | **Draft** | Overlaps with FM-TRANS-002; may be merged |

### FM-REL sub-categories

| ID | Name | Status | Notes |
|---|---|---|---|
| FM-REL-001 | System failure | **Draft** | Use FM-REL top-level for v0.2 |
| FM-REL-002 | Performance degradation | **Draft** | Use FM-REL top-level for v0.2 |
| FM-REL-003 | Inconsistent outputs | **Draft** | Use FM-REL top-level for v0.2 |
| FM-REL-004 | Availability failure | **Draft** | Use FM-REL top-level for v0.2 |

---

## 3. Control Taxonomy

### Top-level control categories

| Category | Prefix | Status | Why it matters | Example use | Implementation notes |
|---|---|---|---|---|---|
| Documentation and transparency | CTL-DOC | **Stable** | Foundation of AI governance; required for most regulatory frameworks | AI system register, model documentation | 4 controls confirmed. All stable for v0.2. |
| Human oversight and approval | CTL-OVER | **Stable** | Core governance control; directly addresses FM-UNAUTH and FM-HALL | Human review of AI outputs, approval for high-risk actions | 4 controls confirmed. All stable for v0.2. |
| Testing and evaluation | CTL-TEST | **Stable** | Addresses FM-HALL, FM-BIAS, FM-SEC | Pre-deployment testing, bias testing | 4 controls confirmed. All stable for v0.2. |
| Monitoring and logging | CTL-MON | **Stable** | Addresses FM-REL, FM-SEC, FM-UNAUTH | Output monitoring, audit trail | 4 controls confirmed. All stable for v0.2. |
| Data governance | CTL-DATA | **Stable** | Addresses FM-PRIV, FM-BIAS | Data minimization, data quality | 4 controls confirmed. All stable for v0.2. |
| Vendor and third-party | CTL-VEN | **Stable** | Addresses FM-PRIV, FM-TRANS | Vendor review, vendor monitoring | 3 controls confirmed. All stable for v0.2. |
| Incident response | CTL-INC | **Stable** | Addresses all failure modes post-incident | Incident response plan, post-incident review | 3 controls confirmed. All stable for v0.2. |
| Risk assessment | CTL-RISK | **Stable** | Foundation of AI governance; required for most regulatory frameworks | Risk assessment, risk classification | 3 controls confirmed. All stable for v0.2. |
| Access and authorization | CTL-ACCESS | **Draft** | Important but fewer direct incident mappings in v0.2 dataset | Access controls, role-based access | 3 controls exist. Use with caution in v0.2 — fewer direct incident mappings. |
| AI agent governance | CTL-AGENT | **Stable** | Caesar differentiator; directly addresses FM-UNAUTH-AGENT and FM-SEC-AGENT | Agent scope definition, agent approval workflow | 5 controls confirmed. All stable for v0.2. |

### Taxonomy logic check — controls

The control taxonomy supports the product logic:

```
failure mode → affected controls ✓
```

Every failure mode maps to at least two control categories. The mapping is many-to-many.

---

## 4. Evidence Type Registry

| ID | Type | Status | Why it matters | Implementation notes |
|---|---|---|---|---|
| EV-001 | AI system register | **Stable** | Foundation evidence type; maps to CTL-DOC-001 | Most commonly required evidence type |
| EV-002 | Risk assessment | **Stable** | Foundation evidence type; maps to CTL-RISK-001 | Required for most regulatory frameworks |
| EV-003 | Vendor review | **Stable** | Maps to CTL-VEN-001; relevant to FM-PRIV | Important for organizations using third-party AI |
| EV-004 | Human oversight record | **Stable** | Maps to CTL-OVER-001; addresses FM-UNAUTH | Core governance evidence |
| EV-005 | Testing record | **Stable** | Maps to CTL-TEST-001; addresses FM-HALL, FM-BIAS | Required for high-risk AI systems |
| EV-006 | Monitoring log | **Stable** | Maps to CTL-MON-001; addresses FM-REL, FM-SEC | Ongoing evidence requirement |
| EV-007 | Incident response plan | **Stable** | Maps to CTL-INC-001; addresses all failure modes | Required for mature AI governance |
| EV-008 | Agent activity log | **Stable** | Maps to CTL-AGENT-003; addresses FM-UNAUTH-AGENT | Caesar differentiator; links to caesar-ai-agent-ledger |
| EV-009 | Data governance record | **Stable** | Maps to CTL-DATA-001; addresses FM-PRIV | Important for GDPR compliance |
| EV-010 | Training record | **Draft** | Maps to CTL-DOC-001; fewer direct incident mappings | Useful but fewer direct incident mappings in v0.2 |
| EV-011 | Model documentation | **Stable** | Maps to CTL-DOC-003; addresses FM-HALL, FM-TRANS | Important for transparency |
| EV-012 | Bias testing record | **Stable** | Maps to CTL-TEST-002; addresses FM-BIAS | Important for hiring, lending, law enforcement |
| EV-013 | Incident log | **Stable** | Maps to CTL-INC-001; addresses all failure modes | Ongoing evidence requirement |
| EV-014 | Post-incident review | **Stable** | Maps to CTL-INC-003; addresses all failure modes | Important for organizational learning |

### Taxonomy logic check — evidence

The evidence type registry supports the product logic:

```
affected controls → required evidence ✓
```

Every control category maps to at least one evidence type. The mapping is many-to-many.

---

## 5. Sector Taxonomy

| ID | Name | Status | Why it matters | Implementation notes |
|---|---|---|---|---|
| healthcare-medical | Healthcare and medical | **Stable** | High-stakes sector with well-documented incidents | Priority sector for v0.2 dataset |
| finance-banking | Finance and banking | **Stable** | Well-documented bias and reliability incidents | Priority sector for v0.2 dataset |
| public-sector | Public sector and government | **Stable** | Well-documented bias and transparency incidents | Priority sector for v0.2 dataset |
| hiring-employment | Hiring and employment | **Stable** | Well-documented bias incidents | Priority sector for v0.2 dataset |
| law-enforcement | Law enforcement and criminal justice | **Stable** | Well-documented bias and privacy incidents | Priority sector for v0.2 dataset |
| education | Education | **Stable** | Growing incident category | Include in v0.2 dataset |
| media-content | Media and content | **Stable** | Well-documented hallucination and safety incidents | Include in v0.2 dataset |
| retail-ecommerce | Retail and e-commerce | **Draft** | Fewer high-profile incidents for v0.2 | Use if relevant incidents are found |
| legal-compliance | Legal and compliance | **Stable** | Well-documented hallucination incidents (legal citations) | Priority sector for v0.2 dataset |
| transportation-autonomous | Transportation and autonomous systems | **Draft** | Important but fewer well-documented public incidents for v0.2 | Use if relevant incidents are found |
| general | General / cross-sector | **Stable** | Catch-all for incidents not specific to one sector | Use when no specific sector applies |

---

## 6. Overall Taxonomy Assessment

The taxonomy as defined in `docs/TAXONOMY_DRAFT.md` is well-structured and supports the core product logic. The main findings from this review:

**Strengths:**
- The 8 failure mode categories cover the major AI failure types documented in public incident databases.
- The AI agent failure sub-categories (FM-UNAUTH-AGENT, FM-SEC-AGENT) are a genuine Caesar differentiator.
- The control taxonomy maps cleanly to failure modes.
- The evidence type registry maps cleanly to controls.
- The sector taxonomy covers the most important sectors for v0.2.

**Issues to address before v0.3:**
- FM-REL sub-categories need refinement — use top-level FM-REL only in v0.2 records.
- Several draft sub-categories may be merged or removed in v0.3 (FM-PRIV-005, FM-BIAS-004, FM-BIAS-005, FM-HALL-004, FM-HALL-005, FM-TRANS-003, FM-TRANS-004).
- CTL-ACCESS is confirmed but has fewer direct incident mappings — use with care in v0.2.

**No overfitting risks identified** in the top-level taxonomy. The categories are original Caesar definitions, not copies of AIID, MIT tracker, or IBM Atlas taxonomies. Sub-categories were designed from first principles.
