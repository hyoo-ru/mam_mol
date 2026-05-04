namespace $ {

	/** Replaces properties of `Base` record by properties from `Over`. */
	export type $mol_type_override< Base , Over > = $mol_type_merge< Omit< Base , keyof Over > & Over >

}
