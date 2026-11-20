# Approved community-page states and auth popup wireframes

Open [index.html](index.html). It is a self-contained grayscale **design simulation**, not the working app: no account is authenticated and no input is persisted. The page comparison is the user's agreed baseline; sign-in/create-account popups are the requested design extension. Map paths reuse the project's existing province geometry and sample city positions.

- Visitor landing: Log in, invitation, Add your candle, labelled sample personal story; browsing remains public.
- Successful login: the same community page, verified nickname, personal candle panel, no visitor invitation/sample personal card. Empty-account Add opens the editor directly; an existing candle has one edit action.
- [Sign-in popup](index.html#signin-popup): nickname/password, show/hide, error, create-account switch, cancel/close.
- [Create-account popup](index.html#create-account-popup): unique nickname, 8–128 letters/numbers, no email, required labels, validation/error and sign-in switch.
- The error-preview checkbox deliberately simulates an account failure. Success is an explicitly labelled preview, never evidence that real login worked.

See [state-contract.md](state-contract.md) for transition inputs/outputs and test mapping. The actual app currently uses signin.html for entry; an audit must report that presentation gap rather than pretending a modal is implemented. The original FR-36 user-browser DR remains open.

[Verification, evidence and open defects](verification.md). Run `npm run test:wireframe` for the design/transition checks.
