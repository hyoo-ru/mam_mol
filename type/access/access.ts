namespace $ {

	/**
	 * Access property type by key for union type
	 *
	 * 	// number
	 * 	type a_type = $mol_type_access< { a: number } | boolean, 'a' >
	 */
	export type $mol_type_access< T, K extends string | number > =
		$mol_type_filter_keys< T, K > extends never
		? never
		:
			K extends keyof $mol_type_filter_keys< T, K >
			? $mol_type_filter_keys< T, K >[ K ]
			: never

}
