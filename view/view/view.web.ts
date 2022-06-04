interface Window {
	cordova : any
}

namespace $ {

	if( $mol_dom_context.document ) {
		setTimeout( ()=> $mol_view.autobind() )
	}
	
}
