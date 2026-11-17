'use strict';
(()=>{
 let owner=null,generation=0,sent=new Set(),pending=new Set(),target=null;
 const dialog=document.getElementById('encouragement-dialog'),form=document.getElementById('encouragement-form'),message=document.getElementById('encouragement-message'),submit=document.getElementById('send-encouragement'),cancel=document.getElementById('cancel-encouragement'),status=document.getElementById('send-encouragement-status'),error=document.getElementById('send-encouragement-error');
 function busy(value){submit.disabled=cancel.disabled=message.disabled=value;submit.setAttribute('aria-busy',String(value));status.textContent=value?'Sending encouragement…':'';}
 function close(){if(submit.disabled)return;if(message.value.trim()&&!confirm('Discard this encouragement message?'))return;dialog.close();message.value='';}
 cancel.onclick=close;dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 dialog.addEventListener('close',()=>{document.getElementById('stories-title').focus();});
 const unsubscribe=LightEmUpSession.subscribe(async value=>{
  if(value.status==='checking')return;const next=value.status==='signedIn'?value.user.id:null;if(next===owner)return;
  if(owner!==next){dialog.close();message.value='';target=null;busy(false);}owner=next;const request=++generation;sent=new Set();pending=new Set();render();
  if(!owner)return;
  try{const rows=await LightEmUpSession.sentEncouragement(owner);if(request!==generation)return;sent=new Set(rows.map(r=>r.story_id));render();}
  catch{if(request===generation)notify('We could not load sent encouragement. You can retry sending; duplicates are prevented.');}
 });
 globalThis.LightEmUpEncouragement=Object.freeze({
  bind(button,story){
   const self=story.id===state.profile?.id&&!!owner;
   button.textContent=self?'Your candle':sent.has(story.id)?'♥ Encouragement sent':pending.has(story.id)?'Sending…':'♡ I’m with you';
   button.disabled=self||sent.has(story.id)||pending.has(story.id);button.setAttribute('aria-busy',String(pending.has(story.id)));
   button.onclick=()=>{
    if(!owner){const url=new URL('signin.html',location.href);url.searchParams.set('returnTo','index.html#stories-title');location.assign(url.href);return;}
    if(self||pending.has(story.id)||sent.has(story.id)||applicationState.navigation.dialog)return;
    target=story;message.value='';error.textContent='';busy(false);document.getElementById('encouragement-to').textContent=`Let ${story.nickname} know you’re with them.`;openApplicationDialog('encouragement');message.focus();
   };
  }
 });
 form.onsubmit=async event=>{
  event.preventDefault();if(!target||!owner||submit.disabled||pending.has(target.id))return;
  const story=target,identity=owner,request=generation,text=message.value.trim();if(text.length>600){error.textContent='Please use 600 characters or fewer.';message.focus();return;}
  error.textContent='';pending.add(story.id);busy(true);render();
  try{const result=await LightEmUpSession.encourage(identity,story.id,text);if(request!==generation)return;sent.add(story.id);message.value='';dialog.close();notify(Array.isArray(result)&&!result.length?'Encouragement was already sent.':'Your encouragement was sent.');}
  catch{if(request===generation){error.textContent='Your encouragement could not be sent. Your message is still here. Please try again.';}}
  finally{if(request===generation){pending.delete(story.id);busy(false);render();if(dialog.open)submit.focus();}}
 };
 window.addEventListener('pagehide',()=>{generation++;unsubscribe();},{once:true});
})();
