namespace $ {

	/** Replaces properties of `Base` record by properties from `Over`. */
	export type $mol_type_override< Base , Over > = Omit< Base , keyof Over > & Over

}
