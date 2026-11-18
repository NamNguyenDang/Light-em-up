# Findings and verification plan

These are audit findings and setup/verification gaps, not additional silently implemented FRs. Priority describes impact on confident real use; it is not a legal compliance assessment.

| ID | Priority | Finding and observed evidence | Next step / closure evidence |
|---|---|---|---|
| AUD-01 / FR-29 | Release blocker | User cannot register/sign in/light a candle on the latest default branch. Public config is empty and signup is absent; live schema/provider deployment unverified. | Implement FR-29 and pass the real deployed-origin account/candle journey. Missing config or skipped live checks cannot count as release-ready. |
| AUD-02 | High | Automated checks do not cover actual assistive-technology announcements, real text resize/zoom or every complete process. | NVDA/Firefox or VoiceOver/Safari, keyboard-only full journeys, 200% text-only resize/400% zoom, pointer/touch and forced-colors review; log browser/AT/version/outcome. |
| AUD-03 | Medium | Blocking has no self-service undo/unblock UI. Confirmation exists; the current workaround is an authorized database operation. | Decide an unblock interaction, then verify the account can reverse only its own blocks and affected inbox state refreshes. |
| AUD-04 | Medium | Account deletion and a password-recovery/signup journey are not provided in this FR set. Local demo deletion is a different action. | Decide product requirements; do not advertise account deletion/recovery as present. Test provider setup and accessible recovery when implemented. |
| AUD-05 | Medium | No real-user LCP/INP/CLS data. The map/catalog/sample payload and full rerenders deserve profiling. | Measure representative mobile/desktop journeys and low-end devices. Record evidence before choosing optimization; no fabricated score. |
| AUD-06 | Medium | Public stories/sent history are bounded at 1000; inbox uses offset paging. Current scale is a bounded demo. | Add cursor pagination/dedup and realistic larger-data tests before exceeding this boundary. |
| AUD-07 | Fixed in FR-26 | frontend/src/encouragement/encouragement-ui.js was included twice; multiple subscriptions could race despite backend deduplication. | Removed duplicate and added script-source uniqueness checks on both pages. Exact-head workflow rerun required. |
| AUD-08 | Low | Escape on the nickname trigger itself does not close an expanded disclosure; Escape inside its actions does. | Consider trigger-level dismissal too; verify focus stays on the trigger. This is a usability refinement, not a proven WCAG failure. |
| AUD-09 | Review | User-generated message/story language is not explicitly represented. Interface lang is English; names/cities are not sufficient evidence for arbitrary message language. | Review language-of-parts applicability and known-language tagging/content workflow with AT users. |
| AUD-10 | Medium | The audit caught local-only storage wording on account surfaces; FR-26 corrects the editor/list/privacy notes. Light/candle terminology and help placement still need a broader consistency review. | Content/help consistency review and comprehension tasks; check WCAG 3.2.6 applicability across all process pages. |
| AUD-11 | Operational | Reports are stored for owner review but no automatic notification or staffed queue exists. | Assign a reviewer/process before broad real use, without implying that saving a report guarantees an immediate response. |
| AUD-12 | Architecture decision | No separate BFF is deployed. Browser adapters and database RPCs do not create a server credential boundary. | Retain low-cost BaaS for the present single UI; add a BFF only for a documented need. See architecture audit. |

## Manual completion record

For each task record date, commit, environment/browser/AT versions, viewport/zoom, steps, actual result, issue ID and retest. Leave unchecked tasks open:

- Visitor: skip link, keyboard map/dropdown, text alternative, tooltip hover-to-focus/Escape and list pagination.
- Sign-in: paste/password manager/show password, required errors, cancel/return and real provider round trip.
- Account: restored session, own-story loading/retry, edit/discard, failed save/expiry recovery, hide and sign-out.
- Encouragement: self/sample prevention, send without/with message, retry, inbox newest/count/read, report retry and block cancel/confirm.
- AT: names/roles/states, meaningful sequence, live-status ordering, no unexpected focus moves/traps, language handling.
- Enlargement: real text-only 200%, browser 400%/320 CSS pixels, custom text spacing, portrait/landscape and touch/pointer cancellation.
- Live backend: two-account role boundary, hidden/public data, message privacy, duplicate/self/blocked send rejection and private safety records.

## Evidence integrity

`evidence.json` lists remote PR snapshots and pre-PR push runs, rather than inferring delivery from local worktree SHAs. Check a run's exact head before relying on it. The API fixtures use synthetic identities/content, and PostgreSQL tests supply an auth.uid stand-in; neither proves live provider configuration. Review screenshots and axe JSON alongside logs; zero automated violations does not close AUD-02.
