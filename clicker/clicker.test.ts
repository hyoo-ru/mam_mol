namespace $.$mol {
	
	$mol_test({
		
		'handle clicks by default'() {
			let clicked = false
			
			const clicker = new $mol_clicker
			clicker.eventClick = event => { clicked = true }
			
			const element = <HTMLButtonElement> clicker.DOMTree()
			element.dispatchEvent( new Event( 'mousedown' , {} ) )
			element.dispatchEvent( new Event( 'mouseup' , {} ) )
			
			$mol_assert_ok( clicked )
		} ,
		
		'no handle clicks if disabled'() {
			let clicked = false
			
			const clicker = new $mol_clicker
			clicker.eventClick = event => { clicked = true }
			clicker.enabled = ()=> false
			
			const element = <HTMLButtonElement> clicker.DOMTree()
			element.dispatchEvent( new Event( 'mousedown' , {} ) )
			element.dispatchEvent( new Event( 'mouseup' , {} ) )
			
			$mol_assert_not( clicked )
		} ,
		
		'no handle is moved while click'() {
			let clicked = false
			
			const clicker = new $mol_clicker
			clicker.eventClick = event => { clicked = true }
			clicker.enabled = ()=> false
			
			const element = <HTMLButtonElement> clicker.DOMTree()
			element.dispatchEvent( new Event( 'mousedown' , {} ) )
			element.dispatchEvent( new Event( 'mousemove' , {} ) )
			element.dispatchEvent( new Event( 'mouseup' , {} ) )
			
			$mol_assert_not( clicked )
		} ,
		
	})
	
}

