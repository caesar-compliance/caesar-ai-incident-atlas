# T021 Validation

## Pre-Deployment Validation

- [x] `python3 tools/validate_dataset.py` — PASS (10 records, 4 site files)
- [x] `test ! -f site/CNAME` — confirmed no CNAME
- [x] `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — clean
- [x] `grep -R "../data/" site/assets/app.js site/index.html site/README.md` — clean
- [x] Workflow uploads only `site/` path
- [x] `.nojekyll` added to disable Jekyll
- [x] No secrets in workflow
- [x] `git diff --check` — clean

## Post-Deployment Validation Required

- [ ] GitHub Pages URL loads: `https://caesar-compliance.github.io/caesar-ai-incident-atlas/`
- [ ] 10 incident cards visible
- [ ] Search, filter, sort functional
- [ ] Deep link works: `#INC-0005`
- [ ] No 404 for JSON files
- [ ] No console errors

## Constraints Verified

| Constraint | Status |
|---|---|
| No CNAME | ✅ |
| No custom domain | ✅ |
| No DNS config | ✅ |
| Repo root not exposed | ✅ (workflow uploads only `site/`) |
| G-12 cleared | ✅ explicit phrase issued |
