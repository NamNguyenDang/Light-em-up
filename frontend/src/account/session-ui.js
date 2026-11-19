'use strict';
(()=>{
  const feedback=document.getElementById('session-feedback');
  const message=document.getElementById('session-status');
  const retry=document.getElementById('session-retry');
  const account=document.getElementById('header-login');
  const originalLabel=account.textContent;
  let retryAttempt=false,repository=null,sdk=null;
  const signout=document.getElementById('signout');
  const listeners=new Set();
  const local=globalThis.LIGHT_EM_UP_AUTH?.mode==='local';
  const localStore=()=>LocalAccounts.current();
  function renderSession(value){
    signout.hidden=value.status!=='signedIn';
    document.body.setAttribute('data-session-state',value.status);
    // Optional FR-11 bridge: this feature also works before FR-11 is merged.
    if(typeof dispatchApplication==='function'&&value.status!=='notConfigured'){
      dispatchApplication({type:'SESSION_SYNC',status:value.status,user:value.user});
    }
    feedback.hidden=value.status==='notConfigured';
    retry.hidden=!(value.canRetry||(value.status==='checking'&&retryAttempt));
    retry.disabled=value.status==='checking';
    account.disabled=value.status==='checking';
    account.textContent=value.status==='signedIn'?value.user.nickname:originalLabel;
    if(value.status==='signedIn'){
      try{const id=sessionStorage.getItem('light-em-up-signin-focus');if(['header-login','stories-title','featured-story','community'].includes(id)){
        sessionStorage.removeItem('light-em-up-signin-focus');const target=document.getElementById(id);if(target){if(id!=='header-login')target.setAttribute('tabindex','-1');target.focus();}
      }}catch{}
    }
    const text={checking:'Checking your session…',signedOut:'You’re browsing as a visitor.',signedIn:value.user?`Welcome back, ${value.user.nickname}.`:'',checkFailed:'We couldn’t check your session. You can still browse the community.',notConfigured:''};
    message.textContent=text[value.status];
    for(const listener of listeners)deliver(listener,value);
    globalThis.UserDebug?.record('session.change');
  }
  function viewFailure(value){
    globalThis.UserDebug?.record('view.error');
    const current=controller.snapshot();if(current.status!==value.status||current.user?.id!==value.user?.id)return;
    feedback.hidden=false;retry.hidden=false;retry.disabled=false;
    message.textContent=current.status==='signedIn'?'You are signed in, but a page section could not refresh. Check your session again.':'A page section could not refresh. Check your session again.';
  }
  function deliver(listener,value){try{const result=listener(value);if(result?.catch)result.catch(()=>viewFailure(value));}catch{viewFailure(value);}}
  const controller=SessionRestoration.create({
    config:globalThis.LIGHT_EM_UP_AUTH||{},
    clientFactory:(...args)=>{const client=globalThis.supabase.createClient(...args);sdk=client;repository=StoryRepository.create(client);return client;},
    onChange:renderSession
  });
  globalThis.LightEmUpSession=Object.freeze({
    reportEncouragement(owner,event,reason){if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.reportEncouragement(event,reason);},
    blockSender(owner,event){if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.blockSender(event);},
    receivedEncouragement(owner,offset){if(local)return Promise.resolve([]);if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.receivedEncouragement(offset);},
    readEncouragement(owner,event){if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.readEncouragement(event);},
    sentEncouragement(owner){if(local)return Promise.resolve([]);if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.sentEncouragement(owner);},
    sendEncouragement(owner,story){if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.sendEncouragement(owner,story);},
    encourage(owner,storyId,message){if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.encourage(owner,storyId,message);},
    publicStories(){if(local)return localStore().publicStories();return repository?repository.publicStories():Promise.resolve([]);},
    async signOut(){if(local)return localStore().signOut();if(!sdk)throw new Error('No account client');const result=await sdk.auth.signOut({scope:'local'});if(result.error)throw result.error;},
    loadStory(owner){if(local)return localStore().load(owner);if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.load(owner);},
    saveStory(owner,story){if(local)return localStore().save(owner,story);if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.save(owner,story);},
    snapshot:()=>controller.snapshot(),
    refresh:()=>controller.retry(),
    subscribe(listener){listeners.add(listener);deliver(listener,controller.snapshot());return ()=>listeners.delete(listener);}
  });
  signout.onclick=async()=>{
    if(signout.disabled)return;
    if(typeof requestProfileClose==='function'&&document.getElementById('profile-dialog').open&&!requestProfileClose())return;
    const user=controller.snapshot().user;signout.disabled=true;message.textContent='Signing out…';
    dispatchApplication({type:'AUTH_CHANGED',status:'signingOut',user});
    try{await LightEmUpSession.signOut();clearPrivateLocalData();dispatchApplication({type:'NAVIGATE',view:'community'});document.getElementById('community').hidden=false;document.getElementById('dashboard').hidden=true;account.focus();message.textContent='You have signed out. Your published candle is unchanged.';}
    catch{dispatchApplication({type:'AUTH_CHANGED',status:'signedIn',user});message.textContent='We could not sign you out. Please try again.';signout.focus();}
    finally{signout.disabled=false;}
  };
  retry.onclick=async()=>{
    retryAttempt=true;
    await controller.retry();
    retryAttempt=false;
    // Restore a visible focus target after the retry button disappears.
    if(!retry.hidden){retry.focus();}else{account.focus();}
  };
  window.addEventListener('pagehide',()=>controller.stop(),{once:true});
  // A page restored from the browser back-forward cache needs fresh listeners.
  window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
  if(local)window.addEventListener('focus',()=>void controller.retry());
  void controller.start();
})();
