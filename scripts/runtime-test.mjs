// Dependency-free DOM simulation for application workflows, not visual browser QA.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=n=>fs.readFileSync(new URL(n,root),'utf8');
class Element{
 constructor(tag='div'){this.tag=tag;this.children=[];this.value='';this.checked=false;this.dataset={};this.events={};this.attributes={};}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=[...nodes];}
 setAttribute(key,value){this.attributes[key]=value;}
 addEventListener(key,fn){this.events[key]=fn;}
 getAttribute(key){return this.attributes[key]??null;}
 contains(n){return this===n||this.children.some(c=>c?.contains?.(n));}
 getBoundingClientRect(){return {width:388,height:600};}
 scrollIntoView(){} focus(){this.focused=true;} showModal(){this.open=true;} close(){this.open=false;}
}
const stored=new Map();
function boot(){
 const nodes=Object.fromEntries([...read('index.html').matchAll(/\bid="([^"]+)"/g)].map(m=>[m[1],new Element()]));
 const form=nodes['profile-form'];form.elements={};
 for(const m of read('index.html').matchAll(/\bname="([^"]+)"/g))form.elements[m[1]]=new Element('input');
 form.reset=()=>{for(const input of Object.values(form.elements)){input.value='';input.checked=false;}form.elements.visible.checked=form.elements.lit.checked=true;};form.reset();
 const windowEvents={};
 const context=vm.createContext({document:{activeElement:null,body:new Element('body'),querySelector:s=>{assert(s.startsWith('#'));assert(nodes[s.slice(1)],s);return nodes[s.slice(1)];},querySelectorAll:s=>{const all=[];const walk=n=>{if(n&&typeof n==='object'){all.push(n);for(const c of n.children||[])walk(c);}};for(const n of Object.values(nodes))walk(n);return s==='[data-focus-key]'?all.filter(n=>n.attributes?.['data-focus-key']):s==='#stories details[open]'?all.filter(n=>n.tag==='details'&&n.open):s==='#stories details'?all.filter(n=>n.tag==='details'):[];},createElement:t=>new Element(t),createElementNS:(_,t)=>new Element(t),createTextNode:t=>({textContent:t}),getElementById:id=>{const find=n=>n?.id===id||n?.attributes?.id===id?n:(n?.children||[]).map(find).find(Boolean);return nodes[id]||Object.values(nodes).map(find).find(Boolean)||null;}},window:{addEventListener:(key,fn)=>windowEvents[key]=fn},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},setTimeout:()=>1,clearTimeout(){},confirm:()=>true});
 Element.prototype.focus=function(){this.focused=true;context.document.activeElement=this;};
 for(const name of ['cities.js','provinces.js','demo-data.js','map-layout.js','app.js'])vm.runInContext(read(name),context,{filename:name});
 return {nodes,context,windowEvents,run:s=>vm.runInContext(s,context)};
}
let b=boot();assert.equal(b.nodes.stories.children.length,12);assert.equal(b.nodes['map-points'].children.length,29);assert.match(b.nodes['page-status'].textContent,/1–12 of 100/);
for(let i=0;i<8;i++)b.nodes['next-page'].onclick();assert.equal(b.nodes.stories.children.length,4);assert(b.nodes['next-page'].disabled);assert.equal(b.nodes['map-points'].children[0].attributes.role,'img');
assert.equal(b.nodes['province-areas'].children.length,25);
for(const province of b.run('provinces')){
 const area=b.nodes['province-areas'].children.find(n=>n.attributes['aria-label'].startsWith(province.name+','));
 assert(area,province.name);assert.equal(area.attributes.tabindex,'0');assert.equal(area.attributes.role,'button');
 area.events.click();assert.equal(b.run('provinceFilter'),province.name);assert.equal(b.run('cityFilter'),'');
 assert.equal(b.run('storyPage'),0);assert.match(b.nodes['stories-title'].textContent,new RegExp(province.name));
 const expected=b.run(`entries().filter(p=>provinceFor(p)===${JSON.stringify(province.name)}).length`);
 assert.equal(b.nodes.stories.children.length,Math.min(12,expected));assert.equal(b.nodes.empty.hidden,expected>0);
 assert.equal(b.nodes['province-areas'].children.find(n=>n.attributes['aria-pressed']==='true').attributes['aria-label'].split(',')[0],province.name);
}
const hoverArea=b.nodes['province-areas'].children[0];
hoverArea.events.mouseenter();assert(b.nodes['province-tooltip'].textContent.includes('stories'));
hoverArea.events.mouseleave();assert(b.nodes['province-tooltip'].textContent,'Persists while crossing to tooltip');
b.windowEvents.keydown({key:'Escape'});assert.equal(b.nodes['province-tooltip'].textContent,'');
hoverArea.events.mouseenter();b.nodes['province-tooltip'].events.mouseleave();assert.equal(b.nodes['province-tooltip'].textContent,'');
hoverArea.events.focus();assert(b.nodes['province-tooltip'].textContent);assert.equal(b.nodes['province-focus'].children.length,2);
b.nodes['map-stage'].events.mouseleave();assert(b.nodes['province-tooltip'].textContent,'Focus keeps tooltip visible');
hoverArea.events.blur();assert.equal(b.nodes['province-tooltip'].textContent,'');assert.equal(b.nodes['province-focus'].children.length,0);
assert.equal(b.nodes['province-boundaries'].children.length,50);
b.run("selectProvince('Skåne')");assert.equal(b.nodes['province-selection'].children.length,2);
let prevented=false;b.nodes['province-areas'].children[0].events.keydown({key:'Enter',preventDefault(){prevented=true;}});assert(prevented);
prevented=false;b.nodes['province-areas'].children[1].events.keydown({key:' ',preventDefault(){prevented=true;}});assert(prevented);
b.nodes['province-select'].onchange({target:{value:'Skåne'}});assert.equal(b.run('provinceFilter'),'Skåne');
b.nodes['clear-province'].onclick();assert.equal(b.run('provinceFilter'),'');assert.match(b.nodes['page-status'].textContent,/1–12 of 100/);
b.run("selectProvince('Skåne'); selectCity('Stockholm')");assert.equal(b.run('provinceFilter'),'');
b.nodes['all-stories'].onclick();
b.nodes.join.onclick();const form=b.nodes['profile-form'];form.elements.nickname.value='   ';form.onsubmit({preventDefault(){}});assert.match(b.nodes['form-error'].textContent,/nickname/);assert.equal(form.elements.nickname.attributes['aria-invalid'],'true');assert(form.elements.nickname.focused);assert.match(b.nodes['nickname-error'].textContent,/nickname/);
form.elements.nickname.value='Test';form.elements.city.value='No such place';form.onsubmit({preventDefault(){}});assert.equal(form.elements.city.attributes['aria-invalid'],'true');assert.equal(form.elements.nickname.attributes['aria-invalid'],'false');assert.match(b.nodes['city-error'].textContent,/suggestions/);
form.elements.nickname.value='<b>Hopeful neighbour</b>';form.elements.city.value='Stockholm';form.elements.message.value='Still here.';form.onsubmit({preventDefault(){}});assert.equal(b.run('state.profile.nickname'),'<b>Hopeful neighbour</b>');assert.equal(b.run('entries().length'),101);
b.run("selectCity('Stockholm')");assert.match(b.nodes['page-status'].textContent,/of 31/);form.elements.lit.checked=false;form.elements.status.value='Found work';form.onsubmit({preventDefault(){}});assert.equal(b.run('state.profile.lit'),false);assert.equal(b.run('state.profile.status'),'Found work');
form.elements.visible.checked=false;form.onsubmit({preventDefault(){}});assert.equal(b.run('entries().length'),100);assert.match(b.nodes['page-status'].textContent,/of 30/);
const support=b.nodes.stories.children[0].children[4];support.onclick();assert.equal(b.run('state.reactions.length'),1);assert(b.nodes.stories.children[0].children[4].disabled);
b=boot();assert.equal(b.run('state.profile.visible'),false);assert.equal(b.run('state.reactions.length'),1);assert.equal(b.run('state.profile.status'),'Found work');
b.nodes['all-stories'].onclick();assert.match(b.nodes['page-status'].textContent,/1–12 of 100/);
b.nodes['reset'].onclick();assert.equal(b.run('state.profile'),null);assert.equal(b.run('state.reactions.length'),0);assert.equal(b.run('samples.length'),100);
console.log('PASS: application startup, 100-profile pagination, 25 province boundaries, click/keyboard/dropdown selection, filtering/clear, nickname validation, create/edit/hide, independent candle/status, support deduplication, reload persistence, reset. DOM simulation only.');

// Regression: a Kiruna story must appear immediately, without an employment milestone.
b.nodes.join.onclick();
let kirunaForm=b.nodes['profile-form'];
kirunaForm.elements.nickname.value='Northern test';kirunaForm.elements.city.value='Kiruna';kirunaForm.elements.message.value='A new beginning';kirunaForm.elements.status.value='';
kirunaForm.onsubmit({preventDefault(){}});
const kiruna=()=>b.nodes['map-points'].children.find(n=>n.attributes['data-city']==='Kiruna');
assert(kiruna());assert.match(kiruna().attributes.class,/own-story-light/);assert.equal(kiruna().attributes['data-light-level'],'0');
assert.equal(kiruna().attributes['data-story-count'],String(b.run("entries().filter(p=>p.city==='Kiruna').length")));
assert.match(kiruna().attributes.transform,/translate\(278.68 79.08\)/);
assert(kiruna().children.some(n=>n.attributes.class==='map-light'));
assert.match(b.nodes['map-update'].textContent,/Your story is on the map · Kiruna/);
assert.equal(b.nodes['story-total'].textContent,'101 community stories');
b=boot();assert.match(kiruna().attributes.class,/own-story-light/);
b.nodes.join.onclick();kirunaForm=b.nodes['profile-form'];kirunaForm.elements.city.value='Malmö';kirunaForm.onsubmit({preventDefault(){}});
assert(!/own-story-light/.test(kiruna().attributes.class));
assert.match(b.nodes['map-points'].children.find(n=>n.attributes['data-city']==='Malmö').attributes.class,/own-story-light/);
kirunaForm.elements.visible.checked=false;kirunaForm.onsubmit({preventDefault(){}});
assert(b.nodes['map-points'].children.every(n=>!/own-story-light/.test(n.attributes.class)));
assert.equal(b.nodes['story-total'].textContent,'100 community stories');
b.nodes['reset'].onclick();
console.log('PASS: Kiruna immediate save at exact coordinates without Found work; own-light emphasis, reload persistence, location edit, hide and story-total update.');

// Six simultaneous municipal levels must illuminate their containing land paths.
const lightCases=[['Kiruna','Lappland',5,1],['Umeå','Västerbotten',25,2],['Malmö','Skåne',55,3],['Göteborg','Västergötland',150,4],['Uppsala','Uppland',350,5],['Nyköping','Södermanland',600,6]];
const eligible=(city,count)=>Array.from({length:count},(_,i)=>({id:city+'-'+i,city,status:'Found work',lit:true,visible:true}));
function renderFixture(data){b.context.lightFixture=data;b.run('renderMap(lightFixture)');}
renderFixture(lightCases.flatMap(([city,,count])=>eligible(city,count)));
assert.equal(b.nodes['province-glows'].children.length,6);
let priorOpacity=0,priorRadius=0;
for(const [city,province,count,level] of lightCases){
 const dot=b.nodes['map-points'].children.find(n=>n.attributes['data-city']===city);
 const glow=b.nodes['province-glows'].children.find(n=>n.attributes['data-province']===province);
 const boundary=b.nodes['province-areas'].children.find(n=>n.attributes['data-province']===province);
 assert.equal(Number(dot.attributes['data-light-level']),level);
 assert.equal(Number(glow.attributes['data-light-level']),level);
 assert.equal(Number(boundary.attributes['data-light-level']),level);
 assert.equal(glow.attributes.d,boundary.attributes.d);assert.equal(glow.attributes['fill-rule'],'evenodd');
 assert(Number(glow.attributes.opacity)>priorOpacity);priorOpacity=Number(glow.attributes.opacity);
 const radius=Number(dot.children.find(n=>n.attributes.class==='map-light').attributes.r);
 assert(radius>priorRadius);priorRadius=radius;
 assert.equal(radius,[6,12,20,30,42,56,72][level]);
}
// Separate kommun counts in one province are never summed to choose land intensity.
renderFixture([...eligible('Malmö',25),...eligible('Lund',30)]);
assert.equal(Number(b.nodes['province-glows'].children.find(n=>n.attributes['data-province']==='Skåne').attributes['data-light-level']),2);
// Removing eligibility removes the land glow, while a lit story still has a dot.
renderFixture([{city:'Kiruna',status:'Looking for an opportunity',lit:true}]);
assert.equal(b.nodes['province-glows'].children.length,0);
assert(b.nodes['map-points'].children[0].children.some(n=>n.attributes.class==='map-light'));
// Existing save handler also refreshes the land, including downward transitions.
b.context.landSeed=eligible('Malmö',50);b.run('samples.splice(0,samples.length,...landSeed);render()');
b.nodes.join.onclick();const landForm=b.nodes['profile-form'];
landForm.elements.nickname.value='Land glow test';landForm.elements.city.value='Malmö';landForm.elements.status.value='Found work';
landForm.onsubmit({preventDefault(){}});
assert.equal(Number(b.nodes['province-glows'].children[0].attributes['data-light-level']),3);
landForm.elements.lit.checked=false;landForm.onsubmit({preventDefault(){}});
assert.equal(Number(b.nodes['province-glows'].children[0].attributes['data-light-level']),2);
console.log('PASS: six simultaneous dot/land levels, increasing land opacity and dot size, province-clipped geometry, highest kommun without summing, level-zero land off, immediate save/toggle land updates.');

// Personal story is immediately available in the welcome panel, independent of filters.
b=boot();b.run('state.profile=null;persist();render()');
const featuredTitle=()=>b.nodes['featured-story'].children[1].children.find(n=>n.tag==='h3').textContent;
assert.equal(featuredTitle(),'North star');
b.nodes.join.onclick();const personalForm=b.nodes['profile-form'];
personalForm.elements.nickname.value='My Kiruna light';personalForm.elements.city.value='Kiruna';personalForm.elements.message.value='My own encouragement';
personalForm.onsubmit({preventDefault(){}});assert.equal(featuredTitle(),'My Kiruna light');
b.run("selectProvince('Skåne')");assert.equal(featuredTitle(),'My Kiruna light');
const edit=b.nodes['featured-story'].children[1].children.find(n=>n.tag==='button');assert.equal(edit.textContent,'Edit my story');edit.onclick();assert(b.nodes['profile-dialog'].open);
personalForm.elements.nickname.value='Updated story';personalForm.elements.visible.checked=false;personalForm.onsubmit({preventDefault(){}});assert.equal(featuredTitle(),'Updated story');
assert(b.nodes['featured-story'].children[1].children.some(n=>n.textContent==='Only you can see this story.'));
b=boot();assert.equal(featuredTitle(),'Updated story');
b.nodes['delete-profile'].onclick();assert.equal(featuredTitle(),'North star');
console.log('PASS: own-story card immediately after save, filter independence, edit, hidden-story privacy label, reload and sample fallback after deletion.');

// FR-07/08: text alternative and focus survive updates.
b=boot();assert.equal(b.nodes['map-data'].children[0].children[2].children.length,25);
let cityButton=b.nodes.cities.children[0];cityButton.focus();cityButton.onclick();assert.equal(b.context.document.activeElement.attributes['data-focus-key'],cityButton.attributes['data-focus-key']);
b.nodes['all-stories'].onclick();b.nodes['next-page'].focus();b.nodes['next-page'].onclick();assert.equal(b.context.document.activeElement,b.nodes['stories-title']);
b.nodes.join.onclick();b.nodes['profile-form'].elements.nickname.value='Focus test';b.nodes['profile-form'].onsubmit({preventDefault(){}});assert.equal(b.context.document.activeElement.id,'edit-my-story');
assert.match(b.nodes['community-status'].textContent,/stories/);
console.log('PASS: FR-07 all-province text alternative; FR-08 city focus restoration, pagination heading focus, post-save fallback and results status.');
