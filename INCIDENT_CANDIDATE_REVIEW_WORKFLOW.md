# Incident Candidate Review Workflow — INC-0011+ Planning

**Task:** T033 — Dataset Expansion Planning for INC-0011+ Candidates  
**Date:** 20 May 2026  
**Version:** 0.7.1  
**Status:** Planning only — NOT legal advice. No records approved. No data changed.

---

## Purpose

This document defines the end-to-end review workflow for evaluating, approving, and publishing future incident records (INC-0011+). It is a planning document. It does not approve any records. Each future record must pass through this workflow independently.

**Key principle: Candidate planning does not approve records. Each future record requires its own source review, legal risk review, CT gate, and counsel gate where required.**

---

## Critical Boundaries

- G-01/G-02 approval does not automatically extend to new records.
- The current 10-record MVP approval (G-01/G-02, 20 May 2026) covers INC-0001–INC-0010 only.
- Any INC-0011+ record that passes this workflow still requires explicit CT sign-off equivalent to or superseding the current G-01/G-02 approval.
- Each new record or batch may require a new G-01/G-02 cycle.
- This workflow is a planning document — it may be revised by CT before implementation.

---

## Workflow Overview

```
Stage 1: Candidate Idea
       ↓
Stage 2: Source Collection
       ↓
Stage 3: Source Risk Review
       ↓
Stage 4: Wording / Legal Risk Review
       ↓
Stage 5: Draft Record Creation
       ↓
Stage 6: Technical Validation
       ↓
Stage 7: CT Gate (required for every record/batch)
       ↓
Stage 8: Counsel Gate (required where triggered)
       ↓
Stage 9: Public Release Batch
```

---

## Stage 1 — Candidate Idea

**Who:** Implementation agent or CT.

**Action:**
- Identify a potential incident with preliminary public source evidence.
- Apply `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` — confirm the candidate meets relevance, source availability, wording, privacy/reputational, and diversity criteria.
- Record candidate in the shortlist template (`INCIDENT_CANDIDATE_SHORTLIST_TEMPLATE.md`) with status `not_approved_candidate`.

**Gate:** Candidate must meet all core relevance and source availability criteria before proceeding.  
**Output:** Candidate entry in shortlist with preliminary source links and risk assessment.

---

## Stage 2 — Source Collection

**Who:** Implementation agent.

**Action:**
- Collect and verify all available sources for the candidate.
- Apply `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` — confirm source tier, count, and stability.
- Identify: primary sources (Tier 1/2), supporting sources (Tier 3), discovery pointers (excluded from citation).
- Confirm: no paywalled-only sole source; no sole journalism source without CT exception path identified.
- Document: source URLs, access dates, source types, license notes, reproduction risks.

**Gate:** At least one verifiable primary source confirmed. Source count meets minimum guidance.  
**Output:** Source collection log for the candidate.

---

## Stage 3 — Source Risk Review

**Who:** Implementation agent + CT review.

**Action:**
- Assess each source for: reproduction risk, license risk, defamation/privacy risk, jurisdiction risk.
- Flag counsel gate triggers (see `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` §3).
- Confirm: no third-party text will be reproduced; all sources citable by URL only.
- Record risk level: low / medium / high / requires-counsel.

**Gate:** Source risk accepted by CT before proceeding to wording review.  
**Output:** Source risk assessment record.

---

## Stage 4 — Wording / Legal Risk Review

**Who:** Implementation agent; counsel where triggered.

**Action:**
- Draft summary, lessons, and key facts field content.
- Apply wording rules from `SOURCE_AND_CITATION_POLICY_DRAFT.md` and `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` §4.
- Confirm: no definitive legal conclusions beyond formal findings; hedging applied where required; no defamatory language; no unsupported allegations.
- If counsel gate is triggered (see §3 of `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md`), pause at this stage and escalate to CT for counsel referral decision.

**Gate:** Wording confirmed as neutral and cautious. Counsel gate resolved (passed or counsel sign-off obtained).  
**Output:** Draft wording approved for record creation.

---

## Stage 5 — Draft Record Creation

**Who:** Implementation agent.

**Action:**
- Create the incident JSON record in `data/incidents/` following the schema in `schemas/incident.schema.json`.
- Assign next sequential incident ID (INC-0011 or next available).
- Populate all required fields per `V0_2_FIELD_PRIORITY_TABLE.md`.
- Include only approved, hedged wording from Stage 4.
- Do not create the record in `site/data/` until CT release approval (Stage 7).

**Gate:** Record must be created on a feature branch — not committed to main without CT gate.  
**Output:** Draft incident JSON file.

---

## Stage 6 — Technical Validation

**Who:** Implementation agent.

**Action:**
- Run `python3 tools/validate_dataset.py` — must exit 0.
- Confirm: schema validation passes; taxonomy references valid; INC-0011 absent check passes (update validator INC-0011 check if record is INC-0011); index file consistent.
- Run `git diff --check` — no trailing whitespace.
- Confirm: no `site/data/` changes until CT release approval.

**Gate:** All validator checks pass. No whitespace errors.  
**Output:** Validation PASS confirmation.

---

## Stage 7 — CT Gate (Required for Every Record or Batch)

**Who:** Control Tower (Artem).

**Action:**
- CT reviews: source risk assessment, wording risk assessment, draft record, validation result.
- CT confirms or rejects the record for inclusion.
- If approved: CT provides explicit approval language equivalent to current G-01/G-02 approval scope.
- Approval scope must be stated explicitly — it does not automatically extend to subsequent records.

**Gate:** Explicit CT approval required. No record proceeds to release without this gate.  
**Output:** CT approval record (added to governance gate closeout document or equivalent).

---

## Stage 8 — Counsel Gate (Where Triggered)

**Who:** CT + external counsel where required.

**Action:**
- Triggered when any counsel gate condition from `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` §3 applies.
- CT decides whether to engage external counsel or accept risk with documented caution.
- If counsel engaged: counsel sign-off obtained and documented before record is published.
- If CT accepts risk without external counsel: documented explicitly with rationale and caution wording confirmed.

**Gate:** Counsel gate resolved before public release batch. Not implied by CT approval alone.  
**Output:** Counsel gate resolution record.

---

## Stage 9 — Public Release Batch

**Who:** Implementation agent under CT approval.

**Action:**
- Sync approved records from `data/incidents/` to `site/data/incidents/`.
- Update `data/incident-index.json` and `site/data/incident-index.json`.
- Run full validation again.
- Merge to main — triggers GitHub Pages deploy.
- Confirm live deployment.

**Gate:** CT explicit release approval. All prior stages complete. Full validation PASS.  
**Output:** New records live at `https://atlas.caesar.no/`.

---

## Workflow Governance Notes

- **Candidate planning (Stage 1) does not approve records.** A shortlisted candidate may still be rejected at any subsequent stage.
- **Each record or batch is reviewed independently.** Approval of INC-0011 does not automatically approve INC-0012.
- **G-01/G-02 approval does not extend to new records.** A new G-01/G-02 cycle or equivalent is required for each new batch.
- **The frozen 10-record MVP baseline is not altered by this workflow.** Records are only added after completing all stages.
- **This workflow may be revised.** CT may update stages, add gates, or require additional review before implementation.

---

*See `DATASET_EXPANSION_CANDIDATE_CRITERIA.md` for candidate criteria. See `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` for source quality requirements. See `INCIDENT_CANDIDATE_SHORTLIST_TEMPLATE.md` for the candidate template. See `PUBLIC_MVP_BASELINE_FREEZE.md` for frozen baseline rules.*

**Disclaimer:** This document describes a future planning workflow only. It does not constitute legal advice, legal clearance, or approval for any new incident records. Counsel gate requirements are operational guidance only and do not substitute for actual legal advice. Not legal advice.
