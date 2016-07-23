window.addEventListener( 'error' , ( event : ErrorEvent )=> {
	var error = event.error
	var stack = $mol_atom.stack
	
	if( error instanceof $mol_atom_wait ) {
		event.preventDefault()
	}
	
	while( stack.length ) {
		var atom = stack.pop()
		if( error instanceof Error ) {
			error = atom.push( error )
		}
	}
})
