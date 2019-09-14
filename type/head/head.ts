/**
 * Returns first element of `Tuple`.
 * 
 * 	$mol_type_tail<[ 1 , 2 , 3 ]> // 1
 */
type $mol_type_head< Tuple extends readonly any[] >
	= Tuple[ 'length' ] extends 0
		? never
		: Tuple[0]
