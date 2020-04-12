namespace $ {

	/**
	 * Exclude keys from `Input` which values extends `Upper`.
	 * 
	 * 	type MathConstants = $mol_type_keys_exclude< Math , Function > // "E" | "PI" ...
	 */
	export type $mol_type_keys_exclude< Input , Upper > =
		Exclude< keyof Input , $mol_type_keys_extract< Input , Upper > >

}
