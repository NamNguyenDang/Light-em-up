# Light ’em up

An offline community prototype for people in Sweden looking for full-time work, part-time work or an internship, and people who want to encourage them.

## Run offline

Download or clone this repository, then open **index.html** in a modern browser. No installation, build, account or network connection is required. Keep index.html, styles.css, cities.js and app.js together. Storage behavior for file URLs varies by browser; use the same browser and file path to revisit your profile. For consistent local storage, optionally serve this directory with `python3 -m http.server 8000` and open http://localhost:8000.

## Included

- Sweden-only geographic SVG map, searchable city filters and equivalent story list.
- Left map/data and right join panel; stacked responsive mobile layout.
- Public browsing with clearly labeled fictional stories.
- One browser-local profile: nickname, city, encouragement and optional employment details.
- Independent candle and employment states; edit, hide, relight or delete a contribution.
- Local encouragement reactions, demonstration reporting, export and reset.
- Demo dashboard with local counts; no fabricated reach metrics.
- No CDN, external fonts, map tiles or third-party requests.

## Important boundaries

This is a single-browser prototype, not a deployed community service. There is no secure authentication, Google sign-in, email recovery, server database or protected administrator role. The dashboard is visible to anyone using this local copy. Reports are local demonstrations and are not delivered. Never use this prototype for confidential information. No passwords or emails are requested. Sample stories are fictional. The Sweden boundary comes from Natural Earth and is not navigation-grade. City search includes 832 GeoNames place records; it does not cover every settlement. Interface text is currently English.

## Design and Phase 2

- [Feature breakdown](docs/FEATURES.md)
- [Component architecture and interfaces](docs/ARCHITECTURE.md)
- [Design v2 — map, search and warmer dark theme](docs/DESIGN-V2.md)
- [Original design v1 specification](docs/DESIGN.md)
- [Geographic data attribution](docs/ATTRIBUTION.md)
- [Verification and acceptance checks](docs/TESTING.md)

The project is intentionally not published to hosting. Open the files locally to review it.
