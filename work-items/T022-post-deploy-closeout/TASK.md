# T022 — Post-Deploy Verification + GitHub Pages / Custom Domain Closeout

## Scope

Post-deploy verification, custom domain confirmation, HTTPS enforcement, documentation closeout.

## Checklist

- [x] Confirm working tree clean on main (HEAD: 085357e)
- [x] Create branch `deploy/T022-post-deploy-closeout`
- [x] Verify GitHub Pages workflow run status — latest run: ✅ success (ID 26130812095)
- [x] Verify Pages API: status=built, cname=atlas.caesar.no, build_type=workflow, https_certificate=approved
- [x] curl `https://caesar-compliance.github.io/caesar-ai-incident-atlas/` — 301 → atlas.caesar.no
- [x] curl `http://atlas.caesar.no/` — HTTP 200
- [x] curl `https://atlas.caesar.no/` — HTTP 200
- [x] Enable Enforce HTTPS via GitHub API — https_enforced: true
- [x] `python3 tools/validate_dataset.py` — exits 0, 10 records
- [x] No `../data/` paths in site/ (grep clean)
- [x] No CNAME, no work-items/, no docs/ in site/
- [x] Workflow uploads only `site/` — confirmed
- [x] Update documentation (8 files)
- [x] Create T022 work item docs
- [x] Commit, push branch, merge to main

## Constraints

- No DNS changes
- No CNAME file added to repo
- No new incident records
- No secrets
- No external hosting config
- Repo root not exposed
- Public root remains site/
