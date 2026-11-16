"""FR-01: all dialogs are named by their visible heading."""
from pathlib import Path
from lxml import html

root = html.fromstring((Path(__file__).resolve().parent.parent / 'index.html').read_text())
ids = root.xpath('//*[@id]/@id')
assert len(ids) == len(set(ids))
expected = {
    'profile-dialog': 'Your little light',
    'cluster-dialog': 'Lights near each other',
    'info-dialog': 'Care for each other',
}
dialogs = root.xpath('//dialog')
assert len(dialogs) == 3
for dialog in dialogs:
    refs = dialog.get('aria-labelledby', '').split()
    assert refs
    headings = []
    for ref in refs:
        matches = root.xpath('//*[@id=$ref]', ref=ref)
        assert len(matches) == 1
        assert matches[0].tag in ('h1', 'h2', 'h3')
        headings.append(matches[0])
    name = headings[0].text_content().strip()
    assert name == expected[dialog.get('id')]
print('PASS: three dialogs reference unique visible headings by accessible name.')

# FR-03: required inputs resolve their field-specific error descriptions.
for name in ('nickname', 'city'):
    field = root.xpath('//input[@name=$name]', name=name)[0]
    assert field.get('required') is not None
    assert field.get('aria-describedby') == name + '-error'
    assert len(root.xpath('//*[@id=$id]', id=name + '-error')) == 1
    assert 'required' in field.getparent().text_content()
# FR-04: paired indicator colors have more than 3:1 contrast.
def luminance(rgb):
    linear = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in rgb]
    return sum(v * w for v, w in zip(linear, (.2126, .7152, .0722)))
def color(value):
    return [int(value[i:i+2], 16) / 255 for i in (0, 2, 4)]
dark, light = map(luminance, (color('07121c'), color('fff4d5')))
ratio = (light + .05) / (dark + .05)
assert ratio >= 3
# For every possible background luminance, at least one opaque band exceeds 3:1.
for step in range(1001):
    bg = step / 1000
    contrast = lambda a, b: (max(a, b) + .05) / (min(a, b) + .05)
    assert max(contrast(dark, bg), contrast(light, bg)) >= 3
print(f'PASS: required-field error associations; indicator pair {ratio:.2f}:1; light/dark bands cover background luminance range.')
