# Incident Record Creation Gate Checklist — INC-0011+ Planning

**Task:** T034 — Candidate Shortlist Draft for INC-0011+ Planning
**Date:** 20 May 2026
**Version:** 0.7.2
**Status:** Planning only — NOT legal advice. No records approved.

---

## Purpose

This checklist defines what must happen before any candidate from the shortlist becomes a real incident record (INC-0011 or higher). It supplements the workflow in `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md`.

**The candidate shortlist (`INCIDENT_CANDIDATE_SHORTLIST_DRAFT.md`) does not authorise record creation. Record creation requires a separate future task with explicit CT approval.**

Each gate below must be completed and documented before a candidate proceeds to publication. Gates must be completed in order. No gate may be skipped without explicit CT approval and documented rationale.

---

## Gate Checklist

### Gate 1 — CT Approves Candidate for Drafting

- [ ] Control Tower has reviewed the candidate entry in `INCIDENT_CANDIDATE_SHORTLIST_DRAFT.md` or `INCIDENT_CANDIDATE_TRIAGE_MATRIX.md`.
- [ ] CT has provided explicit written approval to proceed with source collection and drafting for this candidate.
- [ ] Approval language is recorded in a governance document (equivalent to G-01/G-02 scope).
- [ ] Approval scope is stated explicitly — it applies only to this specific candidate, not the full shortlist.

### Gate 2 — Source Pack Created

- [ ] A source pack document has been created for this candidate listing all proposed sources.
- [ ] Each source has: URL, access date, source type (Tier 1/2/3), license note, and reproduction risk assessment.
- [ ] Source pack has been reviewed against `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md`.

### Gate 3 — At Least One Acceptable Primary Source Identified

- [ ] At least one Tier 1 or Tier 2 primary source is confirmed available at a stable public URL.
- [ ] The source is citeable by URL only — no article text will be reproduced.
- [ ] If only Tier 3 (journalism) is available: CT exception approval obtained and documented; caution wording is mandatory.
- [ ] If only paywalled source is available: CT exception approval obtained; alternative access path documented.

### Gate 4 — Source/License Review Completed

- [ ] All proposed sources reviewed against `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`.
- [ ] No AIID/AIAAIC/OECD data used without separate license review and CT approval.
- [ ] No third-party article text reproduced.
- [ ] No copyrighted material copied.
- [ ] Source license notes recorded in source pack.

### Gate 5 — Wording/Legal-Risk Review Completed

- [ ] Draft summary, lessons, and key facts reviewed for neutral, cautious wording.
- [ ] All hedging applied ("reportedly", "according to [source]") where facts are not formally adjudicated.
- [ ] No definitive legal conclusions stated beyond what a court/regulator has formally ruled.
- [ ] No language attributing intentional wrongdoing without a court/regulatory finding.
- [ ] No defamatory language present.
- [ ] Wording reviewed against `SOURCE_AND_CITATION_POLICY_DRAFT.md`.

### Gate 6 — No Third-Party Copyrighted Text Copied

- [ ] Confirmed: no article text, excerpts, or close paraphrasing of copyrighted sources included in the record.
- [ ] Confirmed: discovery pointer sources (AIID, AIAAIC, OECD) not used as data sources.
- [ ] Confirmed: all citation is by URL reference only.

### Gate 7 — Incident JSON Drafted

- [ ] Incident JSON file created in `data/incidents/` on a feature branch (not merged to main).
- [ ] All required fields populated per `schemas/incident.schema.json` and `V0_2_FIELD_PRIORITY_TABLE.md`.
- [ ] Incident ID assigned as next sequential ID (INC-0011 or next available).
- [ ] Record reviewed against `RECORD_CREATION_QA_CHECKLIST.md`.
- [ ] File is on feature branch only — NOT in `site/data/incidents/` until CT release approval.

### Gate 8 — Root Data and Site/Data Sync Validated

- [ ] `data/incidents/[new-record].json` created and validated.
- [ ] `data/incident-index.json` updated to include new record entry.
- [ ] `site/data/incidents/[new-record].json` synced from root (only after CT release approval).
- [ ] `site/data/incident-index.json` synced from root (only after CT release approval).
- [ ] Sync confirmed: SHA-256 hashes of root and site copies match (validator check).

### Gate 9 — Dataset Validator Passes

- [ ] `python3 tools/validate_dataset.py` exits 0.
- [ ] All checks pass: JSON validity, record count, schema validation, taxonomy references, index consistency, site sync.
- [ ] No INC-0012+ absence checks broken (validator updated if adding INC-0011).
- [ ] `git diff --check` clean — no trailing whitespace.

### Gate 10 — Public Site Smoke Test Passes

- [ ] Live site at `https://atlas.caesar.no/` loads correctly after deployment.
- [ ] New incident record appears in the incident list and is searchable.
- [ ] Detail panel renders correctly for the new record.
- [ ] Source citation field links correctly.
- [ ] No console errors.
- [ ] `curl -sI https://atlas.caesar.no/` returns HTTP 200.
- [ ] `curl -sI https://atlas.caesar.no/data/incident-index.json` returns HTTP 200 with updated count.

### Gate 11 — Governance Sign-Off Recorded

- [ ] CT explicit approval for record publication obtained (equivalent to G-01/G-02 scope for new record).
- [ ] If counsel gate was triggered: counsel sign-off documented.
- [ ] Approval scope stated explicitly — applies to this specific record only.
- [ ] Governance sign-off recorded in a gate closeout document (equivalent to `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md`).
- [ ] `PUBLIC_MVP_BASELINE_FREEZE.md` reviewed — confirm new review trigger applies.

### Gate 12 — Release Note Added

- [ ] `CHANGELOG.md` entry added for new record(s).
- [ ] `REPO_INVENTORY.md` updated with new file.
- [ ] `README.md` project status updated.
- [ ] `PROJECT_STATE.md` version and status updated.
- [ ] `NEXT_ACTIONS.md` updated.
- [ ] Release note describes: record ID, title, sector, failure modes, source summary, validation result.

---

## Summary Table

| Gate | Description | Required for every record? |
|---|---|---|
| Gate 1 | CT approves candidate for drafting | Yes |
| Gate 2 | Source pack created | Yes |
| Gate 3 | At least one acceptable primary source confirmed | Yes |
| Gate 4 | Source/license review completed | Yes |
| Gate 5 | Wording/legal-risk review completed | Yes |
| Gate 6 | No third-party copyrighted text copied | Yes |
| Gate 7 | Incident JSON drafted on feature branch | Yes |
| Gate 8 | Root data and site/data sync validated | Yes |
| Gate 9 | Dataset validator passes | Yes |
| Gate 10 | Public site smoke test passes | Yes |
| Gate 11 | Governance sign-off recorded | Yes |
| Gate 12 | Release note added | Yes |

---

## Important Reminders

- **The candidate shortlist does not authorise record creation.** It is planning material only.
- **Each record is gated independently.** Approval of one record does not automatically approve the next.
- **G-01/G-02 approval for INC-0001–INC-0010 does not extend to any new record.**
- **Counsel review is required** when: primary source is sole journalism; subject is a named living individual; incident involves ongoing litigation; or wording/legal-risk review is rated High.
- **All records must be created on a feature branch** and merged to main only after CT release approval and all gates cleared.

---

**T036 Status:** First drafting batch selected (CAND-013, CAND-008, CAND-011, CAND-010). These candidates may proceed through gates when CT approves. See `FIRST_DRAFTING_BATCH_SELECTION.md`.

*See `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md` for the full 9-stage workflow. See `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` for source quality requirements. See `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` for candidate selection criteria.*

**Disclaimer:** This checklist is planning material only. It does not constitute legal advice, legal clearance, or approval for any new incident records. Counsel review requirements are operational guidance only and do not substitute for actual legal advice. Not legal advice.
