'use strict';
const KEY='light-em-up-v1';

let state={profile:null,reactions:[],reports:[],opens:0},cityFilter='',provinceFilter='',storyPage=0;
const PAGE_SIZE=12;let storageOK=true,accountStoryMode=false;
let localDemoProfile=null;
function setAccountStory(story,enabled){if(enabled&&!accountStoryMode)localDemoProfile=state.profile;accountStoryMode=enabled;state.profile=enabled?story:localDemoProfile;dispatchApplication({type:'LOCAL_STORY_CLEARED'});render();}

try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&typeof saved==='object'){if(saved.profile&&typeof saved.profile.nickname==='string'&&cities.some(c=>c.name===saved.profile.city))state.profile=saved.profile;state.reactions=Array.isArray(saved.reactions)?saved.reactions.filter(x=>typeof x==='string'):[];state.reports=Array.isArray(saved.reports)?saved.reports.filter(x=>typeof x==='string'):[];state.opens=Number.isSafeInteger(saved.opens)&&saved.opens>=0?saved.opens:0;}}catch{storageOK=false;}
state.opens++;
let applicationState=ApplicationState.initial({hasLocalStory:!!state.profile});
function dispatchApplication(event){
  applicationState=ApplicationState.transition(applicationState,event);
  document.body.setAttribute('data-view-state',applicationState.navigation.view);
  document.body.setAttribute('data-dialog-state',applicationState.navigation.dialog||'none');
  document.body.setAttribute('data-auth-state',applicationState.authentication.status);
  document.body.setAttribute('data-story-state',applicationState.story.status);
}
function openApplicationDialog(name){
  if(applicationState.navigation.dialog)return;
  document.getElementById(name+'-dialog').showModal();
  dispatchApplication({type:'OPEN_DIALOG',dialog:name});
}

const $=s=>document.querySelector(s);const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
function notify(msg){$('#toast').textContent=msg;clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('#toast').textContent='',5000);}
function persist(){try{localStorage.setItem(KEY,JSON.stringify({...state,profile:accountStoryMode?localDemoProfile:state.profile}));return true;}catch{storageOK=false;notify('Browser storage is unavailable. Changes last only while this page stays open.');return false;}}
function entries(){return [...samples,...(state.profile?.visible?[state.profile]:[])];}
function stat(value,label){const n=el('div',undefined,'stat');n.append(el('strong',String(value)),el('span',label));return n;}
function render(){
  const active=document.activeElement;
  const focusKey=active?.getAttribute?.('data-focus-key');
  const detailsOpen=new Set([...document.querySelectorAll('#stories details[open]')].map(n=>n.getAttribute('data-story-id')));
  renderFeaturedStory();const data=entries();$('#stats').replaceChildren(stat(data.filter(p=>p.lit).length,'lights currently lit'),stat(data.length,'visible candles'),stat(new Set(data.map(p=>p.city)).size,'cities represented'));renderMap(data);renderMapData(data);renderCities();$('#stories-title').textContent=provinceFilter?`Encouragement from ${provinceFilter}`:cityFilter?`Encouragement from ${cityFilter}`:'From one person to another';const filtered=data.filter(p=>(!cityFilter||p.city===cityFilter)&&(!provinceFilter||provinceFor(p)===provinceFilter));$('#empty').hidden=filtered.length>0;$('#empty').textContent=provinceFilter?`No stories in ${provinceFilter} yet. Your light could be the first.`:'No stories in this city yet. Your light could be the first.';const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));storyPage=Math.min(storyPage,pages-1);$('#stories').replaceChildren(...filtered.slice(storyPage*PAGE_SIZE,(storyPage+1)*PAGE_SIZE).map(story));$('#page-status').textContent=filtered.length?`${storyPage*PAGE_SIZE+1}–${Math.min((storyPage+1)*PAGE_SIZE,filtered.length)} of ${filtered.length} stories`:'0 stories';$('#prev-page').disabled=storyPage===0;$('#next-page').disabled=storyPage>=pages-1;$('#dashboard-stats').replaceChildren(stat(state.opens,'page opens on this browser'),stat(state.profile?1:0,'local profiles'),stat(state.reactions.length,'local reactions'),stat(state.reports.length,'local demo reports'),stat(data.filter(p=>p.status==='Found work').length,'shared milestones (includes samples)'));$('#my-light').textContent=state.profile?'My light':'Join us';
  $('#community-status').textContent=`${filtered.length} stories${provinceFilter?' in '+provinceFilter:cityFilter?' in '+cityFilter:' across Sweden'}. ${$('#page-status').textContent}.`;
  for(const detail of document.querySelectorAll('#stories details'))if(detailsOpen.has(detail.getAttribute('data-story-id')))detail.open=true;
  if(focusKey){const next=[...document.querySelectorAll('[data-focus-key]')].find(n=>n.getAttribute('data-focus-key')===focusKey);if(next&&!next.disabled)next.focus();else $('#stories-title').focus();}
}
function renderFeaturedStory(){
  if(accountStoryMode&&!state.profile){const card=$('#featured-story');card.replaceChildren(el('p','Your account story appears here after you add a candle.'));return;}
  const p=state.profile||samples.find(p=>p.nickname==='North star')||samples[1];
  const card=$('#featured-story');card.replaceChildren();
  const candle=el('div',undefined,'personal-candle');candle.append(candleGraphic(62,100,!!p.lit));
  const content=el('div',undefined,'personal-story-content');
  content.append(el('div',state.profile?(accountStoryMode?'YOUR STORY':'YOUR LOCAL STORY'):'SAMPLE STORY','sample'),el('h3',p.nickname),el('p',p.city,'featured-city'),el('p',p.message||'Sharing a little presence. Words can come later.','featured-message'),el('p',p.lit?'Candle lit':'Candle resting','small'));
  if(state.profile){
    if(!p.visible)content.append(el('p','Only you can see this story.','small'));
    const edit=el('button','Edit my story');edit.id='edit-my-story';edit.setAttribute('data-focus-key','edit-my-story');edit.onclick=openProfile;content.append(edit);
  }
  card.append(candle,content);
}
function story(p){const card=el('article',undefined,'story');const head=el('div',undefined,'story-head');const who=el('div');who.append(el('h3',p.nickname),el('div',p.city,'city'));const candle=el('div',undefined,'story-candle');candle.append(candleGraphic(52,72,!!p.lit),el('span',p.lit?'Lit':'Resting'));head.append(who,candle);card.append(head,el('p',p.message||'Sharing a little presence. Words can come later.','message'),el('div',p.sample?'FICTIONAL SAMPLE STORY':'YOUR LOCAL STORY','sample'));const detail=el('details');detail.setAttribute('data-story-id',p.id);const summary=el('summary','See more');summary.setAttribute('data-focus-key',`details-${p.id}`);detail.append(summary);[['Situation',p.status],['Seeking',p.seeking],['Role',p.role],['Company',p.company]].forEach(([label,value])=>{if(value)detail.append(el('p',`${label}: ${value}`));});if(detail.children.length===1)detail.append(el('p','This person has chosen to share only a nickname, city and encouragement.'));card.append(detail);const reaction=el('button',state.reactions.includes(p.id)?'♥ Encouragement sent':'♡ I’m with you');reaction.setAttribute('data-focus-key',`reaction-${p.id}`);reaction.disabled=state.reactions.includes(p.id);reaction.onclick=()=>{if(!state.profile){notify('Create your local profile to send encouragement.');openProfile();return;}state.reactions.push(p.id);persist();render();notify('Encouragement saved on this browser.');};const report=el('button','Report');report.setAttribute('data-focus-key',`report-${p.id}`);report.onclick=()=>{if(state.reports.includes(p.id)){notify('Already reported in this demo.');return;}state.reports.push(p.id);persist();render();notify('Demo report saved locally. No moderator receives it.');};card.append(reaction,document.createTextNode(' '),report);return card;}
const form=$('#profile-form');cities.forEach(c=>{const option=el('option');option.value=c.name;$('#city-options').append(option);});
function clearProfileErrors(){for(const name of ['nickname','city']){form.elements[name].setAttribute('aria-invalid','false');$('#'+name+'-error').textContent='';}$('#form-error').textContent='';}
function profileError(name,message){form.elements[name].setAttribute('aria-invalid','true');$('#'+name+'-error').textContent=message;$('#form-error').textContent=message;form.elements[name].focus();}
const profileFields=['nickname','city','message','status','seeking','role','company'];
let profileBaseline='',profileSaving=false;
function profileDraft(){return JSON.stringify([...profileFields.map(name=>form.elements[name].value),form.elements.lit.checked,form.elements.visible.checked]);}
function profileHasChanges(){return !!$('#profile-dialog').open&&profileDraft()!==profileBaseline;}
function setProfileSaving(value){
  profileSaving=value;$('#save-profile').setAttribute('aria-busy',String(value));
  for(const name of [...profileFields,'lit','visible'])form.elements[name].disabled=value;
  $('#save-profile').disabled=value;$('#delete-profile').disabled=value;
  $('#save-profile').textContent=value?'Saving…':'Save my light';
  $('#profile-save-status').textContent=value?'Saving your light. Please wait.':'';
}
function requestProfileClose(){
  if(profileSaving)return false;
  if(profileHasChanges()&&!confirm('Discard your unsaved changes?'))return false;
  $('#profile-dialog').close();return true;
}
$('#profile-dialog').addEventListener('cancel',event=>{event.preventDefault();requestProfileClose();});
window.addEventListener('beforeunload',event=>{if(profileSaving||profileHasChanges()){event.preventDefault();event.returnValue='';}});
function openProfile(){if(accountStoryMode&&globalThis.LightEmUpAccount&&!LightEmUpAccount.ready()){void LightEmUpAccount.openEditor();return;}if($('#profile-dialog').open||applicationState.navigation.dialog)return;form.reset();clearProfileErrors();setProfileSaving(false);const p=state.profile;if(p){for(const key of profileFields)form.elements[key].value=p[key]||'';form.elements.lit.checked=!!p.lit;form.elements.visible.checked=!!p.visible;}else form.elements.city.value='Stockholm';$('#delete-profile').hidden=!p||accountStoryMode;profileBaseline=profileDraft();openApplicationDialog('profile');form.elements.nickname.focus();}
form.onsubmit=e=>{
  e.preventDefault();if(profileSaving)return;clearProfileErrors();
  const nickname=form.elements.nickname.value.trim();if(!nickname){profileError('nickname','Please enter a nickname.');return;}
  const chosen=cities.find(c=>[c.name,...(c.aliases||[])].some(name=>normalize(name)===normalize(form.elements.city.value.trim())));if(!chosen){profileError('city','Please choose a city from the suggestions.');return;}
  const p={id:'mine',nickname,city:chosen.name,lit:form.elements.lit.checked,visible:form.elements.visible.checked};
  for(const key of ['message','status','seeking','role','company'])p[key]=form.elements[key].value.trim();
  const previous=state.profile;dispatchApplication({type:'SAVE_STARTED'});setProfileSaving(true);state.profile=p;
  const success=saved=>{if(saved&&typeof saved==='object'){state.profile=saved;p.id=saved.id;}profileBaseline=profileDraft();setProfileSaving(false);dispatchApplication({type:'SAVE_SUCCEEDED',id:p.id,persistence:accountStoryMode?'server':saved?'browser':'sessionOnly'});$('#profile-dialog').close();render();focusSavedStory();notify(accountStoryMode?'Your candle is saved.':saved?'Your light is saved on this browser.':'Your light is available this session only; browser storage is unavailable.');};
  const failure=()=>{state.profile=previous;setProfileSaving(false);const message='Your light could not be saved. Your changes are still here. Please try again.';dispatchApplication({type:'SAVE_FAILED',error:message});$('#form-error').textContent=message;$('#save-profile').focus();};
  try{const result=accountStoryMode?LightEmUpAccount.save(p):persist();if(result&&typeof result.then==='function')return Promise.resolve(result).then(success,failure);success(result);}catch{failure();}
};
['#join','#login','#my-light'].forEach(s=>$(s).onclick=openProfile);document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.dataset.close==='profile-dialog'?requestProfileClose():document.getElementById(b.dataset.close).close());$('#delete-profile').onclick=()=>{if(profileSaving)return;if(!confirm('Delete your local profile and its reactions?'))return;state.profile=null;state.reactions=[];persist();dispatchApplication({type:'LOCAL_STORY_CLEARED'});$('#profile-dialog').close();render();focusSavedStory();notify('Your local profile was deleted.');};$('#all-stories').onclick=()=>{$('#city-search').value='';selectCity('');};document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{dispatchApplication({type:'NAVIGATE',view:b.dataset.view});$('#community').hidden=applicationState.navigation.view!=='community';$('#dashboard').hidden=applicationState.navigation.view!=='dashboard';render();});$('#rules').onclick=()=>openApplicationDialog('info');$('#export').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({version:1,...state},null,2)],{type:'application/json'}));const a=el('a');a.href=url;a.download='light-em-up-local-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};$('#reset').onclick=()=>{if(!confirm('Reset all profiles, reactions, reports and page-open counts on this browser?'))return;state={profile:null,reactions:[],reports:[],opens:1};persist();dispatchApplication({type:'LOCAL_STORY_CLEARED'});render();notify('Local demo reset. Fictional samples remain.');};

function normalize(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('sv');}
function renderCities(){const query=normalize($('#city-search').value.trim());const matches=cities.filter(c=>!query||normalize([c.name,...(c.aliases||[])].join(' ')).includes(query));const preferred=['Stockholm','Göteborg','Malmö','Uppsala','Umeå','Kiruna'];const shown=query?matches.slice(0,18):preferred.map(name=>cities.find(c=>c.name===name)).filter(Boolean);$('#city-results').textContent=query?(matches.length?`${matches.length} matching places${matches.length>18?' · showing the first 18; keep typing to narrow':''}`:'No matching places. Try another spelling.'):'Search 832 places, or choose a popular city.';$('#cities').replaceChildren();shown.forEach(c=>{const b=el('button',c.name);b.setAttribute('data-focus-key',`city-${c.name}`);b.setAttribute('aria-pressed',String(cityFilter===c.name));b.onclick=()=>selectCity(c.name);$('#cities').append(b);});}
$('#city-search').addEventListener('input',renderCities);

function selectCity(name){provinceFilter='';cityFilter=name;storyPage=0;render();$('#stories-title').scrollIntoView({block:'nearest'});}
function svgNode(tag,attributes={}){const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value]of Object.entries(attributes))n.setAttribute(key,String(value));return n;}
function candleGraphic(width,height,lit){
  const graphic=svgNode('svg',{viewBox:'550 150 440 710',width,height,'aria-hidden':'true',focusable:'false'});
  if(lit){graphic.append(svgNode('image',{href:'assets/candle-color.png',width:1535,height:1024}));}
  else{graphic.append(svgNode('path',{d:'M724 530 Q764 522 808 529 L811 704 Q815 743 789 766 Q774 778 770 803 Q765 830 755 821 L752 747 M724 530 L724 666 Q726 691 739 687 Q751 683 749 666 L752 656 Q759 649 770 646 Q783 644 777 626 Q768 611 769 591 L768 537 M767 530 L765 510',fill:'#e7cf9e',stroke:'#755331','stroke-width':7,'stroke-linecap':'round','stroke-linejoin':'round'}));}
  return graphic;
}
function provinceFor(person){return cityProvince[person.city]||'';}
function selectProvince(name){
  if(name&&!provinces.some(p=>p.name===name))return;
  provinceFilter=name;cityFilter='';storyPage=0;render();
}
let pointerProvince=null,focusedProvince=null;
function hideProvinceTooltip(){$('#province-tooltip').textContent='';}
function showProvinceTooltip(province){$('#province-tooltip').textContent=`${province.name} · Level ${provinceLightLevels(entries()).get(province.name)||0} · ${entries().filter(p=>provinceFor(p)===province.name).length} stories`;}
function showProvinceIndicator(province,kind){const group=$('#province-'+kind);group.replaceChildren();if(province)for(const cls of ['indicator-dark','indicator-light'])group.append(svgNode('path',{d:province.path,'fill-rule':'evenodd',class:cls}));}
$('#province-tooltip').addEventListener('mouseleave',()=>{pointerProvince=null;if(focusedProvince)showProvinceTooltip(focusedProvince);else hideProvinceTooltip();});
$('#map-stage').addEventListener('mouseleave',()=>{pointerProvince=null;if(focusedProvince)showProvinceTooltip(focusedProvince);else hideProvinceTooltip();});
window.addEventListener('keydown',e=>{if(e.key==='Escape')hideProvinceTooltip();});
function renderProvinces(data){
  const areas=$('#province-areas'),levels=provinceLightLevels(data);
  $('#province-glows').replaceChildren();
  showProvinceIndicator(provinces.find(p=>p.name===provinceFilter),'selection');
  if(!$('#province-boundaries').children.length)for(const province of provinces)for(const cls of ['boundary-dark','boundary-light'])$('#province-boundaries').append(svgNode('path',{d:province.path,'fill-rule':'evenodd',class:cls}));
  for(const [index,province] of provinces.entries()){
    const count=data.filter(p=>provinceFor(p)===province.name).length;
    const selected=provinceFilter===province.name;
    const level=levels.get(province.name)||0;
    if(level)$('#province-glows').append(svgNode('path',{d:province.path,'fill-rule':'evenodd',class:'province-land-glow','data-province':province.name,'data-light-level':level,fill:'url(#province-land-light)',opacity:lightAppearance(level).landOpacity}));
    const attributes={d:province.path,'fill-rule':'evenodd',class:`province-area${selected?' is-selected':''}`,role:'button',tabindex:0,'aria-pressed':String(selected),'data-province':province.name,'data-light-level':level,'aria-label':`${province.name}, ${province.region}: ${count} community stories; land light level ${level} of 6. Select province.`};
    const existing=areas.children[index];
    if(existing){for(const [key,value] of Object.entries(attributes))existing.setAttribute(key,String(value));existing.children[0].textContent=`${province.name} · ${province.region} · ${count} stories · Level ${level}`;continue;}
    const area=svgNode('path',attributes);
    const title=svgNode('title');title.textContent=`${province.name} · ${province.region} · ${count} stories · Level ${level}`;area.append(title);
    const showName=()=>showProvinceTooltip(province);
    area.addEventListener('mouseenter',()=>{pointerProvince=province;showName();});
    area.addEventListener('focus',()=>{focusedProvince=province;showName();showProvinceIndicator(province,'focus');});
    // Keep the tooltip available while crossing the map to its fixed panel.
    area.addEventListener('mouseleave',()=>{});
    area.addEventListener('blur',()=>{focusedProvince=null;$('#province-focus').replaceChildren();if(!pointerProvince)hideProvinceTooltip();});
    const choose=()=>selectProvince(province.name);area.addEventListener('click',choose);area.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}});
    areas.append(area);
  }
  $('#province-select').value=provinceFilter;
  $('#clear-province').hidden=!provinceFilter;
  $('#province-status').textContent=provinceFilter?`${provinceFilter} selected · ${data.filter(p=>provinceFor(p)===provinceFilter).length} stories`:'Select a province on the map or from the list.';

}
$('#province-select').onchange=e=>selectProvince(e.target.value);
$('#clear-province').onclick=()=>selectProvince('');
for(const province of provinces){const option=el('option',`${province.name} · ${province.region}`);option.value=province.name;$('#province-select').append(option);}
function renderMap(data){
  renderProvinces(data);
  const map=$('#map'),bounds=map.getBoundingClientRect();
  const scale=Math.min((bounds.width||362)/440,(bounds.height||560)/680);
  const municipal=kommunLights(data);
  // Story lights stay at the chosen place; decorative dots need no collision clustering.
  const groups=cities.map(city=>({city,people:data.filter(p=>p.city===city.name)})).filter(g=>g.people.length);
  $('#map-points').replaceChildren();
  for(const {city,people} of groups){
    const litCount=people.filter(p=>p.lit).length;
    const level=Math.max(...people.map(p=>municipal.get(kommunKey(p)).level));
    const own=people.some(p=>p.id==='mine');
    const appearance=lightAppearance(level);
    const label=`${city.name}: ${people.length} stories, ${litCount} lit; kommun light level ${level} of 6.`;
    const g=svgNode('g',{class:`story-light light-level-${level}${own?' own-story-light':''}`,'data-city':city.name,'data-light-level':level,'data-story-count':people.length,transform:`translate(${city.x} ${city.y}) scale(${1/scale})`,role:'img','aria-label':label});
    const title=svgNode('title');title.textContent=label;g.append(title);
    if(litCount&&appearance.haloRadius)g.append(svgNode('circle',{r:appearance.haloRadius,class:'story-glow',opacity:appearance.haloOpacity}));
    if(own&&litCount)g.append(svgNode('circle',{r:appearance.radius+5,class:'own-story-ring'}));
    g.append(svgNode('circle',{r:litCount?appearance.radius:1.8,class:litCount?'map-light':'map-light resting-light'}));
    $('#map-points').append(g);
  }
  const own=data.find(p=>p.id==='mine');
  $('#map-update').textContent=own?`✓ Your story is on the map · ${own.city}`:'Every light is someone choosing hope.';
  $('#story-total').textContent=`${data.length} community stories`;
  $('#map-selection').textContent=provinceFilter?`Showing stories from ${provinceFilter}.`:cityFilter?`Showing stories from ${cityFilter}. ${[...municipal.values()].filter(g=>data.some(p=>p.city===cityFilter&&kommunKey(p)===g.name)).map(g=>`${g.name}: ${g.count} found work + lit · light level ${g.level}/6`).join('; ')}`:`${data.length} visible profiles · ${groups.length} places with stories`;
}
$('#prev-page').onclick=()=>{storyPage=Math.max(0,storyPage-1);render();$('#stories-title').focus();$('#stories-title').scrollIntoView({block:'nearest'});};
$('#next-page').onclick=()=>{storyPage++;render();$('#stories-title').focus();$('#stories-title').scrollIntoView({block:'nearest'});};
let resizeTimer;
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>renderMap(entries()),120);});

for(const name of ['profile','info','cluster'])document.getElementById(name+'-dialog').addEventListener('close',()=>dispatchApplication({type:'CLOSE_DIALOG',dialog:name}));
dispatchApplication({type:'NAVIGATE',view:'community'});
persist();render();if(!storageOK)notify('Browser storage is unavailable. This demo will work for this session only.');

// FR-07: a text alternative to spatial location, hover and brightness.
function renderMapData(data){
  const table=el('table');table.setAttribute('role','table');table.append(el('caption','Community stories and candle levels across all 25 provinces'));
  const head=el('thead'),heading=el('tr');head.setAttribute('role','rowgroup');heading.setAttribute('role','row');
  for(const label of ['Province','Stories','Candles','Kommun levels']){const th=el('th',label);th.setAttribute('scope','col');th.setAttribute('role','columnheader');heading.append(th);}head.append(heading);table.append(head);
  const body=el('tbody'),municipal=kommunLights(data);body.setAttribute('role','rowgroup');
  for(const province of provinces){
    const people=data.filter(p=>provinceFor(p)===province.name),lit=people.filter(p=>p.lit).length;
    const row=el('tr'),name=el('th');name.setAttribute('scope','row');name.setAttribute('role','rowheader');row.setAttribute('role','row');
    const select=el('button',province.name);select.setAttribute('data-focus-key',`province-data-${province.name}`);select.setAttribute('aria-pressed',String(provinceFilter===province.name));select.onclick=()=>selectProvince(province.name);name.append(select);
    const levels=el('td');const keys=[...new Set(people.map(kommunKey))];
    if(keys.length){const list=el('ul');for(const key of keys){const item=municipal.get(key);list.append(el('li',`${key}: ${item.count} found work + lit; level ${item.level} of 6`));}levels.append(list);}else levels.textContent='No stories; level 0 of 6';
    row.append(name,el('td',String(people.length)),el('td',`${lit} lit / ${people.length-lit} resting`),levels);for(const cell of [...row.children].slice(1))cell.setAttribute('role','cell');body.append(row);
  }
  table.append(body);$('#map-data').replaceChildren(table);
}

// FR-08: after a dialog changes its invoker, focus a visible continuation.
function focusSavedStory(){if($('#community').hidden){$('#my-light').focus();return;}const edit=document.getElementById('edit-my-story');(edit||$('#join')).focus();}
$('#profile-dialog').addEventListener('close',()=>{if(!document.activeElement||document.activeElement===document.body||$('#profile-dialog').contains(document.activeElement))focusSavedStory();});

// FR-13: account sign-in has its own page; local story editing stays separate.
$('#header-login').onclick=()=>{location.assign(new URL('signin.html',location.href).href);};

// FR-14: retain only public browsing context through the sign-in round trip.
function getBrowsingContext(){return {province:provinceFilter,city:cityFilter,page:storyPage,query:$('#city-search').value.slice(0,120)};}
function restoreBrowsingContext(value){
 if(!value||typeof value!=='object')return;
 provinceFilter=provinces.some(p=>p.name===value.province)?value.province:'';
 cityFilter=!provinceFilter&&cities.some(c=>c.name===value.city)?value.city:'';
 storyPage=Number.isSafeInteger(value.page)&&value.page>=0&&value.page<=100000?value.page:0;
 $('#city-search').value=typeof value.query==='string'?value.query.slice(0,120):'';
 render();
}
