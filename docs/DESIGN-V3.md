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


## Corrected visual reference (16 November 2026)
The supplied reference supersedes the earlier green card layout. The main page
now uses a midnight-blue background, cream serif headline to the left, a large
faceted blue Sweden map with a fine gold coast, and a rounded right-hand panel
with the amber Add my light button, quote, North star sample story, and city search.
Map points remain live data, with six municipal light levels. Decorative lights
are not added to imply nonexistent users. Existing stories and local profile
controls remain available below the hero. The terrain is a procedural SVG based
on the credited geographic outline, not the reference image pasted into the UI.

Verification: existing 100-profile checks, local workflow simulation and all
light thresholds pass. Full rendered browser QA is unverified because the managed
preview relay is unavailable. This is an implementation of the supplied visual
direction, not a claim of pixel-for-pixel equivalence.


## Province labels and page hierarchy
The headline now sits above the map. The welcome panel begins alongside the
map panel on desktop and follows it on small screens. The map displays all
25 historical landskap, with region-colored labels: Norrland (9), Svealand (6),
and Götaland (10). Leader lines identify approximate province locations without
claiming boundary polygons. City names remain in profile search and stories;
they no longer label map markers. Municipal eligibility and light thresholds
are unchanged. Province labels are descriptive, not province-level totals.


## Selectable provinces
Each of the 25 historical province boundary paths is now a pointer and keyboard
selection target with hover, focus and selected states. Province labels also
select the same area. A dropdown provides the same choices on small screens.
Selection filters stories, resets pagination, updates the live selection status,
and can be cleared. Selecting a city clears province selection, and All Sweden
clears either filter. Lights are decorative overlays so they do not intercept
province clicks; kommun brightness calculation is unchanged.


## Approved image preview
The approved review image sets the desktop composition: centered headline above
a framed map on the left and a compact welcome card to its right. Province
names appear in a tooltip on pointer hover or keyboard focus, with no permanent
labels or leader lines. Lit stories appear as warm points at each selected
place, regardless of employment status. Stories sharing a place share its dot
and count. An own-story ring and map confirmation identify the local addition.
Saving already triggers the render; location clustering and level-zero dimming
were removed from this visibility path. Six found-work brightness levels remain.


## Approved six-level land lighting
Each province now receives a warm, translucent gold wash at the highest kommun
level represented in that province. The wash uses the exact province path,
preserves terrain beneath it and has no exterior blur. Zero is fully dark.
Opacity progresses through .06, .12, .20, .29, .40 and .52. Hover and selection
boundaries remain independent overlays. A six-step legend mirrors the approved
lighting review image, and province tooltips expose the current land level.
