$mol_test( test => {
	
	var set = new $mol_set_shim
	
	var obj1 = {}
	var obj2 = {}
	var obj3 = {}
	
	set.add( obj1 )
	set.add( obj2 )
	
	test.equal( set.size , 2 )
	test.ok( set.has( obj1 ) )
	test.ok( set.has( obj2 ) )
	test.not( set.has( obj3 ) )
	
	var entries = set.entries()
	test.equal( entries.length , 2 )
	test.equal( entries[0][0] , obj1 )
	test.equal( entries[0][1] , obj1 )
	test.equal( entries[1][0] , obj2 )
	test.equal( entries[1][1] , obj2 )
	
	set.delete( obj2 )
	test.not( set.has( obj2 ) )
	
} )
