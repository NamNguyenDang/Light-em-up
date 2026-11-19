'use strict';
(()=>{
 const button=document.getElementById('join'),contextKey='light-em-up-candle-context';
 // Only public browsing context is retained, never credentials or story drafts.
 try{
  const raw=sessionStorage.getItem(contextKey);sessionStorage.removeItem(contextKey);
  if(raw&&raw.length<2048){const context=JSON.parse(raw);if(Number.isFinite(context.at)&&Date.now()-context.at>=0&&Date.now()-context.at<600000)restoreBrowsingContext(context);}
 }catch{}
 const intent=location.hash==='#add-candle';
 function clearIntent(){
  if(location.hash==='#add-candle'){const url=new URL(location.href);url.hash='';try{history.replaceState(history.state,'',url.href);}catch{}}
  try{if(sessionStorage.getItem('light-em-up-signin-focus')==='add-candle')sessionStorage.removeItem('light-em-up-signin-focus');}catch{}
 }
 const originalLabel=button.textContent;
 const entry=CandleEntry.create({

  resumeIntent:intent,
  isModalOpen:()=>!!document.querySelector('dialog[open]'),
  openEditor:()=>globalThis.LightEmUpAccount?.openEditor(),
  clearIntent,
  signIn:()=>{
   try{sessionStorage.setItem(contextKey,JSON.stringify({...getBrowsingContext(),at:Date.now()}));}catch{}
   const url=new URL('signin.html',location.href);url.searchParams.set('returnTo','index.html#add-candle');location.assign(url.href);
  },
  onBusy:busy=>{button.disabled=busy;button.setAttribute('aria-busy',String(busy));}
 });
 globalThis.LightEmUpCandleEntry=Object.freeze({snapshot:()=>entry.snapshot()});
 button.onclick=()=>{entry.activate();globalThis.UserDebug?.record('candle.entry');};
 const unsubscribe=globalThis.LightEmUpSession?.subscribe(value=>{const offline=value.status==='notConfigured';document.getElementById('offline-service-note').hidden=!offline;button.textContent=originalLabel;entry.update(value);globalThis.UserDebug?.record('candle.entry');});
 if(!unsubscribe)entry.update({status:'checkFailed',user:null});
 window.addEventListener('pagehide',()=>{unsubscribe?.();entry.stop();},{once:true});
})();
