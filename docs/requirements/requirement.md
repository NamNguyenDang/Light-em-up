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

- **FR-25-AC1**: Send an empty candle or optional text up to 600 characters; failure retains text, duplicate sends do not overwrite an old message, and recipient content renders as plain text with read state.
- Acceptance scenario: [TC-FR-25-01](test-cases.md#tc-fr-25-01). Evidence scope: SDK/SQL fixtures; boundary/live/manual checks require explicit evidence.

### FR-26 — Report and block

- **FR-26-AC1**: Only a recipient can report an event with a reason or confirm a sender block. Reports deduplicate; failures retry; blocked events disappear and future sends are denied. Do not promise staffed/immediate moderation.
- Acceptance scenario: [TC-FR-26-01](test-cases.md#tc-fr-26-01). Evidence scope: SDK/SQL fixtures; live moderation/provider behavior NOT RUN.

### FR-27 — Evidence-led lessons

- **FR-27-AC1**: Keep delivery lessons and a separate text record per audited criterion/topic; distinguish WCAG evidence/review/N/A, actual BaaS versus BFF, UX guidance and open findings without false certification.
- Acceptance scenario: [TC-FR-27-01](test-cases.md#tc-fr-27-01). Evidence scope: documentation validation and human standards review.

### FR-28 — Agent continuity

- **FR-28-AC1**: Root instructions discover memory/workflow; merge authorization is only Light-em-up, each FR/DR has its own verified PR, and random user DR checks do not replace regression or live acceptance.
- Acceptance scenario: [TC-FR-28-01](test-cases.md#tc-fr-28-01). Evidence scope: documentation validation and PR process review.

### FR-29 — Usable account release

- **FR-29-AC1**: Real registration/confirmation, sign-in and create/light/save/reload/sign-out/in must preserve account ownership and candle state. Missing configuration or skipped real checks block release; local fallback stays explicitly local.
- Acceptance scenario: [TC-FR-29-01](test-cases.md#tc-fr-29-01). Evidence scope: fixture-tested code; live acceptance BLOCKED; see FR-29 spec.

### FR-30 — Golden requirements workflow

- **FR-30-AC1**: Every FR/DR change links golden acceptance IDs to test scenarios and applicable standards, reads memory, checks actual outputs, records evidence/gaps and never weakens expectations to hide a defect.
- Acceptance scenario: [TC-FR-30-01](test-cases.md#tc-fr-30-01). Evidence scope: structural validation plus human behavioral/evidence review.

## Release status

This specification records expected behavior, not a blanket completion claim. FR-29 online acceptance is BLOCKED until the actual project/served account journey is verified. See [the defect specification](../tracking/features/FR-29_ACCOUNT_JOURNEY_RELEASE_BLOCKER.md) and [the standards findings](../standards/findings.md). Missing manual/negative/boundary cases must be added before the affected acceptance criterion can be marked fully verified.

### FR-31 — Repository organization

- **FR-31-AC1**: Separate frontend runtime, deferred backend, executable tests, agent guidance, golden requirements, tracking, standards, lessons, design/history and UX workspace. Keep root index.html/signin.html URLs and existing behavior. Update all asset/import/workflow/test/traceability references together; preserve prior designs and file provenance.
- Acceptance scenario: [TC-FR-31-01](test-cases.md#tc-fr-31-01). Evidence: static/link/import checks and full browser/SQL regressions; no backend activation or UX research outcome is implied.

### FR-32 — UX evidence and portfolio workspace

- **FR-32-AC1**: Provide a navigable ux workspace with a case-study draft, assumptions/research plan, task/state journeys, evidence-backed design decisions, evaluation/metrics, blank session template and portfolio-review checklist. Distinguish owner feedback, implemented/automated evidence, proposed research and unmeasured outcomes. Preserve source/provenance, individual-role/AI-assistance honesty and the current local/deferred-backend boundary; never fabricate participants, quotes, outcome uplift or full standards conformity.
- Acceptance scenario: [TC-FR-32-01](test-cases.md#tc-fr-32-01). Evidence: documentation/link/provenance review and unchanged runtime regressions; no user-study completion claim.

### FR-33 — Request-to-deployment workflow

- **FR-33-AC1**: agent/skill.md defines new request, iterative analysis/discussion against the golden requirements, finalized scope, implementation, test-gap analysis, test execution, requirement/result verification and deployment with served-output verification. Scope changes/failures loop back appropriately. Existing repo-only autonomous merge authorization persists; merge, deployment and acceptance remain distinct. Missing required evidence cannot be reported as a pass.
- Acceptance scenario: [TC-FR-33-01](test-cases.md#tc-fr-33-01). Evidence: human process/content review and structural checks; no runtime/authentication/deployment change is implied.

### FR-34 — Nickname/password local accounts (active scope)

For active local use, G-03 server authorization applies only to the deferred online integration; local controls provide profile separation without a trusted server. These approved local requirements supersede anonymous demo creation and the active email-based entry described by FR-11/13/14/16/29. Historical online/provider acceptance stays deferred, not passed. Existing anonymous data is not adopted or displayed as an account candle.

- **FR-34-AC1**: Browsing needs no account; creating/editing a candle requires registration/sign-in. Active forms collect nickname/password only, with no email/Google/confirmation requests. Nicknames are NFKC-normalized, trimmed, case-insensitive for lookup, 1–40 characters of letters/numbers/spaces/dot/underscore/hyphen; duplicates are rejected atomically, including concurrent tabs. New passwords use 8–128 ASCII letters/numbers, preserve case, allow paste/password managers, and require no particular mixture. Symbols/spaces are rejected with an explanation; existing FR-34 passwords remain valid for login (FR-35 user policy change).
- **FR-34-AC2**: Store a random stable account ID and nickname, a separate random 16-byte salt and PBKDF2-SHA256 password verifier (600,000 iterations), never plaintext passwords or MD5. Sessions use independent random 32-byte tokens, store only their SHA-256 digest in the account database, expire after 12 hours and are revoked on logout. Invalid credentials share one message; storage/crypto failures fail closed and permit retry. No password/token enters URLs, exports, logs or PR evidence.
- **FR-34-AC3**: One registered account owns at most one candle in IndexedDB; repeated saves update its stable candle ID. Every private read/write checks the current unexpired session; cannot read/write another account's private candle. Save failure preserves the draft; nickname displayed on the candle is the registered nickname. Logout clears private editor/UI/drafts, refresh/relogin restores the correct owner's candle, and anonymous legacy data is neither rendered nor adopted. Local profile separation is not trusted server authorization or encrypted storage.
- **FR-34-AC4**: Explain local-browser/site scope, data loss on clearing storage, no cross-device identity or password recovery, one account/one candle rather than verified one person, and remaining personal-data responsibility. Verify the real served register → create/light/save → refresh → logout → duplicate/wrong-password checks → login/edit journey with network mocks disabled. Include isolated accounts, concurrent registration, malformed/expired sessions, storage failures and WCAG 2.2 AA labels/errors/status/focus/paste/visibility/reflow checks. No backend activation or full accessibility conformity is implied.
- Acceptance scenario: [TC-FR-34-01](test-cases.md#tc-fr-34-01). Evidence: active browser-local real IndexedDB/Web Crypto tests plus existing deferred-provider regressions; deployed-site verification is distinct.

### FR-35 — DR: account feedback and revised password policy

- **FR-35-AC1**: New registration accepts 8–128 ASCII letters/numbers without a required mix. Reject fewer than 8, more than 128, symbols and spaces through both UI and account API. Do not trim, silently alter or truncate passwords. Preserve salted PBKDF2 and all existing identity/ownership controls. Existing accounts created under FR-34 retain their original password verification, including spaces/symbols.
- **FR-35-AC2**: Every failed registration/login displays a visible alert summary saying the operation failed, with a useful reason and correction for validation/duplicate/storage errors. Mark and describe the invalid field, focus it, keep input for retry, and leave the form usable. Missing/wrong login credentials share a generic explanation rather than disclosing account existence. A failed registration must not appear successful or create an account/session.
- **FR-35-AC3**: Prove 7/8/13/128/129-character boundaries, symbol/space rejection, no account on invalid input, successful register/logout/login at 8 and 13 characters, duplicate/wrong/missing credential messages, legacy-password login and storage failure/retry. Record the diagnosis/prevention in memory without copying the user's supplied password. Cross-check WCAG 2.2 AA error identification/suggestion, labels, focus, status and responsive output; manual assistive technology/public deployment remain separately reported.
- Acceptance scenario: [TC-FR-35-01](test-cases.md#tc-fr-35-01). Evidence: actual browser-local register/login journeys and clearly labelled legacy-data/storage fault fixtures; no new hosting/backend activation.

### FR-36 — DR: verified session/UI synchronization and user diagnostics

- **FR-36-AC1**: After actual login/registration, verify the persisted session before reporting success. On return/reload, a verified identity must replace Log in with its nickname, synchronize application auth state, restore a persisted candle’s saved model ID/persistence, and permit one owned candle editor without another login redirect. A queued Add your candle intent resumes once; own-story loading/failure stays an explicit loading/retry state rather than reauthentication. Preserve account/candle ownership, expiration and logout guards.
- **FR-36-AC2**: Rendering/subscriber/diagnostic exceptions cannot turn a verified session into signedOut/checkFailed or interrupt remaining consumers. Reconcile the application model from authoritative session snapshots without relaxing ordinary AUTH_CHANGED transition guards. Keep stale async verification ignored. Reject non-persisting session storage with an actionable error instead of false login success; unsuccessful initial registration must not leave an orphan account/session.
- **FR-36-AC3**: USER is the default mode: no diagnostic panel/history/console logging. Explicit USERDEBUG flag shows build, origin/page and safe session/UI/navigation/story/candle readiness states with bounded transition history; carry the mode through the sign-in return. Provide refresh and switch-to-USER controls. Never log/store passwords, tokens, verifier/salt, account IDs/nicknames, stories/messages, URL query values or raw exceptions. Diagnostic failure must not affect authentication; mode changes do not authenticate a visitor or remove a real session.
- **FR-36-AC4**: Verify real local-server login → nickname → Add your candle → save → reload → logout and login-return intent, both modes, failed/expired sessions, subscriber/render faults, storage write/readback failure, model reconciliation and redacted diagnostic output. Cross-check WCAG 2.2 AA keyboard/focus, status/labels and 320px reflow. Record the user report separately from confirmed source failure conditions and unknown actual browser data. Public deployment/manual AT remain separately reported.
- Acceptance scenario: [TC-FR-36-01](test-cases.md#tc-fr-36-01). Evidence: real IndexedDB/Web Crypto local-server journey with separately labelled view/storage faults and model unit tests, not an online provider activation.

### FR-37 — Requested offline fixture account and local event files

- **FR-37-AC1**: With the explicit local offlineTestAccount flag, initialize the requested shared regression fixture RegrestionTest8 using its provided test credential's salted PBKDF2 verifier. No plaintext password is shipped in application configuration/seed data. Seed fresh and existing databases without automatically signing in or overwriting an existing nickname/account/candle. Disabling the flag prevents new seeding, not deletion of existing data. Prove real sign-in with the requested shared test fixture, nickname header, Add your candle/editor, one saved light, reload and logout.
- **FR-37-AC2**: A standard-library local server command serves the app on loopback and advertises a same-origin logging sink. In USERDEBUG, sign-in phase/session/UI/readiness events are written to logs/browser-events-YYYY-MM-DD.jsonl (UTC). USER sends no new diagnostic events. Show connected/unavailable/off file logging state. Capture a Boolean header-identity match rather than a nickname. Neither client nor server files may log passwords, tokens, IDs/nicknames, verifier/salt, story/message content, URL query values or raw exceptions; reconstruct an allowlisted schema, limit request size and reject foreign-origin posts. Keep actual logs out of git.
- **FR-37-AC3**: File logging is optional and never gates authentication. Without the helper endpoint or with write/network failure, browser state diagnostics still work and login remains governed by the real local session. No cloud service/billing is enabled; this helper is not a trusted authentication backend. Record the original FR-36 user-browser DR as OPEN until that environment is reproduced/accepted; passing fixture tests or another merge are not closure.
- Acceptance scenario: [TC-FR-37-01](test-cases.md#tc-fr-37-01). Evidence: actual Python local helper, IndexedDB/Web Crypto UI flow, event-file/schema/redaction checks and existing regressions. The user explicitly requested a shared offline regression account; its known test input is test-fixture material, never a personal credential or an event-log value.
