namespace $.$$ {
	
	$mol_test({
		
		'handle clicks by default'() {
			let clicked = false
			
			const clicker = $mol_button.make({
				event_click : ( event : MouseEvent )=> { clicked = true } ,
			})
			
			const element = clicker.dom_tree() as HTMLButtonElement
			
			const event = $mol_dom_context.document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_ok( clicked )
		} ,
		
		'no handle clicks if disabled'() {
			let clicked = false
			
			const clicker = $mol_button.make({
				event_click : ( event : MouseEvent )=> { clicked = true } ,
				enabled : ()=> false ,
			})
			
			const element = clicker.dom_tree() as HTMLButtonElement
			
			const event = $mol_dom_context.document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_not( clicked )
		} ,
		
	})
	
}
