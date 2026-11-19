# Local browser event logs

Run `python3 scripts/serve-local.py` from the repository and open the USERDEBUG URL printed by the server. Redacted browser events are appended here as `browser-events-YYYY-MM-DD.jsonl` when USERDEBUG is active. USER disables application logging. Real event files are excluded from git.

Entries show sign-in phase, verified-session/UI state, whether the header matches the verified identity, and candle readiness. They never contain passwords, tokens, account identifiers/nicknames, stories, messages, URL query values or raw exceptions. Missing/blocked logging never authorizes a user or changes login results.

The server is a loopback-only static development server plus a log sink, not an online authentication backend. Accounts/candles remain browser-local. On a different static server the state panel still works, but files are not written here unless that server implements the local logging endpoint. Startup uses Python's standard library only; no cloud service or install is required.


| Page/event stage | Expected completed output |
|---|---|
| signin.html, signin.phase | session/uiAuth/signinPhase are signedIn; the header-match flag can still be false on this page |
| index.html after restore | session/uiAuth are signedIn, headerIdentityShown and ownStoryReady are true |

The page field distinguishes the credential-page success from the landing-page restoration. A later checking state is normal while a new document verifies its session; inspect the subsequent completed state. File timestamps are server UTC arrival times.
