# T008 Decisions Log

**Task:** T008 — First Tier 1 Incident Record Batch  
**Branch:** `data/T008-first-tier-1-incident-record-batch`  
**Date:** 19 May 2026

---

## DEC-T008-001 — Schema Rename Applied: `source.database` → `source_type`

**Decision:** Applied as the first action of T008. `schemas/incident.schema.json` updated: source object required field renamed from `database` to `source_type`; enum replaced with `["court_record", "tribunal_decision", "regulator_report", "agency_report", "company_statement", "academic_paper", "credible_media", "public_database_pointer", "other"]`.

**Rationale:** Planned in T007 DEC-038. The original `database` enum was too narrow for the approved candidates and semantically misleading. All 4 incident records use the new `source_type` field.

---

## DEC-T008-002 — INC-0001 Date Anchor: Court Order Date (22 May 2023)

**Decision:** `INC-0001` uses `"22 May 2023"` as the `date` field — the date of the court sanctions order — with a `date_note` explaining that the underlying filings were submitted on or before 25 April 2023.

**Rationale:** The sanctions order is the primary publicly accessible court document anchoring the incident. The `date_note` preserves accuracy about the timeline.

---

## DEC-T008-003 — INC-0002 Victim Not Named

**Decision:** The pedestrian fatality victim in `INC-0002` is described as "a pedestrian" throughout. The NTSB report names the individual in the public record, but Caesar records do not name non-public individuals involved as victims.

**Rationale:** Control Tower naming policy: prefer role-based wording for non-public individuals. The NTSB report citation provides full access to the public record for those who need it.

---

## DEC-T008-004 — INC-0003 Date Anchor: Tribunal Decision Date (14 February 2024)

**Decision:** `INC-0003` uses `"14 February 2024"` as the `date` field — the date of the BC CRT decision — with a `date_note` recording that the chatbot interaction occurred in November 2022.

**Rationale:** The tribunal decision is the primary confirmed public source. The interaction date is referenced in the decision but the ruling date is the clearer primary anchor.

---

## DEC-T008-005 — INC-0003 Claimant Not Named

**Decision:** The customer claimant in `INC-0003` is described as "a customer" throughout. The tribunal decision caption names the claimant but Caesar records do not name non-public individual claimants.

**Rationale:** Control Tower naming policy. The tribunal citation (Moffatt v. Air Canada, 2024 BCCRT 149) is included in `sources.title` for reference.

---

## DEC-T008-006 — INC-0004 Two Sources Used: Primary + Secondary Context

**Decision:** `INC-0004` includes two sources: the Hague District Court ruling (primary) and the UN Special Rapporteur report on the Digital Welfare State (secondary context). The UN report is explicitly labelled as a secondary context source in the `title` field.

**Rationale:** The UN report pre-dates the ruling (October 2019 vs February 2020) and provides important governance context about the wider pattern that the SyRI ruling addressed. Including it clearly labelled as secondary adds value without overstating its evidentiary weight.

---

## DEC-T008-007 — INC-0004 Dutch Court Ruling Language Note

**Decision:** `INC-0004` notes in the `title` field that the ruling is in Dutch and that key findings have been widely reported in English. The record's `summary` is written from Caesar's own understanding of the publicly reported findings and the English-language commentary on the ruling, not from a machine translation of the Dutch text.

**Rationale:** Primary source is Dutch-language. Caesar cannot verify a machine translation. The summary uses factual assertions that are confirmed across multiple English-language legal and governance publications.

---

## DEC-T008-008 — `sector` Field Uses Taxonomy IDs from `data/taxonomy/sectors.json`

**Decision:** All 4 records use sector IDs that exist in `data/taxonomy/sectors.json`. `INC-0001` uses `legal-compliance`; `INC-0002` uses `transportation-autonomous`; `INC-0003` uses `retail-ecommerce`; `INC-0004` uses `public-sector`.

**Note:** `transportation-autonomous` and `retail-ecommerce` are marked `draft` status in the taxonomy. This is acceptable for v0.2 records as the taxonomy file includes them with explicit draft status. The records reflect real sectors for these incidents.

---

## DEC-T008-009 — `evidence_required` Uses EV-XXX Prefix Format

**Decision:** All `evidence_required` entries use the format `"EV-XXX — [description]"` as defined in T007 DEC-041. This embeds taxonomy IDs while remaining v0.2 schema compliant (free-text strings).

---

## DEC-T008-010 — No `related_incidents` Field in First Batch

**Decision:** None of the 4 records include a `related_incidents` field. This field will only be populated once multiple records exist and confirmed relationships are identified.

**Rationale:** Premature cross-referencing risks incorrect linkage. First batch is the baseline.
