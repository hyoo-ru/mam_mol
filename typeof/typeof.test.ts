module $ {
	$mol_test({
		
		'scalars'() {
			$mol_assert_equal( $mol_typeof( void 0 ) , 'Undefined' )
			$mol_assert_equal( $mol_typeof( null ) , 'Null' )
			$mol_assert_equal( $mol_typeof( 0 ) , 'Number' )
			$mol_assert_equal( $mol_typeof( '' ) , 'String' )
			$mol_assert_equal( $mol_typeof( false ) , 'Boolean' )
		} ,
		
		'common objects'() {
			$mol_assert_equal( $mol_typeof( {} ) , 'Object' )
			$mol_assert_equal( $mol_typeof( [] ) , 'Array' )
			$mol_assert_equal( $mol_typeof( arguments ) , 'Arguments' )
		} ,
		
		'special classes'() {
			$mol_assert_equal( $mol_typeof( new Date ) , 'Date' )
			$mol_assert_equal( $mol_typeof( new RegExp( '' ) ) , 'RegExp' )
		} ,
		
	})
	
}
