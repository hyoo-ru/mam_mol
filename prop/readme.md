# $mol_prop

## One-value properties

Properties of a the same values, in terminology of mol is polymorphic methods with the following type of interface:

```ts
myProperty< Value >() : Value
myProperty< Vlaue >( ...diff : Value[] ) : Value
```
The example of declaring a not cached property:

```ts
/// getter
userName() { return 'jin' }
```

```ts
/// getter/setter
userName( ...diff : string[] ) {
	if( diff[0] === void 0 ) { // check for undefined is important
		return localStorage.getItem( 'name' ) // pull value
	} else {
		localStorage.setItem( 'name' , diff[0] ) // put value, patch not supported
		return diff[0] // return next value
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
// Set to "jiny" if patch supported, or "mary" if not
userName( 'mary' , 'mar' )
```
To do a property is reactive (cached with automatic invalidation) it is enough to use decorator [$mol_prop](../prop), which uses under the hood [$mol_atom](../atom):

```ts
/// Getter
@ $mol_prop()
userName() { return $mol_state_local.value( 'name' ) }
```

```ts
/// Getter/setter
@ $mol_prop()
userName( ...diff : string[] ) {
	if( diff[0] === void ) { // check for undefined is important
		return $mol_state_local.value( 'name' ) // pull value
	} else {
		$mol_state_local.value( 'name' , diff[0] ) // put value 
		return diff[0] // return next value
	}
}
```

```ts
/// Delegated getter/setter
@ $mol_prop()
userName( ...diff : string[] ) {
	var next = $mol_state_local.value( 'name' , ...diff )
	return next // return next value
}
```
Additional examples of usage reactive properties:

```ts
// Invalidate cache
userName( void 0 )
```

```ts
// Force push value to cache
userName( void 0 , 'jin' )
```

## Multi-value properties

Multi-value properties has the following interface:

```ts
myProperty< Key , Value >( key : Key ) : Value
myProperty< Key , Value >( key : Key , ...diff : Value[] ) : Value
```

Examples of declarations:

```ts
userName( pos : number ) {
	return `User #${pos}` // value based on key
}
```

```ts
@ $mol_prop()
userNames( pos : number , ...diff : string[] ) {
	return $mol_state_local.value( 'name' , ...diff ) || `User #${pos}`
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

```ts
// Set user#0 name to "jiny" if patch supported, or "mary" if not.
userName( 0 , 'mary' , 'mar' ) 
```
As a key it is allowed to use any value, which can be serialized into JSON, for example:

```ts
@ $mol_prop()
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
