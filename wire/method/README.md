## $mol_wire_method

Decorates method to fiber to ensure it is executed only once inside other fiber.

**Use [$mol_action](../../action) alias outside $mol_wire**

```typescript
class App {

	@ $mol_wire_method
	log( ... args: any[] ) {
		console.log( ... args )
	}

	@ $mol_wire_method
	run() {
		$mol_wire_sync( console ).log( 'Prepare' ) // calls twice, logs once
		this.log( 'Started' ) // calls twice, logs once
		this.log( User.name() ) // Loads data from server
		this.log( 'Finished' ) // calls once, logs once
	}
	
}

$mol_wire_async( App ).run() // It must be async at top level
```
