namespace $ {

	/**
	 * Leave types with specified keys in union type
	 *
	 * 	// { prop: number; foo: number }
	 * 	type only_with_prop = $mol_type_filter_keys< { prop: number; foo: number } | { foo: string }, 'prop' >
	 */
	export type $mol_type_filter_keys< Type, Keys extends string | number > =
		Extract<
			Type,
			{
				[ _ in Keys ]?: any
			}
		>

}
