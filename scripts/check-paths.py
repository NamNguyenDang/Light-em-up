"""Catch broken local documentation, entry assets and CSS URLs after a move."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re

root = Path(__file__).resolve().parent.parent
checked = 0

def check(source, target):
    global checked
    target = target.strip().split(' "', 1)[0]
    url = urlsplit(target)
    if url.scheme or url.netloc or not url.path:
        return
    path = (root / unquote(url.path).lstrip('/')) if url.path.startswith('/') else source.parent / unquote(url.path)
    assert path.exists(), f'Missing local target: {source.relative_to(root)} -> {target}'
    checked += 1

class Assets(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in ('src', 'href', 'xlink:href') and value:
                check(self.source, value)

for source in [root / 'index.html', root / 'signin.html']:
    parser = Assets()
    parser.source = source
    parser.feed(source.read_text())
for source in root.rglob('*.md'):
    if any(part in ('node_modules', 'test-results', '.git') for part in source.relative_to(root).parts):
        continue
    for target in re.findall(r'\]\(([^)]+)\)', source.read_text()):
        check(source, target)
for source in (root / 'frontend/styles').glob('*.css'):
    for _, target in re.findall(r'url\(([\'\"]?)([^)\'\"]+)\1\)', source.read_text()):
        check(source, target)
for old, new in json.loads((root / 'docs/organization-map.json').read_text()).items():
    assert (root / new).is_file(), f'Missing migrated file: {new}'
    assert not (root / old).exists(), f'Obsolete duplicate still exists: {old}'
print(f'PASS: {checked} local entry/asset/CSS/document links and all migration targets exist; no obsolete source copies.')
print('Path validation does not replace browser rendering, focus or accessibility checks.')
