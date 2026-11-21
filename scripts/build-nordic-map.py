#!/usr/bin/env python3
"""Project all selected Natural Earth rings; do not simplify or filter small islands."""
from pathlib import Path
from html import escape
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'frontend/data/nordic-context.geojson'
ASSETS=ROOT/'frontend/assets'

def polygons(feature):
    g=feature['geometry']
    return [g['coordinates']] if g['type']=='Polygon' else g['coordinates']

def project(point):
    lon,lat=point[:2]
    return 23*lon-186.5,2657.6-38*lat

def path(polys,transform=project):
    result=[]
    for poly in polys:
        for ring in poly:
            points=[transform(p) for p in ring]
            result.append('M'+' L'.join(f'{x:.3f},{y:.3f}' for x,y in points)+' Z')
    return ' '.join(result)

def sha(file):return hashlib.sha256(file.read_bytes()).hexdigest()

def build():
    data=json.loads(DATA.read_text())
    features={f['properties']['name']:f for f in data['features']}
    manifest={'source':data['source'],'dataSha256':sha(DATA),'projection':'x=23*lon-186.5; y=2657.6-38*lat','mainViewBox':[0,0,440,680], 'features':{},'insets':{},'unchangedSweden':{}}
    svg=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 680" role="img" aria-labelledby="context-title"><title id="context-title">Generalized Nordic background land. Regional crop, not complete territorial coverage.</title><g fill="#0b2733" stroke="#28434e" stroke-width="0.35" stroke-linejoin="round" fill-rule="evenodd">']
    for name,feature in features.items():
        ps=polygons(feature)
        manifest['features'][name]={'polygons':len(ps),'rings':sum(len(p) for p in ps),'vertices':sum(len(r) for p in ps for r in p)}
        svg.append(f'<path data-feature="{escape(name)}" d="{path(ps)}"/>')
    svg.append('</g></svg>')
    (ASSETS/'nordic-context.svg').write_text(''.join(svg)+'\n')
    norway=polygons(features['Norway'])
    insets={
        'svalbard':[p for p in norway if min(x[1] for x in p[0])>74],
        'jan-mayen':[p for p in norway if max(x[0] for x in p[0])<0],
        'greenland':polygons(features['Greenland']),
        'faroe-islands':polygons(features['Faroe Islands'])
    }
    labels={'svalbard':'Svalbard','jan-mayen':'Jan Mayen','greenland':'Greenland','faroe-islands':'Faroe Islands'}
    for slug,ps in insets.items():
        assert ps,slug
        points=[project(pt) for poly in ps for ring in poly for pt in ring]
        loX=min(p[0] for p in points);hiX=max(p[0] for p in points);loY=min(p[1] for p in points);hiY=max(p[1] for p in points)
        scale=min(212/(hiX-loX),132/(hiY-loY));ox=(240-(hiX-loX)*scale)/2;oy=(160-(hiY-loY)*scale)/2
        def locate(point):
            x,y=project(point)
            return ox+(x-loX)*scale,oy+(y-loY)*scale
        title=escape(labels[slug]+' geographic view; independent scale')
        out=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" role="img"><title>{title}</title><rect width="240" height="160" rx="10" fill="#071923"/><path fill="#163441" stroke="#6a8791" stroke-width="0.65" fill-rule="evenodd" d="{path(ps,locate)}"/></svg>\n'
        (ASSETS/('nordic-'+slug+'.svg')).write_text(out)
        manifest['insets'][slug]={'polygons':len(ps),'rings':sum(len(p) for p in ps),'vertices':sum(len(r) for p in ps for r in p),'independentScale':True}
    for filename in ['frontend/assets/sweden-terrain.svg','frontend/data/provinces.js','frontend/data/provinces.json','frontend/data/cities.js','frontend/src/community/map-layout.js']:
        manifest['unchangedSweden'][filename]=sha(ROOT/filename)
    (ROOT/'frontend/data/nordic-context-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    return manifest

if __name__=='__main__':
    m=build();print('Projected all rings:',m['features']);print('Island views:',m['insets'])
