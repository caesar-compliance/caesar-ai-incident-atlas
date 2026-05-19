# T023 Decisions

**Date:** 20 May 2026

---

| ID | Decision | Rationale |
|---|---|---|
| DEC-T023-001 | G-10 marked **PARTIAL**, not PASS | Agent has no interactive browser; only HTTP/redirect/JSON checks completed. Overclaiming PASS would be inaccurate. |
| DEC-T023-002 | HTTP→HTTPS redirect confirmed as **propagated** | `curl -sI http://atlas.caesar.no/` returned HTTP 301 → `https://atlas.caesar.no/`, confirming CDN propagation complete since T022. |
| DEC-T023-003 | Used `read_url_content` for data endpoint validation | Confirmed JSON body contains all 10 records (INC-0001–INC-0010); no assumptions made. |
| DEC-T023-004 | Version bumped to **0.5.9** | Reflects T023 verification work as a distinct doc/validation increment. |
| DEC-T023-005 | Interactive G-10 test documented as **CT responsibility** | The 14-step interactive checklist (search, filter, sort, DevTools) can only be completed by a human opening a real browser at `https://atlas.caesar.no/`. |
| DEC-T023-006 | No new files added to `site/` | T023 is verification-only; no site content changes. |
| DEC-T023-007 | Recommended next step is **manual CT browser smoke test** then **T024** | Once CT completes interactive G-10 and G-10 is marked PASS, T024 (Public MVP Status Lock) may proceed. |
