namespace $ {

	/**
	 * Make field optional if it includes undefined
	 *
	 * 	// { a?: number | undefined; b: string }
	 * 	type optional = $mol_type_partial_undefined2< { a: number | undefined; b: string } >
	 */
	export type $mol_type_partial_undefined2< T > =
		$mol_type_override<
			T,
			{
				[ K in $mol_type_keys_undefined< T > ]?:
					T[ K ]
			}
		>

}
