# Digest Product Model

## 1. Introduction

The **Caesar AI Legal & Governance Digest** is a core, first-class product output designed to deliver periodic, high-value risk intelligence to corporate compliance, legal, and risk teams. 

The digest translates the granular case-to-control mappings logged in the Atlas into structured, time-bounded, and theme-bounded briefings that help organizations stay ahead of emerging AI legal risks and regulatory enforcement patterns.

---

## 2. Product Invariant Rules and Boundaries

To manage platform complexity, data privacy, and operational overhead, the following boundaries are enforced:

- **RSS-First Architecture:** The absolute primary distribution channel is machine-readable RSS feeds and public static archive pages.
- **Static Archive-First Layout:** Digests are built as static pages compiled during the build process, requiring zero active backend database queries.
- **No Subscriber Database:** The repository maintains absolutely zero subscriber databases, email registers, or PII.
- **No Email Provider Integration:** No third-party email providers (e.g., Resend, Mailgun, AWS SES) or transactional mailing scripts are integrated into this phase of the product.

---

## 3. Digest Tiers and Structures

```
                 ┌────────────────────────────────┐
                 │       Granular Atlas Data      │
                 └──────────────┬─────────────────┘
                                │
            ┌───────────────────┴───────────────────┐
            ▼                                       ▼
┌───────────────────────┐               ┌───────────────────────┐
│     Weekly Digest     │               │    Monthly Digest     │
│   New Case Briefs     │               │   Regulatory Trends   │
└───────────┬───────────┘               └───────────┬───────────┘
            │                                       │
            ▼                                       ▼
┌───────────────────────────────────────────────────────────────┐
│                     Static Archive Publisher                  │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                        RSS Feed Outputs                       │
│           /rss/weekly.xml  •  /rss/monthly.xml                │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼ (Future Phase)
┌───────────────────────────────────────────────────────────────┐
│                   Stateless Email Campaigns                   │
│         listmonk / Resend / SES / Mailgun Templates           │
└───────────────────────────────────────────────────────────────┘
```

### 3.1 Weekly Digest
- **Focus:** New Cases and Direct Mitigation Actions.
- **Content:** Factual briefs of cases ingested and published during the preceding 7 days, including their specific missing controls, required evidence, and vendor questions.
- **Goal:** Direct action. Deliver immediate risk awareness to operational teams onboarding similar systems.

### 3.2 Monthly Digest
- **Focus:** Regulatory Trends, Sector Analysis, and Legal Synthesis.
- **Content:** Aggregate analysis of multi-case risk patterns (e.g., a spike in EEOC biometrics enforcement), overview of regulator statements, and a consolidated compliance checklist.
- **Goal:** Strategic alignment. Deliver long-term trend data for corporate governance planning and policy drafting.

---

## 4. Distribution and Ingestion Flow

### 4.1 RSS Feeds
The build engine programmatically compiles the published incident dataset into two distinct, valid RSS XML feeds:
1. `site/rss/weekly.xml` — containing the weekly digest updates.
2. `site/rss/monthly.xml` — containing the monthly strategic digests.

### 4.2 Static Archive Pages
The public website served via GitHub Pages contains a dedicated `/digests/` index, allowing users to browse historic archives without requiring a user account or database session:
- `/digests/weekly/YYYY-Www/`
- `/digests/monthly/YYYY-MM/`

---

## 5. Later-Stage Email Subscriptions

In a future, commercial-ready phase, Caesar will introduce opt-in email delivery for the digests. This expansion will be built as a separate, decoupled service:
1. **Stateless Ingest:** A subscription gateway built on Caesar AI Governance OS (not within the static incident atlas repo).
2. **Campaign Manager:** Utilizing permissive or enterprise-ready services (e.g., self-hosted listmonk or cloud providers like Resend, Mailgun, or AWS SES) to handle subscriber verification, bounces, and template-based HTML dispatch.
3. **Privacy Compliance:** Integration of full double opt-in validation, global unsubscribe logs, and secure encryption for subscriber metadata.
