# Repository organization — FR-31

| Location | Purpose |
|---|---|
| index.html, signin.html | Stable static entry URLs. |
| frontend/ | Browser code, data, styles, assets and public configuration. |
| backend/ | Deferred Supabase SQL integration and database enforcement fixtures; not an active service. |
| tests/ | Unit, browser and static validation; SQL role tests stay with backend/supabase/. |
| scripts/ | Operational requirement/preflight checks. |
| docs/requirements/ | Golden behavior, cases and traceability. |
| docs/tracking/ | FR status and detailed feature/defect records. |
| docs/standards/ | WCAG/architecture/UX audit and per-point text records. |
| docs/lessons/ | Delivery mistakes and prevention. |
| docs/design/ | Current architecture/design navigation. |
| docs/archive/ | Preserved earlier designs. |
| docs/licenses/ | Attribution and data licenses. |
| agent/ | Repository memory and workflow; root AGENTS.md points here. |
| ux/ | Dedicated UX/portfolio workspace; evidence must distinguish completed/proposed/unmeasured work. |

The rename fixes Agent/leason_learn/requirement casing and spelling while keeping one authority for each responsibility. [organization-map.json](organization-map.json) records exact old-to-new file paths. Current links, imports, static assets, test references and workflow paths move together. Historical source/run SHAs and provenance remain historical facts.

No runtime behavior, visual design or account authorization is intentionally changed. Both root entry URLs are retained; frontend and backend are separated by execution responsibility, not by pretending a browser SDK is a backend. Backend activation is deferred under the user's current local-only scope.
