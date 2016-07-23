# $mol_prop

## One-value properties

Свойства одного значения, в терминологии $mol, - это полиморфные функции со следующего вида интерфейсом:

```ts
myProperty< Value >() : Value
myProperty< Vlaue >( ...diff : Value[] ) : Value
```

Пример объявления некешируемого свойства:

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

Примеры использования:

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

Чтобы сделать свойство реактивным (кешируемым с автоматической инвалидацией), достаточно воспользоваться декоратором [$mol_prop](../prop), использующим под капотом [$mol_atom](../atom):

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

Дополнительные примеры использования рекативных свойств:

```ts
// Invalidate cache
userName( void 0 )
```

```ts
// Force push value to cache
userName( void 0 , 'jin' )
```

## Multi-value properties

Свойства множественных значений имеют следующий интерфейc:

```ts
myProperty< Key , Value >( key : Key ) : Value
myProperty< Key , Value >( key : Key , ...diff : Value[] ) : Value
```

Примеры объявления:

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

Примеры использования:

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

В качестве ключа можно использовать любое, сериализуемое в JSON значение, например:

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
