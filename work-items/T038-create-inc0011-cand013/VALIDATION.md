# T038 — Validation

**Task:** T038 — Draft First New Incident Record  
**Date:** 20 May 2026  

---

## Validation Checklist

### Dataset Integrity

- [x] `python3 tools/validate_dataset.py` — PASS (11 records)
- [x] INC-0011 exists in data/incidents/
- [x] INC-0011 exists in site/data/incidents/
- [x] data/incident-index.json contains 11 entries
- [x] site/data/incident-index.json contains 11 entries
- [x] Root and site data are synchronized

### Record Integrity

- [x] INC-0011 follows schema (11 required fields present)
- [x] incident_id: "INC-0011"
- [x] title: descriptive, accurate
- [x] date: valid format
- [x] sources: ATS + PubMed URLs
- [x] summary: factual, hedged, no legal conclusions
- [x] failure_modes: ["FM-BIAS"]
- [x] severity: "high"
- [x] confidence: "high"
- [x] controls: appropriate set
- [x] evidence_required: appropriate set
- [x] lessons: practical governance lessons

### Site Integrity

- [x] No internal docs in site/
- [x] No work-items in site/
- [x] No CNAME file
- [x] site/ only contains public data

### Git Integrity

- [x] `git diff --check` — clean
- [x] Branch: records/T038-create-inc0011-cand013
- [x] All expected files staged

### Safety Confirmation

- [x] No DNS changes
- [x] No CNAME added
- [x] No custom domain changed
- [x] No secrets
- [x] Exactly one new record
- [x] No scraping
- [x] No imports
- [x] Workflow uploads only site/
- [x] Repo root not exposed

---

**Result:** PASS — All validation checks passed. Ready for merge.
