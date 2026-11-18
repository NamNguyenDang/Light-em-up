# Frontend — active local browser experience

The browser UI, styles, artwork and data live here. The entry pages remain at repository-root index.html/signin.html to preserve existing URLs and static hosting; no build system is required.

| Folder | Responsibility |
|---|---|
| src/app.js | Existing page orchestration/rendering. |
| src/community/ | Map layout and community browsing. |
| src/candle/ | Candle entry, story draft and personal-card behavior. |
| src/account/ | Optional account/session UI; online activation is deferred. |
| src/encouragement/ | Optional account encouragement/inbox UI. |
| src/services/ | Browser-side data adapter; this is not a backend/BFF. |
| src/shared/ | Shared application-state model. |
| config/ | Public browser configuration; Supabase values remain empty. |
| data/ | City/province catalog and labelled demo data. |
| styles/ | CSS. |
| assets/ | Images, map artwork and browser vendor library/license. |

Serve the repository root with `python3 -m http.server 8000` and open http://localhost:8000/. A local static server serves files; it does not create an online account backend. Local candles stay in this browser/origin, with explicit session-only fallback if storage fails. Do not describe local data as shared or synced.

FR-34: active configuration mode is local. Nickname accounts and one candle per account use IndexedDB/Web Crypto in this browser/site; session tokens stay in sessionStorage. No email or anonymous candle creation is active. Clearing site data removes accounts/candles; no password recovery or cross-device use. Local login is profile separation, not encrypted storage or trusted server authorization. Cross-device encouragement/inbox integration remains deferred.
