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

### TC-FR-34-01

Covers: FR-34-AC1, FR-34-AC2, FR-34-AC3, FR-34-AC4

- Preconditions: actual root HTML served on localhost/HTTPS, fresh browser IndexedDB and sessionStorage, no configured online provider, synthetic nicknames/passwords only. No network routes/mock auth for the active journey.
- Actions: browse signed out and try each editor entry; register with valid/boundary/invalid nickname and password; retry duplicates with case/space/Unicode-equivalent names and concurrent tabs; inspect persisted field schema; save/light, reload, logout and login/edit. Create another account, attempt wrong-owner reads/writes, verify distinct IDs/candles and hidden stories. Inject expired/malformed sessions and storage failures; retry without losing input. Inspect keyboard/cancel/return focus, password paste/managers/show-hide, error association/status, 320–1280px reflow/targets, screenshots and axe.
- Expected: no anonymous creation or email collection/network auth; valid accounts persist, duplicate nickname has one winner, generic wrong-credential errors; PBKDF2 salts/verifiers and independent random expiring sessions contain no plaintext password. Each save updates one owner candle; foreign access fails, hidden stories stay private, drafts survive failed saves and private state clears on logout. Clearing browser data removes accounts; UI explains local scope/recovery/person-count limits. Automated evidence is not a complete manual assistive-technology audit or live deployment proof.
- Execution references: tests/browser/local-accounts.test.mjs, tests/browser/accessibility.test.mjs, tests/browser/signin.test.mjs, scripts/check-requirements.py. Required active checks must pass without provider fixtures; retain explicitly labelled deferred online regressions separately.

### TC-FR-35-01

Covers: FR-35-AC1, FR-35-AC2, FR-35-AC3

- Preconditions: latest main behavior is the baseline; user reports account creation then unexplained failed login using a 13-character password. Exact user browser/origin/stored account is unavailable. Use fresh served local HTML, real IndexedDB/Web Crypto and synthetic test data; never copy the supplied password to source, logs or memory.
- Actions: submit 7-character registration, empty fields, symbols/spaces and 129 characters; inspect visible alert, field descriptions/focus and unchanged account/session count. Correct to 8, register/logout/login; repeat at 13 and 128, with duplicates, wrong/unknown credentials and retry. Verify backend rejects invalid registration too; seed a labelled previous-policy account and verify its original password still signs in. Inject storage failure and retry. Scan 320px error UI with axe.
- Expected: explicit operation-failed explanation and actionable correction, no false success or invalid account, 8/13/128 accepted, 7/129/symbol/space rejected for new registrations; no silent password transformation, no crash, no loss of retry input. Legacy login remains supported. Golden policy/help/API/tests agree. Source diagnosis and real observed acceptance are distinguished.
- Execution references: tests/browser/auth-feedback.test.mjs, tests/browser/local-accounts.test.mjs, scripts/check-requirements.py; actual manual screen-reader/public deployment outcomes are not inferred from automation.

### TC-FR-36-01

Covers: FR-36-AC1, FR-36-AC2, FR-36-AC3, FR-36-AC4

- Preconditions: actual main root HTML served on localhost; user confirmed local-server use but exact URL/browser/stored state is unavailable. Synthetic accounts; no mocked auth for the principal journey. USER default and explicit USERDEBUG flag available.
- Actions: register/logout/login, follow queued Add your candle return, reopen and save/reload owned editor, verify header/model/session/ownership align. Inject a failing subscriber/one-shot story render and non-persisting sessionStorage separately; verify retry, no false login and no orphan registration. Apply verified snapshots from intermediate model states while preserving normal guards; invalidate session and verify no editing. Enable USERDEBUG on a visitor, across sign-in and on an owner, refresh its snapshot, inspect panel/history/console for allowed states and forbidden data, then switch to USER. Inspect keyboard focus, 320px layout and axe.
- Expected: verified nickname and editor readiness are consistent; no login loop, duplicate candle or anonymous bypass. Render/logging faults do not revoke real identity, remaining subscribers recover, and storage failure is explicit. USER logs nothing diagnostic; USERDEBUG gives bounded redacted states and no private values. Mode toggle cannot grant auth and does not clear a valid login. Unknown user-specific causes are not invented; failing required cases keep acceptance open.
- Execution references: tests/browser/session-state.test.mjs, tests/unit/application-state.test.mjs, tests/browser/local-accounts.test.mjs, scripts/check-requirements.py. Manual AT/public deployment remain NOT RUN unless independently verified.

### TC-FR-37-01

Covers: FR-37-AC1, FR-37-AC2, FR-37-AC3

- Preconditions: fresh or existing local IndexedDB, explicit offlineTestAccount flag, Python helper bound to loopback, USERDEBUG URL printed by helper, synthetic/shared fixture data only. No mocked authentication or cloud backend.
- Actions: open sign-in without registering, use the user-requested RegrestionTest8 shared fixture, verify nickname/session/editor, save/reload/logout. Reopen database and confirm seed does not replace a saved candle; test flag-off fresh database and an existing nickname collision without overwriting it. Inspect written sign-in/session/readiness events and header-match Boolean; try extra sensitive fields, malformed enums, oversized/foreign-origin events and verify only redacted schema reaches disk. Switch USER and verify no new diagnostic posts; test missing/unwritable sink without changing auth. Run keyboard/320px/axe checks on the actual helper flow.
- Expected: requested existing offline account works through real password verification, one owned candle persists, no automatic login or destructive seeding. JSONL files appear locally only through the helper with no credential/identity/content/query values. USER stops new diagnostic writes; logging failure cannot grant/deny a real session. The original user's browser DR remains OPEN pending its actual served-state evidence.
- Execution references: tests/browser/offline-fixture-logs.test.mjs, tests/static/local_logging_test.py, tests/browser/local-accounts.test.mjs, scripts/check-requirements.py. No public deployment or full manual assistive-technology conformance is inferred.

### TC-FR-38-01

Covers: FR-38-AC1, FR-38-AC2

- Preconditions: serve ux/wireframe/index.html; isolated browser context; synthetic preview input only. The prototype is not authentication.
- Actions: compare visitor/empty-owner/saved-owner states; open sign-in from visitor Add; check focus/background inertness, missing fields, switch to create retaining nickname/clearing password, 7/8-character boundary, forced failure/retry, show/hide, simulated success and Escape/cancel focus restoration. Repeat popup views at 320px and run axe; capture screenshots.
- Expected: approved page states and both labelled native dialogs exist; associated errors focus invalid fields, no false success, no lost nickname on switching, passwords clear on close, focus returns to invoker, no horizontal overflow. Preview changes are explicitly simulated; no browser credentials/session are persisted. Manual AT/real zoom remain NOT RUN.
- Execution references: tests/browser/wireframe-transition.test.mjs.

### TC-FR-38-02

Covers: FR-38-AC3

- Preconditions: actual Python local server, fresh IndexedDB/sessionStorage, no auth mocking, requested shared offline fixture. Separate prototype context.
- Actions: enter from visitor Add your candle; record popup/navigation presentation; sign in, verify nickname/hidden visitor invitation and one editor without another login; save/reload/edit/logout. Repeat create-account transition with a synthetic unique nickname. Compare actual output to wireframe state contract.
- Expected: verified identity unlocks owned editor, nickname replaces Log in, one candle persists and private panel clears on logout. Auth entry should be a popup retaining browsing context; current dedicated page is a FAIL/OPEN design-parity DR, not a pass. Record the presentation audit independently from functional transition assertions; unexpected failures fail the run. Original user-browser FR-36 remains OPEN.
- Execution references: tests/browser/wireframe-transition.test.mjs and tests/browser/offline-fixture-logs.test.mjs. Report JSON distinguishes audit completion from application parity. No public release or user-browser acceptance is inferred.

### TC-FR-39-01

Covers: FR-39-AC1, FR-39-AC2, FR-39-AC3

- Preconditions: actual Python helper and root entry pages, isolated browser storage, no auth mocks, USER/USERDEBUG. User-provided account inputs only in the dedicated test, not logs/reports/seed data.
- Actions: try requested account before test registration; register it solely in isolated test storage, logout, wrong-password retry then correct login from visitor header; verify toast, nickname/model/editor and history source pages. Save/reload, verify no repeated toast, logout and test USER success with no diagnostic output. Inject sessionStorage write failure, spoofed/expired handoff for a visitor, missing/unwritable logging sink and throwing diagnostic observer. Inspect file events in their actual ordered subsequence, forbid private values, inspect 320px/keyboard/status and axe.
- Expected: absent/wrong/storage-failed login stays failed with no success toast or false session. Real verifier/readback success → return → independently restored nickname → ready editor gives one debug-only success; normal restoration cannot replay it. Explicit service/view events survive navigation with correct source page/build and appear redacted in helper files. Diagnostics never become auth. No account is silently seeded/reset, no backend success or user's browser state is fabricated. Manual AT/zoom/public deployment remain NOT RUN.
- Execution references: tests/browser/login-debug.test.mjs, tests/browser/session-state.test.mjs, tests/static/local_logging_test.py.

### TC-FR-40-01

Covers: FR-40-AC1, FR-40-AC2

- Preconditions: actual root app served over localhost, real IndexedDB/Web Crypto, isolated synthetic accounts, no auth/DB mocks in principal flow. Deterministic clock/legacy/bad-data/transaction-abort probes are labelled separately.
- Actions: create two owned stories at separate times; verify service-stamped create/update values and newest-first cards; update the older account's status/message and verify it moves first. Save unchanged, cancel, reload, inspect the disabled local reaction action, change filter/page and logout/login; timestamps must not advance. Verify update from a later page resets pagination, filter/focus preserved, hidden candles excluded and owner still sees its timestamp. Inject a legacy missing timestamp, malformed timestamp and an aborted save; inspect stable equal-date ordering and unknown-last. Check readable zone/time datetime, 320px focus/reflow, screenshots and axe.
- Expected: only committed meaningful changes advance stored recency, created_at stays immutable, injected timestamps ignored, aborted save preserves values. Actual cards show accurate known/unknown update state, samples use the labelled fixed demo dates added by FR-41 and never masquerade as live updates; sorting occurs before pagination with deterministic ties. Existing map/auth/ownership regressions pass. Browser clock timestamps are not server-attested time.
- Execution references: tests/browser/story-updates.test.mjs, tests/unit/story-updates.test.mjs and tests/unit/runtime.test.mjs.

### TC-FR-40-02

Covers: FR-40-AC3

- Preconditions: user's actual board-recency feedback and confirmation that login now works after starting the local server; no participant study or measured emotional outcome.
- Actions: read UX lesson, evidence entry, requirement/test mapping and latest memory/backlog status; check provenance and current-scope language.
- Expected: explains why invisible recency can make activity hard to perceive, captures the chosen timestamp/newest-first behavior and honest sample/unknown states, and proposes future validation without claiming research/engagement gains. User confirmation is recorded; lack of a server is their reported explanation, not fabricated diagnosis.
- Execution references: scripts/check-paths.py and scripts/check-requirements.py plus human content review; structural checks are not UX research evidence.

### TC-FR-41-01

Covers: FR-41-AC1, FR-41-AC2, FR-41-AC3

- Preconditions: actual app/default visitor data via local helper, fresh local account storage, synthetic test account, no auth mocks; supplied screenshot shows sample-1 with missing date and Situation/Seeking hidden in details.
- Actions: inspect every visible sample while details are collapsed, including first/last page; compare all 100 dates across reload; check descending order and fictional/demo labels. Register/save a real story with all four fields; inspect visible Situation/Seeking and Updated time, hidden Role/Company until keyboard expansion, collapse/focus retention on rerender and HTML-like text as literal text. Check sample empty-field defaults and See more empty fallback, unknown actual dates, 320px/desktop screenshots and axe.
- Expected: default visitor board visibly meets the requested output. Sample times are deterministic demo metadata, actual dates remain service-stamped and unknown actual dates stay unknown. Core fields/date remain readable without disclosure; only Role/Company are inside See more. No timing reset on reload, no XSS/auto-focus loss/overflow and no fake live activity claim. Manual AT/real zoom remain NOT RUN.
- Execution references: tests/browser/story-card.test.mjs, tests/browser/story-updates.test.mjs and tests/unit/runtime.test.mjs; review docs/tracking/defects/DR-41-01-sample-story-timestamps.md and UX lesson for scope/evidence correction.
