# T006 Decisions Log

**Task:** T006 — First Incident Candidate Dossier Preparation  
**Branch:** `research/T006-first-incident-candidate-dossier-preparation`  
**Date:** 19 May 2026

---

## DEC-T006-001 — Dossier Format: Markdown Prose, Not JSON

**Decision:** Candidate dossiers are written as structured Markdown prose, not as JSON incident objects.

**Rationale:** Dossiers are pre-approval research documents. Writing them as JSON would risk confusion with final incident records and would violate the T006 constraint of no incident record creation. Markdown prose allows annotation, hedging language, open questions, and source notes that JSON fields cannot accommodate.

**Outcome:** All dossiers use a consistent Markdown template with labelled sections.

---

## DEC-T006-002 — Candidate ID Format: CAND-NNN

**Decision:** Provisional candidate IDs use the format `CAND-001`, `CAND-002`, etc.

**Rationale:** Distinct from final `INC-XXXX` IDs to prevent confusion and premature record creation. Candidate IDs are temporary and do not imply approval.

**Outcome:** All 15 dossiers use `CAND-001` through `CAND-015`.

---

## DEC-T006-003 — Source Approach: Public Primary Sources Only

**Decision:** Dossiers reference only publicly available primary sources (official reports, regulatory decisions, company announcements, court filings, academic papers). Discovery-only pointers to AIID or AIAAIC are noted but no data is copied from those databases.

**Rationale:** Aligned with `SOURCE_AND_CITATION_POLICY_DRAFT.md` and the no-external-dataset-import constraint. Discovery pointers are acceptable; copying structured data is not.

**Outcome:** Each dossier lists source URLs with source quality notes. Where sources are weak or secondary-only, the candidate is marked Postpone or Reject.

---

## DEC-T006-004 — Schema Usability Observations Recorded Here and in IMPLEMENTATION_REPORT.md

**Decision:** Schema friction observations noted during dossier preparation are recorded in this file and summarised in `IMPLEMENTATION_REPORT.md`. The schema itself (`schemas/incident.schema.json`) is not modified in T006 unless a clear typo is found.

**Rationale:** T006 is a research task, not a schema revision task. Observations should inform a future schema revision decision in T007 or a dedicated schema update task.

**Schema observations from dossier work:**

1. **`source.database` field is too narrow.** The field appears designed for structured database references (e.g., `AIID-12345`). For incidents sourced from regulatory reports or court filings, the `database` field is inapplicable. Recommend renaming to `source.reference` or making it optional with a `source.type` enum in a future revision.

2. **`evidence_required` as free text works for v0.2 but will not scale.** Mapping evidence IDs (`EV-001` etc.) directly as an array would be more useful. Consider switching to an array of taxonomy IDs post-MVP.

3. **`failure_modes` array accepts any string — no validation against taxonomy IDs.** The schema allows any string value. Adding an `enum` constraint or `$ref` to the taxonomy file would prevent drift. Low priority for v0.2 but should be in backlog.

4. **`incident_date` format is ISO 8601 but many public incidents only have year/month.** The schema requires `YYYY-MM-DD`. Partial dates (e.g., 2023-03) are common in public reporting. Consider allowing a `date_precision` field or relaxing the pattern in v0.3.

5. **`confidence` field enum matches taxonomy exactly — no friction observed.**

---

## DEC-T006-005 — 15 Candidate Dossiers Prepared

**Decision:** 15 candidate dossiers were prepared (within the 10–20 range), covering diverse failure mode categories and sectors.

**Rationale:** 15 provides sufficient diversity for the first MVP batch review while keeping the review manageable. Going beyond 15 would risk including lower-quality candidates that inflate the review burden without adding diversity value.

**Outcome:** 10 candidates recommended Accept, 3 recommended Postpone, 2 recommended Reject. See `FIRST_INCIDENT_SELECTION_RECOMMENDATION.md`.

---

## DEC-T006-006 — No Modification to `data/incidents/`

**Decision:** `data/incidents/` is not touched in T006. It remains empty except `.gitkeep`.

**Rationale:** Explicit T006 constraint. Incident record creation is gated on explicit Control Tower approval in T007.

**Outcome:** Confirmed — `data/incidents/` contains only `.gitkeep` after T006.
