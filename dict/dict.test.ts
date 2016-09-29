module $ {
	$mol_test( test => {
			
		var dict = new $mol_dict_shim
		
		var obj1 = {}
		var obj2 = {}
		var obj3 = {}
		
		dict.set( obj1 , 1 )
		dict.set( obj2 , 2 )
		
		test.equal( dict.size , 2 )
		test.ok( dict.has( obj1 ) )
		test.ok( dict.has( obj2 ) )
		test.not( dict.has( obj3 ) )
		
		test.equal( dict.get( obj1 ) , 1 )
		test.equal( dict.get( obj2 ) , 2 )
		test.equal( dict.get( obj3 ) , void 0 )
		
		var entries = dict.entries()
		test.equal( entries.length , 2 )
		test.equal( entries[ 0 ][ 0 ] , obj1 )
		test.equal( entries[ 0 ][ 1 ] , 1 )
		test.equal( entries[ 1 ][ 0 ] , obj2 )
		test.equal( entries[ 1 ][ 1 ] , 2 )
		
		dict.delete( obj2 )
			test.not( dict.has( obj2 ) )
			
	} )
}
