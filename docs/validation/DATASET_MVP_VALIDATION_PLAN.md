# Dataset MVP Validation Plan — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Work item:** T005
**Status:** Validation documentation only. No validation code is created in T005.

---

## Purpose

This plan defines how future incident records will be validated in the Dataset MVP process.

It covers:
- schema validation checks;
- manual source and citation checks;
- source/license safety gates;
- acceptance and rejection rules;
- the next step expected in T006.

---

## 1) Schema Validation (Future Incident Files)

Every future incident record in `data/incidents/` must be validated against `schemas/incident.schema.json`.

Minimum schema checks:
- required 11 fields are present;
- `incident_id` uses `INC-0001` format;
- `sources` has at least one source object with `url`, `database`, `accessed`;
- `failure_modes` has at least one `FM-` reference;
- `controls` has at least one `CTL-` reference;
- `severity` is one of `low|medium|high|critical`;
- `confidence` is one of `low|medium|high`;
- `evidence_required` contains at least one free-text string;
- `lessons` contains at least one practical lesson.

Schema validation failure blocks record acceptance.

---

## 2) Manual Source Verification Checks

Schema pass alone is not sufficient. Curator must complete manual checks from:
- `SOURCE_AND_CITATION_POLICY_DRAFT.md`
- `SOURCE_VERIFICATION_WORKFLOW.md`
- `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`

Required manual checks:
- source URLs are publicly accessible at curation time;
- source content matches the summarized incident;
- summary is original wording (not copied text);
- summary uses hedging language and avoids legal conclusions;
- confidence level matches source quality;
- disputed facts are marked as disputed;
- ongoing proceedings are marked as ongoing when applicable.

Manual check failure blocks record acceptance.

---

## 3) Source/License Safety Gate

Before accepting an incident that cites a database source:
- AIID may be cited with attribution under recorded T004 finding (with exclusions);
- IBM AI Atlas Nexus may be cited as reference/inspiration;
- OECD, AIAAIC, MIT tracker remain pending unless officially verified and recorded;
- no external dataset import without separate Control Tower approval.

If source/license status is pending or unclear, incident is deferred.

---

## 4) No External Dataset Import Rule

Default rule remains active:

> No external dataset, database records, or structured third-party data may be imported into this repository without separate Control Tower approval.

This applies even to permissive licenses.

---

## 5) What Blocks Acceptance of a Future Incident

Any of the following blocks acceptance:
- schema validation failure;
- missing required source fields;
- inaccessible or unverifiable source;
- prohibited wording or legal-claim phrasing;
- unverified source-license dependency;
- failure mode/control references not in approved taxonomy files;
- copied third-party text/data.

---

## 6) T006 Scope (Recommended Next Step)

The next step after T005 is likely:

`T006 — First Incident Candidate Dossier Preparation` (Control Tower approval required).

T006 should:
- prepare candidate dossiers for 10–20 potential incidents;
- collect public source links and verification notes;
- apply selection criteria and source workflow checks;
- prepare confidence/severity rationale notes;
- defer final incident record creation until dossier approval.

T006 should not mass-import data and should not create bulk incident records by automation.

---

## 7) T005 Validation Boundary

This T005 work item does **not**:
- create real incident records;
- create scraper/CLI/static-site/database code;
- perform bulk data import;
- claim legal compliance;
- claim pending source-license checks are complete.
