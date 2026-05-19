# Architecture — caesar-ai-incident-atlas

This document outlines the high-level architecture, module layers, and threat indexing pipelines for `caesar-ai-incident-atlas`.

---

## 🏗️ Planned Structure

The database engine is structured into four core module boundaries:

```
┌────────────────────────────────────────────────────────┐
│                   Incident Collector                   │
│   (Crawlers indexing public databases and feeds)       │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                    Taxonomy Processor                  │
│   (Normalizes events into threat categories)           │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Mitigation Database                  │
│   (Maps incidents to specific engineering controls)    │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                     Ecosystem Gateway                  │
│   (Emits structured JSON events and test payloads)     │
└────────────────────────────────────────────────┘
```

1.  **Incident Collector Layer:** Scheduled spiders and scrapers pulling failure reports from AI safety databases, RSS feeds, and legal portals.
2.  **Taxonomy Processor Layer:** Processes raw textual reports, parsing dates, impacted models, and assigning structured threat tags (e.g. Prompt Injection).
3.  **Mitigation Database Layer:** A static, relational catalog that matches threat categories directly with defensive engineering control IDs.
4.  **Ecosystem Gateway Layer:** Compiles incident entries, maintains local payload baseline directories, and exports structured alerts.

---

## 🔄 Data Flow

The threat compilation and alert pipeline progresses as follows:

```
[Incident Source] ──> (Scraper Parser) ──> [Normalized Incidents]
                                                  │
                                                  ▼
[Ecosystem Alerts] <── (Gateway Exporter) <── (Mitigation Mapping)
                                                  │
                                                  ▼
                                      [Local Sandbox Payloads]
```

1.  **Ingestion:** Scrapers retrieve newly reported AI safety failures.
2.  **Classification:** The parser normalizes incident details and tags the exploit method.
3.  **Mapping:** The database queries the incident taxonomy to determine which technical controls are mapped to prevent it.
4.  **Exporting:** Structured records are written to disk, emitting an `incident` evidence payload.

---

## 🔗 Integration with `caesar-ai-evidence`

`caesar-ai-incident-atlas` maps all exported files to standard ecosystem schemas. Specifically:
- **`incident` schema:** Structures the core event record including description, source URL, and taxonomy type.
- **`incident-mitigation` schema:** Documents relations between the threat, the target code control, and any optional sandbox testing prompt strings.

---

## 📊 Future UI, Reporting & API Expectations

*   **Public Exploit Registry:** Local site generators will compile the incident log into a public static dashboard for industry sharing.
*   **OS Threat Sync:** API gateways will support pushing new threat records directly to client dashboards on `caesar-ai-governance-os`, allowing system owners to see when a new jailbreak could affect their model architecture.
