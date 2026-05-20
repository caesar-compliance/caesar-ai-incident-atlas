# Validation — Repository Presentation Polish

## Pre-change

| Check | Result | Notes |
|---|---|---|
| `git status` on `main` | Clean tracked tree | Untracked macOS ` 2` duplicates present locally |
| `python3 tools/validate_dataset.py` | FAIL locally | 13 INC files due to untracked `INC-0011-... 2.json` duplicate |
| Tracked INC count | 12 | `git ls-files data/incidents/*.json` |

## Post-change (expected)

| Check | Result |
|---|---|
| `git diff --check` | PASS |
| `python3 tools/validate_dataset.py` | PASS when no untracked duplicate INC files |
| README renders live site link | `https://atlas.caesar.no` |
| `gh repo view` homepage | `https://atlas.caesar.no` |
| Remote branches | `main` only |
