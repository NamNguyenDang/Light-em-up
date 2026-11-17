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
