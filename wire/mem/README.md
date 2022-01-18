# $mol_wire_mem

Reactive method memoizer. Receives count of key property. For different key it stores different cache. Keys are compared deeply using [$mol_key](../../key).

**Use [$mol_mem_*](../../mem) aliases outside $mol_wire**

## Channel Abstraction

Channel is function which can be used to pull and push values depending on agruments count.


```ts
prop(): Value // read-only single value
prop( next?: Value ): Value // read/write single value

prop( key: Key ): Value // read-only value by key
prop( key: Key, next?: Value ): Value // read/write value by key

prop( key1: Key1, key2: Key2 ): Value // read-only value by keys
prop( key1: Key1, key2: Key2, next?: Value ): Value // read/write value by keys

// etc, any count of keys
```

## Examples

```ts
class User extends $mol_object2 {
	
	// Reactive static factory which makes and destroys instances.
	@ $mol_wire_mem(1)
	static instance( id: string ) {
		return new User( id )
	}
	
	constructor( readonly id: string ) { }
	
	// Called when all fibers unsubscribed from `User.instance` factory.
	destructor() {
		console.log( 'Nobody needs me anymore :(' )
	}
	
	// Reactive mutable reactive property with default value.
	@ $mol_wire_mem(0)
	name( next = 'Anonymous' ) {
		return next
	}
	
	// Memoized external communication.
	@ $mol_wire_mem(0)
	height( next?: number ) {
		
		if( next === undefined ) { // switch between pull and push+pull
			return localStorage.getItem( 'height' ) ?? 0 // pull value
		} else {
			localStorage.setItem( 'height', next ) // push new value
			return next // return actual value
		}
		
	}
	
	// Memoized delegation with default value
	@ $mol_wire_mem(0)
	weight( next?: number ) {
		return this.$.$mol_state_local.value( 'weight', next ) ?? 0
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
		others: {
			before?: User
			after?: User
		}
		next = false,
	) {
		return next
	}
	
	// Property depends on async requests.
	@ $mol_wire_mem(0)
	friends() {
		return this.$.$mol_fetch.json( '/profile' ).friends
			.map( id => User.instance( id ) )
	}
	
	// Reactive property which depends on other properties.
	@ $mol_wire_mem(0)
	friend_names() {
		return this.friends().map( fiend => friend.name() )
	}
	
}
```

## Special cases

### Enforce pull repeat

```ts
@ $mol_wire_mem(0)
page( next = 0 ) {
	return next
}

@ $mol_wire_mem(0)
scroll_top( next = 0 ) {
	this.page() // reset on page change
	return next
}
```

```ts
@ $mol_wire_mem(0)
updates( next = null ) {
	return Math.random()
}

@ $mol_wire_mem(0)
data( next = 0 ) {
	this.updates()
	return fetchData()
}

// ...

this.updates( null ) // Enforce data refetch
```

### Multiple push logic

```ts
@ $mol_wire_mem(0)
config( next?: string, mode?: 'virt' ) {
	
	if( next === unefined ) { // pull
		return fs.readFile( 'conf.txt' )
	}
	
	// Skip write in virtual mode
	if( mode === 'virt' ) return next
	
	// Write to FS in default mode
	fs.writeFile( 'conf.txt' )
	return next
	
}
```

## Related Articles

* [$mol_atom: теория и практика реактивности](https://habrahabr.ru/post/317360/) - Object oriented reactive programming
* [Объектное Реактивное Программирование](https://habrahabr.ru/post/330466/) - Features of Object Reactive Programming
