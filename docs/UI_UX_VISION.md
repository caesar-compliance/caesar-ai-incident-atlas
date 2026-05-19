# UI/UX Vision — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Status:** Vision document — implementation planned for v0.4 Static Site phase

---

## Overview

This document describes the UI/UX vision for the public site at `incidents.caesar.no`. It is a planning reference for the static site phase (v0.4), not an implementation specification.

The site should feel like a practical governance reference tool, not a news feed or academic database. The primary user is a consultant or compliance professional who needs to find relevant incidents quickly and extract governance lessons.

---

## 1. Design Principles

**Practical over comprehensive.** The site is a governance tool, not an incident archive. Every design decision should serve the goal of helping users find relevant incidents and extract governance lessons.

**Fast and searchable.** Users should be able to find relevant incidents in under 30 seconds. Search and filters are the primary navigation.

**Credible and careful.** The site should feel authoritative but careful. Source citations are visible. Confidence levels are displayed. Disclaimers are present but not intrusive.

**Simple and maintainable.** The site is generated from JSON data files. No backend. No database. Easy to update by adding new incident files.

**Accessible.** The site targets WCAG 2.1 AA compliance. Full validation requires manual testing with assistive technologies.

---

## 2. Site Structure

```
incidents.caesar.no/
│
├── /                           Home — search, featured incidents, category cards
├── /incidents/                 Incident index — filterable list
├── /incidents/INC-001/         Individual incident card
├── /failure-modes/             Failure mode taxonomy index
├── /failure-modes/FM-PRIV/     Failure mode page with related incidents
├── /controls/                  Control index
├── /controls/CTL-OVER-001/     Control page with related incidents and evidence
├── /sectors/                   Sector index
├── /sectors/healthcare/        Sector page with filtered incidents
├── /export/                    Export options and API documentation
└── /about/                     About the Atlas, methodology, disclaimer
```

---

## 3. Page Designs

### 3.1 Home page

**Purpose:** Entry point. Communicate what the Atlas is and help users start searching.

**Elements:**
- Header: "Caesar AI Incident Atlas" with short tagline: "Learn from AI failures. Map incidents to practical controls."
- Search bar: prominent, full-text search across all incidents.
- Featured incidents: 3–5 recent or notable incidents with title, sector badge, severity badge.
- Failure mode category cards: 8 cards (one per top-level failure mode) with icon, name, incident count.
- Sector shortcuts: quick links to most common sectors.
- Ecosystem link: "Part of the Caesar AI Governance Hub" with link to caesar.no.
- Disclaimer: brief, visible but not intrusive.

### 3.2 Incident index

**Purpose:** Browse and filter all incidents.

**Elements:**
- Search bar (persistent).
- Filter panel:
  - Failure mode (multi-select, hierarchical).
  - Sector (multi-select).
  - Severity (multi-select: low, medium, high, critical).
  - Confidence (multi-select: low, medium, high).
  - Date range.
- Sort options: date (newest first), severity (highest first), relevance.
- Incident cards in a list or grid:
  - Title.
  - Date.
  - Sector badges.
  - Failure mode tags.
  - Severity badge (color-coded).
  - Confidence indicator.
  - Short summary excerpt.
  - "View incident" link.
- Pagination or infinite scroll.
- Result count: "Showing 12 of 47 incidents".

### 3.3 Individual incident card

**Purpose:** Full incident details with governance mapping.

**Elements:**
- Incident ID and title.
- Date and confidence level.
- Sector badges.
- Severity badge.
- Summary (factual, with careful wording).
- Source citations (linked, with database label).
- Failure mode tags (linked to failure mode pages).
- Harm types.
- Affected stakeholders.
- Impact description.
- Controls section:
  - List of recommended controls with names and descriptions.
  - Link to each control page.
- Evidence required section:
  - List of evidence types that should exist.
  - Link to caesar-ai-evidence format.
- Governance lessons (bullet list).
- Related incidents (linked cards).
- Export button: JSON, Markdown.
- Disclaimer: "Based on publicly available information. See methodology."

### 3.4 Failure mode page

**Purpose:** Explain a failure mode and show related incidents.

**Elements:**
- Failure mode name and ID.
- Description.
- Sub-categories (expandable list).
- Related incidents (filtered incident list).
- Control recommendations for this failure mode.
- Evidence requirements.
- Sector distribution (which sectors see this failure mode most).
- Link to taxonomy documentation.

### 3.5 Control page

**Purpose:** Explain a control and show which incidents it addresses.

**Elements:**
- Control name and ID.
- Category.
- Description.
- Failure modes addressed (linked).
- Related incidents (incidents where this control could help).
- Evidence required to demonstrate this control is active.
- Link to caesar-ai-evidence format.
- Notes on applicability.

### 3.6 Sector page

**Purpose:** Show incidents relevant to a specific sector.

**Elements:**
- Sector name.
- Description and regulatory context note.
- Incident list (filtered by sector).
- Most common failure modes in this sector.
- Top control recommendations for this sector.
- Sector-specific governance notes.

### 3.7 Export page

**Purpose:** Explain export options and how to use Atlas data in governance workflows.

**Elements:**
- Export formats: JSON, Markdown.
- How to use Atlas exports with caesar-ai-evidence.
- How to import into Caesar AI Governance OS (future).
- Data license and citation requirements.
- Link to GitHub repository.

### 3.8 About page

**Purpose:** Explain the Atlas methodology, disclaimer, and ecosystem context.

**Elements:**
- What the Atlas is and is not.
- Methodology: how incidents are selected and curated.
- Source and citation model.
- Confidence levels explained.
- Disclaimer (full text).
- Benchmark references (AIID, OECD, AIAAIC, MIT, IBM).
- Caesar AI Governance Hub ecosystem context.
- Contact / contribution information.

---

## 4. Search Design

### 4.1 Full-text search

Client-side search using a pre-built index. No backend required.

Search covers:
- incident titles;
- summaries;
- failure mode names;
- control names;
- sector names;
- lessons.

### 4.2 Search result ranking

Results ranked by:
1. Title match (highest weight).
2. Summary match.
3. Failure mode and control match.
4. Recency (newer incidents ranked higher for equal relevance).

### 4.3 Search suggestions

As the user types, suggest:
- failure mode names;
- sector names;
- control names;
- common search terms (e.g. "hallucination", "bias", "agent", "privacy").

---

## 5. Visual Design Direction

**Color palette:**
- Primary: dark navy or deep blue (trust, authority).
- Accent: amber or orange (attention, warning).
- Severity colors: green (low), yellow (medium), orange (high), red (critical).
- Background: white or very light grey.
- Text: near-black for readability.

**Typography:**
- Clean, readable sans-serif.
- Clear hierarchy: title, subtitle, body, caption.
- Sufficient contrast for accessibility.

**Severity badges:**
- Color-coded pill badges: low (grey), medium (yellow), high (orange), critical (red).

**Failure mode tags:**
- Colored tags by category: privacy (blue), bias (purple), hallucination (teal), safety (red), security (orange), unauthorized action (dark red), transparency (grey), reliability (light blue).

**Confidence indicator:**
- Simple icon or label: low (single dot), medium (two dots), high (three dots).

---

## 6. Training Mode (Future)

A future "training mode" for workshop facilitators:

- Workshop-ready case pages with larger text and simplified layout.
- Discussion questions displayed prominently.
- Governance exercise prompts.
- Printable case study format (print CSS).
- Workshop pack export (PDF or Markdown bundle).

This is a future consideration for v1.x, not a v0.4 requirement.

---

## 7. Technology Considerations

Technology decision is deferred to v0.3/v0.4 planning. Options to evaluate:

| Option | Pros | Cons |
|---|---|---|
| Eleventy (11ty) | Simple, fast, flexible, good static site support | Requires Node.js |
| Astro | Modern, component-based, good performance | More complex setup |
| Custom Python script | No framework dependency, full control | More work to build |
| Hugo | Fast, single binary, good for data-driven sites | Go template syntax |

Decision criteria:
- No backend required.
- Easy to regenerate from JSON data files.
- Good client-side search support.
- Accessible output.
- Easy to deploy to `incidents.caesar.no`.

The technology decision requires Control Tower approval before implementation.
