begin;
create table public.blocked_senders(
 blocker_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
 sender_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),primary key(blocker_id,sender_id),check(blocker_id<>sender_id)
);
create table public.encouragement_reports(
 id uuid primary key default gen_random_uuid(),
 event_id uuid not null references public.encouragements(id) on delete cascade,
 reporter_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
 reason text not null check(reason in ('Unwanted','Harassment','Spam','Other')),
 created_at timestamptz not null default now(),unique(event_id,reporter_id)
);
alter table public.blocked_senders enable row level security;
alter table public.encouragement_reports enable row level security;
create policy own_blocks on public.blocked_senders for select to authenticated using(blocker_id=(select auth.uid()));
create policy own_unblock on public.blocked_senders for delete to authenticated using(blocker_id=(select auth.uid()));
create policy own_reports on public.encouragement_reports for select to authenticated using(reporter_id=(select auth.uid()));
revoke all on public.blocked_senders,public.encouragement_reports from public,anon,authenticated;
grant select,delete on public.blocked_senders to authenticated;
grant select on public.encouragement_reports to authenticated;
create function public.report_encouragement(event uuid,report_reason text) returns boolean
language plpgsql security definer set search_path='' as $$
begin
 if report_reason not in ('Unwanted','Harassment','Spam','Other') or report_reason is null then raise exception 'Invalid report reason';end if;
 if not exists(select from public.encouragements e join public.stories s on s.id=e.story_id where e.id=event and s.owner_id=auth.uid()) then return false;end if;
 insert into public.encouragement_reports(event_id,reporter_id,reason) values(event,auth.uid(),report_reason) on conflict(event_id,reporter_id) do nothing;
 return true;
end;$$;
create function public.block_encouragement_sender(event uuid) returns boolean
language plpgsql security definer set search_path='' as $$
declare sender uuid;
begin
 select e.sender_id into sender from public.encouragements e join public.stories s on s.id=e.story_id where e.id=event and s.owner_id=auth.uid();
 if sender is null or sender=auth.uid() then return false;end if;
 insert into public.blocked_senders(blocker_id,sender_id) values(auth.uid(),sender) on conflict do nothing;
 return true;
end;$$;
create or replace function public.can_encourage(target uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select from public.stories s where s.id=target and s.visible and s.owner_id<>auth.uid()
 and not exists(select from public.blocked_senders b where b.blocker_id=s.owner_id and b.sender_id=auth.uid()));
$$;
create or replace function public.received_encouragement(page_offset integer default 0)
returns table(event_id uuid,sender_id uuid,sender_name text,created_at timestamptz,read_at timestamptz,total_count bigint,unread_count bigint,message text)
language sql stable security definer set search_path='' as $$
 select e.id,e.sender_id,coalesce(nullif(s.nickname,''),'Someone'),e.created_at,e.read_at,
 count(*) over(),count(*) filter(where e.read_at is null) over(),e.message
 from public.encouragements e join public.stories target on target.id=e.story_id
 left join public.stories s on s.owner_id=e.sender_id and s.visible
 where target.owner_id=auth.uid() and not exists(select from public.blocked_senders b where b.blocker_id=auth.uid() and b.sender_id=e.sender_id)
 order by e.created_at desc,e.id desc limit 50 offset greatest(0,least(page_offset,100000));
$$;
revoke all on function public.report_encouragement(uuid,text),public.block_encouragement_sender(uuid) from public;
grant execute on function public.report_encouragement(uuid,text),public.block_encouragement_sender(uuid) to authenticated;
commit;
