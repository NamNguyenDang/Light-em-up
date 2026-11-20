# DR-41-01 — Default sample board had no visible update time

- Status: FIXED; behavioral/default-board and full regressions passed on ba1db9b1559db20a6a046457034263179fb54d82 in run 44754698324. Final exact-head gate is required in the delivery PR.
- Baseline: main 8806ca04e93ed19c653ab21605c08ccf9675df38, PR #40.
- User evidence: screenshot supplied 20 November 2026, sample A new chapter. No timestamp appears; Situation and Seeking are inside expanded See more.
- Expected clarified output: visible timestamp information on the cards the user actually sees; Situation/Seeking outside details; Role/Company inside details.
- Cause: FR-40 intentionally omitted sample timestamps, and verification focused on registered-account dates. That narrow golden contract did not match the default board expectation. This is a scope/output mismatch, not a failed IndexedDB timestamp write.
- Correction: FR-41 explicitly adds stable fictional fixture dates labelled Demo update, while real records keep actual saved Updated/unknown metadata. Core fields are always visible; disclosure contains only optional Role/Company or a precise empty fallback.
- Regression: TC-FR-41-01 / tests/browser/story-card.test.mjs tests the real default visitor screenshot state, all 100 samples, registered/unknown variants and keyboard/reflow/axe. Existing FR-40 persistence/order/rollback cases remain required.
- Closure needs: passing exact-head CI, reviewed default/sample and real-card output, scope update in golden requirements/memory/UX lesson. Manual AT/zoom remain separately unverified.

## Verified output

[Run 44754698324](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44754698324): all 100 sample dates are visible, deterministic and unchanged after reload; Situation/Seeking are visible while details are closed; real Role/Company expand through native keyboard disclosure, with focus/open state retained after rerender. Actual/unknown date variants and literal-text safety pass. Four WCAG-tagged scans (sample/owner, 320/1280px) report zero violations; card screenshots reviewed. No full manual AT/zoom conformance claim or measured emotional benefit is made.

The final regression additionally asserts the signed-in sample card retains its disabled Sample story action while showing date/core fields, matching the reported card context. This avoids relying solely on a default visitor or newly saved owner.
