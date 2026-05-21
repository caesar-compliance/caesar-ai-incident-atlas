# T051 Implementation Report

## Files Created
- `scripts/source-adapters/shared.mjs` — shared utilities (fetch, link extraction, filtering, keyword matching)
- `scripts/source-adapters/ico-adapter.mjs` — ICO-specific enforcement/AI guidance adapter
- `scripts/source-adapters/ftc-adapter.mjs` — FTC enforcement/press adapter
- `scripts/source-adapters/cnil-adapter.mjs` — CNIL sanctions/AI adapter (French signal support)
- `scripts/source-adapters/edpb-adapter.mjs` — EDPB guidelines/opinions adapter
- `scripts/source-adapters/eu-commission-adapter.mjs` — EU Commission AI Act policy adapter
- `scripts/source-adapters/generic-official-adapter.mjs` — fallback for sources without named adapter
- `scripts/run-real-pipeline.mjs` — one-command pipeline runner (14 stages, stops on first failure)
- `docs/watch/REAL_PIPELINE_ONE_COMMAND_RUNBOOK.md`
- `work-items/T051-high-signal-official-source-adapters/` (TASK, DECISIONS, VALIDATION, IMPLEMENTATION_REPORT)

## Files Modified
- `scripts/watch-green-sources.mjs` — adapter dispatch, adapter run report, ADAPTER_MAP
- `scripts/classify-candidate-quality.mjs` — T051 quality classes, per-class promotion thresholds
- `scripts/rank-promotion-candidates.mjs` — enforcement/decision +40, guidance +15, adapter confidence, `no_case_quality_candidate_ready`
- `scripts/build-promotion-packets.mjs` — blocked_* classes added
- `scripts/promote-approved-case.mjs` — blocked_* classes added
- `scripts/build-real-review-bundle.mjs` — adapter summary, case_quality_count, top_5_ranked, no_case_quality_candidate_ready
- `data/watch/config/green-source-watch-targets.json` — high_signal_path_hints, negative_path_filters, adapter field
- `data/watch/config/target-keywords.json` — expanded ai_terms, legal_terms, stronger exclusion_terms
- `tools/review-console/index.html` — quality class filter, adapter fields, no-case-quality banner
- `tools/review-console/assets/review-console.js` — T051 badge colours, quality filter, adapter metadata, ranked table Adapter column
- `tools/review-console/assets/review-console.css` — T051 badge colour classes

## Quality Classes (T051)
| Class | Promotion | Threshold |
|---|---|---|
| `likely_enforcement_case` | ✓ | ≥75 |
| `likely_regulatory_guidance` | ✓ | ≥80 |
| `likely_official_decision` | ✓ | ≥75 |
| `likely_policy_update` | draft only | — |
| `blocked_generic_page` | ✗ | — |
| `blocked_low_relevance` | ✗ | — |
