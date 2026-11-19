# FR-36 / DR — Login state and USERDEBUG

User report: successful login, unchanged Log in label and another login request when adding a candle. User confirmed a local server; exact URL/browser/stored account state is unavailable. No account credentials are retained here.

Source failure condition on baseline 9419f11067199470d5ff9ff2a0178ac465c14529: identity verification and view publication shared a catch, so a synchronous observer/render failure could publish checkFailed despite a valid identity and stop later consumers. Own-story ownership was assigned after rendering; a view failure could leave the editor bridge without an owner. This is a reproduced-test target, not proof of the exact user's environment.

Expected chain: persisted verified identity → nickname replaces Log in → synchronized application auth → ready owned candle editor without redirect → save/reload/logout. Isolate view callbacks, reconcile authoritative snapshots, establish ownership before rendering and verify storage readback before claiming success. Keep ownership/expiry/stale-response protection and roll back failed initial registration session setup.

USERDEBUG adds opt-in redacted state visibility, not authentication: `index.html?userMode=USERDEBUG`. USER is the default; `?userMode=USER` or Switch to USER disables diagnostics and clears their trace. Query input values, credentials, account identities/content and raw exceptions are excluded. Logs are bounded to 20 state entries. Diagnostic failures cannot invalidate login.

Golden criteria: [FR-36](../../requirements/requirement.md#fr-36--dr-verified-sessionui-synchronization-and-user-diagnostics). Scenario: [TC-FR-36-01](../../requirements/test-cases.md#tc-fr-36-01). Tests: tests/browser/session-state.test.mjs and tests/unit/application-state.test.mjs, plus existing account/provider regressions. Required exact-head CI, UI/accessibility review and acceptance evidence must be recorded in the separate delivery PR before merging. Manual AT and public deployment remain NOT RUN unless separately verified.


## Output review and verification record

Initial full CI [44521546764](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44521546764) passed on source 8c609918f14b21eb0efa4e5b7b39399316e96289: real local login/header/editor/persistence/logout, queued return, view/observer/logger/storage faults, diagnostic redaction and both modes. All 35 axe scans had zero violations, including two new state/debug scans. The USERDEBUG 320px output was visually reviewed: panel stays in document flow with readable wrapped text and controls; it excludes credential/identity/content values from diagnostics.

That review exposed a separate UI/model drift: a loaded saved candle was displayed while the application model reported none. setAccountStory cleared story state but did not rehydrate it. A verified-account-only ACCOUNT_STORY_RESTORED event now restores the saved ID/persistence. Added a specific saved-state browser assertion and guarded restoration model tests. The first screenshot/run therefore documents the discovery, not final proof of this correction. The final exact-head CI result and artifact must be recorded in the delivery PR; all changed behavior is rechecked there before merge.

Initial diagnostic artifact [14528825167](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44521546764/artifacts/14528825167), digest sha256:d7bdf3804c99958a2fd99b7c47b326dc6497bae76e883645e1bf9a79b999159a, has the workflow's 14-day retention. Re-run after expiry and record new provenance. All data is synthetic; this is implementation evidence, not participant research.

FR-36-AC1/2 map to the actual login/editor/restoration/expiry and view/storage-fault assertions; AC3 maps to USER quiet, USERDEBUG safe fields/history/console, mode persistence and toggle assertions; AC4 maps to the combined behavioral/model/axe/reflow/focus review. Exact user-browser cause, manual screen-reader/real zoom and public deployment remain unverified, even when these local checks pass.
