# T068 Decisions

1. **Default `signoff_status`**: Use `private_review_blocked` when T067 blockers exist; validator accepts `private_review_pending` or `private_review_blocked`.
2. **Apply script hard cap**: Rejects setting all five review dimensions to `passed` in one session to preserve T068 baseline for validation.
3. **Permission flags as schema `enum: [false]`**: Prevents accidental publication enablement via JSON edits.
4. **Ops status**: Expose only `private_promotion_signoff_status`, `private_promotion_signoff_count`, `private_promotion_public_allowed_count` — no IDs or private paths.
