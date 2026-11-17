# FR-11 — Application state model

## Scope and acceptance

Keep navigation, authentication and personal-story lifecycle independent. Opening a dialog must preserve the selected province/city, search text and story page. The public Community page remains available while signed out.

`app-state.js` supplies an immutable, provider-independent transition model. `app.js` dispatches navigation, native-dialog open/close, local save, local deletion and demo-reset events. The model is transient; it is not written into the existing browser profile storage.

| Dimension | States | Current integration |
|---|---|---|
| Navigation | Community or local demo dashboard; no dialog, profile editor, information or cluster dialog | Native dialog close events and view controls update the model; background view changes are ignored while a modal is open. |
| Authentication | Signed out, checking, check failed, signing in, signed in, signing out | Starts signed out. The transition contract is tested, but real session checking/sign-in requires FR-12–14 and a chosen backend. |
| Personal story | None, editing, saving, save failed, saved | Local editor, saves, deletes and reset update this dimension; saving distinguishes browser persistence from session-only storage. |

### Invariants

- An existing local profile never authenticates a user. The session state remains signed out until a future real authentication adapter supplies a verified identity.
- Changing one dimension does not silently reset the others. Signing out is distinct from deleting a published story. FR-18 will clear private local data and personal controls when real sign-out is implemented.
- Profile dialogs enter editing; native cancellation returns to saved/none. Saving is guarded and failed saves can retry. A delayed close event cannot close another dialog; a save result received outside saving is ignored.
- Browsing filters and pagination remain in their existing application variables. Dialog transitions do not rewrite them.
- User metadata is reduced to ID and nickname in UI state. Tokens and credentials are not stored in this model.
- This client state model is not an authorization boundary. FR-19 must enforce permissions at the backend.

## WCAG 2.2 AA cross-check before PR

This change introduces no new screen, visual design, text or control. The existing output is checked with the new state integration active.

| Criterion | Check and evidence |
|---|---|
| 2.1.1 Keyboard; 2.1.2 No Keyboard Trap | Browser test opens the editor/information dialog and dismisses each with Escape. Existing native modal behavior and keyboard province selection remain active. |
| 2.4.3 Focus Order; 2.4.7 Focus Visible | Browser assertions verify return to the invoking control after cancellation, and retained focus after save/delete/pagination. Existing contrast-paired focus indicators are unchanged. |
| 1.3.1 Info and Relationships; 4.1.2 Name, Role, Value | Parsed dialog/field association checks and WCAG-tagged axe scans run against the page, map data, open editor and invalid form. |
| 3.2.1 On Focus | State reflection uses non-focusable body attributes and adds no focus-triggered navigation. Existing dialogs open through actions, not by merely focusing a control. |
| 4.1.3 Status Messages | Existing live result/status/error messages are retained. Internal state names are not announced or added to the page's reading order. |
| 1.4.10 Reflow; 1.4.12 Text Spacing; 2.5.8 Target Size | Existing browser assertions cover 320/375/768/1280px widths, spacing overrides and target dimensions. No CSS changes. |

Checks: `npm test`, `npm run test:a11y`, and `git diff --check`. Browser tests run on the feature branch before the PR is opened. CI run and results are recorded in the PR description.

Limits: axe and scripted keyboard checks do not establish full WCAG conformance. NVDA/Firefox or VoiceOver/Safari, actual text-only resize and real browser zoom still require manual verification. Accessible Authentication (3.3.8) will be assessed when the real sign-in interface is implemented; this PR does not claim to implement it.

References:
- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html
- https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html

## Remaining backlog

FR-12–26 remain backlog items. A real authentication/shared-backend choice is still needed. This feature keeps the state model independent of Supabase, Firebase or a custom API.
