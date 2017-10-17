interface Window {
	cordova : any
}

namespace $ {

	/// Autoattach view roots to loaded DOM.
	$mol_dom_context.document.addEventListener( window.cordova ? 'deviceready' : 'DOMContentLoaded' , event => {
		$mol_view.autobind()
		$mol_defer.run()
	} )
	
}
