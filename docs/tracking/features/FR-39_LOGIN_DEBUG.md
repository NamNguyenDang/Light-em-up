# FR-39 — Is login actually successful?

Status: implementation and verification in progress. The original FR-36 user-browser DR remains OPEN. The supplied account is not a default seed; a passing isolated test after explicit test registration does not prove it exists in another browser, tab or origin. No account/password is silently created/reset by this change.

## Run and inspect

From the repository root run `python3 scripts/serve-local.py`. Open the printed index.html?userMode=USERDEBUG URL. Keep the same host/port/browser while testing. Start at header Log in, then submit the account you registered on that origin.

- Debug-only toast after verified return: **Login successful. Local session verified.**
- USERDEBUG has a readable login result plus session, uiAuth, headerIdentityShown and ownStoryReady. Expand **Recent state transitions**. The toast lasts five seconds; the result/history remain inspectable without a time limit. It does not move keyboard focus.
- Helper files: logs/browser-events-YYYY-MM-DD.jsonl, UTC day/server arrival time. Look for the events below and their captured page. Browser history is bounded to 20 entries; the file preserves earlier events. Network/file arrival can differ slightly from browser event order; do not use timestamp proximity as an account identifier.
- USER mode has no debug toast/history or new diagnostic file writes. No passwords, nicknames, IDs/tokens, verifier/salt or story text are logged. Logging failure does not decide authentication.

| Event | Code / meaning |
|---|---|
| auth.attempt / auth.rejected | frontend/src/account/local-accounts.js: signIn; credentials checked, rejection is generic. |
| auth.verified | Same service: signIn → begin → identity; password matches, random session persisted and read back. This is the local service result, not a server response. |
| signin.return | frontend/src/account/local-signin-ui.js: done; UI has rechecked identity, then location.replace returns to index.html. |
| login.restored | frontend/src/shared/user-debug.js observes verified LightEmUpSession plus matching rendered nickname on index.html. This triggers the debug toast once. |
| login.ready | UI auth state, nickname and owned editor readiness agree. Story loading may finish after credential success. |
| signin.failed / login.returnFailed | UI check or returned page failed; no success confirmation. Inspect session/error output and retry. |

There is **no active server authentication backend**: frontend/src/account/local-accounts.js uses IndexedDB accounts/sessions and sessionStorage. scripts/serve-local.py serves files and stores redacted diagnostic events; it does not validate passwords. The backend folder is deferred integration. No paid/cloud service is enabled.

There is **no separate login-success page**. The visible route is index.html (visitor) → signin.html → index.html (verified account state). Header nickname replaces Log in; the visitor invitation disappears and the personal candle action becomes available. Approved auth-popup parity remains OPEN DR-38-01.

## Verification boundary

TC-FR-39-01 / tests/browser/login-debug.test.mjs runs the actual helper, IndexedDB/Web Crypto and supplied test inputs. It first proves absent-account failure, then explicitly registers in isolated test storage and checks real sign-in. Wrong password, session write/readback failure, expired/spoofed marker, reload, USER, unavailable file sink and throwing observer are separate negative/fault cases. CI artifacts include login-debug-acceptance.json, login-debug-logs/, axe-login-debug-320.json and a screenshot.

WCAG 2.2 AA cross-check: existing polite role=status toast, persistent readable debug result, no focus movement, 320px reflow, visible keyboard focus/44px controls and WCAG-tagged axe scan. Screen reader announcement timing, real zoom/text resize and broader browser checks remain NOT RUN; no full conformance claim. No BFF or trusted server boundary is introduced. Merge, deployment and original user-browser acceptance remain separate.
