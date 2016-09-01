/// Cached property with simple key
$mol_test( test => {
	
	class X extends $mol_object {
		@ $mol_prop()
		foo( id : number , ...diff : Array<Number|String> ) {
			if( diff[0] === void 0 ) return new Number( 123 )
			return new Number( diff[0] )
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
	$mol_defer.run()
	test.equal( x.foo(0).valueOf() , 123 )
	
} )

/// Cached property with complex key
$mol_test( test => {
	
	class X extends $mol_object {
		@ $mol_prop()
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
		
		@ $mol_prop()
		foo( ...diff : number[] ) {
			return diff[0] || 1
		}
		
		@ $mol_prop()
		bar( ) {
			return this.foo() + 1
		}
		
		@ $mol_prop()
		xxx( ) {
			return this.bar() + 1
		}
		
	}
	
	var x = new X
	test.equal( x.bar() , 2 )
	test.equal( x.xxx() , 3 )
	
	x.foo( 5 )
	test.equal( x.xxx() , 7 )
	
} )

/// Recursive dependency
$mol_test( test => {
	
	class X extends $mol_object {
		
		@ $mol_prop()
		foo() {
			return this.foo() + 1
		}
		
	}
	
	var x = new X
	
	try {
		x.foo()
		test.fail( 'Not tracked recursive dependency' )
	} catch( error ) {
		$mol_atom_restore( error )
		test.equal( error.message , 'Recursive dependency! .foo()' )
	}
	
} )

/// Destroy if no more reference
$mol_test( test => {
	
	var foo
	
	class B extends $mol_object {
		
		@ $mol_prop()
		showing( ...diff : boolean[] ) {
			if( diff[0] === void 0 ) return true
			return diff[0]
		}
		
		@ $mol_prop()
		foo() {
			return foo = new $mol_object
		}
		
		@ $mol_prop()
		bar() {
			return this.showing() ? this.foo() : null
		}
		
	}
	
	var b = new B
	
	var bar = b.bar()
	test.ok( bar )
	
	b.showing( false )
	b.bar()
	$mol_defer.run()
	test.ok( foo.destroyed() )
	test.ok( bar.destroyed() )
	test.not( b.bar() )
	
	b.showing( true )
	$mol_defer.run()
	test.unique( b.bar() , bar )
	
} )
