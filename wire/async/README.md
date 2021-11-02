## $mol_wire_async

Returns proxy that converts all synchronous methods (that can access to fibers) to asynchronous (that returns a Promise).

```typescript
const name_promise = $mol_wire_async( User ).name()
```
