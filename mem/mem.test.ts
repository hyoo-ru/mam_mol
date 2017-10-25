namespace $ {
	$mol_test( {

		'cached property with simple key'() {				

			class X extends $mol_object {
				@ $mol_mem_key
				foo( id : number , next? : Number ) {
					if( next == null ) return new Number( 123 )
					return new Number( next )
				}
			}
			const x = new X

			// get
			$mol_assert_equal( x.foo( 0 ).valueOf() , 123 )
			$mol_assert_equal( x.foo( 0 ) , x.foo( 0 ) )
			$mol_assert_unique( x.foo( 0 ) , x.foo( 1 ) )

			// set
			x.foo( 0 , 321 )
			$mol_assert_equal( x.foo( 0 ).valueOf() , 321 )

			// reset
			x.foo( 0 , null )
			
			$mol_assert_equal( x.foo( 0 ).valueOf() , 123 )

		} ,

		'cached property with complex key'() {

			class X extends $mol_object {
				@ $mol_mem_key
				foo( ids : number[] ) {
					return Math.random()
				}
			}
			const x = new X

			$mol_assert_equal( x.foo( [ 0 , 1 ] ) , x.foo( [ 0 , 1 ] ) )
			$mol_assert_unique( x.foo( [ 0 , 1 ] ) , x.foo( [ 0 , 2 ] ) )
		} ,

		'auto sync of properties'() {

			class X extends $mol_object {

				@ $mol_mem
				foo( next? : number ) {
					return next || 1
				}

				@ $mol_mem
				bar() {
					return this.foo() + 1
				}

				@ $mol_mem
				xxx() {
					return this.bar() + 1
				}

			}

			const x = new X
			$mol_assert_equal( x.bar() , 2 )
			$mol_assert_equal( x.xxx() , 3 )

			x.foo( 5 )
			$mol_assert_equal( x.xxx() , 7 )
		} ,

		//'must fail on recursive dependency'() {
		//
		//	class X extends $mol_object {
		//
		//		@ $mol_prop()
		//		foo() : number {
		//			return this.foo() + 1
		//		}
		//
		//	}
		//
		//	var x = new X
		//
		//	try {
		//		x.foo().valueOf()
		//		$mol_assert_fail( 'Not tracked recursive dependency' )
		//	} catch( error ) {
		//		$mol_assert_equal( error.message , 'Recursive dependency! .foo()' )
		//	}
		//} ,

		'must be deferred destroyed when no longer referenced'() {

			let foo : any
			let foo_destroyed = false

			class B extends $mol_object {

				@ $mol_mem
				showing( next? : boolean ) {
					if( next === void 0 ) return true
					return next
				}

				@ $mol_mem
				foo() {
					return foo = new class extends $mol_object {
						destructor() {
							foo_destroyed = true
						}
					}
				}

				@ $mol_mem
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
			$mol_assert_ok( foo_destroyed )
			$mol_assert_not( b.bar() )

			b.showing( true )
			$mol_defer.run()
			$mol_assert_unique( b.bar() , bar )
		} ,

		'wait for data'() {

			class Test extends $mol_object {

				@ $mol_mem
				source( next? : string , force? : $mol_atom_force ) : string {
					new $mol_defer( () => {
						this.source( 'Jin' , $mol_atom_force_cache )
					} )
					throw new $mol_atom_wait( 'Wait for data!' )
				}

				@ $mol_mem
				middle() {
					return this.source()
				}

				@ $mol_mem
				target() {
					return this.middle()
				}

			}

			const t = new Test

			$mol_assert_fail( ()=> t.target().valueOf() , $mol_atom_wait )

			$mol_defer.run()

			$mol_assert_equal( t.target() , 'Jin' )
		} ,

	} )

}
