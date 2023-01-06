# $mol_data_optional

Checks for undefined or passing given runtype.

	const Age = $mol_data_optional( $mol_data_integer )
	const age1 = Age( 18 ) // ✅
	const age2 = Age( undefined ) // ✅
	
	Age( 'xxx' ) // ❌ xxx is not a number
