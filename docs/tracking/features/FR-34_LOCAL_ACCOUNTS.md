# FR-34 — Registered local account acceptance

Finalized scope: nickname/password only, no anonymous candle creation, one account/one candle in this browser/site. No email, MD5, cross-device identity, password recovery, trusted server authorization or encrypted story storage is claimed. Optional online integration/FR-29 remains deferred and unverified. Cross-device encouragement is not active in local mode.

## Golden contract and results

[FR-34 criteria](../../requirements/requirement.md#fr-34--nicknamepassword-local-accounts-active-scope) are exercised by [TC-FR-34-01](../../requirements/test-cases.md#tc-fr-34-01) and tests/browser/local-accounts.test.mjs. Run `npm run test:accounts` after installing dependencies/browser support.

| Criterion | Actual automated result | Scope |
|---|---|---|
| FR-34-AC1 | PASS: real registration/login, no email input/provider requests, normalized duplicate errors and one concurrent-registration winner; nickname/password boundaries | Actual IndexedDB/Web Crypto; synthetic data |
| FR-34-AC2 | PASS: verifier independently matches Node PBKDF2; unique salts, 600,000 iterations; stored session digest matches SHA-256 of separate token; logout revokes it, malformed/expired sessions fail closed | Local cryptographic/storage behavior, not server security |
| FR-34-AC3 | PASS: stable single owner candle survives save/reload/logout/login; second account isolated, foreign private read/write denied, hidden candle absent from public view; failed save preserves draft; legacy anonymous profile not adopted | Actual served browser flow; separate fault injection for storage/configuration |
| FR-34-AC4 | PASS within automated scope: local/privacy/recovery instructions, keyboard entry/error focus, paste/autocomplete/show-hide, generic credentials and duplicate errors, busy states, 320–1280px reflow/targets, 8 local axe states with zero violations | Manual AT/real zoom/cross-browser evaluation remains NOT RUN; no full WCAG conformance claim |

Memory prevention: source fixtures alone previously concealed an unusable account flow (FR-29). This time the main local journey uses actual registration/session/persistence APIs without mocked authentication/network responses. Storage/configuration faults are separately injected and labelled. Historical anonymous editor component and online provider/SQL regressions are not used as local account proof.

## Evidence

- Behavior source: `21395ca14635091ecde81cae08b4c761f69de367`.
- Full successful [CI run 44309790991](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44309790991): SQL fixtures, all unit/static/structural tests, actual local account journey and deferred online browser regressions passed.
- Environment: Ubuntu 24.04 runner, runner-provided Chrome (version recorded in CI), Node 22, localhost HTTP origin (secure-context browser exception). No online account/project activated.
- 27 total axe scans, zero violations; 8 specifically exercise actual local account states. Structural check: 178 links, 34 FRs, 39 criteria and 36 scenarios (link validation only).
- [Artifact 14430056582](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44309790991/artifacts/14430056582), digest `sha256:1e356fab5a125e96a5813039ef6a8eecf6e55fa34660befe89c7c6a5e3d1b8dd`, expires 2 December 2026. Contains screenshots, axe JSON and local-acceptance.json. Rerun after expiry and record new provenance; metadata is not a permanent copy of image evidence.
- Visually inspected registration and owner output at 320 CSS pixels, with full-page capture: readable wrapping, visible controls, registered nickname in header, invitation removed and owned candle/edit action shown. Earlier inspection also covered desktop owner output. These are implementation checks, not participant-research results.

Screenshot SHA-256:

- `local-register-320.png`: `2bee2795bdfeb9e56dd14454f8b286517717783aa8865ccba07c0d30acf827eb`.
- `local-owner-320.png`: `3f1210d5e991676f738d0dd446387c6ec9ba240dea63e7b51de9d0fbd2c5efaf`.
- `local-visitor-1280.png`: `05c4817ddb16503831870fdfebbfcd5f666a83359fc8583391c7835dd956108e`.

## Deployment and remaining verification

Repository inspection on 18 November 2026: default branch main, GitHub Pages disabled, homepage unset, and no site-deployment workflow configured. Public deployment/served-revision smoke verification is NOT RUN; the successful localhost journey is not a public rollout. A merge changes source only. No billing/hosting or online services were enabled. Existing manual screen-reader/actual zoom checks remain open. Final PR evidence should also cite its exact published head/run; subsequent documentation/test-command changes do not alter the verified account behavior.
