# DR-38-02 — Prototype password not cleared on mode switch

- Status: fix implemented; re-verification pending.
- Scope: FR-38 popup prototype only; not production auth or a diagnosis of FR-36.
- Reproduction: enter synthetic sign-in password → switch to Create account → inspect hidden sign-in password immediately.
- Expected: password cleared before next dialog opens; nickname preserved.
- Actual: browser run [44706995357](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44706995357) failed at the password-cleared assertion; clearing waited for asynchronous native close event. Run 44707356704 confirmed the same ordering gap on Escape; cover every exit path.
- Correction: clear password synchronously on switch, cancel/Escape, explicit close and success; retain close-event cleanup. No authentication/data-store change.
- Regression: TC-FR-38-01 / tests/browser/wireframe-transition.test.mjs checks cleared password and preserved nickname after switching, plus Escape/return focus.
