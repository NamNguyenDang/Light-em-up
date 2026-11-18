# Test cases and expected behavior

Each case references the golden acceptance criterion. Preconditions and scope matter: a fixture run cannot satisfy a case requiring a real service. The automated paths in traceability.json identify existing evidence to inspect, not proof of complete scenario coverage. Missing adverse/boundary/manual/live coverage remains open. Record exact commit, environment/origin, test command/run, actual outcome and PASS/FAIL/BLOCKED/NOT RUN for execution; this catalogue contains no invented results.

For browser scenarios, use synthetic identities/data and the specified mode; ordinary error attempts must not produce a success, duplicate write or cross-account disclosure. Follow the relevant standards checks in docs/standards.

### TC-FR-01-01

Covers: FR-01-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Open each available dialog, inspect its name, keyboard order and close action.
- Expected: Every dialog has a unique visible heading as its accessible name; opening and closing preserve a usable keyboard continuation.
- Evidence boundary: browser-fixture; manual AT pending.
- Execution references: `tests/static/dialog_accessibility_test.py`, `tests/browser/accessibility.test.mjs`.

### TC-FR-02-01

Covers: FR-02-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Hover/focus a province, cross to its detail, then press Escape.
- Expected: Hover or focus reveals a named province detail; it persists while crossing into the detail and Escape dismisses it without losing selection.
- Evidence boundary: browser-fixture; manual AT/touch pending.
- Execution references: `tests/unit/runtime.test.mjs`, `tests/browser/accessibility.test.mjs`.

### TC-FR-03-01

Covers: FR-03-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Submit missing nickname, then an unknown city, then valid values; check that invalid attempts do not save.
- Expected: Empty nickname or unknown city prevents save, shows associated actionable text, marks the invalid field and focuses the first error; corrected valid input can save.
- Evidence boundary: browser-fixture; manual announcements pending.
- Execution references: `tests/unit/runtime.test.mjs`, `tests/browser/accessibility.test.mjs`.

### TC-FR-04-01

Covers: FR-04-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Inspect focus/selection at levels 0–6 and forced colors; compare the text alternative.
- Expected: Province boundaries, keyboard focus and selected states remain distinguishable across light levels and forced colors; brightness is not the only information source.
- Evidence boundary: source/browser checks; manual visual review pending.
- Execution references: `tests/static/dialog_accessibility_test.py`, `tests/browser/accessibility.test.mjs`.

### TC-FR-05-01

Covers: FR-05-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Exercise 320/375/768/1280 widths, text spacing, real 200% text resize and 400% zoom.
- Expected: At narrow widths and enlarged/custom-spaced text, essential controls/content remain available without required horizontal page scrolling or clipping.
- Evidence boundary: browser approximation; real zoom/text resize pending.
- Execution references: `tests/static/layout_test.py`, `tests/browser/accessibility.test.mjs`.

### TC-FR-06-01

Covers: FR-06-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Measure visible controls at supported widths and select a province through the dropdown.
- Expected: Controls meet the applicable WCAG 24 CSS-pixel minimum or a documented valid equivalent/exception; aim for 44 pixels. Province dropdown offers equivalent selection.
- Evidence boundary: browser-fixture; manual touch pending.
- Execution references: `tests/browser/accessibility.test.mjs`.

### TC-FR-07-01

Covers: FR-07-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Open Read map data; inspect all provinces and compare counts with controlled data.
- Expected: All 25 provinces expose story/lit/resting information and represented municipal eligible counts/levels without hover or interpreting light intensity.
- Evidence boundary: unit/browser-fixture; manual AT pending.
- Execution references: `tests/unit/runtime.test.mjs`, `tests/browser/accessibility.test.mjs`.

### TC-FR-08-01

Covers: FR-08-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Filter, page, save and delete; inspect focus and the result status after each action.
- Expected: Filtering/redraws retain a meaningful focus target; pagination moves to results heading; save/delete returns to a visible continuation and results are announced.
- Evidence boundary: browser-fixture; manual announcement review pending.
- Execution references: `tests/unit/runtime.test.mjs`, `tests/browser/accessibility.test.mjs`.

### TC-FR-09-01

Covers: FR-09-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Run the complete workflow, inspect outputs and record actual environments/outcomes.
- Expected: Repeatable automated scans accompany keyboard/focus/reflow checks; manual AT/real zoom gaps and exact tested commit are reported rather than hidden.
- Evidence boundary: CI evidence plus manual completion required.
- Execution references: `tests/browser/accessibility.test.mjs`.

### TC-FR-10-01

Covers: FR-10-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Inspect desktop/narrow/enlarged output; confirm no sun icon/banner/help block and no forced clipped headline.
- Expected: Use candle artwork, the preferred bold italic serif hero on one line when desktop space permits, readable wrapping when narrow/enlarged, no demo-count banner or long map-help paragraph, and the approved invitation/CTA in online visitor mode.
- Evidence boundary: browser-fixture; manual visual review pending.
- Execution references: `tests/browser/accessibility.test.mjs`.

### TC-FR-11-01

Covers: FR-11-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Exercise navigation/editor/session transitions, including delayed close/save callbacks.
- Expected: Navigation, authentication and story states are independent; a local profile cannot authenticate a user and modal transitions cannot silently reset browsing context.
- Evidence boundary: unit/browser-fixture.
- Execution references: `tests/unit/application-state.test.mjs`, `tests/unit/runtime.test.mjs`.

### TC-FR-12-01

Covers: FR-12-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Seed cached identity, delay/reject verification, retry and expire a session.
- Expected: Restore only a server-verified identity; expose checking, visitor and retryable failure states, and reject stale/invalid/expired results.
- Evidence boundary: SDK HTTP fixture; real provider NOT RUN.
- Execution references: `tests/unit/session.test.mjs`, `tests/browser/session.test.mjs`.

### TC-FR-13-01

Covers: FR-13-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Try invalid/unconfirmed credentials, success, cancellation, unsafe return URL and provider rejection.
- Expected: Existing accounts can sign in with accessible email/password inputs and optional configured Google; cancellation clears password and returns safely; only allowlisted same-site return targets are honored.
- Evidence boundary: SDK HTTP fixture; live provider NOT RUN.
- Execution references: `tests/unit/signin.test.mjs`, `tests/browser/signin.test.mjs`.

### TC-FR-14-01

Covers: FR-14-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Activate during checking, signed out and signed in; cancel/return/reload; test the labelled unconfigured fallback separately.
- Expected: Configured online Add your candle waits for verification, sends visitors through sign-in and consumes the editor-return intent once while retaining public browsing context. Explicit offline fallback never authenticates a visitor.
- Evidence boundary: unit/browser-fixture; live account flow NOT RUN.
- Execution references: `tests/unit/candle-entry.test.mjs`, `tests/browser/signin.test.mjs`.

### TC-FR-15-01

Covers: FR-15-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Create/edit, submit invalid values, delay/reject saving, duplicate submit, cancel/accept discard and retry.
- Expected: New/existing stories have empty/prefilled fields, validation, saving feedback and duplicate-write guards. Discard cancellation keeps edits; failed writes keep the draft and prior saved story.
- Evidence boundary: unit/browser-fixture; real server save NOT RUN.
- Execution references: `tests/unit/runtime.test.mjs`, `tests/browser/accessibility.test.mjs`.

### TC-FR-16-01

Covers: FR-16-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Use a different local profile, load account data, filter elsewhere, edit/save and verify the local record was not adopted.
- Expected: Load the verified account own story independently of public filters; wait/retry on load failure, keep local demo separate and update personal card/map after an accepted save.
- Evidence boundary: SDK HTTP fixture; live ownership/persistence NOT RUN.
- Execution references: `tests/browser/account.test.mjs`.

### TC-FR-17-01

Covers: FR-17-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Fail/expire a save, reload/reauthenticate, change account, exceed retention and retry/discard.
- Expected: Keep bounded tab-scoped drafts tied to the same account for up to 30 minutes; recover after save/session failure, ignore stale completions, and clear on success or explicit discard.
- Evidence boundary: unit/SDK fixture; live reauthentication NOT RUN.
- Execution references: `tests/unit/draft.test.mjs`, `tests/browser/account.test.mjs`.

### TC-FR-18-01

Covers: FR-18-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Sign out with saved/dirty data, inspect private cleanup and compare the server story; reject a sign-out attempt.
- Expected: End the current browser session, clear private browser/form/draft data, return to the public view and leave the published server story unchanged. Failure must offer retry without false success.
- Evidence boundary: SDK fixture coverage; real provider and failure branches require evidence.
- Execution references: `tests/browser/account.test.mjs`.

### TC-FR-19-01

Covers: FR-19-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Run anonymous/owner/other-account role tests, spoof/transfer attempts and hide/delete/public checks.
- Expected: The database enforces owner-only private story access/writes, valid catalog/length values and one story per account; public reads expose only published fields without account IDs.
- Evidence boundary: PostgreSQL claim fixture; deployed JWT integration NOT RUN.
- Execution references: `backend/supabase/tests/stories.sql`.

### TC-FR-20-01

Covers: FR-20-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Use the regression matrix and compare each journey with actual outputs and environments.
- Expected: Regression coverage spans positive and adverse auth/story paths and separates fixture results from real deployment and manual accessibility acceptance.
- Evidence boundary: fixture matrix; required live/manual checks still open.
- Execution references: `tests/browser/account.test.mjs`, `tests/browser/signin.test.mjs`.

### TC-FR-21-01

Covers: FR-21-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Open with keyboard, Tab through actions, dismiss inside with Escape and navigate to story/inbox/sign-out.
- Expected: A verified display name or honest account fallback replaces Log in and exposes My story, Encouragement and Sign out through normal keyboard disclosure behavior with meaningful focus.
- Evidence boundary: browser-fixture; manual AT pending.
- Execution references: `tests/browser/account.test.mjs`.

### TC-FR-22-01

Covers: FR-22-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Compare new/existing accounts and visitor after sign-out, including keyboard/accessibility-tree visibility.
- Expected: An online account with a story sees one edit action instead of invitation/Add controls; new accounts retain entry; sign-out restores visitor presentation.
- Evidence boundary: browser-fixture; live service NOT RUN.
- Execution references: `tests/browser/account.test.mjs`.

### TC-FR-23-01

Covers: FR-23-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Send, fail/retry, repeat/reload, attempt self/spoof/hidden target and switch account during a request.
- Expected: Verified users can send once per real story with pending/retry/sent feedback. Database rules prevent self, spoofed, hidden-target and duplicate sends; samples remain labelled demos.
- Evidence boundary: SDK/SQL fixtures; additional adverse branches/live checks pending.
- Execution references: `tests/browser/account.test.mjs`, `backend/supabase/tests/encouragement.sql`.

### TC-FR-24-01

Covers: FR-24-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Open/refresh/page/read the inbox as recipient, sender and visitor; fail a request and switch accounts.
- Expected: Only the recipient can list newest events with sender/time, total/unread counts and paging or mark an opened event read; errors are retryable and account changes clear private events.
- Evidence boundary: SDK/SQL fixtures; paging/error/live acceptance still required.
- Execution references: `tests/browser/account.test.mjs`, `backend/supabase/tests/inbox.sql`.

### TC-FR-25-01

Covers: FR-25-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Send empty/text/boundary/over-limit input, reject/retry, cancel/keep/discard and display script-like text safely.
- Expected: Send an empty candle or optional text up to 600 characters; failure retains text, duplicate sends do not overwrite an old message, and recipient content renders as plain text with read state.
- Evidence boundary: SDK/SQL fixtures; boundary/live/manual checks require explicit evidence.
- Execution references: `tests/browser/account.test.mjs`, `backend/supabase/tests/inbox.sql`.

### TC-FR-26-01

Covers: FR-26-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Report failure/retry/repeat; cancel/confirm block; attempt nonrecipient/anonymous actions and a blocked send.
- Expected: Only a recipient can report an event with a reason or confirm a sender block. Reports deduplicate; failures retry; blocked events disappear and future sends are denied. Do not promise staffed/immediate moderation.
- Evidence boundary: SDK/SQL fixtures; live moderation/provider behavior NOT RUN.
- Execution references: `tests/browser/account.test.mjs`, `backend/supabase/tests/safety.sql`.

### TC-FR-27-01

Covers: FR-27-AC1

- Preconditions: Repository golden requirements, memory, workflow and standards records are available.
- Actions/variants: Review all audit records, source links and status limitations; verify the 55-criterion index.
- Expected: Keep delivery lessons and a separate text record per audited criterion/topic; distinguish WCAG evidence/review/N/A, actual BaaS versus BFF, UX guidance and open findings without false certification.
- Evidence boundary: documentation validation and human standards review.
- Execution references: `scripts/check-requirements.py`.

### TC-FR-28-01

Covers: FR-28-AC1

- Preconditions: Repository golden requirements, memory, workflow and standards records are available.
- Actions/variants: Read AGENTS/memory/skill and verify repository scope, defect handling and release/merge distinction.
- Expected: Root instructions discover memory/workflow; merge authorization is only Light-em-up, each FR/DR has its own verified PR, and random user DR checks do not replace regression or live acceptance.
- Evidence boundary: documentation validation and PR process review.
- Execution references: `scripts/check-requirements.py`.

### TC-FR-29-01

Covers: FR-29-AC1

- Preconditions: Relevant UI/data available in its stated mode; controlled fixtures for automated branches, and an owned deployed service for live acceptance.
- Actions/variants: Run FR29-01 through FR29-09 on the actual served origin with no network mocking; run fixture error paths and preflight separately.
- Expected: Real registration/confirmation, sign-in and create/light/save/reload/sign-out/in must preserve account ownership and candle state. Missing configuration or skipped real checks block release; local fallback stays explicitly local.
- Evidence boundary: fixture-tested code; live acceptance BLOCKED; see FR-29 spec.
- Execution references: `tests/unit/signin.test.mjs`, `tests/browser/signin.test.mjs`, `tests/unit/release-preflight.test.mjs`, `tests/browser/account.test.mjs`.

### TC-FR-30-01

Covers: FR-30-AC1

- Preconditions: Repository golden requirements, memory, workflow and standards records are available.
- Actions/variants: Validate traceability, inspect a changed FR against test expectations and review memory/standards evidence before PR.
- Expected: Every FR/DR change links golden acceptance IDs to test scenarios and applicable standards, reads memory, checks actual outputs, records evidence/gaps and never weakens expectations to hide a defect.
- Evidence boundary: structural validation plus human behavioral/evidence review.
- Execution references: `scripts/check-requirements.py`.

### TC-MAP-01

Covers: MAP-AC1

- Preconditions: controlled visible stories assigned to known cities/kommun and provinces.
- Actions: evaluate eligible counts 0, 1, 10, 11, 50, 51, 100, 101, 200, 201, 500 and 501; then mix two kommun in one province and remove eligibility/visibility.
- Expected: levels 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5 and 6 respectively. Malmö 55 maps to 3; Stockholm 600 maps to 6. Province uses the maximum kommun level, never a summed-count level. Zero removes land glow; surviving lit stories retain their appropriate city dot. Text alternative agrees with the same data.
- Execution references: tests/unit/light-level.test.mjs, tests/unit/province.test.mjs, tests/unit/runtime.test.mjs and scripts/browser-accessibility-test.mjs. Fixtures are not evidence of real community employment totals.

### TC-MAP-02

Covers: MAP-AC2

- Preconditions: an editable story at a known city with independently chosen status/lit/visibility.
- Actions: save without Found work, toggle lit/resting, change city, hide, reload and edit; inspect labelled sample cards/totals.
- Expected: toggling the candle does not change employment status; changing city moves only that story; hiding excludes its public count/map contribution but keeps its personal editor. Browser/online persistence follows the chosen mode. Sample content stays labelled and no verified-employment claim is introduced.
- Execution references: tests/unit/runtime.test.mjs and scripts/account-browser-test.mjs. Real online persistence is NOT RUN while FR-29 is blocked.

### TC-FR-31-01

Covers: FR-31-AC1

- Preconditions: same data/configuration and root entry URLs as before the migration; online integration remains empty/deferred.
- Actions: follow documentation links, load both HTML pages/assets, run every unit/static/browser/SQL check, create/edit/save a local candle, exercise fixture-only account paths and inspect migrated screenshot/axe output.
- Expected: no broken file/import/asset links or changed behavior; golden/test mappings resolve; earlier design versions remain available; frontend/backend execution boundaries and UX workspace are obvious. No real backend, new BFF, paid service or completed research is fabricated.
- Execution references: scripts/check-requirements.py, tests/static/verify.test.mjs, tests/browser/accessibility.test.mjs, tests/browser/signin.test.mjs and tests/browser/account.test.mjs; manual navigation review complements the structural tests.

### TC-FR-32-01

Covers: FR-32-AC1

- Preconditions: actual project decisions/PRs and synthetic browser evidence are available; no representative participant study or measured product outcome exists.
- Actions: navigate from root to the UX case study, assumptions, plan, journeys, decisions, evaluation and evidence; inspect provenance/claim labels; compare the narrative with golden requirements, lessons and actual local output.
- Expected: a reviewer can trace the problem, constraints, alternatives, decisions and validation gaps without mistaking planned research for findings, fixture screenshots for user acceptance, local use for a real community launch, or AI-assisted work for unsupported individual claims. Session/results templates remain NOT RUN/unmeasured until genuine evidence is added. Internal links and references resolve.
- Execution references: scripts/check-paths.py and scripts/check-requirements.py; human evidence/claim review is mandatory and is not proven by the structural gate. Existing browser/axe regressions verify no application behavior was changed.

### TC-FR-33-01

Covers: FR-33-AC1

- Preconditions: a new request or DR, golden requirements, memory and standards guidance are available.
- Actions: review the workflow using a request needing clarification, an agreed request, a material scope change, missing test coverage, a failing test and absent deployment access. Follow all requirement/memory links.
- Expected: clarification loops before implementation; settled scope is finalized without redundant merge permission; new changes trigger test-gap analysis; failures return to correction; requirement and expected-result verification occurs before PR opening. Missing required evidence leaves acceptance open. Deployment is verified separately from merge and remains BLOCKED/NOT RUN if unavailable. No runtime/auth change is claimed by this documentation delivery.
- Execution references: scripts/check-paths.py and scripts/check-requirements.py; human scenario/content review is required because structural checks do not prove future workflow adherence.
