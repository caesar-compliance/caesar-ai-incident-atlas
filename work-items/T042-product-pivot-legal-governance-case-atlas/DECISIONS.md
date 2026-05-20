# Decisions — T042 Product Pivot

This document records the strategic, architectural, and governance decisions made for the Caesar AI Legal & Governance Case Atlas pivot in T042.

## Recorded Decisions

### [D1] General Incident Database Declassification
- **Status:** Approved
- **Decision:** Caesar Atlas is no longer positioned or designed as a general-purpose AI incident database.
- **Rationale:** A general database competes with established feeds (AIID, OECD) and creates unnecessary maintenance overhead without commercial differentiation.

### [D2] Legal & Governance Case Atlas Re-positioning
- **Status:** Approved
- **Decision:** The product is re-positioned as the "AI Legal & Governance Case Atlas — a case-to-control intelligence layer."
- **Rationale:** This aligns the Atlas with the broader Caesar ecosystem and provides compliance officers, legal teams, and risk professionals with actionable mappings from real failure events to missing controls.

### [D3] Target Case Scope
- **Status:** Approved
- **Decision:** Target cases are strictly defined as: enforcement actions, lawsuits, regulator guidance, court decisions, settlements, public-sector incidents, vendor governance failures, serious incident reports, commercial AI failures, and official investigations.
- **Rationale:** Prioritizes events with demonstrable legal, compliance, commercial, or governance substance over general press reports.

### [D4] Case-to-Control Value Chain
- **Status:** Approved
- **Decision:** The core architectural and conceptual chain of the product is defined as:
  $$\text{case} \rightarrow \text{legal/commercial risk} \rightarrow \text{missing governance control} \rightarrow \text{evidence requirement} \rightarrow \text{client checklist} \rightarrow \text{training lesson}$$
- **Rationale:** Connects real-world failures directly to actionable remediation tasks and training outputs within the Caesar product suite.

### [D5] Source-Tiered Automation-First Direction
- **Status:** Approved
- **Decision:** Design the architecture for automation-first ingestion and drafting, but enforce strict, source-tiered risk gating before any record publication.
- **Rationale:** Scales ingestion efficiency while preserving extreme legal and wording safety.

### [D6] Preference for Official and Government Sources
- **Status:** Approved
- **Decision:** Direct preference is established for official regulator, government, agency, and court sources over third-party news reports or media opinions.
- **Rationale:** Maximizes reliability, factual precision, and public domain license safety.

### [D7] Competitor Database Exclusion Policy
- **Status:** Approved
- **Decision:** Third-party or competitor databases (e.g., AIID, AVID, OECD) may be used strictly for discovery pointers and references, never copied, scraped, or bulk-imported.
- **Rationale:** Preserves product integrity, intellectual property clean-room status, and avoids licensing contamination.

### [D8] Clean-Room Editorial Summary Policy
- **Status:** Approved
- **Decision:** All public-facing summaries must be written entirely in original, clean-room Caesar prose. No third-party or competitor text may be copied verbatim.
- **Rationale:** Ensures compliance with copyright laws and maintains Caesar's independent voice.

### [D9] Weekly/Monthly Digests as First-Class Outputs
- **Status:** Approved
- **Decision:** Structured weekly and monthly digests are established as core, first-class product outputs alongside individual case records.
- **Rationale:** Drives ongoing user engagement and delivers high-value, periodic governance intelligence.

### [D10] Staged Subscription Integration
- **Status:** Approved
- **Decision:** The subscription system is staged: RSS feeds and static digest archives are built first; email subscriptions and provider integrations (e.g., listmonk/Resend) are deferred. No subscriber DB is introduced in this phase.
- **Rationale:** Minimizes structural complexity and privacy risks until scale warrants active subscriber management.
