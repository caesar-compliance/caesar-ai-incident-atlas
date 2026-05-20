# Public MVP Baseline Freeze — caesar-ai-incident-atlas

**Task:** T032 — Public MVP v0.7 Status Freeze + Roadmap Split  
**Date:** 20 May 2026  
**Version:** 0.7.0  
**Status:** PUBLIC MVP BASELINE FROZEN — NOT LEGAL ADVICE

---

## 1. Baseline Status

| Field | Value |
|---|---|
| Public MVP URL | `https://atlas.caesar.no/` |
| Final baseline commit | `64c7267` (merge: public MVP governance sign-off, T031) |
| Dataset size | 10 records — INC-0001 through INC-0010 |
| Public root | `site/` |
| Deployment | GitHub Pages, GitHub Actions workflow (`.github/workflows/pages.yml`) |
| HTTPS | Enforced — `atlas.caesar.no` |
| G-01 | ✅ APPROVED with caution — INC-0006 Reuters citation accepted with caution (20 May 2026) |
| G-02 | ✅ APPROVED with caution — current public MVP wording cleared (20 May 2026) |
| G-10 | ✅ PASS — CT manual browser confirmation (20 May 2026) |
| All 12 gates | Closed/approved — see `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md` |
| Approval scope | **Current 10-record public MVP only.** Not legal advice. |

---

## 2. Frozen Baseline Rules

The following rules apply to the frozen 10-record public MVP baseline:

- **No record changes** without a new task and CT approval.
- **No new records** (INC-0011+) without dataset expansion approval from CT.
- **No scraping or dataset import** without explicit CT approval.
- **No source or legal wording changes** without new CT review and G-01/G-02 sign-off.
- **No DNS or custom domain changes** without explicit CT approval.
- **No third-party text reproduced** in any incident record or site file.
- **No expansion of G-01/G-02 approval** beyond the current 10-record public MVP.
- **Public root must remain `site/`**; workflow must continue uploading only `site/`.
- **Repo root must not be exposed** as the public site root.

---

## 3. INC-0006 Caution

INC-0006 (AI recruitment gender bias, Reuters 2018) is accepted into the current public MVP with the following retained cautions:

- Reuters URL citation only — no Reuters text reproduced.
- All summary sentences use "According to the Reuters report" or "reportedly" hedging.
- No intentional discrimination claim. No definitive legal conclusions.
- Amazon did not publicly confirm all details — stated in record.
- This acceptance is for the current non-commercial public MVP only.
- CT review is required if INC-0006 wording, source URL, or distribution context changes.
- This acceptance does not constitute legal clearance. Not legal advice.

---

## 4. Next Review Triggers

G-01/G-02 and the frozen baseline must be reviewed before any of the following:

1. Adding INC-0011 or any new incident record.
2. Changing source URLs or adding new sources to any existing record.
3. Changing summaries, lessons, or legal-risk wording in any existing record.
4. Adding scraping, automated import, or external dataset integration.
5. Changing deployment platform, domain, or custom DNS configuration.
6. Preparing for commercial distribution, licensing, or broader public release.
7. INC-0006: Reuters raises a concern, or a safer source replacement is found.

---

**Disclaimer:** This document records a governance baseline freeze decision by Control Tower for internal operational purposes. It does not constitute legal advice or legal clearance.
