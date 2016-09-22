document.addEventListener( 'selectionchange' , event => {
	$mol_viewer_selection.position( void 0 )
} )

document.addEventListener( 'focusin' , event => {
	$mol_viewer_selection.focused( event.srcElement )
} )

document.addEventListener( 'focusout' , event => {
	$mol_viewer_selection.focused( null )
} )
