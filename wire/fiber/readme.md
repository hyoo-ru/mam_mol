# $mol_wire_fiber

Pausable synchronous execution. Tiny SuspenseAPI implementation.

Code inside fibers which calls other fibers must be idempotent because it may be restarted for continuation. So all unidempotent code should be wrapped to fiber.

Instead of direct usage it's prefer to use:

 - Decorators: [$mol_wire_method](../method), [$mol_wire_solo](../solo), [$mol_wire_plex](../plex)
 - Proxies: [$mol_wire_sync](../sync), [$mol_wire_async](../async)

## Error handling

Just use `try-catch` to handle exceptions. Fibers returns fresh value, or throws some error, or throws a `Promise` which will be resolved after fiber became fresh.

If you don't want to hide awating (most cases), use [$mol_fail_hidden](../../fail) to rethrow promise.

```typescript
try {
	// touch other fibers
} catch( error: unknown ) {
	
	if( $mol_promise_like( error ) ) {
		$mol_fail_hidden( error )
	}
	
	$mol_fail_log( error ) // Log once to console
	
	return 'Default value'
} 
```

## Enforce whole fiber graph sync

By default syncing deferred to next animation frame and you don't need to enforce it. When you accessing to the non fresh fiber, it instantly syncs and returns fresh value.

But sometimes you need to enforce all deferred tasks (in tests for example).

```typescript
$mol_wire_fiber.sync()
// No planned fibers here
```
