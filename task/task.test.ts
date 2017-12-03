namespace $ {

	declare var Promise : any
	
	$mol_test({

		'synchronous task'() {
			const task = $mol_task_wrap( ()=> 1 )
			$mol_assert_equal( task() , 1 )
		} ,

		'task in func in task'() {

			const history = [] as number[]

			const log = $mol_task_wrap( ( val : number ) : number => {
				throw {
					then( done : ( res : number )=> null ) {
						new $mol_defer( ()=> {
							history.push( val )
							done( val )
						} )
					}
				}
			} )

			const subtask = ( val : number )=> log( val )

			const task = $mol_task_wrap( ()=> {
				history.push( subtask( 1 ) + subtask( 2 ) )
			} )
			
			task()

			$mol_defer.run()

			$mol_assert_equal( history.join( ',' ) , '1,2,3' )
		} ,

		'task in task in task'() {

			const history = [] as number[]

			const log = $mol_task_wrap( ( val : number ) : number => {
				throw {
					then( done : ( res : number )=> null ) {
						new $mol_defer( ()=> {
							history.push( val )
							done( val )
						} )
					}
				}
			} )

			const subtask = $mol_task_wrap( ( val : number )=> log( val ) )

			const task = $mol_task_wrap( ()=> {
				history.push( subtask( 1 ) + subtask( 2 ) )
			} )
			
			task()

			$mol_defer.run()

			$mol_assert_equal( history.join( ',' ) , '1,2,3' )
		} ,

		'decorated methods'() {

			const history = [] as number[]

			class Test {
				
				@ $mol_task
				static log( val : number ) : number {
					throw {
						then( done : ( res : number )=> null ) {
							new $mol_defer( ()=> {
								history.push( val )
								done( val )
							} )
						}
					}
				}

				static subtask( val : number ) {
					return this.log( val )
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

	})

}
