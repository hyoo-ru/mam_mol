# $mol_data

Defines DTO with compiletime/runtime validation.

# Usage example

```typescript
const User = $mol_data_record({
	name : $mol_data_string ,
	age : $mol_data_optional( $mol_data_integer ) ,
	phone : $mol_data_variant( $mol_data_string , $mol_data_integer ) ,
	mails : $mol_data_array( $mol_data_email ),
	get wife() { return $mol_data_optional( User ) }
})

const ann = User({
	name : 'Ann' ,
	age : undefined ,
	phone : 791234567890,
	mails : ['foo@example.org'] ,
	wife : undefined ,
})

const evan = User({
	name : 'Evan',
	age : 22,
	phone : 791234567890 ,
	mails : ['lol'] , // Not a mail
	wife : ann ,
})

const john = User({
	name : 'John' ,
	age : 32 ,
	phone : 791234567890.1 , // Not a string and Not an integer
	mails : ['foo@example.org'] ,
	wife : undefined ,
})

const mary = User({
	name: 'Mary',
	age: 32,
	phone: false, // Type 'false' is not assignable to type 'string | number'
	mails: [] ,
	wife : undefined ,
})
```
