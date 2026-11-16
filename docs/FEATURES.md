# Phase 2 — Feature breakdown

## Goal and scope

Help people in Sweden feel less alone during a job search. This delivery is an offline, single-browser prototype. It validates the community experience before online identity, moderation and analytics infrastructure are introduced.

| ID | Component / feature | Offline behavior | Online follow-up |
|---|---|---|---|
| F01 | Public welcome | Short explanation, Sweden map left, join panel right | Real community records |
| F02 | Map and city navigation | Natural Earth geographic SVG, 832 searchable GeoNames place records, all-city story list | Extend place coverage if needed; validate catalog freshness |
| F03 | Public story | Nickname, city, encouragement excerpt; optional details under See more | Server-side publication rules |
| F04 | Local identity | One browser-local profile; clear demo notice | Google sign-in and email code or password decision |
| F05 | Contribution editor | Nickname and city required; message prioritized but optional; role, company, situation and work type optional | Owner-authorized CRUD APIs |
| F06 | Candle lifecycle | Lit/resting chosen independently of work situation; relight any time | Synchronize to server |
| F07 | Privacy controls | Hide or delete own local profile; city only | Server deletion, retention and account controls |
| F08 | Supportive reaction | One local reaction per visible story; local profile required | Account-based deduplication, abuse controls |
| F09 | Reporting | Labeled local simulation; no recipient | Moderation queue and resolution workflow |
| F10 | Community totals | Visible candles, lit candles, represented cities; samples included | Aggregates from published records |
| F11 | Admin preview | Local page opens, profile, reactions, reports, shared milestones | Protected admin role; aggregate reach and retention |
| F12 | Local portability | JSON export and confirmed reset | Owner export and server deletion |
| F13 | Accessibility | Semantic forms, native dialogs, text status, keyboard controls, story-list alternative | Formal accessibility audit and user testing |
| F14 | Language | English interface | Swedish/English interface and user-generated language handling |

## State rules

- Candle `lit` does not determine `status`; neither changes the other.
- Visibility hides the candle and story together; the local profile remains editable.
- A hidden profile is excluded from public totals.
- Found-work milestones are self-reported and include labeled samples in this demo.
- No signup required for reading; local profile required to send encouragement.
- No open comments, private messaging, leaderboards or automatic announcements.
- Demo reports are never described as submitted to moderators.

## Acceptance journey

1. Open index.html offline and inspect labeled samples.
2. Filter Stockholm; return to all cities.
3. Add nickname and city, optionally a message and employment information.
4. Extinguish candle without changing employment status; relight it.
5. Refresh on the same origin; verify profile retained when browser storage is available.
6. Hide contribution; verify public counts decrease while My light still edits it.
7. Send support; verify repeated local reaction is prevented.
8. Inspect local dashboard; export then delete/reset demo data.

## Decisions still open

| Point | Recommendation | Opinion / reply box |
|---|---|---|
| Online email authentication | Choose email codes alongside Google | Keep / Change / Comment: … |
| Geographic coverage | Review the 832-place catalog for missing target communities | Keep / Change / Comment: … |
| Public statistics | Aggregate community participation, never inferred unemployment | Keep / Change / Comment: … |
| Moderation | Staff reporting before accepting real public stories | Keep / Change / Comment: … |
| Language | Swedish and English for online launch | Keep / Change / Comment: … |
