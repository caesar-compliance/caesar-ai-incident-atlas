# T015 — Decisions

**Date:** 19 May 2026  
**New decisions:** 2

---

### DEC-T015-001 — No Functional Fixes Required in T015

**Decision:** Structural review and QA run found no functional bugs. No changes were made to `site/index.html`, `app.js`, or `styles.css`.

**Rationale:** The site passed all 14 functional checks and the full `validate_dataset.py` suite. Making changes without a confirmed defect would introduce unnecessary diff noise before the RC gate.

---

### DEC-T015-002 — tools/requirements.txt Pinned to `>=4.0.0` (Not Exact Version)

**Decision:** `tools/requirements.txt` specifies `jsonschema>=4.0.0` rather than a pinned exact version.

**Rationale:** The validator uses only stable Draft 2020-12 validator APIs. A floor constraint (`>=4.0.0`) avoids breaking on minor upgrades while preventing use of pre-Draft2020-12 releases.
