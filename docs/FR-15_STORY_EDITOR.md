# FR-15 — Candle/story editor

Opening a new candle starts with an empty nickname/message and Stockholm as the suggested city; an existing local story pre-fills all fields and candle/visibility choices. Nickname and a known city are required, with inline errors and focus on the first invalid field. The current persistence adapter remains browser storage, with the established explicit session-only fallback when storage is unavailable.

Track a baseline of the editable values in memory. Close and Escape ask before discarding changed fields; cancelling preserves the form. Clean forms close immediately. Reload/navigation receives the browser's unsaved-change warning where supported. No extra draft data is written to storage in this FR; reauthentication draft recovery is FR-17.

Saving exposes a live status and a busy, disabled save button; editable fields and deletion are temporarily disabled. Repeated submit events cannot produce a second write or reset the draft. Close/Escape is ignored until the save settles. The local adapter finishes synchronously; a Promise-returning adapter is supported without adding an artificial delay. Any future network adapter must bound/abort its own request and settle its Promise. A thrown/rejected write restores the prior story, keeps the entered draft, announces the failure and returns focus to Save for retry. A successful save updates the personal card and map immediately and returns focus to Edit my story.

## WCAG 2.2 AA cross-check before PR

Reference: https://www.w3.org/TR/WCAG22/

- 2.1.1, 2.1.2, 2.4.3: native keyboard dialog, explicit initial nickname focus, Escape/Close discard confirmation, post-save focus, keyboard retry.
- 3.3.1, 3.3.2, 3.3.3: persistent labels/required indicators, linked inline errors, known-city suggestions, draft-preserving save error.
- 4.1.2, 4.1.3: native disabled fields and busy save button; separate live saving status and error alert. Keep the live status outside a busy ancestor so updates can be announced.
- 1.4.10, 1.4.12, 2.4.7, 2.5.8: rerun responsive reflow/text spacing/focus/target-size regressions, scan the actual saving and failed-save DOM and review screenshots.

Before PR: application/runtime tests including duplicate writes, failure rollback, discard decisions and unload guard; all existing session/sign-in/entry tests; actual Chromium keyboard discard/retry and saving-state tests; axe scans of both added states. NVDA/VoiceOver, real text-only resize/zoom, live accounts/provider and shared backend persistence remain unverified. No full WCAG conformance claim.
