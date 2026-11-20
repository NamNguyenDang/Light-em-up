# UI state / transition contract

User approved the visitor and successful-login community wireframes on 20 November 2026 and requested sign-in/create-account popup designs and transition testing. These are two account states of the same community page. The popup designs extend that baseline; current implementation parity is reported separately.

| State / input | Visible output / next action |
|---|---|
| Visitor | Header Log in; visitor invitation; public map/filter/stories; no owned editor. |
| Visitor clicks Log in | Sign-in popup, nickname focused, background inert. No authentication from opening it. |
| Visitor clicks Add your candle | Same sign-in popup with editor-return intent. Cancel restores the visitor/browsing context. |
| Switch to Create account | Create-account popup; preserve nickname, clear password, focus nickname; no email. |
| Invalid/missing input or failed credentials | Popup stays open, actionable alert/associated field error, first-invalid focus, retry input retained. Never claim success. |
| Verified sign-in/registration, no existing candle | Close auth popup; show verified nickname and personal empty panel on community page; Add opens owned editor without another login. Consume an editor-return intent once. |
| Verified account with saved candle | Own story/status plus one edit action, not a second candle. Reload preserves ownership/state. |
| Close/Escape/cancel | Close popup, clear password, return focus to invoker; keep public browsing context. |
| Checking session/story | Explicit checking/loading state; protected action waits, not an unexplained login loop. |
| Logout/expired session | Clear private state and restore visitor header/panel; saved account candle remains persisted. |

Normal USER mode has no debug overlay. Offline scope, no recovery/cross-device claim, one account/one candle and privacy rules remain governed by the golden requirements. Local encouragement inbox/shared delivery remains deferred and is not drawn as a working menu action.

## Verification layers

1. **Prototype:** popup structure, switching, validation, focus, close, previewed success and the saved-candle variant. These tests validate the design simulation, not real authentication.
2. **Actual app:** existing fixture login, header, editor, save/reload/logout and return intent using real IndexedDB/Web Crypto. Also inspect the actual auth presentation (popup versus navigation) and browser history restoration.
3. **Defect audit:** report mismatches as FAIL/OPEN with actual/expected evidence and a DR ID. A completed audit command or successful prototype is not a passing application contract. A new-popup implementation gap must be classified as an approved-design gap, not invented as the original browser-specific cause.

Golden/test references: [FR-38](../../docs/requirements/requirement.md#fr-38--wireframe-baseline-auth-popups-and-transition-audit), [TC-FR-38-01](../../docs/requirements/test-cases.md#tc-fr-38-01), [TC-FR-38-02](../../docs/requirements/test-cases.md#tc-fr-38-02).
