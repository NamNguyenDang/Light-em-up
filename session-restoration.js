'use strict';
// FR-12: the SDK owns credentials; consumers receive a minimal verified identity.
const SessionRestoration=(()=>{
  function create({config={},clientFactory,onChange=()=>{},timeoutMs=10000}={}){
    let client=null,subscription=null,generation=0,stopped=false,scheduled=null;
    let current=Object.freeze({status:'notConfigured',user:null,reason:null,canRetry:false});
    const snapshot=()=>current;
    function publish(status,user=null,reason=null,canRetry=false){
      current=Object.freeze({status,user:user?Object.freeze(user):null,reason,canRetry});onChange(current);return current;
    }
    function invalidSession(error){
      return error?.name==='AuthSessionMissingError'||[401,403].includes(error?.status)||['refresh_token_not_found','refresh_token_already_used','session_not_found','session_expired','bad_jwt'].includes(error?.code);
    }
    function validConfig(){
      try{const url=new URL(config.url);return url.protocol==='https:'&&!url.username&&!url.password&&url.pathname==='/'&&!url.search&&!url.hash&&typeof config.publishableKey==='string'&&/^sb_publishable_[A-Za-z0-9_-]+$/.test(config.publishableKey);}catch{return false;}
    }
    function listen(){
      const result=client.auth.onAuthStateChange((event)=>{
        if(stopped)return;
        if(event==='SIGNED_OUT'){generation++;clearTimeout(scheduled);publish('signedOut');}
        else if(['SIGNED_IN','TOKEN_REFRESHED','USER_UPDATED'].includes(event)){
          // Never await another SDK auth call inside its auth-event callback.
          clearTimeout(scheduled);scheduled=setTimeout(()=>{void check();},0);
        }
      });
      subscription=result?.data?.subscription;
    }
    async function verify(){
      const sessionResult=await client.auth.getSession();
      if(sessionResult.error)throw sessionResult.error;
      if(!sessionResult.data?.session)return null;
      // getSession reads browser storage. Its embedded user is not trusted.
      const userResult=await client.auth.getUser();
      if(userResult.error)throw userResult.error;
      const user=userResult.data?.user;
      if(!user||typeof user.id!=='string'||!user.id)throw new Error('Invalid verified user');
      const metadata=user.user_metadata||{};
      const name=[metadata.nickname,metadata.name,metadata.full_name].find(v=>typeof v==='string'&&v.trim());
      return {id:user.id,nickname:name?name.trim().slice(0,80):'Your account'};
    }
    async function check(){
      if(stopped)return current;
      const request=++generation;
      if(!config.url&&!config.publishableKey)return publish('notConfigured');
      publish('checking');
      if(!validConfig())return publish('checkFailed',null,'configuration',false);
      let timer;
      try{
        if(!client){
          if(typeof clientFactory!=='function')throw new Error('Auth client unavailable');
          client=clientFactory(config.url,config.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
          listen();
        }
        const user=await Promise.race([verify(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Session check timed out')),timeoutMs);})]);
        if(stopped||request!==generation)return current;
        return user?publish('signedIn',user):publish('signedOut');
      }catch(error){
        if(stopped||request!==generation)return current;
        return invalidSession(error)?publish('signedOut'):publish('checkFailed',null,'connection',true);
      }finally{clearTimeout(timer);}
    }
    function stop(){stopped=true;generation++;clearTimeout(scheduled);subscription?.unsubscribe();}
    return Object.freeze({start:check,retry:check,stop,snapshot});
  }
  return Object.freeze({create});
})();
if(typeof module!=='undefined'&&module.exports)module.exports=SessionRestoration;
