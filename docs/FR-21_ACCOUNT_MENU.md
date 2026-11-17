# FR-21 — Nickname account navigation

The verified nickname toggles a native disclosure containing My story, Encouragement and Sign out. It uses normal button/Tab navigation rather than claiming an ARIA menu without arrow-key behavior. Escape closes the disclosure and returns focus; outside clicks dismiss it. My story focuses the personal card; Encouragement focuses a named panel with a close action. FR-24 connects its received-event data; until then the panel explicitly says it is not connected. Signed-out users retain Log in and cannot expose the account actions.

WCAG 2.2 AA before PR: 4.1.2 expanded/control state, 2.1.1 keyboard actions, 2.4.3 predictable focus, 1.4.10 responsive wrapping, 2.5.8 target sizing. Actual-SDK browser tests cover Tab/Escape, personal card, inbox panel and menu sign-out; rerun all previous axe/flow checks. Manual screen-reader testing pending. https://www.w3.org/TR/WCAG22/
