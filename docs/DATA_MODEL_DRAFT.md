# Data Model Draft — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Status:** Draft — requires Control Tower review before implementation

---

## Overview

This document defines the data model for Caesar AI Incident Atlas. It covers all record types, field definitions, and relationships.

The data model is designed to be:
- simple enough to maintain manually in the early phases;
- structured enough to support JSON Schema validation;
- compatible with the `caesar-ai-evidence` export format;
- extensible for future Governance OS integration.

---

## 1. Incident Record

The core data unit. One JSON file per incident in `data/incidents/`.

### Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": [
    "incident_id",
    "title",
    "date",
    "sources",
    "summary",
    "failure_modes",
    "severity",
    "confidence",
    "controls",
    "evidence_required"
  ],
  "properties": {
    "incident_id": {
      "type": "string",
      "pattern": "^INC-[0-9]{3,}$",
      "description": "Unique incident identifier, e.g. INC-001"
    },
    "title": {
      "type": "string",
      "description": "Short descriptive title"
    },
    "date": {
      "type": "string",
      "description": "Date of incident or first public report, format: 19 May 2026"
    },
    "sources": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["url", "database"],
        "properties": {
          "url": { "type": "string", "format": "uri" },
          "database": {
            "type": "string",
            "enum": ["AIID", "OECD", "AIAAIC", "MIT", "news", "official", "other"]
          },
          "title": { "type": "string" },
          "accessed": { "type": "string" }
        }
      }
    },
    "summary": {
      "type": "string",
      "description": "Factual summary based on publicly available information. No legal claims."
    },
    "sector": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Affected sector(s) from the sector taxonomy"
    },
    "system_type": {
      "type": "string",
      "description": "Type of AI system involved, e.g. language model, recommendation system, autonomous agent"
    },
    "failure_modes": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string",
        "pattern": "^FM-"
      },
      "description": "Failure mode IDs from the taxonomy"
    },
    "harms": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Types of harm caused or risked"
    },
    "risk_categories": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Risk category labels"
    },
    "affected_stakeholders": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Who was affected by the incident"
    },
    "severity": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"],
      "description": "Severity of the incident type"
    },
    "impact": {
      "type": "string",
      "description": "Description of actual or potential consequences"
    },
    "confidence": {
      "type": "string",
      "enum": ["low", "medium", "high"],
      "description": "How well-documented the incident is"
    },
    "controls": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^CTL-"
      },
      "description": "Control IDs that could help prevent or detect this failure"
    },
    "evidence_required": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Evidence types that should exist to demonstrate controls are active"
    },
    "lessons": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Practical governance lessons from this incident"
    },
    "related_incidents": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^INC-"
      },
      "description": "Related incident IDs"
    }
  }
}
```

### Example record

```json
{
  "incident_id": "INC-001",
  "title": "Language model reportedly generates fabricated legal citations",
  "date": "1 June 2023",
  "sources": [
    {
      "url": "https://incidentdatabase.ai/cite/example",
      "database": "AIID",
      "title": "Example AIID record",
      "accessed": "19 May 2026"
    }
  ],
  "summary": "According to public reports, a language model used in a legal context reportedly generated fabricated case citations that were submitted in court documents. The citations appeared plausible but did not correspond to real cases.",
  "sector": ["legal-compliance"],
  "system_type": "language model",
  "failure_modes": ["FM-HALL"],
  "harms": ["reputational harm", "legal process harm"],
  "risk_categories": ["output reliability", "professional use"],
  "affected_stakeholders": ["legal professionals", "court system"],
  "severity": "high",
  "impact": "Fabricated citations submitted in court documents; potential sanctions for legal professionals involved.",
  "confidence": "high",
  "controls": ["CTL-TEST-001", "CTL-OVER-001", "CTL-DOC-001"],
  "evidence_required": [
    "AI system register documenting intended use and limitations",
    "Human oversight record for AI-assisted legal work",
    "Testing record for output accuracy in professional contexts"
  ],
  "lessons": [
    "Language models should not be used for legal citation without human verification.",
    "AI system documentation should clearly state limitations for professional use.",
    "Human oversight controls are essential for high-stakes professional AI use."
  ],
  "related_incidents": []
}
```

---

## 2. Failure Mode Taxonomy Record

Stored in `data/taxonomy/failure-modes.json`.

### Schema

```json
{
  "taxonomy_id": "FM-HALL",
  "category": "Hallucination",
  "description": "AI system generates fabricated, false, or misleading outputs presented with apparent confidence.",
  "sub_categories": [
    {
      "id": "FM-HALL-001",
      "name": "Fabricated facts",
      "description": "AI generates factual claims that are false or unverifiable."
    },
    {
      "id": "FM-HALL-002",
      "name": "False citations",
      "description": "AI generates references to sources, cases, or documents that do not exist."
    },
    {
      "id": "FM-HALL-003",
      "name": "Confident incorrect outputs",
      "description": "AI presents incorrect information with high apparent confidence."
    }
  ],
  "related_controls": ["CTL-TEST-001", "CTL-OVER-001", "CTL-MON-001"],
  "related_evidence": [
    "Testing record for output accuracy",
    "Human oversight record",
    "Monitoring log for output quality"
  ],
  "common_sectors": ["legal-compliance", "healthcare-medical", "education", "media-content"]
}
```

---

## 3. Control Record

Stored in `data/taxonomy/controls.json`.

### Schema

```json
{
  "control_id": "CTL-OVER-001",
  "category": "Human oversight and approval",
  "name": "Human review of AI outputs before use",
  "description": "A qualified human reviews AI-generated outputs before they are used in decisions or communications.",
  "failure_modes_addressed": ["FM-HALL", "FM-BIAS", "FM-SAFE", "FM-UNAUTH"],
  "evidence_required": [
    "Human oversight record documenting review process",
    "AI system register documenting oversight requirements"
  ],
  "caesar_evidence_schema": "control",
  "applicable_sectors": ["all"],
  "notes": "Particularly important for high-stakes professional use cases."
}
```

---

## 4. Evidence Requirement Record

Stored in `data/taxonomy/evidence-types.json`.

### Schema

```json
{
  "evidence_id": "EV-001",
  "type": "AI system register",
  "description": "A documented record of the AI system, its purpose, owner, intended use, limitations, and governance status.",
  "controls": ["CTL-DOC-001", "CTL-RISK-001"],
  "caesar_evidence_schema": "evidence-item",
  "example_content": [
    "System name and version",
    "System owner and operator",
    "Intended use and limitations",
    "Vendor and model information",
    "Risk classification",
    "Review date"
  ]
}
```

---

## 5. Sector Record

Stored in `data/taxonomy/sectors.json`.

### Schema

```json
{
  "sector_id": "healthcare-medical",
  "name": "Healthcare and medical",
  "description": "AI systems used in healthcare, medical diagnosis, treatment recommendations, and clinical workflows.",
  "common_failure_modes": ["FM-HALL", "FM-SAFE", "FM-BIAS", "FM-PRIV"],
  "regulatory_context": "Subject to medical device regulations, data protection laws, and clinical safety requirements.",
  "notes": "High-stakes sector where AI failures can cause direct physical harm."
}
```

---

## 6. Incident-to-Control Mapping Record

Stored in `data/mappings/incident-controls.json`.

### Schema

```json
{
  "incident_id": "INC-001",
  "failure_modes": ["FM-HALL"],
  "controls": [
    {
      "control_id": "CTL-TEST-001",
      "relevance": "Testing for output accuracy could detect hallucination patterns before deployment.",
      "strength": "preventive"
    },
    {
      "control_id": "CTL-OVER-001",
      "relevance": "Human review of AI outputs before use in legal documents could catch fabricated citations.",
      "strength": "detective"
    }
  ]
}
```

---

## 7. Control-to-Evidence Mapping Record

Stored in `data/mappings/control-evidence.json`.

### Schema

```json
{
  "control_id": "CTL-OVER-001",
  "evidence_required": [
    {
      "evidence_id": "EV-001",
      "description": "AI system register documenting oversight requirements for this system.",
      "required": true
    },
    {
      "evidence_id": "EV-004",
      "description": "Human oversight record documenting review process and reviewer qualifications.",
      "required": true
    }
  ]
}
```

---

## 8. caesar-ai-evidence Export Record

Generated by the export script. Compatible with the `caesar-ai-evidence` incident-mapping schema.

### Schema

```json
{
  "schema": "incident-mapping",
  "version": "1.0",
  "source": "caesar-ai-incident-atlas",
  "generated": "19 May 2026",
  "incident_id": "INC-001",
  "incident_title": "Language model reportedly generates fabricated legal citations",
  "failure_modes": ["FM-HALL"],
  "controls": ["CTL-TEST-001", "CTL-OVER-001", "CTL-DOC-001"],
  "evidence_required": [
    "AI system register documenting intended use and limitations",
    "Human oversight record for AI-assisted legal work",
    "Testing record for output accuracy in professional contexts"
  ],
  "severity": "high",
  "sector": ["legal-compliance"],
  "lessons": [
    "Language models should not be used for legal citation without human verification.",
    "AI system documentation should clearly state limitations for professional use.",
    "Human oversight controls are essential for high-stakes professional AI use."
  ]
}
```

---

## 9. Field Naming Conventions

| Convention | Rule |
|---|---|
| Incident IDs | `INC-` prefix, zero-padded three digits minimum, e.g. `INC-001` |
| Failure mode IDs | `FM-` prefix, category abbreviation, e.g. `FM-PRIV`, `FM-HALL-001` |
| Control IDs | `CTL-` prefix, category abbreviation, sequence number, e.g. `CTL-OVER-001` |
| Evidence IDs | `EV-` prefix, sequence number, e.g. `EV-001` |
| Sector IDs | Lowercase hyphenated, e.g. `healthcare-medical`, `finance-banking` |
| Dates | `19 May 2026` format throughout |

---

## 10. Open Questions for Control Tower Review

Before implementing schemas:

1. Should incident IDs be sequential (INC-001, INC-002) or content-based (INC-HALL-2023-001)?
2. Should the taxonomy be versioned separately from the incident dataset?
3. Should evidence requirements be free-text strings or reference EV- IDs?
4. Should the export format be a single file or one file per incident?
5. Should the schema be strict (all fields required) or lenient (only core fields required) for MVP?
