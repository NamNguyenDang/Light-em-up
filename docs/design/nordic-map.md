# FR-42 — Nordic context and island coverage

Sweden remains the active map. `nordic-context.svg` is a decorative, non-interactive image behind the existing terrain/province layers. The existing Sweden viewBox, geometry, cities, lights, 25 province controls and filtering code are unchanged. The regional crop intentionally gives Sweden prominence; it is not a complete country/territory map. The same muted fill is used for all background land, without activity lights or country flags.

## Reproducible source

- Natural Earth `ne_50m_admin_0_countries.geojson`, scale 1:50m.
- Repository: [nvkelso/natural-earth-vector](https://github.com/nvkelso/natural-earth-vector).
- Source commit: `ca96624a56bd078437bca8184e78163e5039ad19`.
- Source blob: `9d99f26dc470fcdbd08b062c813005acbdf73ccb`.
- [Exact source file](https://github.com/nvkelso/natural-earth-vector/blob/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_50m_admin_0_countries.geojson), retrieved 21 November 2026.
- Extract: [nordic-context.geojson](../../frontend/data/nordic-context.geojson); only names/source IDs and complete selected geometries are retained.
- Generator: [build-nordic-map.py](../../scripts/build-nordic-map.py); manifest: [nordic-context-manifest.json](../../frontend/data/nordic-context-manifest.json).
- [Natural Earth terms](https://www.naturalearthdata.com/about/terms-of-use/) place this data in the public domain; source scale/generalization and accuracy limitations still apply.

Projection matches the existing map: x = 23 × longitude − 186.5, y = 2657.6 − 38 × latitude. No island-area filter, component deletion or further geometry simplification is applied; projected coordinates are rounded to 0.001 SVG units. Every source ring is closed and retained with even-odd fill. Source features contain 32 Norway polygons, 3 Åland, 8 Finland, 17 Greenland, 5 Faroe Islands and 12 Denmark. Small features absent from the generalized source cannot be recovered from it; this is not exhaustive island or cadastral coverage.

## Geography review and presentation

| Area | Handling / review |
|---|---|
| Åland | Explicit separate source feature, unlit background, not painted as Sweden. Finland's [Ministry for Foreign Affairs](https://um.fi/the-special-status-of-the-aland-islands) describes its special autonomous/demilitarised status. It is not described here as an unresolved dispute. |
| Bornholm | Retain the Denmark source polygon; do not drop small Baltic islands by area threshold. |
| Gotland / Öland | Keep the existing Sweden terrain/province data byte-for-byte; background cannot replace those shapes. |
| Svalbard / Jan Mayen | Preserve all Norway source polygons; provide separate geographic views for parts outside the regional crop. [Norwegian Polar Institute mapping reference](https://npolar.no/en/maps/). |
| Greenland / Faroe Islands | Preserve their separate source features and provide independently scaled geographic views. Do not flatten their special status into a country-colour legend. [Danish Ministry reference](https://um.dk/en/foreign-policy/the-arctic/greenland-and-the-faroe-islands). |
| Tartupaluk / Hans Island | Official [Danish foreign-ministry statement](https://um.dk/fnnewyork/en/statements/statement-on-behalf-of-canada-and-the-kingdom-of-denmark-at-the-32nd-meeting-of-splos/) describes the June 2022 boundary agreement. This generalized locator does not resolve or draw that tiny land boundary; do not infer its ownership from the Greenland outline. |
| General boundary policy | Natural Earth's [policy](https://www.naturalearthdata.com/about/disputed-boundaries-policy/) uses a de-facto editorial baseline with alternatives. Attribution is not proof of universal legal agreement. No maritime claims, national flags or legal-status conclusion are added. |

The optional “Map extent & islands” disclosure explains clipping and independent scales and shows labelled Svalbard, Jan Mayen, Greenland and Faroe Island views. These are geographic context, not additional activity-enabled countries. No auto-geolocation, external tile service or backend is introduced. Existing source/scale limitations are visible without treating every boundary as politically authoritative.

## Verification scope

`npm test`, `npm run test:nordic`, structural/path checks, source hash comparison and a static SVG asset-composite review are the available local checks. Local Chromium launch was attempted but is unavailable in this execution environment, so browser interaction/mobile/screen-reader checks are NOT RUN. Static raster review is not a browser screenshot or an accessibility audit.

The owner explicitly waived **Accessibility regression** for PR42. Native `[skip ci]` commit messages skip PR/push execution for this delivery and its merge; `.github/workflows/accessibility.yml` is not edited or disabled. Normal future PR rules continue. Skipped checks are WAIVED/NOT RUN, never PASS. No full WCAG 2.2 conformance or deployment claim is made. See [delivery record](../tracking/features/FR-42_NORDIC_MAP.md).
