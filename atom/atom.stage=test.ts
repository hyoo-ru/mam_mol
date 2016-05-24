/// Cached property with simple key
$mol_test( test => {
	
	class X extends $mol_object {
		@ $mol_atom()
		foo( id : number , diff? : Array<Number|String> ) {
			return diff ? new Number( diff[0] ) : new Number( 123 )
		}
	}
	var x = new X

	// get
	test.equal( x.foo(0).valueOf() , 123 )
	test.equal( x.foo(0) , x.foo(0) )
	test.unique( x.foo(0) , x.foo(1) )
	
	// set
	x.foo( 0 , [ 321 ] )
	test.equal( x.foo(0).valueOf() , 321 )
	
	// reset
	x.foo( 0 , null )
	$mol_atom_sync()
	test.equal( x.foo(0).valueOf() , 123 )
	
} )

/// Cached property with complex key
$mol_test( test => {
	
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

/// Automatic state synchronization
$mol_test( test => {
	
	class X extends $mol_object {
		
		@ $mol_atom()
		foo( id : number , diff? : number[] ) {
			return diff ? diff[0] : 1
		}
		
		@ $mol_atom()
		bar( id : number ) {
			return this.foo( id ) + 1
		}
		
		@ $mol_atom()
		xxx( id : number ) {
			return this.bar( id ) + 1
		}
		
	}
	
	var x = new X
	test.equal( x.bar(0) , 2 )
	test.equal( x.xxx(0) , 3 )
	
	x.foo( 0 , [ 5 ] )
	test.equal( x.bar(0) , 2 )
	test.equal( x.xxx(0) , 3 )
	
	$mol_atom_sync()
	test.equal( x.bar(0) , 6 )
	test.equal( x.xxx(0) , 7 )
	
} )

/// Recursive dependency
$mol_test( test => {
	
	class X extends $mol_object {
		
		@ $mol_atom()
		foo( id : number ) {
			return this.foo( id ) + 1
		}
		
	}
	
	var x = new X
	
	try {
		x.foo( 0 )
		test.fail( 'Not tracked recursive dependency' )
	} catch( error ) {
		test.equal( error.message , 'Recursive dependency! undefined.foo(0)' )
	}
	
} )

/// Destroy if no more reference
$mol_test( test => {
	
	var destroyed = false
	class A extends $mol_object {
		destroy() {
			destroyed = true
		}
	}
	
	class B extends $mol_object {
		
		@ $mol_atom()
		showing( id : number , diff? : boolean[] ) {
			return diff ? diff[0] : true
		}
		
		@ $mol_atom()
		foo( id : number ) {
			return new A
		}
		
		@ $mol_atom()
		bar( id : number ) {
			return this.showing( id ) ? this.foo( id ) : null
		}
		
	}
	
	var b = new B
	
	var bar = b.bar(0)
	test.ok( bar )
	
	b.showing( 0 , [ false ] )
	$mol_atom_sync()
	test.ok( destroyed )
	test.not( b.bar(0) )
	
	b.showing( 0 , [ true ] )
	$mol_atom_sync()
	test.unique( b.bar(0) , bar )
	
} )
