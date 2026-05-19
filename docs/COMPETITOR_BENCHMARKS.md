# Competitor Benchmarks — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Purpose:** Detailed analysis of AI incident databases and risk taxonomy tools that inform the Caesar AI Incident Atlas product design.

---

## How to Use This Document

This document is a research and planning reference. It is not implementation code.

Use it when:
- designing the incident data model;
- defining the failure mode taxonomy;
- planning the public site UX;
- deciding which features to prioritize;
- explaining Caesar's differentiation to stakeholders.

Rules:
- Study competitors deeply.
- Do not copy competitor data without verifying applicable data licenses.
- Do not copy competitor code without verifying applicable code licenses.
- Build Caesar as an original product with original governance mapping value.

---

## 1. AI Incident Database (AIID)

**URL:** https://incidentdatabase.ai/
**GitHub:** https://github.com/responsible-ai-collaborative/aiid
**Operator:** Responsible AI Collaborative

### What it does

AIID is the most comprehensive public database of AI incidents. It indexes real-world AI harms and near-harms, with structured records, citations, taxonomies, and community contributions.

Key features:
- thousands of indexed incidents;
- structured incident reports with citations;
- multiple taxonomies (CSET, GMF, and others);
- community submission model;
- public API;
- open-source codebase.

### Code and data license

Verify current license before any reuse. The codebase and data have separate licensing considerations. Do not assume either is freely reusable without verification.

### What Caesar can learn

- Incident record structure and citation model.
- Community contribution workflow.
- Taxonomy design (multiple overlapping taxonomies).
- Public API design.
- Search and filter UX.

### Caesar differentiation

AIID collects incidents. Caesar maps them to governance controls and evidence requirements. The value Caesar adds is:

```
AIID incident record
→ Caesar failure mode taxonomy
→ Caesar control mapping
→ Caesar evidence requirements
→ Caesar governance lessons
```

Caesar does not aim to replace AIID. It adds a governance layer on top.

---

## 2. OECD AI Incidents and Hazards Monitor

**URL:** https://oecd.ai/en/incidents
**Operator:** OECD

### What it does

The OECD AI Incidents Monitor documents AI incidents and hazards for policymakers and practitioners. It provides a policy-facing classification of AI failures with a focus on governance and regulatory implications.

Key features:
- policy-facing incident classification;
- hazards framing (not just incidents);
- OECD AI Principles alignment;
- international scope;
- official credibility.

### Code and data license

Public resource. Verify data reuse terms before using any data. Do not assume OECD data is freely reusable.

### What Caesar can learn

- Policy-facing framing of AI incidents.
- Hazards concept (potential failures, not just realized ones).
- OECD AI Principles alignment for control mapping.
- International scope and jurisdiction framing.

### Caesar differentiation

OECD focuses on policy implications. Caesar focuses on practical governance controls and evidence requirements for organizations. Caesar translates OECD-level policy framing into actionable governance steps.

---

## 3. AIAAIC Repository

**URL:** https://www.aiaaic.org/aiaaic-repository
**Operator:** AIAAIC (AI, Algorithmic, and Automation Incidents and Controversies)

### What it does

AIAAIC is a public-interest repository of AI, algorithmic, and automation incidents and controversies. It covers a wide range of AI failures including bias, privacy, safety, and accountability issues.

Key features:
- broad coverage including algorithmic and automation incidents;
- public accountability framing;
- sector coverage;
- controversy tracking (not just clear-cut incidents);
- free public access.

### Code and data license

Verify data reuse terms before using any data. Do not assume AIAAIC data is freely reusable.

### What Caesar can learn

- Broad incident coverage including algorithmic and automation failures.
- Public accountability framing.
- Sector-based organization.
- Controversy tracking as a distinct category from clear incidents.

### Caesar differentiation

AIAAIC focuses on public accountability and controversy tracking. Caesar focuses on governance controls and evidence requirements. Caesar translates AIAAIC-style incident coverage into practical governance lessons.

---

## 4. MIT AI Incident Tracker

**URL:** https://airisk.mit.edu/ai-incident-tracker
**Operator:** MIT

### What it does

The MIT AI Incident Tracker classifies incidents from AIID by risk, cause, harm, severity, and other dimensions. It provides a structured analytical view of AI incidents with dashboard-style filtering.

Key features:
- 1,400+ incidents classified;
- risk, cause, harm, severity dimensions;
- dashboard UX with filters;
- academic rigor;
- MIT credibility.

### Code and data license

Verify terms before any reuse. Do not assume MIT tracker data is freely reusable.

### What Caesar can learn

- Risk/cause/harm/severity classification dimensions.
- Dashboard UX with multi-dimensional filters.
- Academic rigor in classification.
- Severity scoring approach.

### Caesar differentiation

MIT tracker provides analytical classification. Caesar adds governance mapping: from classification to controls and evidence. Caesar is practitioner-facing, not academic.

---

## 5. IBM AI Risk Atlas / AI Atlas Nexus

**URL:** https://github.com/IBM/ai-atlas-nexus
**Operator:** IBM

### What it does

IBM AI Risk Atlas / AI Atlas Nexus is a risk taxonomy and tooling for navigating AI risks. It provides a structured ontology of AI risks with mappings to actions, resources, and governance considerations.

Key features:
- structured AI risk taxonomy;
- ontology relationships between risks;
- risk-resource mapping;
- Apache-2.0 license (verify current license);
- IBM credibility.

### Code and data license

Apache-2.0 according to GitHub repository as of research date. Verify current license before any reuse. Permissive reuse possible with notices if license is confirmed.

### What Caesar can learn

- Risk taxonomy structure and ontology design.
- Risk-to-action mapping approach.
- Risk-to-resource mapping approach.
- Taxonomy ID conventions.

### Caesar differentiation

IBM AI Risk Atlas is a risk taxonomy. Caesar AI Incident Atlas is an incident-to-control knowledge base. Caesar uses real-world incidents to illustrate why risks matter and maps them to practical governance controls and evidence requirements.

---

## 6. OECD Common Reporting Framework for AI Incidents

**URL:** https://www.oecd.org/en/publications/towards-a-common-reporting-framework-for-ai-incidents_f326d4ac-en.html
**Operator:** OECD

### What it does

A publication defining criteria and fields for consistent AI incident reporting. Provides a framework for what information should be captured in an incident report.

### What Caesar can learn

- Incident reporting fields and consistency model.
- What information is needed for policy-relevant incident records.
- How to structure incident records for cross-organization comparability.

---

## 7. Caesar Differentiation Summary

| Dimension | AIID | OECD | AIAAIC | MIT Tracker | IBM Atlas | Caesar AI Incident Atlas |
|---|---|---|---|---|---|---|
| Primary focus | Incident collection | Policy framing | Public accountability | Academic classification | Risk taxonomy | Governance mapping |
| Incident records | Yes | Yes | Yes | Derived from AIID | No | Yes (curated) |
| Failure mode taxonomy | Yes (multiple) | Yes | Partial | Yes | Yes | Yes (governance-focused) |
| Control mapping | No | No | No | No | Partial | Yes |
| Evidence mapping | No | No | No | No | No | Yes |
| Sector filters | Partial | Yes | Yes | Yes | Yes | Yes |
| AI agent failures | Partial | Partial | Partial | Partial | Yes | Yes (distinct category) |
| Export to evidence format | No | No | No | No | No | Yes (caesar-ai-evidence) |
| Governance OS integration | No | No | No | No | No | Yes (future) |
| Public site | Yes | Yes | Yes | Yes | No | Yes (future) |
| License | Verify | Public | Verify | Verify | Apache-2.0 | Original |

---

## 8. Data Reuse Policy

For each benchmark source:

| Source | Data reuse policy |
|---|---|
| AIID | Verify current data license before any reuse. Cite as reference. |
| OECD AI Incidents Monitor | Verify data reuse terms. Cite as reference. |
| AIAAIC Repository | Verify data reuse terms. Cite as reference. |
| MIT AI Incident Tracker | Verify terms before reuse. Cite as reference. |
| IBM AI Atlas Nexus | Apache-2.0 (verify current). Permissive reuse possible with notices. |

Caesar AI Incident Atlas does not copy data from these sources without verifying applicable data licenses. It cites sources carefully and adds original governance mapping value.

---

## 9. Recommended Next Research Steps

Before building the dataset MVP (v0.3):

1. Verify current data licenses for AIID, OECD, AIAAIC, and MIT tracker.
2. Identify which incidents can be cited (not copied) from public sources.
3. Review IBM AI Atlas Nexus taxonomy structure for control mapping inspiration.
4. Study AIID incident record fields for data model alignment.
5. Study MIT tracker severity and classification dimensions for field design.
