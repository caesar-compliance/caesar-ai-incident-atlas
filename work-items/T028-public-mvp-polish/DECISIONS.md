# T028 Decisions

**Date:** 20 May 2026

| ID | Decision | Rationale |
|---|---|---|
| DEC-T028-001 | Version bumped to v0.6.4 | Patch increment for polish pass; no schema or data change |
| DEC-T028-002 | About/methodology panel added to sidebar (not a separate page) | No build system; sidebar location keeps it visible without navigation overhead |
| DEC-T028-003 | robots.txt: Allow / (not Disallow) | Site is already public and indexed; G-01/G-02 pending but records are live; conservative approach is allow with disclaimer, not block |
| DEC-T028-004 | sitemap.xml: single root URL only | No internal paths, no data file paths, no repo paths; only https://atlas.caesar.no/ |
| DEC-T028-005 | Status panel shows fixed MVP-verified date (20 May 2026) not first-record source access date | Access dates vary per record; "MVP verified" is the correct public-facing signal |
| DEC-T028-006 | No external font, icon, or analytics script added | Hard constraint: no external dependencies, no tracking |
| DEC-T028-007 | Footer links to caesar.no (not GitHub repo) | Repo root must not be exposed via site |
| DEC-T028-008 | Notice banner updated to remove "Local MVP / Not publicly deployed" text | Factually incorrect for a live public deployment |
| DEC-T028-009 | G-01/G-02 not marked approved | Still pending CT/counsel sign-off; no change to gate status |
| DEC-T028-010 | CSS focus-visible rules added for search-input, sort-select, filter-reset, copy-link-btn, footer-link | Explicit :focus-visible rules provide better keyboard accessibility without disrupting mouse UX |
