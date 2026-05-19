# Decisions — T004: Dataset MVP Preparation

**Work item:** T004
**Branch:** docs/T004-dataset-mvp-preparation
**Date:** 19 May 2026

---

## DEC-023 — Preparation Documents Placed in Repository Root, Not docs/

**Status:** Approved (T004 execution decision)

**Decision:**

The four T004 preparation documents are placed in the repository root rather than in `docs/`:

- `DATASET_MVP_IMPLEMENTATION_PLAN.md`
- `FIRST_INCIDENT_SELECTION_CRITERIA.md`
- `SOURCE_VERIFICATION_WORKFLOW.md`
- `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`

**Rationale:**

These documents are active operational references that curators and agents will use during v0.3 implementation. Placing them in the root makes them immediately visible alongside other active policy documents (`V0_2_DRAFT_PRODUCT_CONTRACT.md`, `SOURCE_AND_CITATION_POLICY_DRAFT.md`, etc.). The `docs/` folder is reserved for research, analysis, and background documents. The T004 preparation documents are operational, not background.

Note: The ROADMAP.md and NEXT_ACTIONS.md from T003 listed the T004 deliverables as `docs/DATASET_MVP_IMPLEMENTATION_PLAN.md` etc. This decision overrides those references. REPO_INVENTORY.md and ROADMAP.md are updated accordingly.

---

## DEC-024 — AIID Data License Verified as CC BY-SA 4.0

**Status:** Approved (T004 verification finding)

**Decision:**

The AI Incident Database (AIID) data license has been verified as **Creative Commons Attribution ShareAlike 4.0 (CC BY-SA 4.0)** for the following collections: incidents, quickadd, duplicates, taxa, classifications, entities, entity_relationships.

The `text` field of the reports collection is explicitly excluded from the CC BY-SA 4.0 license.

**Source:** AIID Terms of Use page (https://incidentdatabase.ai/terms-of-use/), effective August 7, 2025. Verified 19 May 2026.

**Implications:**

1. AIID incident records can be cited as secondary sources in Caesar incident records, with attribution.
2. The `text` field of AIID reports cannot be copied into Caesar incident records.
3. Any direct import of AIID data (beyond citation) requires Control Tower approval and must comply with CC BY-SA 4.0 ShareAlike requirements. The ShareAlike clause means derivative works must be distributed under the same CC BY-SA 4.0 license — this has implications for Caesar's commercial product direction and must be reviewed before any direct data import.

**Action required:** Update `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` entry A-001 to reflect verified status.

---

## DEC-025 — IBM AI Atlas Nexus License Confirmed as Apache-2.0

**Status:** Approved (T004 verification finding)

**Decision:**

The IBM AI Atlas Nexus license has been confirmed as **Apache License 2.0** from the GitHub repository (https://github.com/IBM/ai-atlas-nexus). This confirms the earlier partial verification recorded in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` entry A-005.

**Source:** GitHub repository page for IBM/ai-atlas-nexus, verified 19 May 2026.

**Implications:**

1. IBM AI Atlas Nexus can be cited as a reference and inspiration source.
2. Any direct reuse of code or data still requires Control Tower approval and proper attribution.
3. The default approach remains clean-room Caesar-native implementation.

**Action required:** Update `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` entry A-005 to reflect confirmed status.

---

## DEC-026 — OECD, AIAAIC, and MIT Tracker License Verifications Remain Pending

**Status:** Approved (T004 finding — pending items acknowledged)

**Decision:**

The data reuse terms for OECD AI Incidents Monitor, AIAAIC Repository, and MIT AI Incident Tracker could not be fully verified during T004 from automated web access. Manual verification is required before these sources can be cited in Caesar incident records.

The specific pages requiring manual verification are documented in `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` section 6.

**Implication:** Caesar incident records in v0.3 must not cite OECD, AIAAIC, or MIT tracker records until the manual verifications are complete and recorded. Incidents can be sourced from AIID (with CC BY-SA 4.0 attribution rules applied) and from primary sources (official reports, news) without these verifications.

**Action required:** Manual verification of OECD, AIAAIC, and MIT tracker terms before v0.3 incident curation begins. Record findings in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` and this decision log.

---

## DEC-027 — T005 Is the Recommended Next Step After T004

**Status:** Approved (T004 planning decision)

**Decision:**

The next step after T004 is T005 — Dataset MVP Schema and Taxonomy Files, but only after Control Tower approval of T004.

T005 scope (proposed):
- Create `schemas/incident.schema.json`
- Create `schemas/taxonomy.schema.json`
- Create `schemas/export.schema.json`
- Create `data/taxonomy/failure-modes.json`
- Create `data/taxonomy/controls.json`
- Create `data/taxonomy/evidence-types.json`
- Create `data/taxonomy/sectors.json`
- Create `data/mappings/control-evidence.json`
- Create validation documentation

T005 must not create real incident records unless separately approved.

**Rationale:** The schema and taxonomy files are the prerequisite for incident record creation. They must be created and validated before any incident records are curated. T005 is a lower-risk step than incident curation because it does not involve external data or source verification.
