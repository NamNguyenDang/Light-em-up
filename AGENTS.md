# Light-em-up agent instructions

For work in this repository, read these repository-local guides before changes or PRs:

- [Agent/memory.md](Agent/memory.md): decisions, defects and lessons to avoid repeating.
- [requirement/requirement.md](requirement/requirement.md): golden behavior contract; use linked test cases and traceability for every FR/DR.
- [Agent/skill.md](Agent/skill.md): autonomous implementation/merge scope, DR handling and pre-PR/release checks.
- [docs/ACCESSIBILITY_FEATURE_REQUESTS.md](docs/ACCESSIBILITY_FEATURE_REQUESTS.md): confirmed backlog and current status.
- [leason_learn/README.md](leason_learn/README.md): standards audit, evidence and open gaps.

The user authorizes merging passing work without repeated permission only in NamNguyenDang/Light-em-up. Keep one FR/DR per PR against the verified default branch and preserve separate commits. Respect later user instructions and platform permissions. A merge is not proof of live release readiness; FR-29 remains blocked until the real account/candle journey passes.

For every new FR/DR: read memory, define/update golden acceptance criteria and test scenarios, review applicable standards, implement, then compare actual test/UI results with the requirements. Do not mark acceptance complete while required cases fail, are blocked or are not run. Traceability validation is structural, not a substitute for behavioral tests.
