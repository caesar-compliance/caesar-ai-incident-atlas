# T049 Technical Decisions

## DEC-049.1: Empty Approvals Array as Safety Default

**Decision**: `approved-promotions.json` defaults to `{"approvals": []}`.

**Rationale**: Empty array is unambiguous and easy to check. Any non-empty value requires explicit action.

## DEC-049.2: One Approval Per Run Limit

**Decision**: `promote-approved-case.mjs` refuses to run if more than one approval exists.

**Rationale**: Prevents batch mistakes. Forces deliberate, case-by-case promotion.

## DEC-049.3: Source Tier Overrides Require Explicit Flags

**Decision**: Yellow/Red tier sources can only be promoted with `override_source_tier: true` in approval.

**Rationale**: Creates audit trail and requires explicit Control Tower acknowledgment of elevated risk.

## DEC-049.4: Copied Text = Hard Block

**Decision**: `source_text_copied: true` always blocks promotion, no override allowed.

**Rationale**: Legal/IP risk too high. Only clean-room summaries permitted.

## DEC-049.5: Preview Location Outside site/

**Decision**: Dry-run previews stored in `data/promotion-previews/real/`, never in `site/`.

**Rationale**: Physical separation prevents accidental publication. `site/` is the public boundary.

## DEC-049.6: Score-Based Ranking with Risk Override

**Decision**: Candidates ranked by composite score, but any risk flag requires Control Tower review.

**Rationale**: Quantitative scoring helps prioritize, but qualitative risk assessment requires human judgment.

## DEC-049.7: Promotion Metadata Embedded

**Decision**: Public records include `_promotion_metadata` with draft_id, packet_id, approval details.

**Rationale**: Full audit trail from public record back to source draft and approval.
