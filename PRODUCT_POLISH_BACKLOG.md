# Product Polish Backlog — caesar-ai-incident-atlas

**Created:** 20 May 2026 (T024)  
**Last updated:** 20 May 2026 (T032)
**Status:** Technical Public MVP LIVE + VERIFIED at `https://atlas.caesar.no/`. v0.7.0. Public MVP baseline frozen (T032). G-01/G-02 approved with caution. All 12 gates closed. No new records approved. Next: T033 Dataset Expansion Planning (planning only).

---

## 1. Public MVP Polish

Lightweight UI/UX improvements that do not require new incident records:

- ~~Improve mobile card density for smaller screens~~ ✓ T028
- Improve empty states (no search results, filter clears)
- ~~Add visible "last updated" / dataset version badge~~ ✓ T028
- ~~Add simple methodology / about page explaining the governance mapping~~ ✓ T028
- Add clearer source/evidence panel in detail view
- Add export/copy citation improvements
- Add subtle loading skeleton for data fetch
- ~~Improve focus states for accessibility~~ ✓ T028
- Add keyboard shortcut for search focus

---

## 2. Dataset Expansion Candidates

Themes for future record creation (requires CT approval before any new records):

- More AI legal/professional-services incidents
- Hiring/employment assessment incidents
- Public-sector automated decision systems
- Healthcare triage/allocation systems
- Financial services/risk scoring
- Education/proctoring
- Autonomous systems beyond vehicles (drones, robotics)
- Content moderation at scale
- AI-generated media/deepfake harms

---

## 3. Governance OS Integration Backlog

Connect product logic to ecosystem vision:

```
incident → failure mode → affected controls → required evidence → governance lesson → Caesar AI Evidence / Governance OS
```

- Export incident-to-control mappings as structured evidence
- Control coverage heatmap across all incidents
- Evidence requirement templates per control category
- Governance lesson extraction for training content
- Integration with `caesar-ai-evidence` schema
- Future risk library module for Governance OS

---

## 4. Technical Backlog

Infrastructure and quality improvements:

- ~~Lightweight sitemap.xml and robots.txt~~ ✓ T028
- ~~Metadata/SEO improvements (title, description, OG tags)~~ ✓ T028
- Accessibility pass (WCAG 2.1 AA compliance check)
- Print/export view for incident cards
- Regression smoke checklist for releases
- Document "no external dependencies" policy formally
- Automated link checker for source URLs
- Dataset versioning scheme

---

## 5. Hard Gates for Future Work

Explicit approval required before proceeding:

| Gate | Requirement |
|---|---|
| New incident records | Control Tower explicit approval required |
| Scraping/import | Control Tower explicit approval required |
| Legal/source sign-off | Required before larger public distribution |
| DNS/domain changes | Control Tower explicit approval required |
| External hosting config | Control Tower explicit approval required |
| Dataset expansion planning | CT approval required for any new record themes |

---

## Next Step (T032 Baseline Frozen)

**T033 — Dataset Expansion Planning (planning only).** No records created without CT approval. See `ROADMAP_NEXT_PHASES.md` §v0.7 for candidate criteria and source quality gates.

**v0.9 Quality Polish** may proceed on the current 10-record baseline. See `ROADMAP_NEXT_PHASES.md` §v0.9 for scope.

---

*See `PUBLICATION_RISK_GATE.md` for current gate status. See `NEXT_ACTIONS.md` for execution boundaries.*
