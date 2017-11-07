namespace $ {
	
	$mol_dom_context.document.addEventListener( 'selectionchange' , event => {
		$mol_view_selection.position( undefined , $mol_atom_force_cache )
	} )
	
	$mol_dom_context.document.addEventListener(
		'focus' ,
		$mol_log_group( '$mol_view_selection focus' , ( event : FocusEvent )=> $mol_view_selection.onFocus( event ) ) ,
		true
	)
	
	$mol_dom_context.document.addEventListener(
		'blur' ,
		( event : FocusEvent )=> $mol_view_selection.onBlur( event ) ,
		true
	)
	
}
