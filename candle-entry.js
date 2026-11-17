'use strict';
const CandleEntry=(()=>{
 function create({openEditor,signIn,clearIntent=()=>{},isModalOpen=()=>false,onBusy=()=>{},resumeIntent=false}={}){
  let session={status:'checking',user:null},waiting=false,intent=resumeIntent,stopped=false;
  const checking=()=>!session.status||session.status==='checking';
  const verified=()=>session.status==='signedIn'&&typeof session.user?.id==='string'&&!!session.user.id;
  function run(){if(isModalOpen())return;if(verified())openEditor();else signIn();}
  function activate(){if(stopped||isModalOpen())return;if(checking()){waiting=true;onBusy(true);return;}run();}
  function update(value){
   if(stopped)return;session=value||{status:'checkFailed',user:null};
   if(checking()){onBusy(waiting);return;}
   onBusy(false);
   if(intent){intent=false;clearIntent();if(verified()&&!isModalOpen()){waiting=false;openEditor();return;}}
   if(waiting){waiting=false;run();}
  }
  function stop(){stopped=true;waiting=false;onBusy(false);}
  return Object.freeze({activate,update,stop});
 }
 return Object.freeze({create});
})();
if(typeof module!=='undefined'&&module.exports)module.exports=CandleEntry;
