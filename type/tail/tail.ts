/**
 * Returns `Tuple` without first element.
 * 
 * 	$mol_type_tail<[ 1 , 2 , 3 ]> // [ 2, 3 ]
 */
type $mol_type_tail< Tuple extends readonly any[] >
	= (
		( ...tail : Tuple )=> any
	) extends (
		( head : any , ...tail : infer Tail )=> any
	)
		? Tail
		: never
