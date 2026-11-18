# FR-14 — Authentication-aware Add your candle

The Add your candle action now opens the existing editor only for a server-verified Supabase identity. Visitors, missing configuration and failed session checks go to the sign-in page. A local browser profile is not an authenticated identity.

If a session check is pending when the user activates the action, queue one action and expose a busy/disabled button until the result arrives. Do not open over another modal or reset an already-open editor.

A successful sign-in returns through the allowlisted `index.html#add-candle` intent. Consume and remove the intent before opening the editor, so refresh/auth-event replay cannot open it again. Cancellation uses an actual link target without this action hash, preventing loops or unintended editor opening.

Preserve only public browsing context (province, city, city-search text and page) in tab-scoped session storage for at most ten minutes. Validate names/page bounds, clamp pagination through the existing renderer and consume the snapshot once. No credentials or story drafts are stored in that context. If storage is unavailable, authentication/intent navigation still works; preserving filters is best effort.

The session module exposes only a subscription to its minimal immutable status/identity snapshots, not its SDK client or tokens. This is UI routing, not authorization. Server-backed story ownership is still FR-19. The existing explicit local saved-light control remains a demo editor until the later personal-panel work; its workflow regression tests are separate from the authenticated Add your candle tests.

## WCAG 2.2 AA cross-check before PR

- **2.1.1 / 2.4.3:** keyboard activation starts sign-in or the editor; success places focus inside the named native editor; cancellation returns to Community without an editor loop. Existing dialog close focus behavior remains.
- **3.2.1:** no authentication navigation occurs merely on focus. Passive signed-out restoration does not redirect visitors. Automatic editor entry follows the explicit sign-in return intent only.
- **4.1.2 / 4.1.3:** pending entry uses native disabled and aria-busy state; the existing live session status explains the wait. Editor naming/field error associations remain unchanged.
- **1.4.10 / 2.5.8 / 2.4.7:** no layout change; existing responsive, target-size and paired focus styles remain under browser regression checks.
- **3.3.8:** the existing sign-in page retains password-manager metadata and paste; rerun the sign-in accessibility suite.

Before opening the PR, run all existing state/session/sign-in/editor and axe suites plus `node tests/unit/candle-entry.test.mjs`. The actual-SDK fixture browser tests cover unauthenticated/local-only profiles, cancellation with retained filters/page, verified return/autofocus, one-shot consumption and direct signed-in entry. Ten WCAG-tagged axe output scans remain in CI.

Manual screen-reader, real browser zoom/text-resize and live Supabase-provider verification remain pending. Configuration is still blank; fixtures do not imply active real-account authentication or full WCAG conformance.

References: https://www.w3.org/TR/WCAG22/ and https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html
