# Design v1 — A little hope, together

## Agreed product principles

The candle belongs to the person. They choose to keep it lit or let it rest independently of employment. Public visitors can read and explore before joining. Nickname, city and encouragement take precedence over profession or employer. City only, no home address. No competition, rankings, streaks or public loss-of-job announcements.

## Layout

Desktop: short centered introduction, then a two-column composition (approximately 64% map / 36% join and context). The left panel contains community totals, Sweden illustration, legend and city filters. The right contains Join us and a secondary route for returning local users. Stories span the width below. Under 850px columns stack; story cards reduce from three columns to two and then one under 520px.

The offline map is an original simplified SVG silhouette with Gotland and Öland indications. City markers are illustrative; interactive city buttons below offer reliable keyboard navigation. Replace the outline with a validated geographic asset before production. Do not interpret the map as exact positioning.

## Visual system

- Background: warm paper `#f7f6f0`.
- Ink: deep green `#233c35`.
- Primary action: forest green `#315d4b` with white text.
- Secondary text: `#62736a`.
- Candle accent: warm gold `#eab969`.
- Typography: system sans-serif for controls and text; Georgia for welcoming headings and messages. No remote font dependency.
- Rounded panels, restrained borders, generous whitespace, no flashing or flame animation.

## Main interactions and states

| Area | Default | Empty/error/special behavior |
|---|---|---|
| Community | Four explicitly fictional stories | City with no story invites first contribution |
| Profile form | Nickname/city; optional message and details | Whitespace-only nickname rejected; native required fields; limits on text |
| My light | Open existing browser-local profile | If absent, open create form |
| Candle | Lit or resting text + symbol | Never modifies work situation |
| Visibility | Contribution included | Hidden contribution excluded from map/list/counts |
| Support | I’m with you | Requires local profile; sent state disabled |
| Report | Local demo report | Says no moderator receives it; duplicate prevented |
| Storage | Local persistence | Warning if inaccessible; session interaction remains available |
| Export/delete | Explicit control | Destructive actions require native confirmation |
| Dialog | Focused form, close control | Native Escape and modal focus behavior |

## Online login design boundary

A live login panel needs Google and one agreed email option. The offline design explains this openly and does not collect passwords or pretend to send recovery codes. Admin is explicitly a demo view, not a protected role.

## Design review preference

Give each review point its own numbered Opinion / reply box so the project owner can respond individually. This records the project preference; it does not claim to update ChatGPT persistent memory.
