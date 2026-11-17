'use strict';
// All ownership is enforced again by database RLS; UI identity is not authority.
const StoryRepository=(()=>{
 const fields='id,owner_id,nickname,city,message,status,seeking,role,company,lit,visible';
 function create(client,{timeoutMs=10000}={}){
  async function request(query){const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),timeoutMs);try{const {data,error}=await query.abortSignal(abort.signal);if(error)throw error;return data;}finally{clearTimeout(timer);}}
  return Object.freeze({
   async reportEncouragement(event,reason){return await request(client.rpc('report_encouragement',{event,report_reason:reason}));},
   async blockSender(event){return await request(client.rpc('block_encouragement_sender',{event}));},
   async receivedEncouragement(offset){return await request(client.rpc('received_encouragement',{page_offset:offset}));},
   async readEncouragement(event){return await request(client.rpc('read_encouragement',{event}));},
   async sentEncouragement(owner){return await request(client.from('encouragements').select('story_id').eq('sender_id',owner));},
   async sendEncouragement(owner,story){return await request(client.from('encouragements').insert({sender_id:owner,story_id:story}).select('story_id'));},
   async reportEncouragement(event,reason){return await request(client.rpc('report_encouragement',{event,report_reason:reason}));},
   async blockSender(event){return await request(client.rpc('block_encouragement_sender',{event}));},
   async receivedEncouragement(offset){return await request(client.rpc('received_encouragement',{page_offset:offset}));},
   async readEncouragement(event){return await request(client.rpc('read_encouragement',{event}));},
   async sentEncouragement(owner){return await request(client.from('encouragements').select('story_id').eq('sender_id',owner).limit(1000));},
   async encourage(owner,storyId,message){try{return await request(client.from('encouragements').insert({sender_id:owner,story_id:storyId,message}).select('story_id'));}catch(error){if(error?.code==='23505')return [];throw error;}},
   async publicStories(){return await request(client.from('public_stories').select(fields.replace('owner_id,','')).limit(1000));},
   async load(owner){const data=await request(client.from('stories').select(fields).eq('owner_id',owner).limit(1));return data?.[0]||null;},
   async save(owner,story){const row={owner_id:owner};for(const key of fields.split(',').filter(k=>!['id','owner_id'].includes(k)))row[key]=story[key];const data=await request(client.from('stories').upsert(row,{onConflict:'owner_id'}).select(fields));if(!data?.[0]||data[0].owner_id!==owner)throw new Error('Invalid story response');return data[0];}
  });
 }
 return Object.freeze({create});
})();
if(typeof module!=='undefined'&&module.exports)module.exports=StoryRepository;
