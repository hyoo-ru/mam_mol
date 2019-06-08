# $mol_data

Defines static typed DTO with strict runtime validation and user friendly error messages like `["friends"][0]["phone"] is not a string and is not a number`.

# Usage example

```typescript
const User = $mol_data_record({
	name : $mol_data_string ,
	age : $mol_data_optional( $mol_data_integer ) ,
	phone : $mol_data_variant( $mol_data_string , $mol_data_integer ) ,
	mail : $mol_data_email ,
	get friends() { return $mol_data_array( User ) }
})

// Ensure this is a User
const ann = User({
	name : 'Ann' ,
	age : undefined ,
	phone : 791234567890,
	mail : 'foo@example.org' ,
	friends : [] ,
})

// Allow only Users
function printFriends( user : ReturnType<typeof User> ) {
	for( const friend of user.friends ) {
		console.log( friend.name )
	}
}

printFriends( ann )
```
