# T051 Decisions

- **Adapter dispatch via ADAPTER_MAP** — keyed by `source_id` in watcher; falls back to `generic-official-adapter` if no match or if named adapter errors.
- **CNIL adapter uses French signal terms** — English keyword list is insufficient for French DPA pages; added explicit French positive title patterns.
- **EDPB adapter filters by document URL segments** — EDPB links are inherently regulatory; accepted even without keyword match if URL matches known doc section paths.
- **`likely_policy_update` blocked from promotion** — draft-only class; needs curator enrichment before any packet can be raised.
- **`blocked_*` classes replace legacy names** — `blocked_generic_page` replaces `generic_page`/`event_or_webinar`/`job_or_procurement`; `blocked_low_relevance` replaces `low_relevance`. Legacy names kept in blocked list for backward compat.
- **Enforcement/decision ranked +40 above guidance +15** — ensures case-quality candidates surface first in review console.
- **Adapter confidence bonus** — named adapter +10, generic adapter +5, no adapter = risk flag.
- **`no_case_quality_candidate_ready` flag** — added to ranked output and bundle; displayed in review console banner.
- **Pipeline runner skips missing scripts** — avoids hard stop if optional validators don't exist in repo yet.
