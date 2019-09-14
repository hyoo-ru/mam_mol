namespace $ {

	/**
	 * Omit keys from `Input` which values extends `Upper`, but not `Lower`.
	 * 
	 * 	type MathConstants = $mol_type_omit< Math , never , Function > // { E , PI , ... }
	 */
	export type $mol_type_omit< Input , Lower , Upper > =
		Pick<
			Input ,
			$mol_type_keys_exclude< Input , Lower , Upper >
		>

}
