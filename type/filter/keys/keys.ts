namespace $ {

	/**
	 * Leave types with specified keys in union type
	 *
	 * 	// { prop: number; foo: number }
	 * 	type only_with_prop = $mol_type_filter_keys< { prop: number; foo: number } | { foo: string }, 'prop' >
	 */
	export type $mol_type_filter_keys< T, K extends string | number > =
		Extract<
			T,
			{
				[ _ in K ]?: any
			}
		>

}
