// FR-38: design simulation and real authentication have independent verdicts.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const root=fileURLToPath(new URL('../../',import.meta.url)),require=createRequire(import.meta.url),out=path.join(root,'test-results');
await fs.mkdir(out,{recursive:true});
const server=spawn('python3',['scripts/serve-local.py','--port','0'],{cwd:root,stdio:['ignore','pipe','pipe']});
let browser;
try {
 const base=await new Promise((resolve,reject)=>{let text='';const timer=setTimeout(()=>reject(Error('Server startup timed out')),10000);server.stdout.on('data',c=>{text+=c;const m=text.match(/http:\/\/127\.0\.0\.1:\d+/);if(m){clearTimeout(timer);resolve(m[0]+'/');}});server.once('error',reject);server.once('exit',code=>reject(Error('Server exited '+code)));});
 browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||undefined,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const scan=async label=>{await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const data=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));await fs.writeFile(path.join(out,'axe-wireframe-'+label+'.json'),JSON.stringify(data,null,2));assert.equal(data.violations.length,0,data.violations.map(v=>v.id).join(', '));};
 await page.goto(base+'ux/wireframe/index.html');await scan('pages');
 const launch=page.locator('.wf-popup-launchers [data-open-auth=signin]'),signin=page.locator('#wf-signin-popup'),create=page.locator('#wf-create-popup');
 await launch.click();assert(await signin.evaluate(e=>e.matches(':modal')));assert.equal(await page.evaluate(()=>document.activeElement.id),'wf-signin-nickname');
 await page.locator('#wf-signin-form').evaluate(f=>f.requestSubmit());assert.equal(await page.locator('#wf-signin-nickname').getAttribute('aria-invalid'),'true');
 await page.locator('#wf-signin-nickname').fill('Preview8');await page.locator('#wf-signin-password').fill('Preview123');await signin.locator('[data-switch-auth]').click();
 assert.equal(await page.locator('#wf-create-nickname').inputValue(),'Preview8');assert.equal(await page.locator('#wf-signin-password').inputValue(),'');assert.equal(await page.evaluate(()=>document.activeElement.id),'wf-create-nickname');
 await page.locator('#wf-create-password').fill('1234567');await page.locator('#wf-create-form').evaluate(f=>f.requestSubmit());assert.equal(await page.locator('#wf-create-password').getAttribute('aria-invalid'),'true');await scan('create-error');
 await page.keyboard.press('Escape');await create.waitFor({state:'hidden'});assert.equal(await page.locator('#wf-create-password').inputValue(),'');await page.waitForFunction(()=>document.activeElement===document.querySelector('.wf-popup-launchers [data-open-auth=signin]'));
 await page.locator('#wf-force-auth-error').check();await launch.click();await page.locator('#wf-signin-password').fill('Preview123');await page.locator('#wf-signin-form').evaluate(f=>f.requestSubmit());assert((await page.locator('#wf-signin-alert').innerText()).includes('incorrect'));await scan('signin-error');
 await page.keyboard.press('Escape');await signin.waitFor({state:'hidden'});await page.locator('#wf-force-auth-error').uncheck();
 await page.locator('.wf-popup-launchers [data-open-auth=create]').click();await page.locator('#wf-create-password').fill('12345678');await create.locator('[data-show-password]').click();assert.equal(await page.locator('#wf-create-password').getAttribute('type'),'text');await page.locator('#wf-create-form').evaluate(f=>f.requestSubmit());await create.waitFor({state:'hidden'});assert((await page.locator('#wf-action-result').innerText()).includes('SIMULATED SUCCESS'));assert((await page.locator('.wf-account summary').innerText()).includes('Preview8'));
 await page.locator('#wf-has-candle').check();assert(await page.locator('#wf-saved-candle').isVisible());assert.equal(await page.locator('#wf-first-candle').isVisible(),false);
 for(const width of [1280,320]){await page.setViewportSize({width,height:900});await page.screenshot({path:path.join(out,`wireframe-pages-${width}.png`),fullPage:true});for(const kind of ['signin','create']){await page.locator(`.wf-popup-launchers [data-open-auth=${kind}]`).click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await scan(kind+'-'+width);await page.screenshot({path:path.join(out,`wireframe-${kind}-${width}.png`),fullPage:true});await page.keyboard.press('Escape');await page.locator(`#wf-${kind}-popup`).waitFor({state:'hidden'});}}
 assert.equal(await page.evaluate(()=>sessionStorage.length),0);assert.deepEqual(await page.evaluate(()=>indexedDB.databases()),[]);assert.deepEqual(errors,[]);await context.close();
 // Actual app, fresh storage, real IndexedDB/Web Crypto; no authentication routing/mocks.
 const actualContext=await browser.newContext(),actual=await actualContext.newPage();
 const session=s=>actual.waitForFunction(v=>document.body?.dataset.sessionState===v,s),ready=()=>actual.waitForFunction(()=>LightEmUpAccount.ready());
 const findings=[];
 for(const registering of [false,true]){
  await actual.goto(base+'index.html');await session('signedOut');await actual.getByRole('button',{name:'Add your candle',exact:true}).click();await actual.waitForFunction(()=>document.body?.dataset.signinState==='ready');
  assert(new URL(actual.url()).pathname.endsWith('/signin.html'));
  if(!findings.length)findings.push({id:'DR-38-01',status:'OPEN',result:'FAIL',kind:'approved-design implementation gap',expected:'Sign-in/create-account popup keeps community page and browsing context',actual:'Add your candle navigates to standalone signin.html; create-account toggles that page',originalFR36Cause:'NOT ESTABLISHED'});
  if(registering)await actual.getByRole('button',{name:'Create an account',exact:true}).click();
  // Known shared fixture inputs only, not personal credentials.
  const nickname=registering?'TransitionNew8':'RegrestionTest8';
  await actual.locator('#signin-nickname').fill(nickname);await actual.locator('#signin-password').fill(registering?'Preview123':'Acount1234');await actual.locator('#signin-submit').click();
  await actual.waitForFunction(()=>document.body?.dataset.sessionState==='signedIn');await ready();assert.equal(await actual.locator('#header-login').innerText(),nickname);assert.equal(await actual.locator('#join-card').isVisible(),false);
  await actual.locator('#profile-dialog').waitFor({state:'visible'});await actual.locator('[name=message]').fill('Synthetic transition story');await actual.locator('#save-profile').click();await actual.locator('#profile-dialog').waitFor({state:'hidden'});
  await actual.reload();await session('signedIn');await ready();assert.equal(await actual.locator('#header-login').innerText(),nickname);assert((await actual.locator('#featured-story').innerText()).includes('Synthetic transition story'));assert.equal(await actual.locator('body').getAttribute('data-story-state'),'saved');
  await actual.getByRole('button',{name:'Edit my story',exact:true}).click();await actual.locator('#profile-dialog').waitFor({state:'visible'});await actual.keyboard.press('Escape');await actual.locator('#header-login').click();await actual.locator('#signout').click();await session('signedOut');assert.equal(await actual.locator('#header-login').innerText(),'Log in');assert.equal((await actual.locator('#featured-story').innerText()).includes('Synthetic transition story'),false);
 }
 await actualContext.close();
 await fs.writeFile(path.join(out,'wireframe-transition-audit.json'),JSON.stringify({prototype:'PASS',realLocalFunctionalTransition:'PASS',applicationPopupDesignParity:'FAIL',findings,originalUserBrowserDR:'FR-36 OPEN',manualAT:'NOT RUN',publicDeployment:'NOT RUN'},null,2));
 console.log('PASS prototype and actual local login/create/editor/save/reload/logout transitions. AUDIT: application popup design parity FAIL/OPEN DR-38-01; original FR-36 OPEN. Audit execution is not complete application acceptance.');
} finally {await browser?.close();server.kill('SIGTERM');}
