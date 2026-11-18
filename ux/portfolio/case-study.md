# Light-em-up: designing a small place for encouragement

**Status:** portfolio draft based on project discussions and shipped prototype. Review your exact role and claims before using this in a CV, interview or public portfolio. No invented participants, quotes, success percentages or user outcomes.

## Problem and intended audience

The project explores how a person going through a job search in Sweden might express presence and encouragement without needing a long public story. Whether this reduces loneliness or improves wellbeing is a hypothesis, not a measured result. The current local-only product cannot deliver a real shared support network; it demonstrates the interaction design with labelled samples and a personal browser-local candle.

## Scope and role

The repository owner supplied the product direction, priorities, visual feedback and acceptance decisions. Implementation, documentation and automated checks were developed with AI assistance. Claims about individual research, visual execution or engineering contributions should match what you personally performed and can explain. There is no completed participant study to claim.

Constraints shaped the design: keep costs low, start local, preserve meaningful geographic placement, support keyboard/nonvisual access and let people share only a nickname/city/message if they choose. Do not collect real sensitive job-search stories for a demo or study task.

## Design process and decisions

1. **Explore a concrete metaphor.** A candle became the consistent symbol of presence. The remaining sun icon was removed after stakeholder feedback because the visual language needed to match the product's purpose.
2. **Make density readable.** The map uses city/kommun light intensity rather than overlapping individual candle illustrations at the overview scale. Six count levels and a text alternative make the model inspectable. A lit candle remains independent of an employment milestone.
3. **Reduce competing information.** The large headline, sample-count banner and long map explanation consumed attention. The preferred bold italic hero stays one desktop line where it fits and wraps on narrow/enlarged layouts. This balances hierarchy with reflow rather than enforcing nowrap everywhere.
4. **Make the invitation human.** The chosen message is “Let someone know they’re not alone.” The online CTA is “Add your candle”; unconfigured local mode explicitly says “Try a local candle”. These are different promises and must stay distinct.
5. **Design complete states.** Validation, saving, retry, cancel/discard, restoration and private data boundaries matter as much as the happy path. Golden requirements and test cases now define observable behavior before acceptance.
6. **Learn from a failed expectation.** The owner could not register/sign in/light a candle through the online journey even though fixture tests passed. Missing deployment configuration and absent signup were not a usable release. The response added signup handling, a clearly local fallback and fail-closed release preflight; real online acceptance remains deferred.

The [decision log](../design/decisions.md) explains alternatives and tradeoffs. [Earlier designs](../../docs/archive/) remain available to show evolution, not as current screenshots.

## Validation actually completed

The repository contains executable state, data, HTML, keyboard/focus/reflow and browser/axe checks, plus SQL ownership fixtures for the optional backend. Tests have found concrete issues such as dialog focus, duplicate script bootstrap and a test that accidentally closed a disclosure. Exact-head run evidence belongs in the [evidence register](../evidence/register.md) and linked PRs.

These checks demonstrate implementation verification, not a usability study, full WCAG conformance, working email delivery or a deployed multi-user community. Manual screen-reader/real zoom/device checks remain open.

## Outcomes and next evaluation

**Observable deliverables:** browser-local candle experience, geographic overview/text alternative, documented states/error recovery, golden requirements, migration/quality checks and a traceable design history.

**Not measured:** task completion with representative users, comprehension of map intensity, perceived usefulness, emotional impact, engagement, conversion, retention or employment outcomes. No uplift can be attributed to the redesign.

The next step is the [proposed local usability study](../research/plan.md), followed by changes based on observed evidence. Strong portfolio discussion can already explain the problem, alternatives, accessibility reasoning, explicit scope and mistakes; it should not claim outcomes the project has not measured.
