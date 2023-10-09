namespace $ {

	/**
	 * Overwrite `Tuple` first element.
	 *
	 * 	// [ 'd', 'b', 'c' ]
	 * 	$mol_type_head_write< [ 'a', 'b', 'c' ], 'd' >
	 */
	export type $mol_type_head_write<
		Tuple extends Array< any >,
		Over
	> =
		[ Over, ... $mol_type_tail< Tuple > ]


}
