# Light-em-up agent instructions

For work in this repository, read these repository-local guides before changes or PRs:

- [agent/memory.md](agent/memory.md): decisions, defects and lessons to avoid repeating.
- [docs/requirements/requirement.md](docs/requirements/requirement.md): golden behavior contract; use linked test cases and traceability for every FR/DR.
- [agent/skill.md](agent/skill.md): autonomous implementation/merge scope, DR handling and pre-PR/release checks.
- [docs/tracking/backlog.md](docs/tracking/backlog.md): confirmed backlog and current status.
- [docs/standards/README.md](docs/standards/README.md): standards audit, evidence and open gaps.

The user authorizes merging passing work without repeated permission only in NamNguyenDang/Light-em-up. Keep one FR/DR per PR against the verified default branch and preserve separate commits. Respect later user instructions and platform permissions. A merge is not proof of live release readiness; Current scope is browser-local. FR-29 online activation/acceptance remains deferred and unverified; never describe it as fixed.

For every new FR/DR: read memory, define/update golden acceptance criteria and test scenarios, review applicable standards, implement, then compare actual test/UI results with the requirements. Do not mark acceptance complete while required cases fail, are blocked or are not run. Traceability validation is structural, not a substitute for behavioral tests.
