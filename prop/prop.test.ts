module $ {
	$mol_test( {
		
		'cached property with simple key'() {				
			
			class X extends $mol_object {
				@ $mol_prop()
				foo( id : number , ...diff : Array<Number|String> ) {
					if( diff[ 0 ] === void 0 ) return new Number( 123 )
					return new Number( diff[ 0 ] )
				}
			}
			var x = new X
			
			// get
			$mol_assert_equal( x.foo( 0 ).valueOf() , 123 )
			$mol_assert_equal( x.foo( 0 ) , x.foo( 0 ) )
			$mol_assert_unique( x.foo( 0 ) , x.foo( 1 ) )
			
			// set
			x.foo( 0 , 321 )
			$mol_assert_equal( x.foo( 0 ).valueOf() , 321 )
			
			// reset
			x.foo( 0 , void 0 )
			$mol_defer.run()
			$mol_assert_equal( x.foo( 0 ).valueOf() , 123 )
			
		} ,
		
		'cached property with complex key'() {
			
			class X extends $mol_object {
				@ $mol_prop()
				foo( ids : number[] ) {
					return Math.random()
				}
			}
			var x = new X
			
			$mol_assert_equal( x.foo( [ 0 , 1 ] ) , x.foo( [ 0 , 1 ] ) )
			$mol_assert_unique( x.foo( [ 0 , 1 ] ) , x.foo( [ 0 , 2 ] ) )
		} ,
		
		'auto sync of properties'() {
				
			class X extends $mol_object {
				
				@ $mol_prop()
				foo( ...diff : number[] ) {
					return diff[ 0 ] || 1
				}
				
				@ $mol_prop()
				bar() {
					return this.foo() + 1
				}
				
				@ $mol_prop()
				xxx() {
					return this.bar() + 1
				}
				
			}
			
			var x = new X
			$mol_assert_equal( x.bar() , 2 )
			$mol_assert_equal( x.xxx() , 3 )
			
			x.foo( 5 )
			$mol_assert_equal( x.xxx() , 7 )
		} ,
		
		'must fail on recursive dependency'() {
				
			class X extends $mol_object {
				
				@ $mol_prop()
				foo() : number {
					return this.foo() + 1
				}
				
			}
			
			var x = new X
			
			try {
				x.foo()
				$mol_assert_fail( 'Not tracked recursive dependency' )
			} catch( error ) {
				$mol_atom_restore( error )
				$mol_assert_equal( error.message , 'Recursive dependency! .foo()' )
			}
		} ,
		
		'must be destroyed if not more reference'() {
				
			var foo : any
			
			class B extends $mol_object {
				
				@ $mol_prop()
				showing( ...diff : boolean[] ) {
					if( diff[ 0 ] === void 0 ) return true
					return diff[ 0 ]
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
			$mol_assert_ok( bar )
			
			b.showing( false )
			b.bar()
			$mol_defer.run()
			$mol_assert_ok( foo.destroyed() )
			$mol_assert_ok( bar.destroyed() )
			$mol_assert_not( b.bar() )
			
			b.showing( true )
			$mol_defer.run()
			$mol_assert_unique( b.bar() , bar )
		} ,
		
		'wait for data'() {
			var name = 'Jin'
			
			class Test extends $mol_object {
				
				@ $mol_prop()
				source( ...diff : string[] ) : string {
					new $mol_defer(
						() => {
							this.source( void 0 , name )
						}
					)
					throw new $mol_atom_wait( 'Wait!' )
				}
				
				@ $mol_prop()
				middle() {
					return this.source()
				}
				
				@ $mol_prop()
				target() {
					return this.middle()
				}
				
			}
			
			var t = new Test
			
			try {
				t.target()
			} catch( error ) {
				$mol_assert_ok( error instanceof $mol_atom_wait )
				$mol_atom_restore( error )
			}
			
			$mol_defer.run()
			
			$mol_assert_equal( t.target() , 'Jin' )
			
			name = 'John'
			t.source( void 0 )
			
			try {
				t.target()
			} catch( error ) {
				$mol_assert_ok( error instanceof $mol_atom_wait )
				$mol_atom_restore( error )
			}
			
			$mol_defer.run()
			
			$mol_assert_equal( t.target() , 'John' )
		} ,
		
	} )
	
}
