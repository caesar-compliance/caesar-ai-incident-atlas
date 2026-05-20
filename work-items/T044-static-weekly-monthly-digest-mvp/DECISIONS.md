# Digest Architecture Decisions — T044 Static Weekly and Monthly Digest MVP

This document records the design and architectural decisions made for the Caesar AI Legal & Governance Case Atlas static digests and RSS feeds under task T044.

### [DEC-110] — 21 May 2026 — Static Digest and RSS Architecture

#### Status: Approved

#### Decisions

1. **Static JSON Storage for Digest Data (D17)**
   - Curated operational and strategic digest data is stored in static JSON files under `data/digests/weekly/` and `data/digests/monthly/`, maintaining auditability and absolute decoupling from external databases.
   
2. **Duplicate Copy Publish Strategy (D18)**
   - Synchronized duplicate copies are written to `site/data/digests/` for client-side static site serving. The local digest validator programmatically enforces exact SHA-256 parity between the root authoring directory and the public web directory.
   
3. **Standalone ES Module Scripts for Pipeline Operations (D19)**
   - Used standalone `.mjs` Node scripts (`scripts/validate-digests.mjs` and `scripts/build-rss-feeds.mjs`) to perform schema validation and feed compilation, maintaining a lightweight environment without complex bundlers or dependency overhead.
   
4. **Consolidated and Segmented RSS Feed Generation (D20)**
   - Compiles three distinct RSS 2.0 XML feeds to satisfy different syndication needs: `rss.xml` (all updates), `weekly.xml` (weekly operational briefs only), and `monthly.xml` (monthly strategic trends only), complying with RFC 822 date formats.
   
5. **Zero-JS Fallback Client Page Rendering (D21)**
   - Built the digest landing portal (`site/digests/index.html`) and archive subpages as fast, semantic, static HTML pages requiring zero JavaScript execution. This guarantees perfect reliability, accessibility, and zero load-time overhead.
   
6. **Primary Sidebar Homepage Integration (D22)**
   - Placed the digests entry panel and RSS subscription links in the existing homepage (`site/index.html`) sidebar, maintaining perfect dark-mode layout cohesion without refactoring main app structural containers.

#### Rationale
Enforces a secure, purely static and offline-built briefing system. Discarding dynamic backends and external email systems completely eliminates server security vectors and supply chain vulnerabilities while giving readers premium, reliable access to Caesar's governance briefings.
