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
| FR-10 | Replace remaining sun and refine typography | Welcome heading uses existing candle artwork; keep the preferred bold italic hero at 32–66px and welcome heading to 28–36px at default text size; use one headline line where desktop space permits while wrapping at narrow widths/enlarged text; remove the demo banner and long map-help paragraph; remove forced line breaks and crowded spacing; retain text enlargement and 44px controls. | Separate visual-review PR; browser screenshots reviewed; user visual approval pending. |

FR-10 is a product presentation request, not an independent WCAG success criterion. Sizes above scale through rem units with user preferences.

Automated evidence for the combined series: https://github.com/NamNguyenDang/Light-em-up/actions/runs/43876862850. FR-05 reached main. FR-06–10 were merged into their predecessor branches; a correction PR targets main and preserves the original feature commits.

## Application backlog

Each FR targets main through a separate PR and receives a WCAG 2.2 AA cross-check before that PR is opened. Merge authorization applies only to this repository. Automated checks and manual conformance verification remain separate.

| ID | Request | Acceptance criteria / remaining work | Status |
|---|---|---|---|
| FR-11 | Application state | Independent navigation, authentication and story states. | Merged PR #11. |
| FR-12 | Restore session | Verify restored identity, expose checking/failure/retry. | Merged PR #12; public provider configuration/live checks pending. |
| FR-13 | Sign in | Accessible email/password and optional Google, safe return navigation. | Merged PR #13; live-provider checks pending. |
| FR-14 | Add candle entry | Verified users enter editor; visitors sign in then return once; preserve public browsing context. | Merged PR #14. |
| FR-15 | Story editor | Empty/prefilled fields, required validation, saving feedback, duplicate prevention, unsaved discard warning. | Implemented in this feature; see FR-15_STORY_EDITOR.md for evidence and limits. |
| FR-16 | Own-story panel | Show own story next to map; refresh immediately after saving. | Backlog; local-demo panel exists, account-aware integration remains. |
| FR-17 | Save recovery | Keep drafts on failed saves or expired sessions; reauthenticate and retry. | Backlog; in-dialog failed-write retention starts in FR-15. |
| FR-18 | Sign out | End session, clear private local data, return to public landing; published story remains. | Backlog. |
| FR-19 | Ownership enforcement | Backend validates identity and authorizes owner-only story writes. | Backlog; requires deployed backend configuration. |
| FR-20 | Flow regressions | Cover auth/story state transitions and accessibility in complete journeys. | Backlog; incremental tests accompany each FR. |
| FR-21 | Account menu | Nickname replaces Log in; My story, encouragement and sign out actions. | Backlog; verified nickname display already exists. |
| FR-22 | Adaptive welcome | Hide invitation/Add controls for users with a story; one clear edit action. | Backlog. |
| FR-23 | I'm with you | One reaction per story/account, no self-reaction, retry on failure. | Backlog; existing reactions are local demos. |
| FR-24 | Received encouragement | Count/list newest first, sender/time, read state, open attached message. | Backlog. |
| FR-25 | Encouragement message | Optional message sent with encouragement and readable by recipient. | Backlog. |
| FR-26 | Unwanted senders | Report/block unwanted encouragement senders. | Backlog. |
