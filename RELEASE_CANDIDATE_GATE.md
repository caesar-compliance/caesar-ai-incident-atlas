# Release Candidate Gate

> Checklist that must pass before any public deployment of the Caesar AI Incident Atlas.  
> **No step in this checklist auto-approves deployment.** All items require human review.

---

## Pre-Deployment Checklist

### 1. Dataset Validation

- [ ] `python3 tools/validate_dataset.py` exits 0 with no issues.
- [ ] 10 records present (INC-0001–INC-0010). No INC-0011 or higher.
- [ ] All records validate against `schemas/incident.schema.json`.
- [ ] All taxonomy references (FM, CTL, EV, sector, severity, confidence) resolve.
- [ ] No `source.database` field in any record.

### 2. Local Site Verification

- [ ] `python3 -m http.server 8080` starts from repo root without error.
- [ ] `http://localhost:8080/site/` loads with all 10 records.
- [ ] Filters, search, sort, and deep links function correctly.
- [ ] No console errors on load.

### 3. External Dependency Audit

- [ ] No CDN, external font, or analytics references in `site/index.html`, `app.js`, `styles.css`.
- [ ] No npm, `package.json`, or build pipeline present.
- [ ] No backend or server-side code.

### 4. Dataset Caveats Reviewed

- [ ] Draft taxonomy IDs (`transportation-autonomous`, `retail-ecommerce`, `FM-REL`) acknowledged.
- [ ] Medium-confidence records (INC-0008, INC-0010) acknowledged.
- [ ] Open risks in `DATASET_MVP_OPEN_RISKS.md` reviewed; none newly blocking.

### 5. Governance Gate

- [ ] Control Tower has reviewed the release candidate.
- [ ] Legal and license review completed for all incident sources.
- [ ] Domain and hosting decision made.
- [ ] Public deployment explicitly approved by Control Tower.

### 6. Documentation Check

- [ ] `CHANGELOG.md` reflects the release version.
- [ ] `README.md` updated with public site URL if applicable.
- [ ] `NEXT_ACTIONS.md` updated for post-deployment tasks.

---

**None of the above items are automated gates.** Each requires deliberate human sign-off.  
See `DATASET_MVP_OPEN_RISKS.md` for the current open risk register.
