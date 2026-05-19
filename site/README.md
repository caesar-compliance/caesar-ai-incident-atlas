# Caesar AI Incident Atlas — Local Functional MVP

Local static prototype for browsing INC-0001–INC-0010.  
No deployment. No backend. No build step required.

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
- Not publicly deployed

## Dataset QA

Run the full dataset and site validator from the **repository root**:

```bash
python3 tools/validate_dataset.py
```

Install dependencies first:

```bash
python3 -m pip install -r tools/requirements.txt
```

See `tools/README.md` for the full check list.

## Status

T015 local RC — all local checks pass. Public deployment requires Control Tower approval (T016+).
