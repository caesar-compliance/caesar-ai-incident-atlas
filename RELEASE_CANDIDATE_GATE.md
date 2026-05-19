# Release Candidate Gate

> Checklist that must pass before any public deployment of the Caesar AI Incident Atlas.  
> **No step in this checklist auto-approves deployment.** All items require human review.  
> **T015 Local RC Status:** ✅ All local items satisfied. Three governance items remain before public deploy.  
> **T016 Deployment Plan Status:** ✅ Planning complete. See `PUBLIC_DEPLOYMENT_PLAN.md`, `HOSTING_OPTION_MATRIX.md`, `PUBLICATION_RISK_GATE.md`.  
> **T017 Publish Package Status:** ✅ `site/` is self-contained. Data path fix applied. Internal docs excluded. G-06 and G-08 satisfied.

---

## Pre-Deployment Checklist

### 1. Dataset Validation

- [x] `python3 tools/validate_dataset.py` exits 0 with no issues. *(T014/T015 — PASS)*
- [x] 10 records present (INC-0001–INC-0010). No INC-0011 or higher. *(T015 — confirmed)*
- [x] All records validate against `schemas/incident.schema.json`. *(T015 — confirmed)*
- [x] All taxonomy references (FM, CTL, EV, sector, severity, confidence) resolve. *(T015 — confirmed)*
- [x] No `source.database` field in any record. *(T015 — confirmed)*

### 2. Local Site Verification

- [x] `python3 -m http.server 8080` starts from repo root without error. *(T015 — HTTP 200)*
- [x] `http://localhost:8080/site/` loads with all 10 records. *(T015 — confirmed)*
- [x] Filters, search, sort, deep links, copy-link function correctly. *(T015 — confirmed)*
- [x] `site/` serves correctly as static root. *(T017 — HTTP 200)*
- [ ] No console errors on load. *(Requires manual browser verification)*

### 3. External Dependency Audit

- [x] No CDN, external font, or analytics references in `site/index.html`, `app.js`, `styles.css`. *(T015 — grep scan clean)*
- [x] No npm, `package.json`, or build pipeline present. *(T015 — confirmed)*
- [x] No backend or server-side code. *(T015 — confirmed)*

### 4. Dataset Caveats Reviewed

- [x] Draft taxonomy IDs (`transportation-autonomous`, `retail-ecommerce`, `FM-REL`) acknowledged. *(displayed in site)*
- [x] Medium-confidence records (INC-0008, INC-0010) acknowledged. *(displayed in site)*
- [ ] Open risks in `DATASET_MVP_OPEN_RISKS.md` reviewed by CT; none newly blocking.

### 5. Governance Gate ⚠ Blocking for public deployment

- [ ] Control Tower has reviewed the T015 RC and `STATIC_SITE_RC_REVIEW.md`.
- [ ] Legal and license review completed for all incident sources.
- [ ] Domain and hosting decision made.
- [ ] Public deployment explicitly approved by Control Tower.

### 6. Documentation Check

- [x] `CHANGELOG.md` reflects the release version. *(T015 — v0.5.3)*
- [ ] `README.md` updated with public site URL if applicable. *(after deployment decision)*
- [ ] `NEXT_ACTIONS.md` updated for post-deployment tasks. *(after T018)*

---

## Blocking Items for Public Deployment

Three governance items remain before any public deployment is permissible:

1. **Legal/license review** — all 10 incident sources must be formally reviewed and cleared.
2. **Domain/hosting decision** — hosting provider, domain, and DNS must be decided.
3. **Control Tower approval** — explicit CT sign-off on public deployment.

Technical blockers from T015/T016 (data path fix, internal doc isolation) are now resolved (T017).

**None of the above items are automated gates.** Each requires deliberate human sign-off.  
See `DATASET_MVP_OPEN_RISKS.md` for the current open risk register.  
See `STATIC_SITE_RC_REVIEW.md` for the full T015 RC review table.
