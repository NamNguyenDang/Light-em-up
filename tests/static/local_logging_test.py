"""Local logging schema tests: no raw request/credential fields reach event files."""
import importlib.util
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('local_logging', ROOT / 'scripts/serve-local.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class LocalLoggingTests(unittest.TestCase):
    def sample(self):
        state = {'build': 'FR-37-v1', 'mode': 'USERDEBUG', 'origin': 'http://127.0.0.1:8000', 'page': 'signin.html'}
        for key, values in module.ENUMS.items():
            state[key] = 'signedIn' if key in {'session', 'uiAuth', 'signinPhase'} else next(iter(values))
        state.update({key: True for key in module.BOOLEANS})
        return {'event': 'signin.phase', 'state': state}

    def test_schema_reconstruction_discards_private_extras(self):
        value = self.sample()
        value['password'] = 'NEVER_WRITE'
        value['state'].update({'token': 'NEVER_WRITE', 'nickname': 'NEVER_WRITE', 'message': 'NEVER_WRITE', 'error': 'NEVER_WRITE'})
        result = module.safe_event(value, 'http://127.0.0.1:8000')
        self.assertNotIn('NEVER_WRITE', str(result))
        self.assertEqual(result['event'], 'signin.phase')
        self.assertEqual(result['state']['session'], 'signedIn')

    def test_invalid_mode_origin_page_enum_and_boolean_rejected(self):
        for key, invalid in [('mode', 'USER'), ('origin', 'https://example.invalid'), ('page', '?private=NEVER_WRITE'), ('session', 'NEVER_WRITE'), ('headerIdentityShown', 'NEVER_WRITE')]:
            with self.subTest(key=key):
                value = self.sample()
                value['state'][key] = invalid
                with self.assertRaises(ValueError):
                    module.safe_event(value, 'http://127.0.0.1:8000')

    def test_unknown_event_rejected(self):
        value = self.sample()
        value['event'] = 'NEVER_WRITE'
        with self.assertRaises(ValueError):
            module.safe_event(value, 'http://127.0.0.1:8000')


if __name__ == '__main__':
    unittest.main()
