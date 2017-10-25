# $mol_mem

## Single-value properties

Properties of a the same values, in terminology of mol is polymorphic methods with the following type of interface:

```ts
myProperty< Value >() : Value // getter
myProperty< Value >( next? : Value ) : Value // getter/setter
myProperty< Value >( next? : Value , force? : $mol_atom_force ) : Value // getter/setter with force support
```

The example of declaring a not cached property:

```ts
/// getter
userName() { return 'jin' }
```

```ts
/// getter/setter
userName( next? : string ) {

	if( next === void 0 ) { // check for undefined for switch between getter and setter
		return localStorage.getItem( 'name' ) // pull value
	} else {
		localStorage.setItem( 'name' , next ) // put value
		return next // return next value
	}
}
```

Examples of usage:

```ts
// Set user name 'jin'
userName( 'jin' )
```

```ts
// Get user name 'jin'
userName()
```

To do a property is cached it is enough to use decorator [$mol_mem](../prop), which uses under the hood [$mol_atom](../atom) for automatic invalidation of cache:

```ts
/// getter
@ $mol_mem
userName() { return $mol_state_local.value( 'name' ) }
```

```ts
/// getter/setter
@ $mol_mem
userName( next? : string ) {
	if( next === void ) { // check for undefined for switch between getter and setter
		return $mol_state_local.value( 'name' ) // pull value
	} else {
		$mol_state_local.value( 'name' , next ) // put value 
		return next // return next value
	}
}
```

```ts
/// Delegated getter/setter
@ $mol_mem
userName( next? : string ) {
	return $mol_state_local.value( 'name' , next )
}
```

Additional examples of usage reactive properties:

```ts
@ $mol_mem
userName( next? : string , force? : $mol_atom_force ) { // Added force support
	return 'mary'
}

/// Try to set new value
userName( 'jin' ) // returns 'mary'

/// Force push value to cache 
userName( 'jin' , $mol_atom_force_cache ) // returns 'jin'

/// Force cache ignoring and pulling fresh value
userName( void 0 , $mol_atom_force_update ) // returns 'mary'
```

## Multi-value properties

Multi-value properties has the following interface:

```ts
myProperty< Key , Value >( key : Key ) : Value // getter
myProperty< Key , Value >( key : Key , next? : Value ) : Value // getter/setter
myProperty< Key , Value >( key : Key , next? : Value , force? : $mol_atom_force ) : Value // getter/setter with force support
```

Examples of declarations:

```ts
userName( pos : number ) {
	return `User #${pos}` // value based on key
}
```

```ts
@ $mol_mem_key
userNames( pos : number , next? : string ) {
	return $mol_state_local.value( 'name' , next ) || `User #${pos}`
}
```

Examples of usages:

```ts
/// Set user#0 name to 'jin'
userName( 0 , 'jin' )
```

```ts
/// Get user#0 name 'jin'
userName( 0 )
```

As a key it is allowed to use any value, which can be serialized into JSON, for example:

```ts
@ $mol_mem_key
usersSearch( query : {
	name? : string
	minAge? : number
} ) {
	var users = this.users()
	if( query.name ) users = users.filter( ({ name })=> !!name.match( query.name ) )
	if( query.minAge ) users = users.filter( ({ age })=> age > query.minAge )
	return users
}
```

```ts
adults() {
	return this.usersSearch({ minAge : 18 })
}
jins() {
	return this.usersSearch({ name : 'jin' })
}
```

## Articles

* [$mol_atom: теория и практика реактивности](https://habrahabr.ru/post/317360/) - Object oriented reactive programming
* [Объектное Реактивное Программирование](https://habrahabr.ru/post/330466/) - Features of Object Reactive Programming
