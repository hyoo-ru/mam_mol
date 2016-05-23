/// Cached property with simple key
new $jin2_test( test => {
	
	class X extends $mol_object {
		@ $mol_atom()
		foo( id : number , next? : Number|String ) {
			if( next !== void 0 ) return new Number( next )
			return new Number( 123 )
		}
	}
	var x = new X

	// get
	test.equal( x.foo(0).valueOf() , 123 )
	test.equal( x.foo(0) , x.foo(0) )
	test.unique( x.foo(0) , x.foo(1) )
	
	// set
	x.foo( 0 , 321 )
	test.equal( x.foo(0).valueOf() , 321 )
	
	// reset
	x.foo( 0 , void 0 )
	test.equal( x.foo(0).valueOf() , 123 )
	
} )

/// Cached property with complex key
new $jin2_test( test => {
	
	class X extends $mol_object {
		@ $mol_atom()
		foo( ids : number[] ) {
			return Math.random()
		}
	}
	var x = new X
	
	test.equal( x.foo([ 0 , 1 ]) , x.foo([ 0 , 1 ]) )
	test.unique( x.foo([ 0 , 1 ]) , x.foo([ 0 , 2 ]) )
	
} )
