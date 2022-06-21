# $mol_wire_async

Returns proxy that converts all synchronous methods (that can access to fibers) to asynchronous (that returns a Promise).

```typescript
const name_promise = $mol_wire_async( User ).name()
```

## Concurrency

You can store bound function to call multiple times, but next execution aborts previous.

```typescript
const set_name = $mol_wire_async( User ).name
set_name( 'john' )
set_name( 'jin' ) // instant aborts setting 'john'
```

You can use that to debounce:

```typescript
class User extends $mol_object2 {
	
	@ $mol_wire_solo
	name( name?: string ) {
		
		// pull branch
		if( name === undefined ) return 'jin'
		
		this.$.$mol_wait_timeout( 500 )
		// only last execution continues
		
		// push to server
		const profile = this.$.$mol_fetch.json( '/profile', {
			name: next
		} )
		
		// update cache with actual value
		return profile.name
	}
	
}
```
