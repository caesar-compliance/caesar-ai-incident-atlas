# T050 Decisions

## D-001: Quality gate at watcher level, not just classifier
Inline `inlineQualityCheck()` added to `watch-green-sources.mjs` so generic pages are blocked before any file is written. The standalone `classify-candidate-quality.mjs` script handles retroactive re-classification of existing candidate files.

## D-002: Threshold set at 70
Quality score threshold of 70 chosen to allow `likely_case` and `likely_guidance` classes through while blocking `likely_regulatory_update` pages that lack sufficient signal combination. Can be lowered per operator decision.

## D-003: PKT-0001 retained (not deleted)
PKT-0001 was created before quality gates existed. Decision: retain the file but retroactively add `quality_class=generic_page`, `quality_score=15`, `promotion_blockers` fields, and set `publish_recommendation=blocked_low_quality`. The promotion pipeline correctly ignores it.

## D-004: Validator accepts existing blocked packets
`validate-candidate-quality.mjs` checks that blocked-class packets have `promotion_allowed: false`, not that they don't exist. Historical artefacts with correct blocking metadata are acceptable.

## D-005: no_publication_candidate_ready flag
Added to `rank-promotion-candidates.mjs` output and propagated to `build-real-review-bundle.mjs` and review console. Currently false (3 eligible candidates exist).

## D-006: Backfill scripts kept in scripts/
`backfill-draft-quality-fields.mjs` and `backfill-packet-quality-fields.mjs` retained as idempotent maintenance tools for future pipeline runs that may encounter legacy data.
