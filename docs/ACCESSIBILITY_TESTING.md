# Accessibility regression checks (FR-09)

Run `npm install`, `npx playwright install chromium`, `npm test`, then `npm run test:a11y`.
The browser test serves the site on an ephemeral localhost port. Only fictional test data is used.
CI runs on pull requests and accessibility branches, retains axe JSON and screenshots, and fails on assertions or WCAG-tagged axe violations. No rules are suppressed or violations baselined.

Coverage: 320/375/768/1280px layouts, target dimensions, all-province table, tooltips, dialog errors, post-save/delete and pagination focus, reload persistence, custom text spacing, forced-colors emulation and six simultaneous light levels. Text enlargement in automation is an approximation; it is not a browser zoom conformance test.

## Manual release checklist — not yet verified

- Keyboard only: reach all actions; select provinces using Enter/Space; Escape dismisses tooltip; Tab stays inside open modal; cancelling returns to the invoker; saving/deleting returns to a visible action.
- NVDA with Firefox or VoiceOver with Safari: dialog title, required fields, field errors, map table headers and results announcements are understandable, without repeated or missing information.
- At actual 200% text-only enlargement: no clipped labels, hidden actions or overlaps, including header and open dialogs.
- At actual 400% browser zoom on a 1280px-wide window (320 CSS pixels): no page-level horizontal scrolling; all functions remain available.
- Override line height 1.5, paragraph spacing 2em, letter spacing .12em and word spacing .16em: no lost content.
- Windows High Contrast: boundary, selection and focus indicators remain visible at levels 0–6; keyboard focus is not obscured by tooltip or lights.
- Visually review every screenshot and test pointer movement into the tooltip with magnification.

Record tester, date, browser/assistive-technology versions, pass/fail and linked evidence here before claiming completion. Automated checks cannot establish full WCAG conformance.

Current local status: source/DOM suites pass. Local Chromium launch is blocked by the workspace's socket restrictions; browser and assistive-technology outcomes are pending, not passed.

References: https://www.w3.org/WAI/test-evaluate/ and https://playwright.dev/docs/accessibility-testing

CI evidence for the complete FR-05–10 series: https://github.com/NamNguyenDang/Light-em-up/actions/runs/43876862850. Browser and axe checks passed on Ubuntu 24.04/Chromium, including 320–1280px layouts, targets, tooltips, focus, text-spacing and forced-colors emulation. Screenshots and axe JSON are attached to that run. Only documentation/ignore-rule changes followed that tested source. The manual checklist above remains pending.
