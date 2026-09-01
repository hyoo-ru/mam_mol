# $mol_data

Defines static typed DTO with strict runtime validation and user friendly error messages like:

```
["friends"][0]["phone"] undefined is not any of variants
undefined is not a string
undefined is not a number
```

# Known parsers

- [$mol_data_boolean](https://github.com/hyoo-ru/mam_mol/tree/master/data/boolean) - boolean type
- [$mol_data_number](https://github.com/hyoo-ru/mam_mol/tree/master/data/number) - number type
- [$mol_data_integer](https://github.com/hyoo-ru/mam_mol/tree/master/data/integer) - integer type
- [$mol_data_range](https://github.com/hyoo-ru/mam_mol/tree/master/data/range) - range restriction
- [$mol_data_string](https://github.com/hyoo-ru/mam_mol/tree/master/data/string) - string type
- [$mol_data_pattern](https://github.com/hyoo-ru/mam_mol/tree/master/data/pattern) - string by pattern
- [$mol_data_email](https://github.com/hyoo-ru/mam_mol/tree/master/data/email) - email string
- [$mol_data_tagged](https://github.com/hyoo-ru/mam_mol/tree/master/data/tagged) - tagged primitive type
- [$mol_data_nullable](https://github.com/hyoo-ru/mam_mol/tree/master/data/nullable) - nullable version of given type
- [$mol_data_optional](https://github.com/hyoo-ru/mam_mol/tree/master/data/optional) - optional version of given type
- [$mol_data_variant](https://github.com/hyoo-ru/mam_mol/tree/master/data/variant) - one of set of types
- [$mol_data_const](https://github.com/hyoo-ru/mam_mol/tree/master/data/const) - deep equal to given value
- [$mol_data_array](https://github.com/hyoo-ru/mam_mol/tree/master/data/array) - array of given type
- [$mol_data_record](https://github.com/hyoo-ru/mam_mol/tree/master/data/record) - maps given fields to runtypes
- [$mol_data_dict](https://github.com/hyoo-ru/mam_mol/tree/master/data/dict) - dictionary maps string to given type
- [$mol_data_enum](https://github.com/hyoo-ru/mam_mol/tree/master/data/enum) - value of given enum
- [$mol_data_instance](https://github.com/hyoo-ru/mam_mol/tree/master/data/instance) - instance of class
- [$mol_data_pipe](https://github.com/hyoo-ru/mam_mol/tree/master/data/pipe) - pipeline of runtypes


# Usage examples

## Entities

```typescript
// Base Type
const PersonDTO = $mol_data_record({
	name : $mol_data_string ,
	age : $mol_data_optional( $mol_data_integer ) ,
	birthday : $mol_data_pipe( $mol_data_string , $mol_time_moment ) ,
})

// Derived Type
const UserDTO = $mol_data_record({
	... PersonDTO.config,
	phone: $mol_data_variant( $mol_data_string , $mol_data_integer ),
	mail: $mol_data_email,
})

// Ensure this is a User
const jin = UserDTO({
	name : 'Jin' ,
	age : 33 ,
	birthday : '1984-08-04T12:00:00Z' ,
	phone : 791234567890,
	mail : 'foo@example.org' ,
})

// typeof jin === {
// 	readonly name: string;
// 	readonly age?: number | undefined;
// 	readonly birthday: $mol_time_moment;
// 	readonly phone: string | number;
// 	readonly mail: string;
// }

// Allow only Users
function printName( user : typeof UserDTO.Value ) {
	console.log( user.name )
}

printName( jin )

// Wrong json from server
const json = {
	name : 'Jin' ,
	age : 33 ,
	birthday : '1984-08-04T12:00:00Z' ,
	phone : 791234567890,
	mail : '</script>' , // !
} as any

// Runtime error: ["mail"] </script> is not a /.+@.+/
printName( UserDTO( json ) )
```

## Units

```typescript
const { Weight, Length } = $mol_data_tagged({
	Weight: $mol_data_integer,
	Length: $mol_data_integer,
})

Length( 20 ) // Validate
let len = Length( 10 ) // Inferred type
let kg: typeof Weight.Value = Weight( 1000 ) // Explicit type

len = 20 // Implicit Cast
let num: number = len // Implicit Cast
len = Length( Weight( 20 ) ) // Explicit Cast

len = Weight( 20 ) // Compile time error
len = Length( 20.1 ) // Run time error
```

## (De)Serialization

```typescript
const Duration = $mol_data_pipe(
	$mol_data_variant(
		$mol_data_string ,
		$mol_data_integer ,
	) ,
	$mol_time_duration ,
)

JSON.stringify( Duration( 'P1D' ) ) // "P1DT"
JSON.stringify( Duration( 1000 ) ) // "PT1S"
```

## Custom runtypes

```typescript
const Password = $mol_data_setup( ( val: string ) => {
	
	const str = $mol_data_string( val )
	if( str.length >= 8 ) return str
	
	return $mol_fail(
		new $mol_data_error( `${ val } have length less than 8` )
	)
	
} )

Password( 123 ) // ❌ 123 is not a string
Password( 'qwerty' ) // ❌ qwerty have length less than 8
Password( 'qwertyuiop' ) // ✅
```

```typescript
const MinLength = ( minLength = 8 )=> $mol_data_setup( ( val: string ) => {
		
	const str = $mol_data_string( val )
	if( str.length >= minLength ) return str
	
	return $mol_fail(
		new $mol_data_error( `${ val } have length less than ${minLength}` )
	)
	
}, minLength )

const Password = MinLength(8)
Password( 123 ) // ❌ 123 is not a string
Password( 'qwerty' ) // ❌ qwerty have length less than 8
Password( 'qwertyuiop' ) // ✅
```

# Usage from NPM

```
npm install mol_data_all
```

```typescript
import {
  $mol_data_tagged as Tagged,
  $mol_data_integer as Integer,
} from "mol_data_all"

const { Age } = Tagged({ Age: Integer })

let age = Age( 17 )
age = Age( age + 1 )
```

[More complex example.](https://www.typescriptlang.org/play/?downlevelIteration=true&experimentalDecorators=true&emitDecoratorMetadata=true&ssl=1&ssc=1&pln=61&pc=1#code/JYWwDg9gTgLgBAbwFBzgEhBANgfQCYCGMBOAzjFMAHYDmcBpcAyhQDQrqa6HE7UwBTGgKj1GASSox2qDNnxESUAQGNoeMXABKqmZ3k8SEMDGAQqBLJoCyBAJ4AjAXrndFOAG4FKBKZoBq3nYuXAq8AiAEwFYMcLbRIQbuYMBgApoACqkCSAC+cABmUBAgcABEoYY4llhlANxISCpYDIzWdgAiROkIcByoalTkUACuKjDQABReWCMCAFxww9Q0AJSIcLn9cHYC3gCEi1QjIE5Q25hSABaHcMenItuEdrf3Z3mNg+RwAKqkIh0ACoAeTgAF5tKpJsgAJAWEDpRYsUTsGEEYRwRa2RwCSZwSTwdaohzAWBXZ6YuBZNJ45FwVhxTrdOBEpAwsBXcyIuCBKB2WkUen4vysmGRaKU+JWdi5VaNAD08rgAFEhiNlHAYFdgIwdfRfv9zl94AArajgg0AkHQtnw7kAcgAUtR7fS2ejuQBmT1umEkskUxb2gCMAE4ABwAFgAtAAGcNxyOu1EcrmUgDsoeDACZPZGAKwANnT4dDsdR4qsQYKEAgAAEBAAPAjgLACAB00BoybycqQis1djSEAKcDNVHBYIhyAHMOUBDw5iwdjuLYWSwoKwas-ni6oy-owgA-EcTmc4AAfOAjKh4AQFagCPDbpVzvZ7g-+rXPLElARSF84DfBclxXVMqAEE8N0oWhLzuM8REA4CPxXStFmWWhAK2fslQAQSwLAIAAdzgUDLSgUgkAKG9xjMCcwBgmAADk1zxEZDUpGAhwEEdyKBYF20CWZ0nWWEvmwDtCJoNjDXbO0WQ+JAGP4FiETxccFJwuAAHVilgk1SHMQpilKQ0PEeY0x0Midp1tNdKSdF1fQ9SlvV9L9yXsBywyjOME1jJNfXA7lMxzPMixLMsKyiKs4HtAAeeVSBUSgTAAPh7fJYl8OwFSVLQb1MBE4BEYooEWABtCoYrKABdOBEuS1KYDSuA9SoCB4AIOB5XbABqOt+vlJTGNU3E+OtKyjPWOUgA)

# Similar projects

- [gcanti/io-ts](https://github.com/gcanti/io-ts) - Runtime type system for IO decoding/encoding
- [pelotom/runtypes](https://github.com/pelotom/runtypes) - Runtime validation for static types
- [vriad/zod](https://github.com/vriad/zod) - TypeScript-first schema validation with static type inference
- [ianstormtaylor/superstruct](https://github.com/ianstormtaylor/superstruct) - A simple and composable way to validate data in JavaScript (and TypeScript).
