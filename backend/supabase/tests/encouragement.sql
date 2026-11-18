begin;
insert into auth.users values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
insert into public.stories(id,owner_id,nickname,city) values('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111','Alice','Kiruna'),('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222','Bob','Malmö');
set local role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
do $$begin
 begin insert into public.encouragements(story_id) values('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');raise exception 'Self reaction allowed';exception when insufficient_privilege then null;end;
 begin insert into public.encouragements(story_id,sender_id) values('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222');raise exception 'Sender spoof allowed';exception when insufficient_privilege then null;end;
end$$;
insert into public.encouragements(story_id) values('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');
do $$begin
 begin insert into public.encouragements(story_id) values('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');raise exception 'Duplicate allowed';exception when unique_violation then null;end;
end$$;
select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
do $$begin if exists(select from public.encouragements) then raise exception 'Private sent history leaked';end if;end$$;
update public.stories set visible=false;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
do $$begin if public.can_encourage('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb') then raise exception 'Hidden target allowed';end if;end$$;
rollback;
