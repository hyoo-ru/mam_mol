namespace $ {

	/**
	 * Returns reversed `Tuple`.
	 * 
	 * 	$mol_type_reverse< [ 1 , 2 ,3 ] > // [ 3 , 2 , 1 ]
	 */
	export type $mol_type_reverse<
		Tuple extends readonly any[] ,
		Reversed extends readonly any[] = []
	> = {
		0: Reversed
		1: $mol_type_reverse<
			$mol_type_tail< Tuple > ,
			$mol_type_prepend< $mol_type_head< Tuple > , Reversed >
		>
	} [
		Tuple['length'] extends 0 ? 0 : 1
	]

}
