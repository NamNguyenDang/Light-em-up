'use strict';
// Merge nearby city groups until their full marker/hit-target rectangles are separate.
// x/y remain weighted geographic centroids; no random displacement of cities.
function clusterCities(data, catalog, scale=1) {
  const safeScale=Math.max(0.1,scale);
  const clampX=x=>Math.max(30/safeScale,Math.min(440-40/safeScale,x));
  const clampY=y=>Math.max(44/safeScale,Math.min(680-44/safeScale,y));
  const groups=catalog.map(city=>({city,people:data.filter(p=>p.city===city.name)}))
    .filter(group=>group.people.length)
    .map(group=>({x:clampX(group.city.x),y:clampY(group.city.y),cities:[group.city],people:group.people}));
  const gapX=72/safeScale, gapY=86/safeScale;
  let changed=true;
  while(changed){
    changed=false;
    outer:for(let i=0;i<groups.length;i++)for(let j=i+1;j<groups.length;j++){
      const a=groups[i],b=groups[j];
      if(Math.abs(a.x-b.x)<gapX&&Math.abs(a.y-b.y)<gapY){
        const n=a.people.length,m=b.people.length;
        a.x=clampX((a.x*n+b.x*m)/(n+m));a.y=clampY((a.y*n+b.y*m)/(n+m));
        a.people.push(...b.people);a.cities.push(...b.cities);groups.splice(j,1);
        changed=true;break outer;
      }
    }
  }
  return groups;
}

// Explicit kommun wins; legacy local profiles use their selected place as the group key.
function kommunKey(person) { return person.kommun || person.city; }
function lightLevel(count) {
  return count <= 0 ? 0 : count <= 10 ? 1 : count <= 50 ? 2 : count <= 100 ? 3 : count <= 200 ? 4 : count <= 500 ? 5 : 6;
}
function kommunLights(data) {
  const groups=new Map();
  for(const person of data){
    const name=kommunKey(person);
    if(!groups.has(name))groups.set(name,{name,count:0,level:0});
    const group=groups.get(name);
    if(person.lit === true && person.status === 'Found work' && person.visible !== false)group.count++;
    group.level=lightLevel(group.count);
  }
  return groups;
}

// The land follows the strongest kommun represented in that province, not a sum.
function provinceLightLevels(data) {
  const municipal=kommunLights(data), levels=new Map();
  for(const person of data){
    if(person.visible===false)continue;
    const province=cityProvince[person.city];
    if(!province)continue;
    levels.set(province,Math.max(levels.get(province)||0,municipal.get(kommunKey(person)).level));
  }
  return levels;
}
