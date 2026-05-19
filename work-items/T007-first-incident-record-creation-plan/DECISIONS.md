# T007 Decisions Log

**Task:** T007 — First Incident Record Creation Plan  
**Branch:** `docs/T007-first-incident-record-creation-plan`  
**Date:** 19 May 2026

---

## DEC-T007-001 — Schema `source.database` Field Must Be Renamed Before T008

**Decision:** The `source.database` field in `schemas/incident.schema.json` must be renamed before any real incident records are created in T008. The current enum `["AIID", "OECD", "AIAAIC", "MIT", "news", "official", "other"]` is too narrow and misrepresents the semantic meaning of the field for the approved candidates.

**Evidence from field mapping drafts:**

For the Tier 1 candidates:
- CAND-003 source is a US federal court record → not a "database"; "official" is a workaround, not accurate
- CAND-006 source is an NTSB government investigation report → "official" is the closest enum value but hides the source type
- CAND-011 source is a Canadian civil tribunal ruling → no accurate enum value; "official" is a loose fit
- CAND-012 source is a Dutch court ruling → same problem

For Tier 2/3:
- CAND-002 uses NIST government evaluation reports and ACLU documentation → "official" for NIST; no fit for ACLU
- CAND-004 uses Reuters investigative journalism → "news" fits but the field is named `database`, which is misleading
- CAND-010 uses a peer-reviewed academic journal → no enum value for "academic"

**Proposed rename for T008 schema update:**

Rename `database` to `source_type`. Change enum to:
```json
["court_record", "government_report", "regulatory_decision", "company_statement", "news", "academic", "civil_tribunal", "legislative", "other"]
```

Or rename to `publisher` with a free-text field if controlled vocabulary proves too rigid.

**Action:** Create a schema update task (or include in T008 scope) to rename `source.database` before any records are committed. Do not commit records against the current schema until this is resolved.

**Rationale:** Field naming accuracy matters for downstream consumers. `database` implies a structured external database reference, not a general source type. All approved candidates require source types not cleanly expressible in the current enum.

---

## DEC-T007-002 — Tier 1 First Wave: CAND-003, CAND-006, CAND-011, CAND-012

**Decision:** T008 scope is limited to the four Tier 1 candidates. Second-wave candidates (Tier 2/3) are planned but not part of T008 unless Control Tower explicitly expands scope.

**Rationale:** Tier 1 candidates all have unambiguous primary official sources (court records, NTSB government report). Starting with the strongest sources minimises risk of schema, citation, or wording errors in the first production records.

---

## DEC-T007-003 — `incident_date` Precision Workaround for v0.2

**Decision:** The current schema `date` pattern `^[0-9]{1,2} [A-Z][a-z]+ [0-9]{4}$` requires day-level precision (e.g., "19 May 2026"). Several approved candidates only have month or year precision in public sources.

**Workaround for T008:**
- Where exact date is in the primary source, use exact date (e.g., NTSB report gives "18 March 2018").
- Where only month/year is available, use the last day of the month as a conservative approximation AND add a `date_note` field in the JSON with the actual precision (e.g., `"date_note": "Month/year only — exact date not confirmed in public sources"`).
- Where only a year is available, use "1 January YYYY" with a `date_note`.

**Long-term:** Propose a `date_precision` enum field (`day`, `month`, `year`) in v0.3 schema.

---

## DEC-T007-004 — `evidence_required` Free-Text Strings Mapped to EV-XXX IDs

**Decision:** For T008 records, `evidence_required` array entries will use the format `"EV-XXX — [description]"` (e.g., `"EV-004 — Human oversight record"`). This allows free-text compliance with v0.2 schema while embedding taxonomy IDs for future structured parsing.

**Rationale:** v0.2 schema allows any string in `evidence_required`. Using the EV-XXX prefix makes records forward-compatible with a future array-of-IDs approach without requiring a schema change now.

---

## DEC-T007-005 — `failure_modes` and `controls` Arrays Use Taxonomy IDs Only

**Decision:** `failure_modes` and `controls` array entries in T008 records must use the exact taxonomy IDs from `data/taxonomy/failure_modes.json` and `data/taxonomy/controls.json` (e.g., `"FM-HALL"`, `"CTL-OVER-001"`). No free-text entries.

**Rationale:** The v0.2 schema validates the pattern `^FM-[A-Z0-9-]+$` and `^CTL-[A-Z0-9-]+$` but does not validate against the taxonomy file. Using canonical IDs prevents drift and ensures forward compatibility.

---

## DEC-T007-006 — Lessons Field Must Be Governance-Oriented, Not Incident Description

**Decision:** The `lessons` array in each record must contain actionable governance lessons, not re-descriptions of the incident. Each lesson should reference a control gap or improvement opportunity.

**Format guidance:**
- Do: `"Organisations should ensure AI systems with patient-facing outputs are subject to mandatory human clinical review before delivery."`
- Don't: `"The chatbot gave wrong medical advice."`

**Rationale:** The Atlas's primary value is the governance mapping layer. Lessons must be useful to compliance teams, not just descriptive.

---

## DEC-T007-007 — `summary` Field: Original Caesar Writing Only

**Decision:** The `summary` field in every record must be written entirely in Caesar's own words. No copying or paraphrasing of source text. Careful hedging language required for facts from secondary sources.

**Required conventions:**
- "According to [source]..." for facts drawn from a single primary source
- "Reportedly..." or "Multiple reports indicate..." for facts from secondary sources
- "A [court/tribunal/regulator] found that..." for judicially or officially confirmed facts
- No unsupported assertions of legal liability, breach, or fault
- No defamatory language

---

## DEC-T007-008 — Schema Modification Deferred to T008 Pre-Work

**Decision:** `schemas/incident.schema.json` is not modified in T007. All schema friction observations are documented here and in IMPLEMENTATION_REPORT.md. A schema update (renaming `source.database`) should be the first action in T008, before any records are created.

**Rationale:** T007 is a planning task. Schema changes in a planning task would be premature and out of scope.
