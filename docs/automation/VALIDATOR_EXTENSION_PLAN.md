# Validator Extension Plan

## 1. Overview
The Caesar AI Legal & Governance Case Atlas validator (`tools/validate_dataset.py`) currently ensures index-to-file consistency, checks taxonomy assignments, and validates the 12 public incident records against the core incident schema. 

This **Validator Extension Plan** outlines the architecture for integrating registry, candidate, and draft checks into a unified compliance validation suite.

---

## 2. Future Automated Validation Checks

### A. Source Registry Validation
- **Requirement:** Ensure all sources in `data/source-registry/sources.yml` are perfectly formed.
- **Rules:**
  - Validate each entry against `schemas/pipeline/source.schema.json`.
  - Confirm `status` is one of `active_monitoring`, `inactive_draft`, or `deprecated`.
  - Confirm that only official regulators/courts (Green Tier) have `auto_detect_allowed: true` or `auto_draft_allowed: true`.
  - Enforce `auto_publish_allowed: false` across all sources (or trigger a security exception if true).

### B. Candidate Schema Validation
- **Requirement:** Validate ingestion-stage logs.
- **Rules:**
  - Validate each entry in `data/candidates/*.json` against `schemas/pipeline/candidate.schema.json`.
  - Confirm `candidate_id` is unique and follows the `CAND-NNNN` sequence.
  - Verify that `source_id` exists in the Source Registry.

### C. Case Draft Schema Validation
- **Requirement:** Validate intermediate drafting-stage records.
- **Rules:**
  - Validate each entry in `data/drafts/*.json` against `schemas/pipeline/case-draft.schema.json`.
  - Check that referenced `candidate_ids` exist in candidate logs.
  - Enforce taxonomy matching on `failure_mode` and `missing_controls`.

### D. No Copied Text Heuristic
- **Requirement:** Verify clean-room status of drafts.
- **Heuristic Check:**
  - Implement a localized TF-IDF or simple substring comparison checking the `clean_room_summary` text against candidate web-scrapes or external snippets to detect potential copyright violations.

### E. Block Public Promotion from Drafts
- **Requirement:** Ensure no drafts are exposed on the live site.
- **Rules:**
  - The static build scripts must strictly exclude `data/drafts/` and `data/candidates/` from the output compiled to the `site/` folder.
  - Fail the build if any draft files are found under `site/data/`.

### F. Digest Eligibility Checks
- **Requirement:** Validate digest publication lists.
- **Rules:**
  - Ensure only approved public cases are featured in the static weekly/monthly briefings.
  - Verify that RSS feed titles and descriptions are clean, original Caesar prose.

---

## 3. T045 Implementation: Mock Safety Containment Auditor
As part of the T045 Offline Mock Auto-Discovery Prototype, a lightweight schema and safety validator has been deployed:
- **`tools/validate_mock_schemas.py`**: Executes strict JSON schema compliance checks against `candidate.schema.json` and `case-draft.schema.json` using system Python `jsonschema` utilities.
- **`scripts/validate-mock-pipeline.mjs`**: A comprehensive containment auditor validating file-level sandboxing, safety labeling (synthetic flags), registry configs, and ensuring absolutely no leaking into the client-facing sitemaps or public `site/` files.
