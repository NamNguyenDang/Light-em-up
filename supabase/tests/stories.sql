begin;
insert into auth.users values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
set local role authenticated;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
insert into public.stories(nickname,city,visible) values('Alice','Kiruna',true);
insert into public.stories(nickname,city,visible) values('Alice duplicate','Kiruna',true) on conflict(owner_id) do update set nickname='Alice';
do $$begin
 if (select count(*) from public.stories)<>1 then raise exception 'Owner read/dedup failed';end if;
 begin insert into public.stories(owner_id,nickname,city) values('22222222-2222-4222-8222-222222222222','Spoof','Malmö');raise exception 'Spoof insert allowed';exception when insufficient_privilege then null;end;
 begin update public.stories set owner_id='22222222-2222-4222-8222-222222222222';raise exception 'Ownership transfer allowed';exception when insufficient_privilege then null;end;
 begin update public.stories set city='Unknown city';raise exception 'Unknown city allowed';exception when foreign_key_violation then null;end;
end$$;
select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
do $$begin
 if exists(select from public.stories) then raise exception 'Other account read allowed';end if;
 update public.stories set nickname='Hacked';if found then raise exception 'Other update allowed';end if;
 delete from public.stories;if found then raise exception 'Other delete allowed';end if;
end$$;
insert into public.stories(nickname,city,visible) values('Hidden Bob','Malmö',false);
set local role anon;select set_config('request.jwt.claim.sub','',true);
do $$begin
 if (select count(*) from public.public_stories)<>1 then raise exception 'Hidden story leaked';end if;
 begin perform * from public.stories;raise exception 'Anon private read allowed';exception when insufficient_privilege then null;end;
 begin insert into public.stories(nickname,city) values('Visitor','Kiruna');raise exception 'Anon insert allowed';exception when insufficient_privilege then null;end;
end$$;
set local role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
update public.stories set nickname='Updated Alice',visible=false;
do $$begin if exists(select from public.public_stories) then raise exception 'Hide failed';end if;end$$;
delete from public.stories;
do $$begin if exists(select from public.stories) then raise exception 'Owner delete failed';end if;end$$;
rollback;
