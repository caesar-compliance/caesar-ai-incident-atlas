# V0.2 Field Priority Table — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.2 (draft contract)
**Status:** Approved for use as implementation reference. Not an executable schema.
**Work item:** T003

---

## Purpose

This table defines the priority of every field in the incident record for v0.2. It resolves the open question from `docs/DATA_MODEL_DRAFT.md` about schema strictness and identifies which fields are essential, optional, or deferred.

This is a documentation-level definition. The executable JSON Schema will be created in T004.

---

## How to Read This Table

| Priority | Meaning |
|---|---|
| **Required** | Must be present in every incident record. A record without this field is invalid for v0.2. |
| **Optional** | Should be included when available. Absence is acceptable for v0.2. |
| **Later** | Not expected in v0.2 records. Deferred to v0.3 or later. |

---

## Incident Record Fields

| Field | Purpose | Priority | Reason | Risk notes |
|---|---|---|---|---|
| `incident_id` | Unique identifier for the record | **Required** | Needed for cross-referencing, export, and Governance OS integration | Must be stable once assigned. Format: INC-0001 |
| `title` | Short descriptive title | **Required** | Primary display field in search results and incident cards | Should be descriptive but not sensational. Avoid naming organizations in the title unless necessary. |
| `date` | Date of incident or first public report | **Required** | Needed for timeline views and chronological sorting | Use the date of the incident if known; otherwise the date of first public report. Format: 19 May 2026. |
| `sources` | List of source entries with URL, type, and access date | **Required** | Every record must be traceable to a public source | At least one source required. URL must be publicly accessible. Data license must be verified for AIID/OECD/AIAAIC/MIT sources. |
| `summary` | Factual summary of the incident | **Required** | Core content of the incident card | Must be written in original words. Must use hedging language. Must not make legal conclusions. Must not be defamatory. |
| `failure_modes` | List of failure mode IDs from the taxonomy | **Required** | Primary classification axis; drives control mapping | At least one required. Must reference valid FM- IDs from the taxonomy. |
| `severity` | Severity level: low / medium / high / critical | **Required** | Needed for filtering and prioritization | Assign conservatively — when in doubt, use the higher level. |
| `confidence` | Confidence level: low / medium / high | **Required** | Reflects source quality; affects wording requirements | Default to low. Upgrade only with strong source evidence. |
| `controls` | List of control IDs that could help | **Required** | Core governance mapping value of the Atlas | At least one required. Must reference valid CTL- IDs from the taxonomy. |
| `evidence_required` | List of evidence types that should exist | **Required** | Bridge to caesar-ai-evidence format | At least one required. Free-text strings for v0.2. |
| `lessons` | Practical governance lessons | **Required** | Actionable takeaway for governance teams | At least one required. Should be practical and specific, not generic. |
| `sector` | Affected sector(s) from the sector taxonomy | **Optional** | Enables sector filtering | Strongly recommended. Assign `general` if no specific sector applies. |
| `system_type` | Type of AI system involved | **Optional** | Enables system type filtering | Free-text for v0.2. Controlled vocabulary deferred to v0.3. |
| `harms` | Types of harm caused or risked | **Optional** | Adds detail to the incident card | Free-text list. Useful for training material and risk analysis. |
| `affected_stakeholders` | Who was affected | **Optional** | Adds context to the incident card | Free-text list. Avoid naming private individuals. |
| `impact` | Description of actual or potential consequences | **Optional** | Adds depth to the incident card | Free-text. Should cover who was affected, what type of harm, and scale. |
| `risk_categories` | Risk category labels | **Later** | Useful for cross-referencing with risk frameworks | Deferred — risk category taxonomy not yet defined. Risk of overfitting to competitor models if rushed. |
| `related_incidents` | List of related incident IDs | **Later** | Enables cross-referencing between incidents | Deferred until enough records exist to identify meaningful relationships. |
| `tags` | Free-form tags for search | **Later** | Improves search discoverability | Deferred — tags are hard to maintain consistently without a controlled vocabulary. |
| `ai_system_name` | Name of the specific AI system involved | **Later** | Adds specificity to the incident card | Risk of defamation or legal claims if used carelessly. Deferred until citation policy is mature. |
| `organization` | Name of the organization involved | **Later** | Adds specificity to the incident card | High legal risk. Naming organizations requires strong source evidence and careful wording. Deferred. |
| `geography` | Country or region where the incident occurred | **Later** | Enables geographic filtering | Deferred — not essential for v0.2 governance mapping value. |
| `regulatory_references` | Relevant laws or regulations | **Later** | Links incidents to regulatory context | Risk of implying compliance determinations. Deferred until citation policy covers regulatory references. |
| `caesar_evidence_export` | Structured export record for caesar-ai-evidence | **Later** | Machine-readable export format | Deferred to v0.5 export integration phase. |

---

## Source Entry Fields

| Field | Purpose | Priority | Reason | Risk notes |
|---|---|---|---|---|
| `url` | URL of the source | **Required** | Must be verifiable | Must be publicly accessible. |
| `database` | Source type label | **Required** | Classifies the source for confidence assessment | Must be one of: AIID, OECD, AIAAIC, MIT, news, official, other |
| `accessed` | Date the URL was accessed | **Required** | Documents what was available at curation time | Format: 19 May 2026 |
| `title` | Title of the source | **Optional** | Improves readability of the source list | Recommended but not required for v0.2 |

---

## Fields Identified as Overfitting Risks

The following fields were considered but are deferred because they risk overfitting to competitor data models (particularly AIID's taxonomy dimensions) without adding clear governance value for Caesar's use case:

| Field | Risk | Decision |
|---|---|---|
| `risk_categories` | AIID and MIT tracker use risk category dimensions that reflect their own taxonomies. Copying these without adaptation would make Caesar's taxonomy derivative rather than original. | Deferred to v0.3 after original Caesar risk category taxonomy is designed. |
| `ai_system_name` | Naming specific AI systems (e.g. "GPT-4", "Gemini") creates legal risk and may become outdated quickly. | Deferred. May be introduced as an optional field in v0.3 with strict citation requirements. |
| `organization` | Naming organizations creates defamation risk and requires strong source evidence. | Deferred. May be introduced as an optional field in v0.3 with strict citation requirements. |

---

## Summary: Required Fields for v0.2

A valid v0.2 incident record must contain:

1. `incident_id` — format INC-0001
2. `title`
3. `date`
4. `sources` — at least one entry with url, database, accessed
5. `summary` — original words, hedging language, no legal conclusions
6. `failure_modes` — at least one FM- ID
7. `severity` — low / medium / high / critical
8. `confidence` — low / medium / high
9. `controls` — at least one CTL- ID
10. `evidence_required` — at least one free-text string
11. `lessons` — at least one string

That is 11 required fields. All other fields are optional or deferred.
