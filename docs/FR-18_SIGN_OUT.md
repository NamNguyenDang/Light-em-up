# FR-18 — Sign out

Sign out uses the SDK to end this device's session. On success, clear private local profile/reaction/report data, account drafts, public return context and private editor fields; return to the public community and focus Log in. Never delete the published server story. Failures retain the session and offer retry, with live feedback. Dirty editors use the existing discard decision; duplicate actions are disabled while pending. SDK session/token cleanup remains the SDK's responsibility.

WCAG 2.2 AA before PR: 2.1.1 keyboard action, 2.4.3 visible post-action focus, 4.1.2 disabled state and 4.1.3 progress/failure/result announcements; run complete regression and actual-SDK browser signout fixture asserting private cleanup and unchanged server story. Manual screen-reader and live provider verification pending. Reference: https://www.w3.org/TR/WCAG22/.
