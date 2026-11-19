#!/usr/bin/env python3
"""Loopback-only static app server and redacted USERDEBUG JSONL sink. No auth backend."""
import argparse
import hashlib
import json
import re
import threading
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
EVENTS = {'mode.changed', 'session.change', 'signin.phase', 'application.transition', 'candle.entry', 'story.load', 'view.error', 'manual.refresh'}
ENUMS = {
    'session': {'checking', 'signedOut', 'signedIn', 'signingIn', 'signingOut', 'checkFailed', 'notConfigured', 'unknown'},
    'uiAuth': {'checking', 'signedOut', 'signedIn', 'signingIn', 'signingOut', 'checkFailed', 'notConfigured', 'unknown'},
    'view': {'community', 'dashboard', 'signIn', 'unknown'},
    'dialog': {'none', 'profile', 'info', 'cluster', 'encouragement', 'unknown'},
    'story': {'none', 'editing', 'saving', 'saved', 'saveFailed', 'unknown'},
    'signinPhase': {'checking', 'ready', 'signingIn', 'signedIn', 'failed', 'checkFailed', 'unavailable', 'confirmation', 'redirecting', 'notApplicable', 'unknown'},
    'fileLogging': {'off', 'checking', 'connected', 'unavailable', 'unknown'},
}
BOOLEANS = {'hasVerifiedIdentity', 'ownStoryReady', 'hasOwnStoryOwner', 'candleWaiting', 'candleIntent', 'headerIdentityShown'}
LOCK = threading.Lock()


def safe_event(payload, origin):
    if not isinstance(payload, dict) or payload.get('event') not in EVENTS:
        raise ValueError('Unsupported event')
    raw = payload.get('state')
    if not isinstance(raw, dict) or raw.get('mode') != 'USERDEBUG' or raw.get('origin') != origin:
        raise ValueError('Invalid diagnostic state')
    build = raw.get('build', '')
    if not isinstance(build, str) or not re.fullmatch(r'FR-\d+-v\d+', build):
        raise ValueError('Invalid build')
    state = {'build': build, 'mode': 'USERDEBUG', 'origin': origin, 'page': raw.get('page')}
    if state['page'] not in {'index.html', 'signin.html', 'other'}:
        raise ValueError('Invalid page')
    for key, allowed in ENUMS.items():
        value = raw.get(key, 'unknown')
        if value not in allowed:
            raise ValueError('Invalid state enum')
        state[key] = value
    for key in BOOLEANS:
        if not isinstance(raw.get(key), bool):
            raise ValueError('Invalid state boolean')
        state[key] = raw[key]
    # Only this reconstructed schema reaches disk; arbitrary input fields are discarded.
    return {'at': datetime.now(timezone.utc).isoformat(), 'event': payload['event'], 'state': state}


class LocalHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *args):
        # Default access logs include complete query strings. Do not record them.
        pass

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def json_response(self, code, data):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlsplit(self.path).path == '/__local/logging':
            self.json_response(200, {'enabled': True, 'folder': 'logs'})
        elif urlsplit(self.path).path in {'/', '/index.html', '/signin.html'}:
            name = 'signin.html' if urlsplit(self.path).path == '/signin.html' else 'index.html'
            html = (ROOT / name).read_text(encoding='utf8')
            def versioned(match):
                asset = match.group(2)
                digest = hashlib.sha256((ROOT / asset).read_bytes()).hexdigest()[:12]
                return f'{match.group(1)}="{asset}?localBuild={digest}"'
            # Existing browser caches may hold older session scripts. Give each current asset its own URL.
            html = re.sub(r'(src|href)="(frontend/[^"?]+\.(?:js|css))"', versioned, html)
            body = html.encode('utf8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().do_GET()

    def do_POST(self):
        if urlsplit(self.path).path != '/__local/events':
            self.json_response(404, {'error': 'Not found'})
            return
        host = self.headers.get('Host', '')
        if not re.fullmatch(r'(?:127\.0\.0\.1|localhost):\d+', host):
            self.json_response(403, {'error': 'Loopback host required'})
            return
        origin = 'http://' + host
        if self.headers.get('Origin') not in {None, origin}:
            self.json_response(403, {'error': 'Same-origin logging required'})
            return
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if not 0 < size <= 16384:
                raise ValueError('Invalid size')
            entry = safe_event(json.loads(self.rfile.read(size)), origin)
        except (ValueError, TypeError, json.JSONDecodeError):
            self.json_response(400, {'error': 'Invalid diagnostic event'})
            return
        try:
            with LOCK:
                self.server.log_dir.mkdir(parents=True, exist_ok=True)
                filename = self.server.log_dir / ('browser-events-' + datetime.now(timezone.utc).date().isoformat() + '.jsonl')
                with filename.open('a', encoding='utf8') as stream:
                    stream.write(json.dumps(entry, separators=(',', ':')) + '\n')
        except OSError:
            self.json_response(503, {'error': 'Local event file unavailable'})
            return
        self.json_response(200, {'stored': True})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8000)
    parser.add_argument('--log-dir', type=Path, default=ROOT / 'logs')
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), LocalHandler)
    server.log_dir = args.log_dir.resolve()
    print(f'Open http://127.0.0.1:{server.server_port}/index.html?userMode=USERDEBUG', flush=True)
    print('Redacted USERDEBUG events are written to the selected local log folder.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
