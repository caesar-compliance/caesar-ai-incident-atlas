# V0.2 Draft Product Contract — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.2 (draft contract)
**Status:** Approved for use as implementation reference. Not a final specification. Subject to revision before v1.0.
**Work item:** T003

---

## Purpose

This document is the stable v0.2 draft contract for Caesar AI Incident Atlas. It defines what the product model means before any implementation begins. It resolves the open questions from `docs/DATA_MODEL_DRAFT.md` and `docs/TAXONOMY_DRAFT.md` and provides a single reference point for the Dataset MVP Preparation (T004) and Dataset MVP (v0.3).

This is not a final specification. It is a working contract that may be revised before v1.0. Any revision requires a new decision log entry and Control Tower approval.

This document does not claim legal compliance. It does not claim that integrations described here already exist. It does not claim that the incident dataset is complete or exhaustive.

---

## 1. Incident Record Concept

### 1.1 What an incident record is

An incident record is a structured, curated summary of a publicly reported AI failure or near-failure. It is not a raw news article, a scraped database entry, or a copy of a third-party record. It is an original Caesar document that:

- summarises a publicly reported event in original words;
- cites at least one verifiable public source;
- classifies the event using the Caesar failure mode taxonomy;
- maps the event to governance controls that could help prevent or detect similar failures;
- identifies evidence types that should exist to demonstrate those controls are active;
- draws practical governance lessons.

### 1.2 What an incident record is not

- It is not a legal finding or determination.
- It is not a copy of an AIID, OECD, AIAAIC, or MIT tracker record.
- It is not a comprehensive account of all facts related to an event.
- It is not a claim that the named organization acted wrongfully.
- It is not a guarantee that implementing the recommended controls would have prevented the incident.

### 1.3 Incident ID convention — resolved

**Decision:** Sequential IDs with `INC-` prefix and zero-padded four digits.

Format: `INC-0001`, `INC-0002`, etc.

Rationale: Sequential IDs are simpler to manage, avoid encoding assumptions about content into the ID, and are easier to reference in cross-links. Four digits (not three) gives room to grow to 9,999 records without a format change.

---

## 2. Failure Mode Concept

### 2.1 What a failure mode is

A failure mode is a category of AI system behaviour that leads to or risks harm. It describes the mechanism of failure, not the outcome. The same failure mode can appear across many sectors and system types.

The failure mode taxonomy is the primary classification axis for the Atlas. Every incident record must have at least one failure mode.

### 2.2 Taxonomy structure — confirmed

Two-level hierarchy:

```
Level 1: Category (e.g. FM-PRIV — Privacy)
Level 2: Sub-category (e.g. FM-PRIV-001 — Training data leakage)
```

The eight top-level categories are confirmed stable for v0.2:

| ID | Category |
|---|---|
| FM-PRIV | Privacy |
| FM-BIAS | Bias |
| FM-HALL | Hallucination |
| FM-SAFE | Safety |
| FM-SEC | Security |
| FM-UNAUTH | Unauthorized action |
| FM-TRANS | Transparency |
| FM-REL | Reliability |

Sub-categories are confirmed for v0.2 but may be extended. Adding new sub-categories does not require a major version bump. Changing or removing existing sub-category IDs does.

### 2.3 AI agent failure category — confirmed

AI agent failures are a distinct sub-category within FM-UNAUTH and FM-SEC. They are confirmed stable for v0.2. This reflects the growing use of autonomous AI agents and differentiates Caesar from generic incident databases.

---

## 3. Control Mapping Concept

### 3.1 What control mapping means

Control mapping connects an incident (via its failure modes) to governance controls that could help prevent, detect, or reduce the impact of similar failures. It answers the question: "What should an organization have in place to reduce the risk of this type of failure?"

Control mapping is the primary governance value of the Atlas. It is what distinguishes the Atlas from a plain incident database.

### 3.2 Mapping logic — confirmed

```
incident → failure_modes[] → controls[]
```

This is a many-to-many relationship. One incident can have multiple failure modes. One failure mode maps to multiple controls. Controls are drawn from the Caesar control taxonomy.

### 3.3 Control mapping language

Control mappings must use careful language:

- "could help prevent" — not "would have prevented"
- "supports detection of" — not "detects"
- "reduces the risk of" — not "eliminates the risk of"
- "is relevant to" — not "is required for compliance with"

### 3.4 Control taxonomy — confirmed for v0.2

Ten control categories are confirmed stable for v0.2:

| Prefix | Category |
|---|---|
| CTL-DOC | Documentation and transparency |
| CTL-OVER | Human oversight and approval |
| CTL-TEST | Testing and evaluation |
| CTL-MON | Monitoring and logging |
| CTL-DATA | Data governance |
| CTL-VEN | Vendor and third-party |
| CTL-INC | Incident response |
| CTL-RISK | Risk assessment |
| CTL-ACCESS | Access and authorization |
| CTL-AGENT | AI agent governance |

---

## 4. Evidence Mapping Concept

### 4.1 What evidence mapping means

Evidence mapping connects controls to the evidence types that demonstrate those controls are active. It answers the question: "What documentation should exist to show that this control is in place?"

Evidence mapping is the bridge between the Atlas and the `caesar-ai-evidence` format. It is what makes the Atlas useful for governance evidence packs.

### 4.2 Evidence requirement format — resolved

**Decision:** Evidence requirements in incident records are free-text strings for v0.2, not EV- ID references.

Rationale: Free-text strings are easier to write and read during the early curation phase. They are more flexible when the evidence type registry is still evolving. EV- ID references will be introduced in v0.3 or v0.4 once the evidence type registry is stable.

The evidence type registry (EV-001 through EV-014) remains the reference for what evidence types exist, but incident records reference them by description, not by ID.

### 4.3 Evidence type registry — confirmed for v0.2

The 14 evidence types (EV-001 through EV-014) defined in `docs/TAXONOMY_DRAFT.md` are confirmed stable for v0.2.

---

## 5. Source and Citation Model

### 5.1 Source requirement — confirmed

Every incident record must include at least one source entry with:

- a publicly accessible URL;
- a source type label (AIID, OECD, AIAAIC, MIT, news, official, other);
- an access date.

A source title is recommended but not required for v0.2.

### 5.2 Preferred source types

In order of preference:

1. Official reports (regulatory decisions, government investigations, court records)
2. AIID records (with data license verified)
3. OECD AI Incidents Monitor entries (with data license verified)
4. AIAAIC Repository entries (with data license verified)
5. MIT AI Incident Tracker entries (with data license verified)
6. Reputable news sources (multiple independent sources preferred)
7. Academic papers and research reports

### 5.3 Source verification requirement

Before any source is cited in an incident record, the curator must verify:

- the source URL is publicly accessible;
- the source describes the incident being summarised;
- the source does not require a login or subscription to access (preferred);
- if the source is from AIID, OECD, AIAAIC, or MIT tracker, the data license has been verified and permits citation.

Full source verification workflow is defined in `SOURCE_AND_CITATION_POLICY_DRAFT.md`.

---

## 6. Confidence Model

### 6.1 Confidence levels — confirmed

Three levels:

| Level | Meaning |
|---|---|
| high | Well-documented incident with multiple independent sources, official reports, or court records |
| medium | Documented incident with at least two sources, but limited official confirmation |
| low | Incident reported by a single source, limited public information, or significant uncertainty about facts |

### 6.2 Confidence assignment rules

- Default to `low` when in doubt.
- Upgrade to `medium` only when a second independent source confirms the core facts.
- Upgrade to `high` only when official documentation (regulatory decision, court record, official investigation) is available.
- Never assign `high` based on news coverage alone, regardless of how many outlets covered the story.

### 6.3 Confidence and wording

Confidence level affects required wording in the summary:

| Confidence | Required wording style |
|---|---|
| high | "According to [official source]..." or "As documented in [official report]..." |
| medium | "According to public reports..." or "As reported by [source] and [source]..." |
| low | "According to a single public report..." or "It has been reported that..." |

---

## 7. Severity and Impact Model

### 7.1 Severity levels — confirmed

Four levels:

| Level | Meaning |
|---|---|
| critical | Severe harm, physical danger, systemic failure, or large-scale societal impact |
| high | Serious harm to individuals or groups, significant regulatory action, or major reputational damage |
| medium | Moderate harm, limited scope, or harm that was contained or remediated |
| low | Minor inconvenience, limited scope, no lasting harm, or near-miss with no actual harm |

### 7.2 Severity assignment rules

- Severity reflects the actual or potential harm of the incident type, not just the specific instance.
- A well-contained incident of a type that could cause serious harm should still be rated `high` or `critical`.
- Severity is assigned by the curator based on the incident summary and sources.
- When in doubt, assign the higher severity level.

### 7.3 Impact field

The `impact` field is a free-text description of the actual or potential consequences. It should cover:

- who was affected (individuals, groups, organizations, society);
- what type of harm occurred (financial, physical, psychological, reputational, systemic);
- the scale of the impact (number of people affected, geographic scope, duration).

The impact field is required for v0.2.

---

## 8. Sector and AI System Filters

### 8.1 Sector taxonomy — confirmed for v0.2

Eleven sectors are confirmed stable for v0.2:

| ID | Name |
|---|---|
| healthcare-medical | Healthcare and medical |
| finance-banking | Finance and banking |
| public-sector | Public sector and government |
| hiring-employment | Hiring and employment |
| law-enforcement | Law enforcement and criminal justice |
| education | Education |
| media-content | Media and content |
| retail-ecommerce | Retail and e-commerce |
| legal-compliance | Legal and compliance |
| transportation-autonomous | Transportation and autonomous systems |
| general | General / cross-sector |

Sector is optional for v0.2 but strongly recommended. Incidents without a sector are assigned `general`.

### 8.2 AI system type field

The `system_type` field is a free-text description of the type of AI system involved. It is optional for v0.2.

Recommended values (not an enum for v0.2):

- language model
- recommendation system
- autonomous agent
- computer vision system
- classification system
- generative AI system
- decision support system
- autonomous vehicle
- chatbot
- content moderation system

A controlled vocabulary for `system_type` will be introduced in v0.3 or v0.4 once patterns emerge from the first batch of incident records.

---

## 9. Relationship to caesar-ai-evidence

### 9.1 Export concept — confirmed

The Atlas exports incident-to-control-to-evidence mappings in a format compatible with the `caesar-ai-evidence` incident-mapping schema. This allows governance teams to import Atlas mappings into their evidence packs.

### 9.2 Export format — resolved

**Decision:** One export file per incident for v0.2, not a single combined file.

Rationale: Per-incident files are easier to manage, version, and selectively import. A combined export can always be generated from individual files. The reverse is harder.

### 9.3 Export schema alignment

The export record for each incident includes:

```
schema: "incident-mapping"
version: "0.2"
source: "caesar-ai-incident-atlas"
incident_id
incident_title
failure_modes[]
controls[]
evidence_required[]
severity
sector[]
lessons[]
```

This is a documentation-level definition. The executable schema will be defined in T004.

### 9.4 Schema strictness — resolved

**Decision:** Lenient schema for v0.2 MVP — only core fields required.

Required fields for v0.2:
- `incident_id`
- `title`
- `date`
- `sources` (at least one entry)
- `summary`
- `failure_modes` (at least one)
- `severity`
- `confidence`
- `controls` (at least one)
- `evidence_required` (at least one, free-text)
- `lessons` (at least one)

All other fields are optional for v0.2.

Rationale: A strict schema with many required fields will slow down curation and produce incomplete records. A lenient schema allows the first batch of records to be created quickly, with optional fields added as the curation process matures.

---

## 10. Future Relationship to Caesar AI Governance OS

### 10.1 Planned integration

The Atlas is planned to integrate with Caesar AI Governance OS as a risk library module. This integration does not exist yet. It is a future phase (v1.x).

When the integration is built, it will allow:

- incident cards to be searchable within client workspaces;
- control recommendations to link to the client's control library;
- evidence requirements to link to the client's evidence center;
- sector filters to show clients incidents relevant to their domain;
- new incident notifications in the client's risk intelligence inbox.

### 10.2 Design constraint

The Atlas data model must be designed with Governance OS integration in mind, but must not depend on it. The Atlas must be useful as a standalone product before the Governance OS integration is built.

This means:
- stable incident IDs that can be referenced by Governance OS;
- stable taxonomy IDs that can be mapped to Governance OS control library;
- export format that Governance OS can consume without transformation.

---

## 11. Taxonomy Versioning — resolved

**Decision:** The taxonomy is versioned together with the incident dataset, not separately.

Rationale: Separate versioning adds complexity without clear benefit at this stage. The taxonomy and dataset are tightly coupled — a taxonomy change affects all incident records that reference the changed IDs. Versioning them together makes the dependency explicit.

Breaking changes (changing or removing existing IDs) require a major version bump. Additive changes (new sub-categories, new controls, new evidence types) do not.

---

## 12. What This Contract Does Not Cover

The following are intentionally deferred to T004 or later:

- Executable JSON Schema files (T004)
- First incident candidate selection (T004)
- Source license verification workflow (T004)
- Static site technology choice (v0.4)
- Export CLI implementation (v0.5)
- Governance OS API design (v1.x)
- Training material format (v1.x)

---

## 13. Contract Status

This contract is approved as the working reference for T004 and v0.3. It may be revised before v1.0. Any revision requires:

1. A new decision log entry explaining what changed and why.
2. Control Tower approval.
3. A version bump in CHANGELOG.md.
4. Updates to any documents that reference the changed section.
