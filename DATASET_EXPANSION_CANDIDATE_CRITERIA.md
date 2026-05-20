# Dataset Expansion Candidate Criteria — INC-0011+ Planning

**Task:** T033 — Dataset Expansion Planning for INC-0011+ Candidates  
**Date:** 20 May 2026  
**Version:** 0.7.1  
**Status:** Planning only — NOT legal advice. No records approved. No data changed.

---

## Purpose

This document defines the candidate selection criteria that must be applied when evaluating potential incidents for inclusion as INC-0011 or later records. Meeting these criteria does not approve a record — it qualifies a candidate for the review workflow defined in `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md`.

**Every new record requires explicit Control Tower approval and separate source and legal review regardless of whether it meets these criteria.**

---

## 1. Core Relevance Criteria

A candidate must satisfy all of the following:

### 1.1 AI Incident, AI Harm, or AI Misuse

- The incident involves an AI or automated decision system as a material contributing factor.
- The harm or failure is directly attributable to AI system behaviour, design, deployment, or governance failure — not incidental use of a software tool.
- AI governance failure, oversight gap, or accountability gap may qualify even if direct AI harm is disputed.

### 1.2 Public Interest Value

- The incident has clear relevance to AI governance, risk management, or compliance practice.
- It illustrates a failure mode, control gap, or lesson that adds practical value to the dataset.
- Pure reputational or commercial interest without governance relevance does not qualify.

### 1.3 Publicly Reported

- The incident must have at least one verifiable public source (see `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md`).
- The incident must not rely solely on anonymous, unverified, or unattributable claims.

---

## 2. Source Availability Criteria

A candidate must satisfy all of the following:

### 2.1 Verifiable Primary Source

- At least one verifiable primary source must exist — court record, regulatory finding, government report, official company statement, or peer-reviewed publication.
- The source must be citeable by URL only — no reproduction of third-party article text.
- Discovery pointers (AIID, AIAAIC, OECD) may be used to identify candidates but do not qualify as primary sources.

### 2.2 Source Stability

- The source must be a stable, publicly accessible document — not a social media post, paywalled article without alternative access, or ephemeral web page.
- Paywalled-only sources may not be used as primary sources unless separately approved by CT with an explicit rationale.

### 2.3 No Sole-Paywalled-Source Reliance

- A record may not rely exclusively on a paywalled commercial news article as its only source.
- If the only available source is paywalled journalism, the candidate must be deferred until a supporting public-domain source is identified or CT explicitly approves the exception.

---

## 3. Source Quality Preference Order

Preferred source tiers in descending order:

| Tier | Source Type | Notes |
|---|---|---|
| 1 | Court records / official judicial decisions | Public domain — strongly preferred |
| 1 | Official regulatory findings / enforcement actions | Public domain — strongly preferred |
| 1 | Government agency reports (NTSB, EEOC, NHS, ICO, etc.) | Public domain — strongly preferred |
| 2 | Peer-reviewed publications (Science, Nature, NIH, ACM, IEEE) | Acceptable; confirm open access or use institutional index |
| 2 | Official company / public organisation statements | Acceptable with standard hedging |
| 3 | Reputable national or international journalism | Acceptable with "reportedly" hedging; multi-source preferred |
| 3 | Legislation / parliamentary / policy source | Acceptable as supporting source |
| 4 | NGO documentation / civil society report | Supporting source only — not sole primary |
| Pointer | AIID / AIAAIC / OECD discovery pointer | Discovery only — license review required before any data use |

---

## 4. Neutral and Cautious Wording Requirement

A candidate must be writable under all of the following wording rules:

- All summaries use neutral, factual language.
- No definitive legal conclusions stated beyond what a court or regulator has formally ruled.
- Attribution hedges ("reportedly", "according to [source]") used where facts are not formally adjudicated.
- No language attributing intentional wrongdoing, fraud, or malice unless a court or regulator has made such a finding.
- No language that could constitute defamation of named living individuals or identifiable organisations beyond documented facts.

If a candidate cannot be written under these rules with available sources, it is not eligible.

---

## 5. Privacy and Reputational Risk Screen

A candidate must pass all of the following:

### 5.1 No Undue Individual Privacy Harm

- The record must not disclose personal details of private individuals beyond what is already in the public record from the cited source.
- Victims of AI-related harm should be referred to by role or status (e.g., "the plaintiff", "the job applicant") unless named in official court/regulatory records.

### 5.2 Reputational Risk Assessment

- A candidate that would constitute the sole named allegation against a specific organisation — with no regulatory, court, or official finding — requires CT review and counsel gate before any record is created.
- A candidate involving an ongoing active litigation or investigation requires CT review and counsel gate.
- A candidate involving a named living individual in a reputationally sensitive role requires CT review and counsel gate.

---

## 6. Diversity Requirements

### 6.1 Jurisdiction Diversity

- Preference for candidates that add new jurisdictions not already represented in INC-0001–INC-0010.
- Current jurisdictions: United States (multiple), Netherlands, Canada, United Kingdom.
- Priority addition candidates: EU member states (non-NL), Asia-Pacific, South America, Africa.

### 6.2 Category and Failure Mode Diversity

- Preference for candidates that add failure modes or sectors not already well-represented in INC-0001–INC-0010.
- Current failure mode coverage: FM-HALL, FM-REL, FM-SAFE, FM-UNAUTH, FM-BIAS, FM-TRANS, FM-PRIV.
- Underrepresented: FM-SEC (security/adversarial), multi-modal combinations, agentic AI failures.
- Current sector coverage: legal, transportation, retail, public sector, law enforcement, hiring, media, healthcare.
- Underrepresented: finance/credit, education, critical infrastructure, military/defence.

---

## 7. Hard Exclusion Rules

A candidate is automatically excluded if any of the following apply:

- The incident is not publicly reported with at least one verifiable source.
- The only available source is a paywalled article with no public-domain alternative and no CT exception.
- The incident is based solely on social media posts, anonymous tips, or unverified claims.
- The incident requires reproducing third-party article text or copyrighted material.
- The incident is sensationalised, unverified, or lacks a clear AI governance lesson.
- The incident involves unsupported allegations of illegal conduct without any regulatory or court finding.
- The incident would require stating conclusions beyond what is documented in the cited sources.
- The incident is already well-covered by multiple existing records in INC-0001–INC-0010 with no additional diversity.
- Single-source weak entries where the sole source is journalism from a non-major outlet — unless CT/counsel explicitly approves.

---

## 8. No Automatic Approval

Meeting all criteria above qualifies a candidate for the review workflow. It does not:

- Approve the candidate for record creation.
- extend G-01/G-02 approval to the candidate.
- Constitute legal clearance.
- Remove the requirement for CT explicit approval for each new record or batch.

**Each future record requires its own full source review, wording/legal review, CT gate, and counsel gate where required.**

---

*See `SOURCE_QUALITY_GATES_FOR_NEW_RECORDS.md` for minimum source requirements. See `INCIDENT_CANDIDATE_REVIEW_WORKFLOW.md` for the approval workflow. See `PUBLIC_MVP_BASELINE_FREEZE.md` for frozen baseline rules.*

**Disclaimer:** This document defines planning criteria only. It does not constitute legal advice, legal clearance, or approval for any new incident records. Not legal advice.
