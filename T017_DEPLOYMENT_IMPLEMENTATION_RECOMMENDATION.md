# T017 — Deployment Implementation Recommendation

**Document:** T016 output  
**Date:** 19 May 2026  
**Status:** **T017 COMPLETE.** This recommendation document is now superseded. See `work-items/T017-static-publish-package-preparation/IMPLEMENTATION_REPORT.md` for actual T017 completion status.

---

**Note (20 May 2026):**

- **T017 path/package work is done:** `site/` is self-contained, data path fix applied, internal docs excluded.
- **Deployment config is deferred to T018+:** Hosting selection, CNAME, GitHub Actions, Cloudflare/Netlify configuration will only be implemented after Control Tower completes G-01 through G-12 sign-off.
- **Public deployment remains NO-GO:** See `PUBLICATION_RISK_GATE.md` and `PUBLIC_RELEASE_REVIEW_PACK.md` for current status.

---

**Original T016 recommendation content below for reference:**

---

## When to Start T017

T017 may only be started after:

1. CT completes source/license review (PUBLICATION_RISK_GATE G-01, G-02).
2. CT selects a hosting option from `HOSTING_OPTION_MATRIX.md`.
3. CT confirms the public URL (e.g. `incidents.caesar.no`).
4. CT explicitly initiates T017.

---

## Recommended T017 Scope

### Step 1 — Data path fix (required regardless of hosting choice)

Copy `data/` into `site/data/` (or a subdirectory) and update the two path constants in `site/assets/app.js`:

```js
// Before
const INDEX_URL     = "../data/incident-index.json";
const INCIDENTS_DIR = "../data/incidents/";

// After (if site/ is the publish root and data/ is inside it)
const INDEX_URL     = "data/incident-index.json";
const INCIDENTS_DIR = "data/incidents/";
```

Then run `python3 tools/validate_dataset.py` and a browser smoke test to confirm. Do not commit until tests pass.

### Step 2 — Hosting config (choose ONE based on CT decision)

**Option A — GitHub Pages**

- Set GitHub Pages source to branch `main`, root `/site` (or use a `gh-pages` branch).
- Add `site/CNAME` file with the chosen hostname.
- No build step required.

**Option B — Cloudflare Pages**

- Connect the GitHub repo to Cloudflare Pages.
- Set build command to none (static).
- Set publish directory to `site/` (after path fix).
- Add custom domain in Cloudflare dashboard.

**Option C — Netlify**

- Connect repo; set publish directory to `site/` (after path fix).
- No build command.
- Add custom domain in Netlify dashboard.

**Option D — VPS / Coolify**

- Point nginx/caddy root to `site/`.
- Copy or symlink `data/` to `site/data/`.
- Configure HTTPS via Let's Encrypt.

### Step 3 — Pre-deploy checklist

Before any public activation:

- [ ] `python3 tools/validate_dataset.py` passes.
- [ ] Browser smoke test: all 10 cards, search, sort, deep link, no console errors.
- [ ] No internal docs in publish directory.
- [ ] No secrets in any committed file.
- [ ] CT issues: `"Approve public deployment"`.

### Step 4 — Activate deployment

Only after Step 3 checklist is complete and CT approval is issued.

---

## T017 Must NOT

- Deploy publicly without CT issuing `"Approve public deployment"`.
- Add new incident records.
- Add backend, database, or server-side logic.
- Add npm, framework, or build pipeline.
- Add analytics, CDN scripts, or external fonts.
- Commit secrets or API keys.

---

## Deployment Config Files T017 May Create

| File | Purpose | When created |
|---|---|---|
| `site/CNAME` | GitHub Pages custom domain | T017 — only if GitHub Pages chosen |
| Cloudflare Pages project config | Cloudflare dashboard, not a file | T017 — only if Cloudflare chosen |
| Netlify `netlify.toml` (optional) | Build/redirect config | T017 — only if Netlify chosen; keep minimal |

None of these files are created by T016.
