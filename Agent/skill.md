# Light-em-up development workflow — FR-28

Repository-local instructions for agents working on NamNguyenDang/Light-em-up. This is a checked-in workflow guide, not an installed global ChatGPT skill. Read memory.md, the confirmed backlog and relevant leason_learn checks before changing code.

## Authorization and delivery

- The user authorizes autonomous implementation and merging **only in NamNguyenDang/Light-em-up**. Do not ask for per-PR merge permission here after required checks pass. This authorization does not extend to any other repository or override platform permissions, credential boundaries or explicit later instructions.
- Keep one implementation FR (Feature Request) or DR (Defect Report) per PR against the actual default branch, currently main. The user may call it master; verify the repository instead of inventing/renaming a branch.
- Preserve separate feature history. Use merge commits, not a combined squash of multiple FRs. Verify that dependencies really reached main before building on them.
- The user will randomly inspect the latest default branch and submit DRs. Treat those reports as actionable defects; reproduce and investigate without waiting for additional merge permission. Their checks supplement our verification, never replace it.
- Continue authorized backlog work autonomously. Do not end each FR by asking whether to continue. If information or external access is genuinely missing, complete independent work and report the concrete blocker without inventing configuration or weakening safeguards.

## DR intake and closure

1. Record the user's observed behavior, expected result, affected commit/deployed URL if known, environment, reproduction steps, severity and related FR. Preserve the user's report separately from verified diagnosis.
2. Verify the served/default-branch output. Distinguish a source bug, missing feature, deployment/configuration problem and stale deployment. Do not infer backend failure from missing client configuration alone.
3. Add a regression for the reproduced failure before or alongside the fix. Include adverse states, retry, persistence and cross-account isolation when relevant. Never disable a failing scenario just to make CI green.
4. Fix and verify the intended end-to-end behavior, cross-check relevant WCAG criteria and then open a separate PR with exact-head evidence. Merge without another permission request when checks pass and scope is authorized.
5. Close the DR only with acceptance evidence; a tracking document, merged code, mock response or skipped smoke test is not closure. Update memory.md and leason_learn with cause, correction and prevention, without duplicating secrets or real user data.

## Pre-PR checks

- Inspect the diff, target repository/base and remote source tree. Check every mutation result before depending on it. If a merge/ref update is rejected, reread current heads and investigate; do not blindly retry or assume success.
- Run checks on the exact published head before opening the PR. Use the existing push-triggered workflow; record its URL/SHA and outcome. All changed behavior needs appropriate regression coverage; docs-only changes need link/content/evidence review and existing output cross-checks, not invented tests mirroring prose.
- Review actual output: keyboard/focus, names/labels/errors, status/busy/disabled states, responsive layouts and relevant screenshots/axe results. Use WCAG 2.2 AA as the target and the leason_learn matrix for applicability. Retain explicit manual AT (Assistive Technology), real zoom/text resize and provider-test gaps. Zero automated violations is not full WCAG conformance.
- Keep native dialog/details/button semantics where possible. Test initial/error/close/return focus, Escape/cancel and draft preservation. Side-effecting script modules must bootstrap once.
- A PR description must state concrete behavior, why it changed, tests/evidence and material limits. Report actual implementation, deployment and user acceptance as separate statuses.

## Release gate and FR-29

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

## Continuity

Read Agent/memory.md at task start. Update it when a decision or defect changes future practice; keep facts concise and dated. Refer to the audit/backlog for detail. Never turn repository-local notes into claims of global assistant memory or broaden merge authorization beyond this repository.
