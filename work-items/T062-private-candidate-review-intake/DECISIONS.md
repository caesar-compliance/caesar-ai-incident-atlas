# Design & Architectural Decisions for T062

## Deterministic Intake Identifiers
- **Decision**: Use `INTAKE-<run_id>-<3-digit-index>` format.
- **Rationale**: Ensures that individual intake records are deterministically traceable back to their original monitoring run and sequence number, easing future database reconciliation.

## Metadata-Only Storage
- **Decision**: Exclude long third-party text, scraped body content, and raw HTML from all intake outputs.
- **Rationale**: Adheres to the core Caesar privacy and compliance principle of keeping metadata-only retention by default, preventing licensing/copyright/data bloat issues.

## Isolation from Public Site
- **Decision**: Store review console intake data inside the `tools/review-console/data/` directory and private intake records inside `data/reviews/intake/`, keeping them entirely out of `site/`.
- **Rationale**: Ensures zero leaks of unreviewed private signals/intakes to the public-facing GitHub Pages site.

## Safe Progress Metrics
- **Decision**: Only export numeric counts (`private_intake_count` and `private_intake_needs_review_count`) to the public `site/data/ops/latest-status.json` file.
- **Rationale**: Allows public monitoring dashboards to report on system activity status without leaking private signal URLs or sensitive hashes before they are officially reviewed and promoted.
