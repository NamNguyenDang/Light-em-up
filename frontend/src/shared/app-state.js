'use strict';

// FR-11: transient UI state, separate from profile data and browser storage.
// This model is not authentication or authorization; a future adapter supplies
// verified sessions and the backend must independently authorize every request.
const ApplicationState=(()=>{
  const views=['community','dashboard','signIn'];
  const dialogs=['profile','info','cluster','encouragement'];
  const authTransitions={
    signedOut:['checking','signingIn'],
    checking:['signedIn','signedOut','checkFailed'],
    checkFailed:['checking','signedOut'],
    signingIn:['signedIn','signedOut'],
    signedIn:['checking','signingOut','signedOut'],
    signingOut:['signedOut','signedIn']
  };
  function freeze(value){
    for(const child of Object.values(value))if(child&&typeof child==='object')freeze(child);
    return Object.freeze(value);
  }
  function initial({hasLocalStory=false}={}){
    return freeze({
      navigation:{view:'community',dialog:null},
      authentication:{status:'signedOut',user:null,error:null},
      story:{status:hasLocalStory?'saved':'none',id:hasLocalStory?'mine':null,persistence:hasLocalStory?'browser':null,error:null}
    });
  }
  function requireValue(value,allowed,label){if(!allowed.includes(value))throw new RangeError(`Invalid ${label}`);}
  function settledStory(story){return {...story,status:story.id?'saved':'none',error:null};}
  function transition(current,event){
    if(!event||typeof event.type!=='string')throw new TypeError('A state event requires a type');
    const {navigation,authentication,story}=current;
    let next=current;
    switch(event.type){
      case 'NAVIGATE':
        requireValue(event.view,views,'view');
        // Native modal dialogs must close before switching the underlying view.
        if(navigation.dialog)return current;
        next={...current,navigation:{...navigation,view:event.view}};break;
      case 'OPEN_DIALOG':
        requireValue(event.dialog,dialogs,'dialog');
        if(navigation.dialog)return current;
        next={...current,navigation:{...navigation,dialog:event.dialog},story:event.dialog==='profile'?{...story,status:'editing',error:null}:story};break;
      case 'CLOSE_DIALOG':
        requireValue(event.dialog,dialogs,'dialog');
        // Ignore a delayed close event after a save or another dialog opens.
        if(navigation.dialog!==event.dialog)return current;
        next={...current,navigation:{...navigation,dialog:null},story:event.dialog==='profile'?settledStory(story):story};break;
      case 'SAVE_STARTED':
        if(navigation.dialog!=='profile'||!['editing','saveFailed'].includes(story.status))return current;
        next={...current,story:{...story,status:'saving',error:null}};break;
      case 'SAVE_SUCCEEDED':
        if(story.status!=='saving')return current;
        if(typeof event.id!=='string'||!event.id)throw new TypeError('A saved story requires an ID');
        requireValue(event.persistence,['browser','sessionOnly','server'],'persistence');
        next={...current,navigation:{...navigation,dialog:null},story:{status:'saved',id:event.id,persistence:event.persistence,error:null}};break;
      case 'SAVE_FAILED':
        if(story.status!=='saving')return current;
        next={...current,story:{...story,status:'saveFailed',error:event.error||'Unable to save your story.'}};break;
      case 'LOCAL_STORY_CLEARED':
        next={...current,navigation:{...navigation,dialog:navigation.dialog==='profile'?null:navigation.dialog},story:{status:'none',id:null,persistence:null,error:null}};break;
      // Only the verified session adapter reconciles snapshots; ordinary UI transitions remain guarded.
      case 'SESSION_SYNC':{
        requireValue(event.status,['checking','signedIn','signedOut','checkFailed'],'session state');
        const user=event.user;
        if(event.status==='signedIn'&&(!user||typeof user.id!=='string'||!user.id))throw new TypeError('A verified session requires a user ID');
        next={...current,authentication:{status:event.status,user:event.status==='signedIn'?{id:user.id,nickname:typeof user.nickname==='string'?user.nickname:''}:null,error:event.status==='checkFailed'?'Unable to check your session.':null}};
        break;
      }
      case 'AUTH_CHANGED':{
        requireValue(event.status,Object.keys(authTransitions),'authentication state');
        if(!authTransitions[authentication.status].includes(event.status))return current;
        const hasUser=['signedIn','signingOut'].includes(event.status);
        const user=event.user||authentication.user;
        if(hasUser&&(!user||typeof user.id!=='string'||!user.id))throw new TypeError('An authenticated state requires a user ID');
        next={...current,authentication:{status:event.status,user:hasUser?{id:user.id,nickname:typeof user.nickname==='string'?user.nickname:''}:null,error:event.status==='checkFailed'?(event.error||'Unable to check your session.'):null}};
        break;
      }
      default:throw new RangeError(`Unknown state event: ${event.type}`);
    }
    return freeze(next);
  }
  return Object.freeze({initial,transition});
})();
if(typeof module!=='undefined'&&module.exports)module.exports=ApplicationState;
