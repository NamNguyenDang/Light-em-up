'use strict';
(()=>{
 let generation=0,owner=null,ready=false,loadPromise=Promise.resolve(),stopped=false;
 let draft;try{draft=DraftRecovery.create(sessionStorage);}catch{draft=DraftRecovery.create({getItem:()=>null,setItem(){},removeItem(){}});}
 const status=document.getElementById('own-story-status'),retry=document.getElementById('own-story-retry');
 function show(text,failed=false){status.textContent=text;retry.hidden=!failed;}
 async function load(){
  const request=++generation,identity=owner;show('Loading your story…');
  try{const story=await LightEmUpSession.loadStory(identity);if(stopped||request!==generation)return;ready=true;setAccountStory(story,true);show(story?'Your story is ready.':'You can add your first candle.');}
  catch{if(stopped||request!==generation)return;ready=false;show('We could not load your story. Please retry before editing.',true);}
 }
 const unsubscribe=LightEmUpSession.subscribe(value=>{
  if(value.status==='checking')return;
  const next=value.status==='signedIn'?value.user.id:null;
  if(next===owner)return;
  generation++;ready=false;setAccountStory(null,!!next);owner=next;
  if(owner)loadPromise=load();else show('');
 });
 retry.onclick=async()=>{retry.disabled=true;await(loadPromise=load());retry.disabled=false;if(retry.hidden)document.getElementById('header-login').focus();else retry.focus();};
 globalThis.LightEmUpAccount=Object.freeze({
  ready:()=>ready,
  owner:()=>owner,
  draft,
  async openEditor(){if(owner){await loadPromise;if(!ready){status.focus();return;}}openProfile();},
  async save(story){const identity=owner,request=generation;if(!identity||!ready)throw new Error('Story unavailable');const saved=await LightEmUpSession.saveStory(identity,story);if(identity!==owner||request!==generation)throw new Error('Account changed');return saved;}
 });
 window.addEventListener('pagehide',()=>{stopped=true;generation++;unsubscribe();},{once:true});
})();
