# WCAG 2.2 AA audit

Target: WCAG 2.2 levels A and AA. Scope: index/sign-in, map/text alternative, editor, account disclosure, inbox, composer and sender safety. Audited against the implementation and automated output, not a live configured service.

There are 55 A/AA criteria in this matrix. Obsolete 4.1.1 is excluded; AAA criteria are outside the chosen target. **Evidence** means implemented behavior with source/automated evidence, not a full criterion pass. **Review** means incomplete verification or an identified design question. **N/A** is scoped to present features and must be reassessed if those features change. No overall conformance percentage or certification is calculated.

A conformance assessment covers full pages and complete processes, not isolated axe scans. Manual AT, real zoom/text resize and provider checks remain open. The exact criterion wording is in the [W3C Recommendation](https://www.w3.org/TR/WCAG22/); the observations below are project-specific.

| Criterion | Level | Assessment | Implementation/applicability | Evidence and open check |
|---|---|---|---|---|
| 1.1.1 | A | Evidence | Text map covers province/kommun counts and levels; candle art decorative. | frontend/src/app.js renderMapData; browser axe/map-data; manual AT pending. |
| 1.2.1 | A | N/A | No prerecorded audio-only/video-only content in current app. | Reassess if media is introduced. |
| 1.2.2 | A | N/A | No prerecorded synchronized media. | No caption evaluation required for present scope. |
| 1.2.3 | A | N/A | No synchronized video content. | Reassess with any video. |
| 1.2.4 | AA | N/A | No live synchronized media. | Reassess with live media. |
| 1.2.5 | AA | N/A | No prerecorded video requiring description. | Reassess with media. |
| 1.3.1 | A | Evidence | Native headings, labels, named dialogs, field error associations and map table. | dialog-accessibility-test.py; axe states; manual reading order pending. |
| 1.3.2 | A | Review | Map/welcome and stories have logical DOM containment. | layout-test.py checks order; AT reading sequence still required. |
| 1.3.3 | A | Review | Form and map instructions use text/names, not just position or brightness. | Review all new inbox/composer/safety instructions with AT. |
| 1.3.4 | AA | Review | Responsive layout has no orientation lock. | Real portrait/landscape device evaluation pending. |
| 1.3.5 | AA | Evidence | Nickname and sign-in autocomplete metadata; credentials accept paste. | signin-browser-test.mjs; real password manager/autofill pending. |
| 1.4.1 | A | Evidence | Lit/resting labels, explicit levels/counts, error text and sent/read labels. | runtime/light-level/browser tests; manual color-independent task check. |
| 1.4.2 | A | N/A | No automatic audio. | Reassess if audio is added. |
| 1.4.3 | AA | Evidence | Key text color pairs checked; axe scans tested outputs. | verify.mjs and axe; exhaustive visual review of every state pending. |
| 1.4.4 | AA | Review | Rem-based typography and approximate doubled-text browser regression. | Real 200% text-only resize not completed. |
| 1.4.5 | AA | Review | Main interface uses real text; artwork/brand handled separately. | Inspect terrain/artwork for any essential baked-in text. |
| 1.4.10 | AA | Evidence | 320px through desktop no-overflow assertions and responsive dialog layouts. | browser/accessibility and account tests; real 400% zoom still pending. |
| 1.4.11 | AA | Evidence | Paired dark/light focus and map indicators with contrast assertions. | dialog-accessibility-test.py; forced-colors output; manual all-state review. |
| 1.4.12 | AA | Evidence | Text spacing override regression checks for overflow. | browser-accessibility-test.mjs; manual clipping/overlap review pending. |
| 1.4.13 | AA | Evidence | Province tooltip persists across hover, supports focus and Escape. | runtime/browser tooltip regressions; AT/device review pending. |
| 2.1.1 | A | Evidence | Buttons/selects/native dialogs/details and SVG province keyboard handlers. | Browser keyboard form/menu/filter/inbox paths; full manual walk pending. |
| 2.1.2 | A | Review | Native modal containment; Escape/Close and bounded send requests. | Exercise every cancel/discard/error and real provider path with keyboard. |
| 2.1.4 | A | N/A | No single-character application shortcuts. | Escape and standard Enter/Space activation are not character shortcuts. |
| 2.2.1 | A | Review | SDK refresh and session recovery; drafts retained for 30 minutes. | Verify actual expiry, long reauthentication, retention explanation and any time limits. |
| 2.2.2 | A | Review | No auto-updating carousel or scrolling feed; reduced-motion CSS. | Verify transient status duration does not hide essential information. |
| 2.3.1 | A | Review | Static candle art and no designed flashing sequence. | Manual visual inspection; no flash-analysis claim. |
| 2.4.1 | A | Evidence | Skip-to-stories link and semantic landmarks. | Source and browser checks; confirm shortcut with AT. |
| 2.4.2 | A | Evidence | Distinct descriptive index and sign-in page titles. | index.html and signin.html; source review. |
| 2.4.3 | A | Evidence | Initial nickname, field errors, post-save/close/menu/inbox focus handling. | runtime/browser tests; full zoomed/AT sequence still pending. |
| 2.4.4 | A | Review | Named community/login/credits and meaningful button destinations. | Manual contextual link-purpose review across all documents. |
| 2.4.5 | AA | Review | Small public site with community navigation; sign-in is a process step. | Evaluate alternate ways to all non-process pages as content grows. |
| 2.4.6 | AA | Evidence | Visible headings, required/optional labels and named dialogs. | Parsed HTML/axe checks; user comprehension study pending. |
| 2.4.7 | AA | Evidence | Explicit focus-visible outlines, paired contrast and forced-color styles. | Source/browser checks; inspect every control at real zoom. |
| 2.4.11 | AA | Review | Native dialog scrolling and no intended fixed overlay over focused controls. | Manual focus-not-obscured evaluation at 400% zoom required. |
| 2.5.1 | A | Review | Equivalent province dropdown; no required multi-point gesture. | Real touch testing not completed. |
| 2.5.2 | A | Review | Native click/up activation, confirmations for destructive actions. | Test pointer down/away/up cancellation on real touch/pointer devices. |
| 2.5.3 | A | Evidence | Visible control labels generally provide accessible names. | Axe/source checks; speech-control label-in-name review pending. |
| 2.5.4 | A | N/A | No device-motion activation. | Reassess if motion sensors are added. |
| 2.5.7 | AA | N/A | No required dragging interaction; selection uses click/key/dropdown. | Future map pan/zoom must offer non-drag alternatives. |
| 2.5.8 | AA | Evidence | Measured default target dimensions; equivalent map dropdown; 44px design aim. | Browser layout/target regressions; all safety controls need touch review. |
| 3.1.1 | A | Evidence | Both application pages declare English. | index.html and signin.html lang attributes. |
| 3.1.2 | AA | Review | Interface English; user-generated stories/messages may use other languages. | Language-of-parts/content-language handling not established; finding AUD-09. |
| 3.2.1 | A | Evidence | Focus alone does not trigger sign-in navigation or form submission. | FR-14 entry tests; review all new controls manually. |
| 3.2.2 | A | Review | Selection filters results with status feedback; saving is explicit. | Confirm updates remain understandable with AT. |
| 3.2.3 | AA | Review | Brand/community navigation consistent; sign-in deliberately limits account controls. | Manual comparison across pages and zoomed menus. |
| 3.2.4 | AA | Review | Actions have consistent labels in main flows. | Legacy light/candle and demo/account terms need content review. |
| 3.2.6 | A | Review | Community/privacy help exists in main footer; sign-in support is limited. | Assess consistent help placement on sign-in and future pages; do not mark passed. |
| 3.3.1 | A | Evidence | Inline field errors and persistent failed-write/composer alerts. | Runtime/sign-in/account/axe tests; AT announcement review pending. |
| 3.3.2 | A | Evidence | Visible labels, required/optional text, city suggestions, message length help. | HTML/source/browser tests; evaluate instruction comprehension. |
| 3.3.3 | AA | Evidence | Actionable city/nickname/retry messages preserve entered fields. | Failed-save/send fixture tests; manual clarity check. |
| 3.3.4 | AA | Review | Discard/delete/block confirmation and editable/hideable story. | Account deletion/undo paths limited; review all stored-data operations. |
| 3.3.7 | A | Evidence | Prefilled story and account-bound draft recovery avoid re-entry. | Draft/unit/browser tests; real reauthentication still unverified. |
| 3.3.8 | AA | Evidence | Password metadata/paste/show password; no cognitive puzzle introduced. | Sign-in tests; actual provider, password manager and AT checks pending. |
| 4.1.2 | A | Evidence | Named native dialogs/forms/details, expanded disclosure and busy/disabled state. | HTML plus axe for tested states; live AT verification still required. |
| 4.1.3 | AA | Evidence | Live session/results/saving/error/inbox/send feedback regions. | Browser DOM/axe coverage; actual announcements and competing updates pending. |

## Reproduce the automated portion

Run the workflow in `.github/workflows/accessibility.yml`: it installs the pinned browser/axe SDK dependencies, applies numbered migrations to PostgreSQL, runs role enforcement tests and all state/HTML/browser suites. Download its `accessibility-results` artifact for axe JSON and screenshots. Account/API fixtures are not live-account verification.

See [verification and findings](../findings.md) for exact evidence, priorities and manual completion tasks, and the CSV beside this file for a reusable checklist.
