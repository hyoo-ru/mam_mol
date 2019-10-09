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
	get friends() { return $mol_data_array( User ) } ,
})

// Ensure this is a User
const ann = User({
	name : 'Ann' ,
	age : 33 ,
	birthday : '1984-08-04T12:00:00Z' ,
	phone : 791234567890,
	mail : 'foo@example.org' ,
	friends : [] ,
})

// typeof ann === {
// 	readonly name: string;
// 	readonly age: number | undefined;
// 	readonly birthday: $mol_time_duration;
// 	readonly phone: string | number;
// 	readonly mail: string;
// 	readonly friends: readonly User[];
// }

// Allow only Users
function printFriends( user : ReturnType< typeof User > ) {
	for( const friend of user.friends ) {
		console.log( friend.name )
	}
}

printFriends( ann )
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

# Similar projects

- [gcanti/io-ts](https://github.com/gcanti/io-ts) - Runtime type system for IO decoding/encoding
