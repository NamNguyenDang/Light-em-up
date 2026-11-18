// FR-09: browser assertions complement, rather than replace, manual testing.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url),root=fileURLToPath(new URL('../../',import.meta.url));
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));assert(file.startsWith(root));const target=file===root.slice(0,-1)?path.join(root,'index.html'):file;res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');res.end(await fs.readFile(target));}catch{res.statusCode=404;res.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url=`http://127.0.0.1:${server.address().port}/index.html`;
await fs.mkdir(path.join(root,'test-results'),{recursive:true});
let browser;
const results=[];
try{
  browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||undefined,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}: {})});
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const open=async()=>{await page.goto(url);await page.waitForSelector('#province-areas path');};
  const scan=async label=>{await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const result=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));await fs.writeFile(path.join(root,`test-results/axe-${label}.json`),JSON.stringify(result,null,2));assert.equal(result.violations.length,0,`${label}: ${result.violations.map(v=>v.id+': '+v.nodes.map(n=>n.target).join(', ')).join('; ')}`);};
  const noOverflow=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Page must not scroll horizontally');
  for(const width of [320,375,768,1280]){
    await page.setViewportSize({width,height:900});await open();await noOverflow();
    const small=await page.locator('button:visible,summary:visible,select:visible,.site-footer a:visible').evaluateAll(nodes=>nodes.filter(n=>{const b=n.getBoundingClientRect();return b.width<24||b.height<24;}).map(n=>n.id||n.textContent.trim()));
    assert.deepEqual(small,[],`Undersized targets at ${width}px`);
    await page.screenshot({path:path.join(root,`test-results/layout-${width}.png`),fullPage:true});
    results.push(`Layout and target assertions passed at ${width}px`);
  }
  await page.setViewportSize({width:1280,height:900});await open();
  // FR-10: keep the desktop hero compact without forcing overflow on small screens.
  assert.equal(await page.locator('.intro .eyebrow').count(),0);
  assert(!(await page.locator('body').innerText()).toLowerCase().includes('100 fictional demo profiles'));
  assert.equal(await page.locator('.map-help').count(),0);
  const headline=await page.locator('.intro h1').evaluate(n=>({height:n.getBoundingClientRect().height,lineHeight:parseFloat(getComputedStyle(n).lineHeight),style:getComputedStyle(n).fontStyle,weight:getComputedStyle(n).fontWeight}));
  assert(headline.height<=headline.lineHeight+1,'Desktop headline should occupy one line at 1280px');
  assert.equal(headline.style,'italic');assert.equal(headline.weight,'700');
  // Local-demo editor regressions use the saved-light control; FR-14 tests cover authenticated Add your candle.
  // FR-11: modal navigation keeps the existing browsing context and focus.
  assert.equal(await page.locator('body').getAttribute('data-auth-state'),'signedOut');
  await page.locator('#province-select').selectOption('Skåne');
  await page.locator('#next-page').click();
  const provincePage=await page.locator('#page-status').textContent();
  await page.locator('#login').click();
  assert.equal(await page.locator('body').getAttribute('data-dialog-state'),'profile');
  assert.equal(await page.locator('body').getAttribute('data-story-state'),'editing');
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>document.body.getAttribute('data-dialog-state')==='none');
  assert.equal(await page.locator('#province-select').inputValue(),'Skåne');
  assert.equal(await page.locator('#page-status').textContent(),provincePage);
  assert(await page.locator('#login').evaluate(n=>n===document.activeElement));
  await page.locator('#city-search').fill('Kiruna');await page.locator('#cities button').first().click();
  const cityHeading=await page.locator('#stories-title').textContent();
  await page.locator('#rules').click();
  assert.equal(await page.locator('body').getAttribute('data-dialog-state'),'info');
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>document.body.getAttribute('data-dialog-state')==='none');
  assert.equal(await page.locator('#city-search').inputValue(),'Kiruna');
  assert.equal(await page.locator('#stories-title').textContent(),cityHeading);
  assert(await page.locator('#rules').evaluate(n=>n===document.activeElement));
  await page.locator('#all-stories').click();
  await scan('community');
  await page.locator('#map-data-details summary').click();assert.equal(await page.locator('#map-data tbody tr').count(),25);await scan('map-data');
  await page.locator('#map-data button').first().focus();await page.keyboard.press('Enter');assert(await page.locator('#map-data button').first().evaluate(n=>n===document.activeElement));
  await page.locator('#clear-province').click();
  const area=page.locator('#province-areas path').first();await area.focus();assert(await page.locator('#province-tooltip').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('#province-tooltip').textContent(),'');
  await area.dispatchEvent('mouseenter');await area.dispatchEvent('mouseleave');await page.locator('#province-tooltip').hover();assert(await page.locator('#province-tooltip').isVisible());
  await page.locator('#login').click();await scan('dialog');
  await page.getByRole('button',{name:'Save my light',exact:true}).click();assert.equal(await page.locator('[name=nickname]').getAttribute('aria-invalid'),'true');assert(await page.locator('[name=nickname]').evaluate(n=>n===document.activeElement));await scan('validation');
  await page.locator('[name=nickname]').fill('Accessibility test');await page.locator('[name=city]').fill('Kiruna');await page.getByRole('button',{name:'Save my light',exact:true}).click();assert(await page.locator('#edit-my-story').evaluate(n=>n===document.activeElement));assert.equal(await page.locator('body').getAttribute('data-story-state'),'saved');assert.equal(await page.locator('body').getAttribute('data-auth-state'),'signedOut');
  await page.reload();assert.equal(await page.locator('#featured-story h3').textContent(),'Accessibility test');
  await page.locator('#next-page').click();assert(await page.locator('#stories-title').evaluate(n=>n===document.activeElement));
  await page.locator('#edit-my-story').click();page.once('dialog',d=>d.accept());await page.locator('#delete-profile').click();assert(await page.locator('#join').evaluate(n=>n===document.activeElement));
  // FR-15: native keyboard discard confirmation and real saving/error output.
  await page.locator('#login').click();
  await page.locator('[name=nickname]').fill('Unsaved candle');
  page.once('dialog',d=>d.dismiss());await page.keyboard.press('Escape');
  assert(await page.locator('#profile-dialog').isVisible());assert.equal(await page.locator('[name=nickname]').inputValue(),'Unsaved candle');
  page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Close',exact:true}).click();
  await page.locator('#profile-dialog').waitFor({state:'hidden'});
  await page.locator('#login').click();assert.equal(await page.locator('[name=nickname]').inputValue(),'');
  await page.locator('[name=nickname]').fill('Save retry candle');await page.locator('[name=city]').fill('Kiruna');
  await page.evaluate(()=>{globalThis.testPersist=persist;globalThis.testWrites=0;persist=()=>{testWrites++;return new Promise((resolve,reject)=>{globalThis.resolveSave=resolve;globalThis.rejectSave=reject;});};});
  await page.locator('#save-profile').click();
  assert.equal(await page.locator('body').getAttribute('data-story-state'),'saving');assert(await page.locator('#save-profile').isDisabled());assert(await page.locator('[name=nickname]').isDisabled());
  await page.locator('#profile-save-status').scrollIntoViewIfNeeded();await scan('editor-saving');await page.screenshot({path:path.join(root,'test-results/editor-saving.png'),fullPage:true});
  await page.evaluate(()=>{document.querySelector('#profile-form').dispatchEvent(new Event('submit',{cancelable:true}));});assert.equal(await page.evaluate(()=>testWrites),1);
  await page.keyboard.press('Escape');assert(await page.locator('#profile-dialog').isVisible());
  await page.evaluate(()=>rejectSave(new Error('fixture failure')));
  await page.waitForFunction(()=>document.body.getAttribute('data-story-state')==='saveFailed');assert.equal(await page.locator('[name=nickname]').inputValue(),'Save retry candle');assert(await page.locator('#save-profile').evaluate(n=>n===document.activeElement));await scan('editor-save-failed');
  await page.screenshot({path:path.join(root,'test-results/editor-save-failed.png'),fullPage:true});
  await page.evaluate(()=>{persist=testPersist;});await page.locator('#save-profile').click();await page.locator('#profile-dialog').waitFor({state:'hidden'});assert.equal(await page.locator('#featured-story h3').textContent(),'Save retry candle');
  // Approximation only: manual browser text-only resize remains required.
  await open();await page.evaluate(()=>{for(const n of document.querySelectorAll('body *:not(svg):not(svg *)')){if([...n.childNodes].some(c=>c.nodeType===3&&c.textContent.trim()))n.style.fontSize=`${parseFloat(getComputedStyle(n).fontSize)*2}px`;}});await noOverflow();await page.screenshot({path:path.join(root,'test-results/text-200-percent.png'),fullPage:true});
  await open();await page.addStyleTag({content:'* {line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p {margin-bottom:2em!important}'});await noOverflow();await page.screenshot({path:path.join(root,'test-results/text-spacing.png'),fullPage:true});
  await open();await page.emulateMedia({forcedColors:'active'});await area.focus();assert.equal(await page.locator('#province-focus .indicator-light').count(),1);await page.screenshot({path:path.join(root,'test-results/forced-colors.png'),fullPage:true});
  await page.emulateMedia({forcedColors:'none',reducedMotion:'reduce'});
  // Six simultaneous levels, with a separate level-zero province.
  await page.evaluate(()=>{const fixture=[['Kiruna',5],['Umeå',25],['Malmö',55],['Göteborg',150],['Uppsala',350],['Nyköping',600]];const data=fixture.flatMap(([city,count])=>Array.from({length:count},(_,i)=>({id:`test-${city}-${i}`,city,nickname:'Test',lit:true,visible:true,status:'Found work'})));renderMap(data);renderMapData(data);});
  for(let level=1;level<=6;level++){assert(await page.locator(`#map-points [data-light-level="${level}"]`).count());assert(await page.locator(`#province-glows [data-light-level="${level}"]`).count());}
  await page.screenshot({path:path.join(root,'test-results/six-light-levels.png'),fullPage:true});
  assert.deepEqual(errors,[]);results.push('Axe scans, dialog/validation, tooltip, focus, saved story, text resizing approximation, text spacing, forced colors and six light levels passed.');
  await fs.writeFile(path.join(root,'test-results/summary.json'),JSON.stringify({results,manualVerification:'Pending: NVDA/Firefox or VoiceOver/Safari, real 200% text-only resize and 400% browser zoom, visual focus/contrast assessment.'},null,2));
  console.log(results.join('\n'));
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
