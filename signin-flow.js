'use strict';
const SignInFlow=(()=>{
  function returnTarget(href,stored=''){
    const here=new URL(href),fallback=new URL('index.html',here);
    const requested=here.searchParams.get('returnTo')||stored;
    try{
      const target=new URL(requested||fallback.href,here);
      if(target.origin!==fallback.origin||![fallback.pathname,new URL('./',here).pathname].includes(target.pathname))return fallback.href;
      const hashes=['','#community','#stories-title','#featured-story','#add-candle'];
      fallback.hash=hashes.includes(target.hash)?target.hash:'';
      return fallback.href;
    }catch{return fallback.href;}
  }
  function create({config={},sessionModule,sdkFactory,href,storage,navigate,onChange=()=>{},fetcher=globalThis.fetch,timeoutMs=15000}={}){
    let sessionWaiters=[];
    let phase='checking',busy=false,finished=false,stopped=false,sequence=0,client=null,abort=null;
    const returnKey='light-em-up-signin-return';
    let stored='';try{stored=storage?.getItem(returnKey)||'';}catch{}
    const target=returnTarget(href,stored);
    const back=new URL(target);if(back.hash==='#add-candle')back.hash='';const cancelTarget=back.href;
    const currentURL=new URL(href);
    const callbackError=currentURL.searchParams.has('error')||new URLSearchParams(currentURL.hash.slice(1)).has('error');
    let state=Object.freeze({phase,message:'Checking your session…',error:null,user:null});
    function publish(next,message='',error=null,user=null){phase=next;state=Object.freeze({phase,message,error,user});onChange(state);return state;}
    function done(user){
      if(stopped||finished)return state;
      finished=true;publish('signedIn','You’re signed in. Returning to the community.',null,user);
      try{storage?.removeItem(returnKey);storage?.setItem('light-em-up-signin-focus',new URL(target).hash.slice(1)||'header-login');}catch{}
      navigate(target);return state;
    }
    function applySession(value){
      if(value.status==='signedIn')return done(value.user);
      if(callbackError&&value.status!=='notConfigured')return publish('failed','','cancelled');
      if(value.status==='signedOut')return publish('ready');
      if(value.status==='notConfigured')return publish('unavailable','Sign-in is temporarily unavailable. You can still browse the community.');
      return publish('checkFailed','We couldn’t check your session. Try again or browse the community.');
    }
    const restoration=sessionModule.create({config,timeoutMs,onChange:value=>{if(value.status!=='checking'){const waiting=sessionWaiters;sessionWaiters=[];for(const resolve of waiting)resolve(value);}},clientFactory:(url,key,options)=>{
      if(!client){
        if(typeof sdkFactory!=='function')throw new Error('Auth client unavailable');
        client=sdkFactory(url,key,{...options,global:{fetch:(input,init={})=>fetcher(input,{...init,...(abort?{signal:abort.signal}:{})})}});
      }
      return client;
    }});
    async function stableSession(result){
      if(result.status!=='checking')return result;
      const latest=restoration.snapshot();if(latest.status!=='checking')return latest;
      return new Promise(resolve=>sessionWaiters.push(resolve));
    }
    function releaseWaiters(){const waiting=sessionWaiters;sessionWaiters=[];for(const resolve of waiting)resolve(restoration.snapshot());}
    async function start(){
      if(stopped||finished||busy)return state;
      const request=++sequence;busy=true;publish('checking','Checking your session…');
      try{const result=await stableSession(await restoration.start());if(!stopped&&request===sequence)applySession(result);}finally{busy=false;}
      return state;
    }
    async function bounded(operation){
      let timer;
      try{return await Promise.race([operation(),new Promise((_,reject)=>{timer=setTimeout(()=>{abort?.abort();reject(new Error('Sign-in timed out'));},timeoutMs);})]);}
      finally{clearTimeout(timer);}
    }
    async function signIn({email,password}){
      if(stopped||finished||busy||!['ready','failed'].includes(phase))return state;
      const request=++sequence;busy=true;abort=new AbortController();publish('signingIn','Signing in…');
      try{
        const result=await bounded(()=>client.auth.signInWithPassword({email,password}));
        if(stopped||request!==sequence)return state;
        if(result.error){
          const kind=result.error.code==='email_not_confirmed'?'unconfirmed':result.error.code==='invalid_credentials'||result.error.status===400?'credentials':'connection';
          return publish('failed','',kind);
        }
        const verified=await stableSession(await restoration.retry());
        if(stopped||request!==sequence)return state;
        return verified.status==='signedIn'?done(verified.user):publish('failed','','connection');
      }catch{if(!stopped&&request===sequence)return publish('failed','','connection');}
      finally{busy=false;abort=null;}
      return state;
    }
    async function google(){
      if(stopped||finished||busy||!config.googleEnabled||!['ready','failed'].includes(phase))return state;
      const request=++sequence;busy=true;abort=new AbortController();publish('signingIn','Opening Google sign-in…');
      try{
        try{storage?.setItem(returnKey,target);}catch{}
        const result=await bounded(()=>client.auth.signInWithOAuth({provider:'google',options:{redirectTo:new URL('signin.html',href).href,skipBrowserRedirect:true}}));
        if(stopped||request!==sequence)return state;
        if(result.error||!result.data?.url)return publish('failed','','provider');
        const redirect=new URL(result.data.url);
        if(redirect.protocol!=='https:'||redirect.username||redirect.password||redirect.origin!==new URL(config.url).origin||redirect.pathname!=='/auth/v1/authorize')return publish('failed','','provider');
        publish('redirecting','Continuing to Google…');navigate(redirect.href);return state;
      }catch{if(!stopped&&request===sequence)return publish('failed','','provider');}
      finally{busy=false;abort=null;}
      return state;
    }
    function cancel(){
      if(stopped)return;
      stopped=true;sequence++;abort?.abort();restoration.stop();releaseWaiters();client?.auth.stopAutoRefresh?.();
      try{storage?.removeItem(returnKey);}catch{}
      navigate(cancelTarget);
    }
    function stop(){stopped=true;sequence++;abort?.abort();restoration.stop();releaseWaiters();client?.auth.stopAutoRefresh?.();}
    return Object.freeze({start,retry:start,signIn,google,cancel,stop,snapshot:()=>state,target,cancelTarget});
  }
  return Object.freeze({create,returnTarget});
})();
if(typeof module!=='undefined'&&module.exports)module.exports=SignInFlow;
