# Verification scope

FR-38 preserves the approved design and adds popup previews. It does not implement production authentication popups. The simulation never sends/stores credentials or creates accounts. Automated screenshots are implementation/design evidence, not participant research.

Run `npm run test:wireframe` from the repository root after installing dev dependencies. It starts the Python helper, tests the prototype, then exercises the actual local account transition with no auth mocks. The command fails on unexpected functional, prototype or automated WCAG-tagged axe failures. Its audit JSON separately reports application popup parity as FAIL/OPEN DR-38-01; a successful command is not a complete design acceptance.

Applicable WCAG 2.2 AA checks: 1.3.1 labels/relationships, 1.4.3 contrast, 1.4.10 320px reflow, 2.1.1/2.1.2 keyboard/no trap, 2.4.3 focus order/return, 2.4.7 focus visibility, 2.4.11 focus not obscured, 2.5.8 target size, 3.3.1/3.3.2 errors/instructions, 3.3.8 password paste/show, 4.1.2 name/role/state and 4.1.3 alert/status. Automated evidence covers only a subset. Manual screen reader, real 200% text/400% zoom, text-spacing/forced-colors and broader browser checks remain NOT RUN for this new prototype; no full conformance claim.

Architecture: no new service, network authentication, BFF or trusted server boundary is introduced. Active authentication remains browser-local; preview data is separate from real IndexedDB accounts. No cloud/billing activation, email collection, inbox delivery or one-human uniqueness claim.

Original FR-36 remains OPEN. Deployment and user-browser acceptance are not implied by a merge or by a synthetic local-browser pass.
