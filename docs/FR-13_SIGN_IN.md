# FR-13 — Sign-in page

## Scope

`signin.html` is a dedicated, keyboard-accessible page for existing email/password accounts and optional Google OAuth through Supabase. The Community header's Log in action opens this page. It supports checking an existing session, ready, signing in, failed, unavailable, provider redirect and verified-success states. Cancel returns to the public Community page. FR-14 will connect Add your candle to this flow; FR-21 will add the account menu.

The page uses the existing Supabase SDK and shared session-verification module. It never accepts an embedded cached user or the credential response's user object as the final UI identity; a session is verified through Supabase Auth before returning to the application.

## Configuration and account availability

- Keep project URL and `sb_publishable_` key in `supabase-config.js`. No secret/server key is accepted.
- Email/password sign-in uses an existing Supabase account. Account registration and password recovery are outside this FR.
- Set `googleEnabled:true` only after enabling/configuring Google in the Supabase project. Otherwise the Google button is hidden. Google credentials remain in the provider/project console, not the website.
- Configure the public site URL and exact `signin.html` callback URL in Supabase's allowed redirect URLs. The SDK uses PKCE and handles the callback/session exchange.
- Project configuration is still blank in this repository. In that state the page displays a friendly unavailable message, disables credential submission and leaves Community navigation usable. Real provider/account verification remains pending.

## State, credentials and navigation

- Autofill metadata is `username` / `current-password`; paste is allowed. An accessible Show/Hide password control is optional.
- Field-specific validation focuses the first invalid field; server credential errors are associated with both fields and announced through an alert. Confirmation/network/provider errors use clear, non-technical messages.
- Only one credential/provider request can be active. Requests are bounded by a timeout; cancellation stops listeners, aborts active fetches and suppresses late navigation.
- Credentials remain in the form/request, never application state, return URLs, custom storage or logs. The form's password is cleared on success or cancellation. Supabase manages its own session credentials.
- Return destinations are restricted to the current site's Community entry point and known in-page anchors. External destinations, other pages and arbitrary query strings are discarded.
- Only a public return destination and a one-time focus ID are kept in session storage. Storage failures fall back to Community without blocking sign-in. A successful user-initiated return focuses the intended anchor/account control; passive session restoration still does not steal focus.
- Callback errors/cancellation leave a retryable form. Provider redirects are restricted to the configured Supabase auth endpoint; the SDK handles the provider's external journey.

## WCAG 2.2 AA cross-check before PR

| Criteria | Output checks |
|---|---|
| 1.3.1; 4.1.2 | Explicit field labels, required indication, fieldset legend, described errors, native buttons, accessible password-toggle state. |
| 1.3.5; 3.3.8 | Standard autocomplete tokens support password managers; actual browser clipboard-paste check; no paste blocking, forced transcription or memory puzzle. Real password-manager/provider assessment remains manual. |
| 2.1.1; 2.1.2; 2.4.3 | Keyboard form/retry actions, usable cancellation and focus at first invalid field / intended return target. No modal keyboard trap. |
| 2.4.2; 2.4.6; 2.5.3 | Sign-in page title, clear heading and visible labels matching accessible control names. |
| 3.3.1; 3.3.2; 3.3.3; 4.1.3 | Identified local/server errors, clear required fields, retry instructions, status and alert regions. |
| 1.4.3; 1.4.10; 1.4.12; 2.5.8 | Axe scans, 320/375/768/1280px layout/target checks, custom spacing, forced-colors capture and at least 44px primary controls. |
| 2.4.7; 2.4.11 | Existing paired focus treatment plus focused heading style; no fixed overlay/header obscuring the form. Inspect captured output. |

Before opening the PR, run the source/session/sign-in suites and browser suites on the feature branch. The sign-in browser suite uses the real vendored SDK with isolated HTTP fixtures, including successful verification, credentials/network failures, duplicate submission, existing sessions, safe return targets and Google cancellation. Axe scans cover unavailable, ready, credential-error, connection-error and session-check-error outputs.

Commands: `npm test`; `node scripts/session-test.mjs`; `node scripts/signin-test.mjs`; `npm run test:a11y`; `node scripts/session-browser-test.mjs`; `node scripts/signin-browser-test.mjs`; `git diff --check`.

Limitations: fixtures do not verify a live Supabase account or Google's real consent flow. NVDA/VoiceOver, actual password managers, real browser text-only resizing/400% zoom and external-provider accessibility still require manual assessment. No full WCAG conformance claim is made.

References:
- https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html
- https://supabase.com/docs/reference/javascript/auth-signinwithpassword
- https://supabase.com/docs/reference/javascript/auth-signinwithoauth
- https://supabase.com/docs/guides/auth/redirect-urls
