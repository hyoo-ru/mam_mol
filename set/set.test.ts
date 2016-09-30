module $ {
	$mol_test( {
		
		'set-shim must have equal api to native Set'() {
			
			var set = new $mol_set_shim
			
			var obj1 = {}
			var obj2 = {}
			var obj3 = {}
			
			set.add( obj1 )
			set.add( obj2 )
			
			$mol_assert_equal( set.size , 2 )
			$mol_assert_ok( set.has( obj1 ) )
			$mol_assert_ok( set.has( obj2 ) )
			$mol_assert_not( set.has( obj3 ) )
			
			var entries = set.entries()
			$mol_assert_equal( entries.length , 2 )
			$mol_assert_equal( entries[ 0 ][ 0 ] , obj1 )
			$mol_assert_equal( entries[ 0 ][ 1 ] , obj1 )
			$mol_assert_equal( entries[ 1 ][ 0 ] , obj2 )
			$mol_assert_equal( entries[ 1 ][ 1 ] , obj2 )
			
			set.delete( obj2 )
			$mol_assert_not( set.has( obj2 ) )
		} ,
		
	} )
}
