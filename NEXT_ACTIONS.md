# Next Actions — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Execution Boundaries

This repository is in the **documentation and blueprint** phase. No product code, no package managers, no dependencies until v0.3 Dataset MVP begins.

---

## Prioritized Next Steps

### 1. Define JSON Schemas (v0.3 start)

Define JSON Schema files for:
- `schemas/incident.schema.json` — incident record schema
- `schemas/taxonomy.schema.json` — failure mode and control taxonomy schema
- `schemas/mapping.schema.json` — incident-to-control and control-to-evidence mapping schema

These schemas must be compatible with the `caesar-ai-evidence` format.

Requires: Control Tower review of DATA_MODEL_DRAFT.md before implementation.

### 2. Build Taxonomy Data Files (v0.3)

Create the taxonomy JSON files:
- `data/taxonomy/failure-modes.json` — full failure mode taxonomy
- `data/taxonomy/controls.json` — control taxonomy
- `data/taxonomy/evidence-types.json` — evidence type registry
- `data/taxonomy/sectors.json` — sector taxonomy

Based on: [docs/TAXONOMY_DRAFT.md](docs/TAXONOMY_DRAFT.md)

### 3. Curate First 10–20 Incident Records (v0.3)

Curate the first batch of incident records:
- Select incidents from public sources (AIID, OECD, AIAAIC, MIT tracker, official reports).
- Verify source licenses before using any data.
- Write original summaries based on publicly available information.
- Apply failure mode taxonomy.
- Map to controls and evidence requirements.
- Validate against incident schema.

Requires: Control Tower approval of source selection and citation approach.

### 4. Build Validation Script (v0.3)

Write a simple validation script that:
- checks incident records against the JSON Schema;
- verifies required fields are present;
- checks that all referenced taxonomy IDs exist;
- reports validation errors.

No external dependencies. Use standard library only.

### 5. Build Export Script (v0.3 / v0.5)

Write an export script that:
- reads incident records and mappings;
- generates `caesar-ai-evidence` compatible JSON;
- outputs to `exports/` directory.

---

## Safe Autonomous Tasks

The following tasks can be executed autonomously without Control Tower approval:

- Improving documentation formatting and clarity.
- Adding examples to TAXONOMY_DRAFT.md or DATA_MODEL_DRAFT.md.
- Updating REPO_INVENTORY.md when new files are added.
- Updating CHANGELOG.md with accurate entries.
- Fixing typos or broken links in documentation.

---

## Tasks Requiring Control Tower Approval

The following tasks require Artem / Control Tower review before execution:

- Implementing any product code (schemas, scripts, data files).
- Selecting incident sources and verifying data licenses.
- Choosing the static site generator technology.
- Defining the export format for `caesar-ai-evidence`.
- Any cross-repository changes or integrations.
- Modifying taxonomy structures after initial definition.

---

## Blocked Tasks

None currently blocked.

---

## Cross-Repository Coordination Notes

- Incident export format must be compatible with `caesar-ai-evidence` incident-mapping schema.
- Verify schema compatibility with `caesar-ai-evidence` before finalizing incident schema.
- Future Governance OS integration requires stable incident IDs and taxonomy IDs.
- Do not edit `caesar-ai-evidence` or any sibling repository from this repository.
