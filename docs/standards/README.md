# Standards and audit evidence

| Area | Start here | Verification boundary |
|---|---|---|
| WCAG 2.2 AA | [Audit](wcag/audit.md), [matrix](wcag/matrix.csv), [per-criterion text checks](wcag/checks/), [manual testing](wcag/manual-testing.md) | Automated evidence is not full conformance; manual AT/real zoom remains open. |
| BFF / architecture | [BFF assessment](architecture/bff.md), [point check](architecture/checks/BFF-boundary.txt) | Current product is browser-local; optional integration is direct BaaS, not a custom BFF. |
| Website/SaaS UX | [UX audit](ux/website-saas.md), [point checks](ux/checks/) | Standards/guidance differ; research and performance outcomes are not measured. |
| Online release | [Readiness check](release/checks/release-account-journey.txt) | Deferred/unverified online acceptance is never a local-mode or live-service pass. |
| Findings | [Open/fixed findings and manual plan](findings.md) | Preserve priorities, evidence and gaps. |
| Provenance | [Sources](SOURCES.md), [historical evidence snapshot](evidence.json) | Source/run SHAs remain historical; CI artifacts have limited retention. |

The golden expected behavior is in [requirements](../requirements/requirement.md). Mistakes and corrections are in [lessons](../lessons/README.md); UX portfolio work is in [ux](../../ux/README.md). The old leason_learn folder was separated into standards and lessons under FR-31; the exact migration is in [organization-map.json](../organization-map.json).
