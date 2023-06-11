# $mol_data_record

Checks for record of given fields with by its runtypes and returns expected type.

	const Person = $mol_data_record({
		name: $mol_data_string,
		age: $mol_data_integer,
	})
	const person = Person({ name: 'jin', age: 100 }) // ✅
	
	Person({ name: 'jin' }) // ❌ ["age"] undefined is not a number
