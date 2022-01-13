# $mol_wire

Auto wiring modules. It gives ability to:

- Make any state observable using only 1.5KB lib. [$hyoo_crowd](https://github.com/hyoo-ru/crowd.hyoo.ru) as example.
- Automatic dynamic track runtime property value dependencies.
- Memoize calculations with automatic revalidationn.
- Convert sync API to async and vice versa.
- Manage resources automatically with predictable deconstruction time.
- Optimize execution of tasks.
- Dramatically reduce source code size and increase reliability by implementing reactive architecture.

## Articles about

- [Main Aspects of Reactivity](https://github.com/nin-jin/slides/tree/master/reactivity#readme)
- [JS Proposal: Auto Wire](https://gist.github.com/nin-jin/6b9765fb9d0d50c2e1d37689008f5357)

## High level API

### Decorators

- [$mol_wire_mem](./mem) - reactive memoizing property decorator
- [$mol_wire_method](./method) - method decorator which run inside fiber

### Proxies

- [$mol_wire_sync](./sync) - converts async API to sync
- [$mol_wire_async](./async) - converts sync API to async

## Functions

- [$mol_wire_probe](./probe) - run code without state changes
- [$mol_wire_solid](./solid) - make current fiber immortal

### Pub/Sub

- [$mol_wire_pub](./pub) - tiny publisher
- [$mol_wire_sub](./sub) - generic subscriber interface
- [$mol_wire_pub_sub](./pub/sub) - subscriber with retranslation support
- `$mol_wire_auto` - current tracking subscriber

## Examples

- [$mol_wire_set](./set) - reactive Set

## Low level API

- [$mol_wire_fiber](./fiber) - pausable task with sync API
- [$mol_wire_cursor](./cursor) - subscription statuses

## Bundles

- [mol_wire_lib](./lib) - NPM lib with all this mudules
- [mol_wire_pub](./pub) - tiny lib to making any state observabe

## Close alternatives

- [MobX](https://mobx.js.org/)
- [CellX](https://github.com/Riim/cellx)

### [Architectural comparison](https://github.com/nin-jin/slides/tree/master/reactivity#reactive-libraries)
