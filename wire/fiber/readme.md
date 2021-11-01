# $mol_wire

Pausable synchronous executions.
Code inside fibers must be idempotent because it may be restarted for continuation.

**[Unstable]**

## $mol_wire_sync

Returns proxy that converts all asynchronous methods (that returns a Promise) to synchronous (that instantly returns a result).

```typescript
const User = {
	name() {
		const response = $mol_wire_sync( window ).fetch( '/profile' )
		const json = $mol_wire_sync( response ).json()
		return json.user_name
	}
}
```

## $mol_wire_async

Returns proxy that converts all synchronous methods (that can access to fibers) to asynchronous (that returns a Promise).

```typescript
const name_promise = $mol_wire_async( User ).name()
```

## $mol_wire_method

Decorates method to fiber to ensure it is idempotent inside fiber.

```typescript
class App {

	@ $mol_wire_method
	log( ... args: any[] ) {
		console.log( ... args )
	}

	@ $mol_wire_method
	run() {
		this.log( 'Started' )
		this.log( User.name() )
		this.log( 'Finished' )
	}
	
}

$mol_wire_async( App ).run() // It must be async at top level
```
