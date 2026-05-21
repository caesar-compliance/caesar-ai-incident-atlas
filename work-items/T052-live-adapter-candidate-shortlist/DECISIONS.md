# T052 Decisions

## Adapter Strategy
- **Decision**: Fix FTC URL rather than remove - the adapter framework should handle evolving URLs via fallback mechanism
- **Decision**: Add language variant filters to EDPB rather than whitelist-only - preserves ability to detect non-EN content if needed later
- **Decision**: Keep metadata-only retention policy - no full HTML storage despite having fetch capability

## Shortlist Scope
- **Decision**: Top 5 only - manageable review queue for Control Tower
- **Decision**: Include blocked items in shortlist - visibility into why candidates were rejected
- **Decision**: Add governance value analysis - helps Control Tower prioritize

## Review Console Updates
- **Decision**: Shortlist as separate tab - keeps it visible but doesn't overwhelm main candidate view
- **Decision**: Show adapter health in shortlist view - helps diagnose source issues
