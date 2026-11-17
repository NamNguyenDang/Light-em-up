begin;
alter table public.encouragements add column read_at timestamptz;
create function public.received_encouragement(page_offset integer default 0)
returns table(event_id uuid,sender_id uuid,sender_name text,created_at timestamptz,read_at timestamptz,total_count bigint,unread_count bigint)
language sql stable security definer set search_path='' as $$
 select e.id,e.sender_id,coalesce(nullif(s.nickname,''),'Someone'),e.created_at,e.read_at,
 count(*) over(),count(*) filter(where e.read_at is null) over()
 from public.encouragements e join public.stories target on target.id=e.story_id
 left join public.stories s on s.owner_id=e.sender_id and s.visible
 where target.owner_id=auth.uid()
 order by e.created_at desc,e.id desc limit 50 offset greatest(0,least(page_offset,100000));
$$;
create function public.read_encouragement(event uuid) returns boolean
language plpgsql security definer set search_path='' as $$
begin
 update public.encouragements e set read_at=coalesce(e.read_at,now()) from public.stories s
 where e.id=event and s.id=e.story_id and s.owner_id=auth.uid();
 return found;
end;$$;
revoke all on function public.received_encouragement(integer),public.read_encouragement(uuid) from public;
grant execute on function public.received_encouragement(integer),public.read_encouragement(uuid) to authenticated;
commit;
