// FR-35: black-box account/error outputs; no mocked auth in the active journey.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),root=fileURLToPath(new URL('../../',import.meta.url));
const server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);assert(file.startsWith(root));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(await fs.readFile(file));}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}/`;
await fs.mkdir(path.join(root,'test-results'),{recursive:true});let browser;
try{
 browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||undefined,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context=await browser.newContext({viewport:{width:320,height:900}}),page=await context.newPage(),errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));context.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))external.push(r.url());});
 const phase=s=>page.waitForFunction(v=>document.body?.dataset.signinState===v,s);
 const session=s=>page.waitForFunction(v=>document.body?.dataset.sessionState===v,s);
 const count=()=>page.evaluate(()=>new Promise((resolve,reject)=>{const r=indexedDB.open('light-em-up-accounts-v1');r.onsuccess=()=>{const d=r.result,t=d.transaction('accounts'),q=t.objectStore('accounts').count();q.onsuccess=()=>resolve(q.result);q.onerror=reject;t.oncomplete=()=>d.close();};r.onerror=reject;}));
 const submit=async(name,password)=>{await page.locator('#signin-nickname').fill(name);await page.locator('#signin-password').fill(password);await page.locator('#signin-submit').click();};
 const scan=async label=>{await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const result=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));await fs.writeFile(path.join(root,`test-results/axe-auth-feedback-${label}.json`),JSON.stringify(result,null,2));assert.equal(result.violations.length,0,result.violations.map(v=>v.id).join(', '));};
 const logout=async()=>{await page.locator('#header-login').click();await page.locator('#signout').click();await session('signedOut');};
 const signInPage=async()=>{await page.goto(base+'signin.html');await phase('ready');};
 await signInPage();const initialAccounts=await count();await page.locator('#account-mode-toggle').click();
 await submit('Regression8','x'.repeat(7));await phase('failed');
 assert.match(await page.locator('#signin-error').innerText(),/Account not created.*8–128/);
 assert.equal(await page.locator('#signin-error').getAttribute('role'),'alert');
 assert.equal(await page.locator('#signin-password').getAttribute('aria-invalid'),'true');
 assert.match(await page.locator('#signin-password').getAttribute('aria-describedby'),/password-error.*signin-error/);
 assert(await page.locator('#signin-password').evaluate(n=>n===document.activeElement));
 assert.equal(await count(),initialAccounts);assert.equal(await page.evaluate(()=>sessionStorage.getItem('light-em-up-local-session')),null);
 assert.equal(await page.locator('#signin-password').inputValue(),'x'.repeat(7));assert(await page.locator('#signin-submit').isEnabled());
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await scan('short-password');await page.screenshot({path:path.join(root,'test-results/auth-feedback-short-320.png'),fullPage:true});
 for(const value of ['a'.repeat(8)+'*^','a'.repeat(8)+' ','<script>alert(1)</script>']){
  await submit('Regression8',value);await phase('failed');assert.match(await page.locator('#signin-error').innerText(),/Account not created.*letters and numbers only/);assert.equal(await count(),initialAccounts);assert.equal(await page.locator('#signin-password').inputValue(),value);
 }
 await scan('symbols');await submit('Regression8','a'.repeat(129));await phase('failed');assert.match(await page.locator('#signin-error').innerText(),/Account not created.*8–128/);assert.equal(await count(),initialAccounts);
 await submit('','a'.repeat(8));await phase('failed');assert.match(await page.locator('#signin-error').innerText(),/Account not created.*1–40/);assert(await page.locator('#signin-nickname').evaluate(n=>n===document.activeElement));
 // Exactly 8 characters succeeds and signs back in with the same case-sensitive value.
 await submit('Regression8','Abcd1234');await page.waitForURL('**/index.html');await session('signedIn');assert.equal(await count(),initialAccounts+1);assert.equal(await page.locator('#header-login').innerText(),'Regression8');await logout();
 await signInPage();await submit('Regression8','abcd1234');await phase('failed');const wrong=await page.locator('#signin-error').innerText();assert.match(wrong,/Sign-in failed.*Nickname or password is incorrect/);await scan('wrong-credentials');
 await submit('UnregisteredName','Abcd1234');await phase('failed');assert.equal(await page.locator('#signin-error').innerText(),wrong);
 await submit('Regression8','');await phase('failed');assert.match(await page.locator('#signin-error').innerText(),/Sign-in failed.*Enter your password/);await submit('Regression8','Abcd1234');await page.waitForURL('**/index.html');await session('signedIn');await logout();
 // Exactly 13 characters now register; a duplicate must explicitly say no account was created.
 await signInPage();await page.locator('#account-mode-toggle').click();await submit('Regression13','p'.repeat(12)+'3');await page.waitForURL('**/index.html');await session('signedIn');assert.equal(await count(),initialAccounts+2);await logout();
 await signInPage();await page.locator('#account-mode-toggle').click();await submit(' regression13 ','p'.repeat(12)+'3');await phase('failed');assert.match(await page.locator('#signin-error').innerText(),/Account not created.*already taken/);assert.equal(await count(),initialAccounts+2);await scan('duplicate');
 await page.locator('#account-mode-toggle').click();await submit('REGRESSION13','p'.repeat(12)+'3');await page.waitForURL('**/index.html');await session('signedIn');await logout();
 // API enforces identical new-registration rules, including the 128-character upper boundary.
 const api=await page.evaluate(async()=>{const store=LocalAccounts.current(),out=[];for(const [name,value]of [['ApiShort','q'.repeat(7)],['ApiLong','q'.repeat(129)],['ApiSymbol','q'.repeat(8)+'*^'],['ApiSpace','q'.repeat(8)+' ']])try{await store.register(name,value);out.push('allowed');}catch(e){out.push(e.code);}await store.register('ApiMax','q'.repeat(128));await store.signOut();const user=await store.signIn('ApiMax','q'.repeat(128));await store.signOut();return {out,name:user.nickname};});assert.deepEqual(api.out,['password','password','password','password']);assert.equal(api.name,'ApiMax');
 // Compatibility fixture: a prior-policy record, actual PBKDF2 verification and no fabricated session.
 await signInPage();await page.evaluate(async()=>{const password='previous policy *^ value',salt=crypto.getRandomValues(new Uint8Array(16)),hex=v=>Array.from(v,x=>x.toString(16).padStart(2,'0')).join('');const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const verifier=hex(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:600000,hash:'SHA-256'},key,256)));await new Promise((resolve,reject)=>{const r=indexedDB.open('light-em-up-accounts-v1');r.onsuccess=()=>{const d=r.result,t=d.transaction('accounts','readwrite');t.objectStore('accounts').add({id:'legacy-fixture',key:'legacyregistered',nickname:'LegacyRegistered',salt:hex(salt),verifier,algorithm:'PBKDF2-SHA256',iterations:600000});t.oncomplete=()=>{d.close();resolve();};t.onabort=reject;};});});
 await submit('LegacyRegistered','previous policy *^ value');await page.waitForURL('**/index.html');await session('signedIn');assert.equal(await page.locator('#header-login').innerText(),'LegacyRegistered');await logout();
 // Storage fault: explain failure, keep input and allow correction/retry.
 await signInPage();await page.locator('#account-mode-toggle').click();const before=await count();await page.evaluate(()=>{globalThis.originalTransaction=IDBDatabase.prototype.transaction;IDBDatabase.prototype.transaction=function(stores,mode,...rest){if(stores==='accounts'&&mode==='readwrite')throw new Error('Injected storage failure');return originalTransaction.call(this,stores,mode,...rest);};});
 await submit('RetryAccount','Retry123');await phase('failed');assert.match(await page.locator('#signin-error').innerText(),/could not save or open.*Check browser storage/);assert.equal(await count(),before);assert.equal(await page.locator('#signin-password').inputValue(),'Retry123');await scan('storage-failure');
 await page.evaluate(()=>{IDBDatabase.prototype.transaction=originalTransaction;});await page.locator('#signin-submit').click();await page.waitForURL('**/index.html');await session('signedIn');assert.equal(await page.locator('#header-login').innerText(),'RetryAccount');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 await fs.writeFile(path.join(root,'test-results/auth-feedback-acceptance.json'),JSON.stringify({scope:'real served local registration/login; separate legacy-data/storage-fault fixtures; synthetic data',criteria:['FR-35-AC1','FR-35-AC2','FR-35-AC3'],result:'PASS',manualAT:'NOT RUN',deployment:'NOT RUN'},null,2));
 console.log('PASS FR-35: explicit failure summaries/field focus, 7/8/13/128/129 boundaries, symbol/space rejection, no invalid account/session, generic login errors, retry, legacy password compatibility, real registration/login and five axe error states.');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
