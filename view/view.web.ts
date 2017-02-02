interface Window {
	cordova : any
}

namespace $ {

	/// Autoattach view roots to loaded DOM.
	$mol_dom_context.document.addEventListener( window.cordova ? 'deviceready' : 'DOMContentLoaded' , event => {
			
		const nodes = $mol_dom_context.document.querySelectorAll( '[mol_view_root]' )
		
		for( let i = nodes.length - 1 ; i >= 0 ; --i ) {
			let view = (<any>$)[ nodes.item( i ).getAttribute( 'mol_view_root' ) ].Root( i )
			view.dom_node( nodes.item( i ) )
			let win = new $mol_atom( `$mol_view.Root(${ i })` , ()=> {
				view.dom_tree()
				$mol_dom_context.document.title = view.title()
				return null
			} )
			new $mol_defer( ()=> win.get() )
		}
		
		$mol_defer.run()
	} )
	
}
