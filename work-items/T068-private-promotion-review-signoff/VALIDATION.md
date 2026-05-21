# T068 Validation Checklist

- [x] Schema enforces permission flags `false` and allowed signoff statuses
- [x] Exactly one signoff record
- [x] References valid T067 dry-run and T066 package
- [x] `unresolved_blockers` > 0
- [x] Not all review dimensions passed
- [x] No INC-0014 files or index entries
- [x] Public count = 13, latest = INC-0013
- [x] Hosted payload sanitized, no remote write
- [x] Console export outside `site/`
- [x] Full pipeline validation suite passes
