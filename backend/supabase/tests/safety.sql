begin;
insert into auth.users values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
insert into public.stories(id,owner_id,nickname,city) values('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222','Bob','Malmö');
insert into public.encouragements(id,story_id,sender_id) values('cccccccc-cccc-4ccc-8ccc-cccccccccccc','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','11111111-1111-4111-8111-111111111111');
set local role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
do $$begin
 if public.report_encouragement('cccccccc-cccc-4ccc-8ccc-cccccccccccc','Spam') then raise exception 'Nonrecipient report';end if;
 if public.block_encouragement_sender('cccccccc-cccc-4ccc-8ccc-cccccccccccc') then raise exception 'Nonrecipient block';end if;
end$$;
select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
select public.report_encouragement('cccccccc-cccc-4ccc-8ccc-cccccccccccc','Spam');
select public.report_encouragement('cccccccc-cccc-4ccc-8ccc-cccccccccccc','Spam');
select public.block_encouragement_sender('cccccccc-cccc-4ccc-8ccc-cccccccccccc');
do $$begin
 if (select count(*) from public.encouragement_reports)<>1 then raise exception 'Report dedup failed';end if;
 if exists(select from public.received_encouragement()) then raise exception 'Blocked history visible';end if;
end$$;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
do $$begin
 if public.can_encourage('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb') then raise exception 'Blocked sender allowed';end if;
 if exists(select from public.blocked_senders) or exists(select from public.encouragement_reports) then raise exception 'Other private safety records leaked';end if;
 begin insert into public.encouragements(story_id) values('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');raise exception 'Blocked insert allowed';exception when insufficient_privilege then null;end;
end$$;
set local role anon;
do $$begin begin perform public.report_encouragement('cccccccc-cccc-4ccc-8ccc-cccccccccccc','Spam');raise exception 'Anonymous report allowed';exception when insufficient_privilege then null;end;end$$;
rollback;
