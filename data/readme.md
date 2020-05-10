# $mol_data

Defines static typed DTO with strict runtime validation and user friendly error messages like:

```
["friends"][0]["phone"] undefined is not any of variants
undefined is not a string
undefined is not a number
```

# Usage examples

## Entities

```typescript
const UserDTO = $mol_data_record({
	name : $mol_data_string ,
	age : $mol_data_optional( $mol_data_integer ) ,
	birthday : $mol_data_pipe( $mol_data_string , $mol_time_moment ) ,
	phone : $mol_data_variant( $mol_data_string , $mol_data_integer ) ,
	mail : $mol_data_email ,
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
	mail : '</script>' ,
} as any

// Runtime error: ["mail"] </script> is not a /.+@.+/
printName( UserDTO( json ) )
```

## Units

```typescript
const Weight = $mol_data_nominal({ Weight : $mol_data_integer })
const Length = $mol_data_nominal({ Length : $mol_data_integer })

let len = Length(10)
len = Length(20) // Validate
len = 20 as typeof Length.Value // Cast

len = 20 // Compile time error
len = Weight(20) // Compile time error
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

# Usage from NPM

```
npm install mol_data_all
```

```typescript
import {
  $mol_data_nominal as Nominal,
  $mol_data_integer as Integer,
} from "mol_data_all"

const Int = Nominal({ Int: Integer })

const i = Int(1)
const j: typeof Int.Value = Int( i + 1 )
```

[More complex example.](https://www.typescriptlang.org/play/?downlevelIteration=true&experimentalDecorators=true&emitDecoratorMetadata=true&ssl=1&ssc=1&pln=61&pc=1#code/JYWwDg9gTgLgBAbwFBzgEhBANgfQCYCGMBOAzjFMAHYDmcBpcAyhQDQrqa6HE7UwBTGgKj1GASSox2qDNnxESUAQGNoeMXABKqmZ3k8SEMDGAQqBLJoCyBAJ4AjAXrndFOAG4FKBKZoBq3nYuXAq8AiAEwFYMcLbRIQbuYMBgApoACqkCSAC+cABmUBAgcABEoYY4llhlANxISCpYDIzWdgAiROkIcByoalTkUACuKjDQABReWCMCAFxww9Q0AJSIcLn9cHYC3gCEi1QjIE5Q25hSABaHcMenItuEdrf3Z3mNg+RwAKqkIh0ACoAeTgAF5tKpJsgAJAWEDpRYsUTsGEEYRwRa2RwCSZwSTwdaohzAWBXZ6YuBZNJ45FwVhxTrdOBEpAwsBXcyIuCBKB2WkUen4vysmGRaKU+JWdi5VaNAD08rgAFEhiNlHAYFdgIwdfRfv9zl94AArajgg0AkHQtnw7kAcgAUtR7fS2ejuQBmT1umEkskUxb2gCMAE4ABwAFgAtAAGcNxyOu1EcrmUgDsoeDACZPZGAKwANnT4dDsdR4qsQYKEAgAAEBAAPAjgLACAB00BoybycqQis1djSEAKcDNVHBYIhyAHMOUBDw5iwdjuLYWSwoKwas-ni6oy-owgA-EcTmc4AAfOAjKh4AQFagCPDbpVzvZ7g-+rXPLElARSF84DfBclxXVMqAEE8N0oWhLzuM8REA4CPxXStFmWWhAK2fslQAQSwLAIAAdzgUDLSgUgkAKG9xjMCcwBgmAADk1zxEZDUpGAhwEEdyKBYF20CWZ0nWWEvmwDtCJoNjDXbO0WQ+JAGP4FiETxccFJwuAAHVilgk1SHMQpilKQ0PEeY0x0Midp1tNdKSdF1fQ9SlvV9L9yXsBywyjOME1jJNfXA7lMxzPMixLMsKyiKs4HtAAeeVSBUSgTAAPh7fJYl8OwFSVLQb1MBE4BEYooEWABtCoYrKABdOBEuS1KYDSuA9SoCB4AIOB5XbABqOt+vlJTGNU3E+OtKyjPWOUgA)

# Similar projects

- [gcanti/io-ts](https://github.com/gcanti/io-ts) - Runtime type system for IO decoding/encoding
- [pelotom/runtypes](https://github.com/pelotom/runtypes) - Runtime validation for static types
