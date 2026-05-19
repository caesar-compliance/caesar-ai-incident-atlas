# Next Actions — caesar-ai-incident-atlas

This document prioritizes upcoming development tasks and establishes execution boundaries for autonomous agents in the `caesar-ai-incident-atlas` repository.

---

## 🚦 Execution Boundaries

### 1. Prioritized Next Steps
*   **Define Incident Taxonomy:** Formalize the exact criteria classifying events into categories like prompt injection, poisoning, or leakage.
*   **Define Incident-to-Control Mapping:** Plan the relational YAML/JSON structure linking incidents directly to mitigation controls.

### 2. Safe Autonomous Tasks
*   Scaffolding comments and documentation inside the planned scraper modules.
*   Improving code formatting and compliance with the `standards/` style guides.
*   Preparing mock HTML templates simulating public incident portals for testing collectors.

### 3. Tasks Requiring Control Tower (Artem / ChatGPT) Approval
*   Implementing scrapers, spider libraries, or active collectors targeting live digital endpoints.
*   Modifying YAML/JSON schemas, taxonomies catalogs, or mitigation parameters.
*   Refactoring code folder layouts or configuration models.

### 4. Blocked Tasks
*   None.

### 5. Cross-Repository Coordination Notes
*   Verify that incident record exports comply strictly with the `incident` and `incident-mitigation` schemas in `caesar-ai-evidence`.
