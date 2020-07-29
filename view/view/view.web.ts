interface Window {
	cordova : any
}

namespace $ {

	if( $mol_dom_context.document ) {

		/// Autoattach view roots to loaded DOM.
		const event_name = self.cordova ? 'deviceready' : 'DOMContentLoaded'
		Promise.resolve().then( $mol_fiber_root( ()=> {
			$mol_view.autobind()
			$mol_defer.run()
		} ) )
		
		function $mol_view_watch() {
			$mol_fiber_unlimit( ()=> {
				new $mol_after_frame( watch )
				for( const view of $mol_view.watchers ) {
					view.view_rect_cache( view.dom_node().getBoundingClientRect().toJSON() )
				}
			} )
		}

		const watch = $mol_fiber_root( $mol_view_watch )

		watch()
	
	}
	
}
