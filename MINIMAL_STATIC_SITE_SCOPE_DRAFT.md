# Minimal Static Site — Scope Draft

> **Task:** T011 — Dataset MVP Public Readiness Review  
> **Date:** 19 May 2026  
> **Status:** Planning draft only. No code. No build. Requires Control Tower approval before T012.

---

## What the Site Does (Minimal Scope)

| Feature | Included | Notes |
|---|---|---|
| Read local JSON incident files | ✅ | Static build reads `data/incidents/*.json` at build time |
| Incident list page | ✅ | Cards: ID, title, sector, severity, confidence |
| Incident detail page/card | ✅ | All fields from schema displayed |
| Filter by sector | ✅ | Client-side static filter |
| Filter by severity | ✅ | Client-side static filter |
| Filter by failure mode | ✅ | Client-side static filter |
| Search backend | ❌ | Not in scope |
| Database | ❌ | Not in scope |
| Scraper | ❌ | Not in scope |
| Admin UI | ❌ | Not in scope |
| External data import at build time | ❌ | Not in scope |
| User accounts / auth | ❌ | Not in scope |
| Server-side API | ❌ | Not in scope |
| CMS | ❌ | Not in scope |

---

## Display Requirements

- Confidence level (`high` / `medium` / `low`) must be visible on each record
- Draft taxonomy IDs (`transportation-autonomous`, `retail-ecommerce`, FM-REL) must carry a visible "draft label"
- Each record must display `accessed` date for sources
- Site must include a note that source URLs were last verified at record creation date
- No verbatim reproduction of source text

---

## Technology Constraints (For T012 Consideration)

- **Static-first only.** No server-side runtime at initial build.
- Must be deployable without external API dependencies.
- JSON data files are the single source of truth — no separate database.
- Build process reads `data/incidents/*.json` and `data/taxonomy/*.json` directly.
- Technology selection (Next.js static export, Astro, Hugo, 11ty, etc.) deferred to T012 architecture plan.

---

## T012 — What It May Do (If Control Tower Approves)

| Option | Description |
|---|---|
| **Option A — Architecture plan** | Select static site technology, define file/component structure, define build pipeline — no code |
| **Option B — Minimal prototype** | Implement a single-page or minimal static build showing incident list + detail; no filters yet |
| **Option C — Combined** | Architecture plan + minimal prototype in same task |

### T012 Hard Constraints (Regardless of Option)

- No scraping
- No database
- No admin UI
- No external data import
- No public deployment without explicit Control Tower approval
- No user accounts or authentication
- No server-side runtime
- JSON incident files remain the authoritative data source

### T012 Pre-conditions

1. Control Tower reviews `DATASET_MVP_PUBLIC_READINESS_REVIEW.md` and confirms readiness
2. Control Tower confirms T012 scope (A/B/C)
3. Draft sector IDs should be stabilised or labelling strategy confirmed before T012 build
4. T012 formally initiated by Control Tower
