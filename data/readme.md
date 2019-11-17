# $mol_data

Defines static typed DTO with strict runtime validation and user friendly error messages like `["friends"][0]["phone"] is not a string and is not a number`.

# Usage examples

## Entities

```typescript
const User = $mol_data_record({
	name : $mol_data_string ,
	age : $mol_data_optional( $mol_data_integer ) ,
	birthday : $mol_data_wrapper( $mol_data_string , $mol_time_moment ) ,
	phone : $mol_data_variant( $mol_data_string , $mol_data_integer ) ,
	mail : $mol_data_email ,
})

// Ensure this is a User
const ann = User({
	name : 'Ann' ,
	age : 33 ,
	birthday : '1984-08-04T12:00:00Z' ,
	phone : 791234567890,
	mail : 'foo@example.org' ,
})

// typeof ann === {
// 	readonly name: string;
// 	readonly age: number | undefined;
// 	readonly birthday: $mol_time_duration;
// 	readonly phone: string | number;
// 	readonly mail: string;
// }

// Allow only Users
function printName( user : typeof User.Value ) {
	console.log( user.name )
}

printName( ann )
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
const Duration = $mol_data_wrapper( $mol_data_variant( $mol_data_string , $mol_data_integer ) , $mol_time_duration )

JSON.stringify( Duration( 'P1D' ) ) // "P1DT"
JSON.stringify( Duration( 1000 ) ) // "PT1S"
```

# Using from NPM

```
npm install mol_data_all
```

```
import {
  $mol_data_nominal as Nominal,
  $mol_data_integer as Integer,
} from "mol_data_all"

const Int = Nominal({ Int: Integer })

const i = Int(1)
const j: typeof Int.Value = Int( i + 1 )
```

# Similar projects

- [gcanti/io-ts](https://github.com/gcanti/io-ts) - Runtime type system for IO decoding/encoding
