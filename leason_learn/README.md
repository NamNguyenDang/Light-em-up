# FR-27 — Lessons learned and project audit

Initial audit: 17 November 2026; updated 18 November 2026 after the FR-29 user defect report. Repository: NamNguyenDang/Light-em-up. The folder name `leason_learn` follows the requested spelling.

The project progressed from a browser-only community demo to an optional Supabase-backed account/story/encouragement application. The FR-01–26 code, database migrations and automated tests are evidence of implementation; they are not proof of live deployment or complete accessibility conformance.

Each criterion/topic also has its own plain text file in `checks/` (55 WCAG points plus architecture, UX and release checks).

Start here:

1. [Delivery history and lessons](01_delivery_history.md): decisions, mistakes, corrections and FR/PR traceability.
2. [WCAG 2.2 AA audit](02_wcag22_audit.md): all 55 A/AA criteria, implementation evidence, applicability and verification gaps. A green axe result is not a certification.
3. [Backend for Frontend audit](03_bff_architecture.md): current architecture, what a BFF would change, and why a separate BFF has not been added.
4. [Website and SaaS UX audit](04_website_saas_ux.md): standards versus design guidance and the project's measured/unmeasured UX.
5. [Findings and verification plan](05_findings_and_verification.md): priorities, owners, acceptance evidence and an executable manual-test agenda.
6. [FR-29 account journey incident](06_account_journey_release_failure.txt): why fixture success did not establish a usable release.
7. [Primary sources](SOURCES.md) and [delivery evidence](evidence.json).

The WCAG audit uses **Evidence**, **Review** and **N/A (scoped)** rather than a blanket Pass. Public browsing, sign-in, checking/error states, editor, account disclosure, inbox, composer and safety actions are in scope. Manual NVDA/VoiceOver, actual browser zoom/text resize and live provider/database checks remain open. No legal compliance, ISO certification, production readiness or BFF adoption is claimed.

## Terms in plain language

| Short name | Full name | Meaning here |
|---|---|---|
| WCAG | Web Content Accessibility Guidelines | Testable accessibility requirements; AA is the chosen conformance level. |
| BFF | Backend for Frontend | A server tailored to a frontend; a browser JavaScript helper is not that server. |
| BaaS | Backend as a Service | Managed authentication/database APIs, such as the chosen Supabase setup. |
| RLS | Row Level Security | Database rules determining which account may read/change each row. |
| RPC | Remote Procedure Call | Calling a server/database function through the API. |
| SaaS | Software as a Service | Delivering software as a hosted service; not a particular screen layout. |
| AT | Assistive Technology | Screen readers and other tools used to operate/read the interface. |
| APG | ARIA Authoring Practices Guide | W3C's informative guidance for accessible interaction patterns. |

The repository is the source of truth. See [the backlog](../docs/ACCESSIBILITY_FEATURE_REQUESTS.md), [the regression matrix](../docs/FR-20_REGRESSION_MATRIX.md) and [backend setup](../supabase/README.md). Audit findings do not silently add new implemented FRs or deploy services.
