# FR-23 — I'm with you

Verified users send one encouragement per real story. Self-reactions and labelled sample stories are disabled; visitors sign in first. Pending requests cannot duplicate, failures retain a retryable action, success/already-sent status persists across reload via account history. Account changes discard stale completions.

Database policies independently reject self/sender spoof/hidden targets; unique(story_id,sender_id) prevents duplicates. Sent history is private to the sender. PostgreSQL tests assert these rules; actual-SDK fixtures cover failure/retry/success UI. Existing local demo reactions remain explicitly local.

WCAG 2.2 AA before PR: labelled native controls/busy-disabled state (4.1.2), live pending/result/error feedback (4.1.3), keyboard/focus restoration (2.1.1/2.4.3), reflow/targets and axe regression. Manual assistive-technology/live database checks pending. https://www.w3.org/TR/WCAG22/
