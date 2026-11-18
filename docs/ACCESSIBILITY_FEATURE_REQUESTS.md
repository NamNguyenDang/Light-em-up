# Accessibility and UI feature requests

Target: WCAG 2.2 AA. Implementation and validation status are separate. No conformance claim is made.

| ID | Request | Acceptance criteria | Status |
|---|---|---|---|
| FR-01 | Name dialogs | Every dialog is named by its visible heading (4.1.2). | Merged in PR #3; assistive-technology check pending. |
| FR-02 | Accessible province details | Hoverable, persistent, keyboard-accessible details; Escape dismissal (1.4.13). | Merged in PR #3; manual browser review pending. |
| FR-03 | Field-linked validation | Required labels, aria-invalid, associated errors and first-invalid focus (1.3.1, 3.3.1). | Merged in PR #3; screen-reader check pending. |
| FR-04 | Contrasting map states | Boundary, selection and focus visible at levels 0–6 (1.4.11, 2.4.7). | Merged in PR #3; manual visual review pending. |
| FR-05 | Responsive enlargement and reflow | No content loss at 200% text, 320 CSS-pixel viewport or custom text spacing (1.4.4, 1.4.10, 1.4.12). | Implemented separately; CI reflow/text-spacing checks pass; real text resize and zoom pending. |
| FR-06 | Comfortable control targets | Minimum 24×24 CSS pixels or valid exception; aim for 44×44. Province dropdown provides equivalent selection (2.5.8). | Implemented separately; CI target measurements pass. |
| FR-07 | Text alternative to map | All 25 provinces expose story counts, lit/resting counts and each represented kommun’s eligible count and level without hover or brightness (1.1.1). | Implemented separately; DOM and browser checks pass; screen-reader review pending. |
| FR-08 | Predictable keyboard focus | Retain focus through redraws, move to a visible continuation after save/delete and to heading after pagination; announce results (2.4.3, 4.1.3). | Implemented separately; DOM and browser focus checks pass; manual keyboard review pending. |
| FR-09 | Accessibility regression testing | Repeatable axe/browser tests plus documented keyboard, NVDA/VoiceOver, resize, zoom and forced-colors checks. | Automated browser/axe suite passes; manual assistive-technology and real resize/zoom checks pending. |
| FR-10 | Replace remaining sun and refine typography | Welcome heading uses existing candle artwork; keep the preferred bold italic hero at 32–66px and welcome heading to 28–36px at default text size; use one headline line where desktop space permits while wrapping at narrow widths/enlarged text; remove the demo banner and long map-help paragraph; remove forced line breaks and crowded spacing; retain text enlargement and 44px controls. | Merged PRs #9/#10; browser screenshots reviewed; manual assistive-technology checks pending. |

FR-10 is a product presentation request, not an independent WCAG success criterion. Sizes above scale through rem units with user preferences.

Automated evidence for the combined series: https://github.com/NamNguyenDang/Light-em-up/actions/runs/43876862850. FR-05 reached main. FR-06–10 were merged into their predecessor branches; integration PR #10 brought the series to main while preserving its feature commits.

## Application backlog

Each FR targets main through a separate PR and receives a WCAG 2.2 AA cross-check before that PR is opened. Merge authorization applies only to this repository. Automated checks and manual conformance verification remain separate.

| ID | Request | Acceptance criteria / remaining work | Status |
|---|---|---|---|
| FR-11 | Application state | Independent navigation/authentication/story states. | Merged PR #11. |
| FR-12 | Restore session | Verified session, checking/failure/retry. | Merged PR #12; live configuration/verification pending. |
| FR-13 | Sign in | Email/password, optional Google, safe return. | Merged PR #13; live provider verification pending. |
| FR-14 | Add candle entry | Sign in then open editor once; preserve browsing context. | Merged PR #14. |
| FR-15 | Story editor | Prefill/validation/saving/discard guards. | Merged PR #15. |
| FR-16 | Own-story panel | Account-scoped load/save beside map. | Merged PR #16. |
| FR-17 | Save recovery | Account-bound draft, failed/expired-session retry. | Merged PR #17. |
| FR-18 | Sign out | Clear private browser data, leave published story. | Merged PR #18. |
| FR-19 | Ownership enforcement | Owner-only RLS, public projection, constraints and SQL tests. | Merged PR #19; migrations need deployment. |
| FR-20 | Flow regressions | Complete browser/state/SQL matrix. | Merged PR #20; manual AT/real zoom/provider checks pending. |
| FR-21 | Account menu | Nickname disclosure: My story, Encouragement, Sign out. | Merged PR #21. |
| FR-22 | Adaptive welcome | Existing story replaces invitation; one edit action. | Merged PR #22. |
| FR-23 | I'm with you | Account deduplication, no self, retry and SQL enforcement. | Merged PR #23. |
| FR-24 | Received encouragement | Sender/time, newest first, count/unread, pagination/read state. | Merged PR #24. |
| FR-25 | Encouragement message | Optional 600-character message, composer, recipient plain-text reading. | Merged PR #25. |
| FR-26 | Unwanted senders | Recipient-only report/block, retry, blocked-history/new-send rules. | Merged PR #26. |
| FR-27 | Lessons and standards audit | `leason_learn` folder: delivery history, WCAG evidence/gaps, BFF assessment and current website/SaaS UX guidance. | Draft locally; PR not opened. |
| FR-28 | Agent guidance | Agent/memory.md and skill.md capture lessons and future PR rules, discoverable through repository instructions. | Draft memory includes FR-29 incident; guidance/PR pending. |
| FR-29 | Usable registration, sign-in and candle journey | Fix/configure real account flow; prove register/confirmation/sign-in/create-light-save/reload/sign-out-in on deployed origin; fail release readiness on missing config/skipped live tests. | Confirmed release blocker; specification recorded, implementation/live acceptance pending. |

Implementation is merged through FR-26. FR-27 adds the lessons and standards audit. Live service activation is a separate setup step: apply the five numbered SQL migrations, configure public Supabase URL/publishable key and auth redirects, then run real-account tests. No live project was provisioned or modified. Browser SDK fixtures and PostgreSQL claim fixtures test implementation, not live deployment.

The pre-existing presentation/accessibility series reached main through integration PR #10; the older branch-stacking correction above is historical. Manual screen-reader/real zoom checks remain open across the series; no full WCAG conformance claim is made.
