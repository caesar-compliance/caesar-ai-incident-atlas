# Task T069 Decisions

1. **Local and Private Containment Only**: All candidate data remains entirely inside private directories and is completely excluded from `site/` to avoid leakage into GitHub Pages.
2. **Deterministic Candidate ID**: Built the deterministic packet candidate ID `PROMO-PACKET-CAND-GREEN-RUN-20260521-202417-001` matching the baseline green run.
3. **Strict Validation Policies**: Any attempt to set any of the publication permission flags (`public_publish_allowed`, `real_promotion_packet_allowed`, `public_preview_allowed`, `public_record_creation_allowed`, `remote_write_allowed`, etc.) to `true` will trigger immediate script failure.
4. **Preserved Blocker Count**: Preserved the unresolved blocker count of `6` from T068 signoff.
5. **No Third-Party/HTML Content**: Sanitized all payloads to completely exclude third-party text or raw HTML.
