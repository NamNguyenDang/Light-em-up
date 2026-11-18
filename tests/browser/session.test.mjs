import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),root=fileURLToPath(new URL('../../',import.meta.url));
const server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);assert(file.startsWith(root));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(await fs.readFile(file));}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}/index.html`;
await fs.mkdir(path.join(root,'test-results'),{recursive:true});
let browser;
try{
 browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||undefined});
 const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const wait=status=>page.waitForFunction(s=>document.body.getAttribute('data-session-state')===s,status);
 await page.goto(url);await wait('notConfigured');assert(await page.locator('#session-feedback').isHidden());assert(await page.locator('#map').isVisible());
 let userStatus=200,failNetwork=false,refreshStatus=200,holdUser=false,requests=0;
 let releaseUser;
 const verified={id:'verified-user',aud:'authenticated',role:'authenticated',email:'private@example.test',user_metadata:{nickname:'Nam'},app_metadata:{provider:'email',providers:['email']},created_at:new Date().toISOString()};
 const encode=v=>Buffer.from(JSON.stringify(v)).toString('base64url');
 const session=expired=>({access_token:`${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:'verified-user',aud:'authenticated',role:'authenticated',exp:Math.floor(Date.now()/1000)+(expired?-120:3600),iat:Math.floor(Date.now()/1000)-60})}.fixture`,refresh_token:'fixture-refresh',expires_at:Math.floor(Date.now()/1000)+(expired?-120:3600),expires_in:3600,token_type:'bearer',user:{...verified,user_metadata:{nickname:'Untrusted cache'}}});
 await page.route('**/supabase-config.js',route=>route.fulfill({contentType:'text/javascript',body:"globalThis.LIGHT_EM_UP_AUTH={url:'https://fr12-test.supabase.co',publishableKey:'sb_publishable_fixture'};"}));
 await page.route('https://fr12-test.supabase.co/**',async route=>{
  if(route.request().method()==='OPTIONS'){await route.fulfill({status:200,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization,apikey,x-client-info,content-type,x-supabase-api-version','Access-Control-Allow-Methods':'GET,POST,OPTIONS'}});return;}
  const endpoint=new URL(route.request().url()).pathname;
  if(endpoint.endsWith('/user')){
   requests++;
   if(holdUser)await new Promise(resolve=>{releaseUser=resolve;});
   if(failNetwork){await route.abort('failed');return;}
   await route.fulfill({status:userStatus,headers:{'Access-Control-Allow-Origin':'*'},json:userStatus===200?verified:{message:'Session could not be verified',code:userStatus===401?'bad_jwt':'unexpected_failure'}});
  }else if(endpoint.endsWith('/token'))await route.fulfill({status:refreshStatus,headers:{'Access-Control-Allow-Origin':'*'},json:refreshStatus===200?session(false):{message:'Refresh token not found',code:'refresh_token_not_found'}});
  else await route.fulfill({status:404,headers:{'Access-Control-Allow-Origin':'*'},json:{message:'Fixture endpoint not found'}});
 });
 await page.reload();await wait('signedOut');assert.equal(requests,0);assert.equal(await page.locator('#header-login').textContent(),'Log in');
 // A local story must never turn into a signed-in session.
 await page.evaluate(()=>localStorage.setItem('light-em-up-v1',JSON.stringify({profile:{id:'mine',nickname:'Local only',city:'Kiruna',lit:true,visible:true},reactions:[],reports:[],opens:0})));
 await page.reload();await wait('signedOut');assert.equal(await page.locator('#header-login').textContent(),'Log in');
 await page.evaluate(value=>localStorage.setItem('sb-fr12-test-auth-token',JSON.stringify(value)),session(false));
 holdUser=true;await page.reload();await wait('checking');assert(await page.locator('#header-login').isDisabled());assert(await page.locator('#map').isVisible());
 await page.waitForFunction(()=>document.readyState==='complete');for(let i=0;!releaseUser&&i<300;i++)await new Promise(r=>setTimeout(r,10));assert(releaseUser,'Expected a user verification request');holdUser=false;releaseUser();
 await wait('signedIn');assert.equal(await page.locator('#header-login').textContent(),'Nam');assert(!(await page.locator('#session-status').textContent()).includes('private@example'));
 await page.reload();await wait('signedIn');assert.equal(await page.locator('#header-login').textContent(),'Nam');
 userStatus=503;await page.reload();await wait('checkFailed');assert(await page.locator('#session-retry').isVisible());assert(await page.locator('#map').isVisible());
 await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
 const axeResult=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
 await fs.writeFile(path.join(root,'test-results/axe-session-error.json'),JSON.stringify(axeResult,null,2));assert.deepEqual(axeResult.violations,[]);
 assert.equal(await page.locator('#session-status').getAttribute('role'),'status');assert.equal(await page.locator('#session-status').getAttribute('aria-atomic'),'true');
 const target=await page.locator('#session-retry').boundingBox();assert(target.width>=44&&target.height>=44);
 await page.setViewportSize({width:320,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.screenshot({path:path.join(root,'test-results/session-error-320.png'),fullPage:true});
 userStatus=200;await page.locator('#session-retry').focus();await page.keyboard.press('Enter');await wait('signedIn');assert(await page.locator('#header-login').evaluate(n=>n===document.activeElement));
 userStatus=401;await page.reload();await wait('signedOut');assert.equal(await page.locator('#header-login').textContent(),'Log in');
 userStatus=200;refreshStatus=400;await page.evaluate(value=>localStorage.setItem('sb-fr12-test-auth-token',JSON.stringify(value)),session(true));await page.reload();await wait('signedOut');
 assert.deepEqual(errors,[]);
 console.log('PASS: actual Supabase SDK with isolated HTTP fixtures — no config/session, local-profile isolation, loading/verified user/reload, server error, WCAG axe error-state scan, 320px reflow, 44px retry target, keyboard retry/focus and expired refresh. No live Supabase account used.');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
