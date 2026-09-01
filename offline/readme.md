# $mol_offline

Installs service worker proxy, which caches all requests and respond from cache on http errors.

# How to use

**Make manifest** like [this one](../app/docs/manifest.json).

**Include $mol_offline_install** by adding `include \/mol/offline/install` into your `*.meta.tree`. Or *Run $mol_offline* manually.

**Enable HTTPS on your web server**.
