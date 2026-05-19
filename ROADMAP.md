# Development Roadmap — caesar-ai-incident-atlas

This document outlines the core developmental milestones and phases planned for `caesar-ai-incident-atlas`.

---

## 🚦 Project Phases

```
v0.1 Foundation ──> v0.2 Catalog Draft ──> v0.3 Threat Scraper ──> v0.4 Sandbox CLI ──> v1.0 Stable
```

### Phase v0.1 — Repository Foundation
*   **Goal:** Establish clean repository layout, standards documentation, license parameters, and workspace registries.
*   **Status:** **Active / Complete** (19 May 2026)
*   **Key Deliverables:**
    *   Shared Caesar ecosystem scaffolding (`PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `docs/DECISION_LOG.md`).
    *   System specifications and module data-flow maps (`SPEC.md`, `ARCHITECTURE.md`).

### Phase v0.2 — First Functional Catalog Draft
*   **Goal:** Construct baseline YAML threat directory and mitigation mapping databases.
*   **Status:** Planned
*   **Key Deliverables:**
    *   Relational mapping registry mapping public incidents (e.g. ChatGPT data leaks) to controls.
    *   LIGHT CLI registry reader printing mitigations by category.

### Phase v0.3 — Automated Threat Scrapers
*   **Goal:** Build automated scrapers querying AI safety public RSS feeds.
*   **Status:** Planned
*   **Key Deliverables:**
    *   Scraper modules targeting safety registries.
    *   Data normalizer parser library.
    *   Exporter formatted to `caesar-ai-evidence` schemas.

### Phase v0.4 — Sandbox Testing CLI
*   **Goal:** Construct standalone sandbox validator executing exploit prompt payloads.
*   **Status:** Planned
*   **Key Deliverables:**
    *   Testing prompt database storing jailbreak samples.
    *   CLI validator checking model resilience.

### Phase v1.0 — Stable Initial Release
*   **Goal:** Verified continuous threat intelligence service.
*   **Status:** Planned
*   **Key Deliverables:**
    *   Scrapers pulling from 5+ security and legal sources.
    *   Direct webhook syncing threat updates to `caesar-ai-governance-os`.
