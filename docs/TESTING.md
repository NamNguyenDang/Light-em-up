# Verification

## Automated / static

Run `node --check app.js` to validate JavaScript syntax.

No build or package installation is required. All application assets use relative local paths. There are no network calls, third-party scripts or imported fonts. Story text is rendered with textContent rather than HTML interpolation.

## Manual browser acceptance checklist

- Desktop: map left, join right; city buttons and stories readable.
- Mobile: stacked panels, no horizontal overflow.
- Create a profile, refresh, edit and reopen it.
- Required nickname rejects empty and whitespace-only values.
- Toggle candle while keeping work status unchanged.
- Hide and show profile; inspect public totals and city marker.
- Support a story; attempt repeat support.
- Report a story and verify local-only notice.
- Export local JSON and confirm expected fields.
- Cancel then confirm delete/reset.
- Use Tab and Escape through dialogs and details.
- Verify strings resembling HTML appear as literal text.
- Deny browser storage; verify explicit warning and session-only behavior.

Execution results are recorded below after verification. Unexecuted checklist items are not claims of passing tests.

## Execution results — 2026-11-16

- PASS: `node --check app.js`.
- PASS: HTML parser validated local stylesheet and script paths, unique IDs and required app DOM references.
- PASS: no remote resource references in application HTML/CSS/JS.
- BLOCKED: rendered browser QA. Managed preview reported `preview relay unavailable`. Desktop/mobile rendering and interactive checklist remain unverified. This is an environment limitation, not a passing browser test.
