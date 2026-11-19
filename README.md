# Light-em-up

A local browser experience for sharing a little hope during a job search: explore Sweden, create a browser-local candle/story, choose lit/resting state, edit or hide it. Sample stories are labelled. Data stays in this browser/origin; there is no active online account/shared service.

## Run locally

From the repository root, run `python3 -m http.server 8000` and open http://localhost:8000/. Keep using the same origin/browser for local persistence. Root index.html/signin.html URLs are preserved; no frontend build or backend is required.

## Find your way

| Folder | Contents |
|---|---|
| [frontend/](frontend/README.md) | Browser code/styles/data/artwork. |
| [backend/](backend/README.md) | Deferred optional schema and database tests. |
| [ux/](ux/README.md) | UX case study, research plan, journeys, decisions and evidence. |
| [docs/](docs/README.md) | Requirements, tracking, standards, lessons, design history and licenses. |
| [tests/](tests/README.md) | Executable verification. |
| [agent/](agent/skill.md) | Working rules and memory, discovered through AGENTS.md. |

Start product work with [golden requirements](docs/requirements/requirement.md), [test scenarios](docs/requirements/test-cases.md) and [backlog](docs/tracking/backlog.md). The [organization map](docs/organization.md) explains the folder migration.

## Verify

Install Node dependencies with `npm install` and Python HTML validation with `python3 -m pip install lxml==6.0.2`. Run `npm test` and `python3 scripts/check-requirements.py`. Browser tests use Playwright: install its Chromium locally or use an installed Chrome with PLAYWRIGHT_CHANNEL=chrome. CI records the browser version and runs all database/state/browser/axe checks.

Supabase integration is retained but unconfigured/deferred. Tests using SDK HTTP responses or PostgreSQL claim fixtures do not prove online signup or shared persistence. No paid service or cloud activation is part of the local product. Manual accessibility/real zoom and future online acceptance gaps remain documented; no full WCAG conformance claim is made.

### Registered local accounts (FR-34)

Open index.html through a localhost/HTTPS static server. Browse without an account; register a unique nickname and a 8–128-character password to create one candle. No email is collected. Accounts/candles stay in this browser on this site; clearing site data removes them, and password recovery/cross-device login are unavailable. Local login separates profiles but does not encrypt browser data or verify one person. Earlier anonymous candles are not adopted. Cross-device encouragement/inbox and optional online services stay deferred.

Run `npm run test:accounts` for real local account acceptance (no auth/network mocks); `CHROMIUM_PATH` optionally selects a local Chromium executable. Historical provider/component fixtures remain separate from active acceptance.

### USER / USERDEBUG

Normal mode is `USER`: no application diagnostic panel or logging. Open `index.html?userMode=USERDEBUG` on your local server to enable a visible browser-state panel and bounded, redacted console/history events. It shows session, UI authentication, navigation, story and candle readiness plus build/origin/page; it excludes credentials, account details and story content. The mode follows the sign-in return in the same tab.

Use **Refresh state** to inspect the current snapshot. **Switch to USER**, or `index.html?userMode=USER`, removes the panel and clears diagnostic history without signing out. `userMode` can also be set to `USER`/`USERDEBUG` in frontend/config/supabase-config.js. This flag does not grant authentication. Browser-generated errors are separate from application diagnostic logging.

Run `npm run test:session-state` to verify login → nickname → owned editor → persistence, negative/fault states and both diagnostic modes.
