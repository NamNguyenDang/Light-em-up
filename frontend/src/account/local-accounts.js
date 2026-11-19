'use strict';
// Browser-local profile separation, not a trusted server or encrypted vault.
const LocalAccounts=(()=>{
 const DB='light-em-up-accounts-v1',SESSION='light-em-up-local-session',ITERATIONS=600000,TTL=12*60*60*1000;
 const fail=code=>Object.assign(new Error(code),{code,status:code==='session'?401:undefined});
 function nickname(value){const display=String(value??'').normalize('NFKC').trim();if(!display||display.length>40||!/[\p{L}\p{N}]/u.test(display)||!/^[\p{L}\p{N} ._-]+$/u.test(display))throw fail('nickname');return {display,key:display.toLocaleLowerCase('en-US')};}
 function passwordIssue(password){if(typeof password!=='string'||password.length<8||password.length>128)return 'length';return /^[A-Za-z0-9]+$/.test(password)?null:'characters';}
 function create({database=globalThis.indexedDB,crypto=globalThis.crypto,storage=globalThis.sessionStorage,now=Date.now}={}){
  let connection;const listeners=new Set();
  function changed(){for(const fn of listeners)try{const result=fn();if(result?.catch)result.catch(()=>globalThis.UserDebug?.record('view.error'));}catch{globalThis.UserDebug?.record('view.error');}}
  async function db(){const activeDB=database||globalThis.indexedDB;if(!activeDB||!crypto?.subtle||!crypto?.getRandomValues)throw fail('storage');if(!connection)connection=new Promise((resolve,reject)=>{const r=activeDB.open(DB,1);r.onupgradeneeded=()=>{const d=r.result;const a=d.createObjectStore('accounts',{keyPath:'id'});a.createIndex('nickname','key',{unique:true});d.createObjectStore('sessions',{keyPath:'digest'});d.createObjectStore('candles',{keyPath:'owner'});};r.onsuccess=()=>{const opened=r.result;opened.onversionchange=()=>{opened.close();connection=null;};const fixture=globalThis.LIGHT_EM_UP_AUTH?.offlineTestAccount===true?globalThis.LIGHT_EM_UP_OFFLINE_ACCOUNT:null;if(!fixture){resolve(opened);return;}const tx=opened.transaction('accounts','readwrite'),accounts=tx.objectStore('accounts'),existing=accounts.index('nickname').get(fixture.key);existing.onsuccess=()=>{if(!existing.result)accounts.add({...fixture});};tx.oncomplete=()=>resolve(opened);tx.onabort=()=>{opened.close();connection=null;reject(fail('storage'));};};r.onerror=()=>{connection=null;reject(fail('storage'));};r.onblocked=()=>{connection=null;reject(fail('storage'));};});return connection;}
  const bytes=n=>crypto.getRandomValues(new Uint8Array(n));
  const hex=b=>Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');
  const unhex=s=>{if(typeof s!=='string'||!/^[a-f0-9]+$/.test(s)||s.length%2)throw fail('storage');return Uint8Array.from(s.match(/../g),x=>parseInt(x,16));};
  async function digest(token){return hex(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))));}
  async function derive(password,salt){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return hex(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:unhex(salt),iterations:ITERATIONS,hash:'SHA-256'},key,256)));}
  async function read(store,key,index){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction(store,'readonly'),s=tx.objectStore(store),r=index?s.index(index).get(key):s.get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(fail('storage'));});}
  async function write(store,value,add=false){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction(store,'readwrite');tx.objectStore(store)[add?'add':'put'](value);tx.oncomplete=()=>resolve(value);tx.onabort=()=>reject(fail(tx.error?.name==='ConstraintError'?'duplicate':'storage'));tx.onerror=()=>{};});}
  function token(){try{const t=storage.getItem(SESSION);if(!t)return null;if(!/^[a-f0-9]{64}$/.test(t)){storage.removeItem(SESSION);return null;}return t;}catch{throw fail('storage');}}
  async function identity(){await db();const t=token();if(!t)return null;const s=await read('sessions',await digest(t));if(!s||!Number.isFinite(s.expiresAt)||s.expiresAt<=now()){storage.removeItem(SESSION);return null;}const a=await read('accounts',s.accountId);return a?{id:a.id,nickname:a.nickname}:null;}
  async function begin(a){
   const t=hex(bytes(32)),old=token();
   await write('sessions',{digest:await digest(t),accountId:a.id,expiresAt:now()+TTL});
   let verified;
   try{storage.setItem(SESSION,t);if(storage.getItem(SESSION)!==t)throw fail('storage');verified=await identity();if(verified?.id!==a.id)throw fail('storage');if(old)await revoke(old);}
   catch{await revoke(t);try{if(old)storage.setItem(SESSION,old);else storage.removeItem(SESSION);}catch{}throw fail('storage');}
   changed();return verified;
  }
  async function discardRegistration(id){const d=await db();await new Promise((resolve,reject)=>{const tx=d.transaction(['accounts','sessions'],'readwrite');tx.objectStore('accounts').delete(id);const sessions=tx.objectStore('sessions'),r=sessions.getAll();r.onsuccess=()=>{for(const item of r.result)if(item.accountId===id)sessions.delete(item.digest);};tx.oncomplete=resolve;tx.onabort=()=>reject(fail('storage'));});}
  async function revoke(t){if(!t)return;const key=await digest(t),d=await db();await new Promise((resolve,reject)=>{const tx=d.transaction('sessions','readwrite');tx.objectStore('sessions').delete(key);tx.oncomplete=resolve;tx.onabort=()=>reject(fail('storage'));});}
  async function register(name,password){const n=nickname(name);if(passwordIssue(password))throw fail('password');if(await read('accounts',n.key,'nickname'))throw fail('duplicate');const salt=hex(bytes(16)),a={id:hex(bytes(16)),key:n.key,nickname:n.display,salt,verifier:await derive(password,salt),algorithm:'PBKDF2-SHA256',iterations:ITERATIONS};await write('accounts',a,true);try{return await begin(a);}catch(error){await discardRegistration(a.id);throw error;}}
  async function signIn(name,password){let n;try{n=nickname(name);}catch{throw fail('credentials');}if(typeof password!=='string'||password.length>128)throw fail('credentials');const a=await read('accounts',n.key,'nickname');const candidate=await derive(password,a?.salt||'00'.repeat(16));let difference=0;const expected=a?.verifier||'00'.repeat(32);for(let i=0;i<64;i++)difference|=candidate.charCodeAt(i)^expected.charCodeAt(i);if(!a||difference)throw fail('credentials');return begin(a);}
  async function signOut(){const t=token();await revoke(t);try{storage.removeItem(SESSION);}catch{throw fail('storage');}changed();}
  // Authorization and candle operation share one transaction, avoiding a logout/write race.
  async function own(owner,story){const t=token();if(!t)throw fail('session');const key=await digest(t),d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction(['sessions','accounts','candles'],story===undefined?'readonly':'readwrite');let result,error;const abort=code=>{error=fail(code);tx.abort();};const s=tx.objectStore('sessions').get(key);s.onsuccess=()=>{if(!s.result||s.result.accountId!==owner||!Number.isFinite(s.result.expiresAt)||s.result.expiresAt<=now()){abort('session');return;}const a=tx.objectStore('accounts').get(owner);a.onsuccess=()=>{if(!a.result){abort('session');return;}const c=tx.objectStore('candles');if(story===undefined){const r=c.get(owner);r.onsuccess=()=>{result=r.result?.story||null;};}else{if(!story||typeof story.city!=='string'){abort('story');return;}result={id:'local-'+owner,nickname:a.result.nickname,city:story.city.slice(0,100),lit:!!story.lit,visible:!!story.visible};for(const field of ['message','status','seeking','role','company'])result[field]=String(story[field]||'').slice(0,field==='message'?600:80);c.put({owner,story:result});}};};tx.oncomplete=()=>{if(story!==undefined)changed();resolve(result);};tx.onabort=()=>reject(error||fail('storage'));tx.onerror=()=>{};});}
  async function publicStories(){const d=await db();return new Promise((resolve,reject)=>{const r=d.transaction('candles','readonly').objectStore('candles').getAll();r.onsuccess=()=>resolve(r.result.filter(x=>x.story.visible).map(x=>x.story));r.onerror=()=>reject(fail('storage'));});}
  return Object.freeze({register,signIn,signOut,identity,load:owner=>own(owner),save:(owner,story)=>own(owner,story),publicStories,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);}});
 }
 let singleton;
 function current(){if(!singleton)singleton=create();return singleton;}
 function sessionController({onChange=()=>{}}={}){
  let stopped=false,sequence=0,unsubscribe,state=Object.freeze({status:'checking',user:null,canRetry:false});
  function publish(status,user=null){state=Object.freeze({status,user,canRetry:status==='checkFailed'});try{onChange(state);}catch{try{globalThis.UserDebug?.record('view.error');}catch{}}return state;}
  async function check(){
   if(stopped)return state;const request=++sequence;publish('checking');let user;
   try{const store=current();if(!unsubscribe)unsubscribe=store.subscribe(()=>void check());user=await store.identity();}
   catch{if(!stopped&&request===sequence)publish('checkFailed');return state;}
   if(!stopped&&request===sequence)publish(user?'signedIn':'signedOut',user);
   return state;
  }
  return Object.freeze({start:check,retry:check,snapshot:()=>state,stop(){stopped=true;sequence++;unsubscribe?.();}});
 }
 return Object.freeze({create,current,sessionController,nickname,passwordIssue});
})();
if(typeof module!=='undefined'&&module.exports)module.exports=LocalAccounts;
