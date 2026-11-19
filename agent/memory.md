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

Track acceptance and tests in [FR-29](../docs/tracking/features/FR-29_ACCOUNT_JOURNEY_RELEASE_BLOCKER.md) and the incident in [account-journey lesson](../docs/lessons/account-journey-defect.txt). Do not close FR-29 when these documents alone are merged.

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

The user requested docs/requirements/requirement.md as the golden file for test creation and expected behavior. Read memory before work and check the established standards. Update stable acceptance IDs, scenarios and traceability for every FR/DR; compare actual results with the contract before closure. A test and implementation can agree with each other and still miss the user's expected journey. Never alter requirements just to hide that discrepancy. Missing manual/live cases remain open; valid links or fixture success do not establish acceptance. See skill.md's mandatory requirement-first cycle.

## Online email setup and cost boundary (18 November 2026)

The user prefers the low-cost/free path. Official pricing and auth-email docs were checked: a Supabase Free project is possible, but its default email sender is restricted to project-team addresses. A public confirmation signup journey therefore needs appropriate sender configuration and actual external-recipient verification. Do not infer working public email from a valid URL/key or a fixture response; preflight is not email delivery acceptance. Email providers have separate limits/pricing; repository merge authorization does not authorize paid billing. References are in requirement/README.md.

## FR-31 organization and local scope (18 November 2026)

The user approved FE/BE separation and a dedicated UX folder to demonstrate UX knowledge. Frontend code/data/styles/assets move under frontend; backend holds only deferred integration. Root entry HTML URLs stay stable. Canonical requirements are docs/requirements/requirement.md; agent guidance is lowercase agent; standards and lessons are separate; historical designs remain archived. Update paths, tests and links atomically and verify actual browser loading. Current delivery is browser-local by user choice: online activation/FR-29 acceptance is deferred/unverified, not a release claim for the local product. UX evidence must distinguish user feedback/code evaluation from planned research and unmeasured outcomes.

## FR-32: demonstrate UX reasoning with evidence (18 November 2026)

The user wants this project to demonstrate UX knowledge. The ux folder must show problem framing, constraints, alternatives, decisions, journeys, validation and learning, with honest contribution/AI-assistance wording. Owner feedback is not a representative user study; automated screenshots/axe checks are not task-success or engagement evidence. Research plans and metrics remain NOT RUN/unmeasured until genuinely executed. Preserve provenance and local-only scope; do not inflate the maturity of deferred online functionality.

## FR-33: analyze and discuss before implementing

The user requested a visible request → analysis/discussion loop → finalized requirements → implementation → test-gap analysis → test execution → requirement/result verification → deployment workflow. When asked to clarify first, pause implementation until the approach is settled. Do not confuse settled scope with needing repeated merge permission. Verify test coverage against the golden contract and distinguish merged, deployed and accepted. See skill.md. The nickname/password design discussion is agreed in principle; this documentation change does not implement or claim tested local authentication.

## FR-34: nickname-only registered local accounts

Finalized with the user: no anonymous account/candle creation, no email collection, normalized unique nickname and password, one account/one candle. This cannot enforce one human/one account, global uniqueness or cross-device use. Use Web Crypto salted PBKDF2, never MD5 or a nickname/password hash as identity/session. Atomic IndexedDB unique index prevents two-tab registration races. A stable random account ID owns one candle; separate expiring random sessions guard private reads/writes. Local storage is not server authorization or encrypted story storage. Nicknames/stories/verifiers still require privacy care. No email means no email recovery. Earlier anonymous candles are not adopted. Provider fixture tests remain explicitly deferred; actual local register/login/save/reload/logout acceptance must pass without mocked authentication.

## Workflow reporting preference (18 November 2026)

The user wants concise black-box checkpoints, not an implementation diary. For each workflow step, report final status (PASS/DONE/FAIL/BLOCKED/NOT RUN), the relevant input, expected/actual output and verification result. Keep progress updates brief and focus on gate transitions; explain internals only for a blocker, a material decision or when asked. In the final response, give a compact per-step status table, PR/result link and any deployment/manual-verification gap. Input/output verification against the finalized golden requirements matters more than descriptions of tools, code paths or repeated test logs. This changes reporting style, not the requirement-first workflow or the thoroughness of the checks.

## FR-35 / DR: unclear account failure and password-policy correction

User reported account creation followed by unexplained login failure using a 13-character password. Do not copy supplied passwords into source, logs or memory. Source diagnosis: FR-34 registration rejected fewer than 15 characters; client validation wrote only an inline field error, left the global alert empty and did not mark the operation failed. Prior tests checked inline text rather than whether the overall output clearly explained that no account was created. The exact user's successful-registration claim cannot be verified from source or their unavailable browser data; do not invent a stored account or provider failure.

User revised new-account policy to 8–128 ASCII letters/numbers, no symbols/spaces and no mandatory mixture. Keep UI instructions, API policy and golden tests aligned. A symbol does not inherently crash safely handled text; reject new input explicitly rather than interpreting or silently changing it. Retain login compatibility for existing passwords under the previous policy. Every validation/credential/storage failure needs a visible, announced operation-level explanation plus field focus/association and retry input. Verify input → account/session state → visible output, including 7/8/13/128/129 boundaries and legacy login, not just the presence of an inline error node.

## FR-36 / DR: verified identity must survive view failures (19 November 2026)

User reported successful login followed by Log in remaining visible and Add your candle asking for login again; confirmed local-server use. Exact browser/origin/stored state was not supplied, so do not claim a confirmed user-specific cause. Source failure condition: local session checking wrapped both identity verification and view publication in one catch; a throwing renderer/subscriber could therefore classify a valid session as checkFailed and stop later consumers. Own-story ownership was assigned after rendering, so a view exception could also leave the editor controller without its owner. Test these conditions explicitly, not just a happy login return.

Keep authoritative session snapshots, UI projection and diagnostic failures separate. Reconcile the UI auth model from verified snapshots; preserve ordinary transition guards and stale-response checks. Verify session-storage readback/identity before reporting login success. Failed new-registration session setup must roll back the new account/session. Verify the complete output chain: persisted identity → nickname header → one ready owned editor → save/reload/logout, including transient view/storage failures.

USER is the default with no application diagnostics. USERDEBUG is explicitly enabled by userMode=USERDEBUG or configuration; show only allowlisted state enums/readiness booleans, build and origin/page. Keep a bounded trace, redact account IDs/nicknames/passwords/tokens/verifiers/stories/messages/raw exceptions and URL query values, and isolate logging failures. USER mode clears/disables diagnostic history without signing out. Debugging must never authenticate a visitor or become an authorization boundary. Keep progress/final reporting to the user's concise black-box step/status/output checks.

FR-36 output-review finding: a persisted candle rendered after reload while application story state remained none. setAccountStory cleared the model on every load but never restored its saved ID/persistence. Rehydrate saved story state only for a verified account and assert it together with header/session/editor readiness. A passing ready-flag or screenshot alone missed this drift; compare each visible result with the model it represents.

## FR-36 remains OPEN; FR-37 offline diagnostic test (19 November 2026)

User explicitly confirmed the original username/Add-your-candle failure still occurs after PR #36 and reported no USERDEBUG panel. Stop treating branch/CI success as closure of that user's environment. Exact served address, build and browser state remain unavailable. User stopped the expanded test investigation and requested a logs folder plus an existing RegrestionTest8 offline regression account with a specified shared test credential. Keep the stopped proof branch separate/unmerged; focus on this concrete diagnostic setup. Do not guess that absence of a cloud backend caused the browser-local failure.

The supplied account is an explicitly requested shared regression fixture, not a personal account: application seed data stores only a salt/verifier. A known fixture input may be used in its dedicated regression test; never write that input to event files, PR descriptions, reports or memory. Do not overwrite an existing nickname/candle when seeding or automatically authenticate it. Logging to project files requires the loopback helper; ordinary browser JavaScript cannot silently write a repository folder. USERDEBUG file transport is opt-in, schema-redacted and independent of login; USER disables new diagnostics. Helper logs must omit identity, credentials, content and raw URL/error data. This local static/logging helper is not a real/shared authentication backend, and another merge does not close the original DR.
