# Design & Architectural Decisions for T063

## Bounded Review Runner Separation
- **Decision**: Create an independent runner script `scripts/run-private-review-workflow.mjs` and expose it via `--review-intake-only` in the main automation cycle.
- **Rationale**: Isolates the review-intake workflow steps from unrelated/failing pipeline stages, enabling robust testability and clean execution without network side effects.

## Deterministic Decision Identifiers
- **Decision**: Use `DECISION-<run_id>-<3-digit-index>` format.
- **Rationale**: Guarantees deterministic, reproducible IDs that link back to the source intake run and sequence index.

## Strict Local/Private Isolation
- **Decision**: Save review decision and draft packet JSONs under `data/reviews/decisions/` and `data/reviews/draft-candidate-packets/` respectively, keeping them completely excluded from the public-facing `site/` folder.
- **Rationale**: Ensures zero leakage of private signals, reviews, or draft candidate descriptions to the public GitHub Pages site.

## Safe Progress Count Reporting
- **Decision**: Only export counts of decisions and draft packets (`private_review_decision_count`, `private_draft_candidate_packet_count`) to public status exports (`latest-status.json`).
- **Rationale**: Allows checking local workflow progress on public dashboards without revealing any sensitive private metadata or signal URLs.
