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
- [JS Proposal: Auto Wire](https://gist.github.com/nin-jin/6b9765fb9d0d50c2e1d37689008f5357)

## High level API

### Decorators

- [$mol_wire_mem](./mem) - reactive memoizing property decorator
- [$mol_wire_field](./field) - reactive memoizing field decorator
- [$mol_wire_method](./method) - method decorator which run inside fiber

### Proxies

- [$mol_wire_sync](./sync) - converts async API to sync
- [$mol_wire_async](./async) - converts sync API to async

### Functions

- [$mol_wire_probe](./probe) - run code without state changes
- [$mol_wire_solid](./solid) - make current fiber immortal

## Structures

- [$mol_wire_set](./set) - reactive Set
- [$mol_wire_dom](./dom) - reactive DOM

## Low level API

### Pub/Sub

- [$mol_wire_pub](./pub) - tiny publisher
- [$mol_wire_sub](./sub) - generic subscriber interface
- [$mol_wire_pub_sub](./pub/sub) - subscriber with retranslation support
- `$mol_wire_auto` - current tracking subscriber

### Reactivity

- [$mol_wire_fiber](./fiber) - pausable task with sync API
- [$mol_wire_cursor](./cursor) - subscription statuses

## NPM Bundles

### [mol_wire_lib](./lib)

Lib with all production ready $mol_wire modules.

```sh
npm install mol_wire_lib
```

[![](https://badgen.net/bundlephobia/minzip/mol_wire_lib)](https://bundlephobia.com/package/mol_wire_lib)

```ts
import {
	$mol_wire_mem as mem,
	$mol_wire_method as action,
} from 'mol_wire_lib'

class User {
	@mem(0) age( next = 0 ) { return next }
	@mem(1) finger_exists( id: string, next = true ) { return next }
	@action finger_cut( id: string ) { this.finger_exists( id, false ) }
}
```

```js
const {
	$mol_wire_mem: mem,
	$mol_wire_method: actionn,
} = require( 'mol_wire_lib' )

class User {
	age( next = 0 ) { return next }
	finger_exists( id: string, next = true ) { return next }
	finger_cut( id: string ) { this.finger_exists( id, false ) }
}

mem(0)( User.prototype, 'age' )
mem(1)( User.prototype, 'finger_exists' )
action( User.prototype, 'finger_cut' )
```

### [mol_wire_pub](./pub)

Tiny lib to making any state observabe for other $mol_wire based libs.

```sh
npm install mol_wire_pub
```

[![](https://badgen.net/bundlephobia/minzip/mol_wire_pub)](https://bundlephobia.com/package/mol_wire_pub)

```ts
import { $mol_wire_pub as Publisher } from 'mol_wire_pub'

let counter = 0
const pub = new Publisher

export function state() {
	pub.track_promote()
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

### [mol_wire_dom](./dom)

Lib to make real DOM reactive.

```sh
npm install mol_wire_domm
```

[![](https://badgen.net/bundlephobia/minzip/mol_wire_dom)](https://bundlephobia.com/package/mol_wire_dom)

```ts
import { $mol_wire_dom as reactivate } from 'mol_wire_dom'

reactivate( document.body )
```

## Close alternatives

- [MobX](https://mobx.js.org/)
- [CellX](https://github.com/Riim/cellx)

### [Architectural comparison](https://github.com/nin-jin/slides/tree/master/reactivity#reactive-libraries)
