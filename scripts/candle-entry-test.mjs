import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const {create}=createRequire(import.meta.url)('../candle-entry.js');
function fixture(resumeIntent=false){let opened=0,redirected=0,cleared=0,modal=false,busy=false;const flow=create({resumeIntent,openEditor(){opened++;modal=true;},signIn(){redirected++;},clearIntent(){cleared++;},isModalOpen:()=>modal,onBusy:value=>{busy=value;}});return {flow,read:()=>({opened,redirected,cleared,busy}),close:()=>{modal=false;}};}
let f=fixture();f.flow.update({status:'signedOut',user:null,hasLocalProfile:true});f.flow.activate();assert.equal(f.read().redirected,1);assert.equal(f.read().opened,0);
f=fixture();f.flow.update({status:'signedIn',user:{id:'verified'}});f.flow.activate();f.flow.activate();assert.equal(f.read().opened,1);assert.equal(f.read().redirected,0);
f=fixture();f.flow.activate();assert(f.read().busy);f.flow.update({status:'signedIn',user:{id:'verified'}});assert.equal(f.read().opened,1);assert(!f.read().busy);
f=fixture();f.flow.activate();f.flow.update({status:'checkFailed'});assert.equal(f.read().redirected,1);
f=fixture(true);f.flow.activate();f.flow.update({status:'signedIn',user:{id:'verified'}});assert.equal(f.read().opened,1);assert.equal(f.read().cleared,1);f.close();f.flow.update({status:'signedIn',user:{id:'verified'}});assert.equal(f.read().opened,1,'A completed return intent is not replayed');
f=fixture(true);f.flow.update({status:'signedOut'});assert.equal(f.read().opened,0);assert.equal(f.read().redirected,0,'An unauthenticated return cannot create a redirect loop');assert.equal(f.read().cleared,1);
f=fixture();f.flow.update({status:'signedIn',user:null});f.flow.activate();assert.equal(f.read().opened,0);assert.equal(f.read().redirected,1);
f=fixture();f.flow.activate();f.flow.stop();f.flow.update({status:'signedIn',user:{id:'late'}});assert.equal(f.read().opened,0);assert(!f.read().busy);
console.log('PASS: verified versus local-only identity, direct/queued entry, modal duplicate guard, failed checks, one-shot return intent, no cancellation loop and cleanup.');

let localOpens=0,accountOpens=0,navigations=0;const offlineEntry=create({openEditor:()=>accountOpens++,openLocalEditor:()=>localOpens++,signIn:()=>navigations++});offlineEntry.update({status:'notConfigured',user:null});offlineEntry.activate();assert.equal(localOpens,1);assert.equal(accountOpens,0);assert.equal(navigations,0);offlineEntry.stop();console.log('PASS FR-29: explicit local-demo fallback does not create an authenticated account.');
