'use strict';
(()=>{
 if(globalThis.LIGHT_EM_UP_AUTH?.mode==='local'){LocalSignInUI.start();return;}
 document.getElementById('local-account-note').hidden=true;document.getElementById('signin-identity-label').textContent='Email (required)';document.getElementById('signin-nickname').type='email';document.getElementById('password-help').textContent='Use at least 8 characters. The account service may require a stronger password.';
 const $=id=>document.getElementById(id),form=$('signin-form'),email=$('signin-nickname'),password=$('signin-password'),submit=$('signin-submit'),retry=$('signin-retry'),cancel=$('signin-cancel');
 document.body.setAttribute('data-view-state','signIn');
 let registering=false,lastPhase='checking';
 function modeUI(){document.title=registering?'Create account — Light’em up':'Sign in — Light’em up';$('signin-title').textContent=registering?'Create account':'Sign in';$('account-description').textContent=registering?'Create an account with email and password. Email confirmation may be required.':'Welcome back to Light’em up.';password.autocomplete=registering?'new-password':'current-password';$('password-help').hidden=!registering;$('account-mode-toggle').textContent=registering?'Already registered? Sign in':'Create an account';submit.textContent=registering?'Create account':'Sign in';}
 let storage;try{storage=window.sessionStorage;}catch{}
 let model=ApplicationState.transition(ApplicationState.initial(),{type:'NAVIGATE',view:'signIn'});
 const messages={registration:'We could not create an account. Check your details or sign in if you already registered, then try again.',weakPassword:'Choose a stronger password and try again.',credentials:'The email or password is incorrect. Please try again.',unconfirmed:'Please confirm your email before signing in.',connection:'We couldn’t complete sign-in. Please try again.',provider:'Google sign-in could not be opened. Please try again.',cancelled:'Sign-in was cancelled or could not be completed. You can try again.'};
 function clearErrors(){for(const [field,id]of [[email,'nickname-error'],[password,'password-error']]){field.setAttribute('aria-invalid','false');$(id).textContent='';}$('signin-error').textContent='';}
 function render(value){
   lastPhase=value.phase;if(value.phase==='confirmation'){registering=false;password.value='';}modeUI();
   document.body.setAttribute('data-signin-state',value.phase);
   const auth=value.phase==='checking'?'checking':['signingIn','redirecting'].includes(value.phase)?'signingIn':value.phase==='signedIn'?'signedIn':value.phase==='checkFailed'?'checkFailed':'signedOut';
   model=ApplicationState.transition(model,{type:'AUTH_CHANGED',status:auth,user:value.user});
   $('signin-status').textContent=value.message;
   $('signin-error').textContent=value.error?messages[value.error]:'';
   const busy=['checking','signingIn','redirecting','signedIn'].includes(value.phase),unavailable=['unavailable','checkFailed'].includes(value.phase);
   $('signin-fields').disabled=unavailable;
   submit.disabled=busy||unavailable;submit.textContent=value.phase==='signingIn'?value.message:registering?'Create account':'Sign in';$('account-mode-toggle').disabled=busy||unavailable;
   form.setAttribute('aria-busy',String(busy));
   retry.hidden=value.phase!=='checkFailed';retry.disabled=value.phase==='checking';
   $('signin-google').hidden=!globalThis.LIGHT_EM_UP_AUTH?.googleEnabled;
   $('signin-google').disabled=busy||unavailable;
   if(value.error==='credentials'){email.setAttribute('aria-invalid','true');password.setAttribute('aria-invalid','true');}
   if(value.phase==='signedIn')password.value='';
 }
 const flow=SignInFlow.create({config:globalThis.LIGHT_EM_UP_AUTH||{},sessionModule:SessionRestoration,sdkFactory:globalThis.supabase?.createClient,href:location.href,storage,onChange:render,navigate:target=>location.replace(target)});
 cancel.href=flow.cancelTarget;cancel.onclick=event=>{event.preventDefault();password.value='';flow.cancel();};
 form.onsubmit=async event=>{
   event.preventDefault();clearErrors();
   if(!email.value.trim()||email.validity.typeMismatch){email.setAttribute('aria-invalid','true');$('nickname-error').textContent='Enter a valid email address.';email.focus();return;}
   if(!password.value){password.setAttribute('aria-invalid','true');$('password-error').textContent='Enter your password.';password.focus();return;}
   if(registering&&password.value.length<8){password.setAttribute('aria-invalid','true');$('password-error').textContent='Use at least 8 characters for your new password.';password.focus();return;}
   await (registering?flow.register:flow.signIn)({email:email.value.trim(),password:password.value});
   if(document.activeElement===document.body)submit.focus();
 };
 $('account-mode-toggle').onclick=()=>{if(['checking','signingIn','redirecting','signedIn','unavailable','checkFailed'].includes(lastPhase))return;registering=!registering;password.value='';clearErrors();modeUI();email.focus();};
 $('password-toggle').onclick=()=>{const visible=password.type==='password';password.type=visible?'text':'password';$('password-toggle').textContent=visible?'Hide password':'Show password';$('password-toggle').setAttribute('aria-pressed',String(visible));};
 retry.onclick=async()=>{await flow.retry();if(document.activeElement!==document.body&&document.activeElement!==retry)return;if(!retry.hidden)retry.focus();else if(!$('signin-fields').disabled)email.focus();else cancel.focus();};
 $('signin-google').onclick=async()=>{clearErrors();await flow.google();if(document.activeElement===document.body&&!$('signin-google').disabled)$('signin-google').focus();};
 window.addEventListener('pagehide',()=>flow.stop(),{once:true});
 void flow.start();
})();
