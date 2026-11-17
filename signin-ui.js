'use strict';
(()=>{
 const $=id=>document.getElementById(id),form=$('signin-form'),email=$('signin-email'),password=$('signin-password'),submit=$('signin-submit'),retry=$('signin-retry'),cancel=$('signin-cancel');
 document.body.setAttribute('data-view-state','signIn');
 let storage;try{storage=window.sessionStorage;}catch{}
 let model=ApplicationState.transition(ApplicationState.initial(),{type:'NAVIGATE',view:'signIn'});
 const messages={credentials:'The email or password is incorrect. Please try again.',unconfirmed:'Please confirm your email before signing in.',connection:'We couldn’t complete sign-in. Please try again.',provider:'Google sign-in could not be opened. Please try again.',cancelled:'Sign-in was cancelled or could not be completed. You can try again.'};
 function clearErrors(){for(const [field,id]of [[email,'email-error'],[password,'password-error']]){field.setAttribute('aria-invalid','false');$(id).textContent='';}$('signin-error').textContent='';}
 function render(value){
   document.body.setAttribute('data-signin-state',value.phase);
   const auth=value.phase==='checking'?'checking':['signingIn','redirecting'].includes(value.phase)?'signingIn':value.phase==='signedIn'?'signedIn':value.phase==='checkFailed'?'checkFailed':'signedOut';
   model=ApplicationState.transition(model,{type:'AUTH_CHANGED',status:auth,user:value.user});
   $('signin-status').textContent=value.message;
   $('signin-error').textContent=value.error?messages[value.error]:'';
   const busy=['checking','signingIn','redirecting','signedIn'].includes(value.phase),unavailable=['unavailable','checkFailed'].includes(value.phase);
   $('signin-fields').disabled=unavailable;
   submit.disabled=busy||unavailable;submit.textContent=value.phase==='signingIn'?'Signing in…':'Sign in';
   form.setAttribute('aria-busy',String(busy));
   retry.hidden=value.phase!=='checkFailed';retry.disabled=value.phase==='checking';
   $('signin-google').hidden=!globalThis.LIGHT_EM_UP_AUTH?.googleEnabled;
   $('signin-google').disabled=busy||unavailable;
   if(value.error==='credentials'){email.setAttribute('aria-invalid','true');password.setAttribute('aria-invalid','true');}
   if(value.phase==='signedIn')password.value='';
 }
 const flow=SignInFlow.create({config:globalThis.LIGHT_EM_UP_AUTH||{},sessionModule:SessionRestoration,sdkFactory:globalThis.supabase?.createClient,href:location.href,storage,onChange:render,navigate:target=>location.replace(target)});
 cancel.href=flow.target;cancel.onclick=event=>{event.preventDefault();password.value='';flow.cancel();};
 form.onsubmit=async event=>{
   event.preventDefault();clearErrors();
   if(!email.value.trim()||email.validity.typeMismatch){email.setAttribute('aria-invalid','true');$('email-error').textContent='Enter a valid email address.';email.focus();return;}
   if(!password.value){password.setAttribute('aria-invalid','true');$('password-error').textContent='Enter your password.';password.focus();return;}
   await flow.signIn({email:email.value.trim(),password:password.value});
   if(document.activeElement===document.body)submit.focus();
 };
 $('password-toggle').onclick=()=>{const visible=password.type==='password';password.type=visible?'text':'password';$('password-toggle').textContent=visible?'Hide password':'Show password';$('password-toggle').setAttribute('aria-pressed',String(visible));};
 retry.onclick=async()=>{await flow.retry();if(!retry.hidden)retry.focus();else if(!$('signin-fields').disabled)email.focus();else cancel.focus();};
 $('signin-google').onclick=async()=>{clearErrors();await flow.google();if(document.activeElement===document.body&&!$('signin-google').disabled)$('signin-google').focus();};
 window.addEventListener('pagehide',()=>flow.stop(),{once:true});
 void flow.start();
})();
