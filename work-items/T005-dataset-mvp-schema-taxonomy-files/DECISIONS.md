# Decisions — T005: Dataset MVP Schema and Taxonomy Files

**Work item:** T005
**Branch:** data/T005-dataset-mvp-schema-taxonomy-files
**Date:** 19 May 2026

---

## DEC-028 — Incident Schema Remains Lenient with 11 Required Fields

**Status:** Approved (T005 implementation decision)

**Decision:**

`schemas/incident.schema.json` requires only the 11 v0.2 required fields defined in `V0_2_FIELD_PRIORITY_TABLE.md` and DEC-018.

**Rationale:**

This preserves the approved MVP model and avoids over-constraining early curation. Optional fields remain optional.

---

## DEC-029 — T005 Taxonomy Files Include Stable IDs and Explicit Draft Marking

**Status:** Approved (T005 implementation decision)

**Decision:**

Taxonomy JSON files in `data/taxonomy/` include v0.2-stable entries and selected draft entries, with explicit `status` markers.

**Rationale:**

This keeps machine-readable files practical for MVP use while preserving clear boundaries on draft material (for example FM-REL handling and selected sector/control/evidence draft items).

---

## DEC-030 — data/incidents/ Remains Empty in T005

**Status:** Approved (T005 implementation decision)

**Decision:**

`data/incidents/` is created with `.gitkeep` only. No real or sample incident records are created in T005.

**Rationale:**

T005 is foundation work (schema/taxonomy/validation docs). Incident record creation is deferred to later controlled steps.

---

## DEC-031 — T006 Is the Next Step After T005

**Status:** Approved (T005 planning decision)

**Decision:**

The next step after T005 is likely T006 — First Incident Candidate Dossier Preparation, only after Control Tower approval.

T006 should prepare candidate dossiers with public source links and verification notes before any final incident records are created.

T006 must not mass-import external data.

**Rationale:**

Dossier-first sequencing preserves legal/sourcing controls and reduces the risk of low-quality or non-compliant incident records.
