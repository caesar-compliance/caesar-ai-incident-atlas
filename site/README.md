# Caesar AI Incident Atlas — Static Site

Public static site for browsing INC-0001–INC-0010.  
Live at [`https://atlas.caesar.no/`](https://atlas.caesar.no/). No backend. No build step required.

## Local Preview

Run from the **repository root**:

```bash
python3 -m http.server 8080
```

Then open:

```
http://localhost:8080/site/
```

The site loads `data/incident-index.json` and the 10 individual incident JSON files from `data/incidents/`.  
All paths are relative to the repository root so the server must be started from there.

## What It Does

- Lists all 10 incident records with sector, severity, confidence, and failure mode badges
- **Global search** — searches across ID, title, summary, AI context, lessons, sectors, failure modes, controls, evidence, sources
- **Sort** — by ID, newest/oldest date, severity, confidence
- **Active filter chips** — shows current filters; click `×` to remove individual filters
- Click any card to expand structured detail: What Happened, AI System/Context, Harms, Impact, Failure Modes, Controls, Evidence Required, Governance Lessons, Affected Stakeholders, Sources, Caveats
- **Deep link** — `#INC-0003` opens and scrolls to that record; **Copy link** button per card
- **Dataset status panel** — total records, last-verified date, draft taxonomy notice
- Draft taxonomy labels on `transportation-autonomous`, `retail-ecommerce` sectors and `FM-REL`
- Source caution labels on medium/low-confidence records (INC-0008, INC-0010)
- Clear error state if data fails to load
- Keyboard accessible (Enter/Space to expand, tab-navigable filters and buttons)

## What It Does Not Do

- No server-side code
- No external network requests
- No database
- No authentication

## Dataset & Digest QA

### 1. Dataset Validation
Run the full dataset and site validator from the **repository root**:

```bash
python3 tools/validate_dataset.py
```

Install dependencies first:

```bash
python3 -m pip install -r tools/requirements.txt
```

See `tools/README.md` for the full check list.

### 2. Digest Validation
Run the offline static digest validator from the **repository root**:

```bash
node scripts/validate-digests.mjs
```

This verifies that all weekly and monthly digests are structurally sound, cross-reference valid cases in `data/incident-index.json`, do not contain synthetic mock or candidate records, and that public site duplicate copies are perfectly in sync.

### 3. RSS Feed Compilation
Compile the RSS XML feeds from the static digests:

```bash
node scripts/build-rss-feeds.mjs
```

This aggregates all active digests, sorts them chronologically, and compiles:
- `site/rss.xml` (Consolidated feed)
- `site/digests/weekly.xml` (Weekly operational briefs only)
- `site/digests/monthly.xml` (Monthly strategic trends only)

---

## Self-Contained Publish Package

As of T044, `site/` is a fully self-contained static package containing both the incident catalog and briefing digests:

- `site/data/incident-index.json` — publish copy with site-root-relative paths
- `site/data/incidents/` — 12 incident JSON files
- `site/data/taxonomy/` — 6 taxonomy JSON files
- `site/data/digests/` — publish copies of weekly/monthly digest JSON files
- `site/digests/` — digests portal HTML landing page, subpages, and RSS feeds
- `site/rss.xml` — consolidated RSS feed

`site/` can be served as the static root directly:

```bash
cd site && python3 -m http.server 8081
# open http://localhost:8081/
```

The root `data/` directory remains the authoritative source of truth for record authoring and curation.
Run `python3 tools/validate_dataset.py` and `node scripts/validate-digests.mjs` from the repo root to verify sync.

---

## Status

**TECHNICAL PUBLIC MVP: LIVE + VERIFIED** — `https://atlas.caesar.no/` (GitHub Pages, GitHub Actions, T021–T055). Version: v0.14.0. **13 published records (INC-0001–INC-0013).** Static case pages at `site/cases/`. Record Type and Jurisdiction filters active. Guidance/governance case records display disclaimer badge. Static Digests Portal fully integrated (T044). `site/` is self-contained. No CNAME file in repo. HTTPS enforced. RSS feeds rebuilt. All validators pass. Not legal advice.
