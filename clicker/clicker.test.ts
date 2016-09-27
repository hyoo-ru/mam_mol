module $.$mol {
	
	/// Handle clicks by default
	$mol_test( test => {
		let clicked = false
		
		const clicker = new $mol_clicker
		clicker.eventClick = event => { clicked = true }
		
		const element = <HTMLButtonElement> clicker.DOMTree()
		element.click()
		
		test.ok( clicked )
	} )
	
	/// Not handle clicks if disabled
	$mol_test( test => {
		let clicked = false
		
		const clicker = new $mol_clicker
		clicker.eventClick = event => { clicked = true }
		clicker.enabled = ()=> false
		
		const element = <HTMLButtonElement> clicker.DOMTree()
		element.click()
		
		test.not( clicked )
	} )
	
}
