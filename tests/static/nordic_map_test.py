"""Data/source/static checks only. Not a browser or accessibility regression."""
from pathlib import Path
import json,re,hashlib,math,xml.etree.ElementTree as ET,importlib.util
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('nordic_build',ROOT/'scripts/build-nordic-map.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
data=json.loads((ROOT/'frontend/data/nordic-context.geojson').read_text());m=json.loads((ROOT/'frontend/data/nordic-context-manifest.json').read_text())
assert data['source']['blob']=='9d99f26dc470fcdbd08b062c813005acbdf73ccb'
assert data['source']['commit']=='ca96624a56bd078437bca8184e78163e5039ad19'
assert m['dataSha256']==hashlib.sha256((ROOT/'frontend/data/nordic-context.geojson').read_bytes()).hexdigest()
expected={'Norway':(32,1985),'Åland':(3,52),'Finland':(8,519),'Greenland':(17,2240),'Faroe Islands':(5,63),'Denmark':(12,298)}
assert {f['properties']['name'] for f in data['features']}==set(expected)
svg=ET.parse(ROOT/'frontend/assets/nordic-context.svg').getroot();ns={'s':'http://www.w3.org/2000/svg'}
assert svg.attrib['viewBox']=='0 0 440 680'
paths={p.attrib['data-feature']:p for p in svg.findall('.//s:path',ns)}
for f in data['features']:
 name=f['properties']['name'];polys=module.polygons(f);rings=[ring for p in polys for ring in p];pts=[pt for r in rings for pt in r]
 assert len(polys)==expected[name][0] and len(pts)==expected[name][1]
 assert all(r[0]==r[-1] and len(r)>=4 for r in rings)
 assert all(math.isfinite(x) and math.isfinite(y) and -180<=x<=180 and -90<=y<=90 for x,y in pts)
 d=paths[name].attrib['d'];assert d.count('M')==len(rings) and d.count('Z')==len(rings)
 actual=[tuple(map(float,p)) for p in re.findall(r'(-?[\d.]+),(-?[\d.]+)',d)];assert len(actual)==len(pts)
 for a,p in zip(actual,pts):
  expectedPoint=module.project(p);assert all(abs(x-y)<=.00051 for x,y in zip(a,expectedPoint))
 assert m['features'][name]=={'polygons':len(polys),'rings':len(rings),'vertices':len(pts)}
# Bornholm is not lost among the smaller Danish components.
denmark=next(f for f in data['features'] if f['properties']['name']=='Denmark')
assert any(all(14.5<x<15.4 and 54.8<y<55.5 for x,y in p[0]) for p in module.polygons(denmark))
assert all(abs(a-b)<1e-9 for a,b in zip(module.project([18,60]),(227.5,377.6)))
for slug,counts in {'svalbard':(9,576),'jan-mayen':(1,12),'greenland':(17,2240),'faroe-islands':(5,63)}.items():
 image=ET.parse(ROOT/('frontend/assets/nordic-'+slug+'.svg')).getroot();p=image.find('s:path',ns);assert p is not None
 assert m['insets'][slug]['polygons']==counts[0] and m['insets'][slug]['vertices']==counts[1]
 assert p.attrib['d'].count('M')==m['insets'][slug]['rings']
 assert len(re.findall(r'(-?[\d.]+),(-?[\d.]+)',p.attrib['d']))==counts[1]
 assert m['insets'][slug]['independentScale']
html=(ROOT/'index.html').read_text();assert html.index('id="nordic-context"')<html.index('<path class="land"')
image=re.search(r'<image id="nordic-context"[^>]+>',html).group(0)
for attr in ['aria-hidden="true"','focusable="false"','pointer-events="none"']:assert attr in image
assert '<svg id="map" viewBox="0 0 440 680"' in html
assert 'Map extent &amp; islands' in html and 'different scales' in html and 'not legal boundaries' in html
assert '#nordic-context{pointer-events:none;' in (ROOT/'frontend/styles/styles.css').read_text()
# Pinned pre-feature hashes: regeneration cannot silently legitimize changed Sweden geometry.
BASELINE_HASHES = {'frontend/assets/sweden-terrain.svg': 'c94d52a67e5cc70ac645218b1da91c99970599f3f93b5794b148c03261450271', 'frontend/data/provinces.js': '31daec0e7dbacc7adb15653e872ef52748adb808833a685a95e037ecd61e8f09', 'frontend/data/provinces.json': '28334ef38eab6eec56e3b9403e7bf8a0ddd381b271c7fbeae67e5a1708ba25d1', 'frontend/data/cities.js': 'd5218fe6abc9d576b6fad68e89e030abd60af0a8e2283a8f458af1b5641fe4c8'}
for file,expectedHash in BASELINE_HASHES.items():assert hashlib.sha256((ROOT/file).read_bytes()).hexdigest()==expectedHash,file
print('PASS FR-42: all selected source rings/vertices, Bornholm/Åland and outlying island views retained; established projection, unchanged Sweden geography, background layering/semantics. Static checks only.')
