# Promotion CLI Runbook

Quick reference for promoting drafts to public incident records.

## Prerequisites

- Complete T048 (Real Candidate-to-Draft Pipeline)
- Real drafts exist in `data/drafts/real/`
- Promotion packets exist in `data/promotion-packets/real/`

## Step 1: Rank Candidates

```bash
node scripts/rank-promotion-candidates.mjs
```

Output: `data/reviews/real/ranked-promotion-candidates.json`

Shows top 5 candidates with scores and risks.

## Step 2: Review in Console

Open `tools/review-console/index.html` in browser.

Check:
- Pipeline stage tabs show Packets
- Top recommendation visible
- Status: NOT PUBLIC / NOT APPROVED

## Step 3: Generate Dry-Run Previews

```bash
node scripts/promote-approved-case.mjs
```

Without approvals, this generates previews only:
- Output: `data/promotion-previews/real/`
- Files: `preview-inc-0013.json`, etc.
- These are NOT public and have `_dry_run_preview: true`

## Step 4: Add Approval

Edit `data/reviews/real/approved-promotions.json`:

```json
{
  "approvals": [
    {
      "packet_id": "PKT-0001",
      "draft_id": "DRAFT-0001",
      "approved_by": "Control Tower",
      "approval_date": "2026-05-21",
      "allowed_public_case_id": "INC-0013",
      "allowed_public_filename": "inc-0013.json",
      "approval_scope": "single_publication",
      "approval_notes": "Curator review complete. Clean-room wording approved.",
      "required_checklist": {
        "curator_review_complete": true,
        "clean_room_wording_approved": true,
        "legal_domain_confirmed": true,
        "control_tower_approved": true,
        "publication_approved": true
      }
    }
  ]
}
```

## Step 5: Promote Approved Case

```bash
node scripts/promote-approved-case.mjs
```

With approval present:
- Creates `data/incidents/inc-0013.json`
- Updates `data/incident-index.json`
- Copies to `site/data/incidents/`

## Step 6: Validate

```bash
node scripts/validate-promotion-dry-run.mjs
```

Must confirm:
- Public count is 13 (or 12 if no approval)
- INC-0013 created (if approved)
- No drafts/previews leaked to site/
- All safety checks pass

## Safety Limits

| Condition | Result |
|-----------|--------|
| No approval file | Dry-run only, no public records |
| Multiple approvals | Script refuses (one at a time) |
| Yellow/Red source | Blocked unless explicit override |
| source_text_copied: true | Always blocked |
| Public record exists | Blocked |

## Emergency

To block all promotions immediately:

```bash
echo '{"approvals":[]}' > data/reviews/real/approved-promotions.json
```

This ensures dry-run mode only.
