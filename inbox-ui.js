'use strict';
(()=>{
 const panel=document.getElementById('encouragement-panel'),list=document.getElementById('encouragement-list'),status=document.getElementById('encouragement-summary'),refresh=document.getElementById('refresh-encouragement'),more=document.getElementById('more-encouragement');
 let owner=null,generation=0,rows=[],total=0,unread=0,loading=false;
 const summary=()=>{status.textContent=total?`${total} encouragement${total===1?'':'s'} · ${unread} unread`:'No encouragement yet. Your candle is here for others to find.';more.hidden=rows.length>=total;};
 function item(row){
  const article=document.createElement('article');article.className='received-event';
  const title=document.createElement('h4');title.textContent=`${row.sender_name||'Someone'} is with you.`;
  const time=document.createElement('time');time.dateTime=row.created_at;const date=new Date(row.created_at);time.textContent=Number.isFinite(+date)?date.toLocaleString():'';
  const badge=document.createElement('p');badge.className='small';badge.textContent=row.read_at?'Read':'New';
  const details=document.createElement('details'),toggle=document.createElement('summary');toggle.textContent='View encouragement';const message=document.createElement('p');message.textContent='A candle of support.';details.append(toggle,message);
  details.addEventListener('toggle',async()=>{if(!details.open||row.read_at||details.dataset.saving)return;details.dataset.saving='true';const identity=owner,request=generation;try{const ok=await LightEmUpSession.readEncouragement(identity,row.event_id);if(!ok)throw new Error('Not read');if(request!==generation)return;row.read_at=new Date().toISOString();badge.textContent='Read';unread=Math.max(0,unread-1);summary();}catch{if(request===generation)status.textContent='We could not mark this encouragement as read. Close and reopen it to retry.';}finally{delete details.dataset.saving;}});
  article.append(title,time,badge,details);return article;
 }
 async function load(append=false){
  if(!owner||loading)return;loading=true;refresh.disabled=true;more.disabled=true;const request=generation,identity=owner;status.textContent='Loading encouragement…';
  try{const data=await LightEmUpSession.receivedEncouragement(identity,append?rows.length:0);if(request!==generation)return;rows=append?[...rows,...data]:data;total=Number(data[0]?.total_count||(append?total:0));unread=Number(data[0]?.unread_count||(append?unread:0));if(!append)list.replaceChildren();for(const row of data)list.append(item(row));summary();}
  catch{if(request===generation)status.textContent='We could not load encouragement. Please refresh to retry.';}
  finally{if(request===generation){loading=false;refresh.disabled=false;more.disabled=false;}}
 }
 const unsubscribe=LightEmUpSession.subscribe(value=>{if(value.status==='checking')return;const next=value.status==='signedIn'?value.user.id:null;if(next===owner)return;owner=next;generation++;loading=false;rows=[];total=unread=0;list.replaceChildren();summary();});
 document.addEventListener('encouragement-open',()=>load());refresh.onclick=()=>load();more.onclick=()=>load(true);
 window.addEventListener('pagehide',()=>{generation++;unsubscribe();list.replaceChildren();},{once:true});
})();
