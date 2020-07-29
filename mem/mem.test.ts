namespace $ {
	$mol_test( {

		'Property method' ($) {

			class App extends $mol_object2 {

				static $ = $

				@ $mol_mem
				static value( next = 1 ) { return next + 1 }

			}

			$mol_assert_equal( App.value() , 2 )

			App.value( 2 )
			$mol_assert_equal( App.value() , 3 )

		} ,

		'auto sync of properties'($) {

			class X extends $mol_object2 {

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
			x.$ = $

			$mol_assert_equal( x.bar() , 2 )
			$mol_assert_equal( x.xxx() , 3 )

			x.foo( 5 )
			$mol_assert_equal( x.xxx() , 7 )
		} ,

		// 'must fail on recursive dependency'() {
		
		// 	class App extends $mol_object {
		
		// 		@ $mol_mem
		// 		static foo() : number {
		// 			return this.foo() + 1
		// 		}
		
		// 	}
		
		// 	$mol_assert_fail( ()=> App.foo() )

		// } ,

		async 'must be deferred destroyed when no longer referenced'($) {

			let foo : any
			let foo_destroyed = false

			class B extends $mol_object2 {

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
			b.$ = $

			var bar = b.bar()
			$mol_assert_ok( bar )

			b.showing( false )
			b.bar()

			await $mol_fiber_warp()
			$mol_assert_ok( foo_destroyed )
			$mol_assert_not( b.bar() )

			b.showing( true )
			$mol_defer.run()
			$mol_assert_unique( b.bar() , bar )
		} ,

		async 'wait for data'($) {

			class Test extends $mol_object2 {

				@ $mol_mem
				source() : string {
					return $mol_fiber_sync( ()=> new Promise< string >( done => done( 'Jin' ) ) )()
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
			t.$ = $

			$mol_assert_fail( ()=> t.target().valueOf() , Promise )

			await $mol_fiber_warp()

			$mol_assert_equal( t.target() , 'Jin' )
		} ,

	} )

}
