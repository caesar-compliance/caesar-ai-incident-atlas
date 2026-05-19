# T017 — Decisions

**Date:** 20 May 2026  
**New decisions:** 3

---

### DEC-T017-001 — `site/data/incident-index.json` Uses `data/incidents/` Paths; Root Index Unchanged

**Decision:** `site/data/incident-index.json` is generated with `file` paths rewritten to `data/incidents/...` (site-root-relative). The root `data/incident-index.json` retains `../data/incidents/...` paths for backward compatibility with existing tooling.

**Rationale:** Keeps root tooling (`tools/validate_dataset.py`, Python scripts) working unchanged while making `site/` fully self-contained at the correct relative paths.

---

### DEC-T017-002 — `site/data/` Is a Publish Copy; Root `data/` Remains Source of Truth

**Decision:** `site/data/` is a copy for the static publish package. All incident record authoring, QA, and schema validation continues against root `data/`. The validator enforces sync via SHA-256 hash comparison.

**Rationale:** Separates authoring concerns (root `data/`) from publishing concerns (`site/data/`). The validator prevents silent divergence.

---

### DEC-T017-003 — No CNAME, No GitHub Actions, No Deployment Config Created in T017

**Decision:** T017 prepares the static package only. No hosting-specific configuration is added. Deployment configuration is deferred to T018 after CT selects hosting and issues explicit approval.

**Rationale:** Consistent with DEC-094. Configuration and activation must be separated by a governance gate.
