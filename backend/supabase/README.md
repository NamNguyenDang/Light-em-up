> Current scope: deferred online integration. The local browser product does not run these services.

# Low-cost backend setup

Use an existing Supabase Free project; no paid hosting/edge function is needed. No project has been provisioned or changed by these PRs.

1. In the project's SQL editor, apply `migrations/*.sql` once in filename order. Do not apply tests/bootstrap.sql to a real project.
2. Set the public project HTTPS URL and `sb_publishable_…` key in `frontend/config/supabase-config.js`. Never use a secret or service-role key. Configure the website's exact origin and signin.html redirect in Auth; enable Google only after provider setup.
3. Test with two real accounts: owner creates/updates/hides/deletes; the other account cannot read hidden rows or change the owner's story. Verify anonymous reads show only the public projection.
4. Run the supplied SQL tests against a staging copy with disposable test identities. CI uses PostgreSQL 16 and a small stand-in auth schema, exercising actual database roles/RLS rather than JavaScript authorization mocks.

Private table reads are owner-only. The deliberately owner-executed, security-barrier public view exposes only published columns and contains a fixed visibility predicate; no owner UUID is exposed. The browser cannot enforce ownership; SQL policies and constraints do so. Published content is public, including optional journey details. Samples remain clearly labelled. Current public fetch is capped at 1,000 server stories; add server pagination before scaling beyond that demo limit. No server secrets are shipped.

## Sender safety and project-owner review

Migrations 002–005 add encouragement, inbox read state, optional messages and recipient-only report/block actions. Published stories exclude account IDs; inbox/safety records are private. The project owner can review reports with a privileged SQL session, for example:

```sql
select r.id,r.created_at,r.reason,e.message
from public.encouragement_reports r
join public.encouragements e on e.id=r.event_id
order by r.created_at desc;
```

Do not expose this query through a public client or distribute privileged credentials. Reporting stores evidence, without automatic email or a staffed queue. Blocks persist for that recipient and prevent new encouragement; the owner can remove an erroneous block with an authorized database operation. This iteration does not add a public moderation dashboard.

## FR-29 account readiness

The shipped configuration is intentionally empty until an actual project is supplied. It cannot create online accounts. Set the public project URL/publishable key, apply all numbered migrations and verify site/confirmation redirects in the owned project. Keep confirmation/authorization intact. The signup UI supports confirmation-required feedback; provider-specific settings (including PKCE/autoconfirm restrictions) require real verification.

Run `node scripts/release-preflight.mjs https://your-real-site/` or the manual Account release preflight workflow. It inspects served files without executing remote configuration code or sending account writes. Missing/bad config, missing registration or missing served artifacts produces BLOCKED/exit 2. READY_FOR_LIVE_SMOKE is only a preflight result, always release_ready=false.

Then perform the FR-29 registration/confirmation/sign-in/create-light-save/reload/sign-out-in journey against the real deployed origin without mocked routing, recording the deployed commit and actual outcome. The labelled browser-only candle fallback is not evidence of online persistence. Do not mark the release usable while these checks are missing.
