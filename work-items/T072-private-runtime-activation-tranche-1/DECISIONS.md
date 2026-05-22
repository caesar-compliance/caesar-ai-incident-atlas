# T072 Private Runtime Activation Tranche 1 Design Decisions

- **Dry-run by default:** Absolute protection against accidental writes. Only explicit, double-gated local command flags and environment markers can trigger real remote writes.
- **Strict separation of private/public boundaries:** Private runtime details and SQL schemas are strictly excluded from the public `site/` folder, ensuring zero data leakage.
- **Additive DDL preflight checks:** Enforcing automated blockers against destructive keywords (`DROP`, `TRUNCATE`, etc.) inside SQL migrations prior to any deployment step.
- **Sanitized metadata-only database records:** Restricting written tables to structural attributes and hashes. Raw HTML content and incident descriptions are barred from remote sync.
