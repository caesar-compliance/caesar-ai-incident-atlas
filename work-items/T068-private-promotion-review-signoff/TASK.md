# T068 — Controlled Private Promotion Review/Signoff

## Goal
Add a private promotion review/signoff layer on top of the T067 dry-run bundle. Local-only human/legal governance gate before any T069 promotion-packet candidate work.

## Scope
- Private signoff schema, builder, apply script, exporters, validator, workflow
- Review console signoff view
- Safe ops-status counts only

## Out of scope
- Real INC-0014, real promotion packets, public previews, public cases
- Supabase writes, Worker deploy, cron, Pages config changes

## Safety
- `signoff_status`: `private_review_pending` or `private_review_blocked`
- All publication permission flags remain `false`
- Public count stays 13; latest stays INC-0013
