# T033 — Decisions

**Task:** T033 — Dataset Expansion Planning for INC-0011+ Candidates  
**Date:** 20 May 2026  
**Status:** Planning only — NOT legal advice

---

| ID | Decision | Rationale |
|---|---|---|
| DEC-T033-001 | T033 scope is planning documentation only — no records created, no data changed. | Frozen baseline rules in `PUBLIC_MVP_BASELINE_FREEZE.md` prohibit new records without explicit CT approval. |
| DEC-T033-002 | Four planning documents created: `DATASET_EXPANSION_CANDIDATE_CRITERIA.md`, `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md`, `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md`, `INCIDENT_CANDIDATE_SHORTLIST_TEMPLATE.md`. | Provides a complete governance framework for future dataset expansion without pre-approving any records. |
| DEC-T033-003 | `INCIDENT_CANDIDATE_SHORTLIST_TEMPLATE.md` contains template fields and placeholder examples only — no real candidates listed. | Candidates require their own source review and CT gate; listing real candidates in T033 would imply pre-approval. |
| DEC-T033-004 | G-01/G-02 approval scope explicitly confirmed as unchanged — current 10-record MVP only. T033 planning documents do not extend approval. | Explicit constraint from CT and `PUBLIC_MVP_BASELINE_FREEZE.md`. |
| DEC-T033-005 | Version bump to 0.7.1 for T033. | Patch increment for documentation/planning work within the v0.7 phase. |
| DEC-T033-006 | Roadmap and lifecycle docs (`ROADMAP.md`, `ROADMAP_NEXT_PHASES.md`, `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `CHANGELOG.md`, `REPO_INVENTORY.md`, `README.md`) updated to reflect T033 complete. | Standard lifecycle update required after each task completion. |
| DEC-T033-007 | `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` defines minimum source count as two verifiable sources preferred; one may be accepted only with CT explicit approval and mandatory caution wording. | Consistent with T004 `FIRST_INCIDENT_SELECTION_CRITERIA.md` and T025 source risk findings. INC-0006 is the precedent case. |
| DEC-T033-008 | Counsel gate in `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md` is mandatory when: primary source is sole-source journalism; subject is a named living individual; or incident involves ongoing litigation. | Drawn from T025/T027/T030 governance experience. |
| DEC-T033-009 | T034 (Candidate Shortlist Draft) identified as the recommended next step — still planning only, no records. | Logical next step after T033 criteria are established; record creation remains gated on CT and source/legal review. |
| DEC-T033-010 | No scraping, crawling, automation, or external dataset ingestion implemented or planned in T033. | Explicit constraint from CT and frozen baseline rules. |

---

**Disclaimer:** These decisions relate to planning documentation only. They do not constitute legal advice or approval for any new incident records.
