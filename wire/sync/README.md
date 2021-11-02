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
