"""Validate requirement/case/test links, never claim behavioral acceptance."""
from pathlib import Path
import json
import re

root = Path(__file__).resolve().parent.parent
folder = root / 'requirement'
index = json.loads((folder / 'traceability.json').read_text())
assert index['schema_version'] == 1
requirement = (folder / index['golden_file']).read_text()
cases = (folder / index['case_file']).read_text()
acceptance_list = re.findall(r'\*\*((?:FR-\d+|MAP)-AC\d+)\*\*', requirement)
case_list = re.findall(r'^### (TC-[A-Z0-9-]+)\s*$', cases, re.M)
assert len(acceptance_list) == len(set(acceptance_list)), 'Duplicate golden acceptance ID'
assert len(case_list) == len(set(case_list)), 'Duplicate test-case ID'
backlog = set(re.findall(r'^\| (FR-\d+) \|', (root / 'docs/ACCESSIBILITY_FEATURE_REQUESTS.md').read_text(), re.M))
entries = index['requirements']
frs = [row['fr'] for row in entries]
assert len(frs) == len(set(frs)), 'Duplicate traceability entry'
assert {fr for fr in frs if fr.startswith('FR-')} == backlog, 'Every backlog FR needs a golden requirement and test case'
linked_acceptance, linked_cases = set(), set()
for row in entries:
    assert row['acceptance_ids'] and row['case_ids'] and row['evidence_scope'], row['fr']
    assert row['automated_tests'], f"Missing execution/review references: {row['fr']}"
    for identifier in row['acceptance_ids']:
        assert identifier in acceptance_list, f'Unknown acceptance criterion: {identifier}'
        assert identifier not in linked_acceptance, f'Multiply indexed criterion: {identifier}'
        linked_acceptance.add(identifier)
    covered = set()
    for identifier in row['case_ids']:
        assert identifier in case_list, f'Unknown case: {identifier}'
        assert identifier not in linked_cases, f'Multiply indexed case: {identifier}'
        linked_cases.add(identifier)
        block = re.split(r'^### ', cases.split('### ' + identifier + '\n', 1)[1], maxsplit=1, flags=re.M)[0]
        covers = re.search(r'^Covers: (.+)$', block, re.M)
        assert covers, f'Missing case-to-criterion reference: {identifier}'
        actual = set(re.findall(r'(?:FR-\d+|MAP)-AC\d+', covers.group(1)))
        assert actual and actual <= set(row['acceptance_ids']), f'Wrong case mapping: {identifier}'
        covered.update(actual)
        assert all(field in block for field in ['Preconditions:', 'Actions', 'Expected:']), f'Incomplete scenario: {identifier}'
    assert covered == set(row['acceptance_ids']), f'Uncovered criterion: {row["fr"]}'
    for reference in row['automated_tests']:
        path = (root / reference).resolve()
        assert path.is_relative_to(root) and path.is_file(), f'Missing/unsafe execution reference: {reference}'
assert linked_acceptance == set(acceptance_list), 'Unindexed golden acceptance criterion'
assert linked_cases == set(case_list), 'Unindexed test case'
for reference in ['Agent/memory.md', 'Agent/skill.md', 'leason_learn/README.md']:
    assert (root / reference).is_file(), reference
print(f'PASS: {len(backlog)} FRs, {len(acceptance_list)} criteria and {len(case_list)} cases have valid traceability/execution links.')
print('STRUCTURAL CHECK ONLY: inspect behavioral results, evidence scope and manual/live gaps before claiming acceptance.')
