namespace $ {

	$mol_test({

		async 'Autorun' ($) {

			class App extends $mol_object2 {

				static $ = $

				@ $mol_mem
				static state( next = 1 ) { return next }
				
				static counter = 0

				@ $mol_mem
				static init() {
					++ this.counter
					return this.state()
				}

			}

			const autorun = $mol_atom2_autorun( ()=> App.init() )
			autorun.$ = $

			try {

				await $mol_fiber_warp()
				$mol_assert_equal( App.counter , 1 )
				
				App.state( 2 )
				$mol_assert_equal( App.counter , 1 )

				await $mol_fiber_warp()
				$mol_assert_equal( App.counter , 2 )
				
				App.state( 3 )

			} finally {
				autorun.destructor()
			}

			App.state( 4 )
			await $mol_fiber_warp()
			$mol_assert_equal( App.counter , 2 )

		} ,

	})

}
