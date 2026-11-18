# Evaluation: evidence and open work

## What exists

| Evaluation type | Existing evidence | What it cannot establish |
|---|---|---|
| Stakeholder iteration | Owner decisions on map style, headline, candle artwork, copy and local scope. | Representative audience findings or product outcome changes. |
| State/data tests | Validation, light-count boundaries, persistence and state-transition fixtures. | That people understand the model or that a hosted service is configured. |
| Browser checks | Keyboard/focus/reflow/error/tooltip and synthetic account flows; screenshot/axe artifacts. | Full WCAG conformance, real provider/email delivery, device/AT coverage or usability success. |
| SQL authorization tests | Disposable PostgreSQL role/claim fixtures for optional ownership/inbox/safety rules. | Real deployed JWT/provider integration or an operating moderation process. |
| Proposed usability study | Research plan and blank session record. | Any completed participant session. |

The evidence register links concrete commits/runs. Automated results must retain their actual environment and synthetic-data boundary. Do not turn “no axe violations in these scans” into “fully accessible”.

## Measures for the next genuine round

| Measure | Definition | Current result |
|---|---|---|
| Task completion | Correct unassisted completion divided by attempted tasks; assisted/non-completion reported separately. | NOT MEASURED |
| Task time | Observed start-to-completion; record abandoned/assisted tasks separately, not as zero seconds. | NOT MEASURED |
| Critical errors | Observed failures that prevent the intended local task or create a false data/account expectation. | NOT MEASURED with participants |
| Map/local-boundary comprehension | Participant explanation compared with the actual light/persistence model. | NOT MEASURED |
| Perceived task ease | A clearly labelled project-specific post-task rating/comment; not a claim of a validated survey instrument. | NOT MEASURED |
| LCP / INP / CLS | Real performance measurements in representative mobile/desktop conditions; field and lab evidence distinguished. | NOT MEASURED |
| Wider social/employment outcomes | Would need a separate ethically appropriate study and service scope. | NOT STUDIED; no causal claim |

No percentages, participant counts, uplift or before/after usability scores are supplied because no such study was completed. Proposed success thresholds should be set before evaluation and treated as project decisions, not invented requirements of WCAG/ISO.

## Manual accessibility agenda

Follow [the standards plan](../../docs/standards/findings.md): real NVDA/Firefox or VoiceOver/Safari, keyboard-only complete tasks, 200% text-only resize, 400% zoom, text spacing, orientation, touch/pointer cancellation and speech/control-label review. Record versions, commit, steps, actual result and retest; these checks remain open until actually performed.
