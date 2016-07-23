$mol_test( test => {
	test.equal( $mol_maybe( 0 )[0] , 0 )
	test.equal( $mol_maybe( false )[0] , false )
	test.equal( $mol_maybe( null )[0] , void 0 )
	test.equal( $mol_maybe( void 0 )[0] , void 0 )

	test.equal( $mol_maybe( void 0 ).map( v => v.toString() )[0] , void 0 )
	test.equal( $mol_maybe( 0 ).map( v => v.toString() )[0] , '0' )
} )
