namespace $ {

	/**
	 * Get value type by flat key name.
	 *
	 * 	// number
	 * 	type abc_type = $mol_type_volume_value< { a: { b: { c: number }; d: string }, 'a.b.c' } >
	 */
	export type $mol_type_volume_value< T, K extends string | number > =
		$mol_type_access< T, K > extends never
		? K extends `${ infer Left }.${ infer Right }`
			? $mol_type_access< T, Left > extends never
				? never
				: $mol_type_volume_value< $mol_type_access< T, Left >, Right >
			: never
		: $mol_type_access< T, K >

}
