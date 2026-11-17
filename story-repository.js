'use strict';
// All ownership is enforced again by database RLS; UI identity is not authority.
const StoryRepository=(()=>{
 const fields='id,owner_id,nickname,city,message,status,seeking,role,company,lit,visible';
 function create(client,{timeoutMs=10000}={}){
  async function request(query){const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),timeoutMs);try{const {data,error}=await query.abortSignal(abort.signal);if(error)throw error;return data;}finally{clearTimeout(timer);}}
  return Object.freeze({
   async load(owner){const data=await request(client.from('stories').select(fields).eq('owner_id',owner).limit(1));return data?.[0]||null;},
   async save(owner,story){const row={owner_id:owner};for(const key of fields.split(',').filter(k=>!['id','owner_id'].includes(k)))row[key]=story[key];const data=await request(client.from('stories').upsert(row,{onConflict:'owner_id'}).select(fields));if(!data?.[0]||data[0].owner_id!==owner)throw new Error('Invalid story response');return data[0];}
  });
 }
 return Object.freeze({create});
})();
if(typeof module!=='undefined'&&module.exports)module.exports=StoryRepository;
