# $mol_prop

## One-value properties

Свойства одного значения, в терминологии [$mol](..), - это полиморфные функции со следующего вида интерфейсом:

```ts
myProperty< Value >() : Value
myProperty< Vlaue >( ...diff : Value[] ) : Value
```

Пример объявления некешируемого свойства:

```ts
userName() { return 'jin' } // getter
```

```ts
userName( ...diff : string[] ) { // getter/setter
	if( diff[0] === void ) { // check for undefined is important
		return localStorage.getItem( 'name' ) // pull value
	} else {
		localStorage.setItem( 'name' , diff[0] ) // put value, patch not supported
		return diff[0] // return next value
	}
}
```

Примеры использования:

```ts
userName( 'jin' ) // "jin" - set user name
```

```ts
userName() // "jin" - get user name
```

```ts
userName( 'mar' , 'mary' ) // "jiny" - patch user name
```

Чтобы сделать свойство реактивным (кешируемым с автоматической инвалидацией), достаточно воспользоваться декоратором, использующим под капотом [$mol_atom](../atom):

```ts
@ $mol_prop()
userName() { return $mol_state_local.value( 'name' ) } // getter
```

```ts
@ $mol_prop()
userName( ...diff : string[] ) { // getter/setter
	if( diff[0] === void ) { // check for undefined is important
		return $mol_state_local.value( 'name' ) // pull value
	} else {
		$mol_state_local.value( 'name' , diff[0] ) // put value 
		return diff[0] // return next value
	}
}
```

```ts
@ $mol_prop()
userName( ...diff : string[] ) { // getter/setter
	var next = $mol_state_local.value( 'name' , ...diff ) // delegate getter/setter
	return next[0] // return next value
}
```

Дополнительные примеры использования рекатиыных свойств:

```ts
userName( void 0 ) // invalidate cache
```

```ts
userName( void 0 , 'jin' ) // force push value to cache
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
userName( 0 , 'jin' ) // "jin" - set user#0 name
```

```ts
userName( 0 ) // "jin" - get user#0 name
```

```ts
userName( 0 , 'mar' , 'mary' ) // "jiny" - patch user#0 name
```

В качестве ключа можно использовать любое, сериализуемое в JSON значение, например:

```ts
@ $mol_prop()
usersSearch( query : { name? : string , minAge? : number } ) {
	var users = this.users()
	if( query.name ) users = users.filter( user => !!query.name.match( user.name ) )
	if( query.minAge ) users = users.filter( user => user.age > query.minAge )
	return users
}
```

```ts
usersAdult() {
	return this.usersSearch({ minAge : 18 })
}
```
