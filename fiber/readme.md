# $mol_fiber

Pausable synchronous executions. Frees main thread every 8ms, and continues fiber in next frame. Fibers must be idempotent because can be restarted for continuation.

## [Online demo](http://eigenmethod.github.io/mol/fiber/)

## API

### $mol_fiber_sync

Starts synchronous fiber. Handler executed only one time in parent execution. Use it to wrap non idempotent code.

```typescript
$mol_fiber_sync( ()=> {
	$mol_fiber_sync( ()=> console.log( 1 ) ) // 1
	$mol_fiber_sync( ()=> console.log( 2 ) ) // 2
} )
```

### $mol_fiber_func

Converts function to fiber.

```typescript
const log = $mol_fiber_func( console.log )

$mol_fiber_sync( ()=> {
	log( 1 ) // 1
	log( 2 ) // 2
} )
```

### $mol_fiber_make

Creates fiber as child of current executing.

```typescript
$mol_fiber_sync( ()=> {
	$mol_fiber_make( ()=> console.log( 1 ) ).start() // 1
	$mol_fiber_make( ()=> console.log( 2 ) ).start() // 2
} )
```

### $mol_fiber_async

Starts fiber and provide callback to asynchronous provide result or error.

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

$mol_fiber_sync( ()=>{
	get_data() // returns 123
	get_error() // throws test error
} )
```

Return function to handle fiber cancelling.

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

You can return promise instead of using `back`.

```typescript
$mol_fiber_sync( ()=>{
	const res = $mol_fiber_async( ()=> fetch( 'http://example.org/' ) )
	console.log( res ) // content of example.org
} )
```

And you can use async functions too.

```typescript
$mol_fiber_sync( ()=>{
	const res = $mol_fiber_async( async()=> await fetch( 'http://example.org/' ) )
	console.log( res ) // content of example.org
} )
```

### $mol_fiber_method

Decorate method as fiber.

```typescript
const action = $mol_fiber_method

export class $my_foo {

	// ...

	@action
	transfer() {
		return this.send_data( thid.load_data() )
	}

}
```

### $mol_fiber_warp

Executes scheduled fibers to the end. Usefull for tests.

```typescript
$mol_fiber_warp()
// No scheduled fibers here
```

