---
name: GitHub Pages npm installs
description: Keep GitHub Actions dependency installs compatible with lockfiles generated inside Replit.
---

GitHub Actions cannot resolve Replit's internal package-firewall hosts in `package-lock.json`. Before `npm ci`, rewrite those URLs in the CI checkout only: for `package-firewall.replit.*` hosts, strip the leading `/npm/` and use the remainder under `https://registry.npmjs.org/`. Keep the committed lockfile unchanged when another task may be editing dependencies.

**Why:** GitHub runners are outside Replit's network, and npm's registry-host replacement can preserve `/npm/` as part of the public tarball path, producing 404s.

**How to apply:** Normalize every internal host variant immediately before `npm ci`, then verify with a clean install. Preserve the lockfile's versions and integrity hashes.
