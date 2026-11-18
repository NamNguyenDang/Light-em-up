# FR-35 / DR — Account failure feedback

User report: account creation followed by login failure without explanation, using a 13-character password. Exact origin/browser/account state was not supplied. No submitted password is retained in this report.

Verified source diagnosis at main a78d731389e63b5e7d649bb7f90bec6491d95cf0: registration minimum was 15, so the supplied length could not produce an account through that source's normal flow. Client validation populated only an inline error, left the role=alert summary empty, and left the page phase ready rather than failed. This supports a missing-feedback defect; it does not prove the user's exact stored account/browser state or an online-provider failure.

User-finalized correction: minimum 8, maximum 128, ASCII letters/numbers for new registrations, no required mixture; explain symbol/space/length rejection. Symbols are safely handled text, not executable input; no claim that they crashed the original app. Preserve login for previously valid passwords. Add operation-level visible alert, invalid-field focus/association, no invalid account/session creation and input-preserving retry.

Golden criteria: [FR-35](../../requirements/requirement.md#fr-35--dr-account-feedback-and-revised-password-policy). Scenario: [TC-FR-35-01](../../requirements/test-cases.md#tc-fr-35-01). Implementation and regression coverage are complete. The real-browser feedback regression passed on source 9ce74c23fb932d92bb3a35bcc3d462df8b951591 in [run 44312833695](https://github.com/NamNguyenDang/Light-em-up/actions/runs/44312833695); the separate delivery PR must record the final exact-head full-CI result before merge. No deployment or manual assistive-technology outcome is claimed.
