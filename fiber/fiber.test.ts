namespace $ {

	$mol_test({

		'synchronous task'() {
			$mol_fiber_warp()

			const task1 = $mol_fiber_func( ()=> 1 )
			const task2 = $mol_fiber_func( ()=> task1() + 1 )
			
			$mol_assert_equal( task2() , 2 )
		} ,

		'wrapped in wrapped in wrapped'() {
			$mol_fiber_warp()
			
			const history = [] as number[]

			const log = ( val : number ) : number => {
				return $mol_fiber_async( back => {
					new $mol_defer( back( ()=> {
						history.push( val )
						return val
					} ) )
				} )
			}

			const subtask =  $mol_fiber_func( ( val : number )=> log( val ) )

			$mol_fiber_sync( ()=> {
				history.push( subtask( 1 ) + subtask( 2 ) )
			} )
			
			$mol_defer.run() ; $mol_fiber_warp()
			$mol_defer.run() ; $mol_fiber_warp()

			$mol_assert_equal( history.join( ',' ) , '1,2,3' )
		} ,

		'destroyed while executed'() {
			$mol_fiber_warp()
			
			const history = [] as number[]

			const log = ( val : number ) : number => {
				return $mol_fiber_async( back => {
					new $mol_defer( back( ()=> {
						history.push( val )
						return val
					} ) )
				} )
			}

			const task = new $mol_fiber( ()=> {
				history.push( log( 1 ) + log( 2 ) )
			} )

			task.start()
			task.destructor()
			$mol_defer.run()

			$mol_assert_equal( history.join( ',' ) , '' )
		} ,

		'aborted while executed'() {
			$mol_fiber_warp()
			
			const history = [] as number[]

			const log = ( val : number ) : number => {
				return $mol_fiber_async( back => {

					let disposed = false
					
					new $mol_defer( ()=> {
						if( disposed ) return
						history.push( val )
						return val
					} )
					
					return ()=> disposed = true
				} )
			}

			const task = new $mol_fiber( ()=> {
				history.push( log( 1 ) + log( 2 ) )
			} )

			task.start()
			task.destructor()
			$mol_defer.run()

			$mol_assert_equal( history.join( ',' ) , '' )
		} ,

		'wrapped in func in decorated'() {
			$mol_fiber_warp()
			
			const history = [] as number[]

			const log = ( val : number ) : number => {
				return $mol_fiber_async( back => {
					new $mol_defer( back( ()=> {
						history.push( val )
						return val
					} ) )
				} )
			}

			class Test {
				
				static subtask( val : number ) {
					return log( val )
				}

				@ $mol_fiber_method
				static task() {
					history.push( this.subtask( 1 ) + this.subtask( 2 ) )
				}

			}

			Test.task()

			$mol_defer.run() ; $mol_fiber_warp()
			$mol_defer.run() ; $mol_fiber_warp()

			$mol_assert_equal( history.join( ',' ) , '1,2,3' )
		} ,

	})

}
