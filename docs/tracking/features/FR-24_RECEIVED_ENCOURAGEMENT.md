# FR-24 — Received encouragement

The account menu opens a recipient-only inbox with newest events first, sender nickname, localized timestamp, total/unread counts, expandable encouragement and persistent read state. Refresh exposes loading/failure/retry and Load more retrieves 50 at a time. No realtime subscription or background polling cost. Never render user content as HTML. Account changes/sign-out clear private events and invalidate pending requests.

Definer RPCs filter by auth.uid via target-story ownership; callers cannot supply a recipient. Only the recipient can mark an event read. Anonymous invocation is denied. Sender display uses visible story nicknames with Someone fallback. FR-25 adds optional text to the expandable content.

WCAG 2.2 AA before PR: named keyboard panel, heading focus and close return (2.1.1/2.4.3), native details, semantic time, live counts/errors (4.1.2/4.1.3), wrapping/targets/reflow and axe output scans. PostgreSQL tests assert recipient isolation/read authorization; actual-SDK fixtures check list/count/read output. Manual assistive-technology/live deployment checks remain pending. https://www.w3.org/TR/WCAG22/
