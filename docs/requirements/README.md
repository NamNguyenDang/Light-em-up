# Requirements and acceptance

[requirement.md](requirement.md) is the golden behavior specification. [test-cases.md](test-cases.md) describes observable scenarios and their expected results. [traceability.json](traceability.json) links acceptance IDs to cases, existing automated checks and required evidence scope.

Read these with [agent/memory.md](../../agent/memory.md), [agent/skill.md](../../agent/skill.md) and the [standards audit](../standards/README.md). The [backlog](../tracking/backlog.md) tracks delivery status; it does not redefine expected behavior.

A structural traceability check is not a behavior pass. Fixture tests are not live acceptance. FR-29 remains blocked for online service activation and the actual deployed-origin account/candle journey.

## What the online backend means

The website is the interface in the browser. An online Supabase project supplies Auth (account creation/sign-in) and the shared database (stories, lit state and encouragement). The checked-in SQL/JavaScript files describe that setup; they do not create or connect a hosted project. A project URL/public key, migrations and provider/redirect setup must actually be configured and verified. No separate custom BFF server is required by the present design.

Cost context, checked 18 November 2026: Supabase offers a $0/month Free tier; its usage/inactivity limits still apply. Public confirmation emails require an appropriate configured email sender because the default Supabase sender is restricted to project-team addresses. Separate email providers have their own pricing. No paid plan or billing is enabled by repository merge authorization. Recheck the official [pricing](https://supabase.com/pricing) and [email configuration](https://supabase.com/docs/guides/auth/auth-smtp) before activation. This is explanatory setup context; requirement.md remains the behavior authority.
