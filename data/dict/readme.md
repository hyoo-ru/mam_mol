# $mol_data_dict

Checks for dictionary which maps strings to given runtype and returns expected type.

	const Names = $mol_data_dict( $mol_data_string )
	const names = Names({ jin: 'Jin', john: 'John' }) // ✅
	
	Names({ jin: 'Jin', john: 5 }) // ❌ ["john"] 5 is not a string
