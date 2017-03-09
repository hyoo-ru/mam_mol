namespace $ {
	
	export interface $mol_dom_make_config extends $mol_dom_render_config {
		id? : string
		localName? : string
		namespaceURI? : string
	}
	
	export function $mol_dom_make( config : $mol_dom_make_config ) {
		const document = $mol_dom_context.document
		
		let el = config.id && document.getElementById( config.id ) as any
		if( !el ) {
			const name = config.localName || 'span'
			const space = config.namespaceURI || 'http://www.w3.org/1999/xhtml'
			el = document.createElementNS( space , name )
		}
		
		return $mol_dom_render( el , config )
	}
	
}
