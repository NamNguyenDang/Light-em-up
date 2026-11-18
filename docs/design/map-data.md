# Historical province boundary data

The 25 historical Swedish provinces (landskap) are derived from Per Liedman's
[svenska-landskap](https://github.com/perliedman/svenska-landskap) repository,
commit `64f033ea4cab359d6810e27b221ca6b7f10ce649`, retrieved 16 November 2026.
Its README identifies the underlying source as Lantmäteriet's District Map
(Distriktskarta) and declares the data CC0 1.0:
https://creativecommons.org/publicdomain/zero/1.0/ .
These are historical provinces, not the 21 administrative counties.

`frontend/data/provinces.js` includes the source's 25 province names, region membership,
coast-clipped province paths and polygon rings. The paths use the same projection
as the existing city catalog and Natural Earth SVG:
`x = 23 × longitude − 186.5`, `y = 2657.6 − 38 × latitude`.
The projection was verified against 763 uniquely matching GeoNames source cities
with less than 0.006 SVG-unit rounding residual on each axis.

The coast-clipped source (`svenska-landskap-klippt.geo.json`) supplies visual
polygons. Rings are simplified with Ramer–Douglas–Peucker at 0.16 SVG units,
then rounded to three decimals. Preserve `fill-rule="evenodd"` for holes.
The boundary data and the separate Natural Earth terrain outline may differ
slightly at the coast; province outlines are general-purpose map data, not
surveyed or legal boundaries.

`cityProvince` maps the existing 832 city coordinates by point-in-polygon against
the full, unclipped source (`svenska-landskap.geo.json`), retaining holes. No
nearest-province fallback is used. Records outside the source polygons or
matching multiple polygons are `null` and should not be assigned arbitrarily.

Mapping results: 832 mapped; 0 unmatched; 0 ambiguous.

Unmatched selected-place names:
None.

Ambiguous selected-place names:
None.

## Topology verification
All 25 projected/simplified province MultiPolygons were checked with GEOS.
Simplification introduced tiny self-intersections in Södermanland and Västmanland, which were
repaired using GEOS MakeValid; repaired intersections retain six-decimal projected
coordinates. All final province geometries pass GEOS validity checks. All rings
are closed. Coast-clipped source data has no interior holes; rendering still
uses the even-odd fill rule to preserve multipart topology.
