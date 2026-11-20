# DR-41-01 — Default sample board had no visible update time

- Status: OPEN / correction in progress.
- Baseline: main 8806ca04e93ed19c653ab21605c08ccf9675df38, PR #40.
- User evidence: screenshot supplied 20 November 2026, sample A new chapter. No timestamp appears; Situation and Seeking are inside expanded See more.
- Expected clarified output: visible timestamp information on the cards the user actually sees; Situation/Seeking outside details; Role/Company inside details.
- Cause: FR-40 intentionally omitted sample timestamps, and verification focused on registered-account dates. That narrow golden contract did not match the default board expectation. This is a scope/output mismatch, not a failed IndexedDB timestamp write.
- Correction: FR-41 explicitly adds stable fictional fixture dates labelled Demo update, while real records keep actual saved Updated/unknown metadata. Core fields are always visible; disclosure contains only optional Role/Company or a precise empty fallback.
- Regression: TC-FR-41-01 / tests/browser/story-card.test.mjs tests the real default visitor screenshot state, all 100 samples, registered/unknown variants and keyboard/reflow/axe. Existing FR-40 persistence/order/rollback cases remain required.
- Closure needs: passing exact-head CI, reviewed default/sample and real-card output, scope update in golden requirements/memory/UX lesson. Manual AT/zoom remain separately unverified.
