module $ {
	
	$mol_test({
		
		'caching' () {
			$mol_fiber_warp()
			
			let random = new $mol_atom2( 'random' , ()=> Math.random() )
			
			$mol_assert_equal( random.value() , random.value() )
			
		} ,
		
		'lazyness' () {
			$mol_fiber_warp()
			
			let called = false
			let prop = new $mol_atom2( 'prop' , ()=> called = true )
			
			$mol_defer.run()
			
			$mol_assert_not( called )
			
		} ,
		
		'mutation' () {
			$mol_fiber_warp()
			
			let prop = new $mol_atom2( 'prop' , ( next? : number )=> next + 1 || 0 )
			
			prop.value( 2 )
			
			$mol_assert_equal( prop.value() , 3 )
			
		} ,
		
		'instant actualization' () {
			$mol_fiber_warp()
			
			let source = new $mol_atom2( 'source' , ( next? : number )=> next || 1 )
			let middle = new $mol_atom2( 'middle' , ()=> source.value() + 1 )
			let target = new $mol_atom2( 'target' , ()=> middle.value() + 1 )
			

			$mol_assert_equal( target.value() , 3 )
			
			source.value( 2 )
			
			$mol_assert_equal( target.value() , 4 )	
			
		} ,
		
		'do not actualize when masters not changed' () {
			$mol_fiber_warp()
			
			let target_updates = 0 

			let source = new $mol_atom2( 'source' , ( next? : number )=> next || 1 )
			let middle = new $mol_atom2( 'middle' , ()=> Math.abs( source.value() ) )
			let target = new $mol_atom2( 'target' , ()=> ( ++ target_updates, middle.value() ) )
			
			target.value()
			$mol_assert_equal( target_updates , 1 )
			
			source.value( -1 )
			target.value()
			
			$mol_assert_equal( target_updates , 1 )
						
		} ,
		
		'do not actualize when no dependends already' () {
			$mol_fiber_warp()
			
			let target_updates = 0 

			let source = new $mol_atom2( 'source' , ( next? : number )=> next || 1 )
			let condition = new $mol_atom2( 'middle' , ( next? : boolean )=> next || false )
			let target = new $mol_atom2( 'target' , ()=> {
				++ target_updates
				return condition.value() ? 2 : source.value()
			} )
			
			target.value()
			$mol_assert_equal( target_updates , 1 )
			
			source.value( 2 )
			target.value()
			$mol_assert_equal( target_updates , 2 )
						
			condition.value( true )
			target.value()
			$mol_assert_equal( target_updates , 3 )
						
			source.value( 3 )
			target.value()
			$mol_assert_equal( target_updates , 3 )
						
		} ,
		
		'obsolete atoms actualized in initial order' () {
			$mol_fiber_warp()
			
			let actualizations = '' 

			let source = new $mol_atom2( 'source' , ( next? : number )=> next || 1 )
			let middle = new $mol_atom2( 'middle' , ()=> {
				actualizations += 'M'
				return source.value()
			} )
			let target = new $mol_atom2( 'target' , ()=> {
				actualizations += 'T'
				source.value()
				return middle.value()
			} )
			
			target.value()
			$mol_assert_equal( actualizations , 'TM' )
			
			source.value( 2 )
			$mol_defer.run()
			
			$mol_assert_equal( actualizations , 'TMTM' )
						
		} ,

		'automatic deferred restart' () {
			$mol_fiber_warp()
			
			let targetValue : number
			
			let source = new $mol_atom2( 'source' , ( next? : number )=> next || 1 )
			let middle = new $mol_atom2( 'middle' , ()=> source.value() + 1 )
			let target = new $mol_atom2( 'target' , ()=> targetValue = middle.value() + 1 )
			
			target.value()
			$mol_assert_equal( targetValue , 3 )
			
			source.value( 2 )
			$mol_assert_equal( targetValue , 3 )
			
			$mol_defer.run()
			$mol_assert_equal( targetValue , 4 )
			
		} ,
		
		'asynchronous handler' () {
			$mol_fiber_warp()

			let targetValue : number
			
			let atom = new $mol_atom2< number >( 'atom' , next => {
				return $mol_fiber_async( back => { new $mol_defer( back( ()=> next || 1 ) ) } )
			} )
			
			$mol_assert_fail( ()=> atom.value().valueOf() )

			$mol_defer.run() ; $mol_fiber_warp()
			$mol_assert_equal( atom.value() , 1 )

			atom.value( 2 )
			$mol_assert_equal( atom.value() , 1 )

			$mol_defer.run() ; $mol_fiber_warp()
			$mol_assert_equal( atom.value() , 2 )
		} ,
		
		'asynchronous put in fiber' () {
			$mol_fiber_warp()

			let targetValue : number
			
			let test_counter = new $mol_atom2<number>( 'test_counter' , next => {
				return $mol_fiber_async( back => {
					new $mol_defer( back( ()=> next || 1 ) )
				} )
			} )
			
			let slave = new $mol_atom2<number>( 'slave' , next => test_counter.value() )
			$mol_assert_fail( ()=> test_counter.value().valueOf() )

			$mol_defer.run() ; $mol_fiber_warp()
			$mol_assert_equal( test_counter.value() , 1 )

			$mol_fiber_sync( ()=> {
				test_counter.value( test_counter.value() + 1 )
				test_counter.value( test_counter.value() + 1 )
			} )


			$mol_defer.run() ; $mol_fiber_warp()
			$mol_defer.run() ; $mol_fiber_warp()
			$mol_assert_equal( test_counter.value() , 3 )
		} ,
		
		'error handling' () {
			$mol_fiber_warp()

			class TestError extends Error {
				message = 'Test error'
			}

			let source = new $mol_atom2< number >( 'source' , ()=> {
				throw new TestError
			} )
			let middle = new $mol_atom2( 'middle' , ()=> source.value() + 1 )
			let target = new $mol_atom2( 'target' , ()=> middle.value() + 1 )

			$mol_assert_fail( ()=> target.value().valueOf() , TestError )

		} ,

		'setting equal state are ignored' () {
			$mol_fiber_warp()

			let atom = new $mol_atom2( 'atom' , next => next || { foo : [777] } )

			let v1 = atom.value()
			let v2 = { foo : [777] }
			let v3 = atom.value( v2 )
			
			$mol_assert_equal( v1 , v3 )
			$mol_assert_unique( v2 , v3 )
		} ,
		
		'dispose after loss last slave' () {
			$mol_fiber_warp()

			let log = ''

			let source = new $mol_atom2(
				'source' ,
				next => { log += 'A' } ,
				()=> { log += 'B' } ,
			)
			
			let target = new $mol_atom2( 'slave' , ()=> source.value() )

			target.value()
			$mol_assert_equal( log , 'A' )

			target.destructor()
			$mol_assert_equal( log , 'A' )

			$mol_defer.run()
			$mol_assert_equal( log , 'AB' )
		} ,

		'dispose owned value' () {
			$mol_fiber_warp()

			const atom = new $mol_atom2( 'source' , ()=> ({
				destructed : false,
				destructor() {
					this.destructed = true
				}
			}) )

			const having = atom.value()
			$mol_assert_equal( having.destructed , false )

			atom.destructor()
			$mol_assert_equal( having.destructed , true )

			$mol_atom2.sync()
			$mol_assert_equal( having.destructed , true )

		} ,

		'thenable interface: wait for value' () {
			$mol_fiber_warp()
			
			const source = new $mol_atom2( 'source', ()=> {
				return $mol_fiber_async<number>( back => {
					new $mol_defer( back( ()=> 777 ) )
				} )
			} )

			const target = source.then( val => val.toString() )
			
			$mol_assert_fail( ()=> target.value().valueOf() , $mol_fiber_wait.constructor )

			$mol_defer.run() ; $mol_fiber_warp() ; $mol_atom2.sync()

			$mol_assert_equal( target.value() , '777' )
		} ,
		
		'thenable interface: negative' () {
			$mol_fiber_warp()
			
			const TestError = class extends Error {}

			const source = new $mol_atom2( 'source', ()=> {
				return $mol_fiber_async<number>( back => {
					new $mol_defer( back( ()=> {
						throw new TestError( 'Test error' )
					} ) )
				} )
			} )

			const target = source.then( val => val.toString() )
			
			$mol_assert_fail( ()=> target.value().valueOf() , $mol_fiber_wait.constructor )
			
			$mol_defer.run()
			
			$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
			$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
			$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )
			$mol_assert_fail( ()=> { $mol_fiber_warp() } , TestError )

			$mol_assert_fail( ()=> target.value().valueOf() , TestError )
		} ,
		
	})
	
}
