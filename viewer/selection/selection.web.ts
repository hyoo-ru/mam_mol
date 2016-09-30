module $ {
	
	document.addEventListener( 'selectionchange' , event => {
		$mol_viewer_selection.position( void 0 )
	} )
	
	document.addEventListener( 'focusin' , $mol_viewer_selection.onFocus )
	document.addEventListener( 'focus' , $mol_viewer_selection.onFocus , true ) // FF
	
	document.addEventListener( 'focusout' , $mol_viewer_selection.onBlur )
	document.addEventListener( 'blur' , $mol_viewer_selection.onBlur , true ) // FF
	
}
