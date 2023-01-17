# $mol_data_nominal

**Deprecated: Use [$mol_data_tagged](../tagged) instead**

Checks for given runtype and returns nominal version of returned type.

	const Weight = $mol_data_nominal({ Weight : $mol_data_integer })
	const Length = $mol_data_nominal({ Length : $mol_data_integer })
	
	let weight = Weight( 50 ) // ✅
	weight = Length( 50 ) // ❌ Type '"Weight"' is not assignable to type '"Length"'
