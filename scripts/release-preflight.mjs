// Checks served artifacts, not mocked application routes. This is NOT a live acceptance pass.
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url),{configurationStatus}=require('../session-restoration.js');
export async function inspectRelease(baseURL,{fetcher=fetch,allowLocalhost=false}={}){
 const checks=[];let base;
 try{base=new URL(baseURL);if(base.username||base.password||base.search||base.hash||!(base.protocol==='https:'||(allowLocalhost&&base.protocol==='http:'&&['localhost','127.0.0.1'].includes(base.hostname))))throw new Error();if(!base.pathname.endsWith('/'))base.pathname+='/';}
 catch{return {status:'BLOCKED',release_ready:false,checks:[{name:'origin',pass:false,reason:'A clean deployed HTTPS site root is required.'}]};}
 const get=async path=>{const response=await fetcher(new URL(path,base),{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error('Unavailable served artifact');return await response.text();};
 try{
  const [config,signin,flow,index]=await Promise.all([get('supabase-config.js'),get('signin.html'),get('signin-flow.js'),get('index.html')]);
  // Parse only the expected public string literals; never execute a remote config script.
  const value=name=>{const match=config.match(new RegExp('\\b'+name+'\\s*:\\s*([\'\"])([^\'\"\\\\]*)\\1'));return match?.[2]||'';};
  const url=value('url'),publishableKey=value('publishableKey');
  const ready=configurationStatus({url,publishableKey})==='ready'&&!/fixture|example|localhost/i.test(url+publishableKey);
  checks.push({name:'served-public-auth-configuration',pass:ready,reason:ready?'Public configuration is present; real provider operation still unverified.':'Public configuration is missing, invalid or a fixture. Do not release accounts.'});
  checks.push({name:'served-registration-path',pass:signin.includes('id="account-mode-toggle"')&&flow.includes('auth.signUp('),reason:'Served registration entry and SDK call must exist.'});
  checks.push({name:'served-candle-entry',pass:index.includes('id="join"'),reason:'Candle entry must be present in the served artifact.'});
 }catch{checks.push({name:'served-artifacts',pass:false,reason:'Required served artifacts could not be fetched. No release acceptance was performed.'});}
 return {status:checks.every(c=>c.pass)?'READY_FOR_LIVE_SMOKE':'BLOCKED',release_ready:false,checks,required_next:'Real registration/confirmation -> sign-in -> create/light/save -> reload -> sign-out/in -> persisted ownership/lit state, with network mocking disabled.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const result=await inspectRelease(process.argv[2]);console.log(JSON.stringify(result,null,2));process.exitCode=result.status==='BLOCKED'?2:0;}
