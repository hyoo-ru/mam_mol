# $mol_data_tagged

Checks for given runtype and returns tagged version of returned type.

	const { Weight, Length } = $mol_data_tagged({
		Weight: $mol_data_integer,
		Length: $mol_data_integer,
	})
	
	let weight = Weight( 50 ) // ✅
	weight = Length( 50 ) // ❌ Type '"Weight"' is not assignable to type '"Length"'
