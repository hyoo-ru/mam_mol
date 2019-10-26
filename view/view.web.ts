interface Window {
	cordova : any
}

namespace $ {

	if( $mol_dom_context.document ) {

		/// Autoattach view roots to loaded DOM.
		const event_name = self.cordova ? 'deviceready' : 'DOMContentLoaded'
		$mol_dom_context.document.addEventListener( event_name , $mol_fiber_root( $mol_log2.func( ( event : Event )=> {
			$mol_view.autobind()
			$mol_defer.run()
		} ) ) )
		
	}
	
}
