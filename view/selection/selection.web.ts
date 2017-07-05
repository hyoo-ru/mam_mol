namespace $ {
	
	$mol_dom_context.document.addEventListener( 'selectionchange' , event => {
		$mol_view_selection.position( undefined , $mol_atom_force )
	} )
	
	$mol_dom_context.document.addEventListener( 'focus' , event => $mol_view_selection.onFocus( event ) , true )
	$mol_dom_context.document.addEventListener( 'blur' , event => $mol_view_selection.onBlur( event ) , true )
	
}
