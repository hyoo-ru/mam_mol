module $ {
	
	$mol_test({
		
		'caching'() {
			
			let random = new $mol_atom( 'random' , ()=> Math.random() )
			
			$mol_assert_equal( random.get() , random.get() )
			
		} ,
		
		'lazyness'() {
			
			let value = 0
			let prop = new $mol_atom( 'prop' , ()=> value = 1 )
			
			$mol_defer.run()
			
			$mol_assert_equal( value , 0 )
			
		} ,
		
		'instant actualization'() {
			
			let source = new $mol_atom( 'source' , ( next? : number )=> next || 1 )
			let middle = new $mol_atom( 'middle' , ()=> source.get() + 1 )
			let target = new $mol_atom( 'target' , ()=> middle.get() + 1 )
			
			$mol_assert_equal( target.get() , 3 )
			
			source.set( 2 )
			
			$mol_assert_equal( target.get() , 4 )
			
		} ,
		
		'automatic deferred restart'() {
			
			let targetValue : number
			
			let source = new $mol_atom( 'source' , ( next? : number )=> next || 1 )
			let middle = new $mol_atom( 'middle' , ()=> source.get() + 1 )
			let target = new $mol_atom( 'target' , ()=> targetValue = middle.get() + 1 )
			
			target.get()
			$mol_assert_equal( targetValue , 3 )
			
			source.set( 2 )
			$mol_assert_equal( targetValue , 3 )
			
			$mol_defer.run()
			$mol_assert_equal( targetValue , 4 )
			
		} ,
		
		'Right reactive change of source'() {

			let targetValue : number
			
			let counter = new $mol_atom<number>( 'counter' , next => {
				new $mol_defer( ()=> {
					counter.push( next || 1 )
				} )
				throw new $mol_atom_wait
			} )
			
			let slave = new $mol_atom<number>( 'slave' , next => counter.get() )
			slave.actualize()
			
			let changed = false
			
			$mol_atom_task( 'task' , () => {
				let next = counter.get() + 1
				$mol_atom_task( 'task' , ()=> {
					counter.set( next ).valueOf()
					changed = true
				})
			} )
			
			$mol_defer.run()
			
			$mol_assert_equal( counter.get() , 2 )
			$mol_assert_ok( changed )
			
			slave.destroyed( true )
		} ,
		
		'error handling'() {

			let source = new $mol_atom< number >( 'source' , ( next? : number )=> {
				const error = new Error( 'Test error' )
				error['$mol_atom_catched'] = true
				throw error
			} )
			let middle = new $mol_atom( 'middle' , ()=> source.get() + 1 )
			let target = new $mol_atom( 'target' , ()=> middle.get() + 1 )

			$mol_assert_fail( ()=> target.get().valueOf() )

		} ,
		
	})
	
}
