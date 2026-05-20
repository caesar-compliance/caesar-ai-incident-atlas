# Architecture — caesar-ai-incident-atlas

**Last updated:** 21 May 2026
**Version:** 0.8.2 (Static Weekly & Monthly Digests MVP)
**Status:** 12 case records and static digest layers created, validated, and live (T044)

---

## 1. Overview

The Caesar AI Legal & Governance Case Atlas is structured as an automated data curation pipeline coupled with a semantic "case-to-control" intelligence layer. The architecture is designed to be highly reliable, legally sound, and modular, acting as the centralized risk intelligence feed that integrates with the broader Caesar AI Governance Hub ecosystem.

The core architectural flow is:

```
unstructured regulatory case
→ automated watcher discovery
→ risk gating & clean-room summarization
→ case-to-control semantic mapping
→ client checklist & training lesson generation
→ push syndication via digests & RSS feeds
```

---

## 2. High-Level Architecture & 10-Stage Ingestion Pipeline

The Case Atlas is built around a ten-stage automated ingestion pipeline that transforms unstructured regulatory data into structured governance intelligence:

```
[1. Source Registry]
       │ (Canonical monitoring endpoints & official authorities)
       ▼
 [2. Watcher]
       │ (RSS feeds, scrapers, and portal observers)
       ▼
[3. Candidate Log]
       │ (Assigned CAND-XXXX identifier for raw triage)
       ▼
  [4. Dedupe]
       │ (Cross-checks Candidate URLs to prevent duplicates)
       ▼
[5. Source-Risk Gate]
       │ (Classifies source credibility: Green, Yellow, Red)
       ▼
[6. Clean-Room Summary]
       │ (AI Agent generates original, neutral hedged summary)
       ▼
[7. Classification]
       │ (Tags primary sectors, legal domains, system types)
       ▼
[8. Control Mapping]
       │ (Case → Risks → Missing Controls → Evidence)
       ▼
 [9. Public Case]
       │ (JSON written to site/data/incidents/ & statically deployed)
       ▼
 [10. Digest]
       │ (Generates weekly/monthly archives & RSS XML feeds)
```

### 2.1 Component Layer Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Ingestion & Watcher Layer                │
│  Monitors endpoints → Deduplicates → Evaluates source risk │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Case Intelligence Layer                  │
│  Converts events into 21-field Case Records in clean-room   │
│  Applies Failure Mode & Sector taxonomies                   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Case-to-Control Mapping Layer            │
│  Maps Case → Legal Risk → Missing Controls                   │
│  Identifies Required Evidence & compiles Vendor Questions   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Publishing & Distribution Layer           │
│  Compiles Weekly/Monthly static digests & RSS feeds         │
│  Exports standardized JSON payloads for downstream tools     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Integration & OS Layer                   │
│  caesar-ai-evidence (incident-mapping schema)              │
│  Future: caesar-ai-governance-os Risk Intelligence Engine  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Data Model

### 3.1 Case record (21-Field Schema)

The core data unit in the Atlas is the Case record. The model has expanded to a 21-field schema that captures deep compliance and remediation intelligence.

Key fields:

```json
{
  "case_id": "CASE-0013",
  "case_title": "string",
  "case_type": "enforcement | lawsuit | regulator_guidance | court_decision | settlement | public_sector_incident | vendor_governance_failure | serious_incident_report | commercial_ai_failure | official_investigation",
  "jurisdiction": "string",
  "source_authority": "string",
  "source_tier": "Green | Yellow | Red",
  "legal_domain": "privacy_biometrics | employment_hiring | consumer_protection | healthcare | financial_services | public_sector | legal_hallucination | vendor_risk | governance_failure | disability_discrimination",
  "commercial_domain": "string",
  "ai_system_type": "string",
  "affected_party": "string",
  "legal_commercial_relevance": "string",
  "failure_mode": ["FM-PRIV", "FM-HALL"],
  "business_risk": "string",
  "missing_controls": ["CTL-DOC-001", "CTL-OVER-001"],
  "required_evidence": ["EV-001"],
  "vendor_questions": ["string"],
  "training_lesson": "string",
  "public_summary": "string",
  "source_urls": ["string"],
  "publish_status": "candidate | draft | reviewed | published",
  "digest_tags": ["string"]
}
```

### 3.2 Failure mode taxonomy record

```json
{
  "taxonomy_id": "FM-PRIV",
  "category": "Privacy",
  "description": "string",
  "sub_categories": [
    {
      "id": "FM-PRIV-001",
      "name": "Training data leakage",
      "description": "string"
    }
  ],
  "related_controls": ["CTL-DATA-001", "CTL-MON-001"],
  "related_evidence": ["string"]
}
```

### 3.3 Control record

```json
{
  "control_id": "CTL-OVER-001",
  "category": "Human oversight and approval",
  "name": "string",
  "description": "string",
  "failure_modes_addressed": ["FM-UNAUTH", "FM-SAFE"],
  "evidence_required": ["string"],
  "caesar_evidence_schema": "control"
}
```

### 3.4 Evidence requirement record

```json
{
  "evidence_id": "EV-001",
  "type": "Human oversight record",
  "description": "string",
  "controls": ["CTL-OVER-001"],
  "caesar_evidence_schema": "evidence-item"
}
```

---

## 4. File and Folder Structure

Planned repository structure at MVP:

```
caesar-ai-incident-atlas/
├── README.md
├── SPEC.md
├── ARCHITECTURE.md
├── ROADMAP.md
├── CHANGELOG.md
├── REPO_INVENTORY.md
├── PROJECT_STATE.md
├── NEXT_ACTIONS.md
│
├── data/
│   ├── incidents/
│   │   ├── INC-0001.json          ← individual incident records
│   │   ├── INC-0002.json
│   │   └── ...
│   ├── digests/                   ← static digests data directory
│   │   ├── weekly/
│   │   │   └── weekly-2026-W21.json
│   │   └── monthly/
│   │       └── monthly-2026-05.json
│   ├── taxonomy/
│   │   ├── failure-modes.json    ← failure mode taxonomy
│   │   ├── controls.json         ← control taxonomy
│   │   ├── evidence-types.json   ← evidence type registry
│   │   └── sectors.json          ← sector taxonomy
│   ├── mappings/
│   │   ├── incident-controls.json     ← incident → control mappings
│   │   └── control-evidence.json      ← control → evidence mappings
│   ├── source-registry/
│   │   └── sources.yml           ← AI case sources database
│   ├── candidates/
│   │   ├── .gitkeep
│   │   └── mock/                 ← mock candidate files
│   └── drafts/
│       └── .gitkeep              ← case drafts
│
├── schemas/
│   ├── incident.schema.json      ← JSON Schema for incident records
│   ├── taxonomy.schema.json      ← JSON Schema for taxonomy records
│   ├── mapping.schema.json       ← JSON Schema for mapping records
│   └── pipeline/
│       ├── source.schema.json    ← schema for source registry database
│       ├── candidate.schema.json ← schema for discovery candidates
│       └── case-draft.schema.json ← schema for intermediate case drafts
│
├── site/                         ← static public interface root
│   ├── index.html                ← main app landing page
│   ├── rss.xml                   ← consolidated RSS XML feed
│   ├── assets/
│   │   ├── app.js
│   │   └── styles.css
│   ├── data/
│   │   └── digests/
│   │       ├── weekly/
│   │       │   └── weekly-2026-W21.json
│   │       └── monthly/
│   │           └── monthly-2026-05.json
│   └── digests/                  ← static public digest portal pages
│       ├── index.html            ← digests dashboard page
│       ├── weekly.xml            ← weekly digests RSS XML feed
│       ├── monthly.xml           ← monthly digests RSS XML feed
│       ├── weekly/
│       │   └── index.html        ← weekly briefing page
│       └── monthly/
│           └── index.html        ← monthly briefing page
│
├── scripts/                      ← pipeline offline management scripts
│   ├── validate-digests.mjs      ← standalone digest validator script
│   └── build-rss-feeds.mjs       ← standalone RSS syndication generator
│
├── exports/
│   └── .gitkeep                  ← generated exports go here
│
├── docs/
│   ├── RESEARCH_CONTEXT.md
│   ├── DECISION_LOG.md
│   ├── COMPETITOR_BENCHMARKS.md
│   ├── FULL_SCALE_PRODUCT_BLUEPRINT.md
│   ├── DATA_MODEL_DRAFT.md
│   ├── TAXONOMY_DRAFT.md
│   ├── UI_UX_VISION.md
│   └── automation/
│       ├── SOURCE_REGISTRY_POLICY.md   ← operational policy
│       ├── CANDIDATE_PIPELINE_MODEL.md ← architectural stage definitions
│       ├── SOURCE_RISK_GATE.md         ← risk evaluation controls
│       ├── AUTO_PUBLISH_RULES.md       ← automated publication limits
│       └── VALIDATOR_EXTENSION_PLAN.md ← registry check guidelines
│
├── tools/
│   ├── validate_dataset.py       ← dataset validator script
│   └── validate_pipeline_schemas.py ← source and pipeline schema validator
│
└── work-items/
    └── T044-static-weekly-monthly-digest-mvp/ ← task deliverables tracking
```

Implementation status after T044:

- Static Weekly and Monthly Digest MVP fully active.
- Dedicated offline validator and compiler built using standard ES modules (`.mjs`).
- Valid RSS XML syndication and unified digests portal deployed in the public root.
- All 12 public incident records preserved intact.
- Source registry catalog remains untouched.

---

## 5. Taxonomy Layer Design

### 5.1 Failure mode taxonomy

The failure mode taxonomy is a two-level hierarchy:

```
Level 1: Category (e.g. FM-PRIV — Privacy)
Level 2: Sub-category (e.g. FM-PRIV-001 — Training data leakage)
```

Each category maps to:
- a set of controls that address it;
- a set of evidence types that demonstrate those controls are active;
- a set of sectors where this failure mode is most common.

### 5.2 Sector taxonomy

Sectors allow filtering incidents by domain:

```
healthcare-medical
finance-banking
public-sector
hiring-employment
law-enforcement
education
media-content
retail-ecommerce
legal-compliance
transportation-autonomous
general
```

### 5.3 AI agent failure category

AI agent failures are a distinct sub-category within the taxonomy, reflecting the growing use of autonomous AI agents in enterprise workflows:

```
FM-UNAUTH-AGENT-001  Agent scope violation
FM-UNAUTH-AGENT-002  Unauthorized tool use
FM-UNAUTH-AGENT-003  Approval bypass
FM-UNAUTH-AGENT-004  Cascading side effects
FM-SEC-AGENT-001     Prompt injection via tool output
FM-SEC-AGENT-002     Persistent memory misuse
```

---

## 6. Mapping Layer Design

### 6.1 Incident-to-control mapping

The mapping layer connects incidents to controls through the failure mode taxonomy:

```
incident → failure_modes[] → controls[]
```

This is a many-to-many relationship. One incident can have multiple failure modes. One failure mode can map to multiple controls.

### 6.2 Control-to-evidence mapping

Each control maps to one or more evidence types:

```
control → evidence_required[]
```

This allows the Atlas to answer: "Given this incident pattern, what evidence should exist in a governance evidence pack?"

### 6.3 Export to caesar-ai-evidence

The mapping layer exports to the `caesar-ai-evidence` format using the `incident-mapping` schema. This allows:

- governance teams to import Atlas mappings into their evidence packs;
- Caesar AI Governance OS to display incident-based control recommendations;
- consultants to generate evidence gap reports based on sector-specific incident patterns.

---

## 7. Static Site Architecture (Future)

The future public site at `incidents.caesar.no` will be a static site generated from the incident dataset.

### 7.1 Generation approach

```
incident JSON records
+ taxonomy JSON
+ mapping JSON
→ static site generator (e.g. Eleventy, Astro, or custom script)
→ HTML pages
→ deployed to incidents.caesar.no
```

### 7.2 Site structure

```
/                           ← home / search
/incidents/                 ← incident index
/incidents/INC-001/         ← individual incident card
/failure-modes/             ← taxonomy index
/failure-modes/FM-PRIV/     ← failure mode page with related incidents
/controls/                  ← control index
/controls/CTL-OVER-001/     ← control page with related incidents and evidence
/sectors/healthcare/        ← sector filter page
/export/                    ← export options
```

### 7.3 Search

Client-side search using a pre-built index (e.g. Pagefind or Lunr.js). No backend required.

---

## 8. Integration with caesar-ai-evidence

The Atlas integrates with `caesar-ai-evidence` through the `incident-mapping` schema:

```json
{
  "schema": "incident-mapping",
  "incident_id": "INC-001",
  "incident_title": "string",
  "failure_modes": ["FM-PRIV"],
  "controls": ["CTL-DATA-001"],
  "evidence_required": ["data-governance-record"],
  "source": "caesar-ai-incident-atlas",
  "date": "19 May 2026"
}
```

This export can be consumed by:
- `caesar-ai-evidence` CLI for validation and reporting;
- `caesar-ai-governance-os` for risk library display;
- consultants for evidence gap analysis.

---

## 9. Integration with caesar-ai-governance-os (Future)

The Atlas will integrate with Caesar AI Governance OS as a risk library module:

```
Atlas incident dataset
→ risk library API
→ client workspace risk view
→ control recommendations
→ evidence gap alerts
```

The integration will allow clients to:
- browse incidents relevant to their sector;
- see which controls are recommended based on incident patterns;
- identify evidence gaps in their governance evidence pack;
- receive alerts when new incidents are added to the Atlas.

---

## 10. Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Data format | JSON with JSON Schema validation | Machine-readable, easy to export, compatible with caesar-ai-evidence |
| Taxonomy structure | Two-level hierarchy | Simple enough to maintain, detailed enough to be useful |
| Site generation | Static site (future) | No backend required, easy to deploy, fast to load |
| Source model | Citation-first | Every incident must have a public source; no unverified claims |
| Wording policy | Careful, factual, no legal claims | Protects Caesar and referenced organizations |
| Competitor data | Cite and reference, do not copy | Respects data licenses, adds original governance mapping value |

For the full decision history, see [docs/DECISION_LOG.md](docs/DECISION_LOG.md).

---

## 11. Local Architecture Mining and Clean-Room Boundary

Caesar AI Incident Atlas is built as an original product. External repositories, public incident databases, and benchmark websites may be studied locally (outside the Caesar repository directory) to inform design decisions. No external code, schemas, data, or text may be committed to the Caesar repository without explicit Control Tower approval and license verification.

The clean-room boundary is the repository itself:

```
External world (study zone)
    ↓ ideas, patterns, summaries, recommendations
Caesar repository (clean zone)
    ↓ original Caesar implementation only
```

### Policy documents

| Document | Purpose |
|---|---|
| `LOCAL_ARCHITECTURE_MINING_PLAN.md` | What may be studied locally, the clean-room boundary, permitted study targets, AI agent rules |
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | License classification table and clean-room process for each implementation task |
| `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md` | Reusable template for documenting individual source reviews |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Running register of all sources reviewed, with license status and reuse decisions |

### License classification summary

| License category | Code reuse | Data reuse | Approval required |
|---|---|---|---|
| MIT / Apache-2.0 / BSD | Conditional (with attribution) | Depends on data license | Yes |
| GPL / LGPL | High risk — avoid | Depends on data license | Yes — Control Tower review |
| AGPL | High risk — do not copy | Depends on data license | Yes — Control Tower review |
| Creative Commons | Depends on variant | Depends on variant | Yes |
| No license | No | No | Yes — explicit permission needed |
| Public website | No | No | No — UX inspiration always permitted |
| Proprietary SaaS | No | No | No — UX inspiration always permitted |

For the full classification table and clean-room process, see `CLEAN_ROOM_IMPLEMENTATION_POLICY.md`.
