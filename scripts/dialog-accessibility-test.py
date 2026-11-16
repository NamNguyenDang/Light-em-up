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
