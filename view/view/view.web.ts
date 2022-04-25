interface Window {
	cordova : any
}

namespace $ {

	if( $mol_dom_context.document ) {

		setTimeout( ()=> $mol_view.autobind() )
		
		function $mol_view_watch() {
			new $mol_after_frame( $mol_view_watch )
			for( const view of $mol_view.watchers ) {
				view.view_rect_cache( view.dom_node().getBoundingClientRect().toJSON() )
			}
		}
		
		$mol_view_watch()
	
	}
	
}
