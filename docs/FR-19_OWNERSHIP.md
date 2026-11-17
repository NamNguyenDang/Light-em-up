# FR-19 — Database authorization

Provide installable SQL schema, city/length/enum constraints, one story per account, and owner-only select/insert/update/delete enforced with RLS. Expose published rows through an explicit public projection without account IDs. Connect the public list/map to that projection and deduplicate the owner's story.

Before PR run PostgreSQL role tests: anonymous direct access denied, spoofed owner and ownership transfer denied, other-account reads/writes/deletes denied, owner CRUD accepted, hidden rows excluded, invalid cities rejected. CI uses real PostgreSQL with an auth.uid stand-in; live Supabase deployment and JWT integration remain pending.

WCAG 2.2 AA: no authorization detail enters user-facing errors; the live public-load status and existing retry/error paths retain 4.1.3/3.3.1, keyboard and reflow coverage. Run all existing browser/axe suites before PR. Reference https://www.w3.org/TR/WCAG22/ and https://supabase.com/docs/guides/database/postgres/row-level-security.
