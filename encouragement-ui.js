'use strict';
(()=>{
 let owner=null,generation=0,sent=new Set(),pending=new Set();
 const unsubscribe=LightEmUpSession.subscribe(async value=>{
  if(value.status==='checking')return;const next=value.status==='signedIn'?value.user.id:null;if(next===owner)return;
  owner=next;const request=++generation;sent=new Set();pending=new Set();render();
  if(!owner)return;
  try{const rows=await LightEmUpSession.sentEncouragement(owner);if(request!==generation)return;sent=new Set(rows.map(r=>r.story_id));render();}
  catch{if(request===generation)notify('We could not load sent encouragement. You can retry sending; duplicates are prevented.');}
 });
 globalThis.LightEmUpEncouragement=Object.freeze({
  bind(button,story){
   const self=story.id===state.profile?.id&&!!owner;
   button.textContent=self?'Your candle':sent.has(story.id)?'♥ Encouragement sent':pending.has(story.id)?'Sending…':'♡ I’m with you';
   button.disabled=self||sent.has(story.id)||pending.has(story.id);button.setAttribute('aria-busy',String(pending.has(story.id)));
   button.onclick=async()=>{
    if(!owner){const url=new URL('signin.html',location.href);url.searchParams.set('returnTo','index.html#stories-title');location.assign(url.href);return;}
    if(self||pending.has(story.id)||sent.has(story.id))return;
    const identity=owner,request=generation;pending.add(story.id);render();notify('Sending encouragement…');
    try{await LightEmUpSession.encourage(identity,story.id);if(request!==generation)return;sent.add(story.id);notify('Your encouragement was sent.');}
    catch{if(request===generation)notify('Your encouragement could not be sent. Please try again.');}
    finally{if(request===generation){pending.delete(story.id);render();}}
   };
  }
 });
 window.addEventListener('pagehide',()=>{generation++;unsubscribe();},{once:true});
})();
