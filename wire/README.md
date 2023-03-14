# $mol_wire

Auto wiring modules. It gives ability to:

- Make any state observable using only 1.5KB lib. [$hyoo_crowd](https://github.com/hyoo-ru/crowd.hyoo.ru) as example.
- Automatic dynamic track runtime value dependencies and optimize task execution order.
- Memoize calculations with automatic revalidation. Yes, it completely solves [the first of hard problem in computer science](https://www.karlton.org/2017/12/naming-things-hard/).
- Convert sync API to async and vice versa. Yes, it's a black magic of idempotence.
- Manage resources automatically with predictable deconstruction moment. Yes, we don't rely on garbage collector.
- Dramatically reduce source code size and increase reliability by implementing reactive architecture.

## Articles about

- [Main Aspects of Reactivity](https://github.com/nin-jin/slides/tree/master/reactivity#readme)
- [Designing an ideal reactivity system](https://github.com/nin-jin/HabHub/issues/48)
- [JS Proposal: Auto Wire](https://gist.github.com/nin-jin/6b9765fb9d0d50c2e1d37689008f5357)

## NPM Bundles

### [mol_wire_lib](https://github.com/hyoo-ru/mam_mol/tree/master/wire/lib)

Lib with all production ready $mol_wire modules.

```sh
npm install mol_wire_lib
```

7KB [![](https://badgen.net/bundlephobia/minzip/mol_wire_lib)](https://bundlephobia.com/package/mol_wire_lib)

```ts
import {
	$mol_wire_solo as solo,
	$mol_wire_plex as plex,
	$mol_wire_method as task,
} from 'mol_wire_lib'

class User {
	@solo age( next = 0 ) { return next }
	@plex finger_exists( id: string, next = true ) { return next }
	@task finger_cut( id: string ) { this.finger_exists( id, false ) }
}
```

```js
const {
	$mol_wire_solo as solo,
	$mol_wire_plex as plex,
	$mol_wire_method as task,
} = require( 'mol_wire_lib' )

class User {
	age( next = 0 ) { return next }
	finger_exists( id: string, next = true ) { return next }
	finger_cut( id: string ) { this.finger_exists( id, false ) }
}

solo( User.prototype, 'age' )
plex( User.prototype, 'finger_exists' )
task( User.prototype, 'finger_cut' )
```

### [mol_wire_pub](https://github.com/hyoo-ru/mam_mol/tree/master/wire/pub)

Tiny lib to making any state observabe for other $mol_wire based libs.

```sh
npm install mol_wire_pub
```

1.5KB [![](https://badgen.net/bundlephobia/minzip/mol_wire_pub)](https://bundlephobia.com/package/mol_wire_pub)

```ts
import { $mol_wire_pub as Publisher } from 'mol_wire_pub'

let counter = 0
const pub = new Publisher

export function state() {
	pub.promote()
	return counter
}

export function increase() {
	++ counter
	pub.emit()
}

export function decrease() {
	-- counter
	pub.emit()
}
```

### [mol_wire_dom](https://github.com/hyoo-ru/mam_mol/tree/master/wire/dom)

Lib to make real DOM reactive.

```sh
npm install mol_wire_domm
```

7.5KB [![](https://badgen.net/bundlephobia/minzip/mol_wire_dom)](https://bundlephobia.com/package/mol_wire_dom)

```ts
import { $mol_wire_dom as reactivate } from 'mol_wire_dom'

reactivate( document.body )
```

## High level API

### Decorators

- [$mol_wire_solo](https://github.com/hyoo-ru/mam_mol/tree/master/wire/solo) - reactive memoizing solo property decorator
- [$mol_wire_plex](https://github.com/hyoo-ru/mam_mol/tree/master/wire/plex) - reactive memoizing multiplexed property decorator
- [$mol_wire_field](https://github.com/hyoo-ru/mam_mol/tree/master/wire/field) - reactive memoizing field decorator
- [$mol_wire_method](https://github.com/hyoo-ru/mam_mol/tree/master/wire/method) - method decorator which run inside fiber

### Proxies

- [$mol_wire_sync](https://github.com/hyoo-ru/mam_mol/tree/master/wire/sync) - converts async API to sync
- [$mol_wire_async](https://github.com/hyoo-ru/mam_mol/tree/master/wire/async) - converts sync API to async

### Functions

- [$mol_wire_easing](https://github.com/hyoo-ru/mam_mol/tree/master/wire/easing) - transition atom value
- [$mol_wire_probe](https://github.com/hyoo-ru/mam_mol/tree/master/wire/probe) - run code without state changes
- [$mol_wire_solid](https://github.com/hyoo-ru/mam_mol/tree/master/wire/solid) - make current fiber immortal

## Structures

- [$mol_wire_set](https://github.com/hyoo-ru/mam_mol/tree/master/wire/set) - reactive Set
- [$mol_wire_dict](https://github.com/hyoo-ru/mam_mol/tree/master/wire/dict) - reactive Dictionary
- [$mol_wire_dom](https://github.com/hyoo-ru/mam_mol/tree/master/wire/dom) - reactive DOM


## Low level API

### Debug

- [$mol_wire_log](https://github.com/hyoo-ru/mam_mol/tree/master/wire/log) - state changes logger

### Pub/Sub

- [$mol_wire_pub](https://github.com/hyoo-ru/mam_mol/tree/master/wire/pub) - tiny publisher
- [$mol_wire_sub](https://github.com/hyoo-ru/mam_mol/tree/master/wire/sub) - generic subscriber interface
- [$mol_wire_pub_sub](https://github.com/hyoo-ru/mam_mol/tree/master/wire/pub/sub) - subscriber with retranslation support
- `$mol_wire_auto` - current tracking subscriber

### Reactivity

- [$mol_wire_fiber](https://github.com/hyoo-ru/mam_mol/tree/master/wire/fiber) - abstract pausable task with (a)sync API
- [$mol_wire_task](https://github.com/hyoo-ru/mam_mol/tree/master/wire/task) - one-shot fiber
- [$mol_wire_atom](https://github.com/hyoo-ru/mam_mol/tree/master/wire/atom) - repeatable fiber
- [$mol_wire_cursor](https://github.com/hyoo-ru/mam_mol/tree/master/wire/cursor) - subscription statuses


## Close alternatives

- [MobX](https://mobx.js.org/)
- [CellX](https://github.com/Riim/cellx)

### [Architectural comparison](https://github.com/nin-jin/slides/tree/master/reactivity#reactive-libraries)
