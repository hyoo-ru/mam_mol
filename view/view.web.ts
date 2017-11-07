interface Window {
	cordova : any
}

namespace $ {

	/// Autoattach view roots to loaded DOM.
	const event_name = window.cordova ? 'deviceready' : 'DOMContentLoaded'
	$mol_dom_context.document.addEventListener( event_name , $mol_log_group( `$mol_view ${ event_name }` , ( event : Event )=> {
		$mol_view.autobind()
		$mol_defer.run()
	} ) )
	
}
