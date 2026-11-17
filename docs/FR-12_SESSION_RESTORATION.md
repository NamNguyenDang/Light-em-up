# FR-12 — Supabase session restoration

## Scope

Restore an existing Supabase session on load/reload without treating a local story or cached user metadata as a verified account. A separate controller handles loading, absent sessions, server-verified identities, connection failures/retry, auth events, timeouts and stale results. The public Community page remains available throughout.

FR-12 is independent of unmerged FR-11 and targets main directly. If FR-11 is present later, the session UI forwards authentication-state events to its model. No predecessor feature branch is the PR base.

## Configure a real project

Edit `supabase-config.js` with:

- The Supabase project URL, for example `https://PROJECT_REF.supabase.co`.
- Its **publishable** browser key beginning with `sb_publishable_`.

These are public browser settings. Secret/service-role keys must never be used here. The adapter rejects keys without the publishable prefix. Both values are intentionally blank in this PR because no project configuration has been supplied. Blank settings retain the existing local demo without silently claiming a real login. Partial/invalid settings produce an unavailable-session state.

The pinned Supabase JavaScript client 2.119.0 is vendored under `assets/vendor/`, with its MIT license. No CDN request is required. The vendor file was obtained from the matching published npm package, without modification.

The SDK manages session persistence/refresh. `getSession()` checks for an existing session; if present, `getUser()` verifies it with Supabase Auth before the UI accepts the ID and nickname. Tokens, email addresses and raw server errors are not copied into UI state or status messages. Database ownership policies remain FR-19 and must be enforced by the backend.

## Output and interaction

| State | Output |
|---|---|
| Not configured | Keep the local demo unchanged; expose `data-session-state="notConfigured"` for testing. |
| Checking | Announce/display “Checking your session…”; disable the account action temporarily; allow public browsing. |
| Signed out | Visitor message and the existing Log in label. |
| Signed in | Welcome message and verified nickname in the existing account button. |
| Connection/timeout failure | Explain that the session could not be checked, retain public browsing and offer a keyboard-accessible Try again button. |
| Rejected/expired session | Return to signed-out status; do not present the cached user as authenticated. |

Passive session updates do not move focus. User-triggered retry returns focus to the retry button on failure or to the existing account button when retry succeeds. Auth callbacks schedule verification outside the SDK callback; older async checks cannot reverse a later sign-out or retry.

This PR does not add the FR-13 sign-in page, FR-18 sign-out action, FR-21 account menu or server-backed personal-story loading. The existing local editor remains a demo workflow, separate from a verified account. Do not infer backend ownership from a local profile.

## WCAG 2.2 AA cross-check before PR

| Criterion | Check |
|---|---|
| 1.3.1; 4.1.2 | Session feedback is a named section; retry is a native text-labelled button. Existing dialog/field relationships remain unchanged. |
| 2.1.1; 2.4.3 | Retry works with keyboard activation; explicit post-retry focus goes to a visible continuation. Passive restoration does not steal focus. |
| 2.4.7; 1.4.11 | Retain existing contrast-paired focus indicators; inspect session/error screenshot. |
| 4.1.3 | Session message uses `role="status"`, polite live announcements and `aria-atomic="true"`. No token/email/debug output is announced. |
| 1.4.3; 1.4.10; 1.4.12 | Error output is included in axe scans; check 320px reflow and existing text-spacing suite. |
| 2.5.8 | Retry target is at least 44×44 CSS pixels. |
| 3.3.8 | No new authentication challenge in this PR. Assess with the FR-13 sign-in interface. |

Validation commands:

```
npm test
node scripts/session-test.mjs
npm run test:a11y
node scripts/session-browser-test.mjs
git diff --check
```

The browser suite uses the actual vendored SDK with isolated HTTP responses. It tests absent/local-only sessions, server verification versus forged cached metadata, reload, server failures, retry/focus, expired refresh and accessible error output. Unit tests additionally cover secret-key rejection, timeouts, stale completions and cleanup. These are integration fixtures, not proof of a successful login against a live Supabase project.

Before PR creation, run the branch's CI and inspect its captured output. Record the run in the PR description. Actual Supabase-account verification remains blocked until project configuration is available. NVDA/VoiceOver and actual browser zoom/text-only resize remain manual checks; no full WCAG conformance claim is made.

References:
- https://supabase.com/docs/reference/javascript/auth-getsession
- https://supabase.com/docs/reference/javascript/auth-getuser
- https://supabase.com/docs/reference/javascript/auth-onauthstatechange
- https://supabase.com/docs/guides/getting-started/api-keys
- https://www.w3.org/TR/WCAG22/
