# $mol_fiber2

Pausable synchronous executions.
Fibers must be idempotent because can be restarted for continuation.

**Unstable**

## $mol_fiber2.async

Starts sync function in new fiber. Returns `Promise`.

```typescript
const result_promise = $mol_fiber2.async( ()=> {
	return fibered_fetch_json( '/profile' ).user_name
} )
```

## $mol_fiber.wait

Starts async function and waits it completition. 

```typescript
const result_promise = $mol_fiber2.async( ()=> {
	const response = $mol_fiber2.wait( ()=> fetch( '/profile' ) )
	const json = $mol_fiber2.wait( ()=> response.json() )
	return json.user_name
} )
```

## $mol_fiber.func

Converts unindempotent function to idempotent.

```typescript
const log = $mol_fiber2.func( console.log )

$mol_fiber2.async( ()=> {
	log( 'Started' )
	log( fibered_fetch_json( '/profile' ) )
	log( 'Finished' )
} )
```
