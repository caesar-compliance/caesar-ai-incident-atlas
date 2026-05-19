# Caesar AI Incident Atlas — Local Prototype

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
- Click any card to expand the full detail: summary, harms, impact, lessons, controls, evidence required, sources
- Client-side filters: sector, severity, confidence, failure mode
- Draft taxonomy labels on `transportation-autonomous`, `retail-ecommerce` sectors and `FM-REL`
- Source caution labels on medium/low-confidence records

## What It Does Not Do

- No server-side code
- No external network requests
- No database
- No authentication
- Not publicly deployed

## Status

T012 prototype — for local review only. Public deployment requires Control Tower approval (T013+).
