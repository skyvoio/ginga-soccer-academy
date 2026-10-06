---
name: Post-merge safety
description: Keep automatic merge reconciliation separate from database schema changes.
---

Automatic post-merge setup must not force-push database schemas.

**Why:** Dependency-only merges must not risk deleting or changing application data; schema changes need deliberate review.

**How to apply:** Install the locked dependencies and check the project during setup. Handle needed schema migrations explicitly rather than restoring an unconditional forced database push.
