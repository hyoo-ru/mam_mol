namespace $ {

	/**
	 * Returns `Tuple` pushed by `Item`.
	 * 
	 * 	$mol_type_tail< [ 1 , 2 ] , 3 > // [ 1 , 2 , 3 ]
	 */
	export type $mol_type_append<
		Tuple extends readonly any[] ,
		Item extends any
	> = [ ... Tuple, Item ]

}
