'use strict';
// Opt-in, bounded, allowlisted diagnostics. Never inspect inputs, identities or credentials.
(()=>{
 const PREF='light-em-up-user-mode',TRACE='light-em-up-user-trace',BUILD='FR-36-v1',LIMIT=20;
 const enums={auth:['checking','signedOut','signedIn','signingIn','signingOut','checkFailed','notConfigured'],view:['community','dashboard','signIn'],story:['none','editing','saving','saved','saveFailed'],dialog:['none','profile','info','cluster','encouragement'],signin:['checking','ready','signingIn','signedIn','failed','checkFailed','unavailable','confirmation','redirecting','notApplicable']};
 const events=['mode.changed','session.change','signin.phase','application.transition','candle.entry','story.load','view.error','manual.refresh'];
 const pick=(value,values)=>values.includes(value)?value:'unknown';
 const safely=(read,fallback)=>{try{return read();}catch{return fallback;}};
 const url=new URL(location.href),requested=url.searchParams.get('userMode');
 let mode=[requested,safely(()=>sessionStorage.getItem(PREF),null),globalThis.LIGHT_EM_UP_AUTH?.userMode].find(v=>v==='USER'||v==='USERDEBUG')||'USER',entries=[],panel=null;
 const page=()=>location.pathname.endsWith('signin.html')?'signin.html':location.pathname.endsWith('index.html')||location.pathname.endsWith('/')?'index.html':'other';
 function sanitize(raw={}){raw=raw&&typeof raw==='object'?raw:{};return {build:BUILD,mode:'USERDEBUG',origin:location.origin,page:page(),session:pick(raw.session,enums.auth),uiAuth:pick(raw.uiAuth,enums.auth),view:pick(raw.view,enums.view),dialog:pick(raw.dialog,enums.dialog),story:pick(raw.story,enums.story),signinPhase:pick(raw.signinPhase,enums.signin),hasVerifiedIdentity:raw.hasVerifiedIdentity===true,ownStoryReady:raw.ownStoryReady===true,hasOwnStoryOwner:raw.hasOwnStoryOwner===true,candleWaiting:raw.candleWaiting===true,candleIntent:raw.candleIntent===true};}
 function snapshot(){const app=safely(()=>getApplicationDebugState(),{})||{},session=safely(()=>LightEmUpSession.snapshot(),{})||{},entry=safely(()=>LightEmUpCandleEntry.snapshot(),{})||{},signin=page()==='signin.html',phase=document.body?.dataset.signinState,signInStatus={checking:'checking',ready:'signedOut',failed:'signedOut',signingIn:'signingIn',signedIn:'signedIn',checkFailed:'checkFailed',unavailable:'notConfigured'}[phase],status=session.status||(signin?signInStatus:undefined);return sanitize({session:status,uiAuth:app.authentication||(signin?signInStatus:undefined),view:app.view||(signin?'signIn':undefined),dialog:app.dialog||(signin?'none':undefined),story:app.story||(signin?'none':undefined),signinPhase:signin?phase:'notApplicable',hasVerifiedIdentity:signin?phase==='signedIn':session.status==='signedIn'&&!!session.user?.id,ownStoryReady:safely(()=>LightEmUpAccount.ready(),false),hasOwnStoryOwner:safely(()=>!!LightEmUpAccount.owner(),false),candleWaiting:entry.waiting,candleIntent:entry.intent});}
 function persist(){safely(()=>{sessionStorage.setItem(PREF,mode);if(mode==='USERDEBUG')sessionStorage.setItem(TRACE,JSON.stringify(entries));else sessionStorage.removeItem(TRACE);},null);}
 function ensurePanel(){
  if(panel?.isConnected)return;
  panel=document.createElement('section');panel.id='user-debug';panel.setAttribute('aria-labelledby','user-debug-title');
  const title=document.createElement('h2');title.id='user-debug-title';title.textContent='USERDEBUG — browser state';
  const note=document.createElement('p');note.textContent='Local state diagnostics only. Passwords, tokens, account details and story content are excluded.';
  const current=document.createElement('pre');current.id='user-debug-state';current.setAttribute('aria-label','Current browser state');
  const refresh=document.createElement('button');refresh.type='button';refresh.textContent='Refresh state';refresh.onclick=()=>record('manual.refresh');
  const disable=document.createElement('button');disable.type='button';disable.textContent='Switch to USER';disable.onclick=()=>setMode('USER');
  const trace=document.createElement('details'),summary=document.createElement('summary'),history=document.createElement('pre');summary.textContent='Recent state transitions';history.id='user-debug-history';trace.append(summary,history);
  panel.append(title,note,current,refresh,disable,trace);const main=document.querySelector('main');if(main)main.before(panel);else document.body.append(panel);
 }
 function render(){if(mode!=='USERDEBUG')return;ensurePanel();document.getElementById('user-debug-state').textContent=JSON.stringify(snapshot(),null,2);document.getElementById('user-debug-history').textContent=entries.map(e=>`${new Date(e.at).toISOString().slice(11,19)} ${e.event} | session=${e.state.session} UI=${e.state.uiAuth} story=${e.state.story} editor=${e.state.ownStoryReady?'ready':'waiting'}`).join('\n');}
 function record(event){if(mode!=='USERDEBUG')return;try{const entry={at:Date.now(),event:events.includes(event)?event:'manual.refresh',state:snapshot()};entries.push(entry);entries=entries.slice(-LIMIT);persist();render();safely(()=>console.debug('[USERDEBUG]',entry),null);}catch{/* Diagnostics must never change application or authentication outcomes. */}}
 function setMode(next){if(!['USER','USERDEBUG'].includes(next))return;mode=next;const current=new URL(location.href);current.searchParams.set('userMode',mode);safely(()=>history.replaceState(history.state,'',current.href),null);if(mode==='USER'){entries=[];panel?.remove();panel=null;persist();const target=document.getElementById('header-login')||document.getElementById('signin-nickname');target?.focus();}else{persist();record('mode.changed');}}
 if(mode==='USERDEBUG'){const previous=safely(()=>JSON.parse(sessionStorage.getItem(TRACE)||'[]'),[]);if(Array.isArray(previous))entries=previous.filter(e=>Number.isFinite(e?.at)&&events.includes(e?.event)).slice(-LIMIT).map(e=>({at:e.at,event:e.event,state:sanitize(e.state)}));}
 globalThis.UserDebug=Object.freeze({mode:()=>mode,snapshot,history:()=>entries.map(e=>({at:e.at,event:e.event,state:{...e.state}})),record,setMode});
 persist();if(mode==='USERDEBUG')record('mode.changed');
})();
