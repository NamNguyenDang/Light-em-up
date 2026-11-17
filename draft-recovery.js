'use strict';
const DraftRecovery=(()=>{
 const key='light-em-up-private-draft',limits={nickname:40,city:120,message:600,status:80,seeking:80,role:80,company:80};
 function create(storage,now=Date.now){
  function clear(){try{storage.removeItem(key);}catch{}}
  function write(owner,form){if(!owner)return;const fields={};for(const [name,max]of Object.entries(limits))fields[name]=String(form.elements[name].value).slice(0,max);fields.lit=!!form.elements.lit.checked;fields.visible=!!form.elements.visible.checked;try{storage.setItem(key,JSON.stringify({owner,at:now(),fields}));}catch{}}
  function read(owner){try{const raw=storage.getItem(key);if(!raw||raw.length>8192)return null;const d=JSON.parse(raw);if(!Number.isFinite(d.at)||now()-d.at<0||now()-d.at>1800000){clear();return null;}if(d.owner!==owner||!d.fields)return null;for(const [n,max]of Object.entries(limits))if(typeof d.fields[n]!=='string'||d.fields[n].length>max)return null;if(typeof d.fields.lit!=='boolean'||typeof d.fields.visible!=='boolean')return null;return d.fields;}catch{return null;}}
  return Object.freeze({write,read,clear});
 }
 return Object.freeze({create});
})();
if(typeof module!=='undefined'&&module.exports)module.exports=DraftRecovery;
