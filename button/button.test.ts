namespace $.$mol {
	
	$mol_test({
		
		'handle clicks by default'() {
			let clicked = false
			
			const clicker = new $mol_button
			clicker.event_click = event => { clicked = true }
			
			const element = <HTMLButtonElement> clicker.dom_tree()
			
			const event = document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_ok( clicked )
		} ,
		
		'no handle clicks if disabled'() {
			let clicked = false
			
			const clicker = new $mol_button
			clicker.event_click = event => { clicked = true }
			clicker.enabled = ()=> false
			
			const element = <HTMLButtonElement> clicker.dom_tree()
			
			const event = document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_not( clicked )
		} ,
		
	})
	
}
