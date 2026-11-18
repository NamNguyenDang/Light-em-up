'use strict';
const LocalSignInUI=(()=>{
 function start(){
  const $=id=>document.getElementById(id),name=$('signin-nickname'),password=$('signin-password'),form=$('signin-form'),submit=$('signin-submit'),toggle=$('account-mode-toggle'),cancel=$('signin-cancel'),retry=$('signin-retry');
  let registering=false,busy=false,stopped=false,store;
  const target=SignInFlow.returnTarget(location.href);const back=new URL(target);if(back.hash==='#add-candle')back.hash='';cancel.href=back.href;
  function phase(value,text=''){document.body.dataset.signinState=value;$('signin-status').textContent=text;}
  function mode(){document.title=registering?'Create account — Light’em up':'Sign in — Light’em up';$('signin-title').textContent=registering?'Create account':'Sign in';$('account-description').textContent=registering?'Choose a nickname and password. No email needed.':'Welcome back. Use your registered nickname.';password.autocomplete=registering?'new-password':'current-password';$('password-help').hidden=!registering;toggle.textContent=registering?'Already registered? Sign in':'Create an account';submit.textContent=registering?'Create account':'Sign in';}
  function clear(){for(const [field,id]of [[name,'nickname-error'],[password,'password-error']]){field.setAttribute('aria-invalid','false');$(id).textContent='';}$('signin-error').textContent='';}
  function invalid(field,id,text){field.setAttribute('aria-invalid','true');$(id).textContent=text;field.focus();}
  function working(value){busy=value;submit.disabled=toggle.disabled=retry.disabled=value;form.setAttribute('aria-busy',String(value));submit.textContent=value?(registering?'Creating your account…':'Signing in…'):(registering?'Create account':'Sign in');}
  function done(){password.value='';try{sessionStorage.setItem('light-em-up-signin-focus',new URL(target).hash.slice(1)||'header-login');}catch{}phase('signedIn','Signed in. Returning to the community.');location.replace(target);}
  async function check(){working(true);phase('checking','Checking your local session…');try{store=LocalAccounts.current();const user=await store.identity();if(stopped)return;if(user){done();return;}retry.hidden=true;$('signin-fields').disabled=false;phase('ready');}catch{if(stopped)return;retry.hidden=false;$('signin-fields').disabled=true;phase('checkFailed','Browser storage or cryptography is unavailable. Enable site storage and retry.');}finally{if(!stopped)working(false);}}
  form.onsubmit=async e=>{e.preventDefault();if(busy||stopped||!store)return;clear();let n;try{n=LocalAccounts.nickname(name.value);}catch{invalid(name,'nickname-error','Use 1–40 characters: letters, numbers, spaces, dot, underscore or hyphen. Include a letter or number.');return;}
   if(!password.value||(registering&&password.value.length<15)||password.value.length>128){invalid(password,'password-error',registering?'Use 15–128 characters for your password.':'Enter your password (up to 128 characters).');return;}
   working(true);phase('signingIn',registering?'Creating your account…':'Signing in…');
   try{await store[registering?'register':'signIn'](n.display,password.value);if(stopped){await store.signOut();return;}done();}
   catch(error){if(stopped)return;phase('failed');if(error.code==='duplicate')invalid(name,'nickname-error','That nickname is already taken. Sign in or choose another.');else if(error.code==='credentials'){$('signin-error').textContent='Nickname or password is incorrect.';name.setAttribute('aria-invalid','true');password.setAttribute('aria-invalid','true');password.focus();}else{$('signin-error').textContent='We could not save or open your local account. Your input is still here. Check browser storage and try again.';submit.focus();}}
   finally{if(!stopped)working(false);}
  };
  toggle.onclick=()=>{if(busy)return;registering=!registering;password.value='';clear();mode();name.focus();};
  $('password-toggle').onclick=()=>{const show=password.type==='password';password.type=show?'text':'password';$('password-toggle').textContent=show?'Hide password':'Show password';$('password-toggle').setAttribute('aria-pressed',String(show));};
  cancel.onclick=e=>{if(busy){e.preventDefault();$('signin-status').textContent='Please wait for the current account check to finish.';return;}stopped=true;password.value='';};
  retry.onclick=async()=>{await check();if(!stopped)(retry.hidden?name:retry).focus();};
  window.addEventListener('pagehide',()=>{stopped=true;password.value='';},{once:true});
  mode();void check();
 }
 return Object.freeze({start});
})();
