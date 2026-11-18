begin;
alter table public.encouragements add column message text not null default '' check(char_length(message)<=600);
drop function public.received_encouragement(integer);
create function public.received_encouragement(page_offset integer default 0)
returns table(event_id uuid,sender_id uuid,sender_name text,created_at timestamptz,read_at timestamptz,total_count bigint,unread_count bigint,message text)
language sql stable security definer set search_path='' as $$
 select e.id,e.sender_id,coalesce(nullif(s.nickname,''),'Someone'),e.created_at,e.read_at,
 count(*) over(),count(*) filter(where e.read_at is null) over(),e.message
 from public.encouragements e join public.stories target on target.id=e.story_id
 left join public.stories s on s.owner_id=e.sender_id and s.visible
 where target.owner_id=auth.uid()
 order by e.created_at desc,e.id desc limit 50 offset greatest(0,least(page_offset,100000));
$$;
revoke all on function public.received_encouragement(integer) from public;
grant execute on function public.received_encouragement(integer) to authenticated;
commit;
