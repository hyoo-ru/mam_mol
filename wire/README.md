# $mol_wire

Auto wiring modules.

## High level API

### Decorators

- [$mol_wire_mem](./mem) - reactive memoizing property decorator
- [$mol_wire_method](./method) - method decorator which run inside fiber

### Proxies

- [$mol_wire_sync](./sync) - converts async API to sync
- [$mol_wire_async](./async) - converts sync API to async

### Pub/Sub

- [mol_wire_pub](./pub) - tiny publisher
- [mol_wire_sub](./sub) - generic subscriber interface
- [mol_wire_pub_sub](./pub/sub) - subscriber with retranslation support

## Examples

- [mol_wire_set](./set) - reactive Set

## Low level API

- [$mol_wire_fiber](./fiber) - pausable task with sync API
- [$mol_wire_cache](./cache) - allow direct access to reactive cache
- [$mol_wire_cursor](./cursor) - subscription statuses

## Bundles

- [mol_wire_lib](./lib) - NPM lib with all this mudules
