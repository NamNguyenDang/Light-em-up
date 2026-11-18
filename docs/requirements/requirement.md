# Light-em-up golden requirements

Version: 1.0, 18 November 2026. Introduced by FR-30. Scope: public community, browser demo, optional online account/story/encouragement flows and repository delivery controls.

## Authority and change control

This file defines expected behavior; source code and test results describe what is currently implemented. Do not rewrite an expectation merely to make a failing implementation pass. Update requirements when an authorized FR/DR changes behavior, record the reason and keep stable acceptance IDs. Later explicit user decisions take precedence and must be recorded here. The backlog tracks status; lessons capture history; neither silently changes the golden contract.

Every new or changed FR must have identifiable acceptance criteria and linked test cases before closure. Use stable FR-NN-ACn and TC-FR-NN-nn identifiers, with execution references/evidence scope in traceability.json. Cases specify preconditions, actions, observable expected results, failure/retry paths and required environment. A test must compare actual behavior with these expectations, not simply mirror the implementation. Coverage links and a green CI badge do not prove acceptance on their own.

## Current delivery scope

The user chose to keep the project browser-local. Optional online integration and its unresolved acceptance are deferred; no cloud activation or paid service is authorized by this reorganization. Local operation is the active acceptance target. Earlier online requirements remain the contract if online activation is resumed; deferral is not a retrospective pass or defect fix.

## Modes and evidence boundaries

- **Browser demo:** no configured online project is required. Local candles/data stay in that browser or explicitly this session when storage is unavailable. Never call this an online account or server save.
- **Online service:** the owned Supabase project supplies authentication and shared PostgreSQL storage. It requires public URL/key, migrations, site/redirect configuration and a working provider/confirmation setup. Empty configuration must never fabricate authentication or persistence.
- **Unit/browser/SQL fixtures:** synthetic implementation tests. Mark them as fixtures. They do not establish real provider, email delivery, deployed configuration or cross-device persistence.
- **Live acceptance:** actual deployed origin and owned test project, with application network mocking disabled. Missing access/configuration and skipped cases are BLOCKED/NOT RUN, not PASS.

## Cross-cutting requirements

- G-01: Target WCAG 2.2 AA. For each change identify applicable criteria, actual output checks and manual gaps using the 55-point audit; no full conformance claim from automated scans alone.
- G-02: Read project memory before implementation and verification. Check applicable architecture and website/SaaS UX guidance. BFF is an architecture pattern, not mandatory infrastructure or a certification; current design is direct BaaS with database authorization.
- G-03: Keep user content as text, identities/drafts account-scoped and protected writes authorized server-side. Public publishable keys are permitted; privileged keys/passwords must not enter source or reports.
- G-04: Keep the selected low-cost/free-plan direction. Do not enable billing or paid add-ons as an incidental change. Pricing and separate email-delivery limits must be rechecked before choosing services; no universal zero-cost guarantee. Public email-confirmation signup requires a configured sender that can deliver to intended external users, not just project-team accounts.
- G-05: Preserve existing unaffected behavior and approved visual choices. User DRs supplement our regression tests and must be reproduced, tracked and closed with evidence.
- G-06: Ordinary verified code/documentation PRs may merge autonomously in Light-em-up only. A code merge does not imply deployment, release readiness or closure of an acceptance blocker.

## Shared map/candle contract

- **MAP-AC1**: A kommun's eligible count includes only visible stories whose status is Found work and whose candle is lit. Levels are 0 for zero, 1 for 1–10, 2 for 11–50, 3 for 51–100, 4 for 101–200, 5 for 201–500 and 6 for 501+. Province land illumination follows its highest kommun level, not a sum of kommun counts. Zero eligible users gives no land glow; other lit stories may still have a city dot. Story/candle location stays at the selected place. Textual counts/levels remain available independently of brightness.
- **MAP-AC2**: Candle lit/resting state and employment status remain independent. Hiding excludes the own story from public display/counts; it remains editable privately. Labelled samples may contribute to demo totals but must not be presented as verified unemployment data or real employment outcomes caused by this site.
- Acceptance scenarios: [TC-MAP-01](test-cases.md#tc-map-01), [TC-MAP-02](test-cases.md#tc-map-02).

## Acceptance criteria by FR

### FR-01 — Named dialogs

- **FR-01-AC1**: Every dialog has a unique visible heading as its accessible name; opening and closing preserve a usable keyboard continuation.
- Acceptance scenario: [TC-FR-01-01](test-cases.md#tc-fr-01-01). Evidence scope: browser-fixture; manual AT pending.

### FR-02 — Province details

- **FR-02-AC1**: Hover or focus reveals a named province detail; it persists while crossing into the detail and Escape dismisses it without losing selection.
- Acceptance scenario: [TC-FR-02-01](test-cases.md#tc-fr-02-01). Evidence scope: browser-fixture; manual AT/touch pending.

### FR-03 — Field-linked errors

- **FR-03-AC1**: Empty nickname or unknown city prevents save, shows associated actionable text, marks the invalid field and focuses the first error; corrected valid input can save.
- Acceptance scenario: [TC-FR-03-01](test-cases.md#tc-fr-03-01). Evidence scope: browser-fixture; manual announcements pending.

### FR-04 — Visible map states

- **FR-04-AC1**: Province boundaries, keyboard focus and selected states remain distinguishable across light levels and forced colors; brightness is not the only information source.
- Acceptance scenario: [TC-FR-04-01](test-cases.md#tc-fr-04-01). Evidence scope: source/browser checks; manual visual review pending.

### FR-05 — Enlargement and reflow

- **FR-05-AC1**: At narrow widths and enlarged/custom-spaced text, essential controls/content remain available without required horizontal page scrolling or clipping.
- Acceptance scenario: [TC-FR-05-01](test-cases.md#tc-fr-05-01). Evidence scope: browser approximation; real zoom/text resize pending.

### FR-06 — Control targets

- **FR-06-AC1**: Controls meet the applicable WCAG 24 CSS-pixel minimum or a documented valid equivalent/exception; aim for 44 pixels. Province dropdown offers equivalent selection.
- Acceptance scenario: [TC-FR-06-01](test-cases.md#tc-fr-06-01). Evidence scope: browser-fixture; manual touch pending.

### FR-07 — Map text alternative

- **FR-07-AC1**: All 25 provinces expose story/lit/resting information and represented municipal eligible counts/levels without hover or interpreting light intensity.
- Acceptance scenario: [TC-FR-07-01](test-cases.md#tc-fr-07-01). Evidence scope: unit/browser-fixture; manual AT pending.

### FR-08 — Focus and announcements

- **FR-08-AC1**: Filtering/redraws retain a meaningful focus target; pagination moves to results heading; save/delete returns to a visible continuation and results are announced.
- Acceptance scenario: [TC-FR-08-01](test-cases.md#tc-fr-08-01). Evidence scope: browser-fixture; manual announcement review pending.

### FR-09 — Regression evidence

- **FR-09-AC1**: Repeatable automated scans accompany keyboard/focus/reflow checks; manual AT/real zoom gaps and exact tested commit are reported rather than hidden.
- Acceptance scenario: [TC-FR-09-01](test-cases.md#tc-fr-09-01). Evidence scope: CI evidence plus manual completion required.

### FR-10 — Approved presentation

- **FR-10-AC1**: Use candle artwork, the preferred bold italic serif hero on one line when desktop space permits, readable wrapping when narrow/enlarged, no demo-count banner or long map-help paragraph, and the approved invitation/CTA in online visitor mode.
- Acceptance scenario: [TC-FR-10-01](test-cases.md#tc-fr-10-01). Evidence scope: browser-fixture; manual visual review pending.

### FR-11 — Independent state dimensions

- **FR-11-AC1**: Navigation, authentication and story states are independent; a local profile cannot authenticate a user and modal transitions cannot silently reset browsing context.
- Acceptance scenario: [TC-FR-11-01](test-cases.md#tc-fr-11-01). Evidence scope: unit/browser-fixture.

### FR-12 — Verified restoration

- **FR-12-AC1**: Restore only a server-verified identity; expose checking, visitor and retryable failure states, and reject stale/invalid/expired results.
- Acceptance scenario: [TC-FR-12-01](test-cases.md#tc-fr-12-01). Evidence scope: SDK HTTP fixture; real provider NOT RUN.

### FR-13 — Sign-in and safe return

- **FR-13-AC1**: Existing accounts can sign in with accessible email/password inputs and optional configured Google; cancellation clears password and returns safely; only allowlisted same-site return targets are honored.
- Acceptance scenario: [TC-FR-13-01](test-cases.md#tc-fr-13-01). Evidence scope: SDK HTTP fixture; live provider NOT RUN.

### FR-14 — Account-aware candle entry

- **FR-14-AC1**: Configured online Add your candle waits for verification, sends visitors through sign-in and consumes the editor-return intent once while retaining public browsing context. Explicit offline fallback never authenticates a visitor.
- Acceptance scenario: [TC-FR-14-01](test-cases.md#tc-fr-14-01). Evidence scope: unit/browser-fixture; live account flow NOT RUN.

### FR-15 — Story editing

- **FR-15-AC1**: New/existing stories have empty/prefilled fields, validation, saving feedback and duplicate-write guards. Discard cancellation keeps edits; failed writes keep the draft and prior saved story.
- Acceptance scenario: [TC-FR-15-01](test-cases.md#tc-fr-15-01). Evidence scope: unit/browser-fixture; real server save NOT RUN.

### FR-16 — Own-story panel

- **FR-16-AC1**: Load the verified account own story independently of public filters; wait/retry on load failure, keep local demo separate and update personal card/map after an accepted save.
- Acceptance scenario: [TC-FR-16-01](test-cases.md#tc-fr-16-01). Evidence scope: SDK HTTP fixture; live ownership/persistence NOT RUN.

### FR-17 — Draft recovery

- **FR-17-AC1**: Keep bounded tab-scoped drafts tied to the same account for up to 30 minutes; recover after save/session failure, ignore stale completions, and clear on success or explicit discard.
- Acceptance scenario: [TC-FR-17-01](test-cases.md#tc-fr-17-01). Evidence scope: unit/SDK fixture; live reauthentication NOT RUN.

### FR-18 — Sign-out

- **FR-18-AC1**: End the current browser session, clear private browser/form/draft data, return to the public view and leave the published server story unchanged. Failure must offer retry without false success.
- Acceptance scenario: [TC-FR-18-01](test-cases.md#tc-fr-18-01). Evidence scope: SDK fixture coverage; real provider and failure branches require evidence.

### FR-19 — Ownership enforcement

- **FR-19-AC1**: The database enforces owner-only private story access/writes, valid catalog/length values and one story per account; public reads expose only published fields without account IDs.
- Acceptance scenario: [TC-FR-19-01](test-cases.md#tc-fr-19-01). Evidence scope: PostgreSQL claim fixture; deployed JWT integration NOT RUN.

### FR-20 — Complete journey regression

- **FR-20-AC1**: Regression coverage spans positive and adverse auth/story paths and separates fixture results from real deployment and manual accessibility acceptance.
- Acceptance scenario: [TC-FR-20-01](test-cases.md#tc-fr-20-01). Evidence scope: fixture matrix; required live/manual checks still open.

### FR-21 — Nickname disclosure

- **FR-21-AC1**: A verified display name or honest account fallback replaces Log in and exposes My story, Encouragement and Sign out through normal keyboard disclosure behavior with meaningful focus.
- Acceptance scenario: [TC-FR-21-01](test-cases.md#tc-fr-21-01). Evidence scope: browser-fixture; manual AT pending.

### FR-22 — Adaptive invitation

- **FR-22-AC1**: An online account with a story sees one edit action instead of invitation/Add controls; new accounts retain entry; sign-out restores visitor presentation.
- Acceptance scenario: [TC-FR-22-01](test-cases.md#tc-fr-22-01). Evidence scope: browser-fixture; live service NOT RUN.

### FR-23 — One encouragement

- **FR-23-AC1**: Verified users can send once per real story with pending/retry/sent feedback. Database rules prevent self, spoofed, hidden-target and duplicate sends; samples remain labelled demos.
- Acceptance scenario: [TC-FR-23-01](test-cases.md#tc-fr-23-01). Evidence scope: SDK/SQL fixtures; additional adverse branches/live checks pending.

### FR-24 — Received encouragement

- **FR-24-AC1**: Only the recipient can list newest events with sender/time, total/unread counts and paging or mark an opened event read; errors are retryable and account changes clear private events.
- Acceptance scenario: [TC-FR-24-01](test-cases.md#tc-fr-24-01). Evidence scope: SDK/SQL fixtures; paging/error/live acceptance still required.

### FR-25 — Optional message

- **FR-25-AC1**: Send an empty candle or optional text up to 600 character…3863 tokens truncated…NOT RUN.
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
