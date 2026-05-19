# T022 Decisions

| ID | Decision | Rationale |
|---|---|---|
| DEC-T022-001 | No CNAME file added to repo | Custom domain already active via GitHub Pages settings UI. Adding CNAME would risk overwriting domain or causing conflict. Task instructions: prefer not to add it. |
| DEC-T022-002 | Enable Enforce HTTPS via GitHub API | HTTPS certificate state was `approved` at time of T022. Certificate valid until 2026-08-18. Safe to enable per task instructions. Used `gh api --method PUT ... --field https_enforced=true`. |
| DEC-T022-003 | G-10 marked Partial, not Pass | No interactive browser available in agent execution context. Static file checks and HTTP checks passed. Manual 14-step browser UI test cannot be performed by agent. Accurate reporting required. |
| DEC-T022-004 | G-03 marked Pass | Custom domain `atlas.caesar.no` confirmed active via GitHub Pages API. DNS manually configured. HTTPS enforced. Hosting decision is now complete and verified. |
| DEC-T022-005 | Version bumped to 0.5.8 | v0.5.7 was T021 (workflow deployment). T022 adds closeout documentation and HTTPS enforcement — incremental patch bump appropriate. |
| DEC-T022-006 | No site/CNAME; domain managed externally | DNS and custom domain are managed entirely outside the repo (GitHub Pages settings + DNS provider). No repo artifact needed or added. This is the clean approach and matches hard constraints. |
