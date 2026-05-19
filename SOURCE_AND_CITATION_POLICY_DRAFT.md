# Source and Citation Policy Draft — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.2 (draft)
**Status:** Draft policy — approved for use in T004 and v0.3. Subject to revision.
**Work item:** T003

---

## Purpose

This document defines the source and citation rules for Caesar AI Incident Atlas. Every incident record must follow these rules. The rules protect Caesar from legal risk, maintain credibility with users, and ensure the Atlas is a trustworthy governance reference.

This is an internal policy document. It does not constitute legal advice.

---

## 1. Required Source Fields

Every incident record must include at least one source entry. Each source entry must contain:

| Field | Required | Description |
|---|---|---|
| `url` | Yes | Publicly accessible URL to the source |
| `database` | Yes | Source type label: AIID, OECD, AIAAIC, MIT, news, official, other |
| `accessed` | Yes | Date the URL was accessed, format: 19 May 2026 |
| `title` | Recommended | Title of the source article, report, or record |

A source entry with only a URL and no accessible content does not satisfy the source requirement. The curator must verify that the URL is accessible and that the content describes the incident being summarised.

---

## 2. Preferred Source Types

Sources are ranked by preference. Higher-ranked sources produce higher confidence levels.

### Tier 1 — Official sources (supports `high` confidence)

- Regulatory decisions and enforcement actions (e.g. data protection authority decisions, court judgments)
- Government investigation reports
- Official parliamentary or congressional records
- Peer-reviewed academic papers with primary research
- Official company statements acknowledging the incident

### Tier 2 — Established incident databases (supports `medium` or `high` confidence)

- AI Incident Database (AIID) — verify data license before citing
- OECD AI Incidents and Hazards Monitor — verify data license before citing
- AIAAIC Repository — verify data license before citing
- MIT AI Incident Tracker — verify data license before citing

Note: Citing an incident from these databases does not mean copying their record. Write an original summary and cite the database as a source.

### Tier 3 — Reputable news and research (supports `medium` confidence with two or more sources)

- Major news outlets with editorial standards (e.g. Reuters, BBC, AP, The Guardian, Financial Times, Wired, MIT Technology Review)
- Research institution reports
- Industry analyst reports from named analysts

A single news source is not sufficient for `medium` confidence. Two or more independent news sources covering the same facts are required.

### Tier 4 — Single news source or blog (supports `low` confidence only)

- Single news article
- Blog post
- Social media post
- Forum discussion

These sources support `low` confidence only. They may be used when no better source is available, but the summary must reflect the uncertainty.

---

## 3. Confidence Levels

| Level | Minimum source requirement | Wording requirement |
|---|---|---|
| high | At least one Tier 1 source | "According to [official source]..." or "As documented in [official report]..." |
| medium | At least two independent Tier 2 or Tier 3 sources | "According to public reports..." or "As reported by [source] and [source]..." |
| low | At least one source of any tier | "According to a single public report..." or "It has been reported that..." |

Default: assign `low` when in doubt. Upgrade only when the source evidence clearly supports it.

---

## 4. Citation Rules

### 4.1 Write original summaries

Every incident summary must be written in original words by the curator. Do not copy text from source articles, database records, or reports. Summarise the key facts in Caesar's own words.

Acceptable: "According to public reports, a language model used in a legal context reportedly generated fabricated case citations."

Not acceptable: [verbatim copy of a news article paragraph]

### 4.2 Short fair-use style excerpts

Short direct quotations (one or two sentences) from official sources may be used when the exact wording is important (e.g. a regulatory finding or official statement). These must be:

- clearly marked as quotations with quotation marks;
- attributed to the specific source;
- kept to the minimum necessary;
- not used as a substitute for an original summary.

Do not reproduce substantial portions of any source. When in doubt, paraphrase.

### 4.3 Cite the source, not the database

When citing an incident from AIID, OECD, AIAAIC, or MIT tracker, also cite the original source that the database references where possible. The database entry is a secondary source; the original report or article is the primary source.

Example:
```
sources:
  - url: https://example-news.com/article
    database: news
    title: "AI system generates false legal citations"
    accessed: 19 May 2026
  - url: https://incidentdatabase.ai/cite/123
    database: AIID
    title: "AIID record #123"
    accessed: 19 May 2026
```

### 4.4 Verify URL accessibility

Before committing an incident record, verify that all source URLs are accessible. A URL that returns a 404 or requires a login does not satisfy the source requirement. Use an archived version (e.g. web.archive.org) if the original URL is no longer accessible, and note this in the source entry.

### 4.5 Record the access date

Always record the date the URL was accessed. Web content changes. The access date documents what was available at the time of curation.

---

## 5. Careful Wording Rules

### 5.1 Required hedging language

All incident summaries must use hedging language that reflects the uncertainty of publicly reported information:

| Situation | Required phrasing |
|---|---|
| Describing what happened | "reportedly", "according to public reports", "as publicly documented" |
| Describing cause | "reportedly caused by", "appears to have been caused by", "was attributed to" |
| Describing impact | "reportedly affected", "is reported to have caused", "according to [source]" |
| Describing organization's role | "the system reportedly", "the organization reportedly", "according to reports" |

### 5.2 Prohibited language

Do not use:

- "proved", "confirmed", "established" — unless an official source explicitly uses these terms
- "negligent", "reckless", "fraudulent", "illegal" — these are legal conclusions
- "the company knew", "the company hid", "the company lied" — these are factual claims that require strong evidence
- "caused by" without hedging — use "reportedly caused by" or "attributed to"
- "violated [law or regulation]" — use "may have implications under [law]" or "has been reviewed under [law]"
- "is compliant" or "is not compliant" — the Atlas does not make compliance determinations

### 5.3 Naming organizations and individuals

When naming organizations:

- Use the organization's official name.
- Do not add editorial characterizations (e.g. "the controversial company").
- Describe the organization's role in the incident factually and with hedging.

When naming individuals:

- Avoid naming individuals unless they are public figures acting in their public capacity (e.g. a CEO making a public statement).
- Do not name private individuals who were affected by an incident.
- Do not name individuals in a way that could be defamatory.

---

## 6. Rules for Disputed or Uncertain Incidents

### 6.1 Disputed facts

When the facts of an incident are disputed between sources:

- Note the dispute in the summary: "Reports differ on whether..."
- Cite both sides of the dispute with their respective sources.
- Assign `low` or `medium` confidence depending on the quality of sources.
- Do not resolve the dispute in the summary — present the available information.

### 6.2 Uncertain causation

When the cause of an incident is uncertain:

- Do not assert a cause without strong evidence.
- Use "reportedly caused by", "attributed to", or "the cause has not been publicly confirmed".
- Note if an official investigation is ongoing.

### 6.3 Unverified incidents

When an incident cannot be verified from a public source:

- Do not include it in the Atlas.
- If it is included at `low` confidence, note clearly that the incident has not been independently verified.

### 6.4 Incidents involving ongoing legal proceedings

When an incident involves ongoing legal proceedings:

- Note that proceedings are ongoing.
- Do not characterize the outcome of proceedings that have not concluded.
- Do not make statements that could prejudice ongoing proceedings.
- Consider deferring the record until proceedings conclude.

---

## 7. No Unsupported Legal Conclusions

The Atlas does not make legal conclusions. It does not determine:

- whether an organization violated a law or regulation;
- whether an organization is liable for harm;
- whether an AI system is high-risk under the EU AI Act or any other regulation;
- whether an organization is compliant or non-compliant with any standard.

The Atlas may note:

- that an incident "may be relevant to" a regulatory framework;
- that an incident "has been reviewed under" a law or regulation;
- that an incident "raises questions about" a governance requirement;
- that a regulatory authority "has investigated" or "has taken action regarding" an incident.

---

## 8. No Defamatory Language

The Atlas must not contain language that could be defamatory. This means:

- Do not make false statements of fact about organizations or individuals.
- Do not imply wrongdoing without factual basis.
- Do not use language designed to damage reputation without factual support.
- When in doubt, use more hedging language or remove the statement.

If a curator is unsure whether a statement could be defamatory, escalate to the Control Tower before publishing.

---

## 9. No Scraping or Importing External Datasets

For v0.2 and v0.3:

- Do not scrape external incident databases.
- Do not import external dataset files into the Caesar repository.
- Do not use automated tools to bulk-collect incident data.
- All incident records must be manually curated by a human curator.

This rule may be revisited in later phases after data license verification and Control Tower approval.

---

## 10. Source Verification Workflow

Before creating an incident record:

1. Identify the incident from a public source.
2. Find at least one additional independent source confirming the core facts (for `medium` or `high` confidence).
3. Verify that all source URLs are publicly accessible.
4. Verify the data license of any AIID, OECD, AIAAIC, or MIT tracker source being cited.
5. Write an original summary in Caesar's own words.
6. Assign confidence level based on source quality.
7. Apply required hedging language.
8. Review for prohibited language and potential defamation.
9. Record all sources in the incident record with access dates.

---

## 11. Policy Review

This policy should be reviewed:

- before the Dataset MVP (v0.3) begins;
- when a new source type is being considered;
- when a legal or reputational concern arises;
- at least once per major version release.

Control Tower (Artem / ChatGPT) is responsible for approving any exceptions to this policy.
