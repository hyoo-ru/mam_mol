document.addEventListener( 'selectionchange' , event => {
	$mol_viewer_selection.position( void 0 )
} )

document.addEventListener( 'focusin' , event => {
	let parents : Element[] = [],
		element : Element
	
	element = event.srcElement
	
	while(element) {
		parents.push(element)
		element = element.parentElement ? element.parentElement : null
	}
	
	$mol_viewer_selection.focused( parents )
} )

document.addEventListener( 'focusout' , event => {
	$mol_viewer_selection.focused( [] )
} )
