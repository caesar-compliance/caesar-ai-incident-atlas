# Source Registry Policy

## 1. Purpose
The **Source Registry** is the foundation of the Caesar AI Legal & Governance Case Atlas discovery pipeline. It serves as the trusted, curated directory of canonical endpoints, regulator portals, and databases monitored for automated discovery of real-world AI incidents, enforcement actions, and guidance.

By maintaining strict control over the entry points in this registry, Caesar prevents copyright infringement, license contamination, and ingestion of low-quality or defamatory news items.

---

## 2. Default Inactive State for Absolute Safety
> [!IMPORTANT]
> **Safety Default Rule:** Every source entry added to the registry must default to `status: inactive_draft`. 
> Programmatic watchers are strictly prohibited from parsing, fetching, or executing automated monitoring on any source with an `inactive_draft` status. No active scheduled fetches or live watchers are enabled in Task T043.

---

## 3. Source Tiering Framework
Sources added to the registry are classified into three distinct tiers determining how they may be utilized.

### Green Tier: Highly Trusted Official Sources
* **Description:** Court records, regulator decisions, agency rulings, and official public domain documents.
* **Examples:** Federal Trade Commission (FTC), Equal Employment Opportunity Commission (EEOC), DOJ, Information Commissioner's Office (ICO).
* **Allowed Use:** Full extraction, programmatic auto-detect and auto-drafting of cases. Safest factual base.

### Yellow Tier: Structured References & Discovery Pointers
* **Description:** NGO reports, multi-lateral databases, research papers, and structured incident feeds.
* **Examples:** OECD.AI Incident Database, Responsible AI Collaborative (AIID), AIAAIC.
* **Allowed Use:** Discovery pointers and reference comparison only. **Strictly no bulk-copying or verbatim text extraction.** Original Caesar-written summaries are mandatory.

### Red Tier: High-Risk Unverified Sources
* **Description:** News syndicates, personal blogs, unverified press releases, paywalled commercial publications.
* **Examples:** Commercial news portals, social media.
* **Allowed Use:** Event discovery triggering only. Candidate logs may be created, but no public draft can be created without subsequent verification of a Green or Yellow primary source.

---

## 4. Allowed Ingestion Actions
The `allowed_use` field in the registry governs programmatic limits:
- `official_public_source`: Safe for auto-drafting and extraction.
- `discovery_and_clean_room_summary`: Safe for tracking event occurrences; requires completely original Caesar phrasing.
- `discovery_only`: Reference pointers only; zero verbatim copying of metadata structures or text.
