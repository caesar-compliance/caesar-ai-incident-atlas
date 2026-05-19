# First Incident Selection Criteria — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.3 (plan — not yet implemented)
**Status:** Planning document. No incidents have been selected. Requires Control Tower approval before selection begins.
**Work item:** T004

---

## Purpose

This document defines the criteria for selecting the first 10–20 incident records for the Caesar AI Incident Atlas Dataset MVP (v0.3). It does not select the actual incidents. Actual incident selection requires a separate Control Tower approval step after T004 is complete.

---

## 1. How the First 10–20 Incidents Should Be Selected

The first batch of incidents is the foundation of the Atlas. It must demonstrate the governance mapping layer works across a range of failure modes and sectors, and it must be well-sourced enough to be credible.

### Selection process

1. Identify candidate incidents from public sources (AIID, OECD, AIAAIC, news, official reports).
2. Check each candidate against the suitability criteria in section 2.
3. Check each candidate against the source quality requirements in section 3.
4. Assemble a shortlist of 20–30 candidates.
5. Apply the diversity criteria in section 4 to select the final 10–20.
6. Submit the shortlist to Control Tower for approval before curation begins.
7. Curate approved incidents following `SOURCE_VERIFICATION_WORKFLOW.md` and `SOURCE_AND_CITATION_POLICY_DRAFT.md`.

---

## 2. What Counts as a Suitable Incident

An incident is suitable for the first batch if it meets all of the following criteria:

### 2.1 Publicly documented

The incident must be documented in at least one publicly accessible source. The source must be accessible without a login or subscription (preferred). If the source requires a login, an archived version or secondary source must be available.

### 2.2 AI system involvement is clear

The incident must clearly involve an AI system, algorithmic system, or automated decision system. Incidents where AI involvement is speculative or unconfirmed are not suitable for the first batch.

### 2.3 Failure mode is identifiable

The incident must be classifiable into at least one of the eight top-level failure mode categories (FM-PRIV, FM-BIAS, FM-HALL, FM-SAFE, FM-SEC, FM-UNAUTH, FM-TRANS, FM-REL). Incidents where the failure mode is ambiguous or unclear are not suitable for the first batch.

### 2.4 Governance lesson is clear

The incident must yield at least one practical governance lesson. The lesson must be specific enough to map to at least one control from the Caesar control taxonomy. Incidents that are interesting but do not yield clear governance lessons are not suitable for the first batch.

### 2.5 Summary can be written without legal risk

The incident must be describable in a factual summary that:
- uses hedging language;
- makes no legal conclusions;
- does not name private individuals;
- does not risk defamation.

Incidents where a factual summary cannot be written without legal risk are not suitable for the first batch.

### 2.6 Source license is compatible

If the incident is being cited from AIID, OECD, AIAAIC, or MIT tracker, the data license for that source must have been verified and must permit citation. Incidents from sources with unverified or restrictive data licenses are not suitable until the license is verified.

---

## 3. Required Public Source Quality

### 3.1 Minimum source requirement

Every incident in the first batch must have at least one source that meets the following minimum requirements:

- The source URL is publicly accessible.
- The source clearly describes the incident being summarised.
- The source is from a named publication, organization, or database (not anonymous).
- The source was published or updated within the last 10 years.

### 3.2 Preferred source quality

For the first batch, prefer incidents with:

- at least two independent sources confirming the core facts (supports `medium` or `high` confidence);
- at least one Tier 1 or Tier 2 source as defined in `SOURCE_AND_CITATION_POLICY_DRAFT.md`;
- an official report, regulatory decision, or court record (supports `high` confidence);
- sources that are likely to remain accessible long-term (official publications, archived pages).

### 3.3 Source quality and confidence assignment

| Source quality | Confidence level | Suitable for first batch? |
|---|---|---|
| Official report or regulatory decision | high | Yes — preferred |
| Two or more independent Tier 2/3 sources | medium | Yes |
| Single Tier 2 source (AIID, OECD, AIAAIC, MIT) | medium | Yes, if license verified |
| Single Tier 3 source (reputable news) | low | Yes, with caution |
| Single Tier 4 source (blog, social media) | low | No — not suitable for first batch |
| No verifiable source | N/A | No — reject |

For the first batch, aim for at least 50% of incidents at `medium` or `high` confidence. Avoid a first batch that is predominantly `low` confidence.

---

## 4. Preferred Incident Diversity

The first batch should demonstrate the Atlas covers the full range of failure modes and sectors. The following diversity targets are guidelines, not hard requirements. If a suitable incident cannot be found for a category, do not force an unsuitable one.

### 4.1 Failure mode diversity

The first batch should include at least one incident from each of the following failure mode categories:

| Failure mode | Target | Notes |
|---|---|---|
| FM-PRIV — Privacy / data leakage | 1–3 incidents | Well-documented; many public sources available |
| FM-BIAS — Bias / discrimination | 2–4 incidents | Well-documented; priority for governance relevance |
| FM-HALL — Hallucination / misinformation | 2–3 incidents | Well-documented; high public interest |
| FM-UNAUTH — Unauthorized AI agent action | 1–2 incidents | Caesar differentiator; include at least one |
| FM-SEC — Security / prompt injection | 1–2 incidents | Growing category; include if well-documented source available |
| FM-REL — Reliability / model failure | 1–2 incidents | Use top-level FM-REL only (no sub-categories in v0.2) |
| FM-TRANS — Transparency / explainability failure | 1–2 incidents | Include if well-documented source available |
| FM-SAFE — Safety / harm | 1–2 incidents | Include if well-documented source available; apply careful wording |

Total target: 10–20 incidents across all categories.

### 4.2 Sector diversity

The first batch should include incidents from at least five different sectors:

| Sector | Priority | Notes |
|---|---|---|
| legal-compliance | High | Well-documented hallucination incidents (legal citations) |
| hiring-employment | High | Well-documented bias incidents |
| finance-banking | High | Well-documented bias and reliability incidents |
| healthcare-medical | High | Well-documented safety and hallucination incidents |
| public-sector | High | Well-documented bias and transparency incidents |
| law-enforcement | Medium | Well-documented bias and privacy incidents |
| education | Medium | Growing incident category |
| media-content | Medium | Well-documented hallucination and safety incidents |
| transportation-autonomous | Lower | Fewer well-documented public incidents for v0.2 |
| retail-ecommerce | Lower | Fewer high-profile incidents for v0.2 |

Aim for at least five sectors represented in the first batch. Do not force incidents into sectors where the sector connection is weak.

### 4.3 Temporal diversity

The first batch should not be concentrated in a single year. Aim for incidents spanning at least three different years. This demonstrates the Atlas covers the history of AI failures, not just recent events.

### 4.4 Geographic diversity

Where possible, include incidents from different countries or regions. This demonstrates the Atlas is not limited to a single jurisdiction. Geographic diversity is a secondary consideration — source quality and failure mode coverage take priority.

---

## 5. What Incidents Should Be Excluded

The following types of incidents should be excluded from the first batch:

### 5.1 Unverifiable incidents

Incidents that cannot be verified from a publicly accessible source. If the only source is a social media post, an anonymous blog, or a source that is no longer accessible, exclude the incident.

### 5.2 Incidents with unclear AI involvement

Incidents where AI involvement is speculative, unconfirmed, or where the system involved is not clearly an AI or algorithmic system. Do not include incidents just because they involve technology.

### 5.3 Incidents with ongoing legal proceedings

Incidents where legal proceedings are ongoing and where including the incident could prejudice those proceedings or create legal risk for Caesar. Consider deferring these until proceedings conclude.

Exception: incidents where the legal proceedings themselves are the public record (e.g. a regulatory enforcement action) may be included if the summary is careful and factual.

### 5.4 Incidents requiring naming private individuals

Incidents where a factual summary would require naming private individuals who were affected. The Atlas does not name private individuals in incident records.

### 5.5 Incidents from sources with unverified licenses

Incidents that can only be sourced from AIID, OECD, AIAAIC, or MIT tracker, where the data license for that source has not yet been verified. These incidents must wait until the license verification in `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` is complete.

### 5.6 Incidents that are primarily about product failures, not AI failures

Incidents where the failure is primarily a software bug, hardware failure, or human error, and where AI is incidental. The Atlas focuses on failures where the AI system's behavior is the primary cause or a significant contributing factor.

---

## 6. How to Avoid Sensationalism

The Atlas is a governance reference, not a news feed. The first batch must avoid sensationalism:

### 6.1 Do not select incidents for shock value

Select incidents because they yield clear governance lessons, not because they are dramatic or widely covered. A well-documented, lower-profile incident with a clear governance lesson is more valuable than a high-profile incident with a vague lesson.

### 6.2 Do not exaggerate severity

Assign severity based on the actual or potential harm of the incident type, not based on how much media coverage it received. A widely covered incident is not automatically `critical`.

### 6.3 Do not use sensational titles

Incident titles should be descriptive and factual. Avoid titles that are designed to be alarming or that imply conclusions not supported by the sources.

Examples:
- Good: "Language model reportedly generates fabricated legal citations in court filing"
- Avoid: "AI destroys legal career with hallucinated citations"

### 6.4 Do not select incidents primarily to criticize specific organizations

The Atlas is not an accountability tool. It is a governance learning resource. Select incidents because they illustrate failure modes and governance lessons, not to criticize specific organizations.

---

## 7. How to Avoid Unsupported Legal Conclusions

Every incident summary must follow the wording rules in `SOURCE_AND_CITATION_POLICY_DRAFT.md`. Specific rules for the first batch:

### 7.1 Do not characterize legal outcomes

Do not state that an organization "violated" a law, "was found liable", or "was penalized" unless an official source explicitly states this. Use "was investigated under", "was subject to regulatory review", "reportedly faced regulatory action".

### 7.2 Do not imply causation without evidence

Do not state that an AI system "caused" harm unless the source explicitly establishes causation. Use "reportedly contributed to", "was associated with", "may have contributed to".

### 7.3 Do not make compliance determinations

Do not state that an organization "failed to comply with" a regulation or "was non-compliant". Use "raises questions about compliance with", "has been reviewed under", "may be relevant to".

### 7.4 Do not predict legal outcomes

Do not predict the outcome of ongoing legal proceedings. Do not state that an organization "will be found liable" or "is likely to face penalties".

### 7.5 Escalate uncertain cases

If a curator is unsure whether a summary could create legal risk, escalate to the Control Tower before committing the record.

---

## 8. Approval Gate

The actual selection of the first 10–20 incidents is not part of T004. T004 defines the criteria. The actual selection happens in v0.3, after:

1. T004 is complete and approved by Control Tower.
2. License verifications in `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` are complete.
3. A shortlist of 20–30 candidates is assembled and submitted to Control Tower.
4. Control Tower approves the shortlist before curation begins.

Do not begin curating incident records until this approval gate is passed.
