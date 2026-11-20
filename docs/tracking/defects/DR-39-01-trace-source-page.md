# DR-39-01 — Cross-page debug history lost source page/build

- Status: FIXED; real-browser regression passed on 3f1faab70407c82c5c2b2c65f81afd489b6da7c3, [run 44735327193](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44735327193). Final exact-head gate is linked in the delivery PR.
- Related: FR-39-AC2 / TC-FR-39-01. This is not a confirmed cause of original FR-36.
- Source baseline: d4024db, frontend/src/shared/user-debug.js restored history through sanitize(e.state), which unconditionally substituted current page()/BUILD.
- Reproduction: record a sign-in event on signin.html, return to index.html, read UserDebug.history().
- Expected: retained event keeps its captured source page/build; new snapshots describe current page/build.
- Actual baseline: earlier sign-in records were relabelled with the landing page/current build.
- Correction: preserve only allowlisted historical page and validated build while sanitizing all other fields. New snapshots still use the current page/build; no identity/credentials added.
- Regression: tests/browser/login-debug.test.mjs asserts auth.verified and signin.return remain signin.html after return, and login.restored/login.ready are index.html. Helper log schema/privacy checks and USER behavior also pass.
