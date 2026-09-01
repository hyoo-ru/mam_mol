# $mol_data_nullable

Checks for null or passing given runtype.

	const Age = $mol_data_nullable( $mol_data_integer )
	const age1 = Age( 18 ) // ✅
	const age2 = Age( null ) // ✅
	
	Age( 'xxx' ) // ❌ xxx is not a number
