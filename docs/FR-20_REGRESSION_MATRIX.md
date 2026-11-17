# FR-20 — Complete-flow regression coverage

Each feature is checked before its PR. CI runs dependency-free state/data/HTML tests, real PostgreSQL policy tests, and Chromium with the actual vendored Supabase SDK against isolated HTTP fixtures. No browser fixture is evidence of a live provider/database deployment.

| Journey | Automated evidence |
|---|---|
| Visitor browsing and local demo | runtime-test, browser-accessibility-test |
| Session checking/restoration/failure/expiry/retry | session-test, session-browser-test |
| Sign-in validation/cancel/return/password metadata | signin-test, signin-browser-test |
| Add candle while signed out/checking/signed in | candle-entry-test, signin-browser-test |
| Account load failure/retry; no adoption of local story | account-browser-test |
| Existing/new editor; invalid nickname/city before write | runtime-test, account-browser-test |
| Async failure/duplicate submit/unsaved discard | runtime-test, browser-accessibility-test |
| 503/401 draft preservation, refresh recovery, retry | draft-test, account-browser-test |
| Hidden own story, filter independence and immediate save | account-browser-test |
| Sign out clears private state, preserves published story | account-browser-test |
| Backend owner/anon/cross-account/hidden visibility | supabase/tests/stories.sql |
| Reflow at 320/375/768/1280 and account at 320/1280 | browser-accessibility-test, account-browser-test |
| Native dialog/error/focus/status and automated WCAG checks | axe JSON artifacts for each tested output |

## Manual checks still required

NVDA with Firefox or VoiceOver with Safari; focus and announcements through complete flows; real 200% text-only resize/400% zoom; password manager and real provider authentication; deploy migrations in a test project and exercise real JWTs from two accounts. These remain explicit gaps, not full WCAG conformance claims. Target remains WCAG 2.2 AA: https://www.w3.org/TR/WCAG22/.

Future encouragement/menu/moderation FRs extend this matrix with their own tests.
