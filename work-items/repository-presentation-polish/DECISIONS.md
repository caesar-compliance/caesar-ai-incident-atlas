# Decisions — Repository Presentation Polish

## Homepage URL

Use **`https://atlas.caesar.no`** — documented in README, deployment records (T022/T023), and live GitHub Pages CNAME via API (no CNAME file in repo by design).

## README scope

Restructure header and status only; retain detailed product, structure, and disclaimer sections below the fold.

## Branch cleanup

Delete only `origin/*` branches where `git branch -r --merged origin/main` confirms full merge. Do not delete unmerged branches.

## Local untracked duplicates

macOS ` 2` duplicate files are out of scope for this commit; operators may remove locally to restore `validate_dataset.py` PASS.
