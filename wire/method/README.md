## $mol_wire_method

Decorates method to fiber to ensure it is executed only once inside other fiber.

```typescript
class App {

	@ $mol_wire_method
	log( ... args: any[] ) {
		console.log( ... args )
	}

	@ $mol_wire_method
	run() {
		this.log( 'Started' )
		this.log( User.name() ) // Loads data from server
		this.log( 'Finished' )
	}
	
}

$mol_wire_async( App ).run() // It must be async at top level
```
