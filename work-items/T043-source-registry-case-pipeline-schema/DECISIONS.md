# Pipeline Architecture Decisions — T043 Source Registry and Case Pipeline Schema

This document records the design and architectural decisions made for the Caesar AI Legal & Governance Case Atlas ingestion pipeline and source registry under task T043.

### [DEC-109] — 21 May 2026 — Ingestion Pipeline and Registry Architecture

#### Status: Approved

#### Decisions

1. **Adopted YAML for Monitored Sources (D11)**
   - Monitored case authorities, regulatory endpoints, and discovery catalog records are stored in a human-editable and programmatically readable YAML file: [sources.yml](file:///Users/nazarkoartem/Desktop/Projects/caesar-compliance/caesar-ai-incident-atlas/data/source-registry/sources.yml).
   
2. **Implemented Separated Ingestion Pipeline Schemas (D12)**
   - To keep ingestion clean and robust, separate schema objects were created for the three major states of candidate ingestion:
     - Registry Source: [source.schema.json](file:///Users/nazarkoartem/Desktop/Projects/caesar-compliance/caesar-ai-incident-atlas/schemas/pipeline/source.schema.json)
     - Raw Ingestion Candidate: [candidate.schema.json](file:///Users/nazarkoartem/Desktop/Projects/caesar-compliance/caesar-ai-incident-atlas/schemas/pipeline/candidate.schema.json)
     - Intermediate Draft: [case-draft.schema.json](file:///Users/nazarkoartem/Desktop/Projects/caesar-compliance/caesar-ai-incident-atlas/schemas/pipeline/case-draft.schema.json)
     
3. **Enforced Source Tier Invariant Gating (D13)**
   - Implemented strict programmatic rules whereby only Green Tier sources (official regulatory/government bodies) are allowed to be configured for automatic scanning (`auto_detect_allowed: true`) and candidate generation (`auto_draft_allowed: true`). Non-Green sources (Yellow and Red Tiers) must remain completely manual to protect data licensing and safety.
   
4. **Enforced Default Inactive Security State (D14)**
   - All source entries in the registry catalog must explicitly default to `status: inactive_draft`. Auto-publishing is programmatically blocked for every entry (`auto_publish_allowed` must be `false` in `sources.yml`).
   
5. **Established Local Isolation Validator (D15)**
   - Built a lightweight, offline-only validation script ([validate_pipeline_schemas.py](file:///Users/nazarkoartem/Desktop/Projects/caesar-compliance/caesar-ai-incident-atlas/tools/validate_pipeline_schemas.py)) that validates `sources.yml` against the JSON Schema and checks all procedural invariants. This validator functions locally without network connectivity.
   
6. **Mandated Clean-Room Drafting Invariants (D16)**
   - Laid down schema constraints and pipeline rules requiring original, neutral, Caesar-authored summaries in all candidate and draft records, precluding verbatim copying from third-party databases.

#### Rationale
Establishes a solid, safe, and isolated regulatory discovery model with strict compliance gates before any actual scanner or programmatic fetch mechanism is engineered.
