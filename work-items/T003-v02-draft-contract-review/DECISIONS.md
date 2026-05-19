# Decisions — T003: v0.2 Draft Contract Review and Reconciliation

**Work item:** T003
**Date:** 19 May 2026

---

These decisions are also recorded in `docs/DECISION_LOG.md` as DEC-015 through DEC-022.

---

### D-T003-001 — Incident IDs: sequential four-digit format INC-0001

Sequential IDs with `INC-` prefix, zero-padded to four digits. Rationale: simpler to manage, no content assumptions encoded, room for 9,999 records without format change.

---

### D-T003-002 — Evidence requirements: free-text strings for v0.2

The `evidence_required` field uses free-text strings, not EV- ID references. EV- IDs deferred to v0.3 once the evidence type registry is stable and curation process is mature.

---

### D-T003-003 — Export format: one file per incident

One export file per incident, not a single combined file. Combined export can always be generated from individual files; the reverse is harder.

---

### D-T003-004 — Schema strictness: lenient, 11 required fields

Only 11 fields are required for v0.2: incident_id, title, date, sources, summary, failure_modes, severity, confidence, controls, evidence_required, lessons. All other fields are optional or deferred. Rationale: strict schema slows curation; lenient schema allows fast first batch.

---

### D-T003-005 — Taxonomy versioned together with dataset

Breaking changes (changing/removing IDs) require major version bump. Additive changes (new sub-categories) do not. Rationale: taxonomy and dataset are tightly coupled; separate versioning adds complexity without benefit.

---

### D-T003-006 — FM-REL sub-categories are draft; use top-level FM-REL only in v0.2

FM-REL top-level is stable. Sub-categories FM-REL-001 through FM-REL-004 are draft and should not be used in v0.2 records. Rationale: reliability incidents are harder to document from public sources; sub-categories may need refinement after first batch.

---

### D-T003-007 — system_type is free-text for v0.2; controlled vocabulary deferred

Free-text allows curators to describe system types naturally. Controlled vocabulary will be derived from patterns in the first batch of records. Rationale: defining vocabulary before seeing data risks creating categories that don't match reality.

---

### D-T003-008 — T004 is next step; no data ingestion in T004 without separate approval

T004 prepares the implementation plan and candidate selection. No incident records are created in T004 unless separately approved. Rationale: staged approach reduces rework risk.

---

### D-T003-009 — Three overfitting-risk fields deferred: risk_categories, ai_system_name, organization

These fields risk overfitting to competitor data models (AIID, MIT tracker) or creating legal risk (naming organizations/individuals). All three deferred to v0.3 with strict citation requirements when introduced.

---

### D-T003-010 — Source confidence requires Tier 1 source for "high"; two independent sources for "medium"

Never assign `high` confidence based on news coverage alone. `high` requires at least one official source (regulatory decision, court record, official investigation). `medium` requires at least two independent Tier 2 or Tier 3 sources.
