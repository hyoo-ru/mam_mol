## $mol_wire_sync

Convert asynchronous (promise-based) API to synchronous by wrapping calls in a fiber with proxy.

```typescript
const User = {
	name() {
		const response = $mol_wire_sync( window ).fetch( '/profile' )
		const json = $mol_wire_sync( response ).json()
		return json.user_name
	}
}
```
