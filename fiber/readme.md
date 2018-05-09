# $mol_fiber

Pausable synchronous executions.
Frees main thread every 8ms and continues fiber in next animation frame.
Fibers must be idempotent because can be restarted for continuation.

## Online demos

- [Concurrency and errors handling](http://eigenmethod.github.io/mol/fiber/)
- [Cancelling at any step (request, processing)](http://plnkr.co/edit/pL1nQmIHrIojyV0GHtVH?p=preview)

## API

### $mol_fiber_start

Creates fiber for handler and immediately starts it.
Handler executed only once in parent execution.
Use it to wrap non idempotent code.

```typescript
$mol_fiber_start( ()=> {
	$mol_fiber_start( ()=> console.log( 1 ) ) // 1
	$mol_fiber_start( ()=> console.log( 2 ) ) // 2
} )
```

### $mol_fiber_defer

Defer starts fiber.
So fiber will be executed asynchronously.
Use it to start fibers concurrently.

```typescript
$mol_fiber_defer( ()=> console.log( 1 ) ) // 1
$mol_fiber_defer( ()=> console.log( 2 ) ) // 2
```

### $mol_fiber_func

Converts function to fiber.

```typescript
const log = $mol_fiber_func( console.log )

$mol_fiber_start( ()=> {
	log( 1 ) // 1
	log( 2 ) // 2
} )
```

### $mol_fiber_make

Creates fiber as child of current fiber.

```typescript
$mol_fiber_start( ()=> {
	$mol_fiber_make( ()=> console.log( 1 ) ).start() // 1
	$mol_fiber_make( ()=> console.log( 2 ) ).start() // 2
} )
```

### $mol_fiber_async

Starts fiber and provide callback to provide result or error.

```typescript
function get_data() {
	return $mol_fiber_async( back => {
		setTimeout( back( ()=> 123 ) )
	} )
}

function get_error() {
	return $mol_fiber_async( back => {
		setTimeout( back( ()=> {
			throw new Error( 'Test error' )
		} ) )
	} )
}

$mol_fiber_start( ()=>{
	get_data() // returns 123
	get_error() // throws test error
} )
```

Return function to handle fiber cancelling. In example cancellable fetch:

```typescript
function get_text( uri : string ) {

	return $mol_fiber_async( back => {

		const xhr = new XMLHttpRequest()
		xhr.open( 'GET', uri )

		xhr.onload = back( () => {

			if( Math.floor( xhr.status / 100 ) !== 2 ) {
				throw new Error( xhr.statusText )
			}

			return xhr
		} )

		xhr.onerror = back( () => {
			throw new Error( xhr.statusText )
		} )

		xhr.send()

		return ()=> xhr.abort()

	} )

}
```

Use `destructor` method to stop execution of fiber tree and provide second callback to handle aborting:


```
const fiber = $mol_fiber_make( ()=> doSomeJob() , ()=> handleAbort() )
//...
fiber.destructor() // `doSomeJob` won't be completed and `handleAbort` will be called
``` 

### $mol_fiber_sync

Converts any `async` function (function that returns promise) to "synchronous" fiber.

```typescript
const request = $mol_fiber_sync( fetch )

$mol_fiber_start( ()=> {
	console.log( request( 'http://example.org/users' ).users )
} )
```

### $mol_fiber_method

Decorates method to fiber.

```typescript
export class $my_foo {

	@ $mol_fiber_method
	transfer( from  , to ) {
		request( to , {
			method: 'post' ,
			body : request( from ) ,
		} )

		return 'Transfer is completed'
	}

}
```

### $mol_fiber_catch

Declares error handler for current fiber. 

```
const get_zero = $mol_fiber_func( ()=> {
	
	$mol_fiber_catch( error => {
		document.body.innerHTML = error.message
		return 0 // will be returned by fiber
	} )	
	
	throw new Error( 'Alerted message' )
} )
```

### $mol_fiber_warp

Executes scheduled fibers to the end. Usefull for tests.

```typescript
$mol_fiber_warp()
// No scheduled fibers here
```

## Installation


### Via bundle from CDN

```
<script src="http://mol.js.org/fiber/-/web.js"></script>
```

### Via NPM

```
npm install mol_fiber
```

```
const { $mol_fiber_start : fiber } = require( 'mol_fiber' )
```

```
import { $mol_fiber_start as fiber } from 'mol_fiber'
```
