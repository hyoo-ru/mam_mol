/// Autoattach view roots to loaded DOM.
document.addEventListener( 'DOMContentLoaded' , event => {
	var nodes = document.querySelectorAll( '[mol_viewer_root]' )
	for( var i = nodes.length - 1 ; i >= 0 ; --i ) {
		var view = (<any>$)[ nodes.item(i).getAttribute( 'mol_viewer_root' ) ].root(i)
		view.DOMNode( nodes.item(i) )
		$mol_atom_task( ()=> view.DOMTree() )
	}
	$mol_defer.run()
} )
