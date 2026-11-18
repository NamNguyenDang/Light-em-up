# Light-em-up project memory — FR-28

Repository-local lessons, not a claim of global/persistent assistant memory. Read with the backlog and FR-27 audit before future PRs. Operational PR guidance is in skill.md; these files are delivered separately under FR-28.

## FR-29: a passing fixture suite did not mean a usable release

User report, 18 November 2026: latest default branch could not log in, register an account or light a personal candle. Source inspection confirms empty public Supabase configuration and no registration flow; Add your candle depends on verified auth. Live provider/schema/redirect deployment has not been verified. This is a release blocker, not merely an optional setup footnote.

Avoid repeating this:

- Distinguish code merged, configured/deployed and real user acceptance. Never call all three complete because a PR merged or CI is green.
- HTTP/SDK fixtures and PostgreSQL claim fixtures are implementation evidence; label them as such. They do not validate the real deployed origin or registration.
- Before calling accounts/candles usable, run register -> confirmation if enabled -> sign in -> create/light/save -> refresh -> sign out/in -> persistence/ownership on the actual configured origin, without mocked network routing.
- Missing configuration, missing signup or skipped required live scenarios remain BLOCKED/NOT RUN. Do not mark the release ready, fabricate success, weaken authorization or use the local demo as proof of online behavior.
- Public URL/publishable key may be browser configuration; secret/service-role keys and test passwords must never enter source or PR text. Do not invent provider values or re-suggest the declined Supabase plugin.
- Keep WCAG checks on actual error/confirmation/loading/output states; zero axe violations is not complete WCAG conformance.

Track acceptance and tests in [FR-29](../docs/FR-29_ACCOUNT_JOURNEY_RELEASE_BLOCKER.md) and the incident in [leason_learn](../leason_learn/06_account_journey_release_failure.txt). Do not close FR-29 when these documents alone are merged.

## Autonomous merge and user DR workflow

Confirmed 18 November 2026: no repeated permission is needed to merge passing work in this repository only. The user will randomly check the latest default branch and raise DRs (Defect Reports). Investigate, regress, fix and merge those defects autonomously within the authorized scope. User spot checks supplement our own tests; they do not excuse a broken primary journey or allow a defect to be closed without acceptance evidence. See skill.md for the full workflow.

## Earlier decisions and mistakes to retain

- Merge permission is only for NamNguyenDang/Light-em-up. Use one FR per PR against main; preserve separate feature history, not a combined squash.
- Check the actual default-branch output. FR-06–10 once reached predecessor branches instead of main; PR #10 corrected that.
- A preview is not shipped UI. Preserve the approved candle artwork, compact desktop headline, readable narrow-screen wrapping and agreed invitation/button wording.
- Authentication requires verified identity; a local demo profile is not an account. Account data/drafts must remain separate and ownership enforced by database RLS/RPCs.
- Preserve typed data on failed saves/reauthentication; ignore stale responses after account changes and clear private state on sign-out.
- Dialog focus must be intentional. FR-14 originally focused Close on return; focus now starts at nickname and repeated opening must not reset a draft.
- Side-effecting modules load once. The audit found a duplicate encouragement bootstrap; both pages now have a script-uniqueness check.
- Test assertions must reflect UI state. A FR-25 test accidentally closed the received disclosure before checking visible text; fix the test and rerun, rather than waive the failure.
- Check mutation results before continuing dependent work. Inspect actual PR/main heads after a rejected/transient merge; do not assume a dependency merged.
- BFF is not currently deployed. This is a direct Supabase BaaS application with browser adapters and database authorization. Do not describe a browser facade as a server or add infrastructure just for a pattern label.
- Keep reports honest: stored for project-owner review, without promising active moderation or immediate notification. Do not mislabel online account data as browser-only storage.

## FR-29 remediation boundary (18 November 2026)

The code portion adds signup/confirmation handling, a clearly labelled local candle option when online services are unconfigured, and served-artifact release preflight. Preflight remains release_ready=false even with valid public config; it only permits real live smoke testing. Do not reinterpret the local fallback as an online candle or mark real signup/persistence verified. The report's empty config/missing signup diagnosis describes the original baseline; track actual current code separately. FR-29 stays open until real configuration/provider/schema/redirect checks and the full deployed-origin account journey pass.

## FR-30: golden behavior is the test oracle (18 November 2026)

The user requested requirement/requirement.md as the golden file for test creation and expected behavior. Read memory before work and check the established standards. Update stable acceptance IDs, scenarios and traceability for every FR/DR; compare actual results with the contract before closure. A test and implementation can agree with each other and still miss the user's expected journey. Never alter requirements just to hide that discrepancy. Missing manual/live cases remain open; valid links or fixture success do not establish acceptance. See skill.md's mandatory requirement-first cycle.

## Online email setup and cost boundary (18 November 2026)

The user prefers the low-cost/free path. Official pricing and auth-email docs were checked: a Supabase Free project is possible, but its default email sender is restricted to project-team addresses. A public confirmation signup journey therefore needs appropriate sender configuration and actual external-recipient verification. Do not infer working public email from a valid URL/key or a fixture response; preflight is not email delivery acceptance. Email providers have separate limits/pricing; repository merge authorization does not authorize paid billing. References are in requirement/README.md.
