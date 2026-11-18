# Light-em-up development workflow — FR-28

Repository-local instructions for agents working on NamNguyenDang/Light-em-up. This is a checked-in workflow guide, not an installed global ChatGPT skill. Read memory.md, docs/requirements/requirement.md, the confirmed backlog and relevant docs/standards checks before changing code.

## Authorization and delivery

- The user authorizes autonomous implementation and merging **only in NamNguyenDang/Light-em-up**. Do not ask for per-PR merge permission here after required checks pass. This authorization does not extend to any other repository or override platform permissions, credential boundaries or explicit later instructions.
- Keep one implementation FR (Feature Request) or DR (Defect Report) per PR against the actual default branch, currently main. The user may call it master; verify the repository instead of inventing/renaming a branch.
- Preserve separate feature history. Use merge commits, not a combined squash of multiple FRs. Verify that dependencies really reached main before building on them.
- The user will randomly inspect the latest default branch and submit DRs. Treat those reports as actionable defects; reproduce and investigate without waiting for additional merge permission. Their checks supplement our verification, never replace it.
- Continue authorized backlog work autonomously. Do not end each FR by asking whether to continue. If information or external access is genuinely missing, complete independent work and report the concrete blocker without inventing configuration or weakening safeguards.

## Way of working (WoW) — request to deployment

Apply this lifecycle to every new FR/DR. The detailed requirement-first checks below remain mandatory.

**New request → [analyze ↔ discuss] → finalize → implement → analyze test coverage → run tests → verify requirements and results → deploy → verify deployed output.**

1. **New request:** record the requested outcome, scope and relevant FR/DR. Read memory before proposing a solution.
2. **Analyze ↔ discuss:** cross-check the main [golden requirements](../docs/requirements/requirement.md), existing behavior and applicable standards. Explain assumptions, alternatives, constraints and effects in plain language before implementation. Repeat analysis/discussion when a material question or conflict remains. Proceed on settled decisions without requesting redundant permission; a user request to clarify first pauses implementation until the approach is finalized.
3. **Finalize:** capture the agreed behavior, boundaries, failure states and observable acceptance criteria in the golden requirements and linked cases. Mark deferred work explicitly. Finalization is agreement on behavior, not another merge-approval gate.
4. **Implement:** build only the finalized scope and retain the agreed architecture, privacy and accessibility constraints. Material discoveries that change the expected behavior return to analysis/discussion and finalization.
5. **Analyze test coverage:** compare the actual diff with every affected acceptance criterion. Add missing scenarios for new/changed behavior, adverse states, boundaries, persistence and account isolation as applicable; retain unaffected regressions. Documentation-only changes use content/link/process review rather than invented runtime tests.
6. **Run tests:** execute applicable new and regression tests on the exact candidate commit. Record the environment, results and evidence; distinguish fixtures from actual local/live behavior. Failures return to implementation and coverage analysis.
7. **Verify:** compare observable results with both the test-case expectations and the main requirements, plus applicable WCAG 2.2 AA/architecture/UX checks. Passing tests alone do not prove complete coverage. Missing required cases or FAIL/BLOCKED/NOT RUN results leave the affected acceptance open; do not weaken requirements to make tests pass. Complete this review before opening the PR.
8. **Deploy:** merge passing work through its separate FR/DR PR, then use the authorized existing deployment mechanism where available. Record merge, deployment and acceptance separately. Verify the served revision and relevant smoke journey after deployment; a merge or green CI is not proof that the live site changed. If deployment access/configuration is absent, report deployment BLOCKED/NOT RUN without fabricating success or activating paid/cloud services. Browser-local delivery remains the current scope.

For this workflow change, review against [FR-33-AC1](../docs/requirements/requirement.md#fr-33--request-to-deployment-workflow) and [TC-FR-33-01](../docs/requirements/test-cases.md#tc-fr-33-01).

## Mandatory requirement-first cycle (FR-30)

Apply this cycle to every new/changed FR and DR, including follow-up fixes:

1. **Read memory first:** consult [memory.md](memory.md) for known mistakes/decisions. Note relevant prevention steps in the work/PR; do not merely list the file as read.
2. **Read/update the golden contract:** [docs/requirements/requirement.md](../docs/requirements/requirement.md) defines expected behavior. Add or revise stable acceptance IDs for the authorized change before implementation/closure. The backlog records status, not alternate expectations. Do not rewrite a requirement to excuse a defect or silently downgrade a failing case to N/A.
3. **Define the test scenario:** update [test-cases.md](../docs/requirements/test-cases.md) and [traceability.json](../docs/requirements/traceability.json). State preconditions, actions, observable expected results, failure/retry/boundary/ownership variants and required environment. Existing code is not the oracle for expected behavior. Include the reproduced DR and unaffected regressions.
4. **Review standards:** check relevant WCAG 2.2 AA criteria, BFF/BaaS boundaries and website/SaaS UX guidance in [standards](../docs/standards/README.md). Record applicability, evidence and justified gaps; do not invent ISO/WCAG/performance certification or add a BFF just to tick a box.
5. **Implement and compare:** run tests against the golden expected results and inspect actual UI/data/focus/output. `python3 scripts/check-requirements.py` checks links only; it never proves behavioral correctness. Resolve discrepancies or track them as defects rather than weakening the assertion.
6. **Record acceptance:** for each changed acceptance ID, report its test case, actual result, exact commit/run, environment/origin, evidence scope and PASS/FAIL/BLOCKED/NOT RUN. Name missing manual/live/negative/boundary evidence. A required failed/blocked/not-run case leaves acceptance open even if an independently useful code PR merges.
7. **Carry the lesson forward:** update memory/lessons when a new mistake, cause or durable decision appears. Link the affected requirement, test and FR/DR. Avoid copying personal data, credentials or redundant historical detail.

Before PR opening, inspect the requirement-to-test comparison, memory prevention steps and standards findings alongside exact-head checks. Missing golden/test mappings fail the structural CI gate. Merge permission remains autonomous and repo-scoped; acceptance evidence is not replaced by the user's future spot checks.

## DR intake and closure

1. Record the user's observed behavior, expected result, affected commit/deployed URL if known, environment, reproduction steps, severity and related FR. Preserve the user's report separately from verified diagnosis.
2. Verify the served/default-branch output. Distinguish a source bug, missing feature, deployment/configuration problem and stale deployment. Do not infer backend failure from missing client configuration alone.
3. Add a regression for the reproduced failure before or alongside the fix. Include adverse states, retry, persistence and cross-account isolation when relevant. Never disable a failing scenario just to make CI green.
4. Fix and verify the intended end-to-end behavior, cross-check relevant WCAG criteria and then open a separate PR with exact-head evidence. Merge without another permission request when checks pass and scope is authorized.
5. Close the DR only with acceptance evidence; a tracking document, merged code, mock response or skipped smoke test is not closure. Update memory.md and docs/lessons with cause, correction and prevention, without duplicating secrets or real user data.

## Pre-PR checks

- Inspect the diff, target repository/base and remote source tree. Check every mutation result before depending on it. If a merge/ref update is rejected, reread current heads and investigate; do not blindly retry or assume success.
- Run checks on the exact published head before opening the PR. Use the existing push-triggered workflow; record its URL/SHA and outcome. All changed behavior needs appropriate regression coverage; docs-only changes need link/content/evidence review and existing output cross-checks, not invented tests mirroring prose.
- Review actual output: keyboard/focus, names/labels/errors, status/busy/disabled states, responsive layouts and relevant screenshots/axe results. Use WCAG 2.2 AA as the target and the docs/standards matrix for applicability. Retain explicit manual AT (Assistive Technology), real zoom/text resize and provider-test gaps. Zero automated violations is not full WCAG conformance.
- Keep native dialog/details/button semantics where possible. Test initial/error/close/return focus, Escape/cancel and draft preservation. Side-effecting script modules must bootstrap once.
- A PR description must state concrete behavior, why it changed, tests/evidence and material limits. Report actual implementation, deployment and user acceptance as separate statuses.

## Current local scope and deferred online acceptance

The user chose browser-local operation. Do not activate cloud services or billing. Keep backend integration explicitly deferred. FR-29 online acceptance stays open/deferred; it is not a blocker to an independently verified local-only change and must not be reported as fixed.

## Online release gate and FR-29

- Account/candle usability is blocked until actual configuration, registration and the deployed-origin journey work. SDK HTTP fixtures and PostgreSQL claim fixtures are valuable implementation tests; label them as fixtures.
- Required release scenario: register -> confirm email if enabled -> sign in -> create/light/save a candle -> refresh -> sign out/in -> verify persisted ownership and lit state. Live tests must target the served commit/configuration with network mocking disabled.
- Missing public configuration, absent registration, unavailable required test access or skipped live scenarios mean BLOCKED/NOT RUN, never PASS or release-ready. Do not substitute the browser demo for real online acceptance.
- Keep authentication secrets/service-role keys and test passwords out of source, logs and PR text. Do not invent project URLs/keys, bypass email confirmation, weaken RLS or re-suggest the declined Supabase plugin.

## Architecture and UX

- Current design: direct Supabase BaaS (Backend as a Service), browser adapters, PostgreSQL RLS (Row Level Security) and RPCs (Remote Procedure Calls). It does not deploy a separate BFF (Backend for Frontend) server. Do not describe browser JavaScript as a trusted server boundary.
- Evaluate BFF deliberately for multiple service aggregation, private server credentials or separately evolving clients; document value/cost and security boundaries first. Keep ownership enforced server-side even if a BFF is added.
- Prefer the chosen low-cost implementation. No paid service, live backend provisioning or public rollout is implied by merge authorization.
- Website/SaaS UX has several references, not one universal screen-layout certification: WCAG accessibility, human-centred usability guidance, APG interaction patterns and measured performance. Never claim ISO conformance or achieved performance without evidence.
- Preserve approved visual decisions and distinguish online/account data from local demo data. Keep reports honest about project-owner review and the absence of automatic/staffed moderation.

## UX portfolio evidence

Keep UX material under ux/. Distinguish owner/stakeholder feedback, implementation/automated checks, proposed research and measured participant evidence. Link decisions to source and golden requirements. Preserve the user's local-only delivery scope and label deferred online concepts. Do not invent personas as research, quotes, participants, scores, uplift or causal social/employment outcomes. State actual contribution and relevant AI assistance accurately; screenshots need provenance and are not usability results. Never put identifying/sensitive research records in the public repository. Read the evidence register and portfolio checklist before changing public case-study claims.

## Continuity

Read agent/memory.md at task start. Update it when a decision or defect changes future practice; keep facts concise and dated. Refer to the audit/backlog for detail. Never turn repository-local notes into claims of global assistant memory or broaden merge authorization beyond this repository.
