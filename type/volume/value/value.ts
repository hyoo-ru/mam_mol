namespace $ {

	/**
	 * Get value type by flat key name.
	 *
	 * 	// number
	 * 	type abc_type = $mol_type_volume_value< { a: { b: { c: number }; d: string }, 'a.b.c' } >
	 */
	export type $mol_type_volume_value< Type, Key extends string > =
		$mol_type_access< Type, Key > extends never
		? Key extends `${ infer Left }.${ infer Right }`
			? $mol_type_access< Type, Left > extends never
				? never
				: $mol_type_volume_value< $mol_type_access< Type, Left >, Right >
			: never
		: $mol_type_access< Type, Key >

}
