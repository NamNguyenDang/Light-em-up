# Verification scope

FR-38 preserves the approved design and adds popup previews. It does not implement production authentication popups. The simulation never sends/stores credentials or creates accounts. Automated screenshots are implementation/design evidence, not participant research.

Run `npm run test:wireframe` from the repository root after installing dev dependencies. It starts the Python helper, tests the prototype, then exercises the actual local account transition with no auth mocks. The command fails on unexpected functional, prototype or automated WCAG-tagged axe failures. Its audit JSON separately reports application popup parity as FAIL/OPEN DR-38-01; a successful command is not a complete design acceptance.

Applicable WCAG 2.2 AA checks: 1.3.1 labels/relationships, 1.4.3 contrast, 1.4.10 320px reflow, 2.1.1/2.1.2 keyboard/no trap, 2.4.3 focus order/return, 2.4.7 focus visibility, 2.4.11 focus not obscured, 2.5.8 target size, 3.3.1/3.3.2 errors/instructions, 3.3.8 password paste/show, 4.1.2 name/role/state and 4.1.3 alert/status. Automated evidence covers only a subset. Manual screen reader, real 200% text/400% zoom, text-spacing/forced-colors and broader browser checks remain NOT RUN for this new prototype; no full conformance claim.

Architecture: no new service, network authentication, BFF or trusted server boundary is introduced. Active authentication remains browser-local; preview data is separate from real IndexedDB accounts. No cloud/billing activation, email collection, inbox delivery or one-human uniqueness claim.

Original FR-36 remains OPEN. Deployment and user-browser acceptance are not implied by a merge or by a synthetic local-browser pass.

## Executed result — 20 November 2026

Behavioral source: `9fa0a0606d20c30482f51efb1c2917bac2d53924`; [CI run 44708086211](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44708086211). Final delivery PR must additionally reference a passing exact-head full regression run; this recorded behavioral run is not a claim that later commits were tested.

| Input / expected output | Observed result |
|---|---|
| Visitor / empty-owner / saved-owner design states | PASS; side-by-side standalone wireframes and saved-state switch. |
| Sign-in/create popup, invalid input, error retry, switch, close/Escape and focus | PASS after DR-38-02 fix; passwords clear on all exits and keyboard stays inside modal. |
| Desktop/320px popup and page output | PASS; screenshots and seven WCAG-tagged axe scans with zero violations. Manual AT/real zoom gaps remain. |
| Actual visitor Add → existing-account sign-in → nickname and owned editor | PASS; actual local helper, IndexedDB/Web Crypto, no auth mocks. |
| Actual visitor Add → create account → nickname and owned editor | PASS; synthetic account in isolated test storage. |
| Save → reload → edit → logout | PASS for both account journeys; persisted owned story, restored saved state, visitor header/private-panel clearing. |
| Actual authentication presentation versus approved popup | FAIL / OPEN [DR-38-01](../../docs/tracking/defects/DR-38-01-auth-popup-parity.md); app still navigates to standalone signin.html. |
| Prototype password-clearing timing | Fixed and regression PASS / CLOSED [DR-38-02](../../docs/tracking/defects/DR-38-02-prototype-password-switch.md). |
| Original user's FR-36 browser / deployment | OPEN / NOT RUN; synthetic test success does not close either. |

CI artifacts include wireframe screenshots, axe-wireframe-*.json and wireframe-transition-audit.json. Artifact retention is 14 days; permanent design source and this scoped result remain in git. These are automated implementation checks, not a usability study. No production authentication code changes are included in FR-38.
