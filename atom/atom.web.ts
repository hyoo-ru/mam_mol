module $ {
	
	window.addEventListener( 'error' , ( event : ErrorEvent )=> {
		var error = event.error
		var stack = $mol_atom.stack
		
		if( error instanceof $mol_atom_wait ) {
			event.preventDefault()
		}
		
		$mol_atom_restore( error )
	} )
	
}

