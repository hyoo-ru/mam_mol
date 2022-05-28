interface Window {
	cordova : any
}

namespace $ {

	if( $mol_dom_context.document ) {

		setTimeout( ()=> $mol_view.autobind() )
		
		function $mol_view_watch() {
			new $mol_after_frame( $mol_view_watch )
			for( const view of $mol_view.watchers ) {
				
				const prev = view.view_rect_cache()
				const next = view.dom_node().getBoundingClientRect()
				
				// don't render
				if( next.left === 0 && next.right === 0 && next.width === 0 ) {
					if( prev ) view.view_rect_cache( null )
					continue
				}
				
				// changed rect
				if( !prev || prev.x !== next.x || prev.y !== next.y || prev.width !== next.width || prev.height !== next.height ) {
					view.view_rect_cache( next )
				}
				
			}
		}
		
		$mol_view_watch()
	
	}
	
}
