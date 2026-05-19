# Development Roadmap — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Status:** Blueprint phase complete. Dataset and site phases planned.

---

## Phase Overview

```
v0.1 Foundation
  → v0.2 Blueprint
    → v0.3 Dataset MVP
      → v0.4 Static Site
        → v0.5 Export Integration
          → v1.0 Stable Public Release
            → v1.x Governance OS Integration
```

---

## Phase v0.1 — Repository Foundation

**Status:** Complete (19 May 2026)

**Goal:** Establish clean repository layout, standards documentation, and ecosystem alignment.

**Deliverables:**
- Repository scaffolding aligned with Caesar AI Governance Hub standards.
- Initial SPEC.md, ARCHITECTURE.md, ROADMAP.md, CHANGELOG.md, REPO_INVENTORY.md.
- PROJECT_STATE.md, NEXT_ACTIONS.md, docs/DECISION_LOG.md.
- docs/RESEARCH_CONTEXT.md with domain research.

---

## Phase v0.2 — Full-Scale Blueprint

**Status:** Complete (19 May 2026)

**Goal:** Define the full-scale product vision, data model, taxonomy, competitor benchmarks, and UI/UX vision. No implementation code.

**Deliverables:**
- Updated README.md with full product description.
- Updated SPEC.md with complete product specification.
- Updated ARCHITECTURE.md with data model and system design.
- Updated ROADMAP.md (this file).
- Updated PROJECT_STATE.md and NEXT_ACTIONS.md.
- Updated docs/DECISION_LOG.md.
- docs/COMPETITOR_BENCHMARKS.md — detailed competitor and benchmark analysis.
- docs/FULL_SCALE_PRODUCT_BLUEPRINT.md — full-scale product blueprint.
- docs/DATA_MODEL_DRAFT.md — incident data model and schema draft.
- docs/TAXONOMY_DRAFT.md — failure mode and control taxonomy.
- docs/UI_UX_VISION.md — public site and search UI vision.

---

## Phase v0.3 — Dataset MVP

**Status:** Planned

**Goal:** Build the first working incident dataset with 10–20 curated incident records, taxonomy definitions, and control mappings.

**Deliverables:**
- JSON Schema definitions for incident, taxonomy, control, and evidence records.
- Failure mode taxonomy (JSON).
- Control taxonomy (JSON).
- Evidence type registry (JSON).
- Sector taxonomy (JSON).
- 10–20 curated incident records with full metadata, source citations, and control mappings.
- Control-to-evidence mappings.
- Basic validation script to check incident records against schemas.
- Export script generating caesar-ai-evidence compatible JSON.

**Quality gates:**
- Every incident record has at least one verified public source.
- Every incident record has at least one failure mode, one control, and one evidence requirement.
- All records pass JSON Schema validation.
- No legal claims in incident summaries.
- No competitor data copied without license verification.

---

## Phase v0.4 — Static Site

**Status:** Planned

**Goal:** Build a public searchable static site at `incidents.caesar.no`.

**Deliverables:**
- Static site generator (technology to be decided in v0.3).
- Incident index page with search and filters.
- Individual incident card pages.
- Failure mode taxonomy pages.
- Control recommendation pages.
- Sector filter pages.
- Client-side search index.
- Deployment to `incidents.caesar.no`.

**Quality gates:**
- Site is accessible (WCAG 2.1 AA target).
- Site loads without a backend.
- Search works client-side.
- All incident cards display source citations.
- Disclaimer is visible on all pages.

---

## Phase v0.5 — Export Integration

**Status:** Planned

**Goal:** Formalize export to `caesar-ai-evidence` and prepare for Governance OS integration.

**Deliverables:**
- Stable export format for `caesar-ai-evidence` incident-mapping schema.
- Export CLI command or script.
- Integration documentation for `caesar-ai-evidence`.
- Sector-specific risk profile exports.
- Evidence gap report generation based on incident patterns.

---

## Phase v1.0 — Stable Public Release

**Status:** Planned

**Goal:** First stable public release with a curated dataset, public site, and evidence export.

**Deliverables:**
- 50+ curated incident records across all major failure mode categories.
- Full taxonomy coverage.
- Public site live at `incidents.caesar.no`.
- Stable export format.
- Documentation complete.
- CHANGELOG and versioning up to date.

---

## Phase v1.x — Governance OS Integration

**Status:** Future

**Goal:** Integrate the Atlas as a risk library module inside Caesar AI Governance OS.

**Deliverables:**
- Risk library API for Governance OS.
- Client workspace risk view.
- Control recommendations linked to client control library.
- Evidence gap alerts based on sector-specific incident patterns.
- New incident notifications in client risk intelligence inbox.

---

## Future Considerations

The following are longer-term possibilities, not committed roadmap items:

- Training and workshop material packs for sector-specific AI governance training.
- Automated monitoring of public incident databases for new entries (requires careful license review).
- Trend analysis and risk intelligence reports.
- Structured incident reporting template for organizations to submit new incidents.
- Integration with `caesar-ai-regulation-watch` to link incidents to regulatory obligations.
- Integration with `caesar-ai-scan` to flag codebases with patterns associated with known incident types.
