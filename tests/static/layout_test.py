"""Check real HTML containment; simulated ID-only DOM tests cannot detect this regression."""
from pathlib import Path
from lxml import html
root = html.fromstring((Path(__file__).resolve().parents[2] / 'index.html').read_text())
layout = root.xpath('//div[contains(concat(" ", normalize-space(@class), " "), " layout ")]')
assert len(layout) == 1
children = list(layout[0])
assert len(children) == 2, 'Map and welcome panel must be the only grid children'
assert children[0].tag == 'section' and children[0].get('class') == 'map-panel'
assert children[1].tag == 'aside' and children[1].get('class') == 'welcome-panel'
assert children[1].xpath('.//div[@class="city-search"]//input[@id="city-search"]')
assert children[0].xpath('.//svg[@id="map"]')
assert root.xpath('//section[@id="community"]/section[@class="stories-section"]'), 'Stories must follow the columns'
assert root.xpath('//main/section[@id="dashboard"]'), 'Dashboard must stay outside the community view'
print('PASS: parsed HTML keeps map and welcome as two sibling columns, search inside welcome, stories and dashboard correctly contained.')

assert root.xpath('//lineargradient[@id="province-land-light"]'), 'Land illumination must reference a defined SVG gradient'
assert len(root.xpath('//section[@class="light-scale"]//li')) == 0

welcome=children[1]
assert welcome[0].get('class')=='join-card'
assert welcome[1].get('id')=='featured-story', 'Own story must immediately follow join controls'

assert root.xpath("//span[@class='brand-candle']//svg//image[@href='frontend/assets/candle-color.png']")
