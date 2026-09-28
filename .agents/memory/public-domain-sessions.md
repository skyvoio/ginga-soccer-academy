---
name: Public-domain sessions
description: Browser session persistence when the custom domain and API are served from different sites.
---

Treat login success and session persistence as separate checks on the public website. The GitHub Pages custom domain calls a Replit-hosted API on another site; CORS and secure SameSite=None cookies alone may not overcome browsers that block third-party cookies.

**Why:** Production logs showed successful login responses followed immediately by unauthenticated user checks. That pattern suggests the browser did not retain or send the session cookie, but the precise browser-side cause still needs confirmation.

**How to apply:** Verify signup/login and the follow-up user request in a real browser on the public domain. If the cookie is blocked, provide a same-site API host or proxy rather than treating a successful password check or configured secrets as end-to-end authentication success.