/// Positive tests
$mol_test( test => {
	test.ok( 1 )
	test.not( 0 )
	test.equal( 2 , 2 )
	test.unique( [ 3 ] , [ 3 ] )
	test.done()
})
