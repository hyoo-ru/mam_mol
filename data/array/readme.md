# $mol_data_array

Checks for array of given runtype and returns expected type.

	const Samples = $mol_data_array( $mol_data_number )
	const samples = Samples( [ 1, 2, 3, 4, 5 ] ) // ✅
	
	Samples([ 1, 'foo' ]) // ❌ [1] foo is not a number
