namespace $.$mol {
	
	$mol_test({
		
		'handle clicks by default'() {
			let clicked = false
			
			const clicker = new $mol_button
			clicker.event_click = event => { clicked = true }
			
			const element = clicker.render() as HTMLButtonElement
			
			const event = $mol_dom_context.document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_ok( clicked )
		} ,
		
		'no handle clicks if disabled'() {
			let clicked = false
			
			const clicker = new $mol_button
			clicker.event_click = event => { clicked = true }
			clicker.enabled = ()=> false
			
			const element = clicker.render() as HTMLButtonElement
			
			const event = $mol_dom_context.document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_not( clicked )
		} ,
		
	})
	
}
