# First Incident Record Creation Plan

> **Planning document — not an incident record.**  
> This document defines the process for converting approved T006 candidates into final incident records in T008. No incident records are created in T007.  
>
> **Prepared:** 19 May 2026  
> **Task:** T007 — First Incident Record Creation Plan  
> **Branch:** `docs/T007-first-incident-record-creation-plan`

---

## 1. Purpose

This plan defines:
- how approved candidate dossiers will be converted into final incident records;
- the order of operations for record creation;
- required pre-creation source checks;
- how to assign `INC-XXXX` IDs;
- how to map candidate facts into schema fields;
- how to avoid unsupported conclusions and copied source text;
- how to keep governance lessons clearly separated from factual descriptions;
- what must be reviewed before committing any real record.

This plan is the operational contract for T008 and any subsequent record creation tasks.

---

## 2. Pre-Conditions Before T008 Can Begin

All of the following must be satisfied before T008 may create any incident record:

### 2.1 Schema Pre-Work (Required Before First Record)

1. **Rename `source.database` field** in `schemas/incident.schema.json`.
   - Current field name `database` and its enum `["AIID", "OECD", "AIAAIC", "MIT", "news", "official", "other"]` are too narrow for the approved candidates.
   - Proposed rename: `source_type` with an expanded enum including `court_record`, `government_report`, `regulatory_decision`, `company_statement`, `news`, `academic`, `civil_tribunal`, `legislative`, `other`.
   - This must be the first action in T008 before any records are written.
   - See `work-items/T007.../DECISIONS.md` DEC-T007-001 for full rationale.

2. **Confirm `date` field workaround** for partial-precision dates.
   - Pattern requires `DD Month YYYY`. Where only month/year is known, use last day of month + `date_note` field.
   - See DEC-T007-003.

### 2.2 Control Tower Sign-Off

- Control Tower must explicitly approve T008 initiation.
- Control Tower must confirm which candidates are in scope for T008 (currently: Tier 1 only — CAND-003, CAND-006, CAND-011, CAND-012).

### 2.3 Source Verification per Candidate

For each candidate in T008 scope, complete source verification per `SOURCE_VERIFICATION_WORKFLOW.md`:
- Confirm the primary source URL is still live and accessible.
- Record the access date.
- Confirm the source content matches the summarised facts.
- Confirm no license conflict prevents citation.

---

## 3. Order of Operations for Each Record

For each approved candidate, follow this sequence:

### Step 1 — Source Verification
- Verify primary source URL is accessible.
- Check content matches known facts.
- Record access date (format: `DD Month YYYY`).
- Check `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` for any license flag.
- If primary source is unavailable → stop, do not create the record, flag to Control Tower.

### Step 2 — Field Mapping
- Map candidate dossier facts to schema fields using `INCIDENT_FIELD_MAPPING_DRAFTS.md`.
- Confirm all 11 required fields can be populated.
- Identify any fields that must remain blank or use conservative values.
- Use `SOURCE_TO_FIELD_TRACEABILITY_MATRIX.md` to confirm which source supports each field.

### Step 3 — Summary Drafting
- Write a short, original summary in Caesar's own words.
- Apply hedging language per `SOURCE_AND_CITATION_POLICY_DRAFT.md`.
- Do not copy or paraphrase source text.
- For judicially confirmed facts: `"The [court/tribunal] found that..."`
- For secondary-source facts: `"According to reporting by [outlet]..."`
- Maximum ~150 words for v0.2 summaries.

### Step 4 — Failure Mode, Control, Evidence, Lesson Assignment
- Assign failure mode IDs from `data/taxonomy/failure_modes.json` (exact IDs only).
- Assign control IDs from `data/taxonomy/controls.json` (exact IDs only).
- Populate `evidence_required` using `"EV-XXX — [description]"` format.
- Write governance lessons (actionable, not incident re-description).

### Step 5 — ID Assignment
- Assign the next sequential `INC-XXXX` ID.
- IDs are assigned in order: INC-0001, INC-0002, INC-0003, INC-0004 for the four Tier 1 candidates.
- Proposed order: CAND-003 → INC-0001, CAND-006 → INC-0002, CAND-011 → INC-0003, CAND-012 → INC-0004.
- IDs must not be assigned until Control Tower confirms the sequence.

### Step 6 — JSON Record Creation
- Create `data/incidents/INC-XXXX.json` using the structure defined in `schemas/incident.schema.json`.
- Validate the JSON against the schema before committing.
- Confirm no syntax errors.

### Step 7 — QA Review
- Run `RECORD_CREATION_QA_CHECKLIST.md` for the record.
- All checklist items must pass before the record is committed.

### Step 8 — Commit
- Stage and commit the new record file only.
- Commit message format: `data: add incident record INC-XXXX — [short title] (T008)`
- Do not batch multiple records into a single commit unless explicitly approved.

---

## 4. ID Assignment Rules

- IDs are sequential integers, zero-padded to 4 digits: `INC-0001`, `INC-0002`, etc.
- IDs are permanent once assigned — never reuse or renumber.
- The ID sequence is: first T008 Tier 1 records get INC-0001 through INC-0004.
- Second-wave records (T009 or later) continue from INC-0005.
- If a planned record is rejected after ID assignment, the ID is retired (not reused), and a `retired_ids.md` note is added to the repository.

---

## 5. Field Mapping Rules

### Required Fields (all 11 must be present)

| Field | Notes |
|---|---|
| `incident_id` | Assign sequentially; confirm with Control Tower before use |
| `title` | Short, neutral, factual title. No sensationalism. |
| `date` | Use primary source date. Apply DEC-T007-003 workaround if partial precision. |
| `sources` | At least one source entry. All required sub-fields (`url`, `source_type`, `accessed`, `title`). Note: `database` → `source_type` after schema rename. |
| `summary` | Original Caesar writing. Hedging language. ≤150 words for v0.2. |
| `failure_modes` | Array of taxonomy IDs (FM-XXX). Minimum 1. |
| `severity` | One of: `low`, `medium`, `high`, `critical`. |
| `confidence` | One of: `low`, `medium`, `high`. |
| `controls` | Array of taxonomy IDs (CTL-XXX). Minimum 1. |
| `evidence_required` | Array of strings. Use `"EV-XXX — [description]"` format. |
| `lessons` | Array of actionable governance lesson strings. Minimum 1. |

### Optional Fields

| Field | Notes |
|---|---|
| `sector` | Array. Use taxonomy IDs from `data/taxonomy/sectors.json` where available. |
| `system_type` | Free text. Brief AI system description (e.g., "LLM-based legal research tool"). |
| `harms` | Array. Brief harm descriptions in Caesar's own words. |
| `affected_stakeholders` | Array. General stakeholder categories only — no names of private individuals. |
| `impact` | Free text. Consequences confirmed by source. |
| `related_incidents` | Array of `INC-XXXX` IDs. Only after multiple records exist. |

### Fields That Must Remain Blank or Conservative

- Do not populate `affected_stakeholders` with names of private individuals.
- Do not assert specific harm figures unless confirmed by primary source.
- Do not populate `related_incidents` until multiple records exist and relationships are confirmed.
- Do not use `high` confidence unless at least one Tier 1 official source is confirmed.

---

## 6. Avoiding Unsupported Conclusions

### Prohibited
- "The company violated GDPR." → No. Use: "The court found the processing was unlawful under applicable data protection law."
- "The AI caused the accident." → No. Use: "The NTSB investigation identified the AI perception system as a contributing factor."
- "The algorithm is racist." → No. Use: "Studies and official evaluation data indicate differential error rates across demographic groups."
- Any statement asserting legal liability not confirmed by a court, regulator, or official body.
- Any statement of intent (e.g., "deliberately", "knowingly") without official confirmation.

### Required
- Hedging language for secondary source facts.
- Attribution for all factual claims: "According to [source]..." or "The [body] found that..."
- "Reportedly" for facts from media sources not confirmed by primary sources.
- Neutral, descriptive titles — no blame framing in the title field.

---

## 7. Avoiding Copied Source Text

- Do not copy any sentence or substantial phrase from a source document.
- Do not paraphrase a source so closely that the structure is identical with word substitutions.
- Write each summary from scratch using your knowledge of the facts.
- If a fact is important to include, verify it from the source and then write it in new words.
- Court ruling quotes: if a direct quote is essential, use `"` markers and cite the exact paragraph/page. Keep quotes minimal and necessary only.

---

## 8. Keeping Governance Lessons Separate from Factual Descriptions

The `summary` field describes what happened.  
The `lessons` field describes what governance controls the incident demonstrates are needed.

These must not overlap:
- `summary`: "The chatbot is reported to have provided a customer with incorrect bereavement fare discount information. The BC Civil Resolution Tribunal found the company bound by the chatbot's representation."
- `lessons`: NOT "The chatbot gave wrong information." (→ that belongs in summary)
- `lessons`: YES "Organisations deploying AI agents in customer-facing roles should define explicit agent scope boundaries and ensure customers can escalate to a human representative for consequential commitments."

Each lesson should:
- reference a control gap (what control was missing or failed);
- be actionable for a compliance team;
- be sector-agnostic where possible (generalise the lesson beyond the specific case).

---

## 9. Pre-Commit Review Checklist

Before committing any record to `data/incidents/`, verify:

- [ ] JSON validates against `schemas/incident.schema.json` (after schema rename is applied)
- [ ] All 11 required fields present and non-empty
- [ ] `incident_id` follows `INC-XXXX` format and is the next sequential ID
- [ ] `summary` is original Caesar writing — no copied text
- [ ] `summary` uses appropriate hedging language
- [ ] `failure_modes` entries match taxonomy IDs exactly
- [ ] `controls` entries match taxonomy IDs exactly
- [ ] `evidence_required` entries use `"EV-XXX — description"` format
- [ ] `lessons` entries are governance-oriented, not incident re-descriptions
- [ ] `sources` array has at least one entry with all required sub-fields
- [ ] Source URL was verified live on the access date
- [ ] No unsupported legal conclusions
- [ ] No defamatory language
- [ ] No private individual names in `affected_stakeholders`
- [ ] `RECORD_CREATION_QA_CHECKLIST.md` completed for this record
- [ ] `git diff` reviewed before staging

See `RECORD_CREATION_QA_CHECKLIST.md` for the full checklist.

---

## 10. Schema Update Required Before T008

The following schema change must be made as the first action in T008:

**Current `source` object:**
```json
{
  "required": ["url", "database", "accessed"],
  "properties": {
    "database": {
      "type": "string",
      "enum": ["AIID", "OECD", "AIAAIC", "MIT", "news", "official", "other"]
    }
  }
}
```

**Proposed `source` object (T008 pre-work):**
```json
{
  "required": ["url", "source_type", "accessed"],
  "properties": {
    "source_type": {
      "type": "string",
      "enum": [
        "court_record",
        "government_report",
        "regulatory_decision",
        "company_statement",
        "news",
        "academic",
        "civil_tribunal",
        "legislative",
        "other"
      ]
    }
  }
}
```

This change must be approved by Control Tower before T008 begins.

---

## 11. T008 Scope Boundary

T008 creates only the four Tier 1 records:
- CAND-003 → `INC-0001`
- CAND-006 → `INC-0002`
- CAND-011 → `INC-0003`
- CAND-012 → `INC-0004`

T008 does not create second-wave records unless Control Tower explicitly expands scope. Second-wave records (Tier 2/3 candidates) are planned for T009 or a subsequent record batch task.
