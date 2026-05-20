# T040 Validation Checklist

**Date:** 20 May 2026  
**Status:** PASS

---

## Dataset Validation

- [x] `python3 tools/validate_dataset.py` — 12 records PASS
- [x] `data/incidents/` contains exactly 12 JSON files (INC-0001 through INC-0012)
- [x] `site/data/incidents/` contains exactly 12 JSON files (INC-0001 through INC-0012)
- [x] `data/incident-index.json` lists 12 incidents
- [x] `site/data/incident-index.json` lists 12 incidents
- [x] Root data and site/data are synchronized
- [x] No INC-0013+ files exist

## Site Safety

- [x] `site/` contains no internal docs, work-items, or planning files
- [x] No CNAME file in site/
- [x] Workflow uploads only `site/` — confirmed in `.github/workflows/pages.yml`
- [x] Repo root not exposed
- [x] No external frontend dependencies added
- [x] No analytics or tracking added

## Record Quality

- [x] INC-0012 passes schema validation
- [x] All required fields present
- [x] Source URLs are Tier 1 (EEOC + DOJ — US government public domain)
- [x] No copied source text
- [x] No named employer
- [x] Hedged regulatory framing language used
- [x] Distinct from INC-0010 (ADA/disability vs Title VII/race/sex)

## Git and Governance

- [x] `git diff --check` — clean (no whitespace errors)
- [x] `git status --short` — only expected files modified/added
- [x] Governance review note exists: `INC0012_GOVERNANCE_REVIEW_NOTE.md`
- [x] INC-0012 marked `prepared_for_CT_review`
- [x] No broad approval claimed for future records
- [x] No DNS/CNAME/hosting changes
- [x] No secrets committed
