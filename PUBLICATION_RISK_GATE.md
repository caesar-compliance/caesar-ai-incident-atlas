# Publication Risk Gate

**Task:** T016 — Public Deployment Plan  
**Date:** 19 May 2026  
**Purpose:** Go/no-go criteria before public deployment. Each item must reach Pass before deployment.

---

## Gate Table

| # | Criterion | Status | Notes |
|---|---|---|---|
| G-01 | **Source/license review** — all 10 incident source URLs cleared for public citation | ⚠ **Pending** | `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` exists but formal sign-off not recorded |
| G-02 | **Wording/legal risk review** — record summaries and lessons reviewed for defamation/liability | ⚠ **Pending** | No formal legal review completed |
| G-03 | **Domain/hosting decision** — CT selects URL and hosting option | ⚠ **Pending** | `incidents.caesar.no` proposed; not confirmed |
| G-04 | **Local QA pass** — `python3 tools/validate_dataset.py` exits 0 | ✅ **Pass** | Confirmed T015 + T016 |
| G-05 | **No external frontend dependencies** — no CDN, fonts, analytics in `site/` | ✅ **Pass** | grep scan clean (T015) |
| G-06 | **No internal docs exposed** — `work-items/`, `docs/`, planning docs excluded from publish dir | ✅ **Pass** | `site/` contains only public static files. Internal docs not copied in (T017). |
| G-07 | **No deployment secrets committed** — no API keys, tokens, env files in repo | ✅ **Pass** | Static site; no secrets architecture |
| G-08 | **Data path fix** — `data/` co-located at correct relative path for chosen deploy root | ✅ **Pass** | `site/data/` created; `app.js` updated to `data/incident-index.json` (T017). |
| G-09 | **No INC-0011+ or unapproved records** — only INC-0001–INC-0010 published | ✅ **Pass** | Confirmed T016 |
| G-10 | **Browser smoke test** — loads with 10 cards, no console errors | ⚠ **Pending** | HTTP 200 confirmed; manual browser verification with DevTools not yet done |
| G-11 | **Rollback plan documented** | ✅ **Pass** | See `PUBLIC_DEPLOYMENT_PLAN.md §6` |
| G-12 | **Control Tower explicit approval** — CT issues: `"Approve public deployment"` | 🔴 **Blocker** | Not issued |

---

## Summary

| Status | Count |
|---|---|
| ✅ Pass | 7 |
| ⚠ Pending | 4 |
| 🔴 Blocker | 1 |

**Go/no-go: NO-GO for public deployment.**

G-12 (CT approval) is a hard blocker. G-01, G-02, G-03, and G-10 remain pending. G-06 and G-08 are now resolved (T017).

---

## Path to Go

1. CT completes or delegates source/license review (G-01, G-02).
2. CT confirms domain and hosting (G-03).
3. Manual browser DevTools smoke test (G-10).
4. CT issues explicit approval (G-12).
