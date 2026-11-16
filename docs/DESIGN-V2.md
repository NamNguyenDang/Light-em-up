# Design v2 — Warm lights, Nordic evening

## Requested changes

1. Replace the rough silhouette with a recognizable geographic Sweden outline.
2. Expand city coverage and make it searchable.
3. Darken the page and make candles larger, brighter and warmer.

## Implementation

- Natural Earth Sweden polygons are projected to the same local SVG coordinate system as place coordinates. Includes mainland and islands, with other countries removed. No tile service or network dependency.
- Bundles 832 GeoNames place records. City search is case-insensitive and accent-insensitive; `malmo` matches Malmö, `goteborg` matches Göteborg, and `Gothenburg` is an alias. Duplicate names are disambiguated. This catalog is broader than the first eight-city prototype but is not every settlement in Sweden.
- Search results show up to 18 places at a time and announce match count. Refine the query to find more. Selecting an empty city shows its location and the existing empty-story message; it never invents community activity.
- Profile city is a searchable native datalist, validated against the bundled catalog. Stored names from the original eight-city version remain valid.
- Forest-dark background, lighter text, moss-green geography, amber actions. Each lit map marker has a cream candle body, golden flame, pale core and a broad soft halo. Resting candles have no flame or halo.
- Candle state remains separate from employment; words and community intent are retained.
- No animations, external fonts or remote assets. Map credits are linked in the footer.

## Review boxes

> Your opinion — 1, map: Keep / Change / Comment: …

> Your opinion — 2, city search: Keep / Change / Comment: …

> Your opinion — 3, darkness and candle warmth: Keep / Change / Comment: …

## Verification limit

Geographic projection, city catalog, accent matching and local assets receive static/logic checks. Rendered layout and interactive browser QA remain unverified because preview infrastructure is unavailable.
