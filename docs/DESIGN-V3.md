# Design v3 — Hand-drawn candle and 100-person density review

## Candle asset

Uses the colorized candle approved in this conversation: ivory wax, warm brown hand-drawn outline, amber flame and golden rays. `assets/candle-color.png` is bundled locally. An inline SVG viewport crops its transparent padding at display time, preserving the source image unchanged. The resting state uses a matching wax-outline illustration without a flame or rays. No emoji is used for candle markers or story status.

## Fictional database fixture

`demo-data.js` contains exactly 100 deterministic fictional profiles, not live accounts or actual employment data. 80 candles lit, 20 resting; 29 cities. Dense cases: Stockholm 30, Göteborg 18, Malmö 12, Uppsala 10 and Lund 6. Includes part-time/full-time/internship preferences, longer messages, and a long nickname to test wrapping. First four sample IDs remain compatible with previous local reactions. A user's local profile adds at most one more visible record.

## Overlap handling

- Aggregate people within each city first, then merge nearby city groups using actual map scale and complete marker/hit-target bounds. Recheck separation after each merge.
- Display one large candle and count per group instead of 100 overlapping candles.
- No always-visible city labels competing with candles. A marker's accessible label gives group total, lit count and resting count.
- Clicking or pressing Enter/Space on a multi-city group opens a city chooser; each city entry gives its population and lit count. Selecting a city filters the story list.
- A group with any lit candles uses the warm icon. A fully resting group uses the unlit illustration. The legend explains this distinction.
- Recalculate groups when viewport size changes; keep hit targets at least 56×80 CSS pixels and inside the map viewport.
- Paginate stories at 12 per page with clear range and disabled end controls. City changes reset pagination.
- Long nicknames/messages wrap; status artwork has a fixed column. Dialog lists scroll rather than growing beyond the viewport.

## Verification and limit

Computational checks preserve all 100 profiles exactly once and show 4 non-overlapping groups at desktop/tablet map sizes and 3 at phone map sizes. DOM workflow simulation passes. Browser rendering remains unverified because managed preview is unavailable. National clustering is intentionally coarse on small screens; the city chooser and search expose all underlying people. Zoom can be considered later if people want finer geographic exploration.

## Opinion boxes

> Your opinion — 1, candle artwork: Keep / Change / Comment: …

> Your opinion — 2, grouped lights and counts: Keep / Change / Comment: …

> Your opinion — 3, story pagination: Keep / Change / Comment: …
