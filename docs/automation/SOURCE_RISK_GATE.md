# Source Risk Gate Policy

## 1. Overview
The **Source-Risk Gate** (Stage 5) evaluates discovery candidates against strict legal, licensing, and reputational safety rules before they can be promoted to case drafts. This serves as our defense against copyright violations and defamation liability.

---

## 2. Ingestion Gates and Tier Policies

### Green Tier Gate (Low Risk)
* **Sources:** Regulator portals, tribunal judgments, federal agency orders, official court filings (e.g., FTC, EEOC, UK ICO, EC, CNIL).
* **Policy:** Approved for auto-drafting. The system may programmatically extract factual data points, dates, parties, and case references.
* **Output:** Promoted automatically to `DRAFT-XXXX` with status `draft`.

### Yellow Tier Gate (Medium Risk)
* **Sources:** Databases like OECD.AI, Responsible AI Collaborative (AIID), AIAAIC, peer-reviewed academic papers, or corporate postmortems.
* **Policy:** Promoted to draft only; absolute manual review by the Control Tower is mandatory. Verification of the underlying primary source is required.
* **Output:** Promoted to `DRAFT-XXXX` with status `in_review` and flagged for manual counsel assessment.

### Red Tier Gate (High Risk)
* **Sources:** Commercial news sites, paywalled publications, blogs, social media posts.
* **Policy:** Strictly restricted. The system may log candidate metadata (`CAND-XXXX`) for tracking, but **cannot auto-draft a public summary**.
* **Output:** Remains a candidate in `unprocessed` status. Conversion to a public case is blocked unless a supporting Green or Yellow source is verified.

---

## 3. Strict Safety Guardrails

To protect Caesar's legal and intellectual property standing, the following guidelines are absolute:

### A. Verbatim Copying is Prohibited
> [!CAUTION]
> Under no circumstances may summaries or metadata contain text copied verbatim from news articles, research papers, or third-party datasets. This prevents commercial copyright infringement.

### B. Highly Hedged Wording
Case descriptions and summaries must use objective, non-accusatory, and highly hedged language.
* **Correct:** *"The agency alleged that the algorithm..."*, *"The tribunal ruled that..."*, *"According to public court filings, the system..."*
* **Incorrect:** *"The company committed fraud using..."*, *"The negligent chatbot caused..."*

### C. Zero Legal Conclusions
The Atlas compiles public facts, not legal advice or independent legal findings. Descriptions must never assert negligence, guilt, or legal culpability on the part of any company or operator unless quoting a finalized, unappealable court judgment verbatim as a fact of the decision.

### D. Defamation Mitigation
Use role-based identifiers (e.g., *"the candidate"*, *"the patient"*) instead of naming non-public individuals, claimants, or victims.
