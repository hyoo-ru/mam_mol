/// Instantiation with overloading
$mol_test( test => {
	
	class X extends $mol_object {
		foo( ) {
			return 1
		}
	}
	
	var x = new X().setup( obj => {
		obj.foo = () => 2
	} )
	
	test.equal( x.foo() , 2 )
	
} )

/// Definition of objectPath
$mol_test( test => {
	
	var x = new $mol_object
	
	test.equal( x.objectPath() , void 0 )
	
	x.objectPath( 'foo' )
	test.equal( x.objectPath() , 'foo' )
	
	x.objectPath( 'bar' )
	test.equal( x.objectPath() , 'foo' )
	
} )
