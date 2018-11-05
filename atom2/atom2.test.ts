module $ {

	$mol_test({

		'Simple property' () {

			class App extends $mol_object2 {

				@ $mol_atom2_field
				static value = 1

			}

			$mol_assert_equal( App.value , 1 )

			App.value = 2
			$mol_assert_equal( App.value , 2 )

		} ,

		'Instant actualization' () {

			class Source extends $mol_object2 {

				@ $mol_atom2_field
				get value() { return 1 }
				set value( next ) {}

			}

			class App extends $mol_object2 {

				@ $mol_atom2_field
				static get source() { return Source.make() }
				
				@ $mol_atom2_field
				static get value() { return this.source.value + 1 }
				
			}

			$mol_assert_equal( App.value , 2 )

			App.source.value = 2
			$mol_assert_equal( App.value , 3 )

		} ,

		'Do not recalc slaves on equal changes' () {

			class App extends $mol_object2 {

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

		'Branch switching' () {

			class App extends $mol_object2 {
				
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

		'Forbidden self invalidation' () {

			class App extends $mol_object2 {
				
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

		'Side effect inside computation' () {

			class App extends $mol_object2 {
				
				@ $mol_atom2_field
				static first = 1

				@ $mol_fiber_method
				static increase() { return ++ this.first }
				
				@ $mol_atom2_field
				static get result() {
					return this.increase() + 1
				}
				
			}

			$mol_assert_equal( App.result , 3 )

		} ,

		'Forbidden cyclic dependency' () {

			class App extends $mol_object2 {
				
				@ $mol_atom2_field
				static get first() : number { return this.second - 1 }

				@ $mol_atom2_field
				static get second() : number { return this.first + 1 }
				
			}

			$mol_assert_fail( ()=> App.first )

		} ,

		'Forget sub fibers on complete' () {

			class App extends $mol_object2 {

				static counter = 0

				@ $mol_fiber_method
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

		async 'Automatic destroy owned value on self destruction' () {

			let counter = 0

			class Having extends $mol_object2 {
				destructor() { counter++ }
			}

			class App extends $mol_object2 {

				@ $mol_atom2_field
				static get having() { return Having.make() }
				
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

			await $mol_fiber_warp()

			$mol_assert_equal( counter , 1 )

		} ,

		'Restore after error' () {

			class App extends $mol_object2 {

				@ $mol_atom2_field
				static condition = false

				@ $mol_atom2_field
				static get broken() {
					if( this.condition ) throw new Error( 'test error' )
					return 1
				}
				static set broken( next : number ) {}
				
				@ $mol_atom2_field
				static get result() { return this.broken }
				
			}

			$mol_assert_equal( App.result , 1 )
			
			App.condition = true
			$mol_assert_fail( ()=> App.result )
			
			App.broken = 1
			$mol_assert_equal( App.result , 1 )

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
