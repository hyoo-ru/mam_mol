# $mol_wire_solo

Decorates solo object channel to [$mol_wire_atom](../atom).

**Use [$mol_mem](../../mem) alias outside $mol_wire**

```typescript
class App {

	// Primary state
	@ $mol_wire_solo
	count( next = 0 ) {
		return next
	}

	// Derived state
	@ $mol_wire_solo
	double( next?: number ) {
		return this.count( next?.valueOf && next / 2 ) * 2
	}
	
}
```
