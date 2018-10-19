namespace $ {

	self.addEventListener( 'error' , event => {
		if( 'then' in event.error || $mol_fail_catched.has( event.error ) ) {
			event.preventDefault()
		}
		$mol_fail_catched.add( event.error )
	} )

	self.addEventListener( 'unhandledrejection' , event => {
		if( 'then' in event.reason || $mol_fail_catched.has( event.reason ) ) {
			event.preventDefault()
		}
		$mol_fail_catched.add( event.reason )
	} )

}
