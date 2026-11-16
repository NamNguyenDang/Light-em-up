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
 getBoundingClientRect(){return {width:388,height:600};}
 scrollIntoView(){} focus(){} showModal(){this.open=true;} close(){this.open=false;}
}
const stored=new Map();
function boot(){
 const nodes=Object.fromEntries([...read('index.html').matchAll(/\bid="([^"]+)"/g)].map(m=>[m[1],new Element()]));
 const form=nodes['profile-form'];form.elements={};
 for(const m of read('index.html').matchAll(/\bname="([^"]+)"/g))form.elements[m[1]]=new Element('input');
 form.reset=()=>{for(const input of Object.values(form.elements)){input.value='';input.checked=false;}form.elements.visible.checked=form.elements.lit.checked=true;};form.reset();
 const context=vm.createContext({document:{querySelector:s=>{assert(s.startsWith('#'));assert(nodes[s.slice(1)],s);return nodes[s.slice(1)];},querySelectorAll:()=>[],createElement:t=>new Element(t),createElementNS:(_,t)=>new Element(t),createTextNode:t=>({textContent:t}),getElementById:id=>nodes[id]},window:{addEventListener(){}},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},setTimeout:()=>1,clearTimeout(){},confirm:()=>true});
 for(const name of ['cities.js','demo-data.js','map-layout.js','app.js'])vm.runInContext(read(name),context,{filename:name});
 return {nodes,context,run:s=>vm.runInContext(s,context)};
}
let b=boot();assert.equal(b.nodes.stories.children.length,12);assert.equal(b.nodes['map-points'].children.length,4);assert.match(b.nodes['page-status'].textContent,/1–12 of 100/);
for(let i=0;i<8;i++)b.nodes['next-page'].onclick();assert.equal(b.nodes.stories.children.length,4);assert(b.nodes['next-page'].disabled);assert.equal(b.nodes['map-points'].children[0].attributes.role,'button');
const marker=b.nodes['map-points'].children.find(n=>n.events.click);marker.events.click();assert(b.nodes['cluster-dialog'].open||b.run('cityFilter')!=='');
b.nodes.join.onclick();const form=b.nodes['profile-form'];form.elements.nickname.value='   ';form.onsubmit({preventDefault(){}});assert.match(b.nodes['form-error'].textContent,/nickname/);
form.elements.nickname.value='<b>Hopeful neighbour</b>';form.elements.city.value='Stockholm';form.elements.message.value='Still here.';form.onsubmit({preventDefault(){}});assert.equal(b.run('state.profile.nickname'),'<b>Hopeful neighbour</b>');assert.equal(b.run('entries().length'),101);
b.run("selectCity('Stockholm')");assert.match(b.nodes['page-status'].textContent,/of 31/);form.elements.lit.checked=false;form.elements.status.value='Found work';form.onsubmit({preventDefault(){}});assert.equal(b.run('state.profile.lit'),false);assert.equal(b.run('state.profile.status'),'Found work');
form.elements.visible.checked=false;form.onsubmit({preventDefault(){}});assert.equal(b.run('entries().length'),100);assert.match(b.nodes['page-status'].textContent,/of 30/);
const support=b.nodes.stories.children[0].children[4];support.onclick();assert.equal(b.run('state.reactions.length'),1);assert(b.nodes.stories.children[0].children[4].disabled);
b=boot();assert.equal(b.run('state.profile.visible'),false);assert.equal(b.run('state.reactions.length'),1);assert.equal(b.run('state.profile.status'),'Found work');
b.nodes['all-stories'].onclick();assert.match(b.nodes['page-status'].textContent,/1–12 of 100/);
b.nodes['reset'].onclick();assert.equal(b.run('state.profile'),null);assert.equal(b.run('state.reactions.length'),0);assert.equal(b.run('samples.length'),100);
console.log('PASS: application startup, 100-profile pagination, cluster activation, nickname validation, create/edit/hide, independent candle/status, support deduplication, reload persistence, reset. DOM simulation only.');
