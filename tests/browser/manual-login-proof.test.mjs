// FR-36 follow-up: app files from merged main, real UI/auth, explicit black-box checkpoints.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../../',import.meta.url));
let configuredMode='USER';
const server=http.createServer(async(req,res)=>{try{let pathname=new URL(req.url,'http://localhost').pathname;if(pathname.startsWith('/mounted/'))pathname=pathname.slice('/mounted'.length);if(pathname==='/')pathname='/index.html';const file=path.resolve(root,'.'+pathname);assert(file.startsWith(root));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');let body=await fs.readFile(file);if(pathname.endsWith('/supabase-config.js')){body=Buffer.from(body.toString().replace("userMode:'USER'",`userMode:'${configuredMode}'`));res.setHeader('Cache-Control','no-store');}else res.setHeader('Cache-Control',path.extname(file)==='.html'?'no-store':'public,max-age=3600');res.end(body);}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
const report={scope:'real UI on merged-main application; same browser, warm asset cache, no mocked authentication',steps:[],userBrowserDR:'OPEN / exact server state unavailable'};
await fs.mkdir(path.join(root,'test-results'),{recursive:true});let browser,page;
async function record(label,expected,read){const actual=await read();const passed=JSON.stringify(actual)===JSON.stringify(expected);report.steps.push({step:label,expected,actual,result:passed?'PASS':'FAIL'});await fs.writeFile(path.join(root,'test-results/manual-login-proof.json'),JSON.stringify(report,null,2));assert.equal(passed,true,`${label}: ${JSON.stringify(actual)}`);}
try{
 browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||undefined,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});const context=await browser.newContext({viewport:{width:1280,height:900}});page=await context.newPage();const errors=[],external=[];page.on('pageerror',e=>errors.push(e.message));context.on('request',r=>{if(!r.url().startsWith(origin)&&!r.url().startsWith('data:'))external.push(r.url());});
 const waitSession=s=>page.waitForFunction(v=>document.body?.dataset.sessionState===v,s);
 const waitPhase=s=>page.waitForFunction(v=>document.body?.dataset.signinState===v,s);
 const ready=()=>page.waitForFunction(()=>globalThis.LightEmUpAccount?.ready());
 const signOut=async()=>{await page.locator('#header-login').click();await page.locator('#signout').click();await waitSession('signedOut');};
 for(const [mount,prefix]of [['/','Root'],['/mounted/','Mounted']]){
  const base=origin+mount;
  for(let cycle=1;cycle<=3;cycle++){
   const name=`${prefix}Manual${cycle}`,password='Proof123',label=`${prefix}-${cycle}`;
   await page.goto(base);await waitSession('signedOut');await page.locator('#header-login').click();await waitPhase('ready');await page.locator('#account-mode-toggle').click();await page.locator('#signin-nickname').fill(name);await page.locator('#signin-password').fill(password);await page.locator('#signin-submit').click();await page.waitForURL(u=>u.pathname===mount+'index.html');await waitSession('signedIn');await ready();
   // Deliberately log out BEFORE creating a candle: previous coverage mostly created one first.
   await signOut();await page.locator('#header-login').click();await waitPhase('ready');await page.locator('#signin-nickname').fill(name.toLowerCase());await page.locator('#signin-password').fill(password);await page.locator('#signin-submit').click();await page.waitForURL(u=>u.pathname===mount+'index.html');await waitSession('signedIn');await ready();
   await record(label+' normal login → nickname',{nicknameMatches:true,session:'signedIn',ui:'signedIn',editorReady:true},async()=>({nicknameMatches:(await page.locator('#header-login').innerText())===name,session:await page.locator('body').getAttribute('data-session-state'),ui:await page.locator('body').getAttribute('data-auth-state'),editorReady:await page.evaluate(()=>LightEmUpAccount.ready())}));
   await record(label+' Add your candle unlocked',{visible:true,noAutomaticDialog:true},async()=>({visible:await page.getByRole('button',{name:'Add your candle',exact:true}).isVisible(),noAutomaticDialog:await page.locator('#profile-dialog').isHidden()}));
   if(cycle===1){await page.setViewportSize({width:320,height:900});await page.screenshot({path:path.join(root,`test-results/manual-login-${prefix.toLowerCase()}-before-add-320.png`),fullPage:true});await page.setViewportSize({width:1280,height:900});}
   const before=page.url();await page.getByRole('button',{name:'Add your candle',exact:true}).click();await page.locator('#profile-dialog').waitFor({state:'visible'});
   await record(label+' click Add → editor, no login redirect',{editorOpen:true,samePage:true,nicknameMatches:true},async()=>({editorOpen:await page.locator('#profile-dialog').isVisible(),samePage:page.url()===before,nicknameMatches:(await page.locator('[name=nickname]').inputValue())===name}));
   await page.locator('[name=message]').fill('Synthetic manual login acceptance');await page.locator('#save-profile').click();await page.locator('#profile-dialog').waitFor({state:'hidden'});await page.reload();await waitSession('signedIn');await ready();
   await record(label+' save/reload → owned candle',{nicknameMatches:true,story:'saved',messageMatches:true},async()=>({nicknameMatches:(await page.locator('#header-login').innerText())===name,story:await page.locator('body').getAttribute('data-story-state'),messageMatches:(await page.locator('#featured-story').innerText()).includes('Synthetic manual login acceptance')}));
   await signOut();await page.locator('#header-login').click();await waitPhase('ready');await page.locator('#signin-nickname').fill(name);await page.locator('#signin-password').fill(password);await page.locator('#signin-submit').click();await page.waitForURL(u=>u.pathname===mount+'index.html');await waitSession('signedIn');await ready();await page.getByRole('button',{name:'Edit my story',exact:true}).click();await page.locator('#profile-dialog').waitFor({state:'visible'});
   await record(label+' returning login → owned edit, no login redirect',{editorOpen:true,onLanding:true},async()=>({editorOpen:await page.locator('#profile-dialog').isVisible(),onLanding:new URL(page.url()).pathname===mount+'index.html'}));await page.keyboard.press('Escape');await signOut();
  }
 }
 // Public configuration input, not a fabricated session: editing the requested flag must take effect.
 await page.goto(origin+'/index.html');await waitSession('signedOut');await record('configured USER → diagnostics disabled',{mode:'USER',panel:false},async()=>({mode:await page.evaluate(()=>UserDebug.mode()),panel:await page.locator('#user-debug').isVisible()}));
 configuredMode='USERDEBUG';await page.reload();await waitSession('signedOut');
 await record('change configured flag → USERDEBUG panel',{mode:'USERDEBUG',panel:true},async()=>({mode:await page.evaluate(()=>UserDebug.mode()),panel:await page.locator('#user-debug').isVisible()}));
 await page.getByRole('button',{name:'Switch to USER',exact:true}).click();await page.goto(origin+'/index.html');await waitSession('signedOut');await record('explicit USER stays disabled with unchanged config',{mode:'USER',panel:false},async()=>({mode:await page.evaluate(()=>UserDebug.mode()),panel:await page.locator('#user-debug').isVisible()}));
 configuredMode='USER';await page.reload();await waitSession('signedOut');configuredMode='USERDEBUG';await page.reload();await waitSession('signedOut');await record('later configured flag change resets older runtime choice',{mode:'USERDEBUG',panel:true},async()=>({mode:await page.evaluate(()=>UserDebug.mode()),panel:await page.locator('#user-debug').isVisible()}));
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);report.result='PASS';report.loginCases=6;await fs.writeFile(path.join(root,'test-results/manual-login-proof.json'),JSON.stringify(report,null,2));console.log('PASS: six normal-login-before-first-candle and returning-login cases, root/mounted URLs, warm same-browser cache, exact nickname/Add/editor/save/reload/logout outputs, and configuration/debug mode changes. Original user-browser DR remains open pending its served-state evidence.');
}catch(error){report.result='FAIL';if(page){report.finalState=await page.evaluate(()=>globalThis.UserDebug?.snapshot()||{page:location.pathname}).catch(()=>({unavailable:true}));await page.screenshot({path:path.join(root,'test-results/manual-login-failure.png'),fullPage:true}).catch(()=>{});}await fs.writeFile(path.join(root,'test-results/manual-login-proof.json'),JSON.stringify(report,null,2));throw error;
}finally{await browser?.close();await new Promise(r=>server.close(r));}
