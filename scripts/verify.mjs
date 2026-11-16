import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const read=name=>fs.readFileSync(new URL(name,root),'utf8');
const app=read('app.js');
const nodes={'#city-search':{value:''},'#city-results':{},'#cities':{items:[],replaceChildren(){this.items=[];},append(x){this.items.push(x);}}};
const context=vm.createContext({$:key=>nodes[key],el:(tag,text)=>({tag,text,setAttribute(){}})});
vm.runInContext(read('cities.js')+'\n'+app.slice(0,app.indexOf('let state='))+'\n'+app.split('\n').filter(line=>line.startsWith('function normalize(')||line.startsWith('function renderCities(')).join('\n')+"\nlet cityFilter='';",context);
assert.equal(vm.runInContext('cities.length',context),832);
assert.equal(vm.runInContext('new Set(cities.map(c=>c.name)).size',context),832);
assert(vm.runInContext('cities.every(c=>c.x>=0&&c.x<=440&&c.y>=0&&c.y<=680)',context));
assert(vm.runInContext('samples.every(p=>cities.some(c=>c.name===p.city))',context));
for(const [query,wanted] of [['malmo','Malmö'],['GOTEBORG','Göteborg'],['Gothenburg','Göteborg'],['ostersund','Östersund'],['lulea','Luleå']]){nodes['#city-search'].value=query;vm.runInContext('renderCities()',context);assert(nodes['#cities'].items.some(x=>x.text===wanted),query);}
nodes['#city-search'].value='zzzz_no_city';vm.runInContext('renderCities()',context);assert.equal(nodes['#cities'].items.length,0);assert.match(nodes['#city-results'].textContent,/No matching/);
nodes['#city-search'].value='a';vm.runInContext('renderCities()',context);assert(nodes['#cities'].items.length<=18);
const html=read('index.html');const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
for(const match of app.matchAll(/\$\('#([a-z-]+)'\)/g))assert(ids.includes(match[1]),match[1]);
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!match[1].startsWith('http'))assert(fs.existsSync(new URL(match[1],root)),match[1]);}
for(const file of ['index.html','styles.css','app.js','cities.js'])assert(!/fetch\(|https?:\/\/(?!www.w3.org)/.test(read(file)),file);
function luminance(hex){const c=hex.match(/[a-f\d]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];}
for(const [fg,bg] of [['f6f0df','101e1d'],['b9c9c2','203328'],['1d2c23','efbc70'],['c0cdbb','1e332b'],['fff0d7','12271f']]){const a=luminance(fg),b=luminance(bg);assert((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,`${fg}/${bg}`);}
console.log('PASS: 832 unique places, coordinate bounds, sample migration, accent/alias search, empty/limited search, HTML IDs/assets, offline resources, key text contrast pairs.');
