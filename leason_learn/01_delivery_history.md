# Delivery history and lessons

## What changed

| Work | Result | Lesson and concrete evidence |
|---|---|---|
| Initial demo and map | Local profile, city/province exploration, personal story card, six kommun light levels, 100 labelled samples. | Agree the visual and counting contract first. Found work plus lit candle determines glow; a candle alone does not imply employment. PRs #1–2 and scripts/light-level-test.mjs. |
| FR-01–04 | Named dialogs, persistent keyboard/hover province details, field-associated validation and contrasting map states. | A visual state needs a semantic equivalent. Dialog title, focus and visible error must agree. PR #3; dialog-accessibility-test.py. |
| FR-05–10 | Reflow, target sizes, text map, focus preservation, browser automation and compact typography/candle artwork. | Test actual enlarged/narrow output. A design preview is not the shipped page. PRs #4–9. |
| Branch correction | FR-06–10 had reached predecessor branches rather than main; integration PR #10 corrected that. | Always verify the target is main and inspect the main result, not just a merged badge on a feature PR. Preserve individual feature commits. |
| FR-11–15 | Independent UI/auth/story state, verified session restoration, sign-in, safe Add-candle return, editor guards. | Browser-local data is not authentication. Verify getUser; allowlist return destinations; consume an action intent once. PRs #11–15. |
| FR-16–19 | Account-scoped own story, private draft recovery, sign-out cleanup, installable RLS schema and public projection. | Authorization belongs in the database. A browser owner filter helps the UI but cannot prevent a malicious write. PRs #16–19 and supabase/tests/stories.sql. |
| FR-20–22 | Complete flow regressions, nickname disclosure and adaptive invitation. | Validate combined journeys and visible focus. Use native disclosure behavior; remove redundant actions after save. PRs #20–22. |
| FR-23–26 | Deduplicated encouragement, recipient inbox/read state, private messages and report/block enforcement. | Pair optimistic interaction with server invariants, retry and honest feedback. Never call a local demo report a moderation submission. PRs #23–26. |
| FR-27 | This evidence-led standards/architecture/UX audit. | Record what is tested, not just what was intended. Unverified criteria remain open. |

## Corrections that should not be repeated

- The first FR-14 browser return placed focus on the native dialog's Close button. Explicit initial nickname focus fixed it; a guard prevents repeated opening from resetting an active editor.
- A FR-25 visibility assertion clicked the received-event disclosure twice, closing it before reading the text. The test was corrected; no evidence was waived and the complete suite reran.
- The final source audit found encouragement-ui.js included twice. FR-26 removes the duplicate and asserts unique external script sources on both pages. Side-effecting bootstraps should run once.
- A transient PR #25 merge response said the base was modified. The current main and PR head were inspected before retry. FR-26 was then explicitly integrated with the verified FR-25 main before its checks. Never continue with an assumed dependency merge.
- The account editor/list/privacy text still implied browser-only storage. FR-26 corrects the online-versus-local wording and tests it. State-aware copy is part of trustworthy UX.
- GitHub API source commits and local worktree commits have different SHAs. Publish exact trees, track the remote head and run checks on that head; never infer that a local test covers an uninspected remote tree.

## Working rules retained

One PR per FR against main, merge commits rather than squashing the series, and pre-PR WCAG cross-checks. Autonomous merge permission applies only to Light-em-up. Supabase was not provisioned; migrations and a public URL/key/redirect setup remain a deployment task. Tests use the real SDK with isolated HTTP fixtures and PostgreSQL with a test auth.uid function, never live accounts or real personal data.

The code intentionally keeps a low-cost direct BaaS architecture. See the BFF audit before introducing an extra service. A new server layer needs a specific benefit, not a pattern label.
