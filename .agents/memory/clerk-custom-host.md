---
name: Clerk custom-host setup
description: Host-aware Clerk configuration required by this app's Replit preview and published domains.
---

Use Clerk's host-aware publishable-key resolution in both the browser and Express middleware, and keep the Clerk proxy mounted before body parsers. The browser and server must resolve the same key for the incoming host.

**Why:** A direct or mismatched key configuration caused Clerk's browser session to enter an infinite redirect loop on the Replit preview domain.

**How to apply:** When changing auth wiring, preserve `publishableKeyFromHost(...)`, `getClerkProxyHost(...)`, and the proxy-before-parser ordering.