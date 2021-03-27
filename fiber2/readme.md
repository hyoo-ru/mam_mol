# $mol_fiber2

Pausable synchronous executions.
Code inside fibers must be idempotent because it may be restarted for continuation.

**[Unstable]**

## $mol_fiber2_sync

Returns proxy that converts all asynchronous methods (that returns a Promise) to synchronous (that instantly returns a result).

```typescript
const User = {
	name() {
		const response = $mol_fiber2_sync( window ).fetch( '/profile' )
		const json = $mol_fiber2_sync( response ).json()
		return json.user_name
	}
}
```

## $mol_fiber2_async

Returns proxy that converts all synchronous methods (that can access to fibers) to asynchronous (that returns a Promise).

```typescript
const name_promise = $mol_fiber2_async( User ).name()
```

## $mol_fiber2_method

Decorates method to fiber to ensure it is idempotent inside fiber.

```typescript
class App {

	@ $mol_fiber2_method
	log( ... args: any[] ) {
		console.log( ... args )
	}

	$mol_fiber2_method
	run() {
		this.log( 'Started' )
		this.log( User.name() )
		this.log( 'Finished' )
	}
}
```
