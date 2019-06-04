# $mol_data

Defines DTO with compiletime/runtime validation.

# Usage example

```typescript
const User = $mol_data_record({
	name : $mol_data_string ,
	age : $mol_data_optional( $mol_data_integer ) ,
	phone : $mol_data_variant( $mol_data_string , $mol_data_integer ) ,
	mails : $mol_data_array( $mol_data_email ),
})

const evan = User({
	name: 'Evan',
	age: undefined,
	phone: 791234567890,
	mails: ['foo@example.org']
})

const john = User({
  name: 'John',
  age: 32,
  phone: 791234567890.1, // Not a string and Not an integer
  mails: ['foo@example.org']
})

const ann = User({
	name: 'Ann',
	age: 32,
	phone: 791234567890,
	mails: ['lol'] // Not a mail
})

const mary = User({
	name: 'Mary',
	age: 32,
	phone: false, // Type 'false' is not assignable to type 'string | number'
	mails: []
})
```
