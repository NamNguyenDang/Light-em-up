# FR-42 — Nordic context delivery record

## Scope

Muted Norway, Finland, Denmark and separately encoded Åland behind the existing Sweden terrain. The SVG viewBox and active Swedish geometry/data are unchanged; no new neighbor story dots, clicks or tab stops. All selected Natural Earth 1:50m polygon/ring components are retained. Regional cropping and independent island-view scales are disclosed in the optional Map extent & islands panel. Outlying views show Svalbard, Jan Mayen, Greenland and the Faroe Islands.

[Sources and geographic review](../../design/nordic-map.md), [golden contract](../../requirements/requirement.md#fr-42--nordic-background-with-sweden-in-focus), [test cases](../../requirements/test-cases.md#tc-fr-42-01).

The existing Sweden terrain/province/city/light code is unchanged. Background data is generalized and not a legal boundary or all-island completeness claim. No external tile/API dependency, account/data migration, new BFF or live service activation.

## Input/output verification

| Check | Actual result / boundary |
|---|---|
| Source identity | Pinned commit ca96624a56bd078437bca8184e78163e5039ad19 and verified blob 9d99f26dc470fcdbd08b062c813005acbdf73ccb. |
| Geometry preservation | PASS: source polygon/ring/vertex counts match generated paths; no area filtering/simplification. Explicit Åland and Bornholm checks pass. |
| Offshore views | PASS: Svalbard 9 polygons, Jan Mayen 1, Greenland 17, Faroe Islands 5; all included source vertices/rings retained. |
| Sweden baseline | PASS: terrain, provinces and city data SHA-256 match the pre-feature baseline; git diff also confirms application/light-layout code untouched. |
| Projection/layering | PASS: established transform and viewBox, background before land/terrain, pointer-events none, no focusability, source/extent/scale information present. Static/source checks only. |
| Local npm test | PASS: application/model/runtime simulation, light-level/province/data/layout/static checks and new Nordic data checks. These are not real-browser acceptance. |
| Structural paths/traceability | PASS after adding this delivery document; structural checks are not behavior evidence. |
| Static visual review | Combined generated Nordic background + unchanged Sweden terrain rendered with librsvg/sharp. Sweden remains prominent; source coast/island shapes visible. Not a browser screenshot, hover test or audit. |
| Local browser | NOT RUN: Chromium launch attempted but could not start in this execution environment; no fabricated browser success. |
| Accessibility regression workflow | WAIVED / NOT RUN by explicit owner instruction for PR42. Native [skip ci] feature and merge commit messages; no workflow configuration changes. |
| Full browser/axe/manual AT/real zoom | NOT RUN. No full WCAG 2.2 conformance claim. |
| Public deployment | NOT RUN; merge and deployed output remain separate. |

Available commands: `npm test`, `npm run test:nordic`, `python3 scripts/check-paths.py`, `python3 scripts/check-requirements.py`. The final PR links the tested exact source commit and records the scoped CI skip. Native skip applies to this delivery, not to later PRs.

## Review notes

The initial offline static check rejected an external source-credit URL in index.html. Credit now appears as plain text in the map information and complete links live in the repository source/review document; the application remains self-contained. Existing offline/static regression assertions were retained; the source-credit output was corrected. Workflow equality is checked against the base in the delivery review rather than permanently locking future legitimate CI edits with a map test.
