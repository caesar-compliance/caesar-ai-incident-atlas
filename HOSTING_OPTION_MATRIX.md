# Hosting Option Matrix

**Task:** T016 — Public Deployment Plan  
**Date:** 19 May 2026  
**Purpose:** Compare static hosting options. No option is activated here.

---

## Comparison Table

| Option | Pros | Cons | Operational complexity | Custom domain | Best use | Recommendation |
|---|---|---|---|---|---|---|
| **GitHub Pages** | Free; native git push deploy; no extra account needed if repo is on GitHub; good uptime | Repo must be public OR requires GitHub Pro/Team for private-repo pages; no server-side logic | Low | ✅ Custom domain + HTTPS | Open-source public dataset site | **Recommended if repo is public** |
| **Cloudflare Pages** | Free tier generous; global CDN; instant cache purge; custom domain HTTPS auto-provisioned; git-push deploy | Cloudflare account required; some latency on first builds | Low | ✅ Full DNS + HTTPS | High-performance public dataset site | **Recommended if Cloudflare DNS already used** |
| **Netlify** | Free tier; instant deploy from git; form/function add-ons available; good DX | Function extras not needed; slightly more than GitHub Pages for pure static | Low | ✅ Custom domain + HTTPS | General static hosting | Viable alternative |
| **VPS / own server (nginx/caddy)** | Full control; no third-party dependency; data stays on controlled infra | Manual config; SSL management; uptime responsibility; higher ongoing effort | High | ✅ Any domain | Privacy-sensitive or on-prem requirement | Only if CT has specific infra policy |
| **Coolify (self-hosted PaaS)** | Wraps VPS complexity; app-like deploys | Requires existing Coolify instance; more complexity than needed for pure static | Medium | ✅ Custom domain | Already using Coolify for other apps | Only if Coolify already in use |

---

## Recommendation Summary

1. **If repo will be public on GitHub** → GitHub Pages. Zero additional accounts, git-push deploy, free custom domain HTTPS.
2. **If Cloudflare manages `caesar.no` DNS** → Cloudflare Pages. Fastest CDN, instant rollback, git-push deploy.
3. **Default fallback** → Netlify. Reliable, free, simple.
4. VPS and Coolify only if CT has a specific on-prem or privacy requirement.

---

## Path Fix Requirement for All Options

Before any deployment, `data/` must be co-located with `site/` or the path constants in `site/assets/app.js` must be updated. See `PUBLIC_DEPLOYMENT_PLAN.md §4`.

**No option is configured or activated by this document.**
