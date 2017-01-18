namespace $ {
	
	document.addEventListener( 'selectionchange' , event => {
		$mol_view_selection.position( void 0 )
	} )
	
	document.addEventListener( 'focusin' , $mol_view_selection.onFocus )
	document.addEventListener( 'focus' , $mol_view_selection.onFocus , true ) // FF
	
	document.addEventListener( 'focusout' , $mol_view_selection.onBlur )
	document.addEventListener( 'blur' , $mol_view_selection.onBlur , true ) // FF
	
}
