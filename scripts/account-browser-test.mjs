// Real vendored SDK, isolated HTTP fixtures: no live accounts or database writes.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),root=fileURLToPath(new URL('../',import.meta.url));
const server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);assert(file.startsWith(root));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(await fs.readFile(file));}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}/index.html`;
await fs.mkdir(path.join(root,'test-results'),{recursive:true});let browser;
try{
 browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const scan=async label=>{await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const result=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));await fs.writeFile(path.join(root,`test-results/axe-${label}.json`),JSON.stringify(result,null,2));assert.equal(result.violations.length,0,label);};
 const owner='11111111-1111-4111-8111-111111111111',storyId='22222222-2222-4222-8222-222222222222';
 const user={id:owner,aud:'authenticated',role:'authenticated',user_metadata:{nickname:'Nam'},app_metadata:{provider:'email'},created_at:new Date().toISOString()};
 const encode=v=>Buffer.from(JSON.stringify(v)).toString('base64url');
 const session={access_token:`${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:owner,exp:Math.floor(Date.now()/1000)+3600,role:'authenticated'})}.fixture`,refresh_token:'fixture',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user};
 let own={id:storyId,owner_id:owner,nickname:'Account candle',city:'Kiruna',message:'Here with you',status:'',seeking:'',role:'',company:'',lit:true,visible:true},writes=0,failSave=false,expireSave=false,failLoad=true;
 const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization,apikey,x-client-info,content-type,x-supabase-api-version,prefer','Access-Control-Allow-Methods':'GET,POST,PATCH,DELETE,OPTIONS','Access-Control-Expose-Headers':'content-range'};
 await page.route('**/supabase-config.js',r=>r.fulfill({contentType:'text/javascript',body:"globalThis.LIGHT_EM_UP_AUTH={url:'https://account-test.supabase.co',publishableKey:'sb_publishable_fixture'};"}));
 await page.route('https://account-test.supabase.co/**',async r=>{
  const request=r.request(),u=new URL(request.url()),method=request.method();if(method==='OPTIONS'){await r.fulfill({headers,json:{}});return;}
  if(u.pathname.endsWith('/logout')){await r.fulfill({headers,status:204,body:''});return;}
  if(u.pathname.endsWith('/user')){await r.fulfill({headers,json:user});return;}
  if(u.pathname==='/rest/v1/public_stories'){await r.fulfill({headers,json:[]});return;}
  if(u.pathname==='/rest/v1/stories'){
   if(method==='GET'){if(failLoad){await r.fulfill({headers,status:503,json:{message:'Unavailable'}});return;}assert.equal(u.searchParams.get('owner_id'),'eq.'+owner);await r.fulfill({headers,json:own?[own]:[]});return;}
   writes++;if(failSave||expireSave){await r.fulfill({headers,status:expireSave?401:503,json:{code:expireSave?'PGRST301':'fixture_failure',message:'Fixture failure'}});return;}
   const row=request.postDataJSON();assert.equal(row.owner_id,owner);own={...row,id:storyId};await r.fulfill({headers,json:[own]});return;
  }
  await r.fulfill({headers,status:404,json:{message:'Fixture endpoint missing'}});
 });
 await page.goto(url);await page.evaluate(session=>{localStorage.setItem('sb-account-test-auth-token',JSON.stringify(session));localStorage.setItem('light-em-up-v1',JSON.stringify({profile:{id:'mine',nickname:'Someone else locally',city:'Malmö'},reactions:[],reports:[],opens:0}));},session);
 await page.reload();await page.locator('#own-story-retry').waitFor({state:'visible'});assert(!(await page.locator('#featured-story').innerText()).includes('Someone else'));failLoad=false;await page.locator('#own-story-retry').click();await page.waitForFunction(()=>document.querySelector('#featured-story h3')?.textContent==='Account candle');
 assert.equal(await page.locator('#header-login').textContent(),'Nam');assert(!(await page.locator('#featured-story').innerText()).includes('Someone else'));
 await page.locator('#header-login').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#header-login').getAttribute('aria-expanded'),'true');await scan('account-menu');await page.keyboard.press('Tab');assert(await page.locator('#menu-my-story').evaluate(n=>n===document.activeElement));await page.keyboard.press('Escape');assert.equal(await page.locator('#header-login').getAttribute('aria-expanded'),'false');await page.locator('#header-login').click();await page.locator('#menu-my-story').click();assert(await page.locator('#featured-story').evaluate(n=>n===document.activeElement));await page.locator('#header-login').click();await page.locator('#menu-encouragement').click();assert(await page.locator('#encouragement-title').evaluate(n=>n===document.activeElement));await scan('encouragement-panel');await page.locator('#close-encouragement').click();
 await page.locator('#province-select').selectOption('Skåne');assert.equal(await page.locator('#featured-story h3').textContent(),'Account candle');
 await page.locator('#edit-my-story').click();assert.equal(await page.locator('[name=nickname]').inputValue(),'Account candle');await page.locator('[name=nickname]').fill('Updated account candle');await page.locator('#save-profile').click();await page.locator('#profile-dialog').waitFor({state:'hidden'});assert.equal(writes,1);assert.equal(await page.locator('#featured-story h3').textContent(),'Updated account candle');
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('light-em-up-v1')).profile.nickname),'Someone else locally');
 failSave=true;await page.locator('#edit-my-story').click();await page.locator('[name=message]').fill('Keep this draft');await page.locator('#save-profile').click();await page.waitForFunction(()=>document.body.dataset.storyState==='saveFailed');assert.equal(await page.locator('[name=message]').inputValue(),'Keep this draft');
 expireSave=true;failSave=false;await page.locator('#save-profile').click();await page.locator('#reauthenticate').waitFor({state:'visible'});assert.equal(await page.locator('[name=message]').inputValue(),'Keep this draft');expireSave=false;
 // A refresh resumes only this verified account's draft when editing again.
 page.once('dialog',d=>d.accept());await page.reload();await page.locator('#edit-my-story').click();assert.equal(await page.locator('[name=message]').inputValue(),'Keep this draft');await page.locator('#save-profile').click();await page.locator('#profile-dialog').waitFor({state:'hidden'});assert.equal(await page.evaluate(()=>sessionStorage.getItem('light-em-up-private-draft')),null);
 await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const axe=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));await fs.writeFile(path.join(root,'test-results/axe-account-story.json'),JSON.stringify(axe,null,2));assert.equal(axe.violations.length,0);
 for(const width of [320,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:path.join(root,`test-results/account-story-${width}.png`),fullPage:true});}
 const published=JSON.stringify(own);await page.locator('#header-login').click();await page.locator('#signout').click();await page.waitForFunction(()=>document.body.dataset.sessionState==='signedOut');assert.equal(await page.locator('#header-login').textContent(),'Log in');assert.equal(await page.evaluate(()=>sessionStorage.getItem('light-em-up-private-draft')),null);assert.equal(await page.evaluate(()=>localStorage.getItem('light-em-up-v1')),null);assert.equal(JSON.stringify(own),published);assert(await page.locator('#header-login').evaluate(n=>n===document.activeElement));
 // Re-enter as a verified account with no story: validate before any HTTP write.
 own=null;await page.evaluate(session=>localStorage.setItem('sb-account-test-auth-token',JSON.stringify(session)),session);await page.reload();await page.waitForFunction(()=>document.querySelector('#own-story-status').textContent.includes('first candle'));
 await page.locator('#join').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[name=nickname]').inputValue(),'');assert.equal(await page.locator('[name=city]').inputValue(),'Stockholm');const before=writes;await page.locator('#save-profile').click();assert.equal(writes,before);assert.equal(await page.locator('[name=nickname]').getAttribute('aria-invalid'),'true');await page.locator('[name=nickname]').fill('New candle');await page.locator('[name=city]').fill('Nowhere');await page.locator('#save-profile').click();assert.equal(writes,before);assert.equal(await page.locator('[name=city]').getAttribute('aria-invalid'),'true');await page.locator('[name=city]').fill('Umeå');await page.locator('#save-profile').click();await page.locator('#profile-dialog').waitFor({state:'hidden'});assert.equal(writes,before+1);assert.equal(await page.locator('#featured-story h3').textContent(),'New candle');
 await page.locator('#edit-my-story').click();await page.locator('[name=visible]').uncheck();await page.locator('#save-profile').click();await page.locator('#profile-dialog').waitFor({state:'hidden'});assert((await page.locator('#featured-story').innerText()).includes('Only you'));assert.equal(own.visible,false);
 assert.deepEqual(errors,[]);console.log('PASS FR-16: actual-SDK owner query, account/local separation, prefill, immediate server-save card/map update, filter independence and axe account output.');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
