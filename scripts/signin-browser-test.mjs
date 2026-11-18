import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),root=fileURLToPath(new URL('../',import.meta.url));
const server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);assert(file.startsWith(root));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(await fs.readFile(file));}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}/`;
await fs.mkdir(path.join(root,'test-results'),{recursive:true});let browser;
try{
 browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||undefined});const context=await browser.newContext({viewport:{width:1280,height:900},permissions:['clipboard-read','clipboard-write']});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const wait=phase=>page.waitForFunction(p=>document.body.getAttribute('data-signin-state')===p,phase);
 const scan=async label=>{await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const result=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));await fs.writeFile(path.join(root,`test-results/axe-signin-${label}.json`),JSON.stringify(result,null,2));assert.equal(result.violations.length,0,result.violations.map(v=>v.id).join(', '));};
 await page.goto(base+'signin.html');await wait('unavailable');assert(await page.locator('#signin-submit').isDisabled());assert(await page.locator('#account-mode-toggle').isDisabled());await scan('unconfigured');
 await page.locator('#signin-cancel').click();await page.waitForURL('**/index.html');await page.locator('#join').click();await page.locator('#profile-dialog').waitFor({state:'visible'});assert.equal(await page.locator('#join').textContent(),'Try a local candle');assert(await page.locator('#offline-service-note').isVisible());await page.locator('[name=nickname]').fill('Offline candle');await page.locator('#save-profile').click();await page.locator('#profile-dialog').waitFor({state:'hidden'});assert.equal(await page.locator('body').getAttribute('data-auth-state'),'signedOut');assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('light-em-up-v1')).profile.lit),true);await page.evaluate(()=>localStorage.removeItem('light-em-up-v1'));await page.reload();await page.locator('#header-login').click();await page.waitForURL('**/signin.html');await wait('unavailable');
 let signupCalls=0,signupStatus=200,signupSession=false,holdSignup=false,releaseSignup;
 let passwordCalls=0,userStatus=200,credentialStatus=400,holdPassword=false,releasePassword;
 const user={id:'verified-person',aud:'authenticated',role:'authenticated',email:'person@example.test',user_metadata:{nickname:'Nam'},app_metadata:{provider:'email',providers:['email']},created_at:new Date().toISOString()};
 const encode=v=>Buffer.from(JSON.stringify(v)).toString('base64url');
 const session=()=>({access_token:`${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:user.id,aud:'authenticated',role:'authenticated',exp:Math.floor(Date.now()/1000)+3600,iat:Math.floor(Date.now()/1000)-60})}.fixture`,refresh_token:'fixture-refresh',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user:{...user,user_metadata:{nickname:'Untrusted cache'}}});
 await page.route('**/supabase-config.js',r=>r.fulfill({contentType:'text/javascript',body:"globalThis.LIGHT_EM_UP_AUTH={url:'https://fr13-test.supabase.co',publishableKey:'sb_publishable_fixture',googleEnabled:true};"}));
 await page.route('https://fr13-test.supabase.co/**',async route=>{
  const req=route.request(),url=new URL(req.url()),headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization,apikey,x-client-info,content-type,x-supabase-api-version','Access-Control-Allow-Methods':'GET,POST,OPTIONS'};
  if(req.method()==='OPTIONS'){await route.fulfill({status:200,headers});return;}
  if(url.pathname==='/rest/v1/public_stories'){await route.fulfill({headers,json:[]});return;}
  if(url.pathname==='/rest/v1/stories'){await route.fulfill({status:200,headers,json:[]});return;}
  if(url.pathname.endsWith('/signup')){signupCalls++;const submitted=req.postDataJSON();assert.equal(submitted.email,'person@example.test');assert.equal(submitted.password,'fixture-password');assert(!url.searchParams.has('password'));assert.equal(new URL(url.searchParams.get('redirect_to')).pathname,'/signin.html');if(holdSignup)await new Promise(resolve=>{releaseSignup=resolve;});await route.fulfill({status:signupStatus,headers,json:signupStatus===200?(signupSession?session():{user}):{code:'unexpected_failure',message:'Fixture failure'}});return;}
  if(url.pathname.endsWith('/user')){await route.fulfill({status:userStatus,headers,json:userStatus===200?user:{code:'unexpected_failure',message:'Fixture unavailable'}});return;}
  if(url.pathname.endsWith('/authorize')){assert.equal(url.searchParams.get('provider'),'google');assert.equal(new URL(url.searchParams.get('redirect_to')).pathname,'/signin.html');await route.fulfill({status:302,headers:{...headers,Location:base+'signin.html#error=access_denied&error_description=fixture'}});return;}
  if(url.pathname.endsWith('/token')){
   if(url.searchParams.get('grant_type')==='password'){
    passwordCalls++;const submitted=JSON.parse(req.postData());assert.equal(submitted.email,'person@example.test');assert.equal(submitted.password,'fixture-password');assert(!url.searchParams.has('password'));
    if(holdPassword)await new Promise(resolve=>{releasePassword=resolve;});
    await route.fulfill({status:credentialStatus,headers,json:credentialStatus===200?session():{code:credentialStatus===400?'invalid_credentials':'unexpected_failure',msg:'Fixture failure'}});return;
   }
   await route.fulfill({status:200,headers,json:session()});return;
  }
  await route.fulfill({status:404,headers,json:{message:'Fixture not found'}});
 });
 const fresh=async suffix=>{await page.goto(base+'index.html');await page.evaluate(()=>{localStorage.removeItem('sb-fr13-test-auth-token');sessionStorage.clear();});await page.goto(base+'signin.html'+(suffix||''));await wait('ready');};
 await fresh();await page.locator('#account-mode-toggle').click();assert.equal(await page.locator('#signin-title').textContent(),'Create account');assert.equal(await page.locator('#signin-password').getAttribute('autocomplete'),'new-password');await page.locator('#signin-email').fill('person@example.test');await page.locator('#signin-password').fill('short');await page.locator('#signin-submit').click();assert.equal(signupCalls,0);assert.equal(await page.locator('#signin-password').getAttribute('aria-invalid'),'true');await page.locator('#signin-password').fill('fixture-password');await page.setViewportSize({width:320,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await scan('registration');await page.screenshot({path:path.join(root,'test-results/signup-320.png'),fullPage:true});
 signupStatus=503;await page.locator('#signin-submit').click();await wait('failed');assert.equal(await page.locator('#signin-password').inputValue(),'fixture-password');await scan('registration-failed');signupStatus=200;const beforeHeldSignup=signupCalls;holdSignup=true;await page.locator('#signin-submit').click();await page.waitForFunction(()=>document.body.dataset.signinState==='signingIn');await page.evaluate(()=>document.getElementById('signin-form').dispatchEvent(new Event('submit',{cancelable:true})));for(let i=0;!releaseSignup&&i<300;i++)await new Promise(r=>setTimeout(r,10));assert(releaseSignup);assert.equal(signupCalls,beforeHeldSignup+1);holdSignup=false;releaseSignup();await wait('confirmation');assert.equal(await page.locator('#signin-password').inputValue(),'');assert.equal(await page.locator('#signin-password').getAttribute('autocomplete'),'current-password');assert(new URL(page.url()).pathname.endsWith('/signin.html'));await scan('confirmation');
 await fresh();signupSession=true;await page.locator('#account-mode-toggle').click();await page.locator('#signin-email').fill('person@example.test');await page.locator('#signin-password').fill('fixture-password');await page.locator('#signin-submit').click();await page.waitForURL('**/index.html');await page.waitForFunction(()=>document.body.dataset.sessionState==='signedIn');assert.equal(await page.locator('#header-login').textContent(),'Nam');signupSession=false;await page.setViewportSize({width:1280,height:900});
 await fresh();assert.equal(await page.locator('#signin-email').getAttribute('autocomplete'),'username');assert.equal(await page.locator('#signin-password').getAttribute('autocomplete'),'current-password');
 for(const width of [320,375,768,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));const small=await page.locator('button:visible,a:visible,input:visible').evaluateAll(nodes=>nodes.filter(n=>{const b=n.getBoundingClientRect();return b.width<24||b.height<24;}).map(n=>n.id||n.textContent));assert.deepEqual(small,[]);await page.screenshot({path:path.join(root,`test-results/signin-${width}.png`),fullPage:true});}
 await scan('ready');
 await page.locator('#signin-submit').click();assert.equal(await page.locator('#signin-email').getAttribute('aria-invalid'),'true');assert(await page.locator('#signin-email').evaluate(n=>n===document.activeElement));
 await page.locator('#signin-email').fill('not-an-email');await page.locator('#signin-submit').click();assert.match(await page.locator('#email-error').textContent(),/valid email/);
 await page.locator('#signin-email').fill('person@example.test');await page.locator('#signin-submit').click();assert(await page.locator('#signin-password').evaluate(n=>n===document.activeElement));
 await page.bringToFront();await page.evaluate(()=>navigator.clipboard.writeText('fixture-password'));await page.locator('#signin-password').focus();await page.keyboard.press('Control+V');assert.equal(await page.locator('#signin-password').inputValue(),'fixture-password','Paste must be supported');
 await page.locator('#password-toggle').click();assert.equal(await page.locator('#signin-password').getAttribute('type'),'text');assert.equal(await page.locator('#password-toggle').getAttribute('aria-pressed'),'true');await page.locator('#password-toggle').click();assert.equal(await page.locator('#signin-password').getAttribute('type'),'password');
 await page.locator('#signin-submit').click();await wait('failed');assert.match(await page.locator('#signin-error').textContent(),/email or password/);assert.equal(passwordCalls,1);assert.match(await page.locator('#signin-email').getAttribute('aria-describedby'),/signin-error/);await scan('credentials');
 credentialStatus=503;await page.locator('#signin-submit').click();await wait('failed');assert.match(await page.locator('#signin-error').textContent(),/couldn’t complete/);await scan('connection');
 credentialStatus=200;holdPassword=true;const before=passwordCalls;
 await page.locator('#signin-submit').click();await wait('signingIn');assert(await page.locator('#signin-submit').isDisabled());await page.evaluate(()=>document.getElementById('signin-form').requestSubmit());
 for(let i=0;!releasePassword&&i<300;i++)await new Promise(r=>setTimeout(r,10));assert(releasePassword);assert.equal(passwordCalls,before+1);holdPassword=false;releasePassword();
 await page.waitForURL('**/index.html');await page.waitForFunction(()=>document.body.getAttribute('data-session-state')==='signedIn');assert.equal(await page.locator('#header-login').textContent(),'Nam');assert(await page.locator('#header-login').evaluate(n=>n===document.activeElement));
 await page.goto(base+'signin.html?returnTo=index.html%23stories-title');await page.waitForURL('**/index.html#stories-title');await page.waitForFunction(()=>document.activeElement?.id==='stories-title');
 await fresh('?returnTo=https%3A%2F%2Fevil.test%2F');await page.locator('#signin-cancel').click();await page.waitForURL('**/index.html');assert(page.url().startsWith(base));
 await fresh();await page.locator('#signin-google').click();await wait('failed');assert.match(await page.locator('#signin-error').textContent(),/cancelled/);assert(page.url().startsWith(base+'signin.html'));
 await fresh();userStatus=503;await page.evaluate(v=>localStorage.setItem('sb-fr13-test-auth-token',JSON.stringify(v)),session());await page.reload();await wait('checkFailed');assert(await page.locator('#signin-retry').isVisible());await scan('check-failed');
 userStatus=200;await page.locator('#signin-retry').focus();await page.keyboard.press('Enter');await page.waitForURL('**/index.html');
 // FR-14: Add your candle requires a verified session and resumes only once.
 await fresh();await page.goto(base+'index.html');await page.waitForFunction(()=>document.body.getAttribute('data-session-state')==='signedOut');
 await page.evaluate(()=>localStorage.setItem('light-em-up-v1',JSON.stringify({profile:{id:'mine',nickname:'Local only',city:'Kiruna',lit:true,visible:true},opens:0,reactions:[],reports:[]})));
 await page.reload();await page.waitForFunction(()=>document.body.getAttribute('data-session-state')==='signedOut');
 await page.locator('#province-select').selectOption('Skåne');await page.locator('#next-page').click();const beforePage=await page.locator('#page-status').textContent();
 await page.locator('#join').focus();await page.keyboard.press('Enter');await page.waitForURL('**/signin.html?*');await wait('ready');
 assert.equal(new URL(page.url()).searchParams.get('returnTo'),'index.html#add-candle');
 await page.locator('#signin-cancel').click();await page.waitForURL('**/index.html');await page.waitForFunction(()=>document.body.getAttribute('data-session-state')==='signedOut');
 assert.equal(await page.locator('#province-select').inputValue(),'Skåne');assert.equal(await page.locator('#page-status').textContent(),beforePage);assert(await page.locator('#profile-dialog').isHidden());
 await page.locator('#join').click();await wait('ready');await page.locator('#signin-email').fill('person@example.test');await page.locator('#signin-password').fill('fixture-password');await page.locator('#signin-submit').click();
 await page.waitForURL(url=>url.pathname.endsWith('/index.html'));await page.locator('#profile-dialog').waitFor({state:'visible'});
 assert.equal(new URL(page.url()).hash,'');assert.equal(await page.locator('#province-select').inputValue(),'Skåne');assert.equal(await page.locator('#page-status').textContent(),beforePage);
 assert(await page.locator('[name=nickname]').evaluate(n=>n===document.activeElement));assert.equal(await page.locator('body').getAttribute('data-auth-state'),'signedIn');
 await page.keyboard.press('Escape');await page.locator('#profile-dialog').waitFor({state:'hidden'});await page.reload();await page.waitForFunction(()=>document.body.getAttribute('data-session-state')==='signedIn');assert(await page.locator('#profile-dialog').isHidden());
 await page.locator('#join').click();await page.locator('#profile-dialog').waitFor({state:'visible'});assert(new URL(page.url()).pathname.endsWith('/index.html'));await page.keyboard.press('Escape');
 await fresh();await page.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.emulateMedia({forcedColors:'active'});await page.locator('#signin-email').focus();await page.screenshot({path:path.join(root,'test-results/signin-forced-colors.png'),fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS: actual SDK sign-in, missing config, labelled fields, password-manager metadata/paste/visibility, validation, credentials/network errors, duplicate suppression, verified login/return focus, allowed return paths, cancellation/Google callback, session retry, 320–1280px targets/reflow, text spacing, forced colors and five sign-in axe scans. FR-14 signed-out/cancel/signed-in/one-shot editor entry and browsing-context checks pass. Fixture integration only.');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
