# Dataset MVP Implementation Plan — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.3 (plan — not yet implemented)
**Status:** Planning document. No implementation has begun. Requires Control Tower approval before v0.3 starts.
**Work item:** T004

---

## Purpose

This document defines what the Dataset MVP is, what it does not include, how it will be structured, and what must be approved before any incident records are created. It is a planning document only. No schemas, data files, or code are created here.

This document is the primary reference for the v0.3 Dataset MVP phase. It translates the stable v0.2 contract (`V0_2_DRAFT_PRODUCT_CONTRACT.md`) into a concrete implementation plan.

---

## 1. What Dataset MVP Means

The Dataset MVP (v0.3) is the first working version of the Caesar AI Incident Atlas dataset. It consists of:

- a defined folder structure for incident records and taxonomy files;
- JSON Schema definitions for incident records, taxonomy records, and export records;
- a curated set of 10–20 incident records with full metadata, source citations, and control mappings;
- taxonomy JSON files (failure modes, controls, evidence types, sectors) aligned with the v0.2 contract;
- control-to-evidence mapping documentation;
- a basic validation approach to check incident records against the schema;
- an export format definition for `caesar-ai-evidence` compatible output.

The Dataset MVP demonstrates that the Atlas data model works in practice, that the taxonomy is usable for real incident curation, and that the governance mapping layer (incident → controls → evidence) produces useful output.

---

## 2. What Dataset MVP Does Not Include

The following are explicitly out of scope for v0.3 Dataset MVP:

| Out of scope | Reason |
|---|---|
| Static site or public website | Planned for v0.4 — data must be stable first |
| Export CLI or automation scripts | Planned for v0.5 — manual export sufficient for MVP |
| Governance OS integration | Planned for v1.x — platform not yet built |
| More than 20 incident records | Quality over quantity; first batch must be well-curated |
| Automated scraping or data ingestion | Prohibited by SOURCE_AND_CITATION_POLICY_DRAFT.md |
| Incident records without verified sources | Every record requires at least one verified public source |
| Executable validation scripts | Planned for v0.3 but requires separate approval; manual validation acceptable for MVP |
| Training material packs | Future phase |
| Risk intelligence reports | Future phase |
| Regulatory reference mapping | Deferred — risk of implying compliance determinations |
| Organization or AI system name fields | Deferred — legal risk; see V0_2_FIELD_PRIORITY_TABLE.md |

---

## 3. Proposed Folder Structure for Future Incident Records

The following folder structure is proposed for v0.3. It is not yet created. Creating these folders and files requires Control Tower approval.

```
caesar-ai-incident-atlas/
│
├── data/
│   ├── incidents/
│   │   ├── INC-0001.json          ← individual incident records (one file per incident)
│   │   ├── INC-0002.json
│   │   └── ...
│   │
│   ├── taxonomy/
│   │   ├── failure-modes.json     ← failure mode taxonomy (FM- IDs)
│   │   ├── controls.json          ← control taxonomy (CTL- IDs)
│   │   ├── evidence-types.json    ← evidence type registry (EV- IDs)
│   │   └── sectors.json           ← sector taxonomy
│   │
│   └── mappings/
│       ├── incident-controls.json     ← incident → control mappings (supplementary)
│       └── control-evidence.json      ← control → evidence mappings (supplementary)
│
├── schemas/
│   ├── incident.schema.json       ← JSON Schema for incident records
│   ├── taxonomy.schema.json       ← JSON Schema for taxonomy records
│   └── export.schema.json         ← JSON Schema for caesar-ai-evidence export records
│
└── exports/
    └── .gitkeep                   ← generated exports go here (not committed)
```

### Folder creation notes

- The `data/`, `schemas/`, and `exports/` directories do not exist yet.
- They will be created as part of v0.3 implementation, after Control Tower approval.
- The `exports/` directory will contain generated files and should be listed in `.gitignore` or kept empty with a `.gitkeep`.
- Individual incident files use the `INC-0001` format (four-digit zero-padded sequential IDs, as resolved in DEC-015).

---

## 4. Proposed Schema and Taxonomy Implementation Steps

The following steps are proposed for v0.3. They are not yet executed. Each step requires the previous step to be complete before proceeding.

### Step 1: Create JSON Schema files (schemas/)

Create the three JSON Schema files that define the structure of all data records:

1. `schemas/incident.schema.json` — validates individual incident records against the 11 required fields defined in `V0_2_FIELD_PRIORITY_TABLE.md`.
2. `schemas/taxonomy.schema.json` — validates taxonomy records (failure modes, controls, evidence types, sectors).
3. `schemas/export.schema.json` — validates the `caesar-ai-evidence` export format defined in `V0_2_DRAFT_PRODUCT_CONTRACT.md` section 9.

Schema design principles:
- Use JSON Schema draft 2020-12.
- Enforce only the 11 required fields for incident records (lenient schema per DEC-018).
- Use `enum` for controlled vocabulary fields (severity, confidence, failure_mode prefix pattern, control prefix pattern).
- Use `pattern` for ID format validation (INC-0001, FM-, CTL-, EV-).
- Do not add fields not defined in the v0.2 contract without a new decision log entry.

### Step 2: Create taxonomy JSON files (data/taxonomy/)

Create the four taxonomy files that define the controlled vocabularies:

1. `data/taxonomy/failure-modes.json` — all FM- IDs from `docs/TAXONOMY_DRAFT.md`, with stable/draft status from `V0_2_TAXONOMY_REVIEW.md`.
2. `data/taxonomy/controls.json` — all CTL- IDs from `docs/TAXONOMY_DRAFT.md`.
3. `data/taxonomy/evidence-types.json` — all EV- IDs from `docs/TAXONOMY_DRAFT.md`.
4. `data/taxonomy/sectors.json` — all sector IDs from `docs/TAXONOMY_DRAFT.md`.

Taxonomy implementation notes:
- Include only stable and draft IDs from `V0_2_TAXONOMY_REVIEW.md`.
- Mark draft IDs clearly in the taxonomy files.
- Do not use FM-REL sub-categories (FM-REL-001 through FM-REL-004) in v0.2 incident records — use top-level FM-REL only.
- Do not add new IDs without a decision log entry.

### Step 3: Create mapping files (data/mappings/)

Create the two supplementary mapping files:

1. `data/mappings/incident-controls.json` — maps each incident ID to its control IDs (supplementary to the inline controls field in each incident record).
2. `data/mappings/control-evidence.json` — maps each control ID to its evidence type IDs.

These files are supplementary. The primary mapping data lives in the individual incident records. The mapping files provide a machine-readable index for future tooling.

### Step 4: Curate incident records (data/incidents/)

Create the first 10–20 incident records following:
- `FIRST_INCIDENT_SELECTION_CRITERIA.md` (created in T004) for which incidents to select.
- `SOURCE_VERIFICATION_WORKFLOW.md` (created in T004) for how to verify sources.
- `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` (created in T004) for license safety.
- `SOURCE_AND_CITATION_POLICY_DRAFT.md` for wording rules.
- `V0_2_FIELD_PRIORITY_TABLE.md` for required fields.
- `V0_2_DRAFT_PRODUCT_CONTRACT.md` for all model decisions.

Each incident record must pass the validation checks defined in section 5 below before being committed.

### Step 5: Validate all records

Run validation checks (manual or scripted) against all incident records before the v0.3 milestone is declared complete. See section 5 below.

---

## 5. Proposed Validation Checks

The following validation checks must pass for every incident record before it is committed to the repository.

### 5.1 Schema validation

- [ ] Record contains all 11 required fields.
- [ ] `incident_id` matches pattern `INC-[0-9]{4}`.
- [ ] `date` is in `19 May 2026` format.
- [ ] `sources` contains at least one entry with `url`, `database`, and `accessed`.
- [ ] `failure_modes` contains at least one entry starting with `FM-`.
- [ ] `severity` is one of: `low`, `medium`, `high`, `critical`.
- [ ] `confidence` is one of: `low`, `medium`, `high`.
- [ ] `controls` contains at least one entry starting with `CTL-`.
- [ ] `evidence_required` contains at least one string.
- [ ] `lessons` contains at least one string.

### 5.2 Source validation

- [ ] All source URLs are publicly accessible (verified at time of curation).
- [ ] Access date is recorded for each source.
- [ ] If source is from AIID, OECD, AIAAIC, or MIT tracker: data license has been verified and recorded in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`.
- [ ] At least one source is from Tier 1, 2, or 3 as defined in `SOURCE_AND_CITATION_POLICY_DRAFT.md`.

### 5.3 Content validation

- [ ] Summary is written in original words (not copied from any source).
- [ ] Summary uses required hedging language (reportedly, according to public reports, etc.).
- [ ] Summary contains no prohibited language (proved, negligent, violated, etc.).
- [ ] Summary makes no legal conclusions.
- [ ] Summary does not name private individuals.
- [ ] Confidence level is consistent with source quality (see `SOURCE_AND_CITATION_POLICY_DRAFT.md` section 3).
- [ ] Wording in `controls` field uses careful language (could help prevent, not would have prevented).
- [ ] `lessons` are practical and specific, not generic.

### 5.4 Taxonomy validation

- [ ] All `failure_modes` IDs exist in `data/taxonomy/failure-modes.json`.
- [ ] All `controls` IDs exist in `data/taxonomy/controls.json`.
- [ ] All `sector` values (if present) exist in `data/taxonomy/sectors.json`.
- [ ] No FM-REL sub-categories (FM-REL-001 through FM-REL-004) are used in v0.2 records.

### 5.5 Legal and safety validation

- [ ] No defamatory language.
- [ ] No unsupported legal conclusions.
- [ ] No claims of regulatory compliance or non-compliance.
- [ ] No private individual named without strong justification.
- [ ] Disputed facts are noted as disputed.
- [ ] Ongoing legal proceedings are noted as ongoing.

---

## 6. How One-File-Per-Incident Export Should Work Later

The export format is defined in `V0_2_DRAFT_PRODUCT_CONTRACT.md` section 9. This section describes how it will work in practice when implemented in v0.5.

### Export concept

For each incident record in `data/incidents/`, the export process produces a corresponding file in `exports/` in the `caesar-ai-evidence` incident-mapping format.

```
data/incidents/INC-0001.json
→ export process
→ exports/INC-0001-incident-mapping.json
```

### Export record structure

Each export file contains:

```json
{
  "schema": "incident-mapping",
  "version": "0.2",
  "source": "caesar-ai-incident-atlas",
  "generated": "19 May 2026",
  "incident_id": "INC-0001",
  "incident_title": "...",
  "failure_modes": ["FM-HALL"],
  "controls": ["CTL-TEST-001", "CTL-OVER-001"],
  "evidence_required": ["..."],
  "severity": "high",
  "sector": ["legal-compliance"],
  "lessons": ["..."]
}
```

### Export process (future v0.5)

The export process will be a simple script or CLI command that:

1. Reads each incident record from `data/incidents/`.
2. Extracts the fields required for the `caesar-ai-evidence` incident-mapping schema.
3. Writes one export file per incident to `exports/`.
4. Validates each export file against `schemas/export.schema.json`.

For v0.3 MVP, export files may be created manually to demonstrate the format. Automated export is a v0.5 deliverable.

### Compatibility with caesar-ai-evidence

The export format must be compatible with the `incident-mapping` schema in `caesar-ai-evidence`. Before implementing the export in v0.5, verify compatibility with the current `caesar-ai-evidence` schema definitions. Do not modify `caesar-ai-evidence` schemas from this repository.

---

## 7. How Dataset MVP Will Connect Later to Caesar AI Evidence

The connection between Caesar AI Incident Atlas and `caesar-ai-evidence` works at two levels:

### Level 1: Export format compatibility

The Atlas exports incident-to-control-to-evidence mappings in the `caesar-ai-evidence` incident-mapping schema format. This is a one-way export: Atlas → Evidence. The Evidence repository does not depend on the Atlas.

### Level 2: Governance evidence pack enrichment

When a governance team uses `caesar-ai-evidence` to build an evidence pack, they can import Atlas export files to:
- identify which evidence items are relevant to their sector and AI system type;
- see which controls are recommended based on incident patterns;
- generate evidence gap reports based on Atlas mappings.

### Integration prerequisites

Before the integration can be used in practice:
- The Atlas export format must be validated against the current `caesar-ai-evidence` incident-mapping schema.
- The `caesar-ai-evidence` team must confirm the import format is compatible.
- Any schema differences must be resolved through a cross-repository decision log entry.

This integration does not exist yet. It is planned for v0.5 (Export Integration phase).

---

## 8. What Must Be Approved Before Actual Incident Creation

The following approvals are required before any incident records are created in `data/incidents/`:

### 8.1 T004 completion approval

- [ ] T004 preparation documents are complete and reviewed by Control Tower.
- [ ] `FIRST_INCIDENT_SELECTION_CRITERIA.md` is approved.
- [ ] `SOURCE_VERIFICATION_WORKFLOW.md` is approved.
- [ ] `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` is approved.

### 8.2 License verification approval

- [ ] Data license for AIID has been verified from the official source and recorded in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`.
- [ ] Data reuse terms for OECD AI Incidents Monitor have been verified.
- [ ] Data reuse terms for AIAAIC Repository have been verified.
- [ ] Data reuse terms for MIT AI Incident Tracker have been verified.
- [ ] IBM AI Atlas Nexus Apache-2.0 license has been confirmed.

### 8.3 Schema approval

- [ ] JSON Schema files in `schemas/` have been created and reviewed.
- [ ] Taxonomy JSON files in `data/taxonomy/` have been created and reviewed.
- [ ] All schema files pass JSON Schema validation.

### 8.4 First incident batch approval

- [ ] The first 10–20 incident candidates have been identified and reviewed by Control Tower.
- [ ] Each candidate has at least one verified public source.
- [ ] Each candidate has been checked against `FIRST_INCIDENT_SELECTION_CRITERIA.md`.
- [ ] Control Tower has approved the first batch before curation begins.

---

## 9. Important Disclaimers

- This document is a plan. No implementation has begun.
- No schemas, data files, or code are created by this document.
- This document does not claim that the Dataset MVP exists.
- This document does not claim legal compliance.
- License verification is pending for all major source databases. See `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`.
- All implementation steps require Control Tower approval before execution.
