namespace $ {

	/**
	 * Get property type by folded key name
	 *
	 * 	type abc_type = $mol_type_unfold< { a: { b: { c: number }, d: string }, 'a.b.c' } > // number
	 */
	export type $mol_type_unfold< T, K extends string | number > =
		$mol_type_access< T, K > extends never
		? K extends `${ infer Left }.${ infer Right }`
			? $mol_type_access< T, Left > extends never
				? never
				: $mol_type_unfold< $mol_type_access< T, Left >, Right >
			: never
		: $mol_type_access< T, K >

}
