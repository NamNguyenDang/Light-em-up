begin;
create table public.encouragements(
 id uuid primary key default gen_random_uuid(),
 story_id uuid not null references public.stories(id) on delete cascade,
 sender_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
 created_at timestamptz not null default now(),
 unique(story_id,sender_id)
);
create function public.can_encourage(target uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select from public.stories where id=target and visible and owner_id<>auth.uid());
$$;
revoke all on function public.can_encourage(uuid) from public;grant execute on function public.can_encourage(uuid) to authenticated;
alter table public.encouragements enable row level security;
create policy sent_encouragement_read on public.encouragements for select to authenticated using(sender_id=(select auth.uid()));
create policy encouragement_send on public.encouragements for insert to authenticated with check(sender_id=(select auth.uid()) and public.can_encourage(story_id));
revoke all on public.encouragements from public,anon,authenticated;
grant select,insert on public.encouragements to authenticated;
commit;
