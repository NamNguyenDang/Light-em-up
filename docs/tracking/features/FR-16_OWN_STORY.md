# FR-16 — Account story beside the map

A verified account loads only its own story from the stories API. Loading failures expose a live status and retry; the editor waits for loading rather than accidentally overwriting an unknown existing story. Public province filters do not hide the personal panel. Account saves update the panel/map immediately, and never replace the browser's separate demo profile. Unconfigured visitors keep the offline demo.

The SDK repository bounds requests with AbortController. Database enforcement/schema is supplied by FR-19; until deployed, the panel honestly reports unavailable data rather than fabricating a server save.

WCAG 2.2 AA before PR: check 2.1.1 keyboard edit/retry, 2.4.3 initial/return focus, 4.1.3 loading/failure/save announcements, 1.4.10 reflow and existing focus/target/error regressions. Run all previous suites plus account-browser-test.mjs using the real SDK against isolated HTTP fixtures. Review actual account output and axe scan. Manual assistive technology/live database checks remain pending. Reference: https://www.w3.org/TR/WCAG22/.
