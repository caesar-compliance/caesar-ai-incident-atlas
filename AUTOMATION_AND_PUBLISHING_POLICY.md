# Automation and Publishing Policy

## 1. Core Philosophy

The Caesar AI Legal & Governance Case Atlas prioritizes **accuracy, intellectual property integrity, and legal safety** over ingestion speed or dataset volume. 

This policy establishes strict gates and clean-room requirements to ensure that no automated workflows compromise Caesar's legal standing, violate data copyrights, or publish defamatory, unverified, or legally sensitive claims.

---

## 2. Ingestion Restraints and Source Rules

To prevent copyright infringement, data license contamination, and reputational risk, the following three rules are absolute:

1. **No Bulk-Copying of Competitor Databases:** Ingesting bulk datasets or cloning entire database tables from competitor resources (e.g., AIID, AVID, OECD) is strictly prohibited. Competitor repositories may only be used for discovery pointers and taxonomy benchmarking.
2. **No Copied Third-Party Text:** Summaries and metadata fields must never contain text copied verbatim from news articles, research papers, or third-party websites. All text in published Caesar records must be original, clean-room Caesar prose.
3. **No Automatic Publishing by Default:** All newly drafted records or candidate ingestion logs must default to a non-public status. Under no circumstances will automated scripts publish records directly to the production site without human oversight.

---

## 3. Source Tiering Framework

The Atlas categorizes and gates incident sources into three distinct tiers to govern how their data is handled.

| Source Tier | Included Source Types | Risk Rating | Operational Policy |
|---|---|---|---|
| **Green** | Official court records, regulatory orders, federal agency decisions, government agency reports (e.g., NTSB, EEOC, FTC, BC CRT). | **Low Risk** | Verified public domain. Safest for factual extraction. Highly preferred. |
| **Yellow** | OECD AI monitor, AIID citations, company postmortems, university research reports, peer-reviewed academic papers. | **Medium Risk** | Generally reliable, but may carry copyright risks (especially academic papers) or self-serving bias (company statements). Reference with care. |
| **Red** | Commercial news publications, paywalled articles, personal blogs, social media posts, unverified press releases. | **High Risk** | High risk of defamation, commercial copyrights, paywall violations, or biased framing. Candidate use only. |

---

## 4. Ingestion and Automation Rules

Based on the Source Tier of the primary discovery document, the Caesar ingestion engine applies the following automated rules:

```
┌─────────────────────────────────────────────────────────────┐
│                      Discovery Source                       │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
       [Green Tier]      [Yellow Tier]       [Red Tier]
            │                  │                  │
            ▼                  ▼                  ▼
     ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
     │ Auto-Detect │    │ Auto-Detect │    │  Candidate  │
     │     and     │    │     and     │    │  Metadata   │
     │ Auto-Draft  │    │  Draft Only │    │  Log Only   │
     └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
            │                  │                  │
            ▼                  ▼                  ▼
     ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
     │ Human Gate/ │    │ Control     │    │ Strict      │
     │ CT Review   │    │ Tower/Human │    │ Manual      │
     │  Required   │    │  Gate mandatory  │ Approval req.│
     └─────────────┘    └─────────────┘    └─────────────┘
```

### 4.1 Green Tier Rules
- **Auto-Discovery:** Programmatic watchers automatically detect new filings, decisions, and rulings on official government portals.
- **Auto-Drafting:** Enriched AI agents extract factual metadata (jurisdiction, authority, dates, case numbers) and auto-draft an initial clean-room Caesar summary.
- **Publishing Gate:** The drafted record is routed to the draft directory. Auto-publication is disabled by default; final manual validation is required.

### 4.2 Yellow Tier Rules
- **Auto-Discovery:** Ingestion watchers monitor academic feeds, company posts, and OECD updates.
- **Auto-Drafting:** Programmatic tools auto-detect and log the candidate entry. An AI agent drafts a provisional internal record.
- **Publishing Gate:** Absolute manual Control Tower review is mandatory. The record cannot be promoted to production without counsel review and explicit sign-off on the data license.

### 4.3 Red Tier Rules
- **Auto-Discovery:** Social media monitors and news syndicates identify candidate events.
- **Auto-Drafting:** Programmatic tools log candidate metadata only (title, source URL, date discovered). No public summary is auto-drafted.
- **Publishing Gate:** The candidate remains in a triage state. It cannot be converted into a draft or published record unless a Green or Yellow tier primary source is subsequently discovered and verified.

---

## 5. Clean-Room Summary Standards

Every public-facing summary must strictly follow these clean-room writing rules:
- **Hedged Wording:** Use objective, factual framing (e.g., *"The tribunal found..."*, *"According to public filings..."*, *"Reportedly..."*).
- **No Defamation:** State only documented, verified facts. Never make legal claims of negligence, fraud, or guilt. Use role-based identifiers instead of naming individual non-public victims or claimants.
- **Attribution:** Cite the canonical legal citations (e.g., case numbers, tribunal filings) so users can access the underlying public domain documents directly.
