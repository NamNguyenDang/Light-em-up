'use strict';
(()=>{
 const button=document.getElementById('header-login'),menu=document.getElementById('account-menu'),panel=document.getElementById('encouragement-panel');let signedIn=false;
 button.setAttribute('aria-controls','account-menu');
 function close(focus=false){menu.hidden=true;button.setAttribute('aria-expanded','false');if(focus)button.focus();}
 const unsubscribe=LightEmUpSession.subscribe(value=>{signedIn=value.status==='signedIn';if(!signedIn){close();panel.hidden=true;button.removeAttribute('aria-expanded');}else button.setAttribute('aria-expanded',String(!menu.hidden));});
 button.onclick=()=>{if(!signedIn){location.assign(new URL('signin.html',location.href).href);return;}menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',String(!menu.hidden));};
 menu.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close(true);}});
 document.addEventListener('click',event=>{if(!menu.hidden&&!menu.contains(event.target)&&event.target!==button)close();});
 document.getElementById('menu-my-story').onclick=()=>{close();const card=document.getElementById('featured-story');card.setAttribute('tabindex','-1');card.focus();card.scrollIntoView({block:'nearest'});};
 document.getElementById('menu-encouragement').onclick=()=>{close();panel.hidden=false;document.dispatchEvent(new Event('encouragement-open'));document.getElementById('encouragement-title').focus();};
 document.getElementById('close-encouragement').onclick=()=>{panel.hidden=true;button.focus();};
 window.addEventListener('pagehide',()=>unsubscribe(),{once:true});
})();
