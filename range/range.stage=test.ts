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

/// Slice of lazy
$mol_test( test => {

	var list1 = $mol_range({ value : id => id * 2 , count : () => 3 })
	var list2 = $mol_range({ value : id => id * 3 , count : () => 3 })
	var list3 = $mol_range([ 11 , 22 , 33 ])

	test.equal( list1.concat( list2 , list3 ).join() , '0,2,4,0,3,6,11,22,33' )

} )

/// Every
$mol_test( test => {

	var list = $mol_range({ value : id => id * 2 , count : () => 3 })

	test.equal( list.every( v => v >= 0 ) , true )
	test.equal( list.every( v => v > 0 ) , false )

} )
