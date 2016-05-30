window.addEventListener( 'error' , ( event : ErrorEvent )=> {
	var error = event.error
	var stack = $mol_atom.stack
	
	while( stack.length ) {
		var atom = stack.pop()
		if( error instanceof Error ) {
			error = atom.push( error )
		}
	}
})
