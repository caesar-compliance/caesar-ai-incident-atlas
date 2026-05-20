# T031 Validation

**Date:** 20 May 2026

## Checklist

- [ ] `python3 tools/validate_dataset.py` exits 0; exactly 10 records
- [ ] No incident records added or modified
- [ ] No source URLs changed
- [ ] INC-0006 data unchanged
- [ ] `grep -R "../data/" site/assets/app.js site/index.html site/README.md` — clean
- [ ] `find site -maxdepth 3 -type f | sort` — site file count unchanged from T030
- [ ] `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty
- [ ] `grep -R "upload-pages-artifact" .github/workflows/pages.yml` — confirmed
- [ ] `grep -R "path: site" .github/workflows/pages.yml` — confirmed
- [ ] `git diff --check` — clean
- [ ] `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md` created at repo root
- [ ] G-01 recorded as APPROVED with caution in `GOVERNANCE_SIGNOFF_PACK.md` §5
- [ ] G-02 recorded as APPROVED with caution in `GOVERNANCE_SIGNOFF_PACK.md` §5
- [ ] Approval marked narrow (current 10-record MVP only, not legal advice)
- [ ] Branch pushed to origin
- [ ] Merged to main via `--no-ff`
- [ ] `curl -I https://atlas.caesar.no/` returns HTTP 200
- [ ] `curl -I https://atlas.caesar.no/data/incident-index.json` returns HTTP 200
