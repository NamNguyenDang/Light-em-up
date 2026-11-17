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
  function renderSession(value){
    signout.hidden=value.status!=='signedIn';
    document.body.setAttribute('data-session-state',value.status);
    // Optional FR-11 bridge: this feature also works before FR-11 is merged.
    if(typeof dispatchApplication==='function'&&value.status!=='notConfigured'){
      dispatchApplication({type:'AUTH_CHANGED',status:value.status,user:value.user});
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
    for(const listener of listeners)listener(value);
  }
  const controller=SessionRestoration.create({
    config:globalThis.LIGHT_EM_UP_AUTH||{},
    clientFactory:(...args)=>{const client=globalThis.supabase.createClient(...args);sdk=client;repository=StoryRepository.create(client);return client;},
    onChange:renderSession
  });
  globalThis.LightEmUpSession=Object.freeze({
    publicStories(){return repository?repository.publicStories():Promise.resolve([]);},
    async signOut(){if(!sdk)throw new Error('No account client');const result=await sdk.auth.signOut({scope:'local'});if(result.error)throw result.error;},
    loadStory(owner){if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.load(owner);},
    saveStory(owner,story){if(controller.snapshot().user?.id!==owner||!repository)throw new Error('No verified account');return repository.save(owner,story);},
    subscribe(listener){listeners.add(listener);listener(controller.snapshot());return ()=>listeners.delete(listener);}
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
  void controller.start();
})();
