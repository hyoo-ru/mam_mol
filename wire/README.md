# $mol_wire

A reactivity system. It gives ability to:

- Make any state observable using only 1.5KB lib. [$hyoo_crowd](https://github.com/hyoo-ru/crowd.hyoo.ru) as example.
- Automatic dynamic track runtime value dependencies and optimize task execution order.
- Memoize calculations with automatic revalidation. Yes, it completely solves [the first of hard problem in computer science](https://www.karlton.org/2017/12/naming-things-hard/).
- Convert sync API to async and vice versa. Yes, it's a black magic of idempotence.
- Manage resources automatically with predictable deconstruction moment. Yes, we don't rely on garbage collector.
- Dramatically reduce source code size and increase reliability by implementing reactive architecture.

## Articles about

- [Main Aspects of Reactivity](https://page.hyoo.ru/#!=vuypgx_v55bpt)
- [Design of ideal reactivity system](https://page.hyoo.ru/#!=yj0h42_ixzv4p)
- [JS Proposal: Auto Wire](https://gist.github.com/nin-jin/6b9765fb9d0d50c2e1d37689008f5357)

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

## NPM Bundles

### [mol_wire_lib](https://github.com/hyoo-ru/mam_mol/tree/master/wire/lib)

Lib with all production ready $mol_wire modules.

```sh
npm install mol_wire_lib
```

7KB [![](https://badgen.net/bundlephobia/minzip/mol_wire_lib)](https://bundlephobia.com/package/mol_wire_lib)

### TypeScript example:

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

### JavaScript example:

```js
const $ = require( 'mol_wire_lib' )

class User {
	age( next = 0 ) { return next }
	finger_exists( id: string, next = true ) { return next }
	finger_cut( id: string ) { this.finger_exists( id, false ) }
}

$.$mol_wire_solo( User.prototype, 'age' )
$.$mol_wire_plex( User.prototype, 'finger_exists' )
$.$mol_wire_task( User.prototype, 'finger_cut' )
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

## Close alternatives

- [MobX](https://mobx.js.org/)
- [CellX](https://github.com/Riim/cellx)

### [Architectural comparison](https://github.com/nin-jin/slides/tree/master/reactivity#reactive-libraries)


## Core concepts

In `$mol_wire` we build reactive systems using classes that have reactive properties. We represent a reactive property using a class method with an appropriate decorator.

### Channels

We define properties in accordance to the pattern of **channels**. A channel behaves like a **getter** when called without arguments and as a **getter-setter** otherwise. This approach proves to be more flexible than [others](https://mol.hyoo.ru/#!section=docs/=uuueew_u63ko8).

Here's an example of a simple channel:

```ts
let _title = ''
const title = ( text = _title )=> _title = text

title()                  // getter, returns ''
title( 'Buy some milk' ) // getter-setter, sets and returns 'Buy some milk'
title()                  // getter, returns 'Buy some milk'
```

You can notice that this is similar to some [JQuery methods](https://api.jquery.com/val/).

Instead of a plain function and a variable `$mol_wire` uses class methods with an appropriate decorator:

```ts
import { $mol_wire_solo as solo } from 'mol_wire_lib'

class Store {
	@solo title( text = '' ) { return text }
}

const store = new Store()

store.title()                  // getter, returns ''
store.title( 'Buy some milk' ) // getter-setter, sets and returns 'Buy some milk'
store.title()                  // getter, returns 'Buy some milk'
```

The decorator **memoizes** what's been returned from the method so when someone uses it as a **getter** the method itself is not called and instead the memoized value is returned.

Properties either:
  - **store** values
  - or **compute** new values based on **other** properties.

The **computed** properties will only recompute when one of their **dependencies** change.

```ts
import { $mol_wire_solo as solo } from 'mol_wire_lib'

class User {
	// stores a value
	@solo name_first( next = 'Thomas' ) {
		return next
	}

	// stores a value
	@solo name_last( next = 'Anderson' ) {
		return next
	}

	// computes a value based on other channels
	@solo name() {
		console.log('compute name')
		return `${this.name_first()} ${this.name_last()}`
	}
}

const user = new User()

console.log(user.name()) // logs: 'compute name', 'Thomas Anderson'
console.log(user.name()) // logs: 'Thomas Anderson'

// setter, marks 'name' as a subject to recomputation,
// but doesn't recompute immediately
user.name_last('William')

console.log(user.name()) // logs: 'compute name', 'Thomas William'
console.log(user.name()) // logs: 'Thomas William'
```

### Memoization

Channels marked with a `@solo` or `@plex` decorator are memoized until a new value is set to them or one of their **dependencies** change.

We can use memoization to guarantee that a reference to an object will stay the same:

```ts
import { $mol_wire_solo as solo } from 'mol_wire_lib'

class Task {
	@solo timestamp( value = 0 ) {
		return value
	}

	// won't create new instances until `timestamp` is changed
	@solo moment() {
		return new Moment(this.timestamp())
	}
}
```

Or with memoization we can cache expensive computations:

```ts
import { $mol_wire_solo as solo } from 'mol_wire_lib'

class Task {
	@solo title( title = '' ) {
		return title
	}

	// won't recompute
	@solo segmenter() {
		return new Intl.Segmenter()
	}

	// won't recompute until `title` is changed
	@solo mirrored_title() {
		const segmenter = this.segmenter()
		const segments = [ ... segmenter.segment( this.title() ) ]
		return segments.map( s => s.segment ).reverse().join('')
	}
}
```

With `$mol_wire_plex` (as in multiplexing) we can store multiple values:

```ts
import { $mol_wire_plex as plex } from 'mol_wire_lib'

class Project {
	@plex task( id: number ) {
		return new Task( id )
	}
}

const project = new Project()
const task1 = project.task(1)
const task2 = project.task(2)
```

### Hacking

Another piece of flexibility that **channels** give is what's called **hacking**. It allows us to impose custom rules on how channels are read or set:

```ts
import {
	$mol_wire_solo as solo,
	$mol_wire_plex as plex,
} from 'mol_wire_lib'

class Task {
	// task has a duration
	@solo duration( dur?: number ) {
		return dur
	}
}

class Project_limited {
	// project has many tasks
	@plex task( id: number ) {
		const task = new Task()

		// the "hacking" technique:
		// when someone tries to get or set the duration for a task
		// we proxy this through our own method imposing a limitation for maximum duration
		task.duration = ( duration ) => this.task_duration( id, duration )

		return task
	}

	@plex task_duration( id: number, duration = 1 ) {
		// clamp the duration to the maximum value
		return Math.min( duration, this.duration_max() )
	}

	duration_max() {
		return 10
	}
}

const project_limited = new Project_limited()

const task_limited = project_limited.task(1)
task_limited.duration(20) // try to set 20 for the duration

console.log(task_limited.duration()) // logs: 10
```

### Destructors

We can take the use of **memoization** even further by leveraging **destructors**.

`$mol_wire` will call a special method named `destructor` on an object that is no longer needed:

```ts
import { $mol_wire_solo as solo } from 'mol_wire_lib'

class ExampleAPI {
	socket: WebSocket

	constructor (
		public api_key : string ,
	) {
		this.socket = new WebSocket(`wss://example.com?api_key=${api_key}`)
	}

	// the special method
	destructor() {
		this.socket.close()
	}
}

class App {
	@solo api_key( value = '' ) {
		return value
	}

	@solo api() {
		return new ExampleAPI( this.api_key() )
	}
}

const app = new App()

// set an api key
app.api_key('testkey1')

// create an instance of WebSocket, establish a connection
app.api()

// change the api key
// this will trigger creation of a new web socket
// and the old one will get destructured
app.api_key('testkey2')
```

### Asynchronous computed values

Unlike many other reactivity systems, `$mol_wire` allows you to have computeds that depend on asynchronous values.

`$mol_wire` makes it possible by using an implementaion of Suspense API where an asynchronous task throws an exception to pause the computation until the task resolves. You can read more about it [here](https://mol.hyoo.ru/#!section=docs/=h5rg2r_mmlg15).

```ts
import {
	$mol_wire_solo as solo,
	$mol_wire_sync,
	$mol_wire_async,
} from 'mol_wire_lib'

// produce a value with 1 second delay
function value_async(): Promise<number> {
	return new Promise((resolve) => {
		const value = 25
		setTimeout(() => resolve(value), 1000)
	})
}

class App {
	@solo value() {
		// convert asynchronous function to a synchronous one
		// NOTE closures won't work here,
		// NOTE only use references to pre-defined functions or object methods
		const value_sync = $mol_wire_sync(value_async)

		// treat the value as it is already there
		return value_sync() * 2
	}

	run() {
		console.log(this.value())
	}
}

const app = new App()

// run the application in a Suspense environment
$mol_wire_async(app).run()

// logs: 50
```

### Side effects in asynchronous computations

In `$mol_wire` we treat values that are computed **asynchronously** as they're **already there**. This is thanks to **Suspense API**: when an asynchronous task starts in a **method** it throws an exception and when it finishes the **method** is **called again**. A more detailed description is [here](https://mol.hyoo.ru/#!section=docs/=3b4eua_31c025).

Because of that we have to be a little careful about how we make **side effects** inside our methods.

The `@$mol_wire_method` decorator (which is usually aliased to `@action`) prevents methods from being called multiple times:

```ts
import {
	$mol_wire_method as action,
	$mol_wire_sync,
} from 'mol_wire_lib'

class App {
	// Auto wrap method to task
	@action main() {
		// Convert async api to sync
		const syncFetch = $mol_wire_sync( fetch )

		this.log( 'Request' ) // 3 calls, 1 log
		const response = syncFetch( 'https://example.org' ) // Sync but non-blocking
		const syncResponse = $mol_wire_sync( response )

		this.log( 'Parse' ) // 2 calls, 1 log
		const response = syncResponse.json() // Sync but non-blocking

		this.log( 'Done' ) // 1 call, 1 log
	}

	// Auto wrap method to sub-task
	@action log( ... args: any[] ) {
		console.log( ... args )
		// No restarts within a portion of a task
	}
}
```

### Cancelling asynchronous tasks

We can cancel asynchronous tasks when we no longer need them by using **destructors** again.

Here's an example of a cancelable `fetch`:

```ts
import { $mol_wire_sync } from 'mol_wire_lib'

const fetchJSON = $mol_wire_sync( function fetch_abortable(
	input: RequestInfo,
	init: RequestInit = {}
) {
	const controller = new AbortController
	init.signal ||= controller.signal

	const promise = fetch( input, init )
		.then( response => response.json() )

	// assign a destructor to cancel the request
	const destructor = ()=> controller.abort()
	return Object.assign( promise, { destructor } )
} )
```

Then, we can use it in our computeds:

```ts
import { $mol_wire_plex as plex } from 'mol_wire_lib'

class GitHub {
	@plex static issue( id: number ) {
		return fetchJSON( `https://api.github.com/repos/nin-jin/HabHub/issues/${id}` )
	}
}
```

or a more interesting use case could look like this:

```ts
import { $mol_wire_async } from 'mol_wire_lib'

button.onclick = $mol_wire_async( function() {
	const { profile } = fetchJSON( 'https://example.org/input' )
	console.log( profile )
} )
```

In the above example clicking the button will trigger an HTTP request. If it doesn't resolve until the user clicks again, a new request will be sent and the previous one will get **cancelled**.

And this is how easy it is to add debounce to this function:

```diff
button.onclick = $mol_wire_async( function() {
+	// schedule a timer
+	// the execution won't go past this point until it resolves
+	// if onclick is called again the timer gets rescheduled
+	$mol_wait_timeout( 1000 )
	const { profile } = fetchJSON( 'https://example.org/input' )
	console.log( profile )
} )
```
