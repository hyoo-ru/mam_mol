/**
 * Picks keys from `Input` which values extends `Upper`, but not `Lower`.
 * 
 * 	type MathConstants = $mol_type_pick< Math , never , number > // { E , PI , ... }
 */
type $mol_type_pick< Input , Lower , Upper >
	= Pick<
		Input ,
		$mol_type_keys_extract< Input , Lower , Upper >
	>

