namespace $ {

	/**
	 * Keys, whose value type includes undefined
	 *
	 * 	// 'a'
	 * 	type undefined_keys = $mol_type_keys_undefined< { a: number | undefined; b: string } >
	 */
	export type $mol_type_keys_undefined< Type > =
		{
			[ Key in keyof Type ]:
				undefined extends Type[ Key ]
				? Key
				: never
		}[ keyof Type ]

}
