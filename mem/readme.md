# $mol_mem

## One-value properties

Properties of a the same values, in terminology of mol is polymorphic methods with the following type of interface:

```ts
myProperty< Value >() : Value // getter
myProperty< Vlaue >( next? : Value ) : Value // getter/setter
myProperty< Vlaue >( next? : Value , prev? : Value ) : Value // getter/setter/patcher
```
The example of declaring a not cached property:

```ts
/// getter
userName() { return 'jin' }
```

```ts
/// getter/setter
userName( next? : string ) {
	if( next === void 0 ) { // check for undefined is important
		return localStorage.getItem( 'name' ) // pull value
	} else {
		localStorage.setItem( 'name' , next ) // put value
		return next // return next value
	}
}
```

```ts
type UserData = { name? : string , age? : number }

/// getter/setter/patcher
userData( next? : UserData , prev? : UserData ) {
	if( next === void 0 ) { // getter
		return $mol_state_local.value< UserData >( 'userData' )
	} else if( prev === void 0 ) { // setter
		return $mol_state_local.value< UserData >( 'userData' , next )
	} else { // patcher
		return this.useData( $mol_merge_dict( this.userData() , next ) ) 
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

```ts
// Set user data to { name : 'jin' , age : 32 }
userData({ name : 'jin' , age : 32 })
```

```ts
// Patch user data to { name : 'jin' , age : 33 }
userData( { age : 33 } , { age : 32 } )
```

To do a property is reactive (cached with automatic invalidation) it is enough to use decorator [$mol_mem](../prop), which uses under the hood [$mol_atom](../atom):

```ts
/// Getter
@ $mol_mem()
userName() { return $mol_state_local.value( 'name' ) }
```

```ts
/// Getter/setter
@ $mol_mem()
userName( next? : string ) {
	if( next === void ) { // check for undefined is important
		return $mol_state_local.value( 'name' ) // pull value
	} else {
		$mol_state_local.value( 'name' , next ) // put value 
		return next // return next value
	}
}
```

```ts
/// Delegated getter/setter
@ $mol_mem()
userName( next? : string ) {
	return $mol_state_local.value( 'name' , next )
}
```
Additional examples of usage reactive properties:

```ts
// Force push value to cache
userName( void 0 , 'jin' )
```

## Multi-value properties

Multi-value properties has the following interface:

```ts
myProperty< Key , Value >( key : Key ) : Value // getter
myProperty< Key , Value >( key : Key , next? : Value ) : Value // getter/setter
myProperty< Key , Value >( key : Key , next? : Value , prev? : Value ) : Value // getter/setter/patcher
```

Examples of declarations:

```ts
userName( pos : number ) {
	return `User #${pos}` // value based on key
}
```

```ts
@ $mol_mem_key()
userNames( pos : number , next? : string , prev? : string ) {
	return $mol_state_local.value( 'name' , next , prev ) || `User #${pos}`
}
```

Examples of usages:

```ts
// Set user#0 name to 'jin'
userName( 0 , 'jin' )
```

```ts
// Get user#0 name 'jin'
userName( 0 )
```

As a key it is allowed to use any value, which can be serialized into JSON, for example:

```ts
@ $mol_mem_key()
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
