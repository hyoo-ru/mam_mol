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
		
		'do not actualize when masters not changed'() {
			
			let target_updates = 0 

			let source = new $mol_atom( 'source' , ( next? : number )=> next || 1 )
			let middle = new $mol_atom( 'middle' , ()=> Math.abs( source.get() ) )
			let target = new $mol_atom( 'target' , ()=> {
				++ target_updates
				return middle.get()
			} )
			
			target.get()
			$mol_assert_equal( target_updates , 1 )
			
			source.set( -1 )
			target.get()
			
			$mol_assert_equal( target_updates , 1 )
						
		} ,
		
		'obsolete atoms actualized in initial order'() {
			
			let actualizations = '' 

			let source = new $mol_atom( 'source' , ( next? : number )=> next || 1 )
			let middle = new $mol_atom( 'middle' , ()=> {
				actualizations += 'M'
				return source.get()
			} )
			let target = new $mol_atom( 'target' , ()=> {
				actualizations += 'T'
				source.get()
				return middle.get()
			} )
			
			target.get()
			$mol_assert_equal( actualizations , 'TM' )
			
			source.set( 2 )
			$mol_defer.run()
			
			$mol_assert_equal( actualizations , 'TMTM' )
						
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
			
			let test_counter = new $mol_atom<number>( 'test_counter' , next => {
				new $mol_defer( ()=> {
					test_counter.push( next || 1 )
				} )
				throw new $mol_atom_wait
			} )
			
			let slave = new $mol_atom<number>( 'slave' , next => test_counter.get() )
			slave.actualize()
			
			let res : Error[] = []
			const error = new Error( 'test error' )
			
			const test_task = new $mol_atom( 'test_task' )
			.then( () => test_counter.get() + 1 )
			.then( next => test_counter.set( next ) )
			.then( next => {
				test_counter.set( next + 1 )
				throw error
			} )
			.catch( error => [ error ] )
			.then( next => res = next )
			
			$mol_defer.run()
			
			$mol_assert_equal( test_counter.get() , 3 )
			$mol_assert_equal( res[0] , error )
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

		'setting equal state are ignored'() {

			let atom = new $mol_atom( 'atom' , next => next || { foo : [777] } )

			let v1 = atom.get()
			let v2 = { foo : [777] }
			let v3 = atom.set( v2 )
			
			$mol_assert_equal( v1 , v3 )
			$mol_assert_unique( v2 , v3 )
		} ,
		
		'setting equal to last setted are ignored until changed'() {
			let val = { foo : [777] }
			let called = 0

			let atom = new $mol_atom( 'atom' , ()=> {
				++ called
				return val
			} )

			atom.get()
			$mol_assert_equal( called , 1 )

			atom.set({ foo : [666] })
			$mol_assert_equal( called , 2 )
			
			atom.set({ foo : [666] })
			$mol_assert_equal( called , 2 )
			atom.value( { foo : [666] } , $mol_atom_force_update )
			$mol_assert_equal( called , 3 )
			
			atom.push({ foo : [777] })

			atom.set({ foo : [666] })
			$mol_assert_equal( called , 4 )

			atom.set({ foo : [555] })
			$mol_assert_equal( called , 5 )
		} ,
		
		'Next remains after restart'() {

			let defer = new $mol_atom( 'defer' , next => {
				new $mol_defer( ()=> {
					defer.push({})
				} )
				throw new $mol_atom_wait
			} )

			let value = {}
			
			let task = new $mol_atom( 'task' , next => {
				defer.get().valueOf()
				return next
			} )
			
			$mol_assert_fail( ()=> task.set( value ).valueOf() , $mol_atom_wait )

			$mol_defer.run()

			$mol_assert_equal( task.get() , value )
		} ,
	})
	
}
