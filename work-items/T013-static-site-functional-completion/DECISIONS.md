# T013 — Decisions

**Date:** 19 May 2026  
**New decisions:** 4

---

### DEC-T013-001 — Search Implemented as Client-Side Substring Match

Full-text search runs entirely in-browser with `String.includes()` over a concatenated haystack of all incident fields. No index, no fuzzy matching. Sufficient for 10 records; re-evaluate at 50+ records.

---

### DEC-T013-002 — Date Parsing Uses "D Month YYYY" Format Matching Schema

Sort by date uses a custom `parseDateApprox()` parser matching the schema's `"^[0-9]{1,2} [A-Z][a-z]+ [0-9]{4}$"` format. No external date library required.

---

### DEC-T013-003 — Deep Link via URL Hash; No SPA Router

Deep linking uses `location.hash` and `history.replaceState`. No SPA router needed. Hash is updated on card expand and restored on page load / hashchange.

---

### DEC-T013-004 — Detail View Structured into Named Sections, Not Tabs

Nine named sections (What Happened, AI System/Context, Harms, Impact, Failure Modes, Controls, Evidence Required, Governance Lessons, Sources, Caveats) render inline in the expanded card. No tab component needed for 10 records at current field density.
