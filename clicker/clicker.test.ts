namespace $.$mol {
	
	$mol_test({
		
		'handle clicks by default'() {
			let clicked = false
			
			const clicker = new $mol_clicker
			clicker.eventClick = event => { clicked = true }
			
			const element = <HTMLButtonElement> clicker.DOMTree()
			
			const event = document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_ok( clicked )
		} ,
		
		'no handle clicks if disabled'() {
			let clicked = false
			
			const clicker = new $mol_clicker
			clicker.eventClick = event => { clicked = true }
			clicker.enabled = ()=> false
			
			const element = <HTMLButtonElement> clicker.DOMTree()
			
			const event = document.createEvent( 'mouseevent' )
			event.initEvent( 'click' , true , true )
			element.dispatchEvent( event )
			
			$mol_assert_not( clicked )
		} ,
		
	})
	
}
