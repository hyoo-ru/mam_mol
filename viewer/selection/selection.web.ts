document.addEventListener( 'selectionchange' , event => {
	$mol_viewer_selection.position( void 0 )
} )

document.addEventListener( 'focusin' , event => {
	const parents : Element[] = []
	let element = event.srcElement
	
	while( element ) {
		parents.push( element )
		element = element.parentElement
	}
	
	$mol_viewer_selection.focused( parents )
} )

document.addEventListener( 'focusout' , event => {
	$mol_viewer_selection.focused( [] )
} )
