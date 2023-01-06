# $mol_data_number

Checks for number and returns number type.

	const Pos = $mol_data_number
	const pos = Pos( 1.25 ) // ✅

	Pos( 'xxx' ) // ❌ xxx is not a number
