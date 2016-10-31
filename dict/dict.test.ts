namespace $ {
	$mol_test({
		
		'dict shim must have equal api to native Map'() {
			var dict = new $mol_dict_shim
			
			var obj1 = {}
			var obj2 = {}
			var obj3 = {}
			
			dict.set( obj1 , 1 )
			dict.set( obj2 , 2 )
			
			$mol_assert_equal( dict.size , 2 )
			$mol_assert_ok( dict.has( obj1 ) )
			$mol_assert_ok( dict.has( obj2 ) )
			$mol_assert_not( dict.has( obj3 ) )
			
			$mol_assert_equal( dict.get( obj1 ) , 1 )
			$mol_assert_equal( dict.get( obj2 ) , 2 )
			$mol_assert_equal( dict.get( obj3 ) , void 0 )
			
			var entries = dict.entries()
			$mol_assert_equal( entries.length , 2 )
			$mol_assert_equal( entries[ 0 ][ 0 ] , obj1 )
			$mol_assert_equal( entries[ 0 ][ 1 ] , 1 )
			$mol_assert_equal( entries[ 1 ][ 0 ] , obj2 )
			$mol_assert_equal( entries[ 1 ][ 1 ] , 2 )
			
			dict.delete( obj2 )
			$mol_assert_not( dict.has( obj2 ) )
		}
		
	} )
}
