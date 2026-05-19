# T012 — Decisions

**Date:** 19 May 2026  
**New decisions:** 4

---

### DEC-T012-001 — Vanilla HTML/CSS/JS; No Framework

No React, Vue, Svelte, or build pipeline. The dataset is 10 static JSON files. Vanilla JS fetch + DOM manipulation is sufficient and avoids any dependency surface.

---

### DEC-T012-002 — Fetch from `data/` via Relative Path; Serve from Repo Root

Site is at `site/index.html`. Data files live at `data/`. Paths from `site/` to `data/` use `../data/`. Server must be started from repo root (`python3 -m http.server 8080`). This keeps the authoritative data files in their canonical location.

---

### DEC-T012-003 — incident-index.json as Thin Index Only

`data/incident-index.json` stores only display metadata (id, file path, title, date, sector, severity, confidence, failure_modes). Full record content is not duplicated. This avoids sync drift between index and canonical records.

---

### DEC-T012-004 — No Public Deployment in T012

The prototype is local-only. T013 must obtain explicit Control Tower approval before any public deployment step is taken.
