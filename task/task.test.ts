namespace $ {

	$mol_test({

		'synchronous task'() {
			$mol_task_frame()
			const task = $mol_task_wrap( ()=> 1 )
			$mol_assert_equal( task() , 1 )
		} ,

		'wrapped in wrapped in wrapped'() {
			$mol_task_frame()
			
			const history = [] as number[]

			const log = $mol_task_wrap( ( val : number ) : number => {
				const task = $mol_task_current
				new $mol_defer( ()=> {
					history.push( val )
					task.done( val )
				} )
				throw $mol_task_wait
			} )

			const subtask = $mol_task_wrap( ( val : number )=> log( val ) )

			const task = $mol_task_wrap( ()=> {
				history.push( subtask( 1 ) + subtask( 2 ) )
			} )
			
			task()

			$mol_defer.run()

			$mol_assert_equal( history.join( ',' ) , '1,2,3' )
		} ,

		'wrapped in func in decorated'() {
			$mol_task_frame()
			
			const history = [] as number[]

			const log = $mol_task_wrap( ( val : number ) : number => {
				const task = $mol_task_current
				new $mol_defer( ()=> {
					history.push( val )
					task.done( val )
				} )
				throw $mol_task_wait
			} )

			class Test {
				
				static subtask( val : number ) {
					return log( val )
				}

				@ $mol_task
				static task() {
					history.push( this.subtask( 1 ) + this.subtask( 2 ) )
				}

			}

			Test.task()

			$mol_defer.run()

			$mol_assert_equal( history.join( ',' ) , '1,2,3' )
		} ,

		'destroyed while executed'() {
			$mol_task_frame()
			
			const history = [] as number[]

			const log = $mol_task_wrap( ( val : number ) : number => {
				const task = $mol_task_current
				new $mol_defer( ()=> {
					history.push( val )
					task.done( val )
				} )
				throw $mol_task_wait
			} )

			const task = new $mol_task_state( ()=> {
				history.push( log( 1 ) + log( 2 ) )
			} )

			task.start()
			task.destructor()
			$mol_defer.run()

			$mol_assert_equal( history.join( ',' ) , '1' )
		} ,

	})

}
