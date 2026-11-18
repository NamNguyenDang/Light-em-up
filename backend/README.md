# Backend — deferred online integration

Current approved use is browser-local. No backend server runs as part of the normal app and no cloud service or billing is activated by this folder.

supabase/ contains the optional PostgreSQL schema, role-policy tests and setup notes retained from earlier account work. CI exercises these rules in a disposable PostgreSQL container; that is not a deployed service. The Supabase SDK and account UI execute in the browser and belong under frontend/, not here.

There is no separately deployed Backend for Frontend (BFF). Reconsider that architecture only for a documented need. Online activation, real provider/email delivery, shared persistence and FR-29 acceptance remain deferred/unverified. Keeping this integration does not claim that online accounts work.
