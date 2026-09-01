# $mol_data_integer

Checks for integer and returns number type.

	const Age = $mol_data_integer
	const age = Age( 18 ) // ✅

	Age( 18.5 ) // ❌ 18.5 is not an integer
