# Project State — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

---

## Operational Metadata

| Field | Value |
|---|---|
| Repository name | `caesar-ai-incident-atlas` |
| Current version | `0.2.5` |
| Current phase | `dataset foundation` |
| Status | `active` |
| Latest completed task | `T006 — First Incident Candidate Dossier Preparation` |
| Active work item | `none` |
| Next recommended step | `T007 — First Incident Record Creation Plan (requires explicit Control Tower approval of T006 dossier shortlist)` |

---

## Phase Progress

| Phase | Status | Completed |
|---|---|---|
| v0.1 Repository Foundation | Complete | 19 May 2026 |
| v0.2 Full-Scale Blueprint | Complete | 19 May 2026 |
| T002 Clean-Room Policy | Complete | 19 May 2026 |
| T003 v0.2 Draft Contract | Complete | 19 May 2026 |
| T004 Dataset MVP Preparation | Complete | 19 May 2026 |
| T005 Dataset MVP Schema and Taxonomy Files | Complete | 19 May 2026 |
| T006 First Incident Candidate Dossier Preparation | Complete | 19 May 2026 |
| T007 First Incident Record Creation Plan | Planned — requires Control Tower approval of T006 shortlist | — |
| v0.3 Dataset MVP | Blocked until T007 incident records created and approved | — |
| v0.4 Static Site | Planned | — |
| v0.5 Export Integration | Planned | — |
| v1.0 Stable Public Release | Planned | — |
| v1.x Governance OS Integration | Future | — |

---

## What This Repository Is

Caesar AI Incident Atlas is a curated public incident knowledge base that maps real-world AI failures to failure modes, governance controls, and evidence requirements.

Its primary value is the governance mapping layer:

```
incident → failure mode → relevant controls → required evidence → lessons
```

---

## v0.2 Contract Summary

The v0.2 draft contract is now stable. Key decisions locked:

| Decision | Resolution |
|---|---|
| Incident ID format | INC-0001 (sequential, four digits) |
| Evidence requirement format | Free-text strings for v0.2 |
| Export format | One file per incident |
| Schema strictness | Lenient — 11 required fields |
| Taxonomy versioning | Together with dataset |
| FM-REL sub-categories | Draft — use top-level FM-REL only in v0.2 |
| system_type field | Free-text for v0.2 |

See `V0_2_DRAFT_PRODUCT_CONTRACT.md` for the full contract.

---

## Active Policy and Contract Documents

| Document | Purpose |
|---|---|
| `V0_2_DRAFT_PRODUCT_CONTRACT.md` | Stable v0.2 product model contract |
| `SOURCE_AND_CITATION_POLICY_DRAFT.md` | Citation rules, confidence levels, wording rules |
| `V0_2_FIELD_PRIORITY_TABLE.md` | Field priority table (required / optional / later) |
| `V0_2_TAXONOMY_REVIEW.md` | Taxonomy category review (stable / draft / later) |
| `LOCAL_ARCHITECTURE_MINING_PLAN.md` | Local mining policy |
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | License classification table and clean-room process |
| `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md` | Review template |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Source register |
| `DATASET_MVP_IMPLEMENTATION_PLAN.md` | Dataset MVP implementation plan (T004) |
| `FIRST_INCIDENT_SELECTION_CRITERIA.md` | Incident selection criteria (T004) |
| `SOURCE_VERIFICATION_WORKFLOW.md` | Source verification workflow (T004) |
| `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` | License and source safety checklist (T004) |

---

## Critical Boundaries and No-Touch Areas

- `docs/RESEARCH_CONTEXT.md` — Active domain research must be preserved.
- Do not copy competitor incident data without verifying applicable data licenses.
- Do not make legal claims about organizations or individuals referenced in incident records.
- Do not claim the incident dataset is complete or exhaustive.
- Do not implement product code beyond approved schema/taxonomy documentation scope.
- Do not add package managers or dependencies until implementation phases.
- Do not clone external repositories inside this repository directory.
- Do not copy third-party code, schemas, or data into this repository without Control Tower approval.

---

## Ecosystem Links

| Resource | Link |
|---|---|
| Ecosystem hub | [caesar-ai-governance-hub](https://github.com/caesar-compliance/caesar-ai-governance-hub) |
| Ecosystem website | [caesar.no](https://caesar.no) |
| Evidence format | [caesar-ai-evidence](https://github.com/caesar-compliance/caesar-ai-evidence) |
| Future platform | [caesar-ai-governance-os](https://github.com/caesar-compliance/caesar-ai-governance-os) |
