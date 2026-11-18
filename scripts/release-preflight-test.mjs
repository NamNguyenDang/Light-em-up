import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {inspectRelease} from './release-preflight.mjs';
const artifacts=Object.fromEntries(await Promise.all(['supabase-config.js','signin.html','signin-flow.js','index.html'].map(async n=>[n,await fs.readFile(new URL('../'+n,import.meta.url),'utf8')])));
const fetcher=async url=>({ok:true,text:async()=>artifacts[new URL(url).pathname.split('/').at(-1)]});
let report=await inspectRelease('https://example.test/site/',{fetcher});assert.equal(report.status,'BLOCKED','Shipped empty configuration must block release readiness');assert.equal(report.release_ready,false);assert(report.checks.some(c=>c.name==='served-registration-path'&&c.pass));
artifacts['supabase-config.js']="globalThis.LIGHT_EM_UP_AUTH=Object.freeze({url:'https://owned-project.supabase.co',publishableKey:'sb_publishable_public_testvalue'});";
report=await inspectRelease('https://example.test/site/',{fetcher});assert.equal(report.status,'READY_FOR_LIVE_SMOKE');assert.equal(report.release_ready,false,'Preflight alone never establishes real acceptance');
artifacts['signin-flow.js']='no registration';report=await inspectRelease('https://example.test/site/',{fetcher});assert.equal(report.status,'BLOCKED');
report=await inspectRelease('https://example.test/',{fetcher:async()=>{throw Error('offline');}});assert.equal(report.status,'BLOCKED');report=await inspectRelease('https://user:private@example.test/',{fetcher});assert.equal(report.status,'BLOCKED');assert(!JSON.stringify(report).includes('private'));
console.log('PASS FR-29: actual shipped missing config and missing registration block preflight; present config only permits live smoke; network/URL failures fail closed without credential logging. Unit fixture, not live acceptance.');
