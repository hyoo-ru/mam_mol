/// Slice of lazy
$mol_test( test => {
	
	var list = $mol_range({ value : id => id * 2 , count : () => Number.POSITIVE_INFINITY })
	list = list.slice( 2 , 5 )
	
	test.equal( list.join() , '4,6,8' )
	
} )

/// Slice of array
$mol_test( test => {

	var list = $mol_range([ 1 , 2 , 3 , 4 , 5 , 6 , 7 ])
	list = list.slice( 2 , 5 )

	test.equal( list.join() , '3,4,5' )

} )
