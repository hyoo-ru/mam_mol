namespace $ {

	/**
	 * Keys, whose value type includes undefined
	 *
	 * 	// 'a'
	 * 	type undefined_keys = $mol_type_keys_undefined< { a: number | undefined; b: string } >
	 */
	export type $mol_type_keys_undefined< T > =
		{
			[ K in keyof T ]:
				undefined extends T[ K ]
				? K
				: never
		}[ keyof T ]

}
