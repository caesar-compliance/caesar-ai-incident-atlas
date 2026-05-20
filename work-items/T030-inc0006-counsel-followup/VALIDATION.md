# T030 Validation

**Date:** 20 May 2026

## Checklist

- [ ] `python3 tools/validate_dataset.py` exits 0; exactly 10 records
- [ ] INC-0006 data unchanged (source URLs, wording, fields)
- [ ] No incident records added or modified
- [ ] `grep -R "../data/" site/assets/app.js site/index.html site/README.md` — clean
- [ ] `find site -maxdepth 3 -type f | sort` — site file count unchanged from T029
- [ ] `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` — empty
- [ ] `grep -R "upload-pages-artifact" .github/workflows/pages.yml` — confirmed
- [ ] `grep -R "path: site" .github/workflows/pages.yml` — confirmed
- [ ] `git diff --check` — clean
- [ ] `COUNSEL_REVIEW_PACKET_INC0006.md` created at repo root
- [ ] Governance docs updated (no approval recorded)
- [ ] Lifecycle docs updated
- [ ] Branch pushed to origin
- [ ] Merged to main via `--no-ff`
- [ ] `curl -I https://atlas.caesar.no/` returns HTTP 200
- [ ] `curl -I https://atlas.caesar.no/data/incident-index.json` returns HTTP 200
