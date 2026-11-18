# Current architecture and local scope

The active product is a static browser frontend. Root entry HTML loads scripts/styles/data/assets from frontend/. Local stories use browser storage; no backend is required for a local candle. The same browser/origin is the persistence boundary. Storage failure has an explicit session-only result.

The frontend retains optional account/encouragement modules and an empty public provider configuration. They do not create a hosted service. backend/supabase contains deferred schema and policy tests; CI's synthetic SQL/auth tests are not proof of deployment. No custom BFF server is present. Browser adapters cannot authorize users independently of a future backend's rules.

Requirements are under docs/requirements; executable verification under tests; working rules under agent. The ux workspace captures decisions and evidence separately from code and historical designs. Root page URLs are intentionally retained during this reorganization to avoid changing static hosting and auth-return destinations.

Online behavior remains an explicitly deferred integration with unresolved real-service acceptance, not an enabled feature or a resolved DR. The user's low-cost/local-only direction does not authorize cloud activation or paid services.
