# FR-26 — Report and block encouragement senders

Each received event has keyboard-accessible Safety options: a reason selector, report and confirmed block. A failed report/block remains retryable; repeated reports deduplicate. Reporting stores an event reference/reason for project-owner review, without claiming automatic notifications or an active moderation team. Blocking hides existing events from that sender and database enforcement prevents further encouragement to this recipient. Account data is never shown to other accounts.

SQL RPCs derive sender/recipient from the owned event, not a caller-supplied recipient ID. RLS protects block/report records; all security-definer functions pin search_path and explicitly check auth.uid. The project owner can review reports in the database; no public admin endpoint or paid provider is introduced.

WCAG 2.2 AA before PR: native labels/select/buttons/details, reason instructions and confirm/cancel (1.3.1/2.1.1/4.1.2), live result/retry feedback (3.3.1/4.1.3), focus continuation after removing a blocked row (2.4.3), reflow/targets/axe. SQL tests cover recipient-only actions, dedup, blocked-history exclusion/new-send denial and private-record isolation. Browser fixtures test report failure/retry and block cancel/confirm. Manual AT and real-project deployment remain pending; no full conformance claim. https://www.w3.org/TR/WCAG22/
