namespace $ {

	/**
	 * Make field optional if it includes undefined
	 *
	 * 	// { a?: number | undefined; b: string }
	 * 	type optional = $mol_type_partial_undefined2< { a: number | undefined; b: string } >
	 */
	export type $mol_type_partial_undefined2< Type > =
		$mol_type_merge<
			$mol_type_override<
				Type,
				{
					[ Key in $mol_type_keys_extract< Type, any, undefined > ]?:
						Type[ Key ]
				}
			>
		>

}
