# T050 — Candidate Quality Hardening

**Status:** COMPLETE  
**Date:** 2026-05-21  
**Branch:** feature/T050-candidate-quality-hardening

## Objective

Harden the real watcher and promotion pipeline to prevent generic pages (e.g. "Make a complaint", contact forms, event pages, job postings) from becoming top promotion candidates or being promoted to public incidents.

## Problem Statement

Prior to T050, CAND-0018 ("Make a complaint" — ico.org.uk/make-a-complaint/) was matching keyword filters and generating a promotion packet (PKT-0001) that appeared in the ranked top candidates list. Generic pages with no legal/governance case value were slipping through.

## Hard Limits (unchanged)

- Must not create INC-0013 or any new public incident without explicit Control Tower approval
- Must not fetch Yellow/AIID/OECD/AIAAIC sources
- Must not store full HTML or copy third-party text
- Must not enable scheduled GitHub Actions workflows
- Must not write candidates/drafts/packets/previews under site/

## Deliverables

| Script / File | Change |
|---|---|
| `scripts/classify-candidate-quality.mjs` | New — assigns quality_class, quality_score, promotion_eligible, rejection_reasons |
| `scripts/validate-candidate-quality.mjs` | New — full pipeline quality gate validator |
| `scripts/backfill-draft-quality-fields.mjs` | New — retroactively adds quality fields to existing drafts |
| `scripts/backfill-packet-quality-fields.mjs` | New — retroactively adds quality fields to existing packets |
| `scripts/watch-green-sources.mjs` | Hardened — inline quality gate blocks generic pages before file write |
| `scripts/build-real-case-drafts.mjs` | Hardened — skips candidates with promotion_eligible: false |
| `scripts/build-promotion-packets.mjs` | Hardened — skips drafts with blocked quality classes |
| `scripts/rank-promotion-candidates.mjs` | Hardened — penalises generic pages, adds no_publication_candidate_ready |
| `scripts/promote-approved-case.mjs` | Hardened — refuses promotion for blocked quality classes; filters dry-run previews |
| `scripts/build-real-review-bundle.mjs` | Updated — includes ranked data, quality report, quality summary in bundle |
| `data/watch/config/target-keywords.json` | Updated — 20+ new exclusion_terms for generic pages |
| `data/drafts/real/DRAFT-0001.json` | Backfilled — quality_class=generic_page, blocked |
| `data/promotion-packets/real/PKT-0001.json` | Backfilled — quality_class=generic_page, blocked |
| `tools/review-console/assets/review-console.js` | Updated — quality badge, blocked state, no-candidate-ready banner |
| `tools/review-console/assets/review-console.css` | Updated — quality-blocked-item style |
| `tools/review-console/index.html` | Updated — Quality column in ranked table |

## Quality Classes

| Class | Score range | Promotion eligible |
|---|---|---|
| `likely_case` | 75–100 | Yes (if ≥ 70) |
| `likely_guidance` | 72–100 | Yes (if ≥ 70) |
| `likely_regulatory_update` | 62–100 | Only if ≥ 70 |
| `low_relevance` | 0–69 | No |
| `generic_page` | 0–20 | No |
| `event_or_webinar` | 0–15 | No |
| `job_or_procurement` | 0–10 | No |

## Validation Results

All validators pass:
- `validate-candidate-quality.mjs`: ALL PASS
- `validate-promotion-dry-run.mjs`: ALL PASS
- `validate-review-console.mjs`: ALL PASS
- `validate-real-drafts.mjs`: ALL PASS

Pipeline state:
- 12 candidates classified; 6 eligible, 6 blocked (2 generic_page, 4 low-score)
- CAND-0018 "Make a complaint": blocked, quality_class=generic_page, score=15
- PKT-0001: correctly marked quality_class=generic_page, promotion_allowed=false
- Top ranked: PKT-0002 [likely_guidance, score=84]
- Dry-run previews: 3 eligible candidates only (PKT-0001 absent)
- Public dataset: remains 12 records, INC-0013 does not exist
