# FR-22 — Adaptive welcome

A verified account with an existing story sees its own candle and one Edit my story action instead of the invitation and Add your candle controls. New accounts keep the invitation until first save. Hide the legacy browser-demo saved-light link while in account mode. Signing out restores visitor presentation. My story in the account disclosure is navigation to the card, not a duplicate edit action.

WCAG 2.2 AA before PR: native hidden state removes redundant actions from both visual and keyboard/accessibility trees (1.3.1/2.4.3); existing post-save focus lands on the remaining edit action; retain 320px reflow and target tests. Account browser assertions and axe checks cover existing/new accounts and sign-out. Manual assistive-technology check pending. https://www.w3.org/TR/WCAG22/
