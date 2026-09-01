# $mol_data_boolean

Checks for boolean and returns boolean type.

	const IsAdult = $mol_data_boolean
	const isAdult = IsAdult( false ) // ✅

	IsAdult( 0 ) // ❌ 0 is not a boolean
