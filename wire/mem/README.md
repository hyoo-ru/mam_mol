# $mol_wire_mem

Reactive method memoizer. Receives count of key property. For different key it stores different cache. Keys are compared deeply using [$mol_key](../../key).

```ts
class User extends $mol_object2 {
	
	// Reactive static factory which makes and destroys instances.
	static @ $mol_wire_mem(1)
	instance( id: string ) {
		return new User( id )
	}
	
	constructor( readonly id: string ) { }
	
	// Called when all fibers unsubscribes from `User.instance` factory.
	destructor() {
		console.log( 'Nobody needs me anymore :(' )
	}
	
	// Reactive mutable reactive property with default value.
	@ $mol_wire_mem(0)
	name( next?: string ) {
		return next ?? 'Anonymous'
	}
	
	// Random memoization.
	@ $mol_wire_mem(0)
	height() {
		return Math.random()
	}
	
	// Using other objects as key.
	@ $mol_wire_mem(1)
	is_like( other: User, next = false ) {
		return next
	}
	
	// Others mutation while self calculation.
	@ $mol_wire_mem(1)
	is_child( other: User, next = false ) {
		other.is_parent( this, next )
		return next
	}
	
	// Complex and multiple keys.
	@ $mol_wire_mem(2)
	is_between(
		relation: 'height' | 'weight',
		others: [ User | undefined, User | undefined ],
		next = false,
	) {
		return next
	}
	
	// Property depends on async requests.
	@ $mol_wire_mem(0)
	friends() {
		return this.$.$mol_fetch.json( '/friends' )
	}
	
	// Reactive property which depends on other properties.
	@ $mol_wire_mem(0)
	friend_names() {
		return this.friends().map( fiend => friend.name() )
	}
	
}
```
