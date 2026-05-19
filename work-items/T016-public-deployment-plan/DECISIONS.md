# T016 — Decisions

**Date:** 19 May 2026  
**New decisions:** 3

---

### DEC-T016-001 — Publish Root Should Be `site/` with `data/` Copied Inside It

**Decision:** For public deployment, `data/` should be copied into `site/data/` and the two path constants in `site/assets/app.js` updated. The hosting publish root should be `site/`.

**Rationale:** Publishing the repo root would expose all internal planning docs (`work-items/`, `docs/`, `FIRST_INCIDENT_*`, etc.). Keeping the publish root as `site/` with data co-located is the safest and cleanest boundary.

---

### DEC-T016-002 — Recommended Hosting: GitHub Pages (if repo public) or Cloudflare Pages (if Cloudflare DNS)

**Decision:** GitHub Pages is the recommended default if the repository will be public on GitHub. Cloudflare Pages is recommended if Cloudflare already manages `caesar.no` DNS.

**Rationale:** Both options offer git-push deploy, free custom domain HTTPS, zero server management, and instant rollback via dashboard. Decision deferred to CT.

---

### DEC-T016-003 — T016 Creates No Deployment Config; T017 Implements After CT Approval

**Decision:** T016 produces planning documents only. Deployment configuration files (`CNAME`, `netlify.toml`, Cloudflare project) are created in T017 after CT chooses the hosting option and issues explicit approval.

**Rationale:** Creating deployment config in T016 risks accidental activation. Plans and config must be in separate tasks.
