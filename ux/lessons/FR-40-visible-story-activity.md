# FR-40 — Make community activity visible without inventing it

## Observed stakeholder feedback — 20 November 2026

The project owner said the board feels less positive when they cannot tell whether people are updating their status. They requested visible timestamps and the latest update first, and asked to retain this as a UX lesson. This is owner feedback from the project conversation, not participant research or measured evidence of loneliness/engagement outcomes.

A related visibility lesson came from the account journey: a brief return to the landing page did not communicate whether login succeeded. After FR-39's explicit debug confirmation, the owner confirmed login works and reported that the local server had not been started earlier. That explanation is theirs; there is no captured forensic proof of the old browser state.

## Design decision

Show an absolute Updated date/time with the device's time zone on real stories and the owner's card. Store UTC timestamps on committed meaningful saves and sort newest first before pagination. Preserve creation time; an unchanged save, page visit, reaction or failed save is not new activity. Preserve filtering/focus. Unknown historical update times stay explicitly unavailable. Fictional samples remain labelled and receive no fabricated recent timestamp.

| Option | Tradeoff / decision |
|---|---|
| Visible date/time + newest first | Chosen: makes the reason for ordering inspectable, including across days. |
| Relative text only, such as a few minutes ago | Easy to scan but changes with time and can become ambiguous; defer until validated. |
| A latest-activity badge/count | Could imply a live shared service; avoid without genuine fresh data. |
| Always place samples first or assign them today's date | Would hide actual updates or manufacture activity; reject. |

## Honest boundaries and proposed evaluation

This product remains browser-local: dates reflect its device clock and saved local records, not a shared server clock or evidence that other people are currently online. The optional backend is deferred. No realtime auto-refresh, fake activity, engagement uplift or emotional benefit is claimed.

Implemented behavior is verified against [FR-40 requirements](../../docs/requirements/requirement.md#fr-40--visible-story-updates-and-newest-first-board) and [test cases](../../docs/requirements/test-cases.md#tc-fr-40-01). Automated date/order/storage/accessibility checks are implementation evidence, not a usability study. Manual screen reader, real text enlargement/zoom and representative participant testing remain NOT RUN.

Future research proposal: ask people to identify the most recently updated story, explain the shown time and distinguish a sample from a real saved story; ask how active the board feels before/after without implying an improvement. Record genuine observations before claiming an outcome. Avoid pressure-inducing last-seen indicators or notifications about personal presence.

Lesson: visual warmth alone does not explain whether a board has changed. Pair it with truthful, readable activity cues, then validate whether those cues help people understand the experience.

## Follow-up correction — FR-41 / DR-41-01

The owner then supplied a screenshot of the default fictional sample card, which still had no timestamp. FR-40's real-record-only display/test scope did not cover what they were reviewing. The clarified behavior gives samples fixed, explicitly labelled Demo update dates while preserving actual saved dates/unknown states for real stories. This supersedes the omission of sample dates above, without turning synthetic timestamps into genuine activity. The owner also clarified the information hierarchy: Situation and Seeking are visible; Role and Company are optional disclosure content.

Lesson for verification: test the default visitor/sample screenshot state as well as a newly created owner story. A technically correct persistence test can still miss the requested visible experience. See [DR-41-01](../../docs/tracking/defects/DR-41-01-sample-story-timestamps.md) and [TC-FR-41-01](../../docs/requirements/test-cases.md#tc-fr-41-01). The screenshot is stakeholder feedback, not a representative user study; no emotional improvement is measured.
