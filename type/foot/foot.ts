/**
 * Returns last element of `Tuple`.
 * 
 * 	$mol_type_tail<[ 1 , 2 , 3 ]> // 3
 */
type $mol_type_foot< Tuple extends readonly any[] >
	= Tuple[ 'length' ] extends 0
		? never
		: Tuple[ $mol_type_tail<Tuple>['length'] ]
	