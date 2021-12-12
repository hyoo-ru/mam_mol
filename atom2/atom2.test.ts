// module $ {

// 	$mol_test({

// 		'Forget sub fibers on complete'( $ ) {

// 			class App extends $mol_object2 {

// 				static get $() { return $ }
// 				static counter = 0

// 				@ $mol_wire_method
// 				static count() { return this.counter ++ }

// 				@ $mol_atom2_field
// 				static data = 1
				
// 				@ $mol_atom2_field
// 				static get result() { return this.count() + this.data }
				
// 			}

// 			$mol_assert_equal( App.result , 1 )

// 			App.data = 2
// 			$mol_assert_equal( App.result , 3 )

// 		} ,

// 		async 'Do not destroy putted value'( $ ) {

// 			class App extends $mol_object2 {

// 				static get $() { return $ }

// 				@ $mol_atom2_field
// 				static source : number
				
// 				@ $mol_atom2_field
// 				static condition = true
				
// 				@ $mol_atom2_field
// 				static get target() {
// 					return this.condition ? this.source : 0
// 				}
				
// 			}

// 			App.source = 1
// 			$mol_assert_equal( App.target , 1 )
			
// 			App.condition = false
// 			$mol_assert_equal( App.target , 0 )
// 			await $mol_fiber_warp()
			
// 			App.condition = true
// 			$mol_assert_equal( App.target , 1 )

// 		} ,

// 		'Restore after error'( $ ) {

// 			class App extends $mol_object2 {

// 				static get $() { return $ }

// 				@ $mol_atom2_field
// 				static condition = false

// 				@ $mol_atom2_field
// 				static get broken() {
// 					if( this.condition ) $mol_fail( new Error( 'test error' ) )
// 					return 1
// 				}
				
// 				@ $mol_atom2_field
// 				static get result() { return this.broken }
				
// 			}

// 			$mol_assert_equal( App.result , 1 )
			
// 			App.condition = true
// 			$mol_assert_fail( ()=> App.result )
			
// 			App.condition = false
// 			$mol_assert_equal( App.result , 1 )

// 		} ,
	
// 		async 'auto fresh only when alive'( $ ) {

// 			let state = 1

// 			const monitor = new $.$mol_atom2
// 			monitor.$ = $
// 			monitor.calculate = ()=> {
// 				new $.$mol_after_frame( $mol_atom2.current!.fresh )
// 				return state
// 			}
// 			$mol_assert_equal( monitor.get() , 1 )
			
// 			state = 2
// 			$mol_assert_equal( monitor.get() , 1 )
				
// 			$.$mol_after_mock_warp()
// 			$mol_assert_equal( monitor.get() , 2 )
			
// 			state = 3
// 			$mol_assert_equal( monitor.get() , 2 )
			
// 			monitor.destructor()
// 			$mol_assert_equal( monitor.value , undefined )
			
// 			$.$mol_after_mock_warp()
// 			await $.$mol_fiber_warp()
// 			$mol_assert_equal( monitor.value , undefined )
			
// 		} ,

// 	// 	'thenable interface: wait for value' () {
// 	// 		$mol_fiber_warp()
			
// 	// 		const source = new $mol_atom2( 'source', ()=> {
// 	// 			return $mol_fiber_async<number>( back => {
// 	// 				new $mol_defer( back( ()=> 777 ) )
// 	// 			} )
// 	// 		} )

// 	// 		const target = source.then( val => val.toString() )
			
// 	// 		$mol_assert_fail( ()=> target.value().valueOf() , $mol_fiber_wait.constructor )

// 	// 		$mol_defer.run() ; $mol_fiber_warp() ; $mol_atom2.sync()

// 	// 		$mol_assert_equal( target.value() , '777' )
// 	// 	} ,
		
// 	// 	'thenable interface: negative' () {
// 	// 		$mol_fiber_warp()
			
// 	// 		const TestError = class extends Error {}

// 	// 		const source = new $mol_atom2( 'source', ()=> {
// 	// 			return $mol_fiber_async<number>( back => {
// 	// 				new $mol_defer( back( ()=> {
// 	// 					throw new TestError( 'Test error' )
// 	// 				} ) )
// 	// 			} )
// 	// 		} )

// 	// 		const target = source.then( val => val.toString() )
			
// 	// 		$mol_assert_fail( ()=> target.value().valueOf() , $mol_fiber_wait.constructor )
			
// 	// 		$mol_defer.run()
			
// 	// 		$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
// 	// 		$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
// 	// 		$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
// 	// 		$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )

// 	// 		$mol_assert_fail( ()=> target.value().valueOf() , TestError )
// 	// 	} ,
		
// 	})
	
// }
