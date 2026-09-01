namespace $ {

	$mol_test_mocks.push( $ => {
		$.$mol_story_current = new $mol_story
		$.$mol_story_current.$ = $
	} )

	$mol_test({
		
		'undo-redo' ( $ ) {
			
			class Obj extends $mol_object2 {

				@ $mol_story_hero
				@ $mol_mem
				foo( next? : number ) { return next || 1 }

				@ $mol_story_tell.method
				set( next : number ) {
					this.foo( next )
				}

			}
			
			const obj = new Obj
			obj.$ = $
			
			obj.set( 2 ) // tell
			$mol_assert_equal( obj.foo() , 2 )
			$.$mol_after_mock_warp() // auto commit
			
			obj.set( 3 ) // tell
			$mol_assert_equal( obj.foo() , 3 )
			$.$mol_story_current!.commit() // manual commit
			
			obj.foo( 4 ) // don't tell
			$mol_assert_equal( obj.foo() , 4 )
			$.$mol_story_current!.commit() // nope commit
			
			// backward
			
			$.$mol_story_current!.backward()
			$mol_assert_equal( obj.foo() , 2 )
			
			$.$mol_story_current!.backward()
			$mol_assert_equal( obj.foo() , 1 )
			
			$.$mol_story_current!.backward()
			$mol_assert_equal( obj.foo() , 1 ) // no change at story begin
			
			// forward
			
			$.$mol_story_current!.forward()
			$mol_assert_equal( obj.foo() , 2 )
			
			$.$mol_story_current!.forward()
			$mol_assert_equal( obj.foo() , 3 )
			
			$.$mol_story_current!.forward()
			$mol_assert_equal( obj.foo() , 3 ) // no change at story end
			
		} ,	
		
		'transactions' ( $ ) {
			
			class Obj extends $mol_object2 {
				
				@ $mol_story_hero
				@ $mol_mem
				foo( next? : number ) { return next || 1 }

				@ $mol_story_tell.method
				set( next : number ) {
					this.foo( next )
				}

			}
			
			const obj = new Obj
			obj.$ = $
			
			obj.set( 2 )
			$mol_assert_equal( obj.foo() , 2 )
			
			$.$mol_story_current!.draft_open()
			obj.set( 3 )
			$mol_assert_equal( obj.foo() , 3 )
			
			$.$mol_story_current!.draft_fire()
			$mol_assert_equal( obj.foo() , 2 )
			
			$.$mol_story_current!.draft_fire()
			$mol_assert_equal( obj.foo() , 2 )
			
			$.$mol_story_current!.draft_open()
			obj.set( 3 )
			$mol_assert_equal( obj.foo() , 3 )
			
			$.$mol_story_current!.draft_close()
			$mol_assert_equal( obj.foo() , 3 )
			
			$.$mol_story_current!.draft_fire()
			$mol_assert_equal( obj.foo() , 3 )
			
			$.$mol_story_current!.backward()
			$mol_assert_equal( obj.foo() , 2 )
			
		} ,	
		
	})
}
