# Component architecture and interfaces

## Offline component responsibilities

| Component | Receives | Provides | Storage / trust boundary |
|---|---|---|---|
| Page shell | Navigation selection | Community and demo-dashboard views | Public local document |
| Map / city navigator | Visible profile records, city catalog | Selected city filter | Projected city coordinates, no home location |
| Story list | Filter, visible records, local reaction state | Details, reaction intent, report intent | User text rendered with textContent |
| Profile editor | Current local profile | Validated profile or delete intent | No credentials collected |
| Candle model | User-selected lit and visible flags | Independent state, public visibility | Never infer employment |
| Local repository | State object | Read/write JSON in localStorage | Untrusted, browser-local, not authorization |
| Aggregate view | Visible profiles and local events | Counts with explicit demo labels | No real visitor identification |
| Export/reset | User action and confirmation | Download or local reset | Does not affect other browsers |

`frontend/src/app.js` contains these small responsibilities as functions for the prototype. `frontend/data/cities.js` bundles the offline GeoNames place catalog. `frontend/data/demo-data.js` contains 100 fictional profiles. `frontend/src/community/map-layout.js` groups nearby cities until their complete candle hit-target rectangles are separated at the current rendering scale. Cluster buttons provide exact lit/resting counts and a city chooser. The story list paginates at 12 records. `index.html` owns semantic structure and `frontend/styles/styles.css` owns responsive presentation. Keep offline dependencies at zero.

## Local data contract

Storage key: `light-em-up-v1`.

- State: `profile | null`, `reactions: storyId[]`, `reports: storyId[]`, `opens: number`.
- Profile: `id`, `nickname`, `city`, `message`, `lit`, `visible`, `status`, `seeking`, `role`, `company`.
- Sample profiles are bundled constants with `sample: true` and are never presented as real people.
- Reactions/reports are unique by local story ID. They are not globally deduplicated.
- `opens` counts page initializations, not unique people or sessions.
- Malformed storage falls back to a fresh state; writes failing show a session-only warning.

## Future provider / receiver ports (design only)

| Provider | Receiver | Proposed interface | Required rule |
|---|---|---|---|
| Public community service | Map/story client | GET /api/stories?city=&cursor= | Published fields only; pagination |
| Community aggregation service | Public counts | GET /api/community/stats | Counts from visible records; no presence inference |
| Identity provider / auth service | Signed-in client | Auth session, Google callback, email-code verification | Verified identity, bounded attempts, expiry |
| Profile service | Profile editor | GET/PUT/DELETE /api/me/profile | Authenticated owner only; validate limits and city |
| Reaction service | Story actions | PUT/DELETE /api/stories/{id}/support | Account-based uniqueness and rate limits |
| Reporting service | Community members | POST /api/reports | Store minimal reason and target; acknowledge actual delivery |
| Moderation service | Admin console | GET /api/admin/reports; PATCH /api/admin/reports/{id} | Server-enforced admin role and action audit |
| Analytics service | Admin dashboard | GET /api/admin/analytics?from=&to= | Aggregated, defined metrics and restricted access |
| Privacy service | Account settings | Export and account deletion workflows | Verify owner and document retention |

For the online build, do not reuse client-side profile IDs as authenticated identity. Do not treat a hidden dashboard button as access control. Keep secrets out of browser code. Define error contracts, pagination, concurrency/version handling and rate limits before implementation.
