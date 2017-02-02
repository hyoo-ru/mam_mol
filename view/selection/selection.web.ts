namespace $ {
	
	$mol_dom_context.document.addEventListener( 'selectionchange' , event => {
		$mol_view_selection.position( void 0 )
	} )
	
	$mol_dom_context.document.addEventListener( 'focusin' , $mol_view_selection.onFocus )
	$mol_dom_context.document.addEventListener( 'focus' , $mol_view_selection.onFocus , true ) // FF
	
	$mol_dom_context.document.addEventListener( 'focusout' , $mol_view_selection.onBlur )
	$mol_dom_context.document.addEventListener( 'blur' , $mol_view_selection.onBlur , true ) // FF
	
}
