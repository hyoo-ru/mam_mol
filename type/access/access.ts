namespace $ {

	/**
	 * Access property type by key for union type
	 *
	 * 	// number
	 * 	type a_type = $mol_type_access< { a: number } | boolean, 'a' >
	 */
	export type $mol_type_access< Type, Keys extends string | number > =
		$mol_type_filter_keys< Type, Keys > extends never
		? never
		:
			Keys extends keyof $mol_type_filter_keys< Type, Keys >
			? $mol_type_filter_keys< Type, Keys >[ Keys ]
			: never

}
