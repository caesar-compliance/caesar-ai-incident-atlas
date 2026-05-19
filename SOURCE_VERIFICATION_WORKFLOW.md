# Source Verification Workflow — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.3 (plan — not yet implemented)
**Status:** Planning document. Operationalizes SOURCE_AND_CITATION_POLICY_DRAFT.md into a step-by-step workflow. Requires Control Tower approval before use in v0.3.
**Work item:** T004

---

## Purpose

This document defines the step-by-step workflow for verifying sources before creating an incident record. It operationalizes the `SOURCE_AND_CITATION_POLICY_DRAFT.md` into a practical checklist that curators follow for every incident.

This workflow must be followed for every incident record created in v0.3 and later. No incident record may be committed without completing this workflow.

---

## 1. Source Intake Process

### Step 1.1 — Identify the incident

Before searching for sources, write a brief description of the incident you intend to document:

- What happened?
- What AI system was involved?
- What failure mode does it appear to represent?
- What sector was affected?
- Approximately when did it occur?

This description is a working note, not the final summary. It helps focus the source search.

### Step 1.2 — Search for primary sources

Search for primary sources before looking at secondary databases (AIID, OECD, AIAAIC, MIT tracker).

Primary source search order:
1. Official reports: regulatory decisions, government investigations, court records, official company statements.
2. Reputable news outlets: Reuters, BBC, AP, The Guardian, Financial Times, Wired, MIT Technology Review, and similar.
3. Academic papers and research reports.

Record every source found, even if it is not used in the final record. This creates an audit trail.

### Step 1.3 — Search secondary databases

After searching for primary sources, check secondary databases:
- AI Incident Database (AIID): https://incidentdatabase.ai/
- OECD AI Incidents Monitor: https://oecd.ai/en/incidents
- AIAAIC Repository: https://www.aiaaic.org/aiaaic-repository
- MIT AI Incident Tracker: https://airisk.mit.edu/ai-incident-tracker

Note: Citing an incident from these databases does not mean copying their record. Write an original summary and cite the database as a secondary source alongside the primary source.

Important: Before citing any record from these databases, verify the data license using the `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`. Do not cite from a database with an unverified or restrictive data license.

### Step 1.4 — Compile the source list

Compile a list of all sources found. For each source, record:
- URL
- Source type (official, AIID, OECD, AIAAIC, MIT, news, other)
- Publication or access date
- Title
- Whether the URL is publicly accessible
- Whether the source confirms the core facts of the incident

---

## 2. Minimum Source Requirements

Before proceeding to write an incident record, the following minimum requirements must be met:

| Requirement | Minimum | Preferred |
|---|---|---|
| Number of sources | 1 | 2 or more independent sources |
| Source accessibility | At least one publicly accessible URL | All sources publicly accessible |
| Source type | At least one Tier 1, 2, or 3 source | At least one Tier 1 or 2 source |
| Source confirms AI involvement | Yes | Yes, with specifics |
| Source confirms core facts | Yes | Multiple sources confirm independently |
| Data license verified (for AIID/OECD/AIAAIC/MIT) | Yes, if citing these databases | Yes |

If the minimum requirements are not met, the incident must be rejected or postponed. See section 7.

---

## 3. Primary vs Secondary Source Treatment

### 3.1 Primary sources

A primary source is a source that directly documents the incident from first-hand knowledge or official authority:

- Regulatory decisions and enforcement actions
- Court judgments and legal filings
- Government investigation reports
- Official company statements acknowledging the incident
- Peer-reviewed academic papers with primary research

Primary sources support `high` confidence when they explicitly document the incident.

Treatment:
- Cite the primary source directly.
- Quote short excerpts (one or two sentences) only when the exact wording is important.
- Paraphrase and summarize in original words for the incident summary.
- Record the access date.

### 3.2 Secondary sources

A secondary source reports on or references the incident but is not the original authority:

- News articles reporting on an incident
- AIID, OECD, AIAAIC, MIT tracker records (which themselves cite primary sources)
- Blog posts and commentary
- Academic papers that reference the incident without primary research

Secondary sources support `medium` confidence when two or more independent sources confirm the same core facts.

Treatment:
- Cite the secondary source.
- Also cite the primary source that the secondary source references, where possible.
- Do not treat a secondary source as confirmation of facts it does not independently verify.
- Do not cite a secondary source from AIID/OECD/AIAAIC/MIT without verifying the data license.

### 3.3 Source hierarchy in the incident record

When multiple sources are available, list them in the `sources` array in order of authority:
1. Official sources first
2. Established incident databases second (if license verified)
3. News sources third
4. Other sources last

---

## 4. Citation Fields

Every source entry in an incident record must contain the following fields:

| Field | Required | Format | Notes |
|---|---|---|---|
| `url` | Yes | Full URL | Must be publicly accessible. Use archived URL if original is unavailable. |
| `database` | Yes | One of: AIID, OECD, AIAAIC, MIT, news, official, other | Classifies the source type. |
| `accessed` | Yes | 19 May 2026 format | Date the URL was accessed and verified. |
| `title` | Recommended | Free text | Title of the article, report, or record. |

Example source entry:
```json
{
  "url": "https://example-news.com/article/ai-legal-citations",
  "database": "news",
  "title": "AI system generates false legal citations in court filing",
  "accessed": "19 May 2026"
}
```

---

## 5. Confidence Levels

Assign confidence based on the quality and quantity of sources, following `SOURCE_AND_CITATION_POLICY_DRAFT.md` section 3.

| Confidence | Source requirement | Wording requirement |
|---|---|---|
| `high` | At least one Tier 1 source (official report, regulatory decision, court record) | "According to [official source]..." or "As documented in [official report]..." |
| `medium` | At least two independent Tier 2 or Tier 3 sources | "According to public reports..." or "As reported by [source] and [source]..." |
| `low` | At least one source of any tier | "According to a single public report..." or "It has been reported that..." |

Rules:
- Default to `low` when in doubt.
- Upgrade to `medium` only when a second independent source confirms the core facts.
- Upgrade to `high` only when official documentation is available.
- Never assign `high` based on news coverage alone, regardless of how many outlets covered the story.

---

## 6. Disputed Incident Handling

### 6.1 When facts are disputed

If sources disagree on the facts of an incident:
- Note the dispute in the summary: "Reports differ on whether..."
- Cite both sides of the dispute with their respective sources.
- Assign `low` or `medium` confidence depending on source quality.
- Do not resolve the dispute in the summary.
- Do not take sides.

### 6.2 When causation is disputed

If the cause of the incident is disputed or unclear:
- Do not assert a cause without strong evidence.
- Use "reportedly caused by", "attributed to", or "the cause has not been publicly confirmed".
- Note if an official investigation is ongoing.

### 6.3 When the organization disputes the incident

If the organization involved has publicly disputed the incident or its characterization:
- Note the organization's position in the summary.
- Cite the organization's statement as a source.
- Do not characterize the dispute as resolved unless an official determination has been made.

---

## 7. Careful Wording Rules

Apply the following wording rules to every incident summary. These rules operationalize `SOURCE_AND_CITATION_POLICY_DRAFT.md` section 5.

### 7.1 Required hedging language

| Situation | Required phrasing |
|---|---|
| Describing what happened | "reportedly", "according to public reports", "as publicly documented" |
| Describing cause | "reportedly caused by", "appears to have been caused by", "was attributed to" |
| Describing impact | "reportedly affected", "is reported to have caused", "according to [source]" |
| Describing organization's role | "the system reportedly", "the organization reportedly", "according to reports" |

### 7.2 Prohibited language

Do not use:
- "proved", "confirmed", "established" — unless an official source explicitly uses these terms
- "negligent", "reckless", "fraudulent", "illegal" — these are legal conclusions
- "the company knew", "the company hid", "the company lied" — these require strong evidence
- "caused by" without hedging — use "reportedly caused by" or "attributed to"
- "violated [law or regulation]" — use "may have implications under [law]" or "has been reviewed under [law]"
- "is compliant" or "is not compliant" — the Atlas does not make compliance determinations

### 7.3 Control mapping language

When writing the `controls` field and `lessons` field, use careful language:
- "could help prevent" — not "would have prevented"
- "supports detection of" — not "detects"
- "reduces the risk of" — not "eliminates the risk of"
- "is relevant to" — not "is required for compliance with"

---

## 8. Source Review Checklist

Complete this checklist for every incident before writing the incident record.

### Source discovery

- [ ] Searched for primary sources (official reports, regulatory decisions, court records).
- [ ] Searched for news sources (at least two reputable outlets).
- [ ] Checked AIID, OECD, AIAAIC, MIT tracker (if applicable).
- [ ] Compiled a list of all sources found.

### Source quality

- [ ] At least one source meets the minimum source requirements (section 2).
- [ ] All source URLs are publicly accessible (verified today).
- [ ] Source type is identified for each source (official, AIID, OECD, AIAAIC, MIT, news, other).
- [ ] Confidence level is assigned based on source quality (section 5).

### License verification (for database sources)

- [ ] If citing AIID: data license verified in `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`. ☐ Verified ☐ Pending — do not cite until verified.
- [ ] If citing OECD: data reuse terms verified. ☐ Verified ☐ Pending — do not cite until verified.
- [ ] If citing AIAAIC: data reuse terms verified. ☐ Verified ☐ Pending — do not cite until verified.
- [ ] If citing MIT tracker: data reuse terms verified. ☐ Verified ☐ Pending — do not cite until verified.

### Content review

- [ ] Summary is written in original words (not copied from any source).
- [ ] Summary uses required hedging language.
- [ ] Summary contains no prohibited language.
- [ ] Summary makes no legal conclusions.
- [ ] Summary does not name private individuals.
- [ ] Disputed facts are noted as disputed.
- [ ] Ongoing legal proceedings are noted as ongoing.
- [ ] Control mapping language is careful (could help prevent, not would have prevented).

### Final check

- [ ] All source fields are complete (url, database, accessed).
- [ ] Access date is today's date.
- [ ] Confidence level is consistent with source quality.
- [ ] Record is ready for schema validation.

---

## 9. When an Incident Must Be Rejected or Postponed

Reject an incident (do not include it in the Atlas) if:

- No publicly accessible source can be found.
- The only source is a Tier 4 source (single blog, social media post, anonymous report).
- AI involvement cannot be confirmed from public sources.
- A factual summary cannot be written without legal risk.
- The incident involves naming private individuals in a way that could be harmful.

Postpone an incident (defer to a later batch) if:

- The data license for the primary source database has not been verified.
- Legal proceedings are ongoing and including the incident could create legal risk.
- The facts are disputed and no authoritative source has resolved the dispute.
- The incident is very recent and additional sources are likely to emerge.

When an incident is rejected or postponed, record the reason in a working note. Do not commit rejected incidents to the repository.

---

## 10. How to Record Uncertainty

When uncertainty exists about an incident, record it explicitly in the incident record:

### In the summary field

Use hedging language to reflect uncertainty:
- "According to a single public report..." (for `low` confidence)
- "The cause has not been publicly confirmed..."
- "Reports differ on whether..."
- "An official investigation was reportedly ongoing as of [date]..."

### In the confidence field

Assign `low` confidence when:
- Only one source is available.
- The source is a Tier 4 source.
- The facts are disputed.
- The incident has not been independently verified.

### In the sources field

If a source URL is no longer accessible, note this:
```json
{
  "url": "https://web.archive.org/web/20230601/https://example.com/article",
  "database": "news",
  "title": "Original article (archived)",
  "accessed": "19 May 2026"
}
```

### In working notes (not committed)

Keep a working note for each incident documenting:
- sources considered and rejected;
- reasons for confidence level assignment;
- any uncertainty about facts or causation;
- any escalation to Control Tower.

Working notes are not committed to the repository. They are for the curator's reference during the curation process.

---

## 11. Workflow Summary

```
1. Identify incident → write working description
2. Search primary sources → official reports, news, academic
3. Search secondary databases → AIID, OECD, AIAAIC, MIT (if license verified)
4. Compile source list → URL, type, date, title, accessibility
5. Check minimum source requirements → reject or postpone if not met
6. Verify data licenses → for any database source being cited
7. Assign confidence level → based on source quality
8. Write original summary → hedging language, no legal conclusions
9. Complete source review checklist → all items checked
10. Write incident record → all required fields
11. Validate against schema → 11 required fields, taxonomy IDs
12. Submit for review → Control Tower approval for first batch
```
