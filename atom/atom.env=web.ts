window.addEventListener( 'error' , ( event : ErrorEvent )=> {
	$mol_atom_schedule()
	
	var error = event.error
	var stack = $mol_atom_stack
	
	for( var atom of stack ) {
		console.debug( atom.objectPath() )
	}
	
	while( stack.length ) {
		stack.pop().push( error )
	}
})
