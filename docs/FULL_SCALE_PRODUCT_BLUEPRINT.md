# Full-Scale Product Blueprint — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Purpose:** Complete product blueprint for Caesar AI Incident Atlas covering all product dimensions, user journeys, and ecosystem integration.

---

## 1. Product Identity

**Product name:** Caesar AI Incident Atlas
**Repository:** `caesar-ai-incident-atlas`
**Public URL (future):** `incidents.caesar.no`
**Short description:** Learn from AI failures. Map incidents to practical controls.
**Public phrasing:** Caesar AI Incident Atlas turns curated public incident knowledge into practical governance controls and evidence requirements.

---

## 2. Core Product Logic

The Atlas is not an incident news feed. It is a governance mapping layer.

```
publicly reported AI incident
→ structured incident card
→ failure mode taxonomy classification
→ incident-to-control mapping
→ control-to-evidence mapping
→ governance lessons
→ export to caesar-ai-evidence
→ future: risk library in caesar-ai-governance-os
```

The key question the Atlas answers for governance teams:

> "Why do we need this control? What real-world failures show what happens without it?"

---

## 3. Product Dimensions

### 3.1 Incident dataset

A curated dataset of publicly reported AI incidents. Each incident is a structured record with:

- unique incident ID;
- title and factual summary;
- date and source citations;
- sector and system type;
- failure mode classification;
- harm types and affected stakeholders;
- severity, impact, and confidence fields;
- control recommendations;
- evidence requirements;
- governance lessons.

The dataset is not exhaustive. It is curated for governance relevance. Quality over quantity.

### 3.2 Failure mode taxonomy

A two-level taxonomy classifying AI failures:

**Top-level categories:**
- FM-PRIV: Privacy
- FM-BIAS: Bias
- FM-HALL: Hallucination
- FM-SAFE: Safety
- FM-SEC: Security
- FM-UNAUTH: Unauthorized action
- FM-TRANS: Transparency
- FM-REL: Reliability

**AI agent failure sub-category** (within FM-UNAUTH and FM-SEC):
- Agent scope violation
- Unauthorized tool use
- Approval bypass
- Cascading side effects
- Prompt injection via tool output
- Persistent memory misuse

### 3.3 Incident-to-control mapping

Each incident maps to one or more governance controls. Controls are organized by category:

- Documentation and transparency controls
- Human oversight and approval controls
- Testing and evaluation controls
- Monitoring and logging controls
- Data governance controls
- Vendor and third-party controls
- Incident response controls
- Risk assessment controls
- Access and authorization controls
- AI agent governance controls

### 3.4 Control-to-evidence mapping

Each control maps to one or more evidence types in the `caesar-ai-evidence` format:

- AI system register
- Risk assessment
- Vendor review
- Human oversight record
- Testing record
- Monitoring log
- Incident response plan
- Agent activity log
- Data governance record
- Training record

### 3.5 Source and citation model

Every incident record includes:
- at least one public source URL;
- the source database or publication;
- the date of the incident or first public report;
- a confidence level.

Benchmark sources:
- AI Incident Database (AIID)
- OECD AI Incidents and Hazards Monitor
- AIAAIC Repository
- MIT AI Incident Tracker
- Official reports and regulatory actions

### 3.6 Severity, impact, and confidence fields

**Severity:** low / medium / high / critical
**Impact:** individual / group / organizational / societal
**Confidence:** low / medium / high (how well-documented the incident is)

### 3.7 Sector filters

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

## 4. User Journeys

### 4.1 Consultant journey

A consultant is preparing a governance review for a client in the healthcare sector. They open the Atlas, filter by sector (healthcare) and failure mode (hallucination). They find three relevant incidents. They use the incident cards to explain to the client why AI output validation controls are needed. They export the control recommendations to the client's evidence pack.

### 4.2 Risk team journey

A risk team is building a risk register for a new AI system that uses autonomous agents. They filter the Atlas by failure mode (unauthorized action, AI agent failures). They find incidents showing what happens when agents act outside their approved scope. They use the control recommendations to define agent governance controls for their risk register.

### 4.3 Trainer journey

A trainer is preparing a workshop on AI governance for a financial services team. They filter the Atlas by sector (finance) and select five incidents across different failure modes. They use the incident cards as case studies. The Atlas provides discussion questions and governance lessons for each case.

### 4.4 Compliance team journey

A compliance team is reviewing their AI governance evidence pack. They use the Atlas to identify which evidence items should exist based on the failure modes most relevant to their sector. They export the evidence requirements to their evidence pack and identify gaps.

### 4.5 Client journey (future Governance OS)

A Caesar client opens their Governance OS workspace. The risk library module shows incidents relevant to their sector and AI system types. The client sees which controls are recommended based on incident patterns. They see which evidence items are missing from their evidence pack. They create tasks to address the gaps.

---

## 5. Public Site Vision

The future public site at `incidents.caesar.no` provides:

**Home page:**
- search bar (full-text search across all incidents);
- featured incidents;
- failure mode category cards;
- sector filter shortcuts;
- link to caesar.no and the broader ecosystem.

**Incident index:**
- filterable list of all incidents;
- filters: failure mode, sector, severity, confidence, date range;
- sort by date, severity, relevance;
- incident cards with title, date, sector, failure modes, severity badge.

**Individual incident card:**
- full incident metadata;
- factual summary with source citations;
- failure mode tags;
- control recommendations;
- evidence requirements;
- governance lessons;
- related incidents;
- export button (JSON, Markdown).

**Failure mode pages:**
- description of the failure mode;
- list of incidents in this category;
- control recommendations for this failure mode;
- evidence requirements;
- sector distribution.

**Control pages:**
- description of the control;
- list of incidents that this control addresses;
- evidence requirements;
- link to caesar-ai-evidence format.

**Sector pages:**
- list of incidents in this sector;
- most common failure modes;
- top control recommendations;
- sector-specific governance notes.

**Training mode (future):**
- workshop-ready case pages;
- discussion questions;
- governance exercise prompts;
- printable case study format.

---

## 6. Export and Integration

### 6.1 Export to caesar-ai-evidence

The Atlas exports incident-to-control-to-evidence mappings in the `caesar-ai-evidence` format. This allows governance teams to:

- identify which evidence items are missing for a given risk profile;
- generate evidence gap reports based on incident patterns;
- import Atlas mappings into Caesar AI Governance OS.

Export formats:
- JSON (machine-readable);
- Markdown (human-readable);
- future: HTML report.

### 6.2 Future Governance OS integration

The Atlas integrates with Caesar AI Governance OS as a risk library module:

- incident cards searchable within client workspaces;
- control recommendations linked to client control library;
- evidence requirements linked to client evidence center;
- sector filters for client-relevant incidents;
- new incident notifications in risk intelligence inbox.

### 6.3 Future ecosystem connections

```
caesar-ai-incident-atlas
    ↓ exports incident-mapping records
caesar-ai-evidence
    ↓ validates and reports evidence gaps

caesar-ai-incident-atlas
    ↓ provides risk library
caesar-ai-governance-os
    ↓ displays in client workspaces

caesar-ai-incident-atlas
    ↑ informed by
caesar-ai-regulation-watch
    (regulatory actions linked to incidents)

caesar-ai-incident-atlas
    ↑ informed by
caesar-ai-scan
    (codebase patterns associated with known incident types)
```

---

## 7. Future Training and Risk Intelligence Use Cases

### 7.1 Training and workshop material

- Real-world case studies organized by failure mode.
- Workshop-ready incident cards with discussion questions.
- Sector-specific risk examples for targeted training.
- Control recommendation summaries for each failure category.
- Printable case study packs for client workshops.

### 7.2 Risk intelligence

- Sector-specific risk profiles based on incident patterns.
- Control gap analysis based on incident history.
- Trend analysis showing which failure modes are increasing.
- Early warning signals for emerging AI risk categories.

### 7.3 Future training data use

The structured incident dataset may support future AI governance model training, subject to applicable data licenses and privacy requirements. This is a future consideration, not a current commitment.

---

## 8. Wording and Positioning Rules

### Use

- curated public incident knowledge;
- maps incidents to controls and evidence;
- supports governance review;
- helps explain practical AI risks;
- based on publicly available information;
- reportedly / according to public reports / publicly documented;
- may help prevent / could reduce the risk of / supports detection of.

### Avoid

- guarantees compliance;
- legally compliant;
- certified;
- complete incident database;
- would have prevented;
- legal claims about organizations or individuals.

---

## 9. Build Difficulty Assessment

**Difficulty: 4/10**

- A small curated dataset and static site are relatively achievable.
- The hard work is curation quality, citations, taxonomy consistency, deduplication, and avoiding overconfident summaries.
- The governance mapping layer (incident → controls → evidence) is the unique value and requires careful design.
- The static site is straightforward once the data model is stable.
- The Governance OS integration is a future phase and depends on that platform's development.

---

## 10. Success Criteria

The Atlas is successful when:

- a consultant can find a relevant incident in under 30 seconds;
- a risk team can identify control recommendations for a given failure mode;
- a compliance team can export evidence requirements to their evidence pack;
- a trainer can build a workshop case study from Atlas incident cards;
- the public site is live and searchable at `incidents.caesar.no`;
- the Atlas is cited as a reference in Caesar consulting deliverables.
