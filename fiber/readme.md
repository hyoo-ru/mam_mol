# $mol_fiber

Pausable synchronous executions. Frees main thread every 8ms, and continues fiber in next frame. Fibers must be idempotent because can be restarted for continuation.

## [Online demo](http://eigenmethod.github.io/mol/fiber/)

## API

### $mol_fiber_sync

Starts synchronous fiber. Executed only one time in parent execution. Use it to wrap non idempotent code.

```typescript
$mol_fiber_sync( ()=> {
	$mol_fiber_sync( ()=> console.log( 1 ) ) // 1
	$mol_fiber_sync( ()=> console.log( 2 ) ) // 2
} )
```

### $mol_fiber_func

Converts function to fiber.

```typescript
const log = mol_fiber_func( console.log )

$mol_fiber_sync( ()=> {
	log( 1 ) // 1
	log( 2 ) // 2
} )
```

### $mol_fiber_make

Creates child fiber to current executed.

```typescript
$mol_fiber_sync( ()=> {
	$mol_fiber_make( ()=> console.log( 1 ) ).start() // 1
	$mol_fiber_make( ()=> console.log( 2 ) ).start() // 2
} )
```

### $mol_fiber_async

Starts fiber and provide callback to asynchronous provide result or error.

```typescript
$mol_fiber_sync( ()=>{

	const res = $mol_fiber_async( back => {
		setTimeout( back( ()=> 123 ) )
	} )

	console.log( res ) // 123
}
```

### $mol_fiber_promise

Start asynchronous task and waits until its promise resolved.

```typescript
$mol_fiber_sync( ()=>{

	const res = $mol_fiber_promise( ()=> fetch( 'http://example.org/' ) )

	console.log( res ) // content of example.org
}
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

