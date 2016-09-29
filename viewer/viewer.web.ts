module $ {

	/// Autoattach view roots to loaded DOM.
	document.addEventListener( 'DOMContentLoaded' , event => {
			
		var nodes = document.querySelectorAll( '[mol_viewer_root]' )
		
		for( let i = nodes.length - 1 ; i >= 0 ; --i ) {
			let view = (<any>$)[ nodes.item( i ).getAttribute( 'mol_viewer_root' ) ].root( i )
			view.DOMNode( nodes.item( i ) )
			new $mol_defer( ()=> view.DOMTree() )
		}
		
		$.$mol_defer.run()
	} )
	
}
