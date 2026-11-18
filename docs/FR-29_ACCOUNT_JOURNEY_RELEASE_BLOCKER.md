# FR-29 — Restore the usable account and candle journey

Status: confirmed release blocker, not fixed or live-verified.
Reported: 18 November 2026, user testing latest default branch (main, called master in the report).
Observed: cannot log in, register an account, or light a personal candle through the primary account journey.
Verified source baseline: 3684475786761e5cc4b173233fd41e39b8f0a43a.

## Evidence and cause

- supabase-config.js ships empty url and publishableKey. The session/sign-in controllers deliberately report unavailable rather than fabricate authentication.
- signin.html exposes existing-account sign-in only. No registration UI exists; signin-flow.js does not implement signup. Optional Google is disabled in the shipped configuration.
- Add your candle requires a verified account, so this unavailable account path also blocks its normal candle flow.
- The browser-only saved-light demo is a separate feature; it does not satisfy account creation or persisted online candle acceptance.
- CI uses actual SDK code with routed HTTP fixtures and PostgreSQL claim fixtures. Those tests validate implementation mechanics, not the deployed URL, real Auth provider, project schema or release readiness.
- No live project URL was supplied and migration/redirect/provider deployment has not been independently verified. Do not infer a live database failure from unavailable configuration alone.

## Acceptance criteria

1. Provide an accessible Create account path, with email/password validation, new-password autocomplete, paste/password-manager support, duplicate-submit protection and actionable errors. Explain confirmation-required state; do not call an unconfirmed account signed in.
2. Configure the intended project/public publishable key, numbered migrations, site URL and exact auth redirect allowlist. Never put a secret/service-role key or account password in source.
3. Verify real registration and confirmation behavior in an owned test environment, then sign in and show the verified nickname. Handle existing/unconfirmed accounts without exposing other users' private data.
4. From Add your candle, create a story, light it, save online, show the personal card/map, and remove the duplicate invitation. Refresh and sign out/in: the same account's saved candle and lit state persist.
5. Another account must not edit or adopt this story/draft. Failed auth/save calls preserve useful feedback and retry; do not claim an online save on failure.
6. If account services are unavailable, clearly distinguish visitor/offline demo behavior from unavailable online accounts. No enabled-looking dead registration or silently broken primary journey.
7. Before declaring the release usable, pass deployed-origin smoke tests against real services as well as isolated regressions. Missing configuration, skipped live scenarios or absent credentials are BLOCKED/NOT RUN, never PASS.
8. Cross-check actual outputs against WCAG 2.2 AA before PR: visible/associated labels and errors, keyboard/focus, live progress/result, confirmation instructions, reflow and accessible authentication. Manual AT gaps remain explicit.

## Regression scenarios to implement

| ID | Environment | Scenario and required assertion |
|---|---|---|
| FR29-01 | Shipped artifact preflight | Read the effective served config and fail release readiness if URL/key are absent/invalid or a secret key is exposed. Checking a local replacement fixture is insufficient. |
| FR29-02 | Browser fixture + real owned staging | Create account with valid details. Cover confirmation enabled and disabled; distinguish account-created/confirmation-required/verified-session states. |
| FR29-03 | Browser fixture | Invalid email/password, duplicate submission, existing/unconfirmed account and provider/network rejection: clear errors, retry, no false session or candle success. |
| FR29-04 | Real deployed origin | Sign in, verify nickname/menu, activate Add your candle, save a lit candle and assert the server row, personal card and map state agree. |
| FR29-05 | Real deployed origin | Reload then sign out/in; assert account ownership, message/location/visibility/lit persistence and correct visitor/account controls. |
| FR29-06 | Browser fixture + SQL | A second account cannot edit/adopt the first account's story; self-reactions/drafts remain isolated; no fake online save during failures. |
| FR29-07 | Browser fixture | Missing/bad configuration: actionable unavailable UI; registration/add action does not promise a working account. Release smoke result is BLOCKED. |
| FR29-08 | Browser + manual | Keyboard-only register/confirmation/sign-in/candle journey, password manager/paste, first-error focus, return focus, live feedback, 320px/zoom/text spacing and AT review. |
| FR29-09 | Release workflow | Tests target the actual deployed commit/origin with fixture routing disabled. Record commit, URL, configuration presence, migration verification, scenarios run and outcome; skipped required steps prevent a release-ready result. |

Use synthetic test identities in a controlled project, keep credentials in the test runner's protected environment, and define cleanup for test-created rows/accounts. Email confirmation needs a controlled test inbox or supported test setup; never bypass production confirmation or weaken RLS to make a test pass. Do not silently turn a fixture-only test into a claimed live test.

## Delivery order and closure

Keep FR-27 audit, FR-28 agent guidance and FR-29 implementation in separate PRs targeting main. Merging specifications does not resolve this issue. FR-29 closes only when the implementation and required deployed-origin acceptance evidence exist. Backend configuration/access is still required for live verification; do not invent project values or re-suggest the declined Supabase plugin.
