# FR-36 / DR — Login state and USERDEBUG

User report: successful login, unchanged Log in label and another login request when adding a candle. User confirmed a local server; exact URL/browser/stored account state is unavailable. No account credentials are retained here.

Source failure condition on baseline 9419f11067199470d5ff9ff2a0178ac465c14529: identity verification and view publication shared a catch, so a synchronous observer/render failure could publish checkFailed despite a valid identity and stop later consumers. Own-story ownership was assigned after rendering; a view failure could leave the editor bridge without an owner. This is a reproduced-test target, not proof of the exact user's environment.

Expected chain: persisted verified identity → nickname replaces Log in → synchronized application auth → ready owned candle editor without redirect → save/reload/logout. Isolate view callbacks, reconcile authoritative snapshots, establish ownership before rendering and verify storage readback before claiming success. Keep ownership/expiry/stale-response protection and roll back failed initial registration session setup.

USERDEBUG adds opt-in redacted state visibility, not authentication: `index.html?userMode=USERDEBUG`. USER is the default; `?userMode=USER` or Switch to USER disables diagnostics and clears their trace. Query input values, credentials, account identities/content and raw exceptions are excluded. Logs are bounded to 20 state entries. Diagnostic failures cannot invalidate login.

Golden criteria: [FR-36](../../requirements/requirement.md#fr-36--dr-verified-sessionui-synchronization-and-user-diagnostics). Scenario: [TC-FR-36-01](../../requirements/test-cases.md#tc-fr-36-01). Tests: tests/browser/session-state.test.mjs and tests/unit/application-state.test.mjs, plus existing account/provider regressions. Required exact-head CI, UI/accessibility review and acceptance evidence must be recorded in the separate delivery PR before merging. Manual AT and public deployment remain NOT RUN unless separately verified.
