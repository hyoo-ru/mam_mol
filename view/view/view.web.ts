interface Window {
	cordova : any
}

namespace $ {

	$mol_dom_context.document?.addEventListener(
		'DOMContentLoaded',
		()=> $mol_view.auto(),
		{ once: true },
	)
	
}
