# T047 — Real Green-Source Watcher MVP Design Decisions

The following localized architecture and design decisions were made to build the first real working watcher MVP:

## 1. Candidate Status Enum Extension
- **Decision**: Added `real_detected` status to `schemas/pipeline/candidate.schema.json`.
- **Rationale**: Reusing synthetic `mock_detected` status would conflate real and synthetic datasets. Creating `real_detected` keeps them segregated, ensures schema compliance, and aligns with the production data classification model.

## 2. No Third-Party Library Scraping Dependencies
- **Decision**: Implemented native, regex-based index link and XML feed parser instead of importing cheerio or puppeteer.
- **Rationale**: Respects the absolute "no new dependencies unless unavoidable" constraint. Avoids licensing risk, complex build chain modifications, or runtime environment issues on the operator's system.

## 3. Strict Metadata-Only Storage Model
- **Decision**: Avoided saving page body text or crawling deep article content.
- **Rationale**: Safe-harbors Caesar against intellectual property or license violations, preserves a lightweight local-only candidate footprint, and focuses watcher duties on discovery/classification metadata.

## 4. Local Review Console Interactive Selection
- **Decision**: Added a bundle selector toggle to the local-only review console UI sidebar.
- **Rationale**: Provides the operator with a native, seamless way to audit the newly discovered real candidate metadata locally without exposing them on public pages, and prevents simulated curated promotion from leaking.
