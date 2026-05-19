# Deployment Readiness Checklist — caesar-ai-incident-atlas

**Task:** T019 — Public Release Gate Closure + Deployment Readiness Branch  
**Date:** 20 May 2026  
**Version:** 0.5.5  
**Status:** T021 — GitHub Pages deployment activated. G-12 cleared by explicit CT instruction. Default URL only. Custom domain deferred.

---

## Disclaimers

> **G-12 CLEARED** — Explicit Control Tower instruction: `"Approve public deployment"` (T021).
> **This document is not legal advice.**  
> GitHub Pages default URL deployment active. Custom domain (`atlas.caesar.no`) deferred to T022. No CNAME. No DNS.

---

## 1. Pre-Deploy Checks

All items below must be complete before any deployment action is taken.

### 1.1 Technical Checks

- [ ] `python3 tools/validate_dataset.py` exits 0 (currently: ✅ Pass as of T019)
- [ ] `site/` confirmed self-contained — `site/data/` exists with 10 incident files, 6 taxonomy files, index (currently: ✅ Pass)
- [ ] No `../data/` paths in `site/assets/app.js` (currently: ✅ Clean)
- [ ] No CNAME in `site/` (currently: ✅ None)
- [ ] No internal docs (`work-items/`, `docs/`, planning files) in `site/` (currently: ✅ None)
- [ ] No API keys, tokens, or credentials in any committed file (currently: ✅ None — static site)
- [ ] `site/index.html` loads correctly from `site/` root (check: `cd site && python3 -m http.server 8081`)
- [ ] Browser smoke test (G-10) 14-step manual checklist completed and signed off

### 1.2 Governance Checks

- [ ] G-01: CT confirms all 10 source URLs cleared for public citation
- [ ] G-02: CT or legal counsel reviews all 10 record summaries for defamation/liability risk
- [ ] G-03: CT selects hosting option and confirms domain
- [ ] G-10: Manual browser smoke test completed — see `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md §5`
- [x] G-12: ✅ **CLEARED** — CT issued `"Approve public deployment"` (T021)

---

## 2. Recommended Deploy Options

**Option A — GitHub Pages (ACTIVE)**

✅ Workflow `.github/workflows/pages.yml` added. Triggers on push to main. Publishes `site/` directory only.

**Expected URL:** `https://caesar-compliance.github.io/caesar-ai-incident-atlas/`

Custom domain deferred to T022.

### Option A — GitHub Pages (recommended if repo is public)

1. Ensure repo is public on GitHub.
2. Go to repo **Settings → Pages**.
3. Source: Deploy from branch → `main` (or merge branch) → folder: `/site`.
4. Save. GitHub Pages serves `site/` at `https://<org>.github.io/<repo>/` or custom domain.
5. To add custom domain: add `CNAME` file inside `site/` containing `incidents.caesar.no` — **only after CT domain decision**.
6. Enable HTTPS enforcement.

### Option B — Cloudflare Pages (recommended if Cloudflare manages `caesar.no` DNS)

1. Log in to Cloudflare Dashboard → Workers & Pages → Create application → Pages.
2. Connect GitHub repo.
3. Build settings: Framework = None. Build command = (leave empty). Build output = `site`.
4. Deploy. Cloudflare serves `site/` at `<project>.pages.dev` or custom domain.
5. Custom domain: add `incidents.caesar.no` in Pages settings — **only after CT domain decision**.

### Option C — Netlify (fallback)

1. Log in to Netlify → Add new site → Import from GitHub.
2. Branch: `main`. Publish directory: `site`. Build command: (leave empty).
3. Deploy. Netlify serves at `<random>.netlify.app` or custom domain.
4. Custom domain: add `incidents.caesar.no` in domain settings — **only after CT domain decision**.

---

## 3. What Must NOT Be Exposed

The following files and directories must never be served publicly under any hosting configuration:

| Path | Reason |
|---|---|
| `work-items/` | Internal planning and QA docs |
| `docs/` | Internal product docs |
| `FIRST_INCIDENT_CANDIDATE_DOSSIERS.md` | Internal research notes |
| `INCIDENT_FIELD_MAPPING_DRAFTS.md` | Internal field-mapping drafts |
| `LOCAL_ARCHITECTURE_MINING_PLAN.md` | Internal competitive research |
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | Internal governance policy |
| `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` | Internal source review |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Internal register |
| `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md` | Internal gate document |
| `DEPLOYMENT_READINESS_CHECKLIST.md` | This file — internal |
| All `*_RECOMMENDATION.md`, `*_PLAN.md`, `*_REVIEW*.md` planning files | Internal planning |
| `.git/` | Version history (excluded automatically by all hosts) |
| `tools/` | QA scripts — not a public asset |
| `schemas/` | Optional: may be included for transparency but not required |

**Safe publish strategy:** deploy only `site/` as the static root. Never serve the repo root.

---

## 4. Rollback Steps

No dynamic backend — rollback is a static file redeploy.

1. Identify the last known-good git commit (`git log --oneline -10`).
2. Check out that commit: `git checkout <commit-hash>`.
3. Run `python3 tools/validate_dataset.py` — must exit 0.
4. Re-deploy `site/` to the chosen hosting platform:
   - GitHub Pages: push to configured branch; Pages re-deploys automatically.
   - Cloudflare Pages: push to configured branch; CF re-deploys automatically.
   - Netlify: push to configured branch; Netlify re-deploys automatically.
   - Manual: `rsync -av site/ user@host:/var/www/incidents/`.
5. Most static hosts retain prior deploy history and support instant rollback via their dashboard.

---

## 5. Final Approval Phrase Required

**Before any deployment action is executed, the Control Tower must issue the following exact phrase:**

> **`Approve public deployment`**

This phrase must appear explicitly in a Control Tower instruction. It has not been issued as of 20 May 2026.

No agent, developer, or automated process may activate public deployment before this phrase is confirmed.

---

## References

- `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md` — gate evidence summary (T019)
- `PUBLICATION_RISK_GATE.md` — gate status table
- `PUBLIC_RELEASE_REVIEW_PACK.md` — source/licence and wording review tables (T018A)
- `HOSTING_OPTION_MATRIX.md` — detailed hosting comparison
- `PUBLIC_DEPLOYMENT_PLAN.md` — full deployment plan with rollback and update process
