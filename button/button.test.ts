namespace $.$$ {
	
	$mol_test({
		
		'handle clicks by default'($) {
			let clicked = false
			
			const clicker = $mol_button.make({
				$,
				click : ( event : MouseEvent )=> { clicked = true } ,
			})
			
			const element = clicker.dom_tree() as HTMLButtonElement
			
			const event = $mol_dom_context.document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_ok( clicked )
		} ,
		
		'no handle clicks if disabled'($) {
			let clicked = false
			
			const clicker = $mol_button.make({
				$,
				click : ( event : MouseEvent )=> { clicked = true } ,
				enabled : ()=> false ,
			})
			
			const element = clicker.dom_tree() as HTMLButtonElement
			
			const event = $mol_dom_context.document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_not( clicked )
		} ,
		
		async 'Store error'($) {
			
			const clicker = $mol_button.make({
				$,
				click : ( event : MouseEvent )=> $.$mol_fail( new Error( 'Test error' ) ),
			})
			
			const event = $mol_dom_context.document.createEvent( 'mouseevent' )
			$mol_assert_fail( ()=> clicker.event_activate( event ), 'Test error' )
			await Promise.resolve()
			$mol_assert_equal( clicker.status()[0].message, 'Test error' )
			
		} ,
		
	})
	
}
