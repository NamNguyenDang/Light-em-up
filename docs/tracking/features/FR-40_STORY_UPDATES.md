# FR-40 — Story update dates and newest-first board

Each committed meaningful local story save carries UTC created_at/updated_at metadata from the local account service. Creation time is preserved; legacy creation remains unknown. Caller dates are ignored. No-op saves, reads, cancel, login/reload and failed transactions cannot refresh recency. Hidden stories retain metadata for their owner and remain absent from public stories.

The filtered board sorts valid known updated_at descending before pagination, retains stable ties/undated order, and places unknown/invalid dates last. A saved update returns pagination to the first page while preserving the active filter and focus convention. Dates are shown using time datetime plus a readable device-zone date/time on public and own cards. Sample dates are never invented. An undated actual story says Update time unavailable.

The active source is browser-local IndexedDB; device-clock timestamps are not a trusted server clock, no shared realtime feed or full edit history is added. Deferred backend schema/adapters remain unchanged; undated provider fixtures are explicitly unknown. Nothing in this feature activates a backend or changes map light rules, account ownership or local-reaction availability.

## Requirement / checks

[FR-40 golden contract](../../requirements/requirement.md#fr-40--visible-story-updates-and-newest-first-board), [TC-FR-40-01](../../requirements/test-cases.md#tc-fr-40-01), [UX lesson](../../../ux/lessons/FR-40-visible-story-activity.md).

Run npm run test:story-updates. Unit checks cover valid/invalid chronology and stable ties. The actual-helper browser case registers two isolated accounts, saves/updates/reloads stories and checks dates/order, filters, focus, pagination, hidden content and no-op/cancel behavior. Controlled clock and direct legacy/malformed-record/transaction-abort probes are labelled; authentication/storage are real in the principal journey. Local reactions are disabled and cannot generate activity. Existing regressions retain map/ownership and separately labelled provider fixtures.

WCAG 2.2 AA cross-check: time semantics and readable text (1.3.1), existing small-text contrast (1.4.3), 320px reflow (1.4.10), keyboard/focus retention and visibility (2.1.1, 2.4.3, 2.4.7, 2.4.11), and existing save/result announcements (4.1.3). New timestamp is ordinary readable content, with no noisy live clock. Axe/screenshot evidence is automated, not full conformance; manual screen reader, real zoom/text enlargement remain NOT RUN. No BFF/server security boundary is introduced.

UX feedback is stakeholder evidence, not a participant study or measured improvement in emotional connection. User now confirms the local login issue works after starting the server; their explanation is recorded without retroactive forensic proof.

Status: implementation complete; CI behavioral/exact-head evidence will be linked in the separate delivery PR. Artifacts: story-updates-acceptance.json, axe-story-updates-320.json and desktop/320px screenshots. Public deployment/online activation remain NOT RUN.
