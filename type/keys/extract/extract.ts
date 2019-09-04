/**
 * Extracts keys from `Input` which values extends `Upper`, but not extends `Lower`.
 * 
 * 	type MathConstants = $mol_type_keys_extract< Math , never , number > // "E" | "PI" ...
 */
type $mol_type_keys_extract< Input , Lower , Upper >
	= {
		[ Field in keyof Input ] :
			Input[ Field ] extends Lower
			? never
			: Input[ Field ] extends Upper
				? Field
				: never
	}[ keyof Input ]
