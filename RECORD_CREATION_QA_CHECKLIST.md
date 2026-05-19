# Record Creation QA Checklist

> **Planning document — operational checklist for T008 and subsequent record creation tasks.**  
> This checklist must be completed for every incident record before it is committed to `data/incidents/`.  
>
> **Prepared:** 19 May 2026  
> **Task:** T007 — First Incident Record Creation Plan  
> **Branch:** `docs/T007-first-incident-record-creation-plan`

---

## Instructions

Complete this checklist for each record independently before staging the file for commit. All items must pass (✅) before the record is committed. Any failing item (❌) must be resolved or escalated to Control Tower before proceeding.

Copy this checklist into the relevant work item folder and complete it for each record.

---

## Section 1 — Source Quality

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 1.1 | At least one source entry is present in `sources` array | | |
| 1.2 | At least one source is a Tier 1 official source (court record, government report, regulatory decision, peer-reviewed academic paper, or official company statement) | | |
| 1.3 | Primary source URL was verified live on the access date (URL responded and content is accessible) | | |
| 1.4 | The source content confirms the facts stated in the `summary` | | |
| 1.5 | Source access date is recorded in `DD Month YYYY` format | | |
| 1.6 | No source is cited whose license prohibits citation or reproduction | | |
| 1.7 | If secondary sources are used, at least two independent secondary sources corroborate the same facts | | |

---

## Section 2 — Citation Completeness

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 2.1 | Each `sources` entry has a valid `url` | | |
| 2.2 | Each `sources` entry has a `source_type` value (after schema rename in T008 pre-work) | | |
| 2.3 | Each `sources` entry has an `accessed` date | | |
| 2.4 | Each `sources` entry has a `title` (recommended; confirm present) | | |
| 2.5 | The `title` field in `sources` is the exact title of the source document, not a paraphrase | | |
| 2.6 | AIID, AIAAIC, OECD, or MIT Tracker are used only as discovery pointers, not as data sources — no data is copied from these databases | | |

---

## Section 3 — Schema Compatibility

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 3.1 | All 11 required fields are present and non-empty: `incident_id`, `title`, `date`, `sources`, `summary`, `failure_modes`, `severity`, `confidence`, `controls`, `evidence_required`, `lessons` | | |
| 3.2 | `incident_id` matches pattern `^INC-[0-9]{4}$` | | |
| 3.3 | `date` matches pattern `^[0-9]{1,2} [A-Z][a-z]+ [0-9]{4}$` | | |
| 3.4 | `severity` is one of: `low`, `medium`, `high`, `critical` | | |
| 3.5 | `confidence` is one of: `low`, `medium`, `high` | | |
| 3.6 | `failure_modes` array has at least one entry | | |
| 3.7 | `controls` array has at least one entry | | |
| 3.8 | `evidence_required` array has at least one entry | | |
| 3.9 | `lessons` array has at least one entry with ≥5 characters | | |
| 3.10 | JSON is syntactically valid (no parse errors) | | |
| 3.11 | JSON validates against `schemas/incident.schema.json` | | |
| 3.12 | If `related_incidents` is present, all values match `^INC-[0-9]{4}$` and those records exist | | |

---

## Section 4 — Taxonomy Compatibility

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 4.1 | All `failure_modes` entries are exact IDs from `data/taxonomy/failure_modes.json` | | |
| 4.2 | All `controls` entries are exact IDs from `data/taxonomy/controls.json` | | |
| 4.3 | All `evidence_required` entries use the format `"EV-XXX — [description]"` | | |
| 4.4 | `severity` value matches an entry in `data/taxonomy/severity_levels.json` | | |
| 4.5 | `confidence` value matches an entry in `data/taxonomy/confidence_levels.json` | | |
| 4.6 | `sector` values (if present) are from `data/taxonomy/sectors.json` | | |

---

## Section 5 — Confidence and Severity Review

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 5.1 | `confidence: high` is assigned only if at least one Tier 1 official source is confirmed | | |
| 5.2 | `confidence: medium` is assigned if primary sources are strong secondary (investigative journalism with multiple sources, or academic peer-reviewed) | | |
| 5.3 | `confidence: low` is assigned if only single secondary sources are available | | |
| 5.4 | `severity: critical` is assigned only if the incident resulted in confirmed fatality, mass harm, or equivalent critical-severity outcome | | |
| 5.5 | `severity` assignment is consistent with the `harms` and `impact` fields | | |

---

## Section 6 — Summary Quality

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 6.1 | `summary` is written entirely in Caesar's own words — no copied text | | |
| 6.2 | `summary` does not paraphrase source text so closely that the structure is identical | | |
| 6.3 | `summary` uses hedging language for facts from secondary sources (`"reportedly"`, `"according to"`, `"multiple reports indicate"`) | | |
| 6.4 | `summary` uses attribution for facts from primary sources (`"The [court/NTSB/tribunal] found that..."`) | | |
| 6.5 | `summary` does not assert legal liability, breach, or fault not confirmed by a court, regulator, or official body | | |
| 6.6 | `summary` does not use defamatory language | | |
| 6.7 | `summary` does not name private individuals who have not been named in a primary official source | | |
| 6.8 | `summary` length is appropriate for a structured record (target: 50–150 words for v0.2) | | |

---

## Section 7 — No Unsupported Legal Conclusions

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 7.1 | No assertion of GDPR, AI Act, or other regulatory breach unless confirmed by a regulator or court | | |
| 7.2 | No assertion of negligence or recklessness unless confirmed by official investigation findings | | |
| 7.3 | No assertion of intent (e.g., "deliberately", "knowingly") without official confirmation | | |
| 7.4 | No defamatory characterisations of individuals or organisations (e.g., "fraudulent", "corrupt") without authoritative source | | |
| 7.5 | Factual claims are attributed: `"According to [source]..."` or `"The [body] found that..."` | | |

---

## Section 8 — Lessons Quality

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 8.1 | All `lessons` entries are governance-oriented and actionable | | |
| 8.2 | No `lessons` entry is a re-description of the incident (that belongs in `summary`) | | |
| 8.3 | Each lesson references a control gap or governance improvement | | |
| 8.4 | Lessons are sector-agnostic where possible (generalisable beyond the specific case) | | |

---

## Section 9 — Data Integrity

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 9.1 | No third-party dataset content was imported or copied to create this record | | |
| 9.2 | No external code, scraper, or automation was used to generate record content | | |
| 9.3 | `data/incidents/` contains only `.gitkeep` plus this new record (no extraneous files) | | |
| 9.4 | No other `INC-XXXX.json` files were created alongside this record that are not part of the current approved batch | | |
| 9.5 | The `incident_id` is the next sequential available ID | | |

---

## Section 10 — Pre-Commit Review

| # | Check | Pass/Fail | Notes |
|---|---|---|---|
| 10.1 | `git diff` reviewed in full before staging | | |
| 10.2 | No unintended files are staged | | |
| 10.3 | No `INC-XXXX.json` files other than the approved record are present in staging | | |
| 10.4 | Commit message follows format: `data: add incident record INC-XXXX — [short title] (T008)` | | |
| 10.5 | All checklist items above are marked Pass (✅) | | |

---

## Completion Sign-Off

| Field | Value |
|---|---|
| Record ID | |
| Candidate reference | |
| Reviewer | |
| Date reviewed | |
| All items passed | Yes / No |
| Issues flagged | |
| Approved for commit | Yes / No — pending CT sign-off if issues exist |
