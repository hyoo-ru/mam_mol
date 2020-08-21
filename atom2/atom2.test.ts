module $ {

	$mol_test({

		'Value has js-path name' () {

			class App extends $mol_object2 {

				@ $mol_atom2_field
				static get title() { return new $mol_object2 }

			}

			$mol_assert_equal( `${ App.title }` , 'App.title' )

		} ,

		'Simple property' () {

			class App extends $mol_object2 {

				@ $mol_atom2_field
				static value = 1

			}

			$mol_assert_equal( App.value , 1 )

			App.value = 2
			$mol_assert_equal( App.value , 2 )

		} ,

		'Instant actualization'( $ ) {

			class Source extends $mol_object2 {
				
				// Because context sets after field initializer
				get $() { return $ }

				@ $mol_atom2_field
				value = 1

				destructor() {}

			}

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_atom2_field
				static get source() { return Source.create() }
				
				@ $mol_atom2_field
				static get value() { return this.source.value + 1 }
				
			}

			$mol_assert_equal( App.value , 2 )

			App.source.value = 2
			$mol_assert_equal( App.value , 3 )

		} ,

		'Access to cached value'( $ ) {

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_atom2_field
				static get value() { return 1 }

			}

			$mol_assert_equal( $mol_atom2_value( ()=> App.value ) , undefined )

			$mol_assert_equal( App.value , 1 )
			$mol_assert_equal( $mol_atom2_value( ()=> App.value ) , 1 )

		} ,

		'Do not recalc slaves on equal changes'( $ ) {

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_atom2_field
				static first = [1]

				static counter = 0

				@ $mol_atom2_field
				static get result() { return this.first[0] + this.counter++ }
				
			}

			$mol_assert_equal( App.result , 1 )

			App.first = [1]
			$mol_assert_equal( App.result , 1 )

		} ,

		'Do not recalc grand slave on equal direct slave result '( $ ) {

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_atom2_field
				static first = 1

				@ $mol_atom2_field
				static get second() { return Math.abs( this.first ) }

				static counter = 0

				@ $mol_atom2_field
				static get result() { return this.second + ++this.counter }
				
			}

			$mol_assert_equal( App.result , 2 )

			App.first = -1
			$mol_assert_equal( App.result , 2 )

		} ,

		'Recalc when [not changed master] changes [following master]'( $ ) {

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_atom2_field
				static first = 1

				@ $mol_atom2_field
				static get second() {
					this.third = this.first
					return 0
				}

				@ $mol_atom2_field
				static third = 0

				static counter = 0

				@ $mol_atom2_field
				static get result() { return this.second + this.third + ++this.counter }
				
			}

			$mol_assert_equal( App.result , 2 )

			App.first = 5
			$mol_assert_equal( App.result , 7 )

		} ,

		'Branch switching'( $ ) {

			class App extends $mol_object2 {
				
				static get $() { return $ }

				@ $mol_atom2_field
				static first = 1
				
				@ $mol_atom2_field
				static get second() { return 2 }
				
				@ $mol_atom2_field
				static condition = true
				
				static counter = 0

				@ $mol_atom2_field
				static get result() {
					return ( this.condition ? this.first : this.second ) + this.counter++
				}
				
			}

			$mol_assert_equal( App.result , 1 )

			App.condition = false
			$mol_assert_equal( App.result , 3 )

			App.first = 10
			$mol_assert_equal( App.result , 3 )

		} ,

		'Forbidden self invalidation'( $ ) {

			class App extends $mol_object2 {
				
				static get $() { return $ }

				@ $mol_atom2_field
				static first = 1

				@ $mol_atom2_field
				static get second() { return this.first + 1 }
				
				@ $mol_atom2_field
				static get result() {
					this.second
					return this.first ++
				}
				
			}

			$mol_assert_fail( ()=> App.result )

		} ,

		'Side effect inside computation'( $ ) {

			class App extends $mol_object2 {
				
				static get $() { return $ }

				@ $mol_atom2_field
				static first = 1

				@ $mol_fiber.method
				static increase() { return ++ this.first }
				
				@ $mol_atom2_field
				static get result() {
					return this.increase() + 1
				}
				
			}

			$mol_assert_equal( App.result , 3 )

		} ,

		'Forbidden cyclic dependency'( $ ) {

			class App extends $mol_object2 {
				
				static get $() { return $ }

				@ $mol_atom2_field
				static get first() : number { return this.second - 1 }

				@ $mol_atom2_field
				static get second() : number { return this.first + 1 }
				
			}

			$mol_assert_fail( ()=> App.first )

		} ,

		'Forget sub fibers on complete'( $ ) {

			class App extends $mol_object2 {

				static get $() { return $ }
				static counter = 0

				@ $mol_fiber.method
				static count() { return this.counter ++ }

				@ $mol_atom2_field
				static data = 1
				
				@ $mol_atom2_field
				static get result() { return this.count() + this.data }
				
			}

			$mol_assert_equal( App.result , 1 )

			App.data = 2
			$mol_assert_equal( App.result , 3 )

		} ,

		async 'Automatic destroy owned value on self destruction'( $ ) {

			let counter = 0

			class Having extends $mol_object2 {
				destructor() { counter++ }
			}

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_atom2_field
				static get having() { return Having.create() }
				
				@ $mol_atom2_field
				static condition = true
				
				@ $mol_atom2_field
				static get result() {
					if( this.condition ) this.having
					return 0
				}
				
			}

			App.result
			App.condition = false
			App.result

			$mol_assert_equal( counter , 0 )

			await $mol_fiber_warp()
			$mol_assert_equal( counter , 1 )

		} ,

		async 'Do not destroy putted value'( $ ) {

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_atom2_field
				static source : number
				
				@ $mol_atom2_field
				static condition = true
				
				@ $mol_atom2_field
				static get target() {
					return this.condition ? this.source : 0
				}
				
			}

			App.source = 1
			$mol_assert_equal( App.target , 1 )
			
			App.condition = false
			$mol_assert_equal( App.target , 0 )
			await $mol_fiber_warp()
			
			App.condition = true
			$mol_assert_equal( App.target , 1 )

		} ,

		'Restore after error'( $ ) {

			class App extends $mol_object2 {

				static get $() { return $ }

				@ $mol_atom2_field
				static condition = false

				@ $mol_atom2_field
				static get broken() {
					if( this.condition ) $mol_fail( new Error( 'test error' ) )
					return 1
				}
				
				@ $mol_atom2_field
				static get result() { return this.broken }
				
			}

			$mol_assert_equal( App.result , 1 )
			
			App.condition = true
			$mol_assert_fail( ()=> App.result )
			
			App.condition = false
			$mol_assert_equal( App.result , 1 )

		} ,
	
		async 'auto fresh only when alive'( $ ) {

			let state = 1

			const monitor = new $.$mol_atom2
			monitor.$ = $
			monitor.calculate = ()=> {
				new $.$mol_after_frame( $mol_atom2.current!.fresh )
				return state
			}
			$mol_assert_equal( monitor.get() , 1 )
			
			state = 2
			$mol_assert_equal( monitor.get() , 1 )
				
			$.$mol_after_mock_warp()
			$mol_assert_equal( monitor.get() , 2 )
			
			state = 3
			$mol_assert_equal( monitor.get() , 2 )
			
			monitor.destructor()
			$mol_assert_equal( monitor.value , undefined )
			
			$.$mol_after_mock_warp()
			await $.$mol_fiber_warp()
			$mol_assert_equal( monitor.value , undefined )
			
		} ,

	// 	'thenable interface: wait for value' () {
	// 		$mol_fiber_warp()
			
	// 		const source = new $mol_atom2( 'source', ()=> {
	// 			return $mol_fiber_async<number>( back => {
	// 				new $mol_defer( back( ()=> 777 ) )
	// 			} )
	// 		} )

	// 		const target = source.then( val => val.toString() )
			
	// 		$mol_assert_fail( ()=> target.value().valueOf() , $mol_fiber_wait.constructor )

	// 		$mol_defer.run() ; $mol_fiber_warp() ; $mol_atom2.sync()

	// 		$mol_assert_equal( target.value() , '777' )
	// 	} ,
		
	// 	'thenable interface: negative' () {
	// 		$mol_fiber_warp()
			
	// 		const TestError = class extends Error {}

	// 		const source = new $mol_atom2( 'source', ()=> {
	// 			return $mol_fiber_async<number>( back => {
	// 				new $mol_defer( back( ()=> {
	// 					throw new TestError( 'Test error' )
	// 				} ) )
	// 			} )
	// 		} )

	// 		const target = source.then( val => val.toString() )
			
	// 		$mol_assert_fail( ()=> target.value().valueOf() , $mol_fiber_wait.constructor )
			
	// 		$mol_defer.run()
			
	// 		$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
	// 		$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
	// 		$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
	// 		$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )

	// 		$mol_assert_fail( ()=> target.value().valueOf() , TestError )
	// 	} ,
		
	})
	
}
