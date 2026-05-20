# Source Registry and Watcher Architecture

## 1. Conceptual Overview

The **Source Registry and Watcher Architecture** defines the conceptual data pipeline for the Caesar AI Legal & Governance Case Atlas. This architecture maps the lifecycle of an event from initial automated discovery through ingestion triage, risk gating, semantic annotation, and publication.

---

## 2. Ingestion & Transformation Pipeline

The conceptual pipeline operates in a linear sequence of ten distinct stages to ensure that every published record is highly structured, original, legally safe, and actionable.

```
 [1. Source Registry]
         │
         ▼
    [2. Watcher]
         │
         ▼
   [3. Candidate]
         │
         ▼
    [4. Dedupe]
         │
         ▼
 [5. Source-Risk Gate]
         │
         ▼
[6. Clean-Room Summary]
         │
         ▼
[7. Legal/Commercial Classification]
         │
         ▼
[8. Control/Evidence Mapping]
         │
         ▼
  [9. Public Case]
         │
         ▼
   [10. Digest]
```

---

## 3. Pipeline Stage Specifications

### Stage 1: Source Registry
- **Role:** The catalog of canonical monitoring endpoints and trusted authorities.
- **Components:** A register of official courts, federal agencies (EEOC, FTC, BC CRT), academic feeds, and verified research feeds.

### Stage 2: Watcher
- **Role:** The automated data collectors.
- **Components:** Programmatic RSS listeners, portal scraper engines, and endpoint monitors. They continuously scan the Source Registry for new releases, filings, or announcements.

### Stage 3: Candidate
- **Role:** Raw discovery triage.
- **Components:** When the Watcher finds a new event, it logs a raw candidate entry containing the discovery URL, discovery timestamp, target authority, and pre-extracted metadata. It is assigned a `CAND-XXXX` identifier.

### Stage 4: Dedupe
- **Role:** Duplication resolution.
- **Components:** Cross-references the new Candidate URL and title against existing published cases, drafts, and active candidate logs to prevent redundant processing.

### Stage 5: Source-Risk Gate
- **Role:** Trust and license evaluation.
- **Components:** Inspects the primary source URL using the Source Tiering policy. If the source is Green, it proceeds to auto-drafting. If Yellow or Red, it flags the record for manual review or blocks processing if licensing is unverified.

### Stage 6: Clean-Room Summary
- **Role:** Editorial translation.
- **Components:** An AI agent writes a neutral, factual, and original case summary using the Caesar wording guidelines. No third-party article text or media descriptions are preserved.

### Stage 7: Legal/Commercial Classification
- **Role:** Semantic tagging.
- **Components:** Mapped to sectors (e.g., healthcare, finance), legal domains (e.g., biometrics, hiring discrimination), and system types (e.g., automated triage, LLM chatbot).

### Stage 8: Control/Evidence Mapping
- **Role:** Remediation engineering.
- **Components:** The heart of the Caesar value layer. Mappings are established:
  - **Failure Modes:** Connects the case to the Failure Mode Taxonomy.
  - **Missing Controls:** Identifies which active controls could have prevented, detected, or mitigated the failure.
  - **Required Evidence:** Defines the concrete evidence artifacts needed to prove control existence.
  - **Vendor Questions:** Auto-compiles specific questions for procurement audits.
  - **Training Lessons:** Condenses the case into actionable development and leadership guidelines.

### Stage 9: Public Case
- **Role:** Production publishing.
- **Components:** The validated JSON record is generated and written to the `site/data/incidents/` directory. Deployed statically to the production website via GitHub Pages, making it publicly searchable.

### Stage 10: Digest
- **Role:** Push distribution.
- **Components:** Aggregates newly published cases into structured Weekly and Monthly static briefings and RSS XML feeds for syndication to compliance managers and downstream clients.
