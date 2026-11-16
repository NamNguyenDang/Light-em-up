# Verification

## Automated / static

Run `node --check app.js` to validate JavaScript syntax.

No build or package installation is required. All application assets use relative local paths. There are no network calls, third-party scripts or imported fonts. Story text is rendered with textContent rather than HTML interpolation.

## Manual browser acceptance checklist

- Desktop: map left, join right; city buttons and stories readable.
- Mobile: stacked panels, no horizontal overflow.
- Create a profile, refresh, edit and reopen it.
- Required nickname rejects empty and whitespace-only values.
- Toggle candle while keeping work status unchanged.
- Hide and show profile; inspect public totals and city marker.
- Support a story; attempt repeat support.
- Report a story and verify local-only notice.
- Export local JSON and confirm expected fields.
- Cancel then confirm delete/reset.
- Use Tab and Escape through dialogs and details.
- Verify strings resembling HTML appear as literal text.
- Deny browser storage; verify explicit warning and session-only behavior.

Execution results are recorded below after verification. Unexecuted checklist items are not claims of passing tests.

## Execution results — 2026-11-16

- PASS: `node --check app.js`.
- PASS: HTML parser validated local stylesheet and script paths, unique IDs and required app DOM references.
- PASS: no remote resource references in application HTML/CSS/JS.
- BLOCKED: rendered browser QA. Managed preview reported `preview relay unavailable`. Desktop/mobile rendering and interactive checklist remain unverified. This is an environment limitation, not a passing browser test.

## Design v2 checks — 2026-11-16

Run `node scripts/verify.mjs` plus `node --check app.js` and `node --check cities.js`.

PASS: 832 unique place labels, projected coordinate bounds, original sample city compatibility, accent-insensitive and alias search, no-match state, result limit, HTML IDs/app selectors, local file references, no remote runtime resources, and five key text/background pairs at a minimum 4.5:1 calculated contrast.

Browser QA remains BLOCKED: `sites-preview status` reports preview relay unavailable. These logic/static checks do not verify rendered screenshots, native datalist behavior, mobile layout or full keyboard interaction.


## Candle and 100-profile density review — 2026-11-16

- PASS: `node --check app.js`, `node --check demo-data.js`, `node --check map-layout.js`.
- PASS: `node scripts/verify.mjs`: 100 fictional records with unique IDs and known cities; no count loss or duplication in clustering. Complete marker bounds and pairwise separation pass for map viewports 388×600, 362×560, 270×530 and 220×530. Results: 4, 4, 3 and 3 map groups respectively.
- PASS: `node scripts/runtime-test.mjs`: full app startup in a dependency-free DOM simulation, 12-record pagination and last page, cluster activation, required nickname, local create/edit/hide, candle independence, reaction deduplication, reload persistence and reset.
- Browser/screenshots: BLOCKED by missing managed preview relay. These are computational layout and simulated DOM checks, not screenshot or native browser verification. Text wrapping, native datalist behavior, visual icon appearance and responsive rendering still need a real browser review.

## Kommun light volume
Run `node scripts/light-level-test.mjs` for all thresholds (including zero),
100 fictional eligible users (Malmö 55 → level 3; Stockholm 45 → level 2),
Stockholm 600 → level 6, eligibility exclusions and explicit kommun grouping.
Only visible profiles with `status: 'Found work'` and `lit: true` contribute.
Ranges are 1–10, 11–50, 51–100, 101–200, 201–500, 501+.
The original 100-profile demo remains mixed-status; tests use isolated fixtures.
Cluster glow previews the highest kommun level, never a sum across kommuner.
Individual counts and levels are exposed in marker labels and the group picker.

Current data limitation: `kommun` is supported as the authoritative grouping
field, but existing profiles and the 832-place catalog only contain `city`.
Those records fall back to the selected place. A verified place-to-kommun
mapping is needed before claiming official municipality-wide totals.
Visual browser QA remains outstanding; runtime checks use a DOM simulation.


## Province selection
The runtime suite loads provinces.js and tests all 25 boundary controls for
click selection, aria-pressed state, correct story counts and empty states.
It also exercises Enter/Space activation, province dropdown selection, clear,
and city selection clearing the province filter. Province assignment uses the
selected city point within the source polygons, not nearest-centroid guessing.
This is a place-point lookup: a city or municipality crossing a historical
province boundary cannot be divided from a city-only profile.

Run `node scripts/province-test.mjs` to verify all 25 province paths, regional
membership, all 832 place assignments, all 100 demo profiles and representative
known province matches.

## Main-page column regression
Run `python scripts/layout-test.py` (requires lxml) to inspect the parsed HTML,
not a simulated DOM. It asserts that map and welcome panel are the two sibling
grid children, city search stays inside the welcome panel, stories follow the
grid and the dashboard remains outside the community view. This catches the
misplaced closing tags that previously made the welcome panel full width.
Desktop column sizing now caps the welcome panel at 460px with a 32px gap;
smaller screens use one column at 760px and below.
