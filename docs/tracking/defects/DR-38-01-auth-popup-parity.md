# DR-38-01 — Authentication entry leaves the community page

- Status: OPEN; approved-design implementation gap, not a confirmed cause of FR-36.
- Related: FR-38-AC3 / TC-FR-38-02; [design contract](../../../ux/wireframe/state-contract.md).
- Baseline: main e83be45f5bafb2c9bcef42abcbb1db11f23f1a15 (PR #37).
- Reproduction: signed-out community page → Add your candle (or header Log in); choose Create an account.
- Expected: named modal on community page, retained browsing context, nickname initial focus, switch between sign-in/create, cancel/Escape returns focus; verified success updates nickname/personal panel and resumes editor once.
- Source-observed actual: entry navigates to signin.html; registration switches that standalone page. No authentication popup is implemented. Browser audit result is recorded separately in test-results/wireframe-transition-audit.json in CI artifacts.
- Scope: both popup designs are delivered by FR-38; production modal integration needs a separate DR implementation PR and acceptance. Do not copy the simulation into real authentication or bypass persisted identity verification.
- Regression: tests/browser/wireframe-transition.test.mjs verifies real functional transition separately from this FAIL/OPEN presentation audit. Unexpected functional/prototype failures fail CI; known popup gap remains explicitly OPEN.
- Closure gate: production popup, failure/retry, switch/password clearing, checking/busy, context preservation, focus trap/Escape/return focus, verified login/create → nickname → editor → save/reload/logout; real local storage/Web Crypto and relevant WCAG 2.2 AA checks. Manual AT/zoom and original user's FR-36 are separate evidence gaps.
