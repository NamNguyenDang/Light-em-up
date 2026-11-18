begin;
insert into auth.users values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
insert into public.stories(id,owner_id,nickname,city) values('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222','Bob','Malmö');
insert into public.encouragements(id,story_id,sender_id,message) values('cccccccc-cccc-4ccc-8ccc-cccccccccccc','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','11111111-1111-4111-8111-111111111111','You are not alone');
set local role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
do $$begin
 if exists(select from public.received_encouragement()) then raise exception 'Sender saw recipient inbox';end if;
 if public.read_encouragement('cccccccc-cccc-4ccc-8ccc-cccccccccccc') then raise exception 'Nonrecipient marked read';end if;
end$$;
select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
do $$begin
 if (select count(*) from public.received_encouragement())<>1 then raise exception 'Recipient inbox missing';end if;
 if (select message from public.received_encouragement())<>'You are not alone' then raise exception 'Message missing';end if;
 if not public.read_encouragement('cccccccc-cccc-4ccc-8ccc-cccccccccccc') then raise exception 'Recipient read failed';end if;
 if (select unread_count from public.received_encouragement())<>0 then raise exception 'Read state not persisted';end if;
end$$;
set local role anon;
do $$begin begin perform * from public.received_encouragement();raise exception 'Anonymous inbox access';exception when insufficient_privilege then null;end;end$$;
rollback;
