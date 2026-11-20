'use strict';
// Opt-in, bounded, allowlisted diagnostics. Never inspect inputs, identities or credentials.
(()=>{
 const PREF='light-em-up-user-mode',TRACE='light-em-up-user-trace',BUILD='FR-39-v1',LIMIT=20;
 const enums={auth:['checking','signedOut','signedIn','signingIn','signingOut','checkFailed','notConfigured'],view:['community','dashboard','signIn'],story:['none','editing','saving','saved','saveFailed'],dialog:['none','profile','info','cluster','encouragement'],signin:['checking','ready','signingIn','signedIn','failed','checkFailed','unavailable','confirmation','redirecting','notApplicable']};
 const HANDOFF='light-em-up-debug-login-return',stages=['none','authenticating','verified','returning','restored','ready','failed'];
 let loginStage='none',toastPending=false;
 const events=['mode.changed','session.change','signin.phase','application.transition','candle.entry','story.load','view.error','manual.refresh','auth.attempt','auth.verified','auth.rejected','signin.return','login.restored','login.ready','login.returnFailed','signin.failed'];
 const pick=(value,values)=>values.includes(value)?value:'unknown';
 const safely=(read,fallback)=>{try{return read();}catch{return fallback;}};
 const url=new URL(location.href),requested=url.searchParams.get('userMode');
 let mode=[requested,safely(()=>sessionStorage.getItem(PREF),null),globalThis.LIGHT_EM_UP_AUTH?.userMode].find(v=>v==='USER'||v==='USERDEBUG')||'USER',entries=[],panel=null,fileLogging='off',sinkGeneration=0,pending=[];
 const page=()=>location.pathname.endsWith('signin.html')?'signin.html':location.pathname.endsWith('index.html')||location.pathname.endsWith('/')?'index.html':'other';
 function sanitize(raw={}){raw=raw&&typeof raw==='object'?raw:{};return {build:BUILD,mode,origin:location.origin,page:page(),session:pick(raw.session,enums.auth),uiAuth:pick(raw.uiAuth,enums.auth),view:pick(raw.view,enums.view),dialog:pick(raw.dialog,enums.dialog),story:pick(raw.story,enums.story),signinPhase:pick(raw.signinPhase,enums.signin),hasVerifiedIdentity:raw.hasVerifiedIdentity===true,ownStoryReady:raw.ownStoryReady===true,hasOwnStoryOwner:raw.hasOwnStoryOwner===true,candleWaiting:raw.candleWaiting===true,candleIntent:raw.candleIntent===true,headerIdentityShown:raw.headerIdentityShown===true,fileLogging:pick(raw.fileLogging,['off','checking','connected','unavailable']),loginStage:pick(raw.loginStage,stages)};}
 function snapshot(){const app=safely(()=>getApplicationDebugState(),{})||{},session=safely(()=>LightEmUpSession.snapshot(),{})||{},entry=safely(()=>LightEmUpCandleEntry.snapshot(),{})||{},signin=page()==='signin.html',phase=document.body?.dataset.signinState,signInStatus={checking:'checking',ready:'signedOut',failed:'signedOut',signingIn:'signingIn',signedIn:'signedIn',checkFailed:'checkFailed',unavailable:'notConfigured'}[phase],status=session.status||(signin?signInStatus:undefined);return sanitize({session:status,uiAuth:app.authentication||(signin?signInStatus:undefined),view:app.view||(signin?'signIn':undefined),dialog:app.dialog||(signin?'none':undefined),story:app.story||(signin?'none':undefined),signinPhase:signin?phase:'notApplicable',hasVerifiedIdentity:signin?phase==='signedIn':session.status==='signedIn'&&!!session.user?.id,ownStoryReady:safely(()=>LightEmUpAccount.ready(),false),hasOwnStoryOwner:safely(()=>!!LightEmUpAccount.owner(),false),candleWaiting:entry.waiting,candleIntent:entry.intent,loginStage,headerIdentityShown:!signin&&session.status==='signedIn'&&document.getElementById('header-login')?.textContent===session.user?.nickname,fileLogging});}
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
  const login=document.createElement('p');login.id='user-debug-login-result';
  panel.append(title,note,login,current,refresh,disable,trace);const main=document.querySelector('main');if(main)main.before(panel);else document.body.append(panel);
 }
 function render(){if(mode!=='USERDEBUG')return;ensurePanel();document.getElementById('user-debug-login-result').textContent=({none:'No fresh login result in this page. Check the transition history for earlier attempts.',authenticating:'Local account service: checking credentials.',verified:'Local account service: password and saved session verified.',returning:'Local account service verified login; waiting for the community page to restore it.',restored:'Login successful: local session reverified and nickname shown. Checking candle readiness.',ready:'Login successful: local session, nickname, UI state and candle editor agree.',failed:'Login failed or the community page could not restore the verified session. No success confirmation.'})[loginStage]||'No verified login result.';document.getElementById('user-debug-state').textContent=JSON.stringify(snapshot(),null,2);document.getElementById('user-debug-history').textContent=entries.map(e=>`${new Date(e.at).toISOString().slice(11,19)} ${e.state.page} ${e.event} | login=${e.state.loginStage} session=${e.state.session} UI=${e.state.uiAuth} story=${e.state.story} editor=${e.state.ownStoryReady?'ready':'waiting'}`).join('\n');}
 function sendFileEvent(entry){
  if(mode!=='USERDEBUG')return;
  if(fileLogging==='checking'){pending.push(entry);pending=pending.slice(-LIMIT);return;}
  if(fileLogging!=='connected')return;
  const generation=sinkGeneration;
  safely(()=>fetch(new URL('/__local/events',location.origin),{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',body:JSON.stringify(entry),keepalive:true}).then(response=>{if(!response.ok&&generation===sinkGeneration&&mode==='USERDEBUG'){fileLogging='unavailable';safely(render,null);}}).catch(()=>{if(generation===sinkGeneration&&mode==='USERDEBUG'){fileLogging='unavailable';safely(render,null);}}),null);
 }
 async function connectFileSink(){
  const generation=++sinkGeneration;pending=[];
  if(mode!=='USERDEBUG'){fileLogging='off';return;}
  if(!['127.0.0.1','localhost','[::1]'].includes(location.hostname)){fileLogging='unavailable';return;}
  fileLogging='checking';
  try{const response=await fetch(new URL('/__local/logging',location.origin),{cache:'no-store',credentials:'omit'});const value=response.ok?await response.json():null;if(generation!==sinkGeneration||mode!=='USERDEBUG')return;fileLogging=value?.enabled===true?'connected':'unavailable';const queued=pending;pending=[];if(fileLogging==='connected')for(const entry of queued)sendFileEvent(entry);record('manual.refresh');}
  catch{if(generation===sinkGeneration&&mode==='USERDEBUG'){pending=[];fileLogging='unavailable';safely(render,null);}}
 }
 function append(event){const entry={at:Date.now(),event:events.includes(event)?event:'manual.refresh',state:snapshot()};entries.push(entry);entries=entries.slice(-LIMIT);persist();render();sendFileEvent(entry);safely(()=>console.debug('[USERDEBUG]',entry),null);}
 function record(event){if(mode!=='USERDEBUG')return;try{
  if(event==='auth.attempt'){loginStage='authenticating';toastPending=false;safely(()=>sessionStorage.removeItem(HANDOFF),null);}
  if(event==='auth.verified'){loginStage='verified';safely(()=>sessionStorage.setItem(HANDOFF,String(Date.now())),null);}
  if(event==='auth.rejected'||event==='signin.failed'){loginStage='failed';safely(()=>sessionStorage.removeItem(HANDOFF),null);}
  if(event==='signin.return')loginStage=loginStage==='verified'?'returning':'none';
  const current=snapshot();if(['restored','ready'].includes(loginStage)&&['signedOut','checkFailed'].includes(current.session)){loginStage='none';toastPending=false;const toast=document.getElementById('toast');if(toast?.textContent==='Login successful. Local session verified.')toast.textContent='';}
  append(event);
  if(page()==='index.html'&&loginStage==='returning'){
   const state=snapshot();
   if(state.session==='signedIn'&&state.headerIdentityShown){loginStage='restored';toastPending=true;safely(()=>sessionStorage.removeItem(HANDOFF),null);append('login.restored');}
   else if(['signedOut','checkFailed','notConfigured'].includes(state.session)){loginStage='failed';safely(()=>sessionStorage.removeItem(HANDOFF),null);append('login.returnFailed');}
  }
  if(loginStage==='restored'){const state=snapshot();if(state.session==='signedIn'&&state.uiAuth==='signedIn'&&state.headerIdentityShown&&state.ownStoryReady){loginStage='ready';append('login.ready');}}
  if(toastPending&&typeof globalThis.notify==='function'){toastPending=false;globalThis.notify('Login successful. Local session verified.');}
 }catch{/* Diagnostics must never change application or authentication outcomes. */}}
 function setMode(next){if(!['USER','USERDEBUG'].includes(next))return;mode=next;const current=new URL(location.href);current.searchParams.set('userMode',mode);safely(()=>history.replaceState(history.state,'',current.href),null);if(mode==='USER'){loginStage='none';toastPending=false;safely(()=>sessionStorage.removeItem(HANDOFF),null);const toast=document.getElementById('toast');if(toast?.textContent==='Login successful. Local session verified.')toast.textContent='';sinkGeneration++;pending=[];fileLogging='off';entries=[];panel?.remove();panel=null;persist();const target=document.getElementById('header-login')||document.getElementById('signin-nickname');target?.focus();}else{persist();safely(()=>void connectFileSink(),null);record('mode.changed');}}
 if(mode==='USERDEBUG'){const previous=safely(()=>JSON.parse(sessionStorage.getItem(TRACE)||'[]'),[]);if(Array.isArray(previous))entries=previous.filter(e=>Number.isFinite(e?.at)&&events.includes(e?.event)).slice(-LIMIT).map(e=>({at:e.at,event:e.event,state:{...sanitize(e.state),page:pick(e.state?.page,['index.html','signin.html','other']),build:/^FR-\d+-v\d+$/.test(e.state?.build)?e.state.build:BUILD}}));}
 globalThis.UserDebug=Object.freeze({mode:()=>mode,snapshot,history:()=>entries.map(e=>({at:e.at,event:e.event,state:{...e.state}})),record,setMode});
 const returnedAt=Number(safely(()=>sessionStorage.getItem(HANDOFF),0));if(mode==='USERDEBUG'&&page()==='index.html'&&returnedAt>0&&Date.now()-returnedAt>=0&&Date.now()-returnedAt<120000)loginStage='returning';else if(mode==='USER'||page()==='index.html')safely(()=>sessionStorage.removeItem(HANDOFF),null);
 persist();if(mode==='USERDEBUG'){safely(()=>void connectFileSink(),null);record('mode.changed');}
})();
